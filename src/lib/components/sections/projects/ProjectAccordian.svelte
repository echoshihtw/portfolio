<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
</script>

<div class="project-grid">
  {#each projectsConfig as project}
    <article
      class="project-card"
      class:project-card-featured={project.featured}
    >
      <div class="project-top">
        <div>
          <h4 class="project-name">{project.name}</h4>
          {#if project.subtitle}
            <p class="project-subtitle">{project.subtitle}</p>
          {/if}
        </div>
        <p
          class="status"
          class:status-live={project.status === "Live"}
          class:status-in-progress={project.status === "In Progress"}
          class:status-archived={project.status === "Archived"}
        >
          <span
            class="status-dot"
            class:status-dot-live={project.status === "Live"}
            class:status-dot-in-progress={project.status === "In Progress"}
            class:status-dot-archived={project.status === "Archived"}
          />
          {project.status}
        </p>
      </div>

      <p class="project-description">{project.description}</p>

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

      {#if project.highlights?.length}
        <ul class="project-highlights">
          {#each project.highlights as highlight}
            <li>{highlight}</li>
          {/each}
        </ul>
      {/if}

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
    gap: 1rem;
    width: 100%;
  }

  .project-card {
    background: var(--project-card-bg);
    border: 1px solid var(--project-card-border);
    color: var(--project-card-text);
    padding: 1.2rem;
    min-height: 15.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    transition:
      border-color 180ms ease,
      transform 180ms ease;
  }

  .project-card-featured {
    border-color: var(--color-accent);
  }

  .project-image-wrap {
    border: 1px solid var(--project-card-border);
    background: #141311;
    border-radius: 0.35rem;
    overflow: hidden;
    padding: 0.4rem;
  }

  .project-image {
    width: 100%;
    height: auto;
    object-fit: contain;
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
    margin: 0.25rem 0 0;
    color: var(--project-card-muted);
    font-size: 0.92rem;
    line-height: 1.5;
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

  .status-live {
    color: #a7f3d0;
  }

  .status-in-progress {
    color: #fcd34d;
  }

  .status-archived {
    color: #cbd5e1;
  }

  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
  }

  .status-dot-live {
    background: #34d399;
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
  }

  .status-dot-in-progress {
    background: #fbbf24;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2);
  }

  .status-dot-archived {
    background: #94a3b8;
    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.18);
  }


  .project-description {
    margin: 0;
    color: var(--project-card-muted);
    font-size: 0.95rem;
    line-height: 1.62;
  }

  .project-highlights {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.25rem;
  }

  .project-highlights li {
    font-size: 0.82rem;
    color: var(--project-card-text);
    line-height: 1.55;
  }

  .project-highlights li::before {
    content: "• ";
    color: var(--color-accent);
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
    margin-top: 0.4rem;
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

    .project-card-featured {
      grid-column: 1 / -1;
    }
  }
</style>
