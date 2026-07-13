# Portfolio UI/UX Redesign — Design Spec

**Date:** 2026-07-13
**Project:** `first_portfolio` (SvelteKit portfolio at echoshihtw.github.io/portfolio)
**Author:** Echo Shih (with Claude)

## Goal

Turn a text-dense portfolio into a **scannable, confident, evidence-first** experience that lands Echo a strong role at a company that **values engineers and is remote-first**.

The résumé content (in `src/content/resume.md`) stays intact — it feeds the ATS-friendly PDF. This redesign changes only the **web presentation layer**.

## Guiding principle

> **We speak fact, not noise.**

Concretely:
- **Simple in form, full weight in substance.** Minimal structure, but language keeps real seniority (*own, architect, end-to-end, shipped, re-architected*). Simple ≠ modest.
- **Show, don't tell.** Never claim "highly valued" or "great communicator." Demonstrate it with concrete facts and behaviors, and with restraint.
- **Scannable, with depth on demand.** Each item reads in seconds; full detail is one click (expander) or one download (PDF) away.
- **Tech stays visible.** Recruiters skim for keywords (React, FastAPI…). Never hide the stack behind a click.

### Second pillar — Warmth (the "want them in the room" test)

Equal in weight to "facts, not noise." A hiring manager decides two things: *"can they do it?"* (facts) **and** *"do I want them in the room?"* (warmth). Ruthless minimalism has a failure mode — it reads **impressive but cold.** This pillar prevents that. Warmth is conveyed through **voice, generosity, and specificity — never sentimentality:**

- **Human voice.** Copy sounds like a generous person talking, not a spec sheet. Contractions, plain speech, a little personality. "I make sure nobody's blocked waiting on me" over "Facilitates cross-functional alignment."
- **Generosity signals.** Principles are framed around *what it does for teammates* — clarity so others aren't blocked, async so nobody's left guessing. Consideration for others *is* warmth.
- **Human proof.** Ted's testimonial (a real person's words) and the closing ethos carry warmth that self-description can't.
- **The palette is an asset.** Warm parchment + gold already reads human, not cold-tech. Lean into it — soft edges, generous whitespace, no harsh pure-black.
- **Guardrails (warmth ≠ noise):** no emoji, no exclamation marks, no sentimentality, no "I'm passionate about people." If it sounds like a greeting card or a LinkedIn humble-brag, cut it. Warmth through *specificity and consideration*, not adjectives.

The two pillars together: **competent enough to hire, human enough to want.**

**Humanizing elements ("a human, not a robot"):**
- **Photo (Echo's call).** A warm, real photo is the single strongest "human" signal for a remote hire — a face people can picture in the room. Pending Echo's comfort.
- **A genuine personal thread.** Echo's real arc — a self-taught engineer who came from a **BA in Italian Language & Culture** and grew fast (corroborated in Ted's letter) — is specific, human, and quietly impressive. Surface it lightly and in his own voice, only with his OK.
- **Rule:** never invent warmth for him. Manufactured warmth *is* the robotic failure. Every human note must be true and his.

**Voice & humor (calibrated):**
Echo is genuinely funny and fun to work with — but *"I have a great sense of humor"* is the least funny sentence in English (banned, like all self-claims). Humor is **shown through dry wit, sparingly:**
- **Dominant tone stays confident-professional.** Humor is seasoning — ~2–3 light touches on the whole page, not a joke per line. Credibility earns the right to be funny.
- **Safe zones:** closing ethos, footer/contact, a 404 / empty state, a light aside in the about line. **Off-limits (stay straight):** experience proofs, the testimonial, the problem-solving spine.
- **The gift:** the true career pivot — **Italian Literature → software engineer** — is inherently charming; a dry line about it does the work without trying.
- **Must be Echo's humor, in his voice.** Draft options for him to keep/veto. A borrowed joke is worse than none — never ship a line he wouldn't say.
- Sample directions (for Echo to approve/replace): a wry one-liner on the lit-to-code pivot; a self-aware 404; a warm sign-off with a touch of Italian.

### Voice guardrail — no clichés

The values below (curiosity, growth, trust, communication) are precisely the ones that collapse into cliché when stated. **Banned vocabulary** (do not appear anywhere on the page): *passionate, lifelong learner, always learning, eager to learn, think outside the box, growth mindset, driven, results-oriented, team player, wear many hats, love to explore/adventure, seeking opportunities, self-starter, detail-oriented.*

**The rule:** replace every virtue word with a concrete fact that forces the reader to conclude the virtue themselves.
- ❌ "Always learning and passionate about innovation" → ✅ `Currently: CS50 cybersecurity track · RevenueCat cross-platform distribution`
- ❌ "Great communicator, strong team player" → ✅ "I write things down — decisions, tradeoffs, runbooks."
- ❌ "Trustworthy, results-driven" → ✅ "I flag problems early and do what I say I'll do."

If a line could appear verbatim on a stranger's résumé, it's cliché — cut it or make it specific. The closing ethos (§6) is the *only* place for a personal sentence, and it must be concrete and understated, never aspirational-poster language.

## Primary value proposition

**The single most important message: Echo finds real problems and solves them.** Everything else (ownership, trust, remote, curiosity) supports this. It is *the* thing companies pay engineers for.

But *"strong problem solver"* is a top résumé cliché (banned). So we never state it — the portfolio **demonstrates** it structurally:
- **Every experience proof line is a problem → solution.** The card's proof isn't a feature list; it's "here's what was broken, here's what I did." E.g. *"Releases rebuilt the same image three times — I re-architected CI to build once."* / *"The macOS app couldn't ship — I fixed signing & notarization."*
- **The hero headline centers diagnosis + fix** (find the *real* problem, then ship the fix) — see §1.
- **Projects `Now:` lines** frame current work as a problem being solved.

The reader should finish the page thinking "this person diagnoses what's actually wrong and ships the fix" — without ever reading the words "problem solver."

## Audience-driven decisions

Target = remote-first, engineer-valuing companies. They screen for ownership, communication, trust, and autonomy. The design surfaces these as **facts**, not adjectives:
- Ownership → experience cards lead with "I own X end-to-end."
- Communication → a **Work Principles & Values** section that proves the value with behaviors.
- Momentum → a `Now:` line on active projects (current RevenueCat work on Runway).
- Availability → a quiet "Open to remote" cue + frictionless résumé download and email.

### Trust is the primary message (and is never asserted)

The strongest signal Echo wants to land is: **"you can trust me."** Trust cannot be claimed — asserting it backfires. It is *inferred* from evidence. The design earns it four ways, none of them a slogan:

1. **The portfolio's own honesty.** Every claim is accurate to the code (we corrected the résumé's overstatements). A portfolio that doesn't oversell is itself proof of integrity — the medium is the message.
2. **Work Principles & Values leads with Trust** — behavior, not adjective: *"I flag problems early and do what I say I'll do."*
3. **Reliability facts in Experience** — concrete markers of dependability, e.g. the SPIN release **runbook adopted as the team's standard**, and end-to-end ownership of production systems.
4. **Social proof — we have it.** A reference letter from **Ted Kuo, CTO & Co-Founder of Find Recruiter (Echo's direct manager, 2022–2024)** exists at `Documents/xxx/Work/Reference Letter/`. A pull-quote goes on the page (§Testimonial). Crucially, it independently corroborates the **problem-identification** value prop — *"consistently asked the right questions… pointed out shortcomings and gone above and beyond."* Someone else saying it >> Echo saying it.
   - **Privacy:** the letter contains Ted's personal email & phone. Those must **NOT** be published on the public site. Use name + title + quote only; offer "reference available on request."

### Curiosity & continuous learning (shown as evidence)

Echo is a learner and explorer — "we know so little; I'm always willing to adventure, grow, and seek what's possible." Conveyed through fact, not a mission statement:
- **`Currently exploring:` line** — a concrete, honest "what I'm learning right now" (mirrors the `Now:` momentum device).
- **Certifications as proof** — CS50 Cybersecurity (in progress), Data Science & AI with Python, LangChain — evidence he keeps leveling up.
- **Domain range** — projects span fintech, Bitcoin, personal finance, salon ops, HR — breadth signals curiosity.
- **A short closing ethos** in Echo's own voice near the footer (see §6) — the one place a genuine, human sentence is welcome, kept brief and real.

---

## Visual system (reuse what exists)

Keep the current brand — it already reads premium:
- **Palette** (from `src/app.css`): parchment `--color-bg #f7f5f0`, ink `#1a1a1a`, muted `#5b584f`, gold accent `--color-accent #c8a97e`, dark project cards. Light/dark theme via `data-theme` already works — **all new components must support both.**
- **Type:** DM Serif Display (headings), DM Sans (body), JetBrains Mono (labels/meta/tech).
- **Accent usage:** gold for the timeline rail, small labels, links, and the `Now:` marker. Used sparingly.

No new fonts or colors. New work reuses these tokens.

---

## Section-by-section

Target page order:

1. **Hero** (redesign)
2. **Work Principles & Values** (new)
3. **Experience** (redesign)
4. **Testimonial** (new — Ted Kuo pull-quote)
5. **Projects** (redesign)
6. **Skills & Currently Exploring** (condense existing `learning`)
7. **Footer / Contact** (résumé download repeated + email + closing ethos)

Existing sections `intro`, `EngineeringFocus`, `learning` are **folded in** (see below) — fewer sections, less noise.

### 1. Hero — "Hero A" (declarative)

- Kicker (mono): `Chun-Yu (Echo) Shih · Full-Stack Engineer`
- Quiet **"Open to remote roles"** pill (green dot) top-right.
- **Headline** (serif, ~34px), centered on diagnosis + delivery: *"I find the real problem, and ship the fix — end to end."*
- **Support line** (keeps the stack visible): *"Full-stack engineer — React · TypeScript · FastAPI, from architecture to the deploy pipeline."*
- **Evidence markers** (old `EngineeringFocus` content, distilled — at least two framed as problem→solution):
  - Re-architected releases so a deploy stopped rebuilding the same image three times
  - Shipped ChatGPT-powered features into a live recruiting product
  - Took a Flutter app to the App Store & Play Store — solo
  - Works autonomously, remote, across time zones — since 2020
- **Actions:** `Download résumé ↓` (primary, dark button) · `See the work →` (ghost) · `echoshihtw@gmail.com` (text link).
- Absorbs the old `intro` section — no separate intro block.

### 2. Work Principles & Values (new) — `// principles`

Echo's stated principles — the spine of the portfolio and the primary culture-fit signal. Each is a **named principle + a concrete behavior that proves it** (never a cliché; see Voice guardrail). Lead: *"Remote since 2020 — here's how I actually work."* Principle set (final wording is Echo's to adjust):

- **Ownership** — "I take a thing end-to-end — architecture to the deploy that ships it — and I stay on the hook for what happens after."
- **Trust** — "I flag problems early and do what I say I'll do."
- **Clarity** — "I write things down — decisions, tradeoffs, runbooks — so nobody's blocked waiting on me."
- **Strong opinions, loosely held** — "The best idea wins. It doesn't need to be mine."
- **Learn by building** — "I pick things up by shipping them — Rust, local-first apps, a Bitcoin wallet UI alongside a BDK maintainer."
- **Async by default** — "I over-communicate across time zones, so nobody's left guessing."

Keep to ~5–6 — restraint is part of the message. The `Learn by building` principle is where curiosity/growth lives (concrete, no "always learning" cliché).

### 3. Experience (redesign) — timeline + editorial cards

Vertical **timeline rail** (gold gradient line + dots) linking roles chronologically. Each role card:
- Role (serif) + mono meta (`Company · Location · dates`)
- **One weighty impact sentence** (plain, senior verbs)
- **One concrete proof** line (muted), framed as **problem → what I did** — the un-fakeable detail (e.g., *"releases rebuilt the same image three times — I made it build once"*)
- **Quiet tech line** (mono, ~5 items) — stays visible
- **`Read the details ↓`** — expander revealing the **full résumé bullets** in place
- No metric chips (deliberately cut as ornament).

### 4. Testimonial (social proof)

One pull-quote band, placed right after Experience so a manager's endorsement lands while the work is fresh. One per page (restraint).
- **Quote (faithful excerpt):** *"Echo consistently asked the right questions… pointed out shortcomings and went above and beyond to ensure our products excel in both function and design. I have no hesitation in recommending her."*
- **Attribution:** Ted Kuo · CTO & Co-Founder, Find Recruiter · Echo's direct manager (2022–2024)
- **No email/phone published.** Optional line: "Full reference available on request."
- Styling: serif quote, gold quote-mark, quiet attribution. Reinforces trust + the problem-identification value prop.

### 5. Projects (redesign) — same language

Replace the current accordion styling with cards in the new language:
- Name (serif) + status pill (`Live` / `In progress` / `Archived`)
- One-line subtitle · platform
- One plain impact line
- Optional **`Now:`** block (gold left-border) for active work — **Runway** carries *"Optimizing cross-platform distribution & monetization with RevenueCat (iOS + Android)."*
- Tech line + `See the work →` / `Details ↓`
- **Runway** and **Cosmora** are flagship (accent border). Content comes from `src/content/projects.config.ts` (already corrected for accuracy). Project-set curation (trimming weak entries) is **out of scope here** — handled separately later.

### 6. Skills & Currently Exploring (condense `learning`)

- Skills: the current multi-category list stays but is condensed visually — grouped, quiet mono pills, not a dominating wall.
- **`Currently exploring:`** one honest line of what Echo is learning now (concrete, no "always learning" cliché).
- Certifications (CS50 Cybersecurity in progress, etc.) shrink to a small evidence line here — proof of curiosity, not a big section.

### 7. Footer / Contact

- **Warm invitation CTA** (not just "download"): *"Building something interesting? I'd like to hear about it."* + email — a conversation, not a transaction (closes the "want to work *with* you" gap).
- `Download résumé ↓` + email + GitHub + LinkedIn.
- **Closing ethos:** one short, concrete, understated personal sentence in Echo's voice (the only place a personal line is allowed; must pass the Voice guardrail — no aspirational-poster language). Final wording is Echo's.

### Final decisions (PG/Jobs)

- **Testimonial = quote A** (keeps "pointed out shortcomings" — the problem-identification proof).
- **Warmth:** add the closing line + invitation CTA only; do **not** pad the principles.
- **Ship discipline:** design is locked. Build the real page and iterate on reality — no further mockup refinement.

---

## Data & architecture

**Two distinct copies exist and must not be conflated:**
- **Résumé copy** (`src/content/resume.md` → `resumeData.ts` `experience[].highlights`) — formal, ATS bullets. Feeds the PDF and the experience **expander**.
- **Portfolio copy** — the distilled, punchy voice (impact line, proof, tech line, hero, how-i-work, `Now:`). This is presentation, not résumé content.

**Decision:** add a new **`src/content/portfolio.config.ts`** holding the portfolio copy, keyed to roles/projects by a stable key. This keeps `resume.md` as the formal source of truth (no portfolio voice leaking into the PDF) while giving the components their distilled copy. Shape (illustrative):

```ts
export const heroConfig = { kicker, headline, markers: string[], remoteOpen: true };
export const howIWork = [{ label, behavior }, ...];
export const experiencePortfolio: Record<string /*companyKey*/, {
  impact: string; proof: string; techLine: string;
}>;
// projects already covered by projects.config.ts (+ optional `now?: string`)
```

Components render portfolio copy by default and pull the matching role's `highlights` from `resumeData` for the expander. Roles are matched by a stable `companyKey`.

> **Drift risk & mitigation:** two copies can diverge. Mitigation: the expander always shows the résumé bullets (single source), and `portfolio.config.ts` sits next to `resume.md` with a comment pointing at it. Accept the small maintenance cost in exchange for keeping the formal PDF clean.

### Résumé download

- The pipeline already generates `output/resume.pdf`. Add a build step so it lands where adapter-static serves it: **`static/resume.pdf`** → served at `/portfolio/resume.pdf`.
- Wire the hero + footer buttons to that path (respecting the `/portfolio` base).
- **Known issue:** the PDF currently drops emoji glyphs (📧/🔗) in XeLaTeX — replace those with text labels in the résumé header so the downloadable PDF is clean. (Small résumé-source tweak.)

### Progressive disclosure

Expander = Svelte local state, an accessible `<button>` with `aria-expanded`, revealing the role's `highlights` inline with a smooth height/opacity transition. No modal.

### Components touched

- `sections/hero/*` — rebuild as Hero A (absorbs `intro`).
- `sections/experience/*` — timeline + cards + expander.
- `sections/projects/ProjectAccordion.svelte` — new card language + `Now:` + status.
- **New** `sections/how-i-work/*`.
- `sections/EngineeringFocus.svelte` — content moves into hero markers; component removed or repurposed.
- `sections/learning/*` — condensed into Skills/footer.
- `Main.svelte` — new section order.
- `src/content/portfolio.config.ts` — **new**.
- `scripts/buildResume.ts` or a copy step — emit `static/resume.pdf`.

### Responsive & theme

- Mobile: single column; timeline rail collapses gracefully; hero type scales down; proof grid → one column.
- Every new component styled for **both** light and dark (`data-theme`).

---

## Out of scope

- Rewriting résumé content (done separately; stays formal).
- Trimming the project set (Digital Chaos / Crypto Ticker) — deferred cleanup.
- New color/font systems.
- Backend/CMS — content stays file-based.

## Success criteria

- A visitor grasps "senior, ships end-to-end, remote-ready" within ~5 seconds, above the fold.
- No wall of bullets on first read; full detail reachable via expander or PDF.
- Tech keywords visible without interaction.
- Résumé downloads in one click from hero and footer.
- Light and dark both correct; mobile clean.
- Reads as **fact, not noise** throughout.
