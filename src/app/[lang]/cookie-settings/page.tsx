import type { Metadata } from "next";
import Link from "next/link";
import { ConsentButton } from "./ConsentButton";

const BASE_URL = "https://apexgirlguide.com";

const texts: Record<string, {
  title: string; intro: string; button: string; unavailable: string;
  sections: { title: string; body: string }[]; privacy: string; privacyLink: string;
}> = {
  fr: {
    title: "Gestion des cookies",
    intro: "Votre consentement est géré par la plateforme de consentement certifiée de Google. Vous pouvez modifier votre choix à tout moment.",
    button: "Modifier mes préférences",
    unavailable: "La fenêtre de consentement n'est pas disponible dans votre région ou est bloquée par un bloqueur de publicité.",
    sections: [
      { title: "Cookies nécessaires", body: "Ils mémorisent vos préférences (langue, équipes sauvegardées) dans votre navigateur. Ils ne peuvent pas être désactivés." },
      { title: "Mesure d'audience", body: "Google Analytics et Vercel Analytics nous aident à savoir quelles pages sont utiles, pour améliorer le site." },
      { title: "Publicité", body: "Google AdSense affiche des annonces qui financent le site. Selon votre choix, elles sont personnalisées ou non." },
    ],
    privacy: "Plus de détails dans notre",
    privacyLink: "politique de confidentialité",
  },
  en: {
    title: "Cookie settings",
    intro: "Your consent is managed by Google's certified consent management platform. You can change your choice at any time.",
    button: "Change my preferences",
    unavailable: "The consent window isn't available in your region, or it is blocked by an ad blocker.",
    sections: [
      { title: "Necessary cookies", body: "They remember your preferences (language, saved teams) in your browser. They can't be turned off." },
      { title: "Analytics", body: "Google Analytics and Vercel Analytics tell us which pages are useful so we can improve the site." },
      { title: "Advertising", body: "Google AdSense shows ads that fund the site. Depending on your choice, they are personalised or not." },
    ],
    privacy: "More details in our",
    privacyLink: "privacy policy",
  },
  id: {
    title: "Pengaturan cookie",
    intro: "Persetujuan Anda dikelola oleh platform persetujuan bersertifikat Google. Anda dapat mengubah pilihan kapan saja.",
    button: "Ubah preferensi saya",
    unavailable: "Jendela persetujuan tidak tersedia di wilayah Anda, atau diblokir oleh pemblokir iklan.",
    sections: [
      { title: "Cookie yang diperlukan", body: "Menyimpan preferensi Anda (bahasa, tim tersimpan) di browser. Tidak dapat dinonaktifkan." },
      { title: "Analitik", body: "Google Analytics dan Vercel Analytics membantu kami mengetahui halaman mana yang berguna." },
      { title: "Iklan", body: "Google AdSense menampilkan iklan yang mendanai situs ini, dipersonalisasi atau tidak sesuai pilihan Anda." },
    ],
    privacy: "Detail lebih lanjut di",
    privacyLink: "kebijakan privasi",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = texts[lang] || texts.en;
  return {
    title: `${t.title} | TopGirl Guide`,
    alternates: { canonical: `${BASE_URL}/${lang}/cookie-settings/` },
    robots: { index: false, follow: true },
  };
}

export default async function CookieSettingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = texts[lang] || texts.en;
  const privacyHref = lang === "fr" ? `/${lang}/confidentialite/` : `/${lang}/privacy-policy/`;

  return (
    <div className="container" style={{ maxWidth: 720, padding: "40px 20px 64px" }}>
      <h1 className="section-title">{t.title}</h1>
      <p className="section-subtitle">{t.intro}</p>

      <ConsentButton label={t.button} unavailable={t.unavailable} />

      <div style={{ display: "grid", gap: 14, margin: "32px 0" }}>
        {t.sections.map((s) => (
          <section key={s.title} style={{ padding: "18px 20px", background: "var(--panel-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
            <h2 style={{ fontSize: "1.05rem", margin: "0 0 6px" }}>{s.title}</h2>
            <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>{s.body}</p>
          </section>
        ))}
      </div>

      <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>
        {t.privacy} <Link href={privacyHref} style={{ color: "var(--primary-light)" }}>{t.privacyLink}</Link>.
      </p>
    </div>
  );
}
