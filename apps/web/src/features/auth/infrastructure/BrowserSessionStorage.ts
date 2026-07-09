const sessionKey = "cleanshop.auth.session";

export type BrowserSessionSnapshot = {
  username: string;
  token: string;
};

export class BrowserSessionStorage {
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
