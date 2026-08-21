<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { tabs, tabHref } from "$lib/menuTabs";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { heroConfig } from "../../../content/portfolio.config";

  export let scrollPosition: number;
  export let headerEl: HTMLElement | undefined = undefined;

  // Scroll-to-top only makes sense when already on the one-page home. On
  // any other route (e.g. /blog), the click has to actually navigate home
  // instead of being swallowed by preventDefault.
  function goTop(event: MouseEvent) {
    if ($page.url.pathname !== (base || "/")) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Route-level, so a post page marks Blog as current too.
  $: isBlog = $page.url.pathname.startsWith(`${base}/blog`);
</script>

<!-- Not sticky: scrolls away with the page. The floating pill (driven by an
     IntersectionObserver on this element, in AppShell) takes over navigation
     once this leaves the viewport, rather than two navs stacking. -->
<header
  class="w-full py-2 header-shell"
  bind:this={headerEl}
>
  <div class="w-full m-auto max-w-[1400px] px-6 py-3 nav-filtered">
    <!-- Not an <h1>: the hero statement is the page's single heading. -->
    <a
      href={base || "/"}
      on:click={goTop}
      class="site-name"
    >
      Echo Shih
    </a>
    <!-- One nav, one font, at every width.

         The toggle sits beside the link strip, not inside it. The strip
         scrolls horizontally on narrow phones, so anything in it scrolls out
         of reach along with it — and an auto-margined last child pushes past
         the container entirely, which put the toggle off-screen and gave the
         whole document a horizontal scroll at any width below 414px. -->
    <div class="nav-row">
      <nav
        aria-label="Section navigation"
        class="mobile-tabs"
      >
        {#each tabs as tab}
          <a
            href={tabHref(tab.link, $page.url.pathname)}
            class="mobile-tab-link"
          >
            {tab.name}
          </a>
        {/each}
        <a
          href="{base}/blog"
          class="mobile-tab-link"
          aria-current={isBlog ? "page" : undefined}
        >
          Blog
        </a>
        <a
          href="{base}/{heroConfig.resume}"
          download={heroConfig.resumeAs}
          class="mobile-tab-link"
        >
          Résumé
        </a>
      </nav>

      <div class="nav-toggle {scrollPosition > 60 ? 'drop-shadow-lg' : ''}">
        <ThemeSwitch id="theme-toggle" />
      </div>
    </div>
  </div>
</header>

<style>
  /* One hover language across the site: accent colour on text, accent border
     on surfaces. */
  .site-name {
    color: var(--text-color);
    text-decoration: none;
    transition: color 180ms ease;
  }

  .site-name:hover {
    color: var(--color-accent);
  }

  .site-name:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* Carries the visual weight of a heading without the heading semantics —
     the hero statement is the page's <h1>. */
  .site-name {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.15em;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.2;
    cursor: pointer;
  }

  @media (prefers-reduced-motion: reduce) {
    .site-name {
      transition: none;
    }
  }

  .nav-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.6rem;
    padding-top: 0.6rem;
    border-top: 1px solid var(--section-border);
  }

  .mobile-tabs {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* min-width: 0 lets the strip shrink below its content width so it, and
       not the page, is what scrolls. */
    flex: 1 1 auto;
    min-width: 0;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .nav-toggle {
    flex: none;
  }

  .mobile-tabs::-webkit-scrollbar {
    display: none;
  }

  .mobile-tab-link {
    flex: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-decoration: none;
    white-space: nowrap;
    transition: color 180ms ease;
  }

  .mobile-tab-link:hover,
  .mobile-tab-link:focus-visible {
    color: var(--color-accent);
  }

  .mobile-tab-link[aria-current="page"] {
    color: var(--text-color);
  }

  @media (prefers-reduced-motion: reduce) {
    .mobile-tab-link {
      transition: none;
    }
  }

  .nav-filtered {
    border-radius: 999px;
  }
</style>
