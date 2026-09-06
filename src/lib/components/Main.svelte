<script lang="ts">
  import Project from "$lib/components/sections/projects/Project.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import Experience from "$lib/components/sections/experience/Experience.svelte";
  import AboutMe from "$lib/components/sections/AboutMe.svelte";
  import AskFor from "$lib/components/sections/AskFor.svelte";
</script>

<div class="flex flex-col mb-24 w-full">
  <!-- Order is an argument. This site's job is engineering work, so the
       evidence goes first and the person arrives after it: claim, proof,
       proof, capabilities, who made it, let's talk. AboutMe sat second for
       a while and pushed the first piece of evidence below two screens. -->
  <Hero />
  <Experience />
  <Project />
  <Skills />
  <AskFor />
  <AboutMe />
</div>
