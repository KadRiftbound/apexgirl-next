import type { Metadata } from "next";
import ArtistsClient from "./ArtistsClient";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AdBanner } from "@/components/AdSense";
import { getArtistContent } from "@/lib/i18n/artists";

const BASE_URL = "https://apexgirlguide.com";

const meta: Record<string, { title: string; description: string; keywords: string }> = {
  fr: { title: "TopGirl Team Builder — Composez et comparez vos équipes", description: "Team Builder TopGirl/ApexGirl/Idol Company : composez deux équipes de 5 artistes, voyez leur note, leurs synergies de genre et comparez-les stat par stat. 95 artistes UR et SSR.", keywords: "TopGirl Team Builder, build équipe TopGirl, meilleure équipe TopGirl, synergie genre TopGirl, personnages ApexGirl, Idol Company personnages" },
  en: { title: "TopGirl Team Builder — Build and compare your teams", description: "TopGirl/ApexGirl/Idol Company Team Builder: build two teams of 5 artists, see their grade and genre synergies, and compare them stat by stat. 95 UR and SSR artists.", keywords: "TopGirl Team Builder, team building TopGirl, best TopGirl team, genre synergy TopGirl, ApexGirl characters, Idol Company characters" },
  de: { title: "TopGirl Team Builder — Teams bauen und vergleichen", description: "Team Builder für TopGirl/ApexGirl/Idol Company: Baue zwei Teams aus 5 Künstlerinnen, sieh Note und Genre-Synergien und vergleiche sie Stat für Stat.", keywords: "TopGirl Team Builder, Team-Aufbau TopGirl, ApexGirl Charaktere, Idol Company Charaktere" },
  it: { title: "TopGirl Team Builder — Crea e confronta le tue squadre", description: "Team Builder TopGirl/ApexGirl/Idol Company: crea due squadre di 5 artisti, vedi voto e sinergie di genere e confrontale statistica per statistica.", keywords: "TopGirl Team Builder, costruzione team TopGirl, personaggi ApexGirl, Idol Company personaggi" },
  es: { title: "TopGirl Team Builder — Crea y compara tus equipos", description: "Team Builder de TopGirl/ApexGirl/Idol Company: crea dos equipos de 5 artistas, mira su nota y sinergias de género y compáralos estadística por estadística.", keywords: "TopGirl Team Builder, construcción de equipo TopGirl, personajes ApexGirl, Idol Company personajes" },
  pt: { title: "TopGirl Team Builder — Monte e compare seus times", description: "Team Builder de TopGirl/ApexGirl/Idol Company: monte dois times de 5 artistas, veja a nota e as sinergias de gênero e compare-os estatística por estatística.", keywords: "TopGirl Team Builder, montagem de time TopGirl, personagens ApexGirl, Idol Company personagens" },
  pl: { title: "TopGirl Team Builder — Buduj i porównuj drużyny", description: "Team Builder TopGirl/ApexGirl/Idol Company: zbuduj dwie drużyny po 5 artystek, zobacz ocenę i synergie gatunku i porównaj je statystyka po statystyce.", keywords: "TopGirl Team Builder, budowanie drużyny TopGirl, postacie ApexGirl, Idol Company postacie" },
  id: { title: "TopGirl Team Builder — Susun dan bandingkan tim kamu", description: "Team Builder TopGirl/ApexGirl/Idol Company: susun dua tim berisi 5 artis, lihat nilai dan sinergi genre, lalu bandingkan stat demi stat. 95 artis UR dan SSR.", keywords: "TopGirl Team Builder, susun tim TopGirl, tim terbaik TopGirl, karakter ApexGirl, Idol Company karakter" },
  ru: { title: "TopGirl Team Builder — Собирайте и сравнивайте команды", description: "Team Builder TopGirl/ApexGirl/Idol Company: соберите две команды из 5 артисток, узнайте оценку и жанровые синергии и сравните их по каждой характеристике.", keywords: "TopGirl Team Builder, создание команды TopGirl, персонажи ApexGirl, Idol Company персонажи" },
};

type Copy = {
  eyebrow: string;
  howTitle: string;
  title: string;
  subtitle: string;
  intro: string[];
  methodology: string;
  faq: { q: string; a: string }[];
};

const copy: Record<string, Copy> = {
  fr: {
    eyebrow: "TopGirl · ApexGirl",
    howTitle: "Comment fonctionne le Team Builder ?",
    title: "Team Builder",
    subtitle: "Composez deux équipes de 5 artistes, voyez leur note et comparez-les.",
    intro: [
      "Le Team Builder TopGirl réunit les 95 artistes UR et SSR du jeu. Touchez une carte pour l'ajouter à l'équipe active : la note (de D à S+), la puissance en points et la synergie de genre se mettent à jour instantanément. Composez une deuxième équipe pour les comparer stat par stat : dégâts de skill, attaque de base, résistances, capacité de fans et de rally.",
      "Filtrez par genre, spécialité ou saison maximale pour ne voir que les artistes que vous possédez, sauvegardez vos équipes et partagez-les à votre groupe avec un lien.",
    ],
    methodology: "La note d'une équipe suit la même logique que la tier list : les dégâts au joueur comptent d'abord, puis la réduction de dégâts de skill, les dégâts de skill, l'attaque de base et les résistances. Trois artistes du même genre donnent +5 % de puissance, quatre +10 %, cinq +25 %. L'équipe est ensuite notée dans le contexte où elle est la plus forte : polyvalente, solo (capacité de fans) ou rally.",
    faq: [
      { q: "Comment fonctionne le Team Builder TopGirl ?", a: "Choisissez l'équipe active (1 ou 2), puis touchez des cartes d'artistes pour remplir ses 5 places. La note, la puissance et les synergies se calculent automatiquement, et le tableau de comparaison met les deux équipes face à face." },
      { q: "Quelle est la meilleure équipe dans TopGirl ?", a: "Une équipe de 5 artistes S+ du même genre : elle cumule les dégâts au joueur les plus élevés et le bonus de synergie de +25 %. Les artistes S+ sont listées en tête du Team Builder et dans la tier list." },
      { q: "La synergie de genre compte-t-elle vraiment ?", a: "Oui. Trois artistes du même genre (Pop, Rock, EDM, Hip Hop ou R&B) donnent +5 % de puissance, quatre +10 % et cinq +25 %. Le Team Builder indique à chaque fois le genre à ajouter pour atteindre le palier suivant." },
      { q: "Mes équipes sont-elles sauvegardées ?", a: "Oui, dans votre navigateur. Vous pouvez en enregistrer jusqu'à 30 dans « Mes équipes » et copier un lien de partage pour les envoyer à votre groupe." },
    ],
  },
  en: {
    eyebrow: "TopGirl · ApexGirl",
    howTitle: "How does the Team Builder work?",
    title: "Team Builder",
    subtitle: "Build two teams of 5 artists, see their grade and compare them.",
    intro: [
      "The TopGirl Team Builder lists all 95 UR and SSR artists of the game. Tap a card to add it to the active team: the grade (D to S+), the power in points and the genre synergy update instantly. Build a second team to compare them stat by stat: skill damage, basic attack, resistances, fan and rally capacity.",
      "Filter by genre, specialty or maximum season to only see the artists you own, save your teams and share them with your group through a link.",
    ],
    methodology: "A team's grade follows the same logic as the tier list: damage to player comes first, then skill damage reduction, skill damage, basic attack and resistances. Three artists of the same genre give +5% power, four +10%, five +25%. The team is then rated in the context where it is strongest: general, solo (fan capacity) or rally.",
    faq: [
      { q: "How does the TopGirl Team Builder work?", a: "Pick the active team (1 or 2), then tap artist cards to fill its 5 slots. Grade, power and synergies are computed automatically, and the comparison table puts both teams side by side." },
      { q: "What is the best team in TopGirl?", a: "A team of 5 S+ artists of the same genre: it stacks the highest damage to player with the +25% synergy bonus. S+ artists are listed first in the Team Builder and in the tier list." },
      { q: "Does genre synergy really matter?", a: "Yes. Three artists of the same genre (Pop, Rock, EDM, Hip Hop or R&B) give +5% power, four +10% and five +25%. The Team Builder always shows which genre to add to reach the next step." },
      { q: "Are my teams saved?", a: "Yes, in your browser. You can save up to 30 of them under \"My teams\" and copy a share link to send them to your group." },
    ],
  },
  id: {
    eyebrow: "TopGirl · ApexGirl",
    howTitle: "Bagaimana cara kerja Team Builder?",
    title: "Team Builder",
    subtitle: "Susun dua tim berisi 5 artis, lihat nilainya, dan bandingkan.",
    intro: [
      "Team Builder TopGirl memuat 95 artis UR dan SSR dalam game. Ketuk sebuah kartu untuk menambahkannya ke tim aktif: nilai (D sampai S+), kekuatan dalam poin, dan sinergi genre langsung diperbarui. Susun tim kedua untuk membandingkannya stat demi stat: skill damage, basic attack, resistensi, kapasitas fans dan rally.",
      "Saring berdasarkan genre, spesialisasi, atau musim maksimal agar hanya artis yang kamu miliki yang tampil, simpan tim kamu, dan bagikan ke grup lewat tautan.",
    ],
    methodology: "Nilai tim mengikuti logika yang sama dengan tier list: damage to player dihitung lebih dulu, lalu skill damage reduction, skill damage, basic attack, dan resistensi. Tiga artis dengan genre sama memberi +5% kekuatan, empat +10%, lima +25%. Tim lalu dinilai pada konteks terkuatnya: serbaguna, solo (kapasitas fans), atau rally.",
    faq: [
      { q: "Bagaimana cara kerja Team Builder TopGirl?", a: "Pilih tim aktif (1 atau 2), lalu ketuk kartu artis untuk mengisi 5 slotnya. Nilai, kekuatan, dan sinergi dihitung otomatis, dan tabel perbandingan menampilkan kedua tim berdampingan." },
      { q: "Apa tim terbaik di TopGirl?", a: "Tim berisi 5 artis S+ dengan genre yang sama: damage to player tertinggi ditambah bonus sinergi +25%. Artis S+ tampil paling atas di Team Builder dan di tier list." },
      { q: "Apakah sinergi genre benar-benar penting?", a: "Ya. Tiga artis dengan genre sama (Pop, Rock, EDM, Hip Hop, atau R&B) memberi +5% kekuatan, empat +10%, dan lima +25%. Team Builder selalu menunjukkan genre yang perlu ditambahkan untuk mencapai tingkat berikutnya." },
      { q: "Apakah tim saya tersimpan?", a: "Ya, di browser kamu. Kamu bisa menyimpan hingga 30 tim di \"Tim saya\" dan menyalin tautan berbagi untuk mengirimnya ke grup." },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] || meta.en;
  const canonical = `${BASE_URL}/${lang}/teambuilder/`;
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords.split(", "),
    alternates: {
      canonical,
      languages: { fr: `${BASE_URL}/fr/teambuilder/`, en: `${BASE_URL}/en/teambuilder/`, id: `${BASE_URL}/id/teambuilder/`, "x-default": `${BASE_URL}/en/teambuilder/` },
    },
    openGraph: { title: m.title, description: m.description, url: canonical, siteName: "TopGirl Guide", type: "website" },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function ArtistsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = copy[lang] || copy.en;
  const t = getArtistContent(lang);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": c.faq.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TopGirl Team Builder",
    "url": `${BASE_URL}/${lang}/teambuilder/`,
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "description": (meta[lang] || meta.en).description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <div className="tb-head-wrap">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Team Builder", href: "/teambuilder/" }]} lang={lang} />
        <header className="page-head tb-head">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="page-head-title">{c.title}</h1>
          <p className="page-head-sub">{c.subtitle}</p>
        </header>
        <AdBanner />
      </div>
      <ArtistsClient lang={lang} />
      <div className="tb-foot-wrap">
        <section className="tb-faq">
          <details className="tb-prose-details">
            <summary>{c.howTitle}</summary>
            <div className="tb-prose">
              {c.intro.map((p, i) => <p key={i}>{p}</p>)}
              <p><b>{t.teamBuilderMethodology}.</b> {c.methodology}</p>
            </div>
          </details>
          {c.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}
