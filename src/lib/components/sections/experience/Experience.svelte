<script lang="ts">
  import { experience } from "$lib/resumeData";

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const renderInlineBold = (value: string) =>
    escapeHtml(value).replace(
      /\*\*\s*([^*][\s\S]*?)\s*\*\*/g,
      "<strong>$1</strong>"
    );
</script>

<section
  id="work"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#work</h3>
  <div class="experience-list">
    {#each experience as item}
      <article class="experience-card">
        <p class="experience-dates">{item.date}</p>
        <p class="experience-role">{@html renderInlineBold(item.role)}</p>

        <h4 class="experience-company">{item.company}</h4>
        <ul class="impact-list">
          {#each item.highlights as impact}
            <li>{@html renderInlineBold(impact)}</li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>
</section>

<style>
  .experience-list {
    display: grid;
    gap: 1rem;
    width: 100%;
  }

  .experience-card {
    padding: 1.25rem 1.25rem 1.1rem;
    border-left: 2px solid var(--timeline-rule);
  }

  .experience-role {
    margin: 0;
    color: var(--text-color);
    font-weight: 600;
    font-size: 1.02rem;
  }

  .experience-company {
    margin: 0.18rem 0 0;
    color: var(--text-muted);
    font-style: italic;
  }

  .experience-dates {
    margin: 0.3rem 0 0;
    font-size: 0.83rem;
    color: var(--text-muted);
    font-family: "JetBrains Mono", monospace;
  }

  .impact-list {
    margin: 0.65rem 0 0;
    padding-left: 1rem;
    list-style: disc;
    color: var(--text-color);
    line-height: 1.55;
    display: grid;
    gap: 0.2rem;
  }

  .impact-list li::marker {
    font-size: 0.72em;
  }

  .impact-list li {
    padding-left: 0.35rem;
  }

  .experience-role :global(strong),
  .impact-list :global(strong) {
    font-weight: 700;
    color: var(--text-color);
  }
</style>
