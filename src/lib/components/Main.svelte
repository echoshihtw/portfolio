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
    class="text-xl flex flex-col items-start lg:justify-center text-center lg:text-left gap-6 md:gap-11 w-full md:w-[822px] bg_gradient text_bg_clip"
  >
    <div>
      <span class="hero_text_white">Hi, I'm</span>
      <span class="text-4xl">Echo Shih</span>
      ,
    </div>
    <h2
      class="font-light text-3xl h1_font_family text-left flex gap-6 md:gap-11 flex-col w-full md:w-max-[1000px] min-h-[150px] md:min-h-[100px]"
    >
      <HeroTyping />
    </h2>
    <span class="text-start">
      <span class="hero_text_white">
        I'm a Software Engineer with over 3 years of experience, who's
        passionate about building cool projects and solving problems.
        Experienced in
      </span>
      React.js
      <span class="hero_text_white">,</span>
      TypeScript
      <span class="hero_text_white">,</span>
      JavaScript
      <span class="hero_text_white">,</span>
      Node.js
      <span class="hero_text_white">,</span>
      Express.js
      <span class="hero_text_white">
        and <a href="#tech-stack">#learn more</a>
      </span>
    </span>
  </div>
</section>
<div class="flex flex-col gap-5">
  <section
    id="tech-stack"
    class="m-h-[500px]"
  >
    <h3 class="section_title px-20 pb-10 md:p-[48px]">#tech-stack</h3>
    <div class="px-8 md:px-6 pb-20 w-full">
      Language: TypeScript, JavaScript, CSS, SCSS, Python, PHP...
      <br />
      Framework: React.js, Next.js, Svelte, Express.js, LangChain...
      <br />
      Library: Redux,Socket.io, TailwindCSS, Material-UI...
    </div>
  </section>
  <section
    id="projects"
    class=""
  >
    <h3 class="section_title px-20 pb-10 md:p-[48px]">#projects</h3>
    <Projects />
  </section>
  <section
    id="about"
    class="m-h-[500px]"
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
</div>
