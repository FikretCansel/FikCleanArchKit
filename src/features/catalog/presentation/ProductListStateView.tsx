import type { ReactNode } from "react";
import type { Product } from "../domain";
import type { ProductListState } from "../application";

type ProductListStateViewProps = {
  state: ProductListState;
  onRetry: () => void;
};

const stateViews: Record<
  ProductListState["status"],
  (props: ProductListStateViewProps) => ReactNode
> = {
  loading: () => (
    <div className="rounded border border-zinc-200 p-4 text-sm text-zinc-600">
      Urunler yukleniyor...
    </div>
  ),
  empty: () => <NotFoundView />,
  loaded: ({ state }) => (
    <ProductGrid products={state.status === "loaded" ? state.products : []} />
  ),
  error: ({ state, onRetry }) => (
    <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <p>{state.status === "error" ? state.message : "Urunler yuklenemedi."}</p>
      <button className="mt-3 underline" onClick={onRetry} type="button">
        Tekrar dene
      </button>
    </div>
  )
};

export function ProductListStateView(props: ProductListStateViewProps) {
  return stateViews[props.state.status](props);
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {products.map((product) => (
        <article className="rounded border border-zinc-200 p-4" key={product.id}>
          <h2 className="font-medium">{product.name}</h2>
          <p className="mt-2 text-sm text-zinc-600">
            {product.price} {product.currency}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Stok: {product.stock}</p>
        </article>
      ))}
    </div>
  );
}

function NotFoundView() {
  return (
    <div className="rounded border border-zinc-200 p-4 text-sm text-zinc-600">
      Not Found: urun bulunamadi.
    </div>
  );
}
