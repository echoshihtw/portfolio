<script>
  import Projects from "$lib/components/sections/projects/ProjectGrid.svelte";
  import { sweepOnView } from "$lib/actions/sweepOnView";
</script>

<section
  id="projects"
  class="w-full section_padding section_layout"
>
  <h2
    class="section_title"
    use:sweepOnView
  >
    #projects
  </h2>
  <Projects />
</section>
