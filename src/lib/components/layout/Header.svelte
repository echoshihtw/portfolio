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
        "bg-white/20 backdrop-blur-md dark:rounded-full rounded-none")}
  >
    <h1>
      <b
        on:click={goTop}
        class="cursor-pointer hover:"
      >
        OCO
      </b>
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
      {#each tabs as tab, index}
        <a
          href={tab.link}
          class="duration-200 toggle_hover_font_color hover:line-through text-white"
          target={index === 3 ? "_blank" : ""}
          aria-label="link to {tab.name} page"
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <button
        class=" bg-white hover:text_gradient_light relative overflow-hidden px-5 py-2 group rounded-none dark:rounded-full text-slate-950"
      >
        <span
          class="absolute toggle_btn_hover_color top-0 right-full w-full h-full opacity-50 group-hover:translate-x-full z-0 duration-200"
        />
        <a
          href="#footer"
          class="relative z-9"
        >
          Contact Me
        </a>
      </button>
      <div class={scrollPosition > 60 ? "drop-shadow-lg" : undefined}>
        <ThemeSwitch id="theme-toggle-desktop" />
      </div>
    </div>
  </div>
</header>
