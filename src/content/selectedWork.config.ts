// Selected work: Financial Runway, told as how it is built. The demo shows the
// product; the diagram and the points show the engineering. The copy is hers.
export const selectedWorkConfig = {
  appStore: "https://apps.apple.com/app/id6778675088",
  // A short recording of the real app, playing on its own like a GIF:
  // home, then one check-up. The still frame is home. Recorded by the Runway repo's
  // assets/marketing/video/portfolio.sh.
  demo: {
    src: "assets/runway/demo.mp4",
    poster: "assets/runway/demo-poster.webp",
    width: 1200,
    height: 674,
    label:
      "Financial Runway on an iPhone: home reads 12 months. A check-up types this week's balance, and the runway grows to 13 months, until December 2027.",
  },
  name: "Financial Runway",
  lede: "An iPhone app that counts your money in time. Designed, built and shipped alone, live on the App Store since October 2026.",
  ledeMark: { phrase: "live on the App Store", kind: "highlight" as const },
  note: "Built with AI, checked by tests and review.",
  // How it is built: one picture, then these points beside it, numbered.
  points: [
    {
      title: "Layers that can't leak.",
      body: "A pure core holds the rules. Everything else plugs in through its interfaces, and a wrong import fails CI.",
    },
    {
      title: "Privacy checked, not promised.",
      body: "The database is checked as encrypted at every open, and CI fails if the app sends an event its privacy page doesn't list.",
    },
  ],
};
