# Portfolio — echoshih.com

SvelteKit site, static-rendered, deployed on Vercel.
`src/content/resume.md` is the source of truth for the résumé: one build makes
the PDF and the experience data the site renders.

## Commands

```bash
npm install
npm run dev            # dev server
npm run check          # svelte-check
npm run lint           # prettier --check + eslint
npm test               # unit tests (vitest)
npm run test:e2e       # browser tests (playwright, needs a build first)
npm run build          # static site → build/
npm run build-resume   # résumé → PDF + site data
npm run build-icons    # bundle the icons the source uses
```

`build-resume` needs Pandoc and XeLaTeX — `brew install pandoc` and
`brew install --cask mactex`. Missing locally, it skips the PDF; in CI it fails.

## Content

| File                          | Holds                             | Feeds                                        |
| ----------------------------- | --------------------------------- | -------------------------------------------- |
| `content/resume.md`           | summary, experience, skills       | PDF + the site's experience cards            |
| `content/projects.config.ts`  | projects                          | site card; PDF line if it has a `resumeLine` |
| `content/portfolio.config.ts` | hero, per-role copy, skills strip | site                                         |
| `src/posts/*.md`              | blog posts (mdsvex)               | `/blog`, sitemap, RSS                        |

The résumé is formal and ATS-oriented, the site conversational. The overlap is
deliberate.

```
resume.md → npm run build-resume → src/lib/resumeData.ts   experience only
                                 → static/<name>.pdf       what the site serves
```

Generated, never hand-edited: `src/lib/resumeData.ts`, `src/lib/generated/*`,
`output/*`, and the résumé PDF in `static/`. The last two aren't committed — the
deploy builds them. The PDF is named after me so the name survives a save from
the browser's viewer; `/resume.pdf` redirects to it.

Posts can also be edited through Sveltia CMS at `/admin`, which commits
markdown straight to this repo. Sign in with a GitHub access token; there is
no server and no OAuth proxy.

## Rules the build enforces

- **Exactly one page.** Take space from margins, leading or wording — not font size.
- **ATS-readable.** No tables, columns, images or hyphenation; plain `#` headings.
- **Company names join `resume.md` to `portfolio.config.ts`.** Rename one and the
  build fails, naming both lists.
- **Every icon name resolves.** `build-icons` throws on a name its collection
  doesn't have, because the failure it replaced was silent: an unknown name
  used to 404 at the icon API and render an empty gap.

## Testing

Three layers, each doing the thing the others can't.

| Where                        | Runs                                | Why there                                                          |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| **Local, while working**     | `npm run lint`, `npm test`          | Fast enough to run constantly; nothing is gated on remembering to. |
| **CI, on every PR and push** | lint, check, unit, both builds, e2e | The only layer that can't be skipped. This is the gate.            |
| **Production, after merge**  | `curl` the deployed URL             | Catches what a local build can't. See the gap below.               |

**Unit tests** (`vitest`) cover the résumé parser — the pure logic that turns
`resume.md` into data.

**Browser tests** (`playwright`, in `e2e/`) run against the built site and were
written from bugs that actually shipped, not from a coverage target. Each spec
says which one:

- the page must not scroll sideways at 320–1280px, and the theme toggle must be
  on screen — it used to render at x=409 whatever the viewport
- the hidden floating nav must hold no focusable controls — six invisible tab
  stops before `inert`
- the hero headline must hold its height and wrap point through the type
  animation — it grew a line at a time and shoved the page down twice
- nothing may be requested from a third party except the font host — icons were
  fetched per-visitor from two icon APIs, and an unused Font Awesome stylesheet
  came from a third
- no `<svg>` may render empty — two icon names had 404'd silently for months

### Known, not yet fixed: the font-swap shift

With a cold font cache the headline renders in the fallback font first, and at
320px it reflows by a **whole line** (44.5px measured) when JetBrains Mono
swaps in. That is a real layout shift on a narrow screen, separate from the
typing animation. The hero spec waits on `document.fonts.ready` and reloads
before sampling so it measures the typing rather than this — otherwise it
would fail for the wrong reason and teach us to ignore it.

Fixing it means `size-adjust` on a fallback `@font-face`, or preloading the
font, or accepting it. Not done yet.

### The gap this suite does not cover

`vite preview` resolves extensionless paths, so `/blog` finds `build/blog.html`.
**Vercel does not do this by default.** That difference is exactly how `/blog`
404'd in production while every local check passed — fixed with `cleanUrls` in
`vercel.json`, but nothing local would have caught it.

A local suite gives false confidence there. Checking the deployed URL after a
merge is a separate, necessary step, and it has caught things nothing else did.

## CI

`.github/workflows/ci.yml`. PRs and pushes to `main` run lint, check, unit
tests, both builds and the browser tests. Vercel builds and deploys separately;
no test runs there, because a deploy that CI already validated shouldn't be
gated twice.

The PDF is cached against its sources, so TeX installs only when the résumé
changed: ~2 min on a miss, ~25s otherwise. Node 24 matches local — npm 10 and 11
write lockfiles differently.

## Claims

Every number and ownership claim here is checkable against a repo, a database or
a public record. If one overstates, that's a bug.
