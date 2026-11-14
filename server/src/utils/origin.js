const normalizeOrigin = (value, name = 'URL') => {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute HTTP or HTTPS URL.`);
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`${name} must use HTTP or HTTPS.`);
  }

  return parsed.origin;
};

const normalizeOrigins = (value, name = 'URL') => {
  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    throw new Error(`${name} must contain at least one HTTP or HTTPS URL.`);
  }

  return [...new Set(origins.map((origin) => normalizeOrigin(origin, name)))];
};

const getCorsAllowedOrigins = (env = process.env) => {
  const configuredOrigins = env.CORS_ALLOWED_ORIGINS || env.FRONTEND_URL;
  const origins = configuredOrigins || (
    env.NODE_ENV === 'production' ? null : 'http://localhost:3000'
  );

  if (!origins) {
    throw new Error('CORS_ALLOWED_ORIGINS or FRONTEND_URL must be configured in production.');
  }

  return normalizeOrigins(origins, 'CORS_ALLOWED_ORIGINS');
};

module.exports = { normalizeOrigin, normalizeOrigins, getCorsAllowedOrigins };
