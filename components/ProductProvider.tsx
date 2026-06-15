"use client";

import { createContext, useContext } from "react";
import type { ProductBundle } from "@/data/types";

const ProductContext = createContext<ProductBundle | null>(null);

export function ProductProvider({
  bundle,
  children,
}: {
  bundle: ProductBundle;
  children: React.ReactNode;
}) {
  return <ProductContext.Provider value={bundle}>{children}</ProductContext.Provider>;
}

/** Read the active product bundle. Sections call this instead of importing a
 * singleton, so the same section renders any product the engine hands it. */
export function useProduct(): ProductBundle {
  const bundle = useContext(ProductContext);
  if (!bundle) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return bundle;
}
