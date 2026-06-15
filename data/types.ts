export type TikTokVideo = {
  id: string;
  handle: string;
  poster: string;
  sources: { src: string; type: string }[];
  socials: { comments: string };
};

export type Photo = {
  src: string;
  alt: string;
};

export type LookItem = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export type RelatedProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export type Colorway = {
  id: string;
  name: string;
  /** Placeholder swatch fill (hex). Real assets/leather swatches come later. */
  swatch: string;
};

export type BagUpsellItem = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export type ProductMeta = {
  brand: string;
  handle: string;
  title: string;
  subtitle: string;
  edition: string;
  caption: string;
  color: string;
  material: string;
  price: string;
  hero: {
    topLeft: string[];
    topRight: string[];
  };
};

export type ThreeSixty = {
  poster: string;
  src: string;
  ctaLabel: string;
};

export type ShopTheLook = {
  model: Photo;
  items: LookItem[];
};

export type MorePhotos = {
  columnOne: Photo[];
  columnTwo: Photo[];
};

export type ProductSeo = {
  title: string;
  description: string;
};

/**
 * Everything one editorial PDP needs, in a single typed object. The page engine
 * resolves a bundle by slug and feeds it to the section stack via context, so a
 * new product is just a new bundle in the registry.
 */
export type ProductBundle = {
  slug: string;
  product: ProductMeta;
  tiktokVideos: TikTokVideo[];
  threeSixty: ThreeSixty;
  galleryThumb: Photo;
  shopTheLook: ShopTheLook;
  morePhotos: MorePhotos;
  colorways: Colorway[];
  bagUpsell: BagUpsellItem[];
  relatedProducts: RelatedProduct[];
  seo: ProductSeo;
};
