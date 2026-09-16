```{=latex}
{\fontsize{18}{21}\selectfont\bfseries\color{ink}Chun-Yu (Echo) Shih}\\[2pt]
% Headline = professional identity, not job level. Level is settled by the role
% and the interview, so a self-assigned "Senior" only invites an argument before
% anyone has read the experience. Swap per application:
%   General / international          -> Product Engineer   (default)
%   Posting says "frontend"          -> Frontend Engineer
%   Senior vacancy                   -> Senior Product Engineer
%   Full-stack vacancy               -> Full-Stack Engineer
%   Platform / infra vacancy         -> Software Engineer, Platform & Delivery
%   Freelance / contract             -> Independent Product Engineer
{\large Product Engineer · React · TypeScript · Next.js · Postgres · Docker}\\[3pt]
% Two deliberate lines: availability first, then contacts. As one line it wrapped
% and left the portfolio URL stranded on its own.
{\small\color{muted}Taipei, Taiwan (UTC+8) · Remote · APAC hours or async · Available now}\\[1pt]
{\small\color{muted}echoshihtw@gmail.com · linkedin.com/in/echoshihtw · github.com/echoshihtw · echoshih.com}
\vspace{2pt}
```

# Summary

<!-- Written to steer the interview, not to describe the work. Echo's brief,
2026-09-16: an intro that frames and directs the interviewer to the questions
she wants asked. So every clause after the first line is an open loop, a
specific claim she has a rehearsed answer for, and the nouns that invite no
question at all are gone: "sole author of production interfaces", "auth
boundaries, permission models, event-driven modules over RabbitMQ, and the
release path". None of those facts are lost. They moved to the Lockerbie
bullets, out of the ten seconds that decide what gets asked first.

The opening line is the only one that is not bait, and it is deliberate: the
keyword filter and the six-second skim both need a role and a stack, and one
line is cheap insurance that costs the hooks nothing.

The second line names the work and lets the bullets prove it. A draft on
2026-09-16 put the two figures here instead, opening "a deployment went from a
full day to five minutes" and "a backend task went from a week to two days".
Rendered, that was the mistake: those are the bold openings of bullets two and
three, about ten lines further down the same page, so the reader met each claim
twice within a few centimetres and the summary read as padding. Checking the
copy in the files hid it, because they are different files. Check the PDF.

The figures stay in the bullets, where the before-and-after sits around them,
and the summary keeps only "five minutes", the most arresting of them, attached
to the fact a reader cannot argue with: the person running it is not an
engineer. The three clauses are still hooks, so an interviewer still asks about
the template, the release and the access model. They just no longer announce
sentences the reader is about to meet in bold.

The register is the document's, not a letter's. "On the platform I shipped this
year" was the only first person on the page, and every bullet uses the implied
subject: Owned, Set up, Designed, Diagnosed. It also went stale by January and
spent four words clearing its throat before the first fact. The diagnosis line
that followed it, "nobody could tell where code went, or what was actually on
the machine", went with it: conversational, and it sat in the most formal place
on the page, directly above Experience. It also promised one cause and then
gave two. -->

Product engineer on the software a business runs on: React, TypeScript and Next.js in front, Python, Postgres and Docker behind.

Builds the delivery path as well as the product: the module template a team builds against, the release a non-engineer runs in five minutes, the access model no service has to reimplement.

# Experience

<!-- Restructured 2026-09-16 on Echo's brief: the delivery-infrastructure work
leads, because that is the direction she is heading, and it is the half of the
job that nothing else on the CV evidences. The BFF and RBAC bullets, the two
most senior-sounding lines here, move below them.

Bullet order is the argument. Scope first so the numbers have something to be
about, then the two bullets the summary's hooks cash out into, then the
architecture, then the bug. A reader who stops after three bullets has the
whole case.

Seven bullets, not six. The BFF and the RBAC were merged into one on the first
pass and split again the same day, once the section was reviewed against the
XYZ formula Google hiring is built on: accomplished X, as measured by Y, by
doing Z. Merged, that bullet made two arguments and measured neither, and
"seven roles, 26 capability flags" only looked like a measure; it sizes the
thing built rather than naming what changed. Split, the access half gets the
before-state Echo supplied on 2026-09-16, that the rules were scattered and
every change meant stopping to re-reason the whole flow, and the BFF half gets
its constraint back.

The four principles behind the map are Echo's own brief, in her words: easy to
maintain, easy to read, simple, scalable. None of them is on the page, because
they are the four adjectives on every engineer's CV. Each one is there as
something checkable instead: one entry to add a role, read against the others,
the rule in one place with services reading a flag, and a super-admin derived
from the rest so the map grows without rotting. The design was hers, which is
why the bullet says designed; the modular-monolith and RabbitMQ direction below
it was the team lead's, and that split of credit is recorded in
portfolio.config.ts as well.

Bullet four stopped claiming a measurement in the same pass. It used to say
"seven modules" as though that were a result. The payoff of organising by
business domain is that nobody has to know where code goes, which is exactly
what bullet two already measures as a week becoming two days, so the count now
describes the structure and the number stays where it was earned. Not every
bullet needs an XYZ; a fake Y is worse than none.

The departure is not explained here, and that is deliberate. Echo supplied the
true story on 2026-09-16: a permanent contract that both sides re-scoped to a
July 2026 phase-one delivery. It was drafted into bullet one as "started on a
permanent contract; once the delivery timeline was agreed the engagement was
scoped to a July 2026 phase one", and cut the same day at Echo's prompting. It
spent the most valuable bullet on a contract term rather than on work, and
pre-answering "why did you leave" raises the question for a reader who was not
yet asking it. The reassurance is already there without the defence: the date
range shows the role ended, and holding scope until phase one shipped on the
agreed date says a planned delivery landed on plan. The re-scoping is a verbal
answer for the screen, not CV copy.

Every number here came from Echo or from the repo, none from me. A day to five
minutes and a week to two days are hers. Seven modules, seven roles and 26
capability flags were counted in src/modules/ and role_permission_map.py in
RefactoredLockerbieBackend, not estimated. Counts only, no module or role
names: the employer can be named, the product it sells cannot.

This block sits above the ## heading, not inside it: parseExperience in
scripts/buildResume.ts takes the second non-blank line of a section as the role
and the next as the date, so a comment or a second metadata line inside the
section lands in those fields and ships to the site. That is also why the
re-scoping fact is in bullet one rather than on a line of its own under the
role, which was the first draft.

The mentoring line is not here. It was folded into the template bullet on the
first pass and taken out again the same day, because the portfolio card already
states the same outcome in almost the same words, and the card shows it to
every reader while this bullet is behind an expander. The card keeps it, whole:
pairing on the conventions before feature work, and independent two months
later. This bullet does not need it either way, since a week becoming two days
is the sharper evidence that the template worked. -->

## Lockerbie Technology (Musaeum Ltd, UK group)

Full-Stack Engineer, Internal Platform · _Taipei, Taiwan · Dec 2024 – Jul 2026_

- One of two engineers on an early-stage internal platform for the **UK construction sector** (ISO 19650). Owned the Next.js / TypeScript frontend, wrote the specification the team built against, and held scope to it until phase one shipped on the agreed July 2026 date.
- **A backend task went from a week to two days.** Before there was a module template, every task opened with an argument about where code goes. Set up the template, the CI quality gate and a shared Postman collection, so modules were reused rather than re-debated and a failing build named what broke.
- **A deployment went from a full day to five minutes, run by someone who is not an engineer.** The first took a day: a non-technical stakeholder cloning the repo onto Ubuntu over SSH, resolving missing packages by hand. Replaced it with a **build-once, promote-once release pipeline** across frontend and backend, staging and production: a one-time `.env` and compose file, then `make run` pulls a tagged image from GHCR, and merging staging to main builds and tags it.
- Refactored the backend into the team's **event-driven modular monolith**: seven modules organised by business domain rather than by layer, communicating over RabbitMQ instead of importing each other, so changing part of the system does not mean holding all of it in your head.
- **Permission changes stopped being a redesign.** Access rules were scattered across the services, so every change meant re-reasoning the whole flow. Designed one **role-to-capability map** to replace them: seven organisation-level and project-scoped roles resolving into 26 capability flags. Adding a role means one entry, read against the others, and the super-admin role is derived from them so it cannot drift. A service reads a flag; it never reimplements the rule.
- Given a requirement that layers stay independent, chose Next.js App Router with a **BFF security boundary**: server-managed authentication, centralised CSRF protection, no backend credentials in browser JavaScript.
- Diagnosed a **RabbitMQ RPC bug** where a stale, uninitialised consumer round-robined into login lookups and failed every user's first attempt; fixed with a fail-fast DB check before broker registration.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Founding partner on the in-store desktop app; co-ran the team's scrum with the CTO. Cleared the **macOS code-signing, notarisation and auto-update** work blocking release, shipped the Electron app, and wrote the release steps down.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Led frontend delivery on a **B2B and B2C recruitment and ATS platform** in React and Redux-Saga, on a two-engineer team reporting to the CTO. Migrated it to TypeScript incrementally while it kept shipping, and authored around 100 of its shared components.
- Wrote the **Server-Sent Events** channel the frontend consumed AI-generated drafts through.

## Independent / Freelance Engineering

Software Engineer · _Remote · 2020 – 2024_

- Built the Next.js frontend for a **Bitcoin coin-selection research tool** with a BDK core maintainer, July to August 2023.
- Bug fixing and UX on a **BigCommerce** storefront for Bdigital, June to August 2024, in vanilla JavaScript, HTML and CSS.

# Projects

<!-- generated from src/content/projects.config.ts: projects with a resume block -->

# Skills

<!-- generated from src/content/skills.config.ts: items marked site-only are omitted -->

# Education

B.A. Italian Language and Culture, Fu Jen Catholic University, Taipei · 2018  
**Languages**: Mandarin, Taiwanese (native) · English (working language, all roles) · Italian
