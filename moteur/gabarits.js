// =====================================================================
//  gabarits.js : traduit les phrases « à gabarit » de la base de données du jeu (dat/database : Xom, dieux, insultes...).
//  Le jeu écrit ces phrases avec des morceaux variables : @couleur@, @The_feature@, [variante a|variante b].
//  Les textes sont dans donnees/messages/gabarits/*.js : globalThis.DCSS_GABARITS_TEXTES = [ "ligne anglaise\nligne française\n\n..." ].
//  Les morceaux @...@ sont traduits par la table MACROS ci-dessous (couleurs, parties du corps, décors, objets...).
// =====================================================================
(() => {
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const COULEURS = { red: "rouge", orange: "orange", yellow: "jaune", green: "vert", blue: "bleu", indigo: "indigo", violet: "violet",
        purple: "pourpre", white: "blanc", black: "noir", grey: "gris", gray: "gris", brown: "brun", pink: "rose", cyan: "cyan", magenta: "magenta",
        silver: "argent", golden: "doré", gold: "or", crimson: "cramoisi", emerald: "émeraude", amber: "ambre", azure: "azur", turquoise: "turquoise",
        lime: "citron vert", scarlet: "écarlate", teal: "sarcelle", beige: "beige", bronze: "bronze", copper: "cuivre", ivory: "ivoire", lavender: "lavande",
        fuchsia: "fuchsia", maroon: "bordeaux", navy: "marine", olive: "olive", peach: "pêche", plum: "prune", rose: "rose", ruby: "rubis", sapphire: "saphir" };
    const CORPS = { head: "tête", heads: "têtes", hand: "main", hands: "mains", foot: "pied", feet: "pieds", arm: "bras", arms: "bras", leg: "jambe", legs: "jambes",
        eye: "œil", eyes: "yeux", ear: "oreille", ears: "oreilles", nose: "nez", mouth: "bouche", tongue: "langue", tooth: "dent", teeth: "dents", toe: "orteil", toes: "orteils",
        finger: "doigt", fingers: "doigts", thumb: "pouce", thumbs: "pouces", elbow: "coude", elbows: "coudes", knee: "genou", knees: "genoux", shoulder: "épaule", shoulders: "épaules",
        chest: "poitrine", back: "dos", stomach: "estomac", liver: "foie", spleen: "rate", heart: "cœur", lung: "poumon", lungs: "poumons", kidney: "rein", kidneys: "reins",
        brain: "cerveau", spine: "colonne vertébrale", rib: "côte", ribs: "côtes", skull: "crâne", intestine: "intestin", intestines: "intestins", bladder: "vessie",
        pancreas: "pancréas", "gall bladder": "vésicule biliaire", throat: "gorge", neck: "cou", hip: "hanche", hips: "hanches", skin: "peau", hair: "cheveux", beard: "barbe",
        claw: "griffe", claws: "griffes", paw: "patte", paws: "pattes", tentacle: "tentacule", tentacles: "tentacules", wing: "aile", wings: "ailes", tail: "queue", horn: "corne", horns: "cornes",
        hoof: "sabot", hooves: "sabots", fin: "nageoire", fins: "nageoires", ankle: "cheville", ankles: "chevilles", wrist: "poignet", wrists: "poignets", palm: "paume", palms: "paumes" };
    const NOMBRES = { two: "deux", three: "trois", four: "quatre", five: "cinq", six: "six" };
    const DANSES = { ballet: "ballet", "cha-cha": "cha-cha", fandango: "fandango", jig: "gigue", "line dance": "danse en ligne", macarena: "macarena", tango: "tango", tapdance: "claquettes", waltz: "valse",
        cartwheel: "roue", pirouette: "pirouette", somersault: "saut périlleux", handstand: "équilibre sur les mains" };
    const ENFANT = { misbegotten: "enfant mal engendré", bastard: "enfant bâtard", ugly: "vilain enfant", "red-headed step": "beau-fils roux", silly: "enfant stupide",
        worthless: "enfant sans valeur", prodigal: "enfant prodigue", insane: "enfant dément", naughty: "enfant vilain" };
    const TRUITE = { "a rainbow": "une truite arc-en-ciel", "a flathead": "une truite à tête plate", "a cutthroat": "une truite fardée", "a bull": "une truite-taureau", "a silver": "une truite argentée",
        "a complex": "une truite complexe", "a polygonal": "une truite polygonale", "an imaginary": "une truite imaginaire", "an inverse": "une truite inversée", "an unlikely": "une truite improbable",
        "a used": "une truite usagée", "a second-hand": "une truite d’occasion", "a prohibited": "une truite interdite", "a challenging": "une truite difficile", "a delicious": "une truite délicieuse",
        "a mouldy": "une truite moisie", "a fake": "une truite factice", "a moist": "une truite humide", "a kilgore": "une truite Kilgore" };
    const DECORS = { lava: "la lave", "endless lava": "la lave sans fin", "shallow water": "l’eau peu profonde", "deep water": "l’eau profonde", mud: "la boue", "toxic bog": "le marécage toxique",
        "fountain of blood": "la fontaine de sang", "fountain of eyes": "la fontaine d’yeux", "fountain of sparkling water": "la fontaine d’eau pétillante", "fountain of clear blue water": "la fontaine d’eau bleue limpide",
        "dry fountain": "la fontaine à sec", "orcish idol": "l’idole orque", "metal statue": "la statue de métal", "granite statue": "la statue de granit", "zot statue": "la statue de Zot", tree: "l’arbre", mangrove: "le palétuvier",
        "demonic tree": "l’arbre démoniaque", "petrified tree": "l’arbre pétrifié", "rock wall": "le mur de roche", "stone wall": "le mur de pierre", "metal wall": "le mur de métal", "crystal wall": "le mur de cristal",
        "translucent rock wall": "le mur de roche translucide", "translucent stone wall": "le mur de pierre translucide", "slime covered rock wall": "le mur de roche couvert de vase", "iron grate": "la grille de fer",
        "unnaturally hard rock wall": "le mur de roche anormalement dur", "frigid wall": "le mur glacial", "closed door": "la porte fermée", "open door": "la porte ouverte", "runed door": "la porte runique", "sealed door": "la porte scellée",
        "broken door": "la porte brisée", floor: "le sol", web: "la toile", "empty arch of ancient stone": "l’arche vide de pierre ancienne", "frozen archway": "l’arche gelée", shaft: "le puits", "decorative floor": "le sol décoratif",
        "open sea": "la mer ouverte", "orb dais": "l’estrade de l’Orbe", "patch of mould": "la touffe de moisissure", "patch of ice thorns": "la touffe d’épines de glace" };
    const GR = (regle, x) => { const G = globalThis.DCSS_GRAFFITIS; return G ? G.traduire(regle, x) : null; };
    const MACROS = {
        colour: x => COULEURS[x] || GR("any_colour", x) || GR("any_glowing_colour", x) || x,
        body: x => CORPS[x] || x,
        number: x => NOMBRES[x] || x,
        feature: (x, maj) => { if (/^your /i.test(x)) return null; const b = x.replace(/^(?:the|some|an?) /i, "");
            let r = DECORS[b]; if (!r) { r = T1("the " + b); if (!r || r === "the " + b) { r = T1("a " + b); if (!r || r === "a " + b) return null; r = r.replace(/^une? /, m => (/^une /.test(m) ? "la " : "le ")); } }
            return maj ? cap(r) : lc(r); },
        item: (x, maj, nom) => { const m = /^(?:Your|your) (.+)$/.exec(x); if (!m) return null; const b = m[1];
            let r = T1("the " + b); if (!r || r === "the " + b) r = T1("a " + b); if (!r || r === "a " + b || /^(?:the|a|an) /.test(r)) return null;
            const pl = /^les /.test(r); r = r.replace(/^(?:le|la|les|l’|un|une|des) ?/, ""); if (nom === "your_item") return (pl ? "vos " : "votre ") + r; return cap((pl ? "vos " : "votre ") + r); },
    };
    const POSS = x => { const n = MACROS.body(x); return (/s$/.test(x) && !/^(?:chest|pancreas|bras)$/.test(x) || /^(?:teeth|feet|hooves)$/.test(x) ? "vos " : "votre ") + n; };
    const GENRES_PL = { humans: "humains", elves: "elfes", dwarves: "nains", orcs: "orcs", draconians: "draconiens", demonspawn: "démonspawns", gnolls: "gnolls", felids: "félins", gargoyles: "gargouilles", trolls: "trolls",
        ogres: "ogres", merfolk: "sirènes", minotaurs: "minotaures", nagas: "nagas", octopodes: "octopodes", spriggans: "spriggans", tengu: "tengus", vampires: "vampires", barachi: "barachis", "deep elves": "elfes profonds", kobolds: "kobolds",
        formicids: "formicides", mummies: "momies", ghouls: "goules", djinni: "djinns", coglins: "coglins", "hill orcs": "orcs des collines", "mountain dwarves": "nains des montagnes" };
    const GENRES_UN = { human: "un humain", elf: "un elfe", dwarf: "un nain", orc: "un orc", draconian: "un draconien", demonspawn: "un démonspawn", gnoll: "un gnoll", felid: "un félin", gargoyle: "une gargouille", troll: "un troll",
        ogre: "un ogre", merfolk: "une sirène", minotaur: "un minotaure", naga: "un naga", octopode: "un octopode", spriggan: "un spriggan", tengu: "un tengu", vampire: "un vampire", kobold: "un kobold", formicid: "un formicide",
        mummy: "une momie", ghoul: "une goule", djinni: "un djinn", coglin: "un coglin" };
    const SCREAM_HOW = x => { const m = /^like an? (\w+) (.+)$/.exec(x); if (m) { const A = { hungry: "affamé", enraged: "enragé", raging: "rageur", furious: "furieux", irate: "irrité" }[m[1]];
        const B = { dragon: "dragon", frog: "grenouille", lion: "lion", bull: "taureau", beast: "fauve", "beast of prey": "fauve", predator: "prédateur", carnivore: "carnivore" }[m[2]]; if (!A || !B) return null; const f = B === "grenouille"; const adj = f ? ({ affamé: "affamée", enragé: "enragée", rageur: "rageuse", furieux: "furieuse", irrité: "irritée" })[A] : A; return `comme ${f ? "une" : "un"} ${B} ${adj}`; }
        return ({ hysterically: "hystériquement", angrily: "avec colère", loudly: "fort", deafeningly: "à vous rendre sourd", "ear-piercingly": "à vous percer les tympans", "ear-splittingly": "à vous fendre les oreilles" })[x] || null; };
    const FONCTION = {
        The_feature: x => MACROS.feature(x, true), the_feature: x => MACROS.feature(x, false),
        Your_item: (x) => MACROS.item(x, true, "Your_item"), your_item: (x) => MACROS.item("Your " + x.replace(/^[Yy]our /, ""), false, "your_item"),
        any_colour: MACROS.colour, any_glowing_colour: MACROS.colour, rainbow_colour: MACROS.colour, misc_colour: MACROS.colour, mono_colour: MACROS.colour,
        any_colour_pattern: x => GR("any_colour_pattern", x), any_glowing_colour_pattern: x => GR("any_glowing_colour_pattern", x), any_graffiti: x => GR("any_graffiti", x), glowing_adj: x => GR("glowing_adj", x),
        random_body_part_internal_singular: MACROS.body, random_body_part_external_singular: MACROS.body, random_body_part_any_singular: MACROS.body,
        random_body_part_internal_plural: MACROS.body, random_body_part_external_plural: MACROS.body, random_body_part_any_plural: MACROS.body,
        "~random_body_part_internal_singular": POSS, "~random_body_part_external_singular": POSS, "~random_body_part_any_singular": POSS,
        hand: MACROS.body, hands: MACROS.body, head: MACROS.body, feet: MACROS.body,
        _xom_number_: MACROS.number, dance_name: x => DANSES[x] || x, acrobatic_move_name: x => DANSES[x.replace(/^.*stand$/, "handstand")] || x,
        _xom_child_: x => ENFANT[x] || x, _trout_species_: x => TRUITE[x] || (x + " truite"),
        _xom_plaything_: x => ({ "teddy bear": "ours en peluche", toy: "jouet", plaything: "joujou" })[x] || x,
        staircase: x => ({ staircase: "escalier", stairs: "escalier", "escape hatch": "trappe", "down staircase": "escalier", "up staircase": "escalier" })[x] || T1(x) || x,
        target: x => { const a = acteur(x); return a ? a.o : /^you$/i.test(x) ? "vous" : null; },
        foe: x => { const a = acteur(x); return a ? a.o : /^you$/i.test(x) ? "vous" : null; },
        reflexive: x => ({ itself: "lui-même", himself: "lui-même", herself: "elle-même", themselves: "eux-mêmes" })[x] || null,
        subjective: x => ({ it: "il", he: "il", she: "elle", they: "ils" })[x] || null,
        something: x => /^something$/i.test(x) ? "quelque chose" : null,
        possessive_God: x => x.replace(/['’]s$/, ""),
        quote: x => T1(x) || x,
        to_foe: x => { const a = acteur(x.replace(/^to /, "")); return a ? a.a : /^you$/i.test(x.replace(/^to /, "")) ? "à vous" : null; },
        at_foe: x => { const a = acteur(x.replace(/^at /, "")); return a ? "vers " + a.o : /^you$/i.test(x.replace(/^at /, "")) ? "vers vous" : null; },
        objective: x => ({ it: "le", him: "le", her: "la", them: "les" })[x] || null,
        Subjective: x => ({ It: "Cela", He: "Il", She: "Elle", They: "Ils" })[x] || null,
        arms: MACROS.body, beam: x => { const r = T1("a " + x) || T1(x); return r && r !== x && r !== "a " + x ? r.replace(/^(?:un|une|le|la|l’|des|les) ?/, "") : null; },
        Your_weapon: x => { if (/^the singing sword$/i.test(x)) return "L’Épée chantante"; return MACROS.item(x, true, "Your_item"); },
        The_weapon: x => /^the singing sword$/i.test(x) ? "L’Épée chantante" : null, the_weapon: x => /^the singing sword$/i.test(x) ? "l’Épée chantante" : null,
        player_name: x => x, player_god: x => T1(x) || x, god_or_blade: x => /^my blade$/i.test(x) ? "ma lame" : (T1(x) || x),
        player_genus_plural: x => GENRES_PL[x] || x, a_player_genus: x => GENRES_UN[x.replace(/^an? /, "")] || x, player_genus: x => GENRES_UN[x] ? GENRES_UN[x].replace(/^(?:un|une) /, "") : x,
        _screams_: x => ({ screams: "hurle", booms: "tonne", roars: "rugit", bellows: "beugle", howls: "hurle", yells: "crie", shouts: "s’écrie", shrieks: "glapit", thunders: "tonitrue", clamours: "clame", exclaims: "s’exclame", vociferates: "vocifère" })[x] || null,
        _screams_how_: x => SCREAM_HOW(x), _loudly_: x => ({ loudly: "fort", deafeningly: "à vous rendre sourd", "ear-piercingly": "à vous percer les tympans", "ear-splittingly": "à vous fendre les oreilles" })[x] || null,
        _beastly_adjective_: x => ({ hungry: "affamé", enraged: "enragé", raging: "rageur", furious: "furieux", irate: "irrité" })[x] || null,
        _beast_: x => ({ dragon: "dragon", frog: "grenouille", lion: "lion", bull: "taureau", beast: "fauve", "beast of prey": "fauve", predator: "prédateur", carnivore: "carnivore" })[x] || null,
        _strikes_up_what_: x => ({ "a slow and mournful tune": "un air lent et mélancolique", "a merry tune": "un air joyeux", "a merry melody": "une mélodie joyeuse", "a funeral march": "une marche funèbre" })[x] || null,
        _kind_of_scales_: x => ({ pentatonic: "pentatoniques", chromatic: "chromatiques", diatonic: "diatoniques" })[x] || null,
        _rhyme_word_: x => ({ "fountain of blood": "fontaine de sang", "killing spree": "tuerie", battlefield: "champ de bataille" })[x] || null,
        _song_theme_: x => ({ "battle and fame": "la bataille et la gloire", "death and destruction": "la mort et la destruction", "the glory of death": "la gloire de la mort" })[x] || null,
        _musical_topic_: x => ({ acoustics: "l’acoustique", "voice harmonics": "les harmoniques de la voix", "the history of music": "l’histoire de la musique", "the theory of melody": "la théorie de la mélodie", "rhythms and time": "les rythmes et la mesure", "the counterpoint": "le contrepoint", descant: "le déchant", syncopation: "la syncope", "Aeolian mode": "le mode éolien" })[x] || null,
        _exasperated_: x => ({ exasperated: "exaspérée", "bugged out": "à bout", unnerved: "déstabilisée", irascibly: "irascible", nervous: "nerveuse", unruly: "indocile", truculent: "truculente", refractory: "rétive", recalcitrant: "récalcitrante" })[x] || null,
        _crimson_: x => ({ crimson: "cramoisie", "blood-red": "rouge sang", purple: "pourpre", ensanguined: "ensanglantée", violet: "violette" })[x] || null,
        _MISCREANTS_: x => ({ MISCREANTS: "VAURIENS", IMBECILES: "IMBÉCILES", SCUM: "CANAILLES", FILTH: "ORDURES" })[x] || null,
        _PETS_: x => ({ "GUINEA PIGS": "COCHONS D’INDE", CAVIES: "CAVIAS", "PUSSY CATS": "MINOUS", POODLES: "CANICHES", "SPERM WHALES": "CACHALOTS" })[x] || null,
        _corpses_: x => ({ corpses: "cadavres", "tasty carcasses": "carcasses savoureuses", "exquisite cadavers": "cadavres exquis" })[x] || null,
        _body_part_: x => ({ skin: "peau", "hairy skin": "peau poilue", carcass: "carcasse", flesh: "chair" })[x] || null,
        _glorious_: x => ({ glorious: "glorieuse", spanking: "flambant neuve", noble: "noble", exciting: "excitante", thrilling: "palpitante", erotic: "érotique", moving: "émouvante" })[x] || null,
        godsorter: x => ({ fate: "le destin", "the lot": "le sort", worms: "les vers", "the godless void": "le vide sans dieu", autolysis: "l’autolyse", putrefaction: "la putréfaction" })[x] || T1(x) || x,
        weapon_noise: x => { const r = T1(x); return r && r !== x ? r : null; }, player_genus: x => ({ human: "humains", elf: "elfes", dwarf: "nains", orc: "orques", draconian: "draconiens", demonspawn: "démonspawns", gnoll: "gnolls", felid: "félins" })[x] || x,
    };

    function acteur(t) {
        if (/^something$/i.test(t)) return { S: "Quelque chose", o: "quelque chose", d: "de quelque chose", a: "à quelque chose", e: "" };
        if (/^it$/i.test(t)) return { S: "Cela", o: "cela", d: "de cela", a: "à cela", e: "" };
        const C = globalThis.DCSS_COMBAT; if (!C || !C.acteurTexte) return null;
        return C.acteurTexte(t) || (/^(an?|the|your) /i.test(t) ? null : C.acteurTexte("the " + t));
    }

    // --- Compilation d'un gabarit anglais en expression régulière ---
    function compiler(en, fr) {
        const PAT = { The_weapon: "([Tt]he Singing Sword)", the_weapon: "([Tt]he Singing Sword)", _screams_: "(screams|booms|roars|bellows|howls|yells|shouts|shrieks|thunders|clamours|exclaims|vociferates)", the_monster_possessive: "(.+?(?:'s|’s)|its|his|her|their)", The_monster_possessive: "(.+?(?:'s|’s)|its|his|her|their)", hands: "([a-z-]+)", hand: "([a-z-]+)", head: "([a-z-]+)", feet: "([a-z-]+)" };
        const parts = []; let src = "^"; let lit = ""; let plusLong = "";
        const re = /\[([^\]]*)\]|@([^@\s]+)@/g; let dernier = 0, m;
        const flush = t => { if (t) { src += esc(t); if (t.length > plusLong.length) plusLong = t; } };
        while ((m = re.exec(en))) {
            flush(en.slice(dernier, m.index)); dernier = re.lastIndex;
            if (m[1] !== undefined) {
                if (m[1].includes("@")) { const nom = /@([^@\s]+)@/.exec(m[1])[1]; src += "(.+?)"; parts.push({ type: "macro", nom }); }
                else { const opts = m[1].split("|"); src += "(" + opts.map(esc).join("|") + ")"; parts.push({ type: "alt", opts }); }
            } else { src += PAT[m[2]] || "(.+?)"; parts.push({ type: "macro", nom: m[2] }); }
        }
        flush(en.slice(dernier));
        if (!/[.!?"”»:]$/.test(en)) { src += "([.!]?)"; parts.push({ type: "punct" }); }
        src += "$";
        const debut = /^[A-Za-z"'’]+/.exec(en); // premier mot littéral (sert à classer les gabarits)
        const apres = /^@[^@\s]+@(?:'s)? ([a-z]+)/.exec(en); // mot qui suit un début à trou (ex. « @The_monster@ says » -> « says »)
        return { regex: new RegExp(src), parts, fr, tete: debut && !/^[@\[]/.test(en) ? debut[0].toLowerCase() : "", apres: apres ? apres[1] : "", lit: plusLong };
    }
    function appliquer(g, m) {
        let ia = 0; const macros = {}; let i = 1;
        const alts = []; let punct = ""; for (const p of g.parts) { const v = m[i++]; if (p.type === "alt") alts.push({ p, v }); else if (p.type === "punct") punct = v || ""; else if (!(p.nom in macros)) macros[p.nom] = v; }
        let mon = null; for (const k of ["The_monster", "the_monster", "The_monster_possessive", "the_monster_possessive"]) if (k in macros) { mon = acteur(macros[k].replace(/'s$/, "")); if (!mon) return null; break; }
        let sortie;
        // choix des variantes (même ordre que l'anglais)
        sortie = g.fr.replace(/\[([^\]]*)\]/g, (tout, liste) => { const a = alts[ia++]; const o = liste.split("|"); if (!a) return o[0]; const n = a.p.opts.indexOf(a.v); const r = o[Math.min(n < 0 ? 0 : n, o.length - 1)]; return r === undefined ? o[0] : r; });
        let ok = true;
        sortie = sortie.replace(/@M_([SodaeA])@/g, (t, k) => mon ? (mon[k] || "") : t);
        sortie = sortie.replace(/@TF([12])@/g, (tt, k) => { const tf = macros.to_foe; if (tf === undefined) { ok = false; return tt; } const a = FONCTION.to_foe(tf); if (!a) { ok = false; return tt; } const toi = /^à vous$/.test(a); return k === "1" ? (toi ? "vous " : "") : (toi ? "" : " " + a); });
        sortie = sortie.replace(/@([^@\s]+)@/g, (tout, nom) => { if (/^M_/.test(nom)) { ok = false; return tout; } let v = macros[nom.replace(/^~/, "")] !== undefined ? macros[nom.replace(/^~/, "")] : nom === "T_o" ? ["target", "foe", "at_foe", "to_foe"].map(k => macros[k]).find(x => x !== undefined) : nom === "sur" || nom === "vers" ? macros.at : undefined; if (v === undefined) { ok = false; return tout; } const f = FONCTION[nom === "T_o" ? (macros.target !== undefined ? "target" : "foe") : nom]; if (nom === "T_o") v = String(v).replace(/^(?:at|to) /, ""); const r = nom === "sur" ? (v === "past" ? "à côté de" : "sur") : nom === "vers" ? (v === "past" ? "à côté de" : "vers") : f ? f(v) : v; if (r === null || r === undefined) { ok = false; return v; } return r; });
        if (ok) sortie = sortie.replace(/\bde ([aeiouyàâéèêîôûœ])/g, "d’$1") + (punct === "!" ? " !" : punct);
        return ok ? sortie : null;
    }

    let index = null;
    function construire() {
        index = { par: new Map(), apres: new Map(), libres: [], prio: [] };
        for (const bloc of globalThis.DCSS_GABARITS_TEXTES || []) {
            for (const entree of String(bloc).split(/\n\s*\n/)) {
                const l = entree.split("\n").map(x => x.trim()).filter(Boolean);
                if (l.length < 2) continue;
                const g = compiler(l[0], l[1]);
                if (/^@[^@\s]+@ @_screams_@/.test(l[0])) index.prio.push(g); else if (g.tete) { if (!index.par.has(g.tete)) index.par.set(g.tete, []); index.par.get(g.tete).push(g); } else if (g.apres) { if (!index.apres.has(g.apres)) index.apres.set(g.apres, []); index.apres.get(g.apres).push(g); } else index.libres.push(g);
            }
        }
    }
    function traduire(texte) {
        if (!index) construire();
        const t = texte.trim(); if (t.length < 6 || t.length > 400) return null;
        const mot = /^[A-Za-z"'’]+/.exec(t); const listes = [index.prio];
        if (mot && index.par.has(mot[0].toLowerCase())) listes.push(index.par.get(mot[0].toLowerCase()));
        const mots = t.split(/[^A-Za-z]+/).slice(1, 9), vus = new Set();
        for (const w of mots) if (!vus.has(w) && index.apres.has(w)) { vus.add(w); listes.push(index.apres.get(w)); }
        listes.push(index.libres);
        for (const lst of listes) for (const g of lst) {
            if (g.lit && g.lit.length > 3 && !t.includes(g.lit)) continue;
            const m = g.regex.exec(t); if (!m) continue;
            const r = appliquer(g, m); if (r) return r;
        }
        return null;
    }
    globalThis.DCSS_GABARITS = { traduire, MACROS: FONCTION };
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat([{ regex: /^[\s\S]{6,400}$/, translate: (m, t) => traduire(t) }]);
})();
