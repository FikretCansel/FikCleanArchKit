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
    const payload = await this.parseResponsePayload<TResponse>(response);

    if (!response.ok) {
      throw new Error(
        this.resolveErrorMessage(payload, response.status)
      );
    }

    return payload;
  }

  private async parseResponsePayload<TResponse>(
    response: Response
  ): Promise<TResponse> {
    const text = await response.text();

    if (!text) {
      return undefined as TResponse;
    }

    try {
      return JSON.parse(text) as TResponse;
    } catch {
      throw new Error(
        response.ok
          ? "API yaniti JSON formatinda degil."
          : `API istegi basarisiz oldu. HTTP ${response.status}`
      );
    }
  }

  private resolveErrorMessage(payload: unknown, status: number): string {
    if (
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
    ) {
      return payload.message;
    }

    return `API istegi basarisiz oldu. HTTP ${status}`;
  }

  private resolveUrl(path: string): string {
    if (!this.baseUrl || /^https?:\/\//.test(path)) {
      return path;
    }

    return new URL(path, this.baseUrl).toString();
  }
}
