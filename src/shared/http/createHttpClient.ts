import type { HttpClientPort } from "./HttpClient";
import { FetchHttpClient } from "./adapters/FetchHttpClient";

export type HttpClientOptions = {
  baseUrl?: string;
};

export function createHttpClient(options: HttpClientOptions = {}): HttpClientPort {
  return new FetchHttpClient(options.baseUrl);
}
