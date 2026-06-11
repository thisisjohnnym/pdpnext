import { describe, it, expect } from "vitest";
import {
  product,
  tiktokVideos,
  threeSixty,
  galleryThumb,
  shopTheLook,
  morePhotos,
  relatedProducts,
} from "@/data/product";

describe("product data integrity", () => {
  it("exposes the core product fields", () => {
    expect(product.title).toBe("Tabby");
    expect(product.subtitle).toBe("Shoulder bag");
    expect(product.edition).toContain("26");
    expect(product.handle).toMatch(/^@/);
  });

  it("has at least one hero clip with web-playable sources", () => {
    expect(tiktokVideos.length).toBeGreaterThan(0);
    const clip = tiktokVideos[0];
    expect(clip.sources.length).toBeGreaterThanOrEqual(1);
    for (const s of clip.sources) {
      expect(s.src).toMatch(/^\/video\//);
      expect(s.type).toMatch(/^video\//);
    }
    expect(clip.poster).toMatch(/^\/img\//);
  });

  it("points the 360 view at an mp4", () => {
    expect(threeSixty.src).toMatch(/\.mp4$/);
    expect(threeSixty.ctaLabel).toBeTruthy();
  });

  it("uses local asset paths for every image", () => {
    const images = [
      galleryThumb.src,
      shopTheLook.model.src,
      ...shopTheLook.items.map((i) => i.image),
      ...morePhotos.columnOne.map((p) => p.src),
      ...morePhotos.columnTwo.map((p) => p.src),
      ...relatedProducts.map((r) => r.image),
    ];
    for (const src of images) {
      expect(src).toMatch(/^\/img\//);
    }
  });

  it("gives every shop-the-look and related item a price", () => {
    for (const item of [...shopTheLook.items, ...relatedProducts]) {
      expect(item.price).toMatch(/^\$\d+/);
      expect(item.name.length).toBeGreaterThan(0);
    }
  });

  it("splits more photos into two balanced columns", () => {
    expect(morePhotos.columnOne.length).toBe(3);
    expect(morePhotos.columnTwo.length).toBe(3);
  });

  it("has enough related products to require horizontal scrolling", () => {
    expect(relatedProducts.length).toBeGreaterThanOrEqual(3);
  });
});
