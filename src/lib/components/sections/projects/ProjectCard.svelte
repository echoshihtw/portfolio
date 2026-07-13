<script lang="ts">
  import { slide } from "svelte/transition";
  import { base } from "$app/paths";
  import type { Projects } from "../../../types/types";

  export let project: Projects[number];

  let expanded = false;
  const statusKey = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
</script>

<article
  class="row"
  class:featured={project.featured}
  class:has-media={!!project.file}
>
  {#if project.file}
    <div class="media">
      <img
        src="{base}/{project.file}"
        alt="{project.name} preview"
        loading="lazy"
      />
    </div>
  {/if}

  <div class="body">
    <div class="top">
      <div>
        <h4 class="name">{project.name}</h4>
        {#if project.subtitle}<p class="subtitle mono">{project.subtitle}</p>{/if}
      </div>
      <span class="status status-{statusKey(project.status)}">
        <span class="dot" aria-hidden="true" />
        {project.status}
      </span>
    </div>

    <p class="desc">{project.description}</p>

    {#if project.now}
      <p class="now"><span class="now-label mono">Now</span>{project.now}</p>
    {/if}

    <p class="tech mono">{project.stack.join("  ·  ")}</p>

    <div class="foot">
      <a
        class="link mono"
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {project.linkLabel || "View"}
      </a>
      {#if project.highlights?.length}
        <button
          class="expander mono"
          aria-expanded={expanded}
          on:click={() => (expanded = !expanded)}
        >
          {expanded ? "Less ↑" : "Details ↓"}
        </button>
      {/if}
    </div>

    {#if expanded && project.highlights?.length}
      <ul class="details" transition:slide|local={{ duration: 200 }}>
        {#each project.highlights as h}
          <li>{h}</li>
        {/each}
      </ul>
    {/if}
  </div>
</article>

<style>
  .row {
    display: flex;
    align-items: stretch;
    width: 100%;
    background: var(--surface-bg);
    border: 1px solid var(--section-border);
    border-radius: 4px;
    overflow: hidden;
  }

  .row.featured {
    border-color: var(--color-accent);
  }

  .media {
    flex: 0 0 38%;
    min-height: 190px;
    background: #141311;
    overflow: hidden;
    border-right: 1px solid var(--section-border);
  }

  .media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .body {
    flex: 1;
    min-width: 0;
    padding: 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
  }

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .name {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.1;
    color: var(--text-color);
  }

  .subtitle {
    margin: 0.35rem 0 0;
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    color: var(--text-muted);
  }

  .status {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .status .dot {
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 999px;
  }

  .status-live {
    color: #4a9d63;
  }
  .status-live .dot {
    background: #4a9d63;
    box-shadow: 0 0 0 3px rgba(74, 157, 99, 0.16);
  }
  .status-in-progress {
    color: #c98a2e;
  }
  .status-in-progress .dot {
    background: #e0a13a;
    box-shadow: 0 0 0 3px rgba(224, 161, 58, 0.16);
  }
  .status-archived {
    color: var(--text-muted);
  }
  .status-archived .dot {
    background: var(--text-muted);
    box-shadow: 0 0 0 3px rgba(120, 120, 120, 0.14);
  }

  .desc {
    margin: 0.85rem 0 0;
    font-size: 0.92rem;
    line-height: 1.58;
    color: var(--text-muted);
    max-width: 62ch;
  }

  .now {
    margin: 0.85rem 0 0;
    padding: 0.55rem 0.75rem;
    border-left: 2px solid var(--color-accent);
    background: rgba(200, 169, 126, 0.08);
    font-size: 0.86rem;
    line-height: 1.5;
    color: var(--text-color);
  }

  .now-label {
    display: block;
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 0.15rem;
  }

  .tech {
    margin: 0.9rem 0 0;
    font-size: 0.71rem;
    letter-spacing: 0.02em;
    color: var(--text-muted);
    opacity: 0.85;
  }

  .foot {
    margin-top: auto;
    padding-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1.3rem;
  }

  .link,
  .expander {
    font-size: 0.73rem;
    letter-spacing: 0.03em;
    color: var(--color-accent);
    text-decoration: none;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms ease;
  }

  .link:hover,
  .expander:hover {
    border-color: var(--color-accent);
  }

  .expander:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .details {
    margin: 0.85rem 0 0;
    padding-left: 1.05rem;
    list-style: disc;
    display: grid;
    gap: 0.3rem;
  }

  .details li {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  @media (max-width: 700px) {
    .row {
      flex-direction: column;
    }
    .media {
      flex: none;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 0;
      border-right: none;
      border-bottom: 1px solid var(--section-border);
    }
  }
</style>
