import type { Projects } from "../lib/types/types.js";

// Each card answers: what problem existed, what I decided, how I know it works.
// Not a stack inventory: the tech is listed in `stack` below each card, so the
// highlights can carry judgment instead of tool names.
export const projectsConfig: Projects = [
  {
    name: "Clio",
    subtitle:
      "Salon operations software, in daily use at a Tainan salon since May 2025",
    why: "A friend's hard drive died and took years of salon records with it. She had tried the existing software and found all of it too complicated. She did not need more features. She needed the two minutes before a client sits down: who they are, what was done last time, what it cost.",
    result:
      "The owner typed a year of past appointments in by hand. People do not migrate their own history into software they are still evaluating. In daily use at the salon since May 2025, with 603 clients, 2,694 service records, history entered back to September 2024. Small scale, and the constraints were real: her data, her livelihood, no room to be clever. What I would do differently is write the permission model down before building it, rather than discovering that afterwards.",
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
      "No booking, no payments, no inventory, no marketing. The products she rejected had all of it. Clio covers the two minutes before a client sits down, and stops",
      "Salons are isolated in the database itself, not by the app remembering to filter",
      "Tightened permission defaults without locking out existing staff: the migration writes intended values before the code stops assuming them",
      // The specifics of the flaw I found stay off a public page: this is a live
      // product holding real people's records, and naming a past weakness names
      // where to look. The judgment survives; the map does not.
      "I audit my own access policies rather than trusting that I got them right, and every change since launch goes through a written review",
      "Only the api layer may reach the database, and a test fails the build if anything else imports it",
      "The salon has patchy Wi-Fi, so reads work offline from cache and writes wait rather than failing silently",
      "Records live in a hosted database, not on a machine that can die, so the failure that started this cannot repeat",
    ],
    resume: {
      descriptor: "salon operations platform, live since May 2025",
      role: "Founder",
      bullets: [
        "**React**, **Supabase**, **Postgres RLS**: multi-tenant from day one, per-member permissions",
        "603 clients and 2,694 service records, entered by hand by the owner",
        "A build-failing test keeps database access inside the api layer",
        "Reads work offline from cache on patchy salon Wi-Fi; Traditional Chinese first",
      ],
    },
    featured: true,
    linkLabel: "Live →",
    status: "Live",
  },
  {
    name: "Runway",
    subtitle:
      "Personal finance measured the way a company measures itself: how long can you sustain yourself?",
    why: "I was planning a study trip and could not answer the one question it rested on: how long can I sustain myself? Budget apps tell you where the money went. I needed to know how much time was left. A person has an opening balance, a burn rate and months remaining, the same as a company. Cashflow is what constrains the plan, whatever the plan is.",
    result:
      "I use it. Running on Android, in seven languages and six currencies, built solo. iOS distribution is in progress: the release workflows exist but no tag has been cut, so nothing is on TestFlight or Play yet. One user is not validation. I built the model before I knew whether anyone else wanted it, which is the wrong order, and it is why the next thing I do here is put it in front of people rather than add features.",
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
      "A goal is a number of months, not an amount of money. The question was never how much I had, it was how long it lasts",
      "Burn takes the worse of what you spent and what you budgeted: reality wins when you overspend, the budget holds the floor when you do not",
      "Safety fund and investable money are separate pockets with an adaptive buffer, so spare cash cannot quietly become next month's rent",
      "Layers cannot cross-import: they are separate Dart packages, so a boundary violation is a compile error rather than a review comment",
      "Financial data never leaves the device: encrypted on-device storage, no account, no server",
    ],
    resume: {
      descriptor: "personal financial-runway app, Flutter",
      role: "Founder",
      bullets: [
        "**Clean Architecture** across a **Melos** monorepo, **SQLCipher**-encrypted local storage",
        "7 languages and 6 currencies, built solo; running on Android",
      ],
    },
    linkLabel: "Source Code →",
    status: "In Progress",
  },
  {
    name: "Echology",
    subtitle:
      "A demo wallet for studying how Bitcoin coin-selection algorithms behave",
    href: "https://github.com/evanlinjin/echology",
    file: "assets/echology.png",
    why: "Coin selection is the algorithm that decides which coins a transaction spends. It sets the fee. Its trade-offs only surface as numbers (waste, fee, feerate deviation), and only under one exact set of inputs. Hold the inputs still and the behaviour becomes comparable.",
    result:
      "Built the frontend with a core maintainer of the Bitcoin Dev Kit: construct a UTXO set, run it against a spend scenario, and read the resulting metrics side by side. Archived.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Manual UTXO selection, so the input set is a controlled variable rather than whatever the wallet happened to hold",
      "Spend scenarios and fee rates are adjustable, because selection behaviour diverges at the extremes",
      "Waste, fee and feerate deviation shown as separate figures, because one combined total hides which trade-off moved",
    ],
    linkLabel: "Source Code →",
    status: "Archived",
  },
  {
    // Last in the grid on purpose. A reader skimming for engineering signal
    // should hit the software first; this earns its place by being evidence
    // of shipping in a material none of the others touch.
    name: "Ming Mold 60th",
    subtitle:
      "A 60th anniversary gift for the family business: identity, card face, and the box it ships in",
    why: "My family's mould manufacturer turned sixty in 2021, founded 1961. The gift had to say something about sixty years without being a plaque, and it had to be made in quantity: a commemorative EZ-card in a presentation box, for people who had worked there for decades.",
    result:
      "Monogram to die-cut to a carton of finished boxes in under three months. The mark folds the company's existing M into the bowl of the 6 at one line weight throughout, which is what lets it hot-foil stamp: a mark that varies in weight fills in at the thin end. The card face is the original factory frontage as a line engraving, with the red sign left at full saturation and everything else dropped back, under 我們一起走過的一甲子, the sixty years we walked together. I drew the die-cut for the box too, so the physical construction is mine as well as the printed surfaces.",
    stack: ["Illustrator", "Hot foil stamping", "Die-cut box", "EZ-card"],
    shots: [
      {
        src: "assets/ming-mold/monogram.jpg",
        alt: "The 60th anniversary monogram in gold on black, the company's M mark set inside the bowl of the 6",
      },
      {
        src: "assets/ming-mold/card.jpg",
        alt: "The card face: the factory frontage as a line engraving, the red MING MOLD Since 1961 sign at full saturation, brush calligraphy above",
      },
      {
        src: "assets/ming-mold/colours.jpg",
        alt: "Colourway exploration for the card face across warm grey, sage, teal and peach grounds",
      },
      {
        src: "assets/ming-mold/box.jpg",
        alt: "The opened presentation box, gold foil monogram on the lid, the finished card seated in the well",
      },
    ],
    // No `resume` key, which is what keeps it off the one-page CV: that
    // answers a software requisition. No `href` either: a commemorative
    // gift has nowhere to send a reader.
    status: "Shipped",
  },
];
