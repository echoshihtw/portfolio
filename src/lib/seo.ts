import { githubUrl, linkedInUrl } from "$lib/contactLinks";

// One definition of the site's canonical origin. Page-specific SEO tags
// live in each route's <svelte:head> rather than app.html, because that
// template renders on every route — anything absolute put there (a
// canonical, a title, an og:url) silently follows every other page around.
export const SITE_ORIGIN = "https://echoshih.com";
export const SITE_NAME = "Echo Shih";
export const AUTHOR_NAME = "Echo Shih";
export const AUTHOR_JOB_TITLE = "Software Engineer";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

/** Absolute URL for a path — canonical and og:url both require one. */
export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

// sameAs is how a search engine learns that the Echo Shih here, the one on
// LinkedIn and the one on GitHub are one entity rather than three. It is
// the technical half of "mentions": links elsewhere only consolidate onto
// an identity the engine can already resolve.
const personSchema = {
  "@type": "Person",
  name: AUTHOR_NAME,
  alternateName: "Chun-Yu Shih",
  url: SITE_ORIGIN,
  jobTitle: AUTHOR_JOB_TITLE,
  sameAs: [linkedInUrl, githubUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Taipei",
    addressCountry: "TW",
  },
};

/** Person + WebSite, for non-article pages. */
export function websiteJsonLd(url: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...personSchema, "@id": `${SITE_ORIGIN}/#person` },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_ORIGIN}/#person` },
      },
      {
        "@type": "WebPage",
        url,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      },
    ],
  };
}

/** BlogPosting, for a post. datePublished must be an ISO date. */
export function articleJsonLd(opts: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    image: opts.image,
    author: { ...personSchema, "@id": `${SITE_ORIGIN}/#person` },
    publisher: { "@id": `${SITE_ORIGIN}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    url: opts.url,
  };
}

/**
 * Serialise a schema object for a <script type="application/ld+json"> tag.
 * JSON.stringify does not escape "<", so a "</script>" appearing in any
 * string value would close the tag early and spill the rest onto the page.
 */
export function jsonLdScript(schema: unknown): string {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}
