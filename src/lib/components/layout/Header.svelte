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

  // The Home sections slide out horizontally, in the row, rather than
  // dropping down. Three ways in: hover (mouse), focus (keyboard, tabbing
  // into any of the links), and a tap on the trigger, which pins them open
  // for touch, where there is no hover. All three are tracked here rather
  // than left to :hover so aria-expanded tells the truth.
  let hovered = false;
  let focused = false;
  let pinned = false;
  $: homeOpen = hovered || focused || pinned;

  function onMenuFocusOut(e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    focused = !!next && (e.currentTarget as HTMLElement).contains(next);
  }

  // A menu that only closes by clicking its own trigger is a trap: people
  // click away, or press escape, and expect it gone.
  function onWindowKey(e: KeyboardEvent) {
    if (e.key === "Escape") pinned = false;
  }

  function onWindowPointer(e: PointerEvent) {
    if (!pinned) return;
    if (!(e.target as HTMLElement).closest(".home-menu")) pinned = false;
  }
</script>

<svelte:window
  on:keydown={onWindowKey}
  on:pointerdown={onWindowPointer}
/>

<!-- Sticky, so it is always there to condense. -->
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
           so they sit inside it rather than beside it: hover Home and they
           slide out in the row, then the rule, then the other pages. -->
      <div
        class="home-menu"
        class:open={homeOpen}
        on:pointerenter={(e) => (hovered = e.pointerType === "mouse")}
        on:pointerleave={() => (hovered = false)}
        on:focusin={() => (focused = true)}
        on:focusout={onMenuFocusOut}
      >
        <button
          type="button"
          class="tab home-trigger"
          aria-expanded={homeOpen}
          aria-controls="home-sections"
          aria-current={isHome ? "page" : undefined}
          on:click={() => (pinned = !pinned)}
        >
          Home
          <span
            class="chev"
            aria-hidden="true"
          >
            ▸
          </span>
        </button>
        <ul
          id="home-sections"
          class="home-sections"
        >
          <li>
            <a
              href={base || "/"}
              on:click={() => (pinned = false)}
            >
              Top
            </a>
          </li>
          {#each tabs as tab}
            <li>
              <a
                href={tabHref(tab.link, $page.url.pathname)}
                on:click={() => (pinned = false)}
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
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0.75rem 1rem;
    border: var(--border-w) solid transparent;
    border-radius: var(--radius-pill);
    background: transparent;
    transition:
      max-width 340ms var(--ease-out),
      padding 340ms var(--ease-out),
      background-color var(--dur-base) ease,
      border-color var(--dur-base) ease;
  }

  @media (min-width: 768px) {
    .bar {
      padding: 0.75rem 2rem;
    }
  }

  /* A pill with a hairline, opaque. No blur, no shadow: the thing that
     separates it from the page is a 1px ink line. */
  .condensed .bar {
    max-width: min(52rem, calc(100% - 1.5rem));
    padding: 0.45rem 0.9rem 0.45rem 1.1rem;
    background: var(--surface);
    border-color: var(--border-strong);
  }

  /* Carries the visual weight of a heading without the heading semantics:
     the hero statement is the page's <h1>. Shrinks a step in the pill. */
  .site-name {
    font-family: var(--font-display);
    font-size: 1.15em;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--ink);
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
    color: var(--primary);
  }

  .site-name:focus-visible {
    outline: 2px solid var(--primary);
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
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    white-space: nowrap;
    transition: color var(--dur-fast) ease;
  }

  .tab:hover,
  .tab:focus-visible {
    color: var(--primary);
  }

  .tab[aria-current="page"] {
    color: var(--ink);
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
    background: var(--border);
  }

  /* No gap here: the list carries its own left margin, which tweens to
     zero with it, or a collapsed list would leave a gap before the rule. */
  .home-menu {
    display: inline-flex;
    align-items: center;
  }

  /* A button dressed as a tab. No `font: inherit` here: the shorthand runs
     after .tab and resets family and size to the body's, which is how HOME
     came out in DM Sans at twice the size of the tabs beside it. Only the
     button's own chrome is removed; the type comes from .tab. */
  .home-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    line-height: inherit;
  }

  .chev {
    font-size: 0.8em;
    line-height: 1;
    opacity: 0.7;
    transition:
      transform 200ms ease,
      opacity 200ms ease;
  }

  .open .chev {
    transform: translateX(2px);
    opacity: 0.35;
  }

  /* The sections sit in the row, collapsed to nothing, and slide out to
     the right of Home. max-width tweens where width: auto would not; the
     overflow clip is horizontal only so nothing is cut vertically. A menu
     that opens in the row moves the tabs after it, and that is the deal:
     the alternative was a dropdown, and a dropdown over the hero was
     asked away. */
  .home-sections {
    display: flex;
    align-items: center;
    gap: 0.5rem 0.9rem;
    margin: 0;
    padding: 0;
    list-style: none;
    max-width: 0;
    margin-left: 0;
    opacity: 0;
    overflow: hidden clip;
    white-space: nowrap;
    transition:
      max-width 320ms cubic-bezier(0.2, 0.7, 0.2, 1),
      margin-left 320ms cubic-bezier(0.2, 0.7, 0.2, 1),
      opacity 200ms ease;
  }

  .open .home-sections {
    max-width: 30rem;
    margin-left: 0.9rem;
    opacity: 1;
  }

  /* Same type as the tabs, one step quieter, so they read as Home's
     contents rather than four more destinations. */
  .home-sections a {
    display: inline-block;
    padding: 0.15rem 0;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--muted) 78%, transparent);
    text-decoration: none;
    transition: color var(--dur-fast) ease;
  }

  .home-sections a:hover,
  .home-sections a:focus-visible {
    color: var(--primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .bar,
    .site-name,
    .tab,
    .top-link,
    .chev,
    .home-sections {
      transition: none;
    }
  }
</style>
