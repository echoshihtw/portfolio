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
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "transparent",
        },
      },
      polygon: {
        nb_sides: 8,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: false,
          speed: 3,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 4,
          size_min: 0.3,
          sync: false,
        },
      },
      links: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 1.603412060865523,
        random: true,
        straight: false,
        out_mode: "out",
      },
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
    },
  };
  let onParticlesLoaded = (event) => {
    const particlesContainer = event.detail.particles;

    // you can use particlesContainer to call all the Container class
    // (from the core library) methods like play, pause, refresh, start, stop
  };

  void particlesInit(async (engine) => {
    // call this once per app
    // you can use main to customize the tsParticles instance adding presets or custom shapes
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(main);
    await loadSlim(engine);
  });
</script>

<div
  class="antialiased dark:bg-slate-900 bg-gray-300 text-gray-900 dark:text-white"
>
  <svelte:component
    this={ParticlesComponent}
    id="tsparticles"
    class="hidden dark:block "
    options={particlesConfig}
    on:particlesLoaded={onParticlesLoaded}
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
    >
      <!--      <Icon icon="ri:arrow-up-circle-line" />-->
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
