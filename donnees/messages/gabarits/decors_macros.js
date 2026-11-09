// Morceaux « phrase entière » des lignes de décor (decorlines.txt) : réserves de nourriture et gorgées de fontaine pétillante.
// Chaque entrée : texte anglais exact tel que le jeu l'écrit (variantes [a|b] déjà développées) → texte français.
globalThis.DCSS_DECORS_MACROS = (() => {
    const dev = (en, fr) => { // développe les variantes [a|b] alignées
        const m = /\[([^\]]*)\]/.exec(en); if (!m) return [[en, fr]];
        const a = m[1].split("|"), f = /\[([^\]]*)\]/.exec(fr)[1].split("|"); const out = [];
        a.forEach((x, i) => out.push(...dev(en.replace(m[0], x), fr.replace(/\[[^\]]*\]/, f[i] !== undefined ? f[i] : f[0]))));
        return out;
    };
    const T = {};
    const ajouter = (nom, liste) => { T[nom] = {}; for (const [e, f] of liste) for (const [x, y] of dev(e, f)) T[nom][x] = y; };
    ajouter("sparkling_message", [
        ["You feel fleetingly lighter.", "Vous vous sentez brièvement plus léger."],
        ["You feel a fleeting jolt of bravery.", "Vous ressentez un bref élan de bravoure."],
        ["You feel nauseous for a moment.", "Vous avez la nausée un instant."],
        ["Your emotions uncomfortably twist.", "Vos émotions se tordent désagréablement."]]);
    ajouter("fruit", [
        ["an apple. Crisp.", "une pomme. Croquante."], ["an apricot. Delicious.", "un abricot. Délicieux."], ["a banana. Delicious.", "une banane. Délicieuse."],
        ["a choko. Bland.", "un chayotte. Fade."], ["some grapes. Delicious.", "du raisin. Délicieux."], ["some lychee. Delicately sweet.", "des litchis. Délicatement sucrés."],
        ["an orange. Delicious.", "une orange. Délicieuse."], ["some rambutans. Delicious.", "des ramboutans. Délicieux."], ["some strawberries. Delicious.", "des fraises. Délicieuses."],
        ["a snozzcumber. Putrid!", "un snozzcombre. Putride !"], ["a tomato. Savoury.", "une tomate. Savoureuse."], ["a cherimoya. Tangy!", "une chérimole. Acidulée !"],
        ["a mango. Yummy.", "une mangue. Succulente."], ["a tamarind. Juicy!", "un tamarin. Juteux !"]]);
    ajouter("meat", [
        ["a smoked eel. Savoury!", "une anguille fumée. Savoureuse !"], ["a yak sausage. Delicious.", "une saucisse de yak. Délicieuse."], ["a cured ham hock. Salty.", "un jarret de jambon fumé. Salé."],
        ["some adder jerky. Delicious.", "de la viande séchée de vipère. Délicieuse."], ["a slice of magically-preserved pepperoni pizza. Delicious.", "une part de pizza au pepperoni conservée par magie. Délicieuse."],
        ["some smoked snail. Delicious.", "de l’escargot fumé. Délicieux."], ["some death yak haggis. Delicious.", "du haggis de yak de la mort. Délicieux."],
        ["some alligator jerky. Delicious.", "de la viande séchée d’alligator. Délicieuse."], ["some cured dream mutton. Ephemeral.", "du mouton onirique fumé. Éphémère."],
        ["a slice of magically-preserved Pandemonium pizza. Delectable.", "une part de pizza Pandémonium conservée par magie. Succulente."], ["a candy-coated scorpion. Crunchy.", "un scorpion enrobé de bonbon. Croquant."],
        ["a pickled kraken tentacle. Astonishing!", "un tentacule de kraken mariné. Stupéfiant !"], ["a cured hell ham hock. Spicy!", "un jarret de jambon infernal fumé. Épicé !"],
        ["some shrike confit. Tangy!", "du confit de pie-grièche. Acidulé !"], ["a century hydra egg. An acquired taste.", "un œuf d’hydre centenaire. Un goût qui s’acquiert."]]);
    ajouter("baked", [
        ["some spriggan [bread loaf|tarts|rock buns|scones|biscuits|hardtack]. Delicious.", "[du pain de spriggan. Délicieux.|des tartes de spriggan. Délicieuses.|des rochers de spriggan. Délicieux.|des scones de spriggan. Délicieux.|des biscuits de spriggan. Délicieux.|du biscuit de troupe de spriggan. Délicieux.]"],
        ["an orcish [pirog|pastel de nata|bizcocho]. Tasty.", "[un pirojki orque. Savoureux.|un pastel de nata orque. Savoureux.|un bizcocho orque. Savoureux.]"],
        ["some elven [shortbread|rye rolls]. Refined.", "[du sablé elfique. Raffiné.|des petits pains de seigle elfiques. Raffinés.]"],
        ["some merfolk [baklava|tsoureki]. Decadent.", "[du baklava|du tsoureki] des sirènes. Décadent."],
        ["a stuffed naga paratha. Phenomenal.", "un paratha farci de naga. Phénoménal."], ["a draconian baguette. Hearty and warming.", "une baguette draconienne. Consistante et réconfortante."],
        ["some [dwarven|kobold|kobold] pretzels. Scrumptious.", "des bretzels [nains|kobolds|kobolds]. Délicieux."],
        ["some choko cake. Less bland than expected!", "du gâteau au chayotte. Moins fade que prévu !"],
        ["some [trollish|giant|giant] [wittenberger|grovbrød]. Savoury.", "[du wittenberger|du grovbrød] [de troll|de géant|de géant]. Savoureux."],
        ["some tengu anpan. Delightful.", "de l’anpan de tengu. Ravissant."], ["some ghoulish sourdough. A strange taste.", "du pain au levain de goule. Un goût étrange."],
        ["some vault guards' spare rations. Filling.", "des rations de réserve des gardes du caveau. Nourrissantes."], ["a strangely fresh circus pie. Mirthful.", "une tarte de cirque étrangement fraîche. Hilarante."],
        ["some starflower jam biscuits. A disquieting taste.", "des biscuits à la confiture de fleur d’étoile. Un goût troublant."]]);
    return T;
})();
