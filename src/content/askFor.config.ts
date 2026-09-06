// What people ask Echo for, written as services: the thing you would hire
// her to do, then the proof she has done it.
//
// The first draft of this was a capability list: refactoring, debugging,
// reusable components. Every engineer writes those, which is exactly what
// this site's standing rule says to cut, and it duplicated the skills
// section at a different altitude.
//
// Rewritten 2026-09-06 from the files rather than from memory. Every proof
// below is traceable to resume.md, projects.config.ts, the experience copy
// in portfolio.config.ts, or a published post. Nothing here is new, which
// is the point: a claim nobody can check is worth less than a smaller claim
// they can. The draft post stays out until it is published.
export type AskFor = {
  /** The service, as somebody who needs it would name it. */
  need: string;
  /** What Echo actually did. Checkable against the rest of the site. */
  proof: string;
};

export const askForConfig: AskFor[] = [
  {
    // Clio: projects.config.ts, résumé project block.
    need: "A first version, built and put in front of real users",
    proof:
      "Clio, built for one salon owner and engineered multi-tenant from day one. In daily use since May 2025, with 603 clients and 2,694 service records entered by hand. No booking, no payments, no inventory, no marketing. The products she rejected had all of it.",
  },
  {
    // Lockerbie and Find Recruiter: resume.md.
    need: "A frontend one person owns, in React and TypeScript",
    proof:
      "Sole author of the Next.js frontend on an internal project platform, one of two engineers. Before that, took over a recruiting platform's React frontend on a two-engineer team and migrated it to TypeScript incrementally, while it kept shipping.",
  },
  {
    // Lockerbie BFF and authorisation model: resume.md. Clio RLS and the
    // policy audit: projects.config.ts.
    need: "A security boundary put in before it is needed",
    proof:
      "A BFF in front of the backend, with server-managed authentication, centralised CSRF protection and no credentials in browser JavaScript. Organisation and project roles resolved into capability flags, so no service reimplements access. On Clio, Postgres row level security and an audit of my own policies.",
  },
  {
    // Lockerbie deploy packaging: resume.md. SPIN.FASHION release steps:
    // experience copy.
    need: "Production somebody else can run",
    proof:
      "Deploys packaged into a three-file runner folder that pulls the promoted image from GHCR. No source checkout and no dev dependencies, an 80 MB download instead of a build. The release steps for the macOS app are written down.",
  },
  {
    // SPIN.FASHION: resume.md. release-please: the published post.
    need: "A release that will not ship, shipped",
    proof:
      "Cleared macOS code-signing, notarisation and auto-update on an Electron app that could not go out. Traced a release pipeline crash to the tool's own internal model rather than its configuration, and switched to the release type that never had that assumption.",
  },
  {
    // RabbitMQ bug: resume.md. Architecture test: projects.config.ts.
    need: "The bug the tests missed, found and kept out",
    proof:
      "A stale RabbitMQ consumer was failing every user's first login. Diagnosed it and fixed it with a fail-fast check before broker registration. On Clio, only the api layer may reach the database, and a test fails the build if anything else imports it.",
  },
];
