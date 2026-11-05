<script lang="ts">
  /** A line of copy with one phrase in it marked, so the copy stays one
      string in its config. */
  import Mark from "./Mark.svelte";

  export let text: string;
  export let phrase: string;
  export let kind: "highlight" | "circle" | "line" | "wavy" = "highlight";

  $: at = phrase ? text.indexOf(phrase) : -1;
</script>

{#if at < 0}{text}{:else}{text.slice(0, at)}<Mark {kind}>
    {phrase}
  </Mark>{text.slice(at + phrase.length)}{/if}
