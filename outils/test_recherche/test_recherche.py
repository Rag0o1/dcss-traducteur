# Test de la recherche en français (Ctrl+F et « ? / ») dans un vrai Chrome, avec l'extension chargée.
# La page page_modele.html reproduit le client WebTiles (textinput.js, ui.js) ; le faux serveur
# cherche dans la VRAIE base de descriptions de DCSS (dat/descript).
#
# Utilisation (depuis la racine du dépôt) :
#   python3 outils/test_recherche/test_recherche.py <dossier crawl-ref/source/dat/descript>
# Exemple de récupération des sources du jeu (lecture seule) :
#   git clone --depth 1 --filter=blob:none --sparse https://github.com/crawl/crawl crawl-src
#   git -C crawl-src sparse-checkout set crawl-ref/source/dat/descript
import sys, json, tempfile, pathlib, os
from playwright.sync_api import sync_playwright
ICI = pathlib.Path(__file__).resolve().parent
EXT = str(ICI.parent.parent)
DESCRIPT = pathlib.Path(sys.argv[1])
db = {}
for typ, f in [("monster", "monsters"), ("item", "items"), ("feature", "features"), ("skill", "skills"), ("god", "gods"), ("branch", "branches")]:
    entrees = []
    for bloc in (DESCRIPT / (f + ".txt")).read_text(encoding="utf-8").split("%%%%"):
        lignes = [l for l in bloc.strip("\n").split("\n") if not l.startswith("#")]
        while lignes and not lignes[0].strip(): lignes.pop(0)
        if lignes and not lignes[0].startswith("__"):
            entrees.append([lignes[0].strip(), " ".join(l.strip() for l in lignes[1:])])
    db[typ] = entrees
PAGE = (ICI / "page_modele.html").read_text(encoding="utf-8").replace("__DB__", json.dumps(db))
EXT_ = EXT
CTRLF = ["or", "parchemin", "potion de guérison", "potion de soin", "Téléport", "parchemin blink", "dague", "épée longue",
         "potion bleue", "autel", "escalier", "@potion", "arm", "dagger", "/fire", "=or", ""]
INFOS = [("monster","orc"), ("monster","gobelin"), ("monster","dragon"), ("monster","o"), ("item","dague"),
         ("item","potion de guérison"), ("item","parchemin"), ("item","épée longue"), ("item","or"), ("feature","autel"),
         ("skill","lames longues"), ("skill","esquive"), ("god","Trog"), ("item","=dagger"), ("item","dagger"), ("monster","or|gold"), ("item","")]
logs, errs = [], []
with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(tempfile.mkdtemp(), **({"executable_path": "/usr/bin/google-chrome"} if os.path.exists("/usr/bin/google-chrome") else {}), headless=True,
        args=["--headless=new", f"--disable-extensions-except={EXT}", f"--load-extension={EXT}"])
    ctx.route("**/*", lambda r: r.fulfill(status=200, content_type="text/html; charset=utf-8", body=PAGE))
    pg = ctx.new_page(); pg.on("console", lambda m: logs.append(m.text)); pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("https://crawl.xtahua.com/#play"); pg.wait_for_timeout(2000)
    print("Chargement :", [l for l in logs if "Recherche FR" in l or "Base de" in l])
    dern = lambda: pg.evaluate("window.envoyes.filter(e=>e.msg=='text_input').pop().text")
    print("\n===== Ctrl+F =====")
    for q in CTRLF:
        pg.evaluate("ouvrirCtrlF()"); pg.wait_for_timeout(150)
        pg.fill("#input_dialog input.text", q) if q else None
        pg.press("#input_dialog input.text", "Enter"); pg.wait_for_timeout(50)
        print(f"{q!r:24} -> {dern()[:-1]!r:42} | {pg.inner_text('#resultats')[:90]}")
    # Historique : flèche du haut après une recherche
    pg.evaluate("ouvrirCtrlF()"); pg.wait_for_timeout(150); pg.press("#input_dialog input.text", "ArrowUp")
    print("Historique (flèche haut) :", repr(pg.input_value("#input_dialog input.text"))); pg.press("#input_dialog input.text", "Escape")
    print("\n===== ? / (Describe what?) =====")
    for cat, q in INFOS:
        pg.evaluate(f"ouvrirInfos('{cat}')"); pg.wait_for_timeout(250)
        hdr = pg.inner_text("#ui-stack .header").replace("\n", " ")
        sel = "#ui-stack input[data-sync-id]"
        if q: pg.type(sel, q, delay=5)   # frappe touche par touche, comme un joueur
        pg.press(sel, "Enter"); pg.wait_for_timeout(80)
        syncs = [e["text"] for e in pg.evaluate("window.envoyes") if e["msg"] == "ui_state_sync"]
        print(f"[{cat:7}] {q!r:22} -> serveur a reçu {(repr(syncs[-1]) if syncs else ''):<30} | {pg.inner_text('#resultats')[:95]}")
    print("\nQuestion affichée :", hdr[:110])

    # Questions déjà traduites en français, et une autre saisie qui ne doit pas être traduite
    pg.evaluate("ouvrirInfos('monster')"); pg.wait_for_timeout(200)
    pg.evaluate("document.querySelector('#ui-stack .header').textContent='Décrire un monstre ; les noms partiels et les expressions régulières sont acceptés. Décrire quoi ?'")
    pg.type("#ui-stack input[data-sync-id]", "gobelin", delay=5); pg.press("#ui-stack input[data-sync-id]", "Enter"); pg.wait_for_timeout(80)
    print("Infos (question FR) :", pg.inner_text("#resultats"))
    pg.evaluate("ouvrirCtrlF()"); pg.wait_for_timeout(150)
    pg.evaluate("document.querySelector('#input_text span').textContent='Chercher quoi [? pour l’aide] ? '")
    pg.fill("#input_dialog input.text", "or"); pg.press("#input_dialog input.text", "Enter"); pg.wait_for_timeout(50)
    print("Ctrl+F (question FR) :", dern()[:-1])
    pg.evaluate("ouvrirInfos('monster')"); pg.wait_for_timeout(200)
    pg.evaluate("document.querySelector('#ui-stack .header').textContent='Name this item: '")
    pg.type("#ui-stack input[data-sync-id]", "or", delay=5); pg.press("#ui-stack input[data-sync-id]", "Enter"); pg.wait_for_timeout(80)
    s = [e["text"] for e in pg.evaluate("window.envoyes") if e["msg"] == "ui_state_sync"]
    print("Autre saisie (« Name this item ») non traduite :", repr(s[-1]))
    print("Erreurs JS :", errs or "aucune")
    ctx.close()
