#!/usr/bin/env python3
"""Compare deux extractions (ancienne version / nouvelle version du jeu).

Usage :  python3 comparer_versions.py ancienne.json nouvelle.json  a_traduire.txt

Écrit la liste des textes NOUVEAUX ou MODIFIÉS (à traduire) et des textes SUPPRIMÉS (à retirer si on veut).
"""
import json, sys
a = json.load(open(sys.argv[1], encoding="utf-8")); b = json.load(open(sys.argv[2], encoding="utf-8"))
sortie = open(sys.argv[3], "w", encoding="utf-8")
nouveaux = modifies = supprimes = 0
for fichier, liste in b["descriptions"].items():
    anciens = dict(a["descriptions"].get(fichier, []))
    for cle, texte in liste:
        if cle not in anciens:
            sortie.write("NOUVEAU  [%s] %s\n    %s\n" % (fichier, cle, texte)); nouveaux += 1
        elif anciens[cle] != texte:
            sortie.write("MODIFIÉ  [%s] %s\n    avant : %s\n    après : %s\n" % (fichier, cle, anciens[cle], texte)); modifies += 1
    actuels = {c for c, _ in liste}
    for cle in anciens:
        if cle not in actuels:
            sortie.write("SUPPRIMÉ [%s] %s\n" % (fichier, cle)); supprimes += 1
for g in b["messages"]:
    if g not in a["messages"]:
        sortie.write("NOUVEAU MESSAGE  %s    (%s)\n" % (g, ", ".join(b["messages"][g][:2]))); nouveaux += 1
for g in a["messages"]:
    if g not in b["messages"]:
        sortie.write("MESSAGE SUPPRIMÉ  %s\n" % g); supprimes += 1
print("nouveaux : %d | modifiés : %d | supprimés : %d" % (nouveaux, modifies, supprimes))
