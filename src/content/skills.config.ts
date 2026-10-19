// The one place a skill is named: the résumé's Skills section, in its four
// headings, in print order. The site lists no skills of its own; each job
// and project shows its stack beside the work (DESIGN.md).

export type Skill = { name: string };
export type SkillBucket = { label: string; items: Skill[] };

export const skillBuckets: SkillBucket[] = [
  {
    label: "Frontend & UI",
    // Order is evidence, then value to a reader: the two things every posting
    // scans for, the framework, then the judgment terms (the only
    // entries here that are not a dependency), then libraries. Redux and
    // SvelteKit sit last for opposite reasons: Redux is production work that
    // is no longer current, SvelteKit is current but backed by side projects.
    items: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Design systems" },
      // Site only from 2026-09-16, with MUI below. "UI patterns" names
      // nothing a posting screens for or an interviewer asks about, and it
      // cannot be falsified, which is the kind of phrase the rest of the CV
      // avoids. "Responsive & accessible" is a baseline expectation, and
      // claiming it as a skill faintly implies it is optional; the repo runs
      // an axe audit on every build, which is better evidence than the words.
      // Both are off the CV, and the site no longer lists skills at all.
      //
      // The trade, stated so it is a decision and not an oversight: each term
      // removed is one an ATS keyword filter cannot match, and "responsive"
      // and "accessible" do appear in job descriptions. The bet is that a
      // human reading a tight list beats a filter matching a long one.
      { name: "TanStack Query" },
      { name: "Zustand" },
      { name: "Tailwind CSS" },
      { name: "Redux" },
      { name: "SvelteKit" },
    ],
  },
  {
    label: "Backend & Data",
    items: [
      { name: "FastAPI" },
      { name: "Python" },
      { name: "Node.js" },
      { name: "Postgres" },
      { name: "ArangoDB (document + graph)" },
      { name: "Supabase" },
      { name: "RabbitMQ" },
      { name: "SQLite" },
    ],
  },
  {
    label: "Infra & Quality",
    items: [
      { name: "Docker" },
      { name: "CI/CD" },
      { name: "GitHub Actions" },
      { name: "GHCR" },
      { name: "AWS" },
      { name: "Vitest" },
      { name: "React Testing Library" },
      { name: "pytest" },
      // Claude Code left the CV on 2026-09-16: it read as padding in a list
      // of things configured or written against, and screens nobody out.
    ],
  },
];

/** Bold-label markdown lines for the résumé's Skills section. */
export function resumeSkillLines(): string {
  return skillBuckets
    .map((bucket) => ({
      label: bucket.label,
      items: bucket.items.map((i) => i.name),
    }))
    .map((bucket) => `**${bucket.label}**: ${bucket.items.join(" · ")}  `)
    .join("\n");
}
