import type { EventBus } from "@/shared/events/EventBus";
import type { UserLoggedInEvent } from "@/features/auth/domain";
import type { ToastMessage } from "../domain/ToastMessage";

export type ToastHandler = (toast: ToastMessage) => void;

export class AuthToastSubscriber {
  constructor(
    private readonly eventBus: EventBus,
    private readonly onToast: ToastHandler
  ) {}

  subscribe(): () => void {
    return this.eventBus.subscribe<UserLoggedInEvent>(
      "auth.user.logged-in",
      (event) => {
        this.onToast({
          id: `${event.type}-${event.occurredAt.getTime()}`,
          message: `${event.session.user.value()} login oldu.`,
          tone: "success"
        });
      }
    );
  }
}
