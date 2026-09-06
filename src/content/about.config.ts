// The /about voice layer, separate from the components, the same way
// portfolio.config.ts holds the home page's copy.
//
// There is deliberately no sentence here about why Echo paints. She was
// asked directly, gave an answer in conversation, and then declined to
// publish it. The page shows the work and states the facts; the reader
// draws their own conclusion. Adding a motive line later means asking her
// for one, not writing one.
//
// Every fact below is hers. The tense is present throughout: she still
// paints, with work from January 2026, so nothing here says "used to".
export const aboutConfig = {
  kicker: "Chun-Yu (Echo) Shih",
  // Echo's own words, from the moment she corrected an earlier draft:
  // "just my creations". Two words, and deliberately not a claim.
  //
  // It is the counterpart to the home page's "I own it, end to end." That
  // page makes the professional argument; this one declines to make any.
  // Several wittier lines were drafted and rejected on the way here: a joke
  // in the largest type on the page argues for the person, and understating
  // it does the same work without anyone having to be funny.
  //
  // The date left the heading with the old sentence, so it sits in the
  // first paragraph instead.
  //
  // Split the way heroConfig.headline is, so one word takes the accent
  // italic and the glitch.
  heading: [{ text: "Just " }, { text: "me", accent: true }, { text: "." }] as {
    text: string;
    accent?: boolean;
  }[],

  story: [
    "I have been painting since 2012, mostly in Tainan. I studied Italian language and culture at Fu Jen Catholic University in Taipei, and after I finished I spent three months at Accademia del Giglio in Florence.",
    "The clay bust, the pasta painting and the charcoal head were made there. The ink drawing of a mouth was made on a plane, and the airport is Jakarta.",
  ],

  // Cut out of its background, so she stands on the page rather than sitting
  // in a photograph on it.
  //
  // Genuinely transparent, not flattened onto the page colour, so the
  // plaster grain shows through the gaps in the stipple. That costs: the
  // torn edge is thousands of tiny alpha transitions, which is the one
  // thing PNG compresses badly, and at full size it came to 957KB. Running
  // the image visually smaller is what makes it affordable, 477KB at 480px
  // wide, which covers the 15rem slot at 2x.
  //
  // No caption. The photograph is not evidence of anything and does not need
  // dating: it is her, and that is the whole job.
  portrait: {
    src: "assets/echo-florence.png",
    alt: "Echo laughing, holding a gelato, in front of a graffitied wall",
  },

  galleryHeading: "The work",

  closing: {
    text: "The other half of this site is the software.",
    linkLabel: "See the work",
  },
} as const;

// Ship the wall first. The dialog's whole value is in descriptions Echo has
// not written, and a dialog that opens onto a placeholder is worse than no
// dialog at all. Flip this only when every piece in paintings.config.ts has
// a `note`: half a set reads as neglect rather than as work in progress.
//
// Turning it on is not only this line. The hint above the wall and each
// piece's aria-label must start mentioning that a piece opens, or the page
// promises an interaction it does not have.
export const features = {
  paintingDialog: false,
} as const;
