# AI Agents Guide

## Purpose

This repository is a portfolio + resume automation system.

`src/content/resume.md` is the single source of truth for career data.

From that source, the system generates:

- `output/resume.pdf`
- `output/resume.html`
- `src/lib/resumeData.ts`
- portfolio sections rendered from structured resume data

## Core Principle

Always treat `src/content/resume.md` as canonical.

Do not manually edit generated files.

Source flow:

```text
src/content/resume.md
  -> scripts/buildResume.ts
  -> src/lib/resumeData.ts + output/resume.html + output/resume.pdf
  -> Svelte components
  -> Portfolio pages
```

## Build and Update Workflow

When career data changes:

1. Edit `src/content/resume.md`.
2. Run:

```bash
npm run build-resume
```

3. Confirm these files updated:

- `src/lib/resumeData.ts`
- `output/resume.html`
- `output/resume.pdf`

4. Commit source and generated outputs together.

## Guardrails

Agents should:

- keep `resume.md` human-readable and easy to edit
- prefer simple, maintainable parsing logic
- avoid heavy dependencies unless clearly justified
- update automation scripts instead of editing generated files by hand
- preserve existing architecture unless explicitly asked to redesign
- check every visual change against `DESIGN.md`: one lead object, about four chunks per block, and every colour with a job
