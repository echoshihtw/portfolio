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
  // The instinct, in her words: she feels it before she can say why.
  instinct: "I notice it before I can explain why.",
  parts: [
    {
      label: "Background",
      text: "BA in Italian language and culture. Mandarin and Taiwanese native, English at work. Before software: restaurants, then teaching and research assistant.",
    },
    {
      label: "What changed",
      text: "Logging hours, entering scores, applying for a research budget: all of it ran on outdated software that needed a manual.",
    },
    {
      label: "How I work",
      text: "Before I fix a bug, I make it happen again, and I don't call it done until I've shown it working. I share work early, because the team usually sees what I miss.",
    },
    {
      // Her view, in her words, cut to three sentences on 2026-11-04.
      label: "With AI",
      text: "AI lets me try more ideas, and build and see them faster. It won't make software safer on its own: we broke things before AI, and we still will. Knowing how to prevent it is what an engineer brings.",
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
