<script>
  import HeroTyping from "$lib/components/layout/HeroTyping.svelte";
</script>

<section
  class="flex flex-col flex-1 gap-12 items-center p-[48px] md:py-[150px]"
>
  <h2 class="w-full flex flex-col gap-4 md:flex-row justify-center">
    <b class="text-6xl">Echo Shih</b>
    <span class="text-3xl self-end">/ Front End Engineer</span>
  </h2>

  <!--  dark mode-->
  <div
    class="hidden dark:flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-11 w-full bg_gradient text_bg_clip"
  >
    <h2
      class="font-light text-center h1_font_family gap-6 md:gap-11 p-5 sm:p-10 md:p-[48px] min-h-[300px] md:min-h-[180px] grid items-center"
    >
      <HeroTyping />
    </h2>
  </div>

  <!--  light mode-->
  <div
    class="dark:hidden flex flex-col g:justify-center text-center lg:text-left gap-6 md:gap-11 w-full"
  >
    <h2
      class="font-bold text-center h1_font_family flex flex-col gap-6 md:gap-11 px-20 pb-10 md:p-[48px] min-h-[300px] md:min-h-[80px] drop-shadow-xl"
    >
      <HeroTyping />
    </h2>
  </div>
</section>
