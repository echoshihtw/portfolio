<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { tabs } from "$lib/menuTabs";

  export let scrollPosition: number;

  const drawerStore = getDrawerStore();

  function toggleDrawer(): void {
    drawerStore.open();
  }
  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<header class={"w-full sticky z-[10] top-0 duration-200 bg-transparent py-4"}>
  <div
    class={"w-full flex items-center justify-between m-auto max-w-[1400px] py-4 px-6 " +
      (scrollPosition > 60 &&
        "dark:rounded-full rounded-none")}
    style={scrollPosition > 60
      ? "background: rgba(24, 23, 21, 0.12); border: 1px solid var(--section-border);"
      : ""}
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
