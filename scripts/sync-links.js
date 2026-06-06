const fs = require('fs');
const g = JSON.parse(fs.readFileSync('./src/lib/data/guides.json', 'utf8'));

// Build guide title -> id map (from FR titles)
const titleToId = {};
for (const guide of g) {
  const t = guide.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  titleToId[t] = guide.id;
  // Also store alternative names
  if (guide.id === 'guide-des-batiments-de-la-ville') titleToId['batiments'] = guide.id;
  if (guide.id === 'guide-des-achats-integres') titleToId['achatsintgres'] = guide.id;
  if (guide.id === 'comprendre-la-structure-du-jeu-top-girl') {
    titleToId['structuredujeu'] = guide.id;
    titleToId['gamestructureguide'] = guide.id;
  }
  if (guide.id === 'guide-construction-d-equipe-debut-de-jeu') titleToId['constructionquipe'] = guide.id;
}

// Manually define which guides reference which other guides, based on content analysis
// Format: guideId -> [relatedGuideIds]
const guideRefs = {
  'ancient-rome-event': ['comprendre-la-structure-du-jeu-top-girl', 'guide-du-chamber-territory', 'guide-tokyo'],
  'guide-des-batiments-de-la-ville': ['guide-des-equipements', 'guide-tokyo', 'guide-du-systeme-de-collection'],
  'guide-des-achats-integres': ['guide-des-equipements', 'guide-fishing-event', 'guide-group-battle', 'guide-tokyo', 'guide-du-systeme-vip'],
  'guide-du-chamber-territory': ['guide-tokyo'],
  'guide-city-supremacy': ['comprendre-la-structure-du-jeu-top-girl', 'guide-group-battle', 'guide-tokyo', 'guide-ultimate-ceo'],
  'guide-du-systeme-de-collection': ['guide-des-batiments-de-la-ville', 'guide-des-achats-integres'],
  'guide-echo-death-match': ['guide-des-equipements', 'guide-de-l-equipe-edm', 'roulette-event-guide'],
  'guide-de-l-equipe-edm': ['guide-des-equipements', 'guide-tokyo', 'guide-de-l-equipe-rnb'],
  'comprendre-la-structure-du-jeu-top-girl': ['ancient-rome-event', 'guide-city-supremacy', 'guide-tokyo'],
  'type-classique-early-game-debutant': ['ancient-rome-event', 'guide-des-batiments-de-la-ville', 'guide-du-chamber-territory'],
  'guide-fishing-event': ['guide-city-supremacy', 'guide-des-equipements', 'roulette-event-guide'],
  'guide-grammy-award': ['guide-de-l-equipe-edm', 'guide-de-l-equipe-rnb', 'guide-des-batiments-de-la-ville', 'guide-des-equipements', 'guide-du-systeme-de-collection'],
  'guide-du-group-shop': ['guide-des-batiments-de-la-ville', 'guide-du-systeme-de-collection'],
  'guide-construction-d-equipe-debut-de-jeu': ['ce-guide-n-inclus-pas-les-artistes-apres-roma-3', 'guide-des-equipements', 'guide-fishing-event', 'guide-tokyo', 'guide-construction-d-equipe-fin-de-jeu'],
  'guide-construction-d-equipe-fin-de-jeu': ['guide-des-equipements', 'guide-construction-d-equipe-debut-de-jeu', 'type-classique-mid-game-avance'],
  'guide-des-equipements': ['guide-tokyo', 'guide-peak'],
  'guide-de-planification-long-terme': ['ce-guide-n-inclus-pas-les-artistes-apres-roma-3', 'guide-de-l-equipe-edm', 'guide-de-l-equipe-rnb', 'guide-tokyo', 'guide-ultimate-ceo', 'guide-du-systeme-vip'],
  'guide-peak': ['guide-de-l-equipe-edm', 'guide-de-l-equipe-rnb', 'guide-de-planification-long-terme', 'guide-des-equipements'],
  'metro-guide': ['guide-group-battle', 'guide-ultimate-ceo', 'ultimate-group-guide', 'guide-city-supremacy'],
  'guide-muse-event': ['guide-des-equipements', 'guide-grammy-award'],
  'guide-du-systeme-de-tier': ['guide-city-supremacy', 'guide-de-planification-long-terme', 'guide-tokyo', 'guide-ultimate-ceo', 'guide-peak'],
  'guide-radio-battle': ['guide-de-l-equipe-rnb', 'guide-de-planification-long-terme', 'guide-des-equipements', 'guide-group-battle'],
  'guide-de-l-equipe-rnb': ['guide-de-l-equipe-edm', 'guide-radio-battle', 'guide-tokyo', 'guide-ultimate-ceo', 'guide-construction-d-equipe-debut-de-jeu'],
  'ce-guide-n-inclus-pas-les-artistes-apres-roma-3': ['guide-de-l-equipe-edm', 'guide-tokyo', 'guide-ultimate-ceo', 'guide-construction-d-equipe-debut-de-jeu'],
  'type-classique-mid-game-avance': ['ancient-rome-event', 'guide-de-planification-long-terme', 'guide-des-batiments-de-la-ville', 'guide-du-chamber-territory', 'guide-du-systeme-de-tier', 'guide-construction-d-equipe-fin-de-jeu'],
  'guide-des-attaques-et-des-rassemblements': ['guide-city-supremacy', 'guide-de-l-equipe-edm', 'guide-de-l-equipe-rnb', 'guide-du-chamber-territory', 'guide-radio-battle', 'guide-tokyo', 'guide-tokyo'],
  'guide-tokyo': ['comprendre-la-structure-du-jeu-top-girl', 'guide-des-equipements', 'guide-ultimate-ceo', 'ultimate-group-guide', 'ancient-rome-event'],
  'guide-ultimate-ceo': ['guide-de-planification-long-terme', 'guide-des-achats-integres', 'guide-du-systeme-de-tier', 'guide-tokyo', 'guide-du-systeme-vip'],
  'ultimate-group-guide': ['guide-ultimate-ceo', 'guide-group-battle', 'metro-guide'],
  'guide-group-battle': ['guide-city-supremacy', 'guide-des-equipements', 'guide-radio-battle'],
  'guide-du-systeme-vip': ['guide-de-planification-long-terme', 'guide-des-achats-integres', 'guide-ultimate-ceo'],
  'roulette-event-guide': ['guide-city-supremacy', 'guide-echo-death-match', 'guide-fishing-event'],
};

// Artist slug map
const artistSlugMap = {
  'alice': 'alice', 'aurora': 'aurora', 'chizuru': 'chizuru', 'claire': 'claire',
  'everly': 'everly', 'julia': 'julia', 'kokoro': 'kokoro', 'longkui': 'longkui',
  'nova': 'nova', 'paisley': 'paisley', 'sari': 'sari', 'skylar': 'skylar',
  'xenia': 'xenia', 'yuuko': 'yuuko', 'zendayah': 'zendayah',
  'cornelia': 'cornelia', 'dewi': 'dewi', 'eirene': 'eirene', 'ratih': 'ratih',
  'sora': 'sora', 'monica': 'monica',
  'antonia': 'antonia', 'calliope': 'calliope', 'hikari': 'hikari', 'kasha': 'kasha',
  'melissa': 'melissa', 'riku': 'riku', 'sienna': 'sienna', 'talia': 'talia',
  'ayaka': 'ayaka', 'savannah': 'savannah',
};

// Artist mentions per guide (based on content analysis)
const artistRefs = {
  'guide-de-l-equipe-edm': ['alice', 'everly', 'kokoro', 'longkui', 'sari', 'xenia'],
  'guide-grammy-award': ['sari'],
  'guide-construction-d-equipe-debut-de-jeu': ['alice', 'aurora', 'chizuru', 'claire', 'everly', 'julia', 'kokoro', 'longkui', 'nova', 'paisley', 'sari', 'skylar', 'xenia', 'yuuko', 'zendayah'],
  'guide-construction-d-equipe-fin-de-jeu': ['longkui', 'monica'],
  'guide-de-planification-long-terme': ['claire', 'sari'],
  'guide-de-l-equipe-rnb': ['cornelia', 'dewi', 'eirene', 'julia', 'nova', 'ratih', 'sora', 'zendayah'],
  'ce-guide-n-inclus-pas-les-artistes-apres-roma-3': ['antonia', 'calliope', 'claire', 'hikari', 'kasha', 'melissa', 'paisley', 'riku', 'sienna', 'talia', 'yuuko'],
  'guide-tokyo': ['ayaka', 'chizuru', 'kokoro', 'sora', 'yuuko'],
  'guide-ultimate-ceo': ['nova', 'savannah'],
};

// Apply changes
let changes = 0;
for (const guide of g) {
  // Update relatedGuides
  if (guideRefs[guide.id]) {
    const newRg = [...new Set(guideRefs[guide.id])].sort();
    if (JSON.stringify(guide.relatedGuides) !== JSON.stringify(newRg)) {
      console.log(`${guide.id}: relatedGuides ${JSON.stringify(guide.relatedGuides)} -> ${JSON.stringify(newRg)}`);
      guide.relatedGuides = newRg;
      changes++;
    }
  }
  
  // Update relatedArtists
  if (artistRefs[guide.id]) {
    const newRa = [...new Set(artistRefs[guide.id])].sort();
    if (JSON.stringify(guide.relatedArtists) !== JSON.stringify(newRa)) {
      console.log(`${guide.id}: relatedArtists ${JSON.stringify(guide.relatedArtists)} -> ${JSON.stringify(newRa)}`);
      guide.relatedArtists = newRa;
      changes++;
    }
  }
}

fs.writeFileSync('./src/lib/data/guides.json', JSON.stringify(g, null, 2));
console.log(`\nTotal guides modified: ${changes}`);
