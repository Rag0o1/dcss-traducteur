// Messages, partie O (0.17.9) : verbes d'attaque des griffes, fioles de transmutation, boutiques et portails, aides de menus d'objets,
// phrases de monstres uniques. Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const AC = t => { const C = globalThis.DCSS_COMBAT; return C && C.acteurTexte ? C.acteurTexte(t) : null; };
    const traduit = en => { const r = T1(en); return r && r !== en ? r : null; };
    const cible = t => AC(t.replace(/^the /, "the ")) || (/^[A-Z]/.test(t) ? AC(t) : null);
    const NOMBRES = { one: "un", two: "deux", three: "trois", four: "quatre", five: "cinq", six: "six", seven: "sept", eight: "huit", nine: "neuf", ten: "dix", eleven: "onze", twelve: "douze" };

    // --- Verbes d'attaque du joueur (griffes, crocs, poings...) ---
    const VJ = { scratch: "égratignez", mangle: "mutilez", eviscerate: "éventrez", rip: "déchirez", batter: "rouez de coups", thrash: "rossez", buffet: "malmenez",
        chomp: "croquez", slap: "giflez", smack: "claquez", swat: "chassez d’un revers", gouge: "balafrez", nip: "pincez", lash: "fouettez", flagellate: "flagellez", flog: "fustigez", freeze: "gelez", skewer: "embrochez",
        touch: "touchez", gore: "encornez", blast: "frappez violemment", claw: "griffez", bite: "mordez", maul: "lacérez", shred: "déchiquetez", pummel: "martelez", punch: "frappez", hit: "frappez", crush: "écrasez" };
    const ponct = p => p === "!!" ? " !!" : p === "!" ? " !" : ".";
    R.push({ regex: new RegExp("^You (" + Object.keys(VJ).join("|") + ") (.+?)( mercilessly)?( but do no damage)?([.!]+)$"), translate: m => {
        const a = cible(m[2]); if (!a) return null;
        return `Vous ${VJ[m[1]]} ${a.o}${m[3] ? " sans pitié" : ""}${m[4] ? " sans lui infliger de dégâts" : ""}${ponct(m[5])}`; } });

    // --- Phrases de monstres ---
    Object.assign(T, {
        "{A} avoids the killing blow by scattering into a rainbow of bats!": "{S1} évite le coup mortel en se dispersant en un arc-en-ciel de chauves-souris !",
        "{A} casts a spell at you.": "{S1} lance un sort sur vous.", "{A} draws vitality from your injuries!": "{S1} puise de la vitalité dans vos blessures !",
        "{A} gestures wildly while chanting.": "{S1} gesticule frénétiquement en psalmodiant.", "{A} seems to speed up.": "{S1} semble accélérer.",
        "{A} seems overcome with grief.": "{S1} semble accablé{e1} de chagrin.", "{A} runs out of power.": "{S1} tombe en panne d’énergie.",
        "{A} drains your vigour!": "{S1} draine votre vigueur !", "{A} snorts and paws the ground.": "{S1} renâcle et piaffe.",
        "And she was my only...": "Et elle était ma seule...",
    });
    R.push({ regex: /^The (.+?) shimmers and (.+?) reappears in a puff of iridescent mist\.$/, translate: m => {
        const a = AC("the " + m[1]), b = cible(m[2]); if (!a || !b) return null; return `${a.S} scintille et ${b.o} réapparaît dans un nuage de brume irisée.`; } });
    R.push({ regex: /^A faint prismatic mist rises from (.+?)'s broken form and then dissipates\.$/, translate: m => {
        const a = cible(m[1]); return a ? `Une faible brume prismatique s’élève de la forme brisée ${a.d} puis se dissipe.` : null; } });
    R.push({ regex: /^With a metallic buzz, (.+?)'s clockwork bee launches itself at you\.$/, translate: m => {
        const a = cible(m[1]); return a ? `Dans un bourdonnement métallique, l’abeille mécanique ${a.d} se jette sur vous.` : null; } });
    R.push({ regex: /^(.+?) steals (\d+) of your (\d+) (.+?)!$/, translate: m => {
        const a = cible(m[1]); const o = traduit(`${m[3]} ${m[4]}`); if (!a || !o) return null; return `${a.S} vous vole ${m[2]} de vos ${o} !`; } });
    const plur = nom => nom.split(" ").map(w => /[sxz]$/.test(w) ? w : w + "s").join(" ");
    R.push({ regex: /^The (.+?) go into a battle-frenzy!$/, translate: m => {
        const mots = m[1].split(" "); const der = mots.pop();
        for (const c of [der.replace(/ies$/, "y"), der.replace(/ves$/, "f"), der.replace(/s$/, ""), der.replace(/es$/, "")]) {
            const a = AC("a " + mots.concat(c).join(" ")); if (a && a.n) return `Les ${plur(a.n.replace(/^(?:le |la |l’|les )/, ""))} entrent dans une frénésie de combat !`; }
        return null; } });
    R.push({ regex: /^\.\.\. while petrified by (.+)$/, translate: m => { const a = AC(m[1]); return a ? `… alors que pétrifié par ${a.o}` : null; } });

    R.push({ regex: /^(.+?) breathes, "(.+)"$/, translate: m => { const a = cible(m[1]); if (!a) return null; return `${a.S} souffle : « ${traduit(m[2]) || m[2]} »`; } });
    R.push({ regex: /^(an?) book of (.+)$/, translate: m => /^[A-Z]/.test(m[2]) && !traduit(m[0]) ? `${m[1] === "a" ? "un" : "un"} livre de ${m[2]}` : null });

    // --- Exploration, portails, sons ---
    Object.assign(T, {
        "Autopickup is now off.": "Le ramassage automatique est maintenant désactivé.", "Autopickup is now on.": "Le ramassage automatique est maintenant activé.",
        ") a gate leading back out of this place": ") une porte menant hors de cet endroit", "There is a wall there.": "Il y a un mur là.", "Splash!": "Plouf !",
        "You enter a bailey!": "Vous entrez dans une enceinte !", "You enter a sewer!": "Vous entrez dans un égout !",
        "There is an entrance to a bailey on this level. Hurry and find it before the portal closes forever!": "Il y a une entrée vers une enceinte sur ce niveau. Dépêchez-vous de la trouver avant que le portail ne se referme pour toujours !",
        "There is an entrance to a sewer on this level. Hurry and find it before the portal rusts away!": "Il y a une entrée vers un égout sur ce niveau. Dépêchez-vous de la trouver avant que le portail ne rouille !",
        "You hear the faint creaking of a portcullis.": "Vous entendez le faible grincement d’une herse.", "You hear the roar of battle.": "Vous entendez le fracas de la bataille.",
        "You hear the slow rusting of a drain.": "Vous entendez la lente rouille d’une bouche d’égout.", "You hear the sound of rushing water.": "Vous entendez le bruit d’une eau qui s’écoule à flots.",
        "You turn to flesh and can act again.": "Vous redevenez chair et pouvez agir à nouveau.", "You writhe in agony.": "Vous vous tordez de douleur.",
        "You are engulfed in a cloud of scalding steam.": "Vous êtes englouti dans un nuage de vapeur brûlante.", "You are too large for most types of armour.": "Vous êtes trop grand pour la plupart des types d’armure.",
        "This transformation would significantly lower your maximum hit points. Transform anyway?": "Cette transformation réduirait considérablement vos points de vie maximum. Se transformer quand même ?",
        "Really quaff the potion of mutation?": "Boire vraiment la potion de mutation ?",
        "You have gained great experience. Select the skills to train.": "Vous avez gagné énormément d’expérience. Choisissez les compétences à entraîner.",
        "Select the skills you want to be trained. The chosen skills will be raised to": "Choisissez les compétences à entraîner. Les compétences choisies seront portées au",
        "the level shown in": "niveau indiqué dans", "] buy marked items [": "] acheter sélection [", "- cycle Dir - move target": "- parcourir Dir - déplacer la cible",
        "Melee damage: -50%": "Dégâts de mêlée : -50 %", "Mutations Suppressed: Anatomy": "Mutations supprimées : Anatomie",
        "Skill EV Contam Dmg": "Comp. EV Contam Dég.", "Skill HP UC Base Dmg AC": "Comp. PV MN Base Dég. CA", "Skill Level > New Apt Skill Level > New Apt": "Comp. Niv. > Nouv. Apt Comp. Niv. > Nouv. Apt",
    });
    R.push({ regex: /^Found (one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+) (items?|altars?|gates? leading back out of this place|shops?|portals?|stairs?)\.$/, translate: m => {
        const n = NOMBRES[m[1]] || m[1]; const pl = !(m[1] === "one" || m[1] === "1");
        const N = { item: ["objet", "objets"], altar: ["autel", "autels"], shop: ["boutique", "boutiques"], portal: ["portail", "portails"], stair: ["escalier", "escaliers"] };
        const k = m[2].replace(/s$/, "");
        if (/^gate/.test(k)) return pl ? `${n.charAt(0).toUpperCase() + n.slice(1)} portes menant hors de cet endroit trouvées.` : "Porte menant hors de cet endroit trouvée.";
        const f = N[k]; if (!f) return null; return `${n.charAt(0).toUpperCase() + n.slice(1)} ${f[pl ? 1 : 0]} trouvé${/^(shop|portal)/.test(k) ? (k === "shop" ? "e" : "") : ""}${/^shop/.test(k) && pl ? "s" : /^(item|altar|portal|stair)/.test(k) && pl ? "s" : ""}.`.replace("trouvée", "trouvée"); } });
    R.push({ regex: /^You sensed (\d+) altars?(?:, and (\d+) shops?\/portals?)?\.$/, translate: m => `Vous avez senti ${m[1]} autel${+m[1] > 1 ? "s" : ""}${m[2] ? `, et ${m[2]} boutique/portail` : ""}.` });
    R.push({ regex: /^You bought it in a shop on level (\d+) of (the .+)\.$/, translate: m => {
        const B = { "the Dungeon": "du Donjon", "the Lair of Beasts": "de l’Antre des Bêtes", "the Orcish Mines": "des Mines Orques", "the Vaults": "des Cryptes", "the Depths": "des Profondeurs", "the Elven Halls": "des Salles Elfiques", "the Snake Pit": "de la Fosse aux Serpents", "the Swamp": "du Marais", "the Shoals": "des Hauts-fonds", "the Spider Nest": "du Nid d’Araignées", "the Slime Pits": "des Fosses de Gelée", "the Temple": "du Temple", "the Hive": "de la Ruche", "the Crypt": "de la Crypte", "the Tomb": "du Tombeau" };
        return B[m[2]] ? `Vous l’avez acheté dans une boutique au niveau ${m[1]} ${B[m[2]]}.` : null; } });
    R.push({ regex: /^Purchase items for (\d+) gold\? \(y\/N\)$/, translate: m => `Acheter les objets pour ${m[1]} pièces d’or ? (y/N)` });
    R.push({ regex: /^Lucky! The (.+?) is actually the (.+)$/, translate: m => {
        const a = traduit("the " + m[1]), b = traduit("the " + m[2].replace(/\.$/, "")); if (!a || !b) return null; return `Chanceux ! ${a.charAt(0).toUpperCase() + a.slice(1)} est en fait ${b.replace(/ de ([AEIOUYÉ])/g, " d’$1")}${/\.$/.test(m[2]) ? "." : ""}`; } });
    R.push({ regex: /^You pick up (.+?) and begin reading\.\.\.$/, translate: m => {
        const r = traduit(m[1]); const o = r || (/^[A-Z]/.test(m[1]) ? m[1] : null); return o ? `Vous ramassez ${o} et commencez à lire...` : null; } });
    R.push({ regex: /^Your (claws|hands|fangs|teeth|feet|tentacles|horns) burn!$/, translate: m => `Vos ${{ claws: "griffes", hands: "mains", fangs: "crocs", teeth: "dents", feet: "pieds", tentacles: "tentacules", horns: "cornes" }[m[1]]} brûlent !` });
    R.push({ regex: /^Your attack delay would (decrease|increase) by ([\d.]+) \(([\d.]+) -> ([\d.]+)\)\.$/, translate: m => `Votre délai d’attaque ${m[1] === "decrease" ? "diminuerait" : "augmenterait"} de ${m[2]} (${m[3]} -> ${m[4]}).` });
    R.push({ regex: /^- - (.+?) \(current attack\)$/, translate: m => { const n = { Claws: "Griffes", Fangs: "Crocs", Fists: "Poings", Hooves: "Sabots", Tentacles: "Tentacules", Horns: "Cornes" }[m[1]] || traduit(m[1]) || m[1]; return `- - ${n} (attaque actuelle)`; } });
    R.push({ regex: /^Str: ([+-]\d+)$/, translate: m => `For : ${m[1]}` });

    // --- Catégories d'objets dans les menus ---
    const CAT = { "Evocable Items": ["Objets évocables", "m"], Potions: ["Potions", "f"], Scrolls: ["Parchemins", "m"], Wands: ["Baguettes", "f"], Armour: ["Armures", "f"], "Hand Weapons": ["Armes mêlée", "f"],
        Missiles: ["Projectiles", "m"], Jewellery: ["Bijoux", "m"], "Magical Staves": ["Bâtons", "m"], Talismans: ["Talismans", "m"], Miscellaneous: ["Divers", "m"], Books: ["Livres", "m"] };
    R.push({ regex: /^(Evocable Items|Potions|Scrolls|Wands|Armour|Hand Weapons|Missiles|Jewellery|Magical Staves|Talismans|Miscellaneous|Books): \(Left\/Right\/Tab to switch category\)$/, translate: m => `${CAT[m[1]][0]} : (Gauche/Droite/Tab : catégorie)` });
    R.push({ regex: /^(Evocable Items|Potions|Scrolls|Wands|Armour|Hand Weapons|Missiles|Jewellery|Magical Staves|Talismans|Miscellaneous|Books) \(go to first with$/, translate: m => `${CAT[m[1]][0]} (${CAT[m[1]][1] === "f" ? "1re" : "1er"} avec` });
    R.push({ regex: /^(Cur|Min|Max) ([\d.+%d -]+)$/, translate: m => /\d/.test(m[2]) ? `${{ Cur: "Act", Min: "Min", Max: "Max" }[m[1]]} ${m[2]}` : null });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R.filter(r => typeof r.translate === "function"));
})();
