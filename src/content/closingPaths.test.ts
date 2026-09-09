import { describe, expect, it } from "vitest";
import { closingConfig, heroConfig } from "./portfolio.config";

// The close is two doors, and each is a mailto whose subject tells the
// recipient which one was used. A duplicated subject would silently merge
// the two audiences in one inbox, which is the whole point of the split.
describe("closing paths", () => {
  const paths = closingConfig.paths;

  it("offers exactly two, with hiring first", () => {
    expect(paths).toHaveLength(2);
    expect(paths[0].key).toBe("role");
    expect(paths[1].key).toBe("project");
  });

  it("gives each path its own email subject", () => {
    const subjects = paths.map((path) => path.subject);
    expect(new Set(subjects).size).toBe(subjects.length);
  });

  it("gives every path a kicker, copy and both actions", () => {
    for (const path of paths) {
      expect(path.kicker.length).toBeGreaterThan(0);
      expect(path.title.length).toBeGreaterThan(0);
      expect(path.copy.length).toBeGreaterThan(0);
      expect(path.action.length).toBeGreaterThan(0);
      expect(path.secondary.label.length).toBeGreaterThan(0);
    }
  });

  // The hero's email is the same door as the first card, so a rename in one
  // place that misses the other would put two subjects on one path.
  it("keeps the hero's subject in step with the role path", () => {
    expect(heroConfig.emailSubject).toBe(paths[0].subject);
  });
});
