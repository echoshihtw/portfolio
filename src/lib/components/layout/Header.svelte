<script lang="ts">
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { tabs } from "$lib/menuTabs";
  import { base } from "$app/paths";

  export let scrollPosition: number;
  // 0 at page top, 1 once scrolled HEADER_BACKDROP_DISTANCE px — drives a
  // continuous fade-in instead of a hard on/off swap.
  export let headerBackdrop = 0;

  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<header
  class="w-full sticky z-[40] top-0 py-2 header-shell"
>
  <div
    class="w-full m-auto max-w-[1400px] px-6 py-3 nav-filtered"
    style="--backdrop: {headerBackdrop}"
  >
    <div class="w-full flex items-center justify-between">
      <!-- Not an <h1>: the hero statement is the page's single heading. -->
      <a
        href={base || "/"}
        on:click|preventDefault={goTop}
        class="site-name"
      >
        Echo Shih
      </a>
      <div class="flex gap-5">
        <div class="md:hidden">
          <ThemeSwitch id="theme-toggle-mobile" />
        </div>
      </div>
      <div class="hidden md:flex items-center gap-4">
        {#each tabs as tab}
          <a
            href={tab.link}
            class="nav-link"
            aria-label="Go to {tab.name} section"
          >
            <p>{tab.name}</p>
          </a>
        {/each}
        <div class={scrollPosition > 60 ? "drop-shadow-lg" : undefined}>
          <ThemeSwitch id="theme-toggle-desktop" />
        </div>
      </div>
    </div>
    <!-- Mobile only: the header used to carry no section links at all below
         md, leaving a first-time visitor with no way to navigate until they
         scrolled far enough to trigger the floating nav. This makes the same
         links available from first paint. -->
    <nav
      aria-label="Section navigation"
      class="mobile-tabs md:hidden"
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
    </nav>
  </div>
</header>

<style>
  /* One hover language across the site: accent colour on text, accent border on
     surfaces. The nav used a strikethrough and Tailwind greys, which belonged to
     neither. */
  .nav-link,
  .site-name {
    color: var(--text-color);
    text-decoration: none;
    transition: color 180ms ease;
  }

  .nav-link:hover,
  .site-name:hover {
    color: var(--color-accent);
  }

  .nav-link:focus-visible,
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
    .nav-link,
    .site-name {
      transition: none;
    }
  }

  .mobile-tabs {
    display: flex;
    gap: 1rem;
    margin-top: 0.6rem;
    padding-top: 0.6rem;
    border-top: 1px solid var(--section-border);
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
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
    transition: box-shadow 200ms ease;
    border-radius: calc(999px * var(--backdrop, 0));
    backdrop-filter: blur(calc(6px * var(--backdrop, 0)));
    -webkit-backdrop-filter: blur(calc(6px * var(--backdrop, 0)));
    background: color-mix(
      in srgb,
      var(--surface-bg) calc(70% * var(--backdrop, 0)),
      transparent
    );
    border: 1px solid
      color-mix(in srgb, var(--section-border) calc(100% * var(--backdrop, 0)), transparent);
    box-shadow: 0 8px 24px -16px
      color-mix(in srgb, var(--text-color) calc(18% * var(--backdrop, 0)), transparent);
  }
</style>
