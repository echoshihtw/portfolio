// Selected work: Financial Runway, told as how it is built. The demo shows the
// product; the cards show the engineering. The copy is hers.
export const selectedWorkConfig = {
  appStore: "https://apps.apple.com/app/id6778675088",
  site: "https://echoshihtw.github.io/runway-site/",
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
  lede: "An iPhone app that counts your money in time. I designed, built and ship it alone, on the same process a team would use.",
  // Facts a recruiter and a CTO both read at a glance; none goes out of date
  // with the next commit.
  facts: [
    { value: "Live", label: "since Oct 2026" },
    { value: "6", label: "languages" },
    { value: "Every PR", label: "gated by CI" },
  ],
  note: "I direct AI and check its work with tests and review. Every change still goes through a PR.",
  architecture: {
    title: "Layers that can't leak.",
    body: "A pure core holds the rules. Everything else, from the database to the App Store, plugs in through its interfaces, and a wrong import fails CI.",
  },
  privacy: {
    steps: [
      { key: "Open", text: "the app" },
      { key: "Ask", text: "PRAGMA cipher_version" },
      { key: "Answer", text: "start", tone: "ok" },
      { key: "None", text: "stop, never plain SQLite", tone: "no" },
    ],
    title: "Privacy checked, not assumed.",
    body: "No account, no bank login. The app proves its database is encrypted each time it opens, instead of trusting the build.",
  },
  release: {
    steps: [
      { key: "PR", text: "CI: analyze, test, privacy" },
      { key: "Staging", text: "tested on a build" },
      { key: "Main", text: "merge commit" },
      { key: "Tag", text: "the version, from the commits", tone: "ok" },
    ],
    title: "Releases without ceremony.",
    body: "A merge to main tags and ships. The version comes from the commit messages, so nobody guesses it.",
  },
};
