<script lang="ts">
  import { Footer, Header } from "./index.ts";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  let scrollPosition: number;
  function handleScroll() {
    scrollPosition = window.scrollY; // Get the current vertical scroll position
  }
  onMount(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  });
  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<div
  class="antialiased dark:bg-slate-900 bg-gray-300 text-gray-900 dark:text-white"
>
  <div
    class={"fixed bottom-0 right-0 w-full duration-200 flex p-10" +
      (scrollPosition > 50
        ? " opacity-full pointer-events-auto"
        : " opacity-0 pointer-events-none")}
  >
    <button
      on:click={goTop}
      class="ml-auto rounded-full bg-slate-900 text-lime-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center relative z-[1]"
    >
      <Icon icon="ri:arrow-up-circle-line" />
    </button>
  </div>

  <Header {scrollPosition} />
  <main class="max-w-[1400px] mx-auto">
    <div class="h-auto flex flex-col">
      <slot />
    </div>
  </main>
  <Footer />
</div>
