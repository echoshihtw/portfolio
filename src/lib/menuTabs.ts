import { base } from "$app/paths";

// Anchors only resolve on the one-page home, so from any other route they go
// home first, or the prerenderer fails the build on a link to a missing id.
export function tabHref(link: string, pathname: string): string {
  return pathname === (base || "/") ? link : `${base}/${link}`;
}
