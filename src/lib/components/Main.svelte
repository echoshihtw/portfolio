<script lang="ts">
  import Step from "./Step.svelte";
  import { projects } from "$lib/projects";
  import { email, githubUrl, linkedInUrl } from "$lib/contactLinks";

  let benefits = [
    {
      metric: "10x",
      name: "Resilience x Versatile Professional Background",
      description:
        "With a career transition, I successfully shifted from a customer-service-oriented background to front-end engineering. My diverse experiences include overseeing the entire software development cycle, managing guest relations in the hospitality industry, and providing research and teaching assistance at a prestigious university.",
    },
    {
      name: "pragmatic and user-centric:",
      description:
        "A unique perspective to front-end development. This background has instilled in me a deep appreciation for user needs and a commitment to delivering solutions that not only meet but exceed expectations. My ability to bridge the gap between technical expertise and user satisfaction has been a driving force in my career journey",
    },
    {
      name: "proactive problem-solving",
      description:
        "Communication is key and it's a paramount value of mine. I believe in transparency and constructive communication above all else. This helps me develop deep relationships and ensures my effectiveness and productivity in any work space with any team.",
    },
    {
      name: "continuous learning and improvement",
      description:
        "I am enthusiastic about leveraging my unique background and skills to contribute meaningfully to dynamic teams and projects. Let's create exceptional digital experiences together!",
    },
  ];
</script>

<main class="flex flex-col flex-1 items-center p-4 max-w-[1400px]">
  <section>
    <div
      class="flex flex-col items-center lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
    >
      <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl h1_font_family">
        <span class="flex gap-0">
          <span class="toggle_font_color_highlight">Echo</span>
          <span class="text-white">,</span>
        </span>
        <br />
        Your
        <span class="toggle_font_color_highlight">Front End</span>
        Developer
      </h2>
      <p class="text-base sm:text-lg md:text-xl">
        <span class="toggle_font_color_highlight">
          who creates clean and impactful, user-friendly digital experiences.
        </span>
      </p>

      <div class="flex flex-col gap-4 items-center justify-center">
        <div
          class="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto"
        >
          <a
            href={linkedInUrl}
            target="_blank"
            class="text-white hover:text-violet-800 hover:dark:text-lime-400 duration-200"
          >
            <i class="fa-brands fa-linkedin" />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            class="text-white hover:text-lime-400 duration-200"
          >
            <i class="fa-brands fa-github" />
          </a>
          <a href={email}><i class="fa-solid fa-envelope" /></a>
        </div>
      </div>
    </div>
  </section>
  <section
    class="py-20 lg:py-32 flex flex-col gap-24"
    id="projects"
  >
    <div class="flex flex-col gap-2 text-start">
      <!--      <h6 class="text-large sm:text-xl md:text-2xl">Something I made</h6>-->
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
        <!--        Curious to <span class="poppins text-lime-400">see</span>-->
        <!--        my work?-->
        #projects
      </h3>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
      {#each projects as project}
        <Step step={project} />
      {/each}
    </div>
  </section>
  <section
    id="about"
    class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative"
  >
    <!--     <div class="z-[-1] bg-violet-950 w-screen left-1/2 -translate-x-1/2 top-0 h-full absolute"> </div> -->
    <!--    <div-->
    <!--      class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-lime-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-lime-700 py-4"-->
    <!--    >-->
    <h3 class=" py-5 font-semibold text-3xl sm:text-4xl md:text-5xl">
      #about-me
    </h3>
    <!--    </div>-->
    <p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl">
      under development
    </p>
    <!--    <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">-->
    <!--      {#each benefits as benefit, index}-->
    <!--        &lt;!&ndash; <div class="flex flex-col gap-2 mx-auto">-->
    <!--            <div class="flex items-end gap-4">-->
    <!--                <p-->
    <!--                    class="poppins text-6xl sm:text-7xl md:text-8xl text-slate-500 font-medium"-->
    <!--                >-->
    <!--                    {benefit.metric}-->
    <!--                </p>-->
    <!--                <p-->
    <!--                    class="text-xl sm:text-2xl md:text-3xl capitalize pb-2"-->
    <!--                >-->
    <!--                    {benefit.name}-->
    <!--                </p>-->
    <!--            </div>-->
    <!--            <p class="text-center italic">- {benefit.description}</p>-->
    <!--        </div> &ndash;&gt;-->
    <!--        <div class="flex gap-6 sm:gap-8">-->
    <!--          <p-->
    <!--            class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold"-->
    <!--          >-->
    <!--            0{index + 1}-->
    <!--          </p>-->
    <!--          <div class="flex flex-col gap-6 sm:gap-8">-->
    <!--            <h3 class="text-2xl sm:text-3xl md:text-5xl">-->
    <!--              {benefit.name}-->
    <!--            </h3>-->
    <!--            <p>{benefit.description}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      {/each}-->
    <!--    </div>-->
  </section>
</main>
