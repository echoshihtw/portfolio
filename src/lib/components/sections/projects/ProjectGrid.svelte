<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import type { Projects } from "$lib/types/types";
  import CaseStudy from "./CaseStudy.svelte";
  import ProjectDialog from "./ProjectDialog.svelte";

  type Project = Projects[number];

  let open: Project | null = null;
</script>

<!-- One column of studies, in the order the config gives them. They are
     stories rather than tiles, so they read down rather than across. -->
<div class="studies">
  {#each projectsConfig as project, i}
    <CaseStudy
      {project}
      index={i}
      onOpen={(p) => (open = p)}
    />
  {/each}
</div>

<ProjectDialog
  project={open}
  onClose={() => (open = null)}
/>

<style>
  .studies {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
