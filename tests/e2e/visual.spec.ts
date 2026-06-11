import { test, expect } from "@playwright/test";
import { waitForReady, freezeMedia, waitForImagesIn, loadAllLazyImages } from "./helpers";

const sections = [
  "hero",
  "product-intro",
  "three-sixty",
  "shop-the-look",
  "more-photos",
  "more-like-this",
] as const;

test.beforeEach(async ({ page }) => {
  // Reduced motion disables pins/parallax and forces reveals visible, which makes
  // the layout deterministic for visual-regression snapshots.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await waitForReady(page);
});

test("full page", async ({ page }) => {
  await loadAllLazyImages(page);
  await freezeMedia(page);
  await expect(page).toHaveScreenshot("full-page.png", { fullPage: true });
});

for (const id of sections) {
  test(`section: ${id}`, async ({ page }) => {
    const el = page.getByTestId(id);
    await el.scrollIntoViewIfNeeded();
    await waitForImagesIn(el);
    await freezeMedia(page);
    await expect(el).toHaveScreenshot(`section-${id}.png`);
  });
}
