<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Intro from "$lib/components/sections/aboutMe/Intro.svelte";
  import Skills from "$lib/components/sections/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
</script>

<div class="flex flex-col gap-5 mb-40">
  <Hero />
  <!--  <Intro />-->
  <Skills />
  <Project />
</div>
