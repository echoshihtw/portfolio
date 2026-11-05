<script lang="ts">
  /** A line of copy with one phrase in it marked, so the copy stays one
      string in its config. */
  import Mark from "./Mark.svelte";
  import { pens, type PenName } from "./pens";

  export let text: string;
  export let phrase: string;
  export let kind: PenName = "highlight";

  $: at = phrase ? text.indexOf(phrase) : -1;
  // A pen that can run along wrapping text does so for more than one word;
  // any other pen draws round the whole phrase.
  $: flow = Boolean(pens[kind].flows) && phrase.includes(" ");
</script>

<!-- prettier-ignore -->
{#if at < 0}{text}{:else}{text.slice(0, at)}<Mark {kind} {flow}>{phrase}</Mark>{text.slice(at + phrase.length)}{/if}
