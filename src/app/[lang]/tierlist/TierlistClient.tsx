"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
import { slugify } from "@/lib/utils/slugify";
import type { Artist } from "@/lib/types/artist";
import "./tierlist.css";

const tierDescriptions: Record<string, Record<string, string>> = {
  fr: {
    "S+": "Surpuissant : Les artistes les plus fortes avec des dégâts et des capacités exceptionnelles.",
    "S": "Très fort : Gros dégâts joueur combinés à une seconde compétence puissante utile dans de nombreuses situations.",
    "A": "Fort : Artistes fiables avec deux compétences puissantes qui marchent dans la plupart des compositions.",
    "B": "Situationnel : Utile surtout pour la capacité de fans ou des cas spécifiques.",
    "C": "Faible : Combinaisons de compétences inhabituelles ou inefficaces qui limitent leur utilité.",
    "D": "Très faible : Compétences incompréhensibles ou complètement inutiles."
  },
  en: {
    "S+": "Top tier: The strongest artists with exceptional damage and abilities.",
    "S": "Very strong: High player damage combined with a powerful secondary skill useful in many situations.",
    "A": "Strong: Reliable artists with two powerful skills that perform well in most team compositions.",
    "B": "Situational: Mainly valuable for fan capacity or niche strategies.",
    "C": "Weak: Artists with unusual or ineffective skill combinations that limit their usefulness.",
    "D": "Very weak: Skills that are unclear or not useful."
  },
  de: {
    "S+": "Überragend: Die stärksten Künstlerinnen mit außergewöhnlichem Schaden und Fähigkeiten.",
    "S": "Sehr stark: Hoher Spieler-Schaden kombiniert mit einer starken Sekundärfähigkeit.",
    "A": "Stark: Zuverlässige Künstlerinnen mit zwei starken Fähigkeiten.",
    "B": "Situativ: Hauptsächlich nützlich für Fan-Kapazität oder Nischenstrategien.",
    "C": "Schwach: Künstlerinnen mit ungewöhnlichen oder ineffektiven Fähigkeitskombinationen.",
    "D": "Sehr schwach: Fähigkeiten unklar oder nutzlos."
  },
  it: {
    "S+": "Sovrapotente: Gli artisti più forti con danni e abilità eccezionali.",
    "S": "Molto forte: Alto danno al giocatore con una potente abilità secondaria.",
    "A": "Forte: Artisti affidabili con due abilità potenti.",
    "B": "Situazionale: Utile soprattutto per la capacità fan o casi specifici.",
    "C": "Debole: Artisti con combinazioni di abilità insolite o inefficaci.",
    "D": "Molto debole: Abilità poco chiare o inutili."
  },
  es: {
    "S+": "Sobresaliente: Los artistas más fuertes con daño y habilidades excepcionales.",
    "S": "Muy fuerte: Alto daño al jugador con una poderosa habilidad secundaria.",
    "A": "Fuerte: Artistas confiables con dos habilidades poderosas.",
    "B": "Situacional: Útil sobre todo por la capacidad de fans o casos específicos.",
    "C": "Débil: Artistas con combinaciones de habilidades inusuales o ineficaces.",
    "D": "Muy débil: Habilidades poco claras o inútiles."
  },
  pt: {
    "S+": "Muito forte: Os artistas mais fortes com dano e habilidades excepcionais.",
    "S": "Muito forte: Alto dano ao jogador com uma poderosa habilidade secundária.",
    "A": "Forte: Artistas confiáveis com duas habilidades poderosas.",
    "B": "Situacional: Útil sobretudo pela capacidade de fãs ou casos específicos.",
    "C": "Fraco: Artistas com combinações de habilidades incomuns ou ineficazes.",
    "D": "Muito fraco: Habilidades pouco claras ou inúteis."
  },
  pl: {
    "S+": "Najwyższa półka: Najsilniejsi artyści z wyjątkowymi obrażeniami i umiejętnościami.",
    "S": "Bardzo silny: Wysokie obrażenia gracza i potężna umiejętność dodatkowa.",
    "A": "Silny: Niezawodni artyści z dwiema potężnymi umiejętnościami.",
    "B": "Sytuacyjny: Przydatny głównie dzięki pojemności fanów lub w konkretnych sytuacjach.",
    "C": "Słaby: Artyści z nietypowymi lub nieefektywnymi kombinacjami umiejętności.",
    "D": "Bardzo słaby: Umiejętności niejasne lub bezużyteczne."
  },
  id: {
    "S+": "Sangat kuat: Artis terkuat dengan kerusakan dan kemampuan luar biasa.",
    "S": "Sangat kuat: Kerusakan pemain tinggi dengan skill sekunder yang kuat.",
    "A": "Kuat: Artis andal dengan dua skill kuat.",
    "B": "Situasional: Utama berguna untuk kapasitas penggemar atau situasi tertentu.",
    "C": "Lemah: Artis dengan kombinasi skill yang tidak biasa atau tidak efektif.",
    "D": "Sangat lemah: Skill tidak jelas atau tidak berguna."
  },
  ru: {
    "S+": "Лучший уровень: Самые сильные артисты с исключительным уроном и способностями.",
    "S": "Очень сильный: Высокий урон игрока и мощный вторичный навык.",
    "A": "Сильный: Надёжные артисты с двумя мощными навыками.",
    "B": "Ситуационный: Полезен в основном из-за вместимости фанатов или в отдельных ситуациях.",
    "C": "Слабый: Артисты с необычными или неэффективными комбинациями навыков.",
    "D": "Очень слабый: Навыки непонятны или бесполезны."
  }
};

const tierlistTranslations: Record<string, any> = {
  fr: { title: "Tier List", subtitle: "Classement des artistes et votes communautaires", classic: "Classique", vote: "Vote", viewProfile: "Voir le profil", tierListClassic: "Tier List Classique", voteForFavorite: "Votez pour votre favori", voteBanner: "Votez pour votre artiste préféré ! Un seul vote par jour.", voteForArtist: "Votez pour un artiste", alreadyVoted: "Vous avez déjà voté aujourd'hui.", podium: "🏅 Podium — Cette semaine", fullRanking: "📊 Classement complet", artistCount: (n: number) => `${n} artiste${n > 1 ? "s" : ""}`, voteError: "Une erreur est survenue.", voteSuccess: "Votre vote a été comptabilisé !", voteAlreadyVoted: "Vous avez déjà voté aujourd'hui.", allGenres: "Tous les genres", allSpecialties: "Toutes spécialités" },
  en: { title: "Tier List", subtitle: "Artist rankings and community votes", classic: "Classic", vote: "Vote", viewProfile: "View profile", tierListClassic: "Tier List Classic", voteForFavorite: "Vote for your favorite", voteBanner: "Vote for your favorite artist! One vote per day.", voteForArtist: "Vote for an artist", alreadyVoted: "You have already voted today.", podium: "🏅 Podium — This week", fullRanking: "📊 Full ranking", artistCount: (n: number) => `${n} artist${n > 1 ? "s" : ""}`, voteError: "An error occurred.", voteSuccess: "Your vote has been counted!", voteAlreadyVoted: "You have already voted today.", allGenres: "All genres", allSpecialties: "All specialties" },
  de: { title: "Tier List", subtitle: "Künstler-Rankings und Community-Stimmen", classic: "Klassisch", vote: "Abstimmen", viewProfile: "Profil ansehen", tierListClassic: "Tier List Klassisch", voteForFavorite: "Stimme für deinen Favoriten", voteBanner: "Stimme für deinen Lieblingskünstler! Eine Stimme pro Tag.", voteForArtist: "Für einen Künstler stimmen", alreadyVoted: "Du hast heute schon abgestimmt.", podium: "🏅 Podium — Diese Woche", fullRanking: "📊 Vollständiges Ranking", artistCount: (n: number) => `${n} Künstler${n > 1 ? "nen" : ""}`, voteError: "Ein Fehler ist aufgetreten.", voteSuccess: "Deine Stimme wurde gezählt!", voteAlreadyVoted: "Du hast heute schon abgestimmt.", allGenres: "Alle Genres", allSpecialties: "Alle Spezialitäten" },
  it: { title: "Tier List", subtitle: "Classifiche artisti e voti della community", classic: "Classico", vote: "Vota", viewProfile: "Vedi profilo", tierListClassic: "Tier List Classico", voteForFavorite: "Vota il tuo preferito", voteBanner: "Vota il tuo artista preferito! Un voto al giorno.", voteForArtist: "Vota per un artista", alreadyVoted: "Hai già votato oggi.", podium: "🏅 Podio — Questa settimana", fullRanking: "📊 Classifica completa", artistCount: (n: number) => `${n} artista/i`, voteError: "Si è verificato un errore.", voteSuccess: "Il tuo voto è stato conteggiato!", voteAlreadyVoted: "Hai già votato oggi.", allGenres: "Tutti i generi", allSpecialties: "Tutte le specialità" },
  es: { title: "Tier List", subtitle: "Clasificaciones de artistas y votos comunitarios", classic: "Clásico", vote: "Votar", viewProfile: "Ver perfil", tierListClassic: "Tier List Clásico", voteForFavorite: "Vota por tu favorito", voteBanner: "¡Vota por tu artista favorito! Un voto por día.", voteForArtist: "Vota por un artista", alreadyVoted: "Ya has votado hoy.", podium: "🏅 Podio — Esta semana", fullRanking: "📊 Clasificación completa", artistCount: (n: number) => `${n} artista${n > 1 ? "s" : ""}`, voteError: "Se produjo un error.", voteSuccess: "¡Tu voto ha sido contabilizado!", voteAlreadyVoted: "Ya has votado hoy.", allGenres: "Todos los géneros", allSpecialties: "Todas las especialidades" },
  pt: { title: "Tier List", subtitle: "Ranking de artistas e votos da comunidade", classic: "Clássico", vote: "Votar", viewProfile: "Ver perfil", tierListClassic: "Tier List Clássico", voteForFavorite: "Vote no seu favorito", voteBanner: "Vote na sua artista favorita! Um voto por dia.", voteForArtist: "Vote em um artista", alreadyVoted: "Você já votou hoje.", podium: "🏅 Pódio — Esta semana", fullRanking: "📊 Classificação completa", artistCount: (n: number) => `${n} artista${n > 1 ? "s" : ""}`, voteError: "Ocorreu um erro.", voteSuccess: "Seu voto foi contabilizado!", voteAlreadyVoted: "Você já votou hoje.", allGenres: "Todos os gêneros", allSpecialties: "Todas as especialidades" },
  pl: { title: "Tier List", subtitle: "Rankingi artystów i głosy społeczności", classic: "Klasyczny", vote: "Głosuj", viewProfile: "Zobacz profil", tierListClassic: "Tier List Klasyczna", voteForFavorite: "Głosuj na swojego faworyta", voteBanner: "Głosuj na swojego ulubionego artystę! Jeden głos dziennie.", voteForArtist: "Głosuj na artystę", alreadyVoted: "Oddałeś już głos.", podium: "🏅 Podium — Ten tydzień", fullRanking: "📊 Pełny ranking", artistCount: (n: number) => `${n} artysta/ów`, voteError: "Wystąpił błąd.", voteSuccess: "Twój głos został policzony!", voteAlreadyVoted: "Oddałeś już głos dzisiaj.", allGenres: "Wszystkie gatunki", allSpecialties: "Wszystkie specjalności" },
  id: { title: "Tier List", subtitle: "Peringkat artis dan suara komunitas", classic: "Klasik", vote: "Vote", viewProfile: "Lihat profil", tierListClassic: "Tier List Klasik", voteForFavorite: "Pilih favoritmu", voteBanner: "Pilih artis favoritmu! Satu suara per hari.", voteForArtist: "Pilih seorang artis", alreadyVoted: "Anda sudah memilih hari ini.", podium: "🏅 Podium — Minggu ini", fullRanking: "📊 Peringkat lengkap", artistCount: (n: number) => `${n} artis`, voteError: "Terjadi kesalahan.", voteSuccess: "Suara Anda telah dihitung!", voteAlreadyVoted: "Anda sudah memilih hari ini.", allGenres: "Semua genre", allSpecialties: "Semua spesialisasi" },
  ru: { title: "Tier List", subtitle: "Рейтинги артистов и голоса сообщества", classic: "Классика", vote: "Голосовать", viewProfile: "Посмотреть профиль", tierListClassic: "Tier List Классика", voteForFavorite: "Голосуйте за фаворита", voteBanner: "Голосуйте за любимого артиста! Один голос в день.", voteForArtist: "Голосовать за артиста", alreadyVoted: "Вы уже голосовали сегодня.", podium: "🏅 Подиум — Эта неделя", fullRanking: "📊 Полный рейтинг", artistCount: (n: number) => `${n} артист(ов)`, voteError: "Произошла ошибка.", voteSuccess: "Ваш голос учтён!", voteAlreadyVoted: "Вы уже голосовали сегодня.", allGenres: "Все жанры", allSpecialties: "Все специализации" },
};


const rankColors: Record<string, string> = {
  UR: "#ffd700",
  "UR Roma": "#ef4444",
  "UR Bali": "#ef4444",
  SSR: "#c084fc",
  SR: "#60a5fa",
  R: "#4ade80",
  N: "#94a3b8",
};

const genreColors: Record<string, string> = {
  "Pop": "#ec4899",
  "Rock": "#ef4444",
  "EDM": "#8b5cf6",
  "Hip Hop": "#f59e0b",
  "R&B": "#06b6d4",
};

// bg = pill background (legend / badges). Panels use `rgb` for tinted dark surfaces.
const tierColors: Record<string, { bg: string; border: string; text: string; rgb: string }> = {
  "S+": { bg: "rgba(255, 215, 0, 0.18)", border: "#ffd700", text: "#ffd700", rgb: "255, 215, 0" },
  S: { bg: "rgba(250, 204, 21, 0.16)", border: "#facc15", text: "#facc15", rgb: "250, 204, 21" },
  A: { bg: "rgba(34, 197, 94, 0.16)", border: "#22c55e", text: "#4ade80", rgb: "34, 197, 94" },
  B: { bg: "rgba(59, 130, 246, 0.16)", border: "#3b82f6", text: "#60a5fa", rgb: "59, 130, 246" },
  C: { bg: "rgba(245, 158, 11, 0.16)", border: "#f59e0b", text: "#fbbf24", rgb: "245, 158, 11" },
  D: { bg: "rgba(148, 163, 184, 0.16)", border: "#94a3b8", text: "#cbd5e1", rgb: "148, 163, 184" },
};

const tierOrder: string[] = ["S+", "S", "A", "B", "C", "D"];

// Specialty keys for internal use
const SPECIALTY_KEYS = ['damage_boost', 'damage_reduction', 'driving_speed', 'solo_car', 'mixed', 'gathering', 'economy', 'hq_defense'] as const;

// French values from artists.json (used for matching)
const SPECIALTY_VALUES = ['Augmentation dommage', 'Dommage réduction', 'Vitesse de conduite', 'Solo car', 'Mixte', 'Rassemblement', 'Économie', 'HQ Defense'] as const;

// Mapping from French to key
const SPECIALTY_FR_TO_KEY: Record<string, string> = {
  'Augmentation dommage': 'damage_boost',
  'Dommage réduction': 'damage_reduction',
  'Vitesse de conduite': 'driving_speed',
  'Solo car': 'solo_car',
  'Mixte': 'mixed',
  'Rassemblement': 'gathering',
  'Économie': 'economy',
  'HQ Defense': 'hq_defense',
};

// Translated labels by language
const SPECIALTY_LABELS: Record<string, Record<string, string>> = {
  fr: { damage_boost: 'Augmentation dommage', damage_reduction: 'Dommage réduction', driving_speed: 'Vitesse de conduite', solo_car: 'Solo car', mixed: 'Mixte', gathering: 'Rassemblement', economy: 'Économie', hq_defense: 'HQ Defense' },
  en: { damage_boost: 'Damage Boost', damage_reduction: 'Damage Reduction', driving_speed: 'Driving Speed', solo_car: 'Solo Car', mixed: 'Mixed', gathering: 'Gathering', economy: 'Economy', hq_defense: 'HQ Defense' },
  it: { damage_boost: 'Boost Danno', damage_reduction: 'Riduzione Danno', driving_speed: 'Velocità Guida', solo_car: 'Auto Solitaria', mixed: 'Misto', gathering: 'Raccolta', economy: 'Economia', hq_defense: 'HQ Difesa' },
  es: { damage_boost: 'Aumento de Daño', damage_reduction: 'Reducción de Daño', driving_speed: 'Velocidad de Conducción', solo_car: 'Coche Solitario', mixed: 'Mixto', gathering: 'Reunión', economy: 'Economía', hq_defense: 'HQ Defensa' },
  pt: { damage_boost: 'Aumento de Dano', damage_reduction: 'Redução de Dano', driving_speed: 'Velocidade de Condução', solo_car: 'Carro Solo', mixed: 'Misto', gathering: 'Reunião', economy: 'Economia', hq_defense: 'HQ Defesa' },
  pl: { damage_boost: 'Zwiększenie Obrażeń', damage_reduction: 'Redukcja Obrażeń', driving_speed: 'Prędkość Prowadzenia', solo_car: 'Samochód Solo', mixed: 'Mieszany', gathering: 'Zbieranie', economy: 'Ekonomia', hq_defense: 'HQ Obrona' },
  id: { damage_boost: 'Peningkat Kerusakan', damage_reduction: 'Pengurangan Kerusakan', driving_speed: 'Kecepatan Mengemudi', solo_car: 'Mobil Solo', mixed: 'Campuran', gathering: 'Pengumpulan', economy: 'Ekonomi', hq_defense: 'HQ Pertahanan' },
  ru: { damage_boost: 'Увеличение урона', damage_reduction: 'Уменьшение урона', driving_speed: 'Скорость вождения', solo_car: 'Соло Машина', mixed: 'Смешанный', gathering: 'Сбор', economy: 'Экономика', hq_defense: 'HQ Защита' },
  de: { damage_boost: 'Schadensboost', damage_reduction: 'Schadensreduzierung', driving_speed: 'Fahrgeschwindigkeit', solo_car: 'Solo Auto', mixed: 'Gemischt', gathering: 'Sammeln', economy: 'Wirtschaft', hq_defense: 'HQ Verteidigung' },
};

const getTierOrder = (tier: string): number => {
  return tierOrder.indexOf(tier);
};

const tierLabels: Record<string, Record<string, string>> = {
  fr: { "S+": "Incontournables", S: "Excellentes", A: "Solides", B: "Situationnelles", C: "Faibles", D: "À éviter" },
  en: { "S+": "Must-have", S: "Excellent", A: "Solid", B: "Situational", C: "Weak", D: "Avoid" },
};
const getTierLabel = (tier: string, lang: string): string =>
  tierLabels[lang]?.[tier] || tierLabels.en[tier] || "";

type VoteRow = { artist_id?: number; artist_name: string; rank?: string; count?: number; week_count: number };
const stripEmoji = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, "").trim();

const getTierDescription = (tier: string, lang: string): string => {
  return tierDescriptions[lang]?.[tier] || tierDescriptions.en[tier] || "";
};

const getEffectiveTier = (artist: any): string => {
  return (artist.calculatedTier || 'D').toUpperCase();
};

function TierListPageInner({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const t = tierlistTranslations[lang] || tierlistTranslations.en;
  const [activeTab, setActiveTab] = useState<"classic" | "vote">(
    searchParams?.get("tab") === "vote" ? "vote" : "classic"
  );
  const [voteData, setVoteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [votedToday, setVotedToday] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);

  // Remember today's vote across reloads
  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      if (localStorage.getItem("voteDate") === today) {
        setVotedToday(true);
        setVotedFor(localStorage.getItem("voteFor"));
      }
    } catch {}
  }, []);
  const [voteMessage, setVoteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [votingArtist, setVotingArtist] = useState<string | null>(null);
  const [filterGenre, setFilterGenre] = useState<string>("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("");

  useEffect(() => {
    fetchVoteData();
  }, []);

  const fetchVoteData = async () => {
    try {
      const res = await fetch("/api/vote");
      const data = await res.json();
      setVoteData(data);
    } catch (e) {
      console.error("Failed to load vote data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (artistName: string) => {
    setVotingArtist(artistName);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist_name: artistName }),
      });
      const data = await res.json();

      if (data.success) {
        setVoteMessage({ type: "success", text: t.voteSuccess });
        setVotedToday(true);
        setVotedFor(artistName);
        try {
          localStorage.setItem("voteDate", new Date().toISOString().split("T")[0]);
          localStorage.setItem("voteFor", artistName);
        } catch {}
        fetchVoteData();
      } else {
        const alreadyVotedMsg =
          data.message?.toLowerCase().includes("already") ||
          data.message?.toLowerCase().includes("déjà") ||
          data.message?.toLowerCase().includes("già") ||
          data.message?.toLowerCase().includes("ya has") ||
          data.message?.toLowerCase().includes("já votou") ||
          data.message?.toLowerCase().includes("oddałeś") ||
          data.message?.toLowerCase().includes("sudah") ||
          data.message?.toLowerCase().includes("уже");
        setVoteMessage({ type: "error", text: alreadyVotedMsg ? t.voteAlreadyVoted : t.voteError });
        if (alreadyVotedMsg) setVotedToday(true);
      }

      setTimeout(() => setVoteMessage(null), 3500);
    } catch (e) {
      setVoteMessage({ type: "error", text: t.voteError });
      setTimeout(() => setVoteMessage(null), 3500);
    } finally {
      setVotingArtist(null);
    }
  };

  const artists = artistsData as Artist[];
  const tierOrder = ["S+", "S", "A", "B", "C", "D"];
  const ranking: VoteRow[] = (voteData?.rankings?.this_week || []).slice(0, 15);
  const top3 = ranking.slice(0, 3);
  const maxVotes = Math.max(1, ...ranking.map((r) => r.week_count || 0));
  const rankOrderMap: Record<string, number> = { UR: 1, "UR Roma": 1, "UR Bali": 1, SSR: 2, SR: 3, R: 4, N: 5 };
  const votableArtists = [...artists].sort((a, b) => (rankOrderMap[a.rank] || 99) - (rankOrderMap[b.rank] || 99));

  return (
    <>

      <div className="container" style={{ paddingTop: "32px" }}>
        <header className="page-head">
          <span className="eyebrow">TopGirl · ApexGirl</span>
          <h1 className="page-head-title">{t.title}</h1>
          <p className="page-head-sub">{t.subtitle}</p>
        </header>

        <AdBanner />

        {/* Tabs — segmented control */}
        <div role="tablist" className="seg">
          <button role="tab" aria-selected={activeTab === "classic"} onClick={() => setActiveTab("classic")} className={`seg-btn${activeTab === "classic" ? " on" : ""}`}>
            {t.tierListClassic}
          </button>
          <button role="tab" aria-selected={activeTab === "vote"} onClick={() => setActiveTab("vote")} className={`seg-btn${activeTab === "vote" ? " on" : ""}`}>
            {t.voteForFavorite}
          </button>
        </div>

        {/* Floating toast */}
        {voteMessage && (
          <div role="alert" style={{
            position: "fixed",
            top: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            padding: "14px 28px",
            borderRadius: "40px",
            background: voteMessage.type === "success"
              ? "rgba(22, 163, 74, 0.95)"
              : "rgba(220, 38, 38, 0.95)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.95rem",
            textAlign: "center",
            boxShadow: voteMessage.type === "success"
              ? "0 8px 32px rgba(34,197,94,0.4)"
              : "0 8px 32px rgba(239,68,68,0.4)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${voteMessage.type === "success" ? "#22c55e" : "#ef4444"}`,
            whiteSpace: "nowrap",
            animation: "toastIn 0.25s ease",
          }}>
            {voteMessage.text}
          </div>
        )}

        {/* Classic Tier List Tab */}
        {activeTab === "classic" && (
          <div>
            {/* Toolbar: legend + filters */}
            <div className="tier-toolbar">
              <div className="tier-legend" aria-label="Tiers">
                {tierOrder.map(tier => (
                  <span key={tier} className="tier-chip" style={{ ["--tier" as string]: tierColors[tier]?.rgb }}>
                    <b>{tier}</b>
                  </span>
                ))}
              </div>
              <div className="tier-filters">
                <label className="tier-select">
                  <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
                    <option value="">{t.allGenres || "All genres"}</option>
                    {Object.keys(genreColors).map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </label>
                <label className="tier-select">
                  <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
                    <option value="">{t.allSpecialties || "All specialties"}</option>
                    {SPECIALTY_KEYS.map(key => {
                      const frValue = SPECIALTY_VALUES[SPECIALTY_KEYS.indexOf(key)];
                      const label = SPECIALTY_LABELS[lang]?.[key] || SPECIALTY_LABELS['en']?.[key] || frValue;
                      return <option key={key} value={frValue}>{label}</option>;
                    })}
                  </select>
                </label>
              </div>
            </div>

            {tierOrder.map(tier => {
               const tierArtists = artists.filter(a => 
                 getEffectiveTier(a) === tier
                 && a.rank === "SSR"
                 && (!filterGenre || (a.genre?.trim() || "") === filterGenre.trim())
                 && (!filterSpecialty || (a.specialty?.trim() || "") === filterSpecialty.trim())
               ).sort((a, b) =>
                 (b.tierScore || 0) - (a.tierScore || 0)
                 || ((b.singStat || 0) + (b.danceStat || 0)) - ((a.singStat || 0) + (a.danceStat || 0))
               );
              
              if (tierArtists.length === 0) return null;
              
              return (
                <section key={tier} className="tier-panel" style={{ ["--tier" as string]: tierColors[tier]?.rgb }}>
                  <header className="tier-head">
                    <span className="tier-letter">{tier}</span>
                    <div className="tier-head-text">
                      <span className="tier-head-title">{getTierLabel(tier, lang)}</span>
                      <span className="tier-head-count">{t.artistCount(tierArtists.length)}</span>
                    </div>
                    <div className="tier-tooltip-container tier-help">
                      <span className="tier-help-btn" aria-label={getTierDescription(tier, lang)}>i</span>
                      <div className="tier-tooltip tier-help-pop">
                        <div className="tier-help-pop-title">Tier {tier}</div>
                        <div className="tier-help-pop-body">{getTierDescription(tier, lang)}</div>
                      </div>
                    </div>
                  </header>

                  <div className="tier-grid">
                    {tierArtists.map(artist => (
                      <Link key={artist.id} href={`/${lang}/artist/${slugify(artist.name)}/`} className="artist-tile" style={{ ["--rank" as string]: rankColors[artist.rank] || "#94a3b8" }}>
                        <div className="artist-tile-img">
                          {artist.image ? (
                            <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="120px" style={{ objectFit: "cover" }} />
                          ) : (
                            <span className="artist-tile-letter">{artist.name.charAt(0)}</span>
                          )}
                          <span className="artist-tile-rank">{artist.rank.replace("UR ", "UR·")}</span>
                        </div>
                        <div className="artist-tile-meta">
                          <span className="artist-tile-name">{artist.name}</span>
                          <span className="artist-tile-genre">
                            <i style={{ background: genreColors[artist.genre] || "#666" }} />
                            {artist.genre}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Voting Tab */}
        {activeTab === "vote" && (
          <div className="vote">
            <div className={`vote-banner${votedToday ? " done" : ""}`}>
              <span className="vote-banner-dot" aria-hidden="true" />
              <span>{votedToday ? t.alreadyVoted : t.voteBanner}</span>
              {votedFor && <span className="vote-banner-for">· {votedFor}</span>}
            </div>

            {/* Podium */}
            {top3.length > 0 && (
              <section className="vote-section">
                <h2 className="vote-h2">{stripEmoji(t.podium)}</h2>
                <div className="podium">
                  {top3.map((entry, i) => {
                    const a = artists.find((x) => x.name === entry.artist_name);
                    return (
                      <Link key={entry.artist_name} href={`/${lang}/artist/${slugify(entry.artist_name)}/`} className={`podium-card p${i + 1}`}>
                        <span className="podium-place">{i + 1}</span>
                        <span className="podium-img">
                          {a?.image ? <Image src={`/assets/images/artists/${a.image}`} alt={entry.artist_name} fill sizes="200px" style={{ objectFit: "cover" }} /> : <span className="podium-letter">{entry.artist_name.charAt(0)}</span>}
                        </span>
                        <span className="podium-meta">
                          <span className="podium-name">{entry.artist_name}</span>
                          <span className="podium-votes">{entry.week_count} {t.vote.toLowerCase()}s</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Full ranking */}
            {ranking.length > 0 && (
              <section className="vote-section">
                <h2 className="vote-h2">{stripEmoji(t.fullRanking)}</h2>
                <ol className="rank-list">
                  {ranking.map((entry, index) => {
                    const a = artists.find((x) => x.name === entry.artist_name);
                    return (
                      <li key={entry.artist_name}>
                        <Link href={`/${lang}/artist/${slugify(entry.artist_name)}/`} className={`rank-row${index < 3 ? " top" : ""}`}>
                          <span className="rank-pos">{index + 1}</span>
                          <span className="rank-img">
                            {a?.image && <Image src={`/assets/images/artists/${a.image}`} alt={entry.artist_name} fill sizes="40px" style={{ objectFit: "cover" }} />}
                          </span>
                          <span className="rank-name">{entry.artist_name}</span>
                          <span className="rank-rank" style={{ color: rankColors[entry.rank || ""] || "var(--text-muted)" }}>{entry.rank}</span>
                          <span className="rank-bar"><i style={{ width: `${Math.max(4, (entry.week_count / maxVotes) * 100)}%` }} /></span>
                          <span className="rank-count">{entry.week_count}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {/* Vote grid */}
            <section className="vote-section">
              <h2 className="vote-h2">{stripEmoji(t.voteForArtist)}</h2>
              <div className="vote-grid">
                {votableArtists.map((artist) => {
                  const isVoting = votingArtist === artist.name;
                  const mine = votedFor === artist.name;
                  const isDisabled = votedToday || isVoting;
                  return (
                    <div key={artist.id} className={`vote-tile${mine ? " mine" : ""}`} style={{ ["--rank" as string]: rankColors[artist.rank] || "#94a3b8" }}>
                      <Link href={`/${lang}/artist/${slugify(artist.name)}/`} className="vote-tile-link">
                        <span className="vote-tile-img">
                          {artist.image ? <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="120px" style={{ objectFit: "cover" }} /> : <span className="artist-tile-letter">{artist.name.charAt(0)}</span>}
                          <span className="artist-tile-rank">{artist.rank.replace("UR ", "UR·")}</span>
                        </span>
                        <span className="vote-tile-name">{artist.name}</span>
                      </Link>
                      <button
                        className={`vote-btn${mine ? " mine" : isDisabled ? " off" : ""}`}
                        aria-label={`${t.vote} ${artist.name}`}
                        onClick={() => { if (!isDisabled) handleVote(artist.name); }}
                        disabled={isDisabled}
                      >
                        {isVoting ? "…" : mine ? "✓" : isDisabled ? "—" : t.vote}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .container {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
}

export default function TierlistClient({ lang }: { lang: string }) {
  return (
    <Suspense fallback={null}>
      <TierListPageInner lang={lang} />
    </Suspense>
  );
}
