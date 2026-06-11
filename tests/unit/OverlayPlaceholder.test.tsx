import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OverlayPlaceholder } from "@/components/OverlayPlaceholder";

describe("OverlayPlaceholder", () => {
  it("renders its label and the placeholder copy when open", () => {
    render(<OverlayPlaceholder open label="Comments" onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Comments");
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    render(<OverlayPlaceholder open label="Saved" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape when open", async () => {
    const onClose = vi.fn();
    render(<OverlayPlaceholder open label="Liked" onClose={onClose} />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });
});
