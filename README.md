# Portfolio — echoshihtw.github.io/portfolio

My portfolio site, and the pipeline that keeps it honest.

The site is SvelteKit, statically exported and deployed to GitHub Pages. The
interesting part is the résumé: `src/content/resume.md` is the single source of
truth, and one build produces the PDF people download, the structured data the
site renders, and an HTML version. There is no second copy to drift.

**Live:** <https://echoshihtw.github.io/portfolio>

---

## Why one source

Most people keep a `resume.docx`, a PDF exported from it, portfolio copy, and a
LinkedIn summary — four documents making four slightly different claims. Fixing
one leaves the others stale, and the drift is invisible until someone reads two
of them side by side.

Here, editing `src/content/resume.md` and running one command updates every
surface at once. Anything not derived from that file is presentation copy, kept
deliberately separate in `src/content/portfolio.config.ts` — the résumé is
formal and ATS-oriented; the site speaks in a human voice. Same facts, different
register.

## Stack

SvelteKit 2 · Svelte 4 · TypeScript · Tailwind · Vite 5 ·
`adapter-static` → GitHub Pages · Pandoc + XeLaTeX for the PDF

## Quick start

```bash
npm install
npm run dev            # dev server
npm run build          # static build to build/
npm run check          # svelte-check
npm run build-resume   # regenerate résumé artefacts (see below)
```

The résumé build needs Pandoc and XeLaTeX:

```bash
brew install pandoc
brew install --cask mactex     # large; skip if you only touch the site
```

Both are optional — `buildResume.ts` warns and skips the PDF/HTML steps if
they're missing, so `npm run build-resume` still regenerates the site data.

## The résumé pipeline

```
src/content/resume.md          ← the only file you edit
        │
        └── npm run build-resume
                ├── src/lib/resumeData.ts   experience (the only thing the site reads)
                ├── output/resume.html
                ├── output/resume.pdf       Pandoc + XeLaTeX
                └── static/resume.pdf       what the site serves
```

`scripts/buildResume.ts` parses the markdown by section (`# Summary`,
`# Experience`, `# Projects`, `# Skills`), and `scripts/resume-header.tex` holds
the LaTeX layout — margins, section rules, list spacing, leading.

**Do not edit `src/lib/resumeData.ts`, `output/*`, or `static/resume.pdf`.** They
are generated. `output/` and `static/resume.pdf` are not committed at all — the
deploy builds them, which is why the served PDF cannot fall behind `resume.md`.

### Two constraints worth knowing before editing

**It must stay exactly one page.** The deploy fails if it isn't. Adding a bullet
usually means removing one. Check locally with:

```bash
npm run build-resume && mdls -raw -name kMDItemNumberOfPages output/resume.pdf
```

Spotlight caches that value, so re-run it if the number looks stale. When space
runs out, take it from margins, leading, or wording — not font size.

**It must stay ATS-readable.** No tables, no text boxes, no multi-column layout,
no images, hyphenation disabled, and plain `# Section` headings. Anything that
looks clever in a PDF viewer tends to extract badly.

### Company names are join keys

`portfolio.config.ts` keys its per-role copy by company name, matching
`resumeData.experience[].company`. Renaming a company in `resume.md` without
updating the key silently blanks that card on the site. There is no build error
for it.

## Layout

```text
src/
  content/
    resume.md               source of truth for the résumé
    portfolio.config.ts     site voice: hero, proofs, per-role copy
    projects.config.ts      project cards
  lib/
    resumeData.ts           GENERATED
    components/             sections, layout, UI
  routes/                   SvelteKit pages

scripts/
  buildResume.ts            the pipeline
  resume-header.tex         LaTeX layout for the PDF

output/                     GENERATED — resume.pdf, resume.html
static/                     resume.pdf (GENERATED), og-image.png, assets
docs/                       audits and notes
agents/, automation/        prompt and workflow notes for AI-assisted edits
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`. `.github/workflows/resume.yml` rebuilds the résumé PDF and
uploads it as a build artefact.

`main` is protected: force pushes and branch deletion are blocked.

## A note on claims

Every factual claim on this site — usage numbers, ownership, what shipped and
what didn't — is meant to be checkable against a repository, a database, or a
public record. If you find something here that overstates, it's a bug. Open an
issue.
