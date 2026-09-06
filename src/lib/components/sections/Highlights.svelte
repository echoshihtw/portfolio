<script lang="ts">
  import { highlightsConfig } from "../../../content/highlights.config";
  import SectionHead from "$lib/components/SectionHead.svelte";

  // One marker colour per card, so the six read as six things told apart,
  // without any card being a block of colour.
  const markers = [
    "var(--primary)",
    "var(--accent)",
    "var(--sage)",
    "var(--highlight)",
    "var(--ink)",
    "var(--muted)",
  ];
</script>

<section
  id="highlights"
  class="section_padding section_layout section_rule"
  aria-labelledby="highlights-title"
>
  <SectionHead
    number="04"
    label="Highlights"
    title="Six things worth knowing"
    id="highlights-title"
    note="Each one pulled from the work above, with its proof. Every line is checkable against the rest of this page."
  />

  <div class="body">
    <ol class="cards">
      {#each highlightsConfig as item, i}
        <li class="card item">
          <div class="item-head">
            <span
              class="marker"
              style="--marker: {markers[i % markers.length]}"
              aria-hidden="true"
            />
            <span class="label">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 class="title">{item.title}</h3>
          <p class="proof">{item.proof}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5);
  }

  .item-head {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .title {
    margin: 0;
    font-size: var(--text-lg);
    line-height: 1.25;
  }

  .proof {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
  }

  @media (min-width: 900px) {
    .body {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }
    .body > * {
      grid-column: 2;
    }
  }
</style>
