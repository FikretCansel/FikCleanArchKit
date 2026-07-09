import type { HttpClientPort, HttpRequestBody } from "../HttpClient";

type AxiosLikeClient = {
  get<TResponse>(path: string): Promise<{ data: TResponse }>;
  post<TResponse>(
    path: string,
    body: HttpRequestBody
  ): Promise<{ data: TResponse }>;
};

export class AxiosHttpClient implements HttpClientPort {
  constructor(private readonly axiosClient: AxiosLikeClient) {}

  async get<TResponse>(path: string): Promise<TResponse> {
    const response = await this.axiosClient.get<TResponse>(path);

    return response.data;
  }

  async post<TResponse>(
    path: string,
    body: HttpRequestBody
  ): Promise<TResponse> {
    const response = await this.axiosClient.post<TResponse>(path, body);

    return response.data;
  }
}
