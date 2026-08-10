
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

export const summary = "Product-minded full-stack engineer who turns ambiguous operational needs into shipped software — React/Next.js frontends, FastAPI services, data models, testing, and CI/CD. Uses controlled AI-assisted workflows, keeping architecture and verification explicit.";

export const experience: ExperienceItem[] = [
  {
    "company": "Lockerbie Technology (Musaeum Ltd, UK group)",
    "role": "**Full-Stack Engineer — Internal Platform**",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Built and operate a project-management platform for the **UK construction sector**, connecting client organisations and vendor contractors through a project to tender to quotation lifecycle governed by **ISO 19650** principles. In production with ~5 users across 10 projects, as one of two engineers — sole author of the **Next.js / TypeScript** frontend, plus **FastAPI / Python** services.",
      "Implemented the team's **event-driven modular monolith** — bounded modules over **RabbitMQ**, project relationships in **ArangoDB** — both new to me, both now in production.",
      "Given a requirement that layers stay independent, chose **Next.js App Router** and introduced a **BFF trust boundary** so browser clients call only same-origin API routes; kept backend tokens in **HttpOnly cookies** and centralised **CSRF** enforcement for unsafe requests.",
      "Designed the six-role permission model — org-level **RBAC** plus project-scoped **PBAC** — resolving roles into permissions and frontend capability flags so services don't each reimplement access logic; covered with **Vitest, React Testing Library, and pytest**.",
      "Wrote the platform's product specification: role model, architecture rules, eight milestones across three phases, exit criteria, and a decision log — and held scope with a feature freeze until Phase 1 shipped.",
      "Brought a teammate with no software background into the codebase by pairing — 278 co-authored commits — from first contribution to shipping independently within two months.",
      "Built a local **Claude Code** workflow — reusable skills and automated hooks — to speed implementation and testing, with final verification left to deterministic quality checks.",
      "Owned the path from laptop to production in both repos: one-command **Makefile** setup, staging/production deploy bundles, multi-stage **Docker** builds with cached layers, and build-once, promote-by-digest releases (**GitHub Actions**, **GHCR**) cutting three environment builds to one."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "**Full Stack Engineer & Founding Partner**",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved a macOS **Electron code-signing, notarisation, and auto-update** release blocker, then documented the deployment workflow for repeatable releases across a distributed team."
    ]
  },
  {
    "company": "Find Recruiter",
    "role": "**Software Engineer**",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "Led frontend delivery for a **B2B recruitment and ATS platform** in **React and TypeScript**, in a two-engineer product team reporting to the CTO.",
      "Drove an incremental **JavaScript-to-TypeScript** migration and built **100+ reusable components**, improving consistency and reducing type-related regressions across a large production codebase."
    ]
  },
  {
    "company": "Independent / Freelance Engineering",
    "role": "**Product Engineer**",
    "date": "Remote · 2020 – Present",
    "highlights": [
      "Built products across fintech, research, e-commerce, and creative industries, including the **Next.js frontend for a Bitcoin coin-selection research tool** with a **BDK core maintainer**."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "**Frontend** — React · Next.js · TypeScript · TanStack Query · Zustand · Redux · MUI · Tailwind CSS · Flutter · Dart",
    "items": [
      "**Backend & Data** — FastAPI",
      "Python",
      "Node.js",
      "Postgres",
      "ArangoDB",
      "Supabase",
      "RabbitMQ",
      "SQLite",
      "**Infra & Quality** — Docker",
      "GitHub Actions",
      "GHCR",
      "AWS",
      "Vitest",
      "React Testing Library",
      "pytest",
      "Claude Code",
      "**Desktop** — Tauri",
      "Electron"
    ]
  }
];

export const projects: Projects = [
  {
    "name": "Clio",
    "subtitle": "Salon Operations — in daily use",
    "description": "A bilingual (zh-TW / English) salon operations app, built for a salon in Tainan and in daily use there since May 2025 — two designers, 603 clients, 2,694 records, with client history entered back to September 2024. Clients, service records, and monthly revenue in one place.",
    "href": "https://cliohq.app",
    "stack": [
      "React 19",
      "TypeScript",
      "Supabase",
      "Postgres",
      "TanStack Query",
      "Tailwind"
    ],
    "highlights": [
      "Audited my own RLS policies and closed a privilege-escalation path",
      "Shipped a permission change without silently revoking staff access",
      "Only the api layer may touch the database — enforced by a contract test",
      "Works offline read-only: cached queries rehydrate, mutations pause"
    ],
    "featured": true,
    "linkLabel": "Live →",
    "status": "Live"
  },
  {
    "name": "Runway",
    "subtitle": "Personal Financial Runway App",
    "description": "A mobile app that answers one question: how long can your money last? Built solo in Flutter — a Clean-Architecture monorepo, AES-256 encrypted on-device storage, and a survival model that takes the worse of actual spending and budget. In development: running on Android, iOS distribution in progress.",
    "href": "#",
    "now": "Working through iOS distribution, then one-time purchase via RevenueCat.",
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
      "7-language localization, 6 currencies",
      "Release workflows written for TestFlight and Play (not yet cut)"
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
  }
];
