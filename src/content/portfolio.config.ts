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
  /** The subject a recruiter's message arrives with, so intent is visible
      before the message is opened. The close's two doors set their own. */
  emailSubject: string;
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

  // The examples lead. The list of what I build is the same here and on
  // the CV, because it answers "you have no experience in our domain" and
  // that question gets asked in every screen. "Systems of record" was the
  // accurate term and the wrong register: it reads enterprise, and the
  // startup reader this is aimed at skims it. The examples were always
  // doing the explaining, so they go first, and the tooling underneath
  // them second, in the order the résumé summary uses.
  //
  // No stack in the sentence. The chip row directly below carries it,
  // more specifically: React 19, Postgres RLS, offline-first sync,
  // architecture tests, GHCR deploys are what make her legible as one of
  // these people, and "React and TypeScript" above them was the same
  // thing said vaguer, and the first five words on the page. It had crept
  // back after being cut once for the same reason; cut again 2026-09-07.
  // "Actually" went with it: "the software a business actually runs on"
  // argues against an objection nobody raised. The résumé summary still
  // has the word; that is Echo's call.
  //
  // Two sentences, not one paragraph. This was three claims fused: what
  // the work is, how it is done, and the stack. Split so a skimmer gets
  // the first.
  //
  // The three verbs in the second line are each evidenced elsewhere on
  // the page, which is the only reason they earn a line: securing is
  // Clio's RLS and the BFF boundary; keeping it running is Clio in daily
  // use since May 2025; writing down what broke is the blog, and the
  // admitted mistake in the Clio study.
  support: [
    "Project platforms, applicant tracking, client histories: the software a business runs on. Underneath it, the module template a team builds against, the release path, and the tests that guard a boundary.",
    "I secure it, keep it running after ship, and write down what broke.",
  ],

  // The caption under the hero figure. The figure is a drawing, and a
  // drawing labelled "proof" is a claim it cannot make, so the caption
  // opens by saying what it is. Then the proof, in two sentences: a product
  // decision, and what the user did. The redesign had cut this down to two
  // dates; the earlier line's "entered by hand" came back on 2026-09-07
  // because it is the one fact here that is the user's verdict rather than
  // Echo's claim, and "the two minutes" is the decision that says she
  // builds for how someone feels without saying so. Not a stat block:
  // figures in columns invite comparison, and "by hand" carries what a
  // number can't. No dates: the figure already labels September 2024 and
  // May 2025. The counts and the lesson stay in the Clio study.
  proofLine:
    "A sketch, not a chart. Clio covers the two minutes before a client sits down, and stops. The owner typed a year of appointments in by hand.",

  email: "echoshihtw@gmail.com",
  // The file is named on disk rather than renamed by a download attribute or
  // a Content-Disposition header, so it carries my name whichever way it is
  // taken: opened in a tab and saved with cmd-S, right-click-saved, or pulled
  // by an ATS. "resume.pdf" in a recruiter's downloads folder is
  // indistinguishable from every other one. /resume.pdf still redirects here,
  // for the CVs already sent out carrying that URL.
  resume: "Chun-Yu-Echo-Shih-Software-Engineer.pdf",
  emailSubject: "Product engineering role",
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
      subject: "Product engineering role",
      secondary: { label: "Download résumé", resume: true },
    },
    {
      key: "project",
      kicker: "Contract, or founding partner",
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
    //
    // That sharing of credit belongs here and in the résumé's RabbitMQ
    // bullet, which says the direction was the team's. It used to end this
    // paragraph too: "we worked out the module structure together so the
    // pattern was ours rather than mine", cut 2026-09-11. It was a claim
    // about who gets the credit rather than about what happened, and it took
    // back the fact in front of it.
    //
    // The card shows this paragraph and the proof always, and the résumé
    // bullets in the expander, so anything said in both is said twice to
    // the same reader. The stack went for that reason: the tech line below
    // is three words away.
    //
    // Bringing a second engineer up is the leadership evidence on this
    // card, so it stays here in the visible half rather than only in bullet
    // five, where a reader who does not expand would never find it. The two
    // now take different angles: this one is how it was done, pairing on
    // the conventions and the review flow before feature work; the bullet
    // is the pipeline, with the outcome. "Pairing along the way" appeared
    // word for word in both and now appears in neither.
    //
    // Opens on the verb, 2026-09-11. The heading above already says
    // Lockerbie and "Internal Platform", so the old opening spent its first
    // eight words on what the reader had just read. "Built and operated"
    // is also the hero's "0 → 1, and the part after" in two words, which
    // makes the page argue one thing rather than two. The domain came back
    // with it: an "internal project-management platform" could be anyone's,
    // and the UK construction sector could not.
    impact:
      "Built and operated an early-stage internal platform for the UK construction sector, as one of two engineers. Brought our second engineer into the codebase by pairing on the conventions and the review flow before the feature work started, and two months later they were shipping independently. Packaged deploys into a three-file runner folder that pulls the promoted image from GHCR, so running production needs no source checkout and no dev dependencies.",
    // The constraint was my lead's: layers independent, no direct
    // browser-to-backend access. The way of meeting it was mine. No "before"
    // state to fix either: the boundary was there from the start.
    proof: {
      p: "The layers had to stay independent: no direct browser-to-backend calls.",
      s: "Chose Next.js App Router with a BFF security boundary in front, so no backend credential ever reaches browser JavaScript.",
    },
    techLine:
      "Next.js · TanStack Query · FastAPI · ArangoDB · RabbitMQ · Docker · GHCR",
  },
  "SPIN.FASHION by Lablaco": {
    // Agreed title was Full Stack Engineer & Founding Partner: use it as agreed,
    // not a paraphrase. The card renders it verbatim as its own heading, from
    // the role line in resume.md, so this paragraph no longer opens with it:
    // that was eight words spent on what the reader had just read, the same
    // thing the Lockerbie card was doing. The product name is the employer's,
    // so it stays out; employer names are fine here, the things built under
    // them are not. "I co-ran" lost its subject too, since the other three
    // cards imply theirs.
    impact:
      "Co-ran the team's scrum with the CTO on the in-store desktop app, working remotely across time zones.",
    proof: {
      p: "The macOS build couldn't ship.",
      s: "Fixed code-signing, notarisation and auto-update. The desktop app shipped, and the release steps are written down.",
    },
    techLine: "React · Redux-Saga · Electron",
  },
  "Find Recruiter": {
    impact:
      "Led frontend delivery on a recruiting and ATS platform used by employers, agencies and individual headhunters, on a two-engineer product team reporting to the CTO.",
    proof: {
      p: "A large production React codebase kept regressing on types.",
      s: "Migrated a large React codebase to TypeScript incrementally, while it kept shipping.",
    },
    techLine:
      "React · TypeScript · Redux-Saga · Firebase · Server-Sent Events · Google Analytics · Sentry",
  },
  "Independent / Freelance Engineering": {
    // Was "Full-stack product work across fintech, research, e-commerce, and
    // creative industries", four domains and no anchor, which the CV archive
    // note calls the weakest line on the résumé. The bullets now name two
    // real clients with dates, so this says the shape and the span and lets
    // them carry the evidence. "Creative industries" went with it: that was
    // freelance video editing, off-domain for an engineering CV. "Research"
    // went too, since the proof below calls the Bitcoin work a research tool.
    impact:
      "Shipped frontends and fixed UX for clients in fintech and e-commerce, remote, 2020 to 2024.",
    proof: {
      p: "A Bitcoin coin-selection research tool needed a frontend.",
      s: "Built the frontend in Next.js alongside a BDK core maintainer: UTXO coin-control, fee scenarios, selection metrics.",
    },
    techLine: "Next.js · TypeScript · BDK",
  },
};
