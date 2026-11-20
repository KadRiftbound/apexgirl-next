// Generates public/_redirects (Cloudflare Pages format) — replaces the old server proxy.
// Runs automatically before every build (npm "prebuild").
const fs = require("fs");
const guides = require("../src/lib/data/guides.json");

const LANGS = ["fr", "en", "id"];
const RETIRED = ["de", "it", "es", "pt", "pl", "ru"];
const VIP = { fr: "guide-systeme-vip", en: "vip-system-guide", id: "panduan-sistem-vip" };
// Top-level sections that exist under every language.
const SECTIONS = ["teambuilder", "tierlist", "guides", "codes", "contact", "glossary", "artist", "about",
  "methodology", "corrections", "editorial-policy", "advertising-disclosure", "cookie-settings",
  "privacy-policy", "legal-notice", "confidentialite", "mentions-legales"];

const rules = [];
const seen = new Set();
const push = (from, to, code) => { if (!seen.has(from)) { seen.add(from); rules.push(`${encodeURI(from)} ${encodeURI(to)} ${code}`); } };
// Exact paths are written with and without the trailing slash so both forms redirect.
const add = (from, to, code) => { push(from, to, code); if (!from.endsWith("*") && from !== "/") push(from + "/", to, code); };

// 1. Legacy short URLs (must come before the generic section rules).
for (const p of ["/vip", "/guides/vip", "/guides/vip-level"]) add(p, `/en/guides/${VIP.en}/`, 302);
add("/events", "/en/guides/", 302);
add("/artists", "/en/teambuilder/", 302);
add("/en/events", "/en/guides/", 302);
add("/en/artists", "/en/teambuilder/", 302);
for (const l of LANGS) {
  add(`/${l}/guides/vip`, `/${l}/guides/${VIP[l]}/`, 302);
  add(`/${l}/guides/vip-level`, `/${l}/guides/${VIP[l]}/`, 302);
  add(`/${l}/vote`, `/${l}/tierlist/`, 301);   // weekly vote removed
  add(`/${l}/tools`, `/${l}/tierlist/`, 301);
  add(`/${l}/tools/*`, `/${l}/tierlist/`, 301);
}

// Legal pages that only exist in one language version.
add("/fr/legal-notice", "/fr/mentions-legales/", 301);
add("/fr/privacy-policy", "/fr/confidentialite/", 301);
for (const l of ["en", "id"]) {
  add(`/${l}/mentions-legales`, `/${l}/legal-notice/`, 301);
  add(`/${l}/confidentialite`, `/${l}/privacy-policy/`, 301);
}

// 2. Old guide slugs (other languages' slugs or the raw id) -> canonical slug of the language.
for (const l of LANGS) {
  for (const g of guides) {
    const canonical = (g.slugs && g.slugs[l]) || g.id;
    const old = new Set([g.id, ...Object.values(g.slugs || {})]);
    old.delete(canonical);
    for (const s of old) add(`/${l}/guides/${s}`, `/${l}/guides/${canonical}/`, 301);
  }
}

// 3. Retired languages -> English, keeping the rest of the path.
for (const l of RETIRED) { add(`/${l}`, "/en/", 301); add(`/${l}/*`, "/en/:splat", 301); }

// 4. URLs without a language -> English.
for (const s of SECTIONS) { add(`/${s}`, `/en/${s}/`, 302); add(`/${s}/*`, `/en/${s}/:splat`, 302); }

// Cloudflare needs every exact rule before the first wildcard rule (max 2000 exact + 100 wildcard).
const isDynamic = (r) => /[*:]/.test(r.split(" ")[0]);
const ordered = [...rules.filter((r) => !isDynamic(r)), ...rules.filter(isDynamic)];
fs.writeFileSync("public/_redirects", ordered.join("\n") + "\n");
console.log(`public/_redirects: ${rules.length} rules (${rules.filter(isDynamic).length} wildcard)`);
