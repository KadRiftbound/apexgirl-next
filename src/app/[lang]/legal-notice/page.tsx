import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getLegalNoticeContent } from '@/lib/i18n/legalNotice';

export default async function LegalNotice({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (lang === 'fr') {
    redirect('/fr/mentions-legales/');
  }

  const content = getLegalNoticeContent(lang);

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
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
            {content.editor.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            <strong>{content.editor.name}</strong> {content.editor.value}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            {content.editor.desc}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            <strong>{content.editor.email}</strong> {content.editor.emailValue}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.hosting.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            <strong>{content.hosting.provider}</strong> {content.hosting.value}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.hosting.address}</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.property.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.property.content}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.property.content2}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.property.content3}</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.liability.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>{content.liability.content}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>{content.liability.content2}</p>
          <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
            {content.liability.items.map((item, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.privacy.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            {content.privacy.content}{' '}
            <Link href={lang === 'fr' ? '/fr/confidentialite/' : `/${lang}/privacy-policy/`} style={{ color: '#8b5cf6' }}>{content.privacy.link}</Link>
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.cookies.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.cookies.content}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.cookies.content2}</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.links.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.links.content}</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.changes.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.changes.content}</p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
            {content.contact.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{content.contact.content}</p>
        </section>
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Link href={`/${lang}/`} style={{ color: '#8b5cf6', fontWeight: 600, textDecoration: 'none' }}>
          ← {content.backToSite}
        </Link>
      </div>
    </div>
  );
}
