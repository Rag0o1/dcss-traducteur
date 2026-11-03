// Mesure la couverture de traduction à partir d'une extraction (extraire_source.py).
// Usage :  node couverture.js extraction.json [--liste]    (--liste écrit non_traduits.txt)
// Principe : on charge l'extension comme le navigateur, puis on essaie de traduire chaque texte du jeu.
const vm = require("vm"), fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
const ctx = vm.createContext({
    console: { log() {}, info() {}, warn() {}, error: (...a) => console.log("ERREUR", ...a) },
    document: { querySelectorAll: () => [], createTreeWalker: () => ({ nextNode: () => null }), body: null, documentElement: { dataset: {} } },
    Node: { TEXT_NODE: 3, ELEMENT_NODE: 1, DOCUMENT_FRAGMENT_NODE: 11 }, NodeFilter: { SHOW_TEXT: 4 },
    MutationObserver: class { observe() {} disconnect() {} takeRecords() { return []; } }, requestAnimationFrame: () => 0
});
for (const f of manifest.content_scripts[0].js) vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
const T = ctx.DCSS_TRADUIRE_CHAINE;
const data = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const liste = process.argv.includes("--liste");
const manque = [];
const bal = s => s.replace(/<console>[\s\S]*?<\/console>/g, "").replace(/<\/?[a-z]+>/g, "").replace(/\\n/g, " ").replace(/\s+/g, " ").trim();

let tot = 0, ok = 0;
console.log("DESCRIPTIONS (dat/descript)");
for (const [f, items] of Object.entries(data.descriptions)) {
    let n = 0, t = 0;
    for (const [cle, texte] of items) {
        if (/\{\{/.test(texte)) continue; // code Lua : composé à l'exécution
        const x = bal(texte); n++;
        if (T(x) !== x || T(texte) !== texte) t++; else manque.push(f + " | " + cle + " | " + x);
    }
    tot += n; ok += t;
    console.log("  " + f.padEnd(14) + String(t).padStart(5) + " /" + String(n).padStart(5) + "  " + (n ? Math.round(100 * t / n) : 100) + " %");
}
console.log("  TOTAL".padEnd(16) + String(ok).padStart(5) + " /" + String(tot).padStart(5) + "  " + Math.round(100 * ok / tot) + " %\n");

// Messages à trous : on remplit les trous avec des valeurs typiques puis on regarde si ça se traduit
const REMPL = { A: "the jackal", I: "the jackal's", Y: "your dagger", X: "5", R: "iron", G: "azure", p: "it", s: "s", is: "is" };
let mt = 0, mo = 0, mx = 0; const mmq = [];
for (const g of Object.keys(data.messages)) {
    if (/\{\?\}/.test(g)) continue;
    mt++;
    const e0 = g.replace(/\{(A|I|Y|X|R|G|p|s|is|v:[a-z ]+)\}/g, (_, t) => t.startsWith("v:") ? t.slice(2) + "s" : REMPL[t]).replace(/<\/?[a-z]+>/g, "");
    const e = e0[0].toUpperCase() + e0.slice(1);
    if (T(e) !== e) mo++; else { const e2 = e.replace(/\bthe jackal\b/g, "you").replace(/\bThe jackal\b/, "You"); if (T(e2) !== e2) mo++; else { mmq.push(g); if (/\{X\}/.test(g)) mx++; } }
}
console.log("MESSAGES À TROUS (" + mt + " gabarits)");
console.log("  traduits : " + mo + " (" + Math.round(100 * mo / mt) + " %)");
console.log("  non traduits : " + mmq.length + " dont " + mx + " avec un trou libre {X} (difficile à juger sans le voir en jeu)");
if (liste) { fs.writeFileSync(path.join(__dirname, "non_traduits.txt"), manque.join("\n") + "\n\n=== MESSAGES ===\n" + mmq.join("\n") + "\n"); console.log("\nListe écrite dans outils/non_traduits.txt"); }
