<section
  id="about"
  class="section_padding section_layout min-h-[500px]"
>
  <h3 class="section_title">#about</h3>

  <div class="about-grid">
    <p class="about-copy">
      Full-stack engineer experienced in building production systems end-to-end across frontend,
      backend, infrastructure, and deployment. Interested in local-first software, privacy-first
      tools, and thoughtful product design. Currently developing Cosmora, an offline-first salon
      operating system for independent stylists.
    </p>

    <div class="tag-cloud" aria-label="Core focus tags">
      <span>Product Builder</span>
      <span>Local-First Software</span>
      <span>Privacy-First Tools</span>
      <span>End-to-End Delivery</span>
      <span>Modular Monolith</span>
      <span>Electron / Tauri</span>
      <span>Cosmora</span>
    </div>
  </div>
</section>

<style>
  .about-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 0.8rem 1rem;
  }

  .about-copy {
    margin: 0;
    max-width: 66ch;
    font-size: 1.01rem;
    line-height: 1.72;
    color: var(--text-color);
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0.5rem;
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
