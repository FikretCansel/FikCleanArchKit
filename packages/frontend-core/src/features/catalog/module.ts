import type { FeatureModuleDefinition } from "@core/shared/architecture";

export const catalogModule: FeatureModuleDefinition = {
  name: "Catalog",
  boundedContext: "catalog",
  path: "packages/frontend-core/src/features/catalog",
  responsibility: "Product listing and product read state.",
  layers: ["domain", "application", "infrastructure"],
  publicApi: [
    "Product read models",
    "GetProductsQuery",
    "ProductListState",
    "ProductRepository contracts"
  ],
  communication: "events"
};
