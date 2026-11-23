// =====================================================================
//  graffitis.js : traduit les graffitis (dat/database/graffiti.txt) et les noms de couleurs (colourname.txt).
//  Ces textes sont fabriqués par une grammaire emboîtée. On l'a copiée avec sa traduction (donnees/messages/gabarits/graffitis_grammaire.js,
//  généré par outils/grammaire_graffitis.py) : le moteur analyse la phrase anglaise avec la grammaire anglaise, puis la reconstruit
//  avec la grammaire française (mêmes variantes [a|b], mêmes morceaux @règle@, accords en genre et en nombre).
//  Dans les règles françaises : {ms}{fs}{mp}{fp} = genre/nombre du mot, {inv} = couleur invariable, @règle#fs@ = accord imposé,
//  « vert/verte » = forme masculine/féminine (le pluriel prend un s).
// =====================================================================
(() => {
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    let REGLES = null;
    const FEUILLES = new Set(["ancestor name", "any orc name", "RANDGEN", "bland name", "random_god", "random_god_chaotic", "random_god_good", "random_god_evil",
        "random_skill", "random_skill_magic", "random_skill_mundane"]);
    const ALIAS = { graffiti_author_any: "_graffiti_author_any_" };

    function jetons(src, fr) {
        const out = []; const re = fr ? /\[([^\]]*)\]|@([^@#]+)(?:#([mf][sp]))?@|\{(inv|apres|[mf][sp])\}/g : /\[([^\]]*)\]|@([^@]+)@/g; let d = 0, m;
        while ((m = re.exec(src))) {
            if (m.index > d) out.push({ t: "lit", s: src.slice(d, m.index) });
            d = re.lastIndex;
            if (m[1] !== undefined) out.push({ t: "alt", opts: m[1].split("|") });
            else if (m[2] !== undefined) { const suiv = fr && m[2].endsWith(">"); const nom = suiv ? m[2].slice(0, -1) : m[2]; out.push({ t: "ref", nom: ALIAS[nom] || nom, gn: m[3], suiv }); }
            else out.push({ t: "tag", v: m[4] });
        }
        if (d < src.length) out.push({ t: "lit", s: src.slice(d) });
        return out;
    }
    function charger() {
        REGLES = {}; const D = globalThis.DCSS_GRAFFITIS_REGLES || {};
        for (const nom of Object.keys(D)) {
            REGLES[nom] = D[nom].map(([en, fr], i) => {
                const te = jetons(en, false); let lit = 0; for (const t of te) lit += t.t === "lit" ? t.s.length : t.t === "alt" ? 1 : 0;
                const feuille = te.length === 1 && te[0].t === "ref" && FEUILLES.has(te[0].nom);
                return { te, tf: jetons(fr, true), lit, i, feuille };
            }).sort((a, b) => (a.feuille ? 1 : 0) - (b.feuille ? 1 : 0) || b.lit - a.lit || a.i - b.i);
        }
    }

    // --- Analyse de la phrase anglaise avec la grammaire anglaise ---
    function analyser(regle, s) {
        let pas = 0, trouve = null;
        const seq = (te, t, i, enfants, alts, k) => {
            if (++pas > 150000) return true;
            if (t === te.length) return k(i, enfants, alts);
            const j = te[t];
            if (j.t === "lit") return s.startsWith(j.s, i) ? seq(te, t + 1, i + j.s.length, enfants, alts, k) : false;
            if (j.t === "alt") { for (let n = 0; n < j.opts.length; n++) if (s.startsWith(j.opts[n], i) && seq(te, t + 1, i + j.opts[n].length, enfants, alts.concat(n), k)) return true; return false; }
            if (REGLES[j.nom]) return reg(j.nom, i, (e, nd) => seq(te, t + 1, e, enfants.concat([[j.nom, nd]]), alts, k));
            // morceau libre (nom, dieu...) : s'arrête devant le texte qui suit
            const suiv = te[t + 1]; const max = Math.min(s.length, i + 60);
            for (let e = i + 1; e <= max; e++) {
                if (suiv && suiv.t === "lit" && !s.startsWith(suiv.s, e)) continue;
                if (suiv && suiv.t === "alt" && !suiv.opts.some(o => s.startsWith(o, e))) continue;
                if (seq(te, t + 1, e, enfants.concat([[j.nom, { feuille: true, nom: j.nom, texte: s.slice(i, e) }]]), alts, k)) return true;
            }
            return false;
        };
        const reg = (nom, i, k) => {
            for (const p of REGLES[nom]) if (seq(p.te, 0, i, [], [], (e, enf, alts) => k(e, { regle: nom, p, enf, alts }))) return true;
            return false;
        };
        if (!REGLES[regle]) return null;
        // on examine toutes les analyses possibles et on garde celle qui utilise le moins de morceaux libres (un nom court vaut mieux qu'un nom + « the orc »)
        let meilleur = Infinity;
        const libres = nd => nd.feuille ? nd.texte.length + 1 : (nd.enf || []).reduce((t, [, c]) => t + libres(c), 0);
        reg(regle, 0, (e, nd) => { if (e === s.length) { const sc = libres(nd); if (sc < meilleur) { meilleur = sc; trouve = nd; } } return meilleur === 0; });
        if (trouve) trouve.score = meilleur;
        return trouve;
    }

    // --- Reconstruction avec la grammaire française ---
    const accord = (txt, gn, inv) => txt.replace(/([\p{L}’'-]+)\/([\p{L}’'-]+)/gu, (m, a, b) => {
        let w = inv ? a : (gn[0] === "f" ? b : a);
        if (!inv && gn[1] === "p") { if (gn[0] === "m" && /al$/.test(w)) w = w.slice(0, -2) + "aux"; else if (!/[sxz]$/.test(w)) w += "s"; }
        return w; });
    function rendre(nd, ctx) {
        if (nd.feuille) {
            const n = nd.nom; let t = nd.texte;
            if (/^random_(god|skill)/.test(n)) { const r = T1(t); if (r && r !== t) t = r; else { const r2 = T1("the " + t); if (r2 && r2 !== "the " + t) t = r2.replace(/^(?:le|la|l’) ?/, m => m); } }
            if (/_possessive$/.test(n)) t = t.replace(/[’']s$/, "");   // « Trog's » → « Trog » (le français écrit « de Trog »)
            else if (/^(branch_name|god_name|xom_name|player_species)$/.test(n)) { const r = T1(t); if (r && r !== t) t = r; else t = t.replace(/^the /, ""); }
            return { s: t, gn: null };
        }
        let cur = ctx.gn || "ms", inv = !!ctx.inv, gnNoeud = null, apres = false, garde = null; const pris = {}; let sortie = "";
        const sousNoeud = (k, rang) => { let v = 0; for (const [nom, sub] of nd.enf) if (nom === k && ++v === rang) return sub; return null; };
        const tf = nd.p.tf;
        for (let ti = 0; ti < tf.length; ti++) {
            const t = tf[ti];
            if (t.t === "tag") { if (t.v === "apres") apres = true; else if (t.v === "inv") inv = true; else { cur = t.v; if (!gnNoeud) gnNoeud = t.v; } }
            else if (t.t === "lit") sortie += accord(t.s, cur, inv);
            else if (t.t === "alt") { /* index pris dans l'ordre des alternatives anglaises */ nd._ia = (nd._ia || 0); const n = nd.alts[nd._ia++]; sortie += accord(t.opts[Math.min(n === undefined ? 0 : n, t.opts.length - 1)], cur, inv); }
            else {
                const k = t.nom; pris[k] = (pris[k] || 0) + 1; let c = null, v = 0;
                for (const [nom, sub] of nd.enf) if (nom === k && ++v === pris[k]) { c = sub; break; }
                if (!c) return { s: "", gn: null, erreur: true };
                let gnRef = t.gn || cur;
                if (t.suiv) {   // @règle>@ : s'accorde avec le morceau suivant (adjectif ou nombre placé devant le nom)
                    for (let tj = ti + 1; tj < tf.length; tj++) if (tf[tj].t === "ref") {
                        const k2 = tf[tj].nom, rang2 = (pris[k2] || 0) + (k2 === k ? 1 : 1);
                        const c2 = sousNoeud(k2, k2 === k ? pris[k] + 1 : rang2);
                        if (c2) { const r2 = rendre(c2, { gn: cur, inv: inv || ctx.inv }); if (r2.gn) gnRef = r2.gn; }
                        break;
                    }
                }
                const r = rendre(c, { gn: gnRef, inv: inv || ctx.inv }); if (r.erreur) return r;
                if (sortie.includes("¤")) {   // ¤ = article défini accordé avec le morceau qui suit (noms d'artefacts)
                    const g = (t.suiv ? gnRef : r.gn) || "ms";
                    const art = g[1] === "p" ? "les " : globalThis.DCSS_ELIDE(r.s) ? "l’" : g[0] === "f" ? "la " : "le ";
                    sortie = sortie.replace("¤", art);
                }
                if (t.suiv && r.apres) { garde = r.s; continue; }   // {apres} : cet adjectif se place finalement après le nom
                sortie += r.s; if (r.gn && !t.gn && !t.suiv) { cur = r.gn; if (!gnNoeud) gnNoeud = r.gn; }
                if (garde !== null && !t.suiv) { sortie += " " + garde; garde = null; }
            }
        }
        nd._ia = 0;
        if (garde !== null) sortie += " " + garde;
        return { s: sortie, gn: gnNoeud, apres };
    }
    function elisions(s) {
        return s.replace(/ {2,}/g, " ").trim().replace(/\b([Dd])e le /g, "$1u ").replace(/\b([Dd])e les /g, "$1es ").replace(/\bà le /g, "au ").replace(/\bà les /g, "aux ")
            .replace(/\b([Dd]e|[Qq]ue) ([A-ZÀ-Ý][^\s]*)/g, (m, a, b) => globalThis.DCSS_ELIDE(b) ? a.slice(0, -1) + "’" + b : m)   // « d’Hiver », mais « de Hache »
            .replace(/\bdes (plusieurs|quelques) /g, "de $1 ");
    }

    function traduireAvecScore(regle, texte) {
        if (!REGLES) charger();
        if (!REGLES || !texte) return null;
        const nd = analyser(regle, texte); if (!nd) return null;
        const r = rendre(nd, { gn: "ms" }); if (r.erreur) return null;
        return { s: elisions(r.s), score: nd.score || 0 };
    }
    function traduire(regle, texte) { const r = traduireAvecScore(regle, texte); return r ? r.s : null; }
    // Noms aléatoires d'artefacts (« of the Lonely Yaks ») : on essaie les règles de départ du jeu (weapon, armour, ring…).
    const memoNoms = new Map();
    function nomArtefact(suffixe) {
        if (memoNoms.has(suffixe)) return memoNoms.get(suffixe);
        if (!REGLES) charger();
        let res = null;
        const depart = globalThis.DCSS_NOMS_DEPART || [];
        let meilleur = Infinity;   // la règle qui reconnaît le nom avec le moins de morceaux libres
        for (const r of depart) {
            if (!REGLES[r]) continue;
            const t = traduireAvecScore(r, suffixe);
            if (t && t.score < meilleur) { meilleur = t.score; res = t.s; if (!meilleur) break; }
        }
        if (res !== null && meilleur >= suffixe.length - 4) res = null;   // presque tout « libre » (« of Cocytus ») : ce n'est pas un nom d'artefact
        if (memoNoms.size > 2000) memoNoms.clear();
        memoNoms.set(suffixe, res);
        return res;
    }
    globalThis.DCSS_GRAFFITIS = { traduire, nomArtefact };
})();
