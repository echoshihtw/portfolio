<script lang="ts">
  import { slide } from "svelte/transition";

  export let item: {
    company: string;
    role: string;
    date: string;
    highlights: string[];
  };
  export let copy:
    { story: string; note?: string; techLine: string } | undefined = undefined;

  let expanded = false;

  // Highlights carry **bold** markers from the résumé source. Splitting on
  // the marker and letting Svelte render each part means no HTML string is
  // ever built, so there is nothing to escape and nothing to inject.
  const boldSegments = (v: string) =>
    v
      .split(/\*\*\s*([^*][\s\S]*?)\s*\*\*/g)
      .map((text, i) => ({ text, bold: i % 2 === 1 }));

  $: cleanRole = item.role.replace(/\*\*/g, "").trim();
  // "Taipei, Taiwan · Dec 2024 – Jul 2026": each part stays whole, so a
  // line break can only fall between the place and the dates.
  $: dateParts = item.date.split(" · ");
</script>

<!-- Who and when on the left, where the eye scans; the story on the right. -->
<article class="entry">
  <header class="head">
    <div class="who">
      <h3 class="company">{item.company}</h3>
      <p class="role">{cleanRole}</p>
      <p class="label">
        {#each dateParts as part, i}{#if i > 0}{" · "}{/if}
          <span class="nb">{part}</span>{/each}
      </p>
    </div>
  </header>

  <div class="story">
    {#if copy}
      <p class="text">{copy.story}</p>
      {#if copy.note}
        <p class="note">{copy.note}</p>
      {/if}
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
  </div>
</article>

<style>
  .entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }

  .head .label,
  .role,
  .company {
    margin: 0;
  }

  .who {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .nb {
    white-space: nowrap;
  }

  .company {
    font-size: var(--text-lg);
    font-weight: 600;
    line-height: var(--leading-snug);
  }

  .role {
    font-size: var(--text-sm);
    color: var(--muted);
  }

  .story {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .text {
    margin: 0;
    max-width: 68ch;
    line-height: 1.6;
  }

  /* Her one handwritten aside on the page. */
  .note {
    margin: 0;
    font-family: var(--font-hand);
    font-size: 1.15rem;
    line-height: 1.3;
    color: var(--brush);
    transform: rotate(-1deg);
    transform-origin: left;
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
    margin: 0;
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
    color: var(--brush);
  }

  @media (min-width: 900px) {
    .entry {
      grid-template-columns: minmax(0, 3fr) minmax(0, 8fr);
      gap: var(--space-7);
    }

    .company {
      font-size: var(--text-xl);
    }
  }
</style>
