<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import ProjectCard from "./ProjectCard.svelte";
</script>

<div class="grid">
  {#each projectsConfig as project}
    <ProjectCard {project} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
