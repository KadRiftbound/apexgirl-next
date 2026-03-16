"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "fr";
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Reset state when route changes
    setIsOpen(false);
    setIsVisible(true);
    lastScrollY.current = 0;
    
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const currentScrollY = window.scrollY;
      
      // Only on mobile
      if (window.innerWidth <= 900) {
        if (currentScrollY > 120) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navItems = [
    { href: `/${lang}/codes/`, label: lang === "fr" ? "Codes" : "Codes" },
    { href: `/${lang}/artists/`, label: lang === "fr" ? "Artistes" : "Artists" },
    { href: `/${lang}/tierlist/`, label: "Tier List" },
    { href: `/${lang}/guides/`, label: "Guides" },
    { href: `/${lang}/events/`, label: lang === "fr" ? "Événements" : "Events" },
    { href: `/${lang}/tools/`, label: lang === "fr" ? "Outils" : "Tools", cta: true },
  ];

  const languages = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "it", label: "IT" },
    { code: "es", label: "ES" },
    { code: "pt", label: "PT" },
    { code: "pl", label: "PL" },
    { code: "id", label: "ID" },
    { code: "ru", label: "RU" },
  ];

  return (
    <div 
      className="mobile-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999999,
        minHeight: '100vh',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '56px',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Link href={`/${lang}/`} style={{ textDecoration: 'none' }}>
          <img 
            src="/assets/images/logo.png" 
            alt="TopGirlGuide" 
            style={{ height: '40px', width: 'auto', maxWidth: '140px', objectFit: 'contain' }}
          />
        </Link>
        
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #ff4d8d, #8b5cf6)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 2px 10px rgba(255, 77, 141, 0.3)',
            zIndex: 9999999,
            position: 'relative',
            pointerEvents: 'auto'
          }}
        >
          {isOpen ? '✕' : '☰ MENU'}
        </button>
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '56px',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(10, 10, 20, 0.98)',
          zIndex: 9999998,
          padding: '20px',
          overflowY: 'auto',
          pointerEvents: 'auto'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '16px 20px',
                  background: item.cta ? 'linear-gradient(135deg, #ff6b9d, #c44569)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
                {item.label}
              </Link>
            ))}
            
            <div style={{ 
              marginTop: '20px', 
              padding: '16px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '12px' 
            }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px', fontSize: '14px' }}>
                🌐 Language / Langue
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {languages.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.code}/`}
                    onClick={() => setIsOpen(false)}
                    style={{
                      padding: '10px 8px',
                      background: l.code === lang ? 'rgba(255, 107, 157, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                      border: l.code === lang ? '1px solid #ff6b9d' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 500,
                      textAlign: 'center'
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
