<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import ThemeSwitch from "../ThemeSwitch.svelte";
  import Signature from "../Signature.svelte";
  import { tabHref } from "$lib/menuTabs";
  import { heroConfig } from "../../../content/portfolio.config";
  import { mailtoWithSubject } from "$lib/contactLinks";
  import { trackEmail, trackResume } from "$lib/analytics";

  // The v6 header: her signature, and five places to go. On a phone the
  // links fold into one Menu button; the theme switch lives in the footer
  // there, as before.
  $: isBlog = $page.route.id?.startsWith("/blog") ?? false;
  $: isGallery = $page.route.id === "/gallery";

  let open = false;
  let menu: HTMLElement;
  let menuButton: HTMLButtonElement;

  // A menu that only closes from its own button is a trap: people press
  // Escape or tap away and expect it gone.
  function onWindowKey(e: KeyboardEvent) {
    if (e.key !== "Escape" || !open) return;
    open = false;
    // The link that had focus is about to be hidden; keep focus in the nav.
    if (menu.contains(document.activeElement)) menuButton.focus();
  }

  function onWindowPointer(e: PointerEvent) {
    if (open && !menu.contains(e.target as Node)) open = false;
  }

  const email = mailtoWithSubject(heroConfig.email, heroConfig.emailSubject);
</script>

<svelte:window
  on:keydown={onWindowKey}
  on:pointerdown={onWindowPointer}
/>

<!-- Not an <h1>: the hero statement is the page's single heading. -->
<header class="header">
  <a
    href={base || "/"}
    class="logo"
    aria-label="Echo Shih, home"
  >
    <Signature label="" />
  </a>

  <nav
    aria-label="Main navigation"
    bind:this={menu}
  >
    <button
      type="button"
      class="menu-button"
      bind:this={menuButton}
      aria-expanded={open}
      aria-controls="main-links"
      on:click={() => (open = !open)}
    >
      Menu
    </button>
    <ul
      id="main-links"
      class="links"
      class:open
    >
      <li>
        <a
          href={tabHref("#selected-work", $page.url.pathname)}
          on:click={() => (open = false)}
        >
          Work
        </a>
      </li>
      <li>
        <a
          href="{base}/blog"
          aria-current={isBlog ? "page" : undefined}
          on:click={() => (open = false)}
        >
          Blog
        </a>
      </li>
      <li>
        <a
          href="{base}/gallery"
          aria-current={isGallery ? "page" : undefined}
          on:click={() => (open = false)}
        >
          Gallery
        </a>
      </li>
      <li>
        <!-- Opens the PDF rather than downloading it: a recruiter skims
             first and keeps it only if interested. -->
        <a
          href="{base}/{heroConfig.resume}"
          target="_blank"
          rel="noreferrer noopener"
          on:click={() => trackResume("header")}
        >
          Résumé
        </a>
      </li>
      <li>
        <a
          href={email}
          on:click={() => trackEmail("header")}
        >
          Email
        </a>
      </li>
    </ul>
    <span class="theme-slot">
      <ThemeSwitch id="theme-toggle" />
    </span>
  </nav>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    width: 100%;
    max-width: var(--content-max);
    margin: 0 auto;
    padding: var(--space-4);
  }

  .logo {
    display: flex;
    align-items: center;
    min-height: 44px;
    border-radius: var(--radius-sm);
  }

  /* Her signature in the page's ink, sized as a logo. */
  .logo :global(.signature) {
    width: 4.75rem;
    background-color: var(--ink);
    opacity: 1;
  }

  nav {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-5);
  }

  .menu-button {
    min-height: 44px;
    padding: 0 0.9rem;
    border: var(--border-w) solid var(--ink);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .links {
    display: none;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* On a phone the open menu drops under the button as a paper card. */
  .links.open {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 60;
    display: flex;
    flex-direction: column;
    min-width: 12rem;
    padding: var(--space-2);
    background: var(--surface);
    border: var(--border-w) solid var(--border-strong);
    border-radius: var(--radius-md);
  }

  .links a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0 var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: var(--border);
    text-underline-offset: 5px;
  }

  .links a:hover,
  .links a[aria-current="page"] {
    text-decoration-color: var(--brush);
  }

  /* The theme switch sits in the footer on a phone. */
  .theme-slot {
    display: none;
  }

  @media (min-width: 768px) {
    .header {
      padding: var(--space-5) var(--space-6);
    }

    .logo :global(.signature) {
      width: 5.5rem;
    }

    .menu-button {
      display: none;
    }

    .links,
    .links.open {
      position: static;
      display: flex;
      flex-direction: row;
      gap: var(--space-2);
      min-width: 0;
      padding: 0;
      background: none;
      border: 0;
    }

    .links a {
      padding: 0 var(--space-2);
    }

    .theme-slot {
      display: block;
    }
  }
</style>
