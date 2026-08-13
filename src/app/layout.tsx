import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/ffr-site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-display" });
const siteUrl = "https://final-fantasy-resonance.wiki";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Final Fantasy Resonance Wiki, Database & Guides", template: "%s | FF Resonance Wiki" },
  description: "Explore Final Fantasy Resonance characters, Visions, combat systems, release details, and sourced updates for Square Enix's HD-2D RPG.",
  manifest: "/manifest.json",
  verification: { google: "btOXORnOUX_1quBU-FCrPpTqrMQu86uW8Ca-t3EhHiY" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "FF Resonance Wiki", url: siteUrl, images: ["/images/ffr/og.png"] },
  twitter: { card: "summary_large_image", images: ["/images/ffr/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WY3HFLF178" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-WY3HFLF178');`}</Script>
      </body>
    </html>
  );
}
