// The one place a skill is named.
//
// Skills used to be written twice: a markdown line in resume.md for the PDF,
// and skillsConfig in portfolio.config.ts for the site. Editing one changed
// one surface, silently. The note in buildResume.ts records the symptom
// ("the PDF changed, the site did not"), and the two lists had already drifted:
// the site omitted SvelteKit while being built with it.
//
// So: `skillBuckets` is the source and matches the PDF's four headings, in
// print order, because that is the constrained artefact: one page, and the
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
      // Both stay on the site, where siteGroups picks them by name.
      //
      // The trade, stated so it is a decision and not an oversight: each term
      // removed is one an ATS keyword filter cannot match, and "responsive"
      // and "accessible" do appear in job descriptions. The bet is that a
      // human reading a tight list beats a filter matching a long one.
      { name: "UI patterns", on: "site" },
      { name: "Responsive & accessible", on: "site" },
      { name: "TanStack Query" },
      { name: "Zustand" },
      { name: "Tailwind CSS" },
      { name: "MUI", on: "site" },
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
      // Personal local tooling used while delivering work, not team
      // infrastructure. Named plainly; no tool a reader would have to look up.
      //
      // Site only from 2026-09-16. On the CV it sat in a line of things
      // configured or written against (Docker, GHCR, pytest) and was the one
      // entry that was an editor, which made the list read as padded. It is
      // also table stakes now, so it screens nobody out, and a minority of
      // reviewers read it as a question about working without it. On the site
      // it keeps the company it earns: Skills, Hooks and Plugins, which are
      // things built rather than used. Not deleted: siteGroups picks it by
      // name, and an unknown name throws at import.
      { name: "Claude Code", on: "site" },
      { name: "Skills", on: "site" },
      { name: "Hooks", on: "site" },
      { name: "Plugins", on: "site" },
    ],
  },
  {
    // Site only from 2026-09-19. The category cost a line on a page that had
    // none, and it is the one bucket where the CV would have been claiming
    // depth it cannot defend in an interview: Flutter and Dart come from
    // Financial Runway and Tauri from a side project. The frameworks are
    // still visible where they have context, in the Runway and SPIN entries,
    // and on the site, which has room to say what was built with them.
    label: "Mobile & Desktop",
    items: [
      { name: "Flutter", on: "site" },
      { name: "Dart", on: "site" },
      { name: "Riverpod", on: "site" },
      { name: "Tauri", on: "site" },
      { name: "Electron", on: "site" },
    ],
  },
];

// The page has room to separate what one line of A4 has to run together.
export const siteGroups: SiteGroup[] = [
  {
    label: "Frontend",
    pick: ["React", "TypeScript", "Next.js", "Tailwind CSS", "SvelteKit"],
  },
  {
    label: "UI & design",
    pick: ["Design systems", "UI patterns", "Responsive & accessible"],
  },
  { label: "Mobile", pick: ["Flutter", "Dart", "Riverpod"] },
  { label: "State & data", pick: ["TanStack Query", "Zustand", "Redux"] },
  {
    label: "Backend & Data",
    pick: [
      "FastAPI",
      "Node.js",
      "Postgres",
      "ArangoDB (document + graph)",
      "RabbitMQ",
    ],
  },
  {
    label: "Infra & CI/CD",
    pick: ["Docker", "CI/CD", "GitHub Actions", "GHCR", "AWS"],
  },
  { label: "Testing", pick: ["Vitest", "React Testing Library", "pytest"] },
  {
    label: "AI & Automation",
    pick: ["Claude Code", "Skills", "Hooks", "Plugins"],
  },
];

const byName = new Map<string, Skill>();
for (const bucket of skillBuckets) {
  for (const item of bucket.items) byName.set(item.name, item);
}

// A pick that names nothing is a typo or a rename. Throwing at import turns it
// into a failed build instead of a group that quietly renders short.
const unknown = siteGroups.flatMap((g) => g.pick.filter((n) => !byName.has(n)));
if (unknown.length) {
  throw new Error(
    `skills.config: siteGroups names not in skillBuckets: ${unknown.join(", ")}`
  );
}

/** Bold-label markdown lines for the résumé's Skills section. */
export function resumeSkillLines(): string {
  return (
    skillBuckets
      .map((bucket) => ({
        label: bucket.label,
        items: bucket.items.filter((i) => i.on !== "site").map((i) => i.name),
      }))
      // A bucket whose every item is site-only has nothing to say on the CV.
      // Without this it still printed its label and a colon, costing a line of
      // a page that has none and reading as a category someone forgot to fill.
      .filter((bucket) => bucket.items.length > 0)
      .map((bucket) => `**${bucket.label}**: ${bucket.items.join(" · ")}  `)
      .join("\n")
  );
}

/** What the site's Skills section renders. */
export const skillsConfig: { label: string; items: string[] }[] =
  siteGroups.map((g) => ({
    label: g.label,
    items: g.pick.filter((n) => byName.get(n)!.on !== "resume"),
  }));
