<script lang="ts">
  import { base } from "$app/paths";
  import { closingConfig, heroConfig } from "../../../content/portfolio.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { trackEmail, trackResume } from "$lib/analytics";

  // The page's one door, at the end: the same "Email me" as the hero, the
  // résumé beside it, and a subject for each kind of message under them.
  // Analytics keeps the "about" places it had when this sat inside Who I
  // am, so the numbers stay comparable.
  const email = mailtoWithSubject(closingConfig.email, heroConfig.emailSubject);
</script>

<section
  id="contact"
  class="section_padding section_layout section_rule"
  aria-labelledby="contact-title"
>
  <SectionHead
    number="06"
    title={closingConfig.heading}
    id="contact-title"
  />

  <div class="close">
    <!-- Her brush-face drawing, printed into the paper like the hero's
         sketch: the lead object, faded on every edge. -->
    <img
      class="print"
      src="{base}/assets/paintings/brush-face-640.webp"
      alt=""
      aria-hidden="true"
      width="640"
      height="754"
      loading="lazy"
    />

    <div class="notes">
      <p class="body">{closingConfig.body}</p>
      <div class="actions">
        <a
          class="btn btn-ink"
          href={email}
          on:click={() => trackEmail("about")}
        >
          Email me
        </a>
        <a
          class="btn btn-line"
          href="{base}/{closingConfig.resume}"
          download
          on:click={() => trackResume("about")}
        >
          Résumé, PDF
        </a>
      </div>
      <p class="ways">
        {closingConfig.ways}
        {#each closingConfig.paths as path, i}{#if i > 0}<span
              class="sep"
              aria-hidden="true"
            >
              ·
            </span>{/if}
          <a
            class="link-cta"
            href={mailtoWithSubject(closingConfig.email, path.subject)}
            on:click={() => trackEmail(`about-${path.key}`)}
          >
            {path.label}
          </a>{/each}
      </p>
    </div>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .close {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
  }

  .print {
    display: none;
  }

  .notes {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .body {
    margin: 0;
    max-width: 34ch;
    font-size: var(--text-xl);
    line-height: 1.4;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .sep {
    margin: 0 0.6em;
  }

  .ways {
    margin: 0;
    max-width: 52ch;
    font-size: var(--text-sm);
    line-height: 1.8;
    color: var(--muted);
  }

  /* From a tablet up the drawing takes the lead column, printed into the
     paper; on a phone the close is just the words and the door. */
  @media (min-width: 768px) {
    .print {
      display: block;
      width: 100%;
      max-width: 22rem;
      height: auto;
      mix-blend-mode: var(--print-blend);
      opacity: var(--print-opacity);
      filter: var(--print-filter);
      -webkit-mask-image: radial-gradient(
        ellipse 48% 48% at 50% 46%,
        #000 25%,
        rgba(0, 0, 0, 0.4) 58%,
        transparent 100%
      );
      mask-image: radial-gradient(
        ellipse 48% 48% at 50% 46%,
        #000 25%,
        rgba(0, 0, 0, 0.4) 58%,
        transparent 100%
      );
    }
  }

  @media (min-width: 900px) {
    .close {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      gap: var(--space-7);
      align-items: center;
    }

    .print {
      justify-self: center;
    }
  }
</style>
