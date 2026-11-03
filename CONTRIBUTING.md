# Contributing — everyone is welcome

You do not need to code. Most of the work is plain text: `"English text": "French text"`.

## Easiest ways to help
1. **Play and report what is still English.** In the game: `F12` → Console, paste
   `copy(JSON.parse(document.documentElement.dataset.dcssTextesNonTraduits || "[]").join("\n"))`, then paste the result in a new [issue](../../issues) (or send the `.txt`). That list is how most of the project grew.
2. **Fix a wrong or awkward translation.** Put the exact English text and your better French in an issue, or edit the line directly (see [`docs/EDITING-TRANSLATIONS.md`](docs/EDITING-TRANSLATIONS.md)) and open a pull request.
3. **Translate a missing block.** Good first tasks: the game database phrases in `donnees/messages/gabarits/` (monster taunts, insults, graffiti — two lines per phrase), and anything listed in `outils/non_traduits.txt`.
4. **Another language or game version?** The engine is reusable: see [`docs/TOOLS-AND-UPDATING.md`](docs/TOOLS-AND-UPDATING.md). Fork it and tell us — we are happy to link or share data.
5. **Test in other browsers / servers** and tell us what works (see [`docs/INSTALL.md`](docs/INSTALL.md)).

## Pull requests
* Keep a change small and focused; one topic per pull request.
* Do not reorder files in `manifest.json` (for duplicate texts the last file wins).
* Quick check before sending: the file must still load (`node --check yourfile.js`) and the extension must show `Base de traduction chargée` with no red error in the console.
* Version bump and release rules: [`VERSIONS.md`](VERSIONS.md) (the maintainer usually does this).

Questions or ideas? Open an issue — no question is too small.
