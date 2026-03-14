import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rev. Ebenezer Ocran | Proclaiming Truth, Transforming Lives",
  description: "Senior Pastor of ICGC NewLife Temple, Oyibi — Ghana. Bridging scriptural truth and everyday living for over a decade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <Script src="https://unpkg.com/@phosphor-icons/web" strategy="beforeInteractive" />
      </head>
      <body className={`${playfairDisplay.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
