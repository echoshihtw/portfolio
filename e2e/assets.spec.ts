import { expect, test } from "@playwright/test";
import { skipGate } from "./helpers";

// Google Fonts is the one third party the site still calls. Everything else
// was removed: @iconify/svelte was resolving every icon over the network from
// api.iconify.design (falling back to api.unisvg.com), and app.html pulled the
// whole Font Awesome stylesheet from cdnjs for zero `fa-` classes.
const ALLOWED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

test.describe("third-party requests", () => {
  test.beforeEach(({ page }) => skipGate(page));

  test("the page calls nobody but the font host", async ({ page }) => {
    const external = new Set<string>();
    page.on("request", (request) => {
      const host = new URL(request.url()).hostname;
      if (host === "localhost" || host === "127.0.0.1") return;
      if (ALLOWED_HOSTS.includes(host)) return;
      external.add(host);
    });

    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.evaluate(() => window.scrollTo(0, 99999));
    await page.waitForTimeout(1500);

    expect([...external]).toEqual([]);
  });

  // Icons used to fail silently: an unknown name 404'd at the icon API and the
  // element rendered as an empty gap. simple-icons has no `riverpod` and no
  // `zustand`, and both chips shipped like that for months without anyone
  // being able to notice. Icons are bundled now, so an empty <svg> means one
  // of them failed to register.
  test("every icon renders something", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 99999));
    await page.waitForTimeout(1000);

    const empty = await page.evaluate(() =>
      [...document.querySelectorAll("svg")]
        .filter((svg) => !svg.innerHTML.trim())
        .map((svg) => svg.parentElement?.className?.toString() ?? "unknown")
    );
    expect(empty).toEqual([]);
  });
});
