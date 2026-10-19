import { describe, expect, it } from "vitest";
import { demoClients } from "../content/clioDemo.config";
import { findClient } from "./clioSearch.js";

describe("findClient", () => {
  it("finds a client by part of her English name, in any case", () => {
    expect(findClient(demoClients, "pei")?.name).toBe("周佩珊 Peishan");
  });

  it("finds a client by her Chinese name", () => {
    expect(findClient(demoClients, "陳美玲")?.name).toBe("陳美玲 May");
  });

  it("finds a client by phone, with or without the dash", () => {
    expect(findClient(demoClients, "0900 000 012")?.name).toBe("李佳蓉 Grace");
    expect(findClient(demoClients, "000-021")?.name).toBe("周佩珊 Peishan");
  });

  it("finds no one for an empty or unknown query", () => {
    expect(findClient(demoClients, "  ")).toBeNull();
    expect(findClient(demoClients, "Zoe")).toBeNull();
  });
});
