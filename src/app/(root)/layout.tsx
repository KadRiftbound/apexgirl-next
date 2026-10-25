// Minimal root layout for the bare "/" fallback page only; every real page lives under /[lang]/.
export default function RootFallbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
