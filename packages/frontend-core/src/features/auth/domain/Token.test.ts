import { describe, expect, it } from "vitest";
import { Token } from "./Token";

describe("Token", () => {
  it("normalizes non-empty values", () => {
    const token = Token.create("  access-token  ");

    expect(token.value()).toBe("access-token");
  });

  it("rejects blank values", () => {
    expect(() => Token.create("   ")).toThrow("Token bos olamaz.");
  });
});
