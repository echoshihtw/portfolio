<section
  id="skills"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#skills</h3>
  <div class="skills-grid">
    <article class="skills-group">
      <h4>Frontend</h4>
      <div class="skills-tags">
        <span>TypeScript</span><span>React</span><span>Next.js</span><span>SvelteKit</span
        ><span>Tailwind CSS</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>Desktop &amp; Local-First</h4>
      <div class="skills-tags">
        <span>Electron</span><span>Tauri</span><span>SQLite</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>Backend &amp; Infrastructure</h4>
      <div class="skills-tags">
        <span>Python</span><span>Docker</span><span>GitHub Actions</span><span>AWS</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>Architecture</h4>
      <div class="skills-tags">
        <span>Modular Monolith</span><span>Offline-First</span><span>Privacy-First</span
        ><span>End-to-End Ownership</span>
      </div>
    </article>
  </div>
</section>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.9rem;
    width: 100%;
    padding: 0.85rem 1rem;
  }

  .skills-group {
    border: 1px solid var(--section-border);
    padding: 0.95rem;
    background: var(--surface-bg);
  }

  .skills-group h4 {
    margin: 0 0 0.75rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skills-tags span {
    border: 1px solid var(--section-border);
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
    font-family: "JetBrains Mono", monospace;
    color: var(--text-color);
    background: transparent;
  }

  @media (min-width: 768px) {
    .skills-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
