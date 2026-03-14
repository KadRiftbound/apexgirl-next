'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const translations: Record<string, any> = {
  fr: {
    title: "🍪 Paramètres des cookies",
    text: "Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez choisir d'accepter ou de refuser certaines catégories de cookies.",
    acceptAll: "Tout accepter",
    declineAll: "Tout refuser",
    savePreferences: "Enregistrer mes préférences",
    necessary: {
      title: "Cookies nécessaires",
      description: "Essentiels au fonctionnement du site (panier, connexion, sécurité). Ces cookies ne peuvent pas être désactivés.",
      required: true
    },
    analytics: {
      title: "Cookies analytiques",
      description: "Nous permettent de comprendre comment les visiteurs interagissent avec notre site (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Cookies marketing",
      description: "Utilisés pour diffuser des publicités personnalisées (Google AdSense).",
      required: false
    },
    manage: "Gérer mes cookies",
    banner: {
      title: "🍪 Nous utilisons des cookies",
      text: "Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez accepter tous les cookies ou personnaliser vos préférences.",
      accept: "Tout accepter",
      settings: "Personnaliser",
      decline: "Refuser tout"
    }
  },
  en: {
    title: "🍪 Cookie Settings",
    text: "We use cookies to improve your experience and analyze traffic. You can choose to accept or reject certain cookie categories.",
    acceptAll: "Accept All",
    declineAll: "Reject All",
    savePreferences: "Save Preferences",
    necessary: {
      title: "Necessary Cookies",
      description: "Essential for the website to function (basket, login, security). These cookies cannot be disabled.",
      required: true
    },
    analytics: {
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our site (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Marketing Cookies",
      description: "Used to deliver personalized advertisements (Google AdSense).",
      required: false
    },
    manage: "Manage my cookies",
    banner: {
      title: "🍪 We use cookies",
      text: "This site uses cookies to improve your experience. You can accept all cookies or customize your preferences.",
      accept: "Accept All",
      settings: "Customize",
      decline: "Reject All"
    }
  },
  it: {
    title: "🍪 Impostazioni Cookie",
    text: "Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico. Puoi scegliere di accettare o rifiutare alcune categorie di cookie.",
    acceptAll: "Accetta tutto",
    declineAll: "Rifiuta tutto",
    savePreferences: "Salva preferenze",
    necessary: {
      title: "Cookie necessari",
      description: "Essenziali per il funzionamento del sito (carrello, login, sicurezza). Questi cookie non possono essere disabilitati.",
      required: true
    },
    analytics: {
      title: "Cookie analitici",
      description: "Ci aiutano a capire come i visitatori interagiscono con il nostro sito (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Cookie di marketing",
      description: "Utilizzati per fornire pubblicità personalizzate (Google AdSense).",
      required: false
    },
    manage: "Gestisci i miei cookie",
    banner: {
      title: "🍪 Utilizziamo i cookie",
      text: "Questo sito utilizza i cookie per migliorare la tua esperienza. Puoi accettare tutti i cookie o personalizzare le tue preferenze.",
      accept: "Accetta tutto",
      settings: "Personalizza",
      decline: "Rifiuta tutto"
    }
  },
  es: {
    title: "🍪 Configuración de cookies",
    text: "Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes aceptar o rechazar ciertas categorías de cookies.",
    acceptAll: "Aceptar todo",
    declineAll: "Rechazar todo",
    savePreferences: "Guardar preferencias",
    necessary: {
      title: "Cookies necesarias",
      description: "Esenciales para el funcionamiento del sitio (carrito, inicio de sesión, seguridad). Estas cookies no se pueden desactivar.",
      required: true
    },
    analytics: {
      title: "Cookies analíticas",
      description: "Nos ayudan a entender cómo interactúan los visitantes con nuestro sitio (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Cookies de marketing",
      description: "Utilizadas para mostrar publicidad personalizada (Google AdSense).",
      required: false
    },
    manage: "Gestionar mis cookies",
    banner: {
      title: "🍪 Usamos cookies",
      text: "Este sitio usa cookies para mejorar tu experiencia. Puedes aceptar todas las cookies o personalizar tus preferencias.",
      accept: "Aceptar todo",
      settings: "Personalizar",
      decline: "Rechazar todo"
    }
  },
  pt: {
    title: "🍪 Configurações de Cookies",
    text: "Usamos cookies para melhorar sua experiência e analisar o tráfego. Você pode aceitar ou rejeitar certas categorias de cookies.",
    acceptAll: "Aceitar tudo",
    declineAll: "Rejeitar tudo",
    savePreferences: "Salvar preferências",
    necessary: {
      title: "Cookies necessários",
      description: "Essenciais para o funcionamento do site (carrinho, login, segurança). Estes cookies não podem ser desativados.",
      required: true
    },
    analytics: {
      title: "Cookies analíticos",
      description: "Nos ajudam a entender como os visitantes interagem com nosso site (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Cookies de marketing",
      description: "Usados para exibir anúncios personalizados (Google AdSense).",
      required: false
    },
    manage: "Gerenciar meus cookies",
    banner: {
      title: "🍪 Usamos cookies",
      text: "Este site usa cookies para melhorar sua experiência. Você pode aceitar todos os cookies ou personalizar suas preferências.",
      accept: "Aceitar tudo",
      settings: "Personalizar",
      decline: "Rejeitar tudo"
    }
  },
  pl: {
    title: "🍪 Ustawienia plików cookies",
    text: "Używamy plików cookies, aby poprawić Twoje doświadczenie i analizować ruch. Możesz zaakceptować lub odrzucić niektóre kategorie plików cookies.",
    acceptAll: "Akceptuj wszystko",
    declineAll: "Odrzuć wszystko",
    savePreferences: "Zapisz preferencje",
    necessary: {
      title: "Niezbędne pliki cookies",
      description: "Niezbędne do działania strony (koszyk, logowanie, bezpieczeństwo). Tych plików cookies nie można wyłączyć.",
      required: true
    },
    analytics: {
      title: "Pliki cookies analityczne",
      description: "Pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą stroną (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Pliki cookies marketingowe",
      description: "Używane do wyświetlania spersonalizowanych reklam (Google AdSense).",
      required: false
    },
    manage: "Zarządzaj moimi plikami cookies",
    banner: {
      title: "🍪 Używamy plików cookies",
      text: "Ta strona używa plików cookies, aby poprawić Twoje doświadczenie. Możesz zaakceptować wszystkie pliki cookies lub dostosować preferencje.",
      accept: "Akceptuj wszystko",
      settings: "Dostosuj",
      decline: "Odrzuć wszystko"
    }
  },
  id: {
    title: "🍪 Pengaturan Cookie",
    text: "Kami menggunakan cookie untuk meningkatkan pengalaman Anda dan menganalisis lalu lintas. Anda dapat menerima atau menolak kategori cookie tertentu.",
    acceptAll: "Terima semua",
    declineAll: "Tolak semua",
    savePreferences: "Simpan preferensi",
    necessary: {
      title: "Cookie yang diperlukan",
      description: "Penting untuk fungsi situs (keranjang, masuk, keamanan). Cookie ini tidak dapat dinonaktifkan.",
      required: true
    },
    analytics: {
      title: "Cookie analitik",
      description: "Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs kami (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Cookie pemasaran",
      description: "Digunakan untuk menampilkan iklan yang disesuaikan (Google AdSense).",
      required: false
    },
    manage: "Kelola cookie saya",
    banner: {
      title: "🍪 Kami menggunakan cookie",
      text: "Situs ini menggunakan cookie untuk meningkatkan pengalaman Anda. Anda dapat menerima semua cookie atau menyesuaikan preferensi.",
      accept: "Terima semua",
      settings: "Sesuaikan",
      decline: "Tolak semua"
    }
  },
  ru: {
    title: "🍪 Настройки файлов cookie",
    text: "Мы используем файлы cookie для улучшения вашего опыта и анализа трафика. Вы можете принять или отклонить определённые категории файлов cookie.",
    acceptAll: "Принять все",
    declineAll: "Отклонить все",
    savePreferences: "Сохранить настройки",
    necessary: {
      title: "Необходимые файлы cookie",
      description: "Необходимы для работы сайта (корзина, вход в систему, безопасность). Эти файлы cookie нельзя отключить.",
      required: true
    },
    analytics: {
      title: "Аналитические файлы cookie",
      description: "Помогают нам понять, как посетители взаимодействуют с нашим сайтом (Google Analytics).",
      required: false
    },
    marketing: {
      title: "Маркетинговые файлы cookie",
      description: "Используются для показа персонализированной рекламы (Google AdSense).",
      required: false
    },
    manage: "Управление файлами cookie",
    banner: {
      title: "🍪 Мы используем файлы cookie",
      text: "Этот сайт использует файлы cookie для улучшения вашего опыта. Вы можете принять все файлы cookie или настроить предпочтения.",
      accept: "Принять все",
      settings: "Настроить",
      decline: "Отклонить все"
    }
  },
};

type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || 'fr';
  const t = translations[lang] || translations.fr;

  const updateGtagConsent = (prefs: ConsentPreferences) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const storedPrefs = localStorage.getItem('cookie_preferences');
    
    if (!consent) {
      setShow(true);
    } else if (storedPrefs) {
      try {
        const prefs = JSON.parse(storedPrefs);
        setPreferences(prefs);
        updateGtagConsent(prefs);
      } catch {
        // Invalid stored preferences, show banner again
        setShow(true);
      }
    }
  }, []);

  const acceptAll = () => {
    const fullConsent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_preferences', JSON.stringify(fullConsent));
    localStorage.setItem('consent_timestamp', new Date().toISOString());
    updateGtagConsent(fullConsent);
    setShow(false);
    setShowSettings(false);
  };

  const declineAll = () => {
    const minimalConsent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_preferences', JSON.stringify(minimalConsent));
    localStorage.setItem('consent_timestamp', new Date().toISOString());
    updateGtagConsent(minimalConsent);
    setShow(false);
    setShowSettings(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    localStorage.setItem('consent_timestamp', new Date().toISOString());
    updateGtagConsent(preferences);
    setShow(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!show) return null;

  // Show simplified banner
  if (!showSettings) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(10, 10, 18, 0.98)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.3)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        zIndex: 9999,
        flexWrap: 'wrap',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h4 style={{ margin: '0 0 8px', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>{t.banner.title}</h4>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{t.banner.text}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={declineAll}
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {t.banner.decline}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              background: 'rgba(139, 92, 246, 0.1)',
              color: '#a855f7',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {t.banner.settings}
          </button>
          <button
            onClick={acceptAll}
            style={{
              padding: '12px 20px',
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
            {t.banner.accept}
          </button>
        </div>
      </div>
    );
  }

  // Show full settings modal
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={{
        background: 'rgba(30, 30, 50, 0.98)',
        borderRadius: '20px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        padding: '32px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={() => setShowSettings(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1
          }}
        >
          ×
        </button>

        <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
          {t.title}
        </h3>
        <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          {t.text}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {/* Necessary Cookies */}
          <div style={{
            padding: '16px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            opacity: 0.7
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{t.necessary.title}</span>
                <span style={{ marginLeft: '8px', color: '#22c55e', fontSize: '0.75rem', fontWeight: 500 }}>✓ Toujours actif</span>
              </div>
              <div style={{
                width: '48px',
                height: '28px',
                background: '#22c55e',
                borderRadius: '14px',
                position: 'relative',
                cursor: 'not-allowed'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  right: '3px',
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }} />
              </div>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{t.necessary.description}</p>
          </div>

          {/* Analytics Cookies */}
          <div style={{
            padding: '16px',
            background: preferences.analytics ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: `1px solid ${preferences.analytics ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`,
            transition: 'all 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{t.analytics.title}</span>
              <button
                onClick={() => togglePreference('analytics')}
                style={{
                  width: '48px',
                  height: '28px',
                  background: preferences.analytics ? '#22c55e' : 'rgba(255,255,255,0.2)',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: preferences.analytics ? '23px' : '3px',
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }} />
              </button>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{t.analytics.description}</p>
          </div>

          {/* Marketing Cookies */}
          <div style={{
            padding: '16px',
            background: preferences.marketing ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: `1px solid ${preferences.marketing ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`,
            transition: 'all 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{t.marketing.title}</span>
              <button
                onClick={() => togglePreference('marketing')}
                style={{
                  width: '48px',
                  height: '28px',
                  background: preferences.marketing ? '#22c55e' : 'rgba(255,255,255,0.2)',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: preferences.marketing ? '23px' : '3px',
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }} />
              </button>
            </div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{t.marketing.description}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={declineAll}
            style={{
              flex: 1,
              minWidth: '140px',
              padding: '14px 20px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
          >
            {t.declineAll}
          </button>
          <button
            onClick={savePreferences}
            style={{
              flex: 1,
              minWidth: '140px',
              padding: '14px 20px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
            }}
          >
            {t.savePreferences}
          </button>
        </div>
      </div>
    </div>
  );
}
