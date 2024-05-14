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
    class="flex flex-col items-center lg:justify-center text-center lg:text-left gap-6 md:gap-11 w-full md:w-[822px]"
  >
    <h2
      class="font-semibold text-3xl h1_font_family text-left flex gap-6 md:gap-11 flex-col w-full px-5 md:w-max-[1000px] min-h-[640px] md:min-h-[345px]"
    >
      <HeroTyping />
    </h2>

    <div class="flex flex-col gap-4 items-center justify-center">
      <div
        class="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto text_gradient_light dark:hidden"
      >
        <a
          href={linkedInUrl}
          target="_blank"
          class="text_bg_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
        >
          <i class="fa-brands fa-linkedin" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          class="text_bg_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
        >
          <i class="fa-brands fa-github" />
        </a>
        <a
          href={email}
          class="text_bg_white hover:bg-transparent hover:dark:text-lime-400"
        >
          <i class="fa-solid fa-envelope" />
        </a>
      </div>
      <div
        class="items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto text_gradient hidden dark:flex"
      >
        <a
          href={linkedInUrl}
          target="_blank"
          class="text_bg_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
        >
          <i class="fa-brands fa-linkedin" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          class="text_bg_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
        >
          <i class="fa-brands fa-github" />
        </a>
        <a
          href={email}
          class="text_bg_white hover:bg-transparent hover:dark:text-lime-400"
        >
          <i class="fa-solid fa-envelope" />
        </a>
      </div>
    </div>
  </div>
</section>
<section
  id="projects"
  class="pt-[100px]"
>
  <h3 class="section_title px-20 pb-10 md:p-[48px]">#projects</h3>
  <Projects />
</section>
<section
  id="about"
  class="m-h-[500px] py-[100px]"
>
  <h3 class="section_title px-20 pb-10 md:p-[48px]">#about-me</h3>
  <div class="px-8 md:px-6 pb-20 w-full">
    <h4
      class="leading-relaxed dark:hidden mx-auto font-semibold text-xl whitespace-pre-line text_gradient_light"
    >
      {#each parsedText as segment}
        <span
          class:text-transparent={segment.highlighted}
          class:text_bg_white={!segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
    <h4
      class="leading-relaxed hidden dark:block mx-auto font-semibold text-xl whitespace-pre-line text_gradient"
    >
      {#each parsedText as segment}
        <span
          class:text-transparent={segment.highlighted}
          class:text_bg_white={!segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
  </div>
</section>
