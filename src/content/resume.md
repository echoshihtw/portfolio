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
% Two deliberate lines: availability first, then contacts. As one line it wrapped
% and left the portfolio URL stranded on its own.
{\small\color{muted}Taipei, Taiwan (UTC+8) · Remote — APAC hours or async}\\[2pt]
{\small\color{muted}echoshihtw@gmail.com · linkedin.com/in/echoshihtw · github.com/echoshihtw · echoshihtw.github.io/portfolio}
\vspace{4pt}
```

# Summary

Product-minded full-stack engineer who turns ambiguous operational needs into shipped software — React/Next.js frontends, FastAPI services, data models, testing, and CI/CD. Uses controlled AI-assisted workflows, keeping architecture and verification explicit.

# Experience

## Lockerbie Technology (Musaeum Ltd, UK group)

**Full-Stack Engineer — Internal Platform** · Taipei, Taiwan · Dec 2024 – Present

- Built and operate a project-management platform for the **UK construction sector**, connecting client organisations and vendor contractors through a project to tender to quotation lifecycle governed by **ISO 19650** principles. In production with ~5 users across 10 projects, as one of two engineers — sole author of the **Next.js / TypeScript** frontend, plus **FastAPI / Python** services.
- Implemented the team's **event-driven modular monolith** — bounded modules over **RabbitMQ**, project relationships in **ArangoDB** — both new to me, both now in production.
- Given a requirement that layers stay independent, chose **Next.js App Router** and introduced a **BFF trust boundary** so browser clients call only same-origin API routes; kept backend tokens in **HttpOnly cookies** and centralised **CSRF** enforcement for unsafe requests.
- Designed the six-role permission model — org-level **RBAC** plus project-scoped **PBAC** — resolving roles into permissions and frontend capability flags so services don't each reimplement access logic; covered with **Vitest, React Testing Library, and pytest**.
- Wrote the platform's product specification: role model, architecture rules, eight milestones across three phases, exit criteria, and a decision log — and held scope with a feature freeze until Phase 1 shipped.
- Brought a teammate with no software background into the codebase by pairing — 278 co-authored commits — from first contribution to shipping independently within two months.
- Built a local **Claude Code** workflow — reusable skills and automated hooks — to speed implementation and testing, with final verification left to deterministic quality checks.
- Owned the path from laptop to production in both repos: one-command **Makefile** setup, staging/production deploy bundles, multi-stage **Docker** builds with cached layers, and build-once, promote-by-digest releases (**GitHub Actions**, **GHCR**) cutting three environment builds to one.

## SPIN.FASHION by Lablaco

**Full Stack Engineer & Founding Partner** · Singapore · Remote · Aug 2024 – Oct 2024

- Resolved a macOS **Electron code-signing, notarisation, and auto-update** release blocker, then documented the deployment workflow for repeatable releases across a distributed team.

## Find Recruiter

**Software Engineer** · Taipei, Taiwan · Aug 2022 – May 2024

- Led frontend delivery for a **B2B recruitment and ATS platform** in **React and TypeScript**, in a two-engineer product team reporting to the CTO.
- Drove an incremental **JavaScript-to-TypeScript** migration and built **100+ reusable components**, improving consistency and reducing type-related regressions across a large production codebase.

## Independent / Freelance Engineering

**Product Engineer** · Remote · 2020 – Present

- Built products across fintech, research, e-commerce, and creative industries, including the **Next.js frontend for a Bitcoin coin-selection research tool** with a **BDK core maintainer**.

# Projects

**Clio** — _Founder / Product Engineer_ · Bilingual **React/Supabase** salon operations product in daily use at a Tainan salon **since May 2025**, supporting 603 clients and 2,694 service records with **Postgres RLS** and per-member permissions.

**Runway** — _Founder / Product Engineer_ · Personal financial-runway app in **Flutter**: **Clean Architecture** across a Melos monorepo, **SQLCipher**-encrypted local storage, 7-language localisation. In development — running on Android, iOS distribution in progress.

# Skills

**Frontend** — React · Next.js · TypeScript · TanStack Query · Zustand · Redux · MUI · Tailwind CSS · Flutter · Dart  
**Backend & Data** — FastAPI · Python · Node.js · Postgres · ArangoDB · Supabase · RabbitMQ · SQLite  
**Infra & Quality** — Docker · GitHub Actions · GHCR · AWS · Vitest · React Testing Library · pytest · Claude Code  
**Desktop** — Tauri · Electron

# Education

B.A. Italian Language and Culture — Fu Jen Catholic University, Taipei · 2019
