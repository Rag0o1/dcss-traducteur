// Messages, partie Q (0.17.16) : relevé en spectateur (Armakuni) : projectiles bloqués, grêle, drain, ordres aux alliés, livres.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const AC = t => { const C = globalThis.DCSS_COMBAT; return C && C.acteurTexte ? C.acteurTexte(t) : null; };
    const traduit = en => { const r = T1(en); return r && r !== en ? r : null; };
    const cible = t => AC(t) || (/^[A-Z]/.test(t) ? AC(t) : null);
    const ponct = p => p === "!!!" ? " !!!" : p === "!!" ? " !!" : p === "!" ? " !" : ".";

    Object.assign(T, {
        "This spell is astonishingly dangerous to cast!": "Ce sort est incroyablement dangereux à lancer !",
        "The hail pelts you!": "La grêle vous frappe !",
        "Orders for allies: a - Attack new target.": "Ordres aux alliés : a - Attaquer la nouvelle cible.",
        "What are your orders?": "Quels sont vos ordres ?",
        "Anything else - Cancel.": "Autre touche - Annuler.",
        "g - Guard the area. f - Follow me.": "g - Garder la zone. f - Me suivre.",
        "r - Retreat! s - Stop attacking.": "r - Retraite ! s - Cesser d’attaquer.",
        "Ancestor HP restored.": "PV de l’ancêtre restaurés.",
        "Key pressed, stopping explore.": "Touche pressée, exploration interrompue.",
        "Hail of Bullets": "Grêle de balles",
        "Young Poisoner's Handbook": "Manuel du jeune empoisonneur",
        "a Young Poisoner's Handbook": "un Manuel du jeune empoisonneur",
    });

    R.push({ regex: /^(.+?) blocks the arrow\.$/, translate: m => { const a = cible(m[1]); return a ? `${a.S} bloque la flèche.` : null; } });
    R.push({ regex: /^The hail pelts (.+?)([.!]+)$/, translate: m => { const a = cible(m[1]); return a ? `La grêle frappe ${a.o}${ponct(m[2])}` : null; } });
    R.push({ regex: /^You drain (.+?)\.$/, translate: m => { const a = cible(m[1]); return a ? `Vous drainez ${a.o}.` : null; } });
    R.push({ regex: /^(\d+) spells hidden \[$/, translate: m => `${m[1]} sorts masqués [` });
    R.push({ regex: /^You pick up (.+?) and begin reading\.\.\.$/, translate: m => {
        const n = m[1] === "a Young Poisoner's Handbook" ? "un Manuel du jeune empoisonneur" : traduit(m[1]); return n ? `Vous ramassez ${n} et commencez à le lire...` : null; } });
    const ST = { rolling: "en boule", poisoned: "empoisonné", "ally target": "cible alliée" };
    R.push({ regex: /^((?:, [a-z ]+)+)\)$/, translate: m => { const p = m[1].slice(2).split(", "); if (!p.every(x => ST[x])) return null; return ", " + p.map(x => ST[x]).join(", ") + ")"; } });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R);
})();
