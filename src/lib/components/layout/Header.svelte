<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { tabs } from "$lib/menuTabs";

  export let scrollPosition: number;

  const drawerStore = getDrawerStore();

  function toggleDrawer(): void {
    drawerStore.open();
  }
</script>

<header
  class={"w-full sticky z-[10] top-0 duration-200 bg-transparent " +
    (scrollPosition > 60 ? "py-4" : "py-6 border-transparent")}
>
  <div
    class={"w-full flex items-center justify-between m-auto max-w-[1400px] p-6 " +
      (scrollPosition > 60 &&
        " backdrop-blur-md rounded-full border-lime-950 border-solid border-2")}
  >
    <h1>
      <b>Echo</b>
    </h1>
    <div class="flex md:hidden">
      <button on:click={toggleDrawer}>
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
    <div class="hidden md:flex items-center gap-4">
      {#each tabs as tab, index}
        <a
          href={tab.link}
          class="duration-200 toggle_hover_font_color"
          target={index === 3 ? "_blank" : ""}
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <!--      <button-->
      <!--        class="dark:blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"-->
      <!--      >-->
      <!--        <span-->
      <!--          class="absolute toggle_btn_hover_color top-0 right-full w-full h-full opacity-20 group-hover:translate-x-full z-0 duration-200"-->
      <!--        />-->
      <!--        <span class="relative z-9">Get in touch</span>-->
      <!--      </button>-->
      <ThemeSwitch />
    </div>
  </div>
</header>
