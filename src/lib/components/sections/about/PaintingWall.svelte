<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import {
    derivativeName,
    paintingsConfig,
    WIDTHS,
    type Painting,
  } from "../../../../content/paintings.config";
  import {
    readIds,
    restoreOrder,
    WALL_HEARTS_KEY,
    WALL_ORDER_KEY,
    writeIds,
  } from "./wallOrder";

  // The manifest is the wall: the opening photograph is a separate asset,
  // not an entry here, so nothing has to be filtered out.
  const works = paintingsConfig;

  // How wide a piece runs inside its column. Three buckets, not measurements:
  // nothing on the page may claim these are shown at their true relative
  // size, because nobody has measured them. What it does buy is that a
  // hand-sized card is not blown up to match a canvas.
  const WIDTH: Record<Painting["scale"], string> = {
    canvas: "100%",
    paper: "86%",
    card: "58%",
  };

  // One strip of tape each, cycling position so the wall never repeats a
  // pattern. Two strips per piece was tried and read as wrapped, not taped.
  const TAPE = ["tl", "tr", "tc"] as const;

  // A fixed cycle rather than Math.random: the wall has to look hung by hand
  // and has to render identically on the server and the client, or hydration
  // mismatches. Prime length, so it never lines up with the column count.
  const TILT = [-0.7, 1.4, 0.5, -1.1, 0.9, -0.4, 1.1];

  const [small, large] = WIDTHS;

  let wall: HTMLDivElement;
  let hearts = new Set<string>();
  let status = "";

  /* Rearranging is desktop only. On a phone the wall IS the scroll surface,
     so a drag either fights the scroll or steals it, and there is no room to
     see where a piece is going. Hearting works everywhere: it is one tap. */
  let canReorder = false;

  const ids = () =>
    [...wall.querySelectorAll<HTMLElement>(".work")].map(
      (el) => el.dataset.id!
    );

  const label = (el: HTMLElement) => el.dataset.label ?? "this piece";

  onMount(() => {
    const desktop = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    canReorder = desktop.matches;
    const onChange = (e: MediaQueryListEvent) => (canReorder = e.matches);
    desktop.addEventListener("change", onChange);

    hearts = new Set(readIds(WALL_HEARTS_KEY));

    const stored = readIds(WALL_ORDER_KEY);
    if (stored.length) {
      const byId = new Map(
        [...wall.querySelectorAll<HTMLElement>(".work")].map((el) => [
          el.dataset.id!,
          el,
        ])
      );
      restoreOrder(stored, [...byId.keys()]).forEach((id) => {
        const el = byId.get(id);
        if (el) wall.appendChild(el);
      });
    }

    return () => desktop.removeEventListener("change", onChange);
  });

  function toggleHeart(id: string) {
    const next = new Set(hearts);
    next.has(id) ? next.delete(id) : next.add(id);
    hearts = next;
    writeIds(WALL_HEARTS_KEY, [...next]);
    status = next.has(id) ? "Added to your favourites." : "Removed.";
  }

  /* ---- dragging ---- */
  let dragEl: HTMLElement | null = null;
  let ghost: HTMLElement | null = null;
  let active = false;
  let startX = 0;
  let startY = 0;
  let gx = 0;
  let gy = 0;
  let over: HTMLElement | null = null;

  function targetAt(x: number, y: number, exclude: HTMLElement) {
    return (
      [...wall.querySelectorAll<HTMLElement>(".work")].find((el) => {
        if (el === exclude) return false;
        const b = el.getBoundingClientRect();
        return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
      }) ?? null
    );
  }

  function onPointerDown(e: PointerEvent) {
    if (!canReorder || e.button !== 0) return;
    if ((e.target as HTMLElement).closest(".heart")) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>(".work");
    if (!el) return;
    dragEl = el;
    startX = e.clientX;
    startY = e.clientY;
    active = false;
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragEl) return;
    if (!active) {
      /* A threshold, so a click is not a drag. It is also what would let a
         click open a piece once the dialog ships. */
      if (Math.hypot(e.clientX - startX, e.clientY - startY) < 7) return;
      active = true;
      const box = dragEl.getBoundingClientRect();
      gx = startX - box.left;
      gy = startY - box.top;
      ghost = dragEl.cloneNode(true) as HTMLElement;
      ghost.className = "ghost";
      ghost.style.width = `${box.width}px`;
      ghost.removeAttribute("tabindex");
      document.body.appendChild(ghost);
      dragEl.classList.add("dragging");
    }
    ghost!.style.transform = `translate(${e.clientX - gx}px, ${e.clientY - gy}px) rotate(-2deg) scale(1.03)`;
    const t = targetAt(e.clientX, e.clientY, dragEl);
    if (t !== over) {
      over?.classList.remove("over");
      over = t;
      over?.classList.add("over");
    }
  }

  function endDrag(e: PointerEvent) {
    if (!dragEl) return;
    if (active) {
      const t = targetAt(e.clientX, e.clientY, dragEl);
      if (t && t !== dragEl) {
        const b = t.getBoundingClientRect();
        const after = e.clientY > b.top + b.height / 2;
        t.parentNode!.insertBefore(dragEl, after ? t.nextSibling : t);
        writeIds(WALL_ORDER_KEY, ids());
        status = `${label(dragEl)} moved.`;
      }
      ghost?.remove();
      ghost = null;
      dragEl.classList.remove("dragging");
    }
    over?.classList.remove("over");
    over = null;
    dragEl = null;
    active = false;
  }

  /* Keyboard, because a drag-only control excludes anyone not using a mouse.
     Space lifts and puts down, the arrows move. Enter is left alone: it is
     the dialog's, once that ships. */
  let lifted: HTMLElement | null = null;

  function onKeyDown(e: KeyboardEvent) {
    if (!canReorder) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>(".work");
    if (!el) return;

    if (e.key === " ") {
      e.preventDefault();
      if (lifted === el) {
        lifted.classList.remove("lifted");
        lifted = null;
        writeIds(WALL_ORDER_KEY, ids());
        status = `${label(el)} put down.`;
      } else {
        lifted?.classList.remove("lifted");
        lifted = el;
        el.classList.add("lifted");
        status = `${label(el)} lifted. Arrow keys to move it.`;
      }
      return;
    }

    if (e.key === "Escape" && lifted) {
      lifted.classList.remove("lifted");
      lifted = null;
      status = "Put down.";
      return;
    }

    if (lifted !== el) return;
    const back = e.key === "ArrowLeft" || e.key === "ArrowUp";
    const fwd = e.key === "ArrowRight" || e.key === "ArrowDown";
    if (!back && !fwd) return;
    e.preventDefault();
    const sib = back ? el.previousElementSibling : el.nextElementSibling;
    if (!sib) {
      status = `Already at the ${back ? "start" : "end"}.`;
      return;
    }
    wall.insertBefore(back ? el : sib, back ? sib : el);
    el.focus();
    status = `${label(el)}, position ${ids().indexOf(el.dataset.id!) + 1} of ${ids().length}.`;
  }

  /* Right-click offers no "Save image as" on the wall. Scoped here, so the
     rest of the page keeps a normal context menu. Friction, not protection:
     anything the browser draws can be screenshotted. */
  function onContextMenu(e: MouseEvent) {
    if ((e.target as HTMLElement).closest(".work")) e.preventDefault();
  }

  function reset() {
    const byId = new Map(
      [...wall.querySelectorAll<HTMLElement>(".work")].map((el) => [
        el.dataset.id!,
        el,
      ])
    );
    works.forEach((w) => {
      const el = byId.get(w.id);
      if (el) wall.appendChild(el);
    });
    writeIds(WALL_ORDER_KEY, []);
    status = "Wall reset.";
  }
</script>

<!-- Shown or hidden by CSS rather than by canReorder, so it is in the
     server-rendered HTML and does not appear after hydration and shove the
     wall down. The JS flag still gates the behaviour. -->
<p class="wall-hint">
  Drag a piece to rearrange the wall, and heart the ones you like. Both stay how
  you leave them.
  <button
    type="button"
    class="reset mono"
    on:click={reset}
  >
    Reset
  </button>
</p>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class="wall"
  role="list"
  bind:this={wall}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={endDrag}
  on:pointercancel={endDrag}
  on:keydown={onKeyDown}
  on:contextmenu={onContextMenu}
>
  {#each works as work, i (work.id)}
    <!-- A piece can be lifted and moved with the keyboard, so it genuinely is
         interactive; the rule below cannot see that from the markup alone. -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <figure
      class="work {work.scale}"
      class:reorderable={canReorder}
      data-id={work.id}
      data-label={work.medium}
      role="listitem"
      tabindex={canReorder ? 0 : undefined}
      aria-label={canReorder
        ? `${work.medium}. Space to lift, arrow keys to move.`
        : undefined}
      style="width: {WIDTH[work.scale]}; --tilt: {TILT[i % TILT.length]}deg"
    >
      <span
        class="tape {TAPE[i % TAPE.length]}"
        aria-hidden="true"
      />
      <img
        src="{base}/assets/paintings/{derivativeName(work.id, small)}"
        srcset="{base}/assets/paintings/{derivativeName(
          work.id,
          small
        )} {small}w, {base}/assets/paintings/{derivativeName(
          work.id,
          large
        )} {large}w"
        sizes="(min-width: 1080px) 28vw, (min-width: 700px) 42vw, 88vw"
        alt={work.alt}
        draggable="false"
        loading="lazy"
        decoding="async"
      />
      <button
        type="button"
        class="heart"
        aria-pressed={hearts.has(work.id)}
        aria-label="Favourite {work.medium}"
        on:click={() => toggleHeart(work.id)}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path
            d="M12 20.5 4.3 13a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </figure>
  {/each}
</div>

<p
  class="sr-only"
  aria-live="polite"
>
  {status}
</p>

<style>
  /* CSS columns, not grid: a grid forces a common row height and there is no
     common aspect ratio here, so every piece would have to be cropped to fit.
     Columns let each keep its own proportion. Reading order runs down each
     column rather than across, which is right for a wall. */
  .wall {
    column-count: 1;
    column-gap: 2.6rem;
  }

  @media (min-width: 700px) {
    .wall {
      column-count: 2;
    }
  }

  @media (min-width: 1080px) {
    .wall {
      column-count: 3;
    }
  }

  .work {
    position: relative;
    break-inside: avoid;
    margin: 0 0 2.6rem;
    display: flex;
    flex-direction: column;
    transform: rotate(var(--tilt));
    transition: transform 240ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  /* Straightens under the cursor. The hover earns its place by reading as
     attention rather than by adding another shadow. */
  .work:hover,
  .work:focus-within {
    transform: rotate(0deg) translateY(-6px);
    z-index: 4;
  }

  .work img {
    display: block;
    width: 100%;
    height: auto;
    background: var(--surface-bg);
    /* Friction against casual copying, not protection: anything the browser
       draws can be screenshotted and these bytes are in the page. What this
       stops is dragging a picture to the desktop, which is most of it. */
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    user-select: none;
  }

  /* Each kind is fixed to the wall the way it actually would be, so the
     shadow follows from the fixing rather than being a uniform card effect:
     a stretched canvas stands off the wall, taped paper sits almost flat. */
  .work.canvas img {
    box-shadow:
      0 14px 30px rgb(28 22 14 / 0.2),
      0 2px 5px rgb(28 22 14 / 0.14);
  }

  .work.paper img {
    box-shadow: 0 3px 9px rgb(28 22 14 / 0.15);
  }

  .work.card img {
    box-shadow: 0 8px 14px rgb(28 22 14 / 0.18);
  }

  /* Washi tape: translucent, so the work reads through it, with the two cut
     edges a shade darker than the body the way real tape looks. The angle
     comes off the piece's own tilt, so no two strips match. */
  .tape {
    position: absolute;
    top: -13px;
    width: 74px;
    height: 23px;
    z-index: 3;
    background: linear-gradient(
      180deg,
      rgb(252 251 245 / 0.74) 0%,
      rgb(244 240 228 / 0.62) 45%,
      rgb(236 231 215 / 0.66) 100%
    );
    border-left: 1px solid rgb(28 22 14 / 0.07);
    border-right: 1px solid rgb(28 22 14 / 0.07);
    box-shadow: 0 1px 3px rgb(28 22 14 / 0.13);
  }

  .tape.tl {
    left: -20px;
    transform: rotate(calc(-34deg - var(--tilt)));
  }

  .tape.tr {
    right: -20px;
    transform: rotate(calc(31deg - var(--tilt)));
  }

  /* A small work takes one strip across the top instead of a corner. */
  .tape.tc {
    left: 50%;
    width: 58px;
    margin-left: -29px;
    top: -11px;
    transform: rotate(calc(-2deg - var(--tilt)));
  }

  /* Rearranging is desktop only, so its instructions are too. On a phone the
     wall IS the scroll surface: a drag either fights the scroll or steals
     it, and there is no room to see where a piece is going. */
  .wall-hint {
    display: none;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.9rem;
    margin: 0 0 1.6rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  @media (min-width: 900px) and (pointer: fine) {
    .wall-hint {
      display: flex;
    }
  }

  .reset {
    border: 1px solid var(--section-border);
    background: transparent;
    color: var(--text-color);
    border-radius: 999px;
    padding: 0.3rem 0.85rem;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    cursor: pointer;
  }

  .reset:hover {
    border-color: var(--color-accent);
  }

  .work.reorderable {
    cursor: grab;
    touch-action: pan-y;
  }

  .work:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 6px;
  }

  .work.dragging {
    opacity: 0.22;
  }

  .work.lifted {
    transform: rotate(0deg) translateY(-8px) scale(1.02);
    z-index: 6;
  }

  .work.over::after {
    content: "";
    position: absolute;
    inset: -10px;
    border: 1px dashed var(--color-accent);
    pointer-events: none;
  }

  /* The dragged copy that follows the pointer. Global, because it is appended
     to <body> and so falls outside this component's scoping. */
  :global(.ghost) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    pointer-events: none;
    opacity: 0.92;
  }

  :global(.ghost) img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* The dragged copy carries no controls: a heart you could click on a
     floating ghost would be a second, invisible target. */
  :global(.ghost) .heart {
    display: none;
  }

  /* A heart, and nothing more: no count, no server, no account. It is a toy
     for whoever is looking, kept on their own machine. */
  .heart {
    position: absolute;
    right: 8px;
    bottom: 8px;
    z-index: 5;
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    cursor: pointer;
    background: rgb(247 245 238 / 0.82);
    color: var(--text-muted);
    box-shadow: 0 1px 4px rgb(28 22 14 / 0.22);
    opacity: 0;
    transition:
      opacity 160ms ease,
      color 160ms ease;
  }

  .work:hover .heart,
  .work:focus-within .heart,
  .heart:focus-visible {
    opacity: 1;
  }

  /* Once it is on it stays visible: a favourite you cannot see is not one. */
  .heart[aria-pressed="true"] {
    opacity: 1;
    color: var(--color-accent);
  }

  .heart[aria-pressed="true"] svg path {
    fill: currentColor;
  }

  .heart:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* Touch has no hover, so the control has to be permanently visible. */
  @media (hover: none) {
    .heart {
      opacity: 1;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .work {
      transform: none;
      transition: none;
    }

    .work:hover,
    .work:focus-within {
      transform: none;
    }

    .tape.tl,
    .tape.tr,
    .tape.tc {
      transform: none;
    }
  }
</style>
