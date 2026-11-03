// Messages à variables, partie L (0.12.4) : relevés par l'audit de la version 0.12.1 (combat contre des morts-vivants, mains de zombie,
// lignes d'examen d'un monstre, menus de sorts, aides de touches). Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };

    // --- Combat et monstres ---
    T["{A} slams into the orcish idol!"] = "{S1} percute l’idole orque !";
    T["{A} breaks free of the zombie hands!"] = "{S1} se libère des mains de zombie !";
    T["The zombie hands constrict {A}."] = "Les mains de zombie étreignent {o1}.";
    T["The zombie hands constrict {A}!"] = "Les mains de zombie étreignent {o1} !";
    T["{A} brushes some snowflakes from their robe."] = "{S1} secoue quelques flocons de neige de sa robe.";
    for (const dieu of ["Beogh", "Zin", "Yredelemnul", "Makhleb", "Trog", "Okawaru", "Kikubaaqudgha", "Lugonu", "Xom", "Vehumet", "Sif Muna", "Jiyva"])
        T[`{A} calls upon ${dieu} to heal {A}.`] = `{S1} invoque ${dieu} pour soigner {o2}.`;
    for (const [p, il, son] of [["he", "il", "son"], ["she", "elle", "sa"], ["it", "il", "son"]]) {
        T[`{A} attacks as ${p} pursues you!`] = `{S1} attaque en vous poursuivant !`;
        T[`{A} spurs ${p === "he" ? "his" : p === "she" ? "her" : "its"} mount on.`] = "{S1} éperonne sa monture.";
    }
    T["{A} wobbles up and down alarmingly."] = "{S1} oscille de haut en bas de façon alarmante.";
    T["{A}'s face is buffeted by something unseen."] = "Le visage {d1} est malmené par quelque chose d’invisible.";
    T["You are splashed with acid!"] = "Vous êtes éclaboussé d’acide !";

    const JOUEUR = [["sock", "boxez"], ["thump", "cognez"]];
    for (const [en, fr] of JOUEUR) for (const p of [".", "!"]) T[`You ${en} {A}${p}`] = `Vous ${fr} {o1}${p === "!" ? " !" : "."}`;

    // --- Phrases fixes ---
    const FIXE = {
        "A malevolent force fills the Orcish Mines...": "Une force malveillante emplit les Mines orques...",
        "Welcome to the Orcish Mines!": "Bienvenue dans les Mines orques !",
        "The Realm of Zot is guarded by orbs of winter.": "Le Royaume de Zot est gardé par des orbes d’hiver.",
        "You hear a deafening roar!": "Vous entendez un rugissement assourdissant !",
        "You hear an angry growl.": "Vous entendez un grognement furieux.",
        "You cannot affect that.": "Vous ne pouvez pas affecter cela.",
        "Some shallow water.": "De l’eau peu profonde.",
        "[the floor.]": "[le sol.]",
        "dangerous": "dangereux",
        "Vehumet supports the use of this spell.": "Vehumet soutient l’utilisation de ce sort.",
        "(M)emorise this spell.": "(M)émoriser ce sort.",
        "Fragment what (e.g. wall or brittle monster)?:": "Fragmenter quoi (ex. : mur ou monstre fragile) ?:",
        "Goji, Who Cannot Be Seen": "Goji, Celui Qu’On Ne Peut Voir",
        "And Goji? Well. He's also here.": "Et Goji ? Eh bien. Il est là aussi.",
        "Goji shouts, \"Stealth is key to winning *all* battles.\"": "Goji crie : « La discrétion est la clé pour gagner *toutes* les batailles. »",
        "Something shouts, \"Escape, thou fragile dismal-dreaming toady!\"": "Quelque chose crie : « Fuis, fragile crapaud aux sombres rêves ! »",
        "An intrepid goblin who has somehow managed to tame a ghost moth as his mount. While the elaborate snarl of ropes he is using to remain upright on it surely undermines the moth's own mobility, even a hobbled ghost moth can be a deadly adversary.":
            "Un gobelin intrépide qui a réussi, on ne sait comment, à dompter un papillon fantôme pour en faire sa monture. Si l’enchevêtrement de cordes qu’il utilise pour rester en selle gêne sûrement la mobilité du papillon, même un papillon fantôme entravé peut être un adversaire mortel.",
        "He possesses the following magical abilities, which are affected by antimagic (but not silence):":
            "Il possède les capacités magiques suivantes, affectées par l’antimagie (mais pas par le silence) :",
        "He can fly.": "Il peut voler.", "She can fly.": "Elle peut voler.", "It can fly.": "Il peut voler.",
        "He can open doors.": "Il peut ouvrir les portes.", "She can open doors.": "Elle peut ouvrir les portes.", "It can open doors.": "Il peut ouvrir les portes.",
        "Size: Small": "Taille : petite", "Size: Tiny": "Taille : minuscule", "Size: Medium": "Taille : moyenne", "Size: Large": "Taille : grande",
        "Size: Little": "Taille : petite", "Size: Giant": "Taille : gigantesque",
        "Will: ++": "Volonté : ++", "Will: +": "Volonté : +", "Will: +++": "Volonté : +++",
        "To read a description, press the key listed above. (AdB) indicates damage (the sum of A B-sided dice), (x%) indicates the chance to defeat your Will, and (y) indicates the spell range; shown in red if you are in range.":
            "Pour lire une description, appuyez sur la touche indiquée ci-dessus. (AdB) indique les dégâts (la somme de A dés à B faces), (x%) indique la chance de vaincre votre Volonté, et (y) indique la portée du sort ; affichée en rouge si vous êtes à portée.",
        "The species aptitude is in": "L’aptitude de l’espèce est en",
        // Fragments de menus et d'aide (touches entre crochets)
        "'Of energy': It may return the magic spent to cast spells, but lowers their": "« D’énergie » : Elle peut restituer la magie dépensée pour lancer des sorts, mais diminue leur",
        "success rate. It always returns the magic spent on miscasts. The": "taux de réussite. Elle restitue toujours la magie dépensée sur les échecs. La",
        "spell refund chance is increased by your Evocations skill.": "chance de remboursement est augmentée par votre compétence Évocations.",
        "(w)ear": "porter (w)", "|wear|put on [": "|porter|mettre [", "- - Unarmed": "- - Mains nues", "Results at your position": "Résultats à votre position",
        "Results elsewhere": "Résultats ailleurs", "Choose an item to acquire.": "Choisissez un objet à acquérir.", "[offhand occupied]": "[main secondaire occupée]",
        "[toggle:": "[basculer :", "] equip|": "] équiper|", "] select item for acquirement": "] choisir l’objet à acquérir", "] to cycle)": "] pour parcourir)",
        "] toggle selected [": "] basculer la sélection [", "acquire": "acquérir", "studying 5 skills": "étude de 5 compétences",
        "wizardry (x1)": "sorcellerie (x1)",
        "Describe": "Décrire", "] Memorise|": "] Mémoriser|", "] equip|wield|": "] équiper|manier|", "] equip|wield|wear|": "] équiper|manier|porter|",
        "] help [": "] aide [", "] read|": "] lire|", "] search [": "] chercher [", "] select": "] sélectionner", "] toggle selected": "] basculer la sélection",
        "] toggle spell headers": "] basculer les en-têtes de sorts", "] toggle spell headers [": "] basculer les en-têtes de sorts [",
        "|Describe|Hide|Show [": "|Décrire|Cacher|Montrer [", "|Hide|Show [": "|Cacher|Montrer [", "|evoke [": "|évoquer [", "|put on [": "|mettre [",
        "|quaff|evoke [": "|boire|évoquer [", "|unequip": "|retirer", "skills [": "compétences [", "Letters toggle [": "Lettres, basculer [",
        "to add a new annotation)": "pour ajouter une nouvelle annotation)", "to cancel)": "pour annuler)", "to cast anyway.)": "pour lancer quand même.)",
        "for information about gods)": "pour des informations sur les dieux)", "for more information)": "pour plus d’informations)",
        "to reach them - yellow denotes antique shop)": "pour les rejoindre - le jaune indique une boutique d’antiquités)",
        "to reach them and": "pour les rejoindre et", "(press": "(appuyez sur",
        "You can't see any susceptible monsters within range! (Use": "Vous ne voyez aucun monstre vulnérable à portée ! (Utilisez",
        "Attacks Max Damage Range": "Attaques Dégâts max Portée",
    };
    for (const [en, fr] of Object.entries(FIXE)) if (!(en in T)) T[en] = fr;

    // --- Règles (nombres et listes) ---
    R.push({ regex: /^(?:He|She|It) has about (\d+)% to hit you\.$/, translate: m => `${/^He|It/.test(m.input) ? "Il" : "Elle"} a environ ${m[1]} % de chances de vous toucher.` });
    R.push({ regex: /^You have about (\d+)% to hit with (.+)\.$/, translate: m => { let o = T1(m[2]) || m[2]; if (o === m[2]) o = o.replace(/^the /, "le "); return o ? `Vous avez environ ${m[1]} % de chances de toucher avec ${o}.` : null; } });
    R.push({ regex: /^Power: (\d+)%$/, translate: m => `Puissance : ${m[1]} %` });
    R.push({ regex: /^Speed: (\d+)% \(attack: (\d+)%\)(?: \(normally travels (faster|slower) than you\))?$/, translate: m =>
        `Vitesse : ${m[1]} % (attaque : ${m[2]} %)` + (m[3] ? ` (se déplace normalement ${m[3] === "faster" ? "plus vite" : "plus lentement"} que vous)` : "") });
    R.push({ regex: /^(\d+) spell levels? left$/, translate: m => `${m[1]} niveau${+m[1] > 1 ? "x" : ""} de sort restant${+m[1] > 1 ? "s" : ""}` });
    R.push({ regex: /^Level annotation: (.+)$/, translate: m => `Annotation de niveau : ${m[1]}` });
    R.push({ regex: /^Found (\d+) gold pieces?,$/, translate: m => `Trouvé ${m[1]} pièce${+m[1] > 1 ? "s" : ""} d’or,` });
    R.push({ regex: /^Miscasting this spell causes magic contamination and also deals up to (\d+) cold or draining damage\.$/, translate: m =>
        `Un échec de lancement de ce sort provoque une contamination magique et inflige aussi jusqu’à ${m[1]} dégâts de froid ou de drain.` });
    R.push({ regex: /^With your current stats and equipment, training (.+?) to (\d+(?:\.\d)?) would reduce your failure rate to (\d+)%\. This would take about ([\d.]+) XLs\.$/, translate: m => {
        const comp = m[1].split(/ and /).map(s => T1(s) || s); const l = comp.length < 2 ? comp[0] : comp.slice(0, -1).join(", ") + " et " + comp[comp.length - 1];
        return `Avec vos caractéristiques et votre équipement actuels, entraîner ${l} à ${m[2]} réduirait votre taux d’échec à ${m[3]} %. Cela prendrait environ ${m[4]} niveaux d’expérience.`; } });
    R.push({ regex: /^The (.+?) (is|are) intact enough to wear\.$/, translate: m => {
        const o = T1("the " + m[1]); if (!o || o === "the " + m[1]) return null;
        if (m[2] === "are") return `${o.charAt(0).toUpperCase()}${o.slice(1)} sont assez intactes pour être portées.`;
        const fem = /^(?:la |l’(?:armure|robe|cotte|cuirasse|cape|écharpe|cagoule))/.test(o);
        return `${o.charAt(0).toUpperCase()}${o.slice(1)} est assez intact${fem ? "e" : ""} pour être porté${fem ? "e" : ""}.`; } });



    // --- Audit du 03/11 : acquisition, objets à accolades, résumé de personnage ---
    const OBJ = x => { // « the +9 lajatang of Goehean {freeze, rC+} » -> « le lajatang +9 de Goehean {freeze, rC+} »
        const b = /^(.*?)( \{.*\})?$/.exec(x); let nom = b[1]; const acc = b[2] || "";
        let r = T1(/^(?:the|an?) /.test(nom) ? nom : "the " + nom);
        if (!r || r === nom || r === "the " + nom) { const m = /^(?:the )?(.+?) of the ([A-Z][\w-]+)$/.exec(nom); if (!m) return null;
            let base = T1("the " + m[1]);
            if (!base || base === "the " + m[1]) { const E = { necromancy: "nécromancie", fire: "feu", ice: "glace", air: "air", earth: "terre", conjuration: "conjuration", alchemy: "alchimie", summoning: "invocation", poison: "poison", death: "mort", cold: "froid", energy: "énergie", wizardry: "sorcellerie" };
                const st = /^(\w+) staff$/.exec(m[1]); if (st && E[st[1]]) base = `le bâton de ${E[st[1]]}`; else if (m[1] === "ring") base = "l’anneau"; else if (m[1] === "amulet") base = "l’amulette"; else return null; }
            r = `${base} ${/^[AEIOUY]/.test(m[2]) ? "de l’" : "du "}${m[2]}`; }
        return r + acc; };
    R.push({ regex: /^Acquire (.+)\? \(y\/N\)$/, translate: m => { const o = OBJ(m[1]); return o ? `Acquérir ${o} ? (y/N)` : null; } });
    R.push({ regex: /^([a-z]) - (the .+)$/, translate: m => { const o = OBJ(m[2]); return o ? `${m[1]} - ${o}` : null; } });
    R.push({ regex: /^(the .+ \{.*\})$/, translate: m => OBJ(m[1]) });
    R.push({ regex: /^Your damage rating with (.+) is about (\d+) \(Base (\d+) x (\d+)% \(Str\) x (\d+)% \(Skill\) \+ (\d+) \(Ench\)\)\.$/, translate: m => {
        const o = OBJ(m[1]); return o ? `Votre potentiel de dégâts avec ${o} est d’environ ${m[2]} (Base ${m[3]} x ${m[4]} % (For) x ${m[5]} % (Compétence) + ${m[6]} (Ench.)).` : null; } });
    R.push({ regex: /^(\d+) matches$/, translate: m => `${m[1]} résultat${+m[1] > 1 ? "s" : ""}` });
    R.push({ regex: /^Spell refund chance: (\d+)% \(max (\d+)%\)$/, translate: m => `Chance de remboursement des sorts : ${m[1]} % (max ${m[2]} %)` });
    R.push({ regex: /^Your spell failure would worsen by up to (\d+)% \(press '!' for details\)\.$/, translate: m =>
        `Votre taux d’échec des sorts augmenterait de ${m[1]} % au maximum (appuyez sur « ! » pour les détails).` });
    R.push({ regex: /^You are studying (.+)\.$/, translate: m => {
        const l = m[1].split(/, | and /).map(x => T1(x) || x); const ll = l.length < 2 ? l[0] : l.slice(0, -1).join(", ") + " et " + l[l.length - 1];
        return `Vous étudiez ${ll}.`; } });
    const DE = x => /^le /.test(x) ? "du " + x.slice(3) : /^les /.test(x) ? "des " + x.slice(4) : /^la /.test(x) ? "de la " + x.slice(3) : /^l’/.test(x) ? "de l’" + x.slice(2) : "de " + x;
    R.push({ regex: /^You found it on level (\d+) of (.+)\.$/, translate: m => { const BR = { Dungeon: "du Donjon", Lair: "de l’Antre", "Orcish Mines": "des Mines orques" }; const b = BR[m[2].replace(/^the /, "")]; if (b) return `Vous l’avez trouvé au niveau ${m[1]} ${b}.`;
        const t = T1(m[2].replace(/^the /, "")); return t && t !== m[2].replace(/^the /, "") ? `Vous l’avez trouvé au niveau ${m[1]} ${DE("le " + t)}.` : null; } });
    R.push({ regex: /^(.+ \([A-Za-z]{4}\)) Turns: (\d+), Time: ([\d:]+)$/, translate: m => `${m[1]} Tours : ${m[2]}, Durée : ${m[3]}` });
    R.push({ regex: /^(\d+\/\d+) runes: (.+)$/, translate: m => { const RU = { decaying: "putrescente", serpentine: "serpentine" };
        return `${m[1]} runes : ${m[2].split(", ").map(r => RU[r] || r).join(", ")}`; } });
    const MUT = { "mud breath": "souffle de boue", "mud-swimmer": "nageur de boue", amphibious: "amphibie", "unfitting armour": "armure inadaptée", "cold-blooded": "sang froid" };
    R.push({ regex: /^[a-zA-Z][\w+ -]*(?:, [a-zA-Z][\w+ -]*)+$/, translate: m => {
        const out = []; let n = 0;
        for (const e of m.input.split(", ")) { let f = MUT[e];
            if (!f) { const a = /^AC (\+\d+)$/.exec(e); if (a) f = `CA ${a[1]}`; }
            if (!f) { const q = /^armoured tail (\d)$/.exec(e); if (q) f = `queue blindée ${q[1]}`; }
            if (!f) { const t = T1(e); if (t && t !== e) f = t; }
            if (f) n++; out.push(f || e); }
        return n >= 3 ? out.join(", ") : null; } });

    // --- Menu des compétences : « m - Conjurations 11.0 -- » ---
    const COMP = { Conjurations: "Conjurations", Translocations: "Translocations", Summonings: "Convocations", Hexes: "Maléfices", Necromancy: "Nécromancie" };
    R.push({ regex: /^([a-zA-Z]) - ([A-Z][A-Za-z&' ]+?) (\d+(?:\.\d)?)( --)?$/, translate: m => {
        const n = COMP[m[2]] || T1(m[2]); if (!n || n === m[2]) return null; return `${m[1]} - ${n} ${m[3]}${m[4] || ""}`; } });

    // --- Exclusions de déplacement : « exclusions: hydra and staircase » ---
    const EXCL = { staircase: "escalier", stairs: "escaliers", "down staircase": "escalier descendant", "up staircase": "escalier montant", portal: "portail", altar: "autel" };
    const nomExcl = x => { if (EXCL[x]) return EXCL[x]; const C = globalThis.DCSS_COMBAT; const a = C && C.acteurTexte ? C.acteurTexte("a " + x) : null;
        return a ? a.o.replace(/^(?:une?|l’|le|la) ?/, "") : null; };
    R.push({ regex: /^exclusions?: (.+)$/, translate: m => {
        const l = m[1].split(/, | and /).map(nomExcl); if (l.some(x => !x)) return null;
        const ll = l.length < 2 ? l[0] : l.slice(0, -1).join(", ") + " et " + l[l.length - 1];
        return `${/^exclusions/.test(m.input) ? "exclusions" : "exclusion"} : ${ll}`; } });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R.filter(r => typeof r.translate === "function"));
})();
