You are a senior developer helping build an automated resume pipeline.

Goal:
Create a system where resume.md is the single source of truth.

Outputs generated automatically:

- resume.pdf
- resume.html
- portfolio data JSON

Project stack:
Node.js + Pandoc + SvelteKit

Directory structure:

/content
resume.md

/scripts
buildResume.ts

/output
resume.pdf
resume.html

/src/lib
resumeData.ts

Tasks:

1. Write a Node.js script that:

   - reads content/resume.md
   - converts it to HTML using Pandoc
   - converts it to PDF using Pandoc

2. Extract structured data from resume.md:
   sections:
   Summary
   Experience
   Projects
   Skills

3. Output structured JSON to:

src/lib/resumeData.ts

Example format:

export const resume = {
summary: "...",
experience: [
{
company: "Lockerbie Technology",
role: "Full-Stack Engineer",
date: "2024–Present",
highlights: []
}
]
}

4. Make script runnable:

npm run build-resume
