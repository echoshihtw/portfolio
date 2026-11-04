// Selected work: Financial Runway, told as how it is built. The demo shows the
// product; the cards show the engineering. The copy is hers.
export const selectedWorkConfig = {
  appStore: "https://apps.apple.com/app/id6778675088",
  // A short recording of the real app, played on a tap. The still frame is
  // the app's home.
  demo: {
    src: "assets/runway/demo.mp4",
    poster: "assets/runway/demo-poster.webp",
    width: 1200,
    height: 675,
    label:
      "Financial Runway on an iPhone: the app's home, a blue circle reading 12 months until November 2027, with a Check up button.",
  },
  name: "Financial Runway",
  lede: "An iPhone app that counts your money in time. Designed, built and shipped alone.",
  // Facts a recruiter and a CTO both read at a glance; none goes out of date
  // with the next commit.
  facts: [
    { value: "Live", label: "since Oct 2026" },
    { value: "6", label: "languages" },
  ],
  note: "Built with AI, checked by tests and review.",
  architecture: {
    title: "Layers that can't leak.",
    body: "A pure core holds the rules. Everything else plugs in through its interfaces, and a wrong import fails CI.",
  },
  // Text only: each is one claim, and the diagram stays the one picture.
  cards: [
    {
      title: "Privacy checked, not promised.",
      body: "The database is checked as encrypted at every open, and CI fails if the app sends an event its privacy page doesn't list.",
    },
    {
      title: "Time is handed in, never read.",
      body: "One function reads the clock. Everything else is given the time, so tests can set any date.",
    },
  ],
};
