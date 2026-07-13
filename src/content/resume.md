# Chun-Yu (Echo) Shih

**Full-Stack Engineer (Frontend-focused) · React · TypeScript · End-to-End Product Development**

Taipei, Taiwan  
📧 echoshihtw@gmail.com  
🔗 linkedin.com/in/echoshihtw  
🔗 github.com/echoshihtw  
🔗 echoshihtw.github.io/portfolio

---

# Summary

Full-stack engineer with a strong focus on frontend systems, specialising in React and TypeScript.

Experienced in building production applications end-to-end, from designing user interfaces and managing complex state to defining backend APIs, implementing testing across the stack, and structuring system architecture.

Particularly interested in **local-first software and data-intensive interfaces**, with an emphasis on building reliable, scalable, and user-focused products.

---

# Engineering Impact

- **Built and operated production systems end-to-end**, covering frontend (React/Next.js), backend APIs, infrastructure, and deployment.

- **Built scalable frontend systems using React and Next.js**, handling complex workflows, asynchronous data flows, and multi-role state management.

- **Defined backend API requirements and guided implementation**, ensuring reliable integration between frontend systems and backend services.

- **Implemented CI/CD pipelines using GitHub Actions and Makefile-based workflows**, enabling reproducible builds and reliable deployments in Linux-based environments.

- **Designed and built local-first applications managing UI and data persistence (SQLite)**, eliminating backend dependency and enabling offline-first workflows.

- **Delivered AI-powered production features** integrating OpenAI APIs within a live product.

---

# Experience

## Lockerbie Technology

**Full-Stack Engineer — Internal Platform Development**  
Taipei, Taiwan · Dec 2024 – Present

- Building an internal team project-management platform end-to-end as one of two engineers, owning both the **Next.js 15 / React 19 (TypeScript)** frontend and the **FastAPI / Python 3.12** backend.

- Architected an **event-driven modular monolith** — bounded modules for auth, organisation, user, project, and project management communicating asynchronously over a **RabbitMQ message bus (aio-pika)** with a dedicated consumer service for background processing.

- Modeled the data layer on **ArangoDB (multi-model)**, representing organisational and project relationships as connected graph/document data.

- Designed **role- and policy-based access control** — a role→permission/capability model enforced across backend modules and mirrored in the frontend — with secure auth via **JWT (python-jose)** and **Argon2 password hashing**.

- Built the **Next.js frontend** (MUI, TanStack Query, Zustand) delivering **dual client/vendor viewpoints** where a single user can act as either, plus a **superadmin dashboard** that visualises project node/edge relationships with **force-graph / Three.js** for at-a-glance oversight and fast cleanup of test data.

- Established **full-stack quality gates** — Vitest + React Testing Library + **Playwright E2E** + MSW (frontend), **pytest / pytest-asyncio** (backend), with **mypy (strict)** and **Ruff**.

- Re-architected the deploy pipeline to **build-once, promote-by-digest** (GitHub Actions → **GHCR**): images build a single time on staging (multi-arch amd64/arm64), then production and tagged (`v*`) releases **re-tag the exact digest** instead of rebuilding — cutting a release path that previously rebuilt **up to 3×** down to one build, reducing CI time and GitHub storage while guaranteeing prod ships the byte-identical image validated in staging.

- Hardened the release flow with **least-privilege job permissions, buildx layer caching, automated cache cleanup, and conventional-commit / tag-driven versioning**, plus auto-generated staging→production promotion PRs.

---

## SPIN.FASHION by Lablaco

**Software Engineer · Founding Partner**  
Singapore · Remote · Aug 2024 – Oct 2024

- Resolved a **critical macOS Electron release blocker** — fixing code-signing, **Apple notarization, and S3-based auto-update** — to unblock desktop distribution of the in-store app (React / Redux-Saga).

- Authored a **release runbook** for the signed and notarized macOS + Windows builds, adopted as the team’s deployment standard.

- Improved **React frontend performance and stability** across the Electron renderer.

- Delivered remotely across time zones as a founding partner on a small distributed team.

---

## Find Recruiter (HR Tech Startup)

**Software Engineer**  
Taipei, Taiwan · Aug 2022 – May 2024

- One of two engineers on a **B2B recruitment / applicant-tracking platform** (React 18, ~150k LOC), leading frontend development across employer and recruiter workflows.

- Built and shipped **multiple OpenAI / ChatGPT-powered features** — a **JD Generator**, AI interview-plan generation, and a CV standardiser — orchestrating server-side LLM calls from the frontend.

- Drove an **incremental JavaScript → TypeScript migration** of a large production codebase, reducing runtime bugs by ~30%.

- Developed **100+ reusable UI components** with **Redux Toolkit + redux-saga** state management and **Firebase-backed realtime chat and notifications**.

- Shipped a **5-language internationalised** product deployed via GitHub Actions CI/CD to **GCP Cloud Run and AWS**.

---

## Independent Engineering Work

**Software Engineer**  
Remote · 2020 – Present

- Built full-stack applications across fintech, e-commerce, and research domains, adapting system design to varied product requirements.

- Built the **Next.js / React frontend for a Bitcoin coin-selection demo wallet** (*echology*), in collaboration with a **BDK core maintainer** — implementing UTXO coin-control selection, spend-scenario and fee-rate configuration, and surfacing coin-selection metrics (waste, fee, feerate deviation).

---

# Founder & Product Engineering

## Cosmora — Salon Management Platform

**Founder · Full-Stack Product Engineer**  
2024 – Present

_React · TypeScript · Supabase (Postgres) · Tauri (desktop packaging)_

- Built a **bilingual, multi-tenant salon-management application** solo (React 19 + TypeScript), packaged for desktop with Tauri and shipped as a macOS build.

- Designed a **domain-driven frontend architecture** (7 domains, strict `api → provider` import boundaries) with the boundaries **enforced at test time** by a custom static-analysis contract.

- Hardened data security with **Postgres Row-Level Security** scoped to org membership, a **per-member JSONB permission model**, and SECURITY DEFINER RPCs on Supabase.

- Implemented an **offline-capable read layer** (React Query cache hydrated from local storage) and secure staff provisioning via a **Supabase Edge Function**.

- Set up **Jest + React Testing Library with coverage gates** and **semantic-release CI** (automated versioning from conventional commits).

- Now designing the **next-generation version (SalonOS)** — product spec, financial engine, and visit-logging flows in active design.

## Runway — Personal Financial Runway App

**Founder · Mobile Product Engineer**  
2026 – Present

_Flutter · Dart · Riverpod · Drift (SQLite) · SQLCipher_

- Built a **near-production cross-platform mobile app** (iOS + Android) that computes how long a person's savings will last — solo, in **Flutter / Dart**.

- Structured a **Melos monorepo with Clean Architecture / DDD** — a pure-Dart domain layer with compile-time-enforced package boundaries and dedicated logic engines for burn rate, loan amortization, and subscription normalization.

- Implemented **AES-256 encrypted local-first storage** (Drift + SQLCipher, key held in device secure storage) with versioned schema migrations and screenshot/recording blocking.

- Shipped **in-app purchases (RevenueCat)**, **7-language localization**, ~100 unit/integration tests, and **CI/CD releasing signed builds to TestFlight and Google Play** on version tags.

---

# Skills

### Frontend
React · Next.js · TypeScript · MUI · TailwindCSS

### Mobile
Flutter · Dart · Riverpod · SQLCipher

### Backend
FastAPI · Python · REST APIs · Pydantic · Node.js · Supabase

### State & Data
TanStack Query · Zustand · Redux · Redux-Saga · ArangoDB · SQLite · Drift · Firebase · RabbitMQ

### Testing
Vitest · Playwright · React Testing Library · MSW · pytest · Jest

### Infrastructure & DevOps
Docker · Docker Compose · GHCR · GitHub Actions · buildx · Linux (Ubuntu) · AWS · Vercel

### Build & Automation
Makefile · Poetry · semantic versioning (conventional commits)

### Languages & Runtimes
Python · Electron · Tauri (desktop packaging)

---

# Education

**B.A. Italian Language and Culture**  
Fu Jen Catholic University · Taipei · 2019

---

# Certifications

CS50 Cybersecurity — Harvard / edX _(In Progress)_  
Data Science & AI with Python — Preface  
LangChain for JavaScript Developers

---

# Engineering Interests

Local-First Software · Data-Intensive Interfaces · Developer Tooling · Product-Focused Engineering