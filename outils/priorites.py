# Ajoute la page « Priorités » (en premier) au tableau Excel. Usage : python3 outils/priorites.py fichier.xlsx
import json, sys, os
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
f = sys.argv[1]
d = json.load(open(os.path.join(os.path.dirname(__file__), "priorites.json"), encoding="utf8"))
wb = load_workbook(f)
if "Priorités" in wb.sheetnames: del wb["Priorités"]
ws = wb.create_sheet("Priorités", 1 if "Accueil" in wb.sheetnames else 0)
gras = Font(bold=True); couleurs = {1: "F4CCCC", 2: "FCE5CD", 3: "FFF2CC", 4: "D9EAD3"}
ws.append(["Priorité", "Sujet", "Source", "Volume", "Ce que c’est", "Décision / état"])
for c in ws[1]: c.font = gras
for t in sorted(d["taches"], key=lambda t: t["priorite"]):
    ws.append([t["priorite"], t["sujet"], t["source"], t["volume"], t["quoi"], t["decision"]])
    for c in ws[ws.max_row]: c.fill = PatternFill("solid", fgColor=couleurs[t["priorite"]])
ws.append([]); ws.append(["", "Phrases d’aide restées en partie en anglais (priorité 1)"]); ws[ws.max_row][1].font = gras
ws.append(["", "Texte", "Traduction actuelle (mélangée)"]);
for c in ws[ws.max_row]: c.font = gras
for h in d["astuces"]:
    k, _, v = h.partition(": ")
    ws.append(["", k, v])
for col, w in zip("ABCDEF", (9, 42, 40, 14, 60, 34)): ws.column_dimensions[col].width = w
for row in ws.iter_rows():
    for c in row: c.alignment = Alignment(wrap_text=True, vertical="top")
ws.freeze_panes = "A2"
wb.active = wb.sheetnames.index("Traductions") if "Traductions" in wb.sheetnames else 0
wb.save(f)
print("page Priorités :", len(d["taches"]), "tâches,", len(d["astuces"]), "phrases")
