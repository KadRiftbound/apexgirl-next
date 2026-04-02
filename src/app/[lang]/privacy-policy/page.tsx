import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getPrivacyContent } from '@/lib/i18n/privacy';

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (lang === 'fr') {
    redirect('/fr/confidentialite/');
  }

  const content = getPrivacyContent(lang);

  return (
    <>
      <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #f472b6, #c084fc, #818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: 800,
        }}>
          {content.title}
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>
          {content.lastUpdate}
        </p>

        <div style={{
          background: 'rgba(30,30,50,0.8)',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
            {content.intro}
          </p>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.collected.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.collected.content}
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
              {content.collected.items.map((item: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.use.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.use.content}
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
              {content.use.items.map((item: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.cookies.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.cookies.content}
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
              {content.cookies.items.map((item: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
              {content.cookies.optout}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.third.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.third.content}
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
              {content.third.items.map((item: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
              {content.third.note}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.security.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.security.content}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.rights.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.rights.content}
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
              {content.rights.items.map((item: string, i: number) => (
                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '12px' }}>
              {content.rights.contact}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.retention.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.retention.content}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.minors.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.minors.content}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.changes.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.changes.content}
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.contact.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.contact.content}{' '}
              <a href="mailto:contact@apexgirlguide.com" style={{ color: '#8b5cf6' }}>
                {content.contact.email}
              </a>
            </p>
          </section>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href={`/${lang}/`} style={{ color: '#8b5cf6', fontWeight: 600, textDecoration: 'none' }}>
            ← {content.backToSite}
          </Link>
        </div>
      </div>
    </>
  );
}
