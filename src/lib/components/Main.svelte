<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import Experience from "$lib/components/sections/experience/Experience.svelte";
  import AboutMe from "$lib/components/sections/AboutMe.svelte";
  import Highlights from "$lib/components/sections/Highlights.svelte";
</script>

<!-- Order is an argument. This site's job is engineering work, so the
     evidence goes first and the person arrives after it: claim, proof,
     proof, capabilities, who made it, let's talk. -->
<div class="page">
  <Hero />
  <Experience />
  <Project />
  <Skills />
  <Highlights />
  <AboutMe />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
