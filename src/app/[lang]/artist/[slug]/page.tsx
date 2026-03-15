'use client';

import { useParams, useRouter } from 'next/navigation';
import artistsData from '@/lib/data/artists.json';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const artistTranslations: Record<string, any> = {
  fr: { loading: "Chargement de l'artiste...", notFound: "Artiste non trouvé", notFoundDesc: "L'artiste avec l'ID", notFoundId: "n'existe pas.", backToList: "Retour à la liste des artistes", position: "Position", group: "Groupe", genre: "Genre", specialty: "Spécialité", build: "Build recommandé", rating: "Rating", skills: "Compétences", noSkills: "Aucune compétence listée.", skillCategories: "Catégories de compétences", dps: "DPS", offensive: "Offensive", hp: "HP", defense: "Défense", speed: "Vitesse", none: "Aucune", singStat: "Stat de chant", danceStat: "Stat de danse", photos: "Photos", combinedStats: "Stats combinés", total: "Total", rank: "Rang", tier: "Tier", stats: "Statistiques", backToArtists: "← Retour aux artistes", infoTab: "Informations", skillsTab: "Compétences", statsTab: "Stats", generalInfo: "Informations générales", viewTierList: "Voir la Tier List" },
  en: { loading: "Loading artist...", notFound: "Artist not found", notFoundDesc: "The artist with ID", notFoundId: "does not exist.", backToList: "Back to artist list", position: "Position", group: "Group", genre: "Genre", specialty: "Specialty", build: "Recommended Build", rating: "Rating", skills: "Skills", noSkills: "No skills listed.", skillCategories: "Skill Categories", dps: "DPS", offensive: "Offensive", hp: "HP", defense: "Defense", speed: "Speed", none: "None", singStat: "Sing Stat", danceStat: "Dance Stat", photos: "Photos", combinedStats: "Combined Stats", total: "Total", rank: "Rank", tier: "Tier", stats: "Statistics", backToArtists: "← Back to artists", infoTab: "Information", skillsTab: "Skills", statsTab: "Stats", generalInfo: "General Information", viewTierList: "View Tier List" },
  it: { loading: "Caricamento artista...", notFound: "Artista non trovato", notFoundDesc: "L'artista con ID", notFoundId: "non esiste.", backToList: "Torna alla lista", position: "Posizione", group: "Gruppo", genre: "Genere", specialty: "Specialità", build: "Build consigliato", rating: "Rating", skills: "Abilità", noSkills: "Nessuna abilità elencata.", skillCategories: "Categorie abilità", dps: "DPS", offensive: "Offensivo", hp: "HP", defense: "Difesa", speed: "Velocità", none: "Nessuno", singStat: "Stat Canto", danceStat: "Stat Danza", photos: "Foto", combinedStats: "Stats combinati", total: "Totale", rank: "Rango", tier: "Tier", stats: "Statistiche", backToArtists: "← Torna agli artisti", infoTab: "Informazioni", skillsTab: "Abilità", statsTab: "Stats", generalInfo: "Informazioni generali", viewTierList: "Vedi Tier List" },
  es: { loading: "Cargando artista...", notFound: "Artista no encontrado", notFoundDesc: "El artista con ID", notFoundId: "no existe.", backToList: "Volver a la lista", position: "Posición", group: "Grupo", genre: "Género", specialty: "Especialidad", build: "Build recomendado", rating: "Rating", skills: "Habilidades", noSkills: "Sin habilidades listadas.", skillCategories: "Categorías de habilidades", dps: "DPS", offensive: "Ofensivo", hp: "HP", defense: "Defensa", speed: "Velocidad", none: "Ninguno", singStat: "Stat de Canto", danceStat: "Stat de Baile", photos: "Fotos", combinedStats: "Stats combinados", total: "Total", rank: "Rango", tier: "Tier", stats: "Estadísticas", backToArtists: "← Volver a artistas", infoTab: "Información", skillsTab: "Habilidades", statsTab: "Stats", generalInfo: "Información general", viewTierList: "Ver Tier List" },
  pt: { loading: "Carregando artista...", notFound: "Artista não encontrado", notFoundDesc: "O artista com ID", notFoundId: "não existe.", backToList: "Voltar à lista", position: "Posição", group: "Grupo", genre: "Gênero", specialty: "Especialidade", build: "Build recomendado", rating: "Rating", skills: "Habilidades", noSkills: "Nenhuma habilidade listada.", skillCategories: "Categorias de habilidades", dps: "DPS", offensive: "Ofensivo", hp: "HP", defense: "Defesa", speed: "Velocidade", none: "Nenhum", singStat: "Stat de Canto", danceStat: "Stat de Dança", photos: "Fotos", combinedStats: "Stats combinados", total: "Total", rank: "Patente", tier: "Tier", stats: "Estatísticas", backToArtists: "← Voltar aos artistas", infoTab: "Informação", skillsTab: "Habilidades", statsTab: "Stats", generalInfo: "Informação geral", viewTierList: "Ver Tier List" },
  pl: { loading: "Ładowanie artysty...", notFound: "Artysta nie znaleziony", notFoundDesc: "Artysta o ID", notFoundId: "nie istnieje.", backToList: "Wróć do listy", position: "Pozycja", group: "Grupa", genre: "Gatunek", specialty: "Specjalność", build: "Zalecany build", rating: "Rating", skills: "Umiejętności", noSkills: "Brak umiejętności.", skillCategories: "Kategorie umiejętności", dps: "DPS", offensive: "Ofensywa", hp: "HP", defense: "Obrona", speed: "Szybkość", none: "Brak", singStat: "Stat Śpiewu", danceStat: "Stat Tańca", photos: "Zdjęcia", combinedStats: "Łączne statystyki", total: "Suma", rank: "Ranga", tier: "Tier", stats: "Statystyki", backToArtists: "← Wróć do artystów", infoTab: "Informacje", skillsTab: "Umiejętności", statsTab: "Stats", generalInfo: "Informacje ogólne", viewTierList: "Zobacz Tier List" },
  id: { loading: "Memuat artis...", notFound: "Artis tidak ditemukan", notFoundDesc: "Artis dengan ID", notFoundId: "tidak ada.", backToList: "Kembali ke daftar", position: "Posisi", group: "Grup", genre: "Genre", specialty: "Spesialitas", build: "Build yang disarankan", rating: "Rating", skills: "Skill", noSkills: "Tidak ada skill.", skillCategories: "Kategori Skill", dps: "DPS", offensive: "Offensif", hp: "HP", defense: "Defensa", speed: "Kecepatan", none: "Tidak ada", singStat: "Stat Nyanyi", danceStat: "Stat Dance", photos: "Foto", combinedStats: "Stats gabungan", total: "Total", rank: "Rank", tier: "Tier", stats: "Statistik", backToArtists: "← Kembali ke artis", infoTab: "Informasi", skillsTab: "Skill", statsTab: "Stats", generalInfo: "Informasi umum", viewTierList: "Lihat Tier List" },
  ru: { loading: "Загрузка артиста...", notFound: "Артист не найден", notFoundDesc: "Артист с ID", notFoundId: "не существует.", backToList: "Вернуться к списку", position: "Позиция", group: "Группа", genre: "Жанр", specialty: "Специализация", build: "Рекомендуемый билд", rating: "Рейтинг", skills: "Навыки", noSkills: "Нет навыков.", skillCategories: "Категории навыков", dps: "DPS", offensive: "Атака", hp: "HP", defense: "Защита", speed: "Скорость", none: "Нет", singStat: "Стат Пения", danceStat: "Стат Танцев", photos: "Фото", combinedStats: "Общие статы", total: "Всего", rank: "Ранг", tier: "Тиер", stats: "Статистика", backToArtists: "← Вернуться к артистам", infoTab: "Информация", skillsTab: "Навыки", statsTab: "Статы", generalInfo: "Общая информация", viewTierList: "Смотреть Tier List" },
};

type Artist = {
  id: number;
  name: string;
  group: string;
  rank: string;
  position: string;
  genre: string;
  skills?: string[];
  description?: string;
  rating?: string;
  thoughts?: string;
  build?: string;
  photos?: string;
  image?: string;
  skillCategories?: {
    dps?: string[];
    offensive?: string[];
    hp?: string[];
    defense?: string[];
    speed?: string[];
  };
  calculatedTier?: string;
  specialty?: string;
  singStat?: number;
  danceStat?: number;
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const unslugify = (slug: string) => {
  const artist = artistsData.find((a: Artist) => slugify(a.name) === slug);
  return artist?.name || slug;
};

export default function ArtistDetailPage() {
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const router = useRouter();

  // Handle missing slug parameter
  if (!slug) {
    router.push(`/${lang}/artists`);
    return null;
  }

  const artistName = unslugify(slug);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const t = artistTranslations[lang] || artistTranslations.en;

  useEffect(() => {
    const artist = artistsData.find((a: Artist) => slugify(a.name) === slug);
    setArtist(artist ?? null);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header') as HTMLElement;
      if (header) {
        if (window.scrollY > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-skeleton" style={{ height: '200px' }} />
        <p className="text-muted" style={{ marginTop: '16px' }}>
          {t.loading}
        </p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 className="section-title">{t.notFound}</h2>
        <p className="text-muted">
          {t.notFoundDesc} "{artistName}" {t.notFoundId}
        </p>
        <Link href={`/${lang}/artists`} style={{
          display: 'inline-block',
          marginTop: '24px',
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: 'white',
          borderRadius: '6px'
        }}>
          {t.backToList}
        </Link>
      </div>
    );
  }

  const rankColors: Record<string, string> = {
    UR: '#fbbf24',
    'UR Roma': '#ef4444',
    'UR Bali': '#ef4444',
    SSR: '#a855f7',
    SR: '#3b82f6',
    R: '#22c55e'
  };

  return (
    <>
      <Head>
        <title>{artist.name} - TopGirl</title>
        <meta name="description" content={`Découvrez tout sur l'artiste ${artist.name} de TopGirl`} />
      </Head>

      <div className="container" style={{ padding: '40px 20px', maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ 
            width: '200px', 
            height: '250px', 
            borderRadius: 'var(--radius-lg)', 
            border: `2px solid ${rankColors[artist.rank] || '#fff'}`,
            overflow: 'hidden',
            background: artist.image ? 
              `url('/assets/images/artists/${artist.image}') center/cover no-repeat` : 
              `linear-gradient(135deg, ${rankColors[artist.rank] || '#6b7280'}33, rgba(30,30,50,1))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {artist.image ? null : (
              <span style={{ 
                fontSize: '4rem', 
                fontWeight: 800, 
                color: rankColors[artist.rank] || '#fff'
              }}>
                {artist.name.charAt(0)}
              </span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #f472b6, #c084fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {artist.name}
            </h1>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ 
                background: rankColors[artist.rank] || '#6b7280', 
                color: '#fff', 
                padding: '4px 12px', 
                borderRadius: 'var(--radius-full)', 
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {artist.rank}
              </span>
              <span style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.9rem'
              }}>
                • {artist.group}
              </span>
              <span style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.9rem'
              }}>
                • {artist.position}
              </span>
              <span style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.9rem'
              }}>
                • {artist.genre}
              </span>
            </div>
            <p style={{ 
              marginTop: '12px', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.6'
            }}>
              {artist.description || 'Aucune description disponible.'}
            </p>
          </div>
        </div>

        {/* Tabs for different sections */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          borderBottom: '1px solid var(--border)'
        }}>
          <button
            onClick={() => { /* tab switching logic would go here */ }}
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              borderBottom: '2px solid transparent',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t.infoTab}
          </button>
          <button
            onClick={() => { /* tab switching logic would go here */ }}
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              borderBottom: '2px solid transparent',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t.skillsTab}
          </button>
          <button
            onClick={() => { /* tab switching logic would go here */ }}
            style={{
              padding: '12px 20px',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              borderBottom: '2px solid var(--primary)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t.statsTab}
          </button>
        </div>

        {/* Informations Générales */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#f472b6',
            marginBottom: '16px'
          }}>
            {t.generalInfo}
          </h2>
          <div style={{ 
            display: 'grid', 
            gap: '16px', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.position}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.position}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.group}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.group}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.genre}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.genre}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.specialty}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.specialty}</p>
            </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.build}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{artist.build}</p>
              </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.rating}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.rating}</p>
            </div>
          </div>
        </section>

        {/* {t.skills} */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#f472b6',
            marginBottom: '16px'
          }}>
            {t.skills}
          </h2>
          {artist.skills && artist.skills.length > 0 ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px'
            }}>
              {artist.skills.map((skill: string, index: number) => (
                <div key={index} style={{ 
                  padding: '10px 14px', 
                  background: 'rgba(255,255,255,0.05)', 
                  borderRadius: 'var(--radius-md)', 
                  borderLeft: `3px solid ${rankColors[artist.rank] || '#6b7280'}`,
                  fontSize: '0.9rem'
                }}>
                  {skill}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {t.noSkills}
            </p>
          )}
        </section>

        {/* {t.skillCategories} */}
        {artist.skillCategories && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: '#f472b6',
              marginBottom: '16px'
            }}>
              {t.skillCategories}
            </h2>
            <div style={{ 
              display: 'grid', 
              gap: '16px', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.dps}</h3>
                <p>{artist.skillCategories.dps?.join(', ') || t.none}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.offensive}</h3>
                <p>{artist.skillCategories.offensive?.join(', ') || t.none}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.hp}</h3>
                <p>{artist.skillCategories.hp?.join(', ') || t.none}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.defense}</h3>
                <p>{artist.skillCategories.defense?.join(', ') || t.none}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.speed}</h3>
                <p>{artist.skillCategories.speed?.join(', ') || t.none}</p>
              </div>
            </div>
          </section>
        )}

        {/* Stats */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#f472b6',
            marginBottom: '16px'
          }}>
            {t.stats}
          </h2>
          <div style={{ 
            display: 'grid', 
            gap: '16px', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.singStat}</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#fbbf24'
              }}>
                {artist.singStat?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.danceStat}</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#fbbf24'
              }}>
                {artist.danceStat?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.tier}</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#fbbf24'
              }}>
                {artist.calculatedTier || 'N/A'}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>{t.photos}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.photos || 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border)'
        }}>
          <Link href={`/${lang}/artists`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontWeight: 500,
            textDecoration: 'none'
          }}>
            ← {t.backToArtists}
          </Link>
          <Link href={`/${lang}/tierlist`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontWeight: 500,
            textDecoration: 'none'
          }}>
            {t.viewTierList} →
          </Link>
        </div>
      </div>
    </>
  );
}
