import type { Metadata } from "next";
import { simplePageMeta } from "@/lib/seo/simplePageMeta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return simplePageMeta("legal", lang);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
