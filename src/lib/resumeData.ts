
import type { Projects } from "$lib/types/types";

type ExperienceItem = {
  company: string;
  role: string;
  date: string;
  highlights: string[];
};

type SkillGroup = {
  category: string;
  items: string[];
};

export const summary = "Full-stack engineer with a strong focus on frontend systems, specialising in **React, Next.js, and TypeScript**, and comfortable owning the backend — **FastAPI, event-driven services, and CI/CD** — end to end.\n\nExperienced building production applications from the UI and complex state down to backend APIs, data modeling, testing across the stack, and the deployment pipeline. Recent work spans an **event-driven modular-monolith platform**, a **Supabase-backed multi-tenant web app**, and a **Flutter mobile app shipped to both app stores**.\n\nParticularly interested in **local-first software and data-intensive interfaces**, with an emphasis on building reliable, secure, and user-focused products.\n\n---";

export const experience: ExperienceItem[] = [
  {
    "company": "Lockerbie Technology",
    "role": "**Full-Stack Engineer — Internal Platform Development**",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Building an internal team project-management platform end-to-end as one of two engineers, owning both the **Next.js 15 / React 19 (TypeScript)** frontend and the **FastAPI / Python 3.12** backend.",
      "Architected an **event-driven modular monolith** — bounded modules for auth, organisation, user, project, and project management communicating asynchronously over a **RabbitMQ message bus (aio-pika)** with a dedicated consumer service for background processing.",
      "Modeled the data layer on **ArangoDB (multi-model)**, representing organisational and project relationships as connected graph/document data.",
      "Designed **role- and policy-based access control** — a role→permission/capability model enforced across backend modules and mirrored in the frontend — with secure auth via **JWT (python-jose)** and **Argon2 password hashing**.",
      "Built the **Next.js frontend** (MUI, TanStack Query, Zustand) delivering **dual client/vendor viewpoints** where a single user can act as either, plus a **superadmin dashboard** that visualises project node/edge relationships with **force-graph / Three.js** for at-a-glance oversight and fast cleanup of test data.",
      "Established **full-stack quality gates** — Vitest + React Testing Library + **Playwright E2E** + MSW (frontend), **pytest / pytest-asyncio** (backend), with **mypy (strict)** and **Ruff**.",
      "Re-architected the deploy pipeline to **build-once, promote-by-digest** (GitHub Actions → **GHCR**): images build a single time on staging (multi-arch amd64/arm64), then production and tagged (`v*`) releases **re-tag the exact digest** instead of rebuilding — cutting a release path that previously rebuilt **up to 3×** down to one build, reducing CI time and GitHub storage while guaranteeing prod ships the byte-identical image validated in staging.",
      "Hardened the release flow with **least-privilege job permissions, buildx layer caching, automated cache cleanup, and conventional-commit / tag-driven versioning**, plus auto-generated staging→production promotion PRs."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "**Software Engineer · Founding Partner**",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved a **critical macOS Electron release blocker** — fixing code-signing, **Apple notarization, and S3-based auto-update** — to unblock desktop distribution of the in-store app (React / Redux-Saga).",
      "Authored a **release runbook** for the signed and notarized macOS + Windows builds, adopted as the team’s deployment standard.",
      "Improved **React frontend performance and stability** across the Electron renderer.",
      "Delivered remotely across time zones as a founding partner on a small distributed team."
    ]
  },
  {
    "company": "Find Recruiter (HR Tech Startup)",
    "role": "**Software Engineer**",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "One of two engineers on a **B2B recruitment / applicant-tracking platform** (React 18, ~150k LOC), leading frontend development across employer and recruiter workflows.",
      "Built and shipped **multiple OpenAI / ChatGPT-powered features** — a **JD Generator**, AI interview-plan generation, and a CV standardiser — orchestrating server-side LLM calls from the frontend.",
      "Drove an **incremental JavaScript → TypeScript migration** of a large production codebase, reducing runtime bugs by ~30%.",
      "Developed **100+ reusable UI components** with **Redux Toolkit + redux-saga** state management and **Firebase-backed realtime chat and notifications**.",
      "Shipped a **5-language internationalised** product deployed via GitHub Actions CI/CD to **GCP Cloud Run and AWS**."
    ]
  },
  {
    "company": "Independent Engineering Work",
    "role": "**Software Engineer**",
    "date": "Remote · 2020 – Present",
    "highlights": [
      "Built full-stack applications across fintech, e-commerce, and research domains, adapting system design to varied product requirements.",
      "Built the **Next.js / React frontend for a Bitcoin coin-selection demo wallet** (*echology*), in collaboration with a **BDK core maintainer** — implementing UTXO coin-control selection, spend-scenario and fee-rate configuration, and surfacing coin-selection metrics (waste, fee, feerate deviation)."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "### Frontend",
    "items": [
      "React",
      "Next.js",
      "TypeScript",
      "MUI",
      "TailwindCSS"
    ]
  },
  {
    "category": "Mobile",
    "items": [
      "Flutter",
      "Dart",
      "Riverpod",
      "SQLCipher"
    ]
  },
  {
    "category": "Backend",
    "items": [
      "FastAPI",
      "Python",
      "REST APIs",
      "Pydantic",
      "Node.js",
      "Supabase"
    ]
  },
  {
    "category": "State & Data",
    "items": [
      "TanStack Query",
      "Zustand",
      "Redux",
      "Redux-Saga",
      "ArangoDB",
      "SQLite",
      "Drift",
      "Firebase",
      "RabbitMQ"
    ]
  },
  {
    "category": "Testing",
    "items": [
      "Vitest",
      "Playwright",
      "React Testing Library",
      "MSW",
      "pytest",
      "Jest"
    ]
  },
  {
    "category": "Infrastructure & DevOps",
    "items": [
      "Docker",
      "Docker Compose",
      "GHCR",
      "GitHub Actions",
      "buildx",
      "Linux (Ubuntu)",
      "AWS",
      "Vercel"
    ]
  },
  {
    "category": "Build & Automation",
    "items": [
      "Makefile",
      "Poetry",
      "semantic versioning (conventional commits)"
    ]
  },
  {
    "category": "Languages & Runtimes",
    "items": [
      "Python",
      "Electron",
      "Tauri (desktop packaging)",
      "---"
    ]
  }
];

export const projects: Projects = [
  {
    "name": "Cosmora",
    "subtitle": "Salon Management Platform",
    "description": "A bilingual, multi-tenant salon-management application for independent salon owners — managing client records, visit history, and financial workflows. Built with a domain-driven architecture on Supabase (Postgres) with row-level security and per-member permissions, and packaged for desktop with Tauri.",
    "href": "https://cosmora-lab.vercel.app",
    "stack": [
      "React",
      "TypeScript",
      "Supabase",
      "Postgres",
      "Tauri",
      "TanStack Query"
    ],
    "highlights": [
      "Domain-driven architecture with test-enforced import boundaries",
      "Postgres row-level security + per-member permission model",
      "Offline-capable read layer via cached hydration",
      "Semantic-release CI with coverage gates"
    ],
    "featured": true,
    "linkLabel": "In Progress →",
    "status": "In Progress"
  },
  {
    "name": "Runway",
    "subtitle": "Personal Financial Runway App",
    "description": "A cross-platform mobile app (iOS + Android) that calculates how long your savings will last. Built solo in Flutter with a Clean-Architecture monorepo, AES-256 encrypted on-device storage, and automated releases to TestFlight and Google Play.",
    "href": "#",
    "stack": [
      "Flutter",
      "Dart",
      "Riverpod",
      "Drift",
      "SQLCipher"
    ],
    "highlights": [
      "Clean Architecture / DDD across a Melos monorepo",
      "AES-256 encrypted local storage (Drift + SQLCipher)",
      "In-app purchases + 7-language localization",
      "CI/CD releasing signed builds to both app stores"
    ],
    "featured": true,
    "linkLabel": "Coming Soon →",
    "status": "In Progress"
  },
  {
    "name": "Echology",
    "subtitle": "Bitcoin Coin-Selection Demo Wallet",
    "href": "https://github.com/evanlinjin/echology",
    "file": "assets/echology.png",
    "description": "The Next.js frontend for a Bitcoin coin-selection demo wallet, built in collaboration with a BDK (Bitcoin Dev Kit) core maintainer. Provides UTXO coin-control selection, spend-scenario and fee-rate configuration, and surfaces coin-selection metrics (waste, fee, feerate deviation) as structured tables.",
    "stack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "highlights": [
      "Built the coin-control UI for UTXO selection",
      "Spend-scenario and fee-rate configuration",
      "Surfaced selection metrics (waste, fee, feerate deviation)"
    ],
    "linkLabel": "Source Code →",
    "status": "Archived"
  },
  {
    "name": "Crypto Price Ticker",
    "subtitle": "Real-Time Crypto Data Visualization",
    "href": "https://github.com/echoshihtw/crypto-price-ticker",
    "description": "A full-stack real-time cryptocurrency price tracker with live chart updates using WebSockets. Built to handle streaming data and dynamic UI updates.",
    "stack": [
      "React",
      "TypeScript",
      "Socket.io"
    ],
    "highlights": [
      "Real-time data streaming with WebSockets",
      "Dynamic chart rendering",
      "Full-stack data flow handling"
    ],
    "linkLabel": "Source Code →",
    "status": "Archived"
  },
  {
    "name": "Digital Chaos",
    "subtitle": "Personal Knowledge & Reflection App",
    "description": "A lightweight web app for capturing personal quotes, ideas, and life rules. Focused on fast input, simple organization, and clean UI for daily use.",
    "href": "https://digital-chaos-jzg2.vercel.app",
    "stack": [
      "React",
      "TypeScript",
      "Vercel"
    ],
    "highlights": [
      "Fast input and minimal UI design",
      "Lightweight personal knowledge system",
      "Deployed on Vercel for instant access"
    ],
    "linkLabel": "Live Demo →",
    "status": "Live"
  }
];
