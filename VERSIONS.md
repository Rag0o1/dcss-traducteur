# Numérotation des versions

| Type de changement | Ce qu'on change | Exemple |
|---|---|---|
| **Changement mineur** (corrections de traductions, quelques textes ajoutés, faute d'orthographe, mise à jour de l'export) | on ajoute **un chiffre après la dernière virgule/point** | `0.11.1` → `0.11.2` → `0.11.3` |
| **Changement de fonctionnement** (le moteur change : nouveau type de trou dans les phrases, nouvelle règle de traduction, nouveau fichier de code, nouvelle option) | on **passe à la version suivante** | `0.11.3` → `0.12` |

Le numéro est écrit à trois endroits, à garder identiques : `manifest.json` (`"version"`), la première ligne de `LISEZ-MOI.txt`, et le nom du zip (`DCSS-Traducteur-vX.Y.zip`).

Chaque version est décrite ci-dessous, la plus récente en premier.

## 0.12.1 — changement mineur
- ~25 messages du jeu avec trous relevés dans le code source (fumées toxiques, lumière d'Elyvilon, âme, blessures, dévorer, bondir…) dans `phrases_a_trous/audit_0_35.js`.

## 0.12 — rangement des fichiers de phrases
- Les fichiers `variables_a.js` … `variables_k.js` sont renommés **par sujet** et rangés dans `donnees/messages/phrases_a_trous/` (avec un `LISEZ-MOI.txt` qui dit quel fichier contient quoi). `projectiles.js` et `tutoriel.js` y sont aussi.
- Le moteur des trous (`variables.js`) devient `moteur/phrases_a_trous.js` : tout le code est dans `moteur/`, les traductions dans `donnees/`.
- **Contenu et ordre de chargement inchangés** : 0 différence sur 25 805 textes (modes anglais et français), 73/73 tests, export identique.
- Sauvegarde de la version précédente : étiquette Git `v0.11.2`.

## 0.11.2 — changement mineur
- 276 messages du jeu sans variable, relevés dans le code source de Crawl (`donnees/messages/messages_jeu.js`) : dieux, états, bruits, pièges, capacités. Messages sans variable traduits : 68 % → 86 % (le reste est surtout du débogage).

## 0.11.1 — suite de la 0.10, avec des changements de moteur
- **Moteur** : nouveau trou `{K}` (nom de touche, recopié tel quel) dans les phrases à trous ; noms de monstres fabriqués par le jeu étendus (armes dansantes `dancing +2 flail of holy wrath`, tailles de gelées, préfixe `ghostly`) ; règles pour les « !! » multiples, « Vous rencontrez… », les lignes d'examen de monstres (équipement + états + chances de toucher), les boutiques, les objets non identifiés (`a glowing hat`), les parchemins et potions « nus » (`Scroll of Blinking`).
- **Nouveaux fichiers** : `donnees/messages/audit_0_35.js` (audit en jeu 0.35), `donnees/messages/phrases_a_trous/tutoriel.js` (64 textes du tutoriel).
- **Données** : projectiles (`gout of fire`, `torrent of electricity`…), uniques (Louise), Hauts-fonds harmonisés partout.
- **Dépôt** : export des traductions en fichiers texte simples dans `export/` (`node outils/exporter.js`).

## 0.10 — suite : leçons du vrai jeu (arène + mode magicien)
- Le jeu 0.34 a été compilé et lancé en mode arène (outils/arene/) : ~18 000 phrases différentes ont servi de test.
- sorts_monstres_arene.js / projectiles_et_capacites.js : ~400 nouvelles phrases de monstres (souffles, projectiles, invocations de dieux, racines, bolas...).
- projectiles.js + trou {Z} : ~170 noms de projectiles et d'effets de sorts (« The bolt of fire hits you » -> « Le rayon de feu vous touche »).
- Correction d'un défaut : « The bolt of fire hits you. » devenait « Le bolt of fire vous frappe. » (demi-anglais). Les règles de
  combat de regles.js laissent désormais la phrase intacte quand un nom de monstre est inconnu.
- combat.js reconnaît les noms fabriqués par le jeu : draconiens colorés + classe, hydres/slymdras à N têtes, bêtes mutantes
  (larvaire... primordiale), choses laides colorées, « spectral X », « bound X », « X zombie / skeleton / draugr ».
- Nouveaux monstres/armes : ice fiend, brimstone fiend, executioner, hell sentinel, tzitzimitl, scythe (faux).
- Mode joueur (wizard) : tous les dieux ont été « joués » dans le vrai jeu. dieux_pouvoirs_dons.js : accueil / désertion / apaisement des dieux,
  tous les pouvoirs gagnés ou perdus (« Vous pouvez désormais... »), dons et protections des dieux, messages de caractéristiques
  (« Vous vous sentez stupide »), cartes de Nemelex, ajout de sorts à la bibliothèque, « Votre arme luit d’un éclat rouge ».
- variables.js : les noms propres avec accents (Edmée) ne bloquent plus la traduction.
- Dossier export/ : toutes les traductions en fichiers texte simples EN:/FR: (outil outils/exporter.js), pour les partager ou partir d'une autre langue.

## 0.10 — noms de sorts en anglais, dossier outils/
- Nouveau OPTIONS.js : nomsDeSorts = "anglais" (défaut) ou "francais". En mode anglais, les noms de sorts et d'écoles (Fire, Hexes...) restent
  en anglais ; descriptions, menus et messages restent en français et sont adaptés (« parchemin d'Apportation », « Votre souvenir d'Olgreb’s... »).
- donnees/sorts/textes_noms_anglais.js : textes qui citent un sort, réécrits pour le mode anglais.
- moteur/content.js : lignes du menu des sorts protégées des règles génériques ; élision « d’ » ; parchemins de sorts.
- Mode « francais » : résultat identique à la v0.9 (vérifié sur 23 013 textes).
- Non inclus : optimisations de vitesse proposées (à décider après test dans Firefox).
- sorts_melee_effets.js : phrases de lancer de sort des monstres : « Le magicien orc lance un sort. », « Le mage ogre lance « Haste Other » à l’orc ! »,
  « Sigmund vous lance « Blink » » (nom du sort tel quel en mode anglais), sortilèges mineurs.
- donnees/interface/complements.js : ~290 textes qui manquaient (descriptions de capacités, de terrains, de mutations, de monstres, d’astuces, nuage de flammes, etc.) et les NOMS de ~285 terrains (autels, portes, escaliers, portails, pièges, statues, conduits...).
- actions_competences_pouvoirs.js : une quinzaine de messages de plus (apparitions, blocage d’un projectile, chaînes d’Ashenzari, souvenirs des alliés de Hepliaklqana...).
- combat_divers.js : ~40 messages de plus (écrasement contre un mur, tête coupée, poison de l’arme d’Olgreb, attaques de Wu Jian, moutons de rêve, dos tourné...). Les « !! » et « !!! » (coups forts) sont gérés. Correction : « Vous écrasez le X against the wall » ne se mélange plus.
- complements.js : +300 descriptions de la 0.34 : 12 espèces, 2 écoles de magie, 50 nouveaux sorts, 201 statuts, 102 artefacts uniques.
- Nouveau dossier outils/ : extraction des textes du jeu, mesure de couverture (87 % des descriptions ; ~94 % hors citations), comparaison entre deux versions du jeu, guides « nouvelle version » et « autre langue ».
- Non traduit : citations littéraires (quotes), mode tutoriel (72 textes), ~360 messages à trou libre à confirmer en jeu.

## 0.9 — allègement du moteur et messages à variables
- moteur/content.js : traduction incrémentale (seuls les nœuds modifiés dans les zones du jeu sont retraités, balayage complet seulement après
  une rafale de plus de 400 changements ou 1,5 s de calme). Résultat identique à l'ancienne version (testé dans Chromium : historique, nouveau
  message, texte modifié en place, fenêtre ajoutée d'un coup, rafale de 400 lignes). Ancienne version : archives/content_avant_allegement.js (hors zip).
- donnees/messages/combat.js : expression régulière des états remplacée (backtracking catastrophique supprimé, ~2 fois plus rapide) ;
  « de l’orc » corrigé (au lieu de « d’orc ») pour les monstres à article élidé.
- moteur/diagnostic.js : un texte déjà examiné n'est plus réexaminé.
- Nouveau moteur donnees/messages/variables.js + variables_a..e.js : ~850 messages à trous traduits par familles (acteur + phrase) :
  statuts de monstres, pièges, vols, objets, équipement, potions, Zot, sorts de monstres, mêlée, messages des dieux, runes et joyaux.
  Une phrase dont un trou resterait en anglais est laissée entièrement en anglais plutôt que mélangée.
- Non traduit : messages de débogage, d'erreur et d'options ; tableaux de résistances/attaques ; textes à code Lua.
- actions_competences_pouvoirs.js : actions en plusieurs tours (mettre/retirer un équipement), compétences, pouvoirs de dieux (~90 phrases de plus).

## 0.9 — mutations, astuces, messages fixes
- donnees/personnage/mutations_msg.js : 746 noms courts et messages de mutation (gain / perte / « vous aurez »).
- donnees/personnage/mutations_desc.js : 239 descriptions longues de mutations (menu des mutations).
- donnees/interface/astuces.js : 75 astuces / aides contextuelles (celles sans touche intégrée).
- Non traduit volontairement : textes contenant du code Lua ({{ }}) ou des touches variables ($cmd), car le jeu les compose à l'exécution.
- donnees/interface/astuces_morceaux.js : 331 morceaux de phrases des astuces contenant des touches variables. Clé commençant par « ~ » = remplacement partiel (nouveau dans moteur/content.js).
- donnees/interface/descriptions_diverses.js : cartes, nuages, historiques, branches, statuts, commandes, joyaux, Pakellas... + morceaux fixes des textes à code Lua (clés « ~ »).
- moteur/content.js : les remplacements partiels « ~ » fonctionnent aussi sur les textes multi-lignes (espaces normalisées).
- donnees/objets/apparences.js : baguettes, anneaux, amulettes et bâtons non identifiés (« une baguette en fer sertie de bijoux »). « silvery » ajouté aux potions. Artefacts « the Staff/Wand of X » traduits.
- donnees/messages/messages_fixes.js : 936 messages du jeu sans variable (sorts, pièges, refus, ambiance).
- Les libellés rFire / rElec restent en anglais (comme dans l'écran du jeu).

## 0.9 — monstres, combat, descriptions longues
- 580 monstres ordinaires ajoutés (donnees/messages/vocabulaire.js).
- Nouveau donnees/messages/combat.js : environ 250 phrases de combat (lancer un sort, chanceler, disparaître...),
  attaques avec arme « de loin », simulacres, projectiles et effets, et lignes « un faune, maniant une fronde (endormi, 76 % de toucher) ».
- Nouveau donnees/messages/divers.js : lignes d'inventaire avec inscriptions {!q}, [Shoals:4], (gained N), doublons,
  rareté ; bijoux, baguettes, bâtons, talismans ; « Vous entendez... », « Vous voyez ici... », lignes de compétences, objectifs d'entraînement.
- Reste en anglais volontairement : noms de dieux, de branches (Lair:2), noms de personnages uniques (Polyphemus...).
- Ajout (liste d'audit n°3) : fantômes (« Rago's ghost »), 104 monstres uniques (sans article), étreintes (« grab and squeeze »),
  boutiques et prix (« 22 gold »), liste d'achats, bruits et petites phrases ; tableau des compétences réaligné.
- Descriptions longues du jeu (donnees/monstres/) : 388 monstres, 107 capacités, 95 décors et pièges, 141 textes de statuts de monstres,
  16 capacités passives. Source : dat/descript/*.txt du jeu ; les textes qui contiennent du code Lua (variables du jeu) sont laissés en anglais.

## 0.8 — rangement des fichiers
traductions.js -> moteur/assemblage.js ; content.js, diagnostic.js, manuel_moteur.js -> moteur/

```
traductions/perso.js -> MES-CORRECTIONS.js
traductions/officiel.js -> donnees/officiel.js
traductions/sorts.js -> donnees/sorts/noms.js ; sorts_desc.js -> donnees/sorts/descriptions.js
traductions/lex_objets.js, lex_armes.js, lex_egos.js -> donnees/objets/objets.js, armes.js, egos.js
traductions/races.js, metiers.js, lex_dieux.js, mutations.js -> donnees/personnage/ (races, metiers, dieux, mutations)
traductions/aide.js -> donnees/interface/commandes_aide.js ; lex_libelles.js -> libelles.js ; lex_menus.js -> menus.js
traductions/vocabulaire.js, messages.js (-> regles.js), lex_phrases.js (-> phrases.js), lex_textes_longs.js (-> textes_longs.js) -> donnees/messages/
traductions/manuel_01..08.js -> donnees/manuel/
Supprimés car vides : monstres.js, objets.js, dieux.js, interface.js (aucune donnée perdue).
```

## 0.7 — sorts et page des commandes
- Descriptions de TOUS les sorts traduites (officiel.js + sorts_desc.js).
- Noms de sorts traduits (sorts.js), y compris dans le menu des sorts : la largeur des colonnes est conservée.
- Les sorts sont aussi traduits dans les listes (livre, mémoriser, oublier, « Cast: »), les confirmations et les noms d'écoles (Fire → Feu...).
- Pas d'équivalent officiel : ce sont des traductions maison, à corriger librement.
- Page des commandes (touche ? puis *) traduite (aide.js). Les lettres de touches restent en anglais (w = wield...) car ce sont les vraies touches.

## 0.6 — objets et organisation en fichiers
- Descriptions de tous les objets restants : potions, parchemins, baguettes, bâtons, anneaux, amulettes,
  livres de sorts, talismans, joyaux, écailles de dragon, jeux de cartes, manuels... (lex_objets.js).
- Organisation : lexique.js découpé en fichiers par catégorie (lex_*.js), tables de vocabulaire dans
  vocabulaire.js, nouveau fichier perso.js pour vos corrections. Voir « CORRIGER UNE TRADUCTION À LA MAIN ».

## 0.5b — fiches d'objets
Précision/dégâts/délais d'attaque, entraînement des compétences, « Vous l'avez pris à… »,
descriptions de quelques armes et armures : règles dans messages.js, textes dans lex_armes.js, lex_egos.js et lex_objets.js.
Les CITATIONS (littérature, poèmes) qui s'affichent dans les fiches ne sont pas traduites,
volontairement : elles restent dans leur langue d'origine. L'audit les listera quand même.

## 0.5 — lexique, dieux, pouvoirs
- lexique : environ 1360 textes, répartis en fichiers lex_*.js (liste d'audit, armes, marques, objets).
- Phrases des dieux construites par le jeu (« X est neutre envers vous », « La colère de X dure... »,
  « X apprécie que vous... ») : règles dans messages.js (tables DIEUX et CLAUSES).
- Coûts de pouvoirs « (4 MP, Piety--) », menus « a - Nom », journal du personnage.
- Pas encore traduit : la page de la liste complète des commandes (touche ?), car ses textes
  sont sur deux colonnes ; et les titres de pages d'aide longs. À faire séparément.

## 0.4 et avant — la base
La base de départ (extension Firefox, moteur de remplacement de texte et premières traductions) a été **rago**. Le travail a ensuite consisté à l'adapter aux listes et descriptions officielles du dépôt DCSS (monstres, capacités, décors) puis à tout le reste décrit ci-dessus.
