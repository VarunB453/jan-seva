# Security policy

## Reporting a vulnerability

Please do not report security vulnerabilities in public issues. Contact the
repository maintainers privately through GitHub's security advisory reporting
feature. Include the affected component, impact, and safe reproduction details.
Avoid accessing data that is not yours or disrupting service while validating
a report.

## Deployment guidance

- Replace every placeholder in `.env.example` and use unique, randomly
  generated production secrets. Never commit `.env` files, credentials, or
  production data.
- Terminate TLS at a trusted reverse proxy and restrict direct access to the
  host. Production Compose binds its published HTTP port to loopback.
- Use managed PostgreSQL backups or an independently tested backup process.
  The server's scheduled snapshot is not a PostgreSQL backup.
- Review dependency and image scan results in CI and apply database migrations
  only after backup and review.
