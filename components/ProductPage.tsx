import type { ProductBundle } from "@/data/types";
import { ProductProvider } from "@/components/ProductProvider";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/sections/Hero";
import { ProductIntro } from "@/components/sections/ProductIntro";
import { ThreeSixtyView } from "@/components/sections/ThreeSixtyView";
import { ShopTheLook } from "@/components/sections/ShopTheLook";
import { MorePhotos } from "@/components/sections/MorePhotos";
import { MoreLikeThis } from "@/components/sections/MoreLikeThis";
import { ProductActions } from "@/components/ProductActions";

/** The editorial PDP engine: one section stack, fed any product bundle. */
export function ProductPage({ bundle }: { bundle: ProductBundle }) {
  return (
    <ProductProvider bundle={bundle}>
      <main className="page-shell relative">
        <TopBar />
        <Hero />
        <ProductIntro />
        <ThreeSixtyView />
        <ShopTheLook />
        <MorePhotos />
        <MoreLikeThis />
        <ProductActions />
      </main>
    </ProductProvider>
  );
}
