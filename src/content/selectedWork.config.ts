// Selected work: Financial Runway as a taped print that unfolds into the
// app's own world. The copy is hers, from the v6 design on 2026-10-19. The
// stack is read from the Runway entry in projects.config, which the résumé
// also reads, so it is written once.
import { projectsConfig } from "./projects.config";

const runwayEntry = projectsConfig.find((p) => p.name === "Financial Runway");
if (!runwayEntry) throw new Error("projects.config has no Financial Runway");

const APP_STORE = "https://apps.apple.com/app/id6778675088";

export const selectedWorkConfig = {
  appStore: APP_STORE,
  banner: {
    src: "assets/runway/banner.webp",
    width: 1200,
    height: 675,
    alt: "Financial Runway on an iPhone: how long will your money last? 12 months of runway.",
  },
  // The app's Plan screen, cropped to the one line that answers the question.
  planCrop: {
    src: "assets/runway/plan-projected.webp",
    width: 790,
    height: 200,
  },
  tagline: ["When life changes shape,", "money becomes time."],
  facts: ["one number, counted from today", "no account, no bank login"],
  price: "US$3.99",
  priceNote: "once, never a subscription",
  compare: {
    budget: { label: "A budget can tell me", question: "How much is left?" },
    runway: {
      label: "I only care about one number",
      question: "How long will it last?",
    },
  },
  // The calculator starts on the numbers in the store screenshots.
  calculator: { cash: "34,336", cost: "2,803" },
  simple: "Simple took longer than any of it.",
  quote:
    "I was planning two years abroad funded from savings, and I worked it out in a spreadsheet. I didn't like it: boring to look at, and a chore to keep up. I wanted to make it fun, so I built something I would use.",
  screens: [
    {
      src: "assets/runway/store-01-runway.webp",
      alt: "How long will your money last? The runway in months, with cash beside what is owed",
    },
    {
      src: "assets/runway/store-02-living.webp",
      alt: "The living budget: what this month's living costs have used, and what is left",
    },
    {
      src: "assets/runway/store-03-log.webp",
      alt: "Log: a spend in three taps and a number",
    },
    {
      src: "assets/runway/store-04-plan.webp",
      alt: "Try a change before you make it: the Plan screen",
    },
  ],
  promises: [
    {
      title: "It never ranks you.",
      body: "The first version gave you a rank. A bad month shouldn't feel like a bad you.",
    },
    {
      title: "What you owe sits next to what you have.",
      body: "A loan makes your cash go up. Without the debt beside it, the number would be lying to you.",
    },
    {
      title: "It stays calm when money is short.",
      body: "It turns soft pink, not alarm red, and even at its most urgent the glow is no faster than a resting heartbeat. You open it when you're already worried.",
    },
    {
      title: "Your numbers stay on your phone.",
      body: "No account, no bank login. It even hides itself in the app switcher.",
    },
    {
      title: "Logging takes three taps.",
      body: "The spreadsheet was a chore. This shouldn't be.",
    },
  ],
  priceWhy:
    "An app that counts what subscriptions cost you has no business becoming one.",
  stack: runwayEntry.stack,
  madeWith:
    "Vibe-coded with Claude and ChatGPT. My part was deciding what to build, and checking it.",
  closing: "Like how this thinks? Email me",
};
