<script lang="ts">
  export const experience = [
    {
      start: "2024.12",
      end: "Now",
      title: "Software Engineer",
      location: "Taipei",
      org: "Lockerbie Technology (TW) Ltd",
      bullets: [
        "Built internal project-management dashboards with Next.js + TypeScript",
        "Delivered scalable PHP e-commerce modules",
        "Improved long-term system durability and maintainability",
      ],
    },
    {
      start: "2024.07",
      end: "2024.10",
      title: "Software Engineer & Founding Partner",
      org: "SPIN.FASHION (Circular Fashion Startup)",
      location: "Singapore · Remote",
      bullets: [
        "Streamlined Electron + React app release workflow with macOS signing/notarising",
        "Optimised front-end features with backend engineers and partners, enhancing UX",
        "Introduced agile workflows and release conventions with Notion + Figma",
      ],
    },
    {
      start: "2022.08",
      end: "2024.06",
      title: "Software Engineer",
      location: "Taipei · Hybrid",
      org: "FindRecruiter",
      bullets: [
        "Led TypeScript migration (–30% bugs, +55% maintainability)",
        "Boosted team velocity +50% by adopting GitHub Projects",
        "Delivered modular React components and integrated APIs with Redux-Saga",
      ],
    },
    {
      start: "2020",
      end: "Now",
      title: "Software Engineer",
      org: "Various Clients",
      bullets: [
        "Delivered 10+ production apps (Supabase CRM, Electron apps, ArangoDB APIs, Web3 prototypes)",
        "Bitcoin Dev Kit (BDK): built custodial wallet prototype in Next.js to visualise coin selection (UTXO logic)",
        "Crypto Price Ticker: real-time Socket.io app reducing API costs and scaling under high traffic",
      ],
    },
  ];
</script>

<section
  id="experience"
  class="m-h-[500px] section_padding section_layout"
>
  <h3 class="section_title">#experience</h3>
  <div class="w-full space-y-6">
    {#each experience as item}
      <div class="p-4 border-l-2 border-gray-300">
        <div class="text-sm text-gray-500">{item.start} – {item.end}</div>
        <h4 class="font-semibold">{item.title}</h4>
        <div class="italic text-gray-600">{item.org} - {item.location}</div>
        <ul class="list-disc list-inside mt-2 space-y-1">
          {#each item.bullets as bullet}
            <li>{bullet}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>
