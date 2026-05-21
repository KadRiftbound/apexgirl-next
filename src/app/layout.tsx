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
  metadataBase: new URL("https://apexgirlguide.com"),
  authors: [{ name: "TopGirl Guide" }],
  creator: "TopGirl Guide",
  publisher: "TopGirl Guide",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/logositenew.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
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
        <Script
          id="grow-initializer"
          strategy="afterInteractive"
          data-grow-initializer=""
          dangerouslySetInnerHTML={{
            __html: `
              !(function () {
                window.growMe ||
                  ((window.growMe = function (e) {
                    window.growMe._.push(e);
                  }),
                  (window.growMe._ = []));
                var e = document.createElement("script");
                (e.type = "text/javascript"),
                  (e.src = "https://faves.grow.me/main.js"),
                  (e.defer = !0),
                  e.setAttribute(
                    "data-grow-faves-site-id",
                    "U2l0ZTpiMTI1NDRjMS1lMjk3LTRiZjAtOWZlNy1mNzRkYTA0NWFiOGY="
                  );
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
