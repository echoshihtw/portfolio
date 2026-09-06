<script lang="ts">
  import { slide } from "svelte/transition";
  import { base } from "$app/paths";
  import type { Projects } from "$lib/types/types";

  type Project = Projects[number];

  export let project: Project;
  export let index: number;

  const slug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

  // Closed: three decisions and the first lines of the constraint and the
  // outcome. Open: all of it, in place, plus the screenshots. The same
  // expander the work entries use, so the page has one way of saying
  // "there is more".
  let expanded = false;

  $: highlights = project.highlights ?? [];
  $: decisions = expanded ? highlights : highlights.slice(0, 3);
  $: more = Math.max(0, highlights.length - 3);
  $: number = String(index + 1).padStart(2, "0");
  $: id = slug(project.name);
  $: titleId = `case-${id}-title`;
  $: detailId = `case-${id}-detail`;
</script>

<!-- A research entry, not a card: number and metadata in the margin, the
     story beside it under mono labels. Same fields for every study, so a
     reader can compare down the page. -->
<article
  class="study"
  aria-labelledby={titleId}
>
  <div class="margin">
    <span
      class="num label"
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

    <div
      class="fields"
      class:no-decisions={!decisions.length}
      id={detailId}
    >
      <section class="field field-constraint">
        <h4 class="label">Constraint</h4>
        <p class:clamp={!expanded}>{project.why}</p>
      </section>

      {#if decisions.length}
        <section class="field field-decisions">
          <h4 class="label">Decisions</h4>
          <ol class="decisions">
            {#each decisions as d}
              <li>{d}</li>
            {/each}
          </ol>
          {#if !expanded && more > 0}
            <p class="more label">+{more} more in the full study</p>
          {/if}
        </section>
      {/if}

      <section class="field field-outcome">
        <h4 class="label">Outcome</h4>
        <p class:clamp={!expanded}>{project.result}</p>
      </section>
    </div>

    {#if expanded && project.shots?.length}
      <!-- Height-capped, width auto: a phone portrait and a browser
           landscape sit in the same strip without either being cropped. -->
      <div
        class="shots"
        transition:slide|local={{ duration: 220 }}
      >
        {#each project.shots as shot}
          <img
            src="{base}/{shot.src}"
            alt={shot.alt}
            loading="lazy"
          />
        {/each}
      </div>
    {:else if expanded && project.file}
      <img
        class="single"
        src="{base}/{project.file}"
        alt="{project.name} preview"
        loading="lazy"
        transition:slide|local={{ duration: 220 }}
      />
    {/if}

    <div class="actions">
      <button
        type="button"
        class="link-cta"
        aria-expanded={expanded}
        aria-controls={detailId}
        on:click={() => (expanded = !expanded)}
      >
        {expanded ? "Close the study" : "Read the full study"}
        <span
          class="cta-arrow"
          aria-hidden="true"
        >
          {expanded ? "↑" : "↓"}
        </span>
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

  .margin {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  /* Same tick as the work entries: a small mono index in the margin. */
  .num {
    align-self: flex-start;
    color: var(--muted);
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

  /* Same scale as a work entry: the role size for the name, the company
     size for the line under it. The two sections read as one list. */
  .name {
    margin: 0;
    font-size: var(--text-xl);
    line-height: var(--leading-snug);
  }

  .hook {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
    max-width: 60ch;
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

  /* Justified, with hyphenation, so the three narrow columns hold a
     straight right edge without opening rivers. */
  .field p,
  .decisions li {
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
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

  /* Flush with the other two columns: no list markers, so no reserved
     gutter. A hairline between items does the counting. */
  .decisions {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    font-size: var(--text-sm);
    line-height: 1.55;
  }

  .decisions li + li {
    margin-top: 0.45rem;
    padding-top: 0.45rem;
    border-top: var(--border-w) solid var(--border);
  }

  .more {
    margin: 0;
    text-transform: none;
    letter-spacing: 0.02em;
  }

  .shots {
    display: flex;
    gap: var(--space-3);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: var(--space-1);
  }

  .shots img {
    height: min(50vh, 26rem);
    width: auto;
    flex: none;
    scroll-snap-align: start;
    border: var(--border-w) solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--canvas);
  }

  .single {
    width: 100%;
    max-width: 48rem;
    height: auto;
    border: var(--border-w) solid var(--border);
    border-radius: var(--radius-sm);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
  }

  /* Two columns, packed. Three equal columns left the short constraint
     and outcome hanging beside a decisions list twice their height. Now
     those two stack on the left and the decisions run the full height on
     the right, so the block's bottom edge is level. Reading order in the
     DOM stays constraint, decisions, outcome. */
  @media (min-width: 700px) {
    .fields {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-5) var(--space-6);
    }

    .field-constraint {
      grid-column: 1;
      grid-row: 1;
    }

    .field-decisions {
      grid-column: 2;
      grid-row: 1 / span 2;
    }

    .field-outcome {
      grid-column: 1;
      grid-row: 2;
    }

    /* No decisions: the outcome takes the right column instead of leaving
       it empty. */
    .no-decisions .field-outcome {
      grid-column: 2;
      grid-row: 1;
    }
  }

  /* Indented to the same edge as the work cards: the section number's
     column, then the tick's column, then the entry. The tick sits in the
     gutter, out of the flow, exactly where the work list puts its own. */
  @media (min-width: 900px) {
    /* 7rem number column + 2rem gap + 3rem tick column + 1rem gap: the
       work card's left edge, to the pixel. */
    .study {
      grid-template-columns: 11rem minmax(0, 1fr);
      gap: var(--space-6);
      margin-left: 13rem;
      padding: var(--space-6) 0;
    }

    .margin {
      position: sticky;
      top: 5rem;
      align-self: start;
    }

    .num {
      position: absolute;
      left: -4rem;
      top: 0.2rem;
    }
  }
</style>
