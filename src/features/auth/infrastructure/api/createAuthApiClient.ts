import type { AuthApiClientPort } from "./AuthApiClient";
import { AuthFetchApiClient } from "./adapters/AuthFetchApiClient";

export function createAuthApiClient(): AuthApiClientPort {
  return new AuthFetchApiClient();
}
