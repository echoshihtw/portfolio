<script lang="ts">
  import { experience } from "$lib/resumeData";
  import { experiencePortfolio } from "../../../../content/portfolio.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import ExperienceCard from "./ExperienceCard.svelte";
</script>

<section
  id="work"
  class="section_padding section_layout section_rule"
  aria-labelledby="work-title"
>
  <SectionHead
    number="02"
    label="Experience"
    title="Where I've worked"
    id="work-title"
  />

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
