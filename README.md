# DCSS Traducteur

Extension Firefox (manifest v3) qui traduit en français l'interface web de **Dungeon Crawl Stone Soup** (WebTiles : crawl.xtahua.com, crawl.develz.org…). Dictionnaire local, aucune API, aucun envoi de données.

- **English documentation** : branche [`en`](../../tree/en) (README, install guide, how it works, contributing) et [wiki](../../wiki).
- **Participer (sans coder)** : voir [`CONTRIBUTING.md`](CONTRIBUTING.md)
- **Installer (Firefox, Chrome, Edge, Brave, Opera, Vivaldi, Safari...)** : voir [`INSTALLATION.md`](INSTALLATION.md)
- **Utiliser / corriger une traduction** : voir [`LISEZ-MOI.txt`](LISEZ-MOI.txt)
- **Historique et numérotation des versions** : voir [`VERSIONS.md`](VERSIONS.md)
- **Toutes les traductions en fichiers texte simples** (réutilisables pour d'autres langues) : dossier [`export/`](export/)
- **Outils** (mesure de couverture, comparaison de versions du jeu, récolte en arène) : dossier [`outils/`](outils/)

Version actuelle : **0.16**

## Copier les textes non traduits
Dans le jeu : F12 > Console, puis :

```js
copy(JSON.parse(document.documentElement.dataset.dcssTextesNonTraduits || "[]").join("\n"))
```

La liste (un texte par ligne) est copiée dans le presse-papiers ; collez-la dans un fichier `.txt`. Voir aussi `outils/COMMANDE-AUDIT.txt`.
