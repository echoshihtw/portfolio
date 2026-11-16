// The Runway case study, at /work/runway: her own story of making Runway,
// written with her on 2026-11-16. She is pausing Runway there, so it tells
// what is true now: 1.0 live, the simpler model on a branch.
// Each section carries at most one pen mark, on its proof.
import type { PenName } from "../lib/pens/pens.js";

type Mark = { phrase: string; kind: PenName };

export const runwayCaseStudy = {
  path: "/work/runway",
  title: "Runway",
  kicker: "Case study · iOS app · 2026",
  lede: "An app that answers one question: how long does my money last? No bank login, no daily logging, about 30 seconds a week.",
  ledeMark: { phrase: "about 30 seconds a week", kind: "highlight" } as Mark,

  problem: {
    label: "The problem",
    heading: "Budgets ask for discipline people don't have",
    body: [
      "Most money apps want every coffee logged or a bank account linked. People stop within weeks, and the numbers quietly drift from the truth. Runway turns money into a length of time, a shape people already understand, and keeps it true with one short check-up a week: you type what's in your accounts, and the app does the rest.",
      "It had to work for almost everyone: a student, a retiree, someone between jobs, a kid with pocket money. Six languages, from day one.",
    ],
    mark: { phrase: "almost everyone", kind: "line" } as Mark,
  },

  model: {
    label: "The model",
    heading: "Three numbers and one rule",
    // A total closes the lines above it, so it is set apart.
    rows: [
      { name: "Bank and cash", value: "$3,200" },
      { name: "Card bill so far", value: "minus $300" },
      { name: "Your money", value: "$2,900", total: true },
      { name: "Your normal month", value: "$1,500" },
      { name: "Lasts", value: "about 2 months", total: true },
    ],
    note: "Rent and bills are taken on their due days. Pay, what-ifs and goals live in Plan and never change the main number.",
    rule: "We don't guess. The app shows what you typed and what it expected. It never claims a bill was paid.",
    mark: { phrase: "We don't guess.", kind: "highlight" } as Mark,
  },

  simpler: {
    label: "How it got simpler",
    heading: "From a learning engine to a passbook",
    steps: [
      {
        title: "The clever version",
        tag: "v1.1",
        body: "The app learned your spending from check-ups, matched pay and bills automatically, awarded a star for a normal month, and asked about anything surprising. It was accurate, and exhausting to explain, even to its own designer.",
      },
      {
        title: "An accountant's audit",
        tag: "v1.2",
        body: "The money model was rebuilt so every bill is counted once and every entry balances, then audited eight times by an accounting review before it shipped.",
      },
      {
        title: "Stress tests, round after round",
        body: "Each rule was walked through 30 extreme cases: card paid while still swiping, rent paid late, a direct debit that bounced, a six-month gap. Every patch opened two new edge cases. The lesson: the hidden maths itself was the problem.",
      },
      {
        title: "The cut",
        body: "Learning, the star, the month-end card and money-in matching were removed. The app now judges only the change in your total, keeps a bill due until money actually leaves, and asks only about a big unexplained drop.",
      },
      {
        title: "The pressure test",
        body: "The simpler model was run against seven everyday weeks in real code. The runway was never longer than the truth, and no bill was counted twice.",
      },
    ],
    mark: { phrase: "The cut", kind: "circle" } as Mark,
  },

  redesign: {
    label: "The redesign",
    heading: "A check-up that works like git",
    body: "Each check-up is a commit: you type, review the diff, confirm, and it goes in the log. Facts and the plan never mix, and the person writes only the one line the app can't know.",
    flow: [
      "Type your numbers",
      "Review what changed",
      "Looks right",
      "History",
    ],
    diff: [
      ["Bank and cash", "$3,000", "$2,200"],
      ["Card bill so far", "$800", "$300"],
      ["Your money", "$2,200", "$1,900"],
    ] as [string, string, string][],
    expected: ["Expected: everyday, 7 days", "about $350"] as [string, string],
    result:
      "You're down $300. That's $50 less than expected. Paid the card? Say so with one optional tap.",
    status: "Designed as a 15-screen interactive mockup; not built.",
  },

  principles: {
    label: "Principles that held",
    heading: "What every screen was checked against",
    items: [
      {
        title: "Never flatter",
        body: "If unsure, the runway errs short. A late bill stays due; a blank field changes nothing.",
      },
      {
        title: "Don't guess",
        body: 'Show typed facts and stated plans. No ticks, no "paid", no confirm dialogs about things the numbers already say.',
      },
      {
        title: "A grandma or a kid can read it",
        body: "Words over symbols, the answer first, about four chunks per screen, one term per idea.",
      },
      {
        title: "One source of truth",
        body: "One object feeds every number on a screen, one formatter writes every sentence in six languages.",
      },
      {
        title: "Privacy checked, not promised",
        body: "The database is checked as encrypted at every open, and the build fails if the app sends an event its privacy page doesn't list.",
      },
    ],
  },

  learned: {
    label: "What I learned",
    heading: "Clarity beat cleverness every time",
    body: [
      "Edge-case hunting has diminishing returns. Fixing what people actually hit beat chasing what a tester can invent, and a fixed scenario set is what makes progress measurable.",
      "A feature that needs explaining is a feature to cut. Removing the learning engine made the app more accurate to its users, not less.",
      "Familiar shapes do the teaching: a fuel gauge for the number, a passbook for the history, a diff for the check-up.",
      "Calm is a design choice. Rises are never questioned, and only one kind of surprise asks for an answer.",
    ],
    mark: {
      phrase: "A feature that needs explaining is a feature to cut.",
      kind: "highlight",
    } as Mark,
  },

  // The close, in her words: Runway is done, on purpose. Said as a
  // completion, never as giving up.
  rest: {
    label: "Where it rests",
    body: [
      "I wanted to show money as time, simple enough for almost anyone. Runway does that, and it's on the App Store.",
      "It does what I set out to build, so I'm calling it finished.",
    ],
    facts:
      "Version 1.0 is on the App Store. The simpler model is built but not released. The new check-up is a mockup only.",
    mark: { phrase: "finished", kind: "line" } as Mark,
  },
};
