import { describe, expect, it, vi } from "vitest";
import { Password, UserIdentity } from "../../domain";
import type { AuthApiClientPort } from "./AuthApiClient";
import { ApiAuthRepository } from "./ApiAuthRepository";

describe("ApiAuthRepository", () => {
  it("maps login credentials to the auth API and returns a domain session", async () => {
    const apiClient: AuthApiClientPort = {
      post: vi.fn().mockResolvedValue({
        user: {
          username: "ignored-by-domain-session",
          displayName: "Ignored"
        },
        token: " access-token "
      })
    };

    const session = await new ApiAuthRepository(apiClient).login({
      username: UserIdentity.create("fikret"),
      password: Password.create("secret")
    });

    expect(apiClient.post).toHaveBeenCalledWith("/api/user/login", {
      username: "fikret",
      password: "secret"
    });
    expect(session.user.value()).toBe("fikret");
    expect(session.token.value()).toBe("access-token");
  });

  it("maps register credentials to the auth API and returns a domain session", async () => {
    const apiClient: AuthApiClientPort = {
      post: vi.fn().mockResolvedValue({
        user: {
          username: "ignored-by-domain-session",
          displayName: "Ignored"
        },
        token: "access-token"
      })
    };

    const session = await new ApiAuthRepository(apiClient).register({
      username: UserIdentity.create("fikret"),
      password: Password.create("secret")
    });

    expect(apiClient.post).toHaveBeenCalledWith("/api/user/register", {
      username: "fikret",
      password: "secret"
    });
    expect(session.user.value()).toBe("fikret");
    expect(session.token.value()).toBe("access-token");
  });
});
