const fs = require('fs');
const path = require('path');

const baseDir = path.join('C:', 'Users', 'magna', 'Documents', 'ApexGirl', 'APEXGIRLDATA');
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'guides.json');
const artistsPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'artists.json');

const TYPE_STYLES = {
  classic: { icon: '📘', color: '#8b5cf6' },
  event: { icon: '🎟️', color: '#f59e0b' },
  special: { icon: '⭐', color: '#10b981' },
};

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const readAllTxtFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === '__MACOSX') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readAllTxtFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.txt')) {
      files.push(fullPath);
    }
  }
  return files;
};

const isGuidesRelatedHeading = (line) => /^guides?\s+li[eé]s?/i.test(line.trim());
const isGlossaryHeading = (line) => /^glossaire/i.test(line.trim());

const cleanListLine = (line) =>
  line
    .replace(/^[-•\*\s]+/, '')
    .replace(/\s+$/, '')
    .trim();

const parseType = (line) => {
  if (!line) return 'classic';
  const value = line.toLowerCase();
  if (value.includes('event') || value.includes('événement') || value.includes('evenement')) return 'event';
  if (value.includes('special') || value.includes('spécial')) return 'special';
  return 'classic';
};

const parseStage = (line) => {
  if (!line) return null;
  const value = line.toLowerCase();
  if (value.includes('early')) return 'early';
  if (value.includes('mid')) return 'mid';
  if (value.includes('late')) return 'late';
  if (value.includes('début')) return 'early';
  if (value.includes('interm')) return 'mid';
  if (value.includes('avanc')) return 'late';
  return null;
};

const parseDifficulty = (line) => {
  if (!line) return null;
  const value = line.toLowerCase();
  if (value.includes('début')) return 'beginner';
  if (value.includes('interm')) return 'intermediate';
  if (value.includes('avanc')) return 'advanced';
  return null;
};

const extractShortDescription = (lines) => {
  const shortHeadingRegex = /^(explication\s+courte|short\s+explanation|spiegazione\s+breve|explicación\s+corta|explicacao\s+curta|kr[oó]tkie\s+wyja[sś]nienie|penjelasan\s+singkat|краткое\s+объяснение|kurze\s+erklärung)/i;
  const longHeadingRegex = /^(explication\s+longue|long\s+explanation|spiegazione\s+dettagliata|explicación\s+larga|explicacao\s+longa|długie\s+wyja[sś]nienie|penjelasan\s+panjang|подробное\s+объяснение|lange\s+erklärung)/i;
  const headingIndex = lines.findIndex((line) => shortHeadingRegex.test(line.trim()));
  if (headingIndex === -1) return '';
  const collected = [];
  for (let i = headingIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) {
      if (collected.length > 0) break;
      continue;
    }
    if (longHeadingRegex.test(line.trim())) break;
    if (/^guides?\s+li[eé]s?/i.test(line.trim())) break;
    if (/^glossaire/i.test(line.trim())) break;
    collected.push(line.trim());
  }
  return collected.join(' ');
};

const parseGuideFile = (filePath) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const normalized = raw.replace(/\r/g, '\n').replace(/\uFFFD/g, '-');
  const lines = normalized.split(/\n/);
  const titleLine = lines.find((line) => line.trim()) || '';
  const baseName = path.basename(filePath, path.extname(filePath));
  const dirName = path.basename(path.dirname(filePath));

  let title = titleLine.trim();
  title = title.replace(/^guide\s*:\s*/i, '').replace(/^guide\s*-\s*/i, '').trim();

  const isGenericFileName = /nouveau document texte/i.test(baseName);
  const isOverlongTitle = title.length > 120 || /guide type/i.test(title);
  if (!title || isGenericFileName || isOverlongTitle) {
    title = dirName || baseName;
  }

  const typeLine = lines.find((line) => /^type\s*:/i.test(line.trim())) || '';
  const levelLine = lines.find((line) => /^niveau\s*:/i.test(line.trim())) || '';
  let typeValue = typeLine.split(':').slice(1).join(':').trim();
  let levelValue = levelLine.split(':').slice(1).join(':').trim();

  if (!typeValue) {
    const typeIndex = lines.findIndex((line) => /^type\b/i.test(line.trim()));
    if (typeIndex !== -1) {
      for (let i = typeIndex + 1; i < lines.length; i += 1) {
        if (lines[i].trim()) {
          typeValue = lines[i].trim();
          break;
        }
      }
    }
  }

  const guideType = parseType(typeValue);
  const stage = parseStage(levelValue);
  const difficulty = parseDifficulty(levelValue);

  const relatedTitles = [];
  const contentLines = [];
  let inRelated = false;
  let inGlossary = false;

  for (const line of lines) {
    if (isGuidesRelatedHeading(line)) {
      inRelated = true;
      inGlossary = false;
      continue;
    }
    if (isGlossaryHeading(line)) {
      inGlossary = true;
      inRelated = false;
      continue;
    }
    if (inRelated) {
      if (line.trim()) relatedTitles.push(cleanListLine(line));
      continue;
    }
    if (inGlossary) {
      continue;
    }
    contentLines.push(line);
  }

  const content = contentLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  const description = extractShortDescription(lines) || title;
  const wordCount = content.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  const readTime = `${Math.max(3, Math.round(wordCount / 200))} min`;
  const style = TYPE_STYLES[guideType] || TYPE_STYLES.classic;

  if (!title) return null;

  return {
    id: slugify(title),
    title,
    description,
    content,
    guideType,
    stage,
    difficulty,
    relatedGuideTitles: relatedTitles,
    readTime,
    icon: style.icon,
    color: style.color,
  };
};

const main = () => {
  const allTxtFiles = readAllTxtFiles(baseDir).filter((file) => path.basename(file).toLowerCase() !== 'glossaire.txt');
  const guides = allTxtFiles.map(parseGuideFile).filter(Boolean);

  const guideTitleToId = new Map();
  const guideIdSet = new Set(guides.map((g) => g.id));
  guides.forEach((g) => {
    const titleLower = g.title.toLowerCase();
    guideTitleToId.set(titleLower, g.id);
    const noGuidePrefix = titleLower.replace(/^guide\s+/i, '').trim();
    if (noGuidePrefix && noGuidePrefix !== titleLower) {
      guideTitleToId.set(noGuidePrefix, g.id);
    }
  });

  const artists = JSON.parse(fs.readFileSync(artistsPath, 'utf8'));
  const artistEntries = artists.map((a) => ({
    name: a.name,
    slug: slugify(a.name),
  }));

  const enrichedGuides = guides.map((guide) => {
    const contentText = guide.content || '';
    const relatedGuideIds = new Set();

    guide.relatedGuideTitles.forEach((title) => {
      const id = guideTitleToId.get(title.toLowerCase());
      if (id) {
        relatedGuideIds.add(id);
        return;
      }
      const slug = slugify(title);
      if (guideIdSet.has(slug)) relatedGuideIds.add(slug);
    });

    guides.forEach((candidate) => {
      if (candidate.id === guide.id) return;
      if (candidate.title.length < 5) return;
      const titleVariants = [candidate.title, candidate.title.replace(/^Guide\s+/i, '').trim()]
        .filter(Boolean);
      titleVariants.forEach((variant) => {
        if (variant.length < 5) return;
        const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        if (regex.test(contentText)) relatedGuideIds.add(candidate.id);
      });
    });

    const relatedArtistSlugs = [];
    artistEntries.forEach((artist) => {
      if (!artist.name || artist.name.length < 4) return;
      const escaped = artist.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(contentText)) relatedArtistSlugs.push(artist.slug);
    });

    if (relatedGuideIds.size === 0) {
      let fallback = guides.filter((g) => g.id !== guide.id && g.guideType === guide.guideType);
      if (guide.stage) fallback = fallback.filter((g) => g.stage === guide.stage);
      if (guide.difficulty) fallback = fallback.filter((g) => g.difficulty === guide.difficulty);
      fallback.slice(0, 3).forEach((g) => relatedGuideIds.add(g.id));
    }

    return {
      id: guide.id,
      title: guide.title,
      description: guide.description,
      content: guide.content,
      guideType: guide.guideType,
      stage: guide.stage,
      difficulty: guide.difficulty,
      relatedGuides: Array.from(relatedGuideIds).filter((id) => id && id !== guide.id),
      relatedArtists: Array.from(new Set(relatedArtistSlugs)),
      readTime: guide.readTime,
      icon: guide.icon,
      color: guide.color,
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify(enrichedGuides, null, 2));
  console.log(`Generated ${enrichedGuides.length} guides -> ${outputPath}`);
};

main();
