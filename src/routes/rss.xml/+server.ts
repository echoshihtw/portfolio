import { SITE_ORIGIN, SITE_NAME } from "$lib/seo";

export const prerender = true;

type PostModule = {
  metadata: {
    title: string;
    date: string;
    excerpt: string;
    order?: number;
    draft?: boolean;
  };
};

const escapeXml = (s: string) =>
  s.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c] as string
  );

export function GET() {
  const modules = import.meta.glob<PostModule>("/src/posts/*.md", {
    eager: true,
  });

  const posts = Object.entries(modules)
    .filter(([, mod]) => !mod.metadata.draft)
    .map(([path, mod]) => ({
      slug: path.replace("/src/posts/", "").replace(".md", ""),
      ...mod.metadata,
    }))
    // Newest first — a feed is chronological, unlike the index, which is
    // ordered editorially by `order`.
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_ORIGIN}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_ORIGIN}/blog/${p.slug}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Working notes</title>
    <link>${SITE_ORIGIN}/blog</link>
    <description>What broke, what it actually turned out to be, and what I'd do differently.</description>
    <language>en</language>
    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
