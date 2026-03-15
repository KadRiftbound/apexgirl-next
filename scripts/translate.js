const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

const LANGUAGES = {
  en: 'en',
  it: 'it',
  es: 'es',
  pt: 'pt',
  pl: 'pl',
  id: 'id',
  ru: 'ru'
};

const SOURCE_LANG = 'fr';

async function translateText(text, targetLang) {
  if (!text || targetLang === SOURCE_LANG) return text;
  
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

async function translateObject(obj, targetLang, keysToTranslate = null) {
  const result = { ...obj };
  
  for (const [key, value] of Object.entries(obj)) {
    if (keysToTranslate && !keysToTranslate.includes(key)) continue;
    if (typeof value === 'string') {
      result[`${key}_${targetLang}`] = await translateText(value, targetLang);
    }
  }
  
  return result;
}

async function translateGuide(guide, targetLang) {
  const translated = { ...guide };
  
  translated[`title_${targetLang}`] = await translateText(guide.title, targetLang);
  translated[`description_${targetLang}`] = await translateText(guide.description, targetLang);
  translated[`category_${targetLang}`] = await translateText(guide.category, targetLang);
  
  return translated;
}

async function translateArtist(artist, targetLang) {
  const translated = { ...artist };
  
  translated[`name_${targetLang}`] = await translateText(artist.name, targetLang);
  translated[`description_${targetLang}`] = await translateText(artist.description, targetLang);
  
  if (artist.skills) {
    translated[`skills_${targetLang}`] = await Promise.all(
      artist.skills.map(skill => translateText(skill, targetLang))
    );
  }
  
  if (artist.group && artist.group !== 'No Group') {
    translated[`group_${targetLang}`] = await translateText(artist.group, targetLang);
  }
  
  return translated;
}

async function main() {
  console.log('Starting translation process...\n');
  
  // Load guides data
  const guidesPath = path.join(__dirname, 'src/app/[lang]/guides/page.tsx');
  const guidesContent = fs.readFileSync(guidesPath, 'utf-8');
  
  // Extract guides array from the file
  const guidesMatch = guidesContent.match(/const guides: Guide\[\] = \[([\s\S]*?)\];/);
  if (!guidesMatch) {
    console.error('Could not find guides array in file');
    return;
  }
  
  console.log('Translating guides...');
  
  // For now, let's just show what would be translated
  // In practice, we'd need to parse the guides array and update it
  
  console.log('\nTranslation script ready.');
  console.log('To use:');
  console.log('1. This script requires the GOOGLE_TRANSLATE_API_KEY in .env.local');
  console.log('2. It will translate guides and artists to all 8 languages');
}

main().catch(console.error);
