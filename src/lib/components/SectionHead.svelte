<script lang="ts">
  /**
   * The row every section opens with: a hairline, the section's number, and
   * its title in small mono. Quiet on purpose, so the work leads and the
   * heading only says where you are. The `end` slot holds an optional
   * link or note on the right.
   *
   * `id` goes on the heading so anchors and aria-labelledby have a target.
   */
  export let number: string;
  export let title: string;
  export let id: string | undefined = undefined;
</script>

<header class="section-head">
  <span
    class="label num"
    aria-hidden="true"
  >
    {number}
  </span>
  <h2
    {id}
    class="label title"
  >
    {title}
  </h2>
  <span class="label end"><slot name="end" /></span>
</header>

<style>
  /* Sections are bands: the row sits as far from the top as the content
     ends from the bottom. */
  .section-head {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: baseline;
    gap: var(--space-2) var(--space-5);
    margin-bottom: var(--space-4);
  }

  .num {
    font-variant-numeric: tabular-nums;
  }

  .title {
    margin: 0;
    color: var(--ink);
    white-space: nowrap;
  }

  /* On a phone the right-hand link takes its own line under the title. */
  .end {
    grid-column: 1 / -1;
  }

  .end:empty {
    display: none;
  }

  @media (min-width: 900px) {
    .section-head {
      grid-template-columns: 7rem minmax(0, 1fr) auto;
      gap: var(--space-6);
    }

    .end {
      grid-column: auto;
      text-align: right;
    }
  }
</style>
