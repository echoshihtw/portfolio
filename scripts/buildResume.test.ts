import { describe, expect, it } from "vitest";
import {
  extractSection,
  parseExperience,
  withProjects,
} from "./buildResume.js";

// These cover the parts that have actually broken: section extraction by
// heading, splitting "Role · Location · Dates" back into fields, and the
// projects marker. Everything else in buildResume shells out to pandoc.

const RESUME = `# Summary

A sentence about me.

# Experience

## Acme Ltd (Group plc)

Staff Engineer, Platform · _Taipei, Taiwan · Dec 2024 – Present_

- Did a thing with **bold** in it.
- Did another thing.

## Beta Co

Engineer · _Remote · Aug 2022 – May 2024_

- Only one bullet here.

# Skills

**Frontend**: React
`;

// resume.md carries provenance comments throughout, and one under
// "# Experience" used to be parsed as a company, role and date.
const RESUME_WITH_COMMENT = `# Experience

<!-- Why these bullets are ordered this way, mentioning a ## heading. -->

## Acme Ltd

Staff Engineer · _Taipei · Dec 2024 – Present_

- Did a thing.
`;

describe("extractSection", () => {
  it("returns a section's body without the heading", () => {
    expect(extractSection("Summary", RESUME)).toBe("A sentence about me.");
  });

  it("stops at the next heading of the same level", () => {
    const experience = extractSection("Experience", RESUME);
    expect(experience).toContain("Acme Ltd");
    expect(experience).not.toContain("Frontend");
  });

  it("returns an empty string for a heading that isn't there", () => {
    expect(extractSection("Publications", RESUME)).toBe("");
  });
});

describe("parseExperience", () => {
  const jobs = parseExperience(extractSection("Experience", RESUME));

  it("finds every job", () => {
    expect(jobs.map((j) => j.company)).toEqual([
      "Acme Ltd (Group plc)",
      "Beta Co",
    ]);
  });

  // Role, location and dates share one line to save vertical space on the
  // PDF. The site needs them apart, and the italic markers gone.
  it("splits role from date and drops the italic markers", () => {
    expect(jobs[0].role).toBe("Staff Engineer, Platform");
    expect(jobs[0].date).toBe("Taipei, Taiwan · Dec 2024 – Present");
  });

  it("keeps the bullets, without their list markers", () => {
    expect(jobs[0].highlights).toEqual([
      "Did a thing with **bold** in it.",
      "Did another thing.",
    ]);
    expect(jobs[1].highlights).toHaveLength(1);
  });
});

describe("withProjects", () => {
  it("replaces the marker with one line per project that has a resumeLine", () => {
    const marker =
      "<!-- generated from src/content/projects.config.ts: projects with a resume block -->";
    const out = withProjects(`# Projects\n\n${marker}\n\n# Skills\n`);

    expect(out).not.toContain(marker);
    expect(out).toContain("**Clio**");
    // Echology has no resumeLine: it belongs on the site, not the one page.
    expect(out).not.toContain("**Echology**");
  });

  it("throws when the marker is missing, rather than silently dropping projects", () => {
    expect(() => withProjects("# Projects\n\n# Skills\n")).toThrow(
      /missing the projects marker/
    );
  });
});

describe("parseExperience with comments", () => {
  it("ignores HTML comments instead of parsing them as entries", () => {
    const entries = parseExperience(
      extractSection("Experience", RESUME_WITH_COMMENT)
    );

    expect(entries).toHaveLength(1);
    expect(entries[0].company).toBe("Acme Ltd");
    expect(entries[0].role).toBe("Staff Engineer");
    expect(entries[0].date).toBe("Taipei · Dec 2024 – Present");
  });
});
