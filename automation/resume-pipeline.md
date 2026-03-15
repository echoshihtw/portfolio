# Resume Automation Pipeline

This project uses a **single-source resume architecture**.

content/resume.md drives:

- resume PDF
- resume HTML
- portfolio data

---

## Pipeline

content/resume.md  
↓  
scripts/buildResume.ts  
↓  
src/lib/resumeData.ts  
↓  
Svelte portfolio components

---

## Outputs

output/resume.pdf  
output/resume.html  
src/lib/resumeData.ts

---

## Build Command

npm run build-resume

---

## Benefits

- single source of truth
- no duplicate resume text
- easy automation
