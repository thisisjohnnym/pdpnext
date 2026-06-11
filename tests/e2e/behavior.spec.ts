import { test, expect } from "@playwright/test";
import { waitForReady } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await waitForReady(page);
});

test("renders every section", async ({ page }) => {
  for (const id of [
    "hero",
    "product-intro",
    "three-sixty",
    "shop-the-look",
    "more-photos",
    "more-like-this",
  ]) {
    await expect(page.getByTestId(id)).toBeAttached();
  }
});

test("hero social action opens and closes the overlay", async ({ page }) => {
  const overlay = page.getByTestId("overlay");
  await expect(overlay).toHaveAttribute("data-open", "false");

  await page.getByRole("button", { name: /comments/i }).click();
  await expect(overlay).toHaveAttribute("data-open", "true");
  await expect(page.getByText("Coming soon")).toBeVisible();

  await overlay.getByRole("button", { name: "Close" }).click();
  await expect(overlay).toHaveAttribute("data-open", "false");
});

test("hero video stays pinned during scroll", async ({ page }) => {
  const video = page.getByTestId("hero-video");
  const before = await video.boundingBox();
  await page.evaluate(() => window.scrollTo(0, 320));
  await page.waitForTimeout(450);
  const after = await video.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  // Pinned: the video should not move up with the scroll.
  expect(Math.abs((after?.y ?? 0) - (before?.y ?? 0))).toBeLessThan(10);
});

test("shop the look locks to a fullscreen stage while scrolling", async ({ page }) => {
  const stage = page.getByTestId("stl-stage");

  // Scroll so the stage top reaches the viewport top and pins.
  await page.evaluate(() => {
    const el = document.querySelector('[data-testid="shop-the-look"]') as HTMLElement;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + 150);
  });
  await page.waitForTimeout(450);

  const locked = await stage.boundingBox();
  expect(locked).not.toBeNull();
  // Pinned: the stage sticks to the top of the viewport.
  expect(Math.abs(locked?.y ?? 999)).toBeLessThan(5);

  // Scroll further within the lock range — it stays pinned at the top.
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(450);
  const stillLocked = await stage.boundingBox();
  expect(stillLocked).not.toBeNull();
  expect(Math.abs(stillLocked?.y ?? 999)).toBeLessThan(5);
});

test("more like this hijacks vertical scroll into horizontal progress", async ({ page }) => {
  const section = page.getByTestId("more-like-this");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const readWidth = () =>
    page.getByTestId("mlt-progress").evaluate((el) => parseFloat((el as HTMLElement).style.width) || 0);

  const start = await readWidth();
  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(900);
  const end = await readWidth();

  expect(end).toBeGreaterThan(start);
});
