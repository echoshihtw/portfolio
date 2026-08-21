<script lang="ts">
  import { base } from "$app/paths";
  import { blogPosts } from "../../content/blog.config";

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
  <title>Writing — Echo Shih</title>
  <meta
    name="description"
    content="Short, specific technical posts — real bugs, real fixes, what generalizes."
  />
</svelte:head>

<section class="section_padding blog-index">
  <div class="blog-index-wrap">
    <p class="blog-kicker mono">Writing</p>
    <h1>Short, specific, technical.</h1>
    <p class="blog-intro">
      No takes, no "5 tips" — one real thing that happened, what it turned out
      to actually be, and what generalizes past this one case.
    </p>

    <ul class="blog-list">
      {#each blogPosts as post}
        <li>
          <a
            class="blog-list-link"
            href="{base}/blog/{post.slug}"
          >
            <span class="blog-list-date mono">{formatDate(post.date)}</span>
            <span class="blog-list-title">{post.title}</span>
            <span class="blog-list-excerpt">{post.excerpt}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .blog-index-wrap {
    max-width: 62ch;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .blog-kicker {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  h1 {
    margin: 0;
    font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  }

  .blog-intro {
    margin: 0;
    max-width: 52ch;
    line-height: 1.7;
    color: var(--text-muted);
  }

  .blog-list {
    list-style: none;
    margin: 1.2rem 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .blog-list li {
    border-top: 1px solid var(--section-border);
  }

  .blog-list li:last-child {
    border-bottom: 1px solid var(--section-border);
  }

  .blog-list-link {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1.4rem 0.4rem;
    text-decoration: none;
    color: inherit;
    border-radius: 6px;
    transition: background-color 160ms ease;
  }

  .blog-list-link:hover,
  .blog-list-link:focus-visible {
    background: var(--surface-bg);
  }

  .blog-list-date {
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }

  .blog-list-title {
    font-family: "DM Serif Display", serif;
    font-size: 1.25rem;
    color: var(--text-color);
  }

  :global(html[data-theme="dark"]) .blog-list-title {
    font-family: "JetBrains Mono", monospace;
    font-weight: 500;
  }

  .blog-list-excerpt {
    line-height: 1.6;
    color: var(--text-muted);
  }
</style>
