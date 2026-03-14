# Portfolio Sync System

The portfolio pulls resume data automatically.

---

## Data Source

src/lib/resumeData.ts

Generated from:

content/resume.md

---

## Workflow

Edit resume:

content/resume.md

Run build:

npm run build-resume

Portfolio updates automatically.

---

## Svelte Usage

Example:

<script> import { experience } from "$lib/resumeData" </script>

{#each experience as job}

<h3>{job.company}</h3> <p>{job.role}</p> {/each} ```
Principles

Do not manually duplicate resume information inside components.

All career data should come from the resume pipeline.


---

# 📁 Final Repo Layout

Your repo should now look like:


agents/
resume-builder.prompt.md
resume-parser.prompt.md
portfolio-updater.prompt.md

automation/
resume-pipeline.md
resume-build.md
portfolio-sync.md

content/
resume.md
projects.config.ts

scripts/
buildResume.ts

src/lib/
resumeData.ts


---

# ⭐ Why This Setup Is Excellent

Your portfolio now behaves like **real engineering infrastructure**:


edit resume.md
↓
build
↓
portfolio + pdf update


Future you (or AI tools) can regenerate the whole system easily.

---

If you want, I can also show you **one final extremely powerful addition**:

A **`career.json` data model** that can generate:

- resume
- portfolio pages
- project pages
- blog author pages

from a **single structured dataset**.