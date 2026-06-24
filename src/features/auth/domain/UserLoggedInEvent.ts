import type { AppEvent } from "@/shared/events/EventBus";
import type { AuthSession } from "./AuthSession";

export type UserLoggedInEvent = AppEvent & {
  readonly type: "auth.user.logged-in";
  readonly session: AuthSession;
};

export function createUserLoggedInEvent(session: AuthSession): UserLoggedInEvent {
  return {
    type: "auth.user.logged-in",
    occurredAt: new Date(),
    session
  };
}
