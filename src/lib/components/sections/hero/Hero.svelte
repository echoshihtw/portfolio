<script lang="ts">
  import { base } from "$app/paths";
  import {
    RESUME_LABEL,
    heroConfig,
  } from "../../../../content/portfolio.config";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { trackEmail, trackResume } from "$lib/analytics";
</script>

<!-- An editorial page: her facts along the top, the claim large at the
     foot, then the line on what she does, the two links and her slogan. -->
<section
  id="home"
  class="hero section_padding"
>
  <div class="hero-grid">
    <ul class="hero-facts">
      {#each heroConfig.remoteOpen as fact}<li>{fact}</li>{/each}
    </ul>

    <h1 class="hero-headline">
      <!-- prettier-ignore -->
      {#each heroConfig.headline as part}<span class:accent={part.accent}>{part.text}</span>{/each}
    </h1>

    <div class="hero-foot">
      <div class="hero-say">
        {#each heroConfig.support as line}
          <p class="hero-support">{line}</p>
        {/each}

        <div class="hero-links">
          <a
            href={mailtoWithSubject(heroConfig.email, heroConfig.emailSubject)}
            on:click={() => trackEmail("hero")}
          >
            Email me
          </a>
          <a
            href="{base}/{heroConfig.resume}"
            download
            on:click={() => trackResume("hero")}
          >
            {RESUME_LABEL}
          </a>
        </div>
      </div>

      <!-- Her slogan, quiet, last. -->
      <p class="hero-owns">{heroConfig.owns.join(", ")}.</p>
    </div>
  </div>
</section>

<style>
  .hero-grid {
    display: grid;
    gap: var(--space-7);
    width: 100%;
    max-width: calc(var(--content-max) - 2 * var(--space-6));
    margin: 0 auto;
  }

  .hero-grid p {
    margin: 0;
  }

  /* Each fact its own column, so none splits across lines. */
  .hero-facts {
    list-style: none;
    margin-top: var(--space-5);
    padding: var(--space-3) 0 0;
    border-top: 1px solid var(--ink);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-5);
    font-size: var(--text-sm);
  }

  /* The last fact is that she is available: the one a reader acts on, so it
     carries the ochre of "learn.". */
  .hero-facts li:last-child::before {
    content: "";
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    margin-right: 0.5em;
    border-radius: 50%;
    background: var(--accent-shape);
  }

  .hero-headline {
    margin: 0;
    font-size: clamp(2.75rem, 8.4vw, 8.5rem);
    font-weight: 600;
    line-height: 0.98;
    letter-spacing: -0.035em;
    max-width: 14ch;
  }

  .hero-headline .accent {
    color: var(--accent-text);
  }

  .hero-foot {
    display: grid;
    gap: var(--space-5);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border);
  }

  .hero-say {
    display: grid;
    gap: var(--space-3);
  }

  .hero-support {
    max-width: 34ch;
    font-size: var(--text-lg);
    line-height: 1.5;
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-5);
  }

  .hero-links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: var(--text-lg);
    font-weight: 500;
    color: var(--ink);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.3em;
  }

  .hero-links a:hover {
    text-decoration-color: var(--accent-text);
  }

  .hero-owns {
    color: var(--muted);
  }

  @media (min-width: 1024px) {
    .hero-foot {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      column-gap: var(--space-5);
      align-items: end;
    }

    .hero-say {
      grid-column: 1 / span 6;
    }

    .hero-owns {
      grid-column: 10 / span 3;
      /* the links' 44px line, so the slogan shares their baseline */
      line-height: 44px;
      text-align: right;
    }
  }
</style>
