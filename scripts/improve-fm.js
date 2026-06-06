const fs = require('fs');
const g = JSON.parse(fs.readFileSync('./src/lib/data/guides.json', 'utf8'));
const fm = g.find(x => x.id === 'type-classique-early-game-debutant');

const fr = `Type : Classique, Early Game, Débutant

Explication courte

Le Fan Meeting est un mini-événement interne au groupe qui a lieu toutes les 48h.

Le but est de scorer le plus possible pour obtenir des récompenses qui boostent votre voiture de tournée. Le score total du groupe détermine les paliers de récompenses débloqués, donc la participation de tous est importante.

Le Fan Meeting peut être construit directement après la construction du HQ. Plus tard, vous pouvez améliorer son bâtiment pour augmenter la capacité en fans de votre bus.

Explication détaillée

Pour participer, lancez un rassemblement sur le Fan Meeting ou rejoignez celui d'un allié. Deux facteurs influencent votre score : la puissance de l'équipe qui organise le rassemblement (le bus leader) et la capacité en fans de votre propre bus.

La puissance du bus leader est déterminée par ses artistes. Pour maximiser les dégâts et le score, privilégiez les artistes avec un haut score de Sing (Attaque) et des compétences qui augmentent les dégâts. Les artistes axés Dance (Défense) ou Management sont moins efficaces ici, car le Fan Meeting ne demande que de la puissance offensive.

La capacité en fans de votre bus dépend du niveau de votre bâtiment Fan Meeting. Plus elle est élevée, plus vous embarquez de fans et plus votre score augmente. Investir dans l'amélioration de ce bâtiment est donc rentable sur le long terme.

Conseils

Placez vos meilleurs joueurs près du Fan Meeting pour réduire les temps de trajet et ouvrir un maximum de rassemblements.

Si vous êtes un petit joueur, rejoignez les bus des plus forts plutôt que d'ouvrir le vôtre. Vous obtiendrez un meilleur score.

Choisissez un horaire fixe qui convient au maximum de membres. Si un seul créneau ne suffit pas, en prévoir deux en rotation.`;

const en = `Type: Classic, Early Game, Beginner

Short Explanation

The Fan Meeting is a mini-event held every 48 hours within the group.

The goal is to score as high as possible to earn rewards that boost your tour bus. The group's total score determines the reward tiers unlocked, so everyone's participation matters.

The Fan Meeting can be built immediately after the HQ. Later, you can upgrade its building to increase your bus's fan capacity.

Detailed Explanation

To participate, start a gathering at the Fan Meeting or join an ally's gathering. Two factors influence your score: the strength of the team hosting the gathering (the bus leader) and your own bus's fan capacity.

The bus leader's strength is determined by their artists. To maximize damage and score, prioritize artists with high Sing (Attack) stats and skills that increase damage output. Artists focused on Dance (Defense) or Management are less effective here, since the Fan Meeting only requires offensive power.

Your bus's fan capacity depends on your Fan Meeting building level. The higher it is, the more fans you can carry and the higher your score. Investing in upgrading this building is worthwhile in the long run.

Tips

Position your strongest players near the Fan Meeting to reduce travel time and open as many gatherings as possible.

If you are a smaller player, join the buses of stronger players rather than opening your own. You will achieve a better score.

Choose a fixed time that suits the most members. If a single slot is not enough, set up two in rotation.`;

fm.content = fr;
fm.content_en = en;
// Keep other languages as original short versions (they were already reverted)

fs.writeFileSync('./src/lib/data/guides.json', JSON.stringify(g, null, 2));
console.log('Fan Meeting improved successfully');
const g2 = JSON.parse(fs.readFileSync('./src/lib/data/guides.json', 'utf8'));
const fm2 = g2.find(x => x.id === 'type-classique-early-game-debutant');
console.log('FR:', fm2.content.length, 'EN:', fm2.content_en.length);
