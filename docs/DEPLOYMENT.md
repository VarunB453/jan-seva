# Deployment and operations

## Secrets and configuration

Copy `.env.example` to `.env` for a local deployment. Never commit `.env` or put production secrets in the Compose file, image, or frontend build. Configure production values through the deployment host's secret manager or protected environment.

Required Compose variables:

- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`: credentials for the bundled PostgreSQL service.
- `DATABASE_URL`: Prisma connection URL. For the bundled service, use `db` as the host and ensure the credentials match the PostgreSQL variables.
- `JWT_SECRET`: a cryptographically random secret (at least 32 random bytes).
- `FRONTEND_URL`, `BACKEND_URL`: the public HTTPS origin. With the supplied same-origin reverse proxy, both should be the same origin.

Email delivery is disabled/simulated if no provider credentials are configured. Configure `RESEND_API_KEY` and `RESEND_FROM`, or the supported SMTP `EMAIL_USER` and `EMAIL_PASS`, before enabling production account verification.

## Production startup

1. Configure `.env` with unique production secrets. Set `FRONTEND_URL` and `BACKEND_URL` to the public HTTPS URL and set `HTTP_PORT` to a loopback-only port.
2. Put a TLS-terminating reverse proxy/load balancer in front of the host. Forward HTTPS traffic to `127.0.0.1:${HTTP_PORT}`. The app's published frontend port is loopback-only; the database and API ports are not published.
3. Build and start PostgreSQL:

   ```sh
   docker compose config --quiet
   docker compose build
   docker compose up -d db
   ```

4. Back up and verify any existing database before applying a migration. For a new, empty database, run:

   ```sh
   docker compose run --rm backend npm run db:migrate:deploy
   ```

   For an existing database already created from this Prisma schema, first compare the live schema with `server/prisma/schema.prisma` and take a restorable backup. Then baseline the existing database once:

   ```sh
   docker compose run --rm backend npx prisma migrate resolve --applied 20261022120000_initial
   ```

   Do **not** run the initial migration against an existing un-baselined database: it creates tables and will fail if those tables already exist. If the database does not match the schema, prepare and review a forward-only migration plan instead of baselining blindly.

5. Start the app:

   ```sh
   docker compose up -d
   docker compose ps
   ```

Schema migrations are not run by the container entrypoint or image build. `npm run build` only generates the Prisma client; it never changes a database. Production migrations use `prisma migrate deploy`, which applies committed pending migrations and does not reset the database. Review every new migration and its generated SQL before deployment. Back up first, and never use `prisma db push --accept-data-loss`, `migrate reset`, or the repository's data-reset scripts against production.

For each future schema change, use Prisma's development workflow against a disposable development database, commit the resulting migration directory, and review that SQL before running `npm run db:migrate:deploy` in production.

## Updates and operations

```sh
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100 backend frontend db
```

The server's `/healthz` endpoint checks database connectivity. The client proxy forwards `/api/` and `/uploads/` to the internal server service. Uploaded files and local database backups are held in Docker volumes; PostgreSQL data is held in `postgres_data`.

The current scheduled backup implementation stores local snapshots in the `backups` volume for file-based SQLite configurations. For PostgreSQL, it reports database record counts but does not create a database backup. Configure managed PostgreSQL point-in-time recovery and an independent backup/export process, and test restoration before production use. The Compose backup volume is not itself an adequate PostgreSQL backup.

## CI and required GitHub secrets

The CI workflow needs no repository secrets: it builds without publishing, and uses dummy connection values only for Prisma schema validation. No image registry credentials or deployment credentials are configured. To add deployment later, configure narrowly scoped credentials in GitHub Environments and require approval; do not add them to this workflow until deployment is explicitly authorized.

CI runs npm dependency audits and Trivy image scans for high/critical vulnerabilities. Review and update vulnerable dependencies/base images when a scan fails; do not suppress findings without documenting the reason.

## Remaining production checks

- Configure a real public domain, TLS, and trusted proxy settings for the hosting platform.
- Configure email delivery and verify links from outside the deployment network.
- Use a managed PostgreSQL service (or separately harden, monitor, and back up the bundled single-host database).
- Establish automated PostgreSQL backups and demonstrate restore/recovery.
- Exercise authentication, workflows, uploads, and migrations in a staging environment.
- Review operational access, monitoring, log retention, resource limits, and incident recovery for the actual hosting environment.
