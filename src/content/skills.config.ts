// The one place a skill is named.
//
// Skills used to be written twice: a markdown line in resume.md for the PDF,
// and skillsConfig in portfolio.config.ts for the site. Editing one changed
// one surface, silently — the note in buildResume.ts records the symptom
// ("the PDF changed, the site did not"), and the two lists had already drifted:
// the site omitted SvelteKit while being built with it.
//
// So: `skillBuckets` is the source and matches the PDF's four headings, in
// print order, because that is the constrained artefact — one page, and the
// order is read by a human. `siteGroups` is a *view*: finer-grained labels for
// the page, referring to skills by name. An unknown name throws at import, so
// a rename cannot quietly blank a group the way the company join keys could.
//
// `on` marks the surfaces a skill appears on. Default is both.

export type SkillSurface = "both" | "resume" | "site";
export type Skill = { name: string; on?: SkillSurface };
export type SkillBucket = { label: string; items: Skill[] };
export type SiteGroup = { label: string; pick: string[] };

export const skillBuckets: SkillBucket[] = [
  {
    label: "Frontend & UI",
    // Order is evidence, then value to a reader: the two things every posting
    // scans for, the framework, then the judgment terms — which are the only
    // entries here that are not a dependency — then libraries. Redux and
    // SvelteKit sit last for opposite reasons: Redux is production work that
    // is no longer current, SvelteKit is current but backed by side projects.
    items: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "design systems" },
      { name: "UI patterns" },
      { name: "Responsive & accessible", on: "site" },
      { name: "TanStack Query" },
      { name: "Zustand" },
      { name: "Tailwind CSS" },
      { name: "MUI" },
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
      { name: "ArangoDB" },
      { name: "Supabase" },
      { name: "RabbitMQ" },
      { name: "SQLite" },
    ],
  },
  {
    label: "Infra & Quality",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "GHCR" },
      { name: "AWS" },
      { name: "Vitest" },
      { name: "React Testing Library" },
      { name: "pytest" },
      // Personal local tooling used while delivering work, not team
      // infrastructure. Named plainly; no tool a reader would have to look up.
      { name: "Claude Code" },
      { name: "Skills", on: "site" },
      { name: "Hooks", on: "site" },
      { name: "Plugins", on: "site" },
    ],
  },
  {
    label: "Mobile & Desktop",
    items: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Riverpod", on: "site" },
      { name: "Tauri" },
      { name: "Electron" },
    ],
  },
];

// The page has room to separate what one line of A4 has to run together.
export const siteGroups: SiteGroup[] = [
  { label: "Frontend", pick: ["React", "TypeScript", "Next.js", "Tailwind CSS", "SvelteKit"] },
  { label: "UI & design", pick: ["design systems", "UI patterns", "Responsive & accessible"] },
  { label: "Mobile", pick: ["Flutter", "Dart", "Riverpod"] },
  { label: "State & data", pick: ["TanStack Query", "Zustand", "Redux"] },
  { label: "Backend & Data", pick: ["FastAPI", "Node.js", "Postgres", "ArangoDB", "RabbitMQ"] },
  { label: "Infra & CI/CD", pick: ["Docker", "GitHub Actions", "GHCR", "AWS"] },
  { label: "Testing", pick: ["Vitest", "React Testing Library", "pytest"] },
  { label: "AI & Automation", pick: ["Claude Code", "Skills", "Hooks", "Plugins"] },
];

const byName = new Map<string, Skill>();
for (const bucket of skillBuckets) {
  for (const item of bucket.items) byName.set(item.name, item);
}

// A pick that names nothing is a typo or a rename. Throwing at import turns it
// into a failed build instead of a group that quietly renders short.
const unknown = siteGroups.flatMap((g) => g.pick.filter((n) => !byName.has(n)));
if (unknown.length) {
  throw new Error(`skills.config: siteGroups names not in skillBuckets: ${unknown.join(", ")}`);
}

/** Bold-label markdown lines for the résumé's Skills section. */
export function resumeSkillLines(): string {
  return skillBuckets
    .map((bucket) => {
      const items = bucket.items
        .filter((i) => i.on !== "site")
        .map((i) => i.name)
        .join(" · ");
      return `**${bucket.label}** — ${items}  `;
    })
    .join("\n");
}

/** What the site's Skills section renders. */
export const skillsConfig: { label: string; items: string[] }[] = siteGroups.map((g) => ({
  label: g.label,
  items: g.pick.filter((n) => byName.get(n)!.on !== "resume"),
}));
