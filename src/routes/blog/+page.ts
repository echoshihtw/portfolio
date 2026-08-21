export const prerender = true;

type PostModule = {
  metadata: {
    title: string;
    date: string;
    excerpt: string;
    order?: number;
    // Saving in the CMS commits and deploys, so a post needs a way to
    // exist in the repo without being published. Absent means published:
    // forgetting the key ships the post, which is the intent for most.
    draft?: boolean;
  };
};

export async function load() {
  const modules = import.meta.glob<PostModule>("/src/posts/*.md", {
    eager: true,
  });

  const posts = Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.replace("/src/posts/", "").replace(".md", "");
      return { slug, ...mod.metadata };
    })
    .filter((post) => !post.draft);

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
