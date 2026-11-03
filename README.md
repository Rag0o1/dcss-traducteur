# DCSS Translator (French)

A Firefox extension (Manifest V3) that translates the **Dungeon Crawl Stone Soup** WebTiles interface into **French** — for example crawl.xtahua.com (0.35) or crawl.develz.org. It works with a local dictionary only: no API key, no network request, no data leaves your browser. It does not modify the game; it only replaces the text shown on the page.

The project is built to be a **translation base for DCSS 0.34 / 0.35** and to be reusable for other languages and other game versions (see [`docs/TOOLS-AND-UPDATING.md`](docs/TOOLS-AND-UPDATING.md)).

> 🇫🇷 La documentation en français est sur la branche [`fr`](https://github.com/Rag0o1/dcss-traducteur/tree/fr) (`LISEZ-MOI.txt`, `VERSIONS.md`...).

Current version: **0.13**

## Install (Firefox)

1. Download this repository (or a release zip) and unzip it.
2. In Firefox open `about:debugging` → **This Firefox** → **Load Temporary Add-on…** → choose `manifest.json`. (If it is already loaded, click **Reload**.)
3. Open (or reload with `F5`) the WebTiles game page.
4. Press `F12` → Console. You should see `Base de traduction chargée` with no red error.

The add-on is temporary: Firefox removes it when it closes, so repeat step 2 next time (or sign/package it yourself).

## Settings

[`OPTIONS.js`](OPTIONS.js):

| Option | Values | Meaning |
|---|---|---|
| `nomsDeSorts` | `"anglais"` (default) / `"francais"` | Spell names (and magic school names) stay in English like in the official game, or are translated. Spell **descriptions** are always French. |

After changing it: `about:debugging` → Reload, then `F5` on the game page.

## Fixing a translation yourself

Put your own corrections in [`MES-CORRECTIONS.js`](MES-CORRECTIONS.js) (loaded last, so it always wins):

```js
"exact English text": "your translation",
```

More cases (single words, sentence shape, spell names): [`docs/EDITING-TRANSLATIONS.md`](docs/EDITING-TRANSLATIONS.md).

## See what is still in English (audit)

In the game page: `F12` → Console, then paste:

```js
copy(JSON.parse(document.documentElement.dataset.dcssTextesNonTraduits || "[]").join("\n"))
```

The list of untranslated texts (one per line) is now in your clipboard — paste it into a `.txt` file. Other lists: `dataset.dcssMonstresManquants` (unknown monsters), `dataset.dcssAide` (raw help screen text). Also in [`outils/AUDIT-COMMAND.txt`](outils/AUDIT-COMMAND.txt).

## Documentation

| File | Content |
|---|---|
| [`docs/HOW-IT-WORKS.md`](docs/HOW-IT-WORKS.md) | Architecture: how a text is found and translated, the three engines, load order, file map. |
| [`docs/EDITING-TRANSLATIONS.md`](docs/EDITING-TRANSLATIONS.md) | How to correct or add translations (5 cases). |
| [`docs/TOOLS-AND-UPDATING.md`](docs/TOOLS-AND-UPDATING.md) | Coverage tools, updating to a new game version, making another language. |
| [`VERSIONS.md`](VERSIONS.md) | Version numbering rules and change history. |
| [`export/`](export/) | All translations as plain `EN:` / `FR:` text files (reusable for other languages). |
| [`outils/`](outils/) | Developer tools (not loaded by the browser). |

## Status

* ~86 % of the game's fixed messages (no variable part) and ~85 % of the lines in the author's in-game audits are translated; remaining English is mostly proper names (gods, unique monsters), stat abbreviations, debug text and the long tail of rare messages.
* `dat/database` phrases (Xom's random dungeon events, gods' speech) are translated since 0.13; monster taunts, insults, shouts, miscast flavour and graffiti are being added.

## Credits and licence

* Official French descriptions come from the DCSS repository (`crawl-ref/source/dat/descript/fr`, GPL v2+), imported into `donnees/officiel.js`.
* Original base of the extension by **rago**; extended with Claude (Anthropic).
* Same licence as DCSS for imported official texts (GPL v2+).

Note: comments inside the source code and the translation data are in French (they document the French grammar rules); all project documentation on this branch is in English.
