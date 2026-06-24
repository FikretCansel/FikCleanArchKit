import type { AuthRepository, AuthSession, Password, UserIdentity } from "../domain";
import { Token } from "../domain";
import type { AuthApiClient } from "./AuthApiClient";

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly apiClient: AuthApiClient) {}

  async login(credentials: {
    username: UserIdentity;
    password: Password;
  }): Promise<AuthSession> {
    return this.authenticate("/user/login", credentials);
  }

  async register(credentials: {
    username: UserIdentity;
    password: Password;
  }): Promise<AuthSession> {
    return this.authenticate("/user/register", credentials);
  }

  private async authenticate(
    path: "/user/login" | "/user/register",
    credentials: {
      username: UserIdentity;
      password: Password;
    }
  ): Promise<AuthSession> {
    const response = await this.apiClient.post(path, {
      username: credentials.username.value(),
      password: credentials.password.value()
    });

    return {
      user: credentials.username,
      token: Token.create(response.token)
    };
  }
}
