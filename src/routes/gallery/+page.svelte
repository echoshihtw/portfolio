<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import PaintingWall from "$lib/components/sections/paintings/PaintingWall.svelte";
  import { galleryConfig } from "../../content/galleryPage.config";
  import {
    derivativeName,
    paintingsConfig,
    WIDTHS,
  } from "../../content/paintings.config";

  const lead = galleryConfig.lead;
  const leadWork = paintingsConfig.find((work) => work.id === lead.id);
  const leadSrc = (width: number) =>
    `${base}/assets/paintings/${derivativeName(lead.id, width)}`;
  const leadDetails = [leadWork?.place, leadWork?.year]
    .filter(Boolean)
    .join(", ");
</script>

<Seo
  title="Echo Shih · Paintings"
  description="Painting since 2012, mostly at a desk or on the way somewhere. A degree in Italian language and culture, and three months at Accademia del Giglio in Florence."
  path="/gallery"
/>

<div class="gallery-page">
  <!-- The words on one side and one painting, whole and unframed, on the
       other, so the work is the first thing seen. -->
  <section class="story section_padding">
    <div class="words">
      <!-- prettier-ignore -->
      <h1>{#each galleryConfig.heading as part}<span class:accent={part.accent} data-text={part.accent ? part.text : undefined}>{part.text}</span>{/each}</h1>
      {#each galleryConfig.story as paragraph}
        <p class="intro">{paragraph}</p>
      {/each}
    </div>
    {#if leadWork}
      <figure class="lead">
        <img
          src={leadSrc(WIDTHS[1])}
          srcset="{leadSrc(WIDTHS[0])} {WIDTHS[0]}w, {leadSrc(
            WIDTHS[1]
          )} {WIDTHS[1]}w"
          sizes="(min-width: 900px) 50vw, 100vw"
          alt={leadWork.alt}
          width={lead.width}
          height={lead.height}
        />
        <figcaption>
          {leadWork.medium}{#if leadDetails}<span>{leadDetails}</span>{/if}
        </figcaption>
      </figure>
    {/if}
  </section>

  <section class="section_padding">
    <PaintingWall skip={lead.id} />
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
        ↗
      </span>
    </a>
  </section>
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

  /* Phone: the words, then the painting. Wide: the words beside it. */
  .story {
    display: grid;
    gap: var(--space-5);
    align-items: center;
  }

  .words {
    display: grid;
    gap: var(--space-4);
  }

  .lead {
    margin: 0;
  }

  /* Whole, at its own proportions, never cropped; on a wide screen it is
     capped to the first screen, so a tall painting gets narrower instead. */
  .lead img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
  }

  .lead figcaption {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-3);
    font-size: var(--text-sm);
  }

  .lead figcaption span {
    color: var(--muted);
  }

  @media (min-width: 900px) {
    .story {
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      column-gap: var(--space-7);
    }

    .lead {
      justify-self: center;
    }

    .lead img {
      width: auto;
      max-width: 100%;
      /* the header, the page's top space and the caption all fit too */
      max-height: calc(100svh - 16rem);
    }
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
  }

  /* The same treatment the home page gives its headline, so the two pages
     read as one site: the key word in her ochre. */
  .gallery-page h1 .accent {
    color: var(--accent-text);
  }

  /* No rule above this. The page is soft paper and framed work, so a
     crisp 1px line here would be the one hard edge on it. */
  .closing {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  .closing p {
    margin: 0;
    font-size: 1.02rem;
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
