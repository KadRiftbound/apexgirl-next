import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://apexgirlguide.com"),
  title: {
    default: "TopGirl / ApexGirl - Fansite de Référence + Codes Promo 2026",
    template: "%s | TopGirl ApexGirl",
  },
  description: "TopGirl (ApexGirl) fansite officiel - Tous les codes promo et redeem codes 2025/2026. 112+ artistes, guides complets, calculateurs et outils exclusifs.",
  keywords: [
    "TopGirl",
    "ApexGirl", 
    "A3Games",
    "redeem code",
    "code promo",
    "TopGirl database",
    "TopGirl artists",
    "TopGirl guide",
    "TopGirl calculator",
    "TopGirl events",
  ],
  authors: [{ name: "A3Games" }],
  creator: "A3Games",
  publisher: "A3Games",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://apexgirlguide.com",
    siteName: "TopGirl ApexGirl",
    title: "TopGirl / ApexGirl - Fansite de Référence",
    description: "Tous les codes promo, 112+ artistes, guides et outils pour TopGirl.",
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
    title: "TopGirl / ApexGirl - Fansite",
    description: "Codes promo, artistes, guides et outils pour TopGirl.",
    images: ["/assets/images/logo.png"],
  },
  alternates: {
    canonical: "https://apexgirlguide.com",
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="google-adsense-account" content="ca-pub-5737915177617454" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
