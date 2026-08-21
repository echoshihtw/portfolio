export const prerender = true;

type PostModule = {
  metadata: { title: string; date: string; excerpt: string; order?: number };
};

export async function load() {
  const modules = import.meta.glob<PostModule>("/src/posts/*.md", {
    eager: true,
  });

  const posts = Object.entries(modules).map(([path, mod]) => {
    const slug = path.replace("/src/posts/", "").replace(".md", "");
    return { slug, ...mod.metadata };
  });

  // order (frontmatter) is the editorial ranking, not date — a stronger
  // older post can outrank a weaker newer one. Falls back to date when
  // order is tied or unset.
  posts.sort((a, b) => {
    const orderDiff = (a.order ?? 0) - (b.order ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return b.date.localeCompare(a.date);
  });

  return { posts };
}
