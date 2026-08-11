import type { Projects } from "../lib/types/types.js";

// Each card answers: what problem existed, what I decided, how I know it works.
// Not a stack inventory — the tech is listed in `stack` below each card, so the
// highlights can carry judgment instead of tool names.
export const projectsConfig: Projects = [
  {
    name: "Clio",
    subtitle: "Salon operations software, in daily use at a Tainan salon since May 2025",
    description:
      "A stylist has thirty seconds between greeting a client and starting work, and needs the last visit's formula in that time — not a paper file or a spreadsheet on someone else's phone. Clio holds clients, service history, designers and revenue in one place, in Chinese and English. In daily use at a salon in Tainan since May 2025: two designers, 603 clients, 2,694 records.",
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
    description:
      "Budget apps tell you where your money went. Nobody tells you how long you have. Runway answers one question for people living off savings — between jobs, studying, bootstrapping — and keeps answering it as the number moves. Built solo. Running on Android; iOS distribution in progress.",
    href: "#",
    now: "Working through iOS distribution, then one-time purchase via RevenueCat.",
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
    description:
      "Which coins a wallet spends decides what the transaction costs, and that choice is invisible in every wallet people actually use. This is a research tool that makes it visible: pick the inputs by hand, change the fee scenario, and watch waste and feerate deviation move. Built with a BDK core maintainer.",
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
