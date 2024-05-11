<script lang="ts">
  import { Footer, Header } from "./index.ts";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { particlesInit } from "@tsparticles/svelte";
  import { loadSlim } from "@tsparticles/slim";

  let scrollPosition: number;
  let ParticlesComponent;

  function handleScroll() {
    scrollPosition = window.scrollY; // Get the current vertical scroll position
  }
  onMount(async () => {
    const module = await import("@tsparticles/svelte");
    ParticlesComponent = module.default;
  });
  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    void particlesInit(async (engine) => {
      // call this once per app
      // you can use main to customize the tsParticles instance adding presets or custom shapes
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadFull(main);
      await loadSlim(engine);
    });
    return () => {
      // Cleanup listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  });
  function goTop() {
    document.body.scrollIntoView();
  }

  let particlesConfig = {
    particles: {
      color: {
        value: "#C3EB8D",
      },
      opacity: {
        value: 0.5371430403899501,
        random: true,
        anim: {
          enable: true,
          speed: 100,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          // not changing anything
          speed: 0.001,
          size_min: 0.3,
          sync: false,
        },
      },
      number: {
        value: 160,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 600,
        },
      },

      detectRetina: true,
    },
  };
</script>

<div
  class="antialiased dark:bg-slate-900 bg-gray-300 text-gray-900 dark:text-white"
>
  <svelte:component
    this={ParticlesComponent}
    id="tsparticles"
    class="hidden dark:block "
    options={particlesConfig}
  />
  <div
    class={"fixed bottom-0 right-0 duration-200 flex p-10" +
      (scrollPosition > 50
        ? " opacity-full pointer-events-auto"
        : " opacity-0 pointer-events-none")}
  >
    <button
      on:click={goTop}
      class="dark:grid hidden ml-auto dark:rounded-full rounded-none backdrop-blur-md bg-white/20 dark:bg-slate-900 text-lime-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer aspect-square place-items-center relative z-[1]"
    >
      <Icon icon="ri:arrow-up-circle-line" />
    </button>
    <button
      on:click={goTop}
      class="dark:hidden grid w-0 h-0 border-l-[40px] border-l-transparent border-b-[60px] border-b-white/20 border-r-[40px] border-r-transparent z-[1] relative cursor-pointer align-baseline hover:drop-shadow-2xl"
    ></button>
  </div>

  <Header {scrollPosition} />
  <main class="max-w-[1400px] mx-auto">
    <div class="h-auto flex flex-col">
      <slot />
    </div>
  </main>
  <Footer />
</div>
