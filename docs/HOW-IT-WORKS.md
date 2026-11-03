# How it works

## The big picture

The extension is a **content script** injected into the WebTiles page. It never touches the game code. It watches the page text (message log, menus, dialogs), looks every English text up in a local dictionary, and replaces it with the French translation.

```
 page text ──► content.js ──► traduireChaine() ──► French text written back
                                   │
                                   ├─ 1. exact match in the merged dictionary
                                   ├─ 2. same, trimmed / whitespace-normalised
                                   ├─ 3. "~" fragments (partial replacements inside a longer text)
                                   └─ 4. translation RULES (regex → function), first one that changes the text wins
```

* All content scripts share one global scope and are loaded in the order of [`manifest.json`](../manifest.json); **a later file wins over an earlier one**. `MES-CORRECTIONS.js` is last on purpose.
* `moteur/assemblage.js` merges every dictionary category (`DCSS_TRADUCTIONS.*`) into a single table. With `nomsDeSorts: "anglais"` the category `sorts` (French spell names) is excluded and `sorts_noms_anglais` (texts rewritten to keep English spell names) is included.
* Every translated text is memoised; only changed DOM nodes are reprocessed (incremental observer, full sweep only after a burst of >400 changes or 1.5 s of calm).
* A text that is unknown stays English and is recorded for the audit (`dataset.dcssTextesNonTraduits`).

## Three kinds of translations

### 1. Dictionaries — `donnees/**/*.js`
Plain `"English text": "French text"` entries: item/monster/spell/god descriptions, mutations, statuses, the manual, UI labels, fixed game messages. Keys starting with `~` are **fragments**: replaced inside a longer text (used for tips that contain variable key names).

### 2. Phrases with holes — `moteur/phrases_a_trous.js` + `donnees/messages/phrases_a_trous/*.js`
Game messages that contain variable words ("The goblin hits the jackal with a dagger!"). A line looks like:

```js
"{A} hits {A} with {X}.": "{S1} frappe {o2} avec {x3}.",
```

| Hole | Matches |
|---|---|
| `{A}` | an actor: a monster, a unique, a ghost, a dancing weapon, or `you` |
| `{I}` | a possessive (`the jackal's`, `your`, `its`) |
| `{Y}` | one of your items |  
| `{X}` | free text (translated recursively; if part stays English the whole phrase is rejected) |
| `{K}` | a key name (`o`, `Ctrl-P`), copied as is |
| `{Z}` | a known projectile / spell effect from `projectiles.js` |
| `{p}` `{s}` `{is}` `{v:verb}` | pronoun, optional "s", is/are, verb agreement |

French side: `{S1}` subject ("Le chacal"), `{o1}` object ("le chacal"), `{d1}` "du chacal", `{a1}` "au chacal", `{e1}` feminine "e", `{x3}` translated free text, `{n1}`/`{c1}` verb endings for plurals. ` ¦ ` separates the *monster* version from the *you* version of a sentence. The French grammar (gender, elision, articles) is computed by `donnees/messages/combat.js` (`DCSS_COMBAT.acteurTexte`) and `vocabulaire.js` (word tables).

Which file for which sentence: [`donnees/messages/phrases_a_trous/README.md`](../donnees/messages/phrases_a_trous/README.md).

### 3. Templates from the game database — `moteur/gabarits.js` + `donnees/messages/gabarits/*.js` (since 0.13)
The game builds some phrases from `dat/database/*.txt` (Xom, gods' speech, taunts...) with random pieces: `@The_feature@`, `@any_colour@`, `[Smoke|Steam]`. A template file has pairs of lines, English then French, separated by a blank line:

```
@The_feature@ briefly glows @any_glowing_colour@.
@The_feature@ luit brièvement de @any_glowing_colour@.
```

The engine compiles each English line into a regular expression, then rebuilds the French line replacing every `@macro@` with its translation (colours, body parts, dungeon features, your items, Xom's trout...). `[a|b]` alternatives must appear in the same order in both languages; `@~macro@` adds "votre/vos" in front. To support a new piece, add it to the `FONCTION` table in `moteur/gabarits.js`.

## Other engines

* `donnees/messages/regles.js` — older rules (regular expressions) that build sentences: gods' clauses, item details, accuracy/damage lines...
* `donnees/messages/combat.js` — combat message templates, verbs, effects, and **generated monster names** (hydras with N heads, coloured draconians, `ghostly X`, `spectral X`, dancing weapons, slime sizes...).
* `moteur/manuel_moteur.js` — the in-game manual is one huge text block: it is split into paragraphs, looked up in `donnees/manuel/manuel_01..08.js`, and re-wrapped at 72 columns.
* `moteur/diagnostic.js` — the audit: records texts that stayed English.
* Spell-menu lines are protected from generic rules so the column layout is kept; column width is preserved after translation.

## Load order (manifest.json)

`OPTIONS.js` → dictionaries (`donnees/…`) → phrase tables (`phrases_a_trous/*`, `gabarits/*`) → engines (`moteur/phrases_a_trous.js`, `moteur/gabarits.js`, `moteur/assemblage.js`, `moteur/manuel_moteur.js`) → `MES-CORRECTIONS.js` → `moteur/content.js` → `moteur/diagnostic.js`. Never reorder without running the tests (see below): for duplicate keys the last one wins.

## File map

```
manifest.json              what is loaded, in which order (version number lives here)
OPTIONS.js                 settings (spell names language)
MES-CORRECTIONS.js         your own corrections — start here
moteur/                    the program: content.js, assemblage.js, phrases_a_trous.js, gabarits.js, manuel_moteur.js, diagnostic.js
donnees/officiel.js        official French texts from the DCSS repo (generated, do not edit)
donnees/sorts/             spell names, descriptions, texts that cite spell names (English-names mode)
donnees/objets/            items, weapons/armour, egos, unidentified appearances
donnees/personnage/        species, backgrounds, gods, mutations
donnees/interface/         help screen, labels, tips, misc descriptions, menus, terrain names
donnees/messages/          vocabulary tables, rules, combat, fixed messages, long texts,
    phrases_a_trous/       messages with holes, one file per topic
    gabarits/              database templates (Xom, gods)
    monstres/              long monster / ability / terrain / status descriptions
donnees/manuel/            the translated manual
export/                    all translations as EN:/FR: plain text
outils/                    developer tools (not loaded by the browser)
docs/                      this documentation
```

## Quality guarantees used while developing

* **No regression**: a corpus of ~25 800 texts is translated by the previous and the new version and compared; every difference must be intended.
* A regression suite of 73 reference sentences (`cas.json`) must pass.
* Messages come from the real game: DCSS 0.34 was compiled and run in arena/wizard mode to harvest ~18 000 real messages, and `mpr/mprf` literals were extracted from the C++ source to measure coverage.
