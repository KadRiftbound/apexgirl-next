"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AdBanner } from "@/components/AdSense";
import { activeCodes } from "@/lib/data/codes";
import { getHomeContent } from "@/lib/i18n/home";
import { fetchVoteData } from "@/lib/voteCache";
import artistImages from "@/lib/data/artist-images.json";
import { slugify } from "@/lib/utils/slugify";
import "./home.css";

function formatExpiry(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    fr: "fr-FR", en: "en-GB", it: "it-IT", es: "es-ES",
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU", de: "de-DE",
  };
  return date.toLocaleDateString(localeMap[lang] || "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatLastUpdated(lang: string): string {
  const localeMap: Record<string, string> = {
    fr: "fr-FR", en: "en-GB", it: "it-IT", es: "es-ES",
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU", de: "de-DE",
  };
  return new Date().toLocaleDateString(localeMap[lang] || "en-GB", { month: "long", year: "numeric" });
}

/* Small inline icons — no emoji, consistent stroke weight. */
const icons: Record<string, React.ReactNode> = {
  teambuilder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.4c2.3.2 4 1.7 4.5 4.6" />
    </svg>
  ),
  tierlist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" /><path d="M8 6H5a3 3 0 0 0 3 4" /><path d="M16 6h3a3 3 0 0 1-3 4" /><path d="M12 12v4" /><path d="M8 20h8" /><path d="M10 16h4v4h-4z" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2.5" /><path d="M8 7h8" /><path d="M8 11h3M13 11h3M8 15h3M13 15h3" />
    </svg>
  ),
  guides: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19" /><path d="M8 7h7M8 10.5h7" />
    </svg>
  ),
};

const local: Record<string, { favorites: string; favoritesSub: string; vote: string; votes: string; explore: string; noCodes: string; seeHistory: string; unofficial: string }> = {
  fr: { favorites: "Favoris de la communauté", favoritesSub: "Les artistes les plus votées cette semaine", vote: "Voter", votes: "votes", explore: "Explorer le site", noCodes: "Aucun code actif pour le moment.", seeHistory: "Voir l'historique des codes", unofficial: "Fansite non officiel" },
  en: { favorites: "Community favorites", favoritesSub: "Most voted artists this week", vote: "Vote", votes: "votes", explore: "Explore the site", noCodes: "No active code right now.", seeHistory: "See code history", unofficial: "Unofficial fansite" },
  de: { favorites: "Favoriten der Community", favoritesSub: "Meistgewählte Künstlerinnen dieser Woche", vote: "Abstimmen", votes: "Stimmen", explore: "Seite erkunden", noCodes: "Derzeit kein aktiver Code.", seeHistory: "Code-Verlauf ansehen", unofficial: "Inoffizielle Fanseite" },
  it: { favorites: "Preferite della community", favoritesSub: "Le artiste più votate questa settimana", vote: "Vota", votes: "voti", explore: "Esplora il sito", noCodes: "Nessun codice attivo al momento.", seeHistory: "Vedi lo storico dei codici", unofficial: "Fansite non ufficiale" },
  es: { favorites: "Favoritas de la comunidad", favoritesSub: "Las artistas más votadas esta semana", vote: "Votar", votes: "votos", explore: "Explorar el sitio", noCodes: "No hay código activo ahora mismo.", seeHistory: "Ver historial de códigos", unofficial: "Fansite no oficial" },
  pt: { favorites: "Favoritas da comunidade", favoritesSub: "As artistas mais votadas esta semana", vote: "Votar", votes: "votos", explore: "Explorar o site", noCodes: "Nenhum código ativo no momento.", seeHistory: "Ver histórico de códigos", unofficial: "Fansite não oficial" },
  pl: { favorites: "Ulubione społeczności", favoritesSub: "Najczęściej wybierane artystki w tym tygodniu", vote: "Głosuj", votes: "głosów", explore: "Przeglądaj stronę", noCodes: "Brak aktywnych kodów.", seeHistory: "Zobacz historię kodów", unofficial: "Nieoficjalny fansite" },
  id: { favorites: "Favorit komunitas", favoritesSub: "Artis paling banyak dipilih minggu ini", vote: "Vote", votes: "suara", explore: "Jelajahi situs", noCodes: "Belum ada kode aktif.", seeHistory: "Lihat riwayat kode", unofficial: "Fansite tidak resmi" },
  ru: { favorites: "Любимицы сообщества", favoritesSub: "Самые популярные артистки недели", vote: "Голосовать", votes: "голосов", explore: "Разделы сайта", noCodes: "Активных кодов пока нет.", seeHistory: "История кодов", unofficial: "Неофициальный фансайт" },
};

type VoteEntry = { artist_name: string; week_count?: number; rank?: string };

export default function HomeClient({ lang }: { lang: string }) {
  const t = getHomeContent(lang);
  const l = local[lang] || local.en;
  const lastUpdatedText = formatLastUpdated(lang);

  const [copiedCode, setCopiedCode] = useState("");
  const [top, setTop] = useState<VoteEntry[]>([]);

  useEffect(() => {
    fetchVoteData().then((d) => {
      const list = (d?.rankings?.this_week as unknown as VoteEntry[] | undefined) || [];
      setTop(list.slice(0, 5));
    });
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hm-hero">
        <div className="hm-hero-inner">
          <div className="hm-eyebrow">
            <span>{l.unofficial}</span>
            <i aria-hidden="true" />
            <span>TopGirl · ApexGirl · Idol Company</span>
          </div>
          <h1 className="hm-title">{t.homeTitle}</h1>
          <p className="hm-sub" dangerouslySetInnerHTML={{ __html: t.subtitle }} />
          <div className="hm-actions">
            <Link href={`/${lang}/tierlist/`} className="hm-btn hm-btn-primary">{t.tierListVotes}</Link>
            <Link href={`/${lang}/teambuilder/`} className="hm-btn hm-btn-ghost">{t.discoverArtists}</Link>
          </div>
          <div className="hm-stats">
            <span><b>112+</b> {t.statArtists}</span>
            <span><b>50+</b> {t.statGuides}</span>
            <span><b>5+</b> {t.statTools}</span>
            <span className="hm-stats-updated">{t.lastUpdatedLabel} : {lastUpdatedText}</span>
          </div>
        </div>
      </section>

      {/* ───────── PATCH NOTE ───────── */}
      <div className="hm-wrap">
        <div className="hm-note">
          <span className="hm-note-badge">{t.patchNoteBadge}</span>
          <span className="hm-note-text">{t.patchNoteText}</span>
        </div>
      </div>

      {/* ───────── EXPLORE ───────── */}
      <section className="hm-wrap hm-section">
        <h2 className="hm-h2">{l.explore}</h2>
        <div className="hm-explore">
          {t.sections.map((s) => (
            <Link key={s.href} href={`/${lang}/${s.href}/`} className="hm-card" style={{ ["--c" as string]: s.color }}>
              <span className="hm-card-icon">{icons[s.href] || icons.guides}</span>
              <span className="hm-card-body">
                <span className="hm-card-title">{s.title}</span>
                <span className="hm-card-desc">{s.desc}</span>
                <span className="hm-card-detail">{s.detail}</span>
              </span>
              <span className="hm-card-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────── COMMUNITY FAVORITES ───────── */}
      {top.length > 0 && (
        <section className="hm-wrap hm-section">
          <div className="hm-section-head">
            <div>
              <h2 className="hm-h2">{l.favorites}</h2>
              <p className="hm-h2-sub">{l.favoritesSub}</p>
            </div>
            <Link href={`/${lang}/tierlist/?tab=vote`} className="hm-link-btn">{l.vote}</Link>
          </div>
          <div className="hm-fav">
            {top.map((e, i) => {
              const img = (artistImages as Record<string, string>)[e.artist_name];
              return (
                <Link key={e.artist_name} href={`/${lang}/artist/${slugify(e.artist_name)}/`} className={`hm-fav-card${i === 0 ? " first" : ""}`}>
                  <span className="hm-fav-rank">{i + 1}</span>
                  <span className="hm-fav-img">
                    {img ? <Image src={`/assets/images/artists/${img}`} alt={e.artist_name} fill sizes="160px" style={{ objectFit: "cover" }} /> : <span className="hm-fav-letter">{e.artist_name.charAt(0)}</span>}
                  </span>
                  <span className="hm-fav-meta">
                    <span className="hm-fav-name">{e.artist_name}</span>
                    <span className="hm-fav-votes">{e.week_count ?? 0} {l.votes}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="hm-wrap"><AdBanner /></div>

      {/* ───────── CODES ───────── */}
      <section className="hm-wrap hm-section">
        <div className="hm-panel">
          <div className="hm-section-head">
            <div>
              <h2 className="hm-h2">{t.promoCodes}</h2>
              <p className="hm-h2-sub">{t.promoSubtitle}</p>
            </div>
            <Link href={`/${lang}/codes/`} className="hm-link-btn">{t.seeAllCodes.replace(" →", "")}</Link>
          </div>
          {activeCodes.length === 0 ? (
            <p className="hm-empty">{l.noCodes} <Link href={`/${lang}/codes/`}>{l.seeHistory}</Link></p>
          ) : (
            <div className="hm-codes">
              {activeCodes.map((c) => (
                <div key={c.code} className="hm-code">
                  <div className="hm-code-info">
                    <span className="hm-code-value">{c.code}</span>
                    {c.rarity === "new" && <span className="hm-code-new">{t.newLabel}</span>}
                    <span className="hm-code-meta">{c.rewards} · {t.expiresOn} {formatExpiry(c.expires, lang)}</span>
                  </div>
                  <button className={`hm-copy${copiedCode === c.code ? " ok" : ""}`} onClick={() => copyCode(c.code)} aria-label={`${copiedCode === c.code ? t.copied : t.copy} ${c.code}`}>
                    {copiedCode === c.code ? t.copied : t.copy}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ───────── EXPLAINER ───────── */}
      <section className="hm-wrap hm-section">
        <div className="hm-prose">
          <h2 className="hm-h2">{t.explainerTitle}</h2>
          {t.explainerParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="hm-prose-links">
            {t.explainerLinks.map((link) => (
              <Link key={link.href} href={`/${lang}${link.href}`} className="hm-link-btn">{link.text.replace(" →", "")}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── EDITORIAL ───────── */}
      <section className="hm-wrap hm-section hm-section-last">
        <h2 className="hm-h2 hm-h2-center">{t.editorialTitle}</h2>
        <div className="hm-trust">
          {t.editorialCards.map((card) => (
            <article key={card.href} className="hm-trust-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <Link href={`/${lang}${card.href}`}>{card.link.replace(" →", "")}</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
