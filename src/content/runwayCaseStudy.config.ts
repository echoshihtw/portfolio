// The Runway case study, at /work/runway: her own story of making Runway,
// told from the spreadsheet to "finished". Each part is a heading and a few
// plain lines; the screens sit at the turn. At most one pen mark per part.
import type { PenName } from "../lib/pens/pens.js";

type Mark = { phrase: string; kind: PenName };

export const runwayCaseStudy = {
  path: "/work/runway",
  title: "Runway",
  kicker: "Case study · iOS app · 2026",
  lede: "An app that answers one question: how long does my money last?",
  ledeMark: {
    phrase: "how long does my money last?",
    kind: "highlight",
  } as Mark,

  // The story, in order. Each part's id is its link in the side menu, and
  // `menu` its short name there.
  parts: [
    {
      id: "start",
      menu: "Spreadsheet",
      heading: "It started with a spreadsheet.",
      body: [
        "I was planning two years abroad on savings, and I worked it out in a spreadsheet. It did the job, but I didn't want to open a spreadsheet every time I wondered. I wanted the answer on my phone in two seconds.",
      ],
    },
    {
      id: "first",
      menu: "Budget app",
      heading: "So I built a budget app.",
      body: [
        "Version 1.0 asked you to log every spend. Friends who tried it stopped within weeks, and so did I. Logging every expense isn't practical.",
      ],
    },
    {
      id: "turn",
      menu: "The turn",
      heading: "I had to make it the app I would use.",
      body: [
        "I didn't need every coffee. I needed one number I already knew: what's in my accounts. Now you type that once a week, and it tells you how long your money lasts.",
      ],
      screens: true,
      mark: { phrase: "one number I already knew", kind: "highlight" } as Mark,
    },
    {
      id: "rule",
      menu: "One rule",
      heading: "One rule: don't guess.",
      body: [
        "The app shows what you typed and what it expected. It never claims a bill was paid. If it isn't sure, the runway comes out shorter, never longer.",
      ],
    },
    {
      id: "proof",
      menu: "Testing",
      heading: "Testing it.",
      body: [
        "I ran the new model against seven everyday weeks. The runway was never longer than the truth, and no bill was counted twice. That became 1.3.0, with Home and Plan on one screen.",
      ],
    },
    {
      id: "learned",
      menu: "Lesson",
      heading: "What I learned.",
      body: ["A feature that needs explaining is a feature to cut."],
      mark: {
        phrase: "A feature that needs explaining is a feature to cut.",
        kind: "highlight",
      } as Mark,
    },
    {
      id: "rest",
      menu: "Where it rests",
      heading: "Where it rests.",
      body: [
        "I wanted to show money as time, simple enough for anyone to keep up. 1.3.0 does that. It does what I set out to build, so I'm calling it finished.",
      ],
      mark: { phrase: "finished", kind: "line" } as Mark,
    },
  ],

  // The 1.0 and 1.3.0 screens, side by side at the turn.
  screens: {
    // Every screen is cut to one size, so the pairs line up.
    rows: [
      { version: "1.0", side: "before", width: 600, height: 1164 },
      { version: "Now", side: "after", width: 600, height: 1164 },
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
          alt: "1.3.0's home: a blue circle reading 12 months, until November 2027, then Future with pay of $400 a month and a Tokyo trip, and a Do a check-up button.",
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
          alt: "1.3.0's check-up: How much money do you have right now? with $14,300 typed in.",
        },
      },
      {
        label: "The month",
        before: {
          src: "assets/runway/v1-budget.webp",
          alt: "Runway 1.0's Settings: a monthly budget built line by line, rent $1,450, living expenses $1,100, subscriptions $43 and debt $210, totalling $2,803.",
        },
        after: {
          src: "assets/runway/now-month.webp",
          alt: "1.3.0's setup, step 2: I spend $1,150 a month, said once, with optional reminders for rent, bills, food and more.",
        },
      },
      {
        label: "Planning ahead",
        before: {
          src: "assets/runway/v1-plan.webp",
          alt: "Runway 1.0's scenario planning: type a new monthly cost and run a simulation.",
        },
        after: {
          src: "assets/runway/now-plan.webp",
          alt: "1.3.0's Add to Future: a name, then the sentence I get $0 every month, and a note that it adds to the With line, never your number.",
        },
      },
    ],
  },

  facts:
    "Version 1.0, the logging version, is on the App Store. Version 1.3.0 is on its way there. Built with Flutter, an encrypted on-device database, no account and no bank connection.",
};
