<script lang="ts">
  import { email, githubUrl, linkedInUrl } from "$lib/contactLinks";
  import HeroTyping from "$lib/components/HeroTyping.svelte";
  import Projects from "$lib/components/Projects.svelte";
</script>

<section class="flex flex-col flex-1 items-center p-[100px] md:p-[200px]">
  <div
    class="flex flex-col items-center lg:justify-center text-center lg:text-left gap-6 md:gap-8 md:w-[822px]"
  >
    <h2
      class="font-semibold text-3xl md:text-4xl h1_font_family text-left flex gap-6 flex-col"
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
  <h3 class="section_title pb-10">#projects</h3>
  <Projects />
</section>
<section
  id="about"
  class="m-h-[500px]"
>
  <h3 class="section_title">#about-me</h3>
  <div class="p-6 pb-20 w-full">
    <h4
      class="mx-auto font-semibold text-lg sm:text-xl md:text-2xl whitespace-pre-line"
    >
      I am a Front-End Developer based in Taipei, Taiwan. My digital journey
      began three years ago, and since then, I have collaborated with startups,
      agencies, and on freelance projects. I specialize in providing innovative
      solutions in front-end development, helping businesses bring their visions
      to life on the web. \\n 1. i work with international / local teams ,
      fluent in english, chinese and italian \n 2. i value communications and
      alignment of requirements
      <span>And I love working on cool projects!</span>
    </h4>
  </div>
</section>
