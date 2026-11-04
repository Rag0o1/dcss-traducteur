// Messages à variables, partie M (0.17.2) : relevés par l'audit du 03/11 (lutins du sort « Jinxbite », objets qui s'accordent au corps,
// aides de touches, descriptions d'armes et de monstres, menus). Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const AC = t => { const C = globalThis.DCSS_COMBAT; return C && C.acteurTexte ? C.acteurTexte(t) : null; };
    const sansArticle = r => r.replace(/^(?:le |la |les |l’|un |une |des )/, "");
    const poss = r => /^(?:les|des) /.test(r) ? "ses " : /^(?:la|une) /.test(r) ? "sa " : "son ";
    const traduit = (en) => { const r = T1(en); return r && r !== en ? r : null; };

    const BR = { "the Dungeon": "le Donjon", "the Temple": "le Temple", "the Lair of Beasts": "l’Antre des Bêtes", "the Orcish Mines": "les Mines Orques", "the Hive": "la Ruche",
        "the Vaults": "les Cryptes", "the Snake Pit": "la Fosse aux Serpents", "the Swamp": "le Marais", "the Shoals": "les Hauts-fonds", "the Spider Nest": "le Nid d’Araignées",
        "the Slime Pits": "les Fosses de Gelée", "the Elven Halls": "les Salles Elfiques", "the Depths": "les Profondeurs", "the Realm of Zot": "le Royaume de Zot",
        "the Abyss": "l’Abysse", "Pandemonium": "le Pandémonium", "the Crypt": "la Crypte", "the Tomb": "le Tombeau", "the Ossuary": "l’Ossuaire", "the Sewer": "l’Égout",
        "the Ice Cave": "la Grotte de Glace", "the Volcano": "le Volcan", "the Bazaar": "le Bazar", "the Labyrinth": "le Labyrinthe", "the Gauntlet": "l’Épreuve" };
    const brTrad = b => BR[b] || null;
    const deBr = f => f.replace(/^(?:le |la |l’|les )/, x => x === "le " ? "du " : x === "les " ? "des " : x === "la " ? "de la " : "de l’");
    const dansBr = f => /^l’/.test(f) ? "dans " + f : f.startsWith("le ") ? "dans le " + f.slice(3) : f.startsWith("la ") ? "dans la " + f.slice(3) : "dans " + f;

    // --- Monstres : états, réflexif, électrocution, orage ---
    T["{A} is electrocuted."] = "{S1} est électrocuté{e1}.";
    T["{A} is electrocuted!"] = "{S1} est électrocuté{e1} !";
    T["{A} is engulfed in a thunderstorm."] = "{S1} est englouti{e1} dans un orage.";
    T["The blast of metal fragments hits {A}!"] = "Le souffle de fragments de métal touche {o1} !";
    T["The blast of metal fragments hits {A}."] = "Le souffle de fragments de métal touche {o1}.";
    T["The blast of metal fragments misses {A}!"] = "Le souffle de fragments de métal rate {o1} !";
    T["The blast of metal fragments misses {A}."] = "Le souffle de fragments de métal rate {o1}.";
    T["The blast of metal fragments hits you!"] = "Le souffle de fragments de métal vous touche !";
    T["The blast of metal fragments misses you!"] = "Le souffle de fragments de métal vous rate !";
    T["{A} croaks regally."] = "{S1} coasse royalement.";
    R.push({ regex: /^(.+?) hits (?:itself|himself|herself|themselves) with (.+?)([.!])$/, translate: m => {
        const a = AC(m[1].replace(/^the /, "the ")) || (/^[A-Z]/.test(m[1]) ? AC(m[1]) : null); if (!a) return null;
        const o = traduit(m[2]) || (/^(?:an?|the) /.test(m[2]) ? null : traduit("a " + m[2])); if (!o) return null;
        return `${a.S} se frappe avec ${o}${m[3] === "!" ? " !" : "."}`; } });
    R.push({ regex: /^(.+?) catches (an? .+?) with (?:his|her|its|their) tongue\.$/, translate: m => {
        const a = AC(m[1]) || AC("the " + m[1]), b = AC(m[2]); if (!a || !b) return null; return `${a.S} attrape ${b.o} avec sa langue.`; } });
    R.push({ regex: /^(?:The |An? )?(.+?) is (quivering) (.+)\.$/, translate: m => {
        const a = AC("the " + m[1]); if (!a) return null; const o = traduit(m[3]) || traduit("a " + m[3]); if (!o) return null;
        return `${a.S} a ${o} au carquois.`; } });

    // --- Sort « Jinxbite » : les lutins ---
    R.push({ regex: /^A giggling sprite leaps out and (.+)$/, translate: m => {
        const reste = m[1]; let r;
        if ((r = /^bonks (.+?) with (?:its|his|her|their) (.+)\.$/.exec(reste))) {
            const a = AC(r[1].replace(/^the /, "the ")), o = traduit("the " + r[2]); if (!a || !o) return null;
            return `Un lutin ricaneur surgit et frappe ${a.o} avec ${poss(o)}${sansArticle(o)}.`; }
        if ((r = /^smacks (.+?) with (?:its|his|her|their) own (hand|foot|head)\.$/.exec(reste))) {
            const a = AC(r[1]); if (!a) return null; return `Un lutin ricaneur surgit et gifle ${a.o} avec ${{ hand: "sa propre main", foot: "son propre pied", head: "sa propre tête" }[r[2]]}.`; }
        if ((r = /^plays with (.+)\.$/.exec(reste))) { const a = AC(r[1]); return a ? `Un lutin ricaneur surgit et joue avec ${a.o}.` : null; }
        if ((r = /^ties (.+?) tail in a knot\.$/.exec(reste))) { const a = AC(r[1].replace(/['’]s$/, "").replace(/^(its|his|her|their)$/, "the x")); return a ? `Un lutin ricaneur surgit et noue la queue ${a.d} en un nœud.` : null; }
        if ((r = /^insults (.+?) ancestors\.$/.exec(reste))) { const a = AC(r[1].replace(/['’]s$/, "")); return a ? `Un lutin ricaneur surgit et insulte les ancêtres ${a.d}.` : null; }
        if ((r = /^doodles on (.+?) face\.$/.exec(reste))) { const a = AC(r[1].replace(/['’]s$/, "")); return a ? `Un lutin ricaneur surgit et gribouille sur le visage ${a.d}.` : null; }
        if ((r = /^makes (.+?) trip over (?:its|his|her|their) own (.+)\.$/.exec(reste))) {
            const a = AC(r[1]); const part = traduit(r[2]) || ({ foot: "pied", feet: "pieds", feet2: "pieds", tail: "queue", hoof: "sabot", hooves: "sabots", claw: "griffe", paw: "patte", paws: "pattes" })[r[2]]; if (!a || !part) return null;
            return `Un lutin ricaneur surgit et fait trébucher ${a.o} sur ${/^(?:pieds|sabots|griffes|pattes)$/.test(part) ? "ses propres" : "son propre"} ${part}.`; }
        return null; } });
    T["The jinxing sprites lose interest in you."] = "Les lutins maléfiques se désintéressent de vous.";
    T["The sprites lose interest in your situation."] = "Les lutins se désintéressent de votre situation.";
    T["You beckon some vexing sprites to accompany your attacks."] = "Vous appelez quelques lutins tourmenteurs pour accompagner vos attaques.";
    T["You beckon more vexing sprites to accompany your attacks."] = "Vous appelez d’autres lutins tourmenteurs pour accompagner vos attaques.";
    T["There is nobody nearby that the sprites are interested in."] = "Il n’y a personne à proximité qui intéresse les lutins.";
    T["You feel your willpower being sapped."] = "Vous sentez votre volonté s’éroder.";
    T["You can sustain at most one creature summoned by this spell."] = "Vous ne pouvez maintenir qu’une seule créature invoquée par ce sort.";
    T["Miscasting this spell causes magic contamination and also either poisons you or corrodes you."] = "Rater ce sort provoque une contamination magique et, en plus, vous empoisonne ou vous corrode.";

    // --- Objets qui s'accordent au corps (amulettes de régénération) ---
    R.push({ regex: /^The (.+?) (throbs? as (?:it attunes itself|they attune themselves) to your( uninjured)? body|cannot attune (?:itself|themselves) to your (injured|exhausted) body|feels? cold and inert)\.$/, translate: m => {
        const o = traduit("the " + m[1]); if (!o) return null; const pl = /^les /.test(o); const S = o.charAt(0).toUpperCase() + o.slice(1);
        if (/^throb/.test(m[2])) return `${S} ${pl ? "palpitent" : "palpite"} en s’accordant à votre corps${m[3] ? " indemne" : ""}.`;
        if (/^cannot/.test(m[2])) return `${S} ne ${pl ? "peuvent" : "peut"} pas s’accorder à votre corps ${m[4] === "injured" ? "blessé" : "épuisé"}.`;
        return `${S} ${pl ? "semblent froids et inertes" : /^la |^l’/.test(o) && !/^l’(?:amulette|épée)/.test(o) ? "semble froide et inerte" : "semble froid et inerte"}.`; } });
    R.push({ regex: /^You (start|continue|finish) removing your (amulet|ring|cloak|hat|helmet|gloves|boots|shield|armour)\.$/, translate: m => {
        const o = { amulet: "amulette", ring: "anneau", cloak: "cape", hat: "chapeau", helmet: "casque", gloves: "gants", boots: "bottes", shield: "bouclier", armour: "armure" }[m[2]];
        return `Vous ${{ start: "commencez à retirer", continue: "continuez à retirer", finish: "finissez de retirer" }[m[1]]} votre ${o}.`; } });

    // --- Puissance de sort, explosions, âmes ---
    R.push({ regex: /^You feel (?:a|an) (slight |strong |huge )?surge of power([.!])$/, translate: m => `Vous sentez un ${{ "slight ": "léger ",  "huge ": "énorme ", undefined: "" }[m[1]] || ""}afflux de puissance${m[2] === "!" ? " !" : "."}` });
    R.push({ regex: /^You feel (?:a|an) (extraordinarily |extremely )?numb sensation\.$/, translate: m => `Vous ressentez une sensation d’engourdissement${m[1] ? (/extra/.test(m[1]) ? " extraordinaire" : " extrême") : ""}.` });
    T["You hear an explosion!"] = "Vous entendez une explosion !";
    T["You must harvest more living souls to recharge this spell."] = "Vous devez récolter davantage d’âmes vivantes pour recharger ce sort.";
    T["you must harvest more living souls to recharge this spell."] = "vous devez récolter davantage d’âmes vivantes pour recharger ce sort.";
    T["Your icy armour will break if you move. Continue?"] = "Votre armure de glace se brisera si vous bougez. Continuer ?";
    R.push({ regex: /^Mmmm\.\.\. tastes like (.+)\.$/, translate: m => {
        const r = traduit("potion of " + m[1]); if (!r) return null; return `Mmmm... a le goût de ${r.replace(/^potion (?:de |d’)/, "")}.`; } });

    // --- Provenance d'un objet, branches ---
    R.push({ regex: /^You found it on level (\d+) of (the .+|Pandemonium)\.$/, translate: m => { const b = brTrad(m[2]); return b ? `Vous l’avez trouvé au niveau ${m[1]} ${deBr(b)}.` : null; } });
    R.push({ regex: /^You took it off (.+?) on level (\d+) of (the .+|Pandemonium)\.$/, translate: m => { const b = brTrad(m[3]); if (!b) return null;
        const a = /^[A-Z]/.test(m[1]) ? { o: m[1] } : AC(m[1]); if (!a) return null;
        return `Vous l’avez pris à ${/^(?:le|la|l’|les|un|une) /.test(a.o) ? a.o.replace(/^le /, "au ").replace(/^les /, "aux ") : a.o} au niveau ${m[2]} ${deBr(b)}.`; } });
    R.push({ regex: /^Welcome to (the .+|Pandemonium)!$/, translate: m => { const b = brTrad(m[1]); return b ? `Bienvenue ${dansBr(b)} !` : null; } });
    R.push({ regex: /^building (the .+|Pandemonium)$/, translate: m => { const b = brTrad(m[1]); return b ? `construction ${deBr(b)}` : null; } });

    // --- Description d'un escalier (le jeu ajoute « While standing here… ») ---
    R.push({ regex: /^(A staircase leading to .+?\.) (.+\.) While standing here, you can traverse (the staircase|the escape hatch|the gate|the portal) with the$/, translate: m => {
        const a = traduit(m[1]), b = traduit(m[2]); if (!a || !b) return null;
        const e = { "the staircase": "l’escalier", "the escape hatch": "la trappe de secours", "the gate": "la porte", "the portal": "le portail" }[m[3]];
        return `${a} ${b} Quand vous vous tenez ici, vous pouvez emprunter ${e} avec la touche`; } });
    R.push({ regex: /^key\. You have not yet explored it and cannot tell where it leads\.$/, translate: () => "Vous ne l’avez pas encore explorée et ne savez pas où elle mène." });
    R.push({ regex: /^key\.$/, translate: () => null });

    // --- Descriptions d'armes et d'objets (lignes coupées par le retour à la ligne) ---
    R.push({ regex: /^This weapon falls into the '(.+?)' category\. It has an extended reach \(target with \[$/, translate: m => `Cette arme appartient à la catégorie « ${traduit(m[1]) || m[1]} ». Elle a une allonge étendue (visez avec [` });
    R.push({ regex: /^\]\)\. It is a (one|two)-handed weapon\.$/, translate: m => `]). C’est une arme à ${m[1] === "one" ? "une main" : "deux mains"}.` });
    T["Wearing a shield would reduce your attack speed with this weapon."] = "Porter un bouclier réduirait votre vitesse d’attaque avec cette arme.";
    T["Wearing heavy armour would reduce your attack speed with this weapon."] = "Porter une armure lourde réduirait votre vitesse d’attaque avec cette arme.";
    T["If you transformed using this talisman:"] = "Si vous vous transformiez avec ce talisman :";
    T["It cannot be enchanted further."] = "Il ne peut pas être enchanté davantage.";
    T["This ancient artefact cannot be changed by magic or mundane means."] = "Cet artefact antique ne peut être modifié ni par la magie ni par des moyens ordinaires.";
    T["This creature has been created by magic and will cease to be once its creator"] = "Cette créature a été créée par magie et cessera d’exister dès que son créateur";
    T["dies."] = "meurt.";
    T["This monster has been created by magic and is temporary. Killing it yields no experience or items; it is incapable of using stairs."] = "Ce monstre a été créé par magie et est temporaire. Le tuer ne rapporte ni expérience ni objets ; il est incapable d’utiliser les escaliers.";
    R.push({ regex: /^Drain: It sometimes drains living victims \((\d+)\/(\d+) chance\)\. This deals an$/, translate: m => `Drain : Draine parfois les victimes vivantes (${m[1]} chance sur ${m[2]}). Cela inflige un` });
    T["additional one-quarter of any damage that pierces defenders' armour"] = "quart supplémentaire des dégâts qui percent l’armure du défenseur";
    R.push({ regex: /^as well as a flat (\d+)-(\d+) damage, and also weakens them slightly\.$/, translate: m => `ainsi que ${m[1]}-${m[2]} dégâts fixes, et les affaiblit légèrement.` });
    T["Pain: It inflicts extra damage on living creatures proportional to your"] = "Douleur : Inflige des dégâts supplémentaires aux créatures vivantes proportionnels à votre";
    T["Necromancy skill."] = "compétence en Nécromancie.";
    const SLOTS = { "Body Armour": "Armure", Gloves: "Gants", Boots: "Bottes", Barding: "Barde", Helmet: "Casque", Cloak: "Cape", Shield: "Bouclier" };
    R.push({ regex: /^Melds: (.+)$/, translate: m => { const l = m[1].split(", ").map(x => SLOTS[x]); return l.some(x => !x) ? null : "Fusionne : " + l.join(", "); } });
    const STATS = { strength: "force", dexterity: "dextérité", intelligence: "intelligence", evasion: "esquive", "armour class": "classe d’armure", stealth: "discrétion" };
    R.push({ regex: /^(Str|Dex|Int|EV|AC)([+-]\d+): It affects your ([a-z ]+) \(([+-]\d+)\)\.$/, translate: m => STATS[m[3]] ? `${m[1]}${m[2]} : Cela affecte votre ${STATS[m[3]]} (${m[4]}).` : null });
    R.push({ regex: /^It affects your ([a-z ]+) \(([+-]\d+)\)\.$/, translate: m => STATS[m[1]] ? `Cela affecte votre ${STATS[m[1]]} (${m[2]}).` : null });
    const RES = { cold: "froid", fire: "feu", poison: "poison", electricity: "électricité", "negative energy": "énergie négative", corrosion: "corrosion", "magic": "magie" };
    R.push({ regex: /^(r[A-Za-z]+[+-]*): It protects you from ([a-z ]+)\.$/, translate: m => RES[m[2]] ? `${m[1]} : Cela vous protège contre ${/^[aeiouyé]/.test(RES[m[2]]) ? "l’" : "le "}${RES[m[2]]}.` : null });
    const IMM = { torment: "le tourment", blinding: "l’aveuglement", steam: "la vapeur", miasma: "le miasme", drowning: "la noyade", poison: "le poison", fire: "le feu", cold: "le froid", electricity: "l’électricité" };
    const listeImm = s => { const l = s.split(/, | and /).map(x => IMM[x]); return l.some(x => !x) ? null : l.length < 2 ? l[0] : l.slice(0, -1).join(", ") + " et " + l[l.length - 1]; };
    R.push({ regex: /^It is immune to ([a-z, ]+?)(?:; and resistant to ([a-z, ]+?))?\.$/, translate: m => {
        const a = listeImm(m[1]); if (!a) return null; if (!m[2]) return `Il est immunisé contre ${a.replace(/(^| )l’|le |la /g, (x) => x)}.`;
        const b = listeImm(m[2]); return b ? `Il est immunisé contre ${a} ; et résistant à ${b.replace(/^le |^la |^l’/, x => x)}.` : null; } });

    T["It weakens both your willpower and the willpower of everyone you"] = "Il affaiblit à la fois votre volonté et celle de tous ceux que vous";
    T["hex, the latter of which is increased by your Evocations skill."] = "maudissez, ce dernier effet étant accru par votre compétence en Évocations.";
    T["It weakens both your willpower and the willpower of everyone you hex, the latter of which is increased by your Evocations skill."] = "Il affaiblit à la fois votre volonté et celle de tous ceux que vous maudissez, ce dernier effet étant accru par votre compétence en Évocations.";

    R.push({ regex: /^The (amulet) throbs as it attunes itself to your uninjured body\.$/, translate: () => "L’amulette palpite en s’accordant à votre corps indemne." });
    R.push({ regex: /^(r[A-Za-z]+): ([+∞-]+)$/, translate: m => `${m[1]} : ${m[2]}` });
    R.push({ regex: /^(Stealth|Will): ([+∞-]+)$/, translate: m => `${m[1] === "Stealth" ? "Discrétion" : "Volonté"} : ${m[2]}` });
    R.push({ regex: /^(Min|Max) (\d+) ([+-][\d.]+) (\d+) ([+-]\d+%)$/, translate: m => `${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}` });

    // --- Menus et aides de touches ---
    const FIXE = {
        "(q)uiver": "(q) carquois", "(w)ield": "(w) manier", "e(v)oke": "(v) évoquer", "Floor Items": "Objets au sol", "Inventory Items": "Objets de l’inventaire",
        "Equip or unequip which item?": "Équiper ou retirer quel objet ?", "Gang up on whom?": "Se liguer contre qui ?", "Inscribe with what?": "Inscrire quoi ?",
        "Generating dungeon...": "Génération du donjon...", "Space": "Espace", "Attack!": "Attaquer !", "Shout!": "Crier !", "t - Shout!": "t - Crier !", "Minion:": "Sbire :",
        "| Status": "| Statut", "|wield|wear|put on [": "|manier|porter|mettre [", "] toggle between ability selection and description.": "] bascule entre la sélection d’une capacité et sa description.",
        "- select action,": "- choisir l’action,", "- cycle Dir - look around, f - activate": "- parcourir Dir - regarder autour, f - activer", "- cycle Shift-Dir - straight line": "- parcourir Maj-Dir - ligne droite",
        "] to select)": "] pour choisir)", "Class: Nonliv.": "Classe : Non-vivant.", "Int: Mindless": "Int : Sans esprit",
        "A flower patch.": "Un parterre de fleurs.", "A walking alembic.": "Un alambic ambulant.", "A staircase to the Lair.": "Un escalier vers l’Antre.",
        "There is a cloud of sparse dust here.": "Il y a un nuage de poussière clairsemée ici.",
        "Upheaval": "Bouleversement", "Elemental Force": "Force élémentaire", "Eye of the Storm": "Œil de la tempête", "Prince Ribbit catches": "Prince Ribbit attrape",
        "boomerangs": "des boomerangs", "boomerang": "un boomerang",
        "Skill Regen Shed Tail HP Distraction Stab Chance": "Compétence Régén. Perte de queue PV Distraction Chance de coup",
    };
    for (const [en, fr] of Object.entries(FIXE)) if (!(en in T)) T[en] = fr;
    R.push({ regex: /^\((\d+)\/(\d+) uses available\)$/, translate: m => `(${m[1]}/${m[2]} utilisations disponibles)` });
    R.push({ regex: /^Spell assigned to '(.)'\.$/, translate: m => `Sort assigné à « ${m[1]} ».` });
    R.push({ regex: /^(Hit|Read): (.+)$/, translate: m => { const o = m[2].replace(/^([a-zA-Z]\) )?/, ""); const r = traduit(o) || traduit("a " + o); if (!r) return null; const pre = (/^([a-zA-Z]\) )/.exec(m[2]) || ["", ""])[1]; return `${m[1] === "Hit" ? "Frapper" : "Lire"} : ${pre}${r}`; } });
    R.push({ regex: /^(Cur|Min|Max) (\S.*)$/, translate: m => /^[\d.+% -]+$/.test(m[2]) ? `${{ Cur: "Act", Min: "Min", Max: "Max" }[m[1]]} ${m[2]}` : null });
    R.push({ regex: /^to set ([\d.]+) as a target for (.+)\.$/, translate: m => { const s = traduit(m[2]); return s ? `pour fixer ${m[1]} comme cible pour ${s}.` : null; } });
    const COMP = { Conjurations: "Conjurations", Translocations: "Translocations", Summonings: "Convocations", Hexes: "Maléfices", Necromancy: "Nécromancie", Invocations: "Invocations" };
    R.push({ regex: /^([a-zA-Z]) ([*+-]) ([A-Z][A-Za-z&' ]+?) (\d+(?:\.\d)?)$/, translate: m => { const n = COMP[m[3]] || traduit(m[3]); return n ? `${m[1]} ${m[2]} ${n} ${m[4]}` : null; } });
    R.push({ regex: /^([a-z]) \* ([A-Z][A-Za-z&' ]+)$/, translate: m => { const n = COMP[m[2]] || traduit(m[2]); return n ? `${m[1]} * ${n}` : null; } });
    R.push({ regex: /^([a-z]) - ([A-Z][A-Za-z' ]+?) (\d+) (HP|MP), Piety(-*) ?(\d+)%$/, translate: m => {
        const n = traduit(m[2]) || T[m[2]]; if (!n) return null; return `${m[1]} - ${n} ${m[3]} ${m[4] === "HP" ? "PV" : "PM"}, Piété${m[5]} ${m[6]} %`; } });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R.filter(r => typeof r.translate === "function"));
})();
