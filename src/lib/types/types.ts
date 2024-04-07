interface Project {
  name: string;
  description?: string;
  href?: string;
  file?: string;
}

interface MenuTab {
  name: string;
  link: string;
}

export type MenuTabs = MenuTab[];
export type Projects = Project[];
