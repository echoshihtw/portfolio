import type { MenuTabs } from "$lib/types/types";

export const tabs: MenuTabs = [
  { name: "#work", link: "#work" },
  { name: "#projects", link: "#projects" },
  { name: "#skills", link: "#skills" },
  // Points at the closing section, not the footer: #footer scrolled past the
  // one call to action on the page.
  { name: "#contact", link: "#contact" },
];
