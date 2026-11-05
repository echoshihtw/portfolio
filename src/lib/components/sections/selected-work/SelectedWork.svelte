<script lang="ts">
  import { base } from "$app/paths";
  import { selectedWorkConfig as c } from "../../../../content/selectedWork.config";
  import { projectsConfig } from "../../../../content/projects.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import RunwayArchitecture from "./RunwayArchitecture.svelte";
  import Marked from "$lib/components/Marked.svelte";

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
    />

    <!-- The name, the product, then the notes. On a phone the demo comes
         straight after the name, so the product is seen before the words. -->
    <div class="lead">
      <h3 class="title">{c.name}</h3>

      <!-- The demo plays only when asked, and returns to its still frame. -->
      <div class="demo">
        <video
          class="frame"
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
        <p class="lede">
          <Marked
            text={c.lede}
            phrase="live on the App Store"
          />
        </p>
        <!-- Each name stays whole; lines break only between them. -->
        <p class="stack">
          {#each stack as tool, i}<span>
              {tool}{i < stack.length - 1 ? " ·" : ""}
            </span>
            {" "}{/each}
        </p>
        <div class="act">
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
    </div>

    <!-- How it is built: the one picture, and the points beside it. -->
    <div class="built">
      <h3 class="label">How it is built</h3>
      <div class="diagram"><RunwayArchitecture /></div>
      <ol class="points">
        {#each c.points as point, i}
          <li>
            <span
              class="num"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4>{point.title}</h4>
              <p>{point.body}</p>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  </div>
</section>

<style>
  .runway {
    background: var(--runway-field);
    color: var(--runway-paper);
    --ink: var(--runway-paper);
    --muted: color-mix(in srgb, var(--runway-paper) 68%, transparent);
    --hairline: color-mix(in srgb, var(--runway-paper) 18%, transparent);
    /* Focus rings and link hovers are paper here: ink would vanish on the
       band. */
    --primary: var(--runway-paper);
    /* On the dark band the highlighter is see-through and the word stays
       paper, as in the dark theme. */
    --mark: rgb(255 225 77 / 0.3);
    --mark-ink: var(--runway-paper);
    --mark-blend: normal;
  }

  .inner {
    max-width: var(--content-max);
    margin: 0 auto;
  }

  /* Phone: name, demo, notes. Wide: the name across the top, the demo
     beside the notes under it. */
  .lead {
    margin-top: calc(var(--space-4) + var(--space-5));
    display: grid;
    gap: var(--space-5);
    grid-template-areas:
      "title"
      "demo"
      "notes";
  }

  .title {
    grid-area: title;
    margin: 0;
    font-size: var(--text-3xl);
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.045em;
  }

  .demo {
    grid-area: demo;
    position: relative;
  }

  .notes {
    grid-area: notes;
  }

  .frame {
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
    left: var(--space-4);
    bottom: var(--space-4);
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

  /* On the demo's cream picture the ring is the band's ink; under the picture,
     on the band itself, it is the band's paper. */
  .play:focus-visible {
    outline: 2px solid var(--runway-ink);
    outline-offset: 3px;
  }

  .play-icon {
    font-size: 0.8em;
  }

  /* On a narrow frame the corner is the phone itself, so it sits underneath. */
  @media (max-width: 600px) {
    .play:focus-visible {
      outline-color: var(--runway-paper);
    }

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

  .lede {
    font-size: var(--text-lg);
    line-height: 1.45;
  }

  .stack {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .stack span {
    white-space: nowrap;
  }

  .act {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3) var(--space-5);
  }

  .btn-paper {
    background: var(--runway-paper);
    color: var(--runway-ink);
    border-color: var(--runway-paper);
  }

  .note {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--muted);
  }

  /* A hairline, the label, then the diagram and the points. No boxes: the
     lines and the space do the grouping. */
  .built {
    margin-top: var(--space-7);
    padding-top: var(--space-4);
    border-top: 1px solid var(--hairline);
    display: grid;
    gap: var(--space-5);
  }

  .built .label {
    margin: 0;
    color: var(--muted);
  }

  .diagram {
    display: grid;
    place-items: center;
  }

  .points {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    align-content: start;
  }

  .points li {
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    padding: var(--space-5) 0;
    border-top: 1px solid var(--hairline);
  }

  .points li:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .num {
    padding-top: 0.35em;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--runway-blue);
  }

  .points h4 {
    margin: 0 0 var(--space-1);
    font-size: var(--text-xl);
    line-height: 1.2;
    letter-spacing: -0.015em;
  }

  .points p {
    margin: 0;
    color: var(--muted);
  }

  @media (min-width: 900px) {
    .lead {
      grid-template-columns: 7fr 5fr;
      grid-template-areas:
        "title title"
        "demo notes";
      column-gap: var(--space-7);
      row-gap: var(--space-6);
      align-items: center;
    }

    .notes > :last-child {
      margin-bottom: 0;
    }

    .built {
      grid-template-columns: 7fr 5fr;
      column-gap: var(--space-7);
    }

    .built .label {
      grid-column: 1 / -1;
    }
  }
</style>
