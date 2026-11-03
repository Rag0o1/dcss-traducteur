# Database templates (Xom, gods, …)

Phrases from the game's `dat/database/*.txt`. File format: an English line, the French line right below, then a blank line.

* `@name@` — a piece chosen by the game (colour, body part, dungeon feature, item…). Translated by `moteur/gabarits.js` (table `FONCTION`).
* `[a|b]` — variants. The French line must have the same number of variants in the same order.
* `@~name@` — the piece with "votre/vos" in front (body parts).

Add a phrase = add two lines. Add a new variable piece (a new colour…) = add it to `moteur/gabarits.js`.

* `@M_S@` `@M_o@` `@M_d@` `@M_a@` `@M_e@` — the monster found in the English line (`@The_monster@`…): "Le chacal", "le chacal", "du chacal", "au chacal", "e" if feminine.
* A line without final `.`/`!` in English also matches with one (the game adds it).

Files: `magie_rates.js` — spell miscast flavour (miscast.txt); `cris.js` — monster shouts (shout.txt); `dieux_xom.js` — Xom (random events, laughter, gifts…) and the gods' phrases (`godspeak.txt`).
