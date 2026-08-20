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
    border: 1px solid color-mix(in srgb, var(--text-color) 8%, transparent);
    box-shadow:
      0 10px 28px -8px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 color-mix(in srgb, white 35%, transparent),
      inset 0 0 0 1px color-mix(in srgb, white 6%, transparent);
    transition:
      opacity 220ms ease,
      transform 220ms ease;
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
    text-decoration: none;
    white-space: nowrap;
    flex: none;
    transition: color 180ms ease;
  }

  .floating-link:hover,
  .floating-link:focus-visible {
    color: var(--color-accent);
  }

  .floating-link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: 2px;
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
