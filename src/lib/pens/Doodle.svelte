<script lang="ts">
  /**
   * A small hand-drawn icon in her blue pen, like the cues in a notebook's
   * margin: a star for what matters most, a light bulb for a new idea, an
   * arrow to what to read next.
   * At most one per section, and only where it means something. Drawn once
   * when it scrolls into view; already there with Reduce Motion or without
   * JavaScript. Decoration only, so screen readers skip it.
   */
  import { onMount } from "svelte";
  import { doodles, inkColour, type DoodleName, type InkName } from "./pens";
  import { whenSeen } from "./whenSeen";

  export let icon: DoodleName;
  /** Another ink: one of the named inks in pens.ts, or any CSS colour. */
  export let ink: InkName | string | undefined = undefined;

  let el: SVGSVGElement;
  let shown = true;
  let animate = false;

  onMount(() => {
    const stop = whenSeen(el, () => {
      animate = true;
      shown = true;
    });
    if (stop) shown = false;
    return stop || undefined;
  });
</script>

<svg
  bind:this={el}
  style={ink ? `--pen-ink: ${inkColour(ink)}` : undefined}
  class="doodle"
  class:undrawn={!shown}
  class:animate
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <g filter="url(#pen-wobble)">
    {#each doodles[icon] as d, i}<path
        {d}
        pathLength="1"
        style="--i: {i}"
      />{/each}
  </g>
</svg>

<style>
  .doodle {
    display: inline-block;
    width: 1.8em;
    height: 1.8em;
    /* taller than the label, but it never pushes the line apart */
    margin: -0.6em 0 -0.6em 0.4em;
    overflow: visible;
    vertical-align: -0.45em;
  }

  path {
    fill: none;
    stroke: var(--pen-ink, var(--accent-shape));
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1;
  }

  .undrawn path {
    stroke-dashoffset: 1;
    opacity: 0;
  }

  /* Each stroke follows the one before it, as a hand draws them. */
  .animate path {
    animation: draw var(--motion-long) calc(var(--i) * var(--motion-short))
      cubic-bezier(0.65, 0, 0.35, 1) backwards;
  }

  @keyframes draw {
    0% {
      stroke-dashoffset: 1;
      opacity: 0;
    }
    1% {
      opacity: 1;
    }
  }
</style>
