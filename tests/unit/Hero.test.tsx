import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "@/components/sections/Hero";
import { tiktokVideos } from "@/data/product";

describe("Hero", () => {
  it("renders the comment count from data", () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: `${tiktokVideos[0].socials.comments} comments` }),
    ).toBeInTheDocument();
  });

  it("opens the overlay when a social action is tapped", async () => {
    render(<Hero />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /comments/i }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Comments");
  });
});
