import type { ProductBundle } from "@/data/types";
import { tabby } from "./tabby";
import { jade } from "./jade";

/** Registry of every editorial PDP, keyed by URL slug. Add a product here and
 * the engine (route, metadata, static params) picks it up automatically. */
export const products = {
  tabby,
  jade,
} satisfies Record<string, ProductBundle>;

export type Slug = keyof typeof products;

export const slugs = Object.keys(products) as Slug[];

export function getProduct(slug: string): ProductBundle | undefined {
  return (products as Record<string, ProductBundle>)[slug];
}

export { tabby, jade };
