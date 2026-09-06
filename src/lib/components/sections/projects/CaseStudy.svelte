<script lang="ts">
  import type { Projects } from "$lib/types/types";

  type Project = Projects[number];

  export let project: Project;
  export let index: number;
  export let onOpen: (project: Project) => void;

  const slug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

  // Three decisions on the page; the rest wait in the full study.
  $: decisions = project.highlights?.slice(0, 3) ?? [];
  $: more = Math.max(0, (project.highlights?.length ?? 0) - decisions.length);
  $: number = String(index + 1).padStart(2, "0");
  $: titleId = `case-${slug(project.name)}-title`;
</script>

<!-- A research entry, not a card: number and metadata in the margin, the
     story beside it under mono labels. Same fields for every study, so a
     reader can compare down the page. -->
<article
  class="study"
  class:featured={project.featured}
  aria-labelledby={titleId}
>
  <div class="margin">
    <span
      class="num section-num"
      aria-hidden="true"
    >
      {number}
    </span>
    <dl class="meta">
      <div>
        <dt class="label">Status</dt>
        <dd class="status status-{slug(project.status)}">
          <span
            class="marker marker-dot"
            aria-hidden="true"
          />
          {project.status}
        </dd>
      </div>
      {#if project.resume?.role}
        <div>
          <dt class="label">Role</dt>
          <dd>{project.resume.role}</dd>
        </div>
      {/if}
      <div>
        <dt class="label">Stack</dt>
        <dd class="stack">
          {#each project.stack as tech}
            <span class="pill">{tech}</span>
          {/each}
        </dd>
      </div>
    </dl>
  </div>

  <div class="body">
    <header class="head">
      <h3
        id={titleId}
        class="name"
      >
        {project.name}
      </h3>
      {#if project.subtitle}
        <p class="hook">{project.subtitle}</p>
      {/if}
    </header>

    <div class="fields">
      <section class="field">
        <h4 class="label">Constraint</h4>
        <p class="clamp">{project.why}</p>
      </section>

      {#if decisions.length}
        <section class="field">
          <h4 class="label">Decisions</h4>
          <ol class="decisions">
            {#each decisions as d}
              <li>{d}</li>
            {/each}
          </ol>
          {#if more > 0}
            <p class="more label">+{more} more in the full study</p>
          {/if}
        </section>
      {/if}

      <section class="field">
        <h4 class="label">Outcome</h4>
        <p class="clamp">{project.result}</p>
      </section>
    </div>

    <div class="actions">
      <button
        type="button"
        class="link-cta"
        on:click={() => onOpen(project)}
        aria-label="Read the full study: {project.name}"
      >
        Read the full study <span class="cta-arrow">→</span>
      </button>
      {#if project.href}
        <a
          class="link-cta"
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {project.linkLabel?.replace(/\s*→\s*$/, "") || "Visit"}
          <span
            class="cta-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      {/if}
    </div>
  </div>
</article>

<style>
  .study {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    padding: var(--space-6) 0;
    border-top: var(--border-w) solid var(--border);
  }

  .study:last-child {
    border-bottom: var(--border-w) solid var(--border);
  }

  /* The one with users gets a yellow index: the page's single highlight. */
  .featured .num {
    color: var(--ink);
    background: var(--highlight);
    padding: 0 0.2em;
    border-radius: 3px;
  }

  .margin {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .num {
    font-size: var(--text-num);
    align-self: flex-start;
  }

  .meta {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .meta > div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .meta dt {
    margin: 0;
  }

  .meta dd {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.4;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .status .marker {
    --marker: currentColor;
  }

  .status-live {
    color: var(--status-live);
  }

  .status-in-progress {
    color: var(--status-progress);
  }

  .status-shipped {
    color: var(--primary);
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    min-width: 0;
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .name {
    margin: 0;
    font-size: var(--text-2xl);
    line-height: var(--leading-tight);
  }

  .hook {
    margin: 0;
    font-size: var(--text-lg);
    line-height: 1.45;
    color: var(--muted);
    max-width: 44ch;
  }

  .fields {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-5);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .field h4 {
    margin: 0;
    font-family: var(--font-mono);
    font-weight: 400;
  }

  .field p {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  /* Three lines on the page, all of it in the study. */
  .clamp {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .decisions {
    margin: 0;
    padding-left: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    font-size: var(--text-sm);
    line-height: 1.55;
  }

  .decisions li::marker {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--primary);
  }

  .more {
    margin: 0;
    text-transform: none;
    letter-spacing: 0.02em;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
  }

  @media (min-width: 700px) {
    .fields {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--space-5);
    }
  }

  @media (min-width: 900px) {
    .study {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
      padding: var(--space-7) 0;
    }

    .margin {
      position: sticky;
      top: 5rem;
      align-self: start;
    }
  }
</style>
