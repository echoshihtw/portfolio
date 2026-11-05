<script lang="ts">
  /**
   * One of her pens over some words: the yellow highlighter for what
   * matters, the red pen for her own remark. Every pen is defined in
   * pens.ts. Each mark draws once: when its section scrolls into view, or,
   * when `drawn` is given, the moment it turns true. Already drawn when
   * the page loads, with Reduce Motion, or without JavaScript.
   */
  import { onMount } from "svelte";
  import { pens, type PenName } from "./pens";
  import { whenSeen } from "./whenSeen";

  export let kind: PenName = "highlight";
  /** Leave unset to draw on scroll; set it to draw on cue. */
  export let drawn: boolean | undefined = undefined;
  /** Milliseconds to wait before drawing. */
  export let delay = 0;
  /** A phrase that may wrap: one stroke that runs along the text and breaks
      only where the line does. A single word keeps its hand-drawn shape. */
  export let flow = false;

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
    const stop = whenSeen(el, () => {
      animate = true;
      inView = true;
    });
    if (stop) inView = false;
    return stop || undefined;
  });

  $: pen = pens[kind];
</script>

<!-- No whitespace between the parts: inside running text it would show as a
     space before the punctuation that follows the mark. -->
<!-- prettier-ignore -->
<span bind:this={el} class="mark mark-{kind} frame-{pen.frame}" class:undrawn={!shown} class:animate class:flow style="--delay: {delay}ms"><span class="word"><slot /></span>{#if pen.strokes.length && !flow}<svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true"><g filter="url(#pen-wobble)">{#each pen.strokes as stroke, i}<path class="{stroke.width} ink-{stroke.ink ?? 'pen'}" pathLength="1" d={stroke.d} style="--i: {i}" />{/each}</g></svg>{/if}</span>

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

  /* Pen widths, and the two inks. */
  .pen {
    stroke-width: 0.06em;
    opacity: 0.92;
  }

  .echo {
    stroke-width: 0.025em;
    opacity: 0.5;
  }

  .fine {
    stroke-width: 0.045em;
  }

  .marker {
    stroke-width: 0.2em;
  }

  .scribble {
    stroke-width: 0.11em;
  }

  .ink-highlighter {
    stroke: var(--mark);
    mix-blend-mode: var(--mark-blend);
    opacity: 1;
  }

  /* A drawn shape covers its whole phrase, so the phrase never breaks. */
  .mark:not(.flow) {
    white-space: nowrap;
  }

  /* A shape round the words needs room on every side. */
  .frame-around svg {
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
    animation: draw var(--motion-long)
      calc(var(--delay) + var(--i) * var(--motion-short))
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

  /* A phrase that wraps: the ink is a background on the text itself, so it
     runs unbroken along each line and is repeated on the next line. The
     highlighter covers the lower part of the letters, as a real one does;
     the pen line is a thin stroke with a lighter pass just under it. */
  .flow {
    display: inline;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    background-repeat: no-repeat;
  }

  .flow.mark-highlight {
    padding: 0 0.12em;
    margin: 0 -0.12em;
    border-radius: 0.12em 0.3em 0.18em 0.25em;
    background-image: linear-gradient(var(--mark), var(--mark));
    background-position: 0 88%;
    background-size: 100% 74%;
  }

  .flow.mark-highlight::before {
    content: none;
  }

  .flow.mark-line {
    background-image:
      linear-gradient(var(--accent-shape), var(--accent-shape)),
      linear-gradient(
        color-mix(in srgb, var(--accent-shape) 50%, transparent),
        color-mix(in srgb, var(--accent-shape) 50%, transparent)
      );
    background-position:
      0 calc(100% - 0.02em),
      0.2em 100%;
    background-size:
      100% 0.07em,
      calc(100% - 0.4em) 0.03em;
  }

  .flow.undrawn {
    background-size:
      0 74%,
      0 0.03em;
  }

  .flow.animate {
    animation: flow-in var(--motion-long) var(--delay)
      cubic-bezier(0.45, 0, 0.15, 1) backwards;
  }

  .flow.mark-line.animate {
    animation-name: flow-line;
  }

  @keyframes flow-in {
    from {
      background-size: 0 74%;
    }
  }

  @keyframes flow-line {
    from {
      background-size:
        0 0.07em,
        0 0.03em;
    }
  }
</style>
