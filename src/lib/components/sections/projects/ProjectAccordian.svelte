<script lang="ts">
  import { projects } from "$lib/projects";
</script>

<div class="project-grid">
  {#each projects as project}
    <article class="project-card">
      {#if project.file}
        <div class="project-image-wrap">
          <img
            class="project-image"
            src={`${project.file}`}
            alt={`${project.name} preview`}
            loading="lazy"
          />
        </div>
      {/if}

      <div class="project-top">
        <div>
          <h4 class="project-name">{project.name}</h4>
          {#if project.subtitle}
            <p class="project-subtitle">{project.subtitle}</p>
          {/if}
        </div>
        <p class="status">
          <span class="status-dot" />
          {project.status}
        </p>
      </div>

      <p class="project-description">{project.description}</p>

      <div class="stack-list">
        {#each project.stack as stackItem}
          <span class="stack-pill">{stackItem}</span>
        {/each}
      </div>

      <a
        class="project-link"
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {project.linkLabel || "Live Demo →"}
      </a>
    </article>
  {/each}
</div>

<style>
  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    width: 100%;
  }

  .project-card {
    background: var(--project-card-bg);
    border: 1px solid var(--project-card-border);
    color: var(--project-card-text);
    padding: 1.75rem;
    min-height: 18rem;
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
    transition:
      border-color 180ms ease,
      transform 180ms ease;
  }

  .project-image-wrap {
    border: 1px solid var(--project-card-border);
    background: #141311;
    border-radius: 0.35rem;
    overflow: hidden;
    aspect-ratio: 16 / 9;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .project-card:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .project-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .project-name {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: 1.6rem;
    line-height: 1.1;
  }

  .project-subtitle {
    margin: 0.4rem 0 0;
    color: var(--project-card-muted);
    font-size: 0.98rem;
    line-height: 1.7;
  }

  .status {
    margin: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.74rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #a7f3d0;
  }

  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: #34d399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
  }

  .project-description {
    margin: 0;
    color: var(--project-card-muted);
    font-size: 1rem;
    line-height: 1.78;
  }

  .stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: auto;
  }

  .stack-pill {
    border: 1px solid var(--project-card-border);
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
    font-family: "JetBrains Mono", monospace;
    color: var(--project-card-text);
    background: rgba(255, 255, 255, 0.02);
  }

  .project-link {
    margin-top: 0.8rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.78rem;
    letter-spacing: 0.03em;
    color: var(--color-accent);
    width: fit-content;
    border-bottom: 1px solid transparent;
    transition: border-color 180ms ease;
  }

  .project-link:hover {
    border-color: var(--color-accent);
  }

  @media (min-width: 768px) {
    .project-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
