import { describe, expect, it } from "vitest";
import { aboutMeConfig } from "./aboutMe.config";
import { closingConfig, experiencePortfolio } from "./portfolio.config";
import { projectsConfig } from "./projects.config";
import { selectedWorkConfig } from "./selectedWork.config";

// A mark whose phrase isn't in its copy is silently dropped, so a rewrite of
// the copy must take the phrase with it.
const marks: [string, string, string][] = [
  [
    "Runway's lede",
    selectedWorkConfig.lede,
    selectedWorkConfig.ledeMark.phrase,
  ],
  [
    "Who I am headline",
    aboutMeConfig.headline,
    aboutMeConfig.headlineMark.phrase,
  ],
  ["Contact's lead", closingConfig.lead, closingConfig.leadMark.phrase],
  ...aboutMeConfig.parts.flatMap((p): [string, string, string][] =>
    "mark" in p ? [[p.label, p.text, p.mark.phrase]] : []
  ),
  ...Object.entries(experiencePortfolio).flatMap(
    ([company, c]): [string, string, string][] =>
      c.mark ? [[company, c.story, c.mark.phrase]] : []
  ),
  ...projectsConfig.flatMap((p): [string, string, string][] =>
    p.mark ? [[p.name, (p.story ?? []).join(" "), p.mark.phrase]] : []
  ),
];

describe("every pen mark finds its phrase", () => {
  it.each(marks)("%s", (_, text, phrase) => {
    expect(text).toContain(phrase);
  });
});
