<script lang="ts">
  import { base } from "$app/paths";
  import { tick } from "svelte";
  import { selectedWorkConfig as c } from "../../../../content/selectedWork.config";
  import { heroConfig } from "../../../../content/portfolio.config";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { parseAmount, runway } from "$lib/runway";
  import SectionHead from "$lib/components/SectionHead.svelte";

  // Folded, Runway is a print taped into the scrapbook. Pull the tape (drag
  // it, tap it, or press Enter or the arrow keys on it) and the section
  // unfolds into the app's own world. "fold it back" plays that in reverse.
  let open = false;
  let folding = false;
  let peeling = false;

  // How far the tape has been pulled, in px. Past PULL it comes off.
  const PULL = 90;
  // These wait for the CSS to finish: the tape's peel (--motion-medium) and
  // the fold, where the sheet waits 0.15s for the blocks, then takes
  // --motion-long.
  const PEEL_MS = 350;
  const FOLD_MS = 650;
  let dx = 0;
  let dy = 0;
  let dragging = false;
  let dragFrom: { x: number; y: number } | null = null;
  let dragged = false;

  let cash = c.calculator.cash;
  let cost = c.calculator.cost;
  // 0 to 1 while the number counts up after unfolding; 1 when it is still.
  let shown = 1;

  const still = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $: result = runway(parseAmount(cash), parseAmount(cost), new Date());
  $: monthsText =
    result.months === null ? "∞" : String(Math.round(result.months * shown));
  $: unit =
    result.months === null ? "" : result.months === 1 ? "month" : "months";

  $: pulled = Math.hypot(dx, dy);
  $: tapeStyle = open
    ? "transform:translate(-40px,-30px) rotate(-30deg);opacity:0;pointer-events:none"
    : peeling
      ? "transform:translate(120px,-38px) rotate(18deg);opacity:.35"
      : `transform:translate(${dx}px,${dy}px) rotate(${-2 + dx / 6}deg);opacity:${Math.max(0.35, 1 - pulled / 200)};${dragging ? "transition:none" : ""}`;

  function countUp() {
    if (still()) return;
    const start = performance.now();
    const wait = 700;
    const run = 900;
    shown = 0;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start - wait) / run));
      shown = 1 - Math.pow(1 - t, 3);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  let story: HTMLElement;

  async function unfold() {
    dx = dy = 0;
    dragging = false;
    open = true;
    countUp();
    // The tape has just come off, so focus moves to what it opened.
    await tick();
    story?.focus({ preventScroll: true });
  }

  function peel() {
    if (still()) return unfold();
    peeling = true;
    setTimeout(() => {
      peeling = false;
      unfold();
    }, PEEL_MS);
  }

  let section: HTMLElement;
  let tape: HTMLButtonElement;

  async function fold() {
    section.scrollIntoView({
      behavior: still() ? "auto" : "smooth",
      block: "start",
    });
    if (still()) {
      open = false;
    } else {
      folding = true;
      await new Promise((r) => setTimeout(r, FOLD_MS));
      folding = false;
      open = false;
    }
    // The control that was pressed is gone; focus goes back to the tape.
    await tick();
    tape?.focus({ preventScroll: true });
  }

  function onTapeClick() {
    if (dragged) {
      dragged = false;
      return;
    }
    peel();
  }

  const KEY_STEP: Record<string, [number, number]> = {
    ArrowRight: [24, 0],
    ArrowLeft: [-24, 0],
    ArrowUp: [0, -24],
    ArrowDown: [0, 24],
  };

  function onTapeKey(e: KeyboardEvent) {
    const step = KEY_STEP[e.key];
    if (!step) return;
    e.preventDefault();
    dx += step[0];
    dy += step[1];
    if (Math.hypot(dx, dy) > PULL) unfold();
  }

  function onTapeDown(e: PointerEvent) {
    dragFrom = { x: e.clientX, y: e.clientY };
    dragged = false;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    dragging = true;
  }

  function onTapeMove(e: PointerEvent) {
    if (!dragFrom) return;
    dx = e.clientX - dragFrom.x;
    dy = e.clientY - dragFrom.y;
    if (Math.hypot(dx, dy) > 6) dragged = true;
    if (Math.hypot(dx, dy) > PULL) {
      dragFrom = null;
      unfold();
    }
  }

  function onTapeUp() {
    if (!dragFrom) return;
    dragFrom = null;
    dragging = false;
    dx = dy = 0;
  }

  const mailto = mailtoWithSubject(heroConfig.email, heroConfig.emailSubject);
</script>

<section
  id="selected-work"
  bind:this={section}
  class="world section_rule"
  class:open
  class:folding
  aria-labelledby="selected-work-title"
>
  <div
    class="star rw-coral"
    style="left:5%;top:110px;width:56px;height:56px"
    aria-hidden="true"
  />
  <div
    class="star rw-sparkle"
    style="right:6%;top:80px;width:44px;height:44px"
    aria-hidden="true"
  />
  <div
    class="star rw-sparkle"
    style="left:47%;top:63%;width:26px;height:26px"
    aria-hidden="true"
  />
  <div
    class="star rw-coral"
    style="right:10%;bottom:110px;width:40px;height:40px"
    aria-hidden="true"
  />
  <div
    class="star rw-blob"
    style="right:16%;bottom:56px;width:150px;height:100px"
    aria-hidden="true"
  />

  <div class="mark">
    <SectionHead
      number="01"
      title="Selected work"
      id="selected-work-title"
    >
      <span slot="end">On the App Store</span>
    </SectionHead>
  </div>

  <div class="inner">
    <div class="intro">
      <div class="poster-wrap">
        <div
          class="poster paper"
          class:open
        >
          <div
            class="sticker rw-coral"
            aria-hidden="true"
          />
          {#if !open}
            <span
              class="hand pull-hint"
              aria-hidden="true"
            >
              <span class="wide">← pull the tape</span>
              <span class="narrow">pull the tape ↓</span>
            </span>
          {/if}
          <button
            bind:this={tape}
            type="button"
            class="tapebtn"
            aria-label="Pull the tape to open the Runway story. Press Enter, or use the arrow keys to pull it."
            aria-expanded={open}
            aria-controls="runway-story"
            tabindex={open ? -1 : 0}
            style={tapeStyle}
            on:click={onTapeClick}
            on:keydown={onTapeKey}
            on:pointerdown={onTapeDown}
            on:pointermove={onTapeMove}
            on:pointerup={onTapeUp}
            on:pointercancel={onTapeUp}
          />
          <img
            src="{base}/{c.banner.src}"
            alt={c.banner.alt}
            width={c.banner.width}
            height={c.banner.height}
          />
        </div>
        <svg
          class="doodle-line"
          aria-hidden="true"
          viewBox="0 0 260 74"
          preserveAspectRatio="none"
        >
          <path
            d="M6 46 C 26 10, 42 10, 52 40 S 82 70, 98 36 S 132 6, 146 38 S 178 68, 194 34 S 228 8, 254 30"
            fill="none"
            stroke="currentColor"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="notes">
        <p class="hand tagline">
          {c.tagline[0]}
          <br />
          <span class="pencil">{c.tagline[1]}</span>
        </p>

        <div class="facts-wrap">
          <span
            class="tape"
            aria-hidden="true"
          />
          <ul class="facts paper">
            {#each c.facts as fact}
              <li class="hand">{fact}</li>
            {/each}
            <li class="hand">
              <span class="circled">
                {c.price}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M54 6 C 22 2, 4 14, 6 28 C 8 42, 42 48, 68 44 C 94 40, 99 22, 88 12 C 78 4, 60 2, 42 8"
                    fill="none"
                    stroke="var(--brush)"
                    stroke-width="3.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              {c.priceNote}
            </li>
          </ul>
        </div>

        <div
          class="crop paper"
          aria-hidden="true"
        >
          <img
            src="{base}/{c.planCrop.src}"
            alt=""
            width={c.planCrop.width}
            height={c.planCrop.height}
          />
        </div>

        <div class="ctas">
          <a
            class="rw-cta"
            href={c.appStore}
          >
            Get it on the App Store ↗
          </a>
          {#if open}
            <button
              type="button"
              class="rw-cta"
              aria-expanded="true"
              aria-controls="runway-story"
              on:click={fold}
            >
              fold it back ↺
            </button>
          {/if}
        </div>
      </div>
    </div>

    {#if open}
      <div
        id="runway-story"
        class="story"
        tabindex="-1"
        role="region"
        aria-label="The Runway story"
        bind:this={story}
      >
        <div class="compare">
          <div class="budget">
            <span class="label">{c.compare.budget.label}</span>
            <p>{c.compare.budget.question}</p>
          </div>
          <div class="ours">
            <span class="label">{c.compare.runway.label}</span>
            <p>{c.compare.runway.question}</p>
          </div>
        </div>

        <div class="calc-block">
          <div class="calc">
            <div class="lined paper">
              <span class="hand turn">your turn.</span>
              <p class="hand line">
                <label for="rw-cash">I have</label>
                $
                <input
                  id="rw-cash"
                  class="blank"
                  type="text"
                  inputmode="numeric"
                  autocomplete="off"
                  bind:value={cash}
                />
                .
              </p>
              <p class="hand line">
                <label for="rw-cost">A month costs me</label>
                $
                <input
                  id="rw-cost"
                  class="blank"
                  type="text"
                  inputmode="numeric"
                  autocomplete="off"
                  bind:value={cost}
                />
                .
              </p>
              <span class="label">Nothing leaves this page</span>
            </div>
            <div
              class="rwcard"
              aria-live="polite"
            >
              <span class="label">Your runway</span>
              <span class="months">
                {monthsText}
                <span class="unit">{unit}</span>
              </span>
              <span class="runs-out">{result.runsOut}</span>
              <span class="badge st-{result.status}">
                <i aria-hidden="true" />
                {result.status.toUpperCase()}
              </span>
            </div>
          </div>
          <p class="simple">
            <span class="hand">{c.simple}</span>
            <a
              class="acc"
              href={c.appStore}
            >
              Get the real thing ↗
            </a>
          </p>
        </div>

        <blockquote class="quote">“{c.quote}”</blockquote>

        <div class="screens">
          {#each c.screens as screen}
            <div class="screen paper">
              <img
                src="{base}/{screen.src}"
                alt={screen.alt}
                width="440"
                height="956"
                loading="lazy"
              />
            </div>
          {/each}
        </div>

        <ol class="promises">
          {#each c.promises as promise}
            <li class="paper">
              <strong>{promise.title}</strong>
              <span>{promise.body}</span>
            </li>
          {/each}
        </ol>

        <div class="price-block">
          <div class="price paper">
            <strong>{c.price} once.</strong>
            <p>{c.priceWhy}</p>
          </div>
          <p class="made">{c.stack.join(" · ")}. {c.madeWith}</p>
        </div>

        <p class="closing">
          <a
            class="rw-cta"
            href={mailto}
          >
            {c.closing} ↗
          </a>
        </p>
      </div>
    {/if}
  </div>
</section>

<style>
  /* Runway's own palette, from its landing page. Literal on purpose: these
     are the app's colours, not the site's, and they hold in both themes. */
  .world {
    --rw-navy: #0b1831;
    --rw-mint: #8fddaa;
    --rw-coral: #f08b72;
    --rw-yellow: #f4d84b;
    --rw-violet: #6327d4;
    --rw-cream: #f3eee4;
    --rw-amber: #f2c46b;
    --paper-ink: #1a1a1a;
    --paper-grey: #5f5d57;
    position: relative;
    overflow-x: clip;
    width: 100%;
    max-width: var(--content-max);
    margin: 0 auto;
    padding-bottom: var(--space-2);
    transition: color 0.6s ease;
  }

  .world > * {
    position: relative;
    z-index: 1;
  }

  /* The navy sheet: grows out of the print in a circle when it unfolds. */
  .world::before {
    content: "";
    position: absolute;
    inset: 3.2rem 0.4rem 0;
    z-index: 0;
    background: var(--rw-navy);
    border-radius: 4px;
    transform: rotate(-0.6deg);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    clip-path: circle(0% at 50% 14%);
    transition:
      clip-path var(--motion-xlong) var(--motion-enter),
      opacity 0.3s ease,
      visibility 0s linear var(--motion-xlong);
  }

  .world.open::before {
    opacity: 1;
    visibility: visible;
    clip-path: circle(150% at 50% 14%);
    transition:
      clip-path var(--motion-xlong) var(--motion-enter),
      opacity 0.2s ease,
      visibility 0s;
  }

  .world.folding::before {
    clip-path: circle(0% at 50% 14%);
    transition:
      clip-path var(--motion-long) var(--motion-exit) 0.15s,
      opacity 0.15s ease 0.5s,
      visibility 0s linear 0.65s;
  }

  .world.open .inner {
    color: var(--rw-cream);
  }

  /* The shared row sits on the page, above the navy sheet, and needs none
     of the section's top padding. */
  .mark {
    padding: var(--section-y) var(--space-4) 0;
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
    padding: var(--space-7) var(--space-4) var(--space-6);
  }

  .hand {
    font-family: var(--font-hand);
    font-weight: 400;
    line-height: 1.2;
  }

  /* Paper objects stay paper in both themes: a cut-out on a night desk. */
  .paper {
    color: var(--paper-ink);
  }

  /* --- Folded: the print and its notes ------------------------------- */

  .intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
    align-items: center;
  }

  .poster-wrap {
    position: relative;
    padding: var(--space-5) 0 var(--space-6);
  }

  .poster {
    position: relative;
    z-index: 2;
    padding: 0.6rem;
    background: #fffdf8;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.05),
      0 10px 24px rgba(60, 40, 10, 0.12);
    transform: rotate(2deg) scale(1.03);
    transition: transform var(--motion-long) var(--motion-enter);
  }

  .poster.open {
    transform: none;
  }

  .poster img {
    display: block;
    width: 100%;
    height: auto;
  }

  .sticker {
    position: absolute;
    z-index: 4;
    top: -1.8rem;
    left: -1.8rem;
    width: 3.6rem;
    height: 3.6rem;
    transform: rotate(-12deg);
    pointer-events: none;
  }

  .pull-hint {
    position: absolute;
    z-index: 4;
    left: calc(46% + 6.6rem);
    top: -1.9rem;
    white-space: nowrap;
    font-size: 1.1rem;
    color: var(--brush);
    transform: rotate(-3deg);
    pointer-events: none;
  }

  .pull-hint .narrow {
    display: none;
  }

  .tapebtn {
    position: absolute;
    left: 46%;
    top: -1.4rem;
    z-index: 3;
    width: 6rem;
    height: 2.75rem;
    padding: 0;
    border: 0;
    cursor: grab;
    touch-action: none;
    background: repeating-linear-gradient(
        45deg,
        rgba(246, 160, 185, 0.92) 0 9px,
        rgba(255, 226, 120, 0.92) 9px 18px
      )
      0 10px / 100% 24px no-repeat;
    transition:
      transform var(--motion-medium) var(--motion-exit),
      opacity var(--motion-medium) ease;
  }

  .tapebtn:active {
    cursor: grabbing;
  }

  .tapebtn:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  .notes {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .tagline {
    margin: 0;
    font-size: clamp(1.5rem, 1rem + 1.2vw, 1.85rem);
    line-height: 1.15;
    transform: rotate(-1.5deg);
  }

  /* Coloured-pencil hatching shades the words that matter. */
  .pencil {
    padding: 0 4px;
    margin: 0 -4px;
    background: repeating-linear-gradient(
        -58deg,
        rgba(143, 221, 170, 0.85) 0 2px,
        transparent 2px 5px
      )
      0 88% / 100% 55% no-repeat;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .world.open .pencil {
    background-image: repeating-linear-gradient(
      -58deg,
      rgba(143, 221, 170, 0.28) 0 2px,
      transparent 2px 6px
    );
  }

  .world.open .tagline {
    color: var(--rw-amber);
  }

  .facts-wrap {
    position: relative;
    align-self: flex-start;
    transform: rotate(1.8deg);
    filter: drop-shadow(0 6px 8px rgba(60, 40, 10, 0.14));
  }

  .tape {
    position: absolute;
    z-index: 2;
    left: -0.9rem;
    top: -0.6rem;
    width: 4.75rem;
    height: 1.4rem;
    transform: rotate(-24deg);
    background: repeating-linear-gradient(
      45deg,
      rgba(143, 221, 170, 0.9) 0 8px,
      rgba(255, 255, 255, 0.85) 8px 16px
    );
  }

  .facts {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin: 0;
    padding: 1.4rem 1.5rem;
    list-style: none;
    background: #cdefd8;
    border-radius: 14px;
    font-size: 1.1rem;
  }

  .circled {
    position: relative;
    white-space: nowrap;
  }

  .circled svg {
    position: absolute;
    left: -10%;
    top: -22%;
    width: 120%;
    height: 144%;
    overflow: visible;
  }

  .crop {
    align-self: flex-start;
    width: min(20rem, 100%);
    padding: 0.5rem 0.5rem 0.75rem;
    background: #fffdf8;
    box-shadow: 0 8px 18px rgba(60, 40, 10, 0.14);
    transform: rotate(-3deg);
  }

  .crop img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 2px;
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3) var(--space-4);
    align-items: center;
  }

  /* Sharpie links with a hand-drawn underline: brush orange on paper,
     amber once the world is navy. */
  .rw-cta {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 2px 8px;
    cursor: pointer;
    font-family: var(--font-hand);
    font-size: 1.2rem;
    color: var(--cta, var(--brush));
    background: linear-gradient(currentColor, currentColor) no-repeat 0
      calc(100% - 6px) / 100% 3px;
    transform: rotate(-1.5deg);
  }

  .rw-cta:hover {
    transform: rotate(-1.5deg) translateY(-1px);
  }

  .rw-cta:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
    border-radius: 4px;
  }

  .world.open {
    --cta: var(--rw-amber);
  }

  /* A Sharpie squiggle tied to the print, not to the section, so it can
     never drift into the next one. */
  .doodle-line {
    position: absolute;
    z-index: 0;
    left: -1rem;
    bottom: -1.75rem;
    width: 16rem;
    height: 4.6rem;
    color: var(--ink);
    transform: rotate(-6deg);
    transition: opacity 0.3s ease;
  }

  .world.open .doodle-line {
    opacity: 0;
  }

  /* --- Runway's shapes, which pop in when the world opens ------------- */

  .star {
    position: absolute;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
  }

  .world.open .star {
    animation: pop 0.7s cubic-bezier(0.34, 1.7, 0.5, 1) both;
  }

  .world.open .star:nth-of-type(1) {
    animation-delay: 0.45s;
  }
  .world.open .star:nth-of-type(2) {
    animation-delay: 0.55s;
  }
  .world.open .star:nth-of-type(3) {
    animation-delay: 0.68s;
  }
  .world.open .star:nth-of-type(4) {
    animation-delay: 0.8s;
  }
  .world.open .star:nth-of-type(5) {
    animation-delay: 0.92s;
  }

  .world.folding .star {
    animation: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  @keyframes pop {
    0% {
      opacity: 0;
      transform: scale(0) rotate(-60deg);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  .rw-coral {
    background: var(--rw-coral);
    clip-path: polygon(
      50% 0,
      61% 35%,
      96% 20%,
      72% 49%,
      100% 67%,
      63% 64%,
      59% 100%,
      44% 68%,
      11% 87%,
      29% 55%,
      0 39%,
      38% 39%
    );
  }

  .rw-sparkle {
    background: var(--rw-mint);
    clip-path: polygon(
      50% 0,
      59% 39%,
      100% 50%,
      59% 60%,
      50% 100%,
      40% 60%,
      0 50%,
      40% 39%
    );
  }

  .rw-blob {
    background: var(--rw-violet);
    border-radius: 52% 35% 47% 41%;
  }

  .world.open .rw-blob {
    opacity: 0.55;
  }

  /* --- Unfolded: the story ------------------------------------------ */

  .story:focus {
    outline: none;
  }

  .story {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
  }

  .story > * {
    transform-origin: top center;
    animation: unfold var(--motion-long) var(--motion-enter) both;
  }

  .story > :nth-child(2) {
    animation-delay: 0.08s;
  }
  .story > :nth-child(3) {
    animation-delay: 0.16s;
  }
  .story > :nth-child(4) {
    animation-delay: 0.24s;
  }
  .story > :nth-child(5) {
    animation-delay: 0.32s;
  }
  .story > :nth-child(n + 6) {
    animation-delay: 0.4s;
  }

  @keyframes unfold {
    from {
      opacity: 0;
      transform: perspective(900px) rotateX(-75deg);
    }
  }

  /* Folding back: the reverse, last block first. */
  .world.folding .story > * {
    animation: fold 0.3s var(--motion-exit) both;
  }
  .world.folding .story > :nth-last-child(2) {
    animation-delay: 0.04s;
  }
  .world.folding .story > :nth-last-child(3) {
    animation-delay: 0.08s;
  }
  .world.folding .story > :nth-last-child(4) {
    animation-delay: 0.12s;
  }
  .world.folding .story > :nth-last-child(n + 5) {
    animation-delay: 0.16s;
  }

  @keyframes fold {
    to {
      opacity: 0;
      transform: perspective(900px) rotateX(70deg) translateY(-16px);
    }
  }

  .compare {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
    max-width: 54rem;
  }

  .compare p {
    margin: 0.6rem 0 0;
    font-size: clamp(1.3rem, 1rem + 1vw, 1.9rem);
    line-height: 1.2;
  }

  .budget {
    padding: 1.4rem 1.5rem;
    border: 1px dashed #cfc6b4;
    border-radius: 4px;
    color: #c9cfdb;
  }

  .budget .label {
    color: #c9cfdb;
  }

  .ours {
    padding: 1.4rem 1.5rem;
    background: var(--rw-mint);
    color: var(--rw-navy);
    border-radius: 18px;
    transform: rotate(-1deg);
  }

  .ours .label {
    color: var(--rw-navy);
  }

  .ours p {
    font-weight: 600;
  }

  .calc-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .calc {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-5);
    align-items: center;
  }

  .lined {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.2rem 1.2rem 1.4rem;
    background-color: #fffdf8;
    background-image: repeating-linear-gradient(
      transparent 0 37px,
      #d6e2f0 37px 38px
    );
    background-position: 0 18px;
    border-left: 3px solid #f0a6a6;
    border-radius: 12px;
    box-shadow: 0 8px 18px rgba(60, 40, 10, 0.14);
    transform: rotate(-1deg);
  }

  .lined .label {
    color: var(--paper-grey);
  }

  .turn {
    font-size: 1.2rem;
    color: var(--brush);
  }

  .line {
    margin: 0;
    font-size: clamp(1.25rem, 0.9rem + 1.4vw, 2.1rem);
    line-height: 1.5;
  }

  .blank {
    width: 7.5ch;
    min-height: 44px;
    padding: 0 4px;
    border: 0;
    border-bottom: 3px solid var(--paper-ink);
    background: transparent;
    font-family: var(--font-mono);
    font-size: inherit;
    color: #08142b;
    text-align: center;
  }

  .blank:focus-visible {
    outline: 2px solid #1f6b45;
    outline-offset: 3px;
    border-radius: 2px;
  }

  .rwcard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.2rem 1.4rem;
    background: #071229;
    color: #edf3fa;
    border: 1.5px solid var(--rw-mint);
    border-radius: 18px;
    box-shadow: 0 0 0 6px rgba(143, 221, 170, 0.08);
    transform: rotate(1.2deg);
  }

  .rwcard .label {
    color: #9aa9bc;
  }

  .months {
    font-family: var(--font-mono);
    font-size: clamp(3.5rem, 2rem + 4vw, 6rem);
    line-height: 1;
    color: var(--rw-mint);
  }

  .unit {
    margin-left: 0.3em;
    font-size: 0.28em;
  }

  .badge {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.75rem;
    border: 1.5px solid currentColor;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
  }

  /* It breathes, and even critical is no faster than a resting heartbeat. */
  .badge i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    animation: breathe var(--tempo) ease-in-out infinite;
  }

  .st-stable {
    color: var(--rw-mint);
    --tempo: 2.8s;
  }
  .st-caution {
    color: var(--rw-amber);
    --tempo: 1.7s;
  }
  .st-critical {
    color: #e8829e;
    --tempo: 1.1s;
  }

  @keyframes breathe {
    0%,
    100% {
      opacity: 0.35;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.15);
    }
  }

  .simple {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.4rem 1.1rem;
    margin: 0;
  }

  .simple .hand {
    font-size: 1.3rem;
    color: var(--rw-amber);
    transform: rotate(-1.5deg);
  }

  .acc {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--rw-mint);
  }

  .quote {
    display: none;
    margin: 0;
    max-width: 52rem;
    font-size: clamp(1.2rem, 0.9rem + 0.9vw, 1.65rem);
    line-height: 1.45;
  }

  .screens {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }

  .screens::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: -1rem -0.75rem;
    background: var(--rw-violet);
    border-radius: 24px;
  }

  .screen {
    padding: 0.6rem 0.6rem 0.75rem;
    background: #fffdf8;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  }

  .screen:nth-child(odd) {
    transform: rotate(-3deg);
  }

  .screen:nth-child(even) {
    transform: rotate(2deg);
    margin-top: 1.5rem;
  }

  /* On a phone two screens say it; the middle two wait for a wider page. */
  .screen:nth-child(2),
  .screen:nth-child(3) {
    display: none;
  }

  .screen img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .world.open .screen {
    animation: fan 0.8s cubic-bezier(0.2, 0.9, 0.25, 1.15) var(--motion-xlong)
      both;
  }

  @keyframes fan {
    from {
      opacity: 0;
      translate: 0 40px;
      scale: 0.85;
    }
  }

  /* On a phone the five promises share one sticky note. */
  .promises {
    position: relative;
    z-index: 2;
    margin: -2.2rem 0 0;
    padding: 0.4rem 1rem 0.5rem;
    list-style: none;
    background: #ffe68a;
    border-radius: 16px;
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.28);
    transform: rotate(-1.5deg);
  }

  .promises li {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.5rem 0;
    border-top: 1px dashed rgba(26, 26, 26, 0.25);
  }

  .promises li:first-child {
    border-top: 0;
  }

  .promises strong {
    font-size: 1rem;
    line-height: 1.3;
  }

  .promises span {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .price-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }

  .price {
    max-width: 26rem;
    padding: 1.2rem 1.5rem;
    background: var(--rw-yellow);
    color: #08142b;
    border-radius: 14px;
    box-shadow: 0 8px 16px rgba(60, 40, 10, 0.1);
    transform: rotate(-1.5deg);
  }

  .price strong {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .price p {
    margin: 0.4rem 0 0;
    font-size: 0.94rem;
    line-height: 1.5;
  }

  .made {
    margin: 0;
    max-width: 32rem;
    font-size: 0.8rem;
    line-height: 1.6;
    color: #c9cfdb;
  }

  .closing {
    margin: 0;
  }

  @media (max-width: 899.98px) {
    .pull-hint {
      left: auto;
      right: 0.5rem;
      top: -2.6rem;
    }

    .pull-hint .wide,
    .rw-blob {
      display: none;
    }

    /* Open, the pull hint is gone and the sticker would touch the sheet's
       edge; this keeps the same air above the print as below it. */
    .world.open .inner {
      padding-top: calc(var(--space-7) + var(--space-4));
    }

    .pull-hint .narrow {
      display: inline;
    }

    .doodle-line {
      display: none;
    }
  }

  @media (min-width: 900px) {
    .world::before {
      inset: 4rem 2.5rem 0;
    }

    .mark {
      padding: var(--section-y) var(--space-6) 0;
    }

    /* Grows with the width, so the space under the print matches the
       space above it from 900px to 1440px. */
    .world {
      padding-bottom: clamp(2rem, 7.4vw - 2.16rem, 4.5rem);
    }

    .inner {
      /* Even space above and below the print when folded. */
      padding: 0.5rem 5rem 2.5rem;
      margin: 0 2.5rem;
      gap: 3.5rem;
    }

    .intro {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      gap: 3rem;
    }

    /* Two lines, as written: each stays whole on a wide page. */
    .tagline {
      white-space: nowrap;
    }

    .compare {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem;
    }

    .calc {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      gap: 2.5rem;
    }

    .lined {
      padding: 1.9rem 2.1rem 2.1rem;
      gap: 0.9rem;
    }

    .rwcard {
      padding: 1.9rem 2rem;
    }

    .quote {
      display: block;
    }

    .screens {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1.75rem;
    }

    .screens::before {
      inset: -1.75rem -2.5rem;
      border-radius: 30px;
    }

    .screen:nth-child(2),
    .screen:nth-child(3) {
      display: block;
    }

    /* On a wide page each promise is its own sticky note, in a row. */
    .promises {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 1.25rem;
      margin-top: -5.6rem;
      padding: 0;
      background: none;
      box-shadow: none;
      transform: none;
    }

    .promises li {
      gap: 0.5rem;
      padding: 1rem 1rem 1.1rem;
      border: 0;
      border-radius: 16px;
      box-shadow: 0 8px 14px rgba(0, 0, 0, 0.28);
    }

    .promises li:nth-child(1) {
      background: #ffe68a;
      transform: rotate(-4deg);
    }
    .promises li:nth-child(2) {
      background: #f6c4cf;
      transform: rotate(3deg);
      margin-top: 1.6rem;
    }
    .promises li:nth-child(3) {
      background: #c9e8d2;
      transform: rotate(-2deg);
      margin-top: 0.5rem;
    }
    .promises li:nth-child(4) {
      background: #cfd7ff;
      transform: rotate(4deg);
      margin-top: 1.9rem;
    }
    .promises li:nth-child(5) {
      background: #ffd4b0;
      transform: rotate(-3deg);
      margin-top: 0.25rem;
    }

    .promises strong {
      font-size: 1.1rem;
    }

    .promises span {
      font-size: 0.94rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .story > *,
    .world.folding .story > *,
    .world.open .star,
    .world.open .screen,
    .badge i {
      animation: none;
    }

    .world.open .star {
      opacity: 1;
    }

    .badge i {
      opacity: 1;
    }

    .world::before,
    .world.folding::before,
    .poster,
    .tapebtn {
      transition: none;
    }
  }
</style>
