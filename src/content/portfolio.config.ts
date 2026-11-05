// Portfolio presentation copy: the distilled, human "voice" layer.
// Deliberately separate from the formal résumé in `resume.md` (which feeds the
// ATS PDF).
//
// Guardrails: facts, not noise · warmth via specificity · no clichés.

// accent: the one word in her ochre.
type HeadlinePart = { text: string; accent?: boolean };

// The hero's email and the close's first door are the same door: someone
// writing from the top of the page is asking about a role. One value, read
// by both, rather than the same string typed twice and a test to keep them
// equal. Declared up here because heroConfig is defined long before
// closingConfig, so heroConfig cannot reach into it.
const ROLE_SUBJECT = "Product engineering role";
// One address and one résumé file for every door on the page.
const EMAIL = "echoshihtw@gmail.com";
// The résumé file, named for the title the site uses. The build script reads
// it from here; vercel.json redirects the old names to it.
export const RESUME = "Chun-Yu-Echo-Shih-Product-Engineer.pdf";
// The one label for the résumé link, wherever it appears.
export const RESUME_LABEL = "Résumé, PDF";

export const heroConfig: {
  remoteOpen: string[];
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
  // Her name first: the signature in the header is not readable as one.
  // A remote employer filters on the hours first, so the time zone is here;
  // the cover names the city and country, and the footer her hours.
  remoteOpen: ["Product engineer", "Remote", "UTC+8", "Available now"],

  // Things she made true, as the result for a person, not the mechanism.
  // Each is shown lower on the page: Clio's RLS, Runway's package boundaries,
  // Lockerbie's BFF.
  owns: [
    "One salon can't see another's clients",
    "A wrong import fails the build",
    "Passwords and keys stay out of the browser",
  ],

  // Her own line, from the voice interview on 2026-10-19: "I make software
  // you don't have to learn."
  headline: [
    { text: "I make software you don't have to " },
    { text: "learn.", accent: true },
  ],

  // "Web and app" and "end to end" are hers; "frontend first" keeps her own
  // answer to what she does, and the structure line is the refactor she is
  // proudest of. The line above it says product engineer.
  support: [
    "Web and app, end to end. Frontend first, and the structure under it that keeps a team consistent.",
  ],

  email: EMAIL,
  // The file is named on disk rather than renamed by a download attribute or
  // a Content-Disposition header, so it carries my name whichever way it is
  // taken: opened in a tab and saved with cmd-S, right-click-saved, or pulled
  // by an ATS. "resume.pdf" in a recruiter's downloads folder is
  // indistinguishable from every other one. /resume.pdf still redirects here,
  // for the CVs already sent out carrying that URL.
  resume: RESUME,
  emailSubject: ROLE_SUBJECT,
};

// The Contact section at the end, so a reader who is convinced does not
// have to scroll back up to act. One door (Email me) and the résumé, then
// a subject for each kind of message.
export const closingConfig = {
  lead: "I like to untangle things.",
  body: "Give me the part nobody's scoped yet and I'll work out what it should be, build it, and keep it simple enough for the next person to change.",
  email: EMAIL,
  resume: RESUME,
  // The kinds of work are the links below it, so the heading stays short.
  heading: "Available for work now",
  // One door: the first path is the main button, the rest are quiet links
  // under it. Each carries its own subject, so the inbox shows which kind of
  // message it is before it is opened.
  ways: "or email",
  // How a project with her starts, so a founder sees the first step before
  // writing. Her choice on 2026-11-05: a small paid start, not a paid call.
  projectStart:
    "Projects start with a one-week paid scoping: a plan, a first working piece, and a fixed quote for the rest.",
  paths: [
    { key: "role", label: "about a role", subject: ROLE_SUBJECT },
    { key: "contract", label: "about a contract", subject: "Contract work" },
    { key: "project", label: "about a project", subject: "Product project" },
  ],
} as const;

// Distilled experience copy, keyed by company (matches resumeData `experience`).
// The full formal bullets stay in resume.md and show in the "details" expander.
// Each entry is one short paragraph with the problem and the fix inside it,
// then the stack. Written in résumé voice: implied subject, no "I".
export const experiencePortfolio: Record<
  string,
  { story: string; techLine: string }
> = {
  "Lockerbie Technology": {
    story:
      "One of two engineers on an early-stage internal platform for the UK construction sector. Brought the other to shipping independently in two months. A backend task went from a week to two days, and a deployment from a full day to five minutes, run by someone who is not an engineer. A BFF between frontend and backend keeps every credential out of the browser.",
    techLine:
      "Next.js App Router · TanStack Query · FastAPI · ArangoDB · RabbitMQ · Docker · GHCR",
  },
  "SPIN.FASHION by Lablaco": {
    story:
      "Co-ran the team's scrum with the CTO on the in-store desktop app, remote across time zones. The macOS build couldn't ship; fixed code-signing, notarisation and auto-update, and wrote the release steps down. Built the blockchain payment checkout on a third-party provider, payment screen to API.",
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
