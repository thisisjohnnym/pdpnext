import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShopTheLook } from "@/components/sections/ShopTheLook";
import { ProductProvider } from "@/components/ProductProvider";
import { tabby } from "@/data/products";

function renderShopTheLook() {
  return render(
    <ProductProvider bundle={tabby}>
      <ShopTheLook />
    </ProductProvider>,
  );
}

describe("ShopTheLook", () => {
  it("renders a real product row for every item with its price", () => {
    renderShopTheLook();
    for (const item of tabby.shopTheLook.items) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.price)).toBeInTheDocument();
    }
  });

  it("renders the editorial title", () => {
    renderShopTheLook();
    expect(screen.getByText("Shop the")).toBeInTheDocument();
    expect(screen.getByText("look —")).toBeInTheDocument();
  });
});
