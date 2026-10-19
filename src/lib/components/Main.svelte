<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import SelectedWork from "$lib/components/sections/selected-work/SelectedWork.svelte";
  import Experience from "$lib/components/sections/experience/Experience.svelte";
  import AboutMe from "$lib/components/sections/AboutMe.svelte";
  import Contact from "$lib/components/sections/Contact.svelte";
</script>

<!-- Order is an argument. The hero makes the claim, Runway shows one
     product end to end, and everything after it is the evidence: where I
     worked, what else I built, what I work with, who made it, let's talk. -->
<div class="page">
  <Hero />
  <SelectedWork />
  <Experience />
  <Project />
  <Skills />
  <AboutMe />
  <Contact />
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
