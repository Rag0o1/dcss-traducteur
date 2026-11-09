#!/usr/bin/env python3
# Génère donnees/messages/titres.js à partir de outils/titres_fr.txt (« anglais=français », une ligne par titre).
import json, os
ici = os.path.dirname(os.path.abspath(__file__))
paires = [l.rstrip('\n').split('=', 1) for l in open(os.path.join(ici, 'titres_fr.txt'), encoding='utf-8') if l.strip()]
sortie = os.path.join(ici, '..', 'donnees', 'messages', 'titres.js')
with open(sortie, 'w', encoding='utf-8') as f:
    f.write('// Titres de personnage (« rago the Trooper »). GÉNÉRÉ par outils/generer_titres.py depuis outils/titres_fr.txt : ne pas modifier ici.\n')
    f.write('// Les morceaux @Adj@ @Genus@ @Walker@ ... sont remplacés par le moteur moteur/titres.js (espèce du joueur).\n')
    f.write('globalThis.DCSS_TITRES = ' + json.dumps(paires, ensure_ascii=False, indent=0) + ';\n')
print(len(paires), 'titres')
