import type { Metadata } from "next";
import { Inter, Oswald, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/layout/Providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricoune.com"),
  title: {
    default: "Ricoune — Site Officiel",
    template: "%s | Ricoune",
  },
  description:
    "Ricoune, l'artiste incontournable des fêtes du Sud de la France. Concerts, albums, vidéos et demandes de devis pour vos fêtes votives, férias et événements.",
  applicationName: "Ricoune",
  authors: [{ name: "Ricoune" }],
  generator: "Next.js",
  keywords: [
    "Ricoune",
    "chanteur sud de la France",
    "fêtes votives",
    "férias",
    "concerts",
    "animation événement",
    "musique du Sud",
    "Provence",
    "Occitanie",
  ],
  icons: {
    icon: "/images/logo/ricoune-favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricoune.com",
    siteName: "Ricoune",
    title: "Ricoune — Site Officiel",
    description:
      "L'artiste incontournable des fêtes du Sud de la France. Concerts, albums, vidéos et demandes de devis pour vos événements.",
    images: [
      {
        url: "/images/hero/hero-concert-hd.webp",
        width: 1200,
        height: 630,
        alt: "Ricoune en concert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricoune — Site Officiel",
    description:
      "L'artiste incontournable des fêtes du Sud de la France.",
    images: ["/images/hero/hero-concert-hd.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricoune.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="pt-20 md:pt-24">{children}</main>
          <Footer />
          <ScrollToTop />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
