import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { projectsConfig } from "../src/content/projects.config.js";

const ROOT = process.cwd();
const RESUME_PATH = path.join(ROOT, "src", "content", "resume.md");
const OUTPUT_DIR = path.join(ROOT, "output");
const RESUME_DATA_PATH = path.join(ROOT, "src/lib/resumeData.ts");

/*
--------------------------------------------------
Helpers
--------------------------------------------------
*/

function ensureDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
}

function readResume() {
  return fs.readFileSync(RESUME_PATH, "utf-8");
}

/*
--------------------------------------------------
Markdown Section Parser
--------------------------------------------------
*/

function extractSection(title, markdown) {
  const lines = markdown.split("\n");
  const normalizedTitle = title.trim().toLowerCase();

  let collecting = false;
  let startHeadingLevel = 0;
  const result = [];

  for (const line of lines) {
    const headingMatch = line.trim().match(/^(#{1,6})\s+(.+)$/);

    if (!collecting) {
      if (
        headingMatch &&
        headingMatch[2].trim().toLowerCase() === normalizedTitle
      ) {
        collecting = true;
        startHeadingLevel = headingMatch[1].length;
      }
      continue;
    }

    if (headingMatch && headingMatch[1].length <= startHeadingLevel) {
      break;
    }

    result.push(line);
  }

  return result.join("\n").trim();
}
/*
--------------------------------------------------
Experience Parser
--------------------------------------------------
*/

function parseExperience(section) {
  const entries = [];

  const blocks = section.split("## ").filter(Boolean);

  blocks.forEach((block) => {
    const lines = block
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const company = lines[0].trim();
    const roleLine = lines[1] || "";
    const dateLine =
      lines.find(
        (line, index) =>
          index > 1 && !line.startsWith("- ") && !line.startsWith("#")
      ) || "";

    const highlights = lines
      .filter((l) => l.startsWith("- "))
      .map((l) => l.replace("- ", "").trim());

    entries.push({
      company,
      role: roleLine,
      date: dateLine,
      highlights,
    });
  });

  return entries;
}

/*
--------------------------------------------------
Skills Parser
--------------------------------------------------
*/

function parseSkills(section) {
  const groups = section.split("\n### ").filter(Boolean);

  return groups.map((group) => {
    const lines = group.trim().split("\n");

    const category = lines[0].trim();

    const items = lines
      .slice(1)
      .flatMap((line) => {
        if (line.startsWith("- ")) {
          return [line.replace("- ", "").trim()];
        }

        return line.split("·").map((s) => s.trim());
      })
      .filter(Boolean);

    return {
      category,
      items,
    };
  });
}

/*
--------------------------------------------------
Build Resume Data
--------------------------------------------------
*/

function buildResumeData(markdown) {
  const summary = extractSection("Summary", markdown);

  const experienceSection = extractSection("Experience", markdown);
  let skillsSection = extractSection("Skills", markdown);
  if (!skillsSection) {
    skillsSection = extractSection("Skills & Technologies", markdown);
  }

  const experience = parseExperience(experienceSection);
  const skills = parseSkills(skillsSection);

  const content = `
import type { Projects } from "$lib/types/types";

type ExperienceItem = {
  company: string;
  role: string;
  date: string;
  highlights: string[];
};

type SkillGroup = {
  category: string;
  items: string[];
};

export const summary = ${JSON.stringify(summary, null, 2)};

export const experience: ExperienceItem[] = ${JSON.stringify(
    experience,
    null,
    2
  )};

export const skills: SkillGroup[] = ${JSON.stringify(skills, null, 2)};

export const projects: Projects = ${JSON.stringify(projectsConfig, null, 2)};
`;

  fs.writeFileSync(RESUME_DATA_PATH, content);

  console.log("✅ Updated src/lib/resumeData.ts");
}

/*
--------------------------------------------------
Build Resume Files
--------------------------------------------------
*/

function buildHTML() {
  try {
    console.log("Generating resume.html...");

    execFileSync(
      "pandoc",
      [RESUME_PATH, "-o", path.join(OUTPUT_DIR, "resume.html")],
      {
        stdio: "inherit",
      }
    );
  } catch {
    console.warn("⚠️ Pandoc not installed — skipping HTML build");
  }
}

function buildPDF() {
  try {
    console.log("Generating resume.pdf...");

    execFileSync(
      "pandoc",
      [
        RESUME_PATH,
        "-o",
        path.join(OUTPUT_DIR, "resume.pdf"),
        "--pdf-engine=xelatex",
      ],
      { stdio: "inherit" }
    );
  } catch {
    console.warn("⚠️ Pandoc/xelatex not installed — skipping PDF build");
  }
}

/*
--------------------------------------------------
Main
--------------------------------------------------
*/

function run() {
  console.log("🚀 Building resume pipeline...");

  ensureDirectories();

  const markdown = readResume();

  buildResumeData(markdown);

  buildHTML();
  buildPDF();

  console.log("✨ Resume build complete");
}

run();
