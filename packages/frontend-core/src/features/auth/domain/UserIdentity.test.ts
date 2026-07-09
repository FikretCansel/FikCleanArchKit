import { describe, expect, it } from "vitest";
import { UserIdentity } from "./UserIdentity";

describe("UserIdentity", () => {
  it("normalizes valid values", () => {
    const userIdentity = UserIdentity.create("  fikret  ");

    expect(userIdentity.value()).toBe("fikret");
  });

  it("rejects values shorter than 3 characters after normalization", () => {
    expect(() => UserIdentity.create(" fi ")).toThrow(
      "Kullanici adi en az 3 karakter olmali."
    );
  });
});
