// Portfolio presentation copy — the distilled, human "voice" layer.
// Deliberately separate from the formal résumé in `resume.md` (which feeds the
// ATS PDF). See docs/superpowers/specs/2026-07-13-portfolio-uiux-redesign-design.md
//
// Guardrails: facts, not noise · warmth via specificity · no clichés.

type HeadlinePart = { text: string; accent?: boolean };
type Proof = { p: string; s: string };

export const heroConfig: {
  kicker: string;
  remoteOpen: string;
  headline: HeadlinePart[];
  support: string;
  capabilities: string[];
  proofsLabel: string;
  proofs: Proof[];
  email: string;
  resume: string;
  seeWorkHref: string;
} = {
  kicker: "Chun-Yu (Echo) Shih · Full-Stack Engineer",
  remoteOpen: "Open to remote roles",

  // Problem-solving spine — diagnosis + delivery + scope. No cliché.
  headline: [
    { text: "I find the " },
    { text: "real problem", accent: true },
    { text: ", and ship the fix — end to end." },
  ],

  // The differentiator, in one breath (was a 4-line list — too much reading).
  support: "From an empty repo to a shipped app — I build the whole thing.",

  // Scannable capability strip: full-spectrum in five words, not four sentences.
  capabilities: ["Web", "Mobile", "Backend", "Infra", "Product design"],

  proofsLabel: "— a few problems, solved",

  // Each marker is a problem → what I did. Chosen to show RANGE:
  // infra/CI · AI/product · mobile · remote.
  proofs: [
    {
      p: "Releases kept rebuilding the same image three times.",
      s: "I re-architected CI so a deploy builds once.",
    },
    {
      p: "A recruiting team was buried in manual work.",
      s: "I shipped ChatGPT-powered features into the product.",
    },
    {
      p: "People needed to know how long their money would last.",
      s: "I built and shipped a Flutter app to both app stores — solo.",
    },
    {
      p: "Remote since 2020.",
      s: "I work autonomously across time zones, and I write things down.",
    },
  ],

  email: "echoshihtw@gmail.com",
  resume: "resume.pdf", // served from /static, base-prefixed at render
  seeWorkHref: "#projects",
};

// Distilled experience copy, keyed by company (matches resumeData `experience`).
// The full formal bullets stay in resume.md and show in the "details" expander.
// Each entry: one weighty impact line + one problem→solution proof + quiet tech.
export const experiencePortfolio: Record<
  string,
  { impact: string; proof: { p: string; s: string }; techLine: string }
> = {
  "Lockerbie Technology": {
    impact:
      "I own our team's project-management platform end to end — architecture, the Next.js frontend, the FastAPI backend, and the deploy pipeline.",
    proof: {
      p: "Releases kept rebuilding the same image three times.",
      s: "I re-architected CI so a deploy builds once and production ships the exact image tested in staging.",
    },
    techLine: "Next.js · FastAPI · ArangoDB · RabbitMQ · Docker · GHCR",
  },
  "SPIN.FASHION by Lablaco": {
    impact:
      "Founding engineer on SPIN Connect — the in-store desktop app — working remotely across time zones.",
    proof: {
      p: "The macOS build couldn't ship.",
      s: "I fixed code-signing, notarization, and auto-update, and unblocked desktop distribution.",
    },
    techLine: "React · Redux-Saga · Electron",
  },
  "Find Recruiter (HR Tech Startup)": {
    impact:
      "I led the front end of a recruiting platform used by employers and agencies — and shipped its AI features.",
    proof: {
      p: "A recruiting team was buried in manual work.",
      s: "I built the ChatGPT-powered job-description generator and CV standardiser inside the product.",
    },
    techLine: "React · Redux-Saga · Firebase · OpenAI",
  },
  "Independent Engineering Work": {
    impact:
      "I build full-stack products across fintech, e-commerce, and research — adapting the system to the problem.",
    proof: {
      p: "Wanted to understand Bitcoin coin-selection hands-on.",
      s: "I built the Next.js frontend for a BDK demo wallet alongside a core maintainer.",
    },
    techLine: "Next.js · TypeScript · BDK",
  },
};
