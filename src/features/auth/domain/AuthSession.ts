import type { Token } from "./Token";
import type { UserIdentity } from "./UserIdentity";

export type AuthSession = {
  readonly user: UserIdentity;
  readonly token: Token;
};
