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
%
% Swap it for one build without editing this file:
%   RESUME_HEADLINE='Frontend Engineer' npm run build-resume
% Only the role changes; the stack after it is untouched. Added 2026-09-19,
% after a Frontend Engineer application went out under the general default:
% a swap that needs a file edit never happens.
{\large Product Engineer · React · TypeScript · Next.js · Postgres · Docker}\\[3pt]
% Two deliberate lines: availability first, then contacts. As one line it wrapped
% and left the portfolio URL stranded on its own.
%
% "Open to full-time or contract", not "Available now", from 2026-09-16. The old
% line was the only time-sensitive claim in a permanent public document: true in
% September, and by March the same two words read as something else, on a PDF
% with no date on it to explain the difference. It also disclosed employment
% status, which tells a recruiter there is no competing income before any
% conversation about money. This says what is wanted rather than what is the
% case, never goes stale, and matches the site, which already offers Employment
% and Contract or partnership as two paths. A start date is a question for the
% first email, where "immediately" is a good answer to give in person.
{\small\color{muted}Taipei, Taiwan (UTC+8) · Remote · APAC hours or async · Open to full-time or contract}\\[1pt]
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

Product engineer on the software a business runs on: React, TypeScript, Next.js in front; Python, Postgres, Docker behind.

Sole author of production frontends, and of the delivery path under them: the module template a team builds against, the release a non-engineer runs in five minutes, the access model no service has to reimplement.

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

The modular monolith is inside the template bullet, not beside it. It had its
own bullet claiming "seven modules" as though that were a result, which it is
not: the payoff of organising by business domain is that nobody has to work out
where code goes, and that is precisely what the template bullet measures as a
week becoming two days. Two bullets counting one improvement is a discount a
careful reader applies to both. Merged, the structure and the tooling sit in
the order they happened, and the number they earned sits at the front. Not
every bullet needs an XYZ; a fake Y is worse than none, and a duplicated one is
worse still.

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

<!-- The company line names the employer and stops. It used to read
"Lockerbie Technology (Musaeum Ltd, UK group)", which asked the reader to hold
two company names before the first bullet and helped them verify nothing: the
Companies House record for MUSAEUM LIMITED (11412164, England) does not mention
Echo, and the employing entity, 台灣洛克比科技有限公司 (UBN 93722827, Taipei,
established January 2024), is registered in Chinese with no English name. The
UK signal a reader wants is in bullet one, where it is about the work: an
early-stage platform for the UK construction sector. The legal names belong on
background-check forms, not here. -->

## Lockerbie Technology

Full-Stack Engineer, Internal Platform · _Taipei, Taiwan · Dec 2024 – Jul 2026_

- **Sole author of the Next.js / TypeScript frontend** on an early-stage internal platform for the **UK construction sector** (ISO 19650), one of two engineers. Wrote the spec and held scope to it; phase one shipped on its agreed July 2026 date.
- **A backend task went from a week to two days.** Every task used to start with an argument about where code goes. Refactored the backend into the team's **event-driven modular monolith**, seven business-domain modules over RabbitMQ, then set up the module template, the CI quality gate and a shared Postman collection.
- **A deployment went from a full day to five minutes, run by someone who is not an engineer.** It meant a non-technical stakeholder cloning the repo onto Ubuntu over SSH, fixing missing packages by hand. Replaced with a **build-once, promote-once release pipeline**: one `.env` and compose file, then `make run` pulls the image GHCR built and tagged on merge to main. Frontend and backend, staging and production.
- **Permission changes stopped being a redesign.** Scattered rules meant re-reasoning the whole flow each time. Designed one **role-to-capability map**: seven organisation-level and project-scoped roles into 26 capability flags. A new role is one entry read against the others; super-admin derives from them, so it cannot drift. Services read a flag, never the rule. Behind a **BFF security boundary**: server-managed auth, centralised CSRF, no backend credentials in the browser.
- Diagnosed a **RabbitMQ RPC bug** where a stale, uninitialised consumer round-robined into login lookups and failed every user's first attempt; fixed with a fail-fast DB check before broker registration.

## SPIN.FASHION by Lablaco

Full Stack Engineer & Founding Partner · _Singapore · Remote · Aug 2024 – Oct 2024_

- Founding partner on the in-store desktop app; co-ran the scrum with the CTO. Cleared the **macOS code-signing, notarisation and auto-update** work blocking release, shipped the Electron app, documented the release steps.

## Find Recruiter

Software Engineer · _Taipei, Taiwan · Aug 2022 – May 2024_

- Led frontend delivery on a **B2B and B2C recruitment and ATS platform** in React and Redux-Saga, two engineers under the CTO. Planned the TypeScript migration in steps so it shipped without breaking, authoring around 100 shared components.
- Wrote the **Server-Sent Events** channel the frontend consumed AI-generated drafts through.

## Independent / Freelance Engineering

<!-- "Side projects and short contracts" from 2026-09-16, in Echo's framing.
The bare span read as a full-time role competing with the three above it and
overlapping two of them, which a screener reads as carelessness or undisclosed
moonlighting. Neither is true. "Alongside full-time roles" was drafted and cut
for being imprecise in the other direction: the Bitcoin work (July to August
2023) was concurrent with Find Recruiter, but the BigCommerce work (June to
August 2024) fell after it ended and before SPIN began. The label sets the
expectation and the per-item months carry the detail. -->

Software Engineer · _Remote · 2020 – 2024 · side projects and short contracts_

- Built the Next.js frontend for a **Bitcoin coin-selection research tool** with a BDK core maintainer, July to August 2023.
- Bug fixing and UX on a **BigCommerce** storefront for Bdigital, June to August 2024, in vanilla JavaScript, HTML and CSS.

# Projects

<!-- generated from src/content/projects.config.ts: projects with a resume block -->

# Skills

<!-- generated from src/content/skills.config.ts: items marked site-only are omitted -->

# Education

<!-- The bootcamp is here to explain the pivot, not to sell anything. A reader
who sees a 2018 Italian degree and a 2022 engineering job has to invent the
bridge; one line removes the question. With four years of production work
behind it nobody is hiring for the bootcamp, which is why it gets one compact
line and no more.

It does not close the 2018 to 2020 gap, which was the reason it came up on
2026-09-18. Oct 2021 to Mar 2022 sits between the freelance work starting in
2020 and Find Recruiter in Aug 2022.

Those two years are accounted for and deliberately not printed. Echo was
working in restaurants, in customer relations. Decided on 2026-09-18: nothing
on the CV, the full story everywhere else.

The entry would cost two to three lines, because every Experience entry
renders a company line and a role line before any bullet, and this page has no
slack; it would be paid for out of Lockerbie or Clio. The risk it defends
against is small: the gap predates the engineering career entirely, the dates
run continuously from 2020, and a screener reading top-down has formed a view
long before reaching 2018. A CV that explains a gap invites more scrutiny than
one that lets the dates speak.

"Customer relations" without the restaurants was considered and rejected the
same day. It is the kind of unfalsifiable phrase this document removes
elsewhere, it contradicts the About page, which says restaurants in Echo's own
words, and it sands off the only part anyone would remember. Either the whole
fact or none of it; on the CV, none.

Where it does belong: the About page, which tells it with a point, and the
interview, where "customer relations is observing people, and I do the same
thing against systems now" is a strong answer to a question worth being asked.

Paying for the line: "on Next.js App Router" came out of the BFF bullet. The
substance is carried by the boundary, the server-managed auth and the
centralised CSRF; the site's tech line still names the router, and Skills
still names Next.js. Per Echo's rule the line was found by rephrasing first,
and only this one phrase was given up. -->

<!-- Two lines, deliberately. Merging the degree and the languages onto one
line was tried on 2026-09-16 for the one-page pass and reverted: combined they
run about 137 characters against a measure of roughly 95, so the paragraph
wrapped to two lines anyway and left a bolded "Languages" stranded mid-line.
Same height, worse reading. Shortening it enough to fit would mean dropping
"working language, all roles", which is the part a hiring reader needs. -->

CS50's Introduction to Cybersecurity, HarvardX · in progress, 2026  
Front End Development Bootcamp, Institution for Information Industry, Taoyuan · Oct 2021 – Mar 2022  
B.A. Italian Language and Culture, Fu Jen Catholic University, Taipei · 2018  
**Languages**: Mandarin, Taiwanese (native) · English (working language, all roles) · Italian
