'use client';

import { useState, useEffect } from "react";

type CalcItem = {
  category: string;
  item: string;
  tier?: string;
  level: number;
  cost: number;
};

const categoryConfig = [
  { id: "HQ Floors", label: "HQ Floors", tiers: ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"] },
  { id: "Museum", label: "Museum", tiers: ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"] },
  { id: "Homemaking", label: "Homemaking", tiers: ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"] },
  { id: "Car Core", label: "Car Core", tiers: ["D Grade", "C", "B", "A", "A+"] },
  { id: "Artists", label: "Artist EXP" },
  { id: "HQ Glass", label: "HQ Glass" },
  { id: "Collection Gems", label: "Collection Gems" },
  { id: "Assets", label: "Assets" },
  { id: "Blueprints", label: "Blueprints" },
  { id: "Car Parts", label: "Car Parts" },
];

export default function ApexCalculator() {
  const [data, setData] = useState<Record<string, CalcItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("HQ Floors");
  const [selectedTier, setSelectedTier] = useState("Floor 1");
  const [fromLevel, setFromLevel] = useState(1);
  const [toLevel, setToLevel] = useState(60);

  useEffect(() => {
    fetch("/api/calculator")
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.error);
        setData(result);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const currentConfig = categoryConfig.find(c => c.id === activeCategory);
  const hasTiers = currentConfig && 'tiers' in currentConfig;

  const calculateCost = () => {
    const items = data[activeCategory] || [];
    let filteredItems = items;

    if (hasTiers && selectedTier) {
      filteredItems = items.filter(i => i.item === selectedTier);
    }

    let total = 0;
    for (let l = fromLevel; l <= toLevel; l++) {
      const item = filteredItems.find(i => i.level === l);
      if (item) total += item.cost;
    }
    return total;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#fff' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#f87171' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', color: '#fff' }}>
      {/* Category Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {categoryConfig.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              if ('tiers' in cat && cat.tiers) {
                setSelectedTier(cat.tiers[0]);
              }
              setFromLevel(1);
              setToLevel(60);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeCategory === cat.id 
                ? '1px solid #f472b6' 
                : '1px solid #374151',
              background: activeCategory === cat.id 
                ? 'linear-gradient(135deg, #ec4899, #a855f7)' 
                : '#1f2937',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tier Selector */}
      {hasTiers && currentConfig && 'tiers' in currentConfig && (
        <div style={{ 
          marginBottom: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#9ca3af' }}>Select Tier:</span>
          {(currentConfig.tiers || []).map((tier: string) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: selectedTier === tier 
                  ? '1px solid #f472b6' 
                  : '1px solid #374151',
                background: selectedTier === tier 
                  ? 'rgba(244, 114, 182, 0.2)' 
                  : '#1f2937',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              {tier}
            </button>
          ))}
        </div>
      )}

      {/* Level Inputs */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        justifyContent: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ color: '#9ca3af' }}>From Level:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={fromLevel}
            onChange={(e) => setFromLevel(parseInt(e.target.value) || 1)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #374151',
              background: '#1f2937',
              color: '#fff',
              width: '80px',
              fontSize: '1rem',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ color: '#9ca3af' }}>To Level:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={toLevel}
            onChange={(e) => setToLevel(parseInt(e.target.value) || 1)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #374151',
              background: '#1f2937',
              color: '#fff',
              width: '80px',
              fontSize: '1rem',
            }}
          />
        </div>
      </div>

      {/* Result */}
      <div style={{ 
        textAlign: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))',
        borderRadius: '12px',
        border: '1px solid rgba(244, 114, 182, 0.3)',
      }}>
        <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Total Cost
        </div>
        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f472b6', fontFamily: 'monospace' }}>
          {calculateCost().toLocaleString()}
        </div>
      </div>

      {/* Cost breakdown table */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>
          Cost Breakdown
        </h3>
        <div style={{ 
          background: '#1f2937', 
          borderRadius: '12px', 
          border: '1px solid #374151',
          overflow: 'hidden',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#111827' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', color: '#9ca3af', fontWeight: 600, borderBottom: '1px solid #374151' }}>
                  Level
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#9ca3af', fontWeight: 600, borderBottom: '1px solid #374151' }}>
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const items = data[activeCategory] || [];
                let filteredItems = items;
                if (hasTiers && selectedTier) {
                  filteredItems = items.filter(i => i.item === selectedTier);
                }
                const sortedItems = filteredItems.sort((a, b) => a.level - b.level);
                return sortedItems
                  .filter(item => item.level >= fromLevel && item.level <= toLevel)
                  .map((item, idx) => (
                    <tr key={item.level} style={{ borderBottom: '1px solid #374151' }}>
                      <td style={{ padding: '10px 12px', color: '#fff' }}>
                        Level {item.level}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: '#f472b6', fontFamily: 'monospace' }}>
                        {item.cost.toLocaleString()}
                      </td>
                    </tr>
                  ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
