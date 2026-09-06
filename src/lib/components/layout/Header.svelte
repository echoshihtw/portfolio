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
    if ($page.route.id !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Compare route ids, not paths against `base`. SvelteKit 2 resolves
  // relative paths, so `base` is "." rather than "", and every
  // `pathname === (base || "/")` in this file was comparing "/" with "."
  // and quietly evaluating false. That is why aria-current never appeared
  // in the prerendered HTML on any page.
  // Route-level, so a post page marks Blog as current too.
  $: isBlog = $page.route.id?.startsWith("/blog") ?? false;
  $: isGallery = $page.route.id === "/gallery";
  $: isHome = $page.route.id === "/";

  let homeOpen = false;
  const closeHome = () => (homeOpen = false);

  // A menu that only closes by clicking its own trigger is a trap: people
  // click away, or press escape, and expect it gone.
  function onWindowKey(e: KeyboardEvent) {
    if (e.key === "Escape") homeOpen = false;
  }

  function onWindowPointer(e: PointerEvent) {
    if (!homeOpen) return;
    if (!(e.target as HTMLElement).closest(".home-menu")) homeOpen = false;
  }
</script>

<!-- Not sticky: scrolls away with the page. The floating pill (driven by an
     IntersectionObserver on this element, in AppShell) takes over navigation
     once this leaves the viewport, rather than two navs stacking. -->
<svelte:window
  on:keydown={onWindowKey}
  on:pointerdown={onWindowPointer}
/>

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
         of reach along with it, and an auto-margined last child pushes past
         the container entirely, which put the toggle off-screen and gave the
         whole document a horizontal scroll at any width below 414px. -->
    <div class="nav-row">
      <nav
        aria-label="Main navigation"
        class="mobile-tabs"
      >
        <!-- Work, Projects, Skills and Contact are sections OF the home
             page, so they sit inside it rather than beside it. Keeping them
             in a menu also means this nav holds the same items on every
             page: before, the row changed shape between routes and
             everything after it moved. -->
        <div class="home-menu">
          <button
            type="button"
            class="mobile-tab-link home-trigger"
            aria-expanded={homeOpen}
            aria-controls="home-sections"
            aria-current={isHome ? "page" : undefined}
            on:click={() => (homeOpen = !homeOpen)}
          >
            Home
            <span
              class="chev"
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          <ul
            id="home-sections"
            class="home-sections"
            hidden={!homeOpen}
          >
            <li>
              <a
                href={base || "/"}
                on:click={closeHome}
              >
                Top
              </a>
            </li>
            {#each tabs as tab}
              <li>
                <a
                  href={tabHref(tab.link, $page.url.pathname)}
                  on:click={closeHome}
                >
                  {tab.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
        <!-- The four above are positions on this page; the two below are
             places you go. Rendered as one flat row they read as six peers,
             so clicking Blog does something categorically different from its
             neighbours with nothing to warn you. The rule is the warning. -->
        <span
          class="nav-sep"
          aria-hidden="true"
        ></span>
        <a
          href="{base}/blog"
          class="mobile-tab-link"
          aria-current={isBlog ? "page" : undefined}
        >
          Blog
        </a>
        <!-- Opens the PDF rather than downloading it. This link is labelled
             "Résumé", not "Download résumé": a recruiter skims first and
             keeps it only if interested, and a forced download puts a file
             on their disk before they know they want it, and worse on a phone,
             where it lands in Downloads and they have to leave the browser
             to read it. The hero button is the one that says download and
             does it. -->
        <a
          href="{base}/{heroConfig.resume}"
          target="_blank"
          rel="noreferrer noopener"
          class="mobile-tab-link"
        >
          Résumé
        </a>
        <!-- A second rule, because there are three kinds of thing here and
             not two. Left of the first: where you are. Between the rules:
             the two professional destinations. After the second: the other
             half of this site, which is nobody's idea of a destination and
             is the more interesting for sitting apart. -->
        <span
          class="nav-sep"
          aria-hidden="true"
        ></span>
        <a
          href="{base}/gallery"
          class="mobile-tab-link"
          aria-current={isGallery ? "page" : undefined}
        >
          Art Gallery
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

  /* Carries the visual weight of a heading without the heading semantics:
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

  /* Divides the page's own sections from the links that leave it. Sized in
     em so it tracks the link text rather than a fixed pixel height. */
  .home-menu {
    position: relative;
    display: inline-flex;
  }

  .home-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border: 0;
    background: transparent;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }

  .chev {
    font-size: 0.7em;
    transition: transform 160ms ease;
  }

  .home-trigger[aria-expanded="true"] .chev {
    transform: rotate(180deg);
  }

  .home-sections {
    position: absolute;
    top: calc(100% + 0.55rem);
    left: 0;
    z-index: 30;
    margin: 0;
    padding: 0.4rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    min-width: 9rem;
    border: 1px solid var(--section-border);
    border-radius: var(--radius-sm);
    background: var(--surface-bg);
    box-shadow: 0 10px 26px rgb(20 18 42 / 0.16);
  }

  .home-sections a {
    display: block;
    padding: 0.4rem 0.6rem;
    border-radius: var(--radius-sm);
    white-space: nowrap;
  }

  .home-sections a:hover,
  .home-sections a:focus-visible {
    background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .chev {
      transition: none;
    }
  }

  .nav-sep {
    flex: none;
    width: 1px;
    height: 1.1em;
    margin: 0 -0.15rem;
    background: var(--section-border);
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
