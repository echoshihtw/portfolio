<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { heroConfig } from "../../../../content/portfolio.config";
  import HeroDiagram from "./HeroDiagram.svelte";

  // Boot-up typing: runs once on first load, skipped entirely under
  // reduced-motion. Defaults to fully revealed so SSR/no-JS never see a
  // blank headline.
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

  // Every part renders its full text; the not-yet-typed tail is hidden with
  // visibility rather than removed, so the headline lays out its final
  // shape from frame one and never re-wraps as it grows.
  $: visibleParts = heroConfig.headline.map((part, i) => {
    const shown = Math.max(
      0,
      Math.min(part.text.length, revealCount - partOffsets[i])
    );
    return {
      text: part.text.slice(0, shown),
      rest: part.text.slice(shown),
      accent: part.accent,
    };
  });

  $: caretIndex = heroConfig.headline.findIndex(
    (part, i) =>
      revealCount >= partOffsets[i] &&
      revealCount <= partOffsets[i] + part.text.length
  );

  onMount(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

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

<!-- Asymmetric: the argument on the left, an instrument on the right. The
     text column is the wider one because it is the one that gets read. -->
<section
  id="home"
  class="hero section_padding"
>
  <div class="hero-grid">
    <div class="hero-copy">
      <div class="hero-top">
        <p class="hero-kicker label">{heroConfig.kicker}</p>
        <span class="pill hero-avail">
          <span
            class="marker marker-dot"
            style="--marker: var(--accent)"
            aria-hidden="true"
          />
          {heroConfig.remoteOpen}
        </span>
      </div>

      <h1 class="hero-headline">
        <!-- prettier-ignore -->
        {#each visibleParts as part, i}<span class:accent={part.accent}>{part.text}{#if isTyping && i === caretIndex}<span class="type-caret typing" aria-hidden="true"></span>{/if}<span class="type-ghost" aria-hidden="true">{part.rest}</span></span>{/each}
      </h1>

      <div class="hero-support-group">
        {#each heroConfig.support as line, i}
          <p
            class="hero-support"
            class:lead={i === 0}
          >
            {line}
          </p>
        {/each}
      </div>

      <ul class="hero-owns">
        {#each heroConfig.owns as layer}
          <li class="pill">{layer}</li>
        {/each}
      </ul>

      <div class="hero-links">
        <a
          class="btn"
          href="mailto:{heroConfig.email}"
        >
          Email me <span class="cta-arrow">→</span>
        </a>
        <a
          class="link-cta"
          href={heroConfig.seeWorkHref}
        >
          See the case studies <span class="cta-arrow">↓</span>
        </a>
        <a
          class="link-cta"
          href="{base}/{heroConfig.resume}"
          download
        >
          Download résumé
        </a>
      </div>
    </div>

    <aside class="hero-aside">
      <HeroDiagram />
      <p class="hero-proof">
        <span class="label">Proof</span>
        {heroConfig.proofLine}
      </p>
    </aside>
  </div>
</section>

<style>
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
    width: 100%;
    max-width: var(--content-max);
    margin: 0 auto;
    animation: rise var(--dur-slow) var(--ease-out) both;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    min-width: 0;
  }

  .hero-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .hero-kicker {
    margin: 0;
  }

  .hero-avail {
    max-width: 100%;
    white-space: normal;
    line-height: 1.5;
  }

  .hero-headline {
    margin: 0;
    font-size: var(--text-3xl);
    font-weight: 600;
    line-height: var(--leading-tight);
    letter-spacing: -0.03em;
    max-width: 14ch;
  }

  /* The editorial moment: the key phrase in orange-red. */
  .hero-headline .accent {
    color: var(--accent-text);
    white-space: nowrap;
  }

  .type-ghost {
    visibility: hidden;
  }

  .type-caret {
    display: inline-block;
    width: 0.5ch;
    height: 0.85em;
    margin: 0 -0.5ch 0 0.05em;
    background: var(--primary);
    opacity: 0;
    vertical-align: -0.1em;
  }

  .type-caret.typing {
    opacity: 1;
    animation: caret-blink 0.7s step-end infinite;
  }

  @keyframes caret-blink {
    50% {
      opacity: 0;
    }
  }

  .hero-support-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .hero-support {
    margin: 0;
    max-width: 58ch;
    font-size: var(--text-sm);
    line-height: 1.65;
    color: var(--muted);
  }

  .hero-support.lead {
    font-size: var(--text-lg);
    line-height: 1.5;
    color: var(--ink);
  }

  /* Capability chips: the technical metadata of the person. */
  .hero-owns {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
    margin-top: var(--space-2);
  }

  .hero-aside {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    align-self: end;
    max-width: 24rem;
  }

  /* The caption under the figure. */
  .hero-proof {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-top: var(--space-3);
    border-top: var(--border-w) solid var(--border);
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--ink);
  }

  @media (min-width: 640px) {
    .hero-top {
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-3) var(--space-4);
    }
  }

  @media (min-width: 900px) {
    .hero {
      min-height: 78vh;
      align-items: center;
    }

    .hero-grid {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      gap: var(--space-8);
      align-items: end;
    }

    .hero-aside {
      justify-self: end;
      width: 100%;
    }
  }
</style>
