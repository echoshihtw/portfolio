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
  seeking: string;
  proofStrip: { figure: string; label: string }[];
  headline: HeadlinePart[];
  support: string;
  proofsLabel: string;
  proofs: Proof[];
  email: string;
  resume: string;
  seeWorkHref: string;
} = {
  // Hierarchy: kicker = who and where · headline = value delivered ·
  // support = role and capabilities. The title lives in the support line only,
  // so it isn't stated twice three lines apart.
  kicker: "Chun-Yu (Echo) Shih · Taipei, Taiwan",
  // Taipei-based, so the first thing an overseas recruiter needs is the time
  // zone and how far it stretches. "Open to remote roles" left them guessing.
  // Logistics, not intent. `seeking` below states what a company gets, not
  // what I want — an offer reads stronger than an appetite, and "Senior" would
  // be a level I assigned myself rather than one the work argues for.
  remoteOpen: "UTC+8 · open to remote — APAC hours or async",
  seeking: "I take ambiguous problems and own them end to end — remote from Taiwan, or in Taipei.",

  // Problem-solving spine — diagnosis + delivery + scope. Seniority implied by
  // the range of ownership, not by putting "Senior" in the introduction.
  headline: [
    { text: "I build software " },
    { text: "people rely on", accent: true },
    { text: "." },
  ],

  // Level is established by the Lockerbie, Clio and delivery evidence further
  // down the page — not by "Senior", "AI-native" or "architect" up here.
  // The two adjectives are the two the evidence actually supports: secure
  // (BFF boundary, RLS, CSRF) and maintainable (tests, contract-tested layers).
  support:
    "Product Engineer building secure, maintainable software with React, TypeScript, FastAPI, and practical AI-assisted workflows.",


  // The strongest evidence was four steps deep, inside a project dialog. This
  // puts it where every visitor sees it, next to the claim it supports.
  proofStrip: [
    { figure: "603", label: "clients on software I built" },
    { figure: "2,694", label: "service records, daily use since May 2025" },
    { figure: "1,577", label: "commits — sole author of a production frontend" },
  ],

  proofsLabel: "— a few problems, solved",

  // Each marker is a problem → what I did. Chosen to show RANGE:
  // security/architecture · infra/CI · mobile · remote.
  // Every line must be defensible in an interview — no claim I only observed.
  // Voice: "I" for decisions I made; no subject for outcomes and standing facts.
  proofs: [
    {
      p: "The layers had to stay independent — no direct browser-to-backend calls.",
      s: "I chose Next.js App Router and a BFF boundary to get there: same-origin routes only, tokens in HttpOnly cookies, CSRF enforced in one place.",
    },
    {
      p: "Releases kept rebuilding the same image three times.",
      s: "I moved delivery to build-once, promote-by-digest. Production ships the exact image tested in staging.",
    },
    {
      p: "People needed to know how long their money would last.",
      s: "A Flutter app, built solo — Clean Architecture, encrypted local storage, seven languages. Running on Android; iOS distribution in progress.",
    },
    {
      p: "Remote since 2020.",
      s: "Autonomous across time zones. I write things down.",
    },
  ],

  email: "echoshihtw@gmail.com",
  resume: "resume.pdf", // served from /static, base-prefixed at render
  seeWorkHref: "#projects",
};

// The page used to end on the skills list, so a reader who was convinced had
// to scroll back up to act. This is the close.
export const closingConfig = {
  heading: "Want to talk?",
  body: "Open to Product Engineer opportunities — remote from Taiwan or based in Taipei. If you have an ambiguous problem and need someone to own it end to end, that is the work I am best at.",
  email: "echoshihtw@gmail.com",
  resume: "resume.pdf",
};

// Curated, portfolio-facing skills — signal over completeness (PG/Jobs).
// The full keyword list stays in resume.md for the ATS-friendly PDF.
// Buckets aligned to the "full-spectrum" story: Frontend · Mobile · Backend · Infra.
export const skillsConfig: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { label: "Mobile", items: ["Flutter", "Dart", "Riverpod"] },
  {
    label: "Backend & Data",
    items: ["FastAPI", "Node.js", "Postgres", "ArangoDB", "RabbitMQ"],
  },
  {
    label: "Infra & CI/CD",
    items: ["Docker", "GitHub Actions", "GHCR", "AWS"],
  },
  { label: "Testing", items: ["Vitest", "React Testing Library", "pytest"] },
  // Personal local tooling used while delivering work — not team infrastructure.
  // Sits in skills, not in the hero proofs: there's no shippable artifact behind it.
  { label: "AI & Automation", items: ["Claude Code", "Skills", "Hooks"] },
];

// Distilled experience copy, keyed by company (matches resumeData `experience`).
// The full formal bullets stay in resume.md and show in the "details" expander.
// Each entry: one weighty impact line + one problem→solution proof + quiet tech.
export const experiencePortfolio: Record<
  string,
  { impact: string; proof: { p: string; s: string }; techLine: string }
> = {
  "Lockerbie Technology (Musaeum Ltd, UK group)": {
    // Scope note: the modular-monolith / RabbitMQ / ArangoDB direction was the team's,
    // set by my lead. I learned it and implemented it in production. What I chose:
    // the App Router + BFF boundary, and the build-once delivery pipeline.
    impact:
      "I build and operate our team's project-management platform — the Next.js frontend, the FastAPI backend, and the deploy pipeline. In production with ~5 people across 10 projects, as one of two engineers. I paired our second engineer in from no software background; 278 commits carry us both.",
    // The constraint was my lead's — layers independent, no direct
    // browser-to-backend access. The way of meeting it was mine. No "before"
    // state to fix either: the boundary was there from the start.
    proof: {
      p: "The layers had to stay independent — no direct browser-to-backend calls.",
      s: "I chose Next.js App Router and introduced a BFF trust boundary to meet that: same-origin API routes only, backend tokens in HttpOnly cookies, CSRF enforcement centralised for unsafe requests.",
    },
    techLine: "Next.js · FastAPI · ArangoDB · RabbitMQ · Docker · GHCR",
  },
  "SPIN.FASHION by Lablaco": {
    // Agreed title was Full Stack Engineer & Founding Partner — use it as agreed,
    // not a paraphrase.
    impact:
      "Full stack engineer and founding partner on SPIN Connect — the in-store desktop app — over a three-month engagement, working remotely across time zones.",
    proof: {
      p: "The macOS build couldn't ship.",
      s: "I fixed code-signing, notarization, and auto-update. The desktop app shipped, and the release steps are written down.",
    },
    techLine: "React · Redux-Saga · Electron",
  },
  "Find Recruiter": {
    impact:
      "I led the front end of a B2B recruiting and ATS platform used by employers and agencies — a two-engineer product team reporting to the CTO.",
    proof: {
      p: "A large production React codebase kept regressing on types.",
      s: "I drove an incremental JavaScript-to-TypeScript migration and built 100+ reusable components.",
    },
    techLine: "React · TypeScript · Redux-Saga · Firebase",
  },
  "Independent / Freelance Engineering": {
    impact:
      "Full-stack product work across fintech, research, e-commerce, and creative industries — remote, since 2020.",
    proof: {
      p: "A Bitcoin coin-selection research tool needed a frontend.",
      s: "I built it in Next.js, working alongside a BDK core maintainer — UTXO coin-control, fee scenarios, selection metrics.",
    },
    techLine: "Next.js · TypeScript · BDK",
  },
};
