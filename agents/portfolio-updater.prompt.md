# Portfolio Updater Agent

## Goal

Synchronize the SvelteKit portfolio with structured resume data.

The portfolio should not duplicate resume information manually.

---

## Data Source

src/lib/resumeData.ts

Generated from:

content/resume.md

---

## Stack

SvelteKit  
TypeScript  
TailwindCSS

---

## Responsibilities

Render resume data inside portfolio components.

---

## Components

src/lib/components/

Experience.svelte  
Projects.svelte  
Skills.svelte

---

## Example

<script>
import { experience } from "$lib/resumeData"
</script>

{#each experience as job}
<section>
<h3>{job.company}</h3>
<p>{job.role} · {job.date}</p>

<ul>
{#each job.highlights as bullet}
<li>{bullet}</li>
{/each}
</ul>

</section>
{/each}

---

## Special Rule

Cosmora should always appear as a **featured project**.