<script lang="ts">
  /**
   * A small hand-drawn icon in her red pen, like the cues in a notebook's
   * margin: a star for what matters most, a light bulb for a new idea, an
   * arrow to what to read next.
   * At most one per section, and only where it means something. Drawn once
   * when it scrolls into view; already there with Reduce Motion or without
   * JavaScript. Decoration only, so screen readers skip it.
   */
  import { onMount } from "svelte";

  export let icon: "star" | "bulb" | "arrow";

  let el: SVGSVGElement;
  let shown = true;
  let animate = false;

  onMount(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    shown = false;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate = true;
        shown = true;
        seen.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" }
    );
    seen.observe(el);
    return () => seen.disconnect();
  });

  // Each icon drawn by hand in a 24 by 24 box, a little uneven on purpose,
  // as one or more pen strokes in the order a hand would draw them.
  const strokes: Record<string, string[]> = {
    star: [
      "M12.2 2.6 L14.6 9.1 L21.4 9.6 L16.2 13.9 L18.1 21 L11.9 17 L5.8 21.2 L7.9 14 L2.6 9.4 L9.6 9.3 L12.5 2.9",
    ],
    bulb: [
      "M9 16.5 C 9 14, 5.5 12.6, 5.6 8.8 C 5.8 4.9, 8.8 2.6, 12.2 2.7 C 15.8 2.8, 18.6 5.4, 18.4 9 C 18.2 12.6, 15 14, 15 16.6",
      "M9.2 18.6 L 14.9 18.4",
      "M10 21 L 14.2 20.9",
    ],
    // a loose curve into the link, then its head
    arrow: [
      "M2.5 7 C 7 15.5, 14 17.6, 21 14.2",
      "M16.4 11.2 L 21.2 14.1 L 17.6 18.4",
    ],
  };
</script>

<svg
  bind:this={el}
  class="doodle"
  class:undrawn={!shown}
  class:animate
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <g filter="url(#pen-wobble)">
    {#each strokes[icon] as d, i}<path
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
    stroke: var(--accent-shape);
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
