<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import type { Projects } from "$lib/types/types";
  import ProjectCard from "./ProjectCard.svelte";
  import ProjectDialog from "./ProjectDialog.svelte";

  type Project = Projects[number];

  let open: Project | null = null;
</script>

<div class="grid">
  {#each projectsConfig as project}
    <ProjectCard
      {project}
      onOpen={(p) => (open = p)}
    />
  {/each}
</div>

<ProjectDialog
  project={open}
  onClose={() => (open = null)}
/>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 0.9rem;
    width: 100%;
  }
</style>
