import type { Projects } from "../lib/types/types.js";

export const projectsConfig: Projects = [
  {
    name: "Clio",
    subtitle: "Salon Operations — in daily use",
    description:
      "A bilingual (zh-TW / English) salon operations app, built for a salon in Tainan and used there daily by two designers — 603 clients and 2,694 records, with history entered back to September 2024. Clients, service records, and monthly revenue in one place.",
    href: "https://cosmora-lab.vercel.app",
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
    featured: true,
    linkLabel: "Live →",
    status: "Live",
  },
  {
    name: "Runway",
    subtitle: "Personal Financial Runway App",
    description:
      "A cross-platform mobile app (iOS + Android) that calculates how long your savings will last. Built solo in Flutter with a Clean-Architecture monorepo, AES-256 encrypted on-device storage, and automated releases to TestFlight and Google Play.",
    href: "#",
    now: "Optimizing cross-platform distribution & monetization with RevenueCat (iOS + Android).",
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
];
