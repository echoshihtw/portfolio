<script lang="ts">
  /**
   * The opener every section shares: a large number, a mono label, and the
   * heading, on one grid. The number is the structure of the page made
   * visible; the label is what the section is for; the heading is what it
   * says. An optional note sits under the heading for a line of context.
   *
   * `id` goes on the heading so anchors and aria-labelledby have a target.
   */
  export let number: string;
  export let label: string;
  export let title: string;
  export let id: string | undefined = undefined;
  export let note: string | undefined = undefined;
</script>

<header class="section-head">
  <span
    class="section-num"
    aria-hidden="true"
  >
    {number}
  </span>
  <div class="text">
    <p class="label">{label}</p>
    <h2 {id}>{title}</h2>
    {#if note}
      <p class="note">{note}</p>
    {/if}
  </div>
</header>

<style>
  .section-head {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: var(--space-3) var(--space-5);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .label {
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: var(--text-2xl);
    line-height: var(--leading-tight);
    max-width: 20ch;
  }

  .note {
    margin: 0.1rem 0 0;
    max-width: 56ch;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
  }

  /* On a wide screen the number takes the left column of the page grid and
     the text starts where the section's content will, so the numbers line
     up down the page like a table of contents in the margin. */
  @media (min-width: 900px) {
    .section-head {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }
  }
</style>
