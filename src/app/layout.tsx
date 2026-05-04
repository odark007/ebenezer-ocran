// src/app/layout.tsx

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
// --- ADD THESE IMPORTS ---
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 


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
          <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
      </head>
      {/* We already established Phase 3. Let's make sure the suppressedHydrationWarning is present as discussed previously */}
      <body className={`${playfairDisplay.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning>
        <Navbar /> {/* Now this is defined */}
        {children}
        <Footer /> {/* Now this is defined */}
      </body>
    </html>
  );
}