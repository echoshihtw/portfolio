<script lang="ts">
  import Reveal from "$lib/components/Reveal.svelte";

  export let item: {
    company: string;
    role: string;
    date: string;
    highlights: string[];
  };
  export let copy: { story: string; techLine: string } | undefined = undefined;

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
    <h3 class="company">{item.company}</h3>
    <p class="role">{cleanRole}</p>
    <p class="label">
      {#each dateParts as part, i}{#if i > 0}{" · "}{/if}
        <span class="nb">{part}</span>{/each}
    </p>
  </header>

  <div class="story">
    {#if copy}
      <p class="text">{copy.story}</p>
      <p class="tech label">{copy.techLine}</p>
    {/if}

    <Reveal
      label="Details"
      name={item.company}
      quiet
    >
      <ul class="details">
        {#each item.highlights as h}
          <li>
            {#each boldSegments(h) as seg}{#if seg.bold}<strong>
                  {seg.text}
                </strong>{:else}{seg.text}{/if}{/each}
          </li>
        {/each}
      </ul>
    </Reveal>
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

  .head {
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

  .tech {
    margin: var(--space-1) 0 0;
    text-transform: none;
    letter-spacing: 0.02em;
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
    color: var(--muted);
  }

  @media (min-width: 900px) {
    .entry {
      grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
      gap: var(--space-7);
    }

    .company {
      font-size: var(--text-xl);
    }
  }
</style>
