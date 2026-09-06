<script>
  import Projects from "$lib/components/sections/projects/ProjectGrid.svelte";
  import { sweepOnView } from "$lib/actions/sweepOnView";
</script>

<section
  id="projects"
  class="w-full section_padding section_layout section_band"
>
  <h2
    class="section_title"
    style="--label-tint: color-mix(in srgb, #b9cfe6 24%, var(--color-bg))"
    use:sweepOnView
  >
    What I've built
  </h2>
  <Projects />
</section>
