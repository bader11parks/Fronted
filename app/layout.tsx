import { IBM_Plex_Sans_Arabic, Amiri, Cormorant_Garamond } from "next/font/google";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AnnouncementBar, Header } from "@/components/Header";
import { FunnelHost } from "@/components/FunnelHost";
import { PixelScripts } from "@/components/PixelScripts";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-amiri",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://mazajrituals.shop";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "طقوس مزاج",
    template: "%s | طقوس مزاج",
  },
  description: "هدوء له طعم. وطقس له اسم. ثلاث تركيبات ليوم أهدى — صباح، ظهر، وليل.",
  openGraph: {
    locale: "ar_AR",
    siteName: "طقوس مزاج",
    url: site,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "طقوس مزاج",
    alternateName: "Mazaj Rituals",
    url: site,
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plex.variable} ${amiri.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://analytics.tiktok.com" />
        <link rel="preconnect" href="https://tr.snapchat.com" />
      </head>
      <body className="min-h-screen bg-ritual-cream font-sans text-ritual-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PixelScripts />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <FunnelHost />
      </body>
    </html>
  );
}
