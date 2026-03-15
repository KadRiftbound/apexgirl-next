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
      required: 'Veuillez remplir tous les champs obligatoires.',
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
      required: 'Please fill in all required fields.',
    },
    it: {
      title: 'Contatto',
      subtitle: 'Hai una domanda? Contattaci liberamente!',
      form: {
        name: 'Il tuo nome',
        email: 'La tua email',
        subject: 'Oggetto',
        message: 'Il tuo messaggio',
        send: 'Invia',
        sending: 'Invio in corso...',
        namePlaceholder: 'Inserisci il tuo nome',
        emailPlaceholder: 'tu@esempio.com',
        subjectPlaceholder: 'Oggetto del messaggio',
        messagePlaceholder: 'Descrivi la tua domanda o richiesta...',
      },
      subjects: {
        general: 'Domanda generale',
        bug: 'Segnala un bug',
        suggestion: 'Suggerimento',
        partnership: 'Partnership',
        other: 'Altro',
      },
      success: 'Messaggio inviato con successo! Risponderemo al più presto.',
      error: 'Si è verificato un errore. Riprova o contattaci direttamente via email.',
      info: {
        title: 'Informazioni di contatto',
        email: 'Email',
        response: 'Tempo di risposta',
        responseTime: 'Di solito entro 48 ore',
        note: 'Facciamo del nostro meglio per rispondere a tutti i messaggi.',
      },
      required: 'Per favore compila tutti i campi richiesti.',
    },
    es: {
      title: 'Contacto',
      subtitle: '¿Tienes una pregunta? ¡No dudes en contactarnos!',
      form: {
        name: 'Tu nombre',
        email: 'Tu email',
        subject: 'Asunto',
        message: 'Tu mensaje',
        send: 'Enviar',
        sending: 'Enviando...',
        namePlaceholder: 'Ingresa tu nombre',
        emailPlaceholder: 'tu@ejemplo.com',
        subjectPlaceholder: 'Asunto de tu mensaje',
        messagePlaceholder: 'Describe tu pregunta o solicitud...',
      },
      subjects: {
        general: 'Pregunta general',
        bug: 'Reportar un error',
        suggestion: 'Sugerencia',
        partnership: 'Asociación',
        other: 'Otro',
      },
      success: '¡Mensaje enviado con éxito! Responderemos lo antes posible.',
      error: 'Se produjo un error. Inténtalo de nuevo o contáctanos directamente por correo electrónico.',
      info: {
        title: 'Información de contacto',
        email: 'Correo electrónico',
        response: 'Tiempo de respuesta',
        responseTime: 'Generalmente dentro de 48 horas',
        note: 'Hacemos nuestro mejor esfuerzo para responder a todos los mensajes.',
      },
      required: 'Por favor completa todos los campos requeridos.',
    },
    pt: {
      title: 'Contato',
      subtitle: 'Tem uma questão? Não hesite em nos contatar!',
      form: {
        name: 'Seu nome',
        email: 'Seu email',
        subject: 'Assunto',
        message: 'Sua mensagem',
        send: 'Enviar',
        sending: 'Enviando...',
        namePlaceholder: 'Digite seu nome',
        emailPlaceholder: 'voce@exemplo.com',
        subjectPlaceholder: 'Assunto da sua mensagem',
        messagePlaceholder: 'Descreva sua pergunta ou solicitação...',
      },
      subjects: {
        general: 'Pergunta geral',
        bug: 'Reportar um erro',
        suggestion: 'Sugestão',
        partnership: 'Parceria',
        other: 'Outro',
      },
      success: 'Mensagem enviada com sucesso! Responderemos o mais breve possível.',
      error: 'Ocorreu um erro. Tente novamente ou entre em contato diretamente por e-mail.',
      info: {
        title: 'Informações de contato',
        email: 'E-mail',
        response: 'Tempo de resposta',
        responseTime: 'Geralmente dentro de 48 horas',
        note: 'Fazemos o nosso melhor para responder a todas as mensagens.',
      },
      required: 'Por favor preencha todos os campos obrigatórios.',
    },
    pl: {
      title: 'Kontakt',
      subtitle: 'Masz pytanie? Skontaktuj się z nami!',
      form: {
        name: 'Twoje imię',
        email: 'Twój email',
        subject: 'Temat',
        message: 'Twoja wiadomość',
        send: 'Wyślij',
        sending: 'Wysyłanie...',
        namePlaceholder: 'Wpisz swoje imię',
        emailPlaceholder: 'ty@przyklad.com',
        subjectPlaceholder: 'Temat wiadomości',
        messagePlaceholder: 'Opisz swoje pytanie lub prośbę...',
      },
      subjects: {
        general: 'Ogólne pytanie',
        bug: 'Zgłoś błąd',
        suggestion: 'Sugestia',
        partnership: 'Partnerstwo',
        other: 'Inne',
      },
      success: 'Wiadomość wysłana pomyślnie! Odpowiemy najszybciej jak to możliwe.',
      error: 'Wystąpił błąd. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio przez e-mail.',
      info: {
        title: 'Informacje kontaktowe',
        email: 'E-mail',
        response: 'Czas odpowiedzi',
        responseTime: 'Zwykle w ciągu 48 godzin',
        note: 'Robimy wszystko, co w naszej mocy, aby odpowiedzieć na wszystkie wiadomości.',
      },
      required: 'Proszę wypełnić wszystkie wymagane pola.',
    },
    id: {
      title: 'Kontak',
      subtitle: 'Punya pertanyaan? Jangan ragu untuk menghubungi kami!',
      form: {
        name: 'Nama Anda',
        email: 'Email Anda',
        subject: 'Subjek',
        message: 'Pesan Anda',
        send: 'Kirim',
        sending: 'Mengirim...',
        namePlaceholder: 'Masukkan nama Anda',
        emailPlaceholder: 'anda@contoh.com',
        subjectPlaceholder: 'Subjek pesan Anda',
        messagePlaceholder: 'Jelaskan pertanyaan atau permintaan Anda...',
      },
      subjects: {
        general: 'Pertanyaan umum',
        bug: 'Laporkan bug',
        suggestion: 'Saran',
        partnership: 'Kemitraan',
        other: 'Lainnya',
      },
      success: 'Pesan berhasil dikirim! Kami akan segera merespons.',
      error: 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung melalui email.',
      info: {
        title: 'Informasi kontak',
        email: 'Email',
        response: 'Waktu respons',
        responseTime: 'Biasanya dalam 48 jam',
        note: 'Kami melakukan yang terbaik untuk merespons semua pesan.',
      },
      required: 'Silakan isi semua kolom yang wajib diisi.',
    },
    ru: {
      title: 'Контакт',
      subtitle: 'Есть вопрос? Свяжитесь с нами!',
      form: {
        name: 'Ваше имя',
        email: 'Ваш email',
        subject: 'Тема',
        message: 'Ваше сообщение',
        send: 'Отправить',
        sending: 'Отправка...',
        namePlaceholder: 'Введите ваше имя',
        emailPlaceholder: 'vy@primer.com',
        subjectPlaceholder: 'Тема сообщения',
        messagePlaceholder: 'Опишите ваш вопрос или просьбу...',
      },
      subjects: {
        general: 'Общий вопрос',
        bug: 'Сообщить об ошибке',
        suggestion: 'Предложение',
        partnership: 'Партнёрство',
        other: 'Другое',
      },
      success: 'Сообщение успешно отправлено! Мы ответим как можно скорее.',
      error: 'Произошла ошибка. Попробуйте again или свяжитесь с нами напрямую по электронной почте.',
      info: {
        title: 'Контактная информация',
        email: 'Эл. почта',
        response: 'Время ответа',
        responseTime: 'Обычно в течение 48 часов',
        note: 'Мы делаем всё возможное, чтобы ответить на все сообщения.',
      },
      required: 'Пожалуйста, заполните все обязательные поля.',
    },
  };

  const content = t[lang as keyof typeof t] || t.fr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.message) {
      setError(content.required);
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
                  <label htmlFor="name" style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: "6px", fontSize: "0.9rem" }}>
                    {content.form.name} *
                  </label>
                  <input
                    id="name"
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
                  <label htmlFor="email" style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: "6px", fontSize: "0.9rem" }}>
                    {content.form.email} *
                  </label>
                  <input
                    id="email"
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
                  <label htmlFor="subject" style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: "6px", fontSize: "0.9rem" }}>
                    {content.form.subject}
                  </label>
                  <select
                    id="subject"
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
                  <label htmlFor="message" style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: "6px", fontSize: "0.9rem" }}>
                    {content.form.message} *
                  </label>
                  <textarea
                    id="message"
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
