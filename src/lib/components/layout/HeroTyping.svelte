<script>
  import { onMount } from "svelte";
  import { rawText } from "$lib/components/sections/hero/intro.ts";

  let displayText = "";
  let currentIndex = 0;
  let isHighlighting = false;
  let isTyping = false;

  function typeText() {
    if (currentIndex < rawText.length) {
      isTyping = true;
      const currentChar = rawText[currentIndex];

      if (currentChar === "*") {
        isHighlighting = !isHighlighting;
      } else if (currentChar === "\n") {
        displayText += "<br>";
      } else {
        if (isHighlighting) {
          displayText += `<span class=" font-bold">${currentChar}</span>`;
        } else {
          displayText += `<span class="hero_text_white">${currentChar}</span>`;
        }
      }

      currentIndex++;
      setTimeout(typeText, 40);
      if (currentIndex === rawText.length) {
        isTyping = false;
      }
    }
  }

  onMount(() => {
    typeText();
  });
</script>

<!--dark mode-->
<span class="text-2xl w-full hidden dark:block leading-relaxed">
  {@html displayText
    .replace(/\*([^*]+)\*/g, '<span class="text-transparent">$1</span>')
    .replace(/\n/g, "<br/>")}
  <span class={isTyping && "typing"}></span>
  <br />
</span>

<!--light mode-->
<span class="w-full text-2xl text-gray-900 dark:hidden leading-relaxed">
  {@html displayText
    .replace(/\*([^*]+)\*/g, '<span class="text-transparent">$1</span>')
    .replace(/\n/g, "<br/>")}
  <span class={isTyping && "typing"}></span>
  <br />
</span>

<style>
  .typing {
    height: 5px;
    width: 5px;
    white-space: pre-wrap;
    font-family: monospace;
    @apply border-r-2 border-lime-400;
    animation: blink-caret 0.5s step-end infinite;
    padding-left: 5px;
  }

  @keyframes blink-caret {
    50% {
      border-color: transparent;
    }
  }
</style>
