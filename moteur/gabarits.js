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
    const ENS = x => x.replace(/^(?:a|an) /, "");
    const DECORS = { lava: "la lave", "endless lava": "la lave sans fin", "shallow water": "l’eau peu profonde", "deep water": "l’eau profonde", mud: "la boue", "toxic bog": "le marécage toxique",
        "fountain of blood": "la fontaine de sang", "fountain of eyes": "la fontaine d’yeux", "fountain of sparkling water": "la fontaine d’eau pétillante", "fountain of clear blue water": "la fontaine d’eau bleue limpide",
        "dry fountain": "la fontaine à sec", "orcish idol": "l’idole orque", "metal statue": "la statue de métal", "granite statue": "la statue de granit", "zot statue": "la statue de Zot", tree: "l’arbre", mangrove: "le palétuvier",
        "demonic tree": "l’arbre démoniaque", "petrified tree": "l’arbre pétrifié", "rock wall": "le mur de roche", "stone wall": "le mur de pierre", "metal wall": "le mur de métal", "crystal wall": "le mur de cristal",
        "translucent rock wall": "le mur de roche translucide", "translucent stone wall": "le mur de pierre translucide", "slime covered rock wall": "le mur de roche couvert de vase", "iron grate": "la grille de fer",
        "unnaturally hard rock wall": "le mur de roche anormalement dur", "frigid wall": "le mur glacial", "closed door": "la porte fermée", "open door": "la porte ouverte", "runed door": "la porte runique", "sealed door": "la porte scellée",
        "broken door": "la porte brisée", floor: "le sol", web: "la toile", "empty arch of ancient stone": "l’arche vide de pierre ancienne", "frozen archway": "l’arche gelée", shaft: "le puits", "decorative floor": "le sol décoratif",
        "open sea": "la mer ouverte", "orb dais": "l’estrade de l’Orbe", "patch of mould": "la touffe de moisissure", "patch of ice thorns": "la touffe d’épines de glace" };
    const MACROS = {
        colour: x => COULEURS[x] || x,
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
    const FONCTION = {
        The_feature: x => MACROS.feature(x, true), the_feature: x => MACROS.feature(x, false),
        Your_item: (x) => MACROS.item(x, true, "Your_item"), your_item: (x) => MACROS.item("Your " + x.replace(/^[Yy]our /, ""), false, "your_item"),
        any_colour: MACROS.colour, any_glowing_colour: MACROS.colour, rainbow_colour: MACROS.colour, misc_colour: MACROS.colour, mono_colour: MACROS.colour,
        any_colour_pattern: x => x, any_glowing_colour_pattern: x => x, any_graffiti: x => x, glowing_adj: MACROS.colour,
        random_body_part_internal_singular: MACROS.body, random_body_part_external_singular: MACROS.body, random_body_part_any_singular: MACROS.body,
        random_body_part_internal_plural: MACROS.body, random_body_part_external_plural: MACROS.body, random_body_part_any_plural: MACROS.body,
        "~random_body_part_internal_singular": POSS, "~random_body_part_external_singular": POSS, "~random_body_part_any_singular": POSS,
        hand: MACROS.body, hands: MACROS.body, head: MACROS.body, feet: MACROS.body,
        _xom_number_: MACROS.number, dance_name: x => DANSES[x] || x, acrobatic_move_name: x => DANSES[x.replace(/^.*stand$/, "handstand")] || x,
        _xom_child_: x => ENFANT[x] || x, _trout_species_: x => TRUITE[x] || (x + " truite"),
        _xom_plaything_: x => ({ "teddy bear": "ours en peluche", toy: "jouet", plaything: "joujou" })[x] || x,
        staircase: x => ({ staircase: "escalier", stairs: "escalier", "escape hatch": "trappe", "down staircase": "escalier", "up staircase": "escalier" })[x] || T1(x) || x,
        weapon_noise: x => T1(x) || x, player_genus: x => ({ human: "humains", elf: "elfes", dwarf: "nains", orc: "orques", draconian: "draconiens", demonspawn: "démonspawns", gnoll: "gnolls", felid: "félins" })[x] || x,
    };

    function acteur(t) {
        if (/^something$/i.test(t)) return { S: "Quelque chose", o: "quelque chose", d: "de quelque chose", a: "à quelque chose", e: "" };
        if (/^it$/i.test(t)) return { S: "Cela", o: "cela", d: "de cela", a: "à cela", e: "" };
        const C = globalThis.DCSS_COMBAT; if (!C || !C.acteurTexte) return null;
        return C.acteurTexte(t) || (/^(an?|the|your) /i.test(t) ? null : C.acteurTexte("the " + t));
    }

    // --- Compilation d'un gabarit anglais en expression régulière ---
    function compiler(en, fr) {
        const PAT = { the_monster_possessive: "(.+?(?:'s|’s)|its|his|her|their)", The_monster_possessive: "(.+?(?:'s|’s)|its|his|her|their)", hands: "([a-z-]+)", hand: "([a-z-]+)", head: "([a-z-]+)", feet: "([a-z-]+)" };
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
        return { regex: new RegExp(src), parts, fr, tete: debut && !/^[@\[]/.test(en) ? debut[0].toLowerCase() : "", lit: plusLong };
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
        sortie = sortie.replace(/@([^@\s]+)@/g, (tout, nom) => { if (/^M_/.test(nom)) { ok = false; return tout; } const v = macros[nom.replace(/^~/, "")]; if (v === undefined) { ok = false; return tout; } const f = FONCTION[nom]; const r = f ? f(v) : v; if (r === null || r === undefined) { ok = false; return v; } return r; });
        if (ok) sortie = sortie.replace(/\bde ([aeiouyàâéèêîôûœ])/g, "d’$1") + punct;
        return ok ? sortie : null;
    }

    let index = null;
    function construire() {
        index = { par: new Map(), libres: [] };
        for (const bloc of globalThis.DCSS_GABARITS_TEXTES || []) {
            for (const entree of String(bloc).split(/\n\s*\n/)) {
                const l = entree.split("\n").map(x => x.trim()).filter(Boolean);
                if (l.length < 2) continue;
                const g = compiler(l[0], l[1]);
                if (g.tete) { if (!index.par.has(g.tete)) index.par.set(g.tete, []); index.par.get(g.tete).push(g); } else index.libres.push(g);
            }
        }
    }
    function traduire(texte) {
        if (!index) construire();
        const t = texte.trim(); if (t.length < 6 || t.length > 400) return null;
        const mot = /^[A-Za-z"'’]+/.exec(t); const listes = [];
        if (mot && index.par.has(mot[0].toLowerCase())) listes.push(index.par.get(mot[0].toLowerCase()));
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
