<script lang="ts">
  /**
   * Her two pens on the page: the yellow highlighter for what matters, and
   * the red pen for her own remark (a circle, a line or the hero's wavy
   * line). Each mark draws once: when its section scrolls into view, or,
   * when `drawn` is given, the moment it turns true. Already drawn when
   * the page loads, with Reduce Motion, or without JavaScript.
   */
  import { onMount } from "svelte";

  export let kind: "highlight" | "circle" | "line" | "wavy" = "highlight";
  /** Leave unset to draw on scroll; set it to draw on cue. */
  export let drawn: boolean | undefined = undefined;
  /** Milliseconds to wait before drawing. */
  export let delay = 0;

  let el: HTMLElement;
  let mounted = false;
  let inView = true;
  let animate = false;
  let wasDrawn: boolean | undefined;

  $: if (drawn !== undefined) {
    if (mounted && drawn && wasDrawn === false) animate = true;
    wasDrawn = drawn;
  }
  $: shown = drawn === undefined ? inView : drawn;

  onMount(() => {
    mounted = true;
    if (drawn !== undefined) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    inView = false;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate = true;
        inView = true;
        seen.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" }
    );
    seen.observe(el);
    return () => seen.disconnect();
  });

  // A hand-drawn path for each pen mark, in a 300 by 120 box stretched over
  // the word. The second path is a lighter pass just off the first.
  const paths: Record<string, [string, string]> = {
    circle: [
      "M236 22 C 196 6, 98 4, 44 22 C 6 36, 0 70, 22 90 C 52 116, 168 120, 240 104 C 292 92, 304 60, 280 36 C 262 18, 226 10, 178 12 C 150 13, 128 18, 116 24",
      "M232 26 C 190 12, 104 10, 50 26 C 14 40, 10 70, 30 88 C 60 110, 166 114, 236 100 C 284 90, 296 62, 276 40",
    ],
    line: [
      "M4 104 C 60 98, 140 97, 210 100 C 250 101, 278 98, 296 94",
      "M14 108 C 70 103, 150 102, 220 104 C 256 105, 280 102, 290 99",
    ],
    wavy: [
      "M6 100 C 18 86, 30 86, 40 98 S 62 112, 74 98 S 98 84, 110 97 S 134 111, 146 98 S 170 85, 182 97 S 206 110, 218 97 S 242 85, 254 96 S 280 106, 296 92",
      "M14 104 C 24 92, 34 92, 44 102 S 66 114, 78 102 S 102 90, 114 101 S 138 113, 150 102 S 174 90, 186 101 S 210 112, 222 101 S 246 90, 258 100 S 282 108, 292 98",
    ],
  };
</script>

<span
  bind:this={el}
  class="mark mark-{kind}"
  class:undrawn={!shown}
  class:animate
  style="--delay: {delay}ms"
>
  <span class="word"><slot /></span>
  {#if kind !== "highlight"}<svg
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g filter="url(#pen-wobble)">
        <path
          class="pass"
          pathLength="1"
          d={paths[kind][0]}
        />
        <path
          class="echo"
          pathLength="1"
          d={paths[kind][1]}
        />
      </g>
    </svg>{/if}
</span>

<style>
  .mark {
    position: relative;
    display: inline-block;
  }

  .word {
    position: relative;
    z-index: 1;
  }

  /* The highlighter: one pass of flat ink, ends cut at the chisel's angle,
     edges that wave a little, lighter along the middle. On paper it
     multiplies like real ink. */
  .mark-highlight .word {
    color: var(--mark-ink);
  }

  .mark-highlight::before {
    content: "";
    position: absolute;
    inset: 0.12em -0.2em 0 -0.14em;
    background: linear-gradient(
      178deg,
      var(--mark) 0 30%,
      color-mix(in srgb, var(--mark) 82%, #fff) 48%,
      var(--mark) 66% 100%
    );
    clip-path: polygon(
      4% 4%,
      14% 5.8%,
      29% 4.8%,
      43% 3.8%,
      57% 6.6%,
      71% 4.1%,
      86% 5%,
      100% 6.4%,
      97% 94.4%,
      86% 96.3%,
      71% 93.8%,
      57% 96.9%,
      43% 93.7%,
      29% 97%,
      14% 93.6%,
      0 97%
    );
    transform: rotate(-1.4deg);
    transform-origin: left center;
  }

  /* On paper it blends in like ink; on a dark ground it sits on top. */
  .mark-highlight::before {
    mix-blend-mode: var(--mark-blend);
  }

  /* Drawn like an invisible pen passing over the word: the stroke is
     uncovered behind the chisel tip, never stretched, so it keeps its shape.
     The tip is the mask's slanted edge; the mask is twice the stroke's
     width and slides from fully hiding it to fully showing it. */
  .mark-highlight::before {
    -webkit-mask: linear-gradient(100deg, #000 46%, transparent 54%) 0 0 / 220%
      100% no-repeat;
    mask: linear-gradient(100deg, #000 46%, transparent 54%) 0 0 / 220% 100%
      no-repeat;
  }

  .undrawn.mark-highlight::before {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  .animate.mark-highlight::before {
    animation: write var(--motion-long) var(--delay)
      cubic-bezier(0.45, 0, 0.15, 1) backwards;
  }

  @keyframes write {
    from {
      -webkit-mask-position: 100% 0;
      mask-position: 100% 0;
    }
  }

  /* The red pen: a wobble from a noise filter, and a second lighter pass. */
  svg {
    position: absolute;
    left: -0.16em;
    top: -0.14em;
    width: calc(100% + 0.34em);
    height: calc(100% + 0.36em);
    overflow: visible;
    pointer-events: none;
  }

  path {
    fill: none;
    stroke: var(--accent-shape);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1;
    /* the box stretches; the line keeps its pen width */
    vector-effect: non-scaling-stroke;
  }

  .pass {
    stroke-width: 0.06em;
    opacity: 0.92;
  }

  .echo {
    stroke-width: 0.025em;
    opacity: 0.5;
  }

  /* A circle needs room around the word; a line sits under it. */
  .mark-circle svg {
    top: -0.2em;
    left: -0.24em;
    width: calc(100% + 0.48em);
    height: calc(100% + 0.44em);
  }

  /* Until the pen starts, the line's round tip would show as a speck. */
  .undrawn path {
    stroke-dashoffset: 1;
    opacity: 0;
  }

  .animate path {
    animation: draw var(--motion-long) var(--delay)
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
