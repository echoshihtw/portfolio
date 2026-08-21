import type { Page } from "@playwright/test";

/** Widths worth checking: the two smallest phones still in use, the common
 *  iPhone, the first width where the header used to stop overflowing, tablet,
 *  and desktop. 414 is in the list because that was the exact boundary of a
 *  real bug — below it the theme toggle rendered off-screen. */
export const WIDTHS = [320, 360, 390, 414, 768, 1280] as const;

/** The gate is a once-per-session splash. Every test wants the page behind
 *  it, and it is dismissed by a click, never a timer. */
export async function skipGate(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("echo-gate-seen", "1");
    } catch {
      // Private mode: the gate stays, and the test that needs it says so.
    }
  });
}

/** Scrolls far enough for the header to leave the viewport, which is what
 *  makes the floating pill appear, then waits out its 220ms transition. */
export async function showFloatingNav(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".floating-nav")!).opacity ===
      "1",
    undefined,
    { timeout: 5000 }
  );
}

/** How wide the document is beyond the viewport. Anything above zero means
 *  the page scrolls sideways, which on a phone reads as a broken layout. */
export function horizontalOverflow(page: Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth
  );
}

/** The typography properties that should match across the three navs. */
export function linkStyle(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const c = getComputedStyle(el);
    return {
      fontFamily: c.fontFamily.split(",")[0],
      fontSize: c.fontSize,
      letterSpacing: c.letterSpacing,
      textTransform: c.textTransform,
      color: c.color,
    };
  }, selector);
}
