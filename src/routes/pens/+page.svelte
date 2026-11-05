<script lang="ts">
  // The reference for her pens: every mark and doodle in pens.ts, on the
  // same phrase. Linked from nowhere and kept out of search.
  import { Doodle, Mark, doodles, favourites, inks, pens } from "$lib/pens";
  import type { DoodleName, InkName, PenName } from "$lib/pens";

  const names = Object.keys(pens) as PenName[];
  const icons = Object.keys(doodles) as DoodleName[];
  const inkNames = Object.keys(inks) as InkName[];

  // Every sample in one ink, or each in its own when none is chosen.
  let ink: InkName | undefined;

  // Changing the key draws every mark again.
  let round = 0;
</script>

<svelte:head>
  <title>Pens</title>
  <meta
    name="robots"
    content="noindex"
  />
</svelte:head>

<main class="pens section_padding">
  <header>
    <h1>Pens</h1>
    <p>
      Every hand-drawn mark and doodle on the site, from
      <code>src/lib/pens/pens.ts</code>
      . A star marks a favourite.
    </p>
    <div class="tools">
      <button
        class="btn btn-line"
        type="button"
        on:click={() => round++}
      >
        Draw them again
      </button>
      <div
        class="inks"
        role="group"
        aria-label="Ink"
      >
        <button
          type="button"
          aria-pressed={ink === undefined}
          on:click={() => ((ink = undefined), round++)}
        >
          own
        </button>
        {#each inkNames as name}
          <button
            type="button"
            aria-pressed={ink === name}
            on:click={() => ((ink = name), round++)}
          >
            <span
              class="swatch"
              style="background: {inks[name]}"
            ></span>
            {name}
          </button>
        {/each}
      </div>
    </div>
  </header>

  {#key round}
    <ol class="grid">
      {#each names as name, i}
        <li>
          <p class="label">
            {String(i + 1).padStart(2, "0")} · {name}{favourites.includes(name)
              ? " · ★ favourite"
              : ""}
          </p>
          <h2>{pens[name].label}</h2>
          <p class="note">{pens[name].note}</p>
          <p class="sample">
            A deployment went from a full day to <Mark
              kind={name}
              {ink}
            >
              five minutes
            </Mark>.
          </p>
        </li>
      {/each}
    </ol>

    <h2 class="doodles-title">Doodles</h2>
    <ul class="doodles">
      {#each icons as icon}
        <li>
          <Doodle
            {icon}
            {ink}
          />
          <span class="label">{icon}</span>
        </li>
      {/each}
    </ul>
  {/key}
</main>

<style>
  .pens {
    max-width: var(--content-max);
    margin: 0 auto;
  }

  header {
    display: grid;
    gap: var(--space-3);
    justify-items: start;
    margin-bottom: var(--space-6);
  }

  h1 {
    margin: 0;
    font-size: var(--text-2xl);
  }

  header p {
    margin: 0;
    color: var(--muted);
  }

  .tools {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: center;
  }

  .inks {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .inks button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 44px;
    padding: 0 var(--space-3);
    border: 1px solid var(--border);
    border-radius: 999px;
    background: none;
    color: var(--ink);
    font: inherit;
    font-size: var(--text-sm);
    cursor: pointer;
  }

  .inks button[aria-pressed="true"] {
    border-color: var(--ink);
  }

  .swatch {
    width: 0.9em;
    height: 0.9em;
    border-radius: 50%;
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: var(--space-6) var(--space-6);
  }

  .grid li {
    padding-top: var(--space-3);
    border-top: 1px solid var(--border);
  }

  .grid h2 {
    margin: var(--space-1) 0 0;
    font-size: var(--text-lg);
  }

  .note {
    margin: 0 0 var(--space-4);
    color: var(--muted);
  }

  .sample {
    margin: 0;
    font-size: var(--text-xl);
    line-height: 1.6;
  }

  .doodles-title {
    margin: var(--space-7) 0 var(--space-4);
    font-size: var(--text-lg);
  }

  .doodles {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-6);
    font-size: var(--text-xl);
  }
</style>
