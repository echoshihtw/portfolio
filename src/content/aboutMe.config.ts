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

  // Hers, and only hers.
  //
  // The first line is the story she told on 2026-09-06: she started out in
  // restaurants doing customer relations, and decided she should be doing
  // better with her time and with what she is really good at. Her motive,
  // in her framing, not an inference. The wording is close to how she said
  // it; the only words that are mine are the joins.
  //
  // The degree comes from resume.md:66, and the languages from the line
  // beside it. Not the CV's summary paragraph: that is already the hero's
  // support line almost verbatim.
  //
  // This is also what "self-taught" was reaching for in an earlier draft.
  // A career that starts in customer relations and arrives at Postgres row
  // level security says it without the word, and shows the turn rather than
  // asserting the trait.
  //
  // The remote clause is the one idea worth keeping from an older freelance
  // pitch, which sold the languages as "bridging communication gaps between
  // Asia and the Western world". Same point, stated as something checkable:
  // resume.md lists Independent/Freelance as Remote 2020-2024 and
  // SPIN.FASHION as Singapore, Remote. "Most of my career" was drafted and
  // cut, because Find Recruiter and Lockerbie are both listed as Taipei.
  story: [
    "I started out working in restaurants, in customer relations, with a degree in Italian language and culture. At some point I decided I should be doing better with my time, and with what I am actually good at.",
    "Mandarin and Taiwanese are native. English has been the working language in every role I have had. I speak Italian, and I have worked remotely across time zones since 2020.",
  ],

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
  ],
} as const;
