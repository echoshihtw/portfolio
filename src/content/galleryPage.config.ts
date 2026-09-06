// The gallery page's copy. Who Echo is now lives on the landing page, in
// aboutMe.config.ts: this page is the work and nothing else.
export const galleryConfig = {
  heading: [
    { text: "Made by " },
    { text: "hand", accent: true },
    { text: "." },
  ] as { text: string; accent?: boolean }[],

  // Moved here from the landing page. It reads better against the work than
  // against a photograph of her: the second paragraph is provenance for
  // pieces on the wall directly below it, and the first is why they exist
  // in Florence at all.
  story: [
    "I have been painting since 2012, mostly at my desk or on the way somewhere, on a train or a plane. I studied Italian language and culture at Fu Jen Catholic University in Taipei, and after I finished I spent three months at Accademia del Giglio in Florence.",
  ],

  closing: {
    text: "The other half of this site is the software.",
    linkLabel: "See the work",
  },
} as const;

export const features = {
  paintingDialog: false,
} as const;
