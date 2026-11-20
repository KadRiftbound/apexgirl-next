import type { Metadata } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";

export const metadata: Metadata = {
  title: "404 — Page not found | TopGirl Guide",
  description: "This page does not exist. Return to the TopGirl Guide fansite.",
  robots: { index: false, follow: false },
};

// Becomes the static 404.html served by the host for every unknown URL.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <NotFoundPage />
      </body>
    </html>
  );
}
