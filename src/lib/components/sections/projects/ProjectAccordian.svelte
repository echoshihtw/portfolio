<script>
  import { projects } from "$lib/projects.ts";
  let activePanel = projects[0].name;

  function setActive(panel) {
    activePanel = panel;
  }
</script>

<div class="container">
  {#each projects as project}
    <div
      style={`background-image: url('assets/${project.file}')`}
      class="panel {activePanel === project.name ? 'active' : ''}"
      aria-hidden={activePanel !== project.name}
      on:click={() => setActive(project.name)}
    >
      <div
        class="w-full {activePanel === project.name
          ? ''
          : 'backdrop-grayscale dark:backdrop-grayscale-0'}"
      >
        <div class="title p-5 md:px-8 md:py-14">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            ß
            class="flex flex-col gap-2"
          >
            <h3 class="hover:line-through toggle_hover_font_color">
              {project.name}
            </h3>
            <p class="text-sm">{project.description}</p>
          </a>
        </div>
      </div>
    </div>
  {/each}
</div>

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
    color: white;
    font-size: 24px;
    position: absolute;
    bottom: 0;
    margin: 0;
    opacity: 0;
    background: linear-gradient(to top, #1e293b, transparent);
  }

  .panel.active {
    flex: 4;
  }

  .panel.active .title {
    opacity: 1;
    filter: drop-shadow(0 0 2rem #000);
    min-height: 200px;
    @apply dark:rounded-br-[50px] dark:rounded-bl-[50px] rounded-none;
    transition: opacity 0.3s ease-in 0.4s;
  }

  @media (max-width: 480px) {
    .container {
      width: 100vw;
    }
  }
</style>
