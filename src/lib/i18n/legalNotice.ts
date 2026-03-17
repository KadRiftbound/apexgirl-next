export type LegalNoticeContent = {
  title: string;
  lastUpdate: string;
  intro: string;
  editor: { title: string; name: string; value: string; desc: string; email: string; emailValue: string };
  hosting: { title: string; provider: string; value: string; address: string };
  property: { title: string; content: string; content2: string; content3: string };
  liability: { title: string; content: string; content2: string; items: string[] };
  privacy: { title: string; content: string; link: string };
  cookies: { title: string; content: string; content2: string };
  links: { title: string; content: string };
  changes: { title: string; content: string };
  contact: { title: string; content: string };
  backToSite: string;
};

export const legalNoticeContent: Record<string, LegalNoticeContent> = {
  fr: {
    title: "Mentions Légales",
    lastUpdate: "Dernière mise à jour : Mars 2026",
    intro: "Le site apexgirlguide.com est un fansite non officiel dédié au jeu TopGirl/ApexGirl. Les informations fournies sur ce site sont données à titre indicatif et ne constituent en aucun cas une offre de services.",
    editor: {
      title: "1. Éditeur du site",
      name: "Type :",
      value: "Fansite non officiel",
      desc: "Ce site est un fansite géré de manière indépendante et n'est pas affilié à A3Games, SuperPrism ou tout autre éditeur du jeu TopGirl/ApexGirl.",
      email: "Email :",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Hébergement",
      provider: "Hébergeur :",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    },
    property: {
      title: "3. Propriété intellectuelle",
      content: "Tous les contenus présents sur le site apexgirlguide.com (textes, images, logos, graphismes, sons, vidéos, code source) sont protégés par les droits de propriété intellectuelle.",
      content2: "Ce site est un fansite NON OFFICIEL. Il n'est pas géré, soutenu, approuvé ou affilié à A3Games, SuperPrism ou tout autre éditeur ou développeur du jeu TopGirl/ApexGirl.",
      content3: "Toutes les marques commerciales, logos et images appartiennent à leurs propriétaires respectifs. L'utilisation de ces contenus sur ce site est uniquement destinée à des fins d'information et de Fansite.",
    },
    liability: {
      title: "4. Limitation de responsabilité",
      content: "Les informations contenues sur ce site sont aussi précises que possible. Toutefois, apexgirlguide.com ne saurait garantir l'exactitude, l'exhaustivité ou l'actualité des informations diffusées sur son site.",
      content2: "En aucun cas, apexgirlguide.com ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser ce site, notamment mais non exclusivement :",
      items: [
        "L'interruption du site ou des services",
        "Des erreurs ou omissions dans les contenus",
        "Des virus ou logiciels malveillants",
        "Des décisions prises sur la base des informations fournies",
      ],
    },
    privacy: {
      title: "5. Protection des données personnelles",
      content: "Pour connaître notre politique de protection des données personnelles, consultez notre page :",
      link: "Politique de confidentialité",
    },
    cookies: {
      title: "6. Cookies",
      content: "Ce site utilise des cookies pour améliorer l'expérience utilisateur. Les cookies sont de petits fichiers stockés sur votre appareil lorsque vous naviguez sur le site.",
      content2: "Vous pouvez configurer votre navigateur pour refuser les cookies. Toutefois, cela peut affecter certaines fonctionnalités du site.",
    },
    links: {
      title: "7. Liens hypertextes",
      content: "Le site peut contenir des liens vers d'autres sites internet. Nous n'exerçons aucun contrôle sur ces sites et déclinons toute responsabilité quant à leur contenu.",
    },
    changes: {
      title: "8. Modification des mentions légales",
      content: "Nous nous réservons le droit de modifier les présentes mentions légales à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
    },
    contact: {
      title: "9. Contact",
      content: "Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse : contact@apexgirlguide.com",
    },
    backToSite: "Retour au site",
  },
  en: {
    title: "Legal Notice",
    lastUpdate: "Last updated: March 2026",
    intro: "The website apexgirlguide.com is an unofficial fansite dedicated to the game TopGirl/ApexGirl. The information provided on this site is for informational purposes only and does not constitute an offer of services.",
    editor: {
      title: "1. Website Editor",
      name: "Type:",
      value: "Unofficial fansite",
      desc: "This site is an independently operated fansite and is not affiliated with A3Games, SuperPrism or any other publisher of the game TopGirl/ApexGirl.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Hosting",
      provider: "Host:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, United States",
    },
    property: {
      title: "3. Intellectual Property",
      content: "All content on apexgirlguide.com (text, images, logos, graphics, audio, video, source code) is protected by intellectual property rights.",
      content2: "This site is an UNOFFICIAL fansite. It is not managed, supported, approved, or affiliated with A3Games, SuperPrism or any other publisher or developer of TopGirl/ApexGirl.",
      content3: "All trademarks, logos and images belong to their respective owners. Use on this site is for informational and fansite purposes only.",
    },
    liability: {
      title: "4. Limitation of liability",
      content: "Information on this site is as accurate as possible. However, apexgirlguide.com cannot guarantee accuracy, completeness, or timeliness of the information provided.",
      content2: "In no event shall apexgirlguide.com be liable for direct or indirect damages arising from the use or inability to use this site, including but not limited to:",
      items: [
        "Service or site interruptions",
        "Errors or omissions in content",
        "Viruses or malware",
        "Decisions made based on the information provided",
      ],
    },
    privacy: {
      title: "5. Personal data protection",
      content: "To learn about our privacy policy, please see:",
      link: "Privacy Policy",
    },
    cookies: {
      title: "6. Cookies",
      content: "This site uses cookies to improve user experience. Cookies are small files stored on your device when you browse the site.",
      content2: "You can configure your browser to refuse cookies. This may affect certain site features.",
    },
    links: {
      title: "7. Hyperlinks",
      content: "The site may contain links to other websites. We do not control these sites and disclaim any responsibility for their content.",
    },
    changes: {
      title: "8. Changes to the legal notice",
      content: "We reserve the right to modify this legal notice at any time. Changes take effect once published on the site.",
    },
    contact: {
      title: "9. Contact",
      content: "For any questions about this legal notice, you can contact us at: contact@apexgirlguide.com",
    },
    backToSite: "Back to site",
  },
  it: {
    title: "Note Legali",
    lastUpdate: "Ultimo aggiornamento: Marzo 2026",
    intro: "Il sito apexgirlguide.com è un fansite non ufficiale dedicato a TopGirl/ApexGirl. Le informazioni presenti sono solo a scopo informativo e non costituiscono un'offerta di servizi.",
    editor: {
      title: "1. Editore del sito",
      name: "Tipo:",
      value: "Fansite non ufficiale",
      desc: "Questo sito è gestito in modo indipendente e non è affiliato con A3Games, SuperPrism o altri editori del gioco TopGirl/ApexGirl.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Hosting",
      provider: "Host:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, Stati Uniti",
    },
    property: {
      title: "3. Proprietà intellettuale",
      content: "Tutti i contenuti su apexgirlguide.com (testi, immagini, loghi, grafica, audio, video, codice sorgente) sono protetti da diritti di proprietà intellettuale.",
      content2: "Questo sito è un fansite NON UFFICIALE. Non è gestito, supportato, approvato o affiliato con A3Games, SuperPrism o altri editori o sviluppatori di TopGirl/ApexGirl.",
      content3: "Tutti i marchi, loghi e immagini appartengono ai rispettivi proprietari. L'uso su questo sito è solo a scopo informativo e di fansite.",
    },
    liability: {
      title: "4. Limitazione di responsabilità",
      content: "Le informazioni su questo sito sono il più accurate possibile. Tuttavia, apexgirlguide.com non garantisce accuratezza, completezza o aggiornamento delle informazioni.",
      content2: "In nessun caso apexgirlguide.com sarà responsabile per danni diretti o indiretti derivanti dall'uso o dall'impossibilità di usare il sito, inclusi ma non limitati a:",
      items: [
        "Interruzioni del sito o dei servizi",
        "Errori o omissioni nei contenuti",
        "Virus o malware",
        "Decisioni basate sulle informazioni fornite",
      ],
    },
    privacy: {
      title: "5. Protezione dei dati personali",
      content: "Per la nostra informativa sulla privacy, consulta:",
      link: "Informativa sulla Privacy",
    },
    cookies: {
      title: "6. Cookie",
      content: "Questo sito usa cookie per migliorare l'esperienza utente. I cookie sono piccoli file salvati sul tuo dispositivo quando navighi sul sito.",
      content2: "Puoi configurare il browser per rifiutare i cookie. Ciò può limitare alcune funzioni.",
    },
    links: {
      title: "7. Collegamenti ipertestuali",
      content: "Il sito può contenere link ad altri siti web. Non controlliamo questi siti e decliniamo ogni responsabilità per i loro contenuti.",
    },
    changes: {
      title: "8. Modifiche alle note legali",
      content: "Ci riserviamo il diritto di modificare queste note legali in qualsiasi momento. Le modifiche sono efficaci dopo la pubblicazione sul sito.",
    },
    contact: {
      title: "9. Contatto",
      content: "Per qualsiasi domanda su queste note legali, contattaci a: contact@apexgirlguide.com",
    },
    backToSite: "Torna al sito",
  },
  es: {
    title: "Aviso Legal",
    lastUpdate: "Última actualización: Marzo 2026",
    intro: "El sitio apexgirlguide.com es un fansite no oficial dedicado a TopGirl/ApexGirl. La información es solo informativa y no constituye una oferta de servicios.",
    editor: {
      title: "1. Editor del sitio",
      name: "Tipo:",
      value: "Fansite no oficial",
      desc: "Este sitio se gestiona de forma independiente y no está afiliado a A3Games, SuperPrism ni otros editores de TopGirl/ApexGirl.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Alojamiento",
      provider: "Proveedor:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, Estados Unidos",
    },
    property: {
      title: "3. Propiedad intelectual",
      content: "Todos los contenidos de apexgirlguide.com (textos, imágenes, logotipos, gráficos, audio, vídeo, código fuente) están protegidos por derechos de propiedad intelectual.",
      content2: "Este sitio es un fansite NO OFICIAL. No está gestionado, respaldado, aprobado ni afiliado a A3Games, SuperPrism u otros editores o desarrolladores de TopGirl/ApexGirl.",
      content3: "Todas las marcas, logotipos e imágenes pertenecen a sus propietarios. El uso en este sitio es solo informativo y de fansite.",
    },
    liability: {
      title: "4. Limitación de responsabilidad",
      content: "La información de este sitio es lo más precisa posible. Sin embargo, apexgirlguide.com no garantiza exactitud, integridad ni actualidad.",
      content2: "En ningún caso apexgirlguide.com será responsable por daños directos o indirectos derivados del uso o la imposibilidad de uso, incluyendo:",
      items: [
        "Interrupciones del sitio o servicios",
        "Errores u omisiones en los contenidos",
        "Virus o malware",
        "Decisiones basadas en la información proporcionada",
      ],
    },
    privacy: {
      title: "5. Protección de datos personales",
      content: "Para conocer nuestra política de privacidad, consulte:",
      link: "Política de Privacidad",
    },
    cookies: {
      title: "6. Cookies",
      content: "Este sitio utiliza cookies para mejorar la experiencia. Son pequeños archivos almacenados en su dispositivo.",
      content2: "Puede configurar su navegador para rechazar cookies. Esto puede afectar algunas funciones.",
    },
    links: {
      title: "7. Enlaces",
      content: "El sitio puede contener enlaces a otros sitios web. No controlamos esos sitios y no somos responsables de su contenido.",
    },
    changes: {
      title: "8. Cambios en el aviso legal",
      content: "Nos reservamos el derecho de modificar este aviso legal en cualquier momento. Los cambios entran en vigor al publicarse.",
    },
    contact: {
      title: "9. Contacto",
      content: "Para preguntas sobre este aviso legal, contáctenos en: contact@apexgirlguide.com",
    },
    backToSite: "Volver al sitio",
  },
  pt: {
    title: "Aviso Legal",
    lastUpdate: "Última atualização: Março 2026",
    intro: "O site apexgirlguide.com é um fansite não oficial dedicado a TopGirl/ApexGirl. As informações são apenas informativas e não constituem oferta de serviços.",
    editor: {
      title: "1. Editor do site",
      name: "Tipo:",
      value: "Fansite não oficial",
      desc: "Este site é gerido de forma independente e não é afiliado à A3Games, SuperPrism ou a outros editores de TopGirl/ApexGirl.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Hospedagem",
      provider: "Provedor:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, Estados Unidos",
    },
    property: {
      title: "3. Propriedade intelectual",
      content: "Todo o conteúdo do apexgirlguide.com (textos, imagens, logotipos, gráficos, áudio, vídeo, código-fonte) é protegido por direitos de propriedade intelectual.",
      content2: "Este site é um fansite NÃO OFICIAL. Não é gerido, apoiado, aprovado ou afiliado à A3Games, SuperPrism ou outros editores/desenvolvedores de TopGirl/ApexGirl.",
      content3: "Todas as marcas, logotipos e imagens pertencem aos seus respectivos proprietários. O uso neste site é apenas para fins informativos e de fansite.",
    },
    liability: {
      title: "4. Limitação de responsabilidade",
      content: "As informações neste site são o mais precisas possível. No entanto, apexgirlguide.com não garante precisão, integridade ou atualização.",
      content2: "Em nenhum caso apexgirlguide.com será responsável por danos diretos ou indiretos resultantes do uso ou da impossibilidade de uso, incluindo:",
      items: [
        "Interrupções do site ou serviços",
        "Erros ou omissões nos conteúdos",
        "Vírus ou malware",
        "Decisões tomadas com base nas informações fornecidas",
      ],
    },
    privacy: {
      title: "5. Proteção de dados pessoais",
      content: "Para conhecer nossa política de privacidade, consulte:",
      link: "Política de Privacidade",
    },
    cookies: {
      title: "6. Cookies",
      content: "Este site usa cookies para melhorar a experiência do usuário. Cookies são pequenos arquivos armazenados no dispositivo.",
      content2: "Você pode configurar o navegador para recusar cookies. Isso pode afetar algumas funções.",
    },
    links: {
      title: "7. Links",
      content: "O site pode conter links para outros sites. Não controlamos esses sites e não nos responsabilizamos pelo conteúdo.",
    },
    changes: {
      title: "8. Alterações no aviso legal",
      content: "Reservamo-nos o direito de alterar este aviso legal a qualquer momento. As alterações entram em vigor quando publicadas.",
    },
    contact: {
      title: "9. Contato",
      content: "Para dúvidas sobre este aviso legal, contate: contact@apexgirlguide.com",
    },
    backToSite: "Voltar ao site",
  },
  pl: {
    title: "Nota prawna",
    lastUpdate: "Ostatnia aktualizacja: Marzec 2026",
    intro: "Strona apexgirlguide.com to nieoficjalny fansite poświęcony TopGirl/ApexGirl. Informacje mają charakter wyłącznie informacyjny.",
    editor: {
      title: "1. Redaktor strony",
      name: "Typ:",
      value: "Nieoficjalny fansite",
      desc: "Strona jest prowadzona niezależnie i nie jest powiązana z A3Games, SuperPrism ani innymi wydawcami TopGirl/ApexGirl.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Hosting",
      provider: "Host:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    },
    property: {
      title: "3. Własność intelektualna",
      content: "Wszystkie treści na apexgirlguide.com (teksty, obrazy, logotypy, grafika, audio, wideo, kod źródłowy) są chronione prawami własności intelektualnej.",
      content2: "To NIEOFICJALNY fansite. Nie jest zarządzany, wspierany ani zatwierdzony przez A3Games, SuperPrism lub innych twórców TopGirl/ApexGirl.",
      content3: "Wszystkie znaki towarowe, logotypy i obrazy należą do ich właścicieli. Użycie na stronie ma charakter informacyjny i fansite.",
    },
    liability: {
      title: "4. Ograniczenie odpowiedzialności",
      content: "Informacje na stronie są możliwie dokładne, jednak apexgirlguide.com nie gwarantuje ich kompletności ani aktualności.",
      content2: "apexgirlguide.com nie ponosi odpowiedzialności za szkody wynikające z użycia lub braku możliwości użycia strony, w tym:",
      items: [
        "Przerwy w działaniu strony lub usług",
        "Błędy lub pominięcia w treści",
        "Wirusy lub złośliwe oprogramowanie",
        "Decyzje podjęte na podstawie informacji",
      ],
    },
    privacy: {
      title: "5. Ochrona danych osobowych",
      content: "Aby poznać politykę prywatności, zobacz:",
      link: "Polityka Prywatności",
    },
    cookies: {
      title: "6. Cookies",
      content: "Strona używa cookies w celu poprawy doświadczenia użytkownika. Cookies to małe pliki zapisywane na urządzeniu.",
      content2: "Możesz skonfigurować przeglądarkę, aby odrzucać cookies. Może to ograniczyć niektóre funkcje.",
    },
    links: {
      title: "7. Linki",
      content: "Strona może zawierać linki do innych witryn. Nie kontrolujemy ich i nie odpowiadamy za treść.",
    },
    changes: {
      title: "8. Zmiany w nocie prawnej",
      content: "Zastrzegamy sobie prawo do zmian w nocie prawnej. Zmiany obowiązują po publikacji.",
    },
    contact: {
      title: "9. Kontakt",
      content: "W razie pytań dotyczących noty prawnej skontaktuj się: contact@apexgirlguide.com",
    },
    backToSite: "Wróć do strony",
  },
  id: {
    title: "Pemberitahuan Hukum",
    lastUpdate: "Pembaruan terakhir: Maret 2026",
    intro: "Situs apexgirlguide.com adalah fansite tidak resmi untuk TopGirl/ApexGirl. Informasi di situs ini hanya untuk tujuan informasi.",
    editor: {
      title: "1. Pengelola situs",
      name: "Tipe:",
      value: "Fansite tidak resmi",
      desc: "Situs ini dikelola secara independen dan tidak berafiliasi dengan A3Games, SuperPrism atau penerbit TopGirl/ApexGirl lainnya.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Hosting",
      provider: "Penyedia:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, Amerika Serikat",
    },
    property: {
      title: "3. Hak kekayaan intelektual",
      content: "Semua konten di apexgirlguide.com (teks, gambar, logo, grafis, audio, video, kode sumber) dilindungi hak kekayaan intelektual.",
      content2: "Situs ini adalah fansite TIDAK RESMI. Tidak dikelola, didukung, disetujui, atau berafiliasi dengan A3Games, SuperPrism, atau pengembang TopGirl/ApexGirl lainnya.",
      content3: "Semua merek dagang, logo, dan gambar milik pemiliknya. Penggunaan di situs ini hanya untuk tujuan informasi dan fansite.",
    },
    liability: {
      title: "4. Batasan tanggung jawab",
      content: "Informasi di situs ini seakurat mungkin. Namun, apexgirlguide.com tidak menjamin akurasi, kelengkapan, atau keterkinian informasi.",
      content2: "apexgirlguide.com tidak bertanggung jawab atas kerusakan langsung atau tidak langsung akibat penggunaan situs ini, termasuk:",
      items: [
        "Gangguan situs atau layanan",
        "Kesalahan atau kelalaian konten",
        "Virus atau malware",
        "Keputusan yang diambil berdasarkan informasi",
      ],
    },
    privacy: {
      title: "5. Perlindungan data pribadi",
      content: "Untuk mengetahui kebijakan privasi, lihat:",
      link: "Kebijakan Privasi",
    },
    cookies: {
      title: "6. Cookies",
      content: "Situs ini menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies adalah file kecil yang disimpan di perangkat.",
      content2: "Anda dapat mengatur browser untuk menolak cookies. Ini dapat memengaruhi beberapa fungsi.",
    },
    links: {
      title: "7. Tautan",
      content: "Situs dapat berisi tautan ke situs lain. Kami tidak mengontrol situs tersebut dan tidak bertanggung jawab atas isinya.",
    },
    changes: {
      title: "8. Perubahan pemberitahuan hukum",
      content: "Kami berhak mengubah pemberitahuan hukum ini kapan saja. Perubahan berlaku setelah dipublikasikan.",
    },
    contact: {
      title: "9. Kontak",
      content: "Untuk pertanyaan tentang pemberitahuan hukum ini, hubungi: contact@apexgirlguide.com",
    },
    backToSite: "Kembali ke situs",
  },
  ru: {
    title: "Правовая информация",
    lastUpdate: "Последнее обновление: Март 2026",
    intro: "Сайт apexgirlguide.com — неофициальный фан-сайт TopGirl/ApexGirl. Информация носит справочный характер и не является предложением услуг.",
    editor: {
      title: "1. Редактор сайта",
      name: "Тип:",
      value: "Неофициальный фан-сайт",
      desc: "Сайт ведется независимо и не аффилирован с A3Games, SuperPrism или другими издателями TopGirl/ApexGirl.",
      email: "Email:",
      emailValue: "contact@apexgirlguide.com",
    },
    hosting: {
      title: "2. Хостинг",
      provider: "Хост:",
      value: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, США",
    },
    property: {
      title: "3. Интеллектуальная собственность",
      content: "Все материалы на apexgirlguide.com (тексты, изображения, логотипы, графика, аудио, видео, исходный код) защищены правами интеллектуальной собственности.",
      content2: "Это НЕОФИЦИАЛЬНЫЙ фан-сайт. Он не управляется, не поддерживается и не одобрен A3Games, SuperPrism или другими разработчиками/издателями TopGirl/ApexGirl.",
      content3: "Все товарные знаки, логотипы и изображения принадлежат их владельцам. Использование на сайте носит информационный характер.",
    },
    liability: {
      title: "4. Ограничение ответственности",
      content: "Информация на сайте максимально точная, однако apexgirlguide.com не гарантирует точность, полноту или актуальность.",
      content2: "apexgirlguide.com не несет ответственности за прямые или косвенные убытки, включая:",
      items: [
        "Сбои сайта или сервисов",
        "Ошибки или пропуски в контенте",
        "Вирусы или вредоносное ПО",
        "Решения, принятые на основе информации",
      ],
    },
    privacy: {
      title: "5. Защита персональных данных",
      content: "Чтобы узнать о политике конфиденциальности, см.:",
      link: "Политика конфиденциальности",
    },
    cookies: {
      title: "6. Cookies",
      content: "Сайт использует cookies для улучшения опыта. Cookies — небольшие файлы, сохраняемые на устройстве.",
      content2: "Вы можете отключить cookies в настройках браузера. Это может повлиять на функции сайта.",
    },
    links: {
      title: "7. Ссылки",
      content: "Сайт может содержать ссылки на сторонние ресурсы. Мы не контролируем их и не отвечаем за содержание.",
    },
    changes: {
      title: "8. Изменения",
      content: "Мы можем изменить эту информацию в любое время. Изменения вступают в силу после публикации.",
    },
    contact: {
      title: "9. Контакт",
      content: "По вопросам пишите: contact@apexgirlguide.com",
    },
    backToSite: "Назад на сайт",
  },
};

export const getLegalNoticeContent = (lang: string): LegalNoticeContent =>
  legalNoticeContent[lang] || legalNoticeContent.en || legalNoticeContent.fr;
