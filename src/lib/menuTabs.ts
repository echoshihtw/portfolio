import { base } from "$app/paths";
import type { MenuTabs } from "$lib/types/types";

// The label is the display text and nothing else; the anchor lives in `link`.
// Every nav renders `name` verbatim, so none of them has to strip anything.
export const tabs: MenuTabs = [
  { name: "Work", link: "#work" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  // A route, not an anchor. See tabHref: the two need opposite treatment.
  { name: "About", link: "/about" },
  // Points at the closing section, not the footer: #footer scrolled past the
  // one call to action on the page.
  { name: "Contact", link: "#contact" },
];

// Two kinds of entry live in `tabs`, and they need opposite treatment.
//
// An ANCHOR only resolves on the one-page home. From any other route (e.g.
// /blog) it has to go home first, or the prerenderer fails the build on a
// link to an id that doesn't exist on that page.
//
// A ROUTE resolves everywhere and always wants the same href. Running one
// through the anchor branch produced "//about" from /blog, because that
// branch adds its own slash to a link that already starts with one.
export function tabHref(link: string, pathname: string): string {
  if (!link.startsWith("#")) return `${base}${link}`;
  return pathname === (base || "/") ? link : `${base}/${link}`;
}
