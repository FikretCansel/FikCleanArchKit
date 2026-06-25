import type { HttpClientPort, HttpRequestBody } from "../HttpClient";

export class FetchHttpClient implements HttpClientPort {
  constructor(private readonly baseUrl = "") {}

  async get<TResponse>(path: string): Promise<TResponse> {
    return this.request<TResponse>(path, {
      method: "GET"
    });
  }

  async post<TResponse>(
    path: string,
    body: HttpRequestBody
  ): Promise<TResponse> {
    return this.request<TResponse>(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  private async request<TResponse>(
    path: string,
    init: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(this.resolveUrl(path), init);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message ?? "API istegi basarisiz oldu.");
    }

    return payload;
  }

  private resolveUrl(path: string): string {
    if (!this.baseUrl || /^https?:\/\//.test(path)) {
      return path;
    }

    return new URL(path, this.baseUrl).toString();
  }
}
