<script lang="ts">
  import FloatingNav from "./FloatingNav.svelte";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import { onMount, type ComponentType } from "svelte";
  import { particlesInit } from "@tsparticles/svelte";
  import { loadSlim } from "@tsparticles/slim";

  let scrollPosition: number;
  // Loaded on mount, so it is undefined for the first render.
  let ParticlesComponent: ComponentType | undefined;
  let headerEl: HTMLElement | undefined;
  let isNearPageBottom = false;
  let isHeaderVisible = true;
  const FLOATING_NAV_BOTTOM_OFFSET = 4;
  // The floating pill's job is to stand in for the header nav once it has
  // actually scrolled out of view — driven by observing the header itself
  // rather than a guessed scroll-pixel threshold, so it stays correct
  // regardless of header height.
  $: showFloatingNav = !isHeaderVisible && !isNearPageBottom;

  function handleScroll() {
    const currentY = window.scrollY;
    const doc = document.documentElement;
    isNearPageBottom =
      currentY + window.innerHeight >=
      doc.scrollHeight - FLOATING_NAV_BOTTOM_OFFSET;

    scrollPosition = currentY;
  }
  onMount(async () => {
    const module = await import("@tsparticles/svelte");
    ParticlesComponent = module.default;
  });
  onMount(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeaderVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (headerEl) observer.observe(headerEl);

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
      observer.disconnect();
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

<div class="app-shell antialiased w-full">
  <svelte:component
    this={ParticlesComponent}
    id="tsparticles"
    class="hidden dark:block "
    options={particlesConfig}
  />
  <Header
    {scrollPosition}
    bind:headerEl
  />
  <FloatingNav isVisible={showFloatingNav} />
  <main class="max-w-[1400px] mx-auto">
    <div class="h-auto flex flex-col">
      <slot />
    </div>
  </main>
</div>
<div class="overflow-hidden">
  <Footer />
</div>

<style>
  /* Both values are theme variables, so this follows the light/dark switch
     without any JS. */
  .app-shell {
    background: var(--color-bg);
    color: var(--text-color);
  }
</style>
