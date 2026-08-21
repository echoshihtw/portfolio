import { SITE_ORIGIN } from "$lib/seo";

export const prerender = true;

type PostModule = {
  metadata: { date: string; draft?: boolean };
};

/**
 * Built from the same source the blog index reads, so a new post appears
 * here automatically and a draft never does — a sitemap listing URLs that
 * 404 is worse than no sitemap.
 */
export function GET() {
  const modules = import.meta.glob<PostModule>("/src/posts/*.md", {
    eager: true,
  });

  const posts = Object.entries(modules)
    .filter(([, mod]) => !mod.metadata.draft)
    .map(([path, mod]) => ({
      slug: path.replace("/src/posts/", "").replace(".md", ""),
      lastmod: String(mod.metadata.date).slice(0, 10),
    }));

  const urls = [
    { loc: `${SITE_ORIGIN}/`, priority: "1.0" },
    { loc: `${SITE_ORIGIN}/blog`, priority: "0.8" },
    ...posts.map((p) => ({
      loc: `${SITE_ORIGIN}/blog/${p.slug}`,
      lastmod: p.lastmod,
      priority: "0.7",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n${
        "lastmod" in u && u.lastmod
          ? `    <lastmod>${u.lastmod}</lastmod>\n`
          : ""
      }    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
