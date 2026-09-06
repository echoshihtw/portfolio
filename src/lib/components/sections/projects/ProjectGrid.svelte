<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import CaseStudy from "./CaseStudy.svelte";
</script>

<!-- One column of studies, in the order the config gives them. They are
     stories rather than tiles, so they read down rather than across, and
     each opens in place. -->
<div class="studies">
  {#each projectsConfig as project, i}
    <CaseStudy
      {project}
      index={i}
    />
  {/each}
</div>

<style>
  .studies {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
