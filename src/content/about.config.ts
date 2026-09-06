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
  heading: "I have been painting since 2012.",

  story: [
    "Mostly in Tainan. I studied Italian language and culture at Fu Jen Catholic University in Taipei, and after I finished I spent three months at Accademia del Giglio in Florence.",
    "The clay bust, the pasta painting and the charcoal head were made there. The ink drawing of a mouth was made on a plane, and the airport is Jakarta.",
  ],

  // Her hands at the table, brush in one and palette knife in the other.
  // It replaced an older shot of the same subject that was only 750px wide.
  portrait: {
    id: "working",
    alt: "Echo's hands at a table, a brush in one and a palette knife in the other, working on a purple and blue painting",
    caption: "Taipei, January 2026",
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
