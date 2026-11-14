const assert = require('node:assert/strict');
const test = require('node:test');
const { securityHeaders } = require('../src/middleware/securityHeaders');

const runMiddleware = () => {
  const headers = new Map();
  let nextCalled = false;
  securityHeaders({}, {
    setHeader: (name, value) => headers.set(name, value),
  }, () => {
    nextCalled = true;
  });
  return { headers, nextCalled };
};

test('sets baseline security headers and the configured origins', () => {
  const previous = {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
    NODE_ENV: process.env.NODE_ENV,
  };
  process.env.BACKEND_URL = 'https://api.example.test/';
  process.env.FRONTEND_URL = 'https://app.example.test/';
  delete process.env.CORS_ALLOWED_ORIGINS;
  process.env.NODE_ENV = 'development';

  try {
    const { headers, nextCalled } = runMiddleware();
    assert.equal(headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(headers.get('X-Frame-Options'), 'SAMEORIGIN');
    assert.match(headers.get('Content-Security-Policy'), /connect-src 'self' https:\/\/api\.example\.test https:\/\/app\.example\.test /);
    assert.doesNotMatch(headers.get('Content-Security-Policy'), /example\.test\//);
    assert.equal(headers.has('Strict-Transport-Security'), false);
    assert.equal(nextCalled, true);
  } finally {
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});

test('normalizes configured origins for CORS', () => {
  const { normalizeOrigin, normalizeOrigins, getCorsAllowedOrigins } = require('../src/utils/origin');
  assert.equal(normalizeOrigin('https://app.example.test/'), 'https://app.example.test');
  assert.deepEqual(
    normalizeOrigins('https://app.example.test/, https://preview.example.test/path, https://app.example.test'),
    ['https://app.example.test', 'https://preview.example.test']
  );
  assert.deepEqual(
    getCorsAllowedOrigins({
      CORS_ALLOWED_ORIGINS: 'https://app.example.test, https://preview.example.test',
      FRONTEND_URL: 'https://legacy.example.test',
    }),
    ['https://app.example.test', 'https://preview.example.test']
  );
  assert.throws(
    () => getCorsAllowedOrigins({ NODE_ENV: 'production' }),
    /CORS_ALLOWED_ORIGINS or FRONTEND_URL must be configured in production/
  );
});

test('includes all configured browser origins in the content security policy', () => {
  const previous = {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
  };
  process.env.BACKEND_URL = 'https://api.example.test';
  process.env.FRONTEND_URL = 'https://app.example.test';
  process.env.CORS_ALLOWED_ORIGINS = 'https://app.example.test,https://preview.example.test';

  try {
    const { headers } = runMiddleware();
    assert.match(
      headers.get('Content-Security-Policy'),
      /connect-src 'self' https:\/\/api\.example\.test https:\/\/app\.example\.test https:\/\/preview\.example\.test /
    );
  } finally {
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});

test('enables HSTS in production', () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_URL: process.env.FRONTEND_URL,
  };
  process.env.NODE_ENV = 'production';
  process.env.FRONTEND_URL = 'https://app.example.test';
  try {
    const { headers } = runMiddleware();
    assert.equal(
      headers.get('Strict-Transport-Security'),
      'max-age=31536000; includeSubDomains; preload'
    );
  } finally {
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
