<script lang="ts">
  import { githubUrl, linkedInUrl } from "$lib/contactLinks.ts";
  import Icon from "@iconify/svelte";
  import FooterLinksBar from "$lib/components/FooterLinksBar.svelte";
</script>

<footer
  id="footer"
  class="py-10 bg-black border border-solid border-lime-950"
>
  <div
    class="slide-track"
    id="slide-track"
  >
    <div class="flex gap-6 sm:gap-8 justify-center items-center relative">
      <FooterLinksBar />
      <FooterLinksBar />
      <FooterLinksBar />
      <FooterLinksBar />
      <FooterLinksBar />
      <FooterLinksBar />
      <FooterLinksBar />
    </div>
  </div>
</footer>

<style>
  .slide-track {
    display: flex;
    gap: 40px;
    white-space: nowrap;
    animation: scroll 15s linear infinite;
  }
  .slide-track:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
