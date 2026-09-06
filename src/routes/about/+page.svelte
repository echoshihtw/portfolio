<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import PaintingWall from "$lib/components/sections/about/PaintingWall.svelte";
  import Signature from "$lib/components/Signature.svelte";
  import { aboutConfig } from "../../content/about.config";
</script>

<Seo
  title="Echo Shih · Paintings"
  description="Painting since 2012, mostly in Tainan. A degree in Italian language and culture, and three months at Accademia del Giglio in Florence."
  path="/about"
/>

<div class="about-page">
  <section class="story section_padding">
    <p class="kicker mono">{aboutConfig.kicker}</p>

    <!-- prettier-ignore -->
    <h1>{#each aboutConfig.heading as part}<span class:accent={part.accent} data-text={part.accent ? part.text : undefined}>{part.text}</span>{/each}</h1>

    <div class="story-body">
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

      <div class="story-text">
        {#each aboutConfig.story as paragraph}
          <p class="body">{paragraph}</p>
        {/each}
      </div>
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

  /* An editorial hero rather than a two-column split.
  
     The heading runs full width above everything, so it reads as the page's
     title rather than as a caption sitting beside a photograph. The image
     and the prose share the row below it, weighted toward the image because
     the image is the argument.
  
     The photograph is on the LEFT on purpose: she is facing right in it, and
     with the image on the right she looked off the page. Now she looks into
     the text. */
  .story {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    max-width: 76rem;
    margin: 0 auto;
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
    margin: 0 0 1.6rem;
    font-size: clamp(2.4rem, 7vw, 4.6rem);
    line-height: 1.02;
    letter-spacing: -0.02em;
    max-width: 16ch;
    text-wrap: balance;
  }

  /* The same treatment the home page gives its headline, so the two pages
     read as one site: one word in the accent, italic. */
  .about-page h1 .accent {
    position: relative;
    color: var(--color-accent);
    font-style: italic;
  }

  /* The RGB-split glitch from the home page's headline, lifted verbatim in
     shape and timing so the site has one glitch and not two.
  
     One deliberate difference: there it fires in dark mode only, because it
     belongs to the terminal register. Here it fires always, on a page that
     refuses dark mode entirely. That is the point. This is the painting
     half of the site, and the one word allowed to behave like the other
     half is the word "matrix".
  
     A brief jitter on hover, about 200ms. Not a loop: a glitch that never
     stops is a screensaver. */
  .about-page h1 .accent:hover {
    animation: glitch-shake 220ms steps(2, jump-none);
  }

  .about-page h1 .accent:hover::before,
  .about-page h1 .accent:hover::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    font-style: italic;
  }

  /* The dark theme's two accents, used here as the chromatic split. They
     are the colours of the register this word is borrowing from. */
  .about-page h1 .accent:hover::before {
    color: #ff5c88;
    clip-path: inset(0 0 60% 0);
    animation: glitch-shift-a 220ms steps(2, jump-none);
  }

  .about-page h1 .accent:hover::after {
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

  .story-body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  @media (min-width: 900px) {
    .story-body {
      /* The photograph is the smaller element now: a fixed narrow column
         beside the prose rather than the dominant half of the row. It still
         leads, because she is facing right and reads into the text. */
      grid-template-columns: 15rem minmax(0, 1fr);
      gap: 3.5rem;
      align-items: end;
    }
  }

  .portrait {
    margin: 0;
  }

  /* On a phone it should not fill the screen either: a portrait photograph
     at full width pushes the prose entirely below the fold. */
  .portrait {
    max-width: 15rem;
  }

  /* Leans past the section padding rather than lining up with it. A
     rectangular photograph could not do that without looking cropped; this
     one ends in stipple, so it dissolves instead of stopping. */
  @media (min-width: 900px) {
    .portrait {
      max-width: none;
      margin-left: -1.75rem;
    }
  }

  /* Cut out of its background rather than framed: no border, no shadow, no
     rounded box, because there is no rectangle left to give an edge to. An
     earlier version faded a whole scene with a radial mask, which read as a
     vignette: a photograph pretending not to have edges rather than one
     that has none. */
  .portrait img {
    display: block;
    width: 100%;
    height: auto;
    -webkit-user-drag: none;
    user-select: none;
  }

  .story-text {
    display: flex;
    flex-direction: column;
    gap: 1.05rem;
    min-width: 0;
    padding-bottom: 1.5rem;
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
    .about-page h1 .accent:hover,
    .about-page h1 .accent:hover::before,
    .about-page h1 .accent:hover::after {
      animation: none;
    }

    .about-page h1 .accent:hover::before,
    .about-page h1 .accent:hover::after {
      content: none;
    }
  }
</style>
