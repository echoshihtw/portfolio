```{=latex}
{\fontsize{18}{21}\selectfont\bfseries\color{ink}Chun-Yu (Echo) Shih}\\[2pt]
% Headline = professional identity, not job level. Level is settled by the role
% and the interview, so a self-assigned "Senior" only invites an argument before
% anyone has read the experience. Swap per application:
%   Senior vacancy                   -> Senior Software Engineer
%   Senior full-stack vacancy        -> Senior Full-Stack Software Engineer
%   General / international          -> Software Engineer   (default)
%   Freelance / contract             -> Independent Software Engineer
{\large Software Engineer · React · TypeScript · Next.js · Product Ownership}\\[3pt]
% Two deliberate lines: availability first, then contacts. As one line it wrapped
% and left the portfolio URL stranded on its own.
{\small\color{muted}Taipei, Taiwan (UTC+8) · Remote — APAC hours or async · Available now}\\[1pt]
{\small\color{muted}echoshihtw@gmail.com · linkedin.com/in/echoshihtw · github.com/echoshihtw · echoshih.com}
\vspace{2pt}
```

# Summary

Software engineer who designs the system, not just the feature — then builds it, ships it, and keeps it running. Mostly systems of record: project platforms, applicant tracking, client histories. **React**, **TypeScript** and **Node.js**, with **Python** and **FastAPI** behind them.

# Experience

## Lockerbie Technology (Musaeum Ltd, UK group)

Full-Stack Engineer — Internal Platform · _Taipei, Taiwan · Dec 2024 – Jul 2026_

- Built and ran an early-stage internal project-management platform for the **UK construction sector**, working to **ISO 19650** information-management principles. One of two engineers, sole author of the **Next.js / TypeScript** frontend and its **UI patterns**.
- Refactored the backend into the team's **event-driven modular monolith**, with modules communicating over **RabbitMQ** instead of importing each other, and set up the module template the team builds against. The direction was the team's; the refactor was mine, with **RabbitMQ** and **ArangoDB** new to me.
- Diagnosed a **RabbitMQ** RPC bug where a stale, uninitialised consumer round-robined into login lookups and failed every user's first attempt; fixed it with a fail-fast DB check before broker registration.
- Packaged deploys into a three-file runner folder — **Docker Compose**, Makefile, env — that pulls the promoted production image from **GHCR**: no source checkout, no dev dependencies, an ~80 MB download instead of a full build.
- Given a requirement that layers stay independent, chose **Next.js App Router** and introduced a **BFF security boundary** with server-managed authentication and centralised **CSRF** protection, keeping backend credentials out of browser JavaScript.
- Designed the platform's authorisation model — organisation-level and project-scoped roles resolved into capability flags, so services never reimplement access logic. Tested with **Vitest**, **React Testing Library** and **pytest**.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Founding partner on the in-store desktop app. Cleared the **macOS code-signing, notarisation and auto-update** work blocking release, shipped the **Electron** app, and wrote the deployment steps down for the team.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Took over frontend delivery on a **B2B and B2C recruitment and ATS platform** in **React and TypeScript** — two-engineer product team, reporting to the CTO — as the work was handed to me across the two years. Migrated features to **TypeScript** as part of an incremental codebase-wide migration, and authored around 100 of its shared components.
- Wrote the **Server-Sent Events** channel the frontend consumed AI-generated drafts through.
- Built job-opening filtering on the careers pages end to end — filter bar, sorting, the employer settings behind it, and a shared dropdown component with tests.

## Independent / Freelance Engineering

Software Engineer · _Remote · 2020 – 2024_

- Built the **Next.js frontend for a Bitcoin coin-selection research tool** with a **BDK core maintainer** (2023), and fixed and optimised a **BigCommerce** storefront for Bdigital (2024).

# Projects

<!-- generated from src/content/projects.config.ts — projects with a resumeLine -->

# Skills

<!-- generated from src/content/skills.config.ts — items marked site-only are omitted -->

# Education

B.A. Italian Language and Culture — Fu Jen Catholic University, Taipei · 2018  
**Languages** — Mandarin, Taiwanese (native) · English (working language, all roles) · Italian
