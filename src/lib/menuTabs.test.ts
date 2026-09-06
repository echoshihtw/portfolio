import { describe, expect, it } from "vitest";
import { tabs, tabHref } from "./menuTabs.js";

// `base` is "" in dev and in the Vercel build, so these read as absolute
// paths. The GitHub Pages build set it, which is why the function exists.
describe("tabHref", () => {
  it("leaves an anchor alone on the home page", () => {
    expect(tabHref("#work", "/")).toBe("#work");
  });

  it("sends an anchor home first from another route", () => {
    expect(tabHref("#work", "/blog")).toBe("/#work");
  });
});

describe("tabs", () => {
  // tabHref only handles anchors, and the navs draw a rule between positions
  // on this page and places you go. A route added here would break both: it
  // would render as "//about" from /blog, and it would sit on the wrong side
  // of that rule. Routes belong beside Blog.
  it("holds only anchors, never routes", () => {
    const routes = tabs.filter((tab) => !tab.link.startsWith("#"));
    expect(routes).toEqual([]);
  });
});
