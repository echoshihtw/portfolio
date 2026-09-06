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
  kicker: "Chun-Yu (Echo) Shih",

  // Her own words, from the moment she corrected an earlier draft: "just my
  // creations". Two words, and deliberately not a claim. It is the
  // counterpart to the hero's "I own it, end to end" directly above: that
  // makes the professional argument, this declines to make any.
  heading: [{ text: "Just " }, { text: "me", accent: true }, { text: "." }] as {
    text: string;
    accent?: boolean;
  }[],

  // Awaiting Echo's own words. Deliberately empty rather than holding a
  // draft: the section renders without prose, and nothing invented reaches
  // the page in the meantime.
  //
  // What left with the old paragraphs, in case any of it should come back:
  // painting since 2012, mostly in Tainan; a BA in Italian language and
  // culture from Fu Jen Catholic University, Taipei; three months at
  // Accademia del Giglio in Florence; and which pieces were made where.
  // Those were the only places on the site carrying any of it.
  story: [] as string[],

  // The torn-paper edge from Echo's edited version, grafted onto the colour
  // of the untouched photograph (scripts/graft.swift: alpha from one image,
  // RGB from the other, in pixel space). The edited file had the edge she
  // wanted but had been re-rendered, sharper than the original and with
  // detail that was never photographed.
  //
  // Transparent rather than flattened onto a page colour, because it now
  // sits on the home page, which has two themes.
  portrait: {
    src: "assets/echo-florence.png",
    alt: "Echo laughing, holding a gelato, in front of a graffitied wall",
    width: 480,
    height: 574,
  },

  // One real action, because it is the only thing here that leaves the page.
  cta: { label: "See the paintings", href: "/gallery" },

  // A quiet index for people who skim instead of scrolling. Deliberately not
  // buttons: Work, Projects and Contact are further down this same page, and
  // giving them the same weight as the one link that goes somewhere else
  // would flatten the difference between them.
  jumps: [
    { label: "Work", href: "#work" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
