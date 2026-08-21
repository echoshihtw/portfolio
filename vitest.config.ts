import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Without an explicit exclude, vitest globs the whole tree — including
    // .claude/worktrees, which holds full scratch checkouts of this repo.
    // Their copies of this suite were being collected and one failed to
    // transform, so `npm test` was red locally while the real 16 tests
    // passed. CI never saw it: a fresh checkout has no worktrees.
    exclude: [
      "**/node_modules/**",
      "**/build/**",
      "**/.svelte-kit/**",
      "**/.claude/**",
      "**/e2e/**",
    ],
  },
});
