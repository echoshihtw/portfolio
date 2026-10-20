<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { selectedWorkConfig as c } from "../../../../content/selectedWork.config";
  import { parseAmount, runway, spend } from "$lib/runway";
  import SectionHead from "$lib/components/SectionHead.svelte";

  const today = new Date();
  // The headline number comes from the same rules as the cards.
  const lead = runway(
    parseAmount(c.lead.cash),
    parseAmount(c.lead.cost),
    today
  );

  const s = c.spend;
  const plan = {
    cash: s.cash,
    monthly: s.rent + s.subscriptions + s.living,
    livingLeft: s.livingLeft,
  };
  let spent = 0;
  $: now = spend(plan, spent);
  const money = (n: number) => "$" + n.toLocaleString("en");

  // A click keeps a decision on; a mouse hovering only previews it. Touch
  // and keyboard skip the preview and go straight to the click.
  let debtHidden = false;
  let breathing = false;
  let previewDebt = false;
  let previewCalm = false;
  const mouse = (e: PointerEvent) => e.pointerType === "mouse";

  // The hints name the gesture this device has.
  let verb = "Tap";
  onMount(() => {
    if (matchMedia("(hover: hover) and (pointer: fine)").matches)
      verb = "Hover";
  });

  $: debtShown = debtHidden || previewDebt;
  $: calmShown = breathing || previewCalm;

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
    <div class="item">
      <div class="focal">
        <dl class="ledger">
          <div>
            <dt>Rent & bills</dt>
            <dd>{money(s.rent + s.subscriptions)}</dd>
          </div>
          <div class="living">
            <dt>Left to spend</dt>
            <dd>{money(now.livingLeft)}</dd>
          </div>
        </dl>
        <!-- prettier-ignore -->
        <div class="spend-line" class:critical={now.months < 3} aria-live="polite"><span class="spend-months">{now.months}</span> months</div>
        {#if now.over}
          <button
            class="log"
            on:click={() => (spent = 0)}
          >
            Start over
          </button>
        {:else}
          <button
            class="log"
            on:click={() => (spent += s.lunch)}
          >
            Log a {money(s.lunch)} lunch
          </button>
        {/if}
      </div>
      <h4>{s.title}</h4>
      <p>{s.body}</p>
    </div>

    <div class="item">
      <button
        class="tap"
        aria-label="Hide the debt: cash {c.debt.cash}, owed {c.debt.owed}"
        aria-pressed={debtHidden}
        on:click={() => (debtHidden = !debtHidden)}
        on:pointerenter={(e) => (previewDebt = mouse(e))}
        on:pointerleave={() => (previewDebt = false)}
      >
        <span
          class="pair"
          class:solo={debtShown}
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
        <span
          class="hint"
          aria-hidden="true"
        >
          {debtHidden
            ? "You look richer than you are"
            : previewDebt
              ? "Click to keep it hidden"
              : `${verb} to hide the debt`}
        </span>
      </button>
      <h4>{c.debt.title}</h4>
      <p>{c.debt.body}</p>
    </div>

    <div class="item">
      <button
        class="tap"
        aria-label="Let the {c.calm.status} badge breathe"
        aria-pressed={breathing}
        on:click={() => (breathing = !breathing)}
        on:pointerenter={(e) => (previewCalm = mouse(e))}
        on:pointerleave={() => (previewCalm = false)}
      >
        <span
          class="badge"
          class:on={calmShown}
        >
          <i aria-hidden="true" />
          {c.calm.status}
        </span>
        <span
          class="hint"
          aria-hidden="true"
        >
          {breathing
            ? "A resting heartbeat, never faster"
            : previewCalm
              ? "Click to keep it breathing"
              : `${verb} to see it breathe`}
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
  .item {
    --focal-h: 11rem;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    min-height: 18rem;
    padding: var(--space-4);
    border-radius: 14px;
    /* An outline, not a fill: Runway's gold and rose only reach 4.5:1 on
       the band itself. */
    border: 1px solid var(--border);
    scroll-snap-align: start;
  }

  .item h4 {
    margin: var(--space-4) 0 var(--space-1);
    font-size: var(--text-lg);
    line-height: 1.3;
  }

  .item p {
    margin: 0;
    color: var(--muted);
  }

  /* A fixed focal area, so every card's visual and heading line up. */
  .tap {
    all: unset;
    flex: none;
    height: var(--focal-h);
    display: grid;
    place-content: center;
    justify-items: center;
    gap: var(--space-2);
    border-radius: var(--radius-md);
    cursor: pointer;
  }

  /* Only the cards you can play with answer the mouse. */
  @media (hover: hover) and (pointer: fine) {
    .item:has(button) {
      transition: border-color var(--motion-medium, 350ms);
    }

    .item:has(button:hover) {
      border-color: color-mix(in srgb, var(--runway-paper) 55%, transparent);
    }
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
    border: 1px solid var(--border);
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
    border: 1px solid var(--runway-rose);
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

  /* The spending card: rent and bills, what is left to live on, and
     the months, which hold still until the living budget runs out. */
  .focal {
    display: grid;
    align-content: center;
    justify-items: center;
    gap: var(--space-2);
    height: var(--focal-h);
  }

  /* Read like a receipt: label left, amount right, one row each. */
  .ledger {
    display: grid;
    gap: var(--space-1);
    width: 100%;
    margin: 0;
    font-family: var(--font-mono);
  }

  .ledger div {
    display: flex;
    justify-content: space-between;
    gap: var(--space-3);
    padding-bottom: var(--space-1);
    border-bottom: 1px solid var(--border);
    color: var(--muted);
  }

  .ledger dt {
    font-size: var(--text-sm);
  }

  .ledger dd {
    margin: 0;
    font-weight: 600;
  }

  .ledger .living {
    color: var(--runway-mint);
  }

  .spend-line {
    font-family: var(--font-mono);
    color: var(--runway-mint);
  }

  /* Runway turns critical under three months, in the same rose. */
  .spend-line.critical {
    color: var(--runway-rose);
  }

  .spend-months {
    font-size: 2.75rem;
    line-height: 1;
    font-weight: 600;
  }

  .log {
    padding: var(--space-1) var(--space-3);
    border: 1px solid var(--runway-mint);
    border-radius: var(--radius-pill);
    background: none;
    color: var(--runway-mint);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    cursor: pointer;
  }

  .log:hover {
    background: color-mix(in srgb, var(--runway-mint) 14%, transparent);
  }

  .log:focus-visible {
    outline: 2px solid var(--runway-mint);
    outline-offset: 3px;
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

    .item {
      width: auto;
    }

    .count {
      display: none;
    }
  }
</style>
