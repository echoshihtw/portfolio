<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import CaseStudy from "./CaseStudy.svelte";
</script>

<!-- One column of studies, in the order the config gives them. They are
     stories rather than tiles, so they read down rather than across, and
     each opens in place. Runway has its own section above, so it is not
     repeated here. -->
<div class="studies">
  {#each projectsConfig.filter((p) => p.name !== "Financial Runway") as project, i}
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
