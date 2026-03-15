<script lang="ts">
  import { summary } from "$lib/resumeData";

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
  id="summary"
  class="section_padding section_layout min-h-[300px]"
>
  <h3 class="section_title">#summary</h3>

  <p class="about-copy">{@html renderInlineBold(summary)}</p>
</section>

<style>
  .about-copy {
    margin: 0.8rem 1rem;
    max-width: 66ch;
    font-size: 1.01rem;
    line-height: 1.72;
    color: var(--text-color);
    white-space: pre-line;
  }

  .about-copy :global(strong) {
    font-weight: 700;
  }
</style>
