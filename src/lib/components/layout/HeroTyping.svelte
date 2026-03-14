<script>
  import { onMount } from "svelte";
  import { rawText } from "$lib/components/sections/hero/intro";

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
<span
  class="text-2xl w-full hidden dark:block leading-relaxed text-[var(--text-muted)]"
>
  {@html displayText
    .replace(/\*([^*]+)\*/g, '<span class="text-transparent">$1</span>')
    .replace(/\n/g, "<br/>")}
  <span class={isTyping ? "typing" : undefined}></span>
  <br />
</span>

<!--light mode-->
<span
  class="w-full text-2xl dark:hidden leading-relaxed text-[var(--text-muted)]"
>
  {@html displayText
    .replace(/\*([^*]+)\*/g, '<span class="text-transparent">$1</span>')
    .replace(/\n/g, "<br/>")}
  <span class={isTyping ? "typing" : undefined}></span>
  <br />
</span>

<style>
  .typing {
    height: 5px;
    width: 5px;
    white-space: pre-wrap;
    font-family: monospace;
    border-right: 2px solid var(--color-accent);
    animation: blink-caret 0.5s step-end infinite;
    padding-left: 5px;
  }

  @keyframes blink-caret {
    50% {
      border-color: transparent;
    }
  }
</style>
