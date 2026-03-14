<section
  id="skills"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#skills</h3>
  <div class="skills-grid">
    <article class="skills-group">
      <h4>Frontend</h4>
      <div class="skills-tags">
        <span>React</span><span>Next.js</span><span>TypeScript</span><span>Redux</span
        ><span>Tailwind CSS</span><span>Svelte</span><span>React Native</span
        ><span>Electron</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>Backend</h4>
      <div class="skills-tags">
        <span>Python</span><span>Node.js</span><span>ArangoDB</span><span>RabbitMQ</span
        ><span>Supabase</span><span>Socket.io</span><span>Docker</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>Infrastructure</h4>
      <div class="skills-tags">
        <span>AWS</span><span>GitHub Actions</span><span>Vercel</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>AI &amp; LLMs</h4>
      <div class="skills-tags">
        <span>LangChain (JS)</span><span>OpenAI APIs</span><span>Prompt Engineering</span>
      </div>
    </article>

    <article class="skills-group">
      <h4>Architecture</h4>
      <div class="skills-tags">
        <span>Modular Monolith</span><span>Event-Driven Messaging</span><span>Offline-First</span
        ><span>REST API Design</span>
      </div>
    </article>
  </div>
</section>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    width: 100%;
    padding: 1.25rem;
  }

  .skills-group {
    border: 1px solid var(--section-border);
    padding: 1.2rem;
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
    gap: 0.6rem;
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
