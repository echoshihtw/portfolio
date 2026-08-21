import { defineConfig, devices } from "@playwright/test";

// Runs against the built site, not the dev server: every bug this suite was
// written from showed up in the production build — prerendered markup,
// hydration timing, the real CSS bundle — and several of them do not
// reproduce under `vite dev`.
//
// Known gap, deliberately not papered over: `vite preview` resolves
// extensionless paths, so a request for /blog finds build/blog.html. Vercel
// does not do this by default, which is how /blog 404'd in production while
// every local check passed (fixed with `cleanUrls` in vercel.json). This
// suite cannot catch that class of bug. Verifying against the deployed URL
// after a merge is still a separate, necessary step.
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
    command: "npx vite preview --port 4173 --outDir build",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
