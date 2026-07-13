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

  const escapeHtml = (v: string) =>
    v
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const renderInlineBold = (v: string) =>
    escapeHtml(v).replace(
      /\*\*\s*([^*][\s\S]*?)\s*\*\*/g,
      "<strong>$1</strong>"
    );

  $: cleanRole = item.role.replace(/\*\*/g, "").trim();
</script>

<article class="card">
  <p class="meta">{item.date}</p>
  <h4 class="role">{cleanRole}</h4>
  <p class="company">{item.company}</p>

  {#if copy}
    <p class="impact">{copy.impact}</p>
    <p class="proof"><span class="p">{copy.proof.p}</span> {copy.proof.s}</p>
    <p class="tech mono">{copy.techLine}</p>
  {/if}

  <button
    class="expander mono"
    aria-expanded={expanded}
    on:click={() => (expanded = !expanded)}
  >
    {expanded ? "Hide details ↑" : "Read the details ↓"}
  </button>

  {#if expanded}
    <ul class="details" transition:slide|local={{ duration: 220 }}>
      {#each item.highlights as h}
        <li>{@html renderInlineBold(h)}</li>
      {/each}
    </ul>
  {/if}
</article>

<style>
  .card {
    background: var(--surface-bg);
    border: 1px solid var(--section-border);
    border-radius: 4px;
    padding: 1.3rem 1.5rem;
  }

  .meta {
    margin: 0;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .role {
    margin: 0.5rem 0 0;
    font-family: "DM Serif Display", serif;
    font-weight: 400;
    font-size: 1.35rem;
    line-height: 1.15;
    color: var(--text-color);
  }

  .company {
    margin: 0.2rem 0 0;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .impact {
    margin: 0.95rem 0 0;
    font-size: 0.97rem;
    line-height: 1.6;
    color: var(--text-color);
  }

  .proof {
    margin: 0.6rem 0 0;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-muted);
  }

  .proof .p {
    color: var(--text-color);
    font-weight: 600;
  }

  .tech {
    margin: 0.9rem 0 0;
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    color: var(--text-muted);
    opacity: 0.85;
  }

  .expander {
    margin-top: 1rem;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.74rem;
    letter-spacing: 0.03em;
    color: var(--color-accent);
    border-bottom: 1px solid transparent;
    transition: border-color 160ms ease;
  }

  .expander:hover {
    border-color: var(--color-accent);
  }

  .expander:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .details {
    margin: 0.9rem 0 0;
    padding-left: 1.1rem;
    list-style: disc;
    color: var(--text-color);
    line-height: 1.58;
    display: grid;
    gap: 0.35rem;
  }

  .details li {
    padding-left: 0.3rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .details li :global(strong) {
    font-weight: 600;
    color: var(--text-color);
  }
</style>
