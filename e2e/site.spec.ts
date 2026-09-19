import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { expect, test } from "@playwright/test";
import { skipGate, WIDTHS } from "./helpers";

// Properties, not markup.
//
// The first version of this suite asserted the DOM: a header toggle, a
// floating nav, the hero's typing ghosts. Fifteen of those assertions were
// obsolete within a month, not because anything broke but because the design
// changed, and a test that fails when you change your mind is a chore rather
// than a guard.
//
// What survives a redesign is the set of things that must be true of any
// version of this site: it never scrolls sideways on a phone, it calls nobody
// but the font host, and no icon renders as an empty box. Those are decisions
// about what the site is, so a failure means a real regression.
//
// The page list is read from the build rather than written down, so adding a
// route covers it automatically and deleting one cannot leave a test pointing
// at a page that no longer exists.

const BUILD = "build";

function routes(): string[] {
  const found: string[] = [];

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        // _app is the bundler's output, admin is not a page anyone reads.
        if (entry.name === "_app" || entry.name === "admin") continue;
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".html")) continue;
      const path = relative(BUILD, full).split(sep).join("/");
      found.push("/" + path.replace(/(index)?\.html$/, "").replace(/\/$/, ""));
    }
  };

  walk(BUILD);
  return [...new Set(found)].sort();
}

const PAGES = routes();

// Google Fonts is the one third party the site still calls. Everything else
// was removed: @iconify/svelte resolved every icon over the network from
// api.iconify.design, and app.html pulled the whole Font Awesome stylesheet
// from cdnjs for zero `fa-` classes.
const ALLOWED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

test.describe("every page", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // A portfolio that scrolls sideways on a phone is the most visible kind of
  // broken, and the widths are the ones that caught real bugs: 414 is where
  // the theme toggle used to render off-screen.
  for (const width of WIDTHS) {
    test(`does not scroll sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });

      const overflowing: string[] = [];
      for (const path of PAGES) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        );
        if (overflow > 0) overflowing.push(`${path} by ${overflow}px`);
      }

      expect(overflowing).toEqual([]);
    });
  }

  test("calls nobody but the font host", async ({ page }) => {
    const external = new Set<string>();
    page.on("request", (request) => {
      const host = new URL(request.url()).hostname;
      if (host === "localhost" || host === "127.0.0.1") return;
      if (ALLOWED_HOSTS.includes(host)) return;
      external.add(host);
    });

    for (const path of PAGES) {
      await page.goto(path);
      await page.evaluate(() => window.scrollTo(0, 99999));
      await page.waitForTimeout(400);
    }

    expect([...external]).toEqual([]);
  });

  // Icons used to fail silently: an unknown name 404'd at the icon API and the
  // element rendered as an empty gap. simple-icons has no `riverpod` and no
  // `zustand`, and both chips shipped like that for months. Icons are bundled
  // now, so an empty <svg> means one failed to register.
  test("renders no empty icons", async ({ page }) => {
    const empty: string[] = [];

    for (const path of PAGES) {
      await page.goto(path);
      await page.evaluate(() => window.scrollTo(0, 99999));
      await page.waitForTimeout(400);

      const blanks = await page.evaluate(() =>
        [...document.querySelectorAll("svg")]
          .filter((svg) => !svg.innerHTML.trim())
          .map((svg) => svg.parentElement?.className?.toString() ?? "unknown")
      );
      empty.push(...blanks.map((where) => `${path}: ${where}`));
    }

    expect(empty).toEqual([]);
  });
});
