<script lang="ts">
  import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "$lib/seo";

  export let title: string;
  export let description: string;
  /** Site-root-relative path, e.g. "/blog/some-post". */
  export let path: string;
  /** "article" for blog posts, "website" for everything else. */
  export let type: "website" | "article" = "website";
  /** ISO date; emitted as article:published_time for posts. */
  export let publishedTime: string | undefined = undefined;
  export let image: string = DEFAULT_OG_IMAGE;

  $: url = absoluteUrl(path);
  $: fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta
    name="description"
    content={description}
  />
  <link
    rel="canonical"
    href={url}
  />

  <meta
    property="og:type"
    content={type}
  />
  <meta
    property="og:url"
    content={url}
  />
  <meta
    property="og:title"
    content={fullTitle}
  />
  <meta
    property="og:description"
    content={description}
  />
  <meta
    property="og:image"
    content={image}
  />
  <meta
    property="og:site_name"
    content={SITE_NAME}
  />

  <meta
    name="twitter:title"
    content={fullTitle}
  />
  <meta
    name="twitter:description"
    content={description}
  />
  <meta
    name="twitter:image"
    content={image}
  />

  {#if publishedTime}
    <meta
      property="article:published_time"
      content={publishedTime}
    />
    <meta
      property="article:author"
      content={SITE_NAME}
    />
  {/if}
</svelte:head>
