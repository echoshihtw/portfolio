// Highlights: six things from the work on this page, each with its proof.
//
// This section began as "what people ask me for", a list of services. The
// reframe to highlights is the same six items said as outcomes rather than
// as offers, which is the register the rest of the page is in: the work
// speaks, and nobody is selling.
//
// Rewritten 2026-09-06 from the files rather than from memory. Every proof
// below is traceable to resume.md, projects.config.ts, the experience copy
// in portfolio.config.ts, or a published post. Nothing here is new, which
// is the point: a claim nobody can check is worth less than a smaller claim
// they can. The draft post stays out until it is published.
export type Highlight = {
  /** The outcome, in a line. */
  title: string;
  /** What happened, checkable against the rest of the site. */
  proof: string;
};

export const highlightsConfig: Highlight[] = [
  {
    // Clio: projects.config.ts, résumé project block.
    title: "A first version, in front of real users",
    proof:
      "Clio, built for one salon owner and made multi-tenant from day one. In daily use since May 2025, with 603 clients and 2,694 service records the owner typed in by hand. No booking, no payments, no inventory, no marketing. The products she rejected had all of it.",
  },
  {
    // Lockerbie and Find Recruiter: resume.md.
    title: "A frontend one person owns, in React and TypeScript",
    proof:
      "Sole author of the Next.js frontend on an internal project platform, one of two engineers. Before that I took over a recruiting platform's React frontend on a two-person team and moved it to TypeScript incrementally, while it kept shipping.",
  },
  {
    // Lockerbie BFF and authorisation model: resume.md. Clio RLS and the
    // policy audit: projects.config.ts.
    title: "A security boundary put in before it was needed",
    proof:
      "A BFF in front of the backend. Authentication stays on the server, CSRF is handled in one place, and no backend credential reaches the browser. Roles resolve into capability flags, so no service reimplements access. On Clio, Postgres row level security, and I audit my own policies.",
  },
  {
    // Lockerbie deploy packaging: resume.md. SPIN.FASHION release steps:
    // experience copy.
    title: "Production somebody else can run",
    proof:
      "Deploys are a three-file runner folder that pulls the promoted image from GHCR. No source checkout, no dev dependencies, an 80 MB download instead of a build. The release steps for the macOS app are written down.",
  },
  {
    // SPIN.FASHION: resume.md. release-please: the published post.
    title: "A release that wouldn't ship, shipped",
    proof:
      "Cleared macOS code-signing, notarisation and auto-update on an Electron app that couldn't go out. Lost most of a day to a release pipeline crash that turned out to be the tool's design, not my config, and switched to a release type that never had the problem.",
  },
  {
    // RabbitMQ bug: resume.md. Architecture test: projects.config.ts.
    title: "The login bug the tests missed",
    proof:
      "A stale RabbitMQ consumer was failing every user's first login. Found it, and fixed it with a fail-fast check before the consumer registers with the broker. On Clio, only the api layer may reach the database, and a test fails the build if anything else imports it.",
  },
];
