import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: "https://apexgirlguide.com",
  authors: [{ name: "TopGirl Guide" }],
  creator: "TopGirl Guide",
  publisher: "TopGirl Guide",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get("x-lang") || "en";

  return (
    <html lang={lang} suppressHydrationWarning className={poppins.variable}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5737915177617454" />
      </head>
      <body>
        {children}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y082CPMLKJ"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('config', 'G-Y082CPMLKJ');
            `,
          }}
        />
        <Script
          id="adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5737915177617454"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
