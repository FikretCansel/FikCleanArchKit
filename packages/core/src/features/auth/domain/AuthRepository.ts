import type { AuthSession } from "./AuthSession";
import type { Password } from "./Password";
import type { UserIdentity } from "./UserIdentity";

export interface AuthRepository {
  login(credentials: {
    username: UserIdentity;
    password: Password;
  }): Promise<AuthSession>;
  register(credentials: {
    username: UserIdentity;
    password: Password;
  }): Promise<AuthSession>;
}
