<script>
  import Projects from "$lib/components/sections/projects/ProjectGrid.svelte";
  import SectionHead from "$lib/components/SectionHead.svelte";
</script>

<section
  id="projects"
  class="section_padding section_layout section_rule"
  aria-labelledby="projects-title"
>
  <SectionHead
    number="03"
    label="Case studies"
    title="What I've built"
    id="projects-title"
    note="Each one the same way: the constraint, the decisions, what happened. Open a study for the rest of the decisions and the screenshots."
  />
  <Projects />
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }
</style>
