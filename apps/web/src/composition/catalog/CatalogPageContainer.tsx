"use client";

import { useMemo } from "react";
import { CatalogPageView } from "@/features/catalog/presentation/CatalogPageView";
import { createCatalogComposition } from "./catalogComposition";

export function CatalogPageContainer() {
  const services = useMemo(() => createCatalogComposition(), []);

  return <CatalogPageView getProductsQuery={services.getProductsQuery} />;
}
