<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import Sheet from "./Sheet.svelte";

  /**
   * More detail behind one quiet link. On a wide screen it opens in place,
   * under the link. On a phone it opens in a sheet, so the page stays short
   * (DESIGN.md, "Phones").
   *
   * `label` is the link text; `name` says what it is about, so each link
   * has its own name for a screen reader and the sheet has a title.
   */
  export let label: string;
  export let name: string;

  let open = false;
  let phone = false;

  onMount(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const sync = () => (phone = mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  });
</script>

<button
  type="button"
  class="link-cta reveal"
  aria-expanded={phone ? undefined : open}
  aria-haspopup={phone ? "dialog" : undefined}
  on:click={() => (open = !open)}
>
  {open && !phone ? "Hide" : label}
  <span class="sr-only">: {name}</span>
  <span
    class="cta-arrow"
    aria-hidden="true"
  >
    {phone ? "↑" : open ? "↑" : "↓"}
  </span>
</button>

{#if phone}
  <Sheet
    bind:open
    title={name}
  >
    <slot />
  </Sheet>
{:else if open}
  <div
    class="inline"
    transition:slide|local={{ duration: 220 }}
  >
    <slot />
  </div>
{/if}

<style>
  .reveal {
    align-self: flex-start;
    margin-top: var(--space-1);
  }

  .inline {
    margin-top: var(--space-2);
  }
</style>
