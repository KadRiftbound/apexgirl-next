'use client';

import { useState } from "react";
import { useParams } from "next/navigation";

const translations: Record<string, any> = {
  fr: {
    title: "Guide de Leveling",
    ssrLeveling: "Leveling SSR",
    blueprints: "Blueprints",
    hqUpgrade: "Upgrade HQ",
    level: "Niveau",
    required: "Requis",
    total: "Total",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "cartes",
    rarity: "Rareté",
  },
  en: {
    title: "Leveling Guide",
    ssrLeveling: "SSR Leveling",
    blueprints: "Blueprints",
    hqUpgrade: "HQ Upgrade",
    level: "Level",
    required: "Required",
    total: "Total",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "cards",
    rarity: "Rarity",
  },
  it: {
    title: "Guida Leveling",
    ssrLeveling: "Leveling SSR",
    blueprints: "Blueprint",
    hqUpgrade: "Upgrade HQ",
    level: "Livello",
    required: "Richiesto",
    total: "Totale",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "carte",
    rarity: "Rarità",
  },
  es: {
    title: "Guía de Leveling",
    ssrLeveling: "Leveling SSR",
    blueprints: "Blueprints",
    hqUpgrade: "Upgrade HQ",
    level: "Nivel",
    required: "Requerido",
    total: "Total",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "cartas",
    rarity: "Rareza",
  },
  pt: {
    title: "Guia de Leveling",
    ssrLeveling: "Leveling SSR",
    blueprints: "Blueprints",
    hqUpgrade: "Upgrade HQ",
    level: "Nível",
    required: "Requerido",
    total: "Total",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "cartas",
    rarity: "Raridade",
  },
  pl: {
    title: "Przewodnik Leveling",
    ssrLeveling: "Leveling SSR",
    blueprints: "Blueprinty",
    hqUpgrade: "Upgrade HQ",
    level: "Poziom",
    required: "Wymagane",
    total: "Suma",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "kart",
    rarity: "Rzadkość",
  },
  id: {
    title: "Panduan Leveling",
    ssrLeveling: "Leveling SSR",
    blueprints: "Blueprint",
    hqUpgrade: "Upgrade HQ",
    level: "Level",
    required: "Dibutuhkan",
    total: "Total",
    tier: "Tier",
    purple: "Purple",
    gold: "Gold",
    cards: "kartu",
    rarity: "Kelangkaan",
  },
  ru: {
    title: "Гайд по Прокачке",
    ssrLeveling: "Прокачка SSR",
    blueprints: "Чертежи",
    hqUpgrade: "Апгрейд Штаба",
    level: "Уровень",
    required: "Требуется",
    total: "Всего",
    tier: "Тиер",
    purple: "Purple",
    gold: "Gold",
    cards: "карт",
    rarity: "Редкость",
  },
};

const ssrLeveling = [
  { level: 20, required: 50, total: 50 },
  { level: 30, required: 100, total: 150 },
  { level: 40, required: 200, total: 350 },
  { level: 50, required: 450, total: 800 },
  { level: 60, required: 700, total: 1500 },
  { level: 80, required: 800, total: 2300 },
  { level: 85, required: 800, total: 3100 },
  { level: 90, required: 800, total: 3900 },
  { level: 95, required: 800, total: 4700 },
  { level: 100, required: 1200, total: 5900 },
  { level: 105, required: 1200, total: 7100 },
  { level: 110, required: 1200, total: 8300 },
  { level: 115, required: 1200, total: 9500 },
];

const blueprints = [
  { tier: 7, rarity: "PURPLE", total: 21930 },
  { tier: 8, rarity: "GOLD", total: 40820 },
  { tier: 9, rarity: "GOLD", total: 50430 },
  { tier: 10, rarity: "GOLD", total: 60610 },
  { tier: 11, rarity: "GOLD", total: 83700 },
  { tier: 12, rarity: "GOLD", total: 96000 },
];

const hqUpgrades = [
  { level: 1, required: 0, total: 0 },
  { level: 2, required: 2, total: 2 },
  { level: 3, required: 20, total: 22 },
  { level: 4, required: 100, total: 122 },
  { level: 5, required: 200, total: 322 },
  { level: 6, required: 400, total: 722 },
  { level: 7, required: 800, total: 1522 },
  { level: 8, required: 1400, total: 2922 },
  { level: 9, required: 2000, total: 4922 },
  { level: 10, required: 2600, total: 7522 },
  { level: 11, required: 3200, total: 10722 },
  { level: 12, required: 3600, total: 14322 },
  { level: 13, required: 4000, total: 18322 },
  { level: 14, required: 5600, total: 23922 },
  { level: 15, required: 6000, total: 29922 },
];

export default function LevelingGuide() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState("ssr");

  return (
    <div style={{ width: "100%", color: "#fff" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", textAlign: "center" }}>
        {t.title}
      </h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", justifyContent: "center" }}>
        {[
          { id: "ssr", label: t.ssrLeveling },
          { id: "blueprints", label: t.blueprints },
          { id: "hq", label: t.hqUpgrade },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: activeTab === tab.id ? "1px solid #f472b6" : "1px solid #374151",
              background: activeTab === tab.id ? "linear-gradient(135deg, #ec4899, #a855f7)" : "#1f2937",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SSR Leveling Table */}
      {activeTab === "ssr" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#374151" }}>
                <th style={{ padding: "12px", textAlign: "left", borderRadius: "8px 0 0 0" }}>{t.level}</th>
                <th style={{ padding: "12px", textAlign: "right" }}>{t.required}</th>
                <th style={{ padding: "12px", textAlign: "right", borderRadius: "0 8px 0 0" }}>{t.total}</th>
              </tr>
            </thead>
            <tbody>
              {ssrLeveling.map((row, i) => (
                <tr key={row.level} style={{ background: i % 2 === 0 ? "#1f2937" : "#111827" }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: "#f472b6" }}>{row.level}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>{row.required.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: 600 }}>{row.total.toLocaleString()}</td>
                </tr>
              ))}
              <tr style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}>
                <td style={{ padding: "12px", fontWeight: 700, color: "#000" }}>TOTAL</td>
                <td style={{ padding: "12px", textAlign: "right", color: "#000" }}>-</td>
                <td style={{ padding: "12px", textAlign: "right", fontWeight: 700, color: "#000" }}>9,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Blueprints Table */}
      {activeTab === "blueprints" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#374151" }}>
                <th style={{ padding: "12px", textAlign: "left", borderRadius: "8px 0 0 0" }}>{t.tier}</th>
                <th style={{ padding: "12px", textAlign: "center" }}>{t.rarity}</th>
                <th style={{ padding: "12px", textAlign: "right", borderRadius: "0 8px 0 0" }}>Total {t.cards}</th>
              </tr>
            </thead>
            <tbody>
              {blueprints.map((row, i) => (
                <tr key={row.tier} style={{ background: i % 2 === 0 ? "#1f2937" : "#111827" }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: row.rarity === "GOLD" ? "#fbbf24" : "#a78bfa" }}>
                    Tier {row.tier}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <span style={{ 
                      padding: "4px 8px", 
                      borderRadius: "4px", 
                      background: row.rarity === "GOLD" ? "#fbbf24" : "#a78bfa",
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "0.75rem"
                    }}>
                      {row.rarity}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: 600 }}>{row.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* HQ Upgrade Table */}
      {activeTab === "hq" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#374151" }}>
                <th style={{ padding: "12px", textAlign: "left", borderRadius: "8px 0 0 0" }}>{t.level}</th>
                <th style={{ padding: "12px", textAlign: "right" }}>{t.required}</th>
                <th style={{ padding: "12px", textAlign: "right", borderRadius: "0 8px 0 0" }}>{t.total}</th>
              </tr>
            </thead>
            <tbody>
              {hqUpgrades.map((row, i) => (
                <tr key={row.level} style={{ background: i % 2 === 0 ? "#1f2937" : "#111827" }}>
                  <td style={{ padding: "12px", fontWeight: 600, color: "#8b5cf6" }}>HQ {row.level}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>{row.required.toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: 600 }}>{row.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
