<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { tabs } from "$lib/menuTabs";
  import { base } from "$app/paths";
  import { heroConfig } from "../../../content/portfolio.config";

  export let scrollPosition: number;
  export let headerEl: HTMLElement | undefined = undefined;

  function goTop() {
    document.body.scrollIntoView();
  }
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
      on:click|preventDefault={goTop}
      class="site-name"
    >
      Echo Shih
    </a>
    <!-- One nav, one font, at every width — was a sans-font desktop-only row
         plus a separate mono mobile-only row; two treatments for the same
         links. Theme toggle grouped in as the last action here rather than
         floating alone opposite the logo. -->
    <nav
      aria-label="Section navigation"
      class="mobile-tabs"
    >
      {#each tabs as tab}
        <a
          href={tab.link}
          class="mobile-tab-link"
          aria-label="Go to {tab.name} section"
        >
          {tab.name}
        </a>
      {/each}
      <a
        href="{base}/{heroConfig.resume}"
        download={heroConfig.resumeAs}
        class="mobile-tab-link"
      >
        Résumé
      </a>
      <div class={scrollPosition > 60 ? "drop-shadow-lg" : undefined}>
        <ThemeSwitch id="theme-toggle" />
      </div>
    </nav>
  </div>
</header>

<style>
  /* One hover language across the site: accent colour on text, accent border on
     surfaces. The nav used a strikethrough and Tailwind greys, which belonged to
     neither. */
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

  /* Keeps the visual weight the old <h1> had, without the heading semantics. */
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

  .mobile-tabs {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.6rem;
    padding-top: 0.6rem;
    border-top: 1px solid var(--section-border);
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .mobile-tabs > :last-child {
    margin-left: auto;
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

  @media (prefers-reduced-motion: reduce) {
    .mobile-tab-link {
      transition: none;
    }
  }

  .nav-filtered {
    border-radius: 999px;
  }
</style>
