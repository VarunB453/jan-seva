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
    NODE_ENV: process.env.NODE_ENV,
  };
  process.env.BACKEND_URL = 'https://api.example.test/';
  process.env.FRONTEND_URL = 'https://app.example.test/';
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
  const { normalizeOrigin } = require('../src/utils/origin');
  assert.equal(normalizeOrigin('https://app.example.test/'), 'https://app.example.test');
});

test('enables HSTS in production', () => {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    const { headers } = runMiddleware();
    assert.equal(
      headers.get('Strict-Transport-Security'),
      'max-age=31536000; includeSubDomains; preload'
    );
  } finally {
    if (previous === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previous;
  }
});
