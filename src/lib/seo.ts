// One definition of the site's canonical origin. Page-specific SEO tags
// live in each route's <svelte:head> rather than app.html, because that
// template renders on every route — anything absolute put there (a
// canonical, a title, an og:url) silently follows every other page around.
export const SITE_ORIGIN = "https://echoshih.com";
export const SITE_NAME = "Echo Shih";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

/** Absolute URL for a path — canonical and og:url both require one. */
export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
