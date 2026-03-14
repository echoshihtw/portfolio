<section
  id="focus"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#Engineering Focus</h3>
  <div class="focus-grid">
    <article class="focus-item">
      <h4>Local-First Software</h4>
      <p>
        Designing systems where user data remains under the user&apos;s control.
      </p>
    </article>

    <article class="focus-item">
      <h4>Desktop Applications</h4>
      <p>Building cross-platform desktop tools using Tauri and Electron.</p>
    </article>

    <article class="focus-item">
      <h4>System Ownership</h4>
      <p>Working across frontend, backend, infrastructure, and deployment.</p>
    </article>

    <article class="focus-item">
      <h4>Thoughtful Product Engineering</h4>
      <p>Combining technical systems with careful UX decisions.</p>
    </article>
  </div>
</section>

<style>
  .focus-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.9rem;
    width: 100%;
    padding: 0.85rem 1rem;
  }

  .focus-item {
    border: 1px solid var(--section-border);
    background: var(--surface-bg);
    padding: 1rem;
  }

  .focus-item h4 {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text-color);
  }

  .focus-item p {
    margin: 0.55rem 0 0;
    color: var(--text-muted);
    line-height: 1.58;
  }

  @media (min-width: 768px) {
    .focus-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
