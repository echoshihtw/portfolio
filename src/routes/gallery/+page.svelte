<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import PaintingWall from "$lib/components/sections/paintings/PaintingWall.svelte";
  import Signature from "$lib/components/Signature.svelte";
  import { galleryConfig } from "../../content/galleryPage.config";
</script>

<Seo
  title="Echo Shih · Paintings"
  description="Painting since 2012, mostly at a desk or on the way somewhere. A degree in Italian language and culture, and three months at Accademia del Giglio in Florence."
  path="/gallery"
/>

<div class="gallery-page">
  <section class="story section_padding">
    <!-- prettier-ignore -->
    <h1>{#each galleryConfig.heading as part}<span class:accent={part.accent} data-text={part.accent ? part.text : undefined}>{part.text}</span>{/each}</h1>
    {#each galleryConfig.story as paragraph}
      <p class="intro">{paragraph}</p>
    {/each}
  </section>

  <section class="section_padding">
    <PaintingWall />
  </section>

  <section class="section_padding closing">
    <p>{galleryConfig.closing.text}</p>
    <a
      class="btn btn-ink"
      href="{base}/"
    >
      {galleryConfig.closing.linkLabel}
      <span
        class="cta-arrow"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  </section>

  <!-- Where a painter signs the work: at the end, in the corner. -->
  <div class="signed">
    <Signature />
  </div>
</div>

<style>
  /* This page refuses the ink theme, deliberately.

     Oil paintings on a dark ground read as uploaded JPEGs, and the cream
     paper of the ink drawings punches a hole straight through it. So this
     one page keeps its own light, like a gallery wall in a dark room. The
     toggle still works: it changes the header, nav and footer around this
     page. It does not take the paintings with it.

     The tokens are redeclared rather than overridden one by one, so
     everything inside, including the wall, inherits the cream set without
     knowing anything about the theme. */
  .gallery-page {
    --canvas: #f3f0e8;
    --ink: #171714;
    --surface: #faf8f2;
    --border: rgb(23 23 20 / 0.18);
    --border-strong: #171714;
    --muted: rgb(23 23 20 / 0.62);
    --primary: #3155d9;
    --primary-ink: #ffffff;
    --accent: #f15a3a;
    --accent-text: #dc4a2b;

    background-color: var(--canvas);
    color: var(--ink);
    /* A faint plaster grain, well below where it reads as texture. It only
       stops the wall behind the work looking like a flat fill. */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
  }

  /* The same measure as the home page: every section sits inside the
     content width, centred, so the wall never runs wider than the work. */
  .gallery-page > section {
    width: 100%;
    max-width: var(--content-max);
    margin: 0 auto;
  }

  .story {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .intro {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
    max-width: 56ch;
    color: var(--muted);
  }

  .gallery-page h1 {
    margin: 0;
    font-size: var(--text-3xl);
    line-height: var(--leading-tight);
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  /* The same treatment the home page gives its headline, so the two pages
     read as one site: the key word in orange-red. */
  .gallery-page h1 .accent {
    color: var(--accent-text);
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
