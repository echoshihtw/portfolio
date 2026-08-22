import { defineConfig, devices } from "@playwright/test";

// Runs against the built site, not the dev server: every bug this suite was
// written from showed up in the production build — prerendered markup,
// hydration timing, the real CSS bundle — and several of them do not
// reproduce under `vite dev`.
//
// Served with sirv rather than `vite preview`, for two reasons. Production is
// static hosting, not a SvelteKit server, and sirv resolving /blog to
// blog.html is exactly what Vercel's `cleanUrls` does — so this models the
// real host instead of a dev tool that happens to be nearby. And `vite
// preview` needs .svelte-kit/output, which means whatever runs the tests must
// have built the site itself; sirv needs only build/, so CI can hand that
// across as an artifact and test exactly what the build job produced.
//
// The gap that remains: nothing here asserts Vercel's own routing config.
// /blog 404'd in production once because adapter-static writes blog.html and
// Vercel did not strip .html — fixed with `cleanUrls`, but if that key were
// deleted from vercel.json, nothing in this suite would notice. Verifying the
// deployed URL after a merge is still a separate, necessary step.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npx sirv build --port 4173 --quiet",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
