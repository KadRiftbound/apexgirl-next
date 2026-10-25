import Link from "next/link";

export function NotFoundPage() {
  return (
    // Rendered by Next outside the site layout (no stylesheet), so it carries its own look.
    <div style={{ margin: 0, minHeight: "100vh", background: "linear-gradient(180deg, #a8735c 0%, #6f4a3f 60%, #5a3c35 100%)", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "5rem", marginBottom: "16px" }}>404</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "12px", color: "#fff" }}>
            Page not found
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", marginBottom: "36px", maxWidth: "400px" }}>
            This page does not exist or has been moved. Head back to the TopGirl Guide.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/en/" style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              color: "#fff",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}>
              <span aria-hidden="true">🏠</span> Home
            </Link>
            <Link href="/en/teambuilder/" style={{
              padding: "12px 28px",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
              <span aria-hidden="true">🎤</span> Artists
            </Link>
            <Link href="/en/guides/" style={{
              padding: "12px 28px",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
              <span aria-hidden="true">📖</span> Guides
            </Link>
          </div>

          <p style={{ marginTop: "48px", color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
            TopGirl Guide — apexgirlguide.com
          </p>
        </div>
    </div>
  );
}
