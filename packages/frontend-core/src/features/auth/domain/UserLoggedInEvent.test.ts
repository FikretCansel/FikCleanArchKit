import { describe, expect, it } from "vitest";
import { Token, UserIdentity } from ".";
import { createUserLoggedInEvent } from "./UserLoggedInEvent";

describe("createUserLoggedInEvent", () => {
  it("creates an auth login domain event for the given session", () => {
    const session = {
      user: UserIdentity.create("fikret"),
      token: Token.create("access-token")
    };

    const event = createUserLoggedInEvent(session);

    expect(event).toMatchObject({
      type: "auth.user.logged-in",
      session
    });
    expect(event.occurredAt).toBeInstanceOf(Date);
  });
});
