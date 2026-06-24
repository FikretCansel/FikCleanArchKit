import type { FeatureModuleDefinition } from "@/shared/architecture";

export const catalogModule: FeatureModuleDefinition = {
  name: "Catalog",
  boundedContext: "catalog",
  path: "src/features/catalog",
  responsibility: "Product listing and product read state.",
  layers: ["domain", "application", "infrastructure", "presentation"],
  publicApi: [
    "Product read models",
    "GetProductsQuery",
    "ProductListState",
    "ProductRepository contracts"
  ],
  communication: "events"
};
