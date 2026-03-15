const fs = require('fs');
const path = require('path');

const guidesFilePath = path.join(__dirname, '..', 'src', 'app', '[lang]', 'guides', '[slug]', 'page.tsx');
let content = fs.readFileSync(guidesFilePath, 'utf-8');

const translationsFilePath = path.join(__dirname, 'guide-content-translations.txt');
const translationsContent = fs.readFileSync(translationsFilePath, 'utf-8');

const translations = {};

let currentLang = null;
let currentGuideId = null;
let currentContent = [];
let inContent = false;

const lines = translationsContent.split('\n');
lines.forEach(line => {
  if (line.match(/^\s+(\w+):\s*\{$/)) {
    currentLang = line.match(/^\s+(\w+):\s*\{$/)[1];
    if (!translations[currentLang]) translations[currentLang] = {};
    currentGuideId = null;
    inContent = false;
  } else if (line.match(/^\s+"([^"]+)":\s*`$/)) {
    currentGuideId = line.match(/^\s+"([^"]+)":\s*`$/)[1];
    currentContent = [];
    inContent = true;
  } else if (inContent && line.match(/^\s+\},?$/)) {
    if (currentLang && currentGuideId && currentContent.length > 0) {
      translations[currentLang][currentGuideId] = currentContent.join('\n').trim();
    }
    inContent = false;
    currentGuideId = null;
  } else if (inContent && currentGuideId) {
    let text = line;
    if (text.startsWith('    ')) text = text.substring(4);
    else if (text.startsWith('  ')) text = text.substring(2);
    currentContent.push(text);
  }
});

console.log('Parsed translations:');
Object.keys(translations).forEach(lang => {
  console.log(`  ${lang}: ${Object.keys(translations[lang]).length} guides`);
});

const enTranslations = translations['en'];
if (!enTranslations) {
  console.error('No English translations found!');
  process.exit(1);
}

Object.keys(enTranslations).forEach(guideId => {
  const translatedContent = enTranslations[guideId];
  
  const guideRegex = new RegExp(`(\\{[\\s\\S]*?id:\\s*"${guideId}"[\\s\\S]*?content:\\s*\`)[\\s\\S]*?(\`,?)(\\s*\\}[\\s\\S]*?\\{)`, 'm');
  
  if (content.includes(`id: "${guideId}"`) && !content.includes(`id: "${guideId}"`) && content.includes(`content: \``)) {
  }
  
  const testRegex = new RegExp(`id:\\s*"${guideId}"[\\s\\S]*?content:\\s*\``);
  if (testRegex.test(content)) {
    const match = content.match(testRegex);
    if (match) {
      console.log(`Found guide: ${guideId}`);
    }
  }
});

const fs2 = require('fs');
const guideIds = Object.keys(enTranslations);
let count = 0;

guideIds.forEach(guideId => {
  const translatedContent = enTranslations[guideId];
  
  const guideStart = content.indexOf(`id: "${guideId}"`);
  if (guideStart === -1) return;
  
  const afterGuide = content.substring(guideStart);
  const contentStart = afterGuide.indexOf('content: `');
  if (contentStart === -1) return;
  
  const contentEnd = afterGuide.indexOf('`', contentStart + 10);
  if (contentEnd === -1) return;
  
  const oldContent = afterGuide.substring(contentStart + 10, contentEnd);
  
  if (oldContent.length > 50 && !oldContent.includes('## ')) {
    const newContent = translatedContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    content = content.substring(0, guideStart + contentStart + 10) + newContent + content.substring(contentEnd);
    count++;
  }
});

fs2.writeFileSync(guidesFilePath, content);
console.log(`\nUpdated ${count} guides with English content`);
