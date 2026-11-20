import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TopGirl Guide",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://apexgirlguide.com/en/" },
};

// Static root page: picks /fr/, /id/ or /en/ from the browser language (no server involved).
const pick = `(function(){var l=(navigator.languages||[navigator.language||"en"]).map(function(x){return String(x).toLowerCase().slice(0,2)});var t="en";for(var i=0;i<l.length;i++){if(l[i]==="fr"||l[i]==="en"||l[i]==="id"){t=l[i];break}}location.replace("/"+t+"/")})()`;

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pick }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </noscript>
      <p style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
        <a href="/en/">TopGirl Guide</a> · <a href="/fr/">Français</a> · <a href="/id/">Bahasa Indonesia</a>
      </p>
    </>
  );
}
