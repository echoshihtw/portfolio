<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import ProjectRow from "./ProjectRow.svelte";
  import ClioDemo from "./ClioDemo.svelte";
  // Read from the brand package, never copied, so a new mark arrives with
  // the next upgrade. Imported here, not in the content config, because the
  // résumé build reads that config with plain Node.
  import clioMark from "@echoshihtw/clio-brand/logo/clio-single-ink-master.svg?url";

  // Runway has its own section above, so it is not repeated here.
  const projects = projectsConfig.filter((p) => p.name !== "Financial Runway");

  // A deck, like Time Machine: one project in front, in full; the next three
  // stacked behind, each further back in time, showing only its name bar.
  // Tapping a card behind, or its name on the timeline, brings it forward.
  // `order` lists the projects front to back.
  let order = projects.map((_, i) => i);
  const SHOWN = 4;
  const bringForward = (i: number) => {
    if (order[0] !== i) order = [i, ...order.filter((k) => k !== i)];
  };
  $: placeOf = (i: number) => order.indexOf(i);
</script>

<section
  id="projects"
  class="section_padding section_layout"
  aria-labelledby="projects-title"
>
  <SectionHead
    number="03"
    title="More projects"
    id="projects-title"
  />
  <div
    class="stage"
    style:--behind={Math.min(projects.length, SHOWN) - 1}
  >
    <div class="deck">
      {#each projects as project, i (project.name)}
        {@const place = placeOf(i)}
        <!-- A card behind is a tap target for the mouse and touch; the
             timeline's buttons are the keyboard and screen-reader path. -->
        <div
          class="card"
          data-place={place < SHOWN ? place : "hidden"}
          aria-hidden={place >= SHOWN ? "true" : undefined}
          on:click={() => bringForward(i)}
        >
          <p class="bar">
            <span class="name">{project.name}</span>
            <span class="when">{project.when}</span>
          </p>
          <div
            class="inside"
            inert={place !== 0}
          >
            {#if project.name === "Clio"}
              <ProjectRow
                {project}
                mark={clioMark}
                brand={{
                  paper: "var(--clio-paper)",
                  ink: "var(--clio-ink)",
                  number: "var(--clio-number)",
                }}
              >
                <ClioDemo slot="lead" />
              </ProjectRow>
            {:else}
              <ProjectRow {project} />
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <ol
      class="timeline"
      aria-label="Projects by date"
    >
      {#each projects as project, i}
        <li>
          <button
            type="button"
            aria-current={order[0] === i ? "true" : undefined}
            on:click={() => bringForward(i)}
          >
            <span class="name">{project.name}</span>
            <span class="when">{project.when}</span>
          </button>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 11rem;
    gap: var(--space-6);
    margin-top: var(--space-5);
  }

  /* Every card sits in the same grid cell and stretches to the tallest, so
     the cards are one size, like a real deck, and nothing jumps when the
     front one changes. The space on top is where the cards behind peek out,
     one name bar each, so it grows with the number of cards behind. */
  .deck {
    display: grid;
    padding-top: calc(var(--behind) * 2.75rem);
    perspective: 1600px;
  }

  .card {
    grid-area: 1 / 1;
    overflow: hidden;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transform-origin: 50% 0;
    transition:
      transform var(--motion-long) var(--motion-enter),
      filter var(--motion-long) var(--motion-enter),
      opacity var(--motion-long) var(--motion-enter);
  }

  .bar {
    display: flex;
    justify-content: space-between;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-3) var(--space-5);
    border-bottom: 1px solid var(--border);
  }

  .bar .when,
  .timeline .when {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    color: var(--muted);
  }

  .bar .name {
    font-weight: 600;
  }

  /* The front card names itself in full below, so its bar only shows on the
     cards behind, where it is all that peeks out. */
  .card[data-place="0"] .bar {
    visibility: hidden;
    height: 0;
    padding: 0;
    border: 0;
  }

  .inside {
    padding: var(--space-5);
  }

  .card[data-place="0"] {
    z-index: 9;
  }

  .card[data-place="1"],
  .card[data-place="2"],
  .card[data-place="3"] {
    cursor: pointer;
  }

  .card[data-place="1"] {
    z-index: 8;
    transform: translate3d(0, -2.75rem, -80px) scale(0.96);
    filter: brightness(0.8);
  }

  .card[data-place="2"] {
    z-index: 7;
    transform: translate3d(0, -5.5rem, -160px) scale(0.92);
    filter: brightness(0.64);
  }

  .card[data-place="3"] {
    z-index: 6;
    transform: translate3d(0, -8.25rem, -240px) scale(0.88);
    filter: brightness(0.5);
  }

  .card[data-place="hidden"] {
    z-index: 1;
    transform: translate3d(0, -10rem, -320px) scale(0.84);
    opacity: 0;
    pointer-events: none;
  }

  .card[data-place="1"]:hover,
  .card[data-place="2"]:hover,
  .card[data-place="3"]:hover {
    filter: brightness(0.92);
  }

  .timeline {
    margin: calc(var(--behind) * 2.75rem) 0 0;
    padding: 0;
    list-style: none;
    border-left: 1px solid var(--border);
    align-self: start;
  }

  .timeline button {
    display: grid;
    width: 100%;
    min-height: 44px;
    padding: var(--space-2) 0 var(--space-2) var(--space-4);
    margin-left: -1px;
    border: 0;
    border-left: 2px solid transparent;
    background: none;
    color: var(--muted);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .timeline button[aria-current] {
    color: var(--ink);
    border-left-color: var(--accent-shape);
  }

  .timeline .name {
    font-weight: 600;
  }

  /* On a wide screen every card is one fixed size, the room Clio's demo
     needs, and a project's picture fills its column, cropped from the top,
     so no card is half empty. */
  @media (min-width: 900px) {
    .deck {
      grid-template-rows: 36rem;
    }

    .inside,
    .inside :global(.row),
    .inside :global(.lead),
    .inside :global(.face.front),
    .inside :global(.frame) {
      height: 100%;
      min-height: 0;
    }

    .inside :global(.frame img) {
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  /* Screenshots are louder than the page around them, so they sit a little
     quieter, and the work in front leads. */
  .inside :global(.frame img) {
    filter: saturate(0.7);
  }

  /* On a phone the timeline is a row of tabs above the deck. */
  @media (max-width: 899.98px) {
    .stage {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-4);
    }

    .timeline {
      order: -1;
      display: flex;
      margin: 0;
      overflow-x: auto;
      border-left: 0;
      border-bottom: 1px solid var(--border);
    }

    .timeline button {
      white-space: nowrap;
      margin: 0 0 -1px;
      padding: var(--space-2) var(--space-3);
      border-left: 0;
      border-bottom: 2px solid transparent;
    }

    .timeline button[aria-current] {
      border-bottom-color: var(--accent-shape);
    }

    .inside {
      padding: var(--space-4);
    }

    /* No stack on a phone: one card at its own height, chosen with the
       tabs. The deck is a flourish for a wide screen. */
    .deck {
      padding-top: 0;
    }

    .card:not([data-place="0"]) {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card {
      transition: none;
    }
  }
</style>
