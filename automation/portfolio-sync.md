# Portfolio Sync System

The portfolio automatically consumes resume data.

---

## Source

content/resume.md

---

## Generated Data

src/lib/resumeData.ts

---

## Workflow

1. Edit resume

content/resume.md

2. Run build

npm run build-resume

3. Portfolio updates automatically

---

## Example Usage

<script>
import { experience } from "$lib/resumeData"
</script>

{#each experience as job}
<h3>{job.company}</h3>
<p>{job.role}</p>
{/each}

---

## Principle

All career data must originate from the resume pipeline.