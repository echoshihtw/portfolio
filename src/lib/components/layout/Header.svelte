<script lang="ts">
  import Icon from "@iconify/svelte";
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import { tabs, tabHref } from "$lib/menuTabs";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { heroConfig } from "../../../content/portfolio.config";

  export let scrollPosition: number;

  // One header, two states. At the top of the page it is a full-width bar.
  // Past this many pixels it condenses into a floating pill, and it is the
  // SAME element doing both, so the change is a transition rather than one
  // nav fading out while another fades in. That used to be two components
  // and an IntersectionObserver; now it is a class.
  $: condensed = scrollPosition > 80;

  // Compare route ids, not paths against `base`. SvelteKit 2 resolves
  // relative paths, so `base` is "." rather than "", and every
  // `pathname === (base || "/")` in this file was comparing "/" with "."
  // and quietly evaluating false. That is why aria-current never appeared
  // in the prerendered HTML on any page.
  // Route-level, so a post page marks Blog as current too.
  $: isBlog = $page.route.id?.startsWith("/blog") ?? false;
  $: isGallery = $page.route.id === "/gallery";
  $: isHome = $page.route.id === "/";

  // Scroll-to-top only makes sense on the one-page home. Anywhere else the
  // link is a real navigation home and the click has to be left alone.
  function goTop(event: MouseEvent) {
    if (!isHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

<svelte:window
  on:keydown={onWindowKey}
  on:pointerdown={onWindowPointer}
/>

<!-- Sticky, so it is always there to condense. The dropdown below hangs out
     of this element, which means nothing in here may clip overflow: the old
     nav strip scrolled horizontally, and a scrolling box clips vertically
     too, which is why the menu opened and could not be seen. -->
<header
  class="header"
  class:condensed
>
  <div class="bar">
    <!-- Not an <h1>: the hero statement is the page's single heading. -->
    <a
      href={base || "/"}
      on:click={goTop}
      class="site-name"
    >
      Echo Shih
    </a>

    <nav
      aria-label="Main navigation"
      class="tabs"
    >
      <!-- Work, Projects, Skills and Contact are sections OF the home page,
           so they sit inside it rather than beside it. Keeping them in a menu
           also means this nav holds the same items on every page. -->
      <div class="home-menu">
        <button
          type="button"
          class="tab home-trigger"
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

      <!-- Three kinds of thing, two rules. Left of the first: where you are.
           Between them: the two professional destinations. After the second:
           the other half of this site, which is nobody's idea of a
           destination and is the more interesting for sitting apart. -->
      <span
        class="sep"
        aria-hidden="true"
      ></span>
      <a
        href="{base}/blog"
        class="tab"
        aria-current={isBlog ? "page" : undefined}
      >
        Blog
      </a>
      <!-- Opens the PDF rather than downloading it: a recruiter skims first
           and keeps it only if interested. The hero button is the one that
           says download and does it. -->
      <a
        href="{base}/{heroConfig.resume}"
        target="_blank"
        rel="noreferrer noopener"
        class="tab"
      >
        Résumé
      </a>
      <span
        class="sep"
        aria-hidden="true"
      ></span>
      <a
        href="{base}/gallery"
        class="tab"
        aria-current={isGallery ? "page" : undefined}
      >
        Art Gallery
      </a>
    </nav>

    <div class="tools">
      <!-- Only present once condensed: at the top of the page there is
           nothing to go back to. Top on the home page, home from anywhere
           else, an anchor so the off-home case works without JavaScript. -->
      <a
        href={base || "/"}
        class="tab top-link"
        aria-label={isHome ? "Go to top" : "Home"}
        tabindex={condensed ? 0 : -1}
        on:click={goTop}
      >
        {#if isHome}
          <Icon icon="ri:arrow-up-circle-line" />
        {:else}
          <Icon icon="ri:home-4-line" />
        {/if}
      </a>
      <ThemeSwitch id="theme-toggle" />
    </div>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    padding: 0.5rem 0;
  }

  /* The bar is what transitions. Every property that changes between the
     two states is one that can be tweened: max-width, padding, background,
     border colour, shadow. Layout inside the bar does not change, which is
     the whole trick: it is the same row of the same items, given a pill
     around it. */
  .bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem 1.1rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    border-radius: 999px;
    background: transparent;
    transition:
      max-width 340ms cubic-bezier(0.2, 0.7, 0.2, 1),
      padding 340ms cubic-bezier(0.2, 0.7, 0.2, 1),
      background-color 240ms ease,
      border-color 240ms ease,
      box-shadow 240ms ease;
  }

  .condensed .bar {
    max-width: min(50rem, calc(100% - 1.5rem));
    padding: 0.45rem 0.9rem 0.45rem 1.1rem;
    background: color-mix(in srgb, var(--surface-bg) 86%, transparent);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-color: var(--section-border);
    box-shadow: 0 10px 30px rgb(20 18 42 / 0.14);
  }

  /* Carries the visual weight of a heading without the heading semantics:
     the hero statement is the page's <h1>. Shrinks a step in the pill. */
  .site-name {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.15em;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.2;
    color: var(--text-color);
    text-decoration: none;
    white-space: nowrap;
    transition:
      color 180ms ease,
      font-size 340ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  .condensed .site-name {
    font-size: 0.95em;
  }

  .site-name:hover {
    color: var(--color-accent);
  }

  .site-name:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* No overflow rule here, on purpose. The strip used to scroll
     horizontally on narrow phones, and a scrolling box clips vertically as
     well, which cut the dropdown off. It wraps instead. */
  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    flex: 1 1 auto;
    min-width: 0;
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex: none;
    margin-left: auto;
  }

  .tab {
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

  .tab:hover,
  .tab:focus-visible {
    color: var(--color-accent);
  }

  .tab[aria-current="page"] {
    color: var(--text-color);
  }

  /* Hidden at the top of the page rather than removed, so the pill does not
     change width when it appears. max-width tweens; width: auto does not. */
  .top-link {
    display: inline-flex;
    align-items: center;
    font-size: 1.1rem;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    transition:
      max-width 340ms cubic-bezier(0.2, 0.7, 0.2, 1),
      opacity 200ms ease;
  }

  .condensed .top-link {
    max-width: 2rem;
    opacity: 1;
    pointer-events: auto;
  }

  .sep {
    flex: none;
    width: 1px;
    height: 1.1em;
    margin: 0 -0.15rem;
    background: var(--section-border);
  }

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
    .bar,
    .site-name,
    .tab,
    .top-link,
    .chev {
      transition: none;
    }
  }
</style>
