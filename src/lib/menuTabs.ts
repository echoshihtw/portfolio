import { base } from "$app/paths";
import type { MenuTabs } from "$lib/types/types";

// The label is the display text and nothing else; the anchor lives in `link`.
// Every nav renders `name` verbatim, so none of them has to strip anything.
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
