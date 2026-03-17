"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AdBanner } from "@/components/AdSense";
import artistsData from "@/lib/data/artists.json";

const translations: Record<string, any> = {
  fr: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "Maîtrise le jeu avec 112+ artistes, des guides experts et des outils exclusifs",
    discoverArtists: "Découvrir les Artistes",
    seeTools: "Voir les Outils",
    tierListVotes: "Tier List & Votes",
    artists: "Artistes",
    guides: "Guides",
    events: "Événements",
    tools: "Outils",
    artistOfWeek: "Artiste de la semaine",
    votes: "votes",
    clickToVote: "Cliquez pour voter pour votre favori →",
    promoCodes: "Codes Promo",
    promoSubtitle: "Tous les codes disponibles pour TopGirl / ApexGirl",
    enterInGame: "Entrez les codes dans le jeu",
    codeGuide: "Guide des codes",
    exploreSite: "Explorer le Site",
    artistStats: "112+ artistes avec toutes leurs statistiques",
    toolsStats: "Calculateurs et optimiseurs exclusifs",
    guidesStats: "Tutoriels et stratégies complètes",
    eventsStats: "Calendrier et récompenses",
    readyToDominate: "Prêt à dominer le jeu ?",
    unlockPotential: "Débloquez tout le potentiel de vos artistes avec nos outils et guides exclusifs.",
    startNow: "Commencer Maintenant →",
    active: "Actif",
    copy: "Copier",
    seeAllCodes: "Voir tous les codes"
  },
  en: {
    homeTitle: "TOPGIRL GUIDE",
    subtitle: "Master the game with 112+ artists, expert guides and exclusive tools",
    discoverArtists: "Discover Artists",
    seeTools: "See Tools",
    tierListVotes: "Tier List & Votes",
    artists: "Artists",
    guides: "Guides",
    events: "Events",
    tools: "Tools",
    artistOfWeek: "Artist of the Week",
    votes: "votes",
    clickToVote: "Click to vote for your favorite →",
    promoCodes: "Promo Codes",
    promoSubtitle: "All available codes for TopGirl / ApexGirl",
    enterInGame: "Enter the codes in the game",
    codeGuide: "Code guide",
    exploreSite: "Explore the Site",
    artistStats: "112+ artists with all their stats",
    toolsStats: "Calculators and optimizers",
    guidesStats: "Tutorials and strategies",
    eventsStats: "Calendar and rewards",
    readyToDominate: "Ready to dominate the game?",
    unlockPotential: "Unlock the full potential of your artists with our exclusive tools and guides.",
    startNow: "Get Started →",
    active: "Active",
    copy: "Copy",
    seeAllCodes: "See all codes"
  }
};

const otherTranslations: Record<string, any> = {
   it: { homeTitle: "TOPGIRL GUIDE", subtitle: "Masterizza il gioco con 112+ artisti, guide esclusive", discoverArtists: "Scopri Artisti", seeTools: "Strumenti", tierListVotes: "Tier List", artists: "Artisti", guides: "Guide", events: "Eventi", tools: "Strumenti", artistOfWeek: "Artista della Settimana", votes: "voti", clickToVote: "Clicca per votare →", promoCodes: "Codici Promo", promoSubtitle: "Tutti i codici per TopGirl", enterInGame: "Inserisci i codici nel gioco", codeGuide: "Guida codici", exploreSite: "Esplora il Sito", artistStats: "112+ artisti con tutte le statistiche", toolsStats: "Calcolatori e ottimizzatori", guidesStats: "Tutorial e strategie", eventsStats: "Calendario e ricompense", readyToDominate: "Pronto a dominare?", unlockPotential: "Sblocca il pieno potenziale dei tuoi artisti.", startNow: "Inizia Ora →", active: "Attivo", copy: "Copia", seeAllCodes: "Vedi tutti i codici" },
   es: { homeTitle: "TOPGIRL GUIDE", subtitle: "Domina el juego con 112+ artistas, guías expertas", discoverArtists: "Descubrir Artistas", seeTools: "Herramientas", tierListVotes: "Tier List", artists: "Artistas", guides: "Guías", events: "Eventos", tools: "Herramientas", artistOfWeek: "Artista de la Semana", votes: "votos", clickToVote: "Haz clic para votar →", promoCodes: "Códigos Promo", promoSubtitle: "Todos los códigos para TopGirl", enterInGame: "Introduce los códigos en el juego", codeGuide: "Guía de códigos", exploreSite: "Explorar el Sitio", artistStats: "112+ artistas con todas sus estadísticas", toolsStats: "Calculadoras e optimizadores", guidesStats: "Tutoriales y estrategias", eventsStats: "Calendario e recompensas", readyToDominate: "¿Listo para dominar?", unlockPotential: "Desbloquea todo el potencial de tus artistas.", startNow: "Empezar Ahora →", active: "Attivo", copy: "Copiar", seeAllCodes: "Ver todos los códigos" },
   pt: { homeTitle: "TOPGIRL GUIDE", subtitle: "Domine o jogo com 112+ artistas, guias especializados", discoverArtists: "Descobrir Artistas", seeTools: "Ferramentas", tierListVotes: "Tier List", artists: "Artistas", guides: "Guias", events: "Eventos", tools: "Ferramentas", artistOfWeek: "Artista da Semana", votes: "votos", clickToVote: "Clique para votar →", promoCodes: "Códigos Promo", promoSubtitle: "Todos os códigos para TopGirl", enterInGame: "Insira os códigos no jogo", codeGuide: "Guia de códigos", exploreSite: "Explorar o Site", artistStats: "112+ artistas com todas as estatísticas", toolsStats: "Calculadoras e otimizadores", guidesStats: "Tutoriais e estratégias", eventsStats: "Calendário e recompensas", readyToDominate: "Pronto para dominar?", unlockPotential: "Desbloqueie o potencial completo dos seus artistas.", startNow: "Começar Agora →", active: "Ativo", copy: "Copiar", seeAllCodes: "Ver todos os códigos" },
   pl: { homeTitle: "TOPGIRL GUIDE", subtitle: "Opanuj grę z 112+ artystami, eksperckimi poradnikami", discoverArtists: "Odkryj Artystów", seeTools: "Narzędzia", tierListVotes: "Tier List", artists: "Artyści", guides: "Poradniki", events: "Wydarzenia", tools: "Narzędzia", artistOfWeek: "Artysta Tygodnia", votes: "głosów", clickToVote: "Kliknij, aby głosować →", promoCodes: "Kody Promo", promoSubtitle: "Wszystkie kody dla TopGirl", enterInGame: "Wpisz kody w grze", codeGuide: "Przewodnik po kodach", exploreSite: "Zbadaj Stronę", artistStats: "112+ artystów ze wszystkimi statystykami", toolsStats: "Kalkulatory i optymalizatory", guidesStats: "Samouczki i strategie", eventsStats: "Kalendarz i nagrody", readyToDominate: "Gotowy by dominować?", unlockPotential: "Odblokuj pełny potencjał swoich artystów.", startNow: "Zacznij Teraz →", active: "Aktywny", copy: "Kopiuj", seeAllCodes: "Zobacz wszystkie kody" },
   id: { homeTitle: "TOPGIRL GUIDE", subtitle: "Kuasai permainan dengan 112+ artis, panduan ahli", discoverArtists: "Temukan Artis", seeTools: "Alat", tierListVotes: "Tier List", artists: "Artis", guides: "Panduan", events: "Acara", tools: "Alat", artistOfWeek: "Artis Minggu Ini", votes: "suara", clickToVote: "Klik untuk memilih →", promoCodes: "Kode Promo", promoSubtitle: "Semua kode untuk TopGirl", enterInGame: "Masukkan kode dalam game", codeGuide: "Panduan kode", exploreSite: "Jelajahi Situs", artistStats: "112+ artis dengan semua statistik", toolsStats: "Kalkulator dan optimizer", guidesStats: "Tutorial dan strategi", eventsStats: "Kalender dan hadiah", readyToDominate: "Siap untuk mendominasi?", unlockPotential: "Buka potensi penuh artis Anda.", startNow: "Mulai Sekarang →", active: "Aktif", copy: "Salin", seeAllCodes: "Lihat todas as códigos" },
   ru: { homeTitle: "TOPGIRL GUIDE", subtitle: "Освой игру с 112+ артистами, экспертными гайдами", discoverArtists: "Открыть Артистов", seeTools: "Инструменты", tierListVotes: "Tier List", artists: "Артисты", guides: "Гайды", events: "События", tools: "Инструменты", artistOfWeek: "Артист Недели", votes: "голосов", clickToVote: "Нажмите, чтобы голосовать →", promoCodes: "Промокоды", promoSubtitle: "Все коды для TopGirl", enterInGame: "Введите коды в игре", codeGuide: "Руководство по кодам", exploreSite: "Исследовать Сайт", artistStats: "112+ артистов со всеми статистиками", toolsStats: "Калькуляторы и оптимизаторы", guidesStats: "Руководства и стратегии", eventsStats: "Календарь и награды", readyToDominate: "Готов доминировать?", unlockPotential: "Раскройте полный потенциал svých артистов.", startNow: "Начать Сейчас →", active: "Активно", copy: "Копировать", seeAllCodes: "Смотреть все коды" }
};

export default function HomePage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;
  const t2 = otherTranslations[lang] || translations.en;
  const text = lang === "fr" ? t : (otherTranslations[lang] || t2);
  
  const [weeklyTop, setWeeklyTop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [artistImage, setArtistImage] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  useEffect(() => {
    fetch("/api/vote")
      .then(res => res.json())
      .then(data => {
        if (data.weekly_top) {
          setWeeklyTop(data.weekly_top);
          if (data.weekly_top.artist_name) {
            const artist = artistsData.find((a: any) => a.name === data.weekly_top.artist_name);
            if (artist) {
              setArtistImage(artist.image || "");
              setArtistName(artist.name);
            } else {
              setArtistName(data.weekly_top.artist_name);
            }
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <>
      <div className="container">
        {/* Hero Section */}
        <section className="hero" style={{ textAlign: "center", padding: "80px 20px" }}>
          <h1 style={{ 
            fontSize: "3rem", 
            fontWeight: 800, 
            letterSpacing: "-1px", 
            background: "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            marginBottom: "16px"
          }}>
            {text.homeTitle}
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", marginBottom: "32px" }} dangerouslySetInnerHTML={{ __html: text.subtitle }} />
          
          <div className="grid grid-cols-3" style={{ maxWidth: "800px", margin: "0 auto", gap: "16px" }}>
            <Link href={`/${lang}/artists/`} className="btn" style={{ padding: "24px", fontSize: "1.125rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "2.5rem" }}>🎤</span>
              {text.discoverArtists}
            </Link>
            <Link href={`/${lang}/tools/`} className="btn" style={{ padding: "24px", fontSize: "1.125rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "2.5rem" }}>🛠️</span>
              {text.seeTools}
            </Link>
            <Link href={`/${lang}/tierlist/`} className="btn" style={{ padding: "24px", fontSize: "1.125rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "2.5rem" }}>🏆</span>
              {text.tierListVotes}
            </Link>
          </div>
        </section>

        {/* Artist of the Week */}
        {weeklyTop && (
        <section style={{ padding: "40px 0" }}>
          <Link href={`/${lang}/tierlist/`} style={{ textDecoration: "none" }}>
            <div style={{
              padding: "32px",
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))",
              border: "2px solid rgba(255, 215, 0, 0.4)",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent)",
                pointerEvents: "none"
              }} />
              
              {/* Artist Image */}
              <div style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                border: "5px solid #ffd700",
                overflow: "hidden",
                marginBottom: "16px",
                position: "relative",
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.5)",
                background: "var(--bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {artistImage ? (
                  <Image 
                    src={`/assets/images/artists/${artistImage}`}
                    alt={weeklyTop.artist_name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontSize: "3rem", fontWeight: 800, color: "#ffd700" }}>
                    {artistName?.charAt(0) || weeklyTop?.artist_name?.charAt(0)}
                  </span>
                )}
              </div>
              
              <div style={{ fontSize: "2.5rem", marginBottom: "8px", position: "relative" }}>👑</div>
              <div style={{ 
                fontSize: "0.85rem", 
                color: "#ffd700", 
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "8px",
                fontWeight: 600,
                position: "relative"
              }}>
                {text.artistOfWeek}
              </div>
              <div style={{ 
                fontSize: "2rem", 
                fontWeight: 800, 
                color: "#fff",
                marginBottom: "8px",
                position: "relative"
              }}>
                {weeklyTop?.artist_name || "Vote for your favorite!"}
              </div>
              {weeklyTop?.count > 0 && (
                <div style={{ 
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  background: "rgba(255, 215, 0, 0.2)",
                  borderRadius: "var(--radius-full)",
                  position: "relative"
                }}>
                  <span style={{ fontSize: "1.25rem" }}>⭐</span>
                  <span style={{ fontWeight: 700, color: "#ffd700" }}>
                    {weeklyTop.count} {text.votes}
                  </span>
                </div>
              )}
              <div style={{ 
                marginTop: "16px", 
                fontSize: "0.85rem", 
                color: "var(--text-muted)",
                position: "relative"
              }}>
                {text.clickToVote}
              </div>
            </div>
          </Link>
        </section>
        )}

        {/* Stats */}
        <section style={{ padding: "40px 0" }}>
          <div className="grid grid-cols-4">
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎤</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>112+</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{text.artists}</div>
            </div>
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>📖</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--secondary)" }}>50+</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{text.guides}</div>
            </div>
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🎉</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>8</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{text.events}</div>
            </div>
            <div className="glass-card text-center" style={{ padding: "32px 20px" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🛠️</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-yellow)" }}>5+</div>
              <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{text.tools}</div>
            </div>
          </div>
        </section>

        {/* Promo Codes */}
        <section style={{ padding: "40px 0" }}>
          <div className="glass-card" style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
            <h2 className="section-title text-center" style={{ marginBottom: "8px" }}>🎁 {text.promoCodes}</h2>
            <p className="text-center text-muted" style={{ marginBottom: "32px" }}>
              {text.promoSubtitle}
            </p>

            <div className="grid grid-cols-2" style={{ gap: "16px" }}>
              <div style={{ 
                background: "rgba(255, 77, 141, 0.1)", 
                border: "1px solid rgba(255, 77, 141, 0.2)", 
                borderRadius: "var(--radius-md)", 
                padding: "20px" 
              }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--primary)" }}>TOPYEAR2026</span>
                  <span className="badge badge-success">{text.active}</span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>500 gems + 1000 coins</p>
                <button
                  onClick={() => copyCode("TOPYEAR2026")}
                  className="btn"
                  style={{ width: "100%", padding: "10px" }}
                >
                  {text.copy}
                </button>
              </div>

              <div style={{ 
                background: "rgba(139, 92, 246, 0.1)", 
                border: "1px solid rgba(139, 92, 246, 0.2)", 
                borderRadius: "var(--radius-md)", 
                padding: "20px" 
              }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--secondary)" }}>TOPLOVERS</span>
                  <span className="badge badge-success">{text.active}</span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>1000 gems</p>
                <button
                  onClick={() => copyCode("TOPLOVERS")}
                  className="btn"
                  style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg, var(--secondary), #a78bfa)" }}
                >
                  {text.copy}
                </button>
              </div>
            </div>

            <p className="text-center text-muted" style={{ marginTop: "24px", fontSize: "0.875rem" }}>
              {text.enterInGame} • <Link href={`/${lang}/codes/`} style={{ color: "var(--primary)" }}>{text.seeAllCodes}</Link>
            </p>
          </div>
        </section>

        <AdBanner />

        {/* Explore Sections */}
        <section style={{ padding: "40px 0" }}>
          <h2 className="section-title text-center" style={{ marginBottom: "40px" }}>{text.exploreSite}</h2>

          <div className="grid grid-cols-4">
            <Link href={`/${lang}/artists/`} className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎤</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>{text.artists}</h3>
              <p className="text-sm text-muted">{text.artistStats}</p>
            </Link>

            <Link href={`/${lang}/tools/`} className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🛠️</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>{text.tools}</h3>
              <p className="text-sm text-muted">{text.toolsStats}</p>
            </Link>

            <Link href={`/${lang}/guides/`} className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📖</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>{text.guides}</h3>
              <p className="text-sm text-muted">{text.guidesStats}</p>
            </Link>

            <Link href={`/${lang}/events/`} className="glass-card" style={{ 
              display: "block", 
              textAlign: "center", 
              textDecoration: "none",
              padding: "40px 20px"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>{text.events}</h3>
              <p className="text-sm text-muted">{text.eventsStats}</p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          padding: "60px 40px", 
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(255, 77, 141, 0.1), rgba(139, 92, 246, 0.1))",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          margin: "40px 0"
        }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "12px" }}>
            {text.readyToDominate}
          </h2>
          <p className="text-muted" style={{ marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" }}>
            {text.unlockPotential}
          </p>
          <Link href={`/${lang}/artists/`} className="btn" style={{ padding: "16px 40px", fontSize: "1rem" }}>
            {text.startNow}
          </Link>
        </section>
      </div>
    </>
  );
}
