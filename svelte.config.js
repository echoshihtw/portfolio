import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

// Code blocks scroll sideways when a line is long, and a scrollable region
// that cannot take focus is unreachable by keyboard: WCAG 2.1.1, and axe
// reports it as serious. tabindex="0" puts the block in the tab order so
// arrow keys can scroll it. Done at build time so it covers every post,
// including ones not written yet, rather than being remembered per post.
function rehypeFocusableCodeBlocks() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === "element" && node.tagName === "pre") {
        node.properties = { ...node.properties, tabindex: 0 };
      }
      // mdsvex hands the highlighter's output through as a raw HTML string,
      // so the <pre> it produces is never an element node a visitor can
      // match. Patch the string as well, and only when tabindex is absent.
      if (node.type === "raw" && typeof node.value === "string") {
        node.value = node.value.replace(
          /<pre(?![^>]*tabindex)/g,
          '<pre tabindex="0"'
        );
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // .md added alongside .svelte so blog posts (src/posts/*.md) compile as
  // real Svelte components, loaded dynamically by slug via
  // import.meta.glob rather than hand-built TS objects.
  extensions: [".svelte", ".md"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: [".md"],
      rehypePlugins: [rehypeFocusableCodeBlocks],
    }),
    preprocess({
      postcss: true,
    }),
    vitePreprocess({}),
  ],
  kit: {
    paths: {
      // One definition, not two. This was hardcoded to "/portfolio" while CI
      // set a BASE_PATH the config never read. They agreed only because the
      // repo happens to be named `portfolio`. On the custom domain the site is
      // served from the root, so empty is the default and the env var is the
      // escape hatch for a project-page build.
      base: process.env.BASE_PATH ?? "",
    },
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      pages: "build/", // output directory for pages
      assets: "build/", // output directory for assets
      precompress: false,
      strict: true,
    }),
  },
};

export default config;
