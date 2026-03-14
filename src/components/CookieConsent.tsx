'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const translations: Record<string, { title: string; text: string; accept: string; decline: string }> = {
  fr: { title: "🍪 Cookies", text: "Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.", accept: "Accepter", decline: "Refuser" },
  en: { title: "🍪 Cookies", text: "We use cookies to improve your experience and analyze traffic.", accept: "Accept", decline: "Decline" },
  it: { title: "🍪 Cookies", text: "Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico.", accept: "Accetta", decline: "Rifiuta" },
  es: { title: "🍪 Cookies", text: "Usamos cookies para mejorar tu experiencia y analizar el tráfico.", accept: "Aceptar", decline: "Rechazar" },
  pt: { title: "🍪 Cookies", text: "Usamos cookies para melhorar sua experiência e analisar o tráfego.", accept: "Aceitar", decline: "Rejeitar" },
  pl: { title: "🍪 Cookies", text: "Używamy plików cookies, aby poprawić Twoje doświadczenie i analizować ruch.", accept: "Akceptuj", decline: "Odrzuć" },
  id: { title: "🍪 Cookies", text: "Kami menggunakan cookie untuk meningkatkan pengalaman Anda dan menganalisis lalu lintas.", accept: "Terima", decline: "Tolak" },
  ru: { title: "🍪 Cookies", text: "Мы используем файлы cookie для улучшения вашего опыта и анализа трафика.", accept: "Принять", decline: "Отклонить" },
};

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'accepted' && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10, 10, 18, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(139, 92, 246, 0.3)',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      zIndex: 9999,
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 1, minWidth: '280px' }}>
        <h4 style={{ margin: '0 0 8px', color: '#fff', fontSize: '1rem' }}>{t.title}</h4>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{t.text}</p>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={decline}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          {t.decline}
        </button>
        <button
          onClick={accept}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
          }}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
