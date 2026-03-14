<script lang="ts">
  import Icon from "@iconify/svelte";
  import { tabs } from "$lib/menuTabs";
  import {
    email,
    githubUrl,
    instagramUrl,
    linkedInUrl,
  } from "$lib/contactLinks";

  const year = new Date().getFullYear();
  const stack = ["SvelteKit", "Electron", "TypeScript", "Tailwind", "SQLite"];
  const socials = [
    { name: "LinkedIn", url: linkedInUrl, icon: "mdi:linkedin" },
    { name: "GitHub", url: githubUrl, icon: "mdi:github" },
    { name: "Instagram", url: instagramUrl, icon: "mdi:instagram" },
  ];

  const sourceUrl = "https://github.com/echoshihtw/portfolio";
  const tabLabel = (name: string) => name.replace("#", "");
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
          I design and build local-first tools and calm product experiences.
        </p>

        <div class="footer-cta">
          <a
            href={email}
            class="footer-mail"
          >
            Email
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
          <a href={tab.link}>{tabLabel(tab.name)}</a>
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
              aria-label={social.name}
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
        Available for interesting work
      </div>

      <p class="footer-built mono">Built with SvelteKit & TypeScript</p>

      <p class="mono">© {year} Echo Shih</p>
    </div>
  </div>
</footer>

<style>
  .footer-wrap {
    padding: 3rem 1.2rem 2rem;
    border-top: 1px solid var(--section-border);
  }

  .footer-shell {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 0.8fr 0.6fr;
    gap: 2rem;
  }

  .footer-brand h2 {
    margin: 0.2rem 0 0.5rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
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
    font-size: 0.9rem;
    color: var(--text-color);
    text-decoration: none;
    margin-bottom: 0.35rem;
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
  }

  .footer-meta {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--section-border);
    display: flex;
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
  @media (max-width: 900px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.6rem;
    }

    .footer-meta {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
