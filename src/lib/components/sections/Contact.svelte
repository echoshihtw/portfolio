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
    <!-- Her brush-face drawing, printed faintly behind the words, the way
         the hero's sketch sits behind the headline. -->
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
      <p class="lead">{closingConfig.lead}</p>
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

  /* The close is the one centred section (DESIGN.md): the words lead, the
     door sits under them, and the drawing stays behind. */
  .close {
    position: relative;
    isolation: isolate;
    display: grid;
    justify-items: center;
    padding: var(--space-7) 0 var(--space-6);
    text-align: center;
  }

  .print {
    display: none;
  }

  .notes {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
  }

  .lead {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .body {
    margin: calc(var(--space-3) * -1) 0 0;
    max-width: 44ch;
    font-size: var(--text-lg);
    line-height: 1.5;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
  }

  .sep {
    margin: 0 0.6em;
  }

  .ways {
    margin: 0;
    max-width: 46ch;
    font-size: var(--text-sm);
    line-height: 1.8;
    color: var(--muted);
  }

  @media (min-width: 768px) {
    .print {
      display: block;
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: min(26rem, 60%);
      height: auto;
      transform: translate(-50%, -50%);
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
      pointer-events: none;
    }
  }
</style>
