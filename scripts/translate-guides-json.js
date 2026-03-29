const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
if (!API_KEY) {
  console.error('Missing GOOGLE_TRANSLATE_API_KEY');
  process.exit(1);
}

const TARGET_LANGUAGES = ['en', 'it', 'es', 'pt', 'pl', 'id', 'ru', 'de'];
const SOURCE_LANG = 'fr';
const MAX_CHUNK = 4500;

const guidesPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'guides.json');
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

async function translateText(text, targetLang, attempt = 1) {
  if (!text || !text.trim()) return text;

  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: SOURCE_LANG,
        target: targetLang,
        format: 'text',
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || 'Translation error');
    }
    return data.data.translations[0].translatedText;
  } catch (error) {
    if (attempt < 4) {
      const wait = 1000 * attempt;
      await new Promise((resolve) => setTimeout(resolve, wait));
      return translateText(text, targetLang, attempt + 1);
    }
    throw error;
  }
}

function chunkText(text) {
  const lines = text.split('\n');
  const chunks = [];
  let current = '';

  for (const line of lines) {
    const candidate = current ? `${current}\n${line}` : line;
    if (candidate.length > MAX_CHUNK) {
      if (current) chunks.push(current);
      current = line;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function translateInChunks(text, targetLang) {
  const chunks = chunkText(text);
  const translatedChunks = [];

  for (const chunk of chunks) {
    const translated = await translateText(chunk, targetLang);
    translatedChunks.push(translated);
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  return translatedChunks.join('\n');
}

async function main() {
  for (const guide of guides) {
    for (const lang of TARGET_LANGUAGES) {
      const titleKey = `title_${lang}`;
      const descriptionKey = `description_${lang}`;
      const contentKey = `content_${lang}`;

      if (!guide[titleKey]) {
        guide[titleKey] = await translateText(guide.title, lang);
      }
      if (!guide[descriptionKey]) {
        guide[descriptionKey] = await translateText(guide.description, lang);
      }
      if (guide.content && !guide[contentKey]) {
        guide[contentKey] = await translateInChunks(guide.content, lang);
      }
      fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2));
      console.log(`Translated ${guide.id} -> ${lang}`);
    }
  }

  fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2));
  console.log(`Updated guides with translations: ${guidesPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
