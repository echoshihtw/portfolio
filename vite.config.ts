import { sveltekit } from "@sveltejs/kit/vite";
// defineConfig comes from vitest/config, not vite: the vite one types
// UserConfigExport without `test`, so svelte-check rejects the block below
// even though vitest reads it fine.
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    outDir: "build/",
  },
  base: "/<REPO>/",
  plugins: [sveltekit()],
  // The unit tests live here rather than in a vitest.config.ts of their own,
  // so they keep the sveltekit plugin and with it $app/paths. A standalone
  // config replaces this one instead of extending it, and src/lib/menuTabs.ts
  // stops resolving.
  test: {
    // Without an explicit exclude, vitest globs the whole tree, including
    // .claude/worktrees, which holds full scratch checkouts of this repo.
    // Their copies of this suite get collected, so `npm test` can be red
    // locally while the real suite passes. CI never sees it: a fresh checkout
    // has no worktrees. e2e is Playwright's, and vitest cannot run it.
    exclude: [
      "**/node_modules/**",
      "**/build/**",
      "**/.svelte-kit/**",
      "**/.claude/**",
      "**/e2e/**",
    ],
  },
});
