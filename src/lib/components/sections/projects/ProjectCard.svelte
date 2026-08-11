<script lang="ts">
  import type { Projects } from "$lib/types/types";

  type Project = Projects[number];

  export let project: Project;
  export let onOpen: (project: Project) => void;

  const slug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");
</script>

<!-- A button, not a div with a click handler: keyboard and screen readers get
     it for free, and the whole card is one target rather than a link buried
     inside text. -->
<button
  class="card"
  class:featured={project.featured}
  on:click={() => onOpen(project)}
>
  <span class="top">
    <span class="name">{project.name}</span>
    <span class="status status-{slug(project.status)}">
      <span
        class="dot"
        aria-hidden="true"
      />
      {project.status}
    </span>
  </span>

  <span class="hook">{project.subtitle}</span>

  <span class="more mono">Read more →</span>
</button>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    height: 100%;
    padding: 1.15rem 1.25rem 1rem;
    text-align: left;
    font: inherit;
    color: inherit;
    background: var(--surface-bg);
    border: 1px solid var(--section-border);
    border-radius: 4px;
    cursor: pointer;
    transition:
      border-color 160ms ease,
      transform 160ms ease;
  }

  .card:hover,
  .card:focus-visible {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .card.featured {
    border-color: color-mix(in srgb, var(--color-accent) 55%, transparent);
  }

  .top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .name {
    font-family: "DM Serif Display", serif;
    font-size: 1.35rem;
    line-height: 1.1;
    color: var(--text-color);
  }

  .hook {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  .more {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  /* status */
  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.62rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: currentColor;
  }

  .status-live {
    color: #4a9d63;
  }

  .status-in-progress {
    color: var(--color-accent);
  }

  .status-archived {
    color: var(--text-muted);
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card:hover {
      transition: none;
      transform: none;
    }
  }
</style>
