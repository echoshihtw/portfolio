# Portfolio: echoshihtw.github.io/portfolio

SvelteKit site on GitHub Pages. `src/content/resume.md` is the source of truth
for the résumé: one build makes the PDF and the experience data the site renders.

## Commands

```bash
npm install
npm run dev            # dev server
npm run check          # svelte-check
npm test               # parser tests
npm run build          # static site → build/
npm run build-resume   # résumé → PDF + site data
```

`build-resume` needs Pandoc and XeLaTeX: `brew install pandoc` and
`brew install --cask mactex`. Missing locally, it skips the PDF; in CI it fails.

## Content

| File                          | Holds                             | Feeds                                        |
| ----------------------------- | --------------------------------- | -------------------------------------------- |
| `content/resume.md`           | summary, experience, skills       | PDF + the site's experience cards            |
| `content/projects.config.ts`  | projects                          | site card; PDF line if it has a `resumeLine` |
| `content/portfolio.config.ts` | hero, per-role copy, skills strip | site                                         |

The résumé is formal and ATS-oriented, the site conversational. The overlap is
deliberate.

```
resume.md → npm run build-resume → src/lib/resumeData.ts   experience only
                                 → static/resume.pdf       what the site serves
```

Generated, never hand-edited: `src/lib/resumeData.ts`, `output/*`,
`static/resume.pdf`. The last two aren't committed: the deploy builds them.

## Rules the build enforces

- **Exactly one page.** Take space from margins, leading or wording, not font size.
- **ATS-readable.** No tables, columns, images or hyphenation; plain `#` headings.
- **Company names join `resume.md` to `portfolio.config.ts`.** Rename one and the
  build fails, naming both lists.

## CI

The checks live in `.github/workflows/verify.yml`: install, lint, check, test,
both builds and the accessibility audit. `quality.yml` runs them on every pull
request (docs-only changes skip), `release-pr.yml` on every push to `staging`,
and `release.yml` on the merge commit that lands on `main`.

## Releasing

Feature branches merge into `staging`, the default branch. Each push to it
opens or updates one `staging` to `main` PR titled `chore(release): vX.Y.Z`,
computed from Conventional Commits (`feat` minor, `fix`/`perf` patch,
`BREAKING CHANGE` major; `content`, `style` and the rest cut no version).
Test the staging preview on Vercel, then merge that PR with **Create a merge
commit**, never squash. `release.yml` refuses a squash, then semantic-release
tags the release and writes the GitHub Release. Vercel deploys `main` to
production on its own.

The PDF is cached against its three sources, so TeX installs only when the résumé
changed: ~2 min on a miss, ~25s otherwise. Node 24 matches local: npm 10 and 11
write lockfiles differently.

## Claims

Every number and ownership claim here is checkable against a repo, a database or
a public record. If one overstates, that's a bug.
