#!/usr/bin/env python3
"""Fichier de travail pour mettre à jour la feuille Google Sheets « DCSS-Traducteur-traductions » (onglets Accueil et Traductions).

Usage (depuis la racine du projet) :
    node outils/exporter.js                                   # met à jour export/tout.json
    python3 outils/base_traductions.py ../DCSS-Traducteur-traductions.xlsx

Onglets :
  Accueil      mode d'emploi, chiffres par thème
  Traductions  UNE ligne par texte : filtrer par Thème / Type, chercher (Ctrl+F), écrire dans « Ta correction »
Les onglets Règles et Priorités n'existent que dans la feuille Google Sheets (ne pas les écraser).

Les corrections écrites dans « Ta correction » se réappliquent avec : python3 outils/importer_corrections.py fichier.xlsx
Nécessite : pip install openpyxl
"""
import json, re, os, collections, sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.formatting.rule import FormulaRule

SORTIE = sys.argv[1] if len(sys.argv) > 1 else '../DCSS-Traducteur-traductions.xlsx'
ICI = os.path.dirname(os.path.abspath(__file__))
tout = json.load(open('export/tout.json', encoding='utf-8'))
manifest = json.load(open('manifest.json', encoding='utf-8'))

# --- où se trouve chaque texte (pour l'import des corrections) ---
fichiers = [f for f in manifest['content_scripts'][0]['js'] if f.startswith('donnees/') and os.path.exists(f)]
S = r'"((?:[^"\\\n]|\\.)*)"'
PAIRE = re.compile(r'(?:^|[\s,{(\[])' + S + r'\s*:\s*' + S + r'\s*(?=[,}\n])')
def unesc(x):
    try: return json.loads('"' + x + '"')
    except Exception: return x
ou = {}
for f in fichiers:
    for m in PAIRE.finditer(open(f, encoding='utf-8').read()):
        ou.setdefault(unesc(m.group(1)), f)

# --- thème de chaque catégorie interne ---
regles_noms = set(re.findall(r'^== (.*)$', open(os.path.join(ICI, 'noms_aleatoires_en.txt'), encoding='utf-8').read(), re.M)) if os.path.exists(os.path.join(ICI, 'noms_aleatoires_en.txt')) else set()
THEMES = [
    ('Monstres', ['monstres', 'monstres_desc', 'titres', 'titres_uniques', 'capacites_desc', 'statuts_desc', 'passives_desc', 'gabarits_monstres_paroles', 'gabarits_monstres_sorts', 'gabarits_cris', 'gabarits_voix_diverses']),
    ('Répliques de monstres', ['citations_']),
    ('Objets', ['lex_objets', 'lex_armes', 'lex_egos', 'projectiles', 'boutiques']),
    ('Armes qui parlent', ['gabarits_armes_']),
    ('Sorts', ['sorts', 'sorts_desc', 'sorts_noms_anglais', 'gabarits_magie_rates']),
    ('Dieux', ['lex_dieux', 'gabarits_dieux_xom']),
    ('Personnage', ['races', 'metiers', 'mutations', 'mutations_desc', 'mutations_msg']),
    ('Aide et tutoriel', ['astuces', 'astuces_morceaux', 'astuces_morceaux2', 'aide', 'aide_titres', 'phrases_touches']),
    ('Interface', ['lex_libelles', 'lex_menus', 'complements', 'statuts_lumieres']),
    ('Lieux et décors', ['decors_desc', 'decors_morceaux', 'gabarits_decors_lignes', 'divers_desc', 'lex_textes_longs']),
    ('Messages du jeu', ['messages_fixes', 'messages_jeu', 'messages', 'divers', 'lex_phrases', 'messages_a_trous', 'database_divers']),
    ('Ancienne traduction officielle', ['officiel']),
]
def theme(cat, en):
    if cat == 'graffitis_et_couleurs':
        r = en[1:en.index(']')] if en.startswith('[') else ''
        return 'Noms d’artefacts (grammaire)' if r in regles_noms else 'Graffitis et couleurs (grammaire)'
    for nom, cats in THEMES:
        for c in cats:
            if cat == c or (c.endswith('_') and cat.startswith(c)): return nom
    return 'Divers'

def type_texte(cat, en, fr):
    if cat in ('graffitis_et_couleurs', 'decors_morceaux'): return 'Morceau de grammaire'
    if en.startswith('~'): return 'Morceau de phrase'
    if 'Ⓚ' in en: return 'Phrase avec touches'
    if re.search(r'\{[A-Za-z]\w*\}|@\w+@|%[sd]|\(\.\+\??\)', en): return 'Phrase à trous'
    if len(en) > 160: return 'Description'
    if re.search(r'[.!?]["»)]?$', en.strip()) or len(en.split()) > 6: return 'Phrase'
    return 'Nom / libellé'

ILL = re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f]')
lignes = []
for cat, tab in tout.items():
    for en, fr in tab.items():
        if not isinstance(fr, str): continue
        en2, fr2 = ILL.sub('', en), ILL.sub('', fr)
        lignes.append([theme(cat, en), type_texte(cat, en, fr), en2, fr2, ou.get(en, ''), cat])
ORDRE_T = {t: i for i, (t, _) in enumerate(THEMES)}
lignes.sort(key=lambda r: (ORDRE_T.get(r[0], 99), r[0], r[1], r[2].lower()))

# --- liens nom ↔ description ---
def n_(x): return re.sub(r'\s+', ' ', x).strip().lower()
rang = {}
for i, l in enumerate(lignes):
    rang.setdefault(n_(l[2]), i)
liens = {}
cp = os.path.join(ICI, 'paires_noms_descriptions.json')
if os.path.exists(cp):
    for typ, nom_jeu, texte in json.load(open(cp, encoding='utf-8')):
        d, n = rang.get(n_(texte)), rang.get(n_(nom_jeu))
        if d is None or n is None: continue
        liens.setdefault(d, ('← nom : ' + nom_jeu, n))
        liens.setdefault(n, ('→ sa description', d))

# --- classeur ---
F = 'Arial'
BLEU = PatternFill('solid', fgColor='1F3864'); JAUNE = PatternFill('solid', fgColor='FFF2CC')
fn = Font(name=F, size=10); fb = Font(name=F, size=10, bold=True); lien = Font(name=F, size=10, color='0563C1', underline='single')
wrap = Alignment(wrap_text=True, vertical='top')
wb = Workbook()

# Accueil
ac = wb.active; ac.title = 'Accueil'
ac['A1'] = 'DCSS Traducteur — base des traductions'; ac['A1'].font = Font(name=F, size=16, bold=True)
ac['A2'] = 'Version %s · %d textes' % (manifest.get('version', '?'), len(lignes)); ac['A2'].font = Font(name=F, size=11, color='666666')
guide = [
    ('Trouver un texte', 'Onglet « Traductions » : Ctrl+F pour chercher un mot (anglais ou français), ou les flèches des en-têtes pour filtrer par Thème, Type ou Fichier.'),
    ('Corriger', 'Écris ta version dans la colonne jaune « Ta correction » (laisse vide ce qui te va), une explication si besoin dans « Remarque », puis renvoie-moi le fichier : je réapplique tout d’un coup.'),
    ('À ne pas toucher', 'Les colonnes Anglais et ID (c’est la clé). Dans le français, garde tels quels {A}, {S1}, @…@, %s, Ⓚ (touche du jeu), \\n et les espaces de début/fin.'),
    ('Nom ↔ description', 'Sur un monstre, un sort, un objet… la colonne « Lien » mène d’un clic du nom à sa description, et inversement.'),
    ('Longueur', 'La colonne « Écart » = longueur du français − longueur de l’anglais. En rouge : un nom ou libellé plus long de plus de 2 caractères (risque de casser l’affichage).'),
    ('Règles', 'Onglet « Règles » : ce qui reste en anglais et les mots imposés. Onglet « Priorités » : ce qui reste à faire.'),
]
r = 4
for t, d in guide:
    ac.cell(r, 1, t).font = fb; c = ac.cell(r, 2, d); c.font = fn; c.alignment = wrap; ac.row_dimensions[r].height = 30; r += 1
r += 1
for j, h in enumerate(['Thème', 'Textes', 'Noms / libellés', 'Phrases', 'Descriptions', 'Phrases à trous', 'Autres'], 1):
    c = ac.cell(r, j, h); c.font = Font(name=F, bold=True, color='FFFFFF'); c.fill = BLEU
compte = collections.OrderedDict()
for l in lignes:
    d = compte.setdefault(l[0], collections.Counter()); d['tot'] += 1; d[l[1]] += 1
for t, d in compte.items():
    r += 1
    autres = d['tot'] - d['Nom / libellé'] - d['Phrase'] - d['Description'] - d['Phrase à trous']
    for j, v in enumerate([t, d['tot'], d['Nom / libellé'], d['Phrase'], d['Description'], d['Phrase à trous'], autres], 1):
        ac.cell(r, j, v).font = fn
for col, w in zip('ABCDEFG', (30, 110, 15, 10, 13, 15, 10)): ac.column_dimensions[col].width = w

# Traductions
ws = wb.create_sheet('Traductions')
ENT = ['ID', 'Thème', 'Type', 'Anglais', 'Français', 'Ta correction', 'Remarque', 'Lien', 'Écart', 'Fichier', 'Catégorie']
ws.append(ENT)
for i, (th, ty, en, fr, f, cat) in enumerate(lignes):
    row = i + 2
    vals = [i + 1, th, ty, en, fr, None, None, None, len(fr) - len(en), f.replace('donnees/', '') if f else '(généré)', cat]
    for j, v in enumerate(vals, 1):
        c = ws.cell(row, j)
        if v is not None:
            c.value = v
            if isinstance(v, str) and v[:1] in '=+-@': c.data_type = 's'
        c.font = fn
        if j in (4, 5): c.alignment = wrap
    ws.cell(row, 6).fill = JAUNE
    lk = liens.get(i)
    if lk:
        c = ws.cell(row, 8, lk[0]); c.hyperlink = "#'Traductions'!D%d" % (lk[1] + 2); c.font = lien
n = len(lignes) + 1
tab = Table(displayName='Traductions', ref='A1:K%d' % n)
tab.tableStyleInfo = TableStyleInfo(name='TableStyleLight9', showRowStripes=True)
ws.add_table(tab)
ws.conditional_formatting.add('I2:I%d' % n, FormulaRule(formula=['AND($C2="Nom / libellé",$I2>2)'], font=Font(color='C00000', bold=True), fill=PatternFill('solid', fgColor='F4CCCC')))
for col, w in zip('ABCDEFGHIJK', (7, 22, 17, 55, 55, 40, 22, 20, 7, 30, 18)): ws.column_dimensions[col].width = w
ws.freeze_panes = 'D2'

# Les onglets « Règles » (décisions, glossaire) et « Priorités » vivent seulement dans la feuille Google Sheets.

wb.active = wb.sheetnames.index('Traductions')
wb.save(SORTIE)
print(len(lignes), 'textes,', len(compte), 'thèmes,', len(liens), 'liens nom ↔ description')
