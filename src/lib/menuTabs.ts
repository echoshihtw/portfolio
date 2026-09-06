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

// Every entry above is an ANCHOR, and this function assumes it. Anchors only
// resolve on the one-page home, so from any other route they have to go home
// first, or the prerenderer fails the build on a link to an id that doesn't
// exist on that page.
//
// A ROUTE must never be added to `tabs`. It would come out as "//about" from
// /blog, because the branch below adds its own slash to a link that already
// starts with one, and it would be wrong in a second way too: a route is a
// place you go, not a position on this page, and the navs draw a rule
// between those. Routes go beside Blog, on the other side of that rule.
// menuTabs.test.ts holds this to it.
export function tabHref(link: string, pathname: string): string {
  return pathname === (base || "/") ? link : `${base}/${link}`;
}
