<script lang="ts">
  import { sweepOnView } from "$lib/actions/sweepOnView";
  import { experience } from "$lib/resumeData";
  import { experiencePortfolio } from "../../../../content/portfolio.config";
  import ExperienceCard from "./ExperienceCard.svelte";
</script>

<section
  id="work"
  class="section_padding section_layout"
>
  <h3
    class="section_title"
    use:sweepOnView
  >
    #work
  </h3>

  <div class="timeline">
    {#each experience as item}
      <div class="tl-entry">
        <ExperienceCard
          {item}
          copy={experiencePortfolio[item.company]}
        />
      </div>
    {/each}
  </div>
</section>

<style>
  .timeline {
    position: relative;
    padding-left: 1.5rem;
    width: 100%;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0.32rem;
    top: 0.5rem;
    bottom: 0.5rem;
    width: 1px;
    border-radius: 999px;
    background: linear-gradient(
      to bottom,
      var(--color-accent),
      color-mix(in srgb, var(--color-accent) 20%, transparent)
    );
    /* Lightsaber glow: near-invisible in light mode, a soft mint blade-light
       in dark mode via --glow-strength, breathing gently rather than static. */
    box-shadow:
      0 0 calc(8px * var(--glow-strength)) var(--color-accent),
      0 0 calc(22px * var(--glow-strength))
        color-mix(
          in srgb,
          var(--color-accent) calc(60% * var(--glow-strength)),
          transparent
        );
    animation: blade-breathe calc(4.5s * var(--glow-strength, 0)) ease-in-out
      infinite;
  }

  @keyframes blade-breathe {
    0%,
    100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.25);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .timeline::before {
      animation: none;
    }
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
    left: -1.5rem;
    top: 0.6rem;
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 999px;
    background: var(--color-accent);
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--color-accent) 16%, transparent),
      0 0 0 5px var(--color-bg);
  }

  @media (min-width: 640px) {
    .timeline {
      padding-left: 1.9rem;
    }
    .tl-entry::before {
      left: -1.9rem;
    }
  }
</style>
