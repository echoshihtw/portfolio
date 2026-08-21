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
  title={data.meta.title}
  seoTitle={data.meta.seoTitle}
  description={data.meta.excerpt}
  path="/blog/{data.slug}"
  type="article"
  publishedTime={data.meta.date}
/>

<article class="section_padding blog-post">
  <div class="blog-post-wrap">
    <a
      class="blog-back mono"
      href="{base}/blog"
    >
      ← Writing
    </a>

    <p class="blog-post-meta mono">
      {formatDate(data.meta.date)} ·
      <span class="blog-post-author">Echo Shih</span>
    </p>
    <h1>{data.meta.title}</h1>

    <div class="blog-prose">
      <svelte:component this={data.content} />
    </div>
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

  .blog-post-meta {
    margin: 0 0 0.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .blog-post-author {
    color: var(--text-muted);
  }

  h1 {
    margin: 0 0 1.8rem;
    font-size: clamp(1.8rem, 4.2vw, 2.4rem);
    line-height: 1.2;
  }
</style>
