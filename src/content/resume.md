```{=latex}
{\fontsize{22}{25}\selectfont\bfseries\color{ink}Chun-Yu (Echo) Shih}\\[3pt]
% Headline = professional identity, not job level. Level is settled by the role
% and the interview, so a self-assigned "Senior" only invites an argument before
% anyone has read the experience. Swap per application:
%   Senior Product Engineer vacancy  -> Senior Product Engineer
%   Senior full-stack vacancy        -> Senior Full-Stack Product Engineer
%   General / international          -> Product Engineer   (default)
%   Freelance / contract             -> Independent Product Engineer
{\large Product Engineer · React · TypeScript · FastAPI · Product Ownership}\\[5pt]
{\small\color{muted}Taipei, Taiwan · echoshihtw@gmail.com · linkedin.com/in/echoshihtw · github.com/echoshihtw · echoshihtw.github.io/portfolio}
\vspace{4pt}
```

# Summary

Product-minded full-stack engineer who turns ambiguous operational needs into shipped software. Owns delivery across React/Next.js frontends, FastAPI services, data models, testing, and CI/CD, using controlled AI-assisted workflows to accelerate implementation while keeping architecture and verification explicit.

# Experience

## Lockerbie Technology

**Full-Stack Engineer — Internal Platform**  
Taipei, Taiwan · Dec 2024 – Present

- Built and operate an early-stage internal project-management platform used by ~5 team members across 10 projects, as one of two engineers — **Next.js / TypeScript** frontend, **FastAPI / Python** services, and Docker-based infrastructure.
- Implemented the team's **event-driven modular-monolith** architecture, learning **RabbitMQ** and **ArangoDB** to connect bounded modules and model complex project relationships in production.
- Given a requirement that layers stay independent, chose **Next.js App Router** and introduced a **BFF trust boundary** so browser clients call only same-origin API routes; kept backend tokens in **HttpOnly cookies** and centralised **CSRF** enforcement for unsafe requests.
- Designed the permission layer over the platform's role edges: org-level **RBAC** plus project-scoped **PBAC**, resolving a user's roles into permissions and frontend capability flags so services don't each reimplement access logic. Built dual client/vendor workflows and an administrative graph view; covered with **Vitest, React Testing Library, and pytest**.
- Built a local **Claude Code** workflow using reusable skills and automated hooks to accelerate implementation and testing, while keeping final verification in deterministic quality checks.
- Introduced **build-once, promote-by-digest** delivery with **GitHub Actions and GHCR**, reducing three environment rebuilds to one and promoting the exact image tested in staging.

## SPIN.FASHION by Lablaco

**Full Stack Engineer & Founding Partner**  
Singapore · Remote · Aug 2024 – Oct 2024

- Resolved a macOS **Electron code-signing, notarisation, and auto-update** release blocker, then documented the deployment workflow for repeatable production releases across a distributed team.

## Find Recruiter

**Software Engineer**  
Taipei, Taiwan · Aug 2022 – May 2024

- Led frontend delivery for a **B2B recruitment and ATS platform** built with **React and TypeScript**, working in a two-engineer product team and reporting directly to the CTO.
- Drove an incremental **JavaScript-to-TypeScript** migration and built **100+ reusable components**, improving consistency and reducing type-related regressions across a large production codebase.

## Independent / Freelance Engineering

**Product Engineer**  
Remote · 2020 – Present

- Built product experiences across fintech, research, e-commerce, and creative industries, including the **Next.js frontend for a Bitcoin coin-selection research tool** developed with a **BDK core maintainer**.

# Projects

**Clio** — _Founder / Product Engineer_ · Bilingual **React/Supabase** salon operations product in daily use at a Tainan salon **since May 2025**, supporting 603 clients and 2,694 service records with **Postgres RLS** and per-member permissions.

**Runway** — _Founder / Product Engineer_ · Personal financial-runway app in **Flutter**: **Clean Architecture** across a Melos monorepo, **SQLCipher**-encrypted local storage, 7-language localisation. In development — running on Android, iOS distribution in progress.

# Skills

**Frontend** — React · Next.js · TypeScript · TanStack Query · Zustand · Redux · MUI · Tailwind CSS  
**Backend & Data** — FastAPI · Python · Node.js · Postgres · ArangoDB · Supabase · RabbitMQ · SQLite  
**Infra & Quality** — Docker · GitHub Actions · GHCR · AWS · Vitest · React Testing Library · pytest · Claude Code  
**Mobile / Desktop** — Flutter · Dart · Tauri · Electron

# Education

**B.A. Italian Language and Culture** — Fu Jen Catholic University, Taipei · 2019
