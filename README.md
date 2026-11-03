# DCSS Traducteur

Traduction française communautaire de **Dungeon Crawl Stone Soup** (WebTiles). L’extension traduit directement dans votre navigateur, sans rien envoyer à personne. Tout est dans des dictionnaires en texte simple que chacun peut corriger ou compléter, et le moteur se réutilise pour d’autres langues. Un texte reste en anglais ? Venez aider !

Version actuelle : **0.16**

## Les guides sont dans le wiki
| | Français | English |
|---|---|---|
| Installer (chaque navigateur) | [Installation](https://github.com/Rag0o1/dcss-traducteur/wiki/Installation) | [Installation](https://github.com/Rag0o1/dcss-traducteur/wiki/Installation-EN) |
| Comment ça marche / corriger une traduction | [Fonctionnement et corrections](https://github.com/Rag0o1/dcss-traducteur/wiki/Fonctionnement-et-corrections) | [How it works](https://github.com/Rag0o1/dcss-traducteur/wiki/How-it-works-EN) · [Editing translations](https://github.com/Rag0o1/dcss-traducteur/wiki/Editing-translations-EN) |
| Outils, nouvelle version du jeu, autre langue | [Outils et mise à jour](https://github.com/Rag0o1/dcss-traducteur/wiki/Outils-et-mise-à-jour) | [Tools and updating](https://github.com/Rag0o1/dcss-traducteur/wiki/Tools-and-updating-EN) |
| Participer (sans coder) | [Participer](https://github.com/Rag0o1/dcss-traducteur/wiki/Participer) | [Contributing](https://github.com/Rag0o1/dcss-traducteur/wiki/Contributing-EN) |
| Historique des versions | [VERSIONS.md](VERSIONS.md) | [Version history](https://github.com/Rag0o1/dcss-traducteur/wiki/Version-history-EN) |

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

Collez la liste dans une [issue](../../issues) : c'est la meilleure façon d'aider.
