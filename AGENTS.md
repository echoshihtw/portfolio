# AI Agents Guide

## Purpose

This repository is a portfolio + resume automation system.

`content/resume.md` is the single source of truth for career data.

From that source, the system generates:

- `output/resume.pdf`
- `output/resume.html`
- `src/lib/resumeData.ts`
- portfolio sections rendered from structured resume data

## Core Principle

Always treat `content/resume.md` as canonical.

Do not manually edit generated files.

Source flow:

```text
content/resume.md
  -> scripts/buildResume.ts
  -> src/lib/resumeData.ts + output/resume.html + output/resume.pdf
  -> Svelte components
  -> Portfolio pages
```

## Repository Map

```text
content/
  resume.md

scripts/
  buildResume.ts

src/lib/
  resumeData.ts

src/lib/components/
  Experience.svelte
  Projects.svelte
  Skills.svelte

output/
  resume.pdf
  resume.html

agents/
  resume-builder.prompt.md
  resume-parser.prompt.md
  portfolio-updater.prompt.md

automation/
  resume-pipeline.md
  resume-build.md
  portfolio-sync.md

.github/workflows/
  resume.yml
```

## Agent Responsibilities

### 1. Resume Pipeline

Primary reference:

- `agents/resume-builder.prompt.md`

Responsibilities:

- keep `scripts/buildResume.ts` working
- generate resume PDF and HTML
- regenerate structured resume data

### 2. Resume Parsing

Primary reference:

- `agents/resume-parser.prompt.md`

Responsibilities:

- parse `content/resume.md`
- extract at least: Summary, Experience, Projects, Skills
- update `src/lib/resumeData.ts`

### 3. Portfolio Synchronization

Primary reference:

- `agents/portfolio-updater.prompt.md`

Responsibilities:

- keep portfolio components in sync with `src/lib/resumeData.ts`
- avoid content duplication between hardcoded portfolio content and generated resume data
- preserve SvelteKit + TypeScript + TailwindCSS compatibility

## Build and Update Workflow

When career data changes:

1. Edit `content/resume.md`.
2. Run:

```bash
npm run build-resume
```

3. Confirm these files updated:

- `src/lib/resumeData.ts`
- `output/resume.html`
- `output/resume.pdf`

4. Commit source and generated outputs together.

## CI Automation

The workflow at `.github/workflows/resume.yml` runs on push to `main` and:

- installs Node + Pandoc
- runs `npm install`
- runs `npm run build-resume`
- uploads `output/resume.pdf` as an artifact

## Guardrails

Agents should:

- keep `resume.md` human-readable and easy to edit
- prefer simple, maintainable parsing logic
- avoid heavy dependencies unless clearly justified
- update automation scripts instead of editing generated files by hand
- preserve existing architecture unless explicitly asked to redesign

## Design Philosophy

Treat career information like software infrastructure:

- one source of truth
- deterministic outputs
- repeatable builds
- automation-friendly workflow

## Future Extensions

Potential additions:

- LinkedIn summary generation
- job-targeted resume variants
- JSON API export for resume data
- richer project metadata generation from source content
