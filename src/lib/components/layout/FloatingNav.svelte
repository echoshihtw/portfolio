<script lang="ts">
  import { tabs } from "$lib/menuTabs";
  import Icon from "@iconify/svelte";
  import ThemeSwitch from "$lib/components/ThemeSwitch.svelte";

  export let isVisible = false;

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<nav
  aria-label="Floating navigation"
  class={"floating-nav " +
    (isVisible ? "floating-nav-visible" : "floating-nav-hidden")}
>
  {#each tabs as tab}
    <a
      href={tab.link}
      class="floating-link"
    >
      {tab.name}
    </a>
  {/each}
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
    overflow-x: auto;
    scrollbar-width: none;
    border-radius: 999px;
    /* Liquid glass: strong blur + saturation boost so content behind actually
       reads through, a translucent tint rather than a flat surface, and an
       inset highlight along the top edge for the glass-reflection cue. */
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    background: color-mix(in srgb, var(--surface-bg) 40%, transparent);
    /* A hairline border sat right up against the link text inside — swapped
       for a soft outer glow instead, so the edge reads as light diffusing
       off the glass rather than a hard line hugging the content. */
    box-shadow:
      0 10px 28px -8px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 color-mix(in srgb, white 35%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 6%, transparent),
      0 0 calc(6px + 10px * var(--glow-strength, 0))
        color-mix(in srgb, var(--color-accent) calc(10% + 20% * var(--glow-strength, 0)), transparent);
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
        color-mix(in srgb, var(--color-accent) calc(20% + 25% * var(--glow-strength, 0)), transparent);
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
    /* .floating-link is one of the shared classes app.css's global button
       rule targets, which sets border-color on hover — background is a
       <button> for the go-to-top icon, so without this it picks up the
       browser's default button border, colored, on hover. */
    border: none;
    background: none;
    transition:
      color 180ms ease,
      text-decoration-color 180ms ease,
      text-shadow 180ms ease;
  }

  /* Underline instead of a boxed outline — it was hugging the text tightly
     at only 2px offset. The glow on focus keeps a visible, accessible cue
     for keyboard users without the hard rectangle. Also overrides
     app.css's shared button-hover rule, whose `0 0 0 1px accent` box-shadow
     ring reads as a border even though it isn't one — not wanted here since
     these are plain-text links, not chip buttons. */
  .floating-link:hover,
  .floating-link:focus-visible {
    color: var(--color-accent);
    text-decoration-color: var(--color-accent);
    box-shadow: none;
  }

  .floating-link:focus-visible {
    text-shadow: 0 0 8px color-mix(in srgb, var(--color-accent) 55%, transparent);
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
    margin-left: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-link {
      transition: none;
    }
  }

  /* No width breakpoint: the bar is the same object on a phone and on a
     desktop, and it already sizes to its contents. */

  .floating-nav::-webkit-scrollbar {
    display: none;
  }
</style>
