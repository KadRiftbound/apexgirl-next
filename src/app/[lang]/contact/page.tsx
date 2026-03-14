'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function Contact() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = {
    fr: {
      title: 'Contact',
      subtitle: 'Une question ? N\'hésitez pas à nous contacter !',
      form: {
        name: 'Votre nom',
        email: 'Votre email',
        subject: 'Sujet',
        message: 'Votre message',
        send: 'Envoyer',
        sending: 'Envoi en cours...',
        namePlaceholder: 'Entrez votre nom',
        emailPlaceholder: 'entre@exemple.com',
        subjectPlaceholder: 'Sujet de votre message',
        messagePlaceholder: 'Décrivez votre question ou votre demande...',
      },
      subjects: {
        general: 'Question générale',
        bug: 'Signaler un bug',
        suggestion: 'Suggestion',
        partnership: 'Partenariat',
        other: 'Autre',
      },
      success: 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
      error: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.',
      info: {
        title: 'Informations de contact',
        email: 'Email',
        response: 'Temps de réponse',
        responseTime: 'Généralement sous 48 heures',
        note: 'Nous faisons de notre mieux pour répondre à tous les messages.',
      },
    },
    en: {
      title: 'Contact',
      subtitle: 'Have a question? Feel free to contact us!',
      form: {
        name: 'Your name',
        email: 'Your email',
        subject: 'Subject',
        message: 'Your message',
        send: 'Send',
        sending: 'Sending...',
        namePlaceholder: 'Enter your name',
        emailPlaceholder: 'you@example.com',
        subjectPlaceholder: 'Subject of your message',
        messagePlaceholder: 'Describe your question or request...',
      },
      subjects: {
        general: 'General question',
        bug: 'Report a bug',
        suggestion: 'Suggestion',
        partnership: 'Partnership',
        other: 'Other',
      },
      success: 'Message sent successfully! We will respond as soon as possible.',
      error: 'An error occurred. Please try again or contact us directly by email.',
      info: {
        title: 'Contact Information',
        email: 'Email',
        response: 'Response time',
        responseTime: 'Usually within 48 hours',
        note: 'We do our best to respond to all messages.',
      },
    },
  };

  const content = t[lang as keyof typeof t] || t.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(content.error);
      }
    } catch {
      setError(content.error);
    }
  };

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
          {content.subtitle}
        </p>

        <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Contact Form */}
          <div style={{ 
            background: 'rgba(30,30,50,0.9)', 
            borderRadius: '16px', 
            border: '1px solid rgba(139,92,246,0.3)', 
            padding: '32px'
          }}>
            {submitted ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                <p style={{ color: '#22c55e', fontSize: '1.1rem', fontWeight: 600 }}>
                  {content.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {error && (
                  <div style={{ 
                    padding: '12px 16px', 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontSize: '0.9rem' }}>
                    {content.form.name} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={content.form.namePlaceholder}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontSize: '0.9rem' }}>
                    {content.form.email} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={content.form.emailPlaceholder}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontSize: '0.9rem' }}>
                    {content.form.subject}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" style={{ color: '#888' }}>{content.form.subjectPlaceholder}</option>
                    <option value="general" style={{ color: '#fff' }}>{content.subjects.general}</option>
                    <option value="bug" style={{ color: '#fff' }}>{content.subjects.bug}</option>
                    <option value="suggestion" style={{ color: '#fff' }}>{content.subjects.suggestion}</option>
                    <option value="partnership" style={{ color: '#fff' }}>{content.subjects.partnership}</option>
                    <option value="other" style={{ color: '#fff' }}>{content.subjects.other}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontSize: '0.9rem' }}>
                    {content.form.message} *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={content.form.messagePlaceholder}
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  {content.form.send}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div style={{ 
            background: 'rgba(30,30,50,0.9)', 
            borderRadius: '16px', 
            border: '1px solid rgba(139,92,246,0.3)', 
            padding: '32px'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f472b6', marginBottom: '24px' }}>
              {content.info.title}
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '4px' }}>
                {content.info.email}
              </p>
              <a 
                href="mailto:contact@apexgirlguide.com" 
                style={{ color: '#8b5cf6', fontSize: '1.1rem', fontWeight: 500 }}
              >
                contact@apexgirlguide.com
              </a>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '4px' }}>
                {content.info.response}
              </p>
              <p style={{ color: '#fff', fontSize: '1rem' }}>
                {content.info.responseTime}
              </p>
            </div>

            <div style={{ 
              padding: '16px', 
              background: 'rgba(139,92,246,0.1)', 
              borderRadius: '10px',
              border: '1px solid rgba(139,92,246,0.2)'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                💡 {content.info.note}
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Ce site est un <span style={{ color: '#fbbf24' }}>fansite non officiel</span> de TopGirl/ApexGirl. 
                Nous ne sommes pas affiliés à A3Games ou SuperPrism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
