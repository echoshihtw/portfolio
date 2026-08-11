# Portfolio — echoshihtw.github.io/portfolio

My portfolio site, and the résumé pipeline behind it.

SvelteKit, statically exported to GitHub Pages. `src/content/resume.md` is the
source of truth for the résumé: one build produces the PDF people download and
the experience data the site renders, so the two cannot disagree.

**Live:** <https://echoshihtw.github.io/portfolio>

## Quick start

```bash
npm install
npm run dev            # dev server
npm run check          # svelte-check
npm test               # parser tests
npm run build          # static site → build/
npm run build-resume   # résumé → PDF + site data
```

The résumé build needs Pandoc and XeLaTeX. Without them it warns and skips the
PDF locally; in CI it fails.

```bash
brew install pandoc
brew install --cask mactex     # large; skip if you only touch the site
```

## Where content lives

| File | Holds | Feeds |
|---|---|---|
| `src/content/resume.md` | summary, experience, skills | the PDF, and the site's experience cards |
| `src/content/projects.config.ts` | projects | a card on the site; one line on the PDF if it has a `resumeLine` |
| `src/content/portfolio.config.ts` | hero, per-role copy, skills strip | the site only |

The résumé is formal and ATS-oriented; the site speaks in a human voice. Same
facts, different register — that difference is deliberate, not drift.

```
src/content/resume.md
        └── npm run build-resume
                ├── src/lib/resumeData.ts   experience — the only thing the site takes from it
                ├── output/resume.pdf       Pandoc + XeLaTeX, via scripts/resume-header.tex
                └── static/resume.pdf       what the site serves
```

**Generated, never edited by hand:** `src/lib/resumeData.ts`, `output/*`,
`static/resume.pdf`. The last two aren't committed — the deploy builds them, so
the served PDF cannot fall behind `resume.md`.

## Editing the résumé

**It must stay exactly one page.** The deploy fails if it isn't. Adding a bullet
usually means removing one, and when space runs out, take it from margins,
leading or wording — not font size.

**It must stay ATS-readable.** No tables, text boxes, columns or images;
hyphenation off; plain `# Section` headings.

**Company names join the two sources.** `portfolio.config.ts` keys its per-role
copy by company name. Rename a company in `resume.md` and the build fails,
naming both lists — that guard exists because a rename once silently blanked two
cards.

## CI

`.github/workflows/ci.yml` — one pipeline. Pull requests and pushes to `main`
run `npm ci`, `check`, `test`, the résumé build and the site build; only pushes
deploy. Doc-only changes are skipped.

The built PDF is cached against `resume.md`, `buildResume.ts` and
`resume-header.tex`, so TeX is installed only when the résumé actually changed —
about two minutes on a miss, about twenty-five seconds otherwise.

Node 24 in CI, matching local: npm 10 and 11 disagree about how optional
platform packages are recorded in the lockfile.

`main` blocks force pushes and deletion.

## A note on claims

Every factual claim on this site — usage numbers, ownership, what shipped and
what didn't — is meant to be checkable against a repository, a database or a
public record. If something here overstates, it's a bug. Open an issue.
