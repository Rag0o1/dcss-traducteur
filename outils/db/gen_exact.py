# Génère un dictionnaire exact (DCSS_TRADUCTIONS.<nom>) depuis des lignes "EN => FR".
# Macros développées : @F@/@M@ (adjectifs de l'Orbe, fém./masc.), @H@ (choses d'Halloween), @L@ (bestioles).
import sys, json
ADJ = [("astounding","stupéfiante","stupéfiant"),("awesome","formidable","formidable"),("breathtaking","à couper le souffle","à couper le souffle"),
 ("fabled","mythique","mythique"),("fabulous","fabuleuse","fabuleux"),("fantabulous","fantabuleuse","fantabuleux"),("glorious","glorieuse","glorieux"),
 ("incredible","incroyable","incroyable"),("legendary","légendaire","légendaire"),("magnificent","magnifique","magnifique"),("majestic","majestueuse","majestueux"),
 ("marvelous","merveilleuse","merveilleux"),("splendid","splendide","splendide"),("stupendous","prodigieuse","prodigieux"),("sublime","sublime","sublime"),
 ("terrific","formidable","formidable"),("transcendent","transcendante","transcendant"),("wondrous","merveilleuse","merveilleux")]
H = [("demonic hallucinations","des hallucinations démoniaques"),("disembodied spirits","des esprits désincarnés"),("ghosts and spectres","des fantômes et des spectres"),
 ("grim spectres","de sinistres spectres"),("horrible apparitions","d’horribles apparitions"),("phantasmagorical visions","des visions fantasmagoriques")]
L = [("frog","grenouille"),("newt","triton"),("slug","limace"),("toad","crapaud"),("worm","ver")]
nom, sortie, *specs = sys.argv[1:]
out = {}
for f in specs:
    for ligne in open(f, encoding="utf8"):
        ligne = ligne.rstrip("\n")
        if " => " not in ligne or ligne.startswith("#"): continue
        en, fr = ligne.split(" => ", 1)
        if "@F@" in en or "@M@" in en:
            for a, fe, ma in ADJ:
                out[en.replace("@F@", a).replace("@M@", a)] = fr.replace("@F@", fe).replace("@M@", ma)
        elif "@H@" in en:
            for a, b in H:
                out[en.replace("@H@", a)] = fr.replace("@H@", b)
        elif "@L@" in en:
            for a, b in L:
                out[en.replace("@L@", a)] = fr.replace("@L@", b)
        else:
            out[en] = fr
with open(sortie, "w", encoding="utf8") as o:
    o.write("// GÉNÉRÉ par outils/db/gen_exact.py — ne pas modifier à la main, corriger outils/db/*.txt.\n")
    o.write("globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};\n")
    o.write("globalThis.DCSS_TRADUCTIONS.%s = {\n" % nom)
    o.write(",\n".join("%s: %s" % (json.dumps(k, ensure_ascii=False), json.dumps(v, ensure_ascii=False)) for k, v in out.items()))
    o.write("\n};\n")
print(len(out))
