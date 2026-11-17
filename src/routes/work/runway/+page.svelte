<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import { Marked } from "$lib/pens";
  import { runwayCaseStudy as c } from "../../../content/runwayCaseStudy.config";
  import { onMount } from "svelte";

  // The side menu: one link per part of the story, by its short name.
  const contents = c.parts.map(({ id, menu }) => ({ id, label: menu }));

  // The section being read is the last one whose heading has passed the top
  // third of the screen.
  let current = contents[0].id;
  onMount(() => {
    const headings = contents
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const update = () => {
      const line = innerHeight / 3;
      const passed = headings.filter(
        (h) => h.getBoundingClientRect().top <= line
      );
      current = (passed.at(-1) ?? headings[0]).id;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  });
</script>

<Seo
  title="Echo Shih · Runway case study"
  description={c.lede}
  path={c.path}
/>

<div class="layout section_padding">
  <nav
    class="contents"
    aria-label="Case study sections"
  >
    <ol>
      {#each contents as item}
        <li>
          <a
            href="#{item.id}"
            aria-current={current === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ol>
  </nav>

  <main class="study">
    <a
      class="back"
      href="{base}/#selected-work"
    >
      ← Selected work
    </a>

    <header>
      <p class="label">{c.kicker}</p>
      <h1>{c.title}</h1>
      <p class="lede">
        <Marked
          text={c.lede}
          phrase={c.ledeMark.phrase}
          kind={c.ledeMark.kind}
        />
      </p>
    </header>

    {#each c.parts as part}
      <section aria-labelledby={part.id}>
        <h2 id={part.id}>{part.heading}</h2>
        {#each part.body as paragraph}
          <p>
            <Marked
              text={paragraph}
              phrase={part.mark?.phrase ?? ""}
              kind={part.mark?.kind}
            />
          </p>
        {/each}
        {#if part.screens}
          <div class="compare">
            {#each c.screens.compare as pair}
              <figure class="pair">
                <figcaption class="label">{pair.label}</figcaption>
                {#each c.screens.rows as { version, side, width, height }}
                  <div class="shot">
                    <p class="label">{version}</p>
                    <img
                      src="{base}/{pair[side].src}"
                      alt={pair[side].alt}
                      {width}
                      {height}
                      loading="lazy"
                    />
                  </div>
                {/each}
              </figure>
            {/each}
          </div>
        {/if}
      </section>
    {/each}

    <p class="quiet facts">{c.facts}</p>
  </main>
</div>

<style>
  .study {
    max-width: 46rem;
    margin: 0 auto;
  }

  /* Headings a menu link lands on clear the header. */
  .study :global([id]) {
    scroll-margin-top: var(--space-7);
  }

  .back {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--muted);
  }

  header {
    margin: var(--space-6) 0 var(--space-7);
  }

  h1 {
    margin: var(--space-2) 0 var(--space-4);
    font-size: var(--text-3xl);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .lede {
    font-size: var(--text-xl);
    line-height: 1.4;
  }

  /* Space, not lines, between the parts, so the story reads on. */
  section {
    padding: var(--space-5) 0;
  }

  h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-2xl);
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  p {
    margin: 0 0 var(--space-4);
    font-size: var(--text-lg);
    line-height: 1.65;
  }

  .label {
    margin: 0;
    font-size: var(--text-xs);
  }

  .quiet {
    color: var(--muted);
  }

  .facts {
    padding-top: var(--space-5);
    border-top: 1px solid var(--border);
    font-size: var(--text-base);
  }

  /* Each job as a pair, 1.0 beside 1.3.0, so the change reads at a glance. */
  .compare {
    display: grid;
    gap: var(--space-6);
    max-width: 28rem;
    margin: var(--space-5) auto var(--space-2);
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2) var(--space-3);
    align-items: start;
    margin: 0;
  }

  .pair figcaption {
    grid-column: 1 / -1;
  }

  .shot img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .shot .label {
    margin-bottom: var(--space-1);
  }

  /* The side menu shows only where there is room beside the column. */
  .contents {
    display: none;
  }

  @media (min-width: 1100px) {
    .layout {
      display: grid;
      grid-template-columns: 12rem minmax(0, 46rem) 12rem;
      justify-content: center;
      column-gap: var(--space-6);
    }

    .study {
      margin: 0;
    }

    .contents {
      display: block;
      position: sticky;
      top: var(--space-7);
      align-self: start;
      margin-top: calc(var(--space-7) * 2);
    }

    .contents ol {
      margin: 0;
      padding: 0;
      list-style: none;
      border-left: 1px solid var(--border);
    }

    .contents a {
      display: flex;
      align-items: center;
      min-height: 44px;
      padding-left: var(--space-4);
      margin-left: -1px;
      border-left: 2px solid transparent;
      font-size: var(--text-sm);
      color: var(--muted);
      text-decoration: none;
    }

    .contents a:hover,
    .contents a[aria-current] {
      color: var(--ink);
    }

    .contents a[aria-current] {
      border-left-color: var(--accent-shape);
    }
  }
</style>
