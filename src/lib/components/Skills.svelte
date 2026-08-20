<script lang="ts">
  import Icon from "@iconify/svelte";
  import { skillsConfig } from "../../content/portfolio.config";
  import { skillIcons } from "../../content/skillIcons";
  import { sweepOnView } from "$lib/actions/sweepOnView";
</script>

<section
  id="skills"
  class="section_padding section_layout"
>
  <h3
    class="section_title"
    use:sweepOnView
  >
    #skills
  </h3>

  <div class="skills">
    {#each skillsConfig as group}
      <div class="row">
        <p class="label mono">{group.label}</p>
        <ul class="items">
          {#each group.items as item, i}
            <li>
              {#if skillIcons[item]}
                <Icon
                  icon={skillIcons[item]}
                  class="skill-icon"
                  aria-hidden="true"
                />
              {/if}{item}{#if i < group.items.length - 1}<span
                  class="items-sep"
                  aria-hidden="true"
                >
                  ·
                </span>{/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<style>
  .skills {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.3rem;
    padding: 0.95rem 0.25rem;
    border-top: 1px solid var(--section-border);
    align-items: baseline;
  }

  .row:last-child {
    border-bottom: 1px solid var(--section-border);
  }

  .label {
    margin: 0;
    font-size: 0.7rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .items {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-color);
  }

  .items li {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .items :global(.skill-icon) {
    flex: none;
    width: 0.9em;
    height: 0.9em;
    color: var(--color-accent);
    opacity: 0.85;
  }

  .items-sep {
    margin: 0 0.5rem;
    color: var(--section-border);
  }

  @media (min-width: 640px) {
    .row {
      grid-template-columns: 10rem 1fr;
      gap: 0.4rem 1.5rem;
    }
  }
</style>
