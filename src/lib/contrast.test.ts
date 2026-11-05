import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { contrastRatio, over } from "./contrast";

const css = readFileSync("src/app.css", "utf8");
const clio = createRequire(import.meta.url)("@echoshihtw/clio-brand/tokens.js");

// The value of `--name` inside the first block that opens with `selector`.
function token(selector: string, name: string): string {
  const block = css.slice(css.indexOf(selector));
  const body = block.slice(0, block.indexOf("\n}"));
  const match = body.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`${selector} has no --${name}`);
  return match[1].trim();
}

// A token's colour, following var(--x) to the same theme's token or to the
// Clio brand.
function resolve(get: (name: string) => string, name: string): string {
  const value = get(name);
  const brand = value.match(/^var\(--clio-(\w+)\)$/);
  if (brand) return clio[brand[1]];
  const ref = value.match(/^var\(--([\w-]+)\)$/);
  return ref ? resolve(get, ref[1]) : value;
}

const lightRaw = (name: string) => token(":root,\n.stay-light {", name);
const darkRaw = (name: string) => {
  try {
    return token('html[data-theme="dark"] {', name);
  } catch {
    return lightRaw(name);
  }
};
const light = (name: string) => resolve(lightRaw, name);
const dark = (name: string) => resolve(darkRaw, name);

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
    ["her accent on smoke", "accent-text", "smoke"],
    ["quiet text on paper", "muted", "canvas"],
    ["quiet text on smoke", "muted", "smoke"],
    ["Clio's number on paper", "clio-number", "canvas"],
  ])("%s", (_, fg, bg) => {
    expect(contrastRatio(over(t(fg), t(bg)), t(bg))).toBeGreaterThanOrEqual(
      4.5
    );
  });
});

describe("the colour bands", () => {
  it("runway blue reads on Runway's ink field", () => {
    expect(
      contrastRatio(light("runway-blue"), light("runway-field"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("paper reads on Runway's ink field", () => {
    expect(
      contrastRatio(light("runway-paper"), light("runway-field"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("ink reads on a paper button", () => {
    expect(
      contrastRatio(light("runway-ink"), light("runway-paper"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it.each([["runway-act"]])("%s reads on Runway's ink field", (name) => {
    expect(
      contrastRatio(light(name), light("runway-field"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("Clio's ink reads on Clio's pink", () => {
    expect(contrastRatio(clio.ink, clio.pink)).toBeGreaterThanOrEqual(4.5);
  });
});
