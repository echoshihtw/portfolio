import { base } from "$app/paths";
import type { MenuTabs } from "$lib/types/types";

// The label is the label. It used to carry the anchor's "#", which the header
// stripped for its aria-label and the floating nav stripped again for display —
// so one nav read "#work" and the other "WORK".
export const tabs: MenuTabs = [
  { name: "Work", link: "#work" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  // Points at the closing section, not the footer: #footer scrolled past the
  // one call to action on the page.
  { name: "Contact", link: "#contact" },
];

// These anchors only resolve on the one-page home. From any other route
// (e.g. /blog) the link has to go home first, or the prerenderer fails the
// build on a link to an id that doesn't exist on that page.
export function tabHref(link: string, pathname: string): string {
  return pathname === (base || "/") ? link : `${base}/${link}`;
}
