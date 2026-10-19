import { describe, expect, it } from "vitest";
import { parseAmount, runway } from "./runway.js";

const OCT_19 = new Date(2026, 9, 19);

describe("parseAmount", () => {
  it("reads a typed amount with commas and a sign", () => {
    expect(parseAmount("$34,336")).toBe(34336);
  });

  it("reads nothing as zero", () => {
    expect(parseAmount("")).toBe(0);
  });
});

describe("runway", () => {
  it("counts whole months and names the month it runs out", () => {
    expect(runway(34336, 2803, OCT_19)).toEqual({
      months: 12,
      status: "stable",
      runsOut: "Runs out October 2027.",
    });
  });

  it("is caution under six months and critical under three", () => {
    expect(runway(5000, 1000, OCT_19).status).toBe("caution");
    expect(runway(2000, 1000, OCT_19).status).toBe("critical");
  });

  it("says this month when the cash covers less than one", () => {
    expect(runway(500, 1000, OCT_19)).toEqual({
      months: 0,
      status: "critical",
      runsOut: "It runs out this month.",
    });
  });

  it("never runs out when nothing costs anything", () => {
    expect(runway(1000, 0, OCT_19).months).toBeNull();
  });

  // Day 31 plus a month must not skip a month the way setMonth does.
  it("lands on the right month from the 31st", () => {
    expect(runway(1000, 1000, new Date(2026, 0, 31)).runsOut).toBe(
      "Runs out February 2026."
    );
  });
});
