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
  // The eyebrow, in the reference's phrasing. The name itself is in the hero
  // kicker at the top of the page, so it is not repeated here.
  kicker: "Who I am",

  // Her own words, from the moment she corrected an earlier draft: "just my
  // creations". Two words, and deliberately not a claim. It is the
  // counterpart to the hero's "I own it, end to end" directly above: that
  // makes the professional argument, this declines to make any.
  // The accent is the full stop, the way the reference sets "Pangram." and
  // nothing else: a whole name in one weight, then one coloured mark to end
  // it. The glitch that used to ride on "me" is gone with it; a glitching
  // period is a period.
  heading: [{ text: "Just me" }, { text: ".", accent: true }] as {
    text: string;
    accent?: boolean;
  }[],

  // Hers, and only hers.
  //
  // The first line is the story she told on 2026-09-06: she started out in
  // restaurants doing customer relations, and decided she should be doing
  // better with her time and with what she is really good at, which is
  // resolving problems. Her motive, in her framing, not an inference. The
  // wording is close to how she said it; the only words that are mine are
  // the joins.
  //
  // "Resolving problems" was the first answer and is gone, because everyone
  // claims it. Observing, seeing patterns and abstraction are hers too, from
  // the same conversation, and they are the specific version: they say HOW
  // she resolves anything, which is the part nobody else's sentence has.
  //
  // The clause before them earns the whole thing. Customer relations is
  // observation of people, so the sentence says she is doing what she always
  // did against harder material, rather than announcing a trait she wants
  // believed. "Turning them into" is a join; the rest is hers.
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
  // Rewritten after a slop audit that these drafts failed. Both had the same
  // shape: a colon followed by a three-part list, twice within four lines,
  // which is the loudest tell there is. Neither used a contraction while her
  // older copy is full of them ("The macOS build couldn't ship", "What I'd
  // do differently"), so the page changed voice halfway down. "At some point
  // I decided" went too: it is a hedge, and either the date is known or it
  // is not worth gesturing at.
  story: [
    "I started out in restaurants, in customer relations, with a degree in Italian language and culture. What I'm good at is noticing things, and seeing the pattern underneath them. I decided I should spend my time on that instead.",
    "Mandarin and Taiwanese are native. English is the working language in every job I've had. I speak Italian too, and I've worked across time zones since 2020.",
    ,
    // The bridge to the other half of the site. Mirrors the gallery page,
    // which ends with "The other half of this site is the software." Every
    // fact here is one Echo gave: painting since 2012, mostly in Tainan,
    // three months at Accademia del Giglio in Florence in 2018.
    "The other half of this site is the paintings. I've been painting since 2012, mostly in Tainan, with three months in Florence in 2018. One part logic, one part emotion.",
  ],

  // The torn-paper edge from Echo's edited version, grafted onto the colour
  // of the untouched photograph (scripts/graft.swift: alpha from one image,
  // RGB from the other, in pixel space). The edited file had the edge she
  // wanted but had been re-rendered, sharper than the original and with
  // detail that was never photographed.
  //
  // Transparent rather than flattened onto a page colour, because it now
  // sits on the home page, which has two themes.
  // A transparent PNG cut to an organic capsule, shown exactly as exported,
  // with a flat cobalt capsule behind it. See Portrait.svelte.
  portrait: {
    src: "assets/hero-a.png",
    alt: "Echo laughing while holding a gelato",
    width: 1200,
    height: 1435,
  },

  // One real action, because it is the only thing here that leaves the page.
  cta: { label: "See the paintings", href: "/gallery" },

  // A quiet index for people who skim instead of scrolling. Deliberately not
  // buttons: Work, Projects and Contact are further down this same page, and
  // giving them the same weight as the one link that goes somewhere else
  // would flatten the difference between them.
  jumps: [
    { label: "Experience", href: "#work" },
    { label: "Case studies", href: "#projects" },
  ],
} as const;
