// The personal half of the landing page. Home is where people arrive, so
// this is where Echo is introduced: the engineering hero makes the
// professional case above it, and this says who made it.
//
// There is deliberately no sentence here about why she paints. She was asked
// directly, gave an answer in conversation, and then declined to publish it.
// The section shows her and states facts; the reader draws their own
// conclusion. Adding a motive line later means asking her for one, not
// writing one.
//
// Every fact is hers, and the tense is present throughout: she still paints,
// with work from January 2026, so nothing here says "used to".
export const aboutMeConfig = {
  // Hers, and only hers: every fact and motive is one she gave, in the voice
  // interview on 2026-10-19 and since. The headline is why she builds, in
  // her words; the parts are cut to one idea each, under a label, so a
  // skimming reader can jump to the one they want.
  headline: "Bad design annoys me, so I write software that doesn't.",
  parts: [
    {
      label: "Background",
      text: "BA in Italian language and culture. Mandarin and Taiwanese native, English at work. Before software: restaurants, then teaching and research assistant.",
    },
    {
      label: "What changed",
      text: "Logging hours, entering scores, applying for a research budget: all of it ran on outdated software that needed a manual.",
      // the reason for the hero's claim, under her pen
      mark: { phrase: "needed a manual", kind: "circle" },
    },
    {
      label: "How I work",
      text: "Before I fix a bug, I make it happen again, and I don't call it done until I've shown it working. I share work early, because the team usually sees what I miss.",
      // a margin star: the habit that matters most
      doodle: "star",
    },
    {
      // Her view, in her words, cut to three sentences on 2026-11-04.
      label: "With AI",
      text: "AI helps me try more ideas and build them faster. But it's a tool, and the decisions are still mine. Things broke before AI and they still will, so preventing it is still my job.",
      // a margin light bulb: the new way of working
      doodle: "bulb",
    },
    {
      label: "Outside work",
      text: "I paint, since 2012, mostly at my desk or on a train, after three months of classes in Florence.",
    },
  ],

  // Served at the size the page shows it, with its box reserved.
  portrait: {
    src: "assets/echo-shih-portrait.webp",
    alt: "Echo Shih, a studio portrait against a dark background.",
    width: 960,
    height: 960,
  },

  // One real action, because it is the only thing here that leaves the page.
  cta: { label: "See the paintings", href: "/gallery" },
} as const;
