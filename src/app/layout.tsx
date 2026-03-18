import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Metadata de base - sera surchargée par le layout [lang]
  authors: [{ name: "A3Games" }],
  creator: "A3Games",
  publisher: "A3Games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                var match = path.match(/^\\/(fr|en|it|es|pt|pl|id|ru)(\\/|$)/);
                if (match) {
                  document.documentElement.lang = match[1];
                }
              })();
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
