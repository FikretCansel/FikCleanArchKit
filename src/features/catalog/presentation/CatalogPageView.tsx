"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GetProductsQuery,
  productListState
} from "../application";
import type { ProductListState } from "../application";
import {
  ApiProductRepository,
  createCatalogApiClient
} from "../infrastructure";
import { ProductListStateView } from "./ProductListStateView";
import type { ProductListMode } from "../domain";

export function CatalogPageView() {
  const [state, setState] = useState<ProductListState>(
    productListState.loading()
  );

  const getProductsQuery = useMemo(() => {
    return new GetProductsQuery(
      new ApiProductRepository(createCatalogApiClient())
    );
  }, []);

  const loadProducts = useCallback(async (mode: ProductListMode = "default") => {
    setState(productListState.loading());
    setState(await getProductsQuery.execute(mode));
  }, [getProductsQuery]);

  useEffect(() => {
    let isActive = true;

    getProductsQuery.execute().then((nextState) => {
      if (isActive) {
        setState(nextState);
      }
    });

    return () => {
      isActive = false;
    };
  }, [getProductsQuery]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Catalog</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Urun listesi GetProductsQuery ile API&apos;den yuklenir.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
          onClick={() => loadProducts("default")}
          type="button"
        >
          Loaded
        </button>
        <button
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
          onClick={() => loadProducts("empty")}
          type="button"
        >
          Empty
        </button>
        <button
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
          onClick={() => loadProducts("error")}
          type="button"
        >
          Error
        </button>
      </div>
      <div className="mt-6">
        <ProductListStateView state={state} onRetry={loadProducts} />
      </div>
    </main>
  );
}
