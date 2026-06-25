import type {
  AuthApiClientPort,
  AuthApiPath,
  AuthApiRequest,
  AuthApiResponse
} from "../AuthApiClient";

export class AuthFetchApiClient implements AuthApiClientPort {
  async post(
    path: AuthApiPath,
    body: AuthApiRequest
  ): Promise<AuthApiResponse> {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message ?? "Auth istegi basarisiz oldu.");
    }

    return payload;
  }
}
