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

module.exports = { normalizeOrigin };
