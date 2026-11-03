// =====================================================================
//  divers.js : inventaire détaillé (bijoux, baguettes, bâtons, talismans, inscriptions),
//  bruits entendus, « Vous voyez ici », objectifs d'entraînement, et petites phrases isolées.
//  Pour corriger un mot : modifiez la ligne correspondante, ou ajoutez la vôtre dans MES-CORRECTIONS.js.
// =====================================================================
(() => {
    const objetBase = s => (typeof globalThis.DCSS_OBJET === "function" ? globalThis.DCSS_OBJET(s) : null);
    const tr = s => (typeof globalThis.DCSS_TRADUIRE_CHAINE === "function" ? globalThis.DCSS_TRADUIRE_CHAINE(s) : s);

    // type : [nom singulier, nom pluriel, genre]  puis effets « de ... »
    const TYPES = {
        ring: ["anneau", "anneaux", "m"], amulet: ["amulette", "amulettes", "f"],
        staff: ["bâton", "bâtons", "m"], wand: ["baguette", "baguettes", "f"], talisman: ["talisman", "talismans", "m"]
    };
    const PLURIEL = { rings: "ring", amulets: "amulet", staves: "staff", staffs: "staff", wands: "wand", talismans: "talisman" };
    const EFFETS = {
        ring: {
            "protection": "de protection", "protection from fire": "de protection contre le feu", "protection from cold": "de protection contre le froid",
            "poison resistance": "de résistance au poison", "slaying": "d’abattage", "see invisible": "de vision de l’invisible",
            "resist corrosion": "de résistance à la corrosion", "evasion": "d’évasion", "stealth": "de discrétion", "strength": "de force",
            "dexterity": "de dextérité", "intelligence": "d’intelligence", "wizardry": "de sorcellerie", "magical power": "de puissance magique",
            "flight": "de vol", "positive energy": "d’énergie positive", "willpower": "de volonté"
        },
        amulet: {
            "magic regeneration": "de régénération magique", "the acrobat": "de l’acrobate", "guardian spirit": "de l’esprit gardien",
            "faith": "de foi", "reflection": "de réflexion", "regeneration": "de régénération", "wildshape": "de métamorphose",
            "chemistry": "de chimie", "dissipation": "de dissipation", "nothing": "de rien"
        },
        staff: {
            "wizardry": "de sorcellerie", "power": "de puissance", "fire": "de feu", "cold": "de froid", "alchemy": "d’alchimie",
            "energy": "d’énergie", "necromancy": "de nécromancie", "conjuration": "de conjuration", "enchantment": "d’enchantement",
            "summoning": "d’invocation", "air": "d’air", "earth": "de terre", "channelling": "de canalisation"
        },
        wand: {
            "flame": "de flammes", "paralysis": "de paralysie", "digging": "de creusement", "iceblast": "d’explosion de glace",
            "polymorph": "de métamorphose", "charming": "de charme", "acid": "d’acide", "mindburst": "d’éclat mental",
            "light": "de lumière", "quicksilver": "de vif-argent", "roots": "de racines", "warping": "de distorsion"
        },
        talisman: { "death": "de la mort" }
    };
    // Talismans « quill talisman » : adjectif -> suffixe français
    const TALISMANS = {
        quill: "de plume", inkwell: "d’encrier", vision: "de vision", gecko: "de gecko", protean: "protéiforme", rimehorn: "de corne-givre",
        mist: "de brume", spider: "d’araignée", wellspring: "de source", scarab: "de scarabée", medusa: "de méduse", spore: "de spore",
        jade: "de jade", maw: "de gueule", serpent: "de serpent", eel: "d’anguille", blade: "de lame", lupine: "lupin", fortress: "de forteresse",
        granite: "de granit", hive: "de ruche", "dragon-coil": "d’enroulement de dragon", riddle: "d’énigme", sanguine: "sanguin", storm: "de tempête"
    };
    const RARETE = { "very common": "très courant", "very rare": "très rare", "rare": "rare", "uncommon": "peu courant", "common": "courant" };
    const INCONNUS = { scrolls: "parchemins", scroll: "parchemin", potions: "potions", potion: "potion", wands: "baguettes", wand: "baguette", rings: "anneaux", amulets: "amulettes" };

    // Traduit « a +6 ring of strength », « maw talismans », « 2 wands of light »... ou null.
    function objetPlus(src) {
        let s = src.trim();
        const direct = objetBase(s);
        if (direct !== null) return direct;
        let q;
        if ((q = s.match(/^(?:the )?([Rr]ing|[Aa]mulet|[Ss]taff|[Ww]and) of ([A-Z][\w' -]*)$/))) return `${({ ring: "l’anneau", amulet: "l’amulette", staff: "le bâton", wand: "la baguette" })[q[1].toLowerCase()]} de ${q[2]}`;
        if ((q = s.match(/^(?:the )?(ring|amulet) of ([A-Z][\w' -]*)$/))) return null;
        if ((q = s.match(/^(.+?) "([^"]+)"$/)) && !/^(ring|amulet|staff|wand) *$/i.test(q[1])) {
            const b = objetPlus(q[1]);
            if (b !== null) return `${b} « ${q[2]} »`;
        }
        if ((q = s.match(/^(.+?) of ((?:the )?[A-Z][\w' -]*)$/)) && !/^(ring|amulet|staff|wand|talisman)s?$/i.test(q[1])) {
            const b = objetPlus(q[1]);
            if (b !== null) return `${b} de ${q[2].replace(/^the /, "")}`;
        }
        let art = null, qty = null, bonus = null, m;
        if ((m = s.match(/^(an?|the)\s+/i))) { art = m[1].toLowerCase(); s = s.slice(m[0].length); }
        else if ((m = s.match(/^(\d+)\s+/))) { qty = m[1]; s = s.slice(m[0].length); }
        if ((m = s.match(/^([+-]\d+)\s+/))) { bonus = m[1]; s = s.slice(m[0].length); }
        let fr = null, genre = "m", pluriel = false;
        const DIVERS = { "condenser vane": ["ailette de condensation", "f"], "lightning rod": ["paratonnerre", "m"], "phantom mirror": ["miroir fantôme", "m"],
            "tin trumpet": ["trompette en fer-blanc", "f"], "box of beasts": ["boîte de bêtes", "f"], "sack of spiders": ["sac d’araignées", "m"], "crystal ball of energy": ["boule de cristal d’énergie", "f"],
            "orb of pyromania": ["orbe de pyromanie", "m"], "manual": ["manuel", "m"], "phial of floods": ["fiole de déluges", "f"], "spellbooks": ["livres de sorts", "m"], "runes": ["runes", "f"], "gems": ["gemmes", "f"], "manuals": ["manuels", "m"], "gold": ["or", "m"], "unknown magical staves": ["bâtons magiques inconnus", "m"],
            "weapon of protection": ["arme de protection", "f"], "assassin centipede": ["mille-pattes assassin", "m"], "thick runed staff": ["bâton épais runique", "m"], "twisted onyx ring": ["anneau d’onyx torsadé", "m"], "pair of runed gloves": ["paire de gants runiques", "f"],
            "barnacled rune of Zot": ["rune de Zot incrustée de bernacles", "f"], "rune of Zot": ["rune de Zot", "f"] };
        if (DIVERS[s] && !bonus) { const d = DIVERS[s]; fr = d[0]; genre = d[1]; pluriel = /s$/.test(s) && !/^(gold|manual)$/.test(s) && s !== "condenser vane"; }
        else if (DIVERS[s] && bonus) { const d = DIVERS[s]; fr = d[0]; genre = d[1]; }
        if ((m = s.match(/^(\d+) gold pieces?$/)) || (qty && /^gold pieces?$/.test(s))) { return `${qty || m[1]} pièce${(qty || m[1]) === "1" ? "" : "s"} d’or`; }
        if ((m = s.match(/^(.+) (baubles?)$/))) { pluriel = /s$/.test(m[2]); fr = `${pluriel ? "babioles" : "babiole"} de ${m[1]}`; genre = "f"; }
        else if ((m = s.match(/^(.+?) dragon scales$/))) { fr = `écailles de dragon ${({ swamp: "des marais", fire: "de feu", ice: "de glace", steam: "de vapeur", storm: "de tempête", gold: "d’or", shadow: "d’ombre", quicksilver: "de vif-argent", pearl: "nacré" })[m[1]] || m[1]}`; pluriel = true; genre = "f"; if (!art && !qty) art = "a"; }
        else if ((m = s.match(/^(darts?|javelins?|throwing nets?|stones?|large rocks?|sling bullets?|boomerangs?) ?(?:of (disjunction|dispersal|returning|exploding|penetration|poison|curare|frenzy))?$/)) && (m[2] || /net|rock|boomerang/.test(m[1]))) {
            const n = { dart: ["fléchette", "f"], javelin: ["javelot", "m"], "throwing net": ["filet", "m"], stone: ["pierre", "f"], "large rock": ["gros rocher", "m"], "sling bullet": ["balle de fronde", "f"], boomerang: ["boomerang", "m"] };
            const sing = m[1].replace(/s$/, "");
            const base = n[sing];
            if (base) { pluriel = /s$/.test(m[1]); const eg = { disjunction: "de disjonction", dispersal: "de dispersion", returning: "de retour", exploding: "explosive", penetration: "de pénétration", poison: "empoisonnée", curare: "au curare", frenzy: "de frénésie" }[m[2]] || ""; fr = `${pluriel ? base[0] + "s" : base[0]}${eg ? " " + eg : ""}`; genre = base[1]; }
        }
        if ((m = s.match(/^unknown (scrolls?|potions?|wands?|rings?|amulets?)$/i))) {
            const mot = INCONNUS[m[1].toLowerCase()];
            if (mot) { fr = `${mot} inconnu${/s$/.test(mot) ? "s" : ""}`; pluriel = /s$/.test(mot); genre = /^(potion|baguette|amulette)/.test(mot) ? "f" : "m"; if (/^parchemin|^anneau/.test(mot)) genre = "m"; fr = fr.replace(/inconnus?$/, x => (genre === "f" ? "inconnue" : "inconnu") + (pluriel ? "s" : "")); }
        }
        if (fr === null && (m = s.match(/^(?:(?:the|a|an) )?(ring|amulet|staff|staves|staffs|wand|wands|rings|amulets)\s+of\s+(.+)$/i)) ||
            (fr === null && (m = s.match(/^(rings|amulets|staves|staffs|wands|talismans) of (.+)$/i)))) {
            const kw = m[1].toLowerCase();
            const type = PLURIEL[kw] || kw;
            pluriel = !!PLURIEL[kw];
            const eff = EFFETS[type] && EFFETS[type][m[2].toLowerCase()];
            if (eff) { const t = TYPES[type]; fr = `${pluriel ? t[1] : t[0]} ${eff}`; genre = t[2]; }
        }
        if (fr === null && (m = s.match(/^(talismans?) of (death)$/i))) {
            pluriel = /s$/i.test(m[1]); fr = `${pluriel ? "talismans" : "talisman"} de la mort`;
        }
        if (fr === null && (m = s.match(/^([a-z-]+) (talismans?)(?: of ([A-Z][\w' -]*))?$/i)) && TALISMANS[m[1].toLowerCase()]) {
            pluriel = /s$/i.test(m[2]);
            fr = `${pluriel ? "talismans" : "talisman"} ${TALISMANS[m[1].toLowerCase()]}`;
            if (m[3]) fr += ` de ${m[3]}`;
        }
        if (fr === null && (m = s.match(/^(ring|amulet|staff|wand) "([^"]+)"$/i))) {
            const t = TYPES[m[1].toLowerCase()]; fr = `${t[0]} « ${m[2]} »`; genre = t[2];
        }
        if (fr === null) return null;
        let pref = "";
        if (qty) pref = qty + " ";
        else if (art === "the") pref = pluriel ? "les " : (genre === "f" ? "la " : "le ");
        else if (art) pref = genre === "f" ? "une " : "un ";
        return pref + fr + (bonus ? " " + bonus : "");
    }
    globalThis.DCSS_OBJET_PLUS = objetPlus;

    // Cœur d'une ligne d'objet avec ses décorations : « [Shoals:4] a +0 robe (1 further duplicate) {!q} »
    function ligneObjet(src, avecArticleNu) {
        let reste = src.trim();
        let point = "";
        if (/\.$/.test(reste) && !/\d\.$/.test(reste)) { point = "."; reste = reste.slice(0, -1); }
        const r = ligneObjetSansPoint(reste);
        return r === null ? null : r + point;
    }
    function ligneObjetSansPoint(reste) {
        let prefixe = "", suffixes = [];
        let m = reste.match(/^(\[[^\]]+\]) /);
        if (m) { prefixe = (m[1] === "[carried]" ? "[dans le sac]" : m[1]) + " "; reste = reste.slice(m[0].length); }
        if ((m = reste.match(/^([A-Za-z]) - (.+)$/)) && prefixe === "[dans le sac] ") { const o2 = ligneObjet(m[2]); return o2 === null ? null : `${prefixe}${m[1]} - ${o2}`; }
        // décorations de fin, de droite à gauche
        for (let i = 0; i < 6; i++) {
            let k;
            if ((k = reste.match(/^(.*?) (\{[^}]*\})$/))) { suffixes.unshift(k[2]); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(gained (\d+)\)$/))) { suffixes.unshift(`(+${k[2]})`); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \((\d+) further duplicates?\)$/))) { suffixes.unshift(`(${k[2]} doublon${+k[2] > 1 ? "s" : ""} de plus)`); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \((very rare|very common|rare|uncommon|common)\)$/))) { suffixes.unshift(`(${RARETE[k[2]]})`); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \((weapon|worn|quivered|in hand|active)\)$/))) { suffixes.unshift(`(${{ weapon: "arme", worn: "porté", quivered: "carquois", "in hand": "en main", active: "actif" }[k[2]]})`); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) (\(\d+(?:\/\d+)?\))$/))) { suffixes.unshift(k[2]); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(unknown\)$/))) { suffixes.unshift("(inconnu)"); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(owned: (\d+)\)$/))) { suffixes.unshift(`(possédé : ${k[2]})`); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(inert\)$/))) { suffixes.unshift("(inerte)"); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(melded\)$/))) { suffixes.unshift("(fusionné)"); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(carried\)$/))) { suffixes.unshift("(dans le sac)"); reste = k[1]; continue; }
            if ((k = reste.match(/^(.*?) \(here\)$/))) { suffixes.unshift("(ici)"); reste = k[1]; continue; }
            break;
        }
        let prix = "";
        if ((m = reste.match(/^(\d+) gold (.+)$/))) { prix = `${m[1]} or `; reste = m[2]; }
        const o = objetPlus(reste) ?? (prix ? reste : null);
        if (o === null) return null;
        if (prix) return prefixe + prix + o + (suffixes.length ? " " + suffixes.join(" ") : "");
        return prefixe + o + (suffixes.length ? " " + suffixes.join(" ") : "");
    }
    globalThis.DCSS_LIGNE_OBJET = ligneObjet;

    const SONS = {
        "a bellow": "un mugissement", "a chilling moan": "un gémissement glaçant", "a faint skittering sound": "un faible bruit de cliquetis",
        "a hideous shriek": "un cri hideux", "a screech": "un hurlement strident", "a shout": "un cri", "a skittering sound": "un bruit de cliquetis",
        "a splash": "un éclaboussement", "an angry buzzing noise": "un bourdonnement furieux", "an angry hiss": "un sifflement furieux"
    };

    const FIXES = {
        "A freezing mist starts to gather...": "Une brume glaciale commence à se former…",
        "A rock wall.": "Un mur de roche.", "Some deep water.": "De l’eau profonde.", "An escape hatch in the floor.": "Une trappe de secours dans le sol.",
        "A sentinel's mark forms upon you.": "La marque d’une sentinelle se forme sur vous.",
        "As you read the scroll of blinking, it crumbles to dust.": "Alors que vous lisez le parchemin de clignotement, il s’effrite en poussière.",
        "Barbed spikes become lodged in your body.": "Des pointes barbelées se logent dans votre corps.",
        "More barbed spikes become lodged in your body.": "D’autres pointes barbelées se logent dans votre corps.",
        "The barbed spikes dig painfully into your body as you move.": "Les pointes barbelées s’enfoncent douloureusement dans votre corps quand vous bougez.",
        "The barbs in your skin will harm you if you move. Continue?": "Les barbes dans votre peau vous blesseront si vous bougez. Continuer ?",
        "You carefully extract the barbed spikes from your body.": "Vous extrayez avec précaution les pointes barbelées de votre corps.",
        "Clouds condense from the air!": "Des nuages se condensent dans l’air !",
        "The Realm of Zot is guarded by orbs of entropy.": "Le Royaume de Zot est gardé par des orbes d’entropie.",
        "The air twists around and strikes you!": "L’air se tord autour de vous et vous frappe !",
        "The alarm trap emits a blaring wail!": "Le piège d’alarme émet un hurlement strident !",
        "The condenser dries out!": "Le condenseur se tarit !",
        "The current training targets, if any.": "Les objectifs d’entraînement actuels, le cas échéant.",
        "The liquid fire burns you. You resist.": "Le feu liquide vous brûle. Vous résistez.",
        "The relative cost of raising each skill is in": "Le coût relatif d’amélioration de chaque compétence est en",
        "The fauns go into a battle-frenzy!": "Les faunes entrent dans une frénésie de combat !",
        "The flask of dizzying concoctions shatters into a vile cloud!": "La fiole de mixtures étourdissantes se brise en un nuage infect !",
        "The mirror clouds!": "Le miroir se couvre de buée !", "The now-empty wand crumbles to dust.": "La baguette désormais vide s’effrite en poussière.",
        "The open air twists around violently and strikes you!": "L’air libre se tord violemment et vous frappe !",
        "The open air twists around violently and strikes you!!": "L’air libre se tord violemment et vous frappe !!",
        "The sentinel's mark upon you fades away.": "La marque de la sentinelle sur vous s’estompe.",
        "The shadowy forms in the deep grow still as others approach.": "Les formes d’ombre dans les profondeurs s’immobilisent à l’approche d’autres.",
        "The shadowy forms in the deep grow still as others approach. x2": "Les formes d’ombre dans les profondeurs s’immobilisent à l’approche d’autres. x2",
        "The teleport trap disappears.": "Le piège de téléportation disparaît.", "The water rises up and strikes you!": "L’eau se dresse et vous frappe !",
        "The water rises up and strikes you.": "L’eau se dresse et vous frappe.", "Found two stone staircases leading up.": "Deux escaliers de pierre montants repérés.",
        "Your life force feels restored.": "Votre force vitale vous semble restaurée.", "Y - Yes": "Y - Oui",
        "X - Renounce Religion None 0%": "X - Renier sa religion Aucun 0 %",
        "The percentage of incoming experience used to train each skill is in ": "Le pourcentage d’expérience reçue servant à entraîner chaque compétence est en ",
        "Skills enhanced by cross-training are in ": "Les compétences améliorées par l’entraînement croisé sont en ",
        "Help": "Aide", "set skill target": "définir un objectif", "clear selected target": "effacer l’objectif choisi",
        "all skills": "toutes", "all\u00a0skills": "toutes", "cost": "coût", "base": "base", "auto": "auto", "mode": "mode", "skills": "compétences",
        "(=)adjust": "(=)ajuster", "(d)rop": "(d)époser", "(i)nscribe": "(i)nscrire", "(s)kill target": "(s) objectif de compétence",
        "(helmet unavailable)": "(casque indisponible)", "(no amulet)": "(pas d’amulette)", "(no offhand)": "(pas de main gauche)", "(no ring)": "(pas d’anneau)",
        "(nimble swimmer 1)": "(nageur agile 1)", "(You are camouflaged when in or above water. (Stealth+))": "(Vous êtes camouflé dans l’eau ou au-dessus. (Discrétion+))",
        ": Suppressed.": " : Supprimé.", "A gate leading back out of this place.": "Une porte menant hors de cet endroit.", "A huge open translucent gate.": "Un immense portail translucide ouvert.",
        "A magic dart appears from out of thin air!": "Une fléchette magique surgit de nulle part !", "A metal wall.": "Un mur de métal.", "A shop.": "Une boutique.",
        "A stone wall.": "Un mur de pierre.", "A translucent stone wall.": "Un mur de pierre translucide.", "A transporter.": "Un transporteur.", "An alarm trap.": "Un piège d’alarme.",
        "A phantom.": "Un fantôme.", "An ogre.": "Un ogre.", "Asleep:": "Endormi :", "Class: Natural": "Classe : Naturel", "Class: Undead": "Classe : Mort-vivant",
        "Description": "Description", "Description |": "Description |", "Description | Status |": "Description | Statut |", "| Quote": "| Citation", "| Status | Quote": "| Statut | Citation", "Quote": "Citation",
        "Attack Max Damage": "Attaque Dégâts max", "Attack Max Damage After Damaging Hits": "Attaque Dégâts max après coups blessants",
        "Gold:": "Or :", "Health:": "Santé :", "Magic:": "Magie :", "Next:": "Suivant :", "Threat: High": "Menace : Élevée", "Threat: Lethal": "Menace : Mortelle",
        "Size: Large": "Taille : Grande", "Size: Medium": "Taille : Moyenne", "Int: Human": "Int : Humain",
        "It can fly.": "Il peut voler.", "It can open doors.": "Il peut ouvrir les portes.", "It is insubstantial and immune to ensnarement.": "Il est immatériel et immunisé contre l’entrave.",
        "It is immune to torment; and resistant to miasma and drowning.": "Il est immunisé au tourment ; et résistant au miasme et à la noyade.",
        "It is immune to torment; and resistant to acid and corrosion, miasma and drowning.": "Il est immunisé au tourment ; et résistant à l’acide et à la corrosion, au miasme et à la noyade.",
        "Level annotation: Menkaure": "Annotation de niveau : Menkaure", "Level annotation: exclusion: 2 ogres": "Annotation de niveau : exclusion : 2 ogres",
        "Level annotation: exclusion: ribbon worm": "Annotation de niveau : exclusion : ver ruban",
        "Placed new exclusion.": "Nouvelle exclusion placée.", "Removed exclusion.": "Exclusion retirée.", "Reduced exclusion size to a single square.": "Taille d’exclusion réduite à une seule case.",
        "Stopped running for exclusion.": "Course interrompue à cause d’une exclusion.", "Partly explored, unvisited transporter.": "Exploré en partie, transporteur non visité.",
        "Press the letter of a skill to read its description.": "Appuyez sur la lettre d’une compétence pour lire sa description.",
        "Press: ? - help, . - travel": "Appuyez : ? - aide, . - voyager", "Press: ? - help, . - travel, g - get item": "Appuyez : ? - aide, . - voyager, g - ramasser",
        "There are many items here.": "Il y a beaucoup d’objets ici.", "There is a collapsed entrance here.": "Il y a une entrée effondrée ici.",
        "There is a gate leading back out of this place here.": "Il y a ici une porte menant hors de cet endroit.", "There is a huge open translucent gate here.": "Il y a ici un immense portail translucide ouvert.",
        "There is a mourning vase here.": "Il y a un vase de deuil ici.", "There is a transporter here.": "Il y a un transporteur ici.",
        "There is an empty arch of ancient stone here.": "Il y a ici une arche vide de pierre ancienne.", "There is an escape hatch in the floor here.": "Il y a une trappe de secours dans le sol ici.",
        "Welcome back to the Dungeon!": "Bon retour dans le Donjon !",
        "You are a hypnotic gecko-hybrid.": "Vous êtes un hybride de gecko hypnotique.", "You are amphibious.": "Vous êtes amphibie.", "You are immune to blinding.": "Vous êtes immunisé contre l’aveuglement.",
        "You begin transforming.": "Vous commencez à vous transformer.", "You continue transforming.": "Vous continuez à vous transformer.", "Your transformation has ended.": "Votre transformation est terminée.",
        "You can access your shopping list by pressing '$'.": "Vous pouvez accéder à votre liste d’achats en appuyant sur « $ ».", "You can wear up to eight rings at the same time.": "Vous pouvez porter jusqu’à huit anneaux en même temps.",
        "You can't see that place.": "Vous ne voyez pas cet endroit.", "You cannot wear most types of armour.": "Vous ne pouvez pas porter la plupart des armures.",
        "You climb upwards.": "Vous montez.", "You close the large door.": "Vous fermez la grande porte.", "You open the large door.": "Vous ouvrez la grande porte.",
        "You condense the dungeon air into a potion of mist.": "Vous condensez l’air du donjon en une potion de brume.", "You create potions of mist as you explore.": "Vous créez des potions de brume en explorant.",
        "You drain its power.": "Vous drainez sa puissance.", "You enter the deep water.": "Vous entrez dans l’eau profonde.", "You enter the transporter and appear at another place.": "Vous entrez dans le transporteur et apparaissez ailleurs.",
        "You feel agile.": "Vous vous sentez agile.", "You feel invigorated.": "Vous vous sentez revigoré.", "You feel the doom around you dissipate.": "Vous sentez la fatalité autour de vous se dissiper.", "Your doom draws closer.": "Votre fatalité se rapproche.",
        "You grip the centipede bauble in your tentacle and it winds around your tentacle and fuses with it.": "Vous saisissez la babiole mille-pattes dans votre tentacule ; elle s’enroule autour et fusionne avec lui.",
        "You have 6 tentacles available for constriction.": "Vous avez 6 tentacules disponibles pour étreindre.", "You have tentacles for arms and can constrict up to eight enemies at once.": "Vous avez des tentacules à la place des bras et pouvez étreindre jusqu’à huit ennemis à la fois.",
        "You hear a howl!": "Vous entendez un hurlement !", "You hear a loud, deep croak!": "Vous entendez un fort coassement grave !", "You hear some strange, mumbled words.": "Vous entendez d’étranges paroles marmonnées.",
        "You hit something.": "Vous frappez quelque chose.", "You need to enable at least one skill for training.": "Vous devez activer au moins une compétence à entraîner.", "You need to enable at least one skill.": "Vous devez activer au moins une compétence.",
        "You reach to attack!": "Vous tendez le bras pour attaquer !", "Your weapon can't reach that far!": "Votre arme ne porte pas aussi loin !",
        "Your assassin centipede leaps free of your tentacle with a hiss!": "Votre mille-pattes assassin se libère de votre tentacule d’un bond en sifflant !",
        "Your head dissolves into a mane of billowing mist!": "Votre tête se dissout en une crinière de brume ondoyante !", "Your head is a mane of billowing mist.": "Votre tête est une crinière de brume ondoyante.",
        "Your helmet is melded.": "Votre casque est fusionné.", "Melds: Helmet": "Fusionne : Casque", "Your movement speed is average.": "Votre vitesse de déplacement est moyenne.",
        "Your spells take twice as long to cast.": "Vos sorts prennent deux fois plus de temps à lancer.", "Your tail finishes growing back.": "Votre queue finit de repousser.",
        "Your teeth grow very long and razor-sharp.": "Vos dents deviennent très longues et tranchantes comme des rasoirs.",
        "Drinking potions allow you to spray harmful clouds.": "Boire des potions vous permet de projeter des nuages nocifs.",
        "potion clouds, gather mist, slow casting, almost no armour, amphibious, 8 rings, camouflage 1, gelatinous body 1,": "nuages de potions, collecte de brume, lancer lent, presque aucune armure, amphibie, 8 anneaux, camouflage 1, corps gélatineux 1,",
        "mistmane-form": "forme de crinière de brume", "mist talisman": "talisman de brume", "no passive effects": "aucun effet passif",
        "heavily damaged": "lourdement endommagé", "lightly damaged": "légèrement endommagé", "moderately damaged": "modérément endommagé", "severely damaged": "gravement endommagé",
        "Speed: 100% (attack: 66%)": "Vitesse : 100 % (attaque : 66 %)", "Skill Cloud range Cloud duration Distill rate": "Compétence Portée du nuage Durée du nuage Taux de distillation",
        "Melee attacks you make against this creature will deal greatly increased": "Vos attaques de mêlée contre cette créature infligeront des dégâts considérablement accrus",
        "damage, especially if made with a short blade.": "dégâts, surtout avec une lame courte.", "deal increased damage.": "infligeront des dégâts accrus.",
        "will awaken it, though melee attacks against it (even by other monsters) will": "le réveillera, mais les attaques de mêlée contre elle (même par d’autres monstres)",
        "This creature is unable to move, act, block, or dodge. Any hostile action": "Cette créature est incapable de bouger, d’agir, de bloquer ou d’esquiver. Toute action hostile",
        "However, the lack of typical mouth parts makes it difficult to pronounce incantations, greatly slowing the speed at which they cast spells.": "Cependant, l’absence de pièces buccales typiques rend difficile la prononciation d’incantations, ce qui ralentit grandement la vitesse à laquelle ils lancent des sorts.",
        "for a general explanation of skilling and the various toggles.": "pour une explication générale de l’entraînement et des divers réglages.",
        "to set 14.0 as a target for Shapeshifting.": "pour fixer 14.0 comme objectif pour Métamorphose.",
        "Gear: 13/52 gear slots (Left/Right/Tab to switch category)": "Équipement : 13/52 emplacements (Gauche/Droite/Tab pour changer de catégorie)",
        "Enter": "Entrée", "Missiles (go to first with": "Projectiles (aller au premier avec", "Talismans (go to first with": "Talismans (aller au premier avec",
        "Jewellery (go to first with": "Bijoux (aller au premier avec", "Magical Staves (go to first with": "Bâtons magiques (aller au premier avec", "Scrolls (select first with": "Parchemins (sélectionner le premier avec",
        "] buy shopping list [": "] acheter la liste d’achats [", "] choose item": "] choisir l’objet", "] exit [": "] quitter [", "] mark item for purchase [": "] marquer l’objet à acheter [",
        "] put item on shopping list": "] mettre l’objet dans la liste d’achats", "] skill descriptions": "] descriptions des compétences", "] sort (type) [": "] trier (type) [", "] to target/travel)": "] pour viser/voyager)",
        "|examine items [": "|examiner les objets [", "|examine|delete items [": "|examiner|supprimer les objets [",
        "Welcome to Fatsuqij's Magic Scroll Boutique! What would you like to do?": "Bienvenue à la Boutique de parchemins magiques de Fatsuqij ! Que souhaitez-vous faire ?",
        "Welcome to Joxeinia's Assorted Antiques! What would you like to do?": "Bienvenue aux Antiquités variées de Joxeinia ! Que souhaitez-vous faire ?",
        "Found Fatsuqij's Magic Scroll Boutique.": "Boutique de parchemins magiques de Fatsuqij repérée.", "Found Joxeinia's Assorted Antiques.": "Antiquités variées de Joxeinia repérées.",
        "There is an entrance to Fatsuqij's Magic Scroll Boutique here.": "Il y a ici l’entrée de la Boutique de parchemins magiques de Fatsuqij.",
        "There is an entrance to Joxeinia's Assorted Antiques here.": "Il y a ici l’entrée des Antiquités variées de Joxeinia.",
        "Found a gate leading back out of this place.": "Porte menant hors de cet endroit repérée.", "Found a book of Armaments.": "Livre d’Armements repéré.", "Found a parchment of Magnavolt.": "Parchemin de Magnavolt repéré.",
        "An invisible orc wizard is probably nearby! (Press *t to temporarily disregard this.)": "Un sorcier orc invisible est probablement proche ! (Appuyez sur *t pour l’ignorer temporairement.)",
        "You now have enough gold to buy a ring of willpower on D:5.": "Vous avez maintenant assez d’or pour acheter un anneau de volonté sur D:5.",
        "You pick up a book of Armaments and begin reading...": "Vous ramassez un livre d’Armements et commencez à lire...",
        "You add the spells Stone Arrow, Rending Blade and Lehudib's Crystal Spear to your library.": "Vous ajoutez les sorts Stone Arrow, Rending Blade et Lehudib's Crystal Spear à votre bibliothèque.",
        "The +9 dagger of Kutorph {holy, rN++ Will+ Stlth-} softly glows with a divine radiance!": "La dague +9 de Kutorph {holy, rN++ Will+ Stlth-} luit doucement d’un éclat divin !",
        "The +9 dagger of Kutorph {holy, rN++ Will+ Stlth-} stops glowing.": "La dague +9 de Kutorph {holy, rN++ Will+ Stlth-} cesse de briller.",
        "You unwield the +9 dagger of Kutorph {holy, rN++ Will+ Stlth-}.": "Vous rangez la dague +9 de Kutorph {holy, rN++ Will+ Stlth-}.",
        "The orc wizard flickers and vanishes!": "Le sorcier orc vacille et disparaît !", "The vampire bat convulses!": "La chauve-souris vampire a des convulsions !",
        "The vampire bat struggles to escape constriction. x2": "La chauve-souris vampire se débat pour échapper à l’étreinte. x2", "The hound barks!": "Le chien aboie !",
        "The iguana hisses menacingly.": "L’iguane siffle d’un air menaçant.", "The bullfrog croaks.": "La grenouille-taureau coasse.",
        "Something shouts, \"Repent, thou erky dizzy-eyed bandersnitch!\"": "Quelque chose crie : « Repens-toi, misérable bandersnatch aux yeux vertigineux ! »",
        "The apparition of TCC the Sneak, a novice Vine Stalker Stalker of Uskayaw.": "L’apparition de TCC le Furtif, Rôdeur-des-vignes Rôdeur novice d’Uskayaw.",
        "The apparition of rago the Trooper, a novice Demonspawn Monk of Makhleb.": "L’apparition de rago le Soldat, Moine Rejeton-démon novice de Makhleb.",
        "Rago's ghost shrieks, \"They lied to you. The Dungeon just goes down and down forever.\"": "Le fantôme de Rago hurle : « Ils vous ont menti. Le Donjon descend, descend, à jamais. »",
        "TCC's ghost whispers, \"The ORB doesn't exist.\"": "Le fantôme de TCC murmure : « L’ORBE n’existe pas. »",
        "Rago's ghost shrieks, \"They lied to you.": "Le fantôme de Rago hurle : « Ils vous ont menti.",
        "Rago's ghost.": "Le fantôme de Rago.", "TCC's ghost.": "Le fantôme de TCC.",
        "Rago's ghost attacks as it pursues you!": "Le fantôme de Rago attaque en vous poursuivant !",
        "Rago's ghost is lightly damaged.": "Le fantôme de Rago est légèrement endommagé.", "Rago's ghost is moderately damaged.": "Le fantôme de Rago est modérément endommagé.",
        "Lugonu accepts your kill.": "Lugonu accepte votre mise à mort.", "Lugonu claims a new guest.": "Lugonu accueille un nouvel invité.",
        "Lugonu's Hand of Corruption reaches out!": "La Main de Corruption de Lugonu se tend !",
        "Please select a direction to dig.": "Choisissez une direction pour creuser.",
        "Press } to see all the runes you have collected.": "Appuyez sur } pour voir toutes les runes collectées.",
        "There are no items here.": "Il n’y a aucun objet ici.", "There's nothing to open nearby.": "Il n’y a rien à ouvrir à proximité.",
        "That would be overly suicidal.": "Ce serait beaucoup trop suicidaire.",
        "Done waiting.": "Attente terminée.", "You start resting.": "Vous commencez à vous reposer.", "You start waiting.": "Vous commencez à attendre.",
        "Welcome back to the Lair of Beasts!": "Bon retour dans l’Antre des Bêtes !", "Welcome back to the Spider Nest!": "Bon retour dans le Nid d’Araignées !",
        "Welcome to the Spider Nest!": "Bienvenue dans le Nid d’Araignées !",
        "What level of the Spider Nest? (default 1, ? - help)": "Quel niveau du Nid d’Araignées ? (1 par défaut, ? - aide)",
        "You are a living statue of rough stone.": "Vous êtes une statue vivante de pierre brute.",
        "You are afflicted by dizzying energies!": "Vous êtes frappé par des énergies étourdissantes !",
        "You are confused.": "Vous êtes confus.", "You are covered in intense liquid fire! Move or burn!": "Vous êtes couvert de feu liquide intense ! Bougez ou brûlez !",
        "You are even more covered in intense liquid fire!": "Vous êtes encore plus couvert de feu liquide intense !",
        "You are flying.": "Vous volez.", "You are no longer glowing.": "Vous ne brillez plus.", "You are no longer mesmerised.": "Vous n’êtes plus hypnotisé.",
        "You are no longer terrified.": "Vous n’êtes plus terrifié.", "You are on fire!": "Vous êtes en feu !", "You are outlined in light.": "Vous êtes cerné de lumière.",
        "You assume a fearsome visage.": "Vous prenez un visage effrayant.", "You become entangled in the net!": "Vous vous empêtrez dans le filet !",
        "You bump into the rock wall.": "Vous heurtez le mur de roche.", "You can't carry that many items.": "Vous ne pouvez pas porter autant d’objets.",
        "You easily resist.": "Vous résistez facilement.", "You feel a bit more experienced.": "Vous vous sentez un peu plus expérimenté.",
        "You feel better.": "Vous vous sentez mieux.", "You feel drained.": "Vous vous sentez drainé.", "You feel less confused.": "Vous êtes moins confus.",
        "You feel much better.": "Vous vous sentez bien mieux.", "You feel you are being watched by something.": "Vous sentez que quelque chose vous observe.",
        "You feel your power leaking away.": "Vous sentez votre puissance s’échapper.", "You fly downwards.": "Vous volez vers le bas.", "You fly upwards.": "Vous volez vers le haut.",
        "You partially resist.": "Vous résistez en partie.", "You pick up the barnacled rune and feel its power.": "Vous ramassez la rune incrustée de bernacles et sentez son pouvoir.",
        "You pick your way through the web.": "Vous vous frayez un chemin à travers la toile.", "You reach down and open the door.": "Vous vous penchez et ouvrez la porte.",
        "You resist with almost no effort.": "Vous résistez presque sans effort.", "You resist with some effort.": "Vous résistez avec un certain effort.",
        "You shake off some of the fire as you move.": "Vous secouez une partie du feu en bougeant.", "You shake off the liquid fire.": "Vous vous débarrassez du feu liquide.",
        "You shout for attention!": "Vous criez pour attirer l’attention !", "You shred the net and break free!": "Vous déchirez le filet et vous libérez !",
        "You struggle against the net.": "Vous vous débattez contre le filet.", "Your attack delay is about 1.0.": "Votre délai d’attaque est d’environ 1.0.",
        "Your flying speed is very slow.": "Votre vitesse de vol est très lente.", "Your pack is full.": "Votre sac est plein.",
        "Your willpower is stripped away!": "Votre volonté est arrachée !", "You are knocked back by the gust of wind.": "Vous êtes repoussé par la rafale de vent.",
        "There is a web here.": "Il y a une toile ici.", "There is a large open door here.": "Il y a une grande porte ouverte ici.",
        "Found an escape hatch in the ceiling.": "Trappe de secours dans le plafond repérée.", "Found an escape hatch in the floor.": "Trappe de secours dans le sol repérée.",
        "Found a stone staircase leading up and a stone staircase leading down.": "Escalier de pierre montant et escalier de pierre descendant repérés.",
        "There is an escape hatch in the ceiling here.": "Il y a une trappe de secours dans le plafond ici.",
        "There is a stone staircase leading up, spattered with blood here.": "Il y a un escalier de pierre montant, éclaboussé de sang, ici.",
        "Spell assigned to 'l'.": "Sort assigné à « l ».", "Blink to where?": "Clignoter vers où ?", "Cast which spell? (? or * to list)": "Quel sort lancer ? (? ou * pour lister)",
        "Drink which item?": "Boire quel objet ?", "Read which item?": "Lire quel objet ?", "Evoke which item?": "Évoquer quel objet ?",
        "Identify which item? (\\ to view known items)": "Identifier quel objet ? (\\ pour voir les objets connus)",
        "Really rampage into that cloud of flame?": "Vraiment foncer dans ce nuage de flammes ?",
        "Confirm with . or Enter, or press ? or * to list all spells.": "Confirmez avec . ou Entrée, ou appuyez sur ? ou * pour lister tous les sorts.",
        "You see here": "Vous voyez ici", "Item here:": "Objet ici :", "Items here:": "Objets ici :", "Here:": "Ici :", "Look:": "Regarder :",
        "Dungeon Overview and Level Annotations": "Aperçu du donjon et annotations de niveaux",
        "Partly explored, can't reach some items.": "Exploré en partie, certains objets sont inaccessibles.",
        "Level annotation: corrupted": "Annotation de niveau : corrompu", "Level annotation: exclusion: hydra": "Annotation de niveau : exclusion : hydre",
        "*You can no longer be shafted in this branch": "*Vous ne pouvez plus être précipité dans un puits dans cette branche",
        "Altars:": "Autels :", "Branches:": "Branches :", "Portals:": "Portails :", "Shops:": "Boutiques :", "Annotations:": "Annotations :",
        "Casting:": "Lancer :", "Aiming:": "Visée :", "Activating:": "Activation :", "Invocations -": "Invocations -",
        "almost dead": "presque mort", "heavily wounded": "gravement blessé", "severely wounded": "sévèrement blessé", "moderately wounded": "modérément blessé",
        "lightly wounded": "légèrement blessé", "mildly dangerous": "faiblement dangereux", "useful": "utile", "useless & duplicates [": "inutiles et doublons [",
        "Monsters": "Monstres", "Visible Monsters": "Monstres visibles", "Visible Monsters/Items": "Monstres/objets visibles",
        "Potions": "Potions", "Scrolls": "Parchemins", "Wands": "Baguettes", "Jewellery": "Bijoux", "Magical Staves": "Bâtons magiques",
        "Miscellaneous": "Divers", "Other Items": "Autres objets", "Baubles": "Babioles", "Carrion": "Charogne",
        "Hand Weapons (select all with": "Armes de mêlée (tout sélectionner avec", "Hand Weapons (go to first with": "Armes de mêlée (aller à la première avec",
        "Potions (select all with": "Potions (tout sélectionner avec", "Potions (select first with": "Potions (sélectionner la première avec",
        "Scrolls (select all with": "Parchemins (tout sélectionner avec", "Wands (select all with": "Baguettes (tout sélectionner avec",
        "Jewellery (select all with": "Bijoux (tout sélectionner avec", "Magical Staves (select all with": "Bâtons magiques (tout sélectionner avec",
        "Miscellaneous (select all with": "Divers (tout sélectionner avec", "Missiles (select all with": "Projectiles (tout sélectionner avec",
        "Talismans (select all with": "Talismans (tout sélectionner avec", "Armour (select all with": "Armures (tout sélectionner avec",
        "Cloak :": "Cape :", "Helmet :": "Casque :", "Offhand :": "Main gauche :",
        "[Armour melded]": "[Armure fusionnée]", "[Boots melded]": "[Bottes fusionnées]", "[Gloves melded]": "[Gants fusionnés]",
        "Skill Level Cost Apt Skill Level Cost Apt": "Compétence Niveau Coût Apt Compétence Niveau Coût Apt",
        "Skill Level Target Apt Skill Level Target Apt": "Compétence Niveau Objectif Apt Compétence Niveau Objectif Apt",
        "Skills enhanced by cross-training and wildshape are in": "Les compétences améliorées par l’entraînement croisé et la métamorphose sont en",
        "Search for what [Enter for \".\"]?": "Chercher quoi ? [Entrée pour « . »]",
        "Press: ? - help,": "Appuyez : ? - aide,", "Press: ? - help, Dir - look around, f - activate": "Appuyez : ? - aide, Dir - regarder autour, f - activer",
        "Press: ? - help, Dir - move target": "Appuyez : ? - aide, Dir - déplacer la cible", "Press: ? - help, Shift-Dir - straight line": "Appuyez : ? - aide, Maj-Dir - ligne droite",
        "Press: ? - help, v - describe, . - travel": "Appuyez : ? - aide, v - décrire, . - voyager",
        "1 match": "1 résultat", "3 matches": "3 résultats", "4 matches": "4 résultats", "37 matches": "37 résultats", "18 spell levels left": "18 niveaux de sorts restants",
        "Memorise": "Mémoriser", "equip": "équiper", "evoke": "évoquer", "quaff": "boire", "wield": "brandir", "travel": "voyager", "training": "entraînement",
        "manual": "manuel", "targets": "objectifs", "enhanced": "amélioré", "level": "niveau", "demon": "démon", "teleport": "téléportation", "curing": "guérison",
        "(visited)": "(visité)", "(improved by +1).": "(amélioré de +1).", "(3% risk of failure)": "(3 % de risque d’échec)", "risk of failure)": "risque d’échec)"
    };

    const regles = [];
    const R = (regex, fn) => regles.push({ regex, translate: m => { const r = fn(m); return typeof r === "string" ? r : m[0]; } });

    // Inventaire : « B - [Shoals:4] a +0 robe (1 further duplicate) {!q} »
    R(/^([A-Za-z]) ([-+]) (.+)$/, m => { const o = ligneObjet(m[3]); return o === null ? null : `${m[1]} ${m[2]} ${o}`; });
    R(/^(d) -> ([A-Za-z]) - (.+)$/, m => { const o = ligneObjet(m[3]); return o === null ? null : `${m[1]} -> ${m[2]} - ${o}`; });
    R(/^(.+) (\{[^}]*\})$/, m => { const o = ligneObjet(m[0]); return o; });
    R(/^(an?|the|\d+|[+-]\d+) .+$/, m => { const o = ligneObjet(m[0]); return o; });
    R(/^\) (.+)$/, m => { const f = globalThis.DCSS_COMBAT && globalThis.DCSS_COMBAT.traduire({ 0: m[1] }); const o = typeof f === "string" ? f : ligneObjet(m[1]); return o === null ? null : ") " + o; });
    R(/^(?:[a-z-]+ )?(ring|amulet|staff|wand|talisman)s? of .+$/, m => ligneObjet(m[0]));
    R(/^(?:[a-z-]+ )?(rings|amulets|staves|wands|talismans|scrolls|potions)(?: of .+)?(?: \([a-z ]+\))?$/, m => ligneObjet(m[0]));
    R(/^(ring|amulet|staff|wand) of .+( \([a-z ]+\))?$/, m => ligneObjet(m[0]));
    R(/^(potion|scroll|ring|amulet) of .+ \((very rare|rare|uncommon|common)\)$/, m => ligneObjet(m[0]));
    R(/^(Really (?:quaff|read)) ([A-Za-z]) - (.+)\?$/, m => { const o = ligneObjet(m[3]); return o === null ? null : `${m[1] === "Really quaff" ? "Vraiment boire" : "Vraiment lire"} ${m[2]} - ${o} ?`; });
    // Objets au sol
    R(/^You see here (.+?)\.?$/, m => { const o = ligneObjet(m[1]); return o === null ? null : `Vous voyez ici ${o}.`; });
    R(/^You drop (.+?)\.$/, m => { const o = ligneObjet(m[1]); return o === null ? null : `Vous lâchez ${o}.`; });
    R(/^There is (.+?) here\.$/, m => {
        const o = ligneObjet(m[1]) || tr(m[1]) ;
        return o === m[1] ? null : `Il y a ${o.replace(/^(.)/, c => c)} ici.`;
    });
    R(/^Found (.+?)\.$/, m => {
        const p = m[1].split(/ and (?=(?:an?|the|\d+) )/);
        const o = p.map(x => ligneObjet(x) || (tr(x) !== x ? tr(x) : null));
        return o.includes(null) ? null : `Repéré : ${o.join(" et ")}.`;
    });
    const LIEUX = { "Lair": "l’Antre", "Shoals": "les Hauts-fonds", "Spider Nest": "le Nid d’Araignées", "Dungeon": "le Donjon", "Orcish Mines": "les Mines orques", "Swamp": "le Marais", "Snake Pit": "la Fosse aux serpents", "Vaults": "les Caveaux", "Crypt": "la Crypte", "Elven Halls": "les Halls elfiques" };
    R(/^There is (a|an) (stone staircase|staircase|hole|crawl-hole|escape hatch|portal) (back )?to the (.+?) here\.$/, m => {
        const l = LIEUX[m[4]]; if (!l) return null;
        const nom = { "stone staircase": "un escalier de pierre", staircase: "un escalier", hole: "un trou", "crawl-hole": "un boyau", "escape hatch": "une trappe de secours", portal: "un portail" }[m[2]];
        return `Il y a ${nom} ${m[3] ? "de retour " : ""}vers ${l} ici.`;
    });
    R(/^Your (.+?) (has recharged|stops glowing|stops dripping with poison|softly glows with a divine radiance!|has regained one charge)\.?$/, m => {
        const o = ligneObjet(m[1].replace(/ \(\d+\/\d+\)$/, ""));
        if (o === null) return null;
        const ch = (m[1].match(/ \((\d+\/\d+)\)$/) || [])[1];
        const fin = { "has recharged": "est rechargé", "stops glowing": "cesse de briller", "stops dripping with poison": "cesse de dégouliner de poison", "softly glows with a divine radiance!": "luit doucement d’un éclat divin !", "has regained one charge": "a regagné une charge" }[m[2]];
        return `Votre ${o}${ch ? " (" + ch + ")" : ""} ${fin}${/[!]$/.test(fin) ? "" : "."}`;
    });
    R(/^Your base attributes are Str (\d+), Int (\d+), Dex (\d+)\.$/, m => `Vos attributs de base sont For ${m[1]}, Int ${m[2]}, Dex ${m[3]}.`);
    R(/^([a-zA-Z]) ([-+*]) ([A-Z][A-Za-z ]+?)((?: +(?:[\d.]+%?|--))+)$/, m => { const f = tr(m[3]); return `${m[1]} ${m[2]} ${f}${m[4]}`; });
    R(/^(\d+) gold pieces?\.$/, m => `${m[1]} pièce${m[1] === "1" ? "" : "s"} d’or.`);
    R(/^Found (\d+) gold pieces? and$/, m => `Repéré : ${m[1]} pièces d’or et`);
    R(/^and (\d+) gold pieces\.$/, m => `et ${m[1]} pièces d’or.`);
    R(/^(\d+) gold (.+)$/, m => { const o = ligneObjet(m[0]); return o; });
    R(/^OUCH! You took (\d+) damage\.$/, m => `AÏE ! Vous avez subi ${m[1]} dégâts.`);
    R(/^Recovered (\d+) HP\.$/, m => `${m[1]} PV récupérés.`);
    R(/^Shopping list: (\d+) items, total cost (\d+) gold pieces$/, m => `Liste d’achats : ${m[1]} objets, coût total ${m[2]} pièces d’or`);
    R(/^You have (\d+) gold pieces(\.?)(?: After the purchase, you will have (\d+) gold pieces\.)?$/, m => `Vous avez ${m[1]} pièces d’or${m[2]}${m[3] ? ` Après l’achat, il vous en restera ${m[3]}.` : ""}`);
    R(/^You are short (\d+) gold pieces for the purchase\.$/, m => `Il vous manque ${m[1]} pièces d’or pour cet achat.`);
    R(/^\[Stash: (.+)\]$/, m => { const o = ligneObjet(m[1]) || (/^\d+ gold pieces$/.test(m[1]) ? m[1].replace(/^(\d+) gold pieces$/, "$1 pièces d’or") : null); return o === null ? null : `[Réserve : ${o}]`; });
    R(/^(\d+)\/(\d+) levels left$/, m => `${m[1]}/${m[2]} niveaux restants`);
    R(/^HPRegen ([\d.]+)\/turn$/, m => `Régén. PV ${m[1]}/tour`); R(/^MPRegen ([\d.]+)\/turn$/, m => `Régén. PM ${m[1]}/tour`);
    R(/^It has about (\d+)% to hit you\.$/, m => `Il a environ ${m[1]} % de chances de vous toucher.`);
    R(/^It has a (\d+)% chance to notice you each turn\.$/, m => `Il a ${m[1]} % de chances de vous remarquer à chaque tour.`);
    R(/^You have about (\d+)% to hit with (.+?) and (\d+)% to hit with your grab and squeeze(?: \(while incapacitated\))?\.$/, m => {
        const o = ligneObjet(m[2].replace(/^the /, "the ").replace(/^your /, "a ")) ; if (o === null) return null;
        return `Vous avez environ ${m[1]} % de chances de toucher avec ${o.replace(/^le /, "le ")} et ${m[3]} % avec votre prise et étreinte.`;
    });
    R(/^(Max HP): (~?\d+)$/, m => `PV max : ${m[2]}`);
    R(/^Hit: (.+)$/, m => null);
    R(/^You hear (.+?)([.!])( x\d+)?$/, m => {
        const s = SONS[m[1]];
        return s ? `Vous entendez ${s}${m[2] === "!" ? " !" : "."}${m[3] || ""}` : null;
    });
    R(/^The rock shatters into small pieces\.$/, () => "Le rocher se brise en petits morceaux.");
    R(/^Training target ([\d.]+) for (.+) reached!$/, m => `Objectif d’entraînement de ${m[1]} atteint pour ${tr(m[2])} !`);
    R(/^Throw: (.+?)(?: \((.+)\))?$/, m => {
        const o = ligneObjet(m[1]);
        if (o === null) return null;
        const q = m[2] ? ` (${{ poison: "poison", curare: "curare", frenzy: "frénésie" }[m[2]] || m[2]})` : "";
        return `Lancer : ${o}${q}`;
    });
    R(/^(?:The )?(D|Lair|Shoals|Orc|Abyss|Zot|Vaults|Depths|Swamp|Snake|Spider|Slime|Elf|Crypt|Tomb|Pan|Dis|Geh|Coc|Tar|IceCv|Volcano|Bailey|Sewer|Ossuary|Bazaar|WizLab|Trove|Desolation|Gauntlet|Temple):(\d+)( Zot:)?$/, m => null);
    R(/^Where to\? \(Tab - (.+?) @ \(x,y\), \? - help\)$/, m => `Aller où ? (Tab - ${m[1]} @ (x,y), ? - aide)`);
    R(/^Search for what \[Enter for "(.+)", or \? for help\]\?$/, m => `Chercher quoi ? [Entrée pour « ${m[1]} », ou ? pour l’aide]`);
    R(/^exclusion: (\d+) slime creatures$/, m => `exclusion : ${m[1]} créatures de gelée`);
    R(/^(.+) - (Stone fists)( \(current attack\))?$/, m => null);
    R(/^- - Stone fists( \(current attack\))?$/, m => `- - Poings de pierre${m[1] ? " (attaque actuelle)" : ""}`);
    R(/^\] accept \((\d+) chosen\)$/, m => `] valider (${m[1]} choisi${+m[1] > 1 ? "s" : ""})`);

    globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};
    globalThis.DCSS_TRADUCTIONS.divers = FIXES;
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(regles);
})();
