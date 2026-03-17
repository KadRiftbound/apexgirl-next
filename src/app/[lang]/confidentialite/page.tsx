'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Confidentialite() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  const t = {
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdate: 'Dernière mise à jour : Mars 2026',
      intro: 'La protection de vos données personnelles est importante pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web.',
      collected: {
        title: '1. Données que nous collectons',
        content: 'Nous collectons les données suivantes :',
        items: [
          'Données de navigation (adresse IP, type de navigateur, pages visitées)',
          'Cookies analytiques (Google Analytics)',
          'Données que vous nous fournissez volontairement (formulaire de contact)',
        ],
      },
      use: {
        title: '2. Utilisation de vos données',
        content: 'Vos données sont utilisées pour :',
        items: [
          'Améliorer notre site et votre expérience utilisateur',
          'Analyser les statistiques de visite',
          'Répondre à vos demandes via le formulaire de contact',
          'Afficher des publicités (Google AdSense)',
        ],
      },
      cookies: {
        title: '3. Cookies',
        content: 'Ce site utilise des cookies :',
        items: [
          'Cookies essentiels au fonctionnement du site',
          'Cookies analytiques (Google Analytics) pour comprendre comment le site est utilisé',
          'Cookies publicitaires (Google AdSense) pour diffuser des annonces personnalisées',
        ],
        optout: 'Vous pouvez refuser les cookies en configurant votre navigateur. Notez que cela peut affecter certaines fonctionnalités du site.',
      },
      third: {
        title: '4. Partage des données avec des tiers',
        content: 'Nous partageons certaines données avec des tiers :',
        items: [
          'Google Analytics pour les statistiques de visite',
          'Google AdSense pour la diffusion d\'annonces',
        ],
        note: 'Ces tiers ont leurs propres politiques de confidentialité.',
      },
      security: {
        title: '5. Sécurité',
        content: 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.',
      },
      rights: {
        title: '6. Vos droits',
        content: 'Conformémément au RGPD (Règlement Général sur la Protection des Données), vous avez le droit de :',
        items: [
          'Accéder à vos données personnelles',
          'Rectifier vos données personnelles',
          'Effacer vos données personnelles',
          'Limiter le traitement de vos données',
          'Vous opposer au traitement de vos données',
          'Portabilité de vos données',
        ],
        contact: 'Pour exercer ces droits, contactez-nous à : contact@apexgirlguide.com',
      },
      retention: {
        title: '7. Conservation des données',
        content: 'Les données sont conservées pendant une durée maximale de 13 mois pour les données analytiques. Les données de contact sont supprimées après traitement de votre demande.',
      },
      minors: {
        title: '8. Mineurs',
        content: 'Notre site n\'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas délibérément d\'informations personnelles auprès de mineurs.',
      },
      changes: {
        title: '9. Modifications',
        content: 'Cette politique de confidentialité peut être modifiée à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.',
      },
      contact: {
        title: '10. Contact',
        content: 'Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :',
        email: 'contact@apexgirlguide.com',
      },
    },
    en: {
      title: 'Privacy Policy',
      lastUpdate: 'Last updated: March 2026',
      intro: 'The protection of your personal data is important to us. This privacy policy explains how we collect, use and protect your information when you use our website.',
      collected: {
        title: '1. Data We Collect',
        content: 'We collect the following data:',
        items: [
          'Navigation data (IP address, browser type, pages visited)',
          'Analytics cookies (Google Analytics)',
          'Data you voluntarily provide (contact form)',
        ],
      },
      use: {
        title: '2. Use of Your Data',
        content: 'Your data is used to:',
        items: [
          'Improve our site and your user experience',
          'Analyze visit statistics',
          'Respond to your requests via the contact form',
          'Display advertisements (Google AdSense)',
        ],
      },
      cookies: {
        title: '3. Cookies',
        content: 'This site uses cookies:',
        items: [
          'Essential cookies for site functionality',
          'Analytics cookies (Google Analytics) to understand how the site is used',
          'Advertising cookies (Google AdSense) to deliver personalized ads',
        ],
        optout: 'You can refuse cookies by configuring your browser. Note that this may affect certain features of the site.',
      },
      third: {
        title: '3. Data Sharing with Third Parties',
        content: 'We share some data with third parties:',
        items: [
          'Google Analytics for visit statistics',
          'Google AdSense for ad serving',
        ],
        note: 'These third parties have their own privacy policies.',
      },
      security: {
        title: '5. Security',
        content: 'We implement appropriate security measures to protect your data against unauthorized access, modification, disclosure or destruction.',
      },
      rights: {
        title: '6. Your Rights',
        content: 'In accordance with GDPR (General Data Protection Regulation), you have the right to:',
        items: [
          'Access your personal data',
          'Rectify your personal data',
          'Erase your personal data',
          'Restrict processing of your data',
          'Object to processing of your data',
          'Data portability',
        ],
        contact: 'To exercise these rights, contact us at: contact@apexgirlguide.com',
      },
      retention: {
        title: '7. Data Retention',
        content: 'Data is retained for a maximum of 13 months for analytics data. Contact data is deleted after processing your request.',
      },
      minors: {
        title: '8. Minors',
        content: 'Our site is not intended for children under 13 years of age. We do not knowingly collect personal information from minors.',
      },
      changes: {
        title: '9. Changes',
        content: 'This privacy policy may be modified at any time. Modifications take effect as soon as they are published on the site.',
      },
      contact: {
        title: '10. Contact',
        content: 'For any questions regarding this privacy policy, you can contact us at:',
        email: 'contact@apexgirlguide.com',
      },
    },
  };

  const content = t[lang as keyof typeof t] || t.fr;

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
          fontWeight: 800
        }}>
          {content.title}
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
          {content.lastUpdate}
        </p>

        <div style={{ 
          background: 'rgba(30,30,50,0.9)', 
          borderRadius: '16px', 
          border: '1px solid rgba(139,92,246,0.3)', 
          padding: '32px',
          lineHeight: 1.8
        }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
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
            <Link href={`/${lang}/cookie-settings`} style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '8px 16px',
              background: 'rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
              color: '#a855f7',
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              {lang === 'fr' ? '⚙️ Gérer mes cookies' : '⚙️ Manage my cookies'}
            </Link>
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
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '12px', fontSize: '0.9rem' }}>
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
      </div>
    </>
  );
}
