import { error } from "@sveltejs/kit";
import { blogPosts } from "../../../content/blog.config";
import type { PageLoad } from "./$types";

export const prerender = true;

export function entries() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const load: PageLoad = ({ params }) => {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    throw error(404, "Post not found");
  }
  return { post };
};
