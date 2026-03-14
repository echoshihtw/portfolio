<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { tabs } from "$lib/menuTabs";

  export let scrollPosition: number;
  export let isVisible = true;
  export let showNavBackdrop = false;

  const drawerStore = getDrawerStore();

  function toggleDrawer(): void {
    drawerStore.open();
  }
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
      (showNavBackdrop &&
        "dark:rounded-full rounded-none nav-filtered")}
  >
    <h1>
      <button
        on:click={goTop}
        class="cursor-pointer bg-transparent border-0 p-0 text-[var(--text-color)]"
      >
        Echo Shih
      </button>
    </h1>
    <div class="flex gap-5">
      <div class="md:hidden">
        <ThemeSwitch id="theme-toggle-mobile" />
      </div>
      <div class="flex md:hidden">
        <button
          on:click={toggleDrawer}
          aria-label="mobile menu toggle button"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
    <div class="hidden md:flex items-center gap-4">
      {#each tabs as tab}
        <a
          href={tab.link}
          class="duration-200 toggle_hover_font_color hover:line-through"
          style="color: var(--text-color);"
          aria-label="link to {tab.name} page"
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
    transition: background-color 180ms ease, border-color 180ms ease;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    background: rgba(247, 245, 240, 0.7);
    border: 1px solid var(--section-border);
  }

  :global(html[data-theme="dark"]) .nav-filtered {
    background: rgba(17, 17, 16, 0.62);
  }
</style>
