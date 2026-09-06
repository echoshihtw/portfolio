// What people actually ask Echo for, and the evidence for each.
//
// The first draft of this was a capability list: refactoring, debugging,
// reusable components. Every engineer writes those, which is exactly what
// this site's standing rule says to cut, and it duplicated the skills
// section at a different altitude.
//
// Each line names the job in the reader's language and then proves it in
// hers. Nothing here is new: every `proof` is already elsewhere on the site
// or in resume.md, which is the point. A claim nobody can check is worth
// less than a smaller claim they can.
export type AskFor = {
  /** The job, as somebody with the problem would describe it. */
  need: string;
  /** What Echo actually did. Checkable against the rest of the site. */
  proof: string;
};

export const askForConfig: AskFor[] = [
  {
    need: "A codebase that keeps regressing, made safe to change again",
    proof:
      "Migrated a large production React codebase to TypeScript incrementally, while it kept shipping.",
  },
  {
    need: "A build that will not ship, shipped",
    proof:
      "Fixed code-signing, notarisation and auto-update on a macOS app that could not go out. The release steps are written down.",
  },
  {
    need: "Deciding what not to build",
    proof:
      "Clio has no booking, no payments, no inventory, no marketing. The products its owner rejected had all of it.",
  },
  {
    need: "A permission model put in before it is needed, not after",
    proof:
      "Postgres row level security, a BFF boundary with no backend credentials in the browser, and an audit of my own policies rather than trusting I got them right.",
  },
  {
    need: "Production somebody else can run",
    proof:
      "Deploys packaged into a three-file runner folder that pulls the promoted image from GHCR: no source checkout, no dev dependencies.",
  },
];
