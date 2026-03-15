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
}

interface MenuTab {
  name: string;
  link: string;
}

export type MenuTabs = MenuTab[];
export type Projects = Project[];
