<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import Experience from "$lib/components/sections/experience/Experience.svelte";
</script>

<div class="flex flex-col gap-2 md:gap-3 mb-24 w-full">
  <Hero />
  <Experience />
  <Project />
  <Skills />
</div>
