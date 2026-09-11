```{=latex}
{\fontsize{18}{21}\selectfont\bfseries\color{ink}Chun-Yu (Echo) Shih}\\[2pt]
% Headline = professional identity, not job level. Level is settled by the role
% and the interview, so a self-assigned "Senior" only invites an argument before
% anyone has read the experience. Swap per application:
%   General / international          -> Product Engineer   (default)
%   Posting says "frontend"          -> Frontend Engineer
%   Senior vacancy                   -> Senior Product Engineer
%   Full-stack vacancy               -> Full-Stack Engineer
%   Platform / infra vacancy         -> Software Engineer, Platform & Delivery
%   Freelance / contract             -> Independent Product Engineer
{\large Product Engineer · React · TypeScript · Next.js · Postgres · Docker}\\[3pt]
% Two deliberate lines: availability first, then contacts. As one line it wrapped
% and left the portfolio URL stranded on its own.
{\small\color{muted}Taipei, Taiwan (UTC+8) · Remote · APAC hours or async · Available now}\\[1pt]
{\small\color{muted}echoshihtw@gmail.com · linkedin.com/in/echoshihtw · github.com/echoshihtw · echoshih.com}
\vspace{2pt}
```

# Summary

Product engineer on project platforms, applicant tracking and client histories: the software a business runs on. Sole author of production interfaces in React, TypeScript and Next.js, and of the work underneath them: auth boundaries, permission models, event-driven modules over RabbitMQ, and the release path. Python, Postgres, Docker.

# Experience

## Lockerbie Technology (Musaeum Ltd, UK group)

Full-Stack Engineer, Internal Platform · _Taipei, Taiwan · Dec 2024 – Jul 2026_

- One of two engineers on an early-stage internal platform for the **UK construction sector** (ISO 19650). Owned the Next.js / TypeScript frontend, wrote the specification the team builds against, and held scope to it until the first phase shipped.
- Given a requirement that layers stay independent, chose Next.js App Router with a **BFF security boundary**: server-managed authentication, centralised CSRF protection, no backend credentials in browser JavaScript.
- Designed the platform's **role-based access control** (RBAC): organisation-level and project-scoped roles resolved into capability flags, so services never reimplement access logic.
- Refactored the backend into the team's **event-driven modular monolith**, with modules communicating over RabbitMQ instead of importing each other.
- Set up the module template, the CI quality gate and the **build-once, promote-once release pipeline** the team builds against, and brought a new engineer to shipping independently in two months.
- Diagnosed a **RabbitMQ RPC bug** where a stale, uninitialised consumer round-robined into login lookups and failed every user's first attempt; fixed it with a fail-fast DB check before broker registration.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Founding partner on the in-store desktop app; co-ran the team's scrum with the CTO. Cleared the **macOS code-signing, notarisation and auto-update** work blocking release, shipped the Electron app, and wrote the release steps down.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Led frontend delivery on a **B2B and B2C recruitment and ATS platform** in React and Redux-Saga, on a two-engineer team reporting to the CTO. Migrated it to TypeScript incrementally while it kept shipping, and authored around 100 of its shared components.
- Wrote the **Server-Sent Events** channel the frontend consumed AI-generated drafts through.

## Independent / Freelance Engineering

Software Engineer · _Remote · 2020 – 2024_

- Built the Next.js frontend for a **Bitcoin coin-selection research tool** with a BDK core maintainer, April 2023.
- Bug fixing and UX on a **BigCommerce** storefront for Bdigital, June to August 2024, in vanilla JavaScript, HTML and CSS.

# Projects

<!-- generated from src/content/projects.config.ts: projects with a resume block -->

# Skills

<!-- generated from src/content/skills.config.ts: items marked site-only are omitted -->

# Education

B.A. Italian Language and Culture, Fu Jen Catholic University, Taipei · 2018  
**Languages**: Mandarin, Taiwanese (native) · English (working language, all roles) · Italian
