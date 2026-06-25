import { createHttpClient } from "@/shared/http";
import { AuthApiClient } from "./AuthApiClient";

export function createAuthApiClient(): AuthApiClient {
  return new AuthApiClient(createHttpClient());
}
