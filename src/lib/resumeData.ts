
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

export const summary = "Product-minded full-stack engineer who turns ambiguous operational needs into shipped software. Owns delivery across React/Next.js frontends, FastAPI services, data models, testing, and CI/CD, using controlled AI-assisted workflows to accelerate implementation while keeping architecture and verification explicit.";

export const experience: ExperienceItem[] = [
  {
    "company": "Lockerbie Technology",
    "role": "**Full-Stack Engineer — Internal Platform**",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Built and operate an early-stage internal project-management platform used by ~5 team members across 10 projects, as one of two engineers — **Next.js / TypeScript** frontend, **FastAPI / Python** services, and Docker-based infrastructure.",
      "Implemented the team's **event-driven modular-monolith** architecture, learning **RabbitMQ** and **ArangoDB** to connect bounded modules and model complex project relationships in production.",
      "Chose **Next.js App Router** and introduced a **BFF trust boundary** so browser clients call only same-origin API routes; kept backend tokens in **HttpOnly cookies** and centralised **CSRF** enforcement for unsafe requests.",
      "Built **role- and policy-based access control**, dual client/vendor workflows, and an administrative graph view; covered critical behavior with **Vitest, React Testing Library, and pytest**.",
      "Built a local **Claude Code** workflow using reusable skills and automated hooks to accelerate implementation and testing, while keeping final verification in deterministic quality checks.",
      "Introduced **build-once, promote-by-digest** delivery with **GitHub Actions and GHCR**, reducing three environment rebuilds to one and promoting the exact image tested in staging."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "**Software Engineer / Founding Partner**",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved a macOS **Electron code-signing, notarisation, and auto-update** release blocker, then documented the deployment workflow for repeatable production releases across a distributed team."
    ]
  },
  {
    "company": "Find Recruiter",
    "role": "**Software Engineer**",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "Led frontend delivery for a **B2B recruitment and ATS platform** built with **React and TypeScript**, working in a two-engineer product team and reporting directly to the CTO.",
      "Drove an incremental **JavaScript-to-TypeScript** migration and built **100+ reusable components**, improving consistency and reducing type-related regressions across a large production codebase."
    ]
  },
  {
    "company": "Independent / Freelance Engineering",
    "role": "**Product Engineer**",
    "date": "Remote · 2020 – Present",
    "highlights": [
      "Built product experiences across fintech, research, e-commerce, and creative industries, including the **Next.js frontend for a Bitcoin coin-selection research tool** developed with a **BDK core maintainer**."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "**Frontend** — React · Next.js · TypeScript · TanStack Query · Zustand · Redux · MUI · Tailwind CSS",
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
      "**Mobile / Desktop** — Flutter",
      "Dart",
      "Tauri",
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
    "description": "A cross-platform mobile app (iOS + Android) that calculates how long your savings will last. Built solo in Flutter with a Clean-Architecture monorepo, AES-256 encrypted on-device storage, and automated releases to TestFlight and Google Play.",
    "href": "#",
    "now": "Optimizing cross-platform distribution & monetization with RevenueCat (iOS + Android).",
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
  }
];
