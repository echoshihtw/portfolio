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
