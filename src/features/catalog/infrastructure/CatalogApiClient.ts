import type { Product } from "../domain";
import type { ProductListMode } from "../domain";

export type CatalogApiResponse = {
  products: Product[];
};

export class CatalogApiClient {
  async getProducts(mode: ProductListMode = "default"): Promise<CatalogApiResponse> {
    const query = mode === "default" ? "" : `?mode=${mode}`;
    const response = await fetch(`/api/products${query}`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message ?? "Urunler yuklenemedi.");
    }

    return payload;
  }
}
