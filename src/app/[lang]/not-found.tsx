import type { Metadata } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";

export const metadata: Metadata = {
  title: "404 — Page not found | TopGirl Guide",
  description: "This page does not exist. Return to the TopGirl Guide fansite.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}
