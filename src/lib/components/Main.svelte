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

<section
  class="font-light flex flex-col flex-1 items-center p-[48px] md:p-[200px]"
>
  <div
    class="text-xl flex flex-col items-start lg:justify-center text-center lg:text-left gap-6 md:gap-11 w-full md:w-[822px] text_bg_clip bg_gradient"
  >
    <div>
      <span class="hero_text_white">Hi, my name is</span>
      <span class="text-4xl">Echo Shih</span>
      ,
    </div>
    <!--    <h2-->
    <!--      class="font-light text-3xl h1_font_family text-left flex gap-6 md:gap-11 flex-col w-full md:w-max-[1000px] min-h-[150px] md:min-h-[100px]"-->
    <!--    >-->
    <!--      <HeroTyping />-->
    <!--    </h2>-->
    <span class="text-start">
      <span class="hero_text_white">
        I'm a Software Engineer with over 3 years of experience, who's
        passionate about building cool projects and solving problems.
        Specialised in
      </span>
      React
      <span class="hero_text_white">,</span>
      Typescript
      <span class="hero_text_white">
        and front end technologies such as Tailwind
      </span>
    </span>

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
        <button
          class="px-5 py-2 rounded-none dark:rounded-full flex align-baseline group/text bg_gradient"
        >
          <a
            href="#footer"
            class="hero_text_white z-9 text-2xl duration-200 group-hover/text:drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] md:"
          >
            Contact Me
          </a>
        </button>
        <a
          href={linkedInUrl}
          target="_blank"
          class="hero_text_white hover:bg-transparent"
        >
          <i class="fa-brands fa-linkedin" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          class="hero_text_white hover:bg-transparent"
        >
          <i class="fa-brands fa-github" />
        </a>
        <a
          href={email}
          class="hero_text_white hover:bg-transparent hover:dark:text-lime-400"
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
      class="leading-relaxed dark:hidden mx-auto font-light text-xl whitespace-pre-line"
    >
      {#each parsedText as segment}
        <span
          class:hover:text-white={segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
          class:hover:decoration-grey={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
    <h4
      class="leading-relaxed hidden dark:block mx-auto font-light text-xl whitespace-pre-line text_gradient"
    >
      {#each parsedText as segment}
        <span
          class:hero_text_white={!segment.highlighted}
          class:text-transparent={segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
          class:hover:decoration-white={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
  </div>
</section>

<style>
</style>
