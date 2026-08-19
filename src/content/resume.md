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

Product engineer who owns problems end to end — mostly systems of record: project platforms, applicant tracking, client histories. I work out what to build, build it, ship it, and keep it running. **React**, **TypeScript** and **Node.js**, with **Python** and **FastAPI** behind them.

# Experience

## Lockerbie Technology (Musaeum Ltd, UK group)

Full-Stack Engineer — Internal Platform · _Taipei, Taiwan · Dec 2024 – Jul 2026_

- Built and ran an early-stage internal project-management platform for the **UK construction sector**, working to **ISO 19650** information-management principles. One of two engineers, sole author of the **Next.js / TypeScript** frontend and its **UI patterns**.
- Refactored the backend into the team's **event-driven modular monolith**, with modules communicating over **RabbitMQ** instead of importing each other, and set up the module template the team builds against. The direction was the team's; the refactor was mine, with **RabbitMQ** and **ArangoDB** new to me.
- Given a requirement that layers stay independent, chose **Next.js App Router** and introduced a **BFF security boundary** with server-managed authentication and centralised **CSRF** protection, keeping backend credentials out of browser JavaScript.
- Designed the platform's authorisation model — organisation-level and project-scoped roles resolved into capability flags, so services never reimplement access logic. Tested with **Vitest**, **React Testing Library** and **pytest**.
- Requirements arrived as requests, so I wrote the product specification the team built against, and held scope with a feature freeze until the first phase shipped.
- Brought a new engineer into the codebase through daily pairing, from first contribution to shipping independently within two months.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Founding partner on **SPIN Connect**, the in-store desktop app. Cleared the **macOS code-signing, notarisation and auto-update** work blocking release, shipped the **Electron** app, and wrote the deployment steps down for the team.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Took over frontend delivery on a **B2B and B2C recruitment and ATS platform** in **React and TypeScript** — two-engineer product team, reporting to the CTO — as the work was handed to me across the two years. Migrated features to **TypeScript** as part of an incremental codebase-wide migration, and authored around 100 of its shared components.
- Wrote the **Server-Sent Events** channel the frontend consumed AI-generated drafts through.
- Built job-opening filtering on the careers pages end to end — filter bar, sorting, the employer settings behind it, and a shared dropdown component with tests.

## Independent / Freelance Engineering

Product Engineer · _Remote · 2020 – Present_

- Built the **Next.js frontend for a Bitcoin coin-selection research tool** with a **BDK core maintainer**, alongside contract product work in fintech, e-commerce and research.

# Projects

<!-- generated from src/content/projects.config.ts — projects with a resumeLine -->

# Skills

<!-- generated from src/content/skills.config.ts — items marked site-only are omitted -->

# Education

B.A. Italian Language and Culture — Fu Jen Catholic University, Taipei · 2018  
**Languages** — Mandarin, Taiwanese (native) · English (working language, all roles) · Italian
