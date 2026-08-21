import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = true;

type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  draft?: boolean;
};

const modules = import.meta.glob("/src/posts/*.md");
// Eager companion glob, metadata only, so entries() can read frontmatter
// without awaiting every module.
const metas = import.meta.glob<{ metadata: PostMeta }>("/src/posts/*.md", {
  eager: true,
});

function slugOf(path: string) {
  return path.replace("/src/posts/", "").replace(".md", "");
}

// Drafts are left out of the prerender, so they are never built and simply
// do not exist in production. They stay reachable on the dev server, which
// is what makes previewing an unpublished post possible.
export function entries() {
  return Object.entries(metas)
    .filter(([, mod]) => !mod.metadata.draft)
    .map(([path]) => ({ slug: slugOf(path) }));
}

export const load: PageLoad = async ({ params }) => {
  const path = `/src/posts/${params.slug}.md`;
  const importPost = modules[path];
  if (!importPost) {
    throw error(404, "Post not found");
  }

  const post = (await importPost()) as {
    default: unknown;
    metadata: PostMeta;
  };

  return {
    slug: params.slug,
    content: post.default,
    meta: post.metadata,
  };
};
