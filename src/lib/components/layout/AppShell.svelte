<script lang="ts">
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
</script>

<div class="app-shell antialiased w-full">
  <Header />
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
