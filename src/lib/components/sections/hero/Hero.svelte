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
    <!-- Each fact stays whole; lines break only between them. -->
    <p class="label hero-where">
      {#each heroConfig.remoteOpen as fact, i}<span class="fact">
          {fact}{i < heroConfig.remoteOpen.length - 1 ? " ·" : ""}
        </span>
        {" "}{/each}
    </p>

    <h1 class="hero-headline">
      <!-- prettier-ignore -->
      {#each heroConfig.headline as part}<span class:accent={part.accent}>{part.text}</span>{/each}
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
      ellipse closest-side at 62% 50%,
      #000 25%,
      rgba(0, 0, 0, 0.4) 55%,
      transparent 100%
    );
    mask-image: radial-gradient(
      ellipse closest-side at 62% 50%,
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
    /* The content width every section has inside its padding. */
    max-width: calc(var(--content-max) - 2 * var(--space-6));
    margin: 0 auto;
  }

  .hero-where {
    margin: 0;
  }

  .hero-where .fact {
    white-space: nowrap;
  }

  .hero-headline {
    margin: 0;
    font-size: clamp(2.9rem, 9vw, 7rem);
    font-weight: 600;
    line-height: 0.98;
    letter-spacing: -0.045em;
    max-width: 12ch;
  }

  .hero-headline .accent {
    color: var(--accent-text);
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
    font-size: var(--text-sm);
    line-height: 1.5;
  }

  .hero-owns li {
    border-top: 1px solid var(--border);
    padding-top: var(--space-1);
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

  /* Three columns need 1024px: below it the list of what she owns wraps,
     and one fact must never split across lines. */
  @media (min-width: 1024px) {
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
      grid-column: 6 / span 4;
    }

    .hero-links {
      grid-column: 10 / span 3;
      align-items: flex-end;
    }
  }
</style>
