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
        const out = []; const re = fr ? /\[([^\]]*)\]|@([^@#]+)(?:#([mf][sp]))?@|\{(inv|[mf][sp])\}/g : /\[([^\]]*)\]|@([^@]+)@/g; let d = 0, m;
        while ((m = re.exec(src))) {
            if (m.index > d) out.push({ t: "lit", s: src.slice(d, m.index) });
            d = re.lastIndex;
            if (m[1] !== undefined) out.push({ t: "alt", opts: m[1].split("|") });
            else if (m[2] !== undefined) out.push({ t: "ref", nom: ALIAS[m[2]] || m[2], gn: m[3] });
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
        return trouve;
    }

    // --- Reconstruction avec la grammaire française ---
    const accord = (txt, gn, inv) => txt.replace(/([\p{L}’'-]+)\/([\p{L}’'-]+)/gu, (m, a, b) => {
        let w = inv ? a : (gn[0] === "f" ? b : a); if (!inv && gn[1] === "p" && !/[sxz]$/.test(w)) w += "s"; return w; });
    function rendre(nd, ctx) {
        if (nd.feuille) {
            const n = nd.nom; let t = nd.texte;
            if (/^random_(god|skill)/.test(n)) { const r = T1(t); if (r && r !== t) t = r; else { const r2 = T1("the " + t); if (r2 && r2 !== "the " + t) t = r2.replace(/^(?:le|la|l’) ?/, m => m); } }
            return { s: t, gn: null };
        }
        let cur = ctx.gn || "ms", inv = !!ctx.inv, gnNoeud = null; const pris = {}; let sortie = "";
        for (const t of nd.p.tf) {
            if (t.t === "tag") { if (t.v === "inv") inv = true; else { cur = t.v; if (!gnNoeud) gnNoeud = t.v; } }
            else if (t.t === "lit") sortie += accord(t.s, cur, inv);
            else if (t.t === "alt") { /* index pris dans l'ordre des alternatives anglaises */ nd._ia = (nd._ia || 0); const n = nd.alts[nd._ia++]; sortie += accord(t.opts[Math.min(n === undefined ? 0 : n, t.opts.length - 1)], cur, inv); }
            else {
                const k = t.nom; pris[k] = (pris[k] || 0) + 1; let c = null, v = 0;
                for (const [nom, sub] of nd.enf) if (nom === k && ++v === pris[k]) { c = sub; break; }
                if (!c) return { s: "", gn: null, erreur: true };
                const r = rendre(c, { gn: t.gn || cur, inv: inv || ctx.inv }); if (r.erreur) return r;
                sortie += r.s; if (r.gn && !t.gn) { cur = r.gn; if (!gnNoeud) gnNoeud = r.gn; }
            }
        }
        nd._ia = 0;
        return { s: sortie, gn: gnNoeud };
    }
    function elisions(s) { return s.replace(/\b([Dd]e|[Qq]ue) ([AEIOUYÉÈÊ])/g, (m, a, b) => a.slice(0, -1) + "’" + b); }

    function traduire(regle, texte) {
        if (!REGLES) charger();
        if (!REGLES || !texte) return null;
        const nd = analyser(regle, texte); if (!nd) return null;
        const r = rendre(nd, { gn: "ms" }); if (r.erreur) return null;
        return elisions(r.s);
    }
    globalThis.DCSS_GRAFFITIS = { traduire };
})();
