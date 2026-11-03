# Database templates (Xom, gods, …)

Phrases from the game's `dat/database/*.txt`. File format: an English line, the French line right below, then a blank line.

* `@name@` — a piece chosen by the game (colour, body part, dungeon feature, item…). Translated by `moteur/gabarits.js` (table `FONCTION`).
* `[a|b]` — variants. The French line must have the same number of variants in the same order.
* `@~name@` — the piece with "votre/vos" in front (body parts).

Add a phrase = add two lines. Add a new variable piece (a new colour…) = add it to `moteur/gabarits.js`.

Files: `dieux_xom.js` — Xom (random events, laughter, gifts…) and the gods' phrases (`godspeak.txt`).
