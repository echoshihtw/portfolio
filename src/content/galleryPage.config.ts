// The gallery page's copy. Who Echo is now lives on the landing page, in
// aboutMe.config.ts: this page is the work and nothing else.
export const galleryConfig = {
  heading: [
    // "Made by" stays together, so a narrow column breaks before "hand".
    { text: "Made\u00a0by " },
    { text: "hand", accent: true },
    { text: "." },
  ] as { text: string; accent?: boolean }[],

  // One line of provenance for the work below. Her degree and the rest of
  // her story are on the landing page, in aboutMe.config.ts.
  story: [
    "Since 2012, mostly on trains and planes. Three months at Accademia del Giglio, Florence.",
  ],

  // The one painting that opens the page, whole and unframed, so the work is
  // the first thing seen. It is left out of the wall below. Its size is the
  // 1024 file's, so the page keeps its place while it loads.
  lead: { id: "seated-figure", width: 1024, height: 1513 },

  closing: {
    text: "The other half of this site is the software.",
    linkLabel: "Back to the work",
  },
} as const;

export const features = {
  paintingDialog: false,
} as const;
