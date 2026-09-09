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

Product engineer on project platforms, applicant tracking and client histories: the software a business actually runs on. Sole author of production interfaces in **React**, **TypeScript** and **Next.js**, and of the work underneath them: auth boundaries, permission models, event-driven modules over **RabbitMQ**, and the release path. **Python**, **Postgres**, **Docker**.

# Experience

## Lockerbie Technology (Musaeum Ltd, UK group)

Full-Stack Engineer, Internal Platform · _Taipei, Taiwan · Dec 2024 – Jul 2026_

- Built and ran an early-stage internal project-management platform for the **UK construction sector**, to **ISO 19650** principles. One of two engineers, sole author of the **Next.js / TypeScript** frontend.
- Refactored the backend into the team's **event-driven modular monolith**, with modules communicating over **RabbitMQ** instead of importing each other, and set up the module template the team builds against. The direction was the team's; the refactor was mine, with **RabbitMQ** and **ArangoDB** new to me.
- Diagnosed a **RabbitMQ** RPC bug where a stale, uninitialised consumer round-robined into login lookups and failed every user's first attempt; fixed it with a fail-fast DB check before broker registration.
- Packaged deploys into a three-file runner folder (**Docker Compose**, Makefile, env) pulling the promoted image from **GHCR**: no source checkout, no dev dependencies, an ~80 MB download rather than a full build.
- Given a requirement that layers stay independent, chose **Next.js App Router** with a **BFF security boundary**: server-managed authentication, centralised **CSRF** protection, no backend credentials in browser JavaScript.
- Designed the platform's authorisation model: organisation-level and project-scoped roles resolved into capability flags, so services never reimplement access logic.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Founding partner on the in-store desktop app. Cleared the **macOS code-signing, notarisation and auto-update** work blocking release, shipped the **Electron** app, and wrote the release steps down.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Took over frontend delivery on a **B2B and B2C recruitment and ATS platform** in **React** and **Redux-Saga**, on a two-engineer team reporting to the CTO. Migrated it to **TypeScript** incrementally, while it kept shipping.
- Wrote the **Server-Sent Events** channel the frontend consumed AI-generated drafts through.

## Independent / Freelance Engineering

Software Engineer · _Remote · 2020 – 2024_

- Built the **Next.js frontend for a Bitcoin coin-selection research tool** with a **BDK core maintainer**. Freelance frontend work across fintech, e-commerce and research.

# Projects

<!-- generated from src/content/projects.config.ts: projects with a resume block -->

# Skills

<!-- generated from src/content/skills.config.ts: items marked site-only are omitted -->

# Education

B.A. Italian Language and Culture, Fu Jen Catholic University, Taipei · 2018  
**Languages**: Mandarin, Taiwanese (native) · English (working language, all roles) · Italian
