<script>
  import Projects from "$lib/components/sections/projects/ProjectGrid.svelte";
  import { sweepOnView } from "$lib/actions/sweepOnView";
</script>

<section
  id="projects"
  class="w-full section_padding section_layout"
>
  <h3
    class="section_title"
    use:sweepOnView
  >
    #projects
  </h3>
  <Projects />
</section>
