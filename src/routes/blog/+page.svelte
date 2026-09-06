<script lang="ts">
  import { base } from "$app/paths";
  import Seo from "$lib/components/Seo.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  }
</script>

<Seo
  title="Working notes"
  description="What broke, what it actually turned out to be, and what I'd do differently."
  path="/blog"
/>

<section class="section_padding blog-index">
  <div class="blog-index-wrap">
    <p class="blog-kicker mono">Writing</p>
    <h1>Working notes</h1>
    <p class="blog-intro">
      What broke, what it actually turned out to be, and what I'd do
      differently.
    </p>

    <ul class="blog-list">
      {#each data.posts as post}
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
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--muted);
  }

  h1 {
    margin: 0;
    font-size: var(--text-2xl);
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
    border-radius: var(--radius-md);
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
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-lg);
    letter-spacing: var(--tracking-tight);
    color: var(--ink);
  }

  .blog-list-link:hover .blog-list-title {
    color: var(--primary);
  }

  .blog-list-excerpt {
    line-height: 1.6;
    color: var(--text-muted);
  }
</style>
