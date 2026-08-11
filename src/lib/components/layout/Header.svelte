<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { tabs } from "$lib/menuTabs";
  import { base } from "$app/paths";

  export let scrollPosition: number;
  export let isVisible = true;
  export let showNavBackdrop = false;

  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<header
  class={"w-full sticky z-[40] top-0 py-2 header-shell " +
    (isVisible ? "header-visible" : "header-hidden")}
>
  <div
    class={"w-full flex items-center justify-between m-auto max-w-[1400px] py-3 px-6 " +
      (showNavBackdrop && "dark:rounded-full rounded-none nav-filtered")}
  >
    <!-- Not an <h1>: the hero statement is the page's single heading. -->
    <a
      href={base || "/"}
      on:click|preventDefault={goTop}
      class="site-name"
    >
      Echo Shih
    </a>
    <div class="flex gap-5">
      <div class="md:hidden">
        <ThemeSwitch id="theme-toggle-mobile" />
      </div>
    </div>
    <div class="hidden md:flex items-center gap-4">
      {#each tabs as tab}
        <a
          href={tab.link}
          class="nav-link"
          aria-label="Go to {tab.name.replace('#', '')} section"
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <div class={scrollPosition > 60 ? "drop-shadow-lg" : undefined}>
        <ThemeSwitch id="theme-toggle-desktop" />
      </div>
    </div>
  </div>
</header>

<style>
  /* One hover language across the site: accent colour on text, accent border on
     surfaces. The nav used a strikethrough and Tailwind greys, which belonged to
     neither. */
  .nav-link,
  .site-name {
    color: var(--text-color);
    text-decoration: none;
    transition: color 180ms ease;
  }

  .nav-link:hover,
  .site-name:hover {
    color: var(--color-accent);
  }

  .nav-link:focus-visible,
  .site-name:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* Keeps the visual weight the old <h1> had, without the heading semantics. */
  .site-name {
    font-family: "DM Serif Display", serif;
    font-size: 2em;
    font-weight: bold;
    line-height: 1.2;
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-link,
    .site-name {
      transition: none;
    }
  }

  .header-shell {
    transition:
      transform 260ms ease,
      opacity 220ms ease;
    will-change: transform, opacity;
  }

  .header-visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .header-hidden {
    transform: translateY(-105%);
    opacity: 0;
    pointer-events: none;
  }

  .nav-filtered {
    transition:
      background-color 180ms ease,
      border-color 180ms ease;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    background: rgba(247, 245, 240, 0.7);
    border: 1px solid var(--section-border);
  }

  :global(html[data-theme="dark"]) .nav-filtered {
    background: rgba(17, 17, 16, 0.62);
  }
</style>
