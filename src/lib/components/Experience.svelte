<script lang="ts">
  import { experience } from "$lib/resumeData";
</script>

<section
  id="work"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#work</h3>

  <div class="experience-list">
    {#each experience as job}
      <article class="experience-item">
        <h4 class="experience-company">{job.company}</h4>
        <p class="experience-meta">{job.role} · {job.date}</p>
        <ul class="experience-highlights">
          {#each job.highlights as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>
</section>

<style>
  .experience-list {
    width: 100%;
    display: grid;
    gap: 1rem;
  }

  .experience-item {
    border-left: 2px solid var(--timeline-rule);
    padding: 1.1rem 1.2rem;
  }

  .experience-company {
    margin: 0;
    font-size: 1.02rem;
    color: var(--text-color);
  }

  .experience-meta {
    margin: 0.25rem 0 0;
    color: var(--text-muted);
    font-style: italic;
  }

  .experience-highlights {
    margin: 0.7rem 0 0;
    padding-left: 1rem;
    list-style: disc;
    display: grid;
    gap: 0.25rem;
    line-height: 1.55;
    color: var(--text-color);
  }
</style>
