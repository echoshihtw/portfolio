<script>
  import { onMount } from "svelte";
  import { rawText } from "$lib/intro.ts";

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
          displayText += `<span class="toggle_font_color_highlight">${currentChar}</span>`;
        } else {
          displayText += currentChar;
        }
      }

      currentIndex++;
      setTimeout(typeText, 90);
      if (currentIndex === rawText.length) {
        isTyping = false;
      }
    }
  }

  onMount(() => {
    typeText();
  });
</script>

<span class="w-[1000px] min-h-[280px]">
  {@html displayText
    .replace(
      /\*([^*]+)\*/g,
      '<span class="toggle_font_color_highlight">$1</span>'
    )
    .replace(/\n/g, "<br/>")}
  <span class={isTyping && "typing"}></span>
  <br />
</span>

<style>
  .typing {
    height: 5px;
    width: 5px;
    white-space: pre-wrap; /* Preserves whitespace */
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
