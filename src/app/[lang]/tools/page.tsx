"use client";

import { useState } from "react";
import SVSCalculator from "@/components/tools/SVSCalculator";
import CEOCalculator from "@/components/tools/CEOCalculator";
import ApexCalculator from "@/components/tools/ApexCalculator";
import { AdBanner } from "@/components/AdSense";

const tools = [
  { id: "resource", label: "Resources", icon: "🧮" },
  { id: "svs", label: "SVS Store", icon: "🛒" },
  { id: "ceo", label: "CEO Event", icon: "📅" },
  { id: "team", label: "Team Builder", icon: "👥" },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("resource");

  return (
    <div style={{ minHeight: "100vh", padding: "0" }}>
      <div style={{
        background: "rgba(15, 15, 26, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "16px 0"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 16px" }}>
          <h1 style={{ 
            fontSize: "1.75rem", 
            fontWeight: 800, 
            marginBottom: "4px",
            background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            TopGirl Tools
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 16px 60px" }}>
        <AdBanner />

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", marginTop: "24px", flexWrap: "wrap" }}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: activeTab === tool.id 
                  ? "1px solid #f472b6" 
                  : "1px solid #374151",
                background: activeTab === tool.id
                  ? "linear-gradient(135deg, #ec4899, #a855f7)"
                  : "#1f2937",
                color: "#fff",
              }}
            >
              {tool.icon} {tool.label}
            </button>
          ))}
        </div>

        <div style={{
          background: "#1f2937",
          borderRadius: "16px",
          border: "1px solid #374151",
          padding: "24px",
          minHeight: "500px",
        }}>
          {activeTab === "resource" && <ApexCalculator />}
          {activeTab === "svs" && <SVSCalculator />}
          {activeTab === "ceo" && <CEOCalculator />}
          {activeTab === "team" && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚧</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>
                Coming Soon
              </h3>
              <p>Team Builder will be available soon.</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: "24px", color: "#6b7280", fontSize: "0.85rem" }}>
          Data from <a href="https://github.com/IamClumsy" target="_blank" rel="noopener" style={{ color: "#a855f7" }}>@IamClumsy</a>
        </div>
      </div>
    </div>
  );
}
