# Phrases with holes: which file for which sentence?

One line = one sentence: `"English phrase with {A} {X}": "French phrase with {S1} {x2}",`
The hole syntax (`{A} {I} {Y} {X} {K} {Z} {R} {G} {p} {s} {is} {v:verb}`) is documented at the top of `moteur/phrases_a_trous.js` and in `docs/HOW-IT-WORKS.md`.
Load order (in `manifest.json`) matters: for duplicate phrases the last file wins.

| File | Content |
|---|---|
| `monstres_pieges_mort.js` | Monsters (states, abilities), traps, death, a few god messages |
| `objets_equipement_potions.js` | Items, equipment, potions, Xom, movement, stolen items |
| `sorts_melee_effets.js` | Monster spell casting, unique weapons, melee, delayed effects |
| `monstre_verbe.js` | "Monster + verb" (becomes paralysed…) and "The monster's X …" |
| `dieux_verbe.js` | "<God> + verb" (Zin accepts your kill…) |
| `actions_competences_pouvoirs.js` | Multi-turn actions (put on / take off), skills, god powers |
| `combat_divers.js` | Crushing, beheading, Wu Jian attacks, dodges, gems, dream sheep… |
| `sorts_monstres_arene.js` | Monster breaths, summons, vortices, roots… (harvested in the arena) |
| `projectiles.js` | TABLE of projectile names (hole `{Z}`): add one projectile and every phrase handles it |
| `projectiles_et_capacites.js` | Phrases with a projectile (`{Z}`) + monster abilities seen in the arena |
| `dieux_pouvoirs_dons.js` | God welcome/desertion, powers gained/lost, gifts, spell-scroll rules |
| `audit_0_35.js` | Findings of the in-game audit (0.35): dancing weapons, states, shops, Necropolis, monster examine |
| `audit_0_12_1.js` | Audit of 0.12.1 and later: zombie hands, key hints, skills menu, acquirement, summary lines |
| `tutoriel.js` | The 64 tutorial texts (`{K}` = key name) |

Where to add a new phrase? In the file of its topic. When in doubt: the latest audit file.
