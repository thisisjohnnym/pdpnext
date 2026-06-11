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

type LookItem = {
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

export const product = {
  brand: "Coach",
  handle: "@coachny",
  title: "Tabby",
  subtitle: "Shoulder bag",
  edition: "— 26",
  caption: "Versatile, with details in brass",
  color: "black",
  material: "quilted leather",
  price: "$575",
  // Hero overlay copy, laid out in the four corners of the video.
  hero: {
    topLeft: ["Tabby", "Shoulder bag"],
    topRight: ["26", "— black", "quilted leather"],
  },
};

// Curated TikTok clips. One placeholder now; the hero renders the first entry and
// is built to support a carousel of several later.
export const tiktokVideos: TikTokVideo[] = [
  {
    id: "coachny-tabby-01",
    handle: "@coachny",
    poster: "/img/hero-poster.jpg",
    sources: [
      { src: "/video/hero.webm", type: "video/webm" },
      { src: "/video/hero.mp4", type: "video/mp4" },
    ],
    socials: { comments: "543" },
  },
];

export const threeSixty = {
  poster: "/img/photo-3.webp",
  src: "/video/spin360.mp4",
  ctaLabel: "360° View",
};

// The denim image that sits below the title and parallaxes for depth.
export const galleryThumb: Photo = {
  src: "/img/gallery-denim.webp",
  alt: "Model in a denim jacket wearing the black quilted Tabby shoulder bag",
};

export const shopTheLook = {
  model: {
    src: "/img/shop-model.webp",
    alt: "Full-length look: denim trucker jacket, wide-leg jeans, and the Tabby bag",
  },
  items: [
    {
      id: "tabby-26",
      name: "Tabby Shoulder Bag 26",
      price: "$575",
      image: "/img/photo-3.webp",
    },
    {
      id: "denim-trucker",
      name: "Denim Trucker Jacket",
      price: "$395",
      image: "/img/shop-model.webp",
    },
  ] satisfies LookItem[],
};

export const morePhotos: { columnOne: Photo[]; columnTwo: Photo[] } = {
  columnOne: [
    { src: "/img/photo-1.webp", alt: "Tabby bag opened from the top, brass hardware" },
    { src: "/img/photo-2.webp", alt: "Back of the quilted Tabby bag with chain strap" },
    { src: "/img/photo-3.webp", alt: "Front of the Tabby bag with cherry charm" },
  ],
  columnTwo: [
    { src: "/img/photo-4.webp", alt: "Interior of the Tabby bag holding small items" },
    { src: "/img/photo-5.webp", alt: "Three-quarter back view of the quilted Tabby" },
    { src: "/img/photo-6.webp", alt: "Close-up of the brass C hardware and chain" },
  ],
};

export const relatedProducts: RelatedProduct[] = [
  { id: "rel-1", name: "Tabby Shoulder Bag 26", price: "$550", image: "/img/related-model.webp" },
  { id: "rel-2", name: "Tabby Quilted 26", price: "$575", image: "/img/photo-6.webp" },
  { id: "rel-3", name: "Tabby Pillow 26", price: "$550", image: "/img/photo-3.webp" },
  { id: "rel-4", name: "Tabby Shoulder Bag 26", price: "$550", image: "/img/related-model.webp" },
];
