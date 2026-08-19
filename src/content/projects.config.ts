import type { Projects } from "../lib/types/types.js";

// Each card answers: what problem existed, what I decided, how I know it works.
// Not a stack inventory — the tech is listed in `stack` below each card, so the
// highlights can carry judgment instead of tool names.
export const projectsConfig: Projects = [
  {
    name: "Clio",
    subtitle:
      "Salon operations software, in daily use at a Tainan salon since May 2025",
    why: "A friend's hard drive died and took years of salon records with it. She had tried the existing software and found all of it too complicated. She did not need more features. She needed the two minutes before a client sits down: who they are, what was done last time, what it cost.",
    result:
      "The owner typed a year of past appointments in by hand. People do not migrate their own history into software they are still evaluating. In daily use at the salon since May 2025 — 603 clients, 2,694 service records, history entered back to September 2024. Small scale, and the constraints were real: her data, her livelihood, no room to be clever. What I would do differently is write the permission model down before building it, rather than discovering that afterwards.",
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
      "No booking, no payments, no inventory, no marketing — the products she rejected had all of it. Clio covers the two minutes before a client sits down, and stops",
      "Salons are isolated in the database itself, not by the app remembering to filter",
      "Tightened permission defaults without locking out existing staff: the migration writes intended values before the code stops assuming them",
      // The specifics of the flaw I found stay off a public page: this is a live
      // product holding real people's records, and naming a past weakness names
      // where to look. The judgment survives; the map does not.
      "I audit my own access policies rather than trusting that I got them right, and every change since launch goes through a written review",
      "Only the api layer may reach the database, and a test fails the build if anything else imports it",
      "The salon has patchy Wi-Fi, so reads work offline from cache and writes wait rather than failing silently",
      "Records live in a hosted database, not on a machine that can die — the failure that started this cannot repeat",
    ],
    resumeLine:
      "**React/Supabase** salon operations product — Traditional Chinese first, English second — in daily use at a Tainan salon **since May 2025**, supporting 603 clients and 2,694 service records with **Postgres RLS**, per-member permissions, and a build-failing test keeping database access inside the api layer.",
    featured: true,
    linkLabel: "Live →",
    status: "Live",
  },
  {
    name: "Runway",
    subtitle:
      "Personal finance measured the way a company measures itself — how long can you sustain yourself?",
    why: "I was planning a study trip and could not answer the one question it rested on: how long can I sustain myself? Budget apps tell you where the money went. I needed to know how much time was left. A person has an opening balance, a burn rate and months remaining — the same as a company. Cashflow is what constrains the plan, whatever the plan is.",
    result:
      "I use it. Running on Android, in seven languages and six currencies, built solo. iOS distribution is in progress — the release workflows exist but no tag has been cut, so nothing is on TestFlight or Play yet. One user is not validation. I built the model before I knew whether anyone else wanted it, which is the wrong order, and it is why the next thing I do here is put it in front of people rather than add features.",
    href: "https://github.com/echoshihtw/survival-optimiser",
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
      "A goal is a number of months, not an amount of money — the question was never how much I had, it was how long it lasts",
      "Burn takes the worse of what you spent and what you budgeted — reality wins when you overspend, the budget holds the floor when you do not",
      "Safety fund and investable money are separate pockets with an adaptive buffer, so spare cash cannot quietly become next month's rent",
      "Layers cannot cross-import: they are separate Dart packages, so a boundary violation is a compile error rather than a review comment",
      "Financial data never leaves the device — encrypted on-device storage, no account, no server",
    ],
    resumeLine:
      "Personal financial-runway app in **Flutter**: **Clean Architecture** across a Melos monorepo, **SQLCipher**-encrypted local storage, 7-language localisation. Running on Android.",
    linkLabel: "Source Code →",
    status: "In Progress",
  },
  {
    name: "Echology",
    subtitle:
      "A demo wallet for studying how Bitcoin coin-selection algorithms behave",
    href: "https://github.com/evanlinjin/echology",
    file: "assets/echology.png",
    why: "Coin selection is the algorithm that decides which coins a transaction spends. It sets the fee. Its trade-offs only surface as numbers — waste, fee, feerate deviation — and only under one exact set of inputs. Hold the inputs still and the behaviour becomes comparable.",
    result:
      "Built the frontend with a core maintainer of the Bitcoin Dev Kit: construct a UTXO set, run it against a spend scenario, and read the resulting metrics side by side. Archived.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Manual UTXO selection, so the input set is a controlled variable rather than whatever the wallet happened to hold",
      "Spend scenarios and fee rates are adjustable, because selection behaviour diverges at the extremes",
      "Waste, fee and feerate deviation shown as separate figures — one combined total hides which trade-off moved",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
];
