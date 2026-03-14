<section
  id="about"
  class="section_padding section_layout min-h-[500px]"
>
  <h3 class="section_title">#about</h3>

  <div class="about-grid">
    <p class="about-copy">
      5+ years building production systems across SaaS, HR tech, e-commerce, and fintech.
      Currently sole engineer at a construction-industry platform — owning everything from
      architecture to deployment. Building Cosmora, an offline-first OS for salon businesses.
      Drawn to blockchain, decentralised systems, and software that lasts.
    </p>

    <div class="tag-cloud" aria-label="Core focus tags">
      <span>Modular Monolith</span>
      <span>Offline-First</span>
      <span>Graph Databases</span>
      <span>Bitcoin Ecosystem</span>
      <span>Remote-First</span>
      <span>End-to-End Ownership</span>
      <span>Cosmora</span>
    </div>
  </div>
</section>

<style>
  .about-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.25rem;
  }

  .about-copy {
    margin: 0;
    max-width: 68ch;
    font-size: 1.04rem;
    line-height: 1.9;
    color: var(--text-color);
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0.65rem;
  }

  .tag-cloud span {
    border: 1px solid var(--section-border);
    background: var(--surface-bg);
    border-radius: 999px;
    padding: 0.22rem 0.6rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  @media (min-width: 900px) {
    .about-grid {
      grid-template-columns: 3fr 2fr;
      gap: 2rem;
      align-items: start;
    }
  }
</style>
