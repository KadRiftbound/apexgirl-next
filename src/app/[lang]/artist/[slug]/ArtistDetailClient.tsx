'use client';

import artistsData from '@/lib/data/artists.json';
import Link from 'next/link';
import Image from 'next/image';
import './artist.css';

const t_map: Record<string, any> = {
  fr: {
    notFound: "Artiste non trouvé", backToList: "Retour à la liste",
    position: "Position", group: "Groupe", genre: "Genre",
    specialty: "Spécialité", build: "Build", rank: "Rang",
    tier: "Tier", season: "Saison", singStat: "Stat Chant",
    danceStat: "Stat Danse", total: "Total", skills: "Compétences",
    skillCategories: "Catégories de compétences",
    dps: "DPS", offensive: "Offensif", hp: "HP",
    defense: "Défense", speed: "Vitesse", none: "—",
    backToArtists: "Artistes", viewTierList: "Tier List →",
    sameGenre: "Même genre", sameSpecialty: "Même spécialité",
    relatedGuides: "Guides recommandés", noSkills: "Aucune compétence",
    thoughts: "Recommandation", statsSection: "Statistiques",
    skillsSection: "Compétences & Build",
    acquisition: "Accès", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  en: {
    notFound: "Artist not found", backToList: "Back to list",
    position: "Position", group: "Group", genre: "Genre",
    specialty: "Specialty", build: "Build", rank: "Rank",
    tier: "Tier", season: "Season", singStat: "Sing Stat",
    danceStat: "Dance Stat", total: "Total", skills: "Skills",
    skillCategories: "Skill Categories",
    dps: "DPS", offensive: "Offensive", hp: "HP",
    defense: "Defense", speed: "Speed", none: "—",
    backToArtists: "Artists", viewTierList: "Tier List →",
    sameGenre: "Same genre", sameSpecialty: "Same specialty",
    relatedGuides: "Recommended guides", noSkills: "No skills listed",
    thoughts: "Recommendation", statsSection: "Statistics",
    skillsSection: "Skills & Build",
    acquisition: "Access", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  it: {
    notFound: "Artista non trovato", backToList: "Torna alla lista",
    position: "Posizione", group: "Gruppo", genre: "Genere",
    specialty: "Specialità", build: "Build", rank: "Rango",
    tier: "Tier", season: "Stagione", singStat: "Stat Canto",
    danceStat: "Stat Danza", total: "Totale", skills: "Abilità",
    skillCategories: "Categorie abilità",
    dps: "DPS", offensive: "Offensivo", hp: "HP",
    defense: "Difesa", speed: "Velocità", none: "—",
    backToArtists: "Artisti", viewTierList: "Tier List →",
    sameGenre: "Stesso genere", sameSpecialty: "Stessa specialità",
    relatedGuides: "Guide consigliate", noSkills: "Nessuna abilità",
    thoughts: "Raccomandazione", statsSection: "Statistiche",
    skillsSection: "Abilità & Build",
    acquisition: "Accesso", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  es: {
    notFound: "Artista no encontrado", backToList: "Volver a la lista",
    position: "Posición", group: "Grupo", genre: "Género",
    specialty: "Especialidad", build: "Build", rank: "Rango",
    tier: "Tier", season: "Temporada", singStat: "Stat Canto",
    danceStat: "Stat Baile", total: "Total", skills: "Habilidades",
    skillCategories: "Categorías habilidades",
    dps: "DPS", offensive: "Ofensivo", hp: "HP",
    defense: "Defensa", speed: "Velocidad", none: "—",
    backToArtists: "Artistas", viewTierList: "Tier List →",
    sameGenre: "Mismo género", sameSpecialty: "Misma especialidad",
    relatedGuides: "Guías recomendadas", noSkills: "Sin habilidades",
    thoughts: "Recomendación", statsSection: "Estadísticas",
    skillsSection: "Habilidades & Build",
    acquisition: "Acceso", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  pt: {
    notFound: "Artista não encontrado", backToList: "Voltar à lista",
    position: "Posição", group: "Grupo", genre: "Gênero",
    specialty: "Especialidade", build: "Build", rank: "Rank",
    tier: "Tier", season: "Temporada", singStat: "Stat Canto",
    danceStat: "Stat Dança", total: "Total", skills: "Habilidades",
    skillCategories: "Categorias habilidades",
    dps: "DPS", offensive: "Ofensivo", hp: "HP",
    defense: "Defesa", speed: "Velocidade", none: "—",
    backToArtists: "Artistas", viewTierList: "Tier List →",
    sameGenre: "Mesmo gênero", sameSpecialty: "Mesma especialidade",
    relatedGuides: "Guias recomendados", noSkills: "Sem habilidades",
    thoughts: "Recomendação", statsSection: "Estatísticas",
    skillsSection: "Habilidades & Build",
    acquisition: "Acesso", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  pl: {
    notFound: "Artysta nie znaleziony", backToList: "Wróć do listy",
    position: "Pozycja", group: "Grupa", genre: "Gatunek",
    specialty: "Specjalność", build: "Build", rank: "Ranga",
    tier: "Tier", season: "Sezon", singStat: "Stat Śpiewu",
    danceStat: "Stat Tańca", total: "Suma", skills: "Umiejętności",
    skillCategories: "Kategorie umiejętności",
    dps: "DPS", offensive: "Ofensywa", hp: "HP",
    defense: "Obrona", speed: "Szybkość", none: "—",
    backToArtists: "Artyści", viewTierList: "Tier List →",
    sameGenre: "Ten sam gatunek", sameSpecialty: "Ta sama specjalność",
    relatedGuides: "Polecane poradniki", noSkills: "Brak umiejętności",
    thoughts: "Rekomendacja", statsSection: "Statystyki",
    skillsSection: "Umiejętności & Build",
    acquisition: "Dostęp", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  id: {
    notFound: "Artis tidak ditemukan", backToList: "Kembali ke daftar",
    position: "Posisi", group: "Grup", genre: "Genre",
    specialty: "Spesialitas", build: "Build", rank: "Rank",
    tier: "Tier", season: "Musim", singStat: "Stat Nyanyi",
    danceStat: "Stat Dance", total: "Total", skills: "Skill",
    skillCategories: "Kategori Skill",
    dps: "DPS", offensive: "Offensif", hp: "HP",
    defense: "Defensa", speed: "Kecepatan", none: "—",
    backToArtists: "Artis", viewTierList: "Tier List →",
    sameGenre: "Genre sama", sameSpecialty: "Spesialitas sama",
    relatedGuides: "Panduan yang disarankan", noSkills: "Tidak ada skill",
    thoughts: "Rekomendasi", statsSection: "Statistik",
    skillsSection: "Skill & Build",
    acquisition: "Akses", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
  ru: {
    notFound: "Артист не найден", backToList: "Вернуться к списку",
    position: "Позиция", group: "Группа", genre: "Жанр",
    specialty: "Специализация", build: "Билд", rank: "Ранг",
    tier: "Тиер", season: "Сезон", singStat: "Стат Пения",
    danceStat: "Стат Танцев", total: "Всего", skills: "Навыки",
    skillCategories: "Категории навыков",
    dps: "DPS", offensive: "Атака", hp: "HP",
    defense: "Защита", speed: "Скорость", none: "—",
    backToArtists: "Артисты", viewTierList: "Tier List →",
    sameGenre: "Тот же жанр", sameSpecialty: "Та же специализация",
    relatedGuides: "Рекомендуемые гайды", noSkills: "Нет навыков",
    thoughts: "Рекомендация", statsSection: "Статистика",
    skillsSection: "Навыки & Билд",
    acquisition: "Доступ", acqF2p: "F2P", acqLow: "Low spender", acqMid: "Mid spender", acqWhale: "Whale",
  },
};

type Artist = {
  id: number; name: string; group: string; rank: string;
  position: string; genre: string; skills?: string[];
  description?: string; thoughts?: string; build?: string;
  photos?: string; image?: string;
  skillCategories?: { dps?: string[]; offensive?: string[]; hp?: string[]; defense?: string[]; speed?: string[]; };
  calculatedTier?: string; specialty?: string;
  acquisitionTier?: string;
  singStat?: number; danceStat?: number;
};

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const specialtyGuides: Record<string, string[]> = {
  'Augmentation dommage': ['guide-des-equipements', 'guide-construction-d-equipe-debut-de-jeu'],
  'Dommage réduction':    ['guide-des-equipements', 'guide-construction-d-equipe-debut-de-jeu'],
  'Solo car':             ['guide-des-equipements'],
  'Mixte':                ['guide-construction-d-equipe-debut-de-jeu', 'guide-des-equipements'],
  'HQ Defense':           ['guide-des-batiments-de-la-ville'],
  'Rassemblement':        ['type-special'],
  'Vitesse de conduite':  ['guide-des-equipements'],
  'Économie':             ['guide-du-group-shop'],
};

const guidesMeta: Record<string, { icon: string; label: Record<string, string>; color: string }> = {
  'guide-des-equipements': { icon: '💍', color: '#f472b6', label: { fr: 'Guide Équipement', en: 'Equipment Guide', it: 'Guida Equipaggiamento', es: 'Guía Equipamiento', pt: 'Guia Equipamento', pl: 'Poradnik Wyposażenia', id: 'Panduan Peralatan', ru: 'Гайд по снаряжению', de: 'Ausrüstungsleitfaden' } },
  'guide-construction-d-equipe-debut-de-jeu': { icon: '👥', color: '#22d3ee', label: { fr: 'Guide Construction Équipe', en: 'Early Game Team Building', it: 'Guida Costruzione Squadra', es: 'Guía Construcción Equipo', pt: 'Guia Construção Time', pl: 'Przewodnik Konstrukcja Drużyny', id: 'Panduan Konstruksi Tim', ru: 'Гайд Конструкция Команды', de: 'Teamaufbau Frühspiel' } },
  'guide-des-batiments-de-la-ville': { icon: '🏢', color: '#a855f7', label: { fr: 'Guide Bâtiments', en: 'City Buildings Guide', it: 'Guida Edifici Città', es: 'Guía Edificios Ciudad', pt: 'Guia Edifícios Cidade', pl: 'Przewodnik Budynki Miasta', id: 'Panduan Bangunan Kota', ru: 'Гайд Городские Здания', de: 'Stadtgebäude Leitfaden' } },
  'type-special': { icon: '🏰', color: '#8b5cf6', label: { fr: 'Gestion Alliance', en: 'Alliance & Server Management', it: 'Gestione Alleanza', es: 'Gestión Alianza', pt: 'Gestão Aliança', pl: 'Zarządzanie Sojuszem', id: 'Manajemen Aliansi', ru: 'Управление альянсом', de: 'Allianz-Verwaltung' } },
  'guide-du-group-shop': { icon: '🛒', color: '#f97316', label: { fr: 'Group Shop', en: 'Group Shop Guide', it: 'Group Shop', es: 'Group Shop', pt: 'Group Shop', pl: 'Group Shop', id: 'Group Shop', ru: 'Group Shop', de: 'Group Shop' } },
};

const rankColors: Record<string, string> = {
  UR: '#fbbf24', 'UR Roma': '#ef4444', 'UR Bali': '#22d3ee',
  SSR: '#a855f7', SR: '#3b82f6', R: '#22c55e',
};

const tierColors: Record<string, { bg: string; text: string }> = {
  'S+': { bg: 'rgba(255,215,0,0.2)', text: '#ffd700' },
  'S':  { bg: 'rgba(255,215,0,0.15)', text: '#ffd700' },
  'A':  { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
  'B':  { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa' },
  'C':  { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' },
  'D':  { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8' },
};

const genreColors: Record<string, string> = {
  Pop: '#ec4899', Rock: '#ef4444', EDM: '#8b5cf6',
  'Hip Hop': '#f59e0b', 'R&B': '#06b6d4',
};

export default function ArtistDetailClient({ lang, slug }: { lang: string; slug: string }) {
  const t = t_map[lang] || t_map.en;
  const artist = artistsData.find((a: Artist) => slugify(a.name) === slug) as Artist | undefined;

  if (!artist) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
        <h2 style={{ color: '#fff', marginBottom: '12px' }}>{t.notFound}</h2>
        <Link href={`/${lang}/teambuilder/`} style={{
          display: 'inline-block', marginTop: '16px', padding: '10px 24px',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 600,
        }}>
          {t.backToList}
        </Link>
      </div>
    );
  }

  const rankColor = rankColors[artist.rank] || '#6b7280';
  const tierData = artist.calculatedTier ? tierColors[artist.calculatedTier] : null;
  const genreColor = genreColors[artist.genre] || '#8b5cf6';
  const acquisitionStyles: Record<string, { label: string; color: string; bg: string }> = {
    f2p: { label: t.acqF2p || 'F2P', color: '#22c55e', bg: 'rgba(34,197,94,0.18)' },
    low: { label: t.acqLow || 'Low spender', color: '#38bdf8', bg: 'rgba(56,189,248,0.18)' },
    mid: { label: t.acqMid || 'Mid spender', color: '#a855f7', bg: 'rgba(168,85,247,0.18)' },
    whale: { label: t.acqWhale || 'Whale', color: '#f59e0b', bg: 'rgba(245,158,11,0.18)' },
  };
  const totalStats = (artist.singStat || 0) + (artist.danceStat || 0);

  const sameGenre = (artistsData as Artist[])
    .filter(a => a.genre === artist.genre && a.id !== artist.id && a.rank !== 'R' && a.rank !== 'SR')
    .slice(0, 5);
  const sameSpecialty = (artistsData as Artist[])
    .filter(a => a.specialty === artist.specialty && a.id !== artist.id)
    .slice(0, 4);

  const relevantGuides = (specialtyGuides[artist.specialty || ''] || ['guide-des-equipements', 'guide-construction-d-equipe-debut-de-jeu']);
  const skillCats = artist.skillCategories;
  const hasSkillCats = skillCats && Object.values(skillCats).some(v => v && v.length > 0);

  return (
    <>
      <div className="ad-wrap" style={{ ["--rank" as string]: rankColor, ["--genre" as string]: genreColor }}>

        {/* ─── HERO ─── */}
        <section className="ad-hero">
          <Link href={`/${lang}/teambuilder/`} className="ad-back">← {t.backToArtists}</Link>
          <div className="ad-hero-row">
            <div className="ad-portrait">
              {artist.image ? (
                <Image src={`/assets/images/artists/${artist.image}`} alt={artist.name} fill sizes="200px" style={{ objectFit: 'cover' }} priority />
              ) : (
                <span className="ad-portrait-letter">{artist.name.charAt(0)}</span>
              )}
            </div>
            <div className="ad-hero-body">
              <div className="ad-pills">
                <span className="ad-pill ad-pill-rank">{artist.rank}</span>
                {artist.calculatedTier && tierData && (
                  <span className="ad-pill" style={{ color: tierData.text, borderColor: `${tierData.text}55`, background: tierData.bg }}>Tier {artist.calculatedTier}</span>
                )}
                <span className="ad-pill ad-pill-genre">{artist.genre}</span>
                <span className="ad-pill">{artist.position}</span>
                {artist.acquisitionTier && acquisitionStyles[artist.acquisitionTier] && (
                  <span className="ad-pill" style={{ color: acquisitionStyles[artist.acquisitionTier].color, borderColor: `${acquisitionStyles[artist.acquisitionTier].color}55`, background: acquisitionStyles[artist.acquisitionTier].bg }}>
                    {t.acquisition} · {acquisitionStyles[artist.acquisitionTier].label}
                  </span>
                )}
              </div>
              <h1 className="ad-title">{artist.name}</h1>
              <dl className="ad-meta">
                {artist.group && artist.group !== 'No Group' && (<><dt>{t.group}</dt><dd>{artist.group}</dd></>)}
                {artist.photos && (<><dt>{t.season}</dt><dd>{artist.photos}</dd></>)}
                {artist.specialty && (<><dt>{t.specialty}</dt><dd className="ad-meta-accent">{artist.specialty}</dd></>)}
              </dl>
            </div>
          </div>
        </section>

        {/* ─── RECOMMENDATION ─── */}
        {artist.thoughts && (
          <section className="ad-panel ad-reco">
            <span className="ad-eyebrow">{t.thoughts}</span>
            <p>{artist.thoughts}</p>
          </section>
        )}

        <div className="ad-grid-2">
          {/* ─── STATS ─── */}
          <section className="ad-panel">
            <span className="ad-eyebrow">{t.statsSection}</span>
            <div className="ad-stats">
              <div className="ad-stat">
                <span className="ad-stat-label">{t.singStat}</span>
                <span className="ad-stat-value">{artist.singStat ? artist.singStat.toLocaleString() : t.none}</span>
              </div>
              <div className="ad-stat">
                <span className="ad-stat-label">{t.danceStat}</span>
                <span className="ad-stat-value">{artist.danceStat ? artist.danceStat.toLocaleString() : t.none}</span>
              </div>
              {totalStats > 0 && (
                <div className="ad-stat ad-stat-wide">
                  <span className="ad-stat-label">{t.total}</span>
                  <span className="ad-stat-value ad-stat-accent">{totalStats.toLocaleString()}</span>
                </div>
              )}
              {artist.calculatedTier && tierData && (
                <div className="ad-stat">
                  <span className="ad-stat-label">{t.tier}</span>
                  <span className="ad-stat-value" style={{ color: tierData.text }}>{artist.calculatedTier}</span>
                </div>
              )}
              <div className="ad-stat">
                <span className="ad-stat-label">{t.rank}</span>
                <span className="ad-stat-value ad-stat-accent">{artist.rank}</span>
              </div>
            </div>
          </section>

          {/* ─── SKILLS ─── */}
          <section className="ad-panel">
            <span className="ad-eyebrow">{t.skillsSection}</span>
            {artist.build && (
              <div className="ad-build">
                <span className="ad-stat-label">{t.build}</span>
                <span>{artist.build}</span>
              </div>
            )}
            {hasSkillCats ? (
              <div className="ad-skills">
                {Object.entries({
                  dps: { label: t.dps, color: '#f87171' },
                  offensive: { label: t.offensive, color: '#fb923c' },
                  hp: { label: t.hp, color: '#4ade80' },
                  defense: { label: t.defense, color: '#60a5fa' },
                  speed: { label: t.speed, color: '#22d3ee' },
                }).map(([key, { label, color }]) => {
                  const vals = skillCats?.[key as keyof typeof skillCats];
                  if (!vals || vals.length === 0) return null;
                  return (
                    <div key={key} className="ad-skill" style={{ ["--c" as string]: color }}>
                      <span className="ad-skill-label">{label}</span>
                      <span className="ad-skill-vals">{vals.join(' · ')}</span>
                    </div>
                  );
                })}
              </div>
            ) : artist.skills && artist.skills.length > 0 ? (
              <div className="ad-skills">
                {artist.skills.map((skill, i) => (
                  <div key={i} className="ad-skill" style={{ ["--c" as string]: rankColor }}>
                    <span className="ad-skill-vals">{skill}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="ad-empty">{t.noSkills}</p>
            )}
          </section>
        </div>

        {/* ─── GUIDES ─── */}
        {relevantGuides.length > 0 && (
          <section className="ad-panel">
            <span className="ad-eyebrow">{t.relatedGuides}</span>
            <div className="ad-chips">
              {relevantGuides.map(guideId => {
                const guide = guidesMeta[guideId];
                if (!guide) return null;
                return (
                  <Link key={guideId} href={`/${lang}/guides/${guideId}/`} className="ad-chip" style={{ ["--c" as string]: guide.color }}>
                    {guide.label[lang] || guide.label.en}
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── RELATED ─── */}
        <div className={`ad-grid-2${sameSpecialty.length === 0 ? " single" : ""}`}>
          {sameSpecialty.length > 0 && (
            <section className="ad-panel">
              <span className="ad-eyebrow">{t.sameSpecialty} · <b>{artist.specialty}</b></span>
              <div className="ad-list">
                {sameSpecialty.map((a: Artist) => <RelatedRow key={a.id} a={a} lang={lang} />)}
              </div>
            </section>
          )}
          {sameGenre.length > 0 && (
            <section className="ad-panel">
              <span className="ad-eyebrow">{t.sameGenre} · <b style={{ color: genreColor }}>{artist.genre}</b></span>
              <div className="ad-list">
                {sameGenre.map((a: Artist) => <RelatedRow key={a.id} a={a} lang={lang} />)}
              </div>
            </section>
          )}
        </div>

        <div className="ad-foot">
          <Link href={`/${lang}/teambuilder/`}>← {t.backToArtists}</Link>
          <a href={`mailto:contact@apexgirlguide.com?subject=${encodeURIComponent(lang === 'fr' ? 'Nouvelle artiste' : 'New artist submission')}%3A%20${encodeURIComponent(artist.name)}`} className="ad-foot-muted">
            {lang === 'fr' ? 'Soumettre une nouvelle artiste' : 'Submit a new artist'}
          </a>
          <Link href={`/${lang}/tierlist/`}>{t.viewTierList.replace(' →', '')} →</Link>
        </div>
      </div>
    </>
  );
}

function RelatedRow({ a, lang }: { a: Artist; lang: string }) {
  const ac = rankColors[a.rank] || '#6b7280';
  return (
    <Link href={`/${lang}/artist/${slugify(a.name)}/`} className="ad-row" style={{ ["--rank" as string]: ac }}>
      <span className="ad-row-img">
        {a.image ? <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="44px" style={{ objectFit: 'cover' }} /> : <span>{a.name.charAt(0)}</span>}
      </span>
      <span className="ad-row-name">{a.name}</span>
      {a.calculatedTier && <span className="ad-row-tier" style={{ color: tierColors[a.calculatedTier]?.text || '#fff' }}>Tier {a.calculatedTier}</span>}
      <span className="ad-row-rank">{a.rank}</span>
    </Link>
  );
}
