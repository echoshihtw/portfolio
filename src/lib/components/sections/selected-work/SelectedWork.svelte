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

  // Two screenshots sit among the promises: after the first and the third.
  const cards = c.promises.flatMap((p, i) => [
    { kind: "promise" as const, ...p },
    ...(i === 0 || i === 2
      ? [{ kind: "screen" as const, ...c.screens[i === 0 ? 0 : 1] }]
      : []),
  ]);
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
        <h3>{c.question}</h3>
        <p class="why">{c.quote}</p>
        <p class="price">
          {c.price} once
          <span class="price-note">{c.priceNote}</span>
        </p>
        <a
          class="btn btn-mint"
          href={c.appStore}
          rel="noopener"
        >
          Try it on the App Store <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div class="strip-head">
      <h3 class="label">How it thinks</h3>
      <span
        class="label swipe"
        aria-hidden="true"
      >
        Swipe →
      </span>
    </div>
  </div>

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <section
    class="strip"
    aria-label="How it thinks"
    tabindex="0"
  >
    <div class="card calc">
      <p class="label">Try it</p>
      <label for="rw-cash">I have $</label>
      <input
        id="rw-cash"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        bind:value={cash}
      />
      <label for="rw-cost">A month costs me $</label>
      <input
        id="rw-cost"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        bind:value={cost}
      />
      <p
        class="answer"
        aria-live="polite"
      >
        <span class="answer-num">{monthsText}</span>
        {unit}
      </p>
      <p class="runs-out">{result.runsOut}</p>
    </div>

    {#each cards as card, i}
      {#if card.kind === "screen"}
        <img
          class="card screen"
          src="{base}/{card.src}"
          alt={card.alt}
          loading="lazy"
        />
      {:else}
        <div class="card promise">
          <h4>{card.title}</h4>
          <p>{card.body}</p>
          {#if i === cards.length - 1}
            <p class="made">{c.madeWith}</p>
          {/if}
        </div>
      {/if}
    {/each}
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

  .swipe {
    color: var(--muted);
  }

  .strip {
    display: flex;
    gap: var(--space-3);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 var(--space-4) var(--space-3);
    scroll-padding: 0 var(--space-4);
  }

  .strip:focus-visible {
    outline: 2px solid var(--runway-mint);
    outline-offset: 4px;
  }

  .card {
    flex: 0 0 auto;
    width: 15.5rem;
    min-height: 17.5rem;
    border-radius: 14px;
    scroll-snap-align: start;
  }

  .promise,
  .calc {
    padding: var(--space-4);
  }

  .promise {
    background: rgb(255 255 255 / 0.07);
  }

  .promise h4 {
    margin: 0 0 var(--space-2);
    font-size: var(--text-lg);
    line-height: 1.3;
  }

  .promise p {
    margin: 0;
    color: var(--muted);
  }

  .made {
    margin-top: var(--space-4) !important;
    font-size: var(--text-sm);
  }

  .screen {
    width: auto;
    height: 17.5rem;
    min-height: 0;
  }

  .calc {
    background: var(--runway-mint);
    color: var(--runway-ink);
    display: flex;
    flex-direction: column;
  }

  .calc .label {
    margin: 0 0 var(--space-3);
    color: var(--runway-ink);
  }

  .calc input {
    margin: var(--space-1) 0 var(--space-3);
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

    .strip {
      --edge: max(
        var(--space-6),
        calc((100% - var(--content-max)) / 2 + var(--space-6))
      );
      padding-left: var(--edge);
      scroll-padding-left: var(--edge);
    }
  }
</style>
