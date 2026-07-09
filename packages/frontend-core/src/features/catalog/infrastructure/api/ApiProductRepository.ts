import type { Product, ProductListMode, ProductRepository } from "../../domain";
import type { CatalogApiClientPort } from "./CatalogApiClient";

export class ApiProductRepository implements ProductRepository {
  constructor(private readonly apiClient: CatalogApiClientPort) {}

  async findAll(mode?: ProductListMode): Promise<Product[]> {
    const response = await this.apiClient.getProducts(mode);

    return response.products;
  }
}
