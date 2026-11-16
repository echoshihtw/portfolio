import { describe, expect, it } from "vitest";
import { runwayCaseStudy as cs } from "./runwayCaseStudy.config";
import { galleryConfig } from "./galleryPage.config";
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
  ["Contact's lead", closingConfig.lead, closingConfig.leadMark.phrase],
  ["Case study lede", cs.lede, cs.ledeMark.phrase],
  ["Case study problem", cs.problem.body.join(" "), cs.problem.mark.phrase],
  ["Case study model", cs.model.rule, cs.model.mark.phrase],
  [
    "Case study steps",
    cs.simpler.steps.map((s) => s.title).join(" "),
    cs.simpler.mark.phrase,
  ],
  ["Case study learned", cs.learned.body.join(" "), cs.learned.mark.phrase],
  ["Case study close", cs.rest.body.join(" "), cs.rest.mark.phrase],
  [
    "Gallery story",
    galleryConfig.story.join(" "),
    galleryConfig.storyMark.phrase,
  ],
  [
    "Gallery close",
    galleryConfig.closing.text,
    galleryConfig.closing.mark.phrase,
  ],
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
