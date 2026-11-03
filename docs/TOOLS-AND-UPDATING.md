# Tools, new game versions, other languages

The [`outils/`](../outils/) folder is **not** loaded by the browser. You need Python 3, Node.js and the DCSS source (https://github.com/crawl/crawl, folder `crawl-ref/source`).

## Tools
1. `extraire_source.py` — lists everything the game can display.
   `python3 outils/extraire_source.py PATH/crawl-ref/source extraction_0.34.json`
   → *descriptions*: the ~3500 texts of `dat/descript`; *messages*: ~870 message templates with holes read from the C++ code.
2. `couverture.js` — coverage percentage.
   `node outils/couverture.js extraction_0.34.json` (table per file) / `--liste` (writes `non_traduits.txt`).
   Literary quotes are left in English on purpose; messages with a free hole `{X}` cannot be judged without seeing them in game.
3. `comparer_versions.py` — for the next game version:
   `python3 outils/extraire_source.py SRC_0.35/crawl-ref/source extraction_0.35.json`
   `python3 outils/comparer_versions.py extraction_0.34.json extraction_0.35.json a_traduire.txt`
   → NEW / CHANGED (before/after) / REMOVED texts: translate only the delta.
4. `exporter.js` — `node outils/exporter.js` regenerates `export/` (all translations as plain text).
5. `outils/arene/` — run real arena fights of the compiled game to harvest its messages and find what is still English.

## Moving to a new game version (e.g. 0.35 → 0.36)
1. Check out the new source tag.
2. Extract (`extraire_source.py`) and compare with the previous extraction.
3. Translate what is in `a_traduire.txt`: descriptions → a dictionary file in `donnees/` (e.g. `donnees/interface/complements.js`; a CHANGED text keeps its old translation until you update the key); messages with holes → `donnees/messages/phrases_a_trous/`; database phrases → `donnees/messages/gabarits/`.
4. `node outils/couverture.js extraction_0.36.json` — the percentage should go up.
5. Bump the version (see `VERSIONS.md`), run `node outils/exporter.js`.
Tip: `dat/descript/fr` in the DCSS repo is the community translation; usually one version behind but a good start.

## Making another language (Spanish, German…)
Reusable as is: the replacement engine (`moteur/content.js`, `assemblage.js`, `diagnostic.js`), the DOM observer, the "English text → translation" principle, the tools, `export/` (start from the `EN:`/`FR:` files).
To redo:
* (a) the dictionaries `"English": "translation"` in `donnees/**/*.js` — the vast majority of texts. Copy the folder, keep the English keys, replace the values. `couverture.js` tells you what is left.
* (b) the message grammar: `donnees/messages/{vocabulaire,regles,combat}.js`, `phrases_a_trous/*` and `moteur/gabarits.js` contain **French** grammar (gender, elided articles `l’`, `du/au`, participle agreement, "vous"). The English templates (`"{A} hits {A}"`) are the same for every language; the right-hand sides and the tokens `{S1} {o1} {d1}…` must be rewritten.
* (c) `OPTIONS.js` — spell names in English or translated (valid for any language).
Suggested order: (a) first (fast, big visible gain), then (b) message by message starting with what players see most (combat, items, gods).

## Audit command
See the README. Same command in `outils/AUDIT-COMMAND.txt`.
