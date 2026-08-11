import type { Projects } from "../lib/types/types.js";

export const projectsConfig: Projects = [
  {
    name: "Clio",
    subtitle: "Salon Operations — in daily use",
    description:
      "A bilingual (zh-TW / English) salon operations app, built for a salon in Tainan and in daily use there since May 2025 — two designers, 603 clients, 2,694 records, with client history entered back to September 2024. Clients, service records, and monthly revenue in one place.",
    href: "https://cliohq.app",
    stack: [
      "React 19",
      "TypeScript",
      "Supabase",
      "Postgres",
      "TanStack Query",
      "Tailwind",
    ],
    highlights: [
      "Audited my own RLS policies and closed a privilege-escalation path",
      "Shipped a permission change without silently revoking staff access",
      "Only the api layer may touch the database — enforced by a contract test",
      "Works offline read-only: cached queries rehydrate, mutations pause",
    ],
    resumeLine:
      "Bilingual **React/Supabase** salon operations product in daily use at a Tainan salon **since May 2025**, supporting 603 clients and 2,694 service records with **Postgres RLS** and per-member permissions.",
    featured: true,
    linkLabel: "Live →",
    status: "Live",
  },
  {
    name: "Runway",
    subtitle: "Personal Financial Runway App",
    description:
      "A mobile app that answers one question: how long can your money last? Built solo in Flutter — a Clean-Architecture monorepo, AES-256 encrypted on-device storage, and a survival model that takes the worse of actual spending and budget. In development: running on Android, iOS distribution in progress.",
    href: "#",
    now: "Working through iOS distribution, then one-time purchase via RevenueCat.",
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLCipher"],
    highlights: [
      "Clean Architecture / DDD across a Melos monorepo",
      "AES-256 encrypted local storage (Drift + SQLCipher)",
      "7-language localization, 6 currencies",
      "Release workflows written for TestFlight and Play (not yet cut)",
    ],
    resumeLine:
      "Personal financial-runway app in **Flutter**: **Clean Architecture** across a Melos monorepo, **SQLCipher**-encrypted local storage, 7-language localisation. In development — running on Android, iOS distribution in progress.",
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
];
