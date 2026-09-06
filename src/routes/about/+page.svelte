<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import PaintingWall from "$lib/components/sections/about/PaintingWall.svelte";
  import Signature from "$lib/components/Signature.svelte";
  import { aboutConfig } from "../../content/about.config";
  import { derivativeName, WIDTHS } from "../../content/paintings.config";

  const [, large] = WIDTHS;
</script>

<Seo
  title="Echo Shih · Paintings"
  description="Painting since 2012, mostly in Tainan. A degree in Italian language and culture, and three months at Accademia del Giglio in Florence."
  path="/about"
/>

<div class="about-page">
  <section class="section_padding">
    <div class="story">
      <div class="story-text">
        <p class="kicker mono">{aboutConfig.kicker}</p>
        <h1>{aboutConfig.heading}</h1>
        {#each aboutConfig.story as paragraph}
          <p class="body">{paragraph}</p>
        {/each}
      </div>

      <figure class="portrait">
        <img
          src="{base}/assets/paintings/{derivativeName(
            aboutConfig.portrait.id,
            large
          )}"
          alt={aboutConfig.portrait.alt}
          draggable="false"
          decoding="async"
        />
        <figcaption class="mono">{aboutConfig.portrait.caption}</figcaption>
      </figure>
    </div>
  </section>

  <section class="section_padding">
    <p class="section_title">{aboutConfig.galleryHeading}</p>
    <PaintingWall />
  </section>

  <section class="section_padding closing">
    <p>{aboutConfig.closing.text}</p>
    <a
      class="cta mono"
      href="{base}/"
    >
      {aboutConfig.closing.linkLabel}
      <span aria-hidden="true">→</span>
    </a>
  </section>

  <!-- Where a painter signs the work: at the end, in the corner. -->
  <div class="signed">
    <Signature />
  </div>
</div>

<style>
  /* This page refuses the dark theme, deliberately.
  
     Every other page swaps to the terminal register in dark mode: indigo
     ground, mono headings, CRT scanlines over the whole thing (see
     src/app.css). Oil paintings on that read as uploaded JPEGs, and the
     cream paper of the ink drawings punches a hole straight through it.
  
     So this one page keeps its own light, like a gallery wall in a dark
     room. It is the other half of the site rather than a page that forgot
     to support dark mode, and without this comment it looks like the second
     thing. The toggle still works: it changes the header, nav and footer
     around this page. What it does not do is take the paintings with it.
  
     The tokens are redeclared rather than overridden one by one, so
     everything inside, including the wall, inherits the light set without
     knowing anything about the theme. --glow-strength at 0 is what turns
     off the dark mode glow and the scanline participation. */
  .about-page {
    --color-bg: #f7f5ee;
    --text-color: #14122a;
    --text-muted: #5b5870;
    --color-accent: #b1552e;
    --color-accent-strong: #14122a;
    --section-border: #ddd8c8;
    --surface-bg: #fcfbf5;
    --timeline-rule: #d3cdb9;
    --glow-strength: 0;

    background-color: var(--color-bg);
    color: var(--text-color);
    /* A faint plaster grain, well below where it reads as texture. It only
       stops the wall behind the work looking like a flat fill. */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
  }

  /* app.css swaps headings to JetBrains Mono in dark mode. Serif is this
     page's whole register, so it is overridden once here rather than as an
     exception scattered through the components. */
  .about-page :global(h1),
  .about-page :global(h2),
  .about-page :global(h3) {
    font-family: "DM Serif Display", serif;
    font-weight: 400;
  }

  .story {
    display: grid;
    /* minmax(0, 1fr), not 1fr: a grid track defaults to min-content, so a
       long line stretches the track past the viewport. Same reason the hero
       does it. */
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
    max-width: 68rem;
    margin: 0 auto;
  }

  @media (min-width: 860px) {
    .story {
      grid-template-columns: minmax(0, 1fr) 20rem;
      gap: 3.5rem;
      align-items: start;
    }
  }

  .story-text {
    display: flex;
    flex-direction: column;
    gap: 1.05rem;
    min-width: 0;
  }

  .kicker {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--color-accent);
  }

  .about-page h1 {
    margin: 0;
    font-size: clamp(2.2rem, 5.5vw, 3.4rem);
    line-height: 1.07;
    letter-spacing: -0.015em;
    text-wrap: balance;
  }

  .body {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.74;
    max-width: 60ch;
  }

  .portrait {
    margin: 0;
    transform: rotate(1.2deg);
  }

  .portrait img {
    display: block;
    width: 100%;
    height: auto;
    box-shadow: 0 12px 30px rgb(28 22 14 / 0.16);
    -webkit-user-drag: none;
    user-select: none;
  }

  .portrait figcaption {
    margin-top: 0.7rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .closing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    border-top: 1px solid var(--section-border);
  }

  .closing p {
    margin: 0;
    font-size: 1.02rem;
  }

  .cta {
    border: 1px solid var(--section-border);
    padding: 0.55rem 1.1rem;
    color: var(--text-color);
    text-decoration: none;
  }

  .signed {
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem 3rem;
  }

  @media (min-width: 768px) {
    .signed {
      padding: 0 2.5rem 3.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .portrait {
      transform: none;
    }
  }
</style>
