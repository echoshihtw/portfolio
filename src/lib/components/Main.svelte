<script lang="ts">
  import { email, githubUrl, linkedInUrl } from "$lib/contactLinks";
  import Project from "$lib/components/sections/projects/Project.svelte";
  import AboutMe from "$lib/components/sections/aboutMe/AboutMe.svelte";
  import TechStack from "$lib/components/sections/TechStack.svelte";
  import Hero from "$lib/components/sections/hero/Hero.svelte";
  import { Footer } from "$lib/components/layout";
</script>

<div class="flex flex-col gap-5">
  <Hero />
  <TechStack />
  <Project />
  <AboutMe />
</div>
