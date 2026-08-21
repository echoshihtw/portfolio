<script lang="ts">
  import Icon from "@iconify/svelte";
  import ThemeSwitch from "$lib/components/ThemeSwitch.svelte";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { heroConfig } from "../../../content/portfolio.config";

  export let isVisible = false;

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $: isBlog = $page.url.pathname.startsWith(`${base}/blog`);
</script>

<!-- inert while hidden: this pill is only faded out, not removed, so without
     it every control inside stays in the tab order and keyboard focus
     disappears into an invisible nav. -->
<nav
  aria-label="Floating navigation"
  inert={!isVisible}
  class={"floating-nav " +
    (isVisible ? "floating-nav-visible" : "floating-nav-hidden")}
>
  <!-- Deliberately not the header's six. This bar exists because the header
       scrolled away, so a slot is earned by being something you cannot get
       from where you are standing: Blog is the one destination scrolling
       will never reach, Résumé is the conversion, top is the way back, and
       the toggle is the only theme control left on screen. Work, Projects
       and Skills are the page you are already scrolling through — they were
       four of the six links and all of the crowding. -->
  <div class="floating-links">
    <a
      href="{base}/blog"
      class="floating-link"
      aria-current={isBlog ? "page" : undefined}
    >
      Blog
    </a>
    <a
      href="{base}/{heroConfig.resume}"
      download={heroConfig.resumeAs}
      class="floating-link"
    >
      Résumé
    </a>
  </div>
  <button
    type="button"
    aria-label="Go to top"
    class="floating-link floating-top-button"
    on:click={goTop}
  >
    <Icon icon="ri:arrow-up-circle-line" />
  </button>

  <div
    class="floating-theme-toggle"
    aria-label="Toggle theme"
  >
    <ThemeSwitch id="theme-toggle-floating" />
  </div>
</nav>

<style>
  /* Docked at the top, same spot the header nav just vacated — the position
     itself is what makes this read as a continuation of that nav rather than
     a separate floating widget, so it drops down into place instead of
     rising from the bottom. Styling mirrors the header's mobile-tab-link
     exactly: same font, same plain-text (no per-link chip/border), same
     hover language. */
  .floating-nav {
    position: fixed;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    z-index: 60;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 1rem;
    width: max-content;
    max-width: calc(100% - 1.2rem);
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: hidden;
    border-radius: 999px;
    /* Liquid glass: strong blur + saturation boost so content behind actually
       reads through, a translucent tint rather than a flat surface, and an
       inset highlight along the top edge for the glass-reflection cue. */
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    background: color-mix(in srgb, var(--surface-bg) 40%, transparent);
    /* A soft outer glow rather than a hairline border, so the edge reads as
       light diffusing off the glass rather than a hard line hugging the
       link text inside. */
    box-shadow:
      0 10px 28px -8px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 color-mix(in srgb, white 35%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 6%, transparent),
      0 0 calc(6px + 10px * var(--glow-strength, 0))
        color-mix(
          in srgb,
          var(--color-accent) calc(10% + 20% * var(--glow-strength, 0)),
          transparent
        );
    transition:
      opacity 220ms ease,
      transform 220ms ease,
      background-color 200ms ease,
      box-shadow 200ms ease;
  }

  /* The glass itself reacts, not just the links inside it: a touch more
     opacity/lift and a brighter glow on hover, like it's catching more light. */
  .floating-nav:hover {
    background: color-mix(in srgb, var(--surface-bg) 55%, transparent);
    box-shadow:
      0 14px 34px -8px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 color-mix(in srgb, white 45%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 8%, transparent),
      0 0 calc(12px + 16px * var(--glow-strength, 0))
        color-mix(
          in srgb,
          var(--color-accent) calc(20% + 25% * var(--glow-strength, 0)),
          transparent
        );
    transform: translateX(-50%) translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-nav:hover {
      transform: translateX(-50%);
    }
  }

  .floating-nav-visible {
    opacity: 1;
    pointer-events: auto;
  }

  .floating-nav-hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) translateY(-16px);
  }

  .floating-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* min-width: 0 lets the strip shrink below its content width, so the
       links are what scroll rather than the pill growing past the screen. */
    flex: 1 1 auto;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .floating-links::-webkit-scrollbar {
    display: none;
  }

  .floating-link {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.28em;
    white-space: nowrap;
    flex: none;
    /* The go-to-top control is a <button>, so it arrives with the browser's
       default chrome. */
    border: none;
    background: none;
    transition:
      color 180ms ease,
      text-decoration-color 180ms ease,
      text-shadow 180ms ease;
  }

  /* Underline rather than a boxed outline. It is already there at rest in
     transparent, so hover and focus fade it in instead of reflowing the
     text. Hover stops at the underline plus brighter text; focus goes on to
     accent colour and a glow, so a keyboard user can still tell the two
     apart without a hard rectangle. */
  .floating-link:hover,
  .floating-link:focus-visible {
    color: var(--text-color);
    text-decoration-color: var(--color-accent);
  }

  .floating-link[aria-current="page"] {
    color: var(--text-color);
  }

  .floating-link:focus-visible {
    color: var(--color-accent);
    text-shadow: 0 0 8px
      color-mix(in srgb, var(--color-accent) 55%, transparent);
  }

  /* The two controls are icons, not labels: they size to their content while
     the links share what is left. */
  .floating-top-button {
    display: grid;
    place-items: center;
    color: var(--color-accent);
    min-width: 1.4rem;
    cursor: pointer;
  }

  .floating-top-button :global(svg) {
    width: 1.1rem;
    height: 1.1rem;
  }

  .floating-theme-toggle {
    display: grid;
    place-items: center;
    min-width: 1.9rem;
    flex: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-link {
      transition: none;
    }
  }

  /* No width breakpoint: the bar is the same object on a phone and on a
     desktop, and it already sizes to its contents. */
</style>
