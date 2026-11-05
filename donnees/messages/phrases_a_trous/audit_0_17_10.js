// Messages, partie P (0.17.10) : relevé fait en regardant une vraie partie (spectateur) : fouets, rochers, fiches de monstres, tableaux d'attaques.
// Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const AC = t => { const C = globalThis.DCSS_COMBAT; return C && C.acteurTexte ? C.acteurTexte(t) : null; };
    const traduit = en => { const r = T1(en); return r && r !== en ? r : null; };
    const cible = t => AC(t) || (/^[A-Z]/.test(t) ? AC(t) : null);
    const ponct = p => p === "!!!" ? " !!!" : p === "!!" ? " !!" : p === "!" ? " !" : ".";

    Object.assign(T, {
        // --- Messages ---
        "A forgotten god smites you!": "Un dieu oublié vous foudroie !",
        "A malevolent force fills the Lair of Beasts...": "Une force malveillante emplit l’Antre des Bêtes...",
        "{A} opens the large door.": "{S1} ouvre la grande porte.", "You open the door.": "Vous ouvrez la porte.", "You open the large door.": "Vous ouvrez la grande porte.",
        "There is a large open door here.": "Il y a une grande porte ouverte ici.",
        "{A} forges a servant imbued with his destructive magic!": "{S1} forge un serviteur imprégné de sa magie destructrice !",
        "{A} drags you backwards!": "{S1} vous tire en arrière !", "{A} draws life force from you.": "{S1} aspire votre force vitale.",
        "{A} releases spores at you but does no damage.": "{S1} libère des spores sur vous mais ne vous inflige aucun dégât.",
        "The ghostly flame explodes!": "La flamme fantomatique explose !",
        "You are engulfed in excruciating misery.": "Vous êtes englouti dans une souffrance atroce.", "You are engulfed in spectral mist.": "Vous êtes englouti dans une brume spectrale.",
        "You feel doom gather around you.": "Vous sentez la fatalité s’amonceler autour de vous.", "Your toxic aura wanes.": "Votre aura toxique s’estompe.",
        "You send a boulder barrelling forward!": "Vous envoyez un rocher rouler droit devant !",
        "Your boulder slams into a wall and falls apart!": "Votre rocher percute un mur et se disloque !",
        "Your boulder slams into a tree and falls apart!": "Votre rocher percute un arbre et se disloque !",
        // --- Fiche de monstre ---
        "He can see invisible.": "Il peut voir l’invisible.", "She can see invisible.": "Elle peut voir l’invisible.", "It can see invisible.": "Il peut voir l’invisible.",
        "They can fly.": "Ils peuvent voler.", "They can see invisible.": "Ils peuvent voir l’invisible.", "They can open doors.": "Ils peuvent ouvrir les portes.",
        "He can fly.": "Il peut voler.", "She can fly.": "Elle peut voler.",
        "He has mastered the following spells, which are affected by silence and antimagic:": "Il maîtrise les sorts suivants, affectés par le silence et l’antimagie :",
        "She has mastered the following spells, which are affected by silence and antimagic:": "Elle maîtrise les sorts suivants, affectés par le silence et l’antimagie :",
        "They have mastered the following spells, which are affected by silence and antimagic:": "Ils maîtrisent les sorts suivants, affectés par le silence et l’antimagie :",
        "It possesses the following natural abilities:": "Il possède les capacités naturelles suivantes :",
        "He possesses the following natural abilities:": "Il possède les capacités naturelles suivantes :",
        "She possesses the following natural abilities:": "Elle possède les capacités naturelles suivantes :",
        "It will inflict a necromantic curse on its foe when destroyed.": "Il infligera une malédiction nécromantique à son ennemi lorsqu’il sera détruit.",
        "Slightly transparent:": "Légèrement transparent :", "Threat: Minor": "Menace : Mineure", "Class: Demonic": "Classe : Démoniaque", "Int: Animal": "Int : Animal",
        "This creature is normally invisible, but your magical sight allows you to see": "Cette créature est normalement invisible, mais votre vue magique vous permet de la voir",
        "it nonetheless. This has no effect on you, though any allies you have may not": "malgré tout. Cela n’a aucun effet sur vous, mais vos alliés pourraient ne pas",
        "be able to see it as you can.": "pouvoir la voir comme vous.",
        "Attacks Max Damage": "Attaques Dégâts max", "Attacks Max Damage After Damaging Hits": "Attaques Dégâts max après coups blessants",
        "Attack Max Damage Range After Damaging Hits": "Attaque Dégâts max Portée après coups blessants",
        "It is an uncommon potion.": "C’est une potion peu courante.", "This potion is completely useless to you.": "Cette potion vous est totalement inutile.",
        "Search for what [Enter for \".\"]?": "Chercher quoi [Entrée pour \".\"] ?",
        "(immune)": "(immunisé)", "Resists : None": "Résistances : Aucune", "Defences : AC": "Défenses : AC", "Frederick the Flawless": "Frederick l’Impeccable",
        "the +2 hood of the Assassin": "la capuche +2 de l’Assassin", "the ring of the Bedazzling Gods": "l’anneau des Dieux éblouissants",
    });

    // --- En-tête d'une fiche de monstre : « A bone dragon. » ---
    R.push({ regex: /^(?:An?|The) ([a-z][a-z' -]+)\.$/, translate: m => { const a = AC(m[0].slice(0, -1)); return a ? a.S + "." : null; } });

    // --- Rochers ---
    R.push({ regex: /^Your boulder barrels into (.+?)([.!]+)$/, translate: m => { const a = cible(m[1]); return a ? `Votre rocher fonce sur ${a.o}${ponct(m[2])}` : null; } });
    // --- Boomerang qui se brise ---
    R.push({ regex: /^The boomerang hits (.+?) and shatters for extra damage(!*)$/, translate: m => {
        const a = cible(m[1]); return a ? `Le boomerang touche ${a.o} et se brise en infligeant des dégâts supplémentaires${ponct(m[2] || "!")}` : null; } });

    // --- Liste des destinations : « H - [Crypt:2] an escape hatch in the ceiling » ---
    R.push({ regex: /^([A-Za-z]) - (\[[^\]]+\]) (.+)$/, translate: m => { const r = traduit(m[3]); return r ? `${m[1]} - ${m[2]} ${r}` : null; } });

    R.push({ regex: /^Range : (\d+)$/, translate: m => `Portée : ${m[1]}` });
    // --- Vitesse d'un monstre ---
    R.push({ regex: /^Speed: (\d+)% \(normally travels (slower|faster) than you\)$/, translate: m => `Vitesse : ${m[1]} % (normalement ${m[2] === "slower" ? "plus lent" : "plus rapide"} que vous)` });

    // --- Lignes « Ils ont ... » ---
    const PRON = { It: ["Il", "a", "est", "immunisé", "résistant"], He: ["Il", "a", "est", "immunisé", "résistant"], She: ["Elle", "a", "est", "immunisée", "résistante"],
        They: ["Ils", "ont", "sont", "immunisés", "résistants"] };
    R.push({ regex: /^(It|He|She|They) (?:has|have) (?:a )?(\d+)% chance to notice you each turn\.$/, translate: m => `${PRON[m[1]][0]} ${PRON[m[1]][1]} ${m[2]} % de chances de vous remarquer à chaque tour.` });
    R.push({ regex: /^(It|He|She|They) (?:has|have) about (\d+)% to hit you\.$/, translate: m => `${PRON[m[1]][0]} ${PRON[m[1]][1]} environ ${m[2]} % de chances de vous toucher.` });
    const ELEM = { torment: ["tourment", "m"], miasma: ["miasme", "m"], drowning: ["noyade", "f"], fire: ["feu", "m"], cold: ["froid", "m"], electricity: ["électricité", "f"],
        poison: ["poison", "m"], "negative energy": ["énergie négative", "f"], acid: ["acide", "m"], "sticky flame": ["flamme collante", "f"], "mind-affecting magic": ["magie mentale", "f"],
        "asphyxiation": ["asphyxie", "f"], "corrosion": ["corrosion", "f"], "rotting": ["pourriture", "f"] };
    const contre = k => { const [n, g] = ELEM[k]; return /^[aeiouyéèh]/i.test(n) ? "l’" + n : (g === "f" ? "la " : "le ") + n; };
    const aLe = k => { const [n, g] = ELEM[k]; return /^[aeiouyéèh]/i.test(n) ? "à l’" + n : g === "f" ? "à la " + n : "au " + n; };
    const liste = (txt, f) => { const p = txt.split(/, | and /).filter(Boolean); if (!p.every(x => ELEM[x])) return null; const r = p.map(f);
        return r.length > 1 ? r.slice(0, -1).join(", ") + " et " + r[r.length - 1] : r[0]; };
    R.push({ regex: /^(It is|He is|She is|They are) (immune to (.+?)|resistant to (.+?))(?:; and (immune to (.+?)|resistant to (.+?)))?\.$/, translate: m => {
        const p = PRON[m[1].split(" ")[0]]; const out = [];
        for (const [i, r] of [[3, 4], [6, 7]]) {
            if (m[i] !== undefined) { const l = liste(m[i], contre); if (!l) return null; out.push(`${p[3]} contre ${l}`); }
            if (m[r] !== undefined) { const l = liste(m[r], aLe); if (!l) return null; out.push(`${p[4]} ${l}`); }
        }
        return out.length ? `${p[0]} ${p[2]} ${out.join(" ; et ")}.`.replace(`${p[0]} ${p[2]}`, `${p[0]} ${p[2] === "est" ? "est" : "sont"}`) : null; } });

    // --- Tableau d'attaques d'un monstre ---
    const ATT = { Claw: "Griffe", Bite: "Morsure", Hit: "Coup", Touch: "Contact", Trample: "Piétin.", Sting: "Dard", Kick: "Coup pied", Butt: "Coup tête", Gore: "Encorn.",
        Peck: "Coup bec", "Tail slap": "Queue", Engulf: "Engloutis.", Crush: "Écrasem.", Constrict: "Étreinte", Punch: "Coup poing", Pinch: "Pincem.", Squeeze: "Étreinte", Smite: "Châtiment",
        Slash: "Taillade", Spit: "Crachat", Trunk: "Trompe", Headbutt: "Coup tête", Pound: "Martèle." };
    const EFFET = { "Drain health from the living": "Draine la santé des vivants", "Knock back the defender": "Repousse le défenseur", "Drag the defender backwards": "Tire le défenseur en arrière",
        "Drain life (max 10 damage)": "Drain de vie (max 10 dégâts)", "Drain life": "Drain de vie" };
    const effet = e => { if (!e) return ""; if (EFFET[e]) return " " + EFFET[e]; const r = traduit(e); return " " + (r || e); };
    R.push({ regex: new RegExp("^(?:(\\d+)x )?(" + Object.keys(ATT).join("|") + ") (\\d+)( each)?(?: (.+))?$"), translate: m => {
        if (m[5] && !EFFET[m[5]] && !traduit(m[5])) return null;
        return `${m[1] ? m[1] + "x " : ""}${ATT[m[2]]} ${m[3]}${m[4] ? " chacune" : ""}${effet(m[5])}`; } });
    R.push({ regex: /^Hit: ([+-]\d+) (.+?) \(([a-z ]+)\) (\d+(?: \+ \d+ \([a-z ]+\))?)(?: (\d+))?(?: (.+))?$/, translate: m => {
        const nom = traduit("a " + m[2]); if (!nom) return null;
        return `Coup : ${nom.replace(/^(?:une?|l’) ?/, "")} ${m[1]} (${m[3]}) ${m[4]}${m[5] ? " " + m[5] : ""}${effet(m[6])}`; } });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R);
})();
