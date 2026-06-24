import type { AuthSession } from "../domain";

const sessionKey = "cleanshop.auth.session";

export class BrowserSessionStorage {
  save(session: AuthSession): void {
    window.localStorage.setItem(
      sessionKey,
      JSON.stringify({
        username: session.user.value(),
        token: session.token.value()
      })
    );
  }

  clear(): void {
    window.localStorage.removeItem(sessionKey);
  }
}
