import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";

const css = readFileSync("src/app.css", "utf8");
const clio = createRequire(import.meta.url)("@echoshihtw/clio-brand/tokens.js");

// The value of `--name` inside the first block that opens with `selector`.
function token(selector: string, name: string): string {
  const block = css.slice(css.indexOf(selector));
  const body = block.slice(0, block.indexOf("\n}"));
  const match = body.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`${selector} has no --${name}`);
  const brand = match[1].match(/^var\(--clio-(\w+)\)$/);
  return brand ? clio[brand[1]] : match[1];
}

const light = (name: string) => token(":root {", name);
const dark = (name: string) => {
  try {
    return token('html[data-theme="dark"] {', name);
  } catch {
    return light(name);
  }
};

describe("contrastRatio", () => {
  it("is 21 for black on white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });
});

describe.each([
  ["light", light],
  ["dark", dark],
])("every text pair in the %s theme reads at 4.5:1", (_, t) => {
  it.each([
    ["ink on paper", "ink", "canvas"],
    ["ink on smoke", "ink", "smoke"],
    ["her accent on paper", "accent-text", "canvas"],
    ["Clio's number on paper", "clio-number", "canvas"],
  ])("%s", (_, fg, bg) => {
    expect(contrastRatio(t(fg), t(bg))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("the colour bands", () => {
  it("mint reads on Runway's indigo", () => {
    expect(
      contrastRatio(light("runway-mint"), light("runway-indigo"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("paper reads on Runway's indigo", () => {
    expect(
      contrastRatio(light("canvas"), light("runway-indigo"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("dark ink reads on a mint button", () => {
    expect(
      contrastRatio(light("ink"), light("runway-mint"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("Clio's ink reads on Clio's pink", () => {
    expect(contrastRatio(clio.ink, clio.pink)).toBeGreaterThanOrEqual(4.5);
  });
});
