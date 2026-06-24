const products = [
  { id: "p-1", name: "Basic T-Shirt", price: "₺399" },
  { id: "p-2", name: "Clean Sneakers", price: "₺1299" },
  { id: "p-3", name: "Daily Backpack", price: "₺899" }
];

export default function CatalogPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Catalog</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Step 1 icin catalog presentation iskeleti.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {products.map((product) => (
          <article className="rounded border border-zinc-200 p-4" key={product.id}>
            <h2 className="font-medium">{product.name}</h2>
            <p className="mt-2 text-sm text-zinc-600">{product.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
