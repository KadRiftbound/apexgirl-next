export function LoadingSkeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={className}
      style={{
        ...style,
        background: "linear-gradient(90deg, var(--bg-card) 25%, var(--bg-elevated) 50%, var(--bg-card) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "var(--radius)",
      }}
    />
  );
}

export function ArtistCardSkeleton() {
  return (
    <div style={{
      padding: "12px",
      borderRadius: "var(--radius-md)",
      background: "var(--bg-card)",
      border: "1px solid var(--border)"
    }}>
      <LoadingSkeleton style={{ width: "100%", aspectRatio: "3/4", marginBottom: "8px" }} />
      <LoadingSkeleton style={{ width: "70%", height: "12px", marginBottom: "4px" }} />
      <LoadingSkeleton style={{ width: "40%", height: "10px" }} />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "8px" 
    }}>
      {/* Header */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "2fr 1fr 1fr", 
        gap: "16px",
        padding: "12px 16px",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "var(--radius)"
      }}>
        <LoadingSkeleton style={{ height: "14px" }} />
        <LoadingSkeleton style={{ height: "14px" }} />
        <LoadingSkeleton style={{ height: "14px" }} />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ 
          display: "grid", 
          gridTemplateColumns: "2fr 1fr 1fr", 
          gap: "16px",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)"
        }}>
          <LoadingSkeleton style={{ height: "16px" }} />
          <LoadingSkeleton style={{ height: "16px" }} />
          <LoadingSkeleton style={{ height: "16px" }} />
        </div>
      ))}
    </div>
  );
}
