// Exporte toutes les traductions de l'extension dans des fichiers texte simples (dossier export/).
// Usage : node outils/exporter.js      (depuis la racine du projet)
const vm = require("vm"), fs = require("fs"), path = require("path");
const racine = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(racine, "manifest.json"), "utf8"));
const sb = { console: { log() {}, info() {}, warn() {}, error() {} }, document: { querySelectorAll: () => [], createTreeWalker: () => ({ nextNode: () => null }), body: null, documentElement: { dataset: {} } },
    Node: { TEXT_NODE: 3, ELEMENT_NODE: 1 }, NodeFilter: { SHOW_TEXT: 4 }, MutationObserver: class { observe() {} disconnect() {} takeRecords() { return []; } }, requestAnimationFrame: () => 0 };
const ctx = vm.createContext(sb);
const gabarits = {};   // phrases à gabarit, rangées par fichier (donnees/messages/gabarits/*.js)
for (const f of manifest.content_scripts[0].js) {
    const avant = (ctx.DCSS_GABARITS_TEXTES || []).length;
    vm.runInContext(fs.readFileSync(path.join(racine, f), "utf8"), ctx, { filename: f });
    const apres = (ctx.DCSS_GABARITS_TEXTES || []).length;
    if (apres > avant) gabarits[path.basename(f, ".js")] = ctx.DCSS_GABARITS_TEXTES.slice(avant, apres);
}
const out = path.join(racine, "export"); fs.mkdirSync(out, { recursive: true });
const une = s => String(s).replace(/\r?\n/g, "\\n");
const bloc = obj => Object.entries(obj).filter(([k, v]) => typeof v === "string").map(([k, v]) => `EN: ${une(k)}\nFR: ${une(v)}\n`).join("\n");
const tout = {};
let total = 0;
for (const [cat, tab] of Object.entries(ctx.DCSS_TRADUCTIONS)) {
    const n = Object.values(tab).filter(v => typeof v === "string").length; if (!n) continue;
    fs.writeFileSync(path.join(out, `textes_${cat}.txt`), bloc(tab)); tout[cat] = tab; total += n;
}
const vars = ctx.DCSS_VARIABLES; fs.writeFileSync(path.join(out, "messages_a_trous.txt"), bloc(vars)); tout.messages_a_trous = vars; total += Object.keys(vars).length;
const V = ctx.DCSS_VOCAB || {};
const mon = Object.fromEntries(Object.entries(V.monsters || {}).map(([k, v]) => [k, v.name]));
fs.writeFileSync(path.join(out, "vocabulaire_monstres.txt"), bloc(mon)); tout.monstres = mon;
const proj = Object.fromEntries(Object.entries(ctx.DCSS_PROJECTILES || {}).map(([k, v]) => [k, v[0]]));
fs.writeFileSync(path.join(out, "vocabulaire_projectiles.txt"), bloc(proj)); tout.projectiles = proj;
for (const [nom, blocs] of Object.entries(gabarits)) {
    const t = {};
    for (const bl of blocs) for (const e of String(bl).split(/\n\s*\n/)) { const l = e.split("\n").map(x => x.trim()).filter(Boolean); if (l.length >= 2) t[l[0]] = l[1]; }
    fs.writeFileSync(path.join(out, `gabarits_${nom}.txt`), bloc(t)); tout["gabarits_" + nom] = t; total += Object.keys(t).length;
}
const graf = {};
for (const [regle, prods] of Object.entries(ctx.DCSS_GRAFFITIS_REGLES || {})) for (const [en, fr] of prods) graf[`[${regle}] ${en}`] = fr;
if (Object.keys(graf).length) { fs.writeFileSync(path.join(out, "graffitis_et_couleurs.txt"), bloc(graf)); tout.graffitis_et_couleurs = graf; total += Object.keys(graf).length; }
fs.writeFileSync(path.join(out, "tout.json"), JSON.stringify(tout, null, 1));
console.log("textes exportés :", total, "+", Object.keys(mon).length, "monstres +", Object.keys(proj).length, "projectiles");
