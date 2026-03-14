<script lang="ts">
  import FloatingNav from "./FloatingNav.svelte";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import { onMount } from "svelte";
  import { particlesInit } from "@tsparticles/svelte";
  import { loadSlim } from "@tsparticles/slim";

  let scrollPosition: number;
  let ParticlesComponent: any;
  let previousScrollY = 0;
  let isHeaderVisible = true;
  let showNavBackdrop = false;
  const HIDE_SCROLL_THRESHOLD = 6;

  function handleScroll() {
    const currentY = window.scrollY;
    const deltaY = currentY - previousScrollY;

    scrollPosition = currentY;
    if (currentY <= 12) {
      isHeaderVisible = true;
      showNavBackdrop = false;
    } else if (deltaY < 0) {
      isHeaderVisible = true;
      showNavBackdrop = true;
    } else if (deltaY > HIDE_SCROLL_THRESHOLD) {
      isHeaderVisible = false;
      showNavBackdrop = false;
    }

    previousScrollY = currentY;
  }
  onMount(async () => {
    const module = await import("@tsparticles/svelte");
    ParticlesComponent = module.default;
  });
  onMount(() => {
    previousScrollY = window.scrollY;
    handleScroll();
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
  let particlesConfig = {
    particles: {
      color: {
        value: "#C3EB8D",
      },
      opacity: {
        value: 0.5371430403899501,
        random: true,
      },
      size: {
        value: 0.4,
        random: true,
      },
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      move: {
        enable: true,
        speed: 0.05,
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
  class="antialiased w-full"
  style="background: var(--color-bg); color: var(--text-color);"
>
  <svelte:component
    this={ParticlesComponent}
    id="tsparticles"
    class="hidden dark:block "
    options={particlesConfig}
  />
  <Header
    {scrollPosition}
    isVisible={isHeaderVisible}
    {showNavBackdrop}
  />
  <FloatingNav isVisible={!isHeaderVisible} />
  <main class="max-w-[1400px] mx-auto">
    <div class="h-auto flex flex-col">
      <slot />
    </div>
  </main>
</div>
<div class="overflow-hidden">
  <Footer />
</div>
