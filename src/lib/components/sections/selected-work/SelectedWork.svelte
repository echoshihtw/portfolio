<script lang="ts">
  import { base } from "$app/paths";
  import { selectedWorkConfig as c } from "../../../../content/selectedWork.config";
  import { parseAmount, runway } from "$lib/runway";
  import SectionHead from "$lib/components/SectionHead.svelte";

  let cash = c.calculator.cash;
  let cost = c.calculator.cost;

  const today = new Date();
  // The headline number is the calculator's own answer, so they never disagree.
  const lead = runway(
    parseAmount(c.calculator.cash),
    parseAmount(c.calculator.cost),
    today
  );

  $: result = runway(parseAmount(cash), parseAmount(cost), today);
  $: monthsText = result.months === null ? "∞" : String(result.months);
  $: unit =
    result.months === null ? "" : result.months === 1 ? "month" : "months";

  let debtHidden = false;
  let breathing = false;

  // Which card is in view, for the counter on narrow screens.
  let strip: HTMLElement;
  let at = 0;
  const CARDS = 3;
  function onScroll() {
    const first = strip.firstElementChild as HTMLElement;
    const step =
      first.offsetWidth + parseFloat(getComputedStyle(strip).columnGap);
    at = Math.min(CARDS - 1, Math.round(strip.scrollLeft / step));
  }
</script>

<section
  id="selected-work"
  class="runway section_padding"
  aria-labelledby="selected-work-title"
>
  <div class="inner">
    <SectionHead
      number="01"
      title="Selected work"
      id="selected-work-title"
    >
      <span slot="end">Live on the App Store</span>
    </SectionHead>

    <div class="lead">
      <img
        class="banner"
        src="{base}/{c.banner.src}"
        alt={c.banner.alt}
        width={c.banner.width}
        height={c.banner.height}
      />
      <div class="notes">
        <p class="label meta">{c.meta}</p>
        <!-- prettier-ignore -->
        <p class="big">{lead.months}<span class="big-unit">months</span></p>
        <div class="ask">
          <h3>{c.question}</h3>
          <p class="why">{c.quote}</p>
        </div>
        <div class="buy">
          <p class="price">
            {c.price} once
            <!-- Each fact stays whole; lines break only between them. -->
            {#each c.priceFacts as fact}<span class="price-note">· {fact}</span>
              {" "}{/each}
          </p>
          <a
            class="btn btn-mint"
            href={c.appStore}
            rel="noopener"
          >
            Try it on the App Store <span aria-hidden="true">↗</span>
          </a>
          <p class="made">{c.madeWith}</p>
        </div>
      </div>
    </div>

    <div class="strip-head">
      <h3 class="label">How it thinks</h3>
      <span
        class="label count"
        aria-hidden="true"
      >
        {at + 1} / {CARDS}
      </span>
    </div>
  </div>

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <section
    class="strip"
    aria-label="How it thinks"
    tabindex="0"
    bind:this={strip}
    on:scroll={onScroll}
  >
    <div class="card calc">
      <p class="label">Try it</p>
      <div class="inputs">
        <label>
          I have $
          <input
            type="text"
            inputmode="numeric"
            autocomplete="off"
            bind:value={cash}
          />
        </label>
        <label>
          A month costs me $
          <input
            type="text"
            inputmode="numeric"
            autocomplete="off"
            bind:value={cost}
          />
        </label>
      </div>
      <p
        class="answer"
        aria-live="polite"
      >
        <span class="answer-num">{monthsText}</span>
        {unit}
      </p>
      <p class="runs-out">{result.runsOut}</p>
    </div>

    <div class="card">
      <button
        class="tap"
        aria-pressed={debtHidden}
        on:click={() => (debtHidden = !debtHidden)}
      >
        <span
          class="pair"
          class:solo={debtHidden}
        >
          <span class="cash">
            <span class="label">Cash</span>
            {c.debt.cash}
          </span>
          <span class="owed">
            <span class="label">Owed</span>
            {c.debt.owed}
          </span>
        </span>
        <span class="hint">
          {debtHidden
            ? "Without the debt, it looks rich"
            : "Tap to hide the debt"}
        </span>
      </button>
      <h4>{c.debt.title}</h4>
      <p>{c.debt.body}</p>
    </div>

    <div class="card">
      <button
        class="tap"
        aria-pressed={breathing}
        on:click={() => (breathing = !breathing)}
      >
        <span
          class="badge"
          class:on={breathing}
        >
          <i aria-hidden="true" />
          {c.calm.status}
        </span>
        <span class="hint">
          {breathing
            ? "A resting heartbeat, never faster"
            : "Tap to see it breathe"}
        </span>
      </button>
      <h4>{c.calm.title}</h4>
      <p>{c.calm.body}</p>
    </div>
  </section>
</section>

<style>
  .runway {
    background: var(--runway-indigo);
    color: var(--runway-paper);
    --ink: var(--runway-paper);
    --muted: color-mix(in srgb, var(--runway-paper) 72%, transparent);
    --border: color-mix(in srgb, var(--runway-paper) 25%, transparent);
    padding-left: 0;
    padding-right: 0;
  }

  .inner {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0 var(--space-4);
  }

  /* The row's own margin collapses into this one, so the sum is spelled out
     to match the 40px every other section has under its row. */
  .lead {
    margin-top: calc(var(--space-4) + var(--space-5));
    display: grid;
    gap: var(--space-5);
  }

  .banner {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
  }

  .notes > * {
    margin: 0 0 var(--space-3);
  }

  .meta {
    color: var(--muted);
  }

  .big {
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: clamp(5rem, 14vw, 10rem);
    line-height: 0.9;
    letter-spacing: -0.05em;
    color: var(--runway-mint);
  }

  .big-unit {
    margin-left: 0.4em;
    font-size: 0.2em;
    letter-spacing: 0;
  }

  h3 {
    font-size: var(--text-xl);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .why,
  .price-note {
    color: var(--muted);
  }

  .price {
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .price-note {
    font-size: var(--text-sm);
    font-weight: 400;
    white-space: nowrap;
  }

  .btn-mint {
    background: var(--runway-mint);
    color: var(--runway-ink);
    border-color: var(--runway-mint);
  }

  .strip-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: var(--space-7) 0 var(--space-3);
  }

  .strip-head h3 {
    margin: 0;
    font-size: inherit;
    color: var(--ink);
  }

  .count {
    min-width: 3.5em;
    text-align: right;
    color: var(--muted);
  }

  /* Native sideways scroll, snapping card by card. The scrollbar is hidden;
     the peeking next card and the counter say there is more. */
  .strip {
    display: flex;
    gap: var(--space-3);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 0 var(--space-4) var(--space-3);
    scroll-padding: 0 var(--space-4);
  }

  .strip::-webkit-scrollbar {
    display: none;
  }

  .strip:focus-visible {
    outline: 2px solid var(--runway-mint);
    outline-offset: 4px;
  }

  /* One frame for every card: the focal point on top, then a heading and
     one line. About four things to take in, never more. */
  .card {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    min-height: 18rem;
    padding: var(--space-4);
    border-radius: 14px;
    background: rgb(255 255 255 / 0.07);
    scroll-snap-align: start;
  }

  .card h4 {
    margin: var(--space-4) 0 var(--space-1);
    font-size: var(--text-lg);
    line-height: 1.3;
  }

  .card:not(.calc) p {
    margin: 0;
    color: var(--muted);
  }

  .tap {
    all: unset;
    flex: 1;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: var(--space-2);
    border-radius: var(--radius-md);
    cursor: pointer;
  }

  .tap:focus-visible {
    outline: 2px solid var(--runway-mint);
    outline-offset: 4px;
  }

  .hint {
    font-family: var(--font-mono);
    font-size: var(--text-xs, 0.72rem);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .pair {
    display: flex;
    gap: var(--space-2);
  }

  .pair > span {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    background: rgb(255 255 255 / 0.07);
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    font-weight: 600;
  }

  .cash {
    color: var(--runway-mint);
  }

  .owed {
    color: var(--runway-gold);
    transition:
      opacity var(--motion-medium, 350ms),
      transform var(--motion-medium, 350ms);
  }

  .pair.solo .owed {
    opacity: 0;
    transform: translateX(var(--space-2));
  }

  .pair .label {
    font-size: 0.65rem;
    color: var(--muted);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--runway-rose) 16%, transparent);
    color: var(--runway-rose);
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .badge i {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: var(--radius-pill);
    background: var(--runway-rose);
  }

  /* Runway's own tempo: a resting heartbeat, and only after a tap. */
  .badge.on i {
    animation: breathe 2.8s ease-in-out infinite;
  }

  @keyframes breathe {
    50% {
      box-shadow: 0 0 0 0.7rem
        color-mix(in srgb, var(--runway-rose) 0%, transparent);
    }
    0%,
    100% {
      box-shadow: 0 0 0 0
        color-mix(in srgb, var(--runway-rose) 55%, transparent);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .badge.on i {
      animation: none;
      box-shadow: 0 0 0 0.35rem
        color-mix(in srgb, var(--runway-rose) 30%, transparent);
    }
  }

  .ask .why {
    margin-top: var(--space-1);
  }

  .buy {
    display: grid;
    justify-items: start;
    gap: var(--space-2);
    margin-top: var(--space-4);
  }

  .buy .price {
    margin: 0;
  }

  .made {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .calc {
    background: var(--runway-mint);
    color: var(--runway-ink);
  }

  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
    font-size: var(--text-sm);
  }

  .inputs label {
    display: grid;
  }

  .calc .label {
    margin: 0 0 var(--space-3);
    color: var(--runway-ink);
  }

  .calc input {
    min-width: 0;
    margin-top: var(--space-1);
    padding: var(--space-1) 0;
    border: 0;
    border-bottom: 1px solid var(--runway-ink);
    background: transparent;
    color: inherit;
    font: inherit;
    font-family: var(--font-mono);
  }

  .answer {
    margin: auto 0 0;
  }

  .answer-num {
    overflow-wrap: anywhere;
    font-family: var(--font-mono);
    font-size: 3rem;
    font-weight: 600;
    line-height: 1;
  }

  .runs-out {
    margin: var(--space-1) 0 0;
    font-size: var(--text-sm);
  }

  @media (min-width: 640px) {
    .inner {
      padding: 0 var(--space-6);
    }

    .strip {
      padding: 0 var(--space-6) var(--space-3);
      scroll-padding: 0 var(--space-6);
    }
  }

  @media (min-width: 900px) {
    .lead {
      grid-template-columns: 7fr 5fr;
      gap: var(--space-7);
      align-items: center;
    }

    /* All three fit, so nothing scrolls and nothing counts. */
    .strip {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      overflow: visible;
      max-width: var(--content-max);
      margin: 0 auto;
      padding: 0 var(--space-6);
    }

    .card {
      width: auto;
    }

    .count {
      display: none;
    }
  }
</style>
