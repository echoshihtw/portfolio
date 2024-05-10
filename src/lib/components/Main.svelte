<script lang="ts">
  import { projects } from "$lib/projects";
  import { email, githubUrl, linkedInUrl } from "$lib/contactLinks";
  import HeroTyping from "$lib/components/HeroTyping.svelte";

  let activePanel = projects[0].name;

  function setActive(panel) {
    activePanel = panel;
  }
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
  <div class="container">
    {#each projects as project}
      <div
        style={`background-image: url('assets/${project.file}')`}
        class="panel {activePanel === project.name ? 'active' : ''}"
        aria-hidden={activePanel !== project.name}
        on:click={() => setActive(project.name)}
      >
        <div
          class="w-full h-full {activePanel === project.name
            ? ''
            : 'backdrop-grayscale dark:backdrop-grayscale-0'}"
        >
          <div class="title flex flex-col gap-2">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <h3 class="hover:line-through toggle_hover_font_color">
                {project.name}
              </h3>
            </a>
            <p class="text-sm">{project.description}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
<section
  id="about"
  class="m-h-[500px]"
>
  <!--     <div class="z-[-1] bg-violet-950 w-screen left-1/2 -translate-x-1/2 top-0 h-full absolute"> </div> -->
  <!--    <div-->
  <!--      class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-lime-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-lime-700 py-4"-->
  <!--    >-->
  <h3 class="section_title">#about-me</h3>

  <!--    </div>-->
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

<style lang="postcss">
  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .panel {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    @apply dark:rounded-[50px] rounded-none;
    height: 66vh;
    cursor: pointer;
    color: #fff;
    margin: 0 10px;
    flex: 0.5;
    position: relative;
    transition: flex 0.7s ease-in;
    overflow: hidden;
  }

  .panel .title {
    width: 100%;
    height: fit-content;
    color: white;
    font-size: 24px;
    position: absolute;
    bottom: 0;
    margin: 0;
    opacity: 0;
    background: linear-gradient(to top, #1e293b, transparent);
    padding: 20px;
  }

  .panel.active {
    flex: 4;
  }

  .panel.active .title {
    opacity: 1;
    filter: drop-shadow(0 0 2rem #000);
    transition: opacity 0.3s ease-in 0.4s;
  }

  @media (max-width: 480px) {
    .container {
      width: 100vw;
    }

    .panel:nth-of-type(4),
    .panel:nth-of-type(5) {
      display: none;
    }
  }
</style>
