// Selected work: Financial Runway, the product. The demo shows it working; the
// case study at /work/runway tells how it was made. The copy is hers.
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
};
