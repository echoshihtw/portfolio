<script lang="ts">
  import { experience } from "$lib/resumeData";
  import { experiencePortfolio } from "../../../../content/portfolio.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import ExperienceCard from "./ExperienceCard.svelte";
  import { base } from "$app/paths";
  import { heroConfig } from "../../../../content/portfolio.config";
  import { trackResume } from "$lib/analytics";
</script>

<section
  id="work"
  class="section_padding section_layout section_smoke"
  aria-labelledby="work-title"
>
  <SectionHead
    number="02"
    title="Where I've worked"
    id="work-title"
  >
    <a
      slot="end"
      class="link-cta"
      href="{base}/{heroConfig.resume}"
      target="_blank"
      rel="noreferrer noopener"
      on:click={() => trackResume("experience")}
    >
      Full history in the résumé ↗
    </a>
  </SectionHead>

  <div class="body">
    <ol class="timeline">
      {#each experience as item}
        <li class="entry">
          <ExperienceCard
            {item}
            copy={experiencePortfolio[item.company]}
          />
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  /* The content column starts where the section head's text starts, so
     the number sits alone in the margin. */
  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .timeline {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Jobs meet at a hairline, not inside boxes. */
  .entry {
    padding: var(--space-6) 0;
    border-top: var(--border-w) solid var(--border);
  }

  .entry:first-child {
    border-top: 0;
    padding-top: var(--space-4);
  }

  @media (min-width: 900px) {
    .body {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }

    .body > * {
      grid-column: 2;
    }
  }
</style>
