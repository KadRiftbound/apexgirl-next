"use client";

export const SUPPORT_URL = "https://buy.stripe.com/aFa4gygO6cqW6kTbqRenS00";

type SupportText = { title: string; body: string; cta: string; note: string };

const texts: Record<string, SupportText> = {
  fr: {
    title: "Ce site t'a aidé ?",
    body: "TopGirl Guide est fait par un joueur, sur son temps libre, sans pub intrusive. Il ne coûte presque rien à faire tourner, mais il demande du travail à chaque nouvelle saison. Un petit coup de pouce fait toujours plaisir, et le montant est libre.",
    cta: "Offrir un café",
    note: "Paiement sécurisé par Stripe. Aucune obligation, le site reste gratuit.",
  },
  en: {
    title: "Did this site help you?",
    body: "TopGirl Guide is made by one player, in their free time, with no intrusive ads. It costs almost nothing to run, but every new season means work. A small tip is always appreciated, and the amount is up to you.",
    cta: "Buy me a coffee",
    note: "Secure payment via Stripe. No obligation, the site stays free.",
  },
  de: {
    title: "Hat dir die Seite geholfen?",
    body: "TopGirl Guide wird von einem Spieler in der Freizeit gemacht, ohne aufdringliche Werbung. Der Betrieb kostet fast nichts, aber jede neue Saison bedeutet Arbeit. Ein kleines Trinkgeld freut immer, der Betrag ist frei.",
    cta: "Einen Kaffee spendieren",
    note: "Sichere Zahlung über Stripe. Keine Verpflichtung, die Seite bleibt kostenlos.",
  },
  it: {
    title: "Questo sito ti è stato utile?",
    body: "TopGirl Guide è fatto da un giocatore nel tempo libero, senza pubblicità invadente. Costa quasi nulla da mantenere, ma ogni nuova stagione richiede lavoro. Un piccolo aiuto fa sempre piacere, l'importo è libero.",
    cta: "Offri un caffè",
    note: "Pagamento sicuro con Stripe. Nessun obbligo, il sito resta gratuito.",
  },
  es: {
    title: "¿Te ha ayudado este sitio?",
    body: "TopGirl Guide lo hace un jugador en su tiempo libre, sin publicidad intrusiva. Cuesta casi nada mantenerlo, pero cada temporada nueva supone trabajo. Un pequeño apoyo siempre se agradece, y el importe es libre.",
    cta: "Invitar a un café",
    note: "Pago seguro con Stripe. Sin obligación, el sitio sigue siendo gratis.",
  },
  pt: {
    title: "Este site te ajudou?",
    body: "O TopGirl Guide é feito por um jogador no tempo livre, sem anúncios intrusivos. Custa quase nada para manter, mas cada temporada nova dá trabalho. Um pequeno apoio é sempre bem-vindo, e o valor é livre.",
    cta: "Pagar um café",
    note: "Pagamento seguro via Stripe. Sem obrigação, o site continua gratuito.",
  },
  pl: {
    title: "Strona Ci pomogła?",
    body: "TopGirl Guide tworzy jeden gracz w wolnym czasie, bez nachalnych reklam. Utrzymanie prawie nic nie kosztuje, ale każdy nowy sezon to praca. Drobne wsparcie zawsze cieszy, kwota jest dowolna.",
    cta: "Postaw kawę",
    note: "Bezpieczna płatność przez Stripe. Bez zobowiązań, strona pozostaje darmowa.",
  },
  id: {
    title: "Situs ini membantu?",
    body: "TopGirl Guide dibuat oleh satu pemain di waktu luang, tanpa iklan mengganggu. Biayanya hampir nol, tapi setiap musim baru butuh kerja. Dukungan kecil selalu menyenangkan, jumlahnya bebas.",
    cta: "Traktir kopi",
    note: "Pembayaran aman lewat Stripe. Tanpa kewajiban, situs tetap gratis.",
  },
  ru: {
    title: "Сайт помог?",
    body: "TopGirl Guide делает один игрок в свободное время, без навязчивой рекламы. Содержание почти ничего не стоит, но каждый новый сезон — это работа. Небольшая поддержка всегда радует, сумма любая.",
    cta: "Угостить кофе",
    note: "Безопасная оплата через Stripe. Без обязательств, сайт остаётся бесплатным.",
  },
};

/**
 * Honest, low-pressure support card. `compact` renders a single line for tight layouts.
 */
export function SupportCard({ lang, compact = false }: { lang: string; compact?: boolean }) {
  const t = texts[lang] || texts.en;

  if (compact) {
    return (
      <div className="support-compact">
        <span>☕ {t.title}</span>
        <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="support-compact-cta">
          {t.cta} →
        </a>
        <style jsx>{`
          .support-compact {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin: 12px 0;
            padding: 8px 14px;
            border-radius: 10px;
            background: rgba(255, 77, 141, 0.08);
            border: 1px solid rgba(255, 77, 141, 0.22);
            font-size: 0.8rem;
            color: rgba(255,255,255,0.8);
          }
          .support-compact-cta {
            color: #ff80ab;
            font-weight: 700;
            text-decoration: none;
            white-space: nowrap;
          }
          .support-compact-cta:hover { text-decoration: underline; }
        `}</style>
      </div>
    );
  }

  return (
    <aside className="support-card" aria-label={t.title}>
      <div className="support-icon">☕</div>
      <div className="support-text">
        <div className="support-title">{t.title}</div>
        <p className="support-body">{t.body}</p>
        <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="support-cta">
          ♥ {t.cta}
        </a>
        <div className="support-note">{t.note}</div>
      </div>
      <style jsx>{`
        .support-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          max-width: 720px;
          margin: 32px auto;
          padding: 20px 22px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255, 77, 141, 0.12), rgba(139, 92, 246, 0.10));
          border: 1px solid rgba(255, 77, 141, 0.25);
        }
        .support-icon {
          font-size: 2rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .support-text { flex: 1; min-width: 0; }
        .support-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .support-body {
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(255,255,255,0.78);
          margin: 0 0 14px;
        }
        .support-cta {
          display: inline-block;
          padding: 9px 18px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--primary, #ff4d8d), var(--secondary, #8b5cf6));
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(255, 77, 141, 0.3);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .support-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(139, 92, 246, 0.4);
        }
        .support-note {
          margin-top: 10px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.45);
        }
        @media (max-width: 600px) {
          .support-card { flex-direction: column; gap: 10px; padding: 16px; margin: 24px 0; }
          .support-icon { font-size: 1.6rem; }
        }
      `}</style>
    </aside>
  );
}
