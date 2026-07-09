import type { ProductListMode, ProductRepository } from "../domain";
import { productListState } from "./ProductListState";
import type { ProductListState } from "./ProductListState";

export class GetProductsQuery {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(mode: ProductListMode = "default"): Promise<ProductListState> {
    try {
      const products = await this.productRepository.findAll(mode);

      if (products.length === 0) {
        return productListState.empty();
      }

      return productListState.loaded(products);
    } catch (error) {
      return productListState.error(
        error instanceof Error ? error.message : "Urunler yuklenemedi."
      );
    }
  }
}
