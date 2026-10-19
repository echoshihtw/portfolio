// Portfolio presentation copy: the distilled, human "voice" layer.
// Deliberately separate from the formal résumé in `resume.md` (which feeds the
// ATS PDF).
//
// Guardrails: facts, not noise · warmth via specificity · no clichés.

// brush: the word the oil stroke sits under. accent: the blue full stop.
type HeadlinePart = { text: string; accent?: boolean; brush?: boolean };

// The hero's email and the close's first door are the same door: someone
// writing from the top of the page is asking about a role. One value, read
// by both, rather than the same string typed twice and a test to keep them
// equal. Declared up here because heroConfig is defined long before
// closingConfig, so heroConfig cannot reach into it.
const ROLE_SUBJECT = "Product engineering role";

export const heroConfig: {
  remoteOpen: string;
  owns: string[];
  headline: HeadlinePart[];
  support: string[];
  email: string;
  /** The subject a recruiter's message arrives with, so intent is visible
      before the message is opened. Shared with the close's first door,
      which is the same door. */
  emailSubject: string;
  resume: string;
} = {
  // Taipei-based, so the first thing an overseas recruiter needs is the time
  // zone and how far it stretches. Remote only: naming an on-site option
  // invited the wrong roles. Stated as fact rather than availability:
  // "open to" in front of it reads as asking.
  // The title leads this line now. The site never said what role it wanted:
  // a reader had to infer it from a résumé link. Adding the noun where
  // someone already looks for logistics costs no space and removes the
  // guess. "Product engineer" because it is the title these companies post
  // and because the evidence here is scoping decisions rather than a list
  // of layers; resume.md keeps the swap list for postings that literally
  // say frontend.
  remoteOpen:
    "Product engineer · UTC+8 · Remote from Taiwan · APAC hours or async",

  // Spells out what "end to end" means, layer by layer: named techniques
  // pulled from real project work, not category nouns any portfolio could
  // claim. RLS and offline-first sync are Clio's; architecture tests in CI is
  // Clio's api-layer-only test; GHCR image deploys is the Lockerbie release
  // pipeline.
  owns: [
    "React 19 UI",
    "Postgres RLS",
    "Offline-first sync",
    "Architecture tests in CI",
    "GHCR image deploys",
  ],

  // Her own line, from the voice interview on 2026-10-19: "I make software
  // you don't have to learn." The accent is the full stop, as in "Just me."
  headline: [
    { text: "I make software you don't have to " },
    { text: "learn", brush: true },
    { text: ".", accent: true },
  ],

  // "Web and app" and "end to end" are hers; "frontend first" keeps her own
  // answer to what she does, and the structure line is the refactor she is
  // proudest of. The line above it says product engineer.
  support: [
    "Web and app, end to end. Frontend first, and the structure under it that keeps a team consistent.",
  ],

  email: "echoshihtw@gmail.com",
  // The file is named on disk rather than renamed by a download attribute or
  // a Content-Disposition header, so it carries my name whichever way it is
  // taken: opened in a tab and saved with cmd-S, right-click-saved, or pulled
  // by an ATS. "resume.pdf" in a recruiter's downloads folder is
  // indistinguishable from every other one. /resume.pdf still redirects here,
  // for the CVs already sent out carrying that URL.
  resume: "Chun-Yu-Echo-Shih-Software-Engineer.pdf",
  emailSubject: ROLE_SUBJECT,
};

// The page's one call to action, at the end, so a reader who is convinced
// does not have to scroll back up to act.
//
// No heading of its own any more. This used to be a separate "Want to talk?"
// section directly after the personal one, which made the page end twice on
// two low-density blocks about the same moment. They are one section now,
// under "Just me.", and the body below does the inviting that the heading
// used to.
export const closingConfig = {
  // Rewritten 2026-09-06. The old line was "If you have a problem nobody has
  // scoped yet, and you need one person to build it and keep it running,
  // that's the work."
  //
  // Three things wrong with it. "it" pointed at "a problem", and you do not
  // build a problem. "That's the work" never said whose. And it addressed a
  // client, not an employer: "you have a problem, you need one person" is a
  // freelance pitch, which is the audience this site had before it started
  // saying product engineer.
  //
  // "Keep it running" became "stay with it after it ships". Same claim,
  // evidenced by Clio being in daily use since May 2025, without a word
  // borrowed from ops. To a client that phrase was reassurance; to a hiring
  // team it reads as being handed the pager.
  // "I like to untangle things" is Echo's own line, 2026-09-07. The rest
  // is the earlier version's facts behind it.
  body: "I like to untangle things. Give me the part nobody's scoped yet and I'll work out what it should be, build it, and stay with it after it ships. Remote, from Taiwan.",
  email: "echoshihtw@gmail.com",
  resume: "Chun-Yu-Echo-Shih-Software-Engineer.pdf",

  // The fork at the end of the page, 2026-09-09. Echo is open to a role, to
  // contract work, and to a founding-partner seat, so the close offers two
  // doors rather than one. Hiring stays first and carries the résumé.
  //
  // Two things in the design draft were cut. An intro line ("I work on
  // operational software: defining what it should hold, building it, and
  // establishing the foundations…"): a colon and a three-part list, the
  // pattern this page's own slop audit named, restating the hero. And
  // tinted illustration fields with a halftone, which would have been the
  // only marketing-shaped thing on the site.
  //
  // The second door is deliberately wider than the draft's "Build your
  // product". Contract work is as often a scoped piece on a product that
  // already exists as a product from zero, and the copy names both ends
  // with the evidence for each.
  heading: "Available for a role or a project.",
  paths: [
    {
      key: "role",
      kicker: "Employment",
      title: "Join your team",
      copy: "One engineer who owns the interface, the boundaries under it and the release path, and stays with it after it ships.",
      action: "Discuss a role",
      subject: ROLE_SUBJECT,
      secondary: { label: "Download résumé", resume: true },
    },
    {
      key: "project",
      kicker: "Contract or partnership",
      title: "Hire me for a project",
      copy: "A scoped piece of work on the product you have, something new from zero, or a founding-partner seat. Clio and SPIN.FASHION are the two ends of that range.",
      action: "Discuss a project",
      subject: "Product project",
      secondary: { label: "See the case studies", href: "#projects" },
    },
  ],
} as const;

// Skills live in skills.config.ts: one list, rendered to the PDF and to the
// page. Re-exported here so the Skills component's import does not move.
export { skillsConfig } from "./skills.config.js";

// Distilled experience copy, keyed by company (matches resumeData `experience`).
// The full formal bullets stay in resume.md and show in the "details" expander.
// Each entry is one short paragraph with the problem and the fix inside it,
// then the stack. Written in résumé voice: implied subject, no "I".
// `note` is her one handwritten aside on the page, so only one entry has it.
export const experiencePortfolio: Record<
  string,
  { story: string; note?: string; techLine: string }
> = {
  "Lockerbie Technology": {
    story:
      "Built and operated an early-stage internal platform for the UK construction sector, as one of two engineers. Brought the other to shipping independently in two months. A backend task went from a week to two days.",
    note: "a BFF between frontend and backend, so no credential reaches the browser",
    techLine:
      "Next.js App Router · TanStack Query · FastAPI · ArangoDB · RabbitMQ · Docker · GHCR",
  },
  "SPIN.FASHION by Lablaco": {
    story:
      "Co-ran the team's scrum with the CTO on the in-store desktop app, remote across time zones. The macOS build couldn't ship; fixed code-signing, notarisation and auto-update, and wrote the release steps down.",
    techLine: "React · Redux-Saga · Electron",
  },
  "Find Recruiter": {
    story:
      "Led frontend delivery on a recruiting and ATS platform, on a two-engineer team. Moved a production React codebase to TypeScript while it kept shipping.",
    techLine:
      "React · TypeScript · Redux-Saga · Firebase · Server-Sent Events · Google Analytics · Sentry",
  },
  "Independent / Freelance Engineering": {
    story:
      "Shipped frontends and fixed UX for clients in fintech and e-commerce, remote, 2020 to 2024.",
    techLine: "Next.js · TypeScript · BDK",
  },
};
