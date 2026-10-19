<script lang="ts">
  import { base } from "$app/paths";
  import { tick } from "svelte";
  import Reveal from "$lib/components/Reveal.svelte";
  import type { Projects } from "$lib/types/types";

  // One project in the "lead and notes" layout from DESIGN.md: the lead
  // object on the left, the notes on the right. On a phone the name comes
  // first, then the lead, then the notes; the longer notes and the
  // decisions open in a sheet there.
  export let project: Projects[number];
  /** The project's own logo, shown beside its name. */
  export let mark: string | undefined = undefined;
  /** The product's own paper and ink for its card's back, so both sides of
      the card match. Without it the back is the site's paper. */
  export let brand: { paper: string; ink: string } | undefined = undefined;

  // On a wide screen "Read the decisions" turns the lead object over: the
  // decisions are written on its back, at the same size, so nothing on the
  // page moves. On a phone they open in a sheet instead.
  let decisionsOpen = false;
  let phone = false;
  let article: HTMLElement;
  let back: HTMLElement;

  $: flipped = decisionsOpen && !phone;
  $: if (flipped) tick().then(() => back?.focus({ preventScroll: true }));

  async function turnBack() {
    decisionsOpen = false;
    await tick();
    // The decisions toggle is the last Reveal in the notes.
    [...article.querySelectorAll<HTMLElement>(".reveal")].pop()?.focus();
  }

  $: linkText = project.linkLabel?.replace(/\s*→\s*$/, "") || "Visit";
</script>

<article
  class="row"
  bind:this={article}
>
  <div class="name-line">
    <h3>
      {#if mark}
        <span
          class="mark"
          style="--mark: url('{mark}')"
          aria-hidden="true"
        />
      {/if}
      {project.name}
    </h3>
    {#if project.statusLine}
      <span class="label">{project.statusLine}</span>
    {/if}
  </div>

  <div
    class="lead flip"
    class:flipped
    style:--back-paper={brand?.paper}
    style:--back-ink={brand?.ink}
  >
    <div
      class="face front"
      inert={flipped || undefined}
    >
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
    {#if project.highlights?.length && !phone}
      <div
        class="face back"
        id="{project.name}-decisions"
        tabindex="-1"
        bind:this={back}
        inert={!flipped || undefined}
        aria-hidden={!flipped}
        aria-label="{project.name} decisions"
        role="region"
      >
        <p class="label">How it's built</p>
        <ul class="decisions">
          {#each project.highlights as decision}
            <li>{decision}</li>
          {/each}
        </ul>
        <button
          type="button"
          class="link-cta turn"
          on:click={turnBack}
        >
          Turn it back ↺
        </button>
      </div>
    {/if}
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
        inline={false}
        openLabel="Turn it back"
        openArrow="↺"
        bind:open={decisionsOpen}
        bind:phone
      >
        <ul class="decisions">
          {#each project.highlights as decision}
            <li>{decision}</li>
          {/each}
        </ul>
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
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: var(--text-xl);
    font-weight: 600;
  }

  /* The project's own logo, drawn as a mask so it takes the page's ink in
     both themes, as her signature does. */
  .mark {
    flex: none;
    width: 1.1em;
    aspect-ratio: 300 / 330;
    background-color: currentColor;
    -webkit-mask: var(--mark) center / contain no-repeat;
    mask: var(--mark) center / contain no-repeat;
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

  /* The lead and its back share one place. The back is laid over the front
     at the same size and scrolls inside if it has more to say, so turning
     it over never changes the page's height. */
  .flip {
    position: relative;
    perspective: 1600px;
  }

  .face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    /* Turning back is the exit: quicker, and speeding up. */
    transition: transform var(--motion-medium) var(--motion-exit);
  }

  .flipped .face {
    transition: transform var(--motion-long) var(--motion-enter);
  }

  .back {
    --paper-ink: var(--back-ink, #1a1a1a);
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: 1.5rem 1.6rem 1.2rem;
    overflow-y: auto;
    background: var(--back-paper, #fffdf8);
    color: var(--paper-ink);
    border-radius: 10px;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.04),
      0 12px 28px rgba(60, 40, 10, 0.12);
    transform: rotateY(180deg);
  }

  .back:focus {
    outline: none;
  }

  .back .label {
    margin: 0;
    color: color-mix(in srgb, var(--paper-ink) 68%, transparent);
  }

  .back .decisions {
    padding-left: 1.4rem;
  }

  .back .decisions li {
    color: color-mix(in srgb, var(--paper-ink) 85%, transparent);
  }

  /* Her orange tick, as on the rest of the page. */
  .back .decisions li::marker {
    content: "✓  ";
    color: var(--brush);
    font-weight: 600;
  }

  .back .turn {
    margin-top: auto;
    align-self: flex-start;
    color: var(--paper-ink);
  }

  /* Between 900 and 1199px the lead column is at its narrowest, so the
     back sets its text a step smaller to keep every decision on the card. */
  @media (min-width: 900px) and (max-width: 1199.98px) {
    .back {
      gap: var(--space-2);
      padding: 1.1rem 1.25rem 1rem;
    }

    .back .decisions {
      gap: 0.25rem;
    }

    .back .decisions li {
      font-size: 0.78rem;
      line-height: 1.5;
    }
  }

  @media (min-width: 900px) and (max-width: 1023.98px) {
    .back {
      padding: 0.9rem 1.1rem 0.8rem;
    }

    .back .decisions li {
      font-size: 0.74rem;
      line-height: 1.45;
    }
  }

  .flipped .front {
    transform: rotateY(-180deg);
  }

  .flipped .back {
    transform: rotateY(0deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .face {
      transition: none;
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
