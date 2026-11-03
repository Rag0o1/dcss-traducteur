# Numérotation des versions

| Type de changement | Ce qu'on change | Exemple |
|---|---|---|
| **Changement mineur** (corrections de traductions, quelques textes ajoutés, faute d'orthographe, mise à jour de l'export) | on ajoute **un chiffre après la dernière virgule/point** | `0.11.1` → `0.11.2` → `0.11.3` |
| **Changement de fonctionnement** (le moteur change : nouveau type de trou dans les phrases, nouvelle règle de traduction, nouveau fichier de code, nouvelle option) | on **passe à la version suivante** | `0.11.3` → `0.12` |

Le numéro est écrit à trois endroits, à garder identiques : `manifest.json` (`"version"`), la première ligne de `LISEZ-MOI.txt`, et le nom du zip (`DCSS-Traducteur-vX.Y.zip`).

Chaque version est décrite ci-dessous, la plus récente en premier.

## 0.11.1 — suite de la 0.10, avec des changements de moteur
- **Moteur** : nouveau trou `{K}` (nom de touche, recopié tel quel) dans les phrases à trous ; noms de monstres fabriqués par le jeu étendus (armes dansantes `dancing +2 flail of holy wrath`, tailles de gelées, préfixe `ghostly`) ; règles pour les « !! » multiples, « Vous rencontrez… », les lignes d'examen de monstres (équipement + états + chances de toucher), les boutiques, les objets non identifiés (`a glowing hat`), les parchemins et potions « nus » (`Scroll of Blinking`).
- **Nouveaux fichiers** : `donnees/messages/variables_k.js` (audit en jeu 0.35), `donnees/messages/tutoriel.js` (64 textes du tutoriel).
- **Données** : projectiles (`gout of fire`, `torrent of electricity`…), uniques (Louise), Hauts-fonds harmonisés partout.
- **Dépôt** : export des traductions en fichiers texte simples dans `export/` (`node outils/exporter.js`).

## 0.10
- Option `nomsDeSorts` (`"anglais"` par défaut ou `"francais"`) dans `OPTIONS.js`.
- Messages à trous par familles (`variables_*.js`), projectiles, messages de dieux et pouvoirs.
- Récolte des messages du vrai jeu (arène + mode magicien) : voir `outils/arene/`.

## Avant 0.10
Voir `HISTORIQUE.txt`.
