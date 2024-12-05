<script lang="ts">
  import { intro, intro2 } from "$lib/components/sections/intro/intro.js";

  function parseText(text: string) {
    // Split the string at each "**" for highlighting
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
  let parsedText2 = parseText(intro2);
</script>

<section
  id="cliche"
  class="m-h-[500px] section_padding section_layout mb-28"
>
  <h3 class="section_title">#A bit cliché and touché :D</h3>
  <div class="w-full">
    <!--    light version-->
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
      <br />
      <br />
      {#each parsedText2 as segment}
        <span
          class:hover:text-white={segment.highlighted}
          class:underline={segment.highlighted}
          class:underline-offset-4={segment.highlighted}
          class:hover:decoration-grey={segment.highlighted}
        >
          {segment.text}
        </span>
      {/each}
      <br />
      <br />
      <span>(p.s. I’m funny 😄 and I love working on cool projects!)</span>
    </h4>
    <!--    dark version-->
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
      <br />
      {#each parsedText2 as segment}
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
      <br />
      <br />
      <span class="hero_text_white">
        (p.s. I’m funny ☻ and I love working on cool projects!)
      </span>
    </h4>
  </div>
</section>
