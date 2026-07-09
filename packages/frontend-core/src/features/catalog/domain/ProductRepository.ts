import type { Product } from "./Product";

export type ProductListMode = "default" | "empty" | "error";

export interface ProductRepository {
  findAll(mode?: ProductListMode): Promise<Product[]>;
}
