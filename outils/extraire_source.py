#!/usr/bin/env python3
"""Extrait de la source de DCSS tous les textes à traduire.

Usage :  python3 extraire_source.py CHEMIN/crawl-ref/source  sortie.json

Résultat (JSON) :
  descriptions : { "fichier": [ ["clé", "texte anglais"], ... ] }   (dat/descript/*.txt : monstres, objets, dieux...)
  messages     : { "gabarit anglais avec {A} {X}...": ["fichier.cc:ligne", ...] }  (messages du jeu avec trous)
Le même script sert pour une autre version du jeu : on compare ensuite deux sorties avec comparer_versions.py.
"""
import json, os, re, sys, collections

racine = sys.argv[1]
sortie = sys.argv[2]

# ---------- 1. descriptions ----------
desc = {}
dossier = os.path.join(racine, "dat", "descript")
for nom in sorted(os.listdir(dossier)):
    if not nom.endswith(".txt"):
        continue
    liste = []
    for bloc in re.split(r"\n%%%%\n", open(os.path.join(dossier, nom), encoding="utf-8", errors="ignore").read()):
        lignes = [l for l in bloc.split("\n") if not l.lstrip().startswith("#") and l != "%%%%"]
        while lignes and not lignes[0].strip():
            lignes.pop(0)
        if len(lignes) < 2:
            continue
        cle = lignes[0].strip()
        texte = re.sub(r"\s+", " ", " ".join(lignes[1:])).strip()
        if len(texte) > 40:
            liste.append([cle, texte])
    desc[nom[:-4]] = liste

# ---------- 2. messages (mprf & co) ----------
appels = []
for dp, dn, fn in os.walk(racine):
    if any(x in dp for x in ("/contrib", "/test", "/rltiles")):
        continue
    for f in fn:
        if not f.endswith((".cc", ".h")):
            continue
        s = open(os.path.join(dp, f), errors="ignore").read()
        for m in re.finditer(r"\b(mprf|simple_monster_message|mpr_nojoin)\s*\(", s):
            i = m.end(); depth = 1; j = i; instr = False
            while j < len(s) and depth:
                c = s[j]
                if instr:
                    if c == "\\": j += 1
                    elif c == '"': instr = False
                else:
                    if c == '"': instr = True
                    elif c == "(": depth += 1
                    elif c == ")": depth -= 1
                j += 1
            appels.append((f, s.count("\n", 0, m.start()) + 1, re.sub(r"\s+", " ", s[i:j - 1])))

IGNORER = ("wiz-", "debug", "dgn", "l-", "tilereg", "options", "initfile", "stash", "mapdef", "maps.", "dump",
           "dungeon.cc", "tags.cc", "files.cc", "libutil", "version")

def decouper(b):
    parts = []; depth = 0; cur = ""; q = False; i = 0
    while i < len(b):
        c = b[i]
        if q:
            cur += c
            if c == "\\": cur += b[i + 1]; i += 1
            elif c == '"': q = False
        else:
            if c == '"': q = True; cur += c
            elif c in "([{": depth += 1; cur += c
            elif c in ")]}": depth -= 1; cur += c
            elif c == "," and depth == 0: parts.append(cur.strip()); cur = ""
            else: cur += c
        i += 1
    parts.append(cur.strip())
    return parts

def type_trou(a):
    a = a.strip()
    m = re.search(r'conj_verb\("([^"]+)"\)', a) or re.search(r'conjugate_verb\("([^"]+)"', a)
    if m: return "{v:%s}" % m.group(1)
    if re.search(r'\?\s*"s"\s*:\s*""', a): return "{s}"
    if re.search(r'is_are|is_verb|\bis\(\)|"is"\s*:\s*"are"|"are"\s*:\s*"is"', a): return "{is}"
    if re.search(r"DESC_ITS", a): return "{I}"
    if re.search(r"DESC_YOUR", a): return "{Y}"
    if re.search(r"name\(DESC_(THE|A|PLAIN|NONE|CAP_THE|CAP_A)", a) and not re.search(r"(item|armour|weapon|book|staff|ring|amulet|wand|orb|gem|talisman|body)", a, re.I): return "{A}"
    if re.search(r"pronoun\(", a): return "{p}"
    return "{X}"

msgs = collections.OrderedDict()
for f, l, b in appels:
    if "%s" not in b and "%d" not in b: continue
    if any(f.startswith(x) or x in f for x in IGNORER): continue
    if re.search(r"MSGCH_(ERROR|DIAGNOSTICS)", b): continue
    parts = decouper(b)
    k = next((n for n, p in enumerate(parts) if p.startswith('"')), None)
    if k is None: continue
    fmt = ""; n = k
    while n < len(parts) and parts[n].startswith('"'):
        fmt += "".join(re.findall(r'"((?:[^"\\]|\\.)*)"', parts[n])); n += 1
    args = parts[n:]
    idx = [0]
    def rep(m):
        s = m.group(0)
        if s == "%%": return "%"
        t = type_trou(args[idx[0]]) if idx[0] < len(args) else "{?}"
        idx[0] += 1
        return t
    gabarit = re.sub(r"%%|%[-+ #0-9.]*[sdlufx]+", rep, fmt)
    msgs.setdefault(gabarit, []).append("%s:%d" % (f, l))

json.dump({"descriptions": desc, "messages": msgs}, open(sortie, "w"), ensure_ascii=False)
print("descriptions :", sum(len(v) for v in desc.values()), "| messages à trous :", len(msgs))
