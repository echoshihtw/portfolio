# Resume Automation System

This repository uses `resume.md` as the single source of truth.

From one file, it generates:

- `resume.pdf`
- portfolio content
- structured website data

This prevents resume drift and keeps everything synchronized.

## Philosophy

The resume is treated like code infrastructure.

Instead of maintaining multiple versions:

- `resume.docx`
- portfolio text
- LinkedIn text
- PDF resume

Maintain one source:

- `content/resume.md`

and generate everything else.

## Repository Structure

```text
content/
  resume.md

scripts/
  buildResume.ts

output/
  resume.pdf
  resume.html

src/lib/
  resumeData.ts

automation/
  resume-pipeline.md
  resume-build.md
  portfolio-sync.md

agents/
  resume-builder.prompt.md
  resume-parser.prompt.md
  portfolio-updater.prompt.md

guide/
  core_infra.md
```

## Source of Truth

The system is driven by:

- `content/resume.md`

Edit this file to update:

- experience
- skills
- projects
- achievements

Do not manually edit generated files.

## Generate Resume Outputs

Run:

```bash
npm run build-resume
```

This command will:

- parse `resume.md`
- generate structured data
- create:
  - `output/resume.pdf`
  - `output/resume.html`
  - `src/lib/resumeData.ts`

## PDF Generation

The pipeline uses Pandoc.

Example:

```bash
pandoc content/resume.md \
  -o output/resume.pdf \
  --pdf-engine=xelatex \
  -V mainfont="Inter"
```

If LaTeX is not installed:

```bash
brew install --cask mactex
```

## Portfolio Data Integration

The website imports structured data from:

- `src/lib/resumeData.ts`

Example usage:

```svelte
<script>
  import { experience } from "$lib/resumeData";
</script>

{#each experience as job}
  <section>
    <h3>{job.company}</h3>
    <p>{job.role}</p>
  </section>
{/each}
```

When `resume.md` changes and the build runs, portfolio content updates automatically.

## Editing Workflow

1. Edit `content/resume.md`.
2. Update sections like:
   - `# Experience`
   - `# Projects`
   - `# Skills`
3. Run `npm run build-resume`.

## AI Agents

Automation prompts are in:

- `agents/`

Examples:

- `resume-builder.prompt.md`
- `resume-parser.prompt.md`
- `portfolio-updater.prompt.md`

These prompts can be used by Codex/GPT/Cursor to:

- regenerate resume data
- update portfolio pages
- modify the resume pipeline

## Recommended Release Flow

1. Edit `resume.md`.
2. Run `npm run build-resume`.
3. Commit changes.
4. Deploy portfolio.

## Long-Term Benefits

- single source of truth
- consistent resume and portfolio
- easier automation
- AI-friendly structure

Future extension:

`resume.md` -> generated `resume.pdf`, portfolio sections, LinkedIn summary

## Troubleshooting

If something breaks, check:

- `resume.md` structure
- Pandoc installation
- `buildResume` script

Most failures come from formatting changes in source markdown.

## Final Principle

Maintain the resume like software:

- edit source
- run build
- deploy
