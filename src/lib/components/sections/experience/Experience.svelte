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
      {#each experience as item, i}
        <li class="entry">
          <span
            class="tick label"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
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
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .entry {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-2);
  }

  /* A small index in the margin, ruled like an instrument scale. */
  .tick {
    color: var(--muted);
  }

  @media (min-width: 900px) {
    .body {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }

    .body > * {
      grid-column: 2;
    }

    .entry {
      grid-template-columns: 3rem minmax(0, 1fr);
      gap: var(--space-4);
      align-items: start;
    }

    .tick {
      padding-top: 1.45rem;
    }
  }
</style>
