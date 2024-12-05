<script>
  import HeroTyping from "$lib/components/layout/HeroTyping.svelte";
</script>

<section
  class="flex flex-col flex-1 gap-12 items-center p-[48px] md:py-[120px]"
>
  <h2 class="w-full flex flex-col gap-4 md:flex-row justify-center">
    <b class="text-4xl">Obsessive Compulsive Order</b>
    <span class="text-3xl self-end">/ Your Front End Engineer</span>
  </h2>

  <!--  dark mode-->
  <div
    class="hidden dark:flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-11 w-full bg_gradient text_bg_clip"
  >
    <h2
      class="font-light text-center poppins gap-6 md:gap-11 p-5 sm:p-10 md:p-[48px] min-h-[300px] md:min-h-[180px] grid items-center"
    >
      <HeroTyping />
    </h2>
  </div>

  <!--  light mode-->
  <div
    class="dark:hidden flex flex-col g:justify-center text-center lg:text-left gap-6 md:gap-11 w-full"
  >
    <h2
      class="font-bold text-center poppins md:gap-11 md:p-[48px] min-h-[300px] md:min-h-[80px] drop-shadow-xl"
    >
      <HeroTyping />
    </h2>
  </div>
</section>
