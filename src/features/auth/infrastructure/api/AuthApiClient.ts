import type { HttpClientPort } from "@/shared/http";

export type AuthApiResponse = {
  user: {
    username: string;
    displayName: string;
  };
  token: string;
};

export type AuthApiPath = "/user/login" | "/user/register";

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
