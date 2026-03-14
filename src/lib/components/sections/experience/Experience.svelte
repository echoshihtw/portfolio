<script lang="ts">
  type ExperienceItem = {
    start: string;
    end: string;
    title: string;
    org: string;
    location?: string;
    mode?: string;
    bullets: string[];
  };

  export const experience: ExperienceItem[] = [
    {
      start: "Dec 2024",
      end: "Present",
      title: "Full-Stack Engineer (Sole Engineer)",
      location: "Taipei",
      org: "Lockerbie Technology (TW) Ltd",
      mode: "On-site",
      bullets: [
        "Sole engineer owning Python backend, Next.js frontend, ArangoDB, Docker, and AWS",
        "Implemented 5-module modular monolith with RabbitMQ for async cross-module communication",
        "Restructured ArangoDB graph schema; automated CI/CD via GitHub Actions",
      ],
    },
    {
      start: "Aug 2024",
      end: "Oct 2024",
      title: "Software Engineer & Founding Partner",
      org: "SPIN.FASHION by Lablaco",
      location: "Remote",
      bullets: [
        "Resolved critical macOS Electron release blocker via code signing and notarisation",
        "Optimised React/TypeScript platform; led Agile delivery across distributed time zones",
      ],
    },
    {
      start: "Aug 2022",
      end: "May 2024",
      title: "Software Engineer",
      location: "Taipei",
      org: "Find Recruiter",
      mode: "Hybrid",
      bullets: [
        "Led full TypeScript migration, reducing bugs by 30% and improving maintainability by 55%",
        "Built reusable React component library; owned full lifecycle of AI-powered JD Generator",
      ],
    },
    {
      start: "2020",
      end: "Present",
      title: "Freelance Engineer",
      org: "Global Clients",
      location: "Remote",
      bullets: [
        "Bitcoin Dev Kit: custodial wallet UI in Next.js for UTXO visualisation",
        "Delivered fintech, e-commerce, and creative apps in React, TypeScript, and Supabase",
      ],
    },
  ];
</script>

<section
  id="work"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#work</h3>
  <div class="w-full space-y-7 md:space-y-8">
    {#each experience as item}
      <div class="timeline-item">
        <div class="timeline-date">{item.start} – {item.end}</div>
        <h4 class="font-semibold text-[var(--text-color)]">{item.title}</h4>
        <div class="timeline-meta">
          {item.org}
          {#if item.location}
            · {item.location}
          {/if}
          {#if item.mode}
            · {item.mode}
          {/if}
        </div>
        <ul class="list-disc list-inside mt-2 space-y-1 text-[var(--text-color)]">
          {#each item.bullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<style>
  .timeline-item {
    padding: 1.25rem 1.25rem 1.1rem;
    border-left: 2px solid var(--timeline-rule);
  }

  .timeline-date {
    font-size: 0.83rem;
    color: var(--text-muted);
    font-family: "JetBrains Mono", monospace;
    margin-bottom: 0.3rem;
  }

  .timeline-meta {
    color: var(--text-muted);
    font-style: italic;
    margin-top: 0.15rem;
    margin-bottom: 0.55rem;
  }
</style>
