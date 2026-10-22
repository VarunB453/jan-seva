# Architecture

Jan Seva is organized as two deployable applications with PostgreSQL as the
persistent database:

- `client/` contains the React/Create React App application. UI pages and route
  composition are in `src/pages/` and `src/App.js`; reusable UI is in
  `src/components/`; API configuration and authenticated fetch helpers are in
  `src/config/api.js`.
- `server/` contains the Express API. Request handlers, routes, middleware,
  business services, shared utilities, and Prisma configuration are grouped
  under `src/` and `prisma/`. Prisma owns the database schema and migrations;
  there is no separate handwritten model layer.
- `compose.yaml` defines the production stack. `compose.dev.yaml` overrides it
  for local development with source mounts and development servers.

The browser calls the API through the same origin in production: the Nginx
container serves the client and proxies `/api/` and `/uploads/` to the internal
server service. In development, Create React App proxies those paths to the
server. The server's existing route prefixes, authentication, database schema,
and migration history are preserved.

## Local configuration

For Docker, copy the root `.env.example` to `.env`; Compose uses those values
for PostgreSQL and the applications. For direct local development, configure
`server/.env` from `server/.env.example` and optionally set
`client/.env` from `client/.env.example`. The client defaults to same-origin
requests and the development proxy, so `REACT_APP_API_URL` should usually
remain blank.
