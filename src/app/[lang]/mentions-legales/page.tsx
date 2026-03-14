'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MentionsLegales() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  const t = {
    fr: {
      title: 'Mentions Légales',
      lastUpdate: 'Dernière mise à jour : Mars 2026',
      intro: 'Le site apexgirlguide.com est un fansite non officiel dédié au jeu TopGirl/ApexGirl. Les informations fournies sur ce site sont données à titre indicatif et ne constituent en aucun cas une offre de services.',
      editor: {
        title: '1. Éditeur du site',
        name: 'Nom / Pseudo :',
        value: 'A3Games',
        email: 'Email :',
        emailValue: 'contact@apexgirlguide.com',
      },
      hosting: {
        title: '2. Hébergement',
        provider: 'Hébergeur :',
        value: 'Vercel Inc.',
        address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
      },
      property: {
        title: '3. Propriété intellectuelle',
        content: 'Tous les contenus présents sur le site apexgirlguide.com (textes, images, logos, graphismes, sons, vidéos, code source) sont protégés par les droits de propriété intellectuelle.',
        content2: 'Ce site est un fansite NON OFFICIEL. Il n\'est pas géré, soutenu, approuvé ou affilié à A3Games, SuperPrism ou tout autre éditeur ou développeur du jeu TopGirl/ApexGirl.',
        content3: 'Toutes les marques commerciales, logos et images appartiennent à leurs propriétaires respectifs. L\'utilisation de ces contenus sur ce site est uniquement destinée à des fins d\'information et de Fansite.',
      },
      liability: {
        title: '4. Limitation de responsabilité',
        content: 'Les informations contenues sur ce site sont aussi précises que possible. Toutefois, apexgirlguide.com ne saurait garantir l\'exactitude, l\'exhaustivité ou l\'actualité des informations diffusées sur son site.',
        content2: 'En aucun cas, apexgirlguide.com ne pourra être tenu responsable des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser ce site, notamment mais non exclusivement :',
        items: [
          'L\'interruption du site ou des services',
          'Des erreurs ou omissions dans les contenus',
          'Des virus ou logiciels malveillants',
          'Des décisions prises sur la base des informations fournies',
        ],
      },
      privacy: {
        title: '5. Protection des données personnelles',
        content: 'Pour connaître notre politique de protection des données personnelles, consultez notre page :',
        link: 'Politique de confidentialité',
      },
      cookies: {
        title: '6. Cookies',
        content: 'Ce site utilise des cookies pour améliorer l\'expérience utilisateur. Les cookies sont de petits fichiers stockés sur votre appareil lorsque vous naviguez sur le site.',
        content2: 'Vous pouvez configurer votre navigateur pour refuser les cookies. Toutefois, cela peut affecter certaines fonctionnalités du site.',
      },
      links: {
        title: '7. Liens hypertextes',
        content: 'Le site peut contenir des liens vers d\'autres sites internet. Nous n\'exerçons aucun contrôle sur ces sites et déclinons toute responsabilité quant à leur contenu.',
      },
      changes: {
        title: '8. Modification des mentions légales',
        content: 'Nous nous réservons le droit de modifier les présentes mentions légales à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.',
      },
      contact: {
        title: '9. Contact',
        content: 'Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l\'adresse :',
      },
    },
    en: {
      title: 'Legal Notice',
      lastUpdate: 'Last updated: March 2026',
      intro: 'The website apexgirlguide.com is an unofficial fansite dedicated to the game TopGirl/ApexGirl. The information provided on this site is for informational purposes only and does not constitute an offer of services.',
      editor: {
        title: '1. Website Editor',
        name: 'Name / Pseudo:',
        value: 'A3Games',
        email: 'Email:',
        emailValue: 'contact@apexgirlguide.com',
      },
      hosting: {
        title: '2. Hosting',
        provider: 'Host:',
        value: 'Vercel Inc.',
        address: '440 N Barranca Ave #4133, Covina, CA 91723, United States',
      },
      property: {
        title: '3. Intellectual Property',
        content: 'All content present on the website apexgirlguide.com (texts, images, logos, graphics, sounds, videos, source code) is protected by intellectual property rights.',
        content2: 'This is an UNOFFICIAL FANSSITE. It is not managed, supported, approved by, or affiliated with A3Games, SuperPrism or any other publisher or developer of the game TopGirl/ApexGirl.',
        content3: 'All trademarks, logos and images belong to their respective owners. The use of this content on this site is solely for informational and fansite purposes.',
      },
      liability: {
        title: '4. Limitation of Liability',
        content: 'The information contained on this site is as accurate as possible. However, apexgirlguide.com cannot guarantee the accuracy, completeness or timeliness of the information disseminated on its site.',
        content2: 'In no event shall apexgirlguide.com be liable for any direct or indirect damages resulting from the use or inability to use this site, including but not limited to:',
        items: [
          'Interruption of the site or services',
          'Errors or omissions in content',
          'Viruses or malware',
          'Decisions made based on information provided',
        ],
      },
      privacy: {
        title: '5. Personal Data Protection',
        content: 'To learn about our personal data protection policy, see our page:',
        link: 'Privacy Policy',
      },
      cookies: {
        title: '6. Cookies',
        content: 'This site uses cookies to improve the user experience. Cookies are small files stored on your device when browsing the site.',
        content2: 'You can configure your browser to refuse cookies. However, this may affect certain features of the site.',
      },
      links: {
        title: '7. Hyperlinks',
        content: 'The site may contain links to other websites. We exercise no control over these sites and accept no responsibility for their content.',
      },
      changes: {
        title: '8. Modification of Legal Notice',
        content: 'We reserve the right to modify this legal notice at any time. Modifications take effect as soon as they are published on the site.',
      },
      contact: {
        title: '9. Contact',
        content: 'For any questions regarding this legal notice, you can contact us at:',
      },
    },
  };

  const content = t[lang as keyof typeof t] || t.fr;

  return (
    <>
      <Head>
        <title>{content.title} - TopGirl</title>
      </Head>

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
              {content.editor.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.editor.name} {content.editor.value}<br />
              {content.editor.email} <a href="mailto:contact@apexgirlguide.com" style={{ color: '#8b5cf6' }}>{content.editor.emailValue}</a>
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.hosting.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.hosting.provider} {content.hosting.value}<br />
              {content.hosting.address}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.property.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.property.content}
            </p>
            <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 500 }}>
              {content.property.content2}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.property.content3}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.liability.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.liability.content}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.liability.content2}
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px' }}>
              {content.liability.items.map((item: string, i: number) => (
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
              <Link href={`/${lang}/confidentialite`} style={{ color: '#8b5cf6', textDecoration: 'underline' }}>
                {content.privacy.link}
              </Link>
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.cookies.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              {content.cookies.content}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.cookies.content2}
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '16px' }}>
              {content.links.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              {content.links.content}
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
                contact@apexgirlguide.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
