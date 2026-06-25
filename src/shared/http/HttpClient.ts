export type HttpRequestBody = unknown;

export interface HttpClientPort {
  get<TResponse>(path: string): Promise<TResponse>;
  post<TResponse>(
    path: string,
    body: HttpRequestBody
  ): Promise<TResponse>;
}
