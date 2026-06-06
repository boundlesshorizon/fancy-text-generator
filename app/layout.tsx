import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fancy Text Generator — 101 Styles for Instagram, Twitter & TikTok",
  description: "Free fancy text generator with 101 font styles. Convert any text to bold, italic, cursive, bubble, Gothic fonts and more. Perfect for Instagram bios, Twitter, TikTok and Facebook.",
  keywords: "fancy text generator, fancy fonts, instagram fonts, cool text generator, fancy letters, font generator, text converter, cursive text, bold text generator",
  openGraph: {
    title: "Fancy Text Generator — 101 Styles for Instagram, Twitter & TikTok",
    description: "Free fancy text generator with 101 font styles. Copy and paste fancy fonts instantly.",
    url: "https://fancy-text-generator-drab.vercel.app",
    siteName: "FancyText.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fancy Text Generator — 101 Styles",
    description: "Free fancy text generator with 101 font styles for Instagram, Twitter & TikTok.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "LchwskUFpSvYYqAjl5m2ZyVNP92t6xTBgXWVYR7UR-8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}