<script lang="ts">
  import Icon from "@iconify/svelte";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { tabs, tabHref } from "$lib/menuTabs";
  import { heroConfig } from "../../../content/portfolio.config";
  import {
    calendlyUrl,
    email,
    githubUrl,
    instagramUrl,
    linkedInUrl,
  } from "$lib/contactLinks";

  const year = new Date().getFullYear();
  const socials = [
    {
      name: "LinkedIn",
      label: "LinkedIn profile",
      url: linkedInUrl,
      icon: "mdi:linkedin",
    },
    {
      name: "GitHub",
      label: "GitHub profile",
      url: githubUrl,
      icon: "mdi:github",
    },
    {
      name: "Instagram",
      label: "Instagram profile",
      url: instagramUrl,
      icon: "mdi:instagram",
    },
  ];

  const sourceUrl = "https://github.com/echoshihtw/portfolio";

  function replayGate() {
    try {
      sessionStorage.removeItem("echo-gate-seen");
    } catch (_error) {
      // Ignore storage failures, the gate just won't replay.
    }
    location.reload();
  }
</script>

<footer
  id="footer"
  class="footer-wrap"
>
  <div class="footer-shell">
    <div class="footer-grid">
      <section class="footer-brand">
        <!-- Name, then the ways to reach me. No kicker above and no blurb
             below: the bottom bar already carries the location and
             timezone, and the blurb restated the hero headline. By the
             time a reader is down here they know what I do. -->
        <h2>Echo Shih</h2>

        <div class="footer-cta">
          <a
            href={email}
            class="link-cta"
          >
            Email
          </a>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer noopener"
            class="link-cta"
          >
            Book a call
            <Icon icon="mdi:arrow-top-right" />
          </a>

          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            class="link-cta"
          >
            Source
            <Icon icon="mdi:arrow-top-right" />
          </a>
        </div>
      </section>

      <nav class="footer-nav">
        <p class="footer-title mono">Navigation</p>

        <!-- Work, Projects, Skills and Contact are sections OF the home page, not
             peers of it, so they only appear while you are on it. Anywhere else
             they would be four links promising things this page does not have.
             Off the home page their slot becomes a single Home. -->
        {#if $page.route.id === "/"}
          {#each tabs as tab}
            <a href={tabHref(tab.link, $page.url.pathname)}>{tab.name}</a>
          {/each}
        {:else}
          <a href={base || "/"}>Home</a>
        {/if}
        <!-- Same split as the header: sections of this page above, places
             you go below. A gap does here what the vertical rule does in a
             horizontal row. -->
        <a
          class="footer-nav-destination"
          href="{base}/blog"
          aria-current={$page.route.id?.startsWith("/blog")
            ? "page"
            : undefined}
        >
          Blog
        </a>
        <!-- Résumé was in the header only, the one surface that scrolls
             away, so it left the page along with it. -->
        <a
          href="{base}/{heroConfig.resume}"
          target="_blank"
          rel="noreferrer noopener"
        >
          Résumé
        </a>
        <a
          class="footer-nav-destination"
          href="{base}/gallery"
          aria-current={$page.route.id === "/gallery" ? "page" : undefined}
        >
          Art Gallery
        </a>
      </nav>

      <section class="footer-socials">
        <p class="footer-title mono">Elsewhere</p>

        <div class="footer-social-row">
          {#each socials as social}
            <a
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              class="footer-social-link chip"
              aria-label={social.label}
            >
              <Icon icon={social.icon} />
            </a>
          {/each}
        </div>
      </section>
    </div>

    <div class="footer-meta">
      <div class="footer-status mono">
        <span class="status-dot"></span>
        Available for remote work · Taipei, UTC+8 · APAC hours or async
      </div>

      <p class="footer-built mono">Built with SvelteKit & TypeScript</p>

      <button
        type="button"
        class="link-cta"
        on:click={replayGate}
      >
        Replay intro card
      </button>

      <p class="mono">© {year} Echo Shih</p>
    </div>
  </div>
</footer>

<style>
  .footer-wrap {
    padding: var(--space-7) var(--space-4) var(--space-6);
    border-top: var(--border-w) solid var(--border-strong);
    background: var(--canvas);
  }

  .footer-shell {
    max-width: var(--content-max);
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  .footer-brand h2 {
    margin: 0.2rem 0 0.5rem;
    font-size: var(--text-xl);
    color: var(--ink);
  }

  /* Wide enough that the links' 48px touch targets do not overlap. */
  .footer-cta {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.6rem;
  }

  /* The three actions are .link-cta from app.css: links, not pills. The
     footer is the quiet end of the page and three bordered buttons in a row
     were the loudest thing on it. */
  .footer-title {
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.6rem;
  }

  /* Matches .mobile-tab-link in the header exactly. These are the same six
     words on the same site; rendering them here in Title Case at full
     brightness made the footer read as a different site's nav. */
  .footer-nav a {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color var(--dur-fast) ease;
  }

  .footer-nav-destination {
    margin-top: 0.85rem;
  }

  .footer-nav a:hover {
    color: var(--primary);
  }

  .footer-nav a[aria-current="page"] {
    color: var(--ink);
  }

  .footer-social-row {
    display: flex;
    gap: 0.5rem;
  }

  /* A .chip from app.css, round. */
  .footer-social-link {
    padding: 0;
    border-radius: var(--radius-pill);
  }

  .footer-meta {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: var(--border-w) solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: var(--text-xs);
    color: var(--muted);
  }

  .footer-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--text-xs);
    color: var(--muted);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--status-live);
  }

  /* A quiet utility link, not a CTA: same size/weight as the surrounding
     meta text so it doesn't compete with the actual footer actions. */
  @media (min-width: 768px) {
    .footer-wrap {
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }

    .footer-grid {
      grid-template-columns: 1.5fr 0.8fr 0.6fr;
      gap: 2rem;
    }

    .footer-meta {
      flex-direction: row;
      align-items: center;
    }
  }
</style>
