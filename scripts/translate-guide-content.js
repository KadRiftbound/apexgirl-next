const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyAtC5jv_9ZDUKjRbJsfpagbMf3j2Zxnc2s';

const TARGET_LANGUAGES = ['en', 'it', 'es', 'pt', 'pl', 'id', 'ru'];
const SOURCE_LANG = 'fr';

async function translateText(text, targetLang) {
  if (!text || targetLang === SOURCE_LANG) return text;
  if (!text.trim()) return text;
  
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

async function translateInChunks(text, targetLang) {
  const maxLength = 5000;
  const chunks = [];
  
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength));
  }
  
  const translatedChunks = [];
  for (const chunk of chunks) {
    const translated = await translateText(chunk, targetLang);
    translatedChunks.push(translated);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return translatedChunks.join('');
}

async function main() {
  const guidesFilePath = path.join(__dirname, '..', 'src', 'app', '[lang]', 'guides', '[slug]', 'page.tsx');
  const content = fs.readFileSync(guidesFilePath, 'utf-8');
  
  const guideMatches = content.match(/\{[\s\S]*?id: "[^"]+",[\s\S]*?content: `[\s\S]*?`[\s\S]*?\}/g);
  
  if (!guideMatches) {
    console.log('No guides found with content');
    return;
  }
  
  console.log(`Found ${guideMatches.length} guides to translate\n`);
  
  const translations = {};
  
  for (const targetLang of TARGET_LANGUAGES) {
    console.log(`\n=== Translating to ${targetLang} ===`);
    translations[targetLang] = {};
    
    for (let i = 0; i < guideMatches.length; i++) {
      const guideMatch = guideMatches[i];
      const idMatch = guideMatch.match(/id: "([^"]+)"/);
      const contentMatch = guideMatch.match(/content: `([\s\S]*?)`/);
      
      if (!idMatch || !contentMatch) continue;
      
      const guideId = idMatch[1];
      const frenchContent = contentMatch[1];
      
      console.log(`Translating ${guideId}...`);
      
      const translated = await translateInChunks(frenchContent, targetLang);
      translations[targetLang][guideId] = translated;
      
      console.log(`  Done (${translated.length} chars)`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  console.log('\n=== Generating code ===\n');
  
  let output = '';
  
  for (const lang of ['en', 'it', 'es', 'pt', 'pl', 'id', 'ru']) {
    output += `\n  ${lang}: {\n`;
    for (const [guideId, content] of Object.entries(translations[lang])) {
      const escapedContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      output += `    "${guideId}": \`${escapedContent}\`,\n`;
    }
    output += `  },\n`;
  }
  
  fs.writeFileSync(path.join(__dirname, 'guide-content-translations.txt'), output);
  console.log('Output saved to guide-content-translations.txt');
  
  console.log('\nSample output:');
  console.log(output.substring(0, 1000));
}

main().catch(console.error);
