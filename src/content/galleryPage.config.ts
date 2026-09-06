// The gallery page's copy. Who Echo is now lives on the landing page, in
// aboutMe.config.ts: this page is the work and nothing else.
export const galleryConfig = {
  heading: [
    { text: "The " },
    { text: "work", accent: true },
    { text: "." },
  ] as { text: string; accent?: boolean }[],

  intro:
    "Oil, acrylic, ink, watercolour, charcoal and one unfired clay bust. Drag a piece to rearrange the wall.",

  closing: {
    text: "The other half of this site is the software.",
    linkLabel: "See the work",
  },
} as const;

export const features = {
  paintingDialog: false,
} as const;
