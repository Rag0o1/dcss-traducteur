#!/usr/bin/env python3
"""Génère le tableau Excel de toutes les traductions (un onglet par fichier) pour les relire et les corriger.

Usage (depuis la racine du projet) :
    node outils/exporter.js                      # met à jour export/tout.json
    python3 outils/tableau_traductions.py        # écrit ../DCSS-Traducteur-traductions.xlsx
    python3 outils/tableau_traductions.py chemin/sortie.xlsx

Chaque onglet = un fichier de donnees/ ; la colonne jaune « Ta correction » sert à écrire les corrections.
Nécessite : pip install openpyxl
"""
import json,re,os,collections,sys
SORTIE = sys.argv[1] if len(sys.argv) > 1 else '../DCSS-Traducteur-traductions.xlsx'
from openpyxl import Workbook
from openpyxl.styles import Font,PatternFill,Alignment,Border,Side
from openpyxl.utils import get_column_letter
t=json.load(open('export/tout.json'))
m=json.load(open('manifest.json'))
files=[]
def walk(o):
    if isinstance(o,str) and o.endswith('.js'): files.append(o)
    elif isinstance(o,list): [walk(x) for x in o]
    elif isinstance(o,dict): [walk(v) for v in o.values()]
walk(m); files=list(dict.fromkeys(f for f in files if os.path.exists(f)))
S=r'"((?:[^"\\\n]|\\.)*)"'
pair=re.compile(r'(?:^|[\s,{(\[])'+S+r'\s*:\s*'+S+r'\s*(?=[,}\n])')
pair2=re.compile(r'\bT\['+S+r'\]\s*=\s*'+S)
where=collections.defaultdict(list)
def unesc(x):
    try: return json.loads('"'+x+'"')
    except Exception: return x
for f in files:
    s=open(f,encoding='utf-8').read()
    for rx in (pair,pair2):
        for k in rx.finditer(s):
            where[unesc(k.group(1))].append(f)
NOM={'messages_a_trous':'Messages à trous','complements':'Compléments','messages_fixes':'Messages fixes','officiel':'Officiel (traduction communautaire)',
'mutations_msg':'Messages de mutations','monstres':'Noms de monstres','sorts':'Noms de sorts','sorts_desc':'Descriptions de sorts','monstres_desc':'Descriptions de monstres',
'divers':'Divers','mutations':'Mutations','astuces_morceaux':'Astuces (morceaux)','lex_libelles':'Libellés (interface)','messages_jeu':'Messages du jeu','lex_objets':'Objets',
'lex_phrases':'Phrases','mutations_desc':'Descriptions de mutations','divers_desc':'Descriptions diverses','lex_textes_longs':'Textes longs','lex_dieux':'Dieux','projectiles':'Projectiles',
'statuts_desc':'Descriptions d’états','capacites_desc':'Descriptions de capacités','decors_desc':'Descriptions de décors','messages':'Messages','lex_egos':'Egos d’objets','lex_armes':'Armes',
'astuces':'Astuces','races':'Espèces','metiers':'Backgrounds','aide':'Aide','lex_menus':'Menus','passives_desc':'Passifs de dieux','sorts_noms_anglais':'Noms de sorts (anglais)'}
def nom(c):
    if c.startswith('citations_'): return 'Citations '+c.split('_')[1]
    return NOM.get(c,c)
ILL=re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f]')
rows=[]
for cat,tab in t.items():
    for en,fr in tab.items():
        if not isinstance(fr,str): continue
        f=where.get(en,[''])[0]
        rows.append((nom(cat),ILL.sub('',en),ILL.sub('',fr),f))
rows.sort(key=lambda r:(r[0],r[1].lower()))
wb=Workbook()
F='Arial'
hf=PatternFill('solid',fgColor='1F3864'); yf=PatternFill('solid',fgColor='FFF2CC')
fa=Font(name=F,size=10); wrap=Alignment(wrap_text=True,vertical='top')
par=collections.OrderedDict()
for cat,en,fr,f in rows:
    par.setdefault(f or '(généré par le code)',[]).append((cat,en,fr))
def court(f):
    if f.startswith('('): return 'Généré par le code'
    x=f.replace('donnees/','').replace('.js','').replace('phrases_a_trous/','trous-').replace('messages/','msg-').replace('interface/','int-').replace('personnage/','pers-').replace('monstres/','mon-').replace('objets/','obj-').replace('sorts/','sorts-').replace('manuel/','man-').replace('citations/','cit-').replace('gabarits/','gab-').replace('/','-')
    return x
noms={};used=set()
for f in par:
    n=re.sub(r'[\\/*?:\[\]]','-',court(f))[:31]
    base=n;k=2
    while n.lower() in used: n=base[:28]+'-'+str(k);k+=1
    used.add(n.lower()); noms[f]=n
ws=wb.active; ws.title='Index'
ws['A1']='Tableau des traductions de DCSS Traducteur : un onglet par fichier'; ws['A1'].font=Font(name=F,bold=True,size=14)
guide=['Comment corriger : ouvre l’onglet du fichier voulu (clique sur son nom ci-dessous), écris ta version dans la colonne jaune « Ta correction », puis renvoie-moi le fichier.',
'Laisse vide ce qui te va. Garde tel quel ce qui est entre accolades : {A}, {S1}, {X}… (trous remplis par le jeu). Ne modifie ni le numéro ni le texte anglais (c’est la clé).',
'Colonne « Remarque » : pour m’expliquer un choix. Chaque onglet a en haut le chemin du fichier dans le projet.']
for i,t in enumerate(guide,start=3):
    c=ws.cell(i,1,t); c.font=Font(name=F,size=11); c.alignment=Alignment(wrap_text=True,vertical='top'); ws.merge_cells(start_row=i,start_column=1,end_row=i,end_column=4); ws.row_dimensions[i].height=34
for j,h in enumerate(['Onglet (cliquer)','Fichier du projet','Lignes','Contenu (catégories)'],1):
    c=ws.cell(7,j,h); c.font=Font(name=F,bold=True,color='FFFFFF'); c.fill=hf
for i,(f,lst) in enumerate(sorted(par.items(),key=lambda x:x[0]),start=8):
    n=noms[f]
    c=ws.cell(i,1,n); c.hyperlink="#'%s'!A1"%n; c.font=Font(name=F,size=10,color='0563C1',underline='single')
    ws.cell(i,2,f).font=fa; ws.cell(i,3,len(lst)).font=fa
    cats=sorted(set(x[0] for x in lst)); ws.cell(i,4,', '.join(cats)[:200]).font=fa
for col,w in zip('ABCD',[30,62,9,70]): ws.column_dimensions[col].width=w
ws.freeze_panes='A8'
ws.auto_filter.ref='A7:D%d'%(7+len(par))
for f,lst in sorted(par.items(),key=lambda x:x[0]):
    w=wb.create_sheet(noms[f])
    w['A1']='Fichier : '+f; w['A1'].font=Font(name=F,bold=True,size=11)
    c=w['F1']; c.value='← Index'; c.hyperlink="#'Index'!A1"; c.font=Font(name=F,size=10,color='0563C1',underline='single')
    for j,h in enumerate(['N°','Anglais (clé)','Français actuel','Ta correction','Remarque','Catégorie'],1):
        c=w.cell(2,j,h); c.font=Font(name=F,bold=True,color='FFFFFF'); c.fill=hf
    for i,(cat,en,fr) in enumerate(lst,start=3):
        for j,v in enumerate([i-2,en,fr,None,None,cat],1):
            c=w.cell(i,j)
            if v is not None:
                c.value=v
                if isinstance(v,str) and v[:1] in '=+-@': c.data_type='s'
            c.font=fa; c.alignment=wrap
        w.cell(i,4).fill=yf
    for col,wd in zip('ABCDEF',[7,60,60,60,26,22]): w.column_dimensions[col].width=wd
    w.freeze_panes='A3'; w.auto_filter.ref='A2:F%d'%(len(lst)+2)
wb.save(SORTIE)
print(len(rows),len(par))
