<script lang="ts">
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import { onMount, type ComponentType } from "svelte";
  import { particlesInit } from "@tsparticles/svelte";
  import { loadSlim } from "@tsparticles/slim";

  let scrollPosition: number;
  // Loaded on mount, so it is undefined for the first render.
  let ParticlesComponent: ComponentType | undefined;

  function handleScroll() {
    const currentY = window.scrollY;
    scrollPosition = currentY;
  }
  onMount(async () => {
    const module = await import("@tsparticles/svelte");
    ParticlesComponent = module.default;
  });
  onMount(() => {
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

<div class="app-shell antialiased w-full">
  <svelte:component
    this={ParticlesComponent}
    id="tsparticles"
    class="hidden dark:block "
    options={particlesConfig}
  />
  <!-- The header is sticky and condenses into a pill as the page scrolls.
       There used to be a second FloatingNav component faded in by an
       IntersectionObserver once this one left the viewport; one element
       doing both jobs is what makes the change a transition. -->
  <Header {scrollPosition} />
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
