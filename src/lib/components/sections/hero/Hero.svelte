<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { heroConfig } from "../../../../content/portfolio.config";

  // Boot-up typing: dark mode only, once on first load, skipped entirely
  // under reduced-motion. Defaults to fully revealed so light mode / SSR /
  // no-JS never see a blank headline.
  const totalChars = heroConfig.headline.reduce(
    (sum, part) => sum + part.text.length,
    0
  );
  const partOffsets = (() => {
    let acc = 0;
    return heroConfig.headline.map((part) => {
      const start = acc;
      acc += part.text.length;
      return start;
    });
  })();

  let revealCount = totalChars;
  let isTyping = false;

  $: visibleParts = heroConfig.headline.map((part, i) => ({
    text: part.text.slice(
      0,
      Math.max(0, Math.min(part.text.length, revealCount - partOffsets[i]))
    ),
    accent: part.accent,
    fullText: part.text,
  }));

  onMount(() => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isDark || reduceMotion) return;

    revealCount = 0;
    isTyping = true;
    const start = performance.now();
    const duration = 900;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      revealCount = Math.round(t * totalChars);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        isTyping = false;
      }
    }
    requestAnimationFrame(tick);
  });
</script>

<section
  id="home"
  class="hero-section section_padding"
>
  <div class="hero-wrap">
    <div class="hero-top">
      <p class="hero-kicker mono">{heroConfig.kicker}</p>
      <span class="hero-avail mono">
        <span
          class="avail-dot"
          aria-hidden="true"
        />
        {heroConfig.remoteOpen}
        <span
          class="term-cursor"
          aria-hidden="true"
        >
          _
        </span>
      </span>
    </div>

    <h1 class="hero-headline">
      {#each visibleParts as part}<span
          class:accent={part.accent}
          data-text={part.accent ? part.fullText : undefined}
        >
          {part.text}
        </span>{/each}
      <span
        class="type-caret"
        class:typing={isTyping}
        aria-hidden="true"
      ></span>
    </h1>

    <p class="hero-support">{heroConfig.support}</p>

    <ul class="hero-owns">
      {#each heroConfig.owns as layer}
        <li>{layer}</li>
      {/each}
    </ul>

    <p class="hero-proofline">{heroConfig.proofLine}</p>

    <div class="hero-links">
      <a
        class="hero-cta primary"
        href="{base}/{heroConfig.resume}"
        download={heroConfig.resumeAs}
      >
        Download résumé <span class="cta-arrow">↓</span>
      </a>
      <a
        class="hero-cta ghost"
        href={heroConfig.seeWorkHref}
      >
        See the work <span class="cta-arrow">→</span>
      </a>
      <a
        class="hero-email mono"
        href="mailto:{heroConfig.email}"
      >
        {heroConfig.email}
      </a>
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    overflow: hidden;
    min-height: 70vh;
    display: grid;
    /* minmax(0, 1fr), not 1fr: a grid track defaults to min-content, so a wide
       child (the chip row, a long mono line) stretches the track past the
       viewport instead of wrapping. With overflow:hidden that reads as text
       cut off at the right edge on phones. */
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    isolation: isolate;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      120% 80% at 15% 0%,
      rgba(200, 169, 126, 0.14),
      transparent 55%
    );
    z-index: -2;
  }

  :global(html[data-theme="dark"]) .hero-section::before {
    background: radial-gradient(
      120% 80% at 15% 0%,
      rgba(200, 169, 126, 0.1),
      transparent 55%
    );
  }

  .hero-wrap {
    width: 100%;
    min-width: 0;
    max-width: min(74ch, 100%);
    display: flex;
    flex-direction: column;
    gap: 1.05rem;
    padding: 1rem;
    animation: rise 620ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-wrap {
      animation: none;
    }
  }

  /* top row */
  .hero-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .hero-kicker {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--color-accent);
  }

  /* Quiet by design: a status badge in saturated green reads as a SaaS
     product pill, not a personal introduction. Monochrome text with a thin
     accent-colored dot keeps the information without the shouting. */
  .hero-avail {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.3rem 0.75rem;
    max-width: 100%;
    /* Wraps rather than nowrap: on a narrow phone this string is longer than
       the viewport, and a nowrap pill forces the whole page to scroll
       sideways. */
    white-space: normal;
    line-height: 1.5;
  }

  .avail-dot {
    flex: none;
    width: 0.36rem;
    height: 0.36rem;
    border-radius: 999px;
    background: var(--color-accent);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--color-accent) 16%, transparent);
  }

  /* Terminal cursor: invisible in light mode, blinks in dark mode via
     --glow-strength — the "fun, cypherpunk" half of the metaphor. */
  .term-cursor {
    color: var(--color-accent);
    opacity: var(--glow-strength, 0);
    animation: cursor-blink calc(1.1s * var(--glow-strength, 0)) step-end
      infinite;
  }

  @keyframes cursor-blink {
    0%,
    49% {
      opacity: var(--glow-strength, 0);
    }
    50%,
    100% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .term-cursor {
      animation: none;
    }
  }

  /* headline */
  .hero-headline {
    margin: 0.3rem 0;
    font-family: "DM Serif Display", serif;
    font-weight: 400;
    font-size: clamp(2.6rem, 7.5vw, 4.6rem);
    line-height: 1.07;
    letter-spacing: -0.015em;
    color: var(--text-color);
    max-width: 18ch;
  }

  :global(html[data-theme="dark"]) .hero-headline {
    font-family: "JetBrains Mono", monospace;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  .hero-headline .accent {
    color: var(--color-accent);
    font-style: italic;
  }

  /* Boot-up cursor: only rendered mid-type (see isTyping in script), dark
     mode only via --glow-strength — invisible/inert once typing finishes or
     in light mode. */
  .type-caret {
    display: inline-block;
    width: 0.5ch;
    height: 0.85em;
    margin-left: 0.05em;
    background: var(--color-accent);
    opacity: 0;
    vertical-align: -0.1em;
  }

  .type-caret.typing {
    opacity: var(--glow-strength, 0);
    animation: caret-blink 0.7s step-end infinite;
  }

  @keyframes caret-blink {
    50% {
      opacity: 0;
    }
  }

  /* Hover glitch on the accent word, dark mode only: a brief RGB-split
     jitter, ~200ms, not a repeating effect. */
  :global(html[data-theme="dark"]) .hero-headline .accent {
    position: relative;
  }

  :global(html[data-theme="dark"]) .hero-headline .accent:hover {
    animation: glitch-shake 220ms steps(2, jump-none);
  }

  :global(html[data-theme="dark"]) .hero-headline .accent:hover::before,
  :global(html[data-theme="dark"]) .hero-headline .accent:hover::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    font-style: italic;
  }

  :global(html[data-theme="dark"]) .hero-headline .accent:hover::before {
    color: var(--color-highlight);
    clip-path: inset(0 0 60% 0);
    animation: glitch-shift-a 220ms steps(2, jump-none);
  }

  :global(html[data-theme="dark"]) .hero-headline .accent:hover::after {
    color: #4dd6a8;
    clip-path: inset(60% 0 0 0);
    animation: glitch-shift-b 220ms steps(2, jump-none);
  }

  @keyframes glitch-shake {
    0%,
    100% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 1px);
    }
    40% {
      transform: translate(2px, -1px);
    }
    60% {
      transform: translate(-1px, -1px);
    }
    80% {
      transform: translate(1px, 1px);
    }
  }

  @keyframes glitch-shift-a {
    0%,
    100% {
      transform: translate(0);
    }
    20% {
      transform: translate(3px, 0);
    }
    50% {
      transform: translate(-3px, 0);
    }
    80% {
      transform: translate(2px, 0);
    }
  }

  @keyframes glitch-shift-b {
    0%,
    100% {
      transform: translate(0);
    }
    20% {
      transform: translate(-3px, 0);
    }
    50% {
      transform: translate(3px, 0);
    }
    80% {
      transform: translate(-2px, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html[data-theme="dark"]) .hero-headline .accent:hover,
    :global(html[data-theme="dark"]) .hero-headline .accent:hover::before,
    :global(html[data-theme="dark"]) .hero-headline .accent:hover::after {
      animation: none;
    }
    .type-caret.typing {
      animation: none;
    }
  }

  /* support / differentiator */
  .hero-support {
    margin: 0;
    max-width: 62ch;
    font-family: "DM Sans", sans-serif;
    font-size: 0.92rem;
    letter-spacing: 0;
    line-height: 1.7;
    color: var(--text-muted);
  }

  /* capability strip — scannable in a glance, not reading */
  .hero-owns {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.85rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .hero-owns li {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }

  .hero-owns li + li::before {
    content: "·";
    margin-right: 0.85rem;
    color: var(--section-border);
  }

  /* Below 640px the "·" separator sits inside each <li>, so a flex-wrap
     line break strands it at the start of the next line ("· APIs & data
     models"). A two-column grid with no separator avoids that entirely. */
  @media (max-width: 639px) {
    .hero-owns {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem 1rem;
    }

    .hero-owns li + li::before {
      content: none;
      margin-right: 0;
    }
  }

  .hero-proofline {
    margin: 0.3rem 0 0;
    padding-top: 0.9rem;
    max-width: 60ch;
    border-top: 1px solid var(--section-border);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color);
  }

  /* actions */
  .hero-links {
    margin-top: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.9rem;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.1rem;
    border-radius: 4px;
    text-decoration: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.76rem;
    letter-spacing: 0.03em;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background-color 160ms ease,
      box-shadow 160ms ease;
  }

  .hero-cta.primary {
    background: var(--text-color);
    color: var(--color-bg);
    border-color: var(--text-color);
  }

  .hero-cta.ghost {
    border: 1px solid var(--section-border);
    color: var(--text-color);
    background: transparent;
  }

  .hero-cta.ghost:hover {
    transform: translateY(-1px);
    border-color: var(--color-accent);
  }

  .cta-arrow {
    transition: transform 160ms ease;
  }

  .hero-cta:hover .cta-arrow {
    transform: translate(2px, 0);
  }

  .hero-cta.primary:hover .cta-arrow {
    transform: translate(0, 2px);
  }

  .hero-email {
    font-size: 0.76rem;
    letter-spacing: 0.02em;
    color: var(--color-accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms ease;
  }

  .hero-email:hover {
    border-color: var(--color-accent);
  }

  @media (min-width: 768px) {
    .hero-section {
      min-height: 78vh;
    }
    .hero-wrap {
      gap: 1.25rem;
    }
  }
</style>
