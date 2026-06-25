import { GetProductsQuery } from "@/features/catalog/application";
import {
  ApiProductRepository,
  createCatalogApiClient
} from "@/features/catalog/infrastructure";

export function createCatalogComposition() {
  return {
    getProductsQuery: new GetProductsQuery(
      new ApiProductRepository(createCatalogApiClient())
    )
  };
}

export type CatalogComposition = ReturnType<typeof createCatalogComposition>;
