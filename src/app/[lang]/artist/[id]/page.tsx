'use client';

import { useParams, useRouter } from 'next/navigation';
import artistsData from '@/lib/data/artists.json';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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

export default function ArtistDetailPage() {
  const { lang, id } = useParams<{ lang: string; id: string }>();
  const router = useRouter();

  // Handle missing id parameter
  if (!id) {
    router.push(`/(${lang})/artists`);
    return null; // Prevent rendering while redirecting
  }

  const artistId = parseInt(id);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const artist = artistsData.find((a: Artist) => a.id === artistId);
    setArtist(artist ?? null);
    setLoading(false);
  }, [artistId]);

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-skeleton" style={{ height: '200px' }} />
        <p className="text-muted" style={{ marginTop: '16px' }}>
          Chargement de l'artiste...
        </p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 className="section-title">Artiste non trouvé</h2>
        <p className="text-muted">
          L'artiste avec l'ID ${artistId} n'existe pas.
        </p>
        <Link href={`/${lang}/artists`} style={{
          display: 'inline-block',
          marginTop: '24px',
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: 'white',
          borderRadius: '6px'
        }}>
          Retour à la liste des artistes
        </Link>
      </div>
    );
  }

  const rankColors: Record<string, string> = {
    UR: '#fbbf24',
    'UR Bali': '#fbbf24',
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
            Informations
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
            Compétences
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
            Stats
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
            Informations générales
          </h2>
          <div style={{ 
            display: 'grid', 
            gap: '16px', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Position</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.position}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Groupe</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.group}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Genre</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.genre}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Specialité</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.specialty}</p>
            </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Build recommandé</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{artist.build}</p>
              </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Rating</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.rating}</p>
            </div>
          </div>
        </section>

        {/* Compétences */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#f472b6',
            marginBottom: '16px'
          }}>
            Compétences
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
              Aucune compétence listée.
            </p>
          )}
        </section>

        {/* Catégories de compétences */}
        {artist.skillCategories && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: '#f472b6',
              marginBottom: '16px'
            }}>
              Catégories de compétences
            </h2>
            <div style={{ 
              display: 'grid', 
              gap: '16px', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>DPS</h3>
                <p>{artist.skillCategories.dps?.join(', ') || 'Aucune'}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Offensive</h3>
                <p>{artist.skillCategories.offensive?.join(', ') || 'Aucune'}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>HP</h3>
                <p>{artist.skillCategories.hp?.join(', ') || 'Aucune'}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Défense</h3>
                <p>{artist.skillCategories.defense?.join(', ') || 'Aucune'}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Vitesse</h3>
                <p>{artist.skillCategories.speed?.join(', ') || 'Aucune'}</p>
              </div>
            </div>
          </section>
        )}

        {/* Stats calculées */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#f472b6',
            marginBottom: '16px'
          }}>
            Statistiques
          </h2>
          <div style={{ 
            display: 'grid', 
            gap: '16px', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Stat de chant</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#fbbf24'
              }}>
                {artist.singStat?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Stat de danse</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#fbbf24'
              }}>
                {artist.danceStat?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Tier calculé</h3>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#fbbf24'
              }}>
                {artist.calculatedTier || 'N/A'}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Pensées</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.thoughts || 'N/A'}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Photos</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{artist.photos || 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Retour à la liste */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border)'
        }}>
          <Link href={`/${lang}/artists`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontWeight: 500
          }}>
            ← Retour à la liste des artistes
          </Link>
        </div>
      </div>
    </>
  );
}
