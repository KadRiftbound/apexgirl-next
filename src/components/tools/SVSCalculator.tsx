"use client";

import { useState, useEffect, useMemo } from "react";

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

const colorSchemes: Record<string, { card: string; title: string; total: string; check: string }> = {
  GOLD: {
    card: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(15, 23, 42, 0.8))",
    title: "#fbbf24",
    total: "#fcd34d",
    check: "#f59e0b",
  },
  SILVER: {
    card: "linear-gradient(135deg, rgba(148, 163, 184, 0.1), rgba(15, 23, 42, 0.8))",
    title: "#94a3b8",
    total: "#cbd5e1",
    check: "#64748b",
  },
  BRONZE: {
    card: "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(15, 23, 42, 0.8))",
    title: "#f97316",
    total: "#fdba74",
    check: "#ea580c",
  },
};

function fmt(v: number): string {
  return v.toLocaleString();
}

function ShopSection({ shop, color }: { shop: ShopData; color: string }) {
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
        background: scheme.card,
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${scheme.title}33`,
        padding: "var(--space-5)",
        marginBottom: "var(--space-4)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
        <h2 style={{ color: scheme.title, fontSize: "var(--text-lg)", fontWeight: 600 }}>{shop.title}</h2>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "var(--text-xs)",
            padding: "4px 8px",
            borderRadius: "var(--radius)",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: "var(--text-sm)", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "var(--space-2)", textAlign: "left", width: "30px" }}></th>
              <th style={{ padding: "var(--space-2)", textAlign: "left" }}>Item</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right", width: "80px" }}>Qty</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right" }}>Price</th>
              <th style={{ padding: "var(--space-2)", textAlign: "right" }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {shop.items.map((item, i) => {
              const state = items[i];
              const subtotal = state.inCart ? state.quantity * item.price : 0;
              return (
                <tr key={item.item} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "var(--space-2)" }}>
                    <input
                      type="checkbox"
                      checked={state.inCart}
                      onChange={() => toggleCart(i)}
                      style={{ accentColor: scheme.check, width: "16px", height: "16px", cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "var(--space-2)", color: "var(--text-primary)" }}>{item.item}</td>
                  <td style={{ padding: "var(--space-2)", textAlign: "right" }}>
                    <input
                      type="number"
                      min={0}
                      value={state.quantity}
                      onChange={(e) => setQty(i, Number(e.target.value))}
                      disabled={!state.inCart}
                      style={{
                        width: "60px",
                        padding: "4px 8px",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--border)",
                        background: "var(--bg-subtle)",
                        color: "var(--text-primary)",
                        textAlign: "right",
                        opacity: state.inCart ? 1 : 0.3,
                      }}
                    />
                  </td>
                  <td style={{ padding: "var(--space-2)", textAlign: "right", color: "var(--text-muted)" }}>
                    {fmt(item.price)}
                  </td>
                  <td
                    style={{
                      padding: "var(--space-2)",
                      textAlign: "right",
                      fontWeight: 600,
                      color: state.inCart ? scheme.total : "var(--text-muted)",
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

      <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Total Coins Needed
        </span>
        <span style={{ color: scheme.title, fontSize: "var(--text-2xl)", fontWeight: 700 }}>
          {fmt(total)}
        </span>
      </div>
    </section>
  );
}

export default function SVSCalculator() {
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
      <div style={{ textAlign: "center", padding: "var(--space-16)", color: "var(--text-muted)" }}>
        Loading calculator data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-16)", color: "#ef4444" }}>
        Error: {error}
      </div>
    );
  }

  if (!tables) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
          🛒 SVS Store Calculator
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Toggle items and adjust quantities to plan your coin spending
        </p>
      </div>

      {tables.GOLD && <ShopSection shop={tables.GOLD} color="GOLD" />}
      {tables.SILVER && <ShopSection shop={tables.SILVER} color="SILVER" />}
      {tables.BRONZE && <ShopSection shop={tables.BRONZE} color="BRONZE" />}
    </div>
  );
}
