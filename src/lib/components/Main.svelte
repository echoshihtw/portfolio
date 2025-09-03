<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Intro from "$lib/components/sections/intro/About.svelte";
  import Skills from "$lib/components/sections/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import Experience from "$lib/components/sections/experience/Experience.svelte";
</script>

<div class="flex flex-col gap-5 mb-40 w-full">
  <Hero />
  <Intro />
  <Skills />
  <Experience />
  <Project />
</div>
