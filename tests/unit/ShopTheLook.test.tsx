import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShopTheLook } from "@/components/sections/ShopTheLook";
import { shopTheLook } from "@/data/product";

describe("ShopTheLook", () => {
  it("renders a real product row for every item with its price", () => {
    render(<ShopTheLook />);
    for (const item of shopTheLook.items) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.price)).toBeInTheDocument();
    }
  });

  it("renders the editorial title", () => {
    render(<ShopTheLook />);
    expect(screen.getByText("Shop the")).toBeInTheDocument();
    expect(screen.getByText("look —")).toBeInTheDocument();
  });
});
