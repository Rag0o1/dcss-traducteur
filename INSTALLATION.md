# Installation, navigateur par navigateur

L'extension n'est faite que de **scripts de contenu** (aucune page de fond, aucune API propre à un navigateur) : le même dossier marche dans Firefox et dans tous les navigateurs basés sur Chromium. Rien ne passe par un magasin d'extensions : on charge le dossier décompressé (celui qui contient `manifest.json`).

D'abord, récupérez le dossier : téléchargez ce dépôt (bouton vert **Code** → *Download ZIP*) ou un zip de version, puis **décompressez-le à un endroit définitif** (le navigateur garde le chemin ; si vous déplacez ou supprimez le dossier, l'extension ne marche plus).

## Firefox (ordinateur)
1. Tapez `about:debugging` dans la barre d'adresse → **Ce Firefox**.
2. **Charger un module complémentaire temporaire…** → choisissez `manifest.json` dans le dossier.
3. Ouvrez ou rechargez (`F5`) la page du jeu.

*Limite :* un module temporaire disparaît quand Firefox se ferme : refaites les étapes 1 à 3 la fois suivante. Après avoir modifié un fichier, cliquez sur **Recharger** à côté du module, puis `F5`.

**Installation permanente sur Firefox** (facultatif) : Firefox « normal » n'accepte que les modules signés. Options : utiliser **Firefox Developer Edition / Nightly / ESR** et mettre `xpinstall.signatures.required` à `false` dans `about:config`, puis installer un zip renommé en `.xpi` (`about:addons` → roue dentée → *Installer un module depuis un fichier…*) ; ou le signer vous-même comme module « non listé » sur addons.mozilla.org (compte développeur gratuit, ajouter un `browser_specific_settings.gecko.id` dans `manifest.json`).

## Google Chrome, Microsoft Edge, Brave, Opera, Vivaldi, Chromium
1. Ouvrez la page des extensions : `chrome://extensions` (Edge : `edge://extensions`, Brave : `brave://extensions`, Opera : `opera://extensions`, Vivaldi : `vivaldi://extensions`).
2. Activez le **Mode développeur** (en haut à droite, ou en bas à gauche sur Edge).
3. Cliquez sur **Charger l'extension non empaquetée** (*Load unpacked*) et choisissez le dossier qui contient `manifest.json`.
4. Ouvrez ou rechargez (`F5`) la page du jeu.

Contrairement à Firefox, l'extension **reste installée** après un redémarrage (Chrome peut afficher un avertissement « extensions en mode développeur » au démarrage : fermez-le). Après avoir modifié un fichier, cliquez sur l'icône ⟳ **recharger** de l'extension, puis `F5`.

## Safari (macOS / iOS)
Safari ne sait pas charger un dossier brut. Il faut le convertir avec l'outil d'Apple (Xcode requis) : `xcrun safari-web-extension-converter /chemin/du/dossier`, puis compiler et lancer l'application générée et activer l'extension dans Safari → Réglages → Extensions. Non testé par l'auteur.

## Téléphone / tablette
* **Firefox pour Android** : seules les extensions de la collection officielle s'installent sur la version normale ; Firefox **Nightly** permet une collection personnalisée (Paramètres → À propos → toucher 5 fois le logo → *Collection de modules personnalisée*), ce qui demande un module signé. Non testé.
* **Chrome pour Android / navigateurs iOS** ne gèrent pas les extensions (sur Android, Kiwi Browser ou équivalent : mêmes étapes *Charger non empaquetée*, non testé).

## Vérifier que ça marche
Ouvrez le jeu, `F12` → **Console** : vous devez voir `Base de traduction chargée : … textes` et aucune erreur rouge. Les messages, menus et descriptions doivent être en français.

## Utiliser un autre serveur WebTiles
Par défaut l'extension ne tourne que sur `crawl.xtahua.com` et `crawl.develz.org`. Pour ajouter un serveur, modifiez `manifest.json` et ajoutez une ligne dans `"matches"` :
```json
"matches": [
  "*://crawl.xtahua.com/*",
  "*://crawl.develz.org/*",
  "*://votre.serveur.exemple/*"
],
```
puis rechargez l'extension. (La traduction vise DCSS **0.34 / 0.35** ; d'autres versions laisseront plus de texte en anglais.)

## Réglages
`OPTIONS.js` → `nomsDeSorts: "anglais"` (défaut : les noms de sorts restent en anglais comme dans le jeu officiel) ou `"francais"`. Rechargez l'extension et la page après un changement.

## En cas de problème
* **Rien n'est traduit** : mauvais site (voir ci-dessus), extension non chargée (vérifiez la page des extensions), ou fenêtre de navigation privée (extensions désactivées sauf autorisation).
* **Erreur rouge dans la console après une modification** : virgule, guillemet ou accolade oublié — la console indique le fichier et la ligne.
* **Du texte reste en anglais après une mise à jour** : rechargez l'extension *et* la page ; `Ctrl+F5` si le navigateur a gardé la page en cache.
* **Chrome : « Le fichier manifeste est manquant ou illisible »** : vous avez choisi le zip, ou le dossier parent — choisissez le dossier décompressé qui contient directement `manifest.json`.
