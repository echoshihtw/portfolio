<script>
  import { base } from "$app/paths";
  import { heroConfig } from "../../../../content/portfolio.config";
</script>

<section id="home" class="hero-section section_padding">
  <div class="hero-wrap">
    <div class="hero-top">
      <p class="hero-kicker mono">{heroConfig.kicker}</p>
      <span class="hero-avail mono">
        <span class="avail-dot" aria-hidden="true" />
        {heroConfig.remoteOpen}
      </span>
    </div>

    <h1 class="hero-headline">
      {#each heroConfig.headline as part}<span
          class:accent={part.accent}>{part.text}</span
        >{/each}
    </h1>

    <p class="hero-support mono">{heroConfig.support}</p>

    <ul class="hero-caps">
      {#each heroConfig.capabilities as cap}
        <li>{cap}</li>
      {/each}
    </ul>

    <div class="hero-links">
      <a class="hero-cta primary" href="{base}/{heroConfig.resume}" download>
        Download résumé <span class="cta-arrow">↓</span>
      </a>
      <a class="hero-cta ghost" href={heroConfig.seeWorkHref}>
        See the work <span class="cta-arrow">→</span>
      </a>
      <a class="hero-email mono" href="mailto:{heroConfig.email}"
        >{heroConfig.email}</a
      >
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    overflow: hidden;
    min-height: 78vh;
    display: grid;
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
    max-width: 74ch;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .hero-avail {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.66rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #4a7a55;
    border: 1px solid rgba(74, 122, 85, 0.35);
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    white-space: nowrap;
  }

  :global(html[data-theme="dark"]) .hero-avail {
    color: #86c99a;
    border-color: rgba(134, 201, 154, 0.32);
  }

  .avail-dot {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 999px;
    background: #4a9d63;
    box-shadow: 0 0 0 3px rgba(74, 157, 99, 0.18);
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

  .hero-headline .accent {
    color: var(--color-accent);
    font-style: italic;
  }

  /* support / differentiator */
  .hero-support {
    margin: 0;
    max-width: 62ch;
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    line-height: 1.7;
    color: var(--text-muted);
  }

  /* capability strip — scannable in a glance, not reading */
  .hero-caps {
    list-style: none;
    margin: 0.2rem 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem 0.6rem;
    align-items: center;
  }

  .hero-caps li {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.71rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-color);
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.34rem 0.75rem;
    background: var(--surface-bg);
    transition:
      border-color 160ms ease,
      transform 160ms ease;
  }

  .hero-caps li:hover {
    border-color: var(--color-accent);
    transform: translateY(-1px);
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  }

  .hero-cta.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
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

  @media (min-width: 720px) {
    .hero-proofs {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 719px) {
    .hero-section {
      min-height: 70vh;
    }
    .hero-wrap {
      gap: 1.05rem;
    }
  }
</style>
