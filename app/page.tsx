import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/sections/Hero";
import { ProductIntro } from "@/components/sections/ProductIntro";
import { ThreeSixtyView } from "@/components/sections/ThreeSixtyView";
import { ShopTheLook } from "@/components/sections/ShopTheLook";
import { MorePhotos } from "@/components/sections/MorePhotos";
import { MoreLikeThis } from "@/components/sections/MoreLikeThis";

export default function Home() {
  return (
    <main className="page-shell relative">
      <TopBar />
      <Hero />
      <ProductIntro />
      <ThreeSixtyView />
      <ShopTheLook />
      <MorePhotos />
      <MoreLikeThis />
    </main>
  );
}
