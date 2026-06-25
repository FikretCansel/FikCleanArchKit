import type { HttpClientPort } from "@/shared/http";
import type { Product, ProductListMode } from "../../domain";

export type CatalogApiResponse = {
  products: Product[];
};

export interface CatalogApiClientPort {
  getProducts(mode?: ProductListMode): Promise<CatalogApiResponse>;
}

export class CatalogApiClient implements CatalogApiClientPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async getProducts(
    mode: ProductListMode = "default"
  ): Promise<CatalogApiResponse> {
    const query = mode === "default" ? "" : `?mode=${mode}`;

    return this.httpClient.get<CatalogApiResponse>(`/api/products${query}`);
  }
}
