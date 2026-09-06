// The gallery manifest.
//
// `source` names a file in Echo's originals folder, which lives outside the
// repo: those are phone photographs, several of them 4032px, and the repo
// has no business holding 50MB of them. Only the derivatives this produces
// are committed. Point PAINTINGS_SRC at the originals to regenerate.
//
// Captions are the medium, plus a place and a year only where they are
// known from the work itself. File dates are not years.

export type Painting = {
  id: string;
  /** Filename inside the originals folder. */
  source: string;
  medium: string;
  /** Only where Echo has confirmed it. */
  place?: string;
  /** Only where the work itself carries one. */
  year?: string;
  /** Describes the work. These are not decorative images. */
  alt: string;
  /** [x, y, w, h] as fractions of the source, from the top-left. */
  crop: [number, number, number, number];
  /**
   * Roughly how big the real object is, which drives how wide it renders.
   * A hand-sized card shown as large as a canvas is a lie about the work.
   *
   * Three buckets, not measurements: the page must never claim these are
   * shown at their true relative size, because nobody has measured them.
   */
  scale: "canvas" | "paper" | "card";
  /**
   * Echo's own words about the piece, for its dialog. Absent until she
   * writes it, and never drafted on her behalf. The dialog stays behind
   * `features.paintingDialog` until every piece has one.
   */
  note?: string;
};

/**
 * The two widths every painting ships at.
 *
 * A slot on the wall is about 400 CSS px at desktop, so 1024 already covers
 * a 2x screen with room to spare, and it is more than the dialog needs
 * (that image is capped at 66vh). 1280 was tried first and made a retina
 * desktop pull 6.8MB for one page.
 */
export const WIDTHS = [640, 1024] as const;

/** One definition of the derivative filename, so the generator that writes
 *  them and the gallery that reads them cannot drift apart. */
export function derivativeName(id: string, width: number): string {
  return `${id}-${width}.jpg`;
}

export const paintingsConfig: Painting[] = [
  {
    id: "lips",
    source: "IMG_6765.jpg",
    medium: "Oil on canvas",
    year: "2014",
    alt: "Oil painting of lips, the tongue against the teeth, deep oxblood on a golden ochre ground",
    crop: [0.012, 0.015, 0.925, 0.945],
    scale: "canvas",
  },
  {
    id: "heart-card",
    source: "IMG_1727.jpg",
    medium: "Coloured pencil on card",
    alt: "A small card with a red heart with a face on it, black ground, blue rays behind",
    crop: [0.12, 0.12, 0.75, 0.72],
    scale: "card",
  },
  {
    id: "reclining",
    source: "IMG_5095.jpg",
    medium: "Oil",
    alt: "Oil painting of a reclining figure, hand to the face, ochre and brown against a warm yellow ground",
    crop: [0, 0, 1, 0.86],
    scale: "canvas",
  },
  {
    id: "tongue",
    source: "8CDAFCFB-B51E-4606-986E-4ACFC5ED4281.jpg",
    medium: "Ink and marker on paper",
    place: "Drawn on a plane",
    year: "2019",
    alt: "Ink drawing of a mouth with the tongue out, hand lettering inside the mouth",
    crop: [0.02, 0.02, 0.95, 0.95],
    scale: "paper",
  },
  {
    id: "jakarta",
    source: "jakarta-2019.jpg",
    medium: "Pen and marker in a sketchbook",
    place: "Jakarta",
    year: "2019",
    alt: "Ink sketch of an airport departure hall, rows of seats in perspective, passengers picked out in red and blue",
    crop: [0.03, 0.02, 0.94, 0.95],
    scale: "paper",
  },
  {
    id: "pasta",
    source: "IMG_4960.jpeg",
    medium: "Oil on canvas",
    place: "Florence",
    alt: "Oil painting of a figure suspended over a bowl of pasta, a red triangle behind, two hands grating cheese as the light source",
    crop: [0.02, 0.01, 0.86, 0.97],
    scale: "canvas",
  },
  {
    id: "charcoal-head",
    source: "IMG_5209 2.jpeg",
    medium: "Charcoal and pastel on toned paper",
    place: "Florence",
    alt: "Charcoal and pastel drawing of a head seen straight on, on toned brown paper",
    crop: [0.17, 0.04, 0.8, 0.88],
    scale: "paper",
  },
  {
    id: "profile",
    source: "IMG_7092.JPG",
    medium: "Oil on canvas",
    alt: "Oil profile portrait of a woman, orange and yellow leaves in her hair, dark green ground",
    crop: [0, 0, 1, 1],
    scale: "canvas",
  },
  {
    id: "swirl-card",
    source: "IMG_1715.jpg",
    medium: "Pen and ink on card",
    alt: "A small square of dense curvilinear pen pattern with lettering worked into the swirls",
    crop: [0.1, 0.3, 0.78, 0.55],
    scale: "card",
  },
  {
    id: "heart",
    source: "IMG_6752.jpg",
    medium: "Watercolour, acrylic and pastel on paper",
    alt: "An orange and yellow heart on a purple and blue wash, red spatter around it",
    crop: [0.02, 0.01, 0.96, 0.98],
    scale: "paper",
  },
  {
    id: "bust",
    source: "IMG_5349.jpeg",
    medium: "Clay, unfired",
    place: "Florence",
    alt: "Unfired clay bust of a child, modelling tools on the table in front of it",
    crop: [0.21, 0.13, 0.53, 0.66],
    scale: "canvas",
  },
  {
    id: "hatching",
    source: "IMG_4585.jpg",
    medium: "Ballpoint pen in a sketchbook",
    alt: "Ballpoint drawing of a figure built entirely from directional hatching, with no outline",
    crop: [0, 0, 0.85, 0.82],
    scale: "paper",
  },
  {
    id: "male-portrait",
    source: "IMG_4502.jpeg",
    medium: "Acrylic",
    alt: "Acrylic portrait of a seated man, chin resting on his hand, painted in reds and pinks",
    crop: [0.09, 0.1, 0.78, 0.85],
    scale: "paper",
  },
  {
    id: "seated-figure",
    source: "IMG_4517.jpeg",
    medium: "Acrylic on tan paper",
    alt: "Acrylic painting of a seated figure in blue and pink on tan paper",
    crop: [0.05, 0.08, 0.85, 0.88],
    scale: "paper",
  },
  {
    id: "working",
    source: "IMG_6749.jpg",
    medium: "Photograph",
    alt: "Echo's hands at a table, a brush in one and a palette knife in the other, working on a purple and blue painting",
    crop: [0, 0, 1, 0.85],
    scale: "paper",
  },
];
