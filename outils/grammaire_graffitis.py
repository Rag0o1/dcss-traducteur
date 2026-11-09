#!/usr/bin/env python3
"""Graffitis (dat/database/graffiti.txt + colourname.txt) : fabrique donnees/messages/gabarits/graffitis_grammaire.js.

Usage : python3 outils/grammaire_graffitis.py CHEMIN_DAT_DATABASE [--gabarit-en]
  - lit graffiti.txt et colourname.txt du jeu (règles et productions, dans l'ordre) ;
  - lit outils/graffitis_fr.txt (la traduction, mêmes règles, mêmes productions dans le même ordre) ;
  - écrit le fichier de données du moteur moteur/graffitis.js.
Avec --gabarit-en : écrit seulement outils/graffitis_en.txt (gabarit à traduire).
Format de graffitis_fr.txt : « == nom_de_regle » puis une ligne française par production anglaise.
"""
import sys, os, re, json

REGLES = ["graffiti.txt", "colourname.txt"]
GARDER = None  # colourname : seulement ces règles
GARDER_COL = {"rainbow_colour", "misc_colour", "mono_colour", "any_colour", "any_pattern", "glowing_adj", "any_glowing_colour", "any_colour_pattern", "any_glowing_colour_pattern"}

def lire(chemin, garder=None):
    regles = {}; ordre = []
    bloc = []
    txt = open(chemin, encoding="utf-8").read().split("\n")
    blocs = []; cur = []
    for l in txt:
        if l.strip() == "%%%%":
            blocs.append(cur); cur = []
        else:
            cur.append(l)
    blocs.append(cur)
    for b in blocs:
        lignes = [l for l in b if l.strip() and not l.lstrip().startswith("#")]
        if not lignes: continue
        nom = lignes[0].strip()
        if not re.match(r"^[A-Za-z_][A-Za-z0-9_\-]*$", nom): continue
        if garder is not None and nom not in garder: continue
        prods = [l.rstrip() for l in lignes[1:] if not re.match(r"^w:\d+$", l.strip())]
        regles[nom] = prods; ordre.append(nom)
    return regles, ordre

def main():
    base = sys.argv[1]
    toutes = {}; ordre = []
    for f in REGLES:
        r, o = lire(os.path.join(base, f), GARDER_COL if f == "colourname.txt" else None)
        toutes.update(r); ordre += o
    ici = os.path.dirname(os.path.abspath(__file__))
    if "--gabarit-en" in sys.argv:
        with open(os.path.join(ici, "graffitis_en.txt"), "w", encoding="utf-8") as f:
            for n in ordre:
                f.write("== %s\n" % n)
                for p in toutes[n]: f.write(p + "\n")
        print(len(ordre), "règles,", sum(len(toutes[n]) for n in ordre), "productions"); return
    fr = {}; cur = None
    for l in open(os.path.join(ici, "graffitis_fr.txt"), encoding="utf-8").read().split("\n"):
        if l.startswith("== "): cur = l[3:].strip(); fr[cur] = []
        elif cur and l.strip(): fr[cur].append(l.rstrip())
    mauvais = 0
    for n in ordre:
        if n not in fr: print("MANQUE", n); mauvais += 1
        elif len(fr[n]) != len(toutes[n]): print("NOMBRE", n, len(toutes[n]), len(fr[n])); mauvais += 1
    for n in fr:
        if n not in toutes: print("EN TROP", n); mauvais += 1
    if mauvais: sys.exit(1)
    donnees = {}
    for n in ordre:
        paires = []
        for e, f in zip(toutes[n], fr[n]):
            if " = " in f and f.split(" = ", 1)[0] == e: f = f.split(" = ", 1)[1]   # « anglais = français » : vérifie l'ordre
            elif " = " in f and n in ("misc_colour", "rainbow_colour", "mono_colour", "any_pattern", "glowing_adj"):
                print("DÉCALAGE", n, repr(e), repr(f)); mauvais += 1
            paires.append([e, f])
        donnees[n] = paires
    if mauvais: sys.exit(1)
    out = os.path.join(ici, "..", "donnees", "messages", "gabarits", "graffitis_grammaire.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write("// Grammaire des graffitis et des noms de couleurs (graffiti.txt, colourname.txt) : [anglais, français] par production.\n")
        f.write("// Généré par outils/grammaire_graffitis.py à partir de outils/graffitis_fr.txt. Moteur : moteur/graffitis.js.\n")
        f.write("globalThis.DCSS_GRAFFITIS_REGLES = " + json.dumps(donnees, ensure_ascii=False, indent=0) + ";\n")
    print("écrit", out, sum(len(v) for v in donnees.values()), "productions")

main()
