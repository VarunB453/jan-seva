# Jan Seva

Jan Seva is a React web application with an Express API, Prisma ORM, and PostgreSQL database for legal metrology verification and certification workflows.

## Architecture

- **Client:** React 19 and Create React App (`client/`).
- **API:** Node.js 20 and Express 5 (`server/`).
- **Database:** PostgreSQL through Prisma 5 (`server/prisma/schema.prisma`).
- **Documents:** Uploaded files and PostgreSQL-backed document content; container uploads and backups use persistent Docker volumes.
- **Runtime:** Docker Compose runs the frontend reverse proxy, API, and PostgreSQL. Only the frontend port is published in the production Compose configuration.

## Run locally with Docker

Prerequisites: Docker Engine with the Compose plugin, and OpenSSL for generating secrets.

1. Create the local environment file:

   ```sh
   cp .env.example .env
   ```

2. Edit `.env`. Generate a database password and JWT key with `openssl rand -hex 32`. Use the same database password in `POSTGRES_PASSWORD` and `DATABASE_URL`. Do not use the sample placeholder values.

3. Create the database and apply the checked-in schema migration:

   ```sh
   docker compose -f compose.yaml -f compose.dev.yaml up -d db
   docker compose -f compose.yaml -f compose.dev.yaml run --rm backend npm run db:migrate:deploy
   ```

4. Start the development servers:

   ```sh
   docker compose -f compose.yaml -f compose.dev.yaml up --build
   ```

   Open <http://localhost:3000>. The API is proxied to the server; for local API debugging, its development port is available at <http://localhost:5001>.

Stop the stack with `Ctrl+C`, or run:

```sh
docker compose -f compose.yaml -f compose.dev.yaml down
```

Database data is retained in the `postgres_data` volume. Do not use `docker compose down -v` unless you explicitly intend to delete local database and uploaded-file volumes.

## Run without Docker

Install Node.js 20 or newer and PostgreSQL. Create a PostgreSQL database, then configure `DATABASE_URL` in `server/.env` with a localhost connection URL and set `JWT_SECRET`, `FRONTEND_URL=http://localhost:3000`, and `BACKEND_URL=http://localhost:5001`.

```sh
cd server
npm ci
npx prisma migrate deploy
npm run dev
```

In another terminal:

```sh
cd client
npm ci
npm start
```

## Production deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for secret management, TLS/reverse-proxy requirements, database backup and migration procedures, and deployment commands. The included Compose setup is a single-host deployment baseline; use managed PostgreSQL and a separately managed, tested backup/restore process for critical production data.

## Validation

GitHub Actions validates the Prisma schema, runs client and server tests, builds both applications and production containers, audits npm dependencies, and scans images for high/critical vulnerabilities. The existing database schema and migration are retained unchanged.
