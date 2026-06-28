import { GetProductsQuery } from "@core/features/catalog/application";
import {
  ApiProductRepository,
  createCatalogApiClient
} from "@core/features/catalog/infrastructure";

export function createCatalogComposition() {
  return {
    getProductsQuery: new GetProductsQuery(
      new ApiProductRepository(createCatalogApiClient())
    )
  };
}

export type CatalogComposition = ReturnType<typeof createCatalogComposition>;
