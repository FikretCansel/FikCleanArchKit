import { NextResponse } from "next/server";
import type { Product } from "@/features/catalog/domain";

const products: Product[] = [
  {
    id: "p-1",
    name: "Basic T-Shirt",
    price: 399,
    currency: "TRY",
    stock: 12
  },
  {
    id: "p-2",
    name: "Clean Sneakers",
    price: 1299,
    currency: "TRY",
    stock: 6
  },
  {
    id: "p-3",
    name: "Daily Backpack",
    price: 899,
    currency: "TRY",
    stock: 0
  }
];

export function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");

  if (mode === "empty") {
    return NextResponse.json({ products: [] });
  }

  if (mode === "error") {
    return NextResponse.json(
      { message: "Catalog API gecici olarak kullanilamiyor." },
      { status: 500 }
    );
  }

  return NextResponse.json({ products });
}
