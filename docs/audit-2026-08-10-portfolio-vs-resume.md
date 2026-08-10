# Portfolio audit — 2026-08-10

Scope: this repo (`first_portfolio`, SvelteKit → `echoshihtw.github.io/portfolio`), audited
against `Echo_Shih_Senior_Product_Engineer_Resume (3).pdf` and the two real project repos
(`~/survival_optimizer` = Runway, `~/Documents/vivi/salon-admin` = the salon product).

Verdict up front: the site is well-built and reads cleanly. Its problem is not craft — it is
that **the claims are drifting away from the code, and the strongest evidence you have is not
on the page.** Both are fixable this week.

---

## 0. First, dismiss the codex audit

That audit targeted `/Users/echo/Documents/portfolio` — the abandoned Next.js starter (single
commit: "Initial commit from Create Next App"). It is not what's deployed.

**Do not carry these forward.** They are false for this repo: build fails, default
"Create Next App" metadata, white-on-white "Echo", broken navbar, `/projects` 404, no résumé
download, no OG tags. This site builds, deploys, has a working nav, a résumé CTA, and — as of
this session — full metadata, canonical, OG image, one `<h1>`, and labeled icon links.

What *is* worth keeping from it: the **content** asks (§3 below). Those gaps are real here.

---

## 1. Wrong right now — fix before anyone sees the site

### 1.1 One product, three names, two of them wrong 🔴

| Surface | Name | Description | Reality |
|---|---|---|---|
| Live site (`projects.config.ts`) | **Cosmora** | "multi-tenant… packaged for desktop with **Tauri**" | ❌ |
| Résumé (3) | **Clio** | "Local-first… **Tauri**, React, TypeScript, **SQLite, Rust**" | ❌ |
| Actual repo | "vivi salon admin" | React 19 + **Supabase/Postgres**, web, `clio-*` theme names | ✅ |

`src-tauri/` contains only `dmg/ gen/ target/` — build leftovers. **There is no
`tauri.conf.json`.** Tauri is gone; so is local-first/SQLite/Rust.

Why this is the most expensive item: the site links to `cosmora-lab.vercel.app`. A recruiter
clicks, sees a Supabase web app, and has caught a factual inaccuracy in your primary work
sample. Everything else on the page gets discounted after that.

**Blocked on you:** what is this product actually called now — Cosmora, Clio, or Vivi? Every
downstream fix depends on the answer.

### 1.2 The résumé the site serves is two versions old 🔴

`static/resume.pdf` was regenerated earlier this session from résumé **(1)**. You've since
given me **(3)**, which differs materially:

- Clio, not Cosmora (and no "multi-tenant")
- New Lockerbie bullet: **BFF trust boundary, HttpOnly cookies, centralised CSRF**
- New scale evidence: **~5 team members across 10 projects**
- New bullet: Claude Code skills/hooks workflow with deterministic verification
- New skill group: **AI & Automation**
- "5+ years of experience" — **dropped**
- Find Recruiter: the OpenAI/ChatGPT bullet **replaced** by employer/agency workflow delivery

The "Download résumé" button is a primary CTA serving stale content. Needs a `resume.md`
rewrite from (3) + `npm run build-resume`.

### 1.3 Claims that outrun the code 🟠

- **Runway "In-app purchases"** — RevenueCat is *scaffolded* (`feat: scaffold RevenueCat
  integration`, then a v10 API fix). Not shipped. → "One-time purchase via RevenueCat (in
  progress)". *7-language localization is verified true.*
- **Runway "CI/CD releasing signed builds to both app stores"** — the workflows exist
  (`cd.yml`, tag → TestFlight + Play internal), but the card says `href: "#"` / "Coming Soon".
  Pick a lane: either the app is on TestFlight (say so, it's strong) or the pipeline is built
  but unreleased (say *that*, it's still strong — just precise).
- **Runway is 3 months cold** (last commit 2026-05-20) while the card says "Optimizing
  cross-platform distribution & monetization". The salon product is the live one (last commit
  2026-08-06). Consider reordering so the actively-shipping project leads.
- **Find Recruiter** — the site's proof leads with the ChatGPT JD generator; résumé (3)
  deliberately cut that bullet. Which is the story you want? (Flagging, not reconciling — it
  looks like an authorial decision.)

---

## 2. True, strong, and completely invisible on the site 🟢

This is the highest-value section. Your best evidence is in the repos and none of it is on the
page. Right now the hero claims "I turn ambiguous operational problems into shipped products"
and then proves it with four one-line pairs. **The proof is thinner than the work.**

Verified, unused:

| Evidence | Where it lives | Why it's worth money |
|---|---|---|
| **BFF trust boundary; backend tokens in HttpOnly cookies; centralised CSRF enforcement** | Résumé (3), Lockerbie | The single most senior decision you've made. Site's Lockerbie proof is still only the CI-rebuild story. |
| `001_security_and_permissions.sql`, `004_rls_hardening.sql` | salon-admin/supabase/migrations | Real permission model, iterated and *hardened* — shows you revisit security, not just ship it. |
| `test:architecture` npm script; compile-time layer boundaries via separate Dart packages | salon-admin, survival_optimizer | Architecture you *enforce mechanically*. Almost nobody does this. |
| Quality gate on PRs + commit hooks (Aug 2026) | salon-admin `.github/workflows/quality.yml` | Ongoing engineering discipline, dated. |
| ~5 users, 10 projects, one of two engineers | Résumé (3) | The only scale/ownership numbers you have. Currently nowhere on the site. |
| Runway's survival model (`max(actual, budget)`, adaptive safety buffer, two-pocket investable) | survival_optimizer README | Original product thinking, not CRUD. This is the "founder" evidence. |
| Claude Code skills/hooks workflow with deterministic final verification | Résumé (3) | 2026-relevant. Says "I use AI *with* guardrails" — the exact nuance senior hiring wants. |

**PG's version of this note:** you've been optimizing the *wording* of the claim. The claim is
already fine. What's missing is the specific, checkable, slightly-boring detail that makes a
reader believe it. "Centralised CSRF enforcement at a BFF boundary" is worth more than any
adjective you could add to the hero.

---

## 3. Gaps that cost you international remote offers 🟠

Still-valid content asks from the codex audit:

1. **No UTC+8 / APAC / async-availability statement.** The site says only "Open to remote
   roles." For a Taiwan-based international search this is the *first* recruiter filter and the
   cheapest fix here. → "Taipei · UTC+8 · available for APAC hours and async-global teams."
2. **No EOR / contracting note.** International employers screen out candidates who can't be
   hired compliantly. One line removes the objection.
3. **No case-study depth.** Each project should answer six questions: what problem existed ·
   what you personally owned · which decision was *yours* · what shipped · how you verified it ·
   what outcome resulted. Currently the cards give description + 4 bullets — closer to a
   feature list than an argument.
4. **No artifact of written technical judgment.** For async remote work, evidence that you
   write well about tradeoffs *is* the interview. You have raw material (Runway's README, the
   RLS hardening migration, the BFF decision) — one short decision write-up per project would
   do it.

---

## 4. Recommended order

| # | Fix | Effort | Impact |
|---|---|---|---|
| 1 | Resolve the product name; correct the salon card (drop Tauri/local-first/multi-tenant) | S | 🔴 removes a factual error |
| 2 | Rewrite `resume.md` from (3), rebuild PDF | M | 🔴 primary CTA |
| 3 | Add UTC+8 / APAC / async + EOR line to hero | XS | 🟠 top recruiter filter |
| 4 | Add the BFF/CSRF/HttpOnly decision as Lockerbie's headline proof | S | 🟢 biggest unused asset |
| 5 | Tighten Runway claims (IAP scaffolded, release state) | S | 🟠 accuracy |
| 6 | Rewrite 3 project cards to the six-question shape, with the §2 evidence | L | 🟢 the actual portfolio |
| 7 | Add scale numbers (~5 users / 10 projects / 1 of 2 engineers) | XS | 🟢 |
| 8 | Reorder: lead with the actively-shipping project | XS | 🟠 |
| 9 | Per-project decision write-up (async-work evidence) | L | 🟢 |

Not a priority: animations, particles, more visual polish. The build, metadata, a11y, and
heading structure are already sound.

---

## 4b. Ownership corrections applied (2026-08-10)

Two claims were overstating ownership. Both corrected across site + résumé:

| Was | Now | Why |
|---|---|---|
| "Shipped the company's first AI product capabilities… OpenAI APIs" (Find Recruiter) | TypeScript migration + 100+ reusable components | Echo was junior; observed the AI work, didn't own it. |
| "**Architected** an event-driven modular monolith… RabbitMQ… ArangoDB" (Lockerbie) | "**Implemented the team's** event-driven modular-monolith architecture, **learning** RabbitMQ and ArangoDB" | Direction was the lead's preference. Echo studied it and implemented it in production. |
| Lockerbie impact: "I own… **architecture**, the Next.js frontend…" | "I build and operate… the Next.js frontend, the FastAPI backend, and the deploy pipeline" | Same reason. |

**What is genuinely Echo's at Lockerbie** — and therefore what the site should lead with:
the **Next.js App Router choice + BFF trust boundary** (HttpOnly cookies, centralised CSRF),
the **build-once / promote-by-digest** delivery pipeline, RBAC/policy access control, and the
frontend. The hero proof strip now leads with the BFF decision.

*Note: "implemented someone else's architecture, and learned two unfamiliar technologies to do
it in production" is not a weak line. It reads as someone who ships inside constraints — which
is most of the job. The weak version is claiming the design and being unable to defend the
tradeoffs when asked why RabbitMQ over alternatives.*

Also logged: the Claude Code skills/hooks workflow is **personal local tooling**, never
committed to the Lockerbie repo. It sits in the skills strip (`AI & Automation`), not in the
hero proofs — no verifiable artifact behind it. "AI Product Development" was consequently
dropped from the kicker; the shipped-AI-product claim no longer had evidence.

## 5. Open questions for you

1. **Product name** — Cosmora, Clio, or Vivi? (blocks #1, #2, #6)
2. **Runway release state** — is it on TestFlight/Play internal today, or pipeline-ready only?
3. ~~**Find Recruiter** — keep the ChatGPT/AI story?~~ **RESOLVED 2026-08-10: cut.** Echo was
   junior on it and observed rather than owned it. Removed from `portfolio.config.ts`
   (hero proof + experience card) and `resume.md`; replaced with the TypeScript-migration /
   100+ components story, which is genuinely owned. Zero `OpenAI`/`ChatGPT` references remain
   in `src/`. **Consequence:** the site's only remaining AI evidence is the Claude Code
   skills/hooks workflow from résumé (3), which isn't on the page yet — see §2.
4. **Salon product link** — keep pointing at `cosmora-lab.vercel.app`? (redirects; verify it's
   the current deployment)
