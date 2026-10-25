"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import artistsData from "@/lib/data/artists.json";
import { AdBanner } from "@/components/AdSense";
import { slugify } from "@/lib/utils/slugify";
import { skillChips } from "@/lib/utils/skillSummary";
import type { Artist } from "@/lib/types/artist";
import { GenreIcon, GenreBar, genreColors as genreSolid } from "@/components/GenreIcon";
import "./tierlist.css";

const tierDescriptions: Record<string, Record<string, string>> = {
  fr: {
    "S+": "24 % de dégâts au joueur ou plus : le meilleur sort du jeu, en grande quantité.",
    "S": "Dégâts au joueur (20 %), ou une combinaison exceptionnelle comme 80 % d'attaque + réduction de dégâts de skill.",
    "A": "Sans dégâts au joueur, mais deux bons sorts de combat (dégâts de skill, attaque, réductions).",
    "B": "Un bon sort et un moyen, ou un seul vrai sort de combat.",
    "C": "Un seul sort utile en combat, souvent accompagné de fans.",
    "D": "Sorts hors combat (or, vitesse, gardes) ou trop faibles."
  },
  en: {
    "S+": "24% damage to player or more: the best skill in the game, in large amounts.",
    "S": "Damage to player (20%), or an exceptional combo such as 80% basic attack + skill damage reduction.",
    "A": "No damage to player, but two good combat skills (skill damage, basic attack, reductions).",
    "B": "One good skill and an average one, or a single real combat skill.",
    "C": "Only one useful combat skill, often paired with fan capacity.",
    "D": "Non-combat skills (gold, speed, building guards) or too weak."
  },
  id: {
    "S+": "Damage to player 24% atau lebih: skill terbaik di game, dalam jumlah besar.",
    "S": "Damage to player (20%), atau kombinasi luar biasa seperti 80% basic attack + skill damage reduction.",
    "A": "Tanpa damage to player, tapi dua skill tempur yang bagus (skill damage, basic attack, reduksi).",
    "B": "Satu skill bagus dan satu biasa, atau hanya satu skill tempur.",
    "C": "Hanya satu skill tempur yang berguna, sering dengan fan capacity.",
    "D": "Skill non-tempur (gold, kecepatan, penjaga bangunan) atau terlalu lemah."
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
  fr: { all: "Tous", addToTeam: "Ajouter à mon équipe", title: "Tier List", subtitle: "Classement des artistes et votes communautaires", classic: "Classique", vote: "Vote", viewProfile: "Voir le profil", tierListClassic: "Tier List Classique", voteForFavorite: "Votez pour votre favori", voteBanner: "Votez pour votre artiste préféré ! Un seul vote par jour.", voteForArtist: "Votez pour un artiste", alreadyVoted: "Vous avez déjà voté aujourd'hui.", podium: "🏅 Podium — Cette semaine", fullRanking: "📊 Classement complet", artistCount: (n: number) => `${n} artiste${n > 1 ? "s" : ""}`, voteError: "Une erreur est survenue.", voteSuccess: "Votre vote a été comptabilisé !", voteAlreadyVoted: "Vous avez déjà voté aujourd'hui.", allGenres: "Tous les genres", allSpecialties: "Toutes spécialités" },
  en: { all: "All", addToTeam: "Add to my team", title: "Tier List", subtitle: "Artist rankings and community votes", classic: "Classic", vote: "Vote", viewProfile: "View profile", tierListClassic: "Tier List Classic", voteForFavorite: "Vote for your favorite", voteBanner: "Vote for your favorite artist! One vote per day.", voteForArtist: "Vote for an artist", alreadyVoted: "You have already voted today.", podium: "🏅 Podium — This week", fullRanking: "📊 Full ranking", artistCount: (n: number) => `${n} artist${n > 1 ? "s" : ""}`, voteError: "An error occurred.", voteSuccess: "Your vote has been counted!", voteAlreadyVoted: "You have already voted today.", allGenres: "All genres", allSpecialties: "All specialties" },
  de: { all: "Alle", addToTeam: "Zu meinem Team", title: "Tier List", subtitle: "Künstler-Rankings und Community-Stimmen", classic: "Klassisch", vote: "Abstimmen", viewProfile: "Profil ansehen", tierListClassic: "Tier List Klassisch", voteForFavorite: "Stimme für deinen Favoriten", voteBanner: "Stimme für deinen Lieblingskünstler! Eine Stimme pro Tag.", voteForArtist: "Für einen Künstler stimmen", alreadyVoted: "Du hast heute schon abgestimmt.", podium: "🏅 Podium — Diese Woche", fullRanking: "📊 Vollständiges Ranking", artistCount: (n: number) => `${n} Künstler${n > 1 ? "nen" : ""}`, voteError: "Ein Fehler ist aufgetreten.", voteSuccess: "Deine Stimme wurde gezählt!", voteAlreadyVoted: "Du hast heute schon abgestimmt.", allGenres: "Alle Genres", allSpecialties: "Alle Spezialitäten" },
  it: { all: "Tutti", addToTeam: "Aggiungi alla mia squadra", title: "Tier List", subtitle: "Classifiche artisti e voti della community", classic: "Classico", vote: "Vota", viewProfile: "Vedi profilo", tierListClassic: "Tier List Classico", voteForFavorite: "Vota il tuo preferito", voteBanner: "Vota il tuo artista preferito! Un voto al giorno.", voteForArtist: "Vota per un artista", alreadyVoted: "Hai già votato oggi.", podium: "🏅 Podio — Questa settimana", fullRanking: "📊 Classifica completa", artistCount: (n: number) => `${n} artista/i`, voteError: "Si è verificato un errore.", voteSuccess: "Il tuo voto è stato conteggiato!", voteAlreadyVoted: "Hai già votato oggi.", allGenres: "Tutti i generi", allSpecialties: "Tutte le specialità" },
  es: { all: "Todos", addToTeam: "Añadir a mi equipo", title: "Tier List", subtitle: "Clasificaciones de artistas y votos comunitarios", classic: "Clásico", vote: "Votar", viewProfile: "Ver perfil", tierListClassic: "Tier List Clásico", voteForFavorite: "Vota por tu favorito", voteBanner: "¡Vota por tu artista favorito! Un voto por día.", voteForArtist: "Vota por un artista", alreadyVoted: "Ya has votado hoy.", podium: "🏅 Podio — Esta semana", fullRanking: "📊 Clasificación completa", artistCount: (n: number) => `${n} artista${n > 1 ? "s" : ""}`, voteError: "Se produjo un error.", voteSuccess: "¡Tu voto ha sido contabilizado!", voteAlreadyVoted: "Ya has votado hoy.", allGenres: "Todos los géneros", allSpecialties: "Todas las especialidades" },
  pt: { all: "Todos", addToTeam: "Adicionar ao meu time", title: "Tier List", subtitle: "Ranking de artistas e votos da comunidade", classic: "Clássico", vote: "Votar", viewProfile: "Ver perfil", tierListClassic: "Tier List Clássico", voteForFavorite: "Vote no seu favorito", voteBanner: "Vote na sua artista favorita! Um voto por dia.", voteForArtist: "Vote em um artista", alreadyVoted: "Você já votou hoje.", podium: "🏅 Pódio — Esta semana", fullRanking: "📊 Classificação completa", artistCount: (n: number) => `${n} artista${n > 1 ? "s" : ""}`, voteError: "Ocorreu um erro.", voteSuccess: "Seu voto foi contabilizado!", voteAlreadyVoted: "Você já votou hoje.", allGenres: "Todos os gêneros", allSpecialties: "Todas as especialidades" },
  pl: { all: "Wszystko", addToTeam: "Dodaj do drużyny", title: "Tier List", subtitle: "Rankingi artystów i głosy społeczności", classic: "Klasyczny", vote: "Głosuj", viewProfile: "Zobacz profil", tierListClassic: "Tier List Klasyczna", voteForFavorite: "Głosuj na swojego faworyta", voteBanner: "Głosuj na swojego ulubionego artystę! Jeden głos dziennie.", voteForArtist: "Głosuj na artystę", alreadyVoted: "Oddałeś już głos.", podium: "🏅 Podium — Ten tydzień", fullRanking: "📊 Pełny ranking", artistCount: (n: number) => `${n} artysta/ów`, voteError: "Wystąpił błąd.", voteSuccess: "Twój głos został policzony!", voteAlreadyVoted: "Oddałeś już głos dzisiaj.", allGenres: "Wszystkie gatunki", allSpecialties: "Wszystkie specjalności" },
  id: { all: "Semua", addToTeam: "Tambah ke tim saya", title: "Tier List", subtitle: "Peringkat artis dan suara komunitas", classic: "Klasik", vote: "Vote", viewProfile: "Lihat profil", tierListClassic: "Tier List Klasik", voteForFavorite: "Pilih favoritmu", voteBanner: "Pilih artis favoritmu! Satu suara per hari.", voteForArtist: "Pilih seorang artis", alreadyVoted: "Anda sudah memilih hari ini.", podium: "🏅 Podium — Minggu ini", fullRanking: "📊 Peringkat lengkap", artistCount: (n: number) => `${n} artis`, voteError: "Terjadi kesalahan.", voteSuccess: "Suara Anda telah dihitung!", voteAlreadyVoted: "Anda sudah memilih hari ini.", allGenres: "Semua genre", allSpecialties: "Semua spesialisasi" },
  ru: { all: "Все", addToTeam: "В мою команду", title: "Tier List", subtitle: "Рейтинги артистов и голоса сообщества", classic: "Классика", vote: "Голосовать", viewProfile: "Посмотреть профиль", tierListClassic: "Tier List Классика", voteForFavorite: "Голосуйте за фаворита", voteBanner: "Голосуйте за любимого артиста! Один голос в день.", voteForArtist: "Голосовать за артиста", alreadyVoted: "Вы уже голосовали сегодня.", podium: "🏅 Подиум — Эта неделя", fullRanking: "📊 Полный рейтинг", artistCount: (n: number) => `${n} артист(ов)`, voteError: "Произошла ошибка.", voteSuccess: "Ваш голос учтён!", voteAlreadyVoted: "Вы уже голосовали сегодня.", allGenres: "Все жанры", allSpecialties: "Все специализации" },
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


const getTierDescription = (tier: string, lang: string): string => {
  return tierDescriptions[lang]?.[tier] || tierDescriptions.en[tier] || "";
};

const getEffectiveTier = (artist: any): string => {
  return (artist.calculatedTier || 'D').toUpperCase();
};

function TierListPageInner({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = tierlistTranslations[lang] || tierlistTranslations.en;
  const [filterGenre, setFilterGenre] = useState<string>("");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("");

  // The vote moved to its own page.
  useEffect(() => {
    if (searchParams?.get("tab") === "vote") router.replace(`/${lang}/vote/`);
  }, [searchParams, router, lang]);

  const artists = artistsData as Artist[];
  const tierOrder = ["S+", "S", "A", "B", "C", "D"];

  return (
    <>

      <div className="page" style={{ paddingTop: 0 }}>
        <header className="page-head">
          <span className="eyebrow">TopGirl · ApexGirl</span>
          <h1 className="page-head-title">{t.title}</h1>
        </header>

        <AdBanner />

        <div className="tier-vote-cta">
          <Link href={`/${lang}/vote/`}>♥ {t.voteForFavorite} →</Link>
        </div>

        {/* Classic Tier List */}
        {(
          <div>
            {/* Toolbar: legend + filters */}
            <div className="tier-toolbar">
              <div className="tier-legend" aria-label="Tiers">
                {tierOrder.map(tier => (
                  <a key={tier} href={`#tier-${tier.replace("+", "plus")}`} className="tier-chip" style={{ ["--tier" as string]: tierColors[tier]?.rgb }}>
                    <b>{tier}</b>
                  </a>
                ))}
              </div>
              <GenreBar value={filterGenre} onChange={setFilterGenre} allLabel={t.all || "All"} className="tier-gbar" />
              <div className="tier-filters">
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
                <section key={tier} id={`tier-${tier.replace("+", "plus")}`} className="tier-panel" style={{ ["--tier" as string]: tierColors[tier]?.rgb }}>
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
                      <div key={artist.id} className="artist-tile" style={{ ["--rank" as string]: rankColors[artist.rank] || "#94a3b8" }}>
                        <Link href={`/${lang}/artist/${slugify(artist.name)}/`} className="artist-tile-link">
                          <div className="artist-tile-img">
                            {artist.image ? (
                              <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="120px" style={{ objectFit: "cover" }} />
                            ) : (
                              <span className="artist-tile-letter">{artist.name.charAt(0)}</span>
                            )}
                          </div>
                          <div className="artist-tile-meta">
                            <span className="artist-tile-name">
                              <GenreIcon genre={artist.genre} size={14} style={{ color: genreSolid[artist.genre] || "#fff" }} />
                              {artist.name}
                            </span>
                            <span className="artist-tile-skills">
                              {skillChips(artist.skills, lang).map((c, i) => (
                                <span key={i} className={`skill-chip skill-${c.kind}`}>{c.text}</span>
                              ))}
                            </span>
                          </div>
                        </Link>
                        <Link
                          href={`/${lang}/teambuilder/?add=${artist.id}`}
                          className="artist-tile-add"
                          title={`${t.addToTeam || "Add to my team"} · ${artist.name}`}
                          aria-label={`${t.addToTeam || "Add to my team"} · ${artist.name}`}
                        >+</Link>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

      </div>

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
