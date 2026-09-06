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
    <span class="status status-{slug(project.status)}">
      <span
        class="dot"
        aria-hidden="true"
      />
      {project.status}
    </span>
    <!-- The arrow says "this opens" without spending a line on saying it. -->
    <svg
      class="arrow"
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>

  <span class="name">{project.name}</span>

  <span class="hook">{project.subtitle}</span>

  <!-- Recruiters screen on keywords and do not open dialogs. The stack has to
       be readable without a click, or this section contributes nothing to a
       first-pass scan. -->
  <span class="tech mono">{project.stack.join("  ·  ")}</span>
</button>

<style>
  /* A white card with a serif name, not a block of colour.
  
     Colour was carrying these for a while and it was the wrong job for it:
     a project card's content IS the argument, and a saturated fill competes
     with it. The colour moved to the list of things people ask for, where it
     is categorical and has nothing to compete with. What is left here is
     what the reference actually does well: no border, a soft shadow, a small
     mono label, and the name set large in the display face.
  
     Still no border. The separation comes from the shadow and the ground
     behind the band. */
  .card {
    position: relative;
    overflow: hidden;
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
    color: var(--text-color);
    border: 0;
    box-shadow:
      0 1px 2px rgb(20 18 42 / 0.06),
      0 6px 16px rgb(20 18 42 / 0.05);
    /* 4px reads as a square with the corners filed off. 12px is enough to be
       a deliberate radius, which is what makes a block of colour read as a
       card rather than as a filled rectangle. */
    border-radius: var(--radius-md);
    cursor: pointer;
    transition:
      transform 200ms ease,
      box-shadow 200ms ease;
  }

  /* A soft arc sweeping out of the top-right corner, a shade lighter than
     the card itself. It is the one borrowed idea here, and it is what stops
     a flat fill looking flat: the corner has a curve in it before anything
     is hovered.
  
     Drawn as a huge circle parked mostly outside the card, so the part that
     shows is a single clean curve rather than a gradient fading out. Sits
     under the content and never takes a pointer event. */
  .card::before {
    content: "";
    position: absolute;
    top: -55%;
    right: -35%;
    width: 115%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-accent) 6%, transparent);
    pointer-events: none;
    transition:
      transform 420ms cubic-bezier(0.2, 0.7, 0.2, 1),
      background-color 240ms ease;
  }

  .card > :global(*) {
    position: relative;
  }

  .card:hover,
  .card:focus-visible {
    transform: translateY(-3px);
    box-shadow:
      0 2px 4px rgb(20 18 42 / 0.07),
      0 14px 30px rgb(20 18 42 / 0.12);
  }

  /* The interaction is the corner, not the card. The arc drifts down and in
     and warms slightly, so something moves without the whole block
     jumping. */
  .card:hover::before,
  .card:focus-visible::before {
    transform: translate(-9%, 9%) scale(1.06);
    background: color-mix(in srgb, var(--color-accent) 11%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card::before {
      transition: none;
    }

    .card:hover::before,
    .card:focus-visible::before {
      transform: none;
    }
  }

  .card.featured {
    border-color: color-mix(in srgb, var(--color-accent) 55%, transparent);
  }

  .arrow {
    flex: none;
    color: var(--text-muted);
    transition:
      transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1),
      color 200ms ease;
  }

  .card:hover .arrow,
  .card:focus-visible .arrow {
    color: var(--color-accent);
    transform: translate(2px, -2px);
  }

  .top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .name {
    font-family: "DM Serif Display", serif;
    font-size: 1.75rem;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--text-color);
  }

  .hook {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  .tech {
    font-size: 0.68rem;
    line-height: 1.5;
    letter-spacing: 0.02em;
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
    color: var(--status-live);
  }

  .status-in-progress {
    color: var(--color-accent);
  }

  /* Completed and handed over, as opposed to still running. Uses the accent
     rather than the live green, because nothing about it is live. Without
     this rule the badge renders in the default muted colour and nothing
     errors: ProjectCard builds the class from the status string. */
  .status-shipped {
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
