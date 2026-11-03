# Correcting or adding translations

All files are plain text: any editor works (VS Code, Notepad++...). After a change: `about:debugging` → **Reload** on the add-on, then `F5` on the game page. If the add-on stops loading, the cause is almost always a forgotten comma, quote or brace — `F12` → Console shows the file and the line.

**Case 1 — a whole text is wrong or still English** (sentence, description, menu, spell…)
Add a line to [`MES-CORRECTIONS.js`](../MES-CORRECTIONS.js):
```js
"exact English text": "your translation",
```
Copy the English text from the audit (see the README). The trailing comma is mandatory. This entry beats everything. You may instead edit the line directly in `donnees/` (search the folder for part of the sentence) — but such edits are lost when you replace the folder with a new version, whereas `MES-CORRECTIONS.js` is easy to copy over.

**Case 2 — one word is wrong inside constructed sentences** (monster, weapon, armour, ego, potion colour, terrain, place, god…)
Edit the table in [`donnees/messages/vocabulaire.js`](../donnees/messages/vocabulaire.js): `monsters`, `ARMES`, `ARMURES`, `EGOS_ARME`, `EGOS_ARMURE`, `ADJ_ARME`, `DECORS`, `COULEURS`, `ADJ_POTION`, `POTIONS_EFFETS`, `PARCHEMINS`, `DIEUX`, `LIEUX_DE`, `competences`, `VERBES_MONSTRE`… Keep the shape `"english": "french"` (or `[masculine, feminine]` for adjectives, with the grammatical gender `m`/`f` where required). Every sentence using the word follows.

**Case 3 — the shape of a sentence is wrong** (word order, agreement, article)
It is a rule in `donnees/messages/regles.js` (search a word of the sentence). If unsure, put the exact sentence in `MES-CORRECTIONS.js` (case 1).

**Case 3b — a message containing a monster or an item is wrong** ("The jackal freezes the goblin…")
Search a word in `donnees/messages/phrases_a_trous/` (see the folder README to pick the file). Each line is
```js
"English phrase with {A} (actor) {X} (free text)": "French phrase with {S1} {x2}",
```
Hole syntax: [`docs/HOW-IT-WORKS.md`](HOW-IT-WORKS.md) or the header of `moteur/phrases_a_trous.js`. Add a line in the file of the right topic (if unsure: `audit_0_35.js`).

**Case 3c — a Xom / god / database phrase** → `donnees/messages/gabarits/` (two lines per phrase, English then French).

**Case 4 — a spell name you dislike** → `donnees/sorts/noms.js` (change the French after the colon, or put the English name).

**Case 5 — the manual** → `donnees/manuel/manuel_01..08.js` (search a few words). A `\n` in a translation forces a line break (lists, tables).

Do not duplicate a text that already exists: edit it in place.

## Notes
* An unknown item (e.g. `a +2 dagger of unknown`) deliberately stays English: that is how the audit detects it.
* Key letters in the command help page stay English (`w = wield`): they are the real keys.
* Official translations (`donnees/officiel.js`) were imported only where their numbers match the current English text (others are outdated). To disable: remove `donnees/officiel.js` from `manifest.json`.
* Literary quotes shown in item descriptions are intentionally not translated (official DCSS policy).
