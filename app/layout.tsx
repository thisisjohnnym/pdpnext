import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont, labelFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tabby Shoulder Bag 26 — Coach",
  description:
    "Tabby Shoulder Bag 26 in black quilted leather. An editorial look at Coach's pillow Tabby.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${labelFont.variable} ${bodyFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
