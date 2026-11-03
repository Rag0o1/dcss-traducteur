// =====================================================================
//  moteur/phrases_a_trous.js : messages du jeu qui contiennent des mots variables (monstre, objet, nombre...).
//
//  Les phrases sont dans les fichiers variables_*.js (table DCSS_VARIABLES). Une ligne =
//     "phrase anglaise avec des trous": "phrase française avec les mêmes trous",
//  Trous dans la phrase anglaise (numérotés 1, 2, 3... dans l'ordre où ils apparaissent) :
//     {A}  un monstre ou « you » (« the jackal », « a goblin », « Sigmund »)
//     {I}  possessif d'un monstre (« the jackal's », « your », « its »)
//     {Y}  un objet à vous (« your dagger »)    {X} n'importe quel texte (traduit à son tour)
//     {p}  pronom (it, he, she, his...)         {s} un « s » facultatif     {is} is/are
//     {v:grab} le verbe grab/grabs (accord du verbe)
//     {n1} « nt » si le trou n°1 est un pluriel (touche{n1}) ; {c1} « t » ou « ssent » (engloutit / engloutissent)
//     {K}  un nom de touche (« o », « Ctrl-P ») : recopié tel quel
//     {Z}  un projectile / effet de sort connu (« bolt of fire », « lance of force »...) : voir projectiles.js
//  Dans le français : {S1} sujet (« Le chacal », « Le rayon de feu »), {o1} complément (« le chacal »), {d1} « du chacal »,
//     {a1} « au chacal », {e1} « e » si féminin, {x3} le trou n°3 traduit, {y2} idem pour un objet.
//  « ¦ » sépare deux versions : la 1re si le sujet est un monstre, la 2e si le sujet est « you ».
// =====================================================================
(() => {
    const TABLE = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const MAJ = s => s.charAt(0).toUpperCase() + s.slice(1);
    const echap = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let regles = null;

    // Formes anglaises d'un verbe : « grab » -> grab|grabs ; « are » -> is|are|am ; « have » -> have|has
    function formesVerbe(v) {
        if (v === "are" || v === "be") return "(?:is|are|am)";
        if (v === "have") return "(?:have|has)";
        if (v === "do") return "(?:do|does)";
        const f = [v, v + "s", v + "es"];
        if (/y$/.test(v)) f.push(v.slice(0, -1) + "ies");
        return "(?:" + f.join("|") + ")";
    }

    // Trou {Z} : un projectile / effet de sort connu (table DCSS_PROJECTILES de projectiles.js), du plus long au plus court
    let alt = null;
    function alternanceProj() {
        if (!alt) alt = Object.keys(globalThis.DCSS_PROJECTILES || { "": 0 }).sort((a, b) => b.length - a.length).map(echap).join("|");
        return alt;
    }
    function infoProjectile(nom) {
        const e = (globalThis.DCSS_PROJECTILES || {})[nom];
        if (!e) return null;
        const [fr, g] = e;
        const voy = /^[aeiouyhéèêâîôûœ]/i.test(fr) && g !== "p";
        const o = g === "p" ? "les " + fr : voy ? "l’" + fr : (g === "f" ? "la " : "le ") + fr;
        const d = g === "p" ? "des " + fr : voy ? "de l’" + fr : g === "f" ? "de la " + fr : "du " + fr;
        const a = g === "p" ? "aux " + fr : voy ? "à l’" + fr : g === "f" ? "à la " + fr : "au " + fr;
        return { x: fr, o, S: MAJ(o), d, a, e: g === "f" ? "e" : "", pl: g === "p" };
    }
    function compiler() {
        regles = [];
        for (const cle of Object.keys(TABLE)) {
            const nette = cle.replace(/<\/?[a-z]+>/g, "").trim();
            const types = [];
            let n = 0, source = "", morceau = "", plusLong = "";
            const re = /\{(A|I|Y|X|K|R|G|Z|p|s|is|v:[a-z ]+)\}/g;
            let i = 0, m;
            const fin = () => { if (morceau.length > plusLong.length) plusLong = morceau; morceau = ""; };
            while ((m = re.exec(nette))) {
                const lit = nette.slice(i, m.index);
                source += echap(lit); morceau += lit; i = re.lastIndex;
                const t = m[1];
                if (t === "s") source += "s?";
                else if (t === "is") source += "(?:is|are)";
                else if (t === "p") source += "(?:it|he|she|him|her|his|its|their|them|itself|himself|herself)";
                else if (t.startsWith("v:")) source += formesVerbe(t.slice(2));
                else if (t === "K") { source += "(\\S{1,20}?)"; types.push(t); fin(); }
                else if (t === "Z") { source += "(" + alternanceProj() + ")"; types.push(t); fin(); }
                else { source += "(.+?)"; types.push(t); fin(); }
                if (t === "s" || t === "is" || t === "p" || t.startsWith("v:")) fin();
            }
            const lit = nette.slice(i); source += echap(lit); morceau += lit; fin();
            const fr = TABLE[cle].split(" ¦ ");
            regles.push({ re: new RegExp("^" + source + "$"), types, fr, filtre: plusLong.trim() });
        }
    }

    // Adjectifs de runes (féminin) et de joyaux (masculin)
    const RUNES = { iron: "de fer", obsidian: "d’obsidienne", icy: "glacée", bone: "d’os", slimy: "visqueuse", silver: "d’argent",
        serpentine: "serpentine", elven: "elfique", golden: "dorée", decaying: "putrescente", barnacled: "incrustée de bernacles",
        gossamer: "arachnéenne", mossy: "moussue", demonic: "démoniaque", abyssal: "abyssale", glowing: "lumineuse",
        magical: "magique", fiery: "ardente", dark: "sombre" };
    const JOYAUX = { smoky: "fumé", glittering: "scintillant", shimmering: "chatoyant", earthy: "terreux", mossy: "moussu",
        azure: "azur", jade: "de jade", "milky-white": "blanc laiteux", starry: "étoilé", shining: "brillant", ivory: "d’ivoire",
        sanguine: "sanguin", midnight: "de minuit", prismatic: "prismatique" };
        function acteur(t) {
        if (/^you$/i.test(t)) return "toi";
        if (/^something$/i.test(t)) return { S: "Quelque chose", o: "quelque chose", d: "de quelque chose", a: "à quelque chose", e: "" };
        if (/^it$/i.test(t)) return { S: "Cela", o: "cela", d: "de cela", a: "à cela", e: "" };
        const C = globalThis.DCSS_COMBAT;
        if (!C || !C.acteurTexte) return null;
        return C.acteurTexte(t) || (/^(an?|the|your) /i.test(t) ? null : C.acteurTexte("the " + t));
    }

    function appliquer(r, m) {
        const groupes = m.slice(1);
        const info = [];
        let joueur = false;
        for (let k = 0; k < r.types.length; k++) {
            const t = r.types[k], g = groupes[k];
            if (t === "A") {
                const a = acteur(g);
                if (a === null) return null;
                if (a === "toi") { if (k === 0 || r.types.indexOf("A") === k) joueur = true; info.push(null); } else info.push(a);
            } else if (t === "I") {
                let a;
                if (/^(your)$/i.test(g)) a = { d: "de vous", o: "votre" , S: "Votre", a: "à vous", e: "" };
                else if (/^(its|his|her|their)$/i.test(g)) a = { d: "de la créature", o: "la créature", S: "La créature", a: "à la créature", e: "" };
                else if (/'s?$/.test(g)) a = acteur(g.replace(/'s?$/, ""));
                else return null;
                if (a === null || (typeof a === "object" && a.d === "de vous")) return null;
                info.push(a);
            } else if (t === "Z") {
                const z = infoProjectile(g);
                if (z === null) return null;
                info.push(z);
            } else if (t === "K") {
                info.push({ x: g });
            } else if (t === "R" || t === "G") {
                const f = (t === "R" ? RUNES : JOYAUX)[g];
                if (f === undefined) return null;
                info.push({ x: f });
            } else {
                const T = globalThis.DCSS_TRADUIRE_CHAINE;
                let g2 = g;
                if (/^your /i.test(g)) g2 = "the " + g.slice(5);        // « your dagger » : on traduit « the dagger » puis on remet « votre »
                if (/^the shining one$/i.test(g)) { info.push({ x: "L’Étincelant", d: "de l’Étincelant" }); continue; }
                let f = T ? T(g2) : g2;
                if (g2 !== g && f !== g2) {
                    f = f.replace(/^(?:le |la |l’|un |une )/, "votre ").replace(/^(?:les |des )/, "vos ");
                    if (!/^(votre|vos) /.test(f)) f = g;
                    else if (/^Y/.test(g)) f = MAJ(f);
                } else if (g2 !== g) f = g;
                // un trou resté en anglais gâcherait la phrase : on la laisse alors entièrement telle quelle
                if (f === g && /[A-Za-z]{3}/.test(g) && !/^(?:The )?\p{Lu}[\p{L}’']*(?: \p{Lu}[\p{L}’']*)*$/u.test(g)) return null;
                info.push({ x: f, d: (/^[AEIOUYÉÈÂ]/.test(f) ? "d’" : /^Le /.test(f) ? "du " + f.slice(3) : "de ") + (/^Le /.test(f) ? "" : f) });
            }
        }
        const version = r.fr.length > 1 && joueur ? r.fr[1] : r.fr[0];
        let ok = true;
        const sortie = version.replace(/\{([Sodaexyncg])(\d)\}/g, (_, c, d) => {
            const x = info[+d - 1];
            if (!x) { ok = false; return ""; }
            if (c === "n") return x.pl ? "nt" : "";        // verbe en -e : touche / touchent
            if (c === "g") return x.pl ? "gnent" : "nt";     // étrei + nt / gnent (étreint / étreignent)
            if (c === "c") return x.pl ? "ssent" : "t";    // verbe en -ir : engloutit / engloutissent
            if (c === "x" || c === "y") return x.x !== undefined ? x.x : (ok = false, "");
            const v = x[c];
            if (v === undefined) { ok = false; return ""; }
            return v;
        });
        return ok ? sortie : null;
    }

    function traduire(t) {
        if (!regles) compiler();
        if (t.length > 300) return null;
        for (const r of regles) {
            if (r.filtre.length >= 4 && t.indexOf(r.filtre) === -1) continue;
            const m = r.re.exec(t);
            if (!m) continue;
            const s = appliquer(r, m);
            if (s !== null) return s;
        }
        return null;
    }
    // « !! » et « !!! » finaux (force du coup) : on traduit avec un seul « ! » puis on remet les points d'exclamation
    function traduireForce(t) {
        const m = /^([\s\S]*[^!\s])(!{2,})$/.exec(t);
        if (m) {
            const direct = traduire(t);
            if (typeof direct === "string") return direct;
            const r = traduire(m[1] + "!");
            if (typeof r === "string" && /!$/.test(r)) return r + m[2].slice(1);
            return null;
        }
        return traduire(t);
    }
    const regle = { regex: /^(?!\s*$)[\s\S]{4,300}$/, translate: m => { const r = traduireForce(m[0]); return typeof r === "string" ? r : m[0]; } };
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat([regle]);
    globalThis.DCSS_VARIABLES_TRADUIRE = traduire;
})();
