import { describe, expect, it } from "vitest";
import { closingConfig } from "./portfolio.config";

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

  // Every card renders a primary email and a secondary link. A secondary
  // with a label and no destination would render as a link to nowhere,
  // which is the one failure the markup cannot show on its own.
  it("gives every path an action and a secondary that leads somewhere", () => {
    for (const path of paths) {
      expect(path.action.length).toBeGreaterThan(0);
      expect(path.secondary.label.length).toBeGreaterThan(0);

      const secondary: { href?: string; resume?: boolean } = path.secondary;
      expect(secondary.href ?? secondary.resume).toBeTruthy();
    }
  });
});
