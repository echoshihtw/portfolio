// Portfolio presentation copy — the distilled, human "voice" layer.
// Deliberately separate from the formal résumé in `resume.md` (which feeds the
// ATS PDF).
//
// Guardrails: facts, not noise · warmth via specificity · no clichés.

type HeadlinePart = { text: string; accent?: boolean };

export const heroConfig: {
  kicker: string;
  remoteOpen: string;
  owns: string[];
  proofLine: string;
  headline: HeadlinePart[];
  support: string;
  email: string;
  resume: string;
  resumeAs: string;
  seeWorkHref: string;
} = {
  // Hierarchy: kicker = who and where · headline = value delivered ·
  // support = role and capabilities. The title lives in the support line only,
  // so it isn't stated twice three lines apart.
  kicker: "Chun-Yu (Echo) Shih · Taipei, Taiwan",
  // Taipei-based, so the first thing an overseas recruiter needs is the time
  // zone and how far it stretches. Remote leads because remote is the ask;
  // Taipei follows as the second option, not an equal one. Stated as fact
  // rather than availability — "open to" in front of both reads as asking.
  // The full offer lives in the closing section, where it invites.
  remoteOpen: "UTC+8 · Remote from Taiwan · open to Taipei",

  // Spells out what "end to end" means, layer by layer. An earlier version
  // listed categories — Web, Mobile, Backend — which repeated the stack line
  // and proved nothing.
  owns: [
    "UI & design systems",
    "Frontend",
    "APIs & data models",
    "Tests",
    "CI/CD & deploy",
  ],

  // Problem-solving spine — diagnosis + delivery + scope. Seniority implied by
  // the range of ownership, not by putting "Senior" in the introduction.
  headline: [
    { text: "I build software " },
    { text: "people rely on", accent: true },
    { text: "." },
  ],

  // Ownership leads, stack follows. An earlier version led with the stack and
  // argued breadth — a capable-IC claim that set up none of the strongest
  // evidence, which is deciding what to build and holding scope. The seams
  // line stays here and not on the CV: it is voice, and this is the voice layer.
  support:
    "Product Engineer who owns problems end to end — working out what to build, building it, shipping it, keeping it running. I stay with a problem because the experience breaks at the seams: a slow endpoint, a failed release, an app that gives up when the Wi-Fi does. React, TypeScript and Node.js, with Python and FastAPI behind them.",

  // One sentence, not a stat block. Three figures in columns is a SaaS
  // landing-page pattern: it invites comparison, and 603 read against other
  // people's numbers looks small. Stated as a fact about a real salon it reads
  // as remarkable, and "entered by hand" carries what a number cannot.
  proofLine:
    "A salon in Tainan has run its business on software I built since May 2025 — 603 clients, 2,694 records, entered by hand.",



  email: "echoshihtw@gmail.com",
  resume: "resume.pdf", // served from /static, base-prefixed at render
  // What the file is called once it lands in someone's downloads folder, and
  // in an ATS. "resume.pdf" there is indistinguishable from every other one.
  resumeAs: "Chun-Yu-Echo-Shih-Product-Engineer.pdf",
  seeWorkHref: "#projects",
};

// The page used to end on the skills list, so a reader who was convinced had
// to scroll back up to act. This is the close.
export const closingConfig = {
  heading: "Want to talk?",
  body: "If you have a problem nobody has scoped yet, and you need one person to carry it from interface to deploy, that is the work I am best at. Remote from Taiwan, or in Taipei, and happy to travel.",
  email: "echoshihtw@gmail.com",
  resume: "resume.pdf",
  resumeAs: "Chun-Yu-Echo-Shih-Product-Engineer.pdf",
};

// Curated, portfolio-facing skills — signal over completeness (PG/Jobs).
// The full keyword list stays in resume.md for the ATS-friendly PDF.
// Buckets aligned to the "full-spectrum" story: Frontend · Mobile · Backend · Infra.
export const skillsConfig: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  // Grounded: a design_system package in Runway, a documented design system in
  // Clio, and the UI patterns I wrote for the Lockerbie frontend.
  { label: "UI & design", items: ["Design systems", "UI patterns", "Responsive & accessible"] },
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
// Written in résumé voice — implied subject, not "I did X" four cards running.
// These are my cards; the ownership is already established by being here.
export const experiencePortfolio: Record<
  string,
  { impact: string; proof: { p: string; s: string }; techLine: string }
> = {
  "Lockerbie Technology (Musaeum Ltd, UK group)": {
    // Scope note: the modular-monolith / RabbitMQ / ArangoDB direction was the team's,
    // set by my lead. I learned it and implemented it in production. What I chose:
    // the App Router + BFF boundary, and the build-once delivery pipeline.
    impact:
      "An early-stage internal project-management platform — Next.js frontend, FastAPI integration, deploy pipeline — built and operated as one of two engineers. I brought our second engineer into the codebase through daily pairing, and we worked out the module structure together so the pattern was ours rather than mine.",
    // The constraint was my lead's — layers independent, no direct
    // browser-to-backend access. The way of meeting it was mine. No "before"
    // state to fix either: the boundary was there from the start.
    proof: {
      p: "The layers had to stay independent — no direct browser-to-backend calls.",
      s: "Chose Next.js App Router and put a BFF security boundary in front: server-managed authentication, centralised CSRF protection, no backend credentials in browser JavaScript.",
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
      s: "Fixed code-signing, notarisation and auto-update. The desktop app shipped, and the release steps are written down.",
    },
    techLine: "React · Redux-Saga · Electron",
  },
  "Find Recruiter": {
    impact:
      "Front-end lead on a B2B recruiting and ATS platform used by employers and agencies — a two-engineer product team reporting to the CTO.",
    proof: {
      p: "A large production React codebase kept regressing on types.",
      s: "Drove an incremental JavaScript-to-TypeScript migration and built 100+ reusable components.",
    },
    techLine: "React · TypeScript · Redux-Saga · Firebase · Server-Sent Events",
  },
  "Independent / Freelance Engineering": {
    impact:
      "Full-stack product work across fintech, research, e-commerce, and creative industries — remote, since 2020.",
    proof: {
      p: "A Bitcoin coin-selection research tool needed a frontend.",
      s: "Built the frontend in Next.js alongside a BDK core maintainer — UTXO coin-control, fee scenarios, selection metrics.",
    },
    techLine: "Next.js · TypeScript · BDK",
  },
};
