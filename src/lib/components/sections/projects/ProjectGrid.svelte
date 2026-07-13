<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import ProjectCard from "./ProjectCard.svelte";
</script>

<div class="stack">
  {#each projectsConfig as project}
    <ProjectCard {project} />
  {/each}
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    width: 100%;
  }
</style>
