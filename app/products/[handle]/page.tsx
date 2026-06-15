import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/ProductPage";
import { getProduct, slugs } from "@/data/products";

export function generateStaticParams() {
  return slugs.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const bundle = getProduct(handle);
  if (!bundle) return {};
  return {
    title: bundle.seo.title,
    description: bundle.seo.description,
  };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const bundle = getProduct(handle);
  if (!bundle) notFound();
  return <ProductPage bundle={bundle} />;
}
