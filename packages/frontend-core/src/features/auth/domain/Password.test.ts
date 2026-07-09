import { describe, expect, it } from "vitest";
import { Password } from "./Password";

describe("Password", () => {
  it("normalizes valid values", () => {
    const password = Password.create("  secret  ");

    expect(password.value()).toBe("secret");
  });

  it("rejects values shorter than 3 characters after normalization", () => {
    expect(() => Password.create(" ab ")).toThrow(
      "Password en az 3 karakter olmali."
    );
  });
});
