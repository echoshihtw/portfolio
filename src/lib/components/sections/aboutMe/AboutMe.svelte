<script lang="ts">
  import { aboutMe } from "$lib/components/sections/aboutMe/aboutMe.js";

  function parseText(text) {
    // Split the string at each "**"
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return { text: part.slice(2, -2), highlighted: true };
      } else {
        return { text: part, highlighted: false };
      }
    });
  }

  let parsedText = parseText(aboutMe);
</script>

<section
  id="about"
  class="m-h-[500px] pb-20"
>
  <h3 class="section_title px-20 pb-10 md:p-[48px]">#about-me</h3>
  <div class="px-20 pb-10 md:p-[48px] w-full">
    <h4
      class="leading-relaxed dark:hidden mx-auto font-light text-xl whitespace-pre-line"
    >
      {#each parsedText as segment}
        <span
          class:hover:text-white={segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
          class:hover:decoration-grey={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
    <h4
      class="leading-relaxed hidden dark:block mx-auto font-light text-xl whitespace-pre-line text_gradient"
    >
      {#each parsedText as segment}
        <span
          class:hero_text_white={!segment.highlighted}
          class:text-transparent={segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
          class:hover:decoration-white={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <span>(p.s. I love working on cool projects!)</span>
    </h4>
  </div>
</section>
