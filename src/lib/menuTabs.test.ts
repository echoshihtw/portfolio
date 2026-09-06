import { describe, expect, it } from "vitest";
import { tabHref } from "./menuTabs.js";

// `base` is "" in dev and in the Vercel build, so these read as absolute
// paths. The GitHub Pages build set it, which is why the function exists.
describe("tabHref", () => {
  it("leaves an anchor alone on the home page", () => {
    expect(tabHref("#work", "/")).toBe("#work");
  });

  it("sends an anchor home first from another route", () => {
    expect(tabHref("#work", "/blog")).toBe("/#work");
  });

  it("gives a route the same href on the home page", () => {
    expect(tabHref("/about", "/")).toBe("/about");
  });

  it("gives a route the same href from another route", () => {
    expect(tabHref("/about", "/blog")).toBe("/about");
  });

  it("does not double the slash on a route", () => {
    expect(tabHref("/about", "/blog")).not.toContain("//");
  });
});
