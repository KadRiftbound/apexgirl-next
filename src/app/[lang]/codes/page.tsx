'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { AdBanner } from '@/components/AdSense';
import type { Metadata } from 'next';

interface Code {
  code: string;
  rewards: string;
  expires: string;
  status: 'active' | 'expired';
  rarity?: string;
}

const codesData: Record<string, Code[]> = {
  active: [
    { code: 'TOPYEAR2026', rewards: '500 Gems + 1000 Coins', expires: '2026-12-31', status: 'active', rarity: 'new' },
    { code: 'TOPLOVERS', rewards: '1000 Gems', expires: '2026-12-31', status: 'active' },
    { code: '1stAnniversary', rewards: 'SSR Girl Promote Card + 500 Gems', expires: '2026-06-30', status: 'active' },
  ],
  expired: [
    { code: 'Springtopgirl', rewards: '500 Gems', expires: '2025-03-31', status: 'expired' },
    { code: 'Merrytopgirl', rewards: '500 Gems', expires: '2024-12-31', status: 'expired' },
  ]
};

const translations: Record<string, any> = {
   fr: {
     title: 'Codes Promo',
     subtitle: 'Tous les codes disponibles pour TopGirl / ApexGirl',
     enterGame: 'Entrez les codes dans le jeu: Menu > Réglages > Cadeaux',
     latestCodes: 'Codes Actifs',
     expiredCodes: 'Codes Expirés',
     rewards: 'Récompenses',
     expires: 'Expire',
     copy: 'Copier',
     copied: 'Copié!',
     noActive: 'Aucun code actif pour le moment',
     howToUse: 'Comment utiliser les codes',
     howToUseDesc: 'Allez dans le jeu, appuyez sur votre profil > Settings > Gift Code et entrez le code.',
     new: 'Nouveau',
     expired: 'Expiré',
   },
  en: {
    title: 'Promo Codes',
    subtitle: 'All available codes for TopGirl / ApexGirl',
    enterGame: 'Enter codes in game: Menu > Settings > Gifts',
    latestCodes: 'Latest Codes',
    expiredCodes: 'Expired Codes',
    rewards: 'Rewards',
    expires: 'Expires',
    copy: 'Copy',
    copied: 'Copied!',
    noActive: 'No active codes at the moment',
    howToUse: 'How to use codes',
    howToUseDesc: 'Go to the game, tap your profile icon > Settings > Gift Code and enter the code.',
    new: 'New',
    expired: 'Expired',
  },
  it: {
    title: 'Codici Promo',
    subtitle: 'Tutti i codici disponibili per TopGirl / ApexGirl',
    enterGame: 'Inserisci i codici nel gioco: Menu > Impostazioni > Regali',
    latestCodes: 'Codici Attivi',
    expiredCodes: 'Codici Scaduti',
    rewards: 'Ricompense',
    expires: 'Scade',
    copy: 'Copia',
    copied: 'Copiato!',
    noActive: 'Nessun codice attivo al momento',
    howToUse: 'Come usare i codici',
    howToUseDesc: 'Vai nel gioco, tocca la tua icona profilo > Impostazioni > Codice Regalo e inserisci il codice.',
    new: 'Nuovo',
    expired: 'Scaduto',
  },
  es: {
    title: 'Códigos Promo',
    subtitle: 'Todos los códigos disponibles para TopGirl / ApexGirl',
    enterGame: 'Introduce los códigos en el juego: Menú > Ajustes > Regalos',
    latestCodes: 'Códigos Activos',
    expiredCodes: 'Códigos Expirados',
    rewards: 'Recompensas',
    expires: 'Expira',
    copy: 'Copiar',
    copied: '¡Copiado!',
    noActive: 'No hay códigos activos actualmente',
    howToUse: 'Cómo usar códigos',
    howToUseDesc: 'Ve al juego, toca tu icono de perfil > Ajustes > Código de regalo e ingresa el código.',
    new: 'Nuevo',
    expired: 'Expirado',
  },
  pt: {
    title: 'Códigos Promo',
    subtitle: 'Todos os códigos disponíveis para TopGirl / ApexGirl',
    enterGame: 'Insira os códigos no jogo: Menu > Configurações > Presentes',
    latestCodes: 'Códigos Ativos',
    expiredCodes: 'Códigos Expirados',
    rewards: 'Recompensas',
    expires: 'Expira',
    copy: 'Copiar',
    copied: 'Copiado!',
    noActive: 'Nenhum código ativo no momento',
    howToUse: 'Como usar os códigos',
    howToUseDesc: 'Vá para o jogo, toque no ícone do seu perfil > Configurações > Código de presente e insira o código.',
    new: 'Novo',
    expired: 'Expirado',
  },
  pl: {
    title: 'Kody Promo',
    subtitle: 'Wszystkie dostępne kody dla TopGirl / ApexGirl',
    enterGame: 'Wpisz kody w grze: Menu > Ustawienia > Prezenty',
    latestCodes: 'Aktywne Kody',
    expiredCodes: 'Wygasłe Kody',
    rewards: 'Nagrody',
    expires: 'Wygasa',
    copy: 'Kopiuj',
    copied: 'Skopiowane!',
    noActive: 'Brak aktywnych kodów',
    howToUse: 'Jak używać kodów',
    howToUseDesc: 'Wejdź do gry, dotknij swojej ikony profilu > Ustawienia > Kod prezentowy i wpisz kod.',
    new: 'Nowy',
    expired: 'Wygasły',
  },
  id: {
    title: 'Kode Promo',
    subtitle: 'Semua kode yang tersedia untuk TopGirl / ApexGirl',
    enterGame: 'Masukkan kode dalam game: Menu > Pengaturan > Hadiah',
    latestCodes: 'Kode Aktif',
    expiredCodes: 'Kode Kedaluwarsa',
    rewards: 'Hadiah',
    expires: 'Kedaluwarsa',
    copy: 'Salin',
    copied: 'Disalin!',
    noActive: 'Tidak ada kode aktif saat ini',
    howToUse: 'Cara menggunakan kode',
    howToUseDesc: 'Buka game, ketuk ikon profil Anda > Pengaturan > Kode hadiah dan masukkan kode.',
    new: 'Baru',
    expired: 'Kedaluwarsa',
  },
  ru: {
    title: 'Промокоды',
    subtitle: 'Все доступные коды для TopGirl / ApexGirl',
    enterGame: 'Введите коды в игре: Меню > Настройки > Подарки',
    latestCodes: 'Активные Коды',
    expiredCodes: 'Истекшие Коды',
    rewards: 'Награды',
    expires: 'Истекает',
    copy: 'Копировать',
    copied: 'Скопировано!',
    noActive: 'Нет активных кодов',
    howToUse: 'Как использовать коды',
    howToUseDesc: 'Зайдите в игру, нажмите на свой профиль > Настройки > Подарочный код и введите код.',
    new: 'Новый',
    expired: 'Истёк',
  }
};

export default function CodesPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang] || translations.en;
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const getGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, rgba(255, 77, 141, 0.15), rgba(255, 77, 141, 0.05))',
      'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))',
      'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
      'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05))',
    ];
    return gradients[index % gradients.length];
  };

  const getBorderColor = (index: number) => {
    const colors = ['rgba(255, 77, 141, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(251, 191, 36, 0.3)'];
    return colors[index % colors.length];
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          🎁 {t.title}
        </h1>
        <p className="text-muted" style={{ fontSize: '1.125rem' }}>
          {t.subtitle}
        </p>
      </section>

      {/* How to use */}
      <section className="glass-card" style={{ padding: '24px', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--primary)' }}>
          💡 {t.howToUse}
        </h3>
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>
          {t.howToUseDesc}
        </p>
      </section>

      {/* All Codes */}
      <section style={{ marginBottom: '48px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>✅</span> {t.latestCodes}
          <span style={{ fontSize: '0.875rem', color: 'var(--accent-green)', fontWeight: 600 }}>({codesData.active.length})</span>
        </h2>

        {codesData.active.length + codesData.expired.length === 0 ? (
          <p className="text-muted text-center" style={{ padding: '40px' }}>
            {t.noActive}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Active codes first */}
            {codesData.active.map((item, index) => (
              <div
                key={item.code}
                className="glass-card"
                style={{
                  padding: '24px',
                  background: getGradient(index),
                  border: `1px solid ${getBorderColor(index)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ 
                      fontWeight: 700, 
                      fontSize: '1.25rem', 
                      fontFamily: 'monospace',
                      background: 'rgba(255,255,255,0.1)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {item.code}
                    </span>
                    {item.rarity === 'new' && (
                      <span className="badge" style={{ 
                        background: 'rgba(34, 197, 94, 0.2)', 
                        color: 'var(--accent-green)',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                      }}>
                        {t.new}
                      </span>
                    )}
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    🎁 {item.rewards}
                  </p>
                </div>
                <button
                  onClick={() => copyCode(item.code)}
                  className="btn"
                  style={{ 
                    padding: '12px 24px',
                    background: copied === item.code 
                      ? 'var(--accent-green)' 
                      : 'linear-gradient(135deg, var(--primary), #ff80ab)'
                  }}
                >
                  {copied === item.code ? t.copied : t.copy}
                </button>
              </div>
            ))}

            {/* Expired codes */}
            {codesData.expired.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.25rem', marginTop: '32px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.7 }}>
                  <span>❌</span> {t.expiredCodes}
                  <span style={{ fontSize: '0.875rem', color: 'var(--error)', fontWeight: 600 }}>({codesData.expired.length})</span>
                </h2>
                {codesData.expired.map((item, index) => (
              <div
                key={item.code}
                style={{
                  padding: '20px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  opacity: 0.7
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ 
                      fontWeight: 600, 
                      fontSize: '1.1rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through'
                    }}>
                      {item.code}
                    </span>
                    <span className="badge" style={{ 
                      background: 'rgba(239, 68, 68, 0.2)', 
                      color: 'var(--error)',
                      border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                      {t.expired}
                    </span>
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                    {item.rewards}
                  </span>
                </div>
                <span className="badge" style={{ 
                  background: 'rgba(239, 68, 68, 0.15)', 
                  color: 'var(--error)',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  {t.expires}: {item.expires}
                </span>
              </div>
            ))}
              </>
            )}
          </div>
        )}
      </section>

      <AdBanner />

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": codesData.active.map(code => ({
              "@type": "Question",
              "name": `What is the reward for code ${code.code}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `The code ${code.code} gives: ${code.rewards}.`
              }
            }))
          })
        }}
      />
    </div>
  );
}
