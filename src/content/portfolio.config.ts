// Portfolio presentation copy: the distilled, human "voice" layer.
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
  support: string[];
  email: string;
  resume: string;
  seeWorkHref: string;
} = {
  // Hierarchy: kicker = who and where · headline = value delivered ·
  // support = role and capabilities. The title lives in the support line only,
  // so it isn't stated twice three lines apart.
  kicker: "Chun-Yu (Echo) Shih · Taipei, Taiwan",
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

  // States scope of responsibility as a plain fact rather than a reliability
  // claim ("people rely on" implies things never break). The signal remote
  // hiring screens hardest for is whether someone can be trusted without
  // oversight, not whether their software never fails.
  // Redesign brief, 2026-09-06: the hero has to say product
  // engineer, React and TypeScript, developer experience, and zero to one,
  // in the first screen. The headline carries the zero-to-one claim and
  // the ownership after it; the support line carries the stack and the
  // developer-experience work; the pill above carries the title.
  headline: [
    { text: "Products from " },
    { text: "0 → 1", accent: true },
    { text: ", and the part after." },
  ],

  // Ownership leads, the shape of the work follows, stack last. The
  // list of what I build is the same here and on the CV, because it answers
  // "you have no experience in our domain" and that question gets asked in
  // every screen. "Systems of record" was the accurate term and the wrong
  // register: it reads enterprise, and the startup reader this is aimed at
  // skims it. The examples were always doing the explaining, so they lead now. Stack mention matches Clio (the featured,
  // in-production project the proof line is about) rather than unrelated
  // client work, since it's the one detail here most likely to specifically
  // land with a Supabase-caliber hiring manager.
  //
  // The three verbs are each evidenced elsewhere on the page, which is the
  // only reason they earn a line: securing is Clio's RLS and the BFF
  // boundary; keeping it running is Clio in daily use since May 2025;
  // writing down what broke is the blog, and the admitted mistake in the
  // proof line directly below.
  // Two lines, not one paragraph. This was three claims fused: what the work
  // is, how it is done, and the stack. Split so a skimmer gets the first.
  //
  // "Software Engineer on" went because the title now sits in the line
  // above, where it was appearing twice. The stack sentence went because the
  // chip row directly below already carries it, more specifically: React 19,
  // Postgres RLS, offline-first sync, architecture tests, GHCR deploys are
  // what make her legible as one of these people, and a second, vaguer list
  // above them was the fourth thing to read.
  //
  // The examples still lead, which was a deliberate call: they were always
  // doing the explaining.
  support: [
    "React and TypeScript, and the tooling around them: the module template a team builds against, the release path, the tests that guard a boundary. Project platforms, applicant tracking, client histories, the software a business actually runs on.",
    "I secure it, keep it running after ship, and write down what broke.",
  ],

  // Two sentences, not a stat block: three figures in columns is a SaaS
  // landing-page pattern that invites comparison, and "entered by hand"
  // carries what a number can't. "Engineered multi-tenant from day one"
  // folds in the origin story (built for one owner, architected for scale
  // before there was pressure to) without a separate sentence. The second
  // sentence, an admitted mistake pulled from Clio's own project card,
  // is the one line here nobody else could have written.
  // One sentence. The numbers are in the first highlight and the lesson is
  // in the Clio study; this caption used to carry both, and the page said
  // each three times.
  proofLine:
    "Clio, salon software I built for one owner, has been in daily use since May 2025.",

  email: "echoshihtw@gmail.com",
  // The file is named on disk rather than renamed by a download attribute or
  // a Content-Disposition header, so it carries my name whichever way it is
  // taken: opened in a tab and saved with cmd-S, right-click-saved, or pulled
  // by an ATS. "resume.pdf" in a recruiter's downloads folder is
  // indistinguishable from every other one. /resume.pdf still redirects here,
  // for the CVs already sent out carrying that URL.
  resume: "Chun-Yu-Echo-Shih-Software-Engineer.pdf",
  seeWorkHref: "#projects",
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
  body: "The work I want is the part nobody's scoped yet. Work out what it should be, build it, then stay with it after it ships. Remote, from Taiwan.",
  email: "echoshihtw@gmail.com",
  resume: "Chun-Yu-Echo-Shih-Software-Engineer.pdf",
};

// Skills live in skills.config.ts: one list, rendered to the PDF and to the
// page. Re-exported here so the Skills component's import does not move.
export { skillsConfig } from "./skills.config.js";

// Distilled experience copy, keyed by company (matches resumeData `experience`).
// The full formal bullets stay in resume.md and show in the "details" expander.
// Each entry: one weighty impact line + one problem→solution proof + quiet tech.
// Written in résumé voice: implied subject, not "I did X" four cards running.
// These are my cards; the ownership is already established by being here.
export const experiencePortfolio: Record<
  string,
  { impact: string; proof: { p: string; s: string }; techLine: string }
> = {
  "Lockerbie Technology (Musaeum Ltd, UK group)": {
    // Scope note: the modular-monolith / RabbitMQ / ArangoDB direction was the team's,
    // set by my lead. I learned it and implemented it in production. What I chose:
    // the App Router + BFF boundary, and the deploy packaging below.
    impact:
      "An early-stage internal project-management platform (Next.js frontend, FastAPI integration), built and operated as one of two engineers. Packaged deploys into a three-file runner folder that pulls the promoted image from GHCR, so running production needs no source checkout and no dev dependencies. I brought our second engineer into the codebase through daily pairing, and we worked out the module structure together so the pattern was ours rather than mine.",
    // The constraint was my lead's: layers independent, no direct
    // browser-to-backend access. The way of meeting it was mine. No "before"
    // state to fix either: the boundary was there from the start.
    proof: {
      p: "The layers had to stay independent: no direct browser-to-backend calls.",
      s: "Chose Next.js App Router and put a BFF security boundary in front: server-managed authentication, centralised CSRF protection, no backend credentials in browser JavaScript.",
    },
    techLine:
      "Next.js · TanStack Query · FastAPI · ArangoDB · RabbitMQ · Docker · GHCR",
  },
  "SPIN.FASHION by Lablaco": {
    // Agreed title was Full Stack Engineer & Founding Partner: use it as agreed,
    // not a paraphrase. The product name is the employer's, so it stays out;
    // employer names are fine here, the things built under them are not.
    impact:
      "Full stack engineer and founding partner on the in-store desktop app, working remotely across time zones.",
    proof: {
      p: "The macOS build couldn't ship.",
      s: "Fixed code-signing, notarisation and auto-update. The desktop app shipped, and the release steps are written down.",
    },
    techLine: "React · Redux-Saga · Electron",
  },
  "Find Recruiter": {
    impact:
      "Took the frontend over on a recruiting and ATS platform used by employers, agencies and individual headhunters, on a two-engineer product team reporting to the CTO.",
    proof: {
      p: "A large production React codebase kept regressing on types.",
      s: "Migrated a large React codebase to TypeScript incrementally, while it kept shipping.",
    },
    techLine:
      "React · TypeScript · Redux-Saga · Firebase · Server-Sent Events · Google Analytics · Sentry",
  },
  "Independent / Freelance Engineering": {
    impact:
      "Full-stack product work across fintech, research, e-commerce, and creative industries. Remote, 2020–2024.",
    proof: {
      p: "A Bitcoin coin-selection research tool needed a frontend.",
      s: "Built the frontend in Next.js alongside a BDK core maintainer: UTXO coin-control, fee scenarios, selection metrics.",
    },
    techLine: "Next.js · TypeScript · BDK",
  },
};
