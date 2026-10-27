import type { Metadata } from "next";
import { Allura, DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = DM_Serif_Display({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

const script = Allura({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TL Nails Academy",
  description: "Professional, hands-on nail education.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} ${script.variable}`}>
      <body>
        <noscript>
          <style>{"[data-reveal],[data-intro]{visibility:visible!important}"}</style>
        </noscript>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
