# Participer — tout le monde est le bienvenu

Pas besoin de savoir programmer. L'essentiel du travail, c'est du texte simple : `"texte anglais": "texte français"`.

## Les façons les plus simples d'aider
1. **Jouer et signaler ce qui reste en anglais.** Dans le jeu : `F12` → Console, collez
   `copy(JSON.parse(document.documentElement.dataset.dcssTextesNonTraduits || "[]").join("\n"))`, puis collez le résultat dans une nouvelle [issue](../../issues) (ou envoyez le `.txt`). C'est ainsi que le projet a grandi.
2. **Corriger une traduction fausse ou maladroite.** Donnez le texte anglais exact et votre meilleur français dans une issue, ou modifiez directement la ligne (voir [`LISEZ-MOI.txt`](LISEZ-MOI.txt)) et ouvrez une pull request.
3. **Traduire un bloc manquant.** Bonnes premières tâches : les phrases de la base de données du jeu dans `donnees/messages/gabarits/` (insultes, graffitis, bruits d'armes — deux lignes par phrase : anglais puis français), et ce qui figure dans `outils/non_traduits.txt`.
4. **Une autre langue ou une autre version du jeu ?** Le moteur est réutilisable : voir `outils/GUIDE-AUTRES-LANGUES.txt` et `outils/GUIDE-NOUVELLE-VERSION.txt`. Faites un fork et prévenez-nous : on partage volontiers les données.
5. **Tester sur d'autres navigateurs / serveurs** et dire ce qui marche (voir [`INSTALLATION.md`](INSTALLATION.md)).

## Pull requests
* Un changement petit et ciblé ; un sujet par pull request.
* Ne changez pas l'ordre des fichiers dans `manifest.json` (pour deux textes identiques, le dernier fichier gagne).
* Vérification rapide : le fichier doit toujours se charger (`node --check votrefichier.js`) et l'extension doit afficher `Base de traduction chargée` sans erreur rouge dans la console.
* Numérotation et releases : voir [`VERSIONS.md`](VERSIONS.md) (le mainteneur s'en charge en général).

Une question, une idée ? Ouvrez une issue — aucune question n'est trop petite.
