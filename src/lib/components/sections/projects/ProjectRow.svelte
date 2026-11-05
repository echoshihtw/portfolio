<script
  context="module"
  lang="ts"
>
  import { writable } from "svelte/store";
  // Which project's card is turned over, so only one is at a time.
  const turned = writable<string | null>(null);
</script>

<script lang="ts">
  import { Marked } from "$lib/pens";
  import { base } from "$app/paths";
  import { onDestroy, tick } from "svelte";
  import Reveal from "$lib/components/Reveal.svelte";
  import type { Projects } from "$lib/types/types";

  // One project in the "lead and notes" layout from DESIGN.md: the lead
  // object on the left, the notes on the right. On a phone the name comes
  // first, then the lead, then the notes; the longer notes and the
  // decisions open in a sheet there.
  export let project: Projects[number];

  // A decision may open with **its claim**, which is set in bold.
  const LEAD = /^\*\*(.+?)\*\*\s*/;
  const lead = (d: string) => d.match(LEAD)?.[1] ?? "";
  const rest = (d: string) => d.replace(LEAD, "");
  /** The project's own logo, shown beside its name. */
  export let mark: string | undefined = undefined;
  /** The product's own paper and ink for its card's back, so both sides of
      the card match. Without it the back is the site's paper. */
  export let brand:
    { paper: string; ink: string; number: string; touch: string } | undefined =
    undefined;

  // On a wide screen "Read the decisions" turns the lead object over: the
  // decisions are written on its back, at the same size, so nothing on the
  // page moves. On a phone they open in a sheet instead.
  let decisionsOpen = false;
  let phone = false;
  let article: HTMLElement;
  let back: HTMLElement;

  $: flipped = decisionsOpen && !phone;
  // Turning this card over turns any other back.
  $: if (decisionsOpen && !phone) turned.set(project.name);
  onDestroy(
    turned.subscribe((name) => {
      if (name !== project.name) decisionsOpen = false;
    })
  );
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
        ></span>
      {/if}
      {project.name}
    </h3>
    {#if project.statusLine}
      <span class="label status">
        {project.statusLine}
      </span>
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
            <!-- prettier-ignore -->
            <li>{#if lead(decision)}<strong>{lead(decision)}</strong> {/if}{rest(decision)}</li>
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
    {#if project.figure}
      <p
        class="figure"
        style:--figure={brand?.number}
        style:--touch={brand?.touch}
      >
        {project.figure}
      </p>
    {/if}
    {#if project.fact}
      <p class="fact">{project.fact}</p>
    {/if}
    {#if project.story?.length}
      <!-- The first paragraph says what it is, so it is always on screen. On
           a phone the rest opens in a sheet. -->
      <div class="story">
        <p>
          <Marked
            text={project.story[0]}
            phrase={project.mark?.phrase ?? ""}
            kind={project.mark?.kind}
          />
        </p>
        {#each project.story.slice(1) as paragraph}
          <p class="wide">
            <Marked
              text={paragraph}
              phrase={project.mark?.phrase ?? ""}
              kind={project.mark?.kind}
            />
          </p>
        {/each}
      </div>
    {/if}
    <!-- Each name stays whole; lines break only between them. -->
    <p class="tech label">
      {#each project.stack as tool, i}<span>
          {tool}{i < project.stack.length - 1 ? " ·" : ""}
        </span>
        {" "}{/each}
    </p>
    <!-- The ways in, together on one row that wraps between them. -->
    <div class="actions">
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
      {#if (project.story?.length ?? 0) > 1}
        <div class="narrow">
          <Reveal
            label="Read more"
            name={project.name}
          >
            {#each project.story?.slice(1) ?? [] as paragraph}
              <p class="sheet-p">
                <Marked
                  text={paragraph}
                  phrase={project.mark?.phrase ?? ""}
                  kind={project.mark?.kind}
                />
              </p>
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
              <!-- prettier-ignore -->
              <li>{#if lead(decision)}<strong>{lead(decision)}</strong> {/if}{rest(decision)}</li>
            {/each}
          </ul>
        </Reveal>
      {/if}
    </div>
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

  /* Said in words, like the rest of the page, not set in a pill. */
  .status {
    color: var(--muted);
  }

  /* The proof, large, with the brand's touch as a mark under it. */
  /* It reads as one sentence with the fact under it, so they sit close. */
  .notes .figure {
    margin-bottom: calc(var(--space-2) - var(--space-3));
    font-family: var(--font-mono);
    font-size: clamp(3.5rem, 8vw, 4.5rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.04em;
    color: var(--figure, var(--ink));
    text-decoration: underline;
    text-decoration-color: var(--touch, transparent);
    text-decoration-thickness: 0.14em;
    text-underline-offset: -0.02em;
    text-decoration-skip-ink: none;
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

  .tech span {
    white-space: nowrap;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-3) var(--space-5);
  }

  .actions :global(button.reveal) {
    margin-top: 0;
  }

  /* On a phone the "Read more" wrapper steps aside, so its link lines up
     with the others in the row. */
  @media (max-width: 767.98px) {
    .actions .narrow {
      display: contents;
    }
  }

  .frame {
    padding: 0.5rem;
    background: var(--surface);
    border-radius: 6px;
    border: 1px solid var(--border);
  }

  .frame img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 3px;
    filter: grayscale(0.35);
  }

  /* A screenshot cannot follow the theme, so on dark it is dimmed a little
     instead of glaring. */
  :global(html[data-theme="dark"]) .frame img {
    filter: grayscale(0.35) brightness(0.85);
  }

  .sheet-p {
    margin: 0;
    line-height: 1.6;
  }

  /* Each decision is its claim on one line and its reason under it. The gap
     between decisions is about twice the space between their lines, so each
     reads as one. */
  .decisions {
    margin: 0;
    padding-left: 1.1rem;
    display: grid;
    gap: var(--space-4);
    max-width: 62ch;
  }

  .decisions li {
    font-size: var(--text-base);
    line-height: 1.5;
    color: var(--muted);
  }

  .decisions strong {
    display: block;
    color: var(--ink);
  }

  .decisions li::marker {
    color: var(--muted);
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
    --paper-ink: var(--back-ink, var(--ink));
    /* the ring and links on the back take the card's own ink */
    --primary: var(--paper-ink);
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-5);
    overflow-y: auto;
    background: var(--back-paper, var(--surface));
    color: var(--paper-ink);
    border-radius: 10px;
    border: 1px solid var(--border);
    transform: rotateY(180deg);
  }

  /* Focus lands here when the card turns. A mouse turn shows no ring; a
     keyboard turn shows one, so the reader can see where focus went. */
  .back:focus:not(:focus-visible) {
    outline: none;
  }

  /* The back fills its own ground, so its ring is drawn inside, on that
     ground, where the card's ink stands out. */
  .back:focus-visible {
    outline-offset: -6px;
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

  /* A tick for each decision, quiet so the claim leads. */
  .back .decisions li::marker {
    content: "✓  ";
    color: var(--muted);
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
      display: block;
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
