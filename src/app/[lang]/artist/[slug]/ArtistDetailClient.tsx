'use client';

import artistsData from '@/lib/data/artists.json';
import Link from 'next/link';
import Image from 'next/image';

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

const positionIcons: Record<string, string> = {
  Center: '🎤', Vocalist: '🎵', Dancer: '💃', Singer: '🎶', Visual: '✨',
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
  const posIcon = positionIcons[artist.position] || '🎵';
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
      {/* ─── HERO ─── */}
      <div style={{
        background: `linear-gradient(180deg, ${rankColor}18 0%, rgba(15,15,26,0) 100%)`,
        borderBottom: `1px solid ${rankColor}33`,
        padding: '32px 0 0',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px 20px', background: 'rgba(30,30,50,0.6)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <Link href={`/${lang}/teambuilder/`} style={{
            color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px',
            marginBottom: '20px',
          }}>
            ← {t.backToArtists}
          </Link>

          <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{
              width: '160px', height: '200px', flexShrink: 0,
              borderRadius: '16px',
              border: `3px solid ${rankColor}`,
              overflow: 'hidden',
              background: artist.image ? 'transparent' : `linear-gradient(135deg, ${rankColor}33, rgba(30,30,50,1))`,
              boxShadow: `0 16px 48px ${rankColor}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              {artist.image ? (
                <Image
                  src={`/assets/images/artists/${artist.image}`}
                  alt={artist.name}
                  fill
                  sizes="160px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <span style={{ fontSize: '4rem', fontWeight: 800, color: rankColor }}>
                  {artist.name.charAt(0)}
                </span>
              )}
            </div>

            <div style={{ flex: 1, paddingBottom: '20px', minWidth: '200px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', background: rankColor, color: '#000' }}>
                  {artist.rank}
                </span>
                {artist.calculatedTier && tierData && (
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', background: tierData.bg, color: tierData.text, border: `1px solid ${tierData.text}44` }}>
                    Tier {artist.calculatedTier}
                  </span>
                )}
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: `${genreColor}22`, color: genreColor, border: `1px solid ${genreColor}44` }}>
                  {artist.genre}
                </span>
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
                  {posIcon} {artist.position}
                </span>
                {artist.acquisitionTier && acquisitionStyles[artist.acquisitionTier] && (
                  <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, background: acquisitionStyles[artist.acquisitionTier].bg, color: acquisitionStyles[artist.acquisitionTier].color, border: `1px solid ${acquisitionStyles[artist.acquisitionTier].color}66` }}>
                    💳 {t.acquisition}: {acquisitionStyles[artist.acquisitionTier].label}
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 8px', background: `linear-gradient(135deg, ${rankColor}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {artist.name}
              </h1>

              {artist.photos && (
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '8px' }}>
                  📅 {t.season} : <span style={{ color: 'rgba(255,255,255,0.65)' }}>{artist.photos}</span>
                </div>
              )}
              {artist.specialty && (
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  ⚡ {t.specialty} : <span style={{ color: rankColor, fontWeight: 600 }}>{artist.specialty}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 20px 0' }}>

        {/* Description & Recommendation */}
        {(artist.description || artist.thoughts) && (
          <div style={{ background: 'rgba(15,15,35,0.55)', borderRadius: '16px', border: `1px solid ${rankColor}22`, padding: '20px', marginBottom: '14px', backdropFilter: 'blur(10px)' }}>
            {artist.description && (
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 12px' }}>
                {artist.description}
              </p>
            )}
            {artist.thoughts && (
              <div style={{ borderTop: artist.description ? `1px solid ${rankColor}22` : 'none', paddingTop: artist.description ? '12px' : 0 }}>
                <div style={{ color: rankColor, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  💡 {t.thoughts}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {artist.thoughts}
                </p>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }} className="artist-top-row">

          {/* Stats Panel */}
          <div style={{ background: 'rgba(15,15,35,0.55)', borderRadius: '16px', border: `1px solid ${rankColor}33`, padding: '20px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ margin: '0 0 16px', color: rankColor, fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              📊 {t.statsSection}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'rgba(251,191,36,0.08)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(251,191,36,0.2)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '4px' }}>🎵 {t.singStat}</div>
                <div style={{ color: '#fbbf24', fontSize: '1.4rem', fontWeight: 800 }}>{artist.singStat ? artist.singStat.toLocaleString() : t.none}</div>
              </div>
              <div style={{ background: 'rgba(251,191,36,0.08)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(251,191,36,0.2)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '4px' }}>💃 {t.danceStat}</div>
                <div style={{ color: '#fbbf24', fontSize: '1.4rem', fontWeight: 800 }}>{artist.danceStat ? artist.danceStat.toLocaleString() : t.none}</div>
              </div>
              {totalStats > 0 && (
                <div style={{ gridColumn: '1/-1', background: `${rankColor}11`, borderRadius: '10px', padding: '12px', border: `1px solid ${rankColor}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>⚡ {t.total}</span>
                  <span style={{ color: rankColor, fontSize: '1.3rem', fontWeight: 800 }}>{totalStats.toLocaleString()}</span>
                </div>
              )}
              {artist.calculatedTier && tierData && (
                <div style={{ background: tierData.bg, borderRadius: '10px', padding: '12px', border: `1px solid ${tierData.text}33` }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '4px' }}>🏅 {t.tier}</div>
                  <div style={{ color: tierData.text, fontSize: '1.4rem', fontWeight: 800 }}>{artist.calculatedTier}</div>
                </div>
              )}
              <div style={{ background: `${rankColor}11`, borderRadius: '10px', padding: '12px', border: `1px solid ${rankColor}33` }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '4px' }}>⭐ {t.rank}</div>
                <div style={{ color: rankColor, fontSize: '1.1rem', fontWeight: 800 }}>{artist.rank}</div>
              </div>
            </div>
          </div>

          {/* Build & Skills Panel */}
          <div style={{ background: 'rgba(15,15,35,0.55)', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.3)', padding: '20px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ margin: '0 0 16px', color: '#a855f7', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              🛠️ {t.skillsSection}
            </h2>
            {artist.build && (
              <div style={{ marginBottom: '14px', padding: '10px 14px', background: 'rgba(139,92,246,0.1)', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.25)' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.build}</div>
                <div style={{ color: '#c084fc', fontWeight: 600, fontSize: '0.92rem' }}>{artist.build}</div>
              </div>
            )}
            {hasSkillCats && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries({
                  dps: { label: t.dps, color: '#ef4444', icon: '⚔️' },
                  offensive: { label: t.offensive, color: '#f97316', icon: '🔥' },
                  hp: { label: t.hp, color: '#22c55e', icon: '❤️' },
                  defense: { label: t.defense, color: '#3b82f6', icon: '🛡️' },
                  speed: { label: t.speed, color: '#22d3ee', icon: '⚡' },
                }).map(([key, { label, color, icon }]) => {
                  const vals = skillCats?.[key as keyof typeof skillCats];
                  if (!vals || vals.length === 0) return null;
                  return (
                    <div key={key} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '8px 10px', background: `${color}0d`, borderRadius: '8px', border: `1px solid ${color}22` }}>
                      <span style={{ flexShrink: 0, fontSize: '0.8rem' }}>{icon}</span>
                      <div>
                        <div style={{ color, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{label}</div>
                        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', lineHeight: 1.4 }}>{vals.join(' · ')}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {!hasSkillCats && artist.skills && artist.skills.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {artist.skills.map((skill, i) => (
                  <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', borderLeft: `3px solid ${rankColor}`, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Guides recommandés */}
        {relevantGuides.length > 0 && (
          <div style={{ background: 'rgba(20,20,40,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', padding: '18px 20px', marginBottom: '14px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ margin: '0 0 14px', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              📖 {t.relatedGuides}
            </h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {relevantGuides.map(guideId => {
                const guide = guidesMeta[guideId];
                if (!guide) return null;
                return (
                  <Link key={guideId} href={`/${lang}/guides/${guideId}/`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', textDecoration: 'none', background: `${guide.color}11`, border: `1px solid ${guide.color}33`, color: guide.color, fontWeight: 600, fontSize: '0.88rem' }}>
                    <span>{guide.icon}</span>
                    <span>{guide.label[lang] || guide.label.en}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Artistes liés */}
        <div style={{ display: 'grid', gridTemplateColumns: sameSpecialty.length > 0 ? '1fr 1fr' : '1fr', gap: '14px', marginBottom: '14px' }} className="artist-related-row">
          {sameSpecialty.length > 0 && (
            <div style={{ background: 'rgba(15,15,35,0.55)', borderRadius: '16px', border: `1px solid ${rankColor}22`, padding: '18px', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ {t.sameSpecialty}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sameSpecialty.map((a: Artist) => {
                  const ac = rankColors[a.rank] || '#6b7280';
                  return (
                    <Link key={a.id} href={`/${lang}/artist/${slugify(a.name)}/`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: `1px solid ${ac}22` }}>
                      <div style={{ width: '44px', height: '54px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: `${ac}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {a.image ? <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="44px" style={{ objectFit: 'cover' }} /> : <span style={{ fontSize: '0.9rem', fontWeight: 700, color: ac }}>{a.name.charAt(0)}</span>}
                      </div>
                      <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.88rem', flex: 1 }}>{a.name}</span>
                      <span style={{ color: ac, fontSize: '0.75rem', fontWeight: 700 }}>{a.rank}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {sameGenre.length > 0 && (
            <div style={{ background: 'rgba(15,15,35,0.55)', borderRadius: '16px', border: `1px solid ${genreColor}22`, padding: '18px', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>🎵 {t.sameGenre} · <span style={{ color: genreColor }}>{artist.genre}</span></h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sameGenre.map((a: Artist) => {
                  const ac = rankColors[a.rank] || '#6b7280';
                  return (
                    <Link key={a.id} href={`/${lang}/artist/${slugify(a.name)}/`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: `1px solid ${ac}22` }}>
                      <div style={{ width: '44px', height: '54px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: `${ac}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {a.image ? <Image src={`/assets/images/artists/${a.image}`} alt={a.name} fill sizes="44px" style={{ objectFit: 'cover' }} /> : <span style={{ fontSize: '0.9rem', fontWeight: 700, color: ac }}>{a.name.charAt(0)}</span>}
                      </div>
                      <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.88rem', flex: 1 }}>{a.name}</span>
                      <span style={{ color: ac, fontSize: '0.75rem', fontWeight: 700 }}>{a.rank}</span>
                      {a.calculatedTier && <span style={{ color: tierColors[a.calculatedTier]?.text || '#fff', fontSize: '0.7rem' }}>T{a.calculatedTier}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
          <Link href={`/${lang}/teambuilder/`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}>← {t.backToArtists}</Link>
          <Link href={`/${lang}/tierlist/`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none' }}>{t.viewTierList}</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .artist-top-row { grid-template-columns: 1fr !important; }
          .artist-related-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
