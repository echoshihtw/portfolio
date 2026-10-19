<script lang="ts">
  import { base } from "$app/paths";
  import Reveal from "$lib/components/Reveal.svelte";
  import type { Projects } from "$lib/types/types";

  // One project in the "lead and notes" layout from DESIGN.md: the lead
  // object on the left, the notes on the right. On a phone the name comes
  // first, then the lead, then the notes; the longer notes and the
  // decisions open in a sheet there.
  export let project: Projects[number];

  $: linkText = project.linkLabel?.replace(/\s*→\s*$/, "") || "Visit";
</script>

<article class="row">
  <div class="name-line">
    <h3>{project.name}</h3>
    {#if project.statusLine}
      <span class="label">{project.statusLine}</span>
    {/if}
  </div>

  <div class="lead">
    <slot name="lead">
      {#if project.file}
        <div class="frame">
          <img
            src="{base}/{project.file}"
            alt={project.fileAlt ?? ""}
            width={project.fileSize?.width}
            height={project.fileSize?.height}
            loading="lazy"
          />
        </div>
      {/if}
    </slot>
  </div>

  <div class="notes">
    {#if project.note}
      <p class="note">{project.note}</p>
    {/if}
    {#if project.fact}
      <p class="fact">{project.fact}</p>
    {/if}
    {#if project.story?.length}
      <div class="story wide">
        {#each project.story as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    {/if}
    <p class="tech label">{project.stack.join(" · ")}</p>
    {#if project.href}
      <a
        class="link-cta"
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {linkText} ↗
      </a>
    {/if}
    {#if project.story?.length}
      <div class="narrow">
        <Reveal
          label="Read more"
          name={project.name}
        >
          {#each project.story as paragraph}
            <p class="sheet-p">{paragraph}</p>
          {/each}
        </Reveal>
      </div>
    {/if}
    {#if project.highlights?.length}
      <Reveal
        label="Read the decisions"
        name="{project.name} decisions"
      >
        <!-- A region with a name and a tab stop, so the sideways scroll on a
             wide screen works from the keyboard too. A scrolling region must be
             focusable (WCAG 2.1.1), which the lint rule below does not know. -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
          class="scroller"
          role="region"
          aria-label="{project.name} decisions"
          tabindex="0"
        >
          <ul class="decisions">
            {#each project.highlights as decision}
              <li>{decision}</li>
            {/each}
          </ul>
        </div>
      </Reveal>
    {/if}
  </div>
</article>

<style>
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  .name-line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-2) var(--space-4);
  }

  h3 {
    margin: 0;
    font-size: var(--text-xl);
    font-weight: 600;
  }

  .notes {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }

  .notes p {
    margin: 0;
    line-height: 1.6;
  }

  .note {
    font-family: var(--font-hand);
    font-size: 1.25rem;
    line-height: 1.25;
    color: var(--brush);
    transform: rotate(-1deg);
    transform-origin: left;
  }

  .fact {
    font-weight: 500;
  }

  .story {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .tech {
    text-transform: none;
    letter-spacing: 0.02em;
  }

  .link-cta {
    align-self: flex-start;
  }

  .frame {
    padding: 0.5rem;
    background: #fffdf8;
    border-radius: 6px;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.04),
      0 12px 28px rgba(60, 40, 10, 0.1);
  }

  .frame img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 3px;
    filter: grayscale(0.35);
  }

  .sheet-p {
    margin: 0;
    line-height: 1.6;
  }

  .decisions {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: 0.4rem;
    max-width: 62ch;
  }

  .decisions li {
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
  }

  .decisions li::marker {
    color: var(--brush);
  }

  /* On a wide screen the decisions open as one row that scrolls sideways,
     so opening them adds one short row to the page, not a tall list. On a
     phone they stay a list, in the sheet. The right edge fades to say
     there is more. */
  @media (min-width: 768px) {
    .scroller {
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scroll-snap-type: x mandatory;
      padding-bottom: var(--space-2);
      -webkit-mask-image: linear-gradient(to right, #000 85%, transparent);
      mask-image: linear-gradient(to right, #000 85%, transparent);
    }

    .scroller:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 4px;
      border-radius: var(--radius-sm);
    }

    .decisions {
      grid-auto-flow: column;
      grid-auto-columns: minmax(13rem, 15rem);
      gap: 0;
      max-width: none;
      padding: 0;
      list-style: none;
    }

    .decisions li {
      scroll-snap-align: start;
      padding: 0 var(--space-4);
      border-left: var(--border-w) solid var(--border);
    }

    .decisions li:first-child {
      padding-left: 0;
      border-left: 0;
    }

    .decisions li:last-child {
      margin-right: 4rem;
    }
  }

  /* The story shows in place on a wide page and in a sheet on a phone. */
  .wide {
    display: none;
  }

  @media (min-width: 768px) {
    .wide {
      display: flex;
    }

    .narrow {
      display: none;
    }
  }

  @media (min-width: 900px) {
    .row {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      /* The name line keeps its own height; the lead's height goes to the
         notes row, so the notes start right under the name. */
      grid-template-rows: auto 1fr;
      column-gap: var(--space-7);
      row-gap: var(--space-3);
      align-items: start;
    }

    .name-line {
      grid-column: 2;
      grid-row: 1;
    }

    .lead {
      grid-column: 1;
      grid-row: 1 / span 2;
    }

    .notes {
      grid-column: 2;
      grid-row: 2;
    }
  }
</style>
