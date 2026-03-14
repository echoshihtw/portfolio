<script lang="ts">
  import { skills } from "$lib/resumeData";
</script>

<section
  id="skills"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#skills</h3>

  <div class="skills-grid">
    {#each skills as group}
      <article class="skills-group">
        <h4>{group.category}</h4>
        <div class="skills-tags">
          {#each group.items as skill}
            <span>{skill}</span>
          {/each}
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .skills-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }

  .skills-group {
    border: 1px solid var(--section-border);
    background: var(--surface-bg);
    padding: 0.95rem;
  }

  .skills-group h4 {
    margin: 0 0 0.7rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .skills-tags span {
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
    font-family: "JetBrains Mono", monospace;
  }

  @media (min-width: 768px) {
    .skills-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
