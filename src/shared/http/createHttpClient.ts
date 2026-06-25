import type { HttpClientPort } from "./HttpClient";
import { FetchHttpClient } from "./adapters/FetchHttpClient";

export function createHttpClient(): HttpClientPort {
  return new FetchHttpClient();
}
