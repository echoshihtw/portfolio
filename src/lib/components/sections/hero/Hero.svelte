<script>
  import HeroTyping from "$lib/components/layout/HeroTyping.svelte";
</script>

<section
  id="home"
  class="hero-section section_padding"
>
  <div class="hero-wrap">
    <p class="hero-name">
      Chun-Yu (Echo) Shih
      <span
        class="hero-cursor"
        aria-hidden="true"
      ></span>
    </p>
    <h2 class="hero-title">Full-Stack Engineer.</h2>
    <p
      class="hero-subline"
      aria-label="Systems architecture · Offline-first · End-to-end ownership · Remote-first"
    >
      <HeroTyping />
    </p>
    <p class="hero-location">📍 Taipei, Taiwan</p>
    <div class="hero-links">
      <a href="#work">View Work ↓</a>
      <a
        href="https://github.com/echoshihtw"
        target="_blank"
        rel="noreferrer noopener"
      >
        GitHub ↑
      </a>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 64vh;
    display: grid;
    align-items: center;
  }

  .hero-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .hero-name {
    margin: 0;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.86rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .hero-cursor {
    display: inline-block;
    width: 0.55ch;
    height: 1.1em;
    margin-left: 0.2ch;
    vertical-align: -0.1em;
    background: currentColor;
    animation: hero-caret-blink 1s steps(2, start) infinite;
  }

  .hero-title {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: clamp(2.6rem, 8vw, 5.1rem);
    font-weight: 400;
    line-height: 1.04;
    color: var(--text-color);
    max-width: 14ch;
  }

  .hero-subline {
    margin: 0;
    max-width: 70ch;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.72;
  }

  .hero-location {
    margin: 0;
    width: fit-content;
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.4rem 0.75rem;
    background: var(--surface-bg);
    font-size: 0.8rem;
    font-family: "JetBrains Mono", monospace;
  }

  .hero-links {
    margin-top: 0.45rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
  }

  .hero-links a {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-color);
    border-bottom: 1px solid var(--color-accent);
    transition: color 180ms ease;
  }

  .hero-links a:hover {
    color: var(--color-accent);
  }

  @keyframes hero-caret-blink {
    50% {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      min-height: 56vh;
    }
  }
</style>
