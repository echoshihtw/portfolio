<script lang="ts">
  import Projects from "$lib/components/Projects.svelte";
  import Intro from "$lib/components/sections/intro/About.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import EngineeringFocus from "$lib/components/sections/EngineeringFocus.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import Experience from "$lib/components/Experience.svelte";
</script>

<div class="flex flex-col gap-2 md:gap-3 mb-24 w-full">
  <Hero />
  <Intro />
  <EngineeringFocus />
  <Experience />
  <Projects />
  <Skills />
</div>
