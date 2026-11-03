# Version numbering

| Kind of change | What changes | Example |
|---|---|---|
| **Minor change** (translation fixes, a few texts added, typo fixes, export refresh) | add **one digit after the last dot** | `0.12.1` → `0.12.2` → `0.12.3` |
| **Change in how it works** (engine change: new hole type, new translation rule, new code file, new option) | **go to the next version** | `0.12.6` → `0.13` |

The number is kept identical in: `manifest.json` (`"version"`), `README.md` ("Current version"), this file, and the zip name (`DCSS-Traducteur-vX.Y.zip`).

**GitHub Releases** (zip attached) are created automatically by `.github/workflows/release.yml` for every **major** version (`0.13`, `0.14`…) and every **10th minor** (`0.13.10`, `0.13.20`…). The notes of the minors in between are included in the next release. It can also be started by hand from the *Actions* tab.

Each version is described below, newest first. (The French branch `fr` has the original, more detailed French history.)

## 0.14 — engine extension: monsters in templates
* `moteur/gabarits.js` now understands **monsters** (`@The_monster@`, `@the_monster_possessive@`…, French tokens `@M_S@ @M_o@ @M_d@ @M_a@ @M_e@`), phrases **without final punctuation** (the game adds `.` or `!`), and typed variable pieces (hands, possessives).
* New template files: `magie_rates.js` (all spell miscast flavour text for the player, monsters and unseen casters: conjuration, hexes, summoning, necromancy, translocation, fire, ice, air, earth, alchemy, forgecraft) and `cris.js` (monster shouts and noises: barks, roars, skitters, gazes…).
* Added `CONTRIBUTING.md`, install guide for every browser (`docs/INSTALL.md`), automatic GitHub Releases.

## 0.13 — new engine
* **New engine `moteur/gabarits.js`**: translates the phrases of the game's text database (`dat/database`), which are written with variable pieces (`@colour@`, `@The_feature@`, `[variant a|variant b]`). It translates colours, body parts, dungeon features, your items, Xom's trout, etc.
* **First template file `donnees/messages/gabarits/dieux_xom.js`**: all of Xom's phrases (random dungeon events, laughter, gifts, banishment, resurrection…) and the gods' phrases (welcome, penance, death, Zot). `godspeak.txt` goes from 3 % to ~80 % translated.
* The other database files (insults, shouts, miscast flavour, graffiti, weapon noises, monster speech) will follow with the same engine.

## 0.12.6 — minor
Audit of 03/11: acquirement (`Acquire … ?`), items with braces (`the ring of the Giraffataur {…}`), damage rating, skills being studied, spell refund chance, search results, runes, mutation list, `Turns / Time` summary, key hints.

## 0.12.5 — minor
Skill menu (`a - Fighting 3.5`) and travel exclusions (`exclusions: hydra and staircase`).

## 0.12.4 — minor
Audit of 0.12.1: ~75 texts (zombie hands, `sock/thump`, projectiles `bolt / puff of frost / splash of acid`, monster examine lines `He can fly.`, `Speed: …`, `Will: ++`, menu key hints, Orcish Mines messages…). Fixed: `The flash freeze hits you.` (projectile + "you") was not translated. The "copy untranslated texts" console command is now documented.

## 0.12.3 — minor
Official-data check: in English-spell-names mode the Banishment (Lugonu) text keeps "Banishment". Other texts citing spells were already covered.

## 0.12.2 — minor
Spell scrolls: `A parchment of Blink.` fully translated in French-spell-names mode, and the sentences containing them.

## 0.12.1 — minor
~25 game messages with holes found in the C++ source (toxic fumes, Elyvilon's light, soul, wounds, devour, leap…).

## 0.12 — reorganisation
`variables_a.js … variables_k.js` renamed **by topic** and moved to `donnees/messages/phrases_a_trous/` (with a README). The hole engine `variables.js` became `moteur/phrases_a_trous.js`. Content and load order unchanged: 0 differences over 25 805 texts, 73/73 tests. Previous version backed up as git tag `v0.11.2`.

## 0.11.2 — minor
276 holeless game messages harvested from the Crawl source (`messages_jeu.js`): gods, states, noises, traps, abilities. Holeless messages translated: 68 % → 86 %.

## 0.11.1 — follow-up of 0.10 with engine changes
New hole `{K}` (key name); generated monster names extended (dancing weapons, slime sizes, `ghostly`); rules for `!!`/`!!!`; new files for the in-game 0.35 audit and the tutorial (64 texts); more projectiles; the `export/` folder.

## 0.10 — lessons from the real game (arena + wizard mode)
* DCSS 0.34 compiled and run in arena mode: ~18 000 distinct sentences used as tests.
* ~400 new monster sentences, ~170 projectile/effect names (`{Z}` hole): `The bolt of fire hits you` → `Le rayon de feu vous touche`.
* Combat recognises generated names (coloured draconians, N-headed hydras, mutant beasts, `spectral X`, `bound X`, zombies/skeletons).
* All gods "played" in wizard mode: welcome/desertion/placation, gained and lost powers, gifts, stat messages, Nemelex cards.
* **Spell names in English** option (`OPTIONS.js`, default) with rewritten texts that cite spells; French mode identical to 0.9 (checked on 23 013 texts).
* ~290 missing texts (abilities, terrain, mutations, tips) + ~285 terrain/altar/door/trap names; +300 descriptions from 0.34 (12 species, 2 schools, 50 spells, 201 statuses, 102 unique artefacts).
* New `outils/` folder: extraction of game texts, coverage measure (87 % of descriptions), version comparison, guides.

## 0.9 — lighter engine and messages with variables
* Incremental translation (only changed nodes are reprocessed); catastrophic regex backtracking removed (~2× faster); the audit no longer re-examines a text.
* New hole-phrase engine: ~850 messages translated by family (monster states, traps, theft, items, equipment, potions, Zot, monster spells, melee, gods, runes, gems). A phrase with a hole left in English is kept fully English rather than mixed.
* 746 mutation short names/messages, 239 long mutation descriptions, 75+331 tips, 936 fixed game messages, unidentified wands/rings/amulets/staves.
* 580 ordinary monsters, ~250 combat phrases, inventory lines, 388 long monster descriptions, 107 abilities, 95 terrain/traps, 141 monster statuses.

## 0.8 — file reorganisation
Files moved into `moteur/` (engine) and `donnees/` (data by category); `perso.js` became `MES-CORRECTIONS.js`.

## 0.7 — spells and command page
Descriptions and names of all spells (also inside menus, keeping column width); command help page (`?` then `*`) translated; key letters stay English because they are the real keys.

## 0.6 — items and file organisation
Descriptions of all remaining items (potions, scrolls, wands, staves, rings, amulets, spellbooks, talismans, gems, dragon scales, decks, manuals); lexicon split into per-category files.

## 0.5b — item sheets
Accuracy/damage/delay lines, skill training, weapon/armour descriptions. Literary quotes deliberately left untranslated.

## 0.5 — lexicon, gods, powers
~1360 texts; god phrases built by the game ("X is neutral towards you", "X's wrath lasts…"); power costs, menus, character journal.

## 0.4 and before — the base
The starting base (Firefox extension, text-replacement engine and first translations) was provided by **rago**. The work then consisted of adapting it to the official lists and descriptions of the DCSS repository (monsters, abilities, terrain) and extending it.
