interface Project {
  name: string;
  subtitle?: string;
  description: string;
  href: string;
  stack: string[];
  file?: string;
  linkLabel?: string;
  status: "Live" | "In Progress" | "Archived";
  highlights?: string[];
  featured?: boolean;
  now?: string;
  // One line for the résumé PDF. Present = it appears there; absent = the
  // project is site-only. The one-page limit means this is a real choice.
  resumeLine?: string;
}

interface MenuTab {
  name: string;
  link: string;
}

export type MenuTabs = MenuTab[];
export type Projects = Project[];
