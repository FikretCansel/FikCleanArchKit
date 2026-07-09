import type { HttpClientPort } from "@core/shared/http";

export type AuthApiResponse = {
  user: {
    username: string;
    displayName: string;
  };
  token: string;
};

export type AuthApiPath = "/api/user/login" | "/api/user/register";

export type AuthApiRequest = {
  username: string;
  password: string;
};

export interface AuthApiClientPort {
  post(path: AuthApiPath, body: AuthApiRequest): Promise<AuthApiResponse>;
}

export class AuthApiClient implements AuthApiClientPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async post(
    path: AuthApiPath,
    body: AuthApiRequest
  ): Promise<AuthApiResponse> {
    return this.httpClient.post<AuthApiResponse>(path, body);
  }
}
