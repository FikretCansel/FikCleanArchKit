import type { Product } from "../domain";

export type ProductListState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "loaded"; products: Product[] }
  | { status: "error"; message: string };

export const productListState = {
  loading(): ProductListState {
    return { status: "loading" };
  },
  empty(): ProductListState {
    return { status: "empty" };
  },
  loaded(products: Product[]): ProductListState {
    return { status: "loaded", products };
  },
  error(message: string): ProductListState {
    return { status: "error", message };
  }
};
