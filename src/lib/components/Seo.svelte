<script lang="ts">
  import {
    DEFAULT_OG_IMAGE,
    SITE_NAME,
    absoluteUrl,
    articleJsonLd,
    jsonLdScript,
    websiteJsonLd,
  } from "$lib/seo";

  export let title: string;
  /**
   * Overrides only the <title> tag. Search results want the literal terms
   * someone would type — an error message, a tool name. Social cards and
   * the schema headline keep `title`, which can stay evocative, because a
   * share is read by a human deciding whether it looks worth clicking.
   */
  export let seoTitle: string | undefined = undefined;
  export let description: string;
  /** Site-root-relative path, e.g. "/blog/some-post". */
  export let path: string;
  /** "article" for blog posts, "website" for everything else. */
  export let type: "website" | "article" = "website";
  /** ISO date; emitted as article:published_time for posts. */
  export let publishedTime: string | undefined = undefined;
  export let image: string = DEFAULT_OG_IMAGE;

  $: url = absoluteUrl(path);
  $: displayTitle = seoTitle ?? title;
  $: fullTitle = displayTitle.includes(SITE_NAME)
    ? displayTitle
    : `${displayTitle} — ${SITE_NAME}`;
  $: socialTitle = title.includes(SITE_NAME)
    ? title
    : `${title} — ${SITE_NAME}`;

  // A post describes itself as a BlogPosting with an author; everything
  // else declares the Person/WebSite the pages belong to. Both carry the
  // same Person node by @id, so the graph resolves to one identity rather
  // than a separate author per page.
  $: schema =
    type === "article" && publishedTime
      ? articleJsonLd({
          url,
          title,
          description,
          datePublished: publishedTime,
          image,
        })
      : websiteJsonLd(url);
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
    content={socialTitle}
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
    content={socialTitle}
  />
  <meta
    name="twitter:description"
    content={description}
  />
  <meta
    name="twitter:image"
    content={image}
  />

  <!-- {@html} is the only way to put a script tag with a JSON body into
       svelte:head. Safe here: the payload is this site's own data, never
       user input, and jsonLdScript escapes "<" so no string value can
       close the tag early. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript(schema)}

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
