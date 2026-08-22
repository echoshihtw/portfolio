import { expect, test } from "@playwright/test";
import {
  horizontalOverflow,
  showFloatingNav,
  skipGate,
  WIDTHS,
} from "./helpers";

test.describe("navigation", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // The header link row scrolls horizontally on narrow phones. The theme
  // toggle used to sit inside that row with `margin-left: auto`, and an auto
  // margin in an overflowing flex container pushes past the container — so
  // the toggle rendered at x=409 whatever the viewport, off-screen on every
  // phone under 414px, and dragged a horizontal scrollbar onto the document.
  for (const width of WIDTHS) {
    test(`page does not scroll sideways at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      expect(await horizontalOverflow(page)).toBe(0);
    });

    test(`header theme toggle is on screen at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const box = await page.locator("header .nav-toggle").boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    });
  }

  // The pill is only faded out when hidden — opacity 0, but still rendered.
  // Without `inert` every control inside stayed in the tab order, so keyboard
  // focus walked into a nav nobody could see.
  test("hidden floating nav holds no focusable controls", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator(".floating-nav");
    await expect(nav).toHaveAttribute("inert", "");
    const reachable = await page.evaluate(
      () =>
        [
          ...document.querySelectorAll(".floating-nav a, .floating-nav button"),
        ].filter((el) => !el.closest("[inert]")).length
    );
    expect(reachable).toBe(0);
  });

  test("visible floating nav is reachable again", async ({ page }) => {
    await page.goto("/");
    await showFloatingNav(page);
    await expect(page.locator(".floating-nav")).not.toHaveAttribute("inert");
  });

  // The pill carries only what you cannot get by scrolling: a destination, the
  // conversion, the way back, and the theme control the vanished header took
  // with it. If section anchors reappear here, the crowding comes back with
  // them — it used to be 461px wide and its links scrolled on a phone.
  test("floating nav carries destinations, not page sections", async ({
    page,
  }) => {
    await page.goto("/");
    await showFloatingNav(page);
    const labels = await page.locator(".floating-links a").allTextContents();
    expect(labels.map((l) => l.trim())).toEqual(["Blog", "Résumé"]);
  });

  for (const width of [320, 390, 1280]) {
    test(`floating nav keeps both controls inside it at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await showFloatingNav(page);
      const inside = await page.evaluate(() => {
        const nav = document.querySelector(".floating-nav")!;
        const n = nav.getBoundingClientRect();
        const within = (el: Element) => {
          const r = el.getBoundingClientRect();
          return r.left >= n.left - 1 && r.right <= n.right + 1;
        };
        return {
          top: within(nav.querySelector(".floating-top-button")!),
          toggle: within(nav.querySelector(".floating-theme-toggle")!),
          onScreen: n.left >= 0 && n.right <= window.innerWidth,
        };
      });
      expect(inside).toEqual({ top: true, toggle: true, onScreen: true });
    });
  }

  // Sections of this page and places you go were rendered as one flat list of
  // six peers, so Blog looked like a fifth section.
  test("header separates page sections from destinations", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header .nav-sep")).toHaveCount(1);
  });

  test("Blog is marked current on the blog, in every nav", async ({ page }) => {
    await page.goto("/blog");
    const current = page.locator('[aria-current="page"]');
    await expect(current).toHaveCount(3);
    for (const text of await current.allTextContents()) {
      expect(text.trim()).toBe("Blog");
    }
  });

  test("nothing is marked current on the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[aria-current="page"]')).toHaveCount(0);
  });
});
