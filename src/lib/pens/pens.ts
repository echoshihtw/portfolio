// Her pens: every hand-drawn mark and doodle on the site, defined once.
// Mark.svelte and Doodle.svelte draw from here, and /pens shows them all.
//
// A mark's strokes are drawn by hand in a 300 by 120 box stretched over the
// marked words, in the order a hand would draw them. Where the box sits is the
// mark's frame: "under" for lines below the words, "around" for shapes round
// them. Each stroke is a pen width and an ink: her red pen, or the yellow
// highlighter.

export type Width = "pen" | "echo" | "fine" | "marker" | "scribble";
export type Ink = "pen" | "highlighter";
export type Stroke = { d: string; width: Width; ink?: Ink };

export type Pen = {
  label: string;
  note: string;
  frame: "under" | "around";
  strokes: Stroke[];
  /** Can run along wrapping text as one stroke (highlight and line). */
  flows?: boolean;
};

const defined = {
  highlight: {
    label: "Highlighter",
    note: "one pass of flat ink with the chisel's angled ends; drawn in CSS, not strokes",
    frame: "around",
    strokes: [],
    flows: true,
  },
  line: {
    label: "Line",
    note: "a pen line under the words, with a lighter pass just off it",
    frame: "under",
    strokes: [
      {
        d: "M4 104 C 60 98, 140 97, 210 100 C 250 101, 278 98, 296 94",
        width: "pen",
      },
      {
        d: "M14 108 C 70 103, 150 102, 220 104 C 256 105, 280 102, 290 99",
        width: "echo",
      },
    ],
    flows: true,
  },
  wavy: {
    label: "Wavy line",
    note: 'the hero\'s mark under "learn"',
    frame: "under",
    strokes: [
      {
        d: "M6 100 C 18 86, 30 86, 40 98 S 62 112, 74 98 S 98 84, 110 97 S 134 111, 146 98 S 170 85, 182 97 S 206 110, 218 97 S 242 85, 254 96 S 280 106, 296 92",
        width: "pen",
      },
      {
        d: "M14 104 C 24 92, 34 92, 44 102 S 66 114, 78 102 S 102 90, 114 101 S 138 113, 150 102 S 174 90, 186 101 S 210 112, 222 101 S 246 90, 258 100 S 282 108, 292 98",
        width: "echo",
      },
    ],
  },
  circle: {
    label: "Circle",
    note: "a loop round the words that overshoots where it began",
    frame: "around",
    strokes: [
      {
        d: "M236 22 C 196 6, 98 4, 44 22 C 6 36, 0 70, 22 90 C 52 116, 168 120, 240 104 C 292 92, 304 60, 280 36 C 262 18, 226 10, 178 12 C 150 13, 128 18, 116 24",
        width: "pen",
      },
      {
        d: "M232 26 C 190 12, 104 10, 50 26 C 14 40, 10 70, 30 88 C 60 110, 166 114, 236 100 C 284 90, 296 62, 276 40",
        width: "echo",
      },
    ],
  },
  marker: {
    label: "Marker underline",
    note: "fat, low and rough, like a felt tip",
    frame: "under",
    strokes: [
      {
        d: "M4 104 C 70 96, 150 98, 296 92",
        width: "marker",
        ink: "highlighter",
      },
    ],
  },
  scribble: {
    label: "Scribble highlight",
    note: "the highlighter scribbled back and forth",
    frame: "around",
    strokes: [
      {
        d: "M4 90 L 40 30 L 46 96 L 86 26 L 92 98 L 132 28 L 138 96 L 178 26 L 184 98 L 224 30 L 230 96 L 270 28 L 278 94 L 296 50",
        width: "scribble",
        ink: "highlighter",
      },
    ],
  },
  double: {
    label: "Double underline",
    note: "two quick passes, the second shorter",
    frame: "under",
    strokes: [
      { d: "M4 98 C 80 92, 180 94, 296 90", width: "fine" },
      { d: "M20 112 C 100 106, 190 108, 280 104", width: "fine" },
    ],
  },
  zigzag: {
    label: "Zigzag",
    note: "a sharp, fast underline",
    frame: "under",
    strokes: [
      {
        d: "M4 102 L 22 92 L 40 104 L 58 92 L 76 104 L 94 92 L 112 104 L 130 92 L 148 104 L 166 92 L 184 104 L 202 92 L 220 104 L 238 92 L 256 104 L 274 92 L 296 102",
        width: "fine",
      },
    ],
  },
  loops: {
    label: "Loops",
    note: "a looping underline, like a doodle in a margin",
    frame: "under",
    strokes: [
      {
        d: "M4 100 C 30 100, 34 80, 24 82 C 14 84, 30 110, 60 100 C 86 92, 90 80, 80 82 C 70 84, 86 110, 116 100 C 142 92, 146 80, 136 82 C 126 84, 142 110, 172 100 C 198 92, 202 80, 192 82 C 182 84, 198 110, 228 100 C 254 92, 258 80, 248 82 C 238 84, 254 110, 296 98",
        width: "fine",
      },
    ],
  },
  box: {
    label: "Box",
    note: "a box drawn round the words, not quite closed",
    frame: "around",
    strokes: [
      {
        d: "M14 14 C 100 8, 200 10, 288 16 C 292 50, 292 80, 286 108 C 200 114, 100 112, 10 106 C 6 76, 8 44, 20 10",
        width: "fine",
      },
    ],
  },
  brackets: {
    label: "Brackets",
    note: "corner brackets, like an editor's note",
    frame: "around",
    strokes: [
      { d: "M30 10 L 8 10 L 8 110 L 30 110", width: "fine" },
      { d: "M270 10 L 292 10 L 292 110 L 270 110", width: "fine" },
    ],
  },
  sparkles: {
    label: "Sparkles",
    note: "three strokes of emphasis beside the words",
    frame: "around",
    strokes: [
      { d: "M298 30 L 316 14", width: "fine" },
      { d: "M302 60 L 326 58", width: "fine" },
      { d: "M298 88 L 316 104", width: "fine" },
    ],
  },
  arrow: {
    label: "Arrow",
    note: "a curved arrow pointing up at the words",
    frame: "under",
    strokes: [
      { d: "M150 160 C 140 140, 145 125, 150 112", width: "fine" },
      { d: "M138 124 L 150 110 L 162 124", width: "fine" },
    ],
  },
  strike: {
    label: "Strike",
    note: "crossed out, as if corrected; only for a before and after",
    frame: "around",
    strokes: [{ d: "M0 66 C 80 58, 200 62, 300 56", width: "fine" }],
  },
} satisfies Record<string, Pen>;

export type PenName = keyof typeof defined;
export const pens: Record<PenName, Pen> = defined;

/** Her favourites, the ones to reach for first. */
export const favourites: PenName[] = [
  "marker",
  "double",
  "zigzag",
  "loops",
  "box",
  "sparkles",
];

// Doodles: small icons in a 24 by 24 box, for the margin. Each means
// something; none decorates.
export const doodles = {
  // what matters most
  star: [
    "M12.2 2.6 L14.6 9.1 L21.4 9.6 L16.2 13.9 L18.1 21 L11.9 17 L5.8 21.2 L7.9 14 L2.6 9.4 L9.6 9.3 L12.5 2.9",
  ],
  // a new idea
  bulb: [
    "M9 16.5 C 9 14, 5.5 12.6, 5.6 8.8 C 5.8 4.9, 8.8 2.6, 12.2 2.7 C 15.8 2.8, 18.6 5.4, 18.4 9 C 18.2 12.6, 15 14, 15 16.6",
    "M9.2 18.6 L 14.9 18.4",
    "M10 21 L 14.2 20.9",
  ],
  // what to read next: a loose curve into the words, then its head
  arrow: [
    "M2.5 7 C 7 15.5, 14 17.6, 21 14.2",
    "M16.4 11.2 L 21.2 14.1 L 17.6 18.4",
  ],
} satisfies Record<string, string[]>;

export type DoodleName = keyof typeof doodles;
