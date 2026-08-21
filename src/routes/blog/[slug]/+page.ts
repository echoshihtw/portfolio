import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = true;

const modules = import.meta.glob("/src/posts/*.md");

export function entries() {
  return Object.keys(modules).map((path) => ({
    slug: path.replace("/src/posts/", "").replace(".md", ""),
  }));
}

export const load: PageLoad = async ({ params }) => {
  const path = `/src/posts/${params.slug}.md`;
  const importPost = modules[path];
  if (!importPost) {
    throw error(404, "Post not found");
  }

  const post = (await importPost()) as {
    default: unknown;
    metadata: { title: string; date: string; excerpt: string };
  };

  return {
    slug: params.slug,
    content: post.default,
    meta: post.metadata,
  };
};
