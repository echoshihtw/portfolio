<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import Experience from "$lib/components/sections/experience/Experience.svelte";
  import AboutMe from "$lib/components/sections/AboutMe.svelte";
  import Highlights from "$lib/components/sections/Highlights.svelte";
</script>

<!-- Order is an argument. The hero makes the claim, the highlights are the
     abstract, and everything after them is the evidence: where I worked,
     what I built, what I work with, who made it, let's talk. Highlights sat
     after the studies for a while and read as a recap of them. -->
<div class="page">
  <Hero />
  <!-- <Highlights /> -->
  <Experience />
  <Project />
  <Skills />
  <AboutMe />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
