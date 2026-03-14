<script lang="ts">
  import Icon from "@iconify/svelte";
  import { tabs } from "$lib/menuTabs";
  import { email, githubUrl, instagramUrl, linkedInUrl } from "$lib/contactLinks";

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
        <p class="footer-copy">Building thoughtful software and calm interfaces.</p>
        <p class="footer-copy small">Currently developing Cosmora — private salon software.</p>
        <div class="footer-cta">
          <a
            href={email}
            class="footer-mail"
            aria-label="Send email"
          >
            echoshihtw@gmail.com
          </a>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            class="footer-source"
            aria-label="View portfolio source code"
          >
            Portfolio Source
            <Icon icon="mdi:arrow-top-right" />
          </a>
        </div>
      </section>

      <section class="footer-nav-wrap">
        <p class="footer-title mono">Explore</p>
        <nav
          class="footer-nav"
          aria-label="Footer navigation"
        >
          {#each tabs as tab}
            <a href={tab.link}>{tabLabel(tab.name)}</a>
          {/each}
        </nav>
        <div class="footer-socials">
          {#each socials as social}
            <a
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              class="footer-social-link"
            >
              <Icon icon={social.icon} />
              <span>{social.name}</span>
            </a>
          {/each}
        </div>
      </section>
    </div>

    <div class="footer-meta">
      <p class="mono">© {year} Echo Shih</p>
      <div class="footer-stack">
        {#each stack as item}
          <span>{item}</span>
        {/each}
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-wrap {
    position: relative;
    padding: 3rem 1.2rem 2.4rem;
    border-top: 1px solid var(--section-border);
    background:
      radial-gradient(130% 75% at 50% 0%, rgba(200, 169, 126, 0.14), transparent 58%),
      linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.02));
  }

  .footer-shell {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 1.4rem;
    border: 1px solid var(--section-border);
    background: rgba(252, 251, 247, 0.86);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.12),
      0 1px 0 rgba(255, 255, 255, 0.56) inset;
  }

  .footer-grid {
    display: grid;
    gap: 1.8rem;
    grid-template-columns: 1.35fr 1fr;
  }

  .footer-brand h2 {
    margin: 0.2rem 0 0.65rem;
    line-height: 1.1;
    font-size: clamp(1.6rem, 3.5vw, 2.35rem);
  }

  .footer-kicker {
    margin: 0;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
  }

  .footer-copy {
    margin: 0;
    max-width: 38ch;
    color: var(--text-muted);
  }

  .footer-copy.small {
    margin-top: 0.35rem;
    font-size: 0.86rem;
    max-width: 46ch;
    opacity: 0.9;
  }

  .footer-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 1.15rem;
  }

  .footer-mail,
  .footer-source {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.77rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 999px;
    border: 1px solid var(--section-border);
    padding: 0.48rem 0.78rem;
    background: rgba(255, 255, 255, 0.6);
    color: var(--text-color);
  }

  .footer-source {
    color: var(--color-accent);
  }

  .footer-title {
    margin: 0 0 0.6rem;
    color: var(--text-muted);
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
  }

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .footer-nav a {
    text-decoration: none;
    text-transform: uppercase;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.77rem;
    letter-spacing: 0.05em;
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.45rem 0.75rem;
    color: var(--text-color);
    background: rgba(255, 255, 255, 0.52);
  }

  .footer-socials {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .footer-social-link {
    text-decoration: none;
    border-radius: 0.72rem;
    border: 1px solid var(--section-border);
    padding: 0.43rem 0.6rem;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--text-color);
    background: rgba(255, 255, 255, 0.4);
  }

  .footer-social-link span {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.73rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .footer-meta {
    margin-top: 1.3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--section-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    color: var(--text-muted);
    font-size: 0.75rem;
  }

  .footer-meta p {
    margin: 0;
  }

  .footer-stack {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .footer-stack span {
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.2rem 0.54rem;
    font-size: 0.7rem;
    font-family: "JetBrains Mono", monospace;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .footer-nav a:hover,
  .footer-mail:hover,
  .footer-source:hover,
  .footer-social-link:hover {
    border-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.86);
  }

  :global(html[data-theme="dark"]) .footer-wrap {
    background:
      radial-gradient(130% 75% at 50% 0%, rgba(200, 169, 126, 0.1), transparent 58%),
      linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
  }

  :global(html[data-theme="dark"]) .footer-shell {
    background: rgba(24, 23, 21, 0.8);
    box-shadow:
      0 16px 32px rgba(0, 0, 0, 0.34),
      0 1px 0 rgba(255, 255, 255, 0.04) inset;
  }

  :global(html[data-theme="dark"]) .footer-nav a,
  :global(html[data-theme="dark"]) .footer-mail,
  :global(html[data-theme="dark"]) .footer-source,
  :global(html[data-theme="dark"]) .footer-social-link {
    background: rgba(237, 236, 232, 0.05);
  }

  :global(html[data-theme="dark"]) .footer-nav a:hover,
  :global(html[data-theme="dark"]) .footer-mail:hover,
  :global(html[data-theme="dark"]) .footer-source:hover,
  :global(html[data-theme="dark"]) .footer-social-link:hover {
    background: rgba(237, 236, 232, 0.11);
  }

  @media (max-width: 860px) {
    .footer-shell {
      padding: 1.35rem;
      border-radius: 1rem;
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .footer-brand h2 {
      margin-top: 0.15rem;
    }

    .footer-meta {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
