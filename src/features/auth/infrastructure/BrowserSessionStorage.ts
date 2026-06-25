import type { AuthSession } from "../domain";

const sessionKey = "cleanshop.auth.session";

export type BrowserSessionSnapshot = {
  username: string;
  token: string;
};

export class BrowserSessionStorage {
  save(session: AuthSession): void {
    this.saveSnapshot({
      username: session.user.value(),
      token: session.token.value()
    });
  }

  saveSnapshot(session: BrowserSessionSnapshot): void {
    window.localStorage.setItem(
      sessionKey,
      JSON.stringify({
        username: session.username,
        token: session.token
      })
    );
  }

  clear(): void {
    window.localStorage.removeItem(sessionKey);
  }
}
