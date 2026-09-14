<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { base } from "$app/paths";

  /**
   * The portrait: a photograph clipped to an organic capsule, with a flat
   * cobalt capsule behind it offset to the bottom right, like a printed
   * sticker whose colour plate is a touch out of register.
   *
   * One outline does both jobs. As a clipPath it cuts the photograph; as a
   * filled path it is the backing. The same path morphs into a shifted
   * version of itself and back, the points pushed along their outward
   * normals by a slow wave, and both the clip and the backing follow it in
   * step, so the whole sticker breathes rather than the photo sitting
   * still while a shape moves behind it. The photograph is served as a
   * plain rectangle; the shape lives in the path, not in the file, so a
   * new photo needs no alpha work. It moves whenever the portrait is visible and pauses
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

  // One id per instance, so two portraits on a page would not share a clip.
  const clipId = `portrait-clip-${Math.random().toString(36).slice(2, 8)}`;

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
    <defs>
      <!-- The same outline, as a clip for the photograph. objectBoundingBox
           units so it fits the <img>'s own box at any rendered size; the
           scale brings the path's pixel coordinates into 0..1. Same values
           and timing as the backing below, so the two breathe as one
           printed sticker rather than as two layers sliding. -->
      <clipPath
        id={clipId}
        clipPathUnits="objectBoundingBox"
      >
        <path
          d={rest}
          transform="scale({1 / width} {1 / height})"
        >
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
      </clipPath>
    </defs>
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
    style:clip-path="url(#{clipId})"
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
