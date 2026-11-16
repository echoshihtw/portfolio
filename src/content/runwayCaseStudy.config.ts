// The Runway case study, at /work/runway: her own story of making Runway,
// written with her on 2026-11-16. She is pausing Runway there, so it tells
// what is true now: 1.0 live, the simpler model on a branch.
// Each section carries at most one pen mark, on its proof.
import type { PenName } from "../lib/pens/pens.js";

type Mark = { phrase: string; kind: PenName };

export const runwayCaseStudy = {
  path: "/work/runway",
  title: "Runway",
  kicker: "Case study · an experiment in less toil",
  lede: "An app that answers one question: how long does my money last? No bank login, no daily logging, about 30 seconds a week.",
  ledeMark: { phrase: "about 30 seconds a week", kind: "highlight" } as Mark,

  problem: {
    label: "The problem",
    heading: "Budgets ask for discipline people don't have",
    body: [
      // Her own origin, from the Devpost submission's Inspiration.
      "I was planning two years abroad on savings, and I worked it out in a spreadsheet. A spreadsheet does the job; it's just not my thing. I wanted the answer on my phone in two seconds, so I built that.",
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
    heading: "Same goal, less toil",
    // Each version as an experiment: what she believed, how she tried it,
    // what happened, and what she changed because of it.
    steps: [
      {
        title: "The budget app",
        tag: "1.0, on the App Store",
        hypothesis:
          "If people log every spend, they'll always know their runway.",
        test: "I built it and used it myself.",
        result: "Impractical. Nobody keeps logging up, me included.",
        next: "Keep the same goal, but ask for one number you already know: what's in your accounts.",
      },
      {
        title: "The cut",
        tag: "1.3.0",
        hypothesis:
          "If the app judges only the change in your total, it stays true without any logging.",
        test: "I kept only what you type: what's in your accounts and what you spend. Then I ran it against seven everyday weeks in real code.",
        result:
          "The runway was never longer than the truth, and no bill was counted twice.",
        next: "A check-up that works like git. Designed, not yet tested.",
      },
    ],
    mark: { phrase: "The cut", kind: "circle" } as Mark,
    // Before and after, as real screens of 1.0 and of the redesign, paired
    // by what they do, all cut to one size.
    screen: { width: 600, height: 1164 },
    rows: [
      { version: "1.0", side: "before" },
      { version: "Now", side: "after" },
    ] as const,
    compare: [
      {
        label: "Home",
        before: {
          src: "assets/runway/v1-home.webp",
          alt: "Runway 1.0's home: 12 months in a dark panel, with cash, owed, monthly income, costs and this month's in and out.",
        },
        after: {
          src: "assets/runway/now-home.webp",
          alt: "The redesign's home: a blue circle reading 8 months, until June, and a Do a check-up button.",
        },
      },
      {
        label: "Input",
        before: {
          src: "assets/runway/v1-log.webp",
          alt: "Runway 1.0: a list of logged spends, with a form to log a new one by amount, note and category.",
        },
        after: {
          src: "assets/runway/now-spend.webp",
          alt: "The redesign's setup: rent, food and getting around, said once, adding up to $2,550 a month.",
        },
      },
      {
        label: "Plan",
        before: {
          src: "assets/runway/v1-plan.webp",
          alt: "Runway 1.0's scenario planning: type a new monthly cost and run a simulation.",
        },
        after: {
          src: "assets/runway/now-plan.webp",
          alt: "The redesign's plan: 8 months, until June 2027, a calendar of months, and a goal of Tokyo.",
        },
      },
    ],
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
    heading: "The rules every screen had to pass",
    items: [
      {
        title: "Never flatter",
        body: "If unsure, the runway errs short. A late bill stays due; a blank field changes nothing.",
      },
      {
        title: "A grandma or a kid can read it",
        body: "Words over symbols, the answer first, little to read on each screen, one word for each idea.",
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
    heading: "Less toil, more truth",
    body: [
      "A feature that needs explaining is a feature to cut.",
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
      "I wanted to show money as time, simple enough for anyone to keep up. The redesign does that.",
      "It does what I set out to build, so I'm calling it finished.",
    ],
    facts:
      "Version 1.0, the logging version, is on the App Store. The redesign is built and tested, not released. The git-style check-up is a mockup only.",
    mark: { phrase: "finished", kind: "line" } as Mark,
  },
};
