const fs = require('fs');
const path = require('path');

const guidesFilePath = path.join(__dirname, '..', 'src', 'app', '[lang]', 'guides', '[slug]', 'page.tsx');
const translationsFilePath = path.join(__dirname, 'guide-content-translations.txt');

let content = fs.readFileSync(guidesFilePath, 'utf-8');
const translationsContent = fs.readFileSync(translationsFilePath, 'utf-8');

const translations = {};

const lines = translationsContent.split('\n');
let currentLang = null;
let currentGuideId = null;
let currentContent = [];
let inContent = false;

lines.forEach(line => {
  if (line.match(/^\s+(\w+): \{$/)) {
    currentLang = line.match(/^\s+(\w+): \{$/)[1];
    translations[currentLang] = {};
  } else if (line.match(/^\s+"([^"]+)":\s*`$/)) {
    currentGuideId = line.match(/^\s+"([^"]+)":\s*`$/)[1];
    currentContent = [];
    inContent = true;
  } else if (inContent && line.match(/^\s+\},$/)) {
    if (currentLang && currentGuideId) {
      translations[currentLang][currentGuideId] = currentContent.join('\n').trim();
    }
    inContent = false;
    currentGuideId = null;
  } else if (inContent) {
    currentContent.push(line.replace(/^\s+/, '').replace(/,$/, ''));
  }
});

console.log('Languages found:', Object.keys(translations));
console.log('Sample translations for en:', Object.keys(translations.en || {}));

let newContent = content;

const typeDef = content.match(/type Guide = \{[\s\S]*?\};/);
if (typeDef) {
  const oldType = typeDef[0];
  const newType = oldType.replace(/};/, 
`  content_it?: string;
  content_es?: string;
  content_pt?: string;
  content_pl?: string;
  content_id?: string;
  content_ru?: string;
};`);
  newContent = newContent.replace(oldType, newType);
  console.log('Updated type definition');
}

Object.keys(translations).forEach(lang => {
  Object.keys(translations[lang]).forEach(guideId => {
    const fieldName = `content_${lang}`;
    const translatedContent = translations[lang][guideId];
    
    const guideRegex = new RegExp(`(id: "${guideId}",[\\s\\S]*?content: \\\`)([\\s\\S]*?)(\\\`)`, 'm');
    
    newContent = newContent.replace(guideRegex, (match, prefix, oldContent, suffix) => {
      return `${prefix}${translatedContent}${suffix}`;
    });
  });
});

const usageMatch = newContent.match(/\{[\s\S]*?\? guide\.content_en \|\| guide\.content[\s\S]*?:\s*\(guide\.content \|\| ''\)/);
if (usageMatch) {
  const oldRender = usageMatch[0];
  const newRender = `{(() => {
    if (lang === 'en') return guide.content_en || guide.content;
    if (lang === 'it') return guide.content_it || guide.content_en || guide.content;
    if (lang === 'es') return guide.content_es || guide.content_en || guide.content;
    if (lang === 'pt') return guide.content_pt || guide.content_en || guide.content;
    if (lang === 'pl') return guide.content_pl || guide.content_en || guide.content;
    if (lang === 'id') return guide.content_id || guide.content_en || guide.content;
    if (lang === 'ru') return guide.content_ru || guide.content_en || guide.content;
    return guide.content;
  })()}`;
  
  newContent = newContent.replace(oldRender, newRender);
  console.log('Updated content rendering');
}

fs.writeFileSync(guidesFilePath, newContent);
console.log('\nGuides file updated successfully!');
