<script lang="ts">
  import { base } from "$app/paths";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: post = data.post;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
</script>

<svelte:head>
  <title>{post.title} — Echo Shih</title>
  <meta
    name="description"
    content={post.excerpt}
  />
</svelte:head>

<article class="section_padding blog-post">
  <div class="blog-post-wrap">
    <a
      class="blog-back mono"
      href="{base}/blog"
    >
      ← Writing
    </a>

    <p class="blog-post-date mono">{formatDate(post.date)}</p>
    <h1>{post.title}</h1>

    {#each post.sections as section}
      <section class="blog-section">
        {#if section.heading}
          <h2>{section.heading}</h2>
        {/if}
        {#if section.code}
          <pre class="blog-code mono"><code>{section.code}</code></pre>
        {:else}
          {#each section.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
        {/if}
      </section>
    {/each}
  </div>
</article>

<style>
  .blog-post-wrap {
    max-width: 62ch;
    margin: 0 auto;
  }

  .blog-back {
    display: inline-block;
    margin-bottom: 1.5rem;
    font-size: 0.76rem;
    letter-spacing: 0.02em;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 160ms ease;
  }

  .blog-back:hover {
    color: var(--color-accent);
  }

  .blog-post-date {
    margin: 0 0 0.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  h1 {
    margin: 0 0 1.8rem;
    font-size: clamp(1.8rem, 4.2vw, 2.4rem);
    line-height: 1.2;
  }

  .blog-section {
    margin-bottom: 1.8rem;
  }

  .blog-section h2 {
    font-size: 1.15rem;
    margin: 0 0 0.7rem;
  }

  .blog-section p {
    margin: 0 0 1rem;
    line-height: 1.75;
    color: var(--text-color);
  }

  .blog-section p:last-child {
    margin-bottom: 0;
  }

  .blog-code {
    margin: 0;
    padding: 1.1rem 1.2rem;
    border: 1px solid var(--section-border);
    border-radius: 8px;
    background: var(--surface-bg);
    overflow-x: auto;
    font-size: 0.78rem;
    line-height: 1.6;
    color: var(--text-color);
  }
</style>
