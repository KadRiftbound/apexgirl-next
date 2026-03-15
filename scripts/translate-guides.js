const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyAtC5jv_9ZDUKjRbJsfpagbMf3j2Zxnc2s';

if (!API_KEY) {
  console.error('Error: GOOGLE_TRANSLATE_API_KEY not found');
  process.exit(1);
}

const TARGET_LANGUAGES = ['en', 'it', 'es', 'pt', 'pl', 'id', 'ru'];
const SOURCE_LANG = 'fr';

const guidesData = [
  { id: "equipment", title: "Guide Équipement", description: "Bijoux, Voitures et Propriétés pour optimiser vos statistiques. Comparaison Gold vs Purple et priorités d'achat.", category: "Débutant" },
  { id: "team-builder", title: "Team Builder", description: "Comment construire l'équipe parfaite. Calcul des synergies de genre et bonus d'équipement.", category: "Intermédiaire" },
  { id: "recommended-teams", title: "Équipes Recommandées", description: "Les meilleures compositions d'équipes UR et SSR. Stratégies offensives, équilibrées et défensives.", category: "Avancé" },
  { id: "leveling-ssr", title: "Montée en Niveau SSR", description: "Nombre de cartes nécessaires pour level up vos personnages SSR jusqu'au niveau 115.", category: "Débutant" },
  { id: "blueprints", title: "Guide Blueprints", description: "Requirements en blueprints par tier (1-21) pour améliorer vos installations. Tier 7-12 Gold.", category: "Intermédiaire" },
  { id: "hq-upgrade", title: "Guide HQ (Quartier Général)", description: "Cartes de bâtiment nécessaires pour chaque niveau du HQ. Requirement total: 29,922 cartes.", category: "Débutant" },
  { id: "vehicle-system", title: "Système de Véhicules", description: "Système complet: Avancement, Pièces (Moteur, Châssé, Suspension, Jantes), Skins débloqués.", category: "Avancé" },
  { id: "gold-equipment", title: "Équipement Gold Optimal", description: "Setup complet Gold pour Vocalist, Dancer et Center. +19,730 stats et 86,000 fans par personnage.", category: "Avancé" },
  { id: "purple-equipment", title: "Guide Équipement Purple", description: "Meilleur équipement purple et comment l'obtenir.", category: "Avancé" },
  { id: "event-ancient-rome", title: "Guide Ancient Rome", description: "Guide complet de l'événement Adventure Abroad Rome. Phases, stratégies et rewards.", category: "Événements" },
  { id: "event-radio-battle", title: "Guide Radio Battle", description: "Guide complet du Radio Battle. 5 phases, stratégies pour maximiser vos Radio Coins.", category: "Événements" },
  { id: "event-grammy", title: "Guide Grammy Awards", description: "Guide des 8 catégories Grammy. Meilleures équipes et stratégies pour gagner des medals.", category: "Événements" },
  { id: "event-ultimate-ceo", title: "Guide Ultimate CEO", description: "Guide complet de l'Ultimate CEO. Comment vaincre le CEO et获取 les meilleures rewards.", category: "Événements" },
  { id: "event-echo-death-match", title: "Guide Echo Death Match", description: "Guide du Echo Death Match. Accumulez des Echo Stones et échangez pour des rewards SSR+.", category: "Événements" },
  { id: "event-chamber-territory", title: "Guide Chamber Territory", description: "Guide du Chamber Territory. Capturez et défendez des territoires pour des rewards.", category: "Événements" },
  { id: "event-cleanup-party", title: "Guide Cleanup Party", description: "Guide du Cleanup Party. Collectez des poubelles et échangez pour des rewards.", category: "Événements" },
  { id: "event-metro-subway", title: "Guide Metro & Subway", description: "Guide du Metro & Subway. Collectez des tickets et montez dans le métro pour des rewards.", category: "Événements" },
  { id: "event-vs-group", title: "Guide VS Group Event", description: "Guide du VS Group Event. Bataille entre groupes avec 5 jours de préparation et 1 jour de combat final.", category: "Événements" },
  { id: "event-fishing", title: "Guide Fishing Event", description: "Guide du Fishing Event. Configurez votre aquarium, attrapez des poissons et gagnez des récompenses.", category: "Événements" },
  { id: "world-building", title: "World Building Guide", description: "Guide World Building. Construisez et développez votre monde dans le jeu.", category: "Intermédiaire" },
  { id: "vip-level", title: "VIP Level Guide", description: "Guide VIP Level. Détails des points requis pour chaque niveau VIP.", category: "Avancé" },
  { id: "ceo-coins", title: "CEO Coins Purchase Guide", description: "Guide d'achat de CEO Coins via le site de paiement officiel.", category: "Avancé" },
  { id: "alliance-management", title: "Alliance Management Guide", description: "Guide de gestion d'alliance. Rôles, responsabilités et stratégies pour gérer votre guilde.", category: "Avancé" },
  { id: "peak-level", title: "Peak Level Guide", description: "Guide Peak Level. Système de progression late-game pour SSR girls avec 5 étoiles.", category: "Avancé" },
  { id: "group-shop", title: "Group Shop Guide", description: "Guide Group Shop. Чтоacheter dans la boutique de guilde pour optimiser vos progrès.", category: "Débutant" },
];

const categoryTranslations = {
  fr: { "Débutant": "Débutant", "Intermédiaire": "Intermédiaire", "Avancé": "Avancé", "Événements": "Événements" },
  en: { "Débutant": "Beginner", "Intermédiaire": "Intermediate", "Avancé": "Advanced", "Événements": "Events" },
  it: { "Débutant": "Principiante", "Intermédiaire": "Intermedio", "Avancé": "Avanzato", "Événements": "Eventi" },
  es: { "Débutant": "Principiante", "Intermédiaire": "Intermedio", "Avancé": "Avanzado", "Événements": "Eventos" },
  pt: { "Débutant": "Iniciante", "Intermédiaire": "Intermediário", "Avancé": "Avançado", "Événements": "Eventos" },
  pl: { "Débutant": "Początkujący", "Intermédiaire": "Średniozaawansowany", "Avancé": "Zaawansowany", "Événements": "Wydarzenia" },
  id: { "Débutant": "Pemula", "Intermédiaire": "Menengah", "Avancé": "Lanjutan", "Événements": "Acara" },
  ru: { "Débutant": "Начинающий", "Intermédiaire": "Средний", "Avancé": "Продвинутый", "Événements": "События" },
};

async function translateText(text, targetLang) {
  if (!text) return '';
  
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: SOURCE_LANG,
        target: targetLang,
        format: 'text'
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('Translation error:', data.error.message);
      return text;
    }
    
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Request error:', error);
    return text;
  }
}

async function translateAll() {
  console.log(`Starting translation from ${SOURCE_LANG} to ${TARGET_LANGUAGES.length} languages...`);
  console.log(`Total guides to translate: ${guidesData.length}\n`);
  
  const allTranslations = {};
  
  for (const targetLang of TARGET_LANGUAGES) {
    console.log(`Translating to ${targetLang}...`);
    allTranslations[targetLang] = {};
    
    for (const guide of guidesData) {
      const title = await translateText(guide.title, targetLang);
      const description = await translateText(guide.description, targetLang);
      
      allTranslations[targetLang][guide.id] = {
        title,
        description
      };
      
      console.log(`  - ${guide.id}: ${title.substring(0, 40)}...`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Generate the TypeScript code
  const tsCode = `const guideTranslations: Record<string, Record<string, { title: string; description: string }>> = {
  fr: {},
  en: ${JSON.stringify(allTranslations.en, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
  it: ${JSON.stringify(allTranslations.it, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
  es: ${JSON.stringify(allTranslations.es, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
  pt: ${JSON.stringify(allTranslations.pt, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
  pl: ${JSON.stringify(allTranslations.pl, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
  id: ${JSON.stringify(allTranslations.id, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
  ru: ${JSON.stringify(allTranslations.ru, null, 6).replace(/"/g, "'").replace(/'/g, '"').replace(/"/g, "'")},
};`;

  console.log('\n--- Generated Translation Code ---');
  console.log(tsCode.substring(0, 2000));
  console.log('...\n');
  
  // Save to file
  const outputPath = path.join(__dirname, 'translations-output.txt');
  fs.writeFileSync(outputPath, tsCode);
  console.log(`Translation output saved to: ${outputPath}`);
  
  // Also output the categoryMap
  console.log('\n--- Category Translations ---');
  console.log(JSON.stringify(categoryTranslations, null, 2));
}

translateAll().catch(console.error);
