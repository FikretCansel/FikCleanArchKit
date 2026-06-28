import { createHttpClient } from "@core/shared/http";
import { CatalogApiClient } from "./CatalogApiClient";

export function createCatalogApiClient(): CatalogApiClient {
  return new CatalogApiClient(createHttpClient());
}
