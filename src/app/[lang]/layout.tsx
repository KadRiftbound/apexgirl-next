export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const path = `/${lang}`;
  const meta = pageTitles[lang]?.[path] || defaultMeta[lang] || defaultMeta.fr;
  
  const hreflangLangs = ['fr', 'en', 'it', 'es', 'pt', 'pl', 'id', 'ru'];
  const languages: Record<string, string> = {};
  hreflangLangs.forEach((l) => {
    languages[l] = `https://www.apexgirlguide.com/${l}${path}`;
  });
  languages['x-default'] = `https://www.apexgirlguide.com/fr${path}`;
  
  const alternates: Metadata['alternates'] = {
    languages,
    canonical: `https://www.apexgirlguide.com${path}`
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.split(", "),
    alternates,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.apexgirlguide.com${path}`,
      siteName: "TopGirl",
      locale: localeNames[lang] || "fr-FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    icons: {
      icon: [
        { url: "/assets/favicon.png", sizes: "48x48" },
        { url: "/assets/favicon.png", sizes: "96x96" },
        { url: "/assets/favicon.png", sizes: "192x192" },
        { url: "/assets/favicon.png", sizes: "512x512" },
      ],
      apple: { url: "/assets/favicon.png" },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}