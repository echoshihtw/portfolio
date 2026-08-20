<script lang="ts">
  import Icon from "@iconify/svelte";
  import { tabs } from "$lib/menuTabs";
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
      // Ignore storage failures — the gate just won't replay.
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
        <p class="footer-kicker mono">Building software with care</p>
        <h2>Echo Shih</h2>

        <p class="footer-copy">
          I build product software end to end — the frontend, the services, and
          the pipeline that ships them.
        </p>

        <div class="footer-cta">
          <a
            href={email}
            class="footer-mail"
          >
            Email
          </a>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer noopener"
            class="footer-source"
          >
            Book a call
            <Icon icon="mdi:arrow-top-right" />
          </a>

          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            class="footer-source"
          >
            Source
            <Icon icon="mdi:arrow-top-right" />
          </a>
        </div>
      </section>

      <nav class="footer-nav">
        <p class="footer-title mono">Navigation</p>

        {#each tabs as tab}
          <a href={tab.link}>{tab.name}</a>
        {/each}
      </nav>

      <section class="footer-socials">
        <p class="footer-title mono">Elsewhere</p>

        <div class="footer-social-row">
          {#each socials as social}
            <a
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              class="footer-social-link"
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
        class="footer-replay mono"
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
    padding: 3rem 1.2rem 2rem;
    border-top: 1px solid var(--section-border);
    background: var(--color-bg);
  }

  .footer-shell {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  .footer-brand h2 {
    margin: 0.2rem 0 0.5rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: var(--text-color);
  }

  .footer-kicker {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .footer-copy {
    max-width: 42ch;
    color: var(--text-muted);
  }

  .footer-cta {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .footer-mail,
  .footer-source {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.42rem 0.75rem;
    text-decoration: none;
    color: var(--text-color);
    background: var(--surface-bg);
    transition:
      border-color 160ms ease,
      color 160ms ease,
      background-color 160ms ease;
  }

  .footer-source {
    color: var(--color-accent);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .footer-title {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 0.6rem;
  }

  .footer-nav a {
    display: block;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.78rem;
    letter-spacing: 0.02em;
    color: var(--text-color);
    text-decoration: none;
    margin-bottom: 0.35rem;
    transition: color 160ms ease;
  }

  .footer-nav a:hover {
    color: var(--color-accent);
  }

  .footer-social-row {
    display: flex;
    gap: 0.5rem;
  }

  .footer-social-link {
    border: 1px solid var(--section-border);
    border-radius: 0.6rem;
    padding: 0.45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    background: var(--surface-bg);
    transition:
      border-color 160ms ease,
      color 160ms ease,
      background-color 160ms ease;
  }

  .footer-mail:hover,
  .footer-source:hover,
  .footer-social-link:hover {
    border-color: var(--color-accent);
    background: var(--color-bg);
  }

  .footer-mail:hover,
  .footer-social-link:hover {
    color: var(--color-accent);
  }

  .footer-meta {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--section-border);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .footer-status {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-accent);
    box-shadow: 0 0 6px var(--color-accent);
  }

  /* A quiet utility link, not a CTA: same size/weight as the surrounding
     meta text so it doesn't compete with the actual footer actions. */
  .footer-replay {
    border: none;
    background: none;
    padding: 0;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-decoration: underline;
    text-decoration-color: var(--section-border);
    text-underline-offset: 2px;
    cursor: pointer;
    transition: color 160ms ease;
  }

  .footer-replay:hover {
    color: var(--color-accent);
  }
  @media (min-width: 768px) {
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
