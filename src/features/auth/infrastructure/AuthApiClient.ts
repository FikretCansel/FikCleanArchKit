export type AuthApiResponse = {
  user: {
    username: string;
    displayName: string;
  };
  token: string;
};

export class AuthApiClient {
  async post(path: "/user/login" | "/user/register", body: {
    username: string;
    password: string;
  }): Promise<AuthApiResponse> {
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
