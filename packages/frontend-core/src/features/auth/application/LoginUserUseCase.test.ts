import { describe, expect, it, vi } from "vitest";
import type { EventBus } from "@core/shared/events/EventBus";
import { Token, UserIdentity } from "../domain";
import type { AuthRepository } from "../domain";
import { LoginUserUseCase } from "./LoginUserUseCase";

describe("LoginUserUseCase", () => {
  it("logs in with normalized credentials and publishes a login event", async () => {
    const session = {
      user: UserIdentity.create("fikret"),
      token: Token.create("access-token")
    };
    const authRepository: AuthRepository = {
      login: vi.fn().mockResolvedValue(session),
      register: vi.fn()
    };
    const eventBus: EventBus = {
      publish: vi.fn(),
      subscribe: vi.fn()
    };

    const result = await new LoginUserUseCase(authRepository, eventBus).execute({
      username: "  fikret  ",
      password: "  secret  "
    });

    expect(result).toBe(session);
    expect(authRepository.login).toHaveBeenCalledWith({
      username: expect.objectContaining({}),
      password: expect.objectContaining({})
    });
    const credentials = vi.mocked(authRepository.login).mock.calls[0]?.[0];
    expect(credentials?.username.value()).toBe("fikret");
    expect(credentials?.password.value()).toBe("secret");
    expect(eventBus.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth.user.logged-in",
        session
      })
    );
  });

  it("does not call the repository when credentials are invalid", async () => {
    const authRepository: AuthRepository = {
      login: vi.fn(),
      register: vi.fn()
    };
    const eventBus: EventBus = {
      publish: vi.fn(),
      subscribe: vi.fn()
    };

    await expect(
      new LoginUserUseCase(authRepository, eventBus).execute({
        username: "fi",
        password: "secret"
      })
    ).rejects.toThrow("Kullanici adi en az 3 karakter olmali.");

    expect(authRepository.login).not.toHaveBeenCalled();
    expect(eventBus.publish).not.toHaveBeenCalled();
  });
});
