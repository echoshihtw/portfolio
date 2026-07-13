
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

export const summary = "Full-stack engineer who takes products from an empty repo to a shipped app — frontend, backend, and the pipeline that deploys them. I find the real problem and ship the fix, across web, mobile, and infrastructure.";

export const experience: ExperienceItem[] = [
  {
    "company": "Lockerbie Technology",
    "role": "**Full-Stack Engineer — Internal Platform Development**",
    "date": "Taipei, Taiwan · Dec 2024 – Present",
    "highlights": [
      "Own an internal team project-management platform end-to-end as one of two engineers — the **Next.js / React (TypeScript)** frontend and the **FastAPI / Python** backend.",
      "Architected an **event-driven modular monolith** (bounded modules over a **RabbitMQ** bus with a dedicated consumer) on **ArangoDB**, with **role- and policy-based access control** and secure auth (JWT, Argon2).",
      "Re-architected deploys to **build-once, promote-by-digest** (GitHub Actions, **GHCR**), cutting redundant rebuilds from **3 builds to 1** so production ships the exact image tested in staging.",
      "Built the **Next.js frontend** (MUI, TanStack Query, Zustand) with dual client/vendor views and a **force-graph** admin dashboard; tested with **Vitest, React Testing Library, and pytest**."
    ]
  },
  {
    "company": "SPIN.FASHION by Lablaco",
    "role": "**Software Engineer · Founding Partner**",
    "date": "Singapore · Remote · Aug 2024 – Oct 2024",
    "highlights": [
      "Resolved a **critical macOS Electron release blocker** (code-signing, **Apple notarization**, auto-update) to ship the desktop app, and authored the team's release runbook — working remotely across time zones."
    ]
  },
  {
    "company": "Find Recruiter (HR Tech Startup)",
    "role": "**Software Engineer**",
    "date": "Taipei, Taiwan · Aug 2022 – May 2024",
    "highlights": [
      "Led frontend development of a **B2B recruitment / ATS platform** (**React 18**, ~150k LOC) used by employers and agencies.",
      "Shipped multiple **OpenAI / ChatGPT features** — a JD generator, AI interview-plan generation, and a CV standardiser.",
      "Drove an incremental **JavaScript to TypeScript** migration (~30% fewer runtime bugs); built 100+ reusable components with **Redux Toolkit and redux-saga** and **Firebase** realtime."
    ]
  },
  {
    "company": "Independent Engineering Work",
    "role": "**Software Engineer** · Remote · 2020 – Present",
    "date": "",
    "highlights": [
      "Built the **Next.js frontend for a Bitcoin coin-selection wallet** (*echology*) alongside a **BDK core maintainer** — UTXO coin-control and fee/waste metrics — plus full-stack apps across fintech and research."
    ]
  }
];

export const skills: SkillGroup[] = [
  {
    "category": "**Frontend** — React · Next.js · TypeScript · MUI · Tailwind · TanStack Query · Zustand",
    "items": [
      "**Backend & Data** — FastAPI",
      "Python",
      "Node.js",
      "Postgres",
      "ArangoDB",
      "Supabase",
      "RabbitMQ",
      "SQLite",
      "**Mobile & Infra** — Flutter",
      "Dart",
      "Riverpod",
      "Docker",
      "GitHub Actions",
      "GHCR",
      "AWS",
      "**Testing** — Vitest",
      "React Testing Library",
      "Jest",
      "pytest"
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
