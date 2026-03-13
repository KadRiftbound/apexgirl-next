import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apexgirlguide.com"),
  title: {
    default: "TopGirl / ApexGirl - Fansite de Référence + Codes Promo 2026",
    template: "%s | TopGirl ApexGirl",
  },
  description: "TopGirl (ApexGirl) fansite officiel - Tous les codes promo et redeem codes 2025/2026. Base de données 112+ artistes, guides complets, calculateurs et outils exclusifs. Télécharge TopGirl maintenant!",
  keywords: [
    "TopGirl",
    "ApexGirl", 
    "A3Games",
    "redeem code",
    "code promo",
    "codes gratuit",
    "gems",
    "TopGirl download",
    "TopGirl apk",
    "TopGirl ios",
    "TopGirl tips",
    "TopGirl guide",
    "TopGirl calculator",
    "TopGirl events",
    "TopGirl database",
  ],
  authors: [{ name: "A3Games" }],
  creator: "A3Games",
  publisher: "A3Games",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://apexgirlguide.com",
    siteName: "TopGirl ApexGirl",
    title: "TopGirl / ApexGirl - Fansite de Référence + Codes Promo 2026",
    description: "TopGirl (ApexGirl) fansite officiel - Tous les codes promo et redeem codes 2025/2026. Base de données 112+ artistes, guides complets, calculateurs et outils exclusifs.",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "TopGirl ApexGirl Fansite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TopGirl / ApexGirl - Fansite de Référence",
    description: "Tous les codes promo et redeem codes pour TopGirl. Base de données 112+ artistes, guides et outils.",
    images: ["/assets/images/logo.png"],
  },
  alternates: {
    canonical: "https://apexgirlguide.com",
    languages: {
      fr: "https://apexgirlguide.com/fr",
      en: "https://apexgirlguide.com/en",
    },
  },
  category: "gaming",
  classification: "Fansite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/assets/images/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
