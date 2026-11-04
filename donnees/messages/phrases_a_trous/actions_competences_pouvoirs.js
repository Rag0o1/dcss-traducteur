// Messages à variables, partie F : actions en plusieurs tours, compétences, pouvoirs de dieux, divers.
// Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    // --- Mettre / retirer un équipement (délais) ---
    const verbes = [["putting on", "mettre", "mettez"], ["taking off", "retirer", "retirez"]];
    const cats = [["weapon", "arme"], ["armour", "armure"], ["amulet", "amulette"]];
    for (const [en, infinitif] of verbes) {
        for (const [ce, cf] of cats) {
            T[`You start ${en} your ${ce}.`] = `Vous commencez à ${infinitif} votre ${cf}.`;
            T[`You stop ${en} your ${ce}.`] = `Vous cessez de ${infinitif} votre ${cf}.`;
        }
        T[`You continue ${en} {Y}.`] = `Vous continuez à ${infinitif} {y1}.`;
        T[`You finish ${en} {Y}.`] = `Vous finissez de ${infinitif} {y1}.`;
    }
    Object.assign(T, {



        "You finish imbuing your servitor.": "Vous finissez d’imprégner votre serviteur.",
        "You begin to imbue your servitor with knowledge of {X}.": "Vous commencez à imprégner votre serviteur de la connaissance de {x1}.",
        "You begin to imprint {A} upon your paragon.": "Vous commencez à imprimer {o1} sur votre parangon.",
        "You finish imprinting the physical structure of {A} upon your paragon.": "Vous finissez d’imprimer la structure physique {d1} sur votre parangon.",
        "{X} removes the imprint of {A} from your paragon.": "{x1} retire l’empreinte {d2} de votre parangon.",


        "You stop dropping stuff.": "Vous cessez de lâcher des objets.",


        "You finish merging with the rock.": "Vous finissez de fusionner avec la roche.",


        "You finish channelling your searing ray.": "Vous finissez de canaliser votre rayon brûlant.",



        "You finish reciting {X}": "Vous finissez de réciter {x1}",
        "You finish coughing all the {X} out of your lungs.": "Vous finissez de tousser tout le {x1} hors de vos poumons.",
        // --- Compétences ---
        "Your base {X} skill increases to level {X}!": "Votre compétence de base {x1} passe au niveau {x2} !",
        "Your base {X} skill decreases to level {X}!": "Votre compétence de base {x1} descend au niveau {x2} !",
        "Your {X} skill gained {X} levels and is now at level {X}!": "Votre compétence {x1} a gagné {x2} niveaux et est maintenant au niveau {x3} !",
        "Your {X} skill lost {X} levels and is now at level {X}!": "Votre compétence {x1} a perdu {x2} niveaux et est maintenant au niveau {x3} !",
        "Your base {X} skill gained {X} levels and is now at level {X}!": "Votre compétence de base {x1} a gagné {x2} niveaux et est maintenant au niveau {x3} !",
        "Your base {X} skill lost {X} levels and is now at level {X}!": "Votre compétence de base {x1} a perdu {x2} niveaux et est maintenant au niveau {x3} !",
        "You have finished your manual of {X} and toss it away.": "Vous avez fini votre manuel de {x1} et le jetez.",
        "Clearing the skill training target for {X}.": "Objectif d’entraînement supprimé pour {x1}.",
        // --- Pouvoirs de dieux ---
        "Ashenzari invites you to chain yourself with knowledge{X}.": "Ashenzari vous invite à vous enchaîner avec le savoir{x1}.",
        "You cannot shatter the chains on {Y} while it is melded with your body!": "Vous ne pouvez pas briser les chaînes de {y1} tant qu’il est fusionné avec votre corps !",
        "You shatter the chains binding {Y}!": "Vous brisez les chaînes qui lient {y1} !",
        "{X} grants you and your allies divine vigour.": "{x1} accorde à vous et à vos alliés une vigueur divine.",
        "You lift the black torch aloft and begin your conquest of {X} in Yredelemnul's name!": "Vous levez la torche noire et commencez votre conquête de {x1} au nom de Yredelemnul !",
        "Your access to {X}'s decks is revoked.": "Votre accès aux paquets de {x1} est révoqué.",
        "Your {X} shines brightly!": "Votre {x1} brille intensément !",
        "A jealous {A} pursues it!": "{S1} jaloux la poursuit !",
        "A rebellious {A} escapes with it!": "{S1} rebelle s’enfuit avec !",
        "You utter a prayer to Makhleb and carve the {X} into yourself.": "Vous prononcez une prière à Makhleb et gravez {x1} dans votre chair.",
        "Pikel's spell is broken, but his former minions can only feel hate for you!": "Le sort de Pikel est brisé, mais ses anciens sbires ne peuvent ressentir que de la haine pour vous !",
        "Pikel's spell is broken, but his former minion can only feel hate for you!": "Le sort de Pikel est brisé, mais son ancien sbire ne peut ressentir que de la haine pour vous !",
        "With Pikel's spell broken, his former minions thank you for their freedom.": "Le sort de Pikel étant brisé, ses anciens sbires vous remercient de leur liberté.",
        "With Pikel's spell broken, his former minion thanks you for its freedom.": "Le sort de Pikel étant brisé, son ancien sbire vous remercie de sa liberté.",
        "Your strength is siphoned away as {X} grow{X} stronger!": "Votre force est siphonnée tandis que {x1} se renforce !",
        "The spells of {X} are empowered!": "Les sorts {d1} sont renforcés !",
        "Your power is siphoned away as the spells of {X} are empowered!": "Votre puissance est siphonnée tandis que les sorts {d1} sont renforcés !",
        "With your torch unlit, {p} soul goes wasted...": "Votre torche étant éteinte, son âme est gaspillée...",
        // --- Effets ---
        "You feel firmly anchored in space.": "Vous vous sentez fermement ancré dans l’espace.",
        "You feel more firmly anchored in space.": "Vous vous sentez encore plus fermement ancré dans l’espace.",
        "Your magic feels tainted.": "Votre magie semble corrompue.",
        "Your magic feels more tainted.": "Votre magie semble encore plus corrompue.",
        "Your will lashes out at {A}{X}": "Votre volonté frappe {o1}{x2}",
        "You feel life coursing into your body{X}": "Vous sentez la vie affluer dans votre corps{x1}",
        "{A} assumes the form of {X}{X}!": "{S1} prend la forme de {x2}{x3} !",
        "{A} shapes itself into a furious {X}!": "{S1} prend la forme d’un {x2} furieux !",
        "{A} is no longer {X}.": "{S1} n’est plus {x2}.",
        "{X} goes to deal, but finds you have enough {X} cards.": "{x1} s’apprête à distribuer, mais constate que vous avez assez de cartes {x2}.",
        "You are too depleted to draw on your {X} recklessly!": "Vous êtes trop épuisé pour puiser imprudemment dans votre {x1} !",
        "Your scales start taking on {X} colour.": "Vos écailles prennent peu à peu une couleur {x1}.",
        "{X} forbids using such a weapon!": "{x1} interdit d’utiliser une telle arme !",
        "{X} forbids the use of this item.": "{x1} interdit l’utilisation de cet objet.",
        "A thick mucus forms on {X}.": "Un épais mucus se forme sur {x1}.",
        "You attempt to bind {I} soul, but {p} is merely a clone!": "Vous tentez de lier l’âme {d1}, mais ce n’est qu’un clone !",
        "You wrap your dark will around {I} soul!": "Vous enroulez votre sombre volonté autour de l’âme {d1} !",
    // --- Compléments (0.10) ---
        "You bind {Y} in chains and feel the brush of Ashenzari's sight against your mind.": "Vous enchaînez {y1} et sentez l’effleurement du regard d’Ashenzari sur votre esprit.",
    "By Zin's power, the {X} is contained.": "Par la puissance de Zin, {x1} est contenu.",
    "There is a cloud of {X} here.": "Il y a ici un nuage de {x1}.",
    "{A} appears from out of thin air!": "{S1} apparaît de nulle part !",
    "{X} appears from out of thin air!": "{x1} apparaît de nulle part !",
    "{X} appears from out of your range of vision.": "{x1} apparaît hors de votre champ de vision.",
    "{X} has departed this plane of existence.": "{x1} a quitté ce plan d’existence.",
    "You block the {X}.": "Vous bloquez {x1}.",
    "The {X} is repelled.": "{x1} est repoussé.",
    "Autopickup disabled for {X}.": "Ramassage automatique désactivé pour {x1}.",
    "Waypoint {X} assigned to {X}.": "Point de repère {x1} assigné à {x2}.",
    "You shatter the chains binding {X}!": "Vous brisez les chaînes qui lient {x1} !",
    "{Y} remembers more of {p} old skill.": "{y1} se souvient mieux de son ancienne compétence.",
    "{Y} remembers how to cast {p} spells more powerfully.": "{y1} se souvient comment lancer ses sorts plus puissamment.",
    "{Y} remembers how to pin enemies in place with {p} attacks.": "{y1} se souvient comment clouer ses ennemis sur place avec ses attaques.",
    "{Y} remembers the full extent of {p} fortitude.": "{y1} se souvient de toute l’étendue de sa robustesse.",
    "{Y} wails in agony as it relives its own death.": "{y1} hurle d’agonie en revivant sa propre mort."
});
})();
