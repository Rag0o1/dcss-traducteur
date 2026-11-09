# DCSS Traducteur

Traduction française communautaire de **Dungeon Crawl Stone Soup** (WebTiles). L’extension traduit directement dans votre navigateur, sans rien envoyer à personne. Tout est dans des dictionnaires en texte simple que chacun peut corriger ou compléter, et le moteur se réutilise pour d’autres langues. Un texte reste en anglais ? Venez aider !

Version actuelle : **0.17.11**

## Les guides sont dans le wiki
- [Installation](https://github.com/Rag0o1/dcss-traducteur/wiki/Installation) (chaque navigateur)
- [Fonctionnement et corrections](https://github.com/Rag0o1/dcss-traducteur/wiki/Fonctionnement-et-corrections)
- [Outils et nouvelles versions](https://github.com/Rag0o1/dcss-traducteur/wiki/Outils-et-nouvelles-versions) (nouvelle version du jeu, autre langue)
- [Participer](https://github.com/Rag0o1/dcss-traducteur/wiki/Participer) (sans coder)
- [Historique des versions](VERSIONS.md)
- [English: about this project](https://github.com/Rag0o1/dcss-traducteur/wiki/English)

## Dans ce dépôt
- `LISEZ-MOI.txt` : le guide complet, fourni aussi dans le zip.
- `export/` : toutes les traductions en fichiers texte simples (réutilisables pour d'autres langues).
- `outils/` : mesure de couverture, comparaison de versions du jeu, récolte en arène.
- Les [releases](../../releases) contiennent le zip prêt à installer.

## Repérer ce qui reste en anglais
Dans le jeu : F12 > Console, puis :

```js
copy(JSON.parse(document.documentElement.dataset.dcssTextesNonTraduits || "[]").join("\n"))
```

Collez la liste et de préciser la version dans une [issue](../../issues) : c'est la meilleure façon d'aider.
