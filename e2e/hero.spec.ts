import { expect, test } from "@playwright/test";
import { skipGate } from "./helpers";

test.describe("hero headline", () => {
  test.beforeEach(({ page }) => skipGate(page));

  // The typing animation used to reveal characters by slicing them out of the
  // DOM, so the browser laid out only the text that existed so far. Two
  // consequences, both sampled here across the 900ms rather than at the end:
  // the nowrap accent span started on line one and jumped to line two once it
  // outgrew the space, and the h1 gained a line at a time (45 → 89 → 134px at
  // 390px), shoving the whole page down twice.
  for (const width of [320, 390, 768, 1280]) {
    test(`headline holds its layout while typing at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      // Fonts first, then reload so the animation restarts against settled
      // metrics. This isolates the typing from a separate, real problem:
      // with a cold cache the headline renders in the fallback font and
      // reflows by a whole line at 320px when JetBrains Mono swaps in
      // (measured: 44.5px). That is a font-loading shift, not a typing one,
      // and it wants its own fix — see the note in the README.
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await page.reload();

      const { spread, lines, lineHeight } = await page.evaluate(async () => {
        const h1 = document.querySelector(".hero-headline")!;
        const lineHeight = parseFloat(getComputedStyle(h1).lineHeight);
        const heights: number[] = [];
        const accentLines = new Set<number>();
        for (let i = 0; i < 12; i++) {
          const box = h1.getBoundingClientRect();
          const accent = h1.querySelector(".accent")!.getBoundingClientRect();
          heights.push(box.height);
          accentLines.add(Math.round((accent.top - box.top) / lineHeight));
          await new Promise((r) =>
            requestAnimationFrame(() => setTimeout(r, 90))
          );
        }
        return {
          spread: Math.max(...heights) - Math.min(...heights),
          lines: [...accentLines],
          lineHeight,
        };
      });

      // Measured against half a line rather than exact equality on purpose.
      // The bug was the headline gaining and losing whole lines — 45 → 89 →
      // 134px at 390px. A webfont swapping in mid-animation moves the height
      // by a pixel or two, which is a real layout shift but a different one,
      // and pinning this to an exact value made the test flaky under load
      // rather than making it catch more.
      expect(spread, "h1 gained or lost a line mid-animation").toBeLessThan(
        lineHeight / 2
      );
      expect(lines, '"end to end" left the second line').toEqual([1]);
    });
  }

  // The markup is whitespace-sensitive: the parts sit flush against each other
  // so no text node creeps in between them. Prettier reformatting it once
  // produced "I own it,   end to end  ." on the live page, which is why the
  // block carries a prettier-ignore.
  test("headline has no stray whitespace", async ({ page }) => {
    await page.goto("/");
    const text = (await page.locator(".hero-headline").textContent())?.trim();
    expect(text).toBe("I own it, end to end.");
  });

  // The untyped tail is hidden with visibility, not removed, so it holds the
  // layout. It must stay invisible to assistive tech as well as to eyes.
  test("the untyped tail is hidden from screen readers", async ({ page }) => {
    await page.goto("/");
    const ghosts = page.locator(".hero-headline .type-ghost");
    expect(await ghosts.count()).toBeGreaterThan(0);
    for (const ghost of await ghosts.all()) {
      await expect(ghost).toHaveAttribute("aria-hidden", "true");
    }
  });
});
