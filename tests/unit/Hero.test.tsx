import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "@/components/sections/Hero";
import { ProductProvider } from "@/components/ProductProvider";
import { tabby } from "@/data/products";

function renderHero() {
  return render(
    <ProductProvider bundle={tabby}>
      <Hero />
    </ProductProvider>,
  );
}

describe("Hero", () => {
  it("renders the comment count from data", () => {
    renderHero();
    expect(
      screen.getByRole("button", {
        name: `${tabby.tiktokVideos[0].socials.comments} comments`,
      }),
    ).toBeInTheDocument();
  });

  it("opens the overlay when a social action is tapped", async () => {
    renderHero();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /comments/i }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Comments");
  });
});
