import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/lib/types/artist";
import { slugify } from "@/lib/utils/slugify";
import {
  getArtistInsights, insightLabels, rankSentence, skillSentence, teamSentence, type TeamInsight,
} from "@/lib/seo/artistInsights";

// Server-rendered analysis block of an artist page (rank, skills explained, best teams).
export function ArtistInsights({ artist, lang }: { artist: Artist; lang: string }) {
  const i = getArtistInsights(artist);
  const t = insightLabels[lang === "fr" || lang === "id" ? lang : "en"];

  const team = (title: string, team: TeamInsight) => (
    <section className="ad-panel">
      <h2 className="ad-eyebrow">{title}</h2>
      <div className="ad-team">
        {team.members.map((m) => (
          <Link prefetch={false} key={m.id} href={`/${lang}/artist/${slugify(m.name)}/`} className={`ad-team-card${m.id === artist.id ? " self" : ""}`}>
            <span className="ad-team-img">
              {m.image ? <Image src={`/assets/images/artists/${m.image}`} alt={m.name} fill sizes="96px" style={{ objectFit: "cover", objectPosition: "center 12%" }} /> : <span>{m.name.charAt(0)}</span>}
            </span>
            <span className="ad-team-name">{m.name}</span>
          </Link>
        ))}
      </div>
      <p className="ad-prose">{teamSentence(artist, team, lang)}</p>
      <Link prefetch={false} href={`/${lang}/teambuilder/?t1=${team.members.map((m) => m.id).join(",")}`} className="ad-cta-ghost ad-team-open">{t.open} →</Link>
    </section>
  );

  return (
    <>
      <section className="ad-panel">
        <h2 className="ad-eyebrow">{t.analysis}</h2>
        <p className="ad-prose">{rankSentence(artist, i, lang)}</p>
        {i.skills.length > 0 && (
          <dl className="ad-skill-notes">
            {i.skills.map((s, k) => {
              const x = skillSentence(s, lang);
              return (
                <div key={k}>
                  <dt>{x.title}</dt>
                  <dd>{x.body}</dd>
                </div>
              );
            })}
          </dl>
        )}
      </section>
      <div className={`ad-grid-2${i.genreTeam ? "" : " single"}`}>
        {team(t.teamTitle(artist.name), i.bestTeam)}
        {i.genreTeam && team(t.genreTitle(artist.genre), i.genreTeam)}
      </div>
    </>
  );
}
