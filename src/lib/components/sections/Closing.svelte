<script lang="ts">
  import { base } from "$app/paths";
  import { closingConfig } from "../../../content/portfolio.config";
</script>

<!-- The page ended on the skills list, so a reader who was convinced had to
     scroll back to the top to act. This is the close. -->
<section
  id="contact"
  class="section_padding"
>
  <div class="wrap">
    <h3>{closingConfig.heading}</h3>
    <p>{closingConfig.body}</p>

    <div class="actions">
      <a
        class="cta primary"
        href="mailto:{closingConfig.email}"
      >
        {closingConfig.email}
      </a>
      <a
        class="cta ghost mono"
        href="{base}/{closingConfig.resume}"
        download={closingConfig.resumeAs}
      >
        Download résumé ↓
      </a>
    </div>
  </div>
</section>

<style>
  .wrap {
    max-width: 46rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding-top: 1.6rem;
    border-top: 1px solid var(--section-border);
  }

  h3 {
    margin: 0;
    font-family: "DM Serif Display", serif;
    font-size: clamp(1.6rem, 3.4vw, 2.1rem);
    color: var(--text-color);
  }

  p {
    margin: 0;
    max-width: 52ch;
    line-height: 1.7;
    color: var(--text-muted);
  }

  .actions {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  .cta {
    padding: 0.62rem 1.1rem;
    border-radius: 999px;
    font-size: 0.82rem;
    text-decoration: none;
    border: 1px solid var(--section-border);
    transition:
      border-color 160ms ease,
      background-color 160ms ease;
  }

  .primary {
    background: var(--text-color);
    color: var(--color-bg);
    border-color: var(--text-color);
  }

  .primary:hover {
    opacity: 0.85;
  }

  .ghost {
    color: var(--text-color);
    background: var(--surface-bg);
  }

  .ghost:hover {
    border-color: var(--color-accent);
  }
</style>
