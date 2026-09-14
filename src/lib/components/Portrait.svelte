<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { base } from "$app/paths";

  /**
   * The portrait: a transparent PNG cut to an organic capsule, shown
   * exactly as exported, with a flat cobalt capsule behind it offset to the
   * bottom right.
   *
   * The backing is the image's own silhouette: an SVG path traced from the
   * PNG's alpha channel every 8 rows, in the image's coordinate space, so
   * it scales with the image and matches it to within a pixel or two at
   * any size the page shows. The path morphs into a shifted version of
   * itself and back: the same points pushed along their outward normals by
   * a slow wave, so it reads as the shape breathing rather than becoming a
   * different shape. It moves whenever the portrait is visible and pauses
   * when it leaves the viewport. SMIL rather than a CSS transition on `d`,
   * because Safari does not animate `d` from CSS. Under reduced motion the
   * animation is not rendered at all.
   *
   * The aspect ratio and the SVG's coordinate space both come from the
   * width and height the caller passes, so the box exists before the bytes
   * arrive and nothing here is welded to one image's dimensions. It sits
   * below the fold in the About section, so it loads lazily like the rest
   * of the page's images.
   */
  export let src: string;
  export let alt: string;
  export let width: number;
  export let height: number;
  /** The image's own outline and its breathed variant, in the image's
      pixel space. Data about one image, so it arrives with the image
      rather than living here; see src/content/portrait.silhouette.ts. */
  export let rest: string;
  export let morph: string;

  let animate = true;
  let portrait: HTMLElement;
  let backing: SVGSVGElement;
  let observer: IntersectionObserver | undefined;

  onMount(() => {
    animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || !("IntersectionObserver" in window)) return;

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) backing?.unpauseAnimations();
      else backing?.pauseAnimations();
    });
    observer.observe(portrait);
  });

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<figure
  bind:this={portrait}
  class="portrait"
  style:aspect-ratio="{width} / {height}"
>
  <svg
    bind:this={backing}
    class="backing"
    viewBox="0 0 {width} {height}"
    aria-hidden="true"
    focusable="false"
  >
    <path d={rest}>
      {#if animate}
        <animate
          attributeName="d"
          begin="0s"
          dur="6s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0; 0.5; 1"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          values={`${rest}; ${morph}; ${rest}`}
        />
      {/if}
    </path>
  </svg>
  <img
    src="{base}/{src}"
    {alt}
    {width}
    {height}
    loading="lazy"
    decoding="async"
    draggable="false"
  />
</figure>

<style>
  .portrait {
    position: relative;
    margin: 0 14px 14px 0;
    width: 100%;
    /* aspect-ratio is set inline from the width and height props, so the
       box exists before the bytes do. The right and bottom margins leave
       room for the backing's offset. */
  }

  .portrait img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    -webkit-user-drag: none;
    user-select: none;
  }

  /* Same box as the image, same coordinate space, nudged. The offset is in
     pixels on purpose: it is a printer's misregistration, and it should
     read as the same 14px whether the image is 300 or 560 wide. */
  .backing {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    transform: translate(14px, 14px);
    fill: var(--primary);
    pointer-events: none;
  }
</style>
