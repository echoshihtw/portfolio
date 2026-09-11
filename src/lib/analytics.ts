import { browser } from "$app/environment";
import { track } from "@vercel/analytics";

// Two events, deliberately. The site gets a handful of visitors a week, so
// most metrics are noise at this volume: "résumé opened" and "email clicked"
// are the only two that mean anything on their own, because both are
// intent rather than traffic.
//
// Nothing here identifies anyone. Vercel Analytics is cookieless, which is
// why the site carries no consent banner, and these events add no cookie
// and no identifier of their own.

/**
 * Which call to action was used. This is the interesting half of the data:
 * the same résumé link sits in four places, and knowing that people take it
 * from the header rather than the hero would change where it goes.
 */
export type CtaPlace =
  "hero" | "about" | "about-role" | "about-project" | "header" | "footer";

/**
 * `track` is client-only. A click handler cannot fire during prerender, so
 * this guard is belt and braces, but it also documents that these are never
 * to be called from load functions or server code.
 */
function event(name: string, place: CtaPlace) {
  if (!browser) return;
  track(name, { place });
}

/** The actual conversion on this site: someone wanted the PDF. */
export function trackResume(place: CtaPlace) {
  event("resume_opened", place);
}

/** The only other real intent signal on the page. */
export function trackEmail(place: CtaPlace) {
  event("email_clicked", place);
}
