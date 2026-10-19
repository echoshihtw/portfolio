interface Project {
  name: string;
  /** The mono line beside the name, e.g. "In daily use · early access". */
  statusLine?: string;
  /** Her one handwritten line for the project, in Sharpie. */
  note?: string;
  /** The proof, set first and in weight. */
  fact?: string;
  /** The short notes. On a phone they open in a sheet. */
  story?: string[];
  /** Optional: not every project has somewhere to send a reader. */
  href?: string;
  stack: string[];
  /** The lead image, for a project that has no live demo, and what it shows. */
  file?: string;
  fileAlt?: string;
  /** The image's own size, so its space is kept before it loads. */
  fileSize?: { width: number; height: number };
  linkLabel?: string;
  /** "Shipped" is for work completed and handed over rather than run: not
   *  "Live", which implies something still serving traffic, and not
   *  "Archived", which reads as abandoned. */
  status: "Live" | "In Progress" | "Archived" | "Shipped";
  /** The engineering decisions, behind "Read the decisions". */
  highlights?: string[];
  /** Present means the project earns space on the one-page CV. A project
   *  without it is site-only. Bullets rather than a paragraph because a
   *  recruiter scans: the descriptor is what earns the bullets a read. */
  resume?: {
    /** What it is, in a few words: the part that gets scanned. */
    descriptor: string;
    role: string;
    bullets: string[];
  };
}

interface MenuTab {
  /** Human label, shown as-is. Both navs render this, with no stripping. */
  name: string;
  link: string;
}

export type MenuTabs = MenuTab[];
export type Projects = Project[];
