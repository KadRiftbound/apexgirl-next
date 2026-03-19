import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  authors: [{ name: "A3Games" }],
  creator: "A3Games",
  publisher: "A3Games",
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
        <link rel="icon" href="/assets/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/favicon.png" />
        <meta name="google-adsense-account" content="ca-pub-5737915177617454" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5737915177617454&consent_ad_storage=denied" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Y082CPMLKJ"
        />
        <script
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
