import { describe, expect, it } from "vitest";
import { readIds, restoreOrder } from "./wallOrder.js";

describe("restoreOrder", () => {
  it("puts present works into the stored order", () => {
    expect(restoreOrder(["c", "a", "b"], ["a", "b", "c"])).toEqual([
      "c",
      "a",
      "b",
    ]);
  });

  // The one that matters: Echo keeps adding paintings, and a visitor who
  // arranged the wall before an addition must still be shown the new piece.
  it("appends works the stored order has never seen", () => {
    expect(restoreOrder(["b", "a"], ["a", "b", "new"])).toEqual([
      "b",
      "a",
      "new",
    ]);
  });

  it("keeps new works in source order when several are added", () => {
    expect(restoreOrder(["b"], ["a", "b", "c"])).toEqual(["b", "a", "c"]);
  });

  it("drops stored ids for works that no longer exist", () => {
    expect(restoreOrder(["gone", "a"], ["a"])).toEqual(["a"]);
  });

  it("returns source order when nothing is stored", () => {
    expect(restoreOrder([], ["a", "b"])).toEqual(["a", "b"]);
  });
});

describe("readIds", () => {
  // The stored value is whatever was there last, not necessarily ours.
  it("survives a value that is not an array", () => {
    globalThis.localStorage = {
      getItem: () => '{"not":"an array"}',
    } as unknown as Storage;
    expect(readIds("k")).toEqual([]);
  });

  it("drops non-string entries rather than trusting them", () => {
    globalThis.localStorage = {
      getItem: () => '["a", 3, null, "b"]',
    } as unknown as Storage;
    expect(readIds("k")).toEqual(["a", "b"]);
  });

  it("survives localStorage throwing outright", () => {
    globalThis.localStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
    } as unknown as Storage;
    expect(readIds("k")).toEqual([]);
  });
});
