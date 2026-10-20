# 🎉 Legal Metrology Verification & Certification Portal - SIH26036
### *Where Precision Meets Celebration!* 🎊

[![CI Pipeline](https://github.com/ZINC137/SIH26036/actions/workflows/ci.yml/badge.svg)](https://github.com/ZINC137/SIH26036/actions/workflows/ci.yml)
[![Deployment Status](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)](https://sih-26036-final.vercel.app)
[![Backend Status](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat&logo=render)](https://sih26036-final.onrender.com)
[![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-00E599?style=flat&logo=postgresql)](https://neon.tech)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Good Vibes](https://img.shields.io/badge/Vibes-Excellent-brightgreen)](https://github.com/ZINC137/SIH26036)

> 🌟 **Welcome to the future of legal metrology!** An enterprise-grade, statutory web platform that turns the serious business of weighing & measuring instrument verification into a delightful digital experience. Built with love under the **Legal Metrology Act, 2009** and **Legal Metrology (General) Rules, 2011**.

---

## 🎭 Meet Your Portal Personas!

Every great system needs great characters! Here are your 5 pre-configured heroes, ready to jump into action:

| 🦸 Role | 🎯 Portal Focus | 📧 Email | 🔑 Password |
| :--- | :--- | :--- | :--- |
| **👤 Citizen / Applicant** | Application submission, instrument registration, tracking | `priya@example.com` | `UserPassword123!` |
| **⚖️ Gazetted LMO** | Statutory triage, jurisdiction routing, officer assignment, signing | `lmo1@gov.in` | `LmoPassword2026!` |
| **🔍 Field Inspector** | On-site verification, physical seal stamping, error calculation | `anjali@example.com` | `FieldOfficerPassword123!` |
| **🧪 GATC Supervisor** | Central laboratory testing, test report upload, accuracy tests | `gatc1@gov.in` | `GatcPassword2026!` |
| **👑 Super Administrator** | State-wide analytics, officer appointments, audits, DB reset | `admin@example.com` | `AdminPassword123!` |

> 💡 **Pro Tip:** Each account is a different adventure! Try them all and see the magic from every angle! ✨

---

## 🚀 Feature Fiesta!

### 1. 🎪 Dedicated Role Portals - *Choose Your Adventure!*

* **🌈 Citizen Portal**: A magical multi-step journey! Submit applications with dynamic technical specification forms, upload documents with a smile, and track your status in real-time. It's like watching your favorite show, but it's YOUR application! 📺
* **⚡ LMO Portal**: The command center! Triage dashboards that feel like mission control, jurisdiction assignment that's smoother than butter, approval workflows that actually flow, and digital certificate signing that makes you feel like a boss! 🖊️
* **📱 Field Officer (FO) Portal**: Your mobile-responsive sidekick! On-site inspections become a breeze with statutory error calculation, seal numbering that feels like stamping victory, and test observations on the go! 🏃‍♂️
* **🔬 GATC Lab Portal**: Where science meets efficiency! Queue management for high-capacity instruments (water meters, fuel dispensers, flow meters), test reports that write themselves, and verification certificates that sparkle! ✨
* **👑 Admin Portal**: The throne room! Executive analytics that tell stories, appointment registries that organize chaos, comprehensive audit logs that remember everything, and a 1-click test database reset that's as satisfying as popping bubble wrap! 🎈

### 2. 🧠 Statutory Metrology Rules Engine - *The Brain Behind the Beauty!*

* Pre-configured with **27 legal metrology categories** covering weighing instruments, measuring instruments, and flow dispensers! That's 27 ways we make sure fairness wins! 🏆
* Dynamically resolves statutory authority eligibility (LMO vs. GATC), maximum permissible error (MPE) thresholds, and validity renewal cycles (12, 24, or 60 months). Smart AND legal! 🎓

### 3. ☁️ Cloud PostgreSQL & Permanent Document Persistence - *Your Files' Forever Home!*

* Powered by **Neon Serverless PostgreSQL** - zero data loss, zero worries, infinite peace of mind! 🧘
* Integrated `DocumentContent` table that securely stores and streams uploaded invoices, calibration reports, and photos directly from the cloud database. Say goodbye to file loss on ephemeral containers! 👋

### 4. 🔐 Digital Certificates & QR Code Verification - *Trust You Can Scan!*

* Cryptographically verifiable digital certificates with SHA-256 seal numbers! Fort Knox would be jealous! 🏰
* Embedded QR codes that dynamically link to public verification endpoints. Instant field auditing = instant gratification! ⚡

### 5. 🎨 Modernized Executive UI - *Eye Candy with Purpose!*

* Built on Material UI (MUI Grid v2) with curated status badges, responsive form cards, and statutory workflow guidance. So pretty, you'll want to take screenshots! 📸

---

## 🛠️ The Tech Toolbox - *Our Secret Sauce!*

| Layer | Magic Ingredients |
| :--- | :--- |
| **🎨 Frontend** | React 18, React Router v6, Material UI (MUI v5/v6 Grid v2), Lucide Icons |
| **⚙️ Backend** | Node.js 20+, Express.js 5, Prisma ORM 5.22 |
| **🗄️ Database** | PostgreSQL (Neon Cloud Serverless) |
| **🛡️ Security & Auth** | Argon2id password hashing, HTTP-only JWT cookies, OWASP security headers, input sanitization, rate limiting |
| **🚀 CI/CD** | GitHub Actions pipeline with automated PostgreSQL service containers |

---

## 🏗️ Local Development - *Let's Build Something Beautiful!*

### 🎯 Prerequisites - *Gather Your Tools!*
* **Node.js**: v20 or higher (the engine of our dreams!)
* **npm**: v9 or higher (the package whisperer)
* **PostgreSQL**: Local instance OR a free [Neon](https://neon.tech) cloud database URL (your data's happy place)

### 1️⃣ Backend Configuration - *The Foundation!*
```bash
# Navigate to backend directory
cd backend

# Install dependencies (watch the magic happen!)
npm ci

# Configure environment variables
cp .env.example .env
```

Edit `backend/.env` with your PostgreSQL database URL and a strong JWT secret:
```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5001
DATABASE_URL="postgresql://user:password@localhost:5432/sih26036"
JWT_SECRET="your-secure-jwt-secret-key-min-32-chars"
```

Initialize database schema and seed statutory legal metrology rules:
```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed 27 metrology categories and demo portal accounts
npm run seed:rules

# Start backend server (lift-off in 3... 2... 1...)
npm run dev
```
🎉 The backend will soar at `http://localhost:5001`!

### 2️⃣ Frontend Configuration - *The Face of Wonder!*
In a separate terminal (because parallel universes are cool):
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm ci

# Start frontend development server
npm start
```
✨ The frontend will bloom at `http://localhost:3000` with automated proxying to port 5001!

---

## 🧪 Testing & Quality Assurance - *Our Safety Net of Awesome!*

The system includes comprehensive automated test suites that work harder than a caffeinated squirrel! 🐿️

```bash
cd backend

# 1. Run statutory rules engine & QR environment regression tests
npm test

# 2. Run OWASP security & access control audit suite
npm run test:security

# 3. Run end-to-end QA flow test
npm run test:e2e
```

To test the frontend production bundle:
```bash
cd frontend
npm test -- --watchAll=false
npm run build
```

> 🎯 **Goal:** 100% confidence, 0% surprises!

---

## 🔒 Security & Defensive Engineering - *Fort Knox Mode: ON!*

* **🔐 Authentication & Session Security**: Argon2id password derivation with unique per-user salts; credentials delivered via secure, HTTP-only JWT cookies. Your secrets are safer than a dragon's hoard! 🐉
* **🚫 IDOR Protection**: Strict object-level ownership checks preventing cross-user and cross-task document or application access. No peeking allowed! 👀❌
* **💾 Ephemeral Disk Defense**: Uploaded documents are automatically persisted into PostgreSQL and dynamically re-cached if container filesystems reset. Your files have nine lives! 🐱
* **🧹 Input Sanitization**: Whitelisted MIME types, file signature validation, anti-directory traversal checks, and express-rate-limit defenses against Denial of Service (DoS). We filter out the bad stuff so you don't have to! 🛡️

---

## 📜 License & Credits - *The Fine Print (But Make It Fun)!*

This project is licensed under the **ISC License** - because sharing is caring! 💝

Developed with ❤️, ☕, and an unhealthy amount of enthusiasm for the **Smart India Hackathon (SIH 2026)**!

---

> 🌈 **Remember:** Every weight verified, every measurement certified, every QR code scanned - we're building a fairer, more precise world, one digital certificate at a time! 🌍✨

**Now go forth and verify!** 🚀
