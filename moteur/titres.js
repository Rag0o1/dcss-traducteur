// =====================================================================
//  titres.js : titres de personnage (« rago the Trooper » → « rago le Soldat »).
//  Données : donnees/messages/titres.js (généré depuis outils/titres_fr.txt). Les titres contiennent parfois des morceaux
//  qui dépendent de l'espèce (@Adj@ @Genus@ @Walker@ @Walking@ @Weight@ @Child@) : on les reconnaît puis on les traduit avec les tables ci-dessous.
//  Formes reconnues : « NOM the TITRE », « NOM, TITRE », « NOM La Petite Mort », « Title  - TITRE » (écran du dieu) et le titre seul s'il est assez particulier.
// =====================================================================
(() => {
    // genre : nom français avec article ; g = m/f
    const GENRE = {
        "Human": ["l’", "Humain", "m"], "Elf": ["l’", "Elfe", "m"], "Dwarf": ["le ", "Nain", "m"], "Frog": ["la ", "Grenouille", "f"], "Goblin": ["le ", "Gobelin", "m"],
        "Draconian": ["le ", "Draconien", "m"], "Cat": ["le ", "Chat", "m"], "Ant": ["la ", "Fourmi", "f"], "Centaur": ["le ", "Centaure", "m"], "Octopus": ["la ", "Pieuvre", "f"],
        "Geist": ["l’", "Esprit", "m"], "Mummy": ["la ", "Momie", "f"], "Kobold": ["le ", "Kobold", "m"], "Gnoll": ["le ", "Gnoll", "m"], "Troll": ["le ", "Troll", "m"],
        "Naga": ["le ", "Naga", "m"], "Oni": ["l’", "Oni", "m"], "Tengu": ["le ", "Tengu", "m"], "Minotaur": ["le ", "Minotaure", "m"], "Merfolk": ["l’", "Ondin", "m"],
        "Gargoyle": ["la ", "Gargouille", "f"], "Djinni": ["le ", "Djinn", "m"], "Spriggan": ["le ", "Spriggan", "m"], "Vine Stalker": ["le ", "Rôdeur-vigne", "m"],
        "Revenant": ["le ", "Revenant", "m"], "Demigod": ["le ", "Demi-dieu", "m"], "God": ["le ", "Dieu", "m"], "Demonspawn": ["le ", "Rejeton démoniaque", "m"],
        "Barachi": ["le ", "Barachi", "m"], "Coglin": ["le ", "Coglin", "m"], "Deep Elf": ["l’", "Elfe", "m"], "Felid": ["le ", "Félid", "m"], "Formicid": ["le ", "Formicide", "m"],
        "Octopode": ["l’", "Octopode", "m"], "Poltergeist": ["le ", "Poltergeist", "m"], "Mountain Dwarf": ["le ", "Nain", "m"], "Gale Centaur": ["le ", "Centaure", "m"],
    };
    const ADJ = { "Human": ["humain", "humaine"], "Elven": ["elfique", "elfique"], "Dwarven": ["nain", "naine"], "Barachian": ["barachien", "barachienne"], "Divine": ["divin", "divine"],
        "Demonic": ["démoniaque", "démoniaque"], "Draconian": ["draconien", "draconienne"], "Feline": ["félin", "féline"], "Equine": ["équin", "équine"], "Merfolkian": ["ondin", "ondine"],
        "Octopoid": ["octopode", "octopode"], "Ghostly": ["spectral", "spectrale"], "Trollish": ["troll", "troll"], "Oni": ["oni", "oni"], "Gargoyle": ["de gargouille", "de gargouille"],
        "Kobold": ["kobold", "kobold"], "Gnoll": ["gnoll", "gnoll"], "Mummy": ["de momie", "de momie"], "Naga": ["naga", "naga"], "Minotaur": ["minotaure", "minotaure"], "Tengu": ["tengu", "tengu"],
        "Djinni": ["djinn", "djinn"], "Spriggan": ["spriggan", "spriggan"], "Revenant": ["revenant", "revenante"], "Demigod": ["demi-dieu", "demi-dieu"], "Demonspawn": ["démoniaque", "démoniaque"],
        "Barachi": ["barachien", "barachienne"], "Coglin": ["coglin", "coglin"], "Felid": ["félin", "féline"], "Formicid": ["formicide", "formicide"], "Poltergeist": ["spectral", "spectrale"],
        "Vine Stalker": ["de rôdeur-vigne", "de rôdeur-vigne"], "Octopode": ["octopode", "octopode"], "Deep Elf": ["elfique", "elfique"] };
    const POIDS = { Heavy: "lourd", Cruiser: "mi-lourd", Feather: "plume", Fly: "mouche", Light: "léger", Middle: "moyen" };
    const MARCHE = { Walk: ["Marcheur", "ambulant"], Hop: ["Sauteur", "sautillant"], Float: ["Flotteur", "flottant"], Slither: ["Reptateur", "rampant"], Wriggl: ["Frétilleur", "frétillant"],
        Trott: ["Trotteur", "trottinant"], Glid: ["Planeur", "planant"], Sprint: ["Sprinteur", "courant"], Stalk: ["Rôdeur", "rôdant"] };
    const ENFANT = { Child: ["l’", "Enfant", "m"], Tadpole: ["le ", "Têtard", "m"], Kitten: ["le ", "Chaton", "m"], Larva: ["la ", "Larve", "f"], Foal: ["le ", "Poulain", "m"],
        Pup: ["le ", "Chiot", "m"], Calf: ["le ", "Veau", "m"], Fry: ["l’", "Alevin", "m"], Chick: ["le ", "Poussin", "m"] };
    const MOT = "[A-Z][A-Za-z' -]*?";
    let TABLE = null;

    function adj(x, f) { const a = ADJ[x]; return a ? a[f ? 1 : 0] : "de " + (GENRE[x] ? GENRE[x][1].toLowerCase() : x.toLowerCase()); }
    // « Hopper »/« Hoper » : on enlève le suffixe puis on ignore une consonne doublée
    const cle = (x, suf) => { if (!x.endsWith(suf)) return null; return x.slice(0, -suf.length).replace(/([^aeiou])\1$/, "$1"); };
    function marcheur(x) { const c = cle(x, "er"); for (const k of Object.keys(MARCHE)) if (c !== null && c === k.replace(/([^aeiou])\1$/, "$1")) return MARCHE[k][0]; return null; }
    function marchant(x) { const c = cle(x, "ing"); for (const k of Object.keys(MARCHE)) if (c !== null && c === k.replace(/([^aeiou])\1$/, "$1")) return MARCHE[k][1]; return null; }

    function construire() {
        TABLE = [];
        for (const [en, fr] of (globalThis.DCSS_TITRES || [])) {
            const noms = [];
            const re = new RegExp("^" + en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/@(Adj|Genus_Short|Genus|genus|Walker|Walking|Weight|Child)@/g, (_, n) => { noms.push(n); return "(" + MOT + ")"; }) + "$");
            TABLE.push({ en, fr, noms, re, special: noms.length > 0 });
        }
    }

    // Traduit un titre seul ; renvoie null si inconnu.
    function titre(t) {
        if (!TABLE) construire();
        const direct = TABLE.find(x => !x.special && x.en === t);
        if (direct) return direct.fr;
        const mk = /^Marks(.+)$/.exec(t);
        if (mk && GENRE[mk[1][0].toUpperCase() + mk[1].slice(1)]) return "le Tireur d’élite";
        for (const x of TABLE) {
            if (!x.special) continue;
            const m = x.re.exec(t); if (!m) continue;
            const v = {}; x.noms.forEach((n, i) => { v[n] = m[i + 1]; });
            let g = null, ok = true;
            let fr = x.fr;
            const G = v.Genus_Short || v.Genus;
            if (G !== undefined) { g = GENRE[G]; if (!g) ok = false; }
            if (v.genus !== undefined) { if (!GENRE[v.genus[0].toUpperCase() + v.genus.slice(1)]) ok = false; }
            if (v.Weight !== undefined && !POIDS[v.Weight]) ok = false;
            if (v.Walker !== undefined && !marcheur(v.Walker)) ok = false;
            if (v.Walking !== undefined && !marchant(v.Walking)) ok = false;
            if (v.Child !== undefined && !ENFANT[v.Child]) ok = false;
            if (!ok) continue;
            const ch = v.Child !== undefined ? ENFANT[v.Child] : null;
            fr = fr.replace(/\{G\}/g, () => g ? g[0] + g[1] : "")
                .replace(/\{a:([^/}]*)\/([^}]*)\}/g, (_, a, b) => (g && g[2] === "f") ? b : a)
                .replace(/\{adjm\}/g, () => adj(v.Adj, false)).replace(/\{adjf\}/g, () => adj(v.Adj, true))
                .replace(/\{child\}/g, () => ch ? ch[0] + ch[1] : "").replace(/\{adjc\}/g, () => adj(v.Adj, ch && ch[2] === "f"))
                .replace(/\{w\}/g, () => POIDS[v.Weight]).replace(/\{wer\}/g, () => "le " + marcheur(v.Walker)).replace(/\{wing\}/g, () => marchant(v.Walking));
            return fr;
        }
        return null;
    }

    function traduire(texte) {
        if (!globalThis.DCSS_TITRES || /^(You|The|A|An|Your)\b/.test(texte)) return null;
        let m = /^([^\s,]{1,30}) the (\S.*)$/.exec(texte);
        if (m) { const f = titre(m[2]); if (f) return m[1] + " " + f; }
        m = /^([^\s,]{1,30}), (\S.*)$/.exec(texte);
        if (m) { const f = titre(m[2]); if (f) return m[1] + ", " + f; }
        m = /^([^\s,]{1,30}) La Petite Mort$/.exec(texte);
        if (m) return m[1] + " la Petite Mort";
        m = /^(Title\s+- )(\S.*)$/.exec(texte);
        if (m) { const f = titre(m[2]); if (f) return m[1] + f; }
        return null;
    }
    globalThis.DCSS_TITRES_MOTEUR = { traduire, titre };
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat([{ regex: /^[^\n]{6,90}$/, translate: (m, t) => traduire(t) }]);
})();
