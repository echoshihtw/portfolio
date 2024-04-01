<script lang="ts">
  import "../app.css";
  import Icon from "@iconify/svelte";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount } from "svelte";

  let scrollPosition: number;

  // Function to be called whenever the user scrolls
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
  class="bg-pink-100 dark:bg-transparent relative flex flex-col mx-auto w-full text-sm sm:text-base min-h-screen items-center"
>
  <div
    class={"fixed bottom-0 right-0 w-full duration-200 flex p-10 z-[10] " +
      (scrollPosition > 50
        ? " opacity-full pointer-events-auto"
        : " opacity-0 pointer-events-none")}
  >
    <button
      on:click={goTop}
      class="ml-auto rounded-full bg-slate-900 text-lime-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center"
    >
      <Icon icon="ri:arrow-up-circle-line" />
    </button>
  </div>
  <div class="w-full m-auto flex items-center flex-col">
    <Header {scrollPosition} />
    <slot />
    <Footer />
  </div>
</div>

<!--<svelte:window-->
<!--  bind:scrollY={scrollPosition}-->
<!--  bind:innerHeight-->
<!--  bind:innerWidth-->
<!--/>-->
