# JAV SEVA - Legal Metrology Verification & Certification Portal

A role-based digital platform for managing the verification and certification of weighing and measuring instruments. The portal supports application submission, statutory review, field inspection, laboratory testing, certificate issuance and public certificate verification.

> **Project:** SIH26036 — Smart India Hackathon  
> **Repository:** [VarunB453/jan-seva](https://github.com/VarunB453/jan-seva)

---

## Overview

The Legal Metrology Verification & Certification Portal digitizes key workflows associated with instrument verification under the **Legal Metrology Act, 2009** and the **Legal Metrology (General) Rules, 2011**.

It provides dedicated workspaces for applicants, Legal Metrology Officers (LMOs), field inspectors, laboratory supervisors, and administrators. A configurable rules engine supports instrument-category-specific workflows, while digital certificates and QR-based verification help make certification records easier to validate.

## Key Features

### Role-based workspaces

- **Citizen / Applicant Portal** — Submit applications, register instruments, upload supporting documents, and track application status.
- **Legal Metrology Officer (LMO) Portal** — Review and route applications, assign officers, manage approvals, and sign certificates.
- **Field Inspector Portal** — Record on-site inspection observations, calculate errors against applicable limits, and manage seal details.
- **GATC Laboratory Portal** — Manage laboratory queues, record test results, and upload reports for applicable instruments.
- **Administrator Portal** — View operational analytics, manage officer appointments, review audit logs, and access administrative tools.

### Statutory rules engine

- Includes configured rules for 27 legal metrology instrument categories.
- Supports authority routing between LMO and GATC workflows.
- Resolves applicable maximum permissible error (MPE) thresholds and certificate validity cycles, including 12-, 24-, and 60-month periods, where configured.

### Document persistence

- Uses PostgreSQL, including support for a Neon-hosted database.
- Stores uploaded document content in the `DocumentContent` table so documents can be retrieved without relying solely on ephemeral application-container storage.

### Digital certificates and QR verification

- Generates digital verification certificates.
- Uses SHA-256-based seal identifiers.
- Embeds QR codes that link to certificate verification endpoints.

### Responsive user interface

- Built with React and Material UI.
- Provides structured forms, workflow status indicators, and role-specific dashboards.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, React Router v6, Material UI, Lucide Icons |
| Backend | Node.js 20+, Express.js 5 |
| ORM | Prisma 5.22 |
| Database | PostgreSQL (including Neon Serverless PostgreSQL) |
| Authentication and security | Argon2id password hashing, HTTP-only JWT cookies, security headers, input validation/sanitization, rate limiting |
| CI | GitHub Actions |

---

## Getting Started

### Prerequisites

Install the following before running the project locally:

- [Node.js](https://nodejs.org/) v20 or later
- npm v9 or later
- A PostgreSQL database, either locally or through [Neon](https://neon.tech/)

### 1. Clone the repository

```bash
git clone https://github.com/VarunB453/jan-seva.git
cd jan-seva
```

### 2. Configure the backend

```bash
cd server
npm ci
cp .env.example .env
```

If you are using Windows Command Prompt, use `copy .env.example .env` instead of `cp`.

Update `server/.env` with values appropriate for your local environment:

```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5001
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
JWT_SECRET="replace-with-a-strong-random-secret-of-at-least-32-characters"
```

Use your actual database connection string and a securely generated JWT secret. Do not commit `.env` files or production credentials.

### 3. Initialize the database

Run the following commands from the `server` directory:

```bash
npm run db:migrate:deploy
npm run seed:rules
```

The seed command is intended to populate the configured statutory rules and demo portal accounts.

### 4. Start the backend

```bash
npm run dev
```

The backend is expected to run at:

```text
http://localhost:5001
```

### 5. Start the frontend

Open a second terminal from the repository root:

```bash
cd client
npm ci
npm start
```

The frontend is expected to be available at:

```text
http://localhost:3000
```

During local development, the client proxies API requests to the server on port `5001`.

---

## Testing

Run server tests from the `server` directory:

```bash
npm test
```

Run client tests and create a production build from the `client` directory:

```bash
npm test -- --watchAll=false
npm run build
```

These commands cover the statutory rules engine, QR-related regression checks, security and access-control checks, end-to-end flows, and frontend build validation as configured in the project.

---

## Security Considerations

Security is an important part of a portal that handles applications, identity information, and supporting documents. The project includes the following defensive measures:

- **Password protection:** Argon2id password hashing with per-user salts.
- **Session protection:** JWT-based authentication using HTTP-only cookies.
- **Access control:** Object-level ownership checks intended to prevent unauthorized access to another user's applications, documents, or tasks.
- **Upload validation:** MIME-type allowlisting, file-signature checks, and directory-traversal defenses.
- **Abuse prevention:** Rate limiting and security-related HTTP headers.
- **Document durability:** Database-backed document persistence to reduce dependence on ephemeral container filesystems.

### Production deployment checklist

- Use HTTPS and secure cookie settings in production.
- Store secrets in deployment environment variables or a secrets manager.
- Restrict database permissions and configure backups and retention policies.
- Review file-upload limits, allowed formats, and access permissions.
- Keep dependencies updated and run security tests before deployment.
- Do not use demo accounts or development secrets in a production environment.
- Verify statutory rules and workflows with the relevant authority before operational use.

---

## Demo Accounts

The project seed process can create demo accounts for the following roles:

| Role | Example seeded account |
|---|---|
| Citizen / Applicant | `priya@example.com` |
| Gazetted LMO | `lmo1@gov.in` |
| Field Inspector | `anjali@example.com` |
| GATC Supervisor | `gatc1@gov.in` |
| Super Administrator | `admin@example.com` |

For safety, passwords are not published in this README. Check the seed configuration in your local development environment for the current demo credentials, and never reuse demo credentials in production.

---

## Deployment

The original project notes reference the following services:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

Deployment URLs and status badges should be added here once the endpoints are confirmed for this repository. Configure production environment variables, CORS origins, secure cookies, and database access before exposing the application publicly.

---

## Legal and Project Disclaimer

This project is a software implementation intended to support digital workflows for legal metrology verification and certification. It is not, by itself, a government endorsement or a substitute for applicable laws, official procedures, or decisions by authorized officers. Confirm all statutory rules, validity periods, and certification processes with the appropriate authority before real-world use.

## License

This project is described as being licensed under the **ISC License**. See the [`LICENSE`](LICENSE) file for the authoritative license text.

---

Developed as part of **Smart India Hackathon (SIH 2026)** to explore more accessible, traceable, and efficient legal metrology workflows.
