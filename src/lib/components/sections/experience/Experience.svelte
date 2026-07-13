<script lang="ts">
  import { experience } from "$lib/resumeData";
  import { experiencePortfolio } from "../../../../content/portfolio.config";
  import ExperienceCard from "./ExperienceCard.svelte";
</script>

<section id="work" class="section_padding section_layout">
  <h3 class="section_title">#work</h3>

  <div class="timeline">
    {#each experience as item}
      <div class="tl-entry">
        <ExperienceCard {item} copy={experiencePortfolio[item.company]} />
      </div>
    {/each}
  </div>
</section>

<style>
  .timeline {
    position: relative;
    padding-left: 1.9rem;
    width: 100%;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0.32rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 2px;
    background: linear-gradient(
      to bottom,
      var(--color-accent),
      rgba(200, 169, 126, 0.2)
    );
  }

  .tl-entry {
    position: relative;
    margin-bottom: 1.35rem;
  }

  .tl-entry:last-child {
    margin-bottom: 0;
  }

  .tl-entry::before {
    content: "";
    position: absolute;
    left: -1.9rem;
    top: 0.6rem;
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 999px;
    background: var(--color-accent);
    box-shadow:
      0 0 0 4px rgba(200, 169, 126, 0.16),
      0 0 0 5px var(--color-bg);
  }

  @media (max-width: 600px) {
    .timeline {
      padding-left: 1.5rem;
    }
    .tl-entry::before {
      left: -1.5rem;
    }
  }
</style>
