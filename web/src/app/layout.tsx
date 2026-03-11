/**
 * FlowTalos — Root Layout
 * =========================
 * Next.js App Router root layout. Configures:
 *   - Google Fonts:    Outfit (headings) + Roboto Mono (code/data)
 *   - SEO Metadata:    Title, description, and lang attribute
 *   - Provider Wrap:   Web3Provider for EVM wallet connectivity
 *   - Hydration Fix:   suppressHydrationWarning on <html> and <body>
 *   - LocalStorage:    patch-localstorage imported for SSR safety
 *
 * @module app/layout
 */

import "@/lib/patch-localstorage";
import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowTalos | Autonomous DeFi",
  description: "Glass-Box AI Wealth Manager Built on Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${robotoMono.variable} font-sans antialiased`} style={{ backgroundColor: "#020a06" }} suppressHydrationWarning>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
