<script lang="ts">
  type ExperienceItem = {
    company: string;
    role: string;
    dates: string;
    summary: string;
    impacts: string[];
  };

  export const experience: ExperienceItem[] = [
    {
      company: "Lockerbie Technology",
      role: "Full-Stack Engineer (Sole Engineer)",
      dates: "2024 – Present",
      summary:
        "Responsible for the full production platform across frontend, backend, infrastructure, and deployment.",
      impacts: [
        "Redesigned the system into a modular monolith with async messaging.",
        "Implemented CI/CD pipelines with GitHub Actions for safer, faster releases.",
        "Refactored graph database schema to reduce product development friction.",
      ],
    },
    {
      company: "SPIN.FASHION",
      role: "Software Engineer & Founding Partner",
      dates: "2024",
      summary:
        "Built and stabilized the shipping desktop workflow for a distributed product team.",
      impacts: [
        "Resolved a critical macOS Electron release blocker.",
        "Built a repeatable distribution workflow and improved frontend responsiveness.",
        "Led distributed sprint coordination to keep delivery on track.",
      ],
    },
    {
      company: "Find Recruiter",
      role: "Software Engineer",
      dates: "2022 – 2024",
      summary:
        "Worked across product and platform engineering to modernize the core application stack.",
      impacts: [
        "Migrated major platform areas to TypeScript and introduced a reusable React component system.",
        "Delivered an AI-powered feature using OpenAI APIs.",
        "Introduced CI/CD workflows to improve release consistency.",
      ],
    },
  ];
</script>

<section
  id="work"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#work</h3>
  <div class="experience-list">
    {#each experience as item}
      <article class="experience-card">
        <p class="experience-dates">{item.dates}</p>
        <p class="experience-role">{item.role}</p>

        <h4 class="experience-company">{item.company}</h4>
        <p class="experience-summary">{item.summary}</p>
        <ul class="impact-list">
          {#each item.impacts as impact}
            <li>{impact}</li>
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

  .experience-summary {
    margin: 0.65rem 0 0;
    color: var(--text-color);
    line-height: 1.62;
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
</style>
