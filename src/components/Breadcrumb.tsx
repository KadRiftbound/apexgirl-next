"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  lang: string;
}

export function Breadcrumb({ items, lang }: BreadcrumbProps) {
  const pathname = usePathname();
  const baseUrl = "https://apexgirlguide.com";

  const schemaItems = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.label,
    "item": `${baseUrl}${item.href}`,
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href}>
                {!isLast ? (
                  <>
                    <Link href={`/${lang}${item.href}`}>
                      {item.label}
                    </Link>
                    <span className="separator" aria-hidden="true">›</span>
                  </>
                ) : (
                  <span className="current" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <style jsx>{`
        .breadcrumb {
          padding: 12px 0;
          font-size: 0.85rem;
        }
        .breadcrumb ol {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .breadcrumb li {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .breadcrumb a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover {
          color: var(--primary);
        }
        .breadcrumb .separator {
          color: var(--text-dim);
          margin: 0 2px;
        }
        .breadcrumb .current {
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
