// Selected work: Financial Runway, plainly, then a strip of how it thinks.
// The copy is hers.
const APP_STORE = "https://apps.apple.com/app/id6778675088";

export const selectedWorkConfig = {
  appStore: APP_STORE,
  banner: {
    src: "assets/runway/banner.webp",
    width: 1200,
    height: 675,
    alt: "Financial Runway on an iPhone: how long will your money last? 12 months of runway.",
  },
  meta: "Financial Runway · iOS · 2026 · built solo",
  question: "How long will your money last? One number, counted from today.",
  price: "US$3.99",
  priceNote: "· no subscription · no account, no bank login",
  // The calculator starts on the numbers in the store screenshots.
  calculator: { cash: "34,336", cost: "2,803" },
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
  madeWith: "I had a picture of how it should be. AI made it happen faster.",
};
