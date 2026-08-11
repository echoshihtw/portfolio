```{=latex}
{\fontsize{18}{21}\selectfont\bfseries\color{ink}Chun-Yu (Echo) Shih}\\[2pt]
% Headline = professional identity, not job level. Level is settled by the role
% and the interview, so a self-assigned "Senior" only invites an argument before
% anyone has read the experience. Swap per application:
%   Senior Product Engineer vacancy  -> Senior Product Engineer
%   Senior full-stack vacancy        -> Senior Full-Stack Product Engineer
%   General / international          -> Product Engineer   (default)
%   Freelance / contract             -> Independent Product Engineer
{\large Product Engineer · React · TypeScript · Next.js · Product Ownership}\\[3pt]
% Two deliberate lines: availability first, then contacts. As one line it wrapped
% and left the portfolio URL stranded on its own.
{\small\color{muted}Taipei, Taiwan (UTC+8) · Remote — APAC hours or async}\\[1pt]
{\small\color{muted}echoshihtw@gmail.com · linkedin.com/in/echoshihtw · github.com/echoshihtw · echoshihtw.github.io/portfolio}
\vspace{2pt}
```

# Summary

Product engineer working in **React**, **TypeScript** and **FastAPI**. I stay with a problem from interface to deploy — UI, services, data models, tests, **CI/CD** — because the experience breaks at the seams: a slow endpoint, a failed release, an app that gives up when the wifi does.

# Experience

## Lockerbie Technology (Musaeum Ltd, UK group)

Full-Stack Engineer — Internal Platform · _Taipei, Taiwan · Dec 2024 – Present_

- Built and operate a project-management platform for the **UK construction sector**, taking client organisations and vendor contractors through a project-to-tender-to-quotation lifecycle under **ISO 19650**. One of two engineers, sole author of the **Next.js / TypeScript** frontend and its **UI patterns**; ~5 users, 10 projects.
- Refactored the backend into the team's **event-driven modular monolith** — modules that imported each other directly now talk over **RabbitMQ** — and set up the module template so my teammate could add to it without me. My lead chose the direction; the refactor was mine, with **RabbitMQ** and **ArangoDB** new to me.
- Given a requirement that layers stay independent, chose **Next.js App Router** and introduced a **BFF trust boundary**: browser clients call same-origin API routes only, backend tokens stay in **HttpOnly cookies**, and **CSRF** is enforced centrally on unsafe requests.
- Designed the six-role permission model — org-level **RBAC** plus project-scoped **PBAC** — resolving roles into capability flags so services never reimplement access logic. Covered with **Vitest, React Testing Library, and pytest**.
- Wrote the platform's product specification: role model, architecture rules, eight milestones across three phases, exit criteria, and a decision log — and held scope with a feature freeze until Phase 1 shipped.
- Brought a teammate with no software background into the codebase by pairing — 278 co-authored commits — from first contribution to shipping independently within two months.
- Owned the path from laptop to production in both repos: one-command **Makefile** setup, staging/production deploy bundles, multi-stage **Docker** builds with cached layers, and build-once, promote-by-digest releases (**GitHub Actions**, **GHCR**) that cut three environment builds to one.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Resolved a macOS **Electron code-signing, notarisation, and auto-update** release blocker, then documented the deployment workflow for repeatable releases across a distributed team.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Led frontend delivery for a **B2B recruitment and ATS platform** in **React and TypeScript**, in a two-engineer product team reporting to the CTO.
- Consumed a **Server-Sent Events** stream on the frontend so AI-generated drafts rendered as they arrived, rather than after a wait.
- Drove an incremental **JavaScript-to-TypeScript** migration and built **100+ reusable components**, improving consistency and reducing type-related regressions across a large production codebase.

## Independent / Freelance Engineering

Product Engineer · _Remote · 2020 – Present_

- Built products across fintech, research, e-commerce, and creative industries, including the **Next.js frontend for a Bitcoin coin-selection research tool** with a **BDK core maintainer**.

# Projects

<!-- generated from src/content/projects.config.ts — projects with a resumeLine -->

# Skills

**Frontend & UI** — React · Next.js · TypeScript · TanStack Query · Zustand · Redux · MUI · Tailwind CSS · design systems · UI patterns  
**Backend & Data** — FastAPI · Python · Node.js · Postgres · ArangoDB · Supabase · RabbitMQ · SQLite  
**Infra & Quality** — Docker · GitHub Actions · GHCR · AWS · Vitest · React Testing Library · pytest · Claude Code  
**Mobile & Desktop** — Flutter · Dart · Tauri · Electron

# Education

B.A. Italian Language and Culture — Fu Jen Catholic University, Taipei · 2019
