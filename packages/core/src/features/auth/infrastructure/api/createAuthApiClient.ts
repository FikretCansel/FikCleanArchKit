import { createHttpClient, type HttpClientOptions } from "@core/shared/http";
import { AuthApiClient } from "./AuthApiClient";

export function createAuthApiClient(options: HttpClientOptions = {}): AuthApiClient {
  return new AuthApiClient(createHttpClient(options));
}
