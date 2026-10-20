<script lang="ts">
  import { tick } from "svelte";
  import { base } from "$app/paths";
  import {
    derivativeName,
    paintingsConfig,
    WIDTHS,
    type Painting,
  } from "../../../../content/paintings.config";

  // The manifest is the wall: the opening photograph is a separate asset,
  // not an entry here, so nothing has to be filtered out.
  const works = paintingsConfig;

  // Every frame is the same 4:5, so the wall reads as one calm row of
  // shapes. Inside it, the painting fills the frame by how big the real
  // object is: a hand-sized card is not blown up to match a canvas. Three
  // buckets, not measurements, because nobody has measured them.
  const FILL: Record<Painting["scale"], string> = {
    canvas: "88%",
    paper: "80%",
    card: "58%",
  };

  const [small, large] = WIDTHS;
  const src = (id: string, width: number) =>
    `${base}/assets/paintings/${derivativeName(id, width)}`;

  // The medium first, then place and year where they are known.
  const details = (work: Painting) =>
    [work.place, work.year].filter(Boolean).join(", ");

  // The paintings, large, side by side over the wall: swipe, the arrow
  // keys or the buttons move between them. The browser's own modal dialog
  // keeps focus inside, closes on Escape, and hands focus back.
  let viewer: HTMLDialogElement;
  let track: HTMLElement;
  let at = 0;
  let opener: HTMLElement | null = null;

  async function open(i: number, e: MouseEvent) {
    e.preventDefault();
    opener = e.currentTarget as HTMLElement;
    viewer.showModal();
    at = i;
    await tick();
    track.scrollTo({ left: i * track.clientWidth, behavior: "instant" });
  }

  function go(step: number) {
    const i = Math.min(works.length - 1, Math.max(0, at + step));
    track.scrollTo({ left: i * track.clientWidth });
    at = i;
  }

  function onScroll() {
    at = Math.round(track.scrollLeft / track.clientWidth);
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  }

  // Only a tap on the background closes it, never one on a painting.
  function onClick(e: MouseEvent) {
    if (
      e.target === viewer ||
      (e.target as HTMLElement).classList.contains("slide")
    )
      viewer.close();
  }
</script>

<ul class="wall">
  {#each works as work, i (work.id)}
    <li>
      <figure>
        <a
          class="frame"
          href={src(work.id, large)}
          on:click={(e) => open(i, e)}
        >
          <img
            src={src(work.id, small)}
            srcset="{src(work.id, small)} {small}w, {src(
              work.id,
              large
            )} {large}w"
            sizes="(min-width: 860px) 30vw, (min-width: 560px) 45vw, 90vw"
            alt={work.alt}
            style="max-width: {FILL[work.scale]}; max-height: {FILL[
              work.scale
            ]}"
            loading="lazy"
            decoding="async"
          />
        </a>
        <figcaption>
          <span class="medium">{work.medium}</span>
          {#if details(work)}
            <span class="details">{details(work)}</span>
          {/if}
        </figcaption>
      </figure>
    </li>
  {/each}
</ul>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="viewer"
  bind:this={viewer}
  aria-label="Paintings"
  on:click={onClick}
  on:keydown={onKey}
  on:close={() => opener?.focus()}
>
  <div
    class="track"
    bind:this={track}
    on:scroll={onScroll}
  >
    {#each works as work}
      <figure class="slide">
        <img
          src={src(work.id, large)}
          alt={work.alt}
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span class="medium">{work.medium}</span>
          {#if details(work)}<span class="details">{details(work)}</span>{/if}
        </figcaption>
      </figure>
    {/each}
  </div>
  <div class="viewer-bar">
    <button
      type="button"
      class="viewer-btn step"
      aria-label="Previous painting"
      disabled={at === 0}
      on:click={() => go(-1)}
    >
      ‹
    </button>
    <span
      class="viewer-count"
      aria-live="polite"
    >
      {at + 1} / {works.length}
    </span>
    <button
      type="button"
      class="viewer-btn step"
      aria-label="Next painting"
      disabled={at === works.length - 1}
      on:click={() => go(1)}
    >
      ›
    </button>
  </div>
  <button
    type="button"
    class="viewer-btn viewer-close"
    on:click={() => viewer.close()}
  >
    Close
  </button>
</dialog>

<style>
  /* Full screen on the wall's own paper. Each painting is one snapping
     slide, whole, with its label under it. */
  .viewer {
    width: 100vw;
    max-width: none;
    height: 100dvh;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: var(--canvas);
    color: var(--ink);
  }

  .viewer[open] {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .viewer::backdrop {
    background: var(--canvas);
  }

  .track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  .track::-webkit-scrollbar {
    display: none;
  }

  .slide {
    flex: 0 0 100%;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    justify-items: center;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-7) var(--space-4) var(--space-2);
    scroll-snap-align: center;
    cursor: zoom-out;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: default;
  }

  .slide figcaption {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-3);
    font-size: var(--text-sm);
  }

  .viewer-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-2) 0 var(--space-4);
  }

  .viewer-count {
    min-width: 4.5em;
    text-align: center;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .viewer-btn {
    min-width: 44px;
    min-height: 44px;
    padding: 0 var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
    background: var(--canvas);
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    cursor: pointer;
  }

  .viewer-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .step {
    padding: 0;
    font-size: 1.2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .track {
      scroll-behavior: auto;
    }
  }

  .viewer-close {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
  }

  .wall {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-7) var(--space-6);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Two columns from a phone held sideways, so a frame fits one screen. */
  @media (min-width: 560px) {
    .wall {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 860px) {
    .wall {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  figure {
    margin: 0;
  }

  /* The soft wall each painting hangs on. The painting sits whole inside
     it, never cropped to fit the frame. */
  .frame {
    position: relative;
    display: block;
    aspect-ratio: 4 / 5;
    background: var(--surface);
  }

  .frame:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
  }

  .frame img {
    position: absolute;
    inset: 0;
    margin: auto;
    display: block;
    box-shadow: 0 3px 10px rgb(28 22 14 / 0.14);
  }

  figcaption {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-3);
    margin-top: var(--space-3);
    font-size: var(--text-sm);
  }

  .medium {
    color: var(--ink);
  }

  .details {
    color: var(--muted);
  }
</style>
