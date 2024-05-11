<script lang="ts">
  import { email, githubUrl, linkedInUrl } from "$lib/contactLinks";
  import HeroTyping from "$lib/components/HeroTyping.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import { aboutMe } from "$lib/aboutMe";

  function parseText(text) {
    // Split the string at each "**"
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return { text: part.slice(2, -2), highlighted: true };
      } else {
        return { text: part, highlighted: false };
      }
    });
  }

  let parsedText = parseText(aboutMe);
</script>

<section class="flex flex-col flex-1 items-center p-[48px] md:p-[200px]">
  <div
    class="flex flex-col items-center lg:justify-center text-center lg:text-left gap-6 md:gap-8 w-full md:w-[822px]"
  >
    <h2
      class="font-semibold text-3xl h1_font_family text-left flex gap-6 flex-col w-full md:w-[1000px] min-h-[500px] md:min-h-[280px]"
    >
      <HeroTyping />
    </h2>

    <div class="flex flex-col gap-4 items-center justify-center">
      <div
        class="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto"
      >
        <a
          href={linkedInUrl}
          target="_blank"
          class="text-white hover:text-gray-800 hover:dark:text-lime-400 duration-200"
        >
          <i class="fa-brands fa-linkedin" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          class="text-white hover:text-gray-800 hover:dark:text-lime-400 duration-200"
        >
          <i class="fa-brands fa-github" />
        </a>
        <a
          href={email}
          class=" text-white hover:text-gray-800 hover:dark:text-lime-400"
        >
          <i class="fa-solid fa-envelope" />
        </a>
      </div>
    </div>
  </div>
</section>
<section id="projects">
  <h3 class="section_title pb-10 p-[48px]">#projects</h3>
  <Projects />
</section>
<section
  id="about"
  class="m-h-[500px]"
>
  <h3 class="section_title pb-10 p-[48px]">#about-me</h3>
  <div class="px-8 md:px-6 pb-20 w-full">
    <h4 class="mx-auto font-semibold text-xl whitespace-pre-line">
      {#each parsedText as segment}
        <span
          class:toggle_font_color_highlight={segment.highlighted}
          class:text-white={!segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
  </div>
</section>
