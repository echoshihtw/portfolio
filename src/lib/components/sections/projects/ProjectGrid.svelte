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
  /* Two columns, with the featured project spanning both. The projects are
     not equals — one has users — and equal cards would spend a third of a
     visitor's attention on an archived research tool. */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.9rem;
    width: 100%;
  }

  .grid :global(.card.featured) {
    grid-column: 1 / -1;
  }

  @media (max-width: 639px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
