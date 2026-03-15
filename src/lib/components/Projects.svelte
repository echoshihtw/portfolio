<script lang="ts">
  import { projects } from "$lib/resumeData";
</script>

<section
  id="projects"
  class="w-full section_padding section_layout"
>
  <h3 class="section_title">#projectsConfig</h3>

  <div class="projects-grid">
    {#each projects as project}
      <article class="project-card">
        <h4 class="project-name">{project.name}</h4>
        <p class="project-meta">{project.subtitle ?? project.status}</p>

        {#if (project.stack ?? []).length > 0}
          <div class="stack-list">
            {#each project.stack ?? [] as tech}
              <span class="stack-item">{tech}</span>
            {/each}
          </div>
        {/if}

        {#if (project.highlights ?? []).length > 0}
          <ul class="project-highlights">
            {#each project.highlights ?? [] as bullet}
              <li>{bullet}</li>
            {/each}
          </ul>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style>
  .projects-grid {
    width: 100%;
    display: grid;
    gap: 1rem;
  }

  .project-card {
    border: 1px solid var(--project-card-border);
    background: var(--project-card-bg);
    color: var(--project-card-text);
    padding: 1.15rem;
  }

  .project-name {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: 1.55rem;
    line-height: 1.1;
  }

  .project-meta {
    margin: 0.3rem 0 0;
    color: var(--project-card-muted);
    font-style: italic;
  }

  .stack-list {
    margin-top: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stack-item {
    border: 1px solid var(--project-card-border);
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
    font-family: "JetBrains Mono", monospace;
  }

  .project-highlights {
    margin: 0.8rem 0 0;
    padding-left: 1rem;
    display: grid;
    gap: 0.25rem;
    line-height: 1.55;
  }
</style>
