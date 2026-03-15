# Resume Parser Agent

## Goal

Convert resume markdown into structured data for the portfolio.

---

## Input

content/resume.md

---

## Output

src/lib/resumeData.ts

---

## Expected Structure

export const resume = {
summary: "",
experience: [],
projects: [],
skills: []
}

---

## Parsing Rules

Markdown structure:

# Summary

text

# Experience

## Company

Role line

- bullet
- bullet

Rules:

- `#` = section
- `##` = item
- `-` = bullet

---

## Implementation

Use Node.js.

Recommended libraries:

- remark
- gray-matter

---

## Design Goals

- tolerant to minor formatting changes
- keep resume markdown readable
- generate stable TypeScript data
