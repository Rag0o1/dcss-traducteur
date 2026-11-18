#!/usr/bin/env python3
"""Réapplique les corrections écrites dans la colonne « Ta correction » de la base Excel.

Usage : python3 outils/importer_corrections.py fichier.xlsx [--essai]
  --essai : montre ce qui serait changé, sans rien écrire.
Seules les lignes dont le fichier est connu sont modifiées directement. Les autres (fichiers générés,
grammaires, phrases à trous construites par le code) sont listées pour être corrigées à la main dans leur source.
"""
import sys, json, os
from openpyxl import load_workbook
chemin = sys.argv[1]; essai = '--essai' in sys.argv
ws = load_workbook(chemin, read_only=True)['Traductions']
it = ws.iter_rows(values_only=True); ent = list(next(it))
col = {h: i for i, h in enumerate(ent)}
faits, manuels, contenus = [], [], {}
for r in it:
    corr = r[col['Ta correction']]
    if corr is None or str(corr).strip() == '': continue
    en, fr, f = r[col['Anglais']], r[col['Français']], r[col['Fichier']]
    corr = str(corr)
    chemin_f = os.path.join('donnees', f) if f and not f.startswith('(') else None
    if chemin_f and os.path.exists(chemin_f):
        s = contenus.get(chemin_f) or open(chemin_f, encoding='utf-8').read()
        genere = 'GÉNÉRÉ' in s[:300]
        a = json.dumps(en, ensure_ascii=False) + ': ' + json.dumps(fr, ensure_ascii=False)
        if not genere and s.count(a) == 1:
            contenus[chemin_f] = s.replace(a, json.dumps(en, ensure_ascii=False) + ': ' + json.dumps(corr, ensure_ascii=False))
            faits.append((r[col['ID']], f, en, corr)); continue
    # Fichiers générés : on corrige la source dans outils/ quand on la reconnaît
    src = None
    import glob
    for spec in glob.glob('outils/db/*.txt'):
        t = contenus.get(spec) or open(spec, encoding='utf-8').read()
        ligne = en + ' => ' + fr
        if ('\n' + ligne + '\n') in ('\n' + t + '\n'):
            contenus[spec] = ('\n' + t + '\n').replace('\n' + ligne + '\n', '\n' + en + ' => ' + corr + '\n', 1)[1:-1]; src = spec; break
    if not src:
        for js in ('outils/phrases_touches_src.json', 'outils/aide_titres.json'):
            d = json.loads(contenus.get(js) or open(js, encoding='utf-8').read())
            cle = ' '.join(en.split())
            if d.get(cle) == fr or d.get(en) == fr:
                d[cle if cle in d else en] = corr; contenus[js] = json.dumps(d, ensure_ascii=False, indent=1); src = js; break
    if src:
        faits.append((r[col['ID']], src, en, corr)); continue
    manuels.append((r[col['ID']], f, en, corr, r[col['Remarque']]))
if not essai:
    for p, s in contenus.items(): open(p, 'w', encoding='utf-8').write(s)
print(('À appliquer' if essai else 'Appliquées') + ' :', len(faits))
if any(x[1].startswith('outils/') for x in faits):
    print('  (sources dans outils/ modifiées : relancer outils/db/gen*.py, outils/gen_phrases_touches.js selon le cas)')
for x in faits: print('  #%s %s | %s → %s' % (x[0], x[1], x[2][:60], x[3][:60]))
print('À corriger à la main (fichier généré ou introuvable) :', len(manuels))
for x in manuels: print('  #%s %s | %s → %s %s' % (x[0], x[1], x[2][:60], x[3][:60], ('(' + str(x[4]) + ')') if x[4] else ''))
