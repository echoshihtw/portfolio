<script lang="ts">
  import { skillsConfig } from "../../content/portfolio.config";
</script>

<section id="skills" class="section_padding section_layout">
  <h3 class="section_title">#skills</h3>

  <div class="skills">
    {#each skillsConfig as group}
      <div class="row">
        <p class="label mono">{group.label}</p>
        <p class="items">{group.items.join("  ·  ")}</p>
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
    grid-template-columns: 10rem 1fr;
    gap: 0.4rem 1.5rem;
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
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-color);
  }

  @media (max-width: 560px) {
    .row {
      grid-template-columns: 1fr;
      gap: 0.3rem;
    }
  }
</style>
