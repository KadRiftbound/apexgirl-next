"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
import { slugify } from "@/lib/utils/slugify";
import type { Artist } from "@/lib/types/artist";

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

const tierColors: Record<string, { bg: string; border: string; text: string }> = {
  "S+": { bg: "rgba(255, 215, 0, 0.25)", border: "#ffd700", text: "#ffd700" },
  S: { bg: "rgba(255, 215, 0, 0.15)", border: "#ffd700", text: "#ffd700" },
  A: { bg: "rgba(34, 197, 94, 0.15)", border: "#22c55e", text: "#22c55e" },
  B: { bg: "rgba(59, 130, 246, 0.15)", border: "#3b82f6", text: "#3b82f6" },
  C: { bg: "rgba(245, 158, 11, 0.15)", border: "#f59e0b", text: "#f59e0b" },
  D: { bg: "rgba(148, 163, 184, 0.15)", border: "#94a3b8", text: "#94a3b8" },
};

const tierOrder: string[] = ["S+", "S", "A", "B", "C", "D"];

const getTierOrder = (tier: string): number => {
  return tierOrder.indexOf(tier);
};

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

  return (
    <>

      <div className="container" style={{ paddingTop: "40px" }}>
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <h1 className="section-title">🏆 {t.title}</h1>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <AdBanner />

        {/* Tabs */}
        <div style={{ 
          display: "flex", 
          gap: "8px", 
          justifyContent: "center", 
          marginTop: "32px",
          marginBottom: "32px"
        }}>
          <button
            onClick={() => setActiveTab("classic")}
            style={{
              padding: "14px 32px",
              borderRadius: "var(--radius-full)",
              border: activeTab === "classic" 
                ? "2px solid var(--primary)" 
                : "2px solid var(--border)",
              background: activeTab === "classic" 
                ? "linear-gradient(135deg, var(--primary), #ff80ab)" 
                : "var(--bg-card)",
              color: activeTab === "classic" ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              boxShadow: activeTab === "classic" 
                ? "0 4px 20px rgba(255, 77, 141, 0.4)" 
                : "none"
            }}
          >
            📊 {t.tierListClassic}
          </button>
          <button
            onClick={() => setActiveTab("vote")}
            style={{
              padding: "14px 32px",
              borderRadius: "var(--radius-full)",
              border: activeTab === "vote" 
                ? "2px solid var(--secondary)" 
                : "2px solid var(--border)",
              background: activeTab === "vote" 
                ? "linear-gradient(135deg, var(--secondary), #a78bfa)" 
                : "var(--bg-card)",
              color: activeTab === "vote" ? "#fff" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              boxShadow: activeTab === "vote" 
                ? "0 4px 20px rgba(139, 92, 246, 0.4)" 
                : "none"
            }}
          >
            ❤️ {t.voteForFavorite}
          </button>
        </div>

        {/* Floating toast */}
        {voteMessage && (
          <div style={{
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
            {voteMessage.type === "success" ? "✅ " : "❌ "}{voteMessage.text}
          </div>
        )}

        {/* Classic Tier List Tab */}
        {activeTab === "classic" && (
          <div>
            {/* Filters */}
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              marginBottom: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {tierOrder.map(tier => (
                <div
                  key={tier}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius)",
                    background: tierColors[tier]?.bg,
                    border: `1px solid ${tierColors[tier]?.border}`,
                    color: tierColors[tier]?.text,
                    fontWeight: 600,
                    fontSize: "0.85rem"
                  }}
                >
                  Tier {tier}
                </div>
              ))}
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  cursor: "pointer"
                }}
              >
                <option value="">{t.allGenres || "All genres"}</option>
                {Object.keys(genreColors).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  cursor: "pointer"
                }}
              >
                <option value="">{t.allSpecialties || "All specialties"}</option>
                <option value="Augmentation dommage">Augmentation dommage</option>
                <option value="Dommage réduction">Dommage réduction</option>
                <option value="Vitesse de conduite">Vitesse de conduite</option>
                <option value="Solo car">Solo car</option>
                <option value="Mixte">Mixte</option>
                <option value="Rassemblement">Rassemblement</option>
                <option value="Économie">Économie</option>
                <option value="HQ Defense">HQ Defense</option>
              </select>
            </div>

            {/* Genre Legend */}
            <div style={{ 
              display: "flex", 
              gap: "16px", 
              marginBottom: "24px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              {Object.entries(genreColors).map(([genre, color]) => (
                <div key={genre} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{genre}</span>
                </div>
              ))}
            </div>

            {tierOrder.map(tier => {
               const tierArtists = artists.filter(a => 
                 getEffectiveTier(a) === tier
                 && (a.rank === "UR" || a.rank === "SSR")
                 && (!filterGenre || (a.genre?.trim() || "") === filterGenre.trim())
                 && (!filterSpecialty || (a.specialty?.trim() || "") === filterSpecialty.trim())
               );
              
              if (tierArtists.length === 0) return null;
              
              return (
                <div 
                  key={tier}
                  style={{
                    marginBottom: "24px",
                    borderRadius: "var(--radius-lg)",
                    background: tierColors[tier]?.bg,
                    border: `2px solid ${tierColors[tier]?.border}`,
                    overflow: "hidden"
                  }}
                 >
                   <div style={{
                     padding: "12px 20px",
                     background: `${tierColors[tier]?.border}22`,
                     borderBottom: `1px solid ${tierColors[tier]?.border}44`,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between"
                   }}>
                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                       <span style={{
                         fontSize: "1.25rem",
                         fontWeight: 800,
                         color: tierColors[tier]?.text,
                         width: "40px"
                       }}>
                         {tier}
                       </span>
                       <span style={{ 
                         color: "var(--text-muted)", 
                         fontSize: "0.85rem" 
                       }}>
                         {t.artistCount(tierArtists.length)}
                       </span>
                     </div>
                     <div style={{ position: "relative" }} className="tier-tooltip-container">
                       <span 
                         style={{ 
                           fontSize: "0.85rem", 
                           fontWeight: 600,
                           color: tierColors[tier]?.text,
                           background: tierColors[tier]?.bg,
                           border: `1px solid ${tierColors[tier]?.border}`,
                           borderRadius: "50%",
                           width: "20px",
                           height: "20px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           cursor: "help",
                           position: "relative",
                           zIndex: 101
                         }}
                       >
                         ?
                       </span>
                       <div style={{
                         position: "absolute",
                         top: "100%",
                         right: "0",
                         marginTop: "8px",
                         padding: "12px 16px",
                         background: "var(--bg-card)",
                         border: `1px solid ${tierColors[tier]?.border}`,
                         borderRadius: "var(--radius-md)",
                         boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                         zIndex: 1000,
                         minWidth: "250px",
                         maxWidth: "300px",
                         display: "none"
                       }} className="tier-tooltip">
                         <div style={{ 
                           fontSize: "0.8rem", 
                           color: tierColors[tier]?.text,
                           fontWeight: 600,
                           marginBottom: "4px"
                         }}>
                           Tier {tier}
                         </div>
                         <div style={{ 
                           fontSize: "0.75rem", 
                           color: "var(--text-secondary)",
                           lineHeight: 1.4
                         }}>
                           {getTierDescription(tier, lang)}
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   <div style={{
                     display: "flex",
                     flexWrap: "wrap",
                     gap: "8px",
                     padding: "16px"
                   }}>
                      {tierArtists
                        .sort((a, b) => getTierOrder(getEffectiveTier(a)) - getTierOrder(getEffectiveTier(b)))
                        .map(artist => (
                          <Link key={artist.id} href={`/${lang}/artist/${slugify(artist.name)}`} style={{
                            textDecoration: 'none',
                            display: 'inline-block',
                            width: '90px'
                          }}>
                           <div style={{
                             width: "112px",
                             height: "140px",
                             margin: "0 auto 6px",
                             borderRadius: "var(--radius-md)",
                             border: `2px solid ${rankColors[artist.rank]}`,
                             background: "var(--bg-card)",
                             overflow: "hidden",
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center",
                             position: "relative",
                             transition: "transform 0.2s"
                           }}>
                             {artist.image ? (
                               <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill style={{ objectFit: "cover" }} />
                             ) : (
                               <span style={{ 
                                 fontSize: "2rem", 
                                 fontWeight: 800, 
                                 color: rankColors[artist.rank] 
                               }}>
                                 {artist.name.charAt(0)}
                               </span>
                              )}
                              <div style={{
                                position: "absolute",
                                bottom: "4px",
                                left: "4px",
                                right: "4px",
                                background: genreColors[artist.genre] || "#666",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontSize: "0.6rem",
                                fontWeight: 600,
                                color: "#fff",
                                textAlign: "center",
                                textTransform: "uppercase"
                              }}>
                                {artist.genre}
                              </div>
                            </div>
                            <div style={{
                             fontSize: "0.7rem",
                             fontWeight: 600,
                             color: "var(--text-primary)",
                             whiteSpace: "nowrap",
                             overflow: "hidden",
                             textOverflow: "ellipsis"
                           }}>
                             {artist.name}
                           </div>
                         </Link>
                       ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Voting Tab */}
        {activeTab === "vote" && (
          <div>
            {/* Vote Status Banner */}
            {votedToday ? (
              <div style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: "rgba(139, 92, 246, 0.18)",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                marginBottom: "24px",
                color: "rgba(167,139,250,0.9)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}>
                ✅ {t.alreadyVoted}
              </div>
            ) : (
              <div style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 77, 141, 0.12)",
                border: "1px solid rgba(255, 77, 141, 0.30)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
                marginBottom: "24px",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}>
                🎉 {t.voteBanner}
              </div>
            )}

            {/* Top 3 Leaderboard */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ 
                fontSize: "1.25rem", 
                fontWeight: 700, 
                marginBottom: "20px",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                {t.podium}
              </h3>
              
              {/* Top 3 with Images */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "12px",
                marginBottom: "32px",
                padding: "0 8px",
              }}>
               {/* 2nd Place */}
                  {voteData?.rankings?.this_week?.[1] && (
                    <Link href={`/${lang}/artist/${slugify(artistsData.find(a => a.name === voteData?.rankings?.this_week?.[1]?.artist_name)?.name || '')}`} style={{
                     textDecoration: 'none',
                     display: 'inline-block'
                   }}>
                     <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                       <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🥈</div>
                       <div style={{
                         width: "84px", height: "84px",
                         borderRadius: "50%",
                         border: "3px solid #c0c0c0",
                         background: "rgba(192,192,192,0.1)",
                         overflow: "hidden",
                         position: "relative",
                         boxShadow: "0 0 18px rgba(192,192,192,0.35)",
                       }}>
                         {(() => {
                           const artist = artists.find(a => a.name === voteData?.rankings?.this_week?.[1]?.artist_name);
                           return artist?.image ? (
                             <Image src={`/assets/images/artists/${artist.image}`} alt={voteData?.rankings?.this_week?.[1]?.artist_name} fill sizes="84px" style={{ objectFit: "cover" }} />
                           ) : (
                             <span style={{ fontSize: "2rem", color: "#c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>2</span>
                           );
                         })()}
                       </div>
                       <div style={{
                         marginTop: "8px", fontWeight: 700, color: "#e0e0e0",
                         fontSize: "0.82rem", maxWidth: "90px", overflow: "hidden",
                         textOverflow: "ellipsis", whiteSpace: "nowrap",
                       }}>
                         {voteData?.rankings?.this_week?.[1]?.artist_name}
                       </div>
                       <div style={{ fontSize: "0.75rem", color: "#c0c0c0", fontWeight: 600 }}>
                         {voteData?.rankings?.this_week?.[1]?.week_count} ⭐
                       </div>
                       <div style={{ marginTop: "10px", width: "90px", height: "48px", background: "linear-gradient(180deg,#9ca3af,#6b7280)", borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>2</div>
                     </div>
                   </Link>
                 )}

                {/* 1st Place */}
                  {voteData?.rankings?.this_week?.[0] && (
                    <Link href={`/${lang}/artist/${slugify(artistsData.find(a => a.name === voteData?.rankings?.this_week?.[0]?.artist_name)?.name || '')}`} style={{
                     textDecoration: 'none',
                     display: 'inline-block'
                   }}>
                     <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                       <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>👑</div>
                       <div style={{
                         width: "112px", height: "112px",
                         borderRadius: "50%",
                         border: "4px solid #ffd700",
                         background: "rgba(255,215,0,0.1)",
                         overflow: "hidden",
                         position: "relative",
                         boxShadow: "0 0 32px rgba(255,215,0,0.55)",
                       }}>
                         {(() => {
                           const artist = artists.find(a => a.name === voteData?.rankings?.this_week?.[0]?.artist_name);
                           return artist?.image ? (
                             <Image src={`/assets/images/artists/${artist.image}`} alt={voteData?.rankings?.this_week?.[0]?.artist_name} fill sizes="112px" style={{ objectFit: "cover" }} />
                           ) : (
                             <span style={{ fontSize: "2.5rem", color: "#ffd700", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>1</span>
                           );
                         })()}
                       </div>
                       <div style={{
                         marginTop: "8px", fontWeight: 800, color: "#ffd700",
                         fontSize: "0.9rem", maxWidth: "116px", overflow: "hidden",
                         textOverflow: "ellipsis", whiteSpace: "nowrap",
                       }}>
                         {voteData?.rankings?.this_week?.[0]?.artist_name}
                       </div>
                       <div style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: 700 }}>
                         {voteData?.rankings?.this_week?.[0]?.week_count} ⭐
                       </div>
                       <div style={{ marginTop: "10px", width: "116px", height: "68px", background: "linear-gradient(180deg,#ffd700,#d97706)", borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.4rem", color: "#000" }}>1</div>
                     </div>
                   </Link>
                 )}

                {/* 3rd Place */}
                  {voteData?.rankings?.this_week?.[2] && (
                    <Link href={`/${lang}/artist/${slugify(artistsData.find(a => a.name === voteData?.rankings?.this_week?.[2]?.artist_name)?.name || '')}`} style={{
                     textDecoration: 'none',
                     display: 'inline-block'
                   }}>
                     <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                       <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🥉</div>
                       <div style={{
                         width: "76px", height: "76px",
                         borderRadius: "50%",
                         border: "3px solid #cd7f32",
                         background: "rgba(205,127,50,0.1)",
                         overflow: "hidden",
                         position: "relative",
                         boxShadow: "0 0 16px rgba(205,127,50,0.3)",
                       }}>
                         {(() => {
                           const artist = artists.find(a => a.name === voteData?.rankings?.this_week?.[2]?.artist_name);
                           return artist?.image ? (
                             <Image src={`/assets/images/artists/${artist.image}`} alt={voteData?.rankings?.this_week?.[2]?.artist_name} fill sizes="76px" style={{ objectFit: "cover" }} />
                           ) : (
                             <span style={{ fontSize: "1.5rem", color: "#cd7f32", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>3</span>
                           );
                         })()}
                       </div>
                       <div style={{
                         marginTop: "8px", fontWeight: 700, color: "#d4a27a",
                         fontSize: "0.78rem", maxWidth: "82px", overflow: "hidden",
                         textOverflow: "ellipsis", whiteSpace: "nowrap",
                       }}>
                         {voteData?.rankings?.this_week?.[2]?.artist_name}
                       </div>
                       <div style={{ fontSize: "0.72rem", color: "#cd7f32", fontWeight: 600 }}>
                         {voteData?.rankings?.this_week?.[2]?.week_count} ⭐
                       </div>
                       <div style={{ marginTop: "10px", width: "82px", height: "32px", background: "linear-gradient(180deg,#cd7f32,#a05a20)", borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", color: "#fff" }}>3</div>
                     </div>
                   </Link>
                 )}
              </div>

              {/* Rankings List */}
              <h4 style={{ 
                fontSize: "1rem", 
                fontWeight: 600, 
                marginBottom: "16px",
                color: "var(--text-primary)"
              }}>
                {t.fullRanking}
              </h4>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "12px"
              }}>
                 {voteData?.rankings?.this_week?.slice(0, 15).map((entry: any, index: number) => {
                   const artistObj = artists.find(a => a.name === entry.artist_name);
                   const medalColor = index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : index === 2 ? "#cd7f32" : "rgba(255,255,255,0.15)";
                   return (
                     <Link key={entry.artist_id} href={`/${lang}/artist/${slugify(entry.artist_name)}`} style={{ textDecoration: "none" }}>
                       <div style={{
                         padding: "10px 14px",
                         borderRadius: "12px",
                         background: index < 3 ? "rgba(255,215,0,0.10)" : "rgba(20,20,38,0.65)",
                         border: `1px solid ${index < 3 ? "rgba(255,215,0,0.25)" : "rgba(255,255,255,0.10)"}`,
                         backdropFilter: "blur(8px)",
                         display: "flex",
                         alignItems: "center",
                         gap: "10px",
                         transition: "background 0.2s",
                       }}>
                         <div style={{
                           width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                           background: medalColor,
                           display: "flex", alignItems: "center", justifyContent: "center",
                           fontWeight: 800, fontSize: "0.78rem",
                           color: index < 3 ? "#000" : "rgba(255,255,255,0.6)",
                         }}>
                           {index + 1}
                         </div>
                         {artistObj?.image && (
                           <div style={{ width: "36px", height: "44px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                             <Image src={`/assets/images/artists/${artistObj.image}`} alt={entry.artist_name} fill sizes="36px" style={{ objectFit: "cover" }} />
                           </div>
                         )}
                         <div style={{ flex: 1, minWidth: 0 }}>
                           <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                             {entry.artist_name}
                           </div>
                           {entry.rank && (
                             <div style={{ fontSize: "0.68rem", color: rankColors[entry.rank] || "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                               {entry.rank}
                             </div>
                           )}
                         </div>
                         <div style={{ fontWeight: 700, color: index < 3 ? "#ffd700" : "rgba(255,255,255,0.5)", fontSize: "0.9rem", flexShrink: 0 }}>
                           {entry.week_count} ⭐
                         </div>
                       </div>
                     </Link>
                   );
                 })}
              </div>
            </div>

            {/* All Artists for Voting */}
            <div>
              <h3 style={{ 
                fontSize: "1.1rem", 
                fontWeight: 700, 
                marginBottom: "16px",
                color: "var(--text-primary)"
              }}>
                🎤 {t.voteForArtist}
              </h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "12px"
              }}>
                {artists
                  .sort((a, b) => {
                    const rankOrder: Record<string, number> = { UR: 1, SSR: 2, SR: 3, R: 4, N: 5 };
                    return (rankOrder[a.rank] || 99) - (rankOrder[b.rank] || 99);
                  })
                  .map(artist => {
                    const artistVotes = voteData?.rankings?.all_time?.find((v: any) => v.artist_name === artist.name);
                    const isVoting = votingArtist === artist.name;
                    const isDisabled = votedToday || isVoting;
                    
                    return (
                      <div key={artist.id} style={{
                        textAlign: "center",
                        padding: "12px 8px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(20,20,38,0.72)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.2s",
                      }}>
                        {/* Image + name → navigates to artist profile */}
                        <Link href={`/${lang}/artist/${slugify(artist.name)}`} style={{ textDecoration: 'none', display: 'block' }}>
                          <div style={{
                            width: "70px",
                            height: "85px",
                            margin: "0 auto 8px",
                            borderRadius: "var(--radius-sm)",
                            border: `2px solid ${rankColors[artist.rank]}`,
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                          }}>
                            {artist.image ? (
                              <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="70px" style={{ objectFit: "cover" }} />
                            ) : (
                              <span style={{ fontSize: "1.75rem", fontWeight: 800, color: rankColors[artist.rank] }}>
                                {artist.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginBottom: "4px"
                          }}>
                            {artist.name}
                          </div>
                        </Link>
                        {/* Vote button — separate from the link */}
                        <button
                          aria-label={`Vote for ${artist.name}`}
                          onClick={() => { !isDisabled && handleVote(artist.name); }}
                          disabled={isDisabled}
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            borderRadius: "var(--radius-sm)",
                            border: "none",
                            background: isVoting
                              ? "linear-gradient(135deg, #a78bfa, #8b5cf6)"
                              : isDisabled
                              ? "rgba(148, 163, 184, 0.3)"
                              : "linear-gradient(135deg, var(--primary), #ff80ab)",
                            color: "#fff",
                            cursor: isDisabled ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          {isVoting ? "..." : isDisabled ? "✓" : "❤️ Vote"}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
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
