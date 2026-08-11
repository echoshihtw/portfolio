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
  .floating-nav {
    position: fixed;
    left: 50%;
    bottom: 1.2rem;
    transform: translateX(-50%);
    z-index: 60;
    display: flex;
    gap: 0.35rem;
    padding: 0.5rem;
    /* One shape at every width: pills sized to their labels, in a single row.
       The bar is as wide as its contents and no wider, capped so it never
       touches the screen edge. If a very narrow phone cannot fit the row, it
       scrolls rather than wrapping — a bar that sits over the content should
       not grow to two lines. */
    width: max-content;
    max-width: calc(100% - 1.2rem);
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    border-radius: 999px;
    border: 1px solid var(--color-accent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: rgba(247, 245, 240, 0.94);
    box-shadow:
      0 10px 28px rgba(0, 0, 0, 0.16),
      0 2px 0 rgba(255, 255, 255, 0.35) inset;
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
    transform: translateX(-50%) translateY(16px);
  }

  .floating-link {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.76rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--text-color);
    text-decoration: none;
    white-space: nowrap;
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.4rem 0.62rem;
    background: rgba(255, 255, 255, 0.55);
    flex: none;
  }

  /* The two controls are icons, not labels: they size to their content while
     the links share what is left. */
  .floating-top-button {
    display: grid;
    place-items: center;
    color: var(--color-accent);
    min-width: 2.1rem;
    padding-inline: 0.45rem;
    cursor: pointer;
    flex: none;
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

  .floating-link:hover {
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.88);
  }

  .floating-link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 1px;
  }

  :global(html[data-theme="dark"]) .floating-nav {
    background: rgba(17, 17, 16, 0.9);
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.42),
      0 1px 0 rgba(255, 255, 255, 0.05) inset;
  }

  :global(html[data-theme="dark"]) .floating-link:hover {
    background: rgba(237, 236, 232, 0.14);
  }

  :global(html[data-theme="dark"]) .floating-link {
    border-color: var(--project-card-border);
    background: rgba(237, 236, 232, 0.05);
  }

  /* No width breakpoint: the bar is the same object on a phone and on a
     desktop, and it already sizes to its contents. */

  .floating-nav::-webkit-scrollbar {
    display: none;
  }
</style>
