import type { ProductBundle } from "@/data/types";

export const jade: ProductBundle = {
  slug: "jade",
  product: {
    brand: "Coach",
    handle: "@coachny",
    title: "Jade",
    subtitle: "Drawstring bag",
    edition: "— bag",
    caption: "Grain leather, brass hardware",
    color: "burnished amber",
    material: "grain leather",
    price: "$350",
    hero: {
      topLeft: ["Jade", "Drawstring bag"],
      topRight: ["— amber", "grain", "leather"],
    },
  },
  tiktokVideos: [
    {
      id: "coachny-jade-01",
      handle: "@coachny",
      poster: "/img/jade/a91.webp",
      sources: [{ src: "/video/jade/hero.mp4", type: "video/mp4" }],
      socials: { comments: "318" },
    },
  ],
  threeSixty: {
    poster: "/img/jade/a0.webp",
    src: "/video/jade/spin360.mp4",
    ctaLabel: "360° View",
  },
  galleryThumb: {
    src: "/img/jade/a92.webp",
    alt: "Model carrying the burnished amber Jade drawstring bag on the shoulder",
  },
  shopTheLook: {
    model: {
      src: "/img/jade/a91.webp",
      alt: "Full-length look: white tee, faded denim, and the Jade drawstring bag worn crossbody",
    },
    items: [
      {
        id: "jade-drawstring",
        name: "Jade Drawstring Bag",
        price: "$350",
        image: "/img/jade/a0.webp",
      },
      {
        id: "signature-strap",
        name: "Signature Crossbody Strap",
        price: "$95",
        image: "/img/jade/a91.webp",
      },
    ],
  },
  morePhotos: {
    columnOne: [
      { src: "/img/jade/a0.webp", alt: "Front of the Jade drawstring bag with brass grommets" },
      { src: "/img/jade/a3.webp", alt: "Three-quarter angle of the Jade drawstring bag" },
      { src: "/img/jade/a5.webp", alt: "Front of the Jade bag with the straps drawn long" },
    ],
    columnTwo: [
      { src: "/img/jade/a6.webp", alt: "Interior of the Jade bag holding everyday items" },
      { src: "/img/jade/a8.webp", alt: "Top-down view into the canvas-lined Jade bag" },
      { src: "/img/jade/a10.webp", alt: "Close-up of the grain leather and contrast stitching" },
    ],
  },
  colorways: [
    { id: "amber", name: "Burnished Amber", swatch: "#a5552c" },
    { id: "chalk", name: "Chalk", swatch: "#ece7df" },
    { id: "black", name: "Black", swatch: "#1a1a1a" },
    { id: "khaki-signature", name: "Khaki Signature", swatch: "#9a8463" },
    { id: "moss", name: "Moss", swatch: "#5b5e3f" },
  ],
  bagUpsell: [
    { id: "horse-carriage-charm", name: "Horse And Carriage Charm", price: "$85", image: "/img/jade/a5.webp" },
    { id: "leather-care-kit", name: "Leather Care Kit", price: "$45", image: "/img/jade/a10.webp" },
    { id: "canvas-pouch", name: "Signature Canvas Pouch", price: "$75", image: "/img/jade/a8.webp" },
  ],
  relatedProducts: [
    { id: "rel-1", name: "Jade Drawstring Bag", price: "$350", image: "/img/jade/a92.webp" },
    { id: "rel-2", name: "Jade Bucket Bag", price: "$395", image: "/img/jade/a6.webp" },
    { id: "rel-3", name: "Soft Drawstring 18", price: "$325", image: "/img/jade/a3.webp" },
    { id: "rel-4", name: "Jade Crossbody", price: "$295", image: "/img/jade/a91.webp" },
  ],
  seo: {
    title: "Jade Drawstring Bag — Coach",
    description:
      "Jade Drawstring Bag in burnished amber grain leather. An editorial look at Coach's drawstring bucket bag.",
  },
};
