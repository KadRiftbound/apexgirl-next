export type PrivacyContent = {
  title: string;
  lastUpdate: string;
  backToSite: string;
  intro: string;
  collected: { title: string; content: string; items: string[] };
  use: { title: string; content: string; items: string[] };
  cookies: { title: string; content: string; items: string[]; optout: string };
  third: { title: string; content: string; items: string[]; note: string };
  security: { title: string; content: string };
  rights: { title: string; content: string; items: string[]; contact: string };
  retention: { title: string; content: string };
  minors: { title: string; content: string };
  changes: { title: string; content: string };
  contact: { title: string; content: string; email: string };
};

export const privacyContent: Record<string, PrivacyContent> = {
  fr: {
    title: "Politique de Confidentialité",
    lastUpdate: "Dernière mise à jour : Mars 2026",
    backToSite: "Retour au site",
    intro: "La protection de vos données personnelles est importante pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web.",
    collected: {
      title: "1. Données que nous collectons",
      content: "Nous collectons les données suivantes :",
      items: [
        "Données de navigation (adresse IP, type de navigateur, pages visitées)",
        "Cookies analytiques (Google Analytics)",
        "Données que vous nous fournissez volontairement (formulaire de contact)",
      ],
    },
    use: {
      title: "2. Utilisation de vos données",
      content: "Vos données sont utilisées pour :",
      items: [
        "Améliorer notre site et votre expérience utilisateur",
        "Analyser les statistiques de visite",
        "Répondre à vos demandes via le formulaire de contact",
        "Afficher des publicités (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "Ce site utilise des cookies :",
      items: [
        "Cookies essentiels au fonctionnement du site",
        "Cookies analytiques (Google Analytics) pour comprendre comment le site est utilisé",
        "Cookies publicitaires (Google AdSense) pour diffuser des annonces personnalisées",
      ],
      optout: "Vous pouvez refuser les cookies en configurant votre navigateur. Notez que cela peut affecter certaines fonctionnalités du site.",
    },
    third: {
      title: "4. Partage des données avec des tiers",
      content: "Nous partageons certaines données avec des tiers :",
      items: [
        "Google Analytics pour les statistiques de visite",
        "Google AdSense pour la diffusion d'annonces",
      ],
      note: "Ces tiers ont leurs propres politiques de confidentialité.",
    },
    security: {
      title: "5. Sécurité",
      content: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.",
    },
    rights: {
      title: "6. Vos droits",
      content: "Conformémément au RGPD (Règlement Général sur la Protection des Données), vous avez le droit de :",
      items: [
        "Accéder à vos données personnelles",
        "Rectifier vos données personnelles",
        "Effacer vos données personnelles",
        "Limiter le traitement de vos données",
        "Vous opposer au traitement de vos données",
        "Portabilité de vos données",
      ],
      contact: "Pour exercer ces droits, contactez-nous à : contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Conservation des données",
      content: "Les données sont conservées pendant une durée maximale de 13 mois pour les données analytiques. Les données de contact sont supprimées après traitement de votre demande.",
    },
    minors: {
      title: "8. Mineurs",
      content: "Notre site n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas délibérément d'informations personnelles auprès de mineurs.",
    },
    changes: {
      title: "9. Modifications",
      content: "Cette politique de confidentialité peut être modifiée à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
    },
    contact: {
      title: "10. Contact",
      content: "Pour toute question concernant cette politique, contactez-nous à :",
      email: "contact@apexgirlguide.com",
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdate: "Last updated: March 2026",
    backToSite: "Back to site",
    intro: "Protecting your personal data is important to us. This privacy policy explains how we collect, use, and protect your information when you use our website.",
    collected: {
      title: "1. Data we collect",
      content: "We collect the following data:",
      items: [
        "Browsing data (IP address, browser type, visited pages)",
        "Analytics cookies (Google Analytics)",
        "Data you provide voluntarily (contact form)",
      ],
    },
    use: {
      title: "2. How we use your data",
      content: "Your data is used to:",
      items: [
        "Improve our site and user experience",
        "Analyze visit statistics",
        "Reply to your requests through the contact form",
        "Display ads (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "This site uses cookies:",
      items: [
        "Essential cookies required for site functionality",
        "Analytics cookies (Google Analytics) to understand site usage",
        "Advertising cookies (Google AdSense) to show personalized ads",
      ],
      optout: "You can refuse cookies in your browser settings. This may affect some site features.",
    },
    third: {
      title: "4. Data sharing with third parties",
      content: "We share certain data with third parties:",
      items: [
        "Google Analytics for visit statistics",
        "Google AdSense for ad delivery",
      ],
      note: "These third parties have their own privacy policies.",
    },
    security: {
      title: "5. Security",
      content: "We implement appropriate security measures to protect your data against unauthorized access, modification, disclosure, or destruction.",
    },
    rights: {
      title: "6. Your rights",
      content: "In accordance with GDPR, you have the right to:",
      items: [
        "Access your personal data",
        "Correct your personal data",
        "Delete your personal data",
        "Limit processing of your data",
        "Object to data processing",
        "Data portability",
      ],
      contact: "To exercise these rights, contact us at: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Data retention",
      content: "Analytics data is retained for up to 13 months. Contact form data is deleted after your request is processed.",
    },
    minors: {
      title: "8. Minors",
      content: "Our site is not intended for children under 13. We do not knowingly collect personal data from minors.",
    },
    changes: {
      title: "9. Changes",
      content: "This privacy policy may be updated at any time. Changes take effect once published on the site.",
    },
    contact: {
      title: "10. Contact",
      content: "For questions about this policy, contact us at:",
      email: "contact@apexgirlguide.com",
    },
  },
  it: {
    title: "Informativa sulla Privacy",
    lastUpdate: "Ultimo aggiornamento: Marzo 2026",
    backToSite: "Torna al sito",
    intro: "La protezione dei tuoi dati personali è importante per noi. Questa informativa spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni quando usi il nostro sito web.",
    collected: {
      title: "1. Dati che raccogliamo",
      content: "Raccogliamo i seguenti dati:",
      items: [
        "Dati di navigazione (indirizzo IP, tipo di browser, pagine visitate)",
        "Cookie analitici (Google Analytics)",
        "Dati forniti volontariamente (modulo di contatto)",
      ],
    },
    use: {
      title: "2. Utilizzo dei dati",
      content: "I tuoi dati sono utilizzati per:",
      items: [
        "Migliorare il sito e l'esperienza utente",
        "Analizzare le statistiche di visita",
        "Rispondere alle richieste tramite il modulo di contatto",
        "Mostrare annunci (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookie",
      content: "Questo sito usa cookie:",
      items: [
        "Cookie essenziali per il funzionamento del sito",
        "Cookie analitici (Google Analytics) per capire l'uso del sito",
        "Cookie pubblicitari (Google AdSense) per annunci personalizzati",
      ],
      optout: "Puoi rifiutare i cookie dalle impostazioni del browser. Ciò può limitare alcune funzioni del sito.",
    },
    third: {
      title: "4. Condivisione con terze parti",
      content: "Condividiamo alcuni dati con terze parti:",
      items: [
        "Google Analytics per le statistiche di visita",
        "Google AdSense per la pubblicità",
      ],
      note: "Queste parti hanno le proprie informative sulla privacy.",
    },
    security: {
      title: "5. Sicurezza",
      content: "Adottiamo misure di sicurezza adeguate per proteggere i dati da accessi non autorizzati, modifiche, divulgazioni o distruzioni.",
    },
    rights: {
      title: "6. I tuoi diritti",
      content: "In base al GDPR, hai il diritto di:",
      items: [
        "Accedere ai tuoi dati personali",
        "Rettificare i tuoi dati personali",
        "Cancellare i tuoi dati personali",
        "Limitare il trattamento dei dati",
        "Opporsi al trattamento dei dati",
        "Portabilità dei dati",
      ],
      contact: "Per esercitare questi diritti, contattaci a: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Conservazione dei dati",
      content: "I dati analitici sono conservati fino a 13 mesi. I dati del contatto sono eliminati dopo la gestione della richiesta.",
    },
    minors: {
      title: "8. Minori",
      content: "Il sito non è destinato a minori di 13 anni. Non raccogliamo consapevolmente dati personali da minori.",
    },
    changes: {
      title: "9. Modifiche",
      content: "Questa informativa può essere aggiornata in qualsiasi momento. Le modifiche sono efficaci dalla pubblicazione sul sito.",
    },
    contact: {
      title: "10. Contatto",
      content: "Per domande su questa informativa, contattaci a:",
      email: "contact@apexgirlguide.com",
    },
  },
  es: {
    title: "Política de Privacidad",
    lastUpdate: "Última actualización: Marzo 2026",
    backToSite: "Volver al sitio",
    intro: "La protección de tus datos personales es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando usas nuestro sitio web.",
    collected: {
      title: "1. Datos que recopilamos",
      content: "Recopilamos los siguientes datos:",
      items: [
        "Datos de navegación (dirección IP, tipo de navegador, páginas visitadas)",
        "Cookies analíticas (Google Analytics)",
        "Datos que proporcionas voluntariamente (formulario de contacto)",
      ],
    },
    use: {
      title: "2. Uso de los datos",
      content: "Tus datos se usan para:",
      items: [
        "Mejorar el sitio y la experiencia de usuario",
        "Analizar estadísticas de visitas",
        "Responder solicitudes mediante el formulario de contacto",
        "Mostrar anuncios (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "Este sitio usa cookies:",
      items: [
        "Cookies esenciales para el funcionamiento del sitio",
        "Cookies analíticas (Google Analytics) para entender el uso del sitio",
        "Cookies publicitarias (Google AdSense) para anuncios personalizados",
      ],
      optout: "Puedes rechazar cookies en la configuración del navegador. Esto puede afectar algunas funciones.",
    },
    third: {
      title: "4. Compartición con terceros",
      content: "Compartimos ciertos datos con terceros:",
      items: [
        "Google Analytics para estadísticas de visitas",
        "Google AdSense para publicidad",
      ],
      note: "Estos terceros tienen sus propias políticas de privacidad.",
    },
    security: {
      title: "5. Seguridad",
      content: "Aplicamos medidas de seguridad adecuadas para proteger tus datos contra accesos no autorizados, modificaciones, divulgación o destrucción.",
    },
    rights: {
      title: "6. Tus derechos",
      content: "De acuerdo con el RGPD, tienes derecho a:",
      items: [
        "Acceder a tus datos personales",
        "Rectificar tus datos personales",
        "Eliminar tus datos personales",
        "Limitar el tratamiento de datos",
        "Oponerte al tratamiento de datos",
        "Portabilidad de datos",
      ],
      contact: "Para ejercer estos derechos, contáctanos en: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Conservación de datos",
      content: "Los datos analíticos se conservan hasta 13 meses. Los datos del contacto se eliminan tras procesar la solicitud.",
    },
    minors: {
      title: "8. Menores",
      content: "Este sitio no está destinado a menores de 13 años. No recopilamos datos personales de menores a sabiendas.",
    },
    changes: {
      title: "9. Cambios",
      content: "Esta política puede actualizarse en cualquier momento. Los cambios son efectivos al publicarse en el sitio.",
    },
    contact: {
      title: "10. Contacto",
      content: "Para preguntas sobre esta política, contáctanos en:",
      email: "contact@apexgirlguide.com",
    },
  },
  pt: {
    title: "Política de Privacidade",
    lastUpdate: "Última atualização: Março 2026",
    backToSite: "Voltar ao site",
    intro: "A proteção dos seus dados pessoais é importante para nós. Esta política explica como coletamos, usamos e protegemos suas informações quando você usa nosso site.",
    collected: {
      title: "1. Dados que coletamos",
      content: "Coletamos os seguintes dados:",
      items: [
        "Dados de navegação (endereço IP, tipo de navegador, páginas visitadas)",
        "Cookies analíticos (Google Analytics)",
        "Dados fornecidos voluntariamente (formulário de contato)",
      ],
    },
    use: {
      title: "2. Uso dos dados",
      content: "Seus dados são usados para:",
      items: [
        "Melhorar o site e a experiência do usuário",
        "Analisar estatísticas de visitas",
        "Responder solicitações pelo formulário de contato",
        "Exibir anúncios (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "Este site usa cookies:",
      items: [
        "Cookies essenciais para o funcionamento do site",
        "Cookies analíticos (Google Analytics) para entender o uso do site",
        "Cookies de publicidade (Google AdSense) para anúncios personalizados",
      ],
      optout: "Você pode recusar cookies nas configurações do navegador. Isso pode afetar algumas funções do site.",
    },
    third: {
      title: "4. Compartilhamento com terceiros",
      content: "Compartilhamos certos dados com terceiros:",
      items: [
        "Google Analytics para estatísticas de visitas",
        "Google AdSense para publicidade",
      ],
      note: "Esses terceiros têm suas próprias políticas de privacidade.",
    },
    security: {
      title: "5. Segurança",
      content: "Aplicamos medidas de segurança adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.",
    },
    rights: {
      title: "6. Seus direitos",
      content: "De acordo com o GDPR, você tem direito a:",
      items: [
        "Acessar seus dados pessoais",
        "Corrigir seus dados pessoais",
        "Excluir seus dados pessoais",
        "Limitar o tratamento de dados",
        "Opor-se ao tratamento de dados",
        "Portabilidade de dados",
      ],
      contact: "Para exercer esses direitos, entre em contato: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Retenção de dados",
      content: "Os dados analíticos são mantidos por até 13 meses. Os dados do contato são excluídos após o processamento.",
    },
    minors: {
      title: "8. Menores",
      content: "Este site não é destinado a menores de 13 anos. Não coletamos dados pessoais de menores de forma consciente.",
    },
    changes: {
      title: "9. Alterações",
      content: "Esta política pode ser atualizada a qualquer momento. As alterações entram em vigor quando publicadas no site.",
    },
    contact: {
      title: "10. Contato",
      content: "Para dúvidas sobre esta política, contate:",
      email: "contact@apexgirlguide.com",
    },
  },
  pl: {
    title: "Polityka Prywatności",
    lastUpdate: "Ostatnia aktualizacja: Marzec 2026",
    backToSite: "Wróć do strony",
    intro: "Ochrona danych osobowych jest dla nas ważna. Ta polityka wyjaśnia, jak zbieramy, używamy i chronimy informacje podczas korzystania z naszej strony.",
    collected: {
      title: "1. Dane, które zbieramy",
      content: "Zbieramy następujące dane:",
      items: [
        "Dane przeglądania (adres IP, typ przeglądarki, odwiedzone strony)",
        "Pliki cookie analityczne (Google Analytics)",
        "Dane podane dobrowolnie (formularz kontaktowy)",
      ],
    },
    use: {
      title: "2. Wykorzystanie danych",
      content: "Twoje dane są używane do:",
      items: [
        "Poprawy strony i doświadczenia użytkownika",
        "Analizy statystyk odwiedzin",
        "Odpowiadania na prośby przez formularz kontaktowy",
        "Wyświetlania reklam (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "Ta strona używa cookies:",
      items: [
        "Cookies niezbędnych do działania strony",
        "Cookies analitycznych (Google Analytics) do analizy użycia",
        "Cookies reklamowych (Google AdSense) dla spersonalizowanych reklam",
      ],
      optout: "Możesz odrzucić cookies w ustawieniach przeglądarki. Może to ograniczyć niektóre funkcje strony.",
    },
    third: {
      title: "4. Udostępnianie danych stronom trzecim",
      content: "Udostępniamy pewne dane stronom trzecim:",
      items: [
        "Google Analytics do statystyk odwiedzin",
        "Google AdSense do reklam",
      ],
      note: "Te strony mają własne polityki prywatności.",
    },
    security: {
      title: "5. Bezpieczeństwo",
      content: "Stosujemy odpowiednie środki bezpieczeństwa, aby chronić dane przed nieautoryzowanym dostępem, zmianą, ujawnieniem lub zniszczeniem.",
    },
    rights: {
      title: "6. Twoje prawa",
      content: "Zgodnie z RODO masz prawo do:",
      items: [
        "Dostępu do danych osobowych",
        "Sprostowania danych osobowych",
        "Usunięcia danych osobowych",
        "Ograniczenia przetwarzania danych",
        "Sprzeciwu wobec przetwarzania danych",
        "Przenoszenia danych",
      ],
      contact: "Aby skorzystać z tych praw, skontaktuj się: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Przechowywanie danych",
      content: "Dane analityczne przechowujemy do 13 miesięcy. Dane z formularza kontaktowego są usuwane po zakończeniu obsługi.",
    },
    minors: {
      title: "8. Małoletni",
      content: "Strona nie jest przeznaczona dla dzieci poniżej 13 lat. Nie zbieramy świadomie danych osobowych od małoletnich.",
    },
    changes: {
      title: "9. Zmiany",
      content: "Ta polityka może być aktualizowana w dowolnym momencie. Zmiany obowiązują od momentu publikacji na stronie.",
    },
    contact: {
      title: "10. Kontakt",
      content: "W sprawach dotyczących tej polityki skontaktuj się:",
      email: "contact@apexgirlguide.com",
    },
  },
  id: {
    title: "Kebijakan Privasi",
    lastUpdate: "Pembaruan terakhir: Maret 2026",
    backToSite: "Kembali ke situs",
    intro: "Perlindungan data pribadi Anda penting bagi kami. Kebijakan ini menjelaskan cara kami mengumpulkan, menggunakan, dan melindungi informasi saat Anda menggunakan situs kami.",
    collected: {
      title: "1. Data yang kami kumpulkan",
      content: "Kami mengumpulkan data berikut:",
      items: [
        "Data penjelajahan (alamat IP, jenis browser, halaman yang dikunjungi)",
        "Cookie analitik (Google Analytics)",
        "Data yang Anda berikan secara sukarela (formulir kontak)",
      ],
    },
    use: {
      title: "2. Penggunaan data",
      content: "Data Anda digunakan untuk:",
      items: [
        "Meningkatkan situs dan pengalaman pengguna",
        "Menganalisis statistik kunjungan",
        "Menjawab permintaan melalui formulir kontak",
        "Menampilkan iklan (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "Situs ini menggunakan cookie:",
      items: [
        "Cookie penting untuk fungsi situs",
        "Cookie analitik (Google Analytics) untuk memahami penggunaan",
        "Cookie iklan (Google AdSense) untuk iklan yang dipersonalisasi",
      ],
      optout: "Anda dapat menolak cookie di pengaturan browser. Ini dapat memengaruhi beberapa fitur situs.",
    },
    third: {
      title: "4. Berbagi data dengan pihak ketiga",
      content: "Kami membagikan data tertentu kepada pihak ketiga:",
      items: [
        "Google Analytics untuk statistik kunjungan",
        "Google AdSense untuk penayangan iklan",
      ],
      note: "Pihak ketiga tersebut memiliki kebijakan privasi sendiri.",
    },
    security: {
      title: "5. Keamanan",
      content: "Kami menerapkan langkah keamanan yang sesuai untuk melindungi data dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah.",
    },
    rights: {
      title: "6. Hak Anda",
      content: "Sesuai GDPR, Anda berhak untuk:",
      items: [
        "Mengakses data pribadi",
        "Memperbaiki data pribadi",
        "Menghapus data pribadi",
        "Membatasi pemrosesan data",
        "Menolak pemrosesan data",
        "Portabilitas data",
      ],
      contact: "Untuk menggunakan hak ini, hubungi: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Penyimpanan data",
      content: "Data analitik disimpan hingga 13 bulan. Data kontak dihapus setelah permintaan diproses.",
    },
    minors: {
      title: "8. Anak di bawah umur",
      content: "Situs ini tidak ditujukan untuk anak di bawah 13 tahun. Kami tidak dengan sengaja mengumpulkan data pribadi dari anak di bawah umur.",
    },
    changes: {
      title: "9. Perubahan",
      content: "Kebijakan ini dapat diperbarui kapan saja. Perubahan berlaku setelah dipublikasikan di situs.",
    },
    contact: {
      title: "10. Kontak",
      content: "Untuk pertanyaan tentang kebijakan ini, hubungi:",
      email: "contact@apexgirlguide.com",
    },
  },
  ru: {
    title: "Политика конфиденциальности",
    lastUpdate: "Последнее обновление: Март 2026",
    backToSite: "Назад на сайт",
    intro: "Защита ваших персональных данных важна для нас. Эта политика объясняет, как мы собираем, используем и защищаем информацию при использовании сайта.",
    collected: {
      title: "1. Какие данные мы собираем",
      content: "Мы собираем следующие данные:",
      items: [
        "Данные о посещениях (IP-адрес, тип браузера, просмотренные страницы)",
        "Аналитические cookies (Google Analytics)",
        "Данные, предоставленные добровольно (форма контакта)",
      ],
    },
    use: {
      title: "2. Использование данных",
      content: "Ваши данные используются для:",
      items: [
        "Улучшения сайта и пользовательского опыта",
        "Анализа статистики посещений",
        "Ответов на запросы через форму контакта",
        "Показа рекламы (Google AdSense)",
      ],
    },
    cookies: {
      title: "3. Cookies",
      content: "Сайт использует cookies:",
      items: [
        "Необходимые cookies для работы сайта",
        "Аналитические cookies (Google Analytics) для анализа использования",
        "Рекламные cookies (Google AdSense) для персонализированной рекламы",
      ],
      optout: "Вы можете отказаться от cookies в настройках браузера. Это может повлиять на работу некоторых функций сайта.",
    },
    third: {
      title: "4. Передача данных третьим лицам",
      content: "Мы передаем некоторые данные третьим лицам:",
      items: [
        "Google Analytics для статистики посещений",
        "Google AdSense для показа рекламы",
      ],
      note: "У этих сторон есть свои политики конфиденциальности.",
    },
    security: {
      title: "5. Безопасность",
      content: "Мы применяем меры безопасности для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.",
    },
    rights: {
      title: "6. Ваши права",
      content: "Согласно GDPR, вы имеете право:",
      items: [
        "Получать доступ к персональным данным",
        "Исправлять персональные данные",
        "Удалять персональные данные",
        "Ограничивать обработку данных",
        "Возражать против обработки данных",
        "Переносимость данных",
      ],
      contact: "Чтобы воспользоваться правами, пишите: contact@apexgirlguide.com",
    },
    retention: {
      title: "7. Срок хранения данных",
      content: "Аналитические данные хранятся до 13 месяцев. Данные формы контакта удаляются после обработки запроса.",
    },
    minors: {
      title: "8. Несовершеннолетние",
      content: "Сайт не предназначен для детей младше 13 лет. Мы не собираем данные несовершеннолетних сознательно.",
    },
    changes: {
      title: "9. Изменения",
      content: "Политика может обновляться в любое время. Изменения вступают в силу после публикации на сайте.",
    },
    contact: {
      title: "10. Контакт",
      content: "По вопросам пишите:",
      email: "contact@apexgirlguide.com",
    },
  },
};

export const getPrivacyContent = (lang: string): PrivacyContent =>
  privacyContent[lang] || privacyContent.en || privacyContent.fr;
