import type { FeatureModuleDefinition } from "@/shared/architecture";

export const catalogModule: FeatureModuleDefinition = {
  name: "Catalog",
  boundedContext: "catalog",
  path: "src/features/catalog",
  responsibility: "Product listing and product read state.",
  layers: ["domain", "application", "infrastructure", "presentation"],
  publicApi: ["Product read models", "Catalog queries", "Product repository contracts"],
  communication: "events"
};
