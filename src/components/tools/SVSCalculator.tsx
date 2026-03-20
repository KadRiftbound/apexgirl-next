"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

const translations: Record<string, any> = {
  fr: { item: "Article", qty: "Qté", price: "Prix", subtotal: "Total", reset: "Réinitialiser", loading: "Chargement des données SVS...", error: "Erreur" },
  en: { item: "Item", qty: "Qty", price: "Price", subtotal: "Subtotal", reset: "Reset", loading: "Loading SVS data...", error: "Error" },
  de: { item: "Artikel", qty: "Menge", price: "Preis", subtotal: "Zwischensumme", reset: "Zurücksetzen", loading: "SVS-Daten werden geladen...", error: "Fehler" },
  it: { item: "Articolo", qty: "Qtà", price: "Prezzo", subtotal: "Totale", reset: "Reset", loading: "Caricamento dati SVS...", error: "Errore" },
  es: { item: "Artículo", qty: "Cant", price: "Precio", subtotal: "Subtotal", reset: "Reiniciar", loading: "Cargando datos de SVS...", error: "Error" },
  pt: { item: "Item", qty: "Qtd", price: "Preço", subtotal: "Subtotal", reset: "Resetar", loading: "Carregando dados do SVS...", error: "Erro" },
  pl: { item: "Przedmiot", qty: "Ilość", price: "Cena", subtotal: "Suma", reset: "Resetuj", loading: "Ładowanie danych SVS...", error: "Błąd" },
  id: { item: "Barang", qty: "Jml", price: "Harga", subtotal: "Subtotal", reset: "Reset", loading: "Memuat data SVS...", error: "Kesalahan" },
  ru: { item: "Предмет", qty: "Кол-во", price: "Цена", subtotal: "Итого", reset: "Сбросить", loading: "Загрузка данных SVS...", error: "Ошибка" },
};

function getT(lang: string) {
  return translations[lang] || translations.en;
}

type ShopItem = {
  inCart: boolean;
  item: string;
  quantity: number;
  price: number;
};

type ShopData = {
  title: string;
  items: ShopItem[];
};

type TablesData = Record<string, ShopData>;

const colorSchemes: Record<string, { bg: string; title: string; total: string; border: string }> = {
  GOLD: {
    bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(30, 30, 50, 0.8))",
    title: "#fbbf24",
    total: "#fcd34d",
    border: "rgba(245, 158, 11, 0.4)",
  },
  SILVER: {
    bg: "linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(30, 30, 50, 0.8))",
    title: "#94a3b8",
    total: "#cbd5e1",
    border: "rgba(148, 163, 184, 0.4)",
  },
  BRONZE: {
    bg: "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(30, 30, 50, 0.8))",
    title: "#f97316",
    total: "#fdba74",
    border: "rgba(249, 115, 22, 0.4)",
  },
};

function fmt(v: number): string {
  return v.toLocaleString();
}

function ShopSection({ shop, color }: { shop: ShopData; color: string }) {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = getT(lang);
  const scheme = colorSchemes[color] || colorSchemes.GOLD;

  const [items, setItems] = useState<{ inCart: boolean; quantity: number }[]>(() =>
    shop.items.map((item) => ({ inCart: item.inCart, quantity: item.quantity }))
  );

  const total = useMemo(
    () =>
      items.reduce((sum, state, i) => {
        if (!state.inCart) return sum;
        return sum + state.quantity * shop.items[i].price;
      }, 0),
    [items, shop.items]
  );

  function toggleCart(idx: number) {
    setItems((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, inCart: !s.inCart } : s))
    );
  }

  function setQty(idx: number, qty: number) {
    setItems((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, quantity: Math.max(0, qty) } : s))
    );
  }

  function reset() {
    setItems(shop.items.map((item) => ({ inCart: item.inCart, quantity: item.quantity })));
  }

  return (
    <section
      style={{
        background: scheme.bg,
        borderRadius: "16px",
        border: `1px solid ${scheme.border}`,
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: scheme.title, fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {shop.title}
        </h3>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.75rem",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <th style={{ padding: "8px", textAlign: "left", width: "30px", color: "rgba(255,255,255,0.65)" }}></th>
              <th style={{ padding: "8px", textAlign: "left", color: "rgba(255,255,255,0.65)" }}>{t.item}</th>
              <th style={{ padding: "8px", textAlign: "center", width: "80px", color: "rgba(255,255,255,0.65)" }}>{t.qty}</th>
              <th style={{ padding: "8px", textAlign: "right", color: "rgba(255,255,255,0.65)" }}>{t.price}</th>
              <th style={{ padding: "8px", textAlign: "right", color: "rgba(255,255,255,0.65)" }}>{t.subtotal}</th>
            </tr>
          </thead>
          <tbody>
            {shop.items.map((item, i) => {
              const state = items[i];
              const subtotal = state.inCart ? state.quantity * item.price : 0;
              return (
                <tr key={item.item} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="checkbox"
                      checked={state.inCart}
                      onChange={() => toggleCart(i)}
                      style={{ accentColor: scheme.title, width: "16px", height: "16px", cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "8px", color: "#fff" }}>{item.item}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="number"
                      min={0}
                      value={state.quantity}
                      onChange={(e) => setQty(i, Number(e.target.value))}
                      disabled={!state.inCart}
                      style={{
                        width: "60px",
                        padding: "6px 8px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(30, 30, 50, 0.9)",
                        color: "#fff",
                        textAlign: "center",
                        opacity: state.inCart ? 1 : 0.3,
                      }}
                    />
                  </td>
                  <td style={{ padding: "8px", textAlign: "right", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                    {fmt(item.price)}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontWeight: 600,
                      fontFamily: "monospace",
                      color: state.inCart ? scheme.total : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {state.inCart ? fmt(subtotal) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Total Coins Needed
        </span>
        <span style={{ color: scheme.title, fontSize: "1.5rem", fontWeight: 700, fontFamily: "monospace" }}>
          {fmt(total)}
        </span>
      </div>
    </section>
  );
}

export default function SVSCalculator() {
  const params = useParams();
  const lang = (params?.lang as string) || "fr";
  const t = getT(lang);
  const [tables, setTables] = useState<TablesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/svs")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setTables(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⏳</div>
        {t.loading}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>
        {t.error}: {error}
      </div>
    );
  }

  if (!tables) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {tables.GOLD && <ShopSection shop={tables.GOLD} color="GOLD" />}
      {tables.SILVER && <ShopSection shop={tables.SILVER} color="SILVER" />}
      {tables.BRONZE && <ShopSection shop={tables.BRONZE} color="BRONZE" />}
    </div>
  );
}
