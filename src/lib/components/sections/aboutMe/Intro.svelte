<script lang="ts">
  import { intro } from "$lib/components/sections/aboutMe/intro.js";

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

  let parsedText = parseText(intro);
</script>

<section
  id="about"
  class="m-h-[500px] section_padding section_layout mb-28"
>
  <h3 class="section_title">#hello</h3>
  <div class="w-full">
    <h4
      class="select-text leading-relaxed dark:hidden mx-auto font-light text-xl whitespace-pre-line"
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
