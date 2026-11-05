<script lang="ts">
  import { base } from "$app/paths";
  import {
    RESUME_LABEL,
    heroConfig,
  } from "../../../../content/portfolio.config";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { trackEmail, trackResume } from "$lib/analytics";
  import { onMount, tick } from "svelte";
  import { Mark } from "$lib/pens";

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
  // The highlighter sweeps just after "don't" arrives; the pen draws once
  // the highlighter has finished. Both read the motion scale on mount.
  $: drawn = state === "in" || state === "done";
  let sweepDelay = 0;
  let penDelay = 0;
  let words: HTMLElement[] = [];

  onMount(() => {
    const cover = document.getElementById("boot-gate");
    if (!cover || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    state = "waiting";
    const root = getComputedStyle(document.documentElement);
    const ms = (name: string) => parseFloat(root.getPropertyValue(name));
    sweepDelay = ms("--motion-short");
    penDelay = sweepDelay + ms("--motion-long");
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
      <span aria-hidden="true">{#each before as part}{part.text.trimEnd()}{/each}<span class="caret"></span>{" "}<span class="insert"><Mark {drawn} delay={sweepDelay}>{mark.text}</Mark></span>{#each after as word, i}{" "}<span class="word" bind:this={words[i]}>{#if i === after.length - 1 && word.text.endsWith(".")}<Mark kind="wavy" {drawn} delay={penDelay}>{word.text.slice(0, -1)}</Mark><span class="stop">.</span>{:else}{word.text}{/if}</span>{/each}</span>
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
     carries the blue of the pen. */
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

  .word {
    display: inline-block;
  }

  /* The hero's stroke is solid in both themes: "don't" is one short word
     the stroke always covers. Longer marks elsewhere can be see-through. */
  .hero-headline {
    --mark: var(--mark-solid);
    --mark-ink: var(--mark-solid-ink);
  }

  /* "don't", before it arrives, takes no room; then it fades in as the words
     after it slide over. */
  .insert {
    display: inline-block;
    white-space: nowrap;
  }

  [data-state="waiting"] .insert,
  [data-state="caret"] .insert {
    display: none;
  }

  [data-state="in"] .insert {
    animation: arrive var(--motion-base) var(--motion-enter) backwards;
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
