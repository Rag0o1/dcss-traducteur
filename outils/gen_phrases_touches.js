// Fabrique donnees/interface/phrases_touches.js depuis outils/phrases_touches_src.json (phrases entières, Ⓚ = touche colorée)
// et outils/aide_titres.json (titres des écrans d'aide). Usage : node outils/gen_phrases_touches.js
const fs = require("fs"), path = require("path");
const ici = __dirname;
const src = JSON.parse(fs.readFileSync(path.join(ici, "phrases_touches_src.json"), "utf8"));
const cmdChemin = path.join(ici, "phrases_cmd_src.json");
const cmd = fs.existsSync(cmdChemin) ? JSON.parse(fs.readFileSync(cmdChemin, "utf8")) : {};   // tutoriel : Ⓒ = touche collée au texte
const titres = JSON.parse(fs.readFileSync(path.join(ici, "aide_titres.json"), "utf8"));
let js = "// Phrases à touches (astuces, tutoriel, aide, FAQ) : clé = phrase anglaise entière, Ⓚ = touche colorée du jeu.\n";
js += "// GÉNÉRÉ par outils/gen_phrases_touches.js : corriger outils/phrases_touches_src.json et outils/aide_titres.json.\n";
js += "globalThis.DCSS_PHRASES_TOUCHES = " + JSON.stringify(src, null, 1) + ";\n";
js += "globalThis.DCSS_PHRASES_TOUCHES_CMD = " + JSON.stringify(cmd, null, 1) + ";\n";
js += "globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};\nglobalThis.DCSS_TRADUCTIONS.aide_titres = " + JSON.stringify(titres, null, 1) + ";\n";
fs.writeFileSync(path.join(ici, "..", "donnees", "interface", "phrases_touches.js"), js);
console.log(Object.keys(src).length, "phrases,", Object.keys(cmd).length, "phrases avec touche collée,", Object.keys(titres).length, "titres");
