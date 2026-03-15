<script>
  import HeroTyping from "$lib/components/layout/HeroTyping.svelte";
</script>

<section
  id="home"
  class="hero-section section_padding"
>
  <div class="hero-wrap">
    <p class="hero-name mono">Chun-Yu (Echo) Shih</p>

    <h1 class="hero-title">Full-Stack Engineer</h1>

    <p class="hero-tagline">
      Secure Product Architecture · Local-First Systems · End-to-End Platform
      Ownership
    </p>

    <div class="hero-subline">
      <HeroTyping />
    </div>

    <div class="hero-meta">
      <p class="hero-location mono">Taipei, Taiwan</p>
      <p class="hero-status mono">
        <span
          class="status-dot"
          aria-hidden="true"
        />
        Currently building Cosmora
      </p>
    </div>

    <div class="hero-links">
      <a
        href="#work"
        class="hero-cta"
      >
        View Work
        <span class="cta-arrow">→</span>
      </a>

      <a
        href="https://github.com/echoshihtw"
        target="_blank"
        rel="noreferrer noopener"
        class="hero-link-secondary"
      >
        GitHub
      </a>
    </div>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    overflow: hidden;
    min-height: 68vh;
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
      120% 80% at 50% 0%,
      rgba(200, 169, 126, 0.12),
      transparent 60%
    );
    z-index: -2;
  }

  .hero-section::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(247, 245, 240, 0),
      rgba(247, 245, 240, 0.36)
    );
    z-index: -1;
  }

  :global(html[data-theme="dark"]) .hero-section::before {
    background: radial-gradient(
      120% 80% at 50% 0%,
      rgba(200, 169, 126, 0.08),
      transparent 60%
    );
  }

  :global(html[data-theme="dark"]) .hero-section::after {
    background: linear-gradient(
      to bottom,
      rgba(17, 17, 16, 0),
      rgba(17, 17, 16, 0.24)
    );
  }

  .hero-wrap {
    width: 100%;
    max-width: 78ch;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .hero-name {
    margin: 0;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .hero-title {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: clamp(2.8rem, 8vw, 5.25rem);
    font-weight: 400;
    line-height: 1.02;
    color: var(--text-color);
    text-shadow:
      0 1px 0 rgba(255, 255, 255, 0.24),
      0 10px 26px rgba(200, 169, 126, 0.14);
    max-width: 16ch;
  }

  :global(html[data-theme="dark"]) .hero-title {
    text-shadow:
      0 1px 0 rgba(255, 255, 255, 0.05),
      0 10px 26px rgba(0, 0, 0, 0.28);
  }

  .hero-tagline {
    margin: 0.25rem 0 0;
    max-width: 60ch;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.82rem;
    letter-spacing: 0.045em;
    color: var(--text-muted);
    text-transform: uppercase;
    line-height: 1.65;
  }

  .hero-subline {
    margin-top: 0.15rem;
  }

  .hero-meta {
    margin-top: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.65rem;
  }

  .hero-location {
    margin: 0;
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.34rem 0.68rem;
    background: var(--surface-bg);
    font-size: 0.74rem;
    letter-spacing: 0.03em;
    color: var(--text-color);
  }

  .hero-status {
    margin: 0;
    font-size: 0.74rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
  }

  .status-dot {
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 999px;
    background: #34d399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.16);
  }

  .hero-links {
    margin-top: 0.55rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.1rem;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    padding: 0.48rem 0.86rem;
    border-radius: 999px;
    border: 1px solid var(--section-border);
    text-decoration: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-color);
    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background-color 160ms ease,
      box-shadow 160ms ease;
  }

  :global(html[data-theme="dark"]) .hero-cta {
    background: rgba(237, 236, 232, 0.05);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  }

  .hero-cta:hover {
    transform: translateY(-1px);
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.82);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }

  :global(html[data-theme="dark"]) .hero-cta:hover {
    background: rgba(237, 236, 232, 0.12);
  }

  .cta-arrow {
    transition: transform 160ms ease;
  }

  .hero-cta:hover .cta-arrow {
    transform: translateX(2px);
  }

  .hero-link-secondary {
    position: relative;
    text-decoration: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.77rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
    transition: color 160ms ease;
  }

  .hero-link-secondary::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: var(--color-accent);
    transform: scaleX(0.35);
    transform-origin: left;
    transition: transform 180ms ease;
  }

  .hero-link-secondary:hover {
    color: var(--text-color);
  }

  .hero-link-secondary:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    .hero-section {
      min-height: 60vh;
    }

    .hero-wrap {
      gap: 0.9rem;
    }
  }
</style>
