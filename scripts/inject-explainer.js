const fs = require("fs");
const src = fs.readFileSync("src/app/[lang]/HomeClient.tsx", "utf8");
const idx = src.indexOf("CODES PROMO");
const start = src.lastIndexOf("</section>", idx);

const explainer = `      </section>

      {/* ═══════════════════════════════════════════
          WHAT IS TOPGIRL — war game explainer
      ═══════════════════════════════════════════ */}
      <section className="explainer-section">
        <div className="explainer-inner">
          <h2 className="explainer-title">
            {lang === "fr"
              ? "Qu'est-ce que TopGirl / ApexGirl ?"
              : "What is TopGirl / ApexGirl?"}
          </h2>

          <p className="explainer-p">
            {lang === "fr"
              ? "TopGirl (aussi appel\u00e9 ApexGirl ou Idol Company) est un jeu de guerre strat\u00e9gique multijoueur sur mobile. Contrairement \u00e0 ce que son apparence et son nom sugg\u00e8rent, il ne s'agit pas d'un simple jeu de rythme ou de gestion d'idoles \u2014 c'est un vrai war game bas\u00e9 sur la coop\u00e9ration en groupe, la conqu\u00eate de territoires et la gestion de ressources."
              : "TopGirl (also known as ApexGirl or Idol Company) is a multiplayer strategic war game for mobile. Despite its appearance and name, it is not a simple rhythm or idol management game \u2014 it is a real war game based on group cooperation, territory conquest, and resource management."}
          </p>

          <p className="explainer-p">
            {lang === "fr"
              ? "Le jeu fonctionne sur un syst\u00e8me de serveurs. Chaque serveur est une communaut\u00e9 de joueurs qui doivent collaborer pour progresser, conqu\u00e9rir des zones sur la carte, et affronter d'autres serveurs lors des cycles Abroad (Tokyo, Bali, Rome Antique). La coordination de groupe est essentielle : un serveur d\u00e9sorganis\u00e9 est rapidement p\u00e9nalis\u00e9."
              : "The game operates on a server system. Each server is a community of players who must collaborate to progress, conquer zones on the map, and face other servers during Abroad cycles (Tokyo, Bali, Ancient Rome). Group coordination is essential: a disorganized server is quickly penalized."}
          </p>

          <p className="explainer-p">
            {lang === "fr"
              ? "Comme beaucoup de jeux de guerre mobiles, TopGirl repose sur un mod\u00e8le freemium avec microtransactions. Les artistes (SSR et UR) sont les personnages que vous collectionnez et am\u00e9liorez. Les artistes SSR sont la base de votre progression, tandis que les UR sont des versions sp\u00e9ciales li\u00e9es \u00e0 vos SSR. Les ressources (or, diamants, lingots) servent \u00e0 am\u00e9liorer vos b\u00e2timents, vos artistes et votre \u00e9quipement."
              : "Like many mobile war games, TopGirl relies on a freemium model with microtransactions. Artists (SSR and UR) are the characters you collect and upgrade. SSR artists are the foundation of your progression, while URs are special versions linked to your SSRs. Resources (gold, diamonds, ingots) are used to upgrade your buildings, artists, and equipment."}
          </p>

          <p className="explainer-p">
            {lang === "fr"
              ? "Pour bien d\u00e9buter, concentrez-vous sur vos b\u00e2timents de ville, recrutez une \u00e9quipe \u00e9quilibr\u00e9e, et rejoignez un groupe actif. La progression passe par la coop\u00e9ration : personne ne r\u00e9ussit seul dans TopGirl."
              : "To start well, focus on your city buildings, recruit a balanced team, and join an active group. Progression comes through cooperation \u2014 no one succeeds alone in TopGirl."}
          </p>

          <div className="explainer-links">
            <Link href={\`/\${lang}/guides/comprendre-la-structure-du-jeu-top-girl/\`} className="explainer-link">
              {lang === "fr" ? "Lire le guide de structure du jeu" : "Read the game structure guide"} \u2192
            </Link>
            <Link href={\`/\${lang}/guides/guide-construction-d-equipe-debut-de-jeu/\`} className="explainer-link">
              {lang === "fr" ? "Guide \u00e9quipe d\u00e9butant" : "Beginner team building guide"} \u2192
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CODES PROMO
      ═══════════════════════════════════════════ */}`;

const result = src.substring(0, start) + explainer + src.substring(idx);
fs.writeFileSync("src/app/[lang]/HomeClient.tsx", result, "utf8");
console.log("Explainer section injected successfully");
