<script lang="ts">
  import { slide } from "svelte/transition";

  export let item: {
    company: string;
    role: string;
    date: string;
    highlights: string[];
  };
  export let copy:
    | { impact: string; proof: { p: string; s: string }; techLine: string }
    | undefined = undefined;

  let expanded = false;

  // Highlights carry **bold** markers from the résumé source. Splitting on
  // the marker and letting Svelte render each part means no HTML string is
  // ever built, so there is nothing to escape and nothing to inject.
  const boldSegments = (v: string) =>
    v
      .split(/\*\*\s*([^*][\s\S]*?)\s*\*\*/g)
      .map((text, i) => ({ text, bold: i % 2 === 1 }));

  $: cleanRole = item.role.replace(/\*\*/g, "").trim();
</script>

<article class="card entry">
  <header class="head">
    <p class="label">{item.date}</p>
    <h3 class="role">{cleanRole}</h3>
    <p class="company">{item.company}</p>
  </header>

  {#if copy}
    <p class="impact">{copy.impact}</p>
    <p class="proof">
      <span class="p">{copy.proof.p}</span>
      {copy.proof.s}
    </p>
    <p class="tech label">{copy.techLine}</p>
  {/if}

  <button
    class="expander link-cta"
    aria-expanded={expanded}
    on:click={() => (expanded = !expanded)}
  >
    {expanded ? "Hide details" : "Read the details"}
    <span
      class="cta-arrow"
      aria-hidden="true"
    >
      {expanded ? "↑" : "↓"}
    </span>
  </button>

  {#if expanded}
    <ul
      class="details"
      transition:slide|local={{ duration: 220 }}
    >
      {#each item.highlights as h}
        <li>
          {#each boldSegments(h) as seg}{#if seg.bold}<strong>
                {seg.text}
              </strong>{:else}{seg.text}{/if}{/each}
        </li>
      {/each}
    </ul>
  {/if}
</article>

<style>
  /* A .card from app.css: surface, thin border, no shadow. */
  .entry {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-5) var(--space-4);
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .head .label {
    margin: 0;
  }

  .role {
    margin: 0.2rem 0 0;
    font-size: var(--text-xl);
    line-height: var(--leading-snug);
  }

  .company {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .impact {
    margin: var(--space-2) 0 0;
    font-size: var(--text-base);
    line-height: 1.6;
    max-width: 70ch;
  }

  .proof {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
    max-width: 70ch;
  }

  .proof .p {
    color: var(--ink);
    font-weight: 600;
  }

  .tech {
    margin: var(--space-1) 0 0;
    text-transform: none;
    letter-spacing: 0.02em;
  }

  .expander {
    align-self: flex-start;
    margin-top: var(--space-1);
  }

  .details {
    margin: var(--space-2) 0 0;
    padding-left: 1.1rem;
    list-style: disc;
    display: grid;
    gap: 0.35rem;
    max-width: 72ch;
  }

  .details li {
    padding-left: 0.3rem;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--muted);
  }

  .details li :global(strong) {
    font-weight: 600;
    color: var(--ink);
  }

  .details li::marker {
    color: var(--primary);
  }
</style>
