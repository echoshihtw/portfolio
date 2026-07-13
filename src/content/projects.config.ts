import type { Projects } from "../lib/types/types.js";

export const projectsConfig: Projects = [
  {
    name: "Cosmora",
    subtitle: "Salon Management Platform",
    description:
      "A bilingual, multi-tenant salon-management application for independent salon owners — managing client records, visit history, and financial workflows. Built with a domain-driven architecture on Supabase (Postgres) with row-level security and per-member permissions, and packaged for desktop with Tauri.",
    href: "https://cosmora-lab.vercel.app",
    stack: ["React", "TypeScript", "Supabase", "Postgres", "Tauri", "TanStack Query"],
    highlights: [
      "Domain-driven architecture with test-enforced import boundaries",
      "Postgres row-level security + per-member permission model",
      "Offline-capable read layer via cached hydration",
      "Semantic-release CI with coverage gates",
    ],
    featured: true,
    linkLabel: "In Progress →",
    status: "In Progress",
  },
  {
    name: "Runway",
    subtitle: "Personal Financial Runway App",
    description:
      "A cross-platform mobile app (iOS + Android) that calculates how long your savings will last. Built solo in Flutter with a Clean-Architecture monorepo, AES-256 encrypted on-device storage, and automated releases to TestFlight and Google Play.",
    href: "#",
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLCipher"],
    highlights: [
      "Clean Architecture / DDD across a Melos monorepo",
      "AES-256 encrypted local storage (Drift + SQLCipher)",
      "In-app purchases + 7-language localization",
      "CI/CD releasing signed builds to both app stores",
    ],
    featured: true,
    linkLabel: "Coming Soon →",
    status: "In Progress",
  },
  {
    name: "Echology",
    subtitle: "Bitcoin Coin-Selection Demo Wallet",
    href: "https://github.com/evanlinjin/echology",
    file: "assets/echology.png",
    description:
      "The Next.js frontend for a Bitcoin coin-selection demo wallet, built in collaboration with a BDK (Bitcoin Dev Kit) core maintainer. Provides UTXO coin-control selection, spend-scenario and fee-rate configuration, and surfaces coin-selection metrics (waste, fee, feerate deviation) as structured tables.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Built the coin-control UI for UTXO selection",
      "Spend-scenario and fee-rate configuration",
      "Surfaced selection metrics (waste, fee, feerate deviation)",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
  {
    name: "Crypto Price Ticker",
    subtitle: "Real-Time Crypto Data Visualization",
    href: "https://github.com/echoshihtw/crypto-price-ticker",
    description:
      "A full-stack real-time cryptocurrency price tracker with live chart updates using WebSockets. Built to handle streaming data and dynamic UI updates.",
    stack: ["React", "TypeScript", "Socket.io"],
    highlights: [
      "Real-time data streaming with WebSockets",
      "Dynamic chart rendering",
      "Full-stack data flow handling",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
  {
    name: "Digital Chaos",
    subtitle: "Personal Knowledge & Reflection App",
    description:
      "A lightweight web app for capturing personal quotes, ideas, and life rules. Focused on fast input, simple organization, and clean UI for daily use.",
    href: "https://digital-chaos-jzg2.vercel.app",
    stack: ["React", "TypeScript", "Vercel"],
    highlights: [
      "Fast input and minimal UI design",
      "Lightweight personal knowledge system",
      "Deployed on Vercel for instant access",
    ],
    linkLabel: "Live Demo →",
    status: "Live",
  },
];
