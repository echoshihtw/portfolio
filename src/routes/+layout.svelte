<script lang="ts">
  import "../app.css";
  import Icon from "@iconify/svelte";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";

  let y: number;
  let innerWidth: number = 0;
  let innerHeight: number = 0;

  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<div
  class="dark:bg-pink-100 relative flex flex-col mx-auto w-full text-sm sm:text-base min-h-screen items-center"
>
  <div
    class={"fixed bottom-0 right-0 w-full duration-200 flex p-10 z-[10] " +
      (y > 50
        ? " opacity-full pointer-events-auto"
        : " opacity-0 pointer-events-none")}
  >
    <button
      on:click={goTop}
      class="ml-auto rounded-full bg-slate-900 text-violet-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square grid place-items-center"
    >
      <Icon icon="ri:arrow-up-circle-line" />
    </button>
  </div>
  <div class="max-w-[1400px]">
    <Header
      {y}
      {innerHeight}
    />
    <slot />
    <Footer />
  </div>
</div>

<svelte:window
  bind:scrollY={y}
  bind:innerHeight
  bind:innerWidth
/>
