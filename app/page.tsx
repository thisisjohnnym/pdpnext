import { ProductPage } from "@/components/ProductPage";
import { tabby } from "@/data/products";

export default function Home() {
  return <ProductPage bundle={tabby} />;
}
