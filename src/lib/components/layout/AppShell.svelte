<script lang="ts">
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import { onMount } from "svelte";

  let scrollPosition: number;

  function handleScroll() {
    scrollPosition = window.scrollY;
  }

  onMount(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div class="app-shell antialiased w-full">
  <!-- The header is sticky and condenses into a pill as the page scrolls. -->
  <Header {scrollPosition} />
  <main>
    <slot />
  </main>
</div>
<Footer />

<style>
  .app-shell {
    background: var(--canvas);
    color: var(--ink);
  }
</style>
