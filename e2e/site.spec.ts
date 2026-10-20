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

  // The calm studio has no handwriting face anywhere.
  test("uses no handwriting face", async ({ page }) => {
    const found: string[] = [];
    for (const path of PAGES) {
      await page.goto(path);
      const hand = await page.evaluate(
        () =>
          [...document.querySelectorAll("body *")].filter((el) =>
            getComputedStyle(el).fontFamily.includes("Permanent Marker")
          ).length
      );
      if (hand) found.push(`${path}: ${hand}`);
    }
    expect(found).toEqual([]);
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

test.describe("Runway", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // The story is a strip you swipe or arrow through. It scrolls sideways
  // inside itself; the page never does.
  test("its strip scrolls sideways, the page does not", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    const strip = page.getByRole("region", { name: "How it thinks" });
    await strip.scrollIntoViewIfNeeded();
    expect(await strip.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(
      true
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth
      )
    ).toBeLessThanOrEqual(0);

    await strip.focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
    expect(await strip.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);

    await expect(page.getByRole("button", { name: /tape/i })).toHaveCount(0);
  });

  // Three cards, about as many as anyone holds in mind at once, and the two
  // decisions you can try answer a tap.
  test("its strip holds three cards, and the debt can be hidden and shown", async ({
    page,
  }) => {
    await page.goto("/");
    const strip = page.getByRole("region", { name: "How it thinks" });
    await expect(strip.locator(":scope > *")).toHaveCount(3);
    // Spending inside the living budget costs no months; going over does.
    const months = strip.locator(".spend-months");
    const lunch = strip.getByRole("button", { name: /log a \$15 lunch/i });
    await expect(months).toHaveText("3");
    for (let i = 0; i < 6; i++) await lunch.click();
    await expect(months).toHaveText("3");
    await lunch.click();
    await expect(months).toHaveText("2");

    const debt = strip.getByRole("button", { name: /debt/i });
    await expect(debt).toHaveAttribute("aria-pressed", "false");
    await debt.click();
    await expect(debt).toHaveAttribute("aria-pressed", "true");
    await debt.click();
    await expect(debt).toHaveAttribute("aria-pressed", "false");
  });

  // Hover previews a decision without committing to it; a click keeps it.
  test("hovering a decision previews it, and leaving puts it back", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const strip = page.getByRole("region", { name: "How it thinks" });
    const debt = strip.getByRole("button", { name: /debt/i });
    const pair = debt.locator(".pair");

    // A mouse is told to hover, not to tap.
    await expect(debt).toContainText(/hover to hide the debt/i);

    await debt.hover();
    await expect(pair).toHaveClass(/solo/);
    await expect(debt).toHaveAttribute("aria-pressed", "false");
    await expect(debt).toContainText(/click to keep/i);

    await page.mouse.move(0, 0);
    await expect(pair).not.toHaveClass(/solo/);
  });
});

test.describe("Hero", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // The signature is not readable as a name, so the hero types it.
  test("says whose page this is", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#home")).toContainText("Echo Shih");
  });
});

test.describe("Where I've worked", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // Four jobs, four short quiet links, not four loud identical ones.
  test("offers each job's details quietly", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("#work .reveal");
    await expect(links).toHaveCount(4);
    await expect(links.first()).toHaveText(/^\s*Details/);
    await expect(links.first()).toHaveClass(/quiet/);
  });
});

test.describe("Header", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // Out of the way while reading down; back as soon as you scroll up.
  test("hides while scrolling down and returns on scroll up", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const header = page.locator("header.header");
    const top = () => header.evaluate((el) => el.getBoundingClientRect().top);

    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(600);
    expect(await top()).toBeLessThan(-10);

    await page.mouse.wheel(0, -300);
    await page.waitForTimeout(600);
    expect(await top()).toBe(0);
  });
});

test.describe("Phone", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // WCAG 2.2 target size: every link and button takes a tap anywhere in a
  // 24px band around its centre, even when it looks smaller.
  test("every link and button is at least 24px tall to a thumb", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const small = await page.evaluate(async () => {
      const misses: string[] = [];
      for (const el of document.querySelectorAll<HTMLElement>(
        "main a, main button, footer a, footer button"
      )) {
        if (!el.offsetParent) continue;
        el.scrollIntoView({ block: "center", behavior: "instant" });
        await new Promise((r) => requestAnimationFrame(r));
        const r = el.getBoundingClientRect();
        const x = r.left + Math.min(r.width / 2, 8);
        const cy = r.top + r.height / 2;
        for (const y of [cy - 11, cy + 11]) {
          const hit = document.elementFromPoint(x, y);
          if (
            !hit ||
            !(
              el === hit ||
              el.contains(hit) ||
              (hit.contains(el) && hit === el)
            )
          ) {
            misses.push(el.textContent!.trim().slice(0, 24));
            break;
          }
        }
      }
      return misses;
    });
    expect(small).toEqual([]);
  });
});

test.describe("Clio", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // Four decisions, each a bold claim and one line on why it matters.
  test("states four decisions, each led by what it does", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const list = page
      .locator("#projects .row")
      .first()
      .locator(".decisions")
      .first();
    await expect(list.locator("li")).toHaveCount(4);
    await expect(list.locator("li strong").first()).toHaveText(
      "It does one job."
    );
  });
});
