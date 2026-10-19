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
    title="More projects"
    id="projects-title"
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
