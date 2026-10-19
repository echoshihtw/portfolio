import { describe, expect, it } from "vitest";
import { closingConfig } from "./portfolio.config";

// Contact offers one email button and a subject link for each kind of
// message. A duplicated subject would silently merge two audiences in one
// inbox, which is the whole point of offering a choice.
describe("closing paths", () => {
  const paths = closingConfig.paths;

  it("offers a role first, then a project", () => {
    expect(paths.map((path) => path.key)).toEqual(["role", "project"]);
  });

  it("gives each path its own email subject and label", () => {
    const subjects = paths.map((path) => path.subject);
    expect(new Set(subjects).size).toBe(subjects.length);
    for (const path of paths) expect(path.label.length).toBeGreaterThan(0);
  });
});
