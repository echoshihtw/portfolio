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
  // interview on 2026-10-19 and before it. Three beats: where she started,
  // the software that started it, painting. Casual register, contractions.
  story: [
    "BA in Italian language and culture. Mandarin and Taiwanese are native, English at work. Then restaurants, and work as a teaching and research assistant.",
    "That work came with software. Logging my hours, entering students' scores, applying for a research budget. All of it outdated, and all of it needed a manual. Bad design is still what interests me most, so now I write the software.",
    "I paint too. Private lessons in high school, and I wanted to go to art school. I studied Italian instead, then took painting classes in Florence for three months. Since 2012, mostly at my desk or on a train.",
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
