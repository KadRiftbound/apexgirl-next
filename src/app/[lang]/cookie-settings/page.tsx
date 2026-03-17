'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const translations: Record<string, any> = {
  fr: {
    title: "Gestion des cookies",
    subtitle: "Gérez vos préférences en matière de cookies",
    lastUpdate: "Dernière modification :",
    save: "Enregistrer mes préférences",
    saved: "Préférences enregistrées !",
    back: "← Retour au site",
    necessary: {
      title: "Cookies nécessaires",
      description: "Ces cookies sont essentiels au fonctionnement du site. Ils permettent notamment :",
      features: [
        "Le panier d'achat",
        "La connexion à votre compte",
        "La sécurité du site",
        "Les préférences linguistiques"
      ],
      required: true,
      note: "Ces cookies ne peuvent pas être désactivés car ils sont indispensables au fonctionnement du site."
    },
    analytics: {
      title: "Cookies analytiques",
      description: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.",
      features: [
        "Compter le nombre de visiteurs",
        "Analyser les pages les plus visitées",
        "Identifier les problèmes de navigation",
        "Améliorer les performances du site"
      ],
      provider: "Fourni par : Google Analytics"
    },
    marketing: {
      title: "Cookies marketing",
      description: "Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer l'efficacité des campagnes.",
      features: [
        "Afficher des publicités personnalisées",
        "Mesurer la performance des annonces",
        "Limiter le nombre d'affichages d'une même publicité",
        "Suivre les visiteurs à travers les sites web"
      ],
      provider: "Fourni par : Google AdSense"
    },
    consent: {
      title: "Historique de consentement",
      date: "Date de votre consentement :",
      noConsent: "Vous n'avez pas encore enregistré vos préférences."
    }
  },
  en: {
    title: "Cookie Management",
    subtitle: "Manage your cookie preferences",
    lastUpdate: "Last updated:",
    save: "Save Preferences",
    saved: "Preferences saved!",
    back: "← Back to site",
    necessary: {
      title: "Necessary Cookies",
      description: "These cookies are essential for the website to function. They enable:",
      features: [
        "Shopping cart functionality",
        "User account login",
        "Website security",
        "Language preferences"
      ],
      required: true,
      note: "These cookies cannot be disabled as they are essential for the website to function."
    },
    analytics: {
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website.",
      features: [
        "Count the number of visitors",
        "Analyze most visited pages",
        "Identify navigation issues",
        "Improve site performance"
      ],
      provider: "Provided by: Google Analytics"
    },
    marketing: {
      title: "Marketing Cookies",
      description: "These cookies are used to display relevant advertisements and measure campaign effectiveness.",
      features: [
        "Display personalized ads",
        "Measure ad performance",
        "Limit the number of times an ad is shown",
        "Track visitors across websites"
      ],
      provider: "Provided by: Google AdSense"
    },
    consent: {
      title: "Consent History",
      date: "Consent date:",
      noConsent: "You have not yet saved your preferences."
    }
  },
  it: {
    title: "Gestione Cookie",
    subtitle: "Gestisci le tue preferenze sui cookie",
    lastUpdate: "Ultimo aggiornamento:",
    save: "Salva preferenze",
    saved: "Preferenze salvate!",
    back: "← Torna al sito",
    necessary: {
      title: "Cookie necessari",
      description: "Questi cookie sono essenziali per il funzionamento del sito.",
      features: ["Carrello", "Login", "Sicurezza", "Preferenze lingua"],
      required: true,
      note: "Questi cookie non possono essere disabilitati."
    },
    analytics: {
      title: "Cookie analitici",
      description: "Ci aiutano a capire come i visitatori interagiscono con il nostro sito.",
      features: ["Contatore visitatori", "Pagine più visitate", "Miglioramento performance"],
      provider: "Fornito da: Google Analytics"
    },
    marketing: {
      title: "Cookie di marketing",
      description: "Utilizzati per mostrare pubblicità rilevanti.",
      features: ["Pubblicità personalizzate", "Misurazione annunci"],
      provider: "Fornito da: Google AdSense"
    },
    consent: { title: "Storico consenso", date: "Data consenso:", noConsent: "Nessun consenso registrato." }
  },
  es: {
    title: "Gestión de Cookies",
    subtitle: "Gestiona tus preferencias de cookies",
    lastUpdate: "Última actualización:",
    save: "Guardar preferencias",
    saved: "¡Preferencias guardadas!",
    back: "← Volver al sitio",
    necessary: {
      title: "Cookies necesarias",
      description: "Esenciales para el funcionamiento del sitio.",
      features: ["Carrito", "Inicio de sesión", "Seguridad", "Preferencias de idioma"],
      required: true,
      note: "Estas cookies no se pueden desactivar."
    },
    analytics: {
      title: "Cookies analíticas",
      description: "Nos ayudan a entender cómo interactúan los visitantes.",
      features: ["Contador de visitantes", "Páginas más visitadas"],
      provider: "Proveedor: Google Analytics"
    },
    marketing: {
      title: "Cookies de marketing",
      description: "Utilizadas para mostrar publicidad relevante.",
      features: ["Anuncios personalizados", "Rendimiento de anuncios"],
      provider: "Proveedor: Google AdSense"
    },
    consent: { title: "Historial de consentimiento", date: "Fecha:", noConsent: "Sin consentimiento registrado." }
  },
  pt: {
    title: "Gerenciamento de Cookies",
    subtitle: "Gerencie suas preferências de cookies",
    lastUpdate: "Última atualização:",
    save: "Salvar preferências",
    saved: "Preferências salvas!",
    back: "← Voltar ao site",
    necessary: {
      title: "Cookies necessários",
      description: "Essenciais para o funcionamento do site.",
      features: ["Carrinho", "Login", "Segurança", "Preferências de idioma"],
      required: true,
      note: "Estes cookies não podem ser desativados."
    },
    analytics: {
      title: "Cookies analíticos",
      description: "Nos ajudam a entender como os visitantes interagem.",
      features: ["Contador de visitantes", "Páginas mais visitadas"],
      provider: "Fornecido por: Google Analytics"
    },
    marketing: {
      title: "Cookies de marketing",
      description: "Usados para exibir anúncios relevantes.",
      features: ["Anúncios personalizados", "Desempenho dos anúncios"],
      provider: "Fornecido por: Google AdSense"
    },
    consent: { title: "Histórico de consentimento", date: "Data:", noConsent: "Nenhum consentimento registrado." }
  },
  pl: {
    title: "Zarządzanie plikami cookies",
    subtitle: "Zarządzaj preferencjami plików cookies",
    lastUpdate: "Ostatnia aktualizacja:",
    save: "Zapisz preferencje",
    saved: "Preferencje zapisane!",
    back: "← Wróć do strony",
    necessary: {
      title: "Niezbędne pliki cookies",
      description: "Niezbędne do działania strony.",
      features: ["Koszyk", "Logowanie", "Bezpieczeństwo", "Preferencje językowe"],
      required: true,
      note: "Tych plików cookies nie można wyłączyć."
    },
    analytics: {
      title: "Pliki cookies analityczne",
      description: "Pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję ze stroną.",
      features: ["Liczba odwiedzających", "Najczęściej odwiedzane strony"],
      provider: "Dostawca: Google Analytics"
    },
    marketing: {
      title: "Pliki cookies marketingowe",
      description: "Używane do wyświetlania odpowiednich reklam.",
      features: ["Spersonalizowane reklamy", "Wydajność reklam"],
      provider: "Dostawca: Google AdSense"
    },
    consent: { title: "Historia zgody", date: "Data:", noConsent: "Brak zarejestrowanej zgody." }
  },
  id: {
    title: "Manajemen Cookie",
    subtitle: "Kelola preferensi cookie Anda",
    lastUpdate: "Terakhir diperbarui:",
    save: "Simpan preferensi",
    saved: "Preferensi disimpan!",
    back: "← Kembali ke situs",
    necessary: {
      title: "Cookie yang diperlukan",
      description: "Penting untuk fungsi situs.",
      features: ["Keranjang", "Login", "Keamanan", "Preferensi bahasa"],
      required: true,
      note: "Cookie ini tidak dapat dinonaktifkan."
    },
    analytics: {
      title: "Cookie analitik",
      description: "Membantu kami memahami bagaimana pengunjung berinteraksi.",
      features: ["Jumlah pengunjung", "Halaman paling banyak dikunjungi"],
      provider: "Disediakan oleh: Google Analytics"
    },
    marketing: {
      title: "Cookie pemasaran",
      description: "Digunakan untuk menampilkan iklan yang relevan.",
      features: ["Iklan yang disesuaikan", "Kinerja iklan"],
      provider: "Disediakan oleh: Google AdSense"
    },
    consent: { title: "Riwayat persetujuan", date: "Tanggal:", noConsent: "Belum ada persetujuan yang disimpan." }
  },
  ru: {
    title: "Управление файлами cookie",
    subtitle: "Управление настройками файлов cookie",
    lastUpdate: "Последнее обновление:",
    save: "Сохранить настройки",
    saved: "Настройки сохранены!",
    back: "← Вернуться на сайт",
    necessary: {
      title: "Необходимые файлы cookie",
      description: "Необходимы для работы сайта.",
      features: ["Корзина", "Вход", "Безопасность", "Языковые настройки"],
      required: true,
      note: "Эти файлы cookie нельзя отключить."
    },
    analytics: {
      title: "Аналитические файлы cookie",
      description: "Помогают понять, как посетители взаимодействуют с сайтом.",
      features: ["Количество посетителей", "Самые посещаемые страницы"],
      provider: "Провайдер: Google Analytics"
    },
    marketing: {
      title: "Маркетинговые файлы cookie",
      description: "Используются для показа релевантной рекламы.",
      features: ["Персонализированная реклама", "Эффективность объявлений"],
      provider: "Провайдер: Google AdSense"
    },
    consent: { title: "История согласия", date: "Дата:", noConsent: "Согласие не зарегистрировано." }
  },
};

type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieSettings() {
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || 'fr';
  const t = translations[lang] || translations.fr;

  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);
  const [consentDate, setConsentDate] = useState<string | null>(null);

  useEffect(() => {
    const storedPrefs = localStorage.getItem('cookie_preferences');
    const timestamp = localStorage.getItem('consent_timestamp');

    if (storedPrefs) {
      try {
        const prefs = JSON.parse(storedPrefs);
        setPreferences(prefs);
      } catch {
        // Use defaults
      }
    }

    if (timestamp) {
      setConsentDate(new Date(timestamp).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US'));
    }
  }, [lang]);

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

  const handleSave = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    localStorage.setItem('consent_timestamp', new Date().toISOString());
    updateGtagConsent(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      
      <div className="container" style={{ padding: '40px 20px', maxWidth: '700px' }}>
        <Link href={`/${lang}/`} style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          color: 'rgba(255,255,255,0.6)', 
          marginBottom: '24px',
          fontSize: '0.9rem'
        }}>
          {t.back}
        </Link>

        <h1 style={{
          textAlign: 'center',
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #f472b6, #c084fc, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.2rem',
          fontWeight: 800
        }}>
          {t.title}
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          {t.subtitle}
        </p>

        {/* Consent Date */}
        {consentDate && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '24px',
            padding: '12px 20px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              {t.consent.date} <strong style={{ color: '#a855f7' }}>{consentDate}</strong>
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          {/* Necessary */}
          <div style={{
            padding: '20px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{t.necessary.title}</h3>
                <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 500 }}>✓ Toujours actif</span>
              </div>
              <div style={{
                width: '52px',
                height: '30px',
                background: '#22c55e',
                borderRadius: '15px',
                position: 'relative',
                cursor: 'not-allowed',
                opacity: 0.8
              }}>
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%'
                }} />
              </div>
            </div>
            <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{t.necessary.description}</p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              {t.necessary.features.map((f: string, i: number) => <li key={i} style={{ marginBottom: '4px' }}>{f}</li>)}
            </ul>
          </div>

          {/* Analytics */}
          <div style={{
            padding: '20px',
            background: preferences.analytics ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            border: `1px solid ${preferences.analytics ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`,
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{t.analytics.title}</h3>
              <button
                onClick={() => togglePreference('analytics')}
                style={{
                  width: '52px',
                  height: '30px',
                  background: preferences.analytics ? '#22c55e' : 'rgba(255,255,255,0.15)',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  left: preferences.analytics ? '26px' : '4px',
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
            <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{t.analytics.description}</p>
            <ul style={{ margin: '0 0 12px', paddingLeft: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              {t.analytics.features.map((f: string, i: number) => <li key={i} style={{ marginBottom: '4px' }}>{f}</li>)}
            </ul>
            <p style={{ margin: 0, color: 'rgba(139, 92, 246, 0.8)', fontSize: '0.8rem', fontStyle: 'italic' }}>{t.analytics.provider}</p>
          </div>

          {/* Marketing */}
          <div style={{
            padding: '20px',
            background: preferences.marketing ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            border: `1px solid ${preferences.marketing ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`,
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>{t.marketing.title}</h3>
              <button
                onClick={() => togglePreference('marketing')}
                style={{
                  width: '52px',
                  height: '30px',
                  background: preferences.marketing ? '#22c55e' : 'rgba(255,255,255,0.15)',
                  borderRadius: '15px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '4px',
                  left: preferences.marketing ? '26px' : '4px',
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>
            <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{t.marketing.description}</p>
            <ul style={{ margin: '0 0 12px', paddingLeft: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              {t.marketing.features.map((f: string, i: number) => <li key={i} style={{ marginBottom: '4px' }}>{f}</li>)}
            </ul>
            <p style={{ margin: 0, color: 'rgba(139, 92, 246, 0.8)', fontSize: '0.8rem', fontStyle: 'italic' }}>{t.marketing.provider}</p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: '12px',
            border: 'none',
            background: saved ? '#22c55e' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: saved ? 'none' : '0 0 25px rgba(139, 92, 246, 0.4)'
          }}
        >
          {saved ? `✓ ${t.saved}` : t.save}
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
          {t.lastUpdate} {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}
        </p>
      </div>
    </>
  );
}
