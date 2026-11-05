<script lang="ts">
  import { base } from "$app/paths";
  import {
    RESUME_LABEL,
    heroConfig,
  } from "../../../../content/portfolio.config";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { trackEmail, trackResume } from "$lib/analytics";
  import { onMount, tick } from "svelte";

  // The headline in three parts: the words before "don't", "don't", and the
  // words after it, each its own span so it can slide when "don't" arrives.
  const at = heroConfig.headline.findIndex((p) => p.mark);
  const before = heroConfig.headline.slice(0, at);
  const mark = heroConfig.headline[at];
  const after = heroConfig.headline
    .slice(at + 1)
    .flatMap((p) => p.text.trim().split(" "))
    .map((text) => ({ text }));
  const sentence = heroConfig.headline.map((p) => p.text).join("");

  // The hero's one move, once, after the cover: a still beat, the caret
  // blinks where "don't" goes, "don't" arrives as the words after it slide
  // to their new places, then the highlighter sweeps behind it. Without the
  // cover, or with Reduce Motion, the sentence is simply there.
  let state: "done" | "waiting" | "caret" | "in" = "done";
  let words: HTMLElement[] = [];

  onMount(() => {
    const cover = document.getElementById("boot-gate");
    if (!cover || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    state = "waiting";
    const root = getComputedStyle(document.documentElement);
    const ms = (name: string) => parseFloat(root.getPropertyValue(name));
    const play = () => {
      setTimeout(() => (state = "caret"), ms("--motion-medium"));
      setTimeout(insert, ms("--motion-medium") + ms("--motion-long"));
    };
    document.addEventListener("cover:gone", play, { once: true });
    return () => document.removeEventListener("cover:gone", play);
  });

  // Words move by transform only: measure, let "don't" in, then slide each
  // word from where it was to where it now sits.
  async function insert() {
    const was = words.map((w) => w.getBoundingClientRect());
    state = "in";
    await tick();
    words.forEach((w, i) => {
      const now = w.getBoundingClientRect();
      w.animate(
        [
          {
            transform: `translate(${was[i].left - now.left}px, ${was[i].top - now.top}px)`,
          },
          { transform: "none" },
        ],
        {
          duration: parseFloat(
            getComputedStyle(w).getPropertyValue("--motion-base")
          ),
          easing: getComputedStyle(w).getPropertyValue("--motion-enter"),
        }
      );
    });
  }
</script>

<!-- One screen, centred: her facts, the claim large, the two links, then
     what she does and her slogan, quiet. -->
<section
  id="home"
  class="hero section_padding"
>
  <div class="hero-grid">
    <ul class="hero-facts">
      {#each heroConfig.remoteOpen as fact}<li>{fact}</li>{/each}
    </ul>

    <!-- Screen readers hear the whole sentence once, never the edit. -->
    <h1
      class="hero-headline"
      aria-label={sentence}
      data-state={state}
    >
      <!-- prettier-ignore -->
      <span aria-hidden="true"><svg class="defs" width="0" height="0"><filter id="hero-pen" x="-5%" y="-20%" width="110%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" /><feDisplacementMap in="SourceGraphic" scale="3" /></filter></svg>{#each before as part}{part.text.trimEnd()}{/each}<span class="caret"></span>{" "}<span class="mark"><span>{mark.text}</span></span>{#each after as word, i}{" "}<span class="word" bind:this={words[i]}>{#if i === after.length - 1 && word.text.endsWith(".")}<span class="pen">{word.text.slice(0, -1)}<svg viewBox="0 0 300 120" preserveAspectRatio="none"><g filter="url(#hero-pen)"><path class="pass" pathLength="1" d="M6 100 C 18 86, 30 86, 40 98 S 62 112, 74 98 S 98 84, 110 97 S 134 111, 146 98 S 170 85, 182 97 S 206 110, 218 97 S 242 85, 254 96 S 280 106, 296 92" /><path class="echo" pathLength="1" d="M14 104 C 24 92, 34 92, 44 102 S 66 114, 78 102 S 102 90, 114 101 S 138 113, 150 102 S 174 90, 186 101 S 210 112, 222 101 S 246 90, 258 100 S 282 108, 292 98" /></g></svg></span><span class="stop">.</span>{:else}{word.text}{/if}</span>{/each}</span>
    </h1>

    <div class="hero-links">
      <a
        href={mailtoWithSubject(heroConfig.email, heroConfig.emailSubject)}
        on:click={() => trackEmail("hero")}
      >
        Email me
      </a>
      <a
        href="{base}/{heroConfig.resume}"
        download
        on:click={() => trackResume("hero")}
      >
        {RESUME_LABEL}
      </a>
    </div>

    <!-- What she does and her slogan, small and quiet under the links. -->
    <div class="hero-quiet">
      {#each heroConfig.support as line}
        <p>{line}</p>
      {/each}
      <p>{heroConfig.owns.join(", ")}.</p>
    </div>
  </div>
</section>

<style>
  .hero-grid {
    display: grid;
    gap: var(--space-5);
    width: 100%;
    max-width: calc(var(--content-max) - 2 * var(--space-6));
    margin: 0 auto;
  }

  .hero-grid p {
    margin: 0;
  }

  /* Each fact its own item, so none splits across lines. */
  .hero-facts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-5);
    color: var(--muted);
  }

  /* The last fact is that she is available: the one a reader acts on, so it
     carries the red of the pen. */
  .hero-facts li:last-child::before {
    content: "";
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    margin-right: 0.5em;
    border-radius: 50%;
    background: var(--accent-shape);
  }

  .hero-headline {
    margin: 0;
    font-size: clamp(2.75rem, 8.4vw, 8.5rem);
    font-weight: 600;
    line-height: 1.02;
    letter-spacing: -0.035em;
    max-width: 13ch;
  }

  /* A red pen line under "learn", like a remark in a notebook: a wobble from
     a noise filter, and a second lighter pass just off the first. It is
     drawn after the highlighter, left to right. */
  .pen {
    position: relative;
    display: inline-block;
  }

  .pen svg {
    position: absolute;
    left: -0.16em;
    top: -0.14em;
    width: calc(100% + 0.34em);
    height: calc(100% + 0.36em);
    overflow: visible;
    pointer-events: none;
  }

  .pen path {
    fill: none;
    stroke: var(--accent-shape);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1;
    /* the box stretches; the line keeps its pen width */
    vector-effect: non-scaling-stroke;
  }

  .pen .pass {
    stroke-width: 0.06em;
    opacity: 0.92;
  }

  .pen .echo {
    stroke-width: 0.025em;
    opacity: 0.5;
  }

  [data-state="waiting"] .pen path,
  [data-state="caret"] .pen path {
    stroke-dashoffset: 1;
  }

  [data-state="in"] .pen path {
    animation: draw var(--motion-long)
      calc(var(--motion-short) + var(--motion-long))
      cubic-bezier(0.65, 0, 0.35, 1) backwards;
  }

  @keyframes draw {
    from {
      stroke-dashoffset: 1;
    }
  }

  .defs {
    position: absolute;
  }

  .word {
    display: inline-block;
  }

  /* "don't", under the highlighter. Before it arrives it takes no room. */
  .mark {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .mark > span {
    position: relative;
    z-index: 1;
    color: var(--mark-ink);
  }

  /* A highlighter stroke: one pass of flat ink, ends cut at the chisel's
     angle, edges that wave a little, lighter along the middle where the felt
     presses less. On paper it multiplies like real ink. */
  .mark::before {
    content: "";
    position: absolute;
    inset: 0.12em -0.2em 0 -0.14em;
    background: linear-gradient(
      178deg,
      var(--mark) 0 30%,
      color-mix(in srgb, var(--mark) 82%, #fff) 48%,
      var(--mark) 66% 100%
    );
    clip-path: polygon(
      4% 4%,
      7% 6.8%,
      14% 5.8%,
      21% 3.6%,
      29% 4.8%,
      36% 6.4%,
      43% 3.8%,
      50% 5.3%,
      57% 6.6%,
      64% 4.2%,
      71% 4.1%,
      79% 6.7%,
      86% 5%,
      93% 3.6%,
      100% 6.4%,
      97% 94.4%,
      93% 93.4%,
      86% 96.3%,
      79% 96.9%,
      71% 93.8%,
      64% 94.4%,
      57% 96.9%,
      50% 95.9%,
      43% 93.7%,
      36% 95.3%,
      29% 97%,
      21% 95%,
      14% 93.6%,
      7% 95.8%,
      0 97%
    );
    transform: rotate(-1.4deg);
    transform-origin: left center;
  }

  :global(html:not([data-theme="dark"])) .mark::before {
    mix-blend-mode: multiply;
  }

  [data-state="waiting"] .mark,
  [data-state="caret"] .mark {
    display: none;
  }

  [data-state="in"] .mark::before {
    animation: sweep var(--motion-long) var(--motion-short)
      cubic-bezier(0.45, 0, 0.15, 1) backwards;
  }

  [data-state="in"] .mark > span {
    animation: arrive var(--motion-base) var(--motion-enter) backwards;
  }

  @keyframes sweep {
    from {
      transform: scaleX(0) rotate(-1.4deg);
    }
  }

  @keyframes arrive {
    from {
      opacity: 0;
    }
  }

  /* The caret takes no room, so the line reads with normal spacing. */
  .caret {
    display: inline-block;
    width: 0.07em;
    height: 0.82em;
    margin: 0 -0.13em 0 0.06em;
    vertical-align: -0.04em;
    background: var(--accent-text);
    opacity: 0;
  }

  [data-state="caret"] .caret {
    animation: blink var(--motion-long) steps(1) 1;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-5);
  }

  /* A highlighter line under each link, which fills behind it on hover. */
  .hero-links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: var(--text-lg);
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    background: linear-gradient(var(--mark), var(--mark)) 0 calc(100% - 8px) /
      100% 2px no-repeat;
    transition:
      background-size var(--motion-short) var(--motion-enter),
      color var(--motion-short) var(--motion-enter);
  }

  .hero-links a:hover {
    background-size: 100% calc(100% - 16px);
    color: var(--mark-ink);
  }

  .hero-quiet {
    display: grid;
    gap: var(--space-1);
    max-width: 40ch;
    color: var(--muted);
  }
</style>
