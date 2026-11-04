<script lang="ts">
  import { base } from "$app/paths";
  import { selectedWorkConfig as c } from "../../../../content/selectedWork.config";
  import { projectsConfig } from "../../../../content/projects.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import RunwayArchitecture from "./RunwayArchitecture.svelte";

  // The stack is written once, on the project's card.
  const stack =
    projectsConfig.find((p) => p.name === c.name)?.stack.slice(0, 5) ?? [];

  let video: HTMLVideoElement;
  let playing = false;
  function playDemo() {
    playing = true;
    video.play();
  }
  function stopDemo() {
    playing = false;
    video.pause();
    video.load(); // back to the still frame
  }

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
      <!-- The demo plays only when asked, and returns to its still frame. -->
      <div class="demo">
        <video
          class="banner"
          bind:this={video}
          src="{base}/{c.demo.src}"
          poster="{base}/{c.demo.poster}"
          width={c.demo.width}
          height={c.demo.height}
          aria-label={c.demo.label}
          muted
          playsinline
          preload="none"
          on:ended={stopDemo}
        ></video>
        <button
          class="play"
          type="button"
          on:click={playing ? stopDemo : playDemo}
        >
          <span
            class="play-icon"
            aria-hidden="true"
          >
            {playing ? "■" : "▶"}
          </span>
          {playing ? "Stop the demo" : "Watch it work"}
        </button>
      </div>
      <div class="notes">
        <h3>{c.name}</h3>
        <p class="lede">{c.lede}</p>
        <ul class="facts">
          {#each c.facts as fact}
            <li>
              <b>{fact.value}</b>
              <span>{fact.label}</span>
            </li>
          {/each}
        </ul>
        <!-- Each name stays whole; lines break only between them. -->
        <p class="stack">
          {#each stack as tool, i}<span>
              {tool}{i < stack.length - 1 ? " ·" : ""}
            </span>
            {" "}{/each}
        </p>
        <a
          class="btn btn-paper"
          href={c.appStore}
          target="_blank"
          rel="noopener noreferrer"
        >
          Try it free on the App Store <span aria-hidden="true">↗</span>
        </a>
        <p class="note">{c.note}</p>
      </div>
    </div>

    <div class="strip-head">
      <h3 class="label">How it is built</h3>
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
    aria-label="How it is built"
    tabindex="0"
    bind:this={strip}
    on:scroll={onScroll}
  >
    <div class="item wide">
      <div class="focal"><RunwayArchitecture /></div>
      <h4>{c.architecture.title}</h4>
      <p>{c.architecture.body}</p>
    </div>
    {#each [c.privacy, c.release] as card}
      <div class="item">
        <div class="focal">
          <ol class="steps">
            {#each card.steps as step}
              <li class={step.tone ?? ""}>
                <span>{step.key}</span>
                {step.text}
              </li>
            {/each}
          </ol>
        </div>
        <h4>{card.title}</h4>
        <p>{card.body}</p>
      </div>
    {/each}
  </section>

  <p class="inner links">
    <a
      href={c.site}
      target="_blank"
      rel="noopener noreferrer"
    >
      The product story <span aria-hidden="true">↗</span>
    </a>
    <a href="#contact">Ask me for a code walkthrough</a>
  </p>
</section>

<style>
  .runway {
    background: var(--runway-field);
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

  .demo {
    position: relative;
  }

  .banner {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--radius-md);
  }

  /* The one control on the demo, on the frame's corner, so it never covers
     the number. */
  .play {
    position: absolute;
    left: var(--space-3);
    bottom: var(--space-3);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 44px;
    padding: 0 var(--space-4);
    border: 0;
    border-radius: 999px;
    background: var(--runway-ink);
    color: var(--runway-paper);
    font: inherit;
    cursor: pointer;
  }

  .play:focus-visible,
  .links a:focus-visible {
    outline: 2px solid var(--runway-blue);
    outline-offset: 3px;
  }

  .play-icon {
    font-size: 0.8em;
  }

  /* On a narrow frame the corner is the phone itself, so it sits underneath. */
  @media (max-width: 600px) {
    .play {
      position: static;
      margin-top: var(--space-3);
      /* on the band it needs its own edge */
      border: 1px solid color-mix(in srgb, var(--runway-paper) 55%, transparent);
    }
  }

  .notes > * {
    margin: 0 0 var(--space-4);
  }

  h3 {
    font-size: var(--text-xl);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .lede {
    font-size: var(--text-lg);
    line-height: 1.45;
  }

  /* Three facts, one row at every width: the value big, its label under it. */
  .facts {
    display: flex;
    gap: var(--space-4) var(--space-5);
    padding: 0;
    list-style: none;
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .facts b {
    display: block;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: clamp(var(--text-lg), 4vw, var(--text-xl));
    font-weight: 500;
    line-height: 1.1;
    color: var(--runway-blue);
  }

  .stack span,
  .facts span {
    white-space: nowrap;
  }

  .stack {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .btn-paper {
    background: var(--runway-paper);
    color: var(--runway-ink);
    border-color: var(--runway-paper);
  }

  .note {
    font-size: var(--text-sm);
    color: var(--muted);
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
    outline: 2px solid var(--runway-blue);
    outline-offset: 4px;
  }

  /* One frame for every card: the picture on top, then a heading and one
     line. About four things to take in, never more. */
  .item {
    --focal-h: 14rem;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    width: 17rem;
    padding: var(--space-4);
    border-radius: 14px;
    border: 1px solid var(--border);
    scroll-snap-align: start;
  }

  .item.wide {
    --focal-h: 22rem;
    width: min(18.5rem, 82vw);
  }

  .focal {
    flex: none;
    height: var(--focal-h);
    display: grid;
    place-items: center;
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

  /* A step-by-step: the step's name, then what happens. */
  .steps {
    display: grid;
    gap: var(--space-2);
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .steps li {
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: var(--space-3);
    align-items: baseline;
    padding-left: var(--space-3);
    border-left: 1px solid var(--border);
  }

  .steps span {
    color: var(--runway-paper);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .steps .ok,
  .steps .ok span {
    color: var(--runway-blue);
    border-color: var(--runway-blue);
  }

  .steps .no,
  .steps .no span {
    color: var(--runway-act);
    border-color: var(--runway-act);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-5);
    margin-top: var(--space-5);
  }

  .links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--runway-paper);
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
  }

  /* All three fit, so nothing scrolls and nothing counts. */
  @media (min-width: 1100px) {
    .strip {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      overflow: visible;
      max-width: var(--content-max);
      margin: 0 auto;
      padding: 0 var(--space-6);
    }

    .item,
    .item.wide {
      --focal-h: 15rem;
      width: auto;
    }

    .count {
      display: none;
    }
  }
</style>
