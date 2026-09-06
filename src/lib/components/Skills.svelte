<script lang="ts">
  import Icon from "@iconify/svelte";
  import { skillsConfig } from "../../content/portfolio.config";
  import { skillIcons } from "../../content/skillIcons";
  import SectionHead from "$lib/components/SectionHead.svelte";
</script>

<section
  id="skills"
  class="section_padding section_layout section_rule"
  aria-labelledby="skills-title"
>
  <SectionHead
    number="03"
    label="Toolkit"
    title="What I work with"
    id="skills-title"
  />

  <div class="body">
    <!-- A specification table: one row per layer, ruled, the label in the
         margin column. It is read by scanning, so nothing here is prose. -->
    <table class="spec">
      <tbody>
        {#each skillsConfig as group, i}
          <tr>
            <th scope="row">
              <span class="label">
                <span
                  class="idx"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {group.label}
              </span>
            </th>
            <td>
              <ul class="items">
                {#each group.items as item}
                  <li>
                    {#if skillIcons[item]}
                      <Icon
                        icon={skillIcons[item]}
                        class="skill-icon"
                        aria-hidden="true"
                      />
                    {/if}
                    {item}
                  </li>
                {/each}
              </ul>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  section {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .spec {
    width: 100%;
    border-collapse: collapse;
    border-top: var(--border-w) solid var(--border);
  }

  tr {
    border-bottom: var(--border-w) solid var(--border);
  }

  th,
  td {
    padding: var(--space-4) 0;
    vertical-align: top;
    text-align: left;
  }

  th {
    font-weight: 400;
    padding-right: var(--space-4);
    white-space: nowrap;
  }

  .label {
    display: inline-flex;
    gap: var(--space-3);
  }

  .idx {
    color: var(--primary);
  }

  .items {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.2rem;
    font-size: var(--text-sm);
    line-height: 1.5;
  }

  .items li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .items :global(.skill-icon) {
    flex: none;
    width: 0.95em;
    height: 0.95em;
    color: var(--muted);
  }

  /* Stacked on a phone: the label above its row rather than beside it. */
  @media (max-width: 639px) {
    tr {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      padding: var(--space-3) 0;
    }
    th,
    td {
      padding: var(--space-1) 0;
    }
  }

  @media (min-width: 900px) {
    .body {
      grid-template-columns: 7rem minmax(0, 1fr);
      gap: var(--space-6);
    }
    .body > * {
      grid-column: 2;
    }
    th {
      width: 14rem;
    }
  }
</style>
