interface Project {
  name: string;
  subtitle?: string;
  // The dialog reads why -> how -> result. Splitting these apart stops the
  // problem, the work and the evidence blurring into one paragraph.
  why: string;
  result: string;
  href: string;
  stack: string[];
  file?: string;
  linkLabel?: string;
  status: "Live" | "In Progress" | "Archived";
  highlights?: string[];
  featured?: boolean;
  // One line for the résumé PDF. Present = it appears there; absent = the
  // project is site-only. The one-page limit means this is a real choice.
  /** Present means the project earns space on the one-page CV. A project
   *  without it is site-only. Bullets rather than a paragraph because a
   *  recruiter scans: the descriptor is what earns the bullets a read. */
  resume?: {
    /** What it is, in a few words: the part that gets scanned. */
    descriptor: string;
    role: string;
    bullets: string[];
  };
  // Screenshots for the dialog, shown at their natural aspect ratio: phone
  // portraits and browser landscapes side by side, none of them cropped.
  shots?: { src: string; alt: string }[];
}

interface MenuTab {
  /** Human label, shown as-is. Both navs render this, with no stripping. */
  name: string;
  link: string;
}

export type MenuTabs = MenuTab[];
export type Projects = Project[];
