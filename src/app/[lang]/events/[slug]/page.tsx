"use client";

import { useParams } from "next/navigation";

import Link from "next/link";
import eventsDataRaw from "@/lib/data/events.json";
import { AdBanner } from "@/components/AdSense";

const eventTranslations: Record<string, any> = {
  fr: { notFound: "Événement non trouvé", backToEvents: "← Retour aux événements", loading: "Chargement...", otherEvents: "Autres événements", viewGuide: "Voir le guide complet", rewards: "Récompenses", tips: "Conseils", bestArtists: "Meilleurs Artistes", active: "Actif", duration: "Durée", frequency: "Fréquence", badgeNew: "Nouveau", badgeInProgress: "En cours d'élaboration" },
  en: { notFound: "Event not found", backToEvents: "← Back to Events", loading: "Loading...", otherEvents: "Other Events", viewGuide: "View full guide", rewards: "Rewards", tips: "Tips", bestArtists: "Best Artists", active: "Active", duration: "Duration", frequency: "Frequency", badgeNew: "New", badgeInProgress: "In progress" },
  it: { notFound: "Evento non trovato", backToEvents: "← Torna agli eventi", loading: "Caricamento...", otherEvents: "Altri eventi", viewGuide: "Vedi guida completa", rewards: "Ricompense", tips: "Consigli", bestArtists: "Migliori Artisti", active: "Attivo", duration: "Durata", frequency: "Frequenza", badgeNew: "Nuovo", badgeInProgress: "In elaborazione" },
  es: { notFound: "Evento no encontrado", backToEvents: "← Volver a los eventos", loading: "Cargando...", otherEvents: "Otros eventos", viewGuide: "Ver guía completa", rewards: "Recompensas", tips: "Consejos", bestArtists: "Mejores Artistas", active: "Activo", duration: "Duración", frequency: "Frecuencia", badgeNew: "Nuevo", badgeInProgress: "En progreso" },
  pt: { notFound: "Evento não encontrado", backToEvents: "← Voltar aos eventos", loading: "Carregando...", otherEvents: "Outros eventos", viewGuide: "Ver guia completo", rewards: "Recompensas", tips: "Dicas", bestArtists: "Melhores Artistas", active: "Ativo", duration: "Duração", frequency: "Frequência", badgeNew: "Novo", badgeInProgress: "Em progresso" },
  pl: { notFound: "Wydarzenie nie znalezione", backToEvents: "← Wróć do wydarzeń", loading: "Ładowanie...", otherEvents: "Inne wydarzenia", viewGuide: "Zobacz pełny poradnik", rewards: "Nagrody", tips: "Porady", bestArtists: "Najlepsi Artyści", active: "Aktywny", duration: "Czas trwania", frequency: "Częstotliwość", badgeNew: "Nowy", badgeInProgress: "W trakcie" },
  id: { notFound: "Acara tidak ditemukan", backToEvents: "← Kembali ke acara", loading: "Memuat...", otherEvents: "Acara lain", viewGuide: "Lihat panduan lengkap", rewards: "Hadiah", tips: "Tips", bestArtists: "Artis Terbaik", active: "Aktif", duration: "Durasi", frequency: "Frekuensi", badgeNew: "Baru", badgeInProgress: "Sedang dibuat" },
  ru: { notFound: "Событие не найдено", backToEvents: "← Вернуться к событиям", loading: "Загрузка...", otherEvents: "Другие события", viewGuide: "Посмотреть полный гайд", rewards: "Награды", tips: "Советы", bestArtists: "Лучшие Артисты", active: "Активно", duration: "Продолжительность", frequency: "Частота", badgeNew: "Новый", badgeInProgress: "В разработке" },
};

type Event = {
  id: number;
  name: string;
  type: string;
  description: string;
  rewards: string[];
  tips: string;
  bestArtists: string[];
  active: boolean;
  duration: string;
  frequency?: string;
  region?: string;
  guideId?: string;
  date?: string;
  image?: string;
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  recurring: { bg: "rgba(34, 197, 94, 0.15)", text: "#22c55e", border: "rgba(34, 197, 94, 0.4)" },
  seasonal: { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b", border: "rgba(245, 158, 11, 0.4)" },
  permanent: { bg: "rgba(59, 130, 246, 0.15)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.4)" },
};

const eventImages: Record<string, string> = {
  recurring: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  seasonal: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  permanent: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
};

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lang = params?.lang as string || "fr";
  const t = eventTranslations[lang] || eventTranslations.en;
  const events: Event[] = eventsDataRaw as Event[];
  const event: Event | null = events.find((e: Event) => e.name.toLowerCase().replace(/\s+/g, "-") === slug) || null;



  if (!event) {
    return (
      <div className="container" style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>{t.notFound}</h1>
        <Link href={`/${lang}/events/`} style={{ color: "#8b5cf6" }}>
          {t.backToEvents}
        </Link>
      </div>
    );
  }

  const colors = typeColors[event.type] || typeColors.recurring;

  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <Link href={`/${lang}/events/`} style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px", display: "inline-block" }}>
        {t.backToEvents}
      </Link>

      <div style={{ 
        background: "rgba(30,30,50,0.9)", 
        borderRadius: "16px", 
        padding: "32px", 
        marginTop: "20px",
        border: `1px solid ${colors.border}`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ 
            padding: "4px 12px", 
            borderRadius: "20px", 
            background: colors.bg, 
            color: colors.text,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase"
          }}>
            {event.type}
          </span>
          {event.active && (
            <span style={{ 
              padding: "4px 12px", 
              borderRadius: "20px", 
              background: "rgba(34, 197, 94, 0.15)", 
              color: "#22c55e",
              fontSize: "0.75rem",
              fontWeight: 600
            }}>
{t.active}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "24px" }}>
          {event.guideId === "event-cleanup-party" ? (
            <span style={{ 
              background: "linear-gradient(135deg, #10b981, #059669)", 
              color: "white", 
              padding: "4px 12px", 
              borderRadius: "20px", 
              fontSize: "0.85rem", 
              fontWeight: "600",
              display: "inline-block",
              marginBottom: "12px"
            }}>
              {t.badgeNew}
            </span>
          ) : (
            <span style={{ 
              background: "linear-gradient(135deg, #f59e0b, #d97706)", 
              color: "white", 
              padding: "4px 12px", 
              borderRadius: "20px", 
              fontSize: "0.85rem", 
              fontWeight: "600",
              display: "inline-block",
              marginBottom: "12px"
            }}>
              {t.badgeInProgress}
            </span>
          )}
        </div>
        
        <h1 style={{ 
          fontSize: "2rem", 
          fontWeight: 800, 
          marginBottom: "16px",
          background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          {event.name}
        </h1>

        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
          <span>📅 {t.duration}: {event.duration}</span>
          {event.frequency && <span>🔄 {t.frequency}: {event.frequency}</span>}
        </div>

        <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "24px" }}>
          {event.description}
        </p>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "1.1rem" }}>🎁 {t.rewards}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {event.rewards.map((reward, i) => (
              <span key={i} style={{ 
                padding: "8px 16px", 
                background: "rgba(139, 92, 246, 0.2)", 
                borderRadius: "8px",
                color: "#c084fc",
                fontSize: "0.9rem"
              }}>
                {reward}
              </span>
            ))}
          </div>
        </div>

        {event.tips && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "1.1rem" }}>💡 {t.tips}</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6, padding: "16px", background: "rgba(251, 191, 36, 0.1)", borderRadius: "8px", borderLeft: "3px solid #fbbf24" }}>
              {event.tips}
            </p>
          </div>
        )}

        {event.bestArtists && event.bestArtists.length > 0 && (
          <div>
            <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "1.1rem" }}>⭐ {t.bestArtists}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {event.bestArtists.map((artist, i) => (
                <span key={i} style={{ 
                  padding: "8px 16px", 
                  background: "rgba(59, 130, 246, 0.2)", 
                  borderRadius: "8px",
                  color: "#60a5fa",
                  fontSize: "0.9rem"
                }}>
                  {artist}
                </span>
              ))}
            </div>
          </div>
        )}

        {event.guideId && (
          <div style={{ marginTop: "24px" }}>
            <Link 
              href={`/${lang}/guides/${event.guideId}/`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                borderRadius: "8px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              📖 {t.viewGuide}
            </Link>
          </div>
        )}
      </div>

      <AdBanner />

      {/* Internal Linking Hubs */}
      <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <Link href={`/${lang}/guides/`} style={{
          padding: "20px",
          background: "rgba(139, 92, 246, 0.15)",
          borderRadius: "12px",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          textDecoration: "none",
          display: "block"
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📖</div>
          <div style={{ color: "#a78bfa", fontWeight: 600, marginBottom: "4px" }}>{lang === "fr" ? "Guides & Stratégies" : "Guides & Strategies"}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>{lang === "fr" ? "Apprenez à optimiser votre jeu" : "Learn to optimize your gameplay"}</div>
        </Link>
        
        <Link href={`/${lang}/tierlist/`} style={{
          padding: "20px",
          background: "rgba(251, 191, 36, 0.15)",
          borderRadius: "12px",
          border: "1px solid rgba(251, 191, 36, 0.3)",
          textDecoration: "none",
          display: "block"
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🏆</div>
          <div style={{ color: "#fbbf24", fontWeight: 600, marginBottom: "4px" }}>{lang === "fr" ? "Tier List" : "Tier List"}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>{lang === "fr" ? "Classement des meilleurs artistes" : "Best artists ranking"}</div>
        </Link>
        
        <Link href={`/${lang}/artists/`} style={{
          padding: "20px",
          background: "rgba(244, 114, 182, 0.15)",
          borderRadius: "12px",
          border: "1px solid rgba(244, 114, 182, 0.3)",
          textDecoration: "none",
          display: "block"
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🎤</div>
          <div style={{ color: "#f472b6", fontWeight: 600, marginBottom: "4px" }}>{lang === "fr" ? "Base de Données" : "Artist Database"}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>{lang === "fr" ? "Découvrez tous les artistes" : "Discover all artists"}</div>
        </Link>
      </div>

      <div style={{ marginTop: "32px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {events.filter(e => e.id !== event.id).slice(0, 3).map(e => (
          <Link 
            key={e.id} 
            href={`/${lang}/events/${e.name.toLowerCase().replace(/\s+/g, "-")}/`}
            style={{
              padding: "12px 20px",
              background: "rgba(30,30,50,0.9)",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {e.name} →
          </Link>
        ))}
      </div>
    </div>
  );
}
