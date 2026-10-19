<script lang="ts">
  import { base } from "$app/paths";
  import { heroConfig } from "../../../../content/portfolio.config";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { trackEmail, trackResume } from "$lib/analytics";
</script>

<!-- The claim on the left, her Jakarta sketch printed into the paper on the
     right and faded on every edge, so it reads as drawn on the page rather
     than placed on it. -->
<section
  id="home"
  class="hero section_padding"
>
  <img
    class="print"
    src="{base}/assets/paintings/jakarta-1024.jpg"
    alt=""
    aria-hidden="true"
    width="1024"
    height="698"
  />

  <div class="hero-grid">
    <p class="label hero-where">{heroConfig.remoteOpen}</p>

    <h1 class="hero-headline">
      <!-- prettier-ignore -->
      {#each heroConfig.headline as part}{#if part.brush}<span class="brushed">{part.text}<svg class="brush" aria-hidden="true" viewBox="0 0 200 24" preserveAspectRatio="none"><defs><filter id="oil" x="-5%" y="-60%" width="110%" height="220%"><feTurbulence type="fractalNoise" baseFrequency="0.6 0.05" numOctaves="1" seed="7" /><feDisplacementMap in="SourceGraphic" scale="3.5" /></filter></defs><g filter="url(#oil)"><path d="M3 15 C 40 6, 92 19, 132 10 S 188 7, 197 13" fill="none" stroke="var(--brush)" stroke-width="10" stroke-linecap="round" /><path d="M10 12 C 50 5, 96 16, 136 8 S 184 6, 194 10" fill="none" stroke="var(--brush-light)" stroke-width="3" stroke-linecap="round" opacity=".8" /></g></svg></span>{:else}<span class:accent={part.accent}>{part.text}</span>{/if}{/each}
    </h1>

    {#each heroConfig.support as line}
      <p class="hero-support">{line}</p>
    {/each}

    <ul class="hero-owns">
      {#each heroConfig.owns as layer}
        <li>{layer}</li>
      {/each}
    </ul>

    <div class="hero-links">
      <a
        class="btn btn-ink"
        href={mailtoWithSubject(heroConfig.email, heroConfig.emailSubject)}
        on:click={() => trackEmail("hero")}
      >
        Email me
      </a>
      <a
        class="btn btn-line"
        href="{base}/{heroConfig.resume}"
        download
        on:click={() => trackResume("hero")}
      >
        Résumé, PDF
      </a>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
  }

  /* Lifted so the dense rows of seats sit beside the headline, in empty
     paper, and the words below it stay on clean ground. Phones leave it
     out: the hero there is already full. */
  .print {
    display: none;
    position: absolute;
    right: -3rem;
    top: -11rem;
    width: min(66vw, 60rem);
    height: auto;
    object-fit: cover;
    mix-blend-mode: var(--print-blend);
    opacity: var(--print-opacity);
    filter: var(--print-filter);
    -webkit-mask-image: radial-gradient(
      ellipse 55% 55% at 62% 55%,
      #000 25%,
      rgba(0, 0, 0, 0.4) 55%,
      transparent 100%
    );
    mask-image: radial-gradient(
      ellipse 55% 55% at 62% 55%,
      #000 25%,
      rgba(0, 0, 0, 0.4) 55%,
      transparent 100%
    );
    pointer-events: none;
  }

  .hero-grid {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-5);
    width: 100%;
    max-width: var(--content-max);
    margin: 0 auto;
  }

  .hero-where {
    margin: 0;
  }

  .hero-headline {
    margin: 0;
    font-size: var(--text-3xl);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.04em;
    max-width: 14ch;
  }

  .brushed {
    position: relative;
    isolation: isolate;
    white-space: nowrap;
  }

  .brush {
    position: absolute;
    left: -3%;
    bottom: -0.1em;
    width: 106%;
    height: 0.3em;
    overflow: visible;
    z-index: -1;
  }

  .hero-headline .accent {
    color: var(--primary);
  }

  .hero-support {
    margin: 0;
    max-width: 34ch;
    font-size: var(--text-lg);
    line-height: 1.5;
  }

  .hero-owns {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    line-height: 1.5;
    color: var(--muted);
  }

  .hero-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .hero-links .btn {
    justify-content: center;
  }

  @media (min-width: 768px) {
    .print {
      display: block;
    }
  }

  @media (min-width: 900px) {
    .hero {
      padding-top: calc(var(--section-y) * 1.4);
      padding-bottom: calc(var(--section-y) * 1.2);
    }

    .hero-grid {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--space-5);
      row-gap: var(--space-7);
      align-items: start;
    }

    .hero-where,
    .hero-headline {
      grid-column: 1 / -1;
    }

    .hero-headline {
      max-width: 13ch;
    }

    .hero-support {
      grid-column: 1 / span 5;
    }

    .hero-owns {
      grid-column: 7 / span 3;
    }

    .hero-links {
      grid-column: 10 / span 3;
      align-items: flex-end;
    }
  }
</style>
