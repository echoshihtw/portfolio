import type { Projects } from "../lib/types/types.js";

// Each card answers: what problem existed, what I decided, how I know it works.
// Not a stack inventory — the tech is listed in `stack` below each card, so the
// highlights can carry judgment instead of tool names.
export const projectsConfig: Projects = [
  {
    name: "Clio",
    subtitle: "Salon operations software, in daily use at a Tainan salon since May 2025",
    why: "A friend who runs a salon lost her hard drive, and years of client records went with it. She had looked at salon software before and found all of it too complicated — so the problem was never a missing feature. She needed the two minutes before a client sits down: who they are, what was done last time, what it cost.",
    result:
      "In daily use at a salon in Tainan since May 2025 — two designers, 603 clients, 2,694 service records, with history entered back to September 2024. The owner typed a year of past appointments in by hand, which is not something people do for software they are trialling.",
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
      "Salons are isolated in the database, not by the app remembering to filter — I audited my own policies after launch and closed a path that let an owner take over another salon",
      "Tightened permission defaults without locking out existing staff: the migration writes intended values before the code stops assuming them",
      "Only the api layer may reach the database, and a test fails the build if anything else imports it",
      "The salon has patchy wifi, so reads work offline from cache and writes wait rather than failing silently",
      "Records live in a hosted database, not on a machine that can die — the failure that started this cannot repeat",
    ],
    resumeLine:
      "Bilingual **React/Supabase** salon operations product in daily use at a Tainan salon **since May 2025**, supporting 603 clients and 2,694 service records with **Postgres RLS** and per-member permissions.",
    featured: true,
    linkLabel: "Live →",
    status: "Live",
  },
  {
    name: "Runway",
    subtitle: "A runway tracker for people living off savings — how long can your money last?",
    why: "Budget apps tell you where your money went. Nobody tells you how long you have — which is the only number that matters when you are between jobs, studying, or bootstrapping something.",
    result:
      "Running on Android, in seven languages and six currencies. Built solo. iOS distribution is in progress: the release workflows exist but no tag has been cut, so nothing is on TestFlight or Play yet.",
    href: "#",
    shots: [
      {
        src: "assets/runway/dashboard.png",
        alt: "Runway dashboard: 12 months remaining, caution state, cash and run-out date",
      },
      {
        src: "assets/runway/ledger.png",
        alt: "Runway ledger: opening balance, income and expenses for the month",
      },
      {
        src: "assets/runway/subscriptions.png",
        alt: "Runway subscriptions: monthly and yearly totals with per-item cadence",
      },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLCipher"],
    highlights: [
      "Burn takes the worse of what you spent and what you budgeted — reality wins when you overspend, the budget holds the floor when you don't",
      "Safety fund and investable money are separate pockets with an adaptive buffer, so spare cash can't quietly become next month's rent",
      "Layers cannot cross-import: they are separate Dart packages, so a boundary violation is a compile error rather than a review comment",
      "Financial data never leaves the device — encrypted on-device storage, no account, no server",
    ],
    resumeLine:
      "Personal financial-runway app in **Flutter**: **Clean Architecture** across a Melos monorepo, **SQLCipher**-encrypted local storage, 7-language localisation. In development — running on Android, iOS distribution in progress.",
    featured: true,
    linkLabel: "Coming Soon →",
    status: "In Progress",
  },
  {
    name: "Echology",
    subtitle: "A Bitcoin research tool for the hidden choice that sets what a transaction costs",
    href: "https://github.com/evanlinjin/echology",
    file: "assets/echology.png",
    why: "Which coins a wallet spends decides what the transaction costs, and every wallet people actually use makes that choice for them, invisibly.",
    result:
      "A research tool that makes the trade-off visible: pick inputs by hand, change the fee scenario, watch waste and feerate deviation move. Built with a BDK core maintainer. Archived.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Manual UTXO selection, so a researcher can construct the case they want to study",
      "Spend scenarios and fee rates are adjustable, because the interesting behaviour is at the extremes",
      "Waste, fee and feerate deviation shown as numbers you can compare, not a single opaque total",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
];
