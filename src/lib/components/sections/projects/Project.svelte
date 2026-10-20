<script lang="ts">
  import { projectsConfig } from "../../../../content/projects.config";
  import SectionHead from "$lib/components/SectionHead.svelte";
  import ProjectRow from "./ProjectRow.svelte";
  import ClioDemo from "./ClioDemo.svelte";
  // Read from the brand package, never copied, so a new mark arrives with
  // the next upgrade. Imported here, not in the content config, because the
  // résumé build reads that config with plain Node.
  import clioMark from "@echoshihtw/clio-brand/logo/clio-single-ink-master.svg?url";

  // Runway has its own section above, so it is not repeated here.
  const projects = projectsConfig.filter((p) => p.name !== "Financial Runway");
</script>

<section
  id="projects"
  class="section_padding section_layout"
  aria-labelledby="projects-title"
>
  <SectionHead
    number="03"
    title="More projects"
    id="projects-title"
  />
  <div class="rows">
    {#each projects as project}
      {#if project.name === "Clio"}
        <ProjectRow
          {project}
          mark={clioMark}
          brand={{
            paper: "var(--clio-paper)",
            ink: "var(--clio-ink)",
            number: "var(--clio-number)",
            touch: "var(--clio-pink)",
          }}
        >
          <ClioDemo slot="lead" />
        </ProjectRow>
      {:else}
        <ProjectRow {project} />
      {/if}
    {/each}
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }
</style>
