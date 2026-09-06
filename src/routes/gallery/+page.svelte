<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import PaintingWall from "$lib/components/sections/paintings/PaintingWall.svelte";
  import Signature from "$lib/components/Signature.svelte";
  import { aboutConfig } from "../../content/galleryPage.config";
</script>

<Seo
  title="Echo Shih · Paintings"
  description="Painting since 2012, mostly in Tainan. A degree in Italian language and culture, and three months at Accademia del Giglio in Florence."
  path="/gallery"
/>

<div class="gallery-page">
  <section class="story section_padding">
    <figure class="portrait">
      <img
        src="{base}/{aboutConfig.portrait.src}"
        alt={aboutConfig.portrait.alt}
        width="480"
        height="574"
        draggable="false"
        decoding="async"
      />
    </figure>

    <div class="story-head">
      <p class="kicker mono">{aboutConfig.kicker}</p>
      <!-- prettier-ignore -->
      <h1>{#each aboutConfig.heading as part}<span class:accent={part.accent} data-text={part.accent ? part.text : undefined}>{part.text}</span>{/each}</h1>
    </div>

    <div class="story-text">
      {#each aboutConfig.story as paragraph}
        <p class="body">{paragraph}</p>
      {/each}
    </div>
  </section>

  <section class="section_padding">
    <h2 class="section_title">{aboutConfig.galleryHeading}</h2>
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
  .gallery-page {
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
  .gallery-page :global(h1),
  .gallery-page :global(h2),
  .gallery-page :global(h3) {
    font-family: "DM Serif Display", serif;
    font-weight: 400;
  }

  /* An L, not two columns.
  
     The photograph holds the left, spanning both rows. The name and the
     heading sit beside its top, and the prose runs underneath them, so the
     text wraps around the picture instead of standing next to it. Two equal
     columns is what a layout does when nobody decided anything; this reads
     as arranged.
  
     The photograph is on the left because she faces right in it. On the
     right she looked off the page; here she looks into her own name. */
  .story {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.6rem 3rem;
    max-width: 74rem;
    margin: 0 auto;
  }

  @media (min-width: 900px) {
    .story {
      grid-template-columns: 15rem minmax(0, 1fr);
      grid-template-rows: auto auto;
      align-items: start;
    }

    .portrait {
      grid-row: 1 / span 2;
      /* Leans past the section padding rather than lining up with it. A
         rectangular photograph could not without looking cropped; this one
         ends in torn paper, so it runs off instead of stopping. */
      margin-left: -1.75rem;
    }

    .story-head {
      align-self: end;
    }
  }

  .story-head {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
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

  .gallery-page h1 {
    margin: 0;
    /* Sized against the photograph beside it rather than against the
       viewport: the two are meant to read as one block. */
    font-size: clamp(2.6rem, 6.5vw, 4.4rem);
    line-height: 1;
    letter-spacing: -0.025em;
    text-wrap: balance;
  }

  /* The same treatment the home page gives its headline, so the two pages
     read as one site: one word in the accent, italic. */
  .gallery-page h1 .accent {
    position: relative;
    color: var(--color-accent);
    font-style: italic;
  }

  .body {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.74;
    max-width: 60ch;
  }

  /* No rule above this. The page is built out of torn edges and tape, so a
     crisp 1px line before the signature was the one hard edge on it. */
  .closing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    padding-top: 2.5rem;
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
    .gallery-page h1 .accent:hover,
    .gallery-page h1 .accent:hover::before,
    .gallery-page h1 .accent:hover::after {
      animation: none;
    }

    .gallery-page h1 .accent:hover::before,
    .gallery-page h1 .accent:hover::after {
      content: none;
    }
  }
</style>
