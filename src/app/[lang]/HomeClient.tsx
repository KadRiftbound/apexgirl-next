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
import { skillChips } from "@/lib/utils/skillSummary";
import artistsData from "@/lib/data/artists.json";
import { evaluateTeam } from "@/lib/utils/evaluateTeam";
import { GenreIcon } from "@/components/GenreIcon";
import type { Artist } from "@/lib/types/artist";
import "./home.css";

function formatExpiry(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    fr: "fr-FR", en: "en-GB", it: "it-IT", es: "es-ES",
    pt: "pt-BR", pl: "pl-PL", id: "id-ID", ru: "ru-RU", de: "de-DE",
  };
  return date.toLocaleDateString(localeMap[lang] || "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const topTierText: Record<string, { title: string; sub: string; cta: string }> = {
  fr: { title: "Les incontournables", sub: "Les artistes S+ de la tier list", cta: "Voir la tier list" },
  en: { title: "Must-have artists", sub: "The S+ artists of the tier list", cta: "See the tier list" },
  id: { title: "Artis wajib", sub: "Artis S+ di tier list", cta: "Lihat tier list" },
};

type TierArtist = { id: number; name: string; rank: string; image?: string; skills?: string[]; calculatedTier?: string; tierScore?: number; genre?: string };
const topTierArtists = (artistsData as TierArtist[])
  .filter((a) => a.calculatedTier === "S+" && a.rank === "SSR")
  .sort((a, b) => (b.tierScore || 0) - (a.tierScore || 0))
  .slice(0, 6);

// Reference team for the Team Builder teaser: the 5 best SSR S+ sharing the most common genre
// among the S+ (so the genre synergy bonus applies), completed by the next best S+.
const sPlusSSR = (artistsData as TierArtist[])
  .filter((a) => a.calculatedTier === "S+" && a.rank === "SSR")
  .sort((a, b) => (b.tierScore || 0) - (a.tierScore || 0));
const genreCount = sPlusSSR.reduce<Record<string, number>>((m, a) => { if (a.genre) m[a.genre] = (m[a.genre] || 0) + 1; return m; }, {});
const topGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0];
const teaserTeam: TierArtist[] = [
  ...sPlusSSR.filter((a) => a.genre === topGenre),
  ...sPlusSSR.filter((a) => a.genre !== topGenre),
].slice(0, 5);
const teaserTeamEval = evaluateTeam(teaserTeam as unknown as Artist[]);

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
  vote: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8.2 3.6 4.5 7.2 4.5c2 0 3.4 1.1 4.8 2.7 1.4-1.6 2.8-2.7 4.8-2.7 3.6 0 5.7 3.7 4.5 6.8-1.8 4.6-9.3 9.2-9.3 9.2z" />
    </svg>
  ),
  guides: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19" /><path d="M8 7h7M8 10.5h7" />
    </svg>
  ),
};

type TbTeaser = { eyebrow: string; title: string; sub: string; grade: string; synergy: string; cta: string; ctaEmpty: string; points: string[] };
const tbTeaser: Record<string, TbTeaser> = {
  fr: { eyebrow: "L'outil du site", title: "Composez votre équipe", sub: "Voici l'équipe S+ de référence. Testez-la, remplacez une artiste par celles que vous possédez et comparez.", grade: "Note", synergy: "synergie", cta: "Tester cette équipe", ctaEmpty: "Partir de zéro", points: ["95 artistes UR et SSR", "Note et puissance en direct", "Comparaison de 2 équipes", "Sauvegarde et lien de partage"] },
  en: { eyebrow: "The site's tool", title: "Build your team", sub: "Here is the reference S+ team. Try it, swap in the artists you own and compare.", grade: "Grade", synergy: "synergy", cta: "Try this team", ctaEmpty: "Start from scratch", points: ["95 UR and SSR artists", "Live grade and power", "Compare 2 teams", "Save and share link"] },
  id: { eyebrow: "Alat utama situs", title: "Susun tim kamu", sub: "Ini tim S+ acuan. Coba, ganti dengan artis yang kamu punya, lalu bandingkan.", grade: "Nilai", synergy: "sinergi", cta: "Coba tim ini", ctaEmpty: "Mulai dari nol", points: ["95 artis UR dan SSR", "Nilai dan kekuatan langsung", "Bandingkan 2 tim", "Simpan dan bagikan tautan"] },
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
  const tt = topTierText[lang] || topTierText.en;
  const tb = tbTeaser[lang] || tbTeaser.en;
  const teaserHref = `/${lang}/teambuilder/?t1=${teaserTeam.map((a) => a.id).join(",")}`;

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
          <h1 className="hm-title">TopGirl<em>Guide</em></h1>
          <p className="hm-sub">{l.unofficial} · TopGirl, ApexGirl, Idol Company</p>
          <div className="hm-actions">
            <Link href={`/${lang}/teambuilder/`} className="hm-btn hm-btn-primary">{t.discoverArtists}</Link>
            <Link href={`/${lang}/tierlist/`} className="hm-btn hm-btn-ghost">{t.tierListVotes}</Link>
          </div>
        </div>
      </section>

      {/* ───────── TEAM BUILDER TEASER ───────── */}
      <section className="hm-wrap hm-section">
        <div className="hm-tb">
          <div className="hm-tb-text">
            <span className="hm-tb-eyebrow">{tb.eyebrow}</span>
            <h2 className="hm-h2">{tb.title}</h2>
            <p className="hm-tb-sub">{tb.sub}</p>
            <ul className="hm-tb-points">
              {tb.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="hm-tb-actions">
              <Link href={teaserHref} className="hm-btn hm-btn-primary">{tb.cta}</Link>
              <Link href={`/${lang}/teambuilder/`} className="hm-btn hm-btn-ghost">{tb.ctaEmpty}</Link>
            </div>
          </div>
          <Link href={teaserHref} className="hm-tb-team" aria-label={tb.cta}>
            <span className="hm-tb-slots">
              {teaserTeam.map((a) => (
                <span key={a.id} className="hm-tb-slot">
                  {a.image && <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="90px" style={{ objectFit: "cover", objectPosition: "center 12%" }} />}
                  <span className="hm-tb-slot-name">{a.name}</span>
                </span>
              ))}
            </span>
            <span className="hm-tb-eval">
              <span className="hm-tb-grade">{teaserTeamEval.grade}<small>{teaserTeamEval.rating}/100</small></span>
              <span className="hm-tb-meta">
                <b>{teaserTeamEval.score.toLocaleString("fr-FR")} pts</b>
                {teaserTeamEval.synergy && <span><GenreIcon genre={teaserTeamEval.synergy.genre} size={14} /> {teaserTeamEval.synergy.genre} ×{teaserTeamEval.synergy.count} · +{Math.round(teaserTeamEval.synergy.bonus * 100)}% {tb.synergy}</span>}
              </span>
              <span className="hm-tb-arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ───────── TOP TIER ───────── */}
      <section className="hm-wrap hm-section">
        <div className="hm-section-head">
          <div>
            <h2 className="hm-h2">{tt.title}</h2>
            <p className="hm-h2-sub">{tt.sub}</p>
          </div>
          <Link href={`/${lang}/tierlist/`} className="hm-link-btn">{tt.cta}</Link>
        </div>
        <div className="hm-top">
          {topTierArtists.map((a) => (
            <Link key={a.id} href={`/${lang}/artist/${slugify(a.name)}/`} className="hm-top-card">
              <span className="hm-top-img">
                {a.image && <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="140px" style={{ objectFit: "cover" }} />}
                <span className="hm-top-tier">S+</span>
              </span>
              <span className="hm-top-meta">
                <span className="hm-top-name">{a.name}</span>
                <span className="hm-top-skill">{skillChips(a.skills, lang)[0]?.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

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
            <Link href={`/${lang}/vote/`} className="hm-link-btn">{l.vote}</Link>
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
          <p>{t.explainerParagraphs[0]}</p>
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
            <Link key={card.href} href={`/${lang}${card.href}`} className="hm-trust-card">
              <span className="hm-trust-title">{card.title}</span>
              <span className="hm-trust-link">{card.link.replace(" →", "")} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
