# Security baseline

- Keep credentials in environment-specific secret storage. `.env` files and
  local databases are excluded from Docker build contexts and version control;
  example files contain placeholders only.
- Production Compose publishes only the frontend through a loopback-bound
  port. PostgreSQL and the API remain on internal Docker networks.
- The server uses security headers, parameterized Prisma queries, request
  rate-limits on authentication routes, and authenticated document access.
- Keep the Prisma schema and migration history reviewed and unchanged except
  through explicit, forward-only migrations. Never run reset scripts against
  production.
- CI audits npm dependencies and scans built images for high/critical
  vulnerabilities. Resolve findings by updating dependencies or base images
  rather than suppressing them without review.

See the root [SECURITY.md](../SECURITY.md) for vulnerability reporting.
