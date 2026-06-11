import localFont from "next/font/local";

export const displayFont = localFont({
  src: "../public/fonts/HelveticaNeueLTPro-LtEx.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
  variable: "--font-display",
});

export const labelFont = localFont({
  src: "../public/fonts/HelveticaNeueLTPro-Ex.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-label",
});

export const bodyFont = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeueLTPro-Lt.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueLTPro-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueLTPro-Md.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-body",
});
