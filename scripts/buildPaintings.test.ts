import { describe, expect, it } from "vitest";
import { validateManifest } from "./buildPaintings.js";
import {
  derivativeName,
  paintingsConfig,
} from "../src/content/paintings.config.js";

describe("derivativeName", () => {
  it("builds a width-suffixed name", () => {
    expect(derivativeName("lips", 800)).toBe("lips-800.jpg");
  });
});

describe("validateManifest", () => {
  const ok = {
    id: "lips",
    source: "IMG_6765.jpg",
    medium: "Oil on canvas",
    alt: "Oil painting of lips",
    crop: [0, 0, 1, 1] as [number, number, number, number],
    scale: "canvas" as const,
  };

  it("accepts a valid entry", () => {
    expect(validateManifest([ok])).toEqual([]);
  });

  it("rejects a duplicate id", () => {
    expect(validateManifest([ok, ok])).toEqual(["duplicate id: lips"]);
  });

  it("rejects a crop that runs off the right edge", () => {
    const bad = {
      ...ok,
      id: "bad",
      crop: [0.5, 0, 0.8, 1] as [number, number, number, number],
    };
    expect(validateManifest([bad])).toEqual([
      "bad: crop runs off the right edge (x + w = 1.3)",
    ]);
  });

  it("rejects an empty alt", () => {
    expect(validateManifest([{ ...ok, id: "bad", alt: "" }])).toEqual([
      "bad: alt is required",
    ]);
  });

  // The manifest that actually ships has to pass its own rules, or the
  // generator fails on the next run rather than at review time.
  it("accepts the real manifest", () => {
    expect(validateManifest(paintingsConfig)).toEqual([]);
  });
});
