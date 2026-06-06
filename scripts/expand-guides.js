const fs = require('fs');
const g = JSON.parse(fs.readFileSync('./src/lib/data/guides.json', 'utf8'));

// 1. Fix type-classique-mid-game-avance (Stats Guide) - add structure, keep content
const stats = g.find(x => x.id === 'type-classique-mid-game-avance');
if (stats) {
  // FR: wrap existing content in Short/Long structure
  stats.content = `Type : Classique, Mid Game, Avancé

Explication courte

Ce guide explique le fonctionnement des statistiques dans TopGirl.

Il existe deux types de boosts : les boosts actifs (qui améliorent directement les artistes de votre équipe) et les boosts passifs (qui améliorent toutes vos équipes).

Comprendre cette différence est essentiel pour optimiser votre progression selon votre profil de dépenses.

Explication longue

Ce guide a pour but d'éclairer le fonctionnement des statistiques dans TopGirl.

Il existe deux façons de booster les statistiques de vos équipes. Pour faciliter la compréhension, nous les appellerons boost actif et boost passif.

Les boosts actifs :

. Le niveau des artistes
. Le niveau de skill des artistes
. Les assets (bijou, voiture, propriété)
. Le Peak level basique (stats)

Ces améliorations sont des boosts directs des artistes composant votre équipe. Il est donc très fortement recommandé de limiter le nombre d'artistes et d'assets que vous augmentez et promouvez (pour les assets) au strict minimum requis pour votre gameplay. Un joueur F2P ne jouera souvent qu'une seule équipe, un joueur dépensant en jouera deux et une whale beaucoup plus.

Les boosts passifs :

. Voiture
. HQ
. Collection
. Villa
. CEO outfit
. HQ skin
. Team feature
. Peak level (%)

Toutes ces améliorations boostent toutes vos équipes. Certains boosts (Collection, Villa) peuvent être dédiés uniquement à un seul genre. Les skins de HQ se cumulent, boostant en pourcentage les statistiques totales de vos équipes.

Le système de Team est l'un des plus late game du jeu et orienté whale. Il est assez complexe d'évaluer la valeur réelle de cette feature, mais je recommanderais de booster le Peak level en premier lieu pour plus d'efficacité.

Les boosts de voiture, HQ, collection, villa et CEO outfit sont composés de deux parties également : une valeur brute et une augmentation de cette valeur en pourcentage. Les augmentations en pourcentage suivent un système de tier (T1, T2, T3, T4, T5). Il est très important de débloquer un maximum de tiers pour chaque catégorie. Plus la valeur de base est élevée, plus le boost en pourcentage sera puissant. Priorisez donc la valeur de base en premier lieu.`;

  // EN: wrap existing content
  stats.content_en = `Type: Classic, Mid-Game, Advanced

Short Explanation

This guide explains how stats work in TopGirl.

There are two types of boosts: active boosts (which directly improve your team's artists) and passive boosts (which improve all your teams).

Understanding this difference is essential for optimizing your progression based on your spending profile.

Long Explanation

This guide aims to explain how stats work in TopGirl.

There are two ways to boost your teams' stats. For ease of understanding, we'll call them active boosts and passive boosts.

Active Boosts:

. Artist Level
. Artist Skill Level
. Assets (jewelry, car, property)
. Basic Peak Level Stats

These improvements directly boost the artists on your team. Therefore, it's highly recommended to limit the number of artists and assets you boost and promote (for assets) to the bare minimum required for your gameplay. A free-to-play player will often only play one team, a spending player will play two, and a whale will play many more.

Passive boosts:

. Car
. HQ
. Collection
. Villa
. CEO outfit
. HQ skin
. Team feature
. Peak level (%)

All these upgrades boost all your teams. Some boosts (Collection, Villa) can be dedicated to only one type of team. HQ skins stack, boosting your teams' total stats by a percentage.

The Team system is one of the latest game elements and is whale-oriented. It's quite complex to evaluate the true value of this feature, but I would recommend boosting the Peak level first for greater effectiveness.

The boosts for cars, HQs, collections, villas, and CEO outfits also consist of two parts: a base value and a percentage increase to that value. Percentage increases follow a tier system (T1, T2, T3, T4, T5). It's very important to unlock as many tiers as possible for each category. The higher the base value, the more powerful the percentage boost will be. Prioritize the base value first.`;

  // Fix relatedGuides for stats guide
  stats.relatedGuides = [...new Set([
    'guide-de-planification-long-terme',
    'guide-du-systeme-de-tier',
    'guide-peak',
    'guide-des-batiments-de-la-ville',
    'guide-des-equipements'
  ])].sort();

  console.log('Stats guide expanded: FR=' + stats.content.length + ' EN=' + stats.content_en.length);
}

// 2. Expand Echo Death Match
const edm = g.find(x => x.id === 'guide-echo-death-match');
if (edm) {
  edm.content = `Guide Echo Death Match

Type : Guide événement

Explication courte

Echo Death Match est un événement hebdomadaire de 3 jours, du vendredi au dimanche.

Avant le début, tu choisis une difficulté. Ce choix est fixe pour toute la durée de l'événement.

Le but est de battre 15 stages pour récupérer des récompenses, avec des paliers bonus aux stages clés.

Explication longue

Fonctionnement général

Avant l'événement, tu dois sélectionner une difficulté. Tu ne peux jouer qu'une seule difficulté par édition. Si tu termines les 15 stages à ta difficulté actuelle, tu débloques la difficulté suivante pour la prochaine édition. Les difficultés plus élevées donnent de meilleures récompenses.

L'événement contient 15 stages. Chaque stage reste disponible 1 heure après son déblocage. Si un stage disparaît sans que tu l'aies terminé, tu peux le faire réapparaître en utilisant des ressources.

Pour progresser, tu dois invoquer un stage et lancer un challenge. Si tu gagnes, tu accèdes au stage suivant. Les stages deviennent plus difficiles au fur et à mesure que tu avances, demandant des équipes plus puissantes et mieux adaptées.

Stratégie et composition d'équipe

Pour réussir les stages les plus difficiles, privilégie une équipe avec un haut score global. Les bonus de genre sont importants : une équipe homogène (même genre musical) bénéficie d'un bonus de stats significatif.

Adapte ta composition en fonction du type de défi proposé. Certains stages peuvent favoriser la puissance brute (Sing) tandis que d'autres demandent de l'équilibre.

Si tu bloques à une difficulté, n'hésite pas à redescendre d'un cran pour l'édition suivante et à améliorer ton équipe avant de retenter plus haut.

Récompenses

Chaque stage donne des récompenses de base, proches des rewards de Concert Performance. Des récompenses bonus sont données aux stages 3, 6, 9, 12 et 15.

Récompenses de paliers :

. SR Private Photos
. SSR Private Photos
. SSR Cards
. EXP Cards

Les quantités augmentent avec la difficulté et la progression.

Conseils

Choisis une difficulté que tu peux terminer entièrement. Terminer un palier inférieur rapporte plus que de rester bloqué en milieu de palier supérieur.

Joue régulièrement. Chaque stage ne reste disponible qu'une heure. Si tu rates un stage, tu devras le faire réapparaître.

Termine rapidement les premiers stages pour ne pas manquer la fenêtre des suivants.

Concentre-toi sur les stages paliers (3, 6, 9, 12, 15) pour maximiser les récompenses bonus.`;

  edm.content_en = `Echo Death Match Guide

Type: Event Guide

Short Explanation

Echo Death Match is a weekly 3-day event, running from Friday to Sunday.

Before the event begins, you choose a difficulty level, which is fixed for the entire event.

The goal is to clear 15 stages to collect rewards, with bonus milestones at key stages.

Long Explanation

General Functioning

Before the event, you must select a difficulty level. You can only play one difficulty per edition. If you complete all 15 stages at your current difficulty, you unlock the next difficulty for the following edition. Higher difficulties offer better rewards.

The event contains 15 stages. Each stage is available for 1 hour after being unlocked. If a stage expires without being completed, you can make it reappear using resources.

To progress, you must summon a stage and start a challenge. If you win, you advance to the next stage. Stages become increasingly difficult, requiring stronger and more adapted teams.

Strategy and Team Composition

To succeed in the harder stages, prioritize a team with high overall stats. Genre bonuses are important: a homogeneous team (same musical genre) benefits from a significant stat bonus.

Adapt your composition based on the challenge type. Some stages may favor raw power (Sing) while others require balance.

If you are stuck at a difficulty, consider dropping down a level for the next edition and improving your team before attempting higher difficulties again.

Rewards

Each stage provides base rewards, similar to Concert Performance rewards. Bonus rewards are given at stages 3, 6, 9, 12, and 15.

Tier Rewards:

. SR Private Photos
. SSR Private Photos
. SSR Cards
. EXP Cards

Quantities increase with difficulty and progression.

Tips

Choose a difficulty level you can fully complete. Completing a lower tier entirely pays more than being stuck midway through a higher tier.

Play regularly. Each stage is only available for one hour. If you miss a stage, you will need to make it reappear.

Clear early stages quickly so you don't miss the window for later ones.

Focus on milestone stages (3, 6, 9, 12, 15) to maximize bonus rewards.`;

  console.log('EDM guide expanded: FR=' + edm.content.length + ' EN=' + edm.content_en.length);
}

fs.writeFileSync('./src/lib/data/guides.json', JSON.stringify(g, null, 2));
console.log('Done');
