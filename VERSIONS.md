# Numérotation des versions

| Type de changement | Ce qu'on change | Exemple |
|---|---|---|
| **Changement mineur** (corrections de traductions, quelques textes ajoutés, faute d'orthographe, mise à jour de l'export) | on ajoute **un chiffre après la dernière virgule/point** | `0.11.1` → `0.11.2` → `0.11.3` |
| **Changement de fonctionnement** (le moteur change : nouveau type de trou dans les phrases, nouvelle règle de traduction, nouveau fichier de code, nouvelle option) | on **passe à la version suivante** | `0.11.3` → `0.12` |

Le numéro est écrit à trois endroits, à garder identiques : `manifest.json` (`"version"`), la première ligne de `LISEZ-MOI.txt`, et le nom du zip (`DCSS-Traducteur-vX.Y.zip`).

**Releases GitHub** (zip joint) : créées automatiquement (`.github/workflows/release.yml`, sur la branche `main`) pour chaque version **majeure** (`0.13`, `0.14`…) et toutes les **10 versions mineures** (`0.13.10`, `0.13.20`…). Les notes des mineures intermédiaires sont reprises dans la release suivante.

Chaque version est décrite ci-dessous, la plus récente en premier.

## 0.30.2 — ménage

- Doublons retirés : 30 entrées définies deux fois dans le même dictionnaire (la première ne servait jamais, la seconde l’emportait), et 16 phrases de outils/db/monspell.txt et miscast_shout.txt déjà traduites ailleurs (database_monstres.js régénéré : 450 → 434 lignes). Aucun changement de traduction : 14 176 textes comparés, 0 différence.
- Outils : suppression de l’ancien tableau_traductions.py (remplacé par base_traductions.py) et du rapport périmé non_traduits.txt (régénérable avec couverture.js --liste, désormais ignoré par git) ; outils/LISEZ-MOI.txt réécrit (tous les outils, commandes de régénération).

## 0.30.1 — deuxième relevé en vraie partie

- Barre latérale : espèces au nom identique en français (« Troll de Trog », « Coglin d’Okawaru », « Spriggan de Gozag Or : 120 »), « Oni de l’Étincelant ».
- Viser : nom propre + équipement (« Viser : Gastronok, portant un chapeau de volonté +2 »), états « très/extrêmement empoisonné », « ralenti », « se déplace vite », « immunisé aux dégâts à distance », « chance d’affecter ».
- Canon à main (trunk) : « Vous tirez une balle de plomb. »
- Nouveaux messages : griffe secondaire, mur de pierre, minuterie de Zot, autel à trois dieux, faveur d’un dieu, fragment d’âme, moutons du sommeil, chance d’être détruit à l’impact, aides de touches.

## 0.30 — corrections relevées en vraie partie (mode spectateur)

- Premier contrôle en vraie partie : parties d’autres joueurs regardées en spectateur sur crawl.xtahua.com (0.34 et trunk 0.36-a0), extension chargée dans la page ; les lignes restées en anglais à l’écran ont été relevées.
- Nouveau fichier donnees/messages/phrases_a_trous/audit_0_36.js : « Lancer : Magic Dart (sans danger ; 3 % de risque d’échec) », « Viser : un diablotin blanc (errant, ne vous a pas remarqué, 57 % de chances de toucher) », en-têtes des menus d’objets (« Armes de mêlée (aller au 1er avec )) »), « Déposer quoi ? … emplacements », « Équipement : 33/52 emplacements », barre latérale « Draconien pâle de Vehumet », « Rejeton démoniaque d’Uskayaw », progression des compétences (« Avec l’entraînement actuel (19 %)… »), « Vous ratez Sticky Flame. », « (hanté) », « Vous l’avez obtenu au niveau 2 des Orcish Mines », nouveaux textes de la trunk (Natasha, canons de glace, éclats magnétiques).
- Restes de l’ancienne traduction des lieux dans le code : « les Cryptes » → « les Vaults », « des Fosses de Gelée » → « des Slime Pits », « du Donjon » → « du Dungeon » (niveaux, provenance des objets), « la Ruche » → « la Hive ».
- wield = brandir aussi dans « brandissant une lance » (au lieu de « maniant »).

## 0.29.1 — graffitis : accord des couleurs

- Les couleurs d’un seul mot s’accordent au pluriel : « des graffitis rouges », « des symboles jaunes contorsionnés », « des triangles jaunes » (rouge, jaune, rose, mauve, pourpre, écarlate, fauve, beige) ; les couleurs composées restent invariables (« jaune tournesol », « noir brillant »).
- Deux couleurs ajoutées par la version trunk : « jaune tournesol », « jaune balge ».
- Contrôle de 226 graffitis tirés au hasard : tous traduits.

## 0.29 — « of » traduit aussi dans les artefacts uniques

- Artefacts uniques : « of » se traduit aussi : « le Wrath de Trog », « l’Axe de Woe +3 ». Quand le nom commence par un objet ordinaire (« hood of the Assassin », « robe of Misfortune », « hat of the Alchemist »), l’objet est traduit comme pour un nom aléatoire : « la capuche +2 de l’Assassin », « la robe +2 de Misfortune », « le chapeau de l’Alchemist ».
- Même règle pour « of the … » partout : « de l’Alchemist » (et plus « de Alchemist »).

## 0.28 — « of » traduit, noms des artefacts uniques en anglais

- Décision du 23/11 : « of » ne fait pas partie du nom, il se traduit : « l’épée longue +2 des Lonely Yaks », « l’anneau de Gluttony », « l’amulette du Death Scarab », « l’armure de plates +2 d’Ice » (élision seulement devant une voyelle, le h anglais est aspiré).
- Décision du 23/11 : les artefacts uniques gardent aussi leur nom anglais, avec l’article du genre français : « la Singing Sword +7 », « le Wrath of Trog », « l’Axe of Woe », « le hood of the Assassin +2 ». Leurs descriptions restent en français.

## 0.27 — noms d’artefacts aléatoires en anglais

- Décision du 23/11 : quand une arme, une armure ou un bijou a un nom donné au hasard, ce nom reste en anglais ; seul l’objet est traduit : « l’épée longue +2 of the Lonely Yaks », « l’anneau of Gluttony », « la cape +2 of Light ». Les artefacts uniques (« le Capuchon de l’Assassin ») gardent leur nom français.
- Moteur : tout « of Nom » en majuscule derrière un objet (+N, anneau, amulette, talisman) est reconnu comme un nom, même s’il n’est pas dans la grammaire (« of Flight », « of Kutorph ») ; corrige aussi « l’armure de plates de lumière +2 » → « l’armure de plates +2 of Light ».

## 0.26 — noms d’artefacts aléatoires : élision et « de plusieurs »

- Moteur des noms aléatoires et graffitis : « de » s’élide aussi devant un h muet (« l’épée longue d’Hiver », « la hache de guerre d’Hier », « d’Harmonie corporelle ») et reste « de » devant un h aspiré (« de Hache », « de Héros ») ; « des plusieurs » → « de plusieurs ».
- « Summoning Gods » = « Dieux convoquants ».

## 0.25.11 — « en enfer » en minuscule

- Les expressions gardent « enfer » en minuscule : « À bientôt en enfer ! », « décoration en enfer », « forgée en enfer », « élevé en enfer ».

## 0.25.10 — relecture des répliques, de l’aide et du tutoriel

- Relecture de 2 987 textes (répliques des monstres et des fantômes, aide, FAQ, tutoriel, astuces, citations du domaine public) : 112 corrections.
- Tutoriel et aide : mots restés en anglais au milieu des phrases (« Press », « Use », « Congrats! », « Well fought! »…), caractères abîmés (Â`), symbole § ; noms de sorts et de lieux en anglais (Mephitic Cloud, Realm of Zot).
- Répliques : tutoiement quand le monstre parle au joueur (environ 40) ; « barding » = barde (jeu de mots), « holy moly » = « sapristi » ; quelques contresens dans les citations.

## 0.25.9 — relecture des descriptions, sigles en anglais

- Relecture des 2 710 descriptions (monstres, sorts, objets, mutations, dieux, espèces, métiers, lieux) : 158 corrections (contresens, oublis, accords, mots inexistants, noms de sorts et de lieux remis en anglais, summon = convoquer, apostrophes ’, phrases ajoutées en double retirées).
- Décision du 20/11 : les sigles restent en anglais comme à l’écran du jeu — AC (et non CA), HP (PV), MP (PM), XL (NX), avec EV et SH ; leur explication est en français.
- « Summonings » = « de Convocation » partout ; « lumière de torche ombreuse ».

## 0.25.8 — « Donjon » quand ce n’est pas le lieu

- Précision du 19/11 : « Dungeon » reste en anglais quand il désigne le lieu (niveaux du Dungeon, retour vers le Dungeon, « Bon retour dans le Dungeon ! ») ; quand il désigne la structure, le monde souterrain (Xom, descriptions, histoires des monstres), on garde « le Donjon ».
- Accords après « l’Abyss » (singulier) : « l’Abyss est », « l’Abyss compte » ; « du Swamp ou des Shoals ».

## 0.25.7 — noms de lieux en anglais

- Décision du 19/11 : les noms de lieux restent en anglais, comme les portails, avec l’article défini et le genre du mot français : le Dungeon, le Lair (of Beasts), le Swamp, les Shoals, le Snake Pit, le Spider Nest, les Slime Pits, les Orcish Mines, les Elven Halls, les Vaults, la Crypt, la Tomb (of the Ancients), les Depths, le Vestibule of Hell, le Hell (h aspiré : « du Hell »), les Hells, l’Iron City of Dis, la Gehenna, le Cocytus, le Tartarus, l’Abyss, le Pandemonium, le Realm of Zot (environ 690 remplacements).
- Restent en français : les expressions et les noms qui ne désignent pas le lieu (« À bientôt en enfer », chien de l’enfer, Lieur d’Enfer, le titre « l’Enfer » pour Inferno, le Marais secret d’Eringya, la citation de Milton).

## 0.25.6 — stab = attaque furtive

- Décision du 19/11 : « stab » = « attaque furtive » (au lieu de « attaque sournoise ») ; la mécanique « frapper un ennemi qui ne vous a pas vu » se dit « attaquer furtivement » dans les descriptions (dagues, Discrétion, l’Étincelant, mutations). Le verbe de combat « vous poignarde » ne change pas.

## 0.25.5 — relecture des messages et de l’interface

- 4 324 textes relus (messages fixes, messages du jeu, interface, menus, états, compléments, messages de mutations) : 66 corrections. Contresens corrigés ; compétences restées en anglais traduites (Esquive, Métamorphose, Combat à mains nues, Alchimie, Forge) ; noms de sorts remis en anglais ; « la Tombe » ; « pointes barbelées » ; espace avant « : » dans les invites.
- « Abysse » partout (au lieu de « Abîme », qui restait dans 12 textes).

## 0.25.4 — tutoiement dans les répliques

- Décision du 19/11 : un monstre, démon, dieu ou arme qui parle AU joueur le tutoie (« Meurs, mortel ! », « Je vais te tuer ! », « Tu es un hérétique et tu dois être détruit ! ») ; il vouvoie quand il parle de sa race ou d’un groupe (« Vous, les mortels… »). La narration du jeu reste au vouvoiement. 750 répliques revues.
- Message d’accueil d’Halloween : « vous devrez prendre l’Orbe vous-même ».

## 0.25.3 — relecture des textes générés

- 1 466 textes générés (sorts et cris de monstres, Enfer, Xom, portails, nouveautés 0.35) relus : 22 corrections. Les voix de l’Enfer et les répliques de monstres vouvoient le joueur, comme le reste des répliques (« Mourez, mortel ! ») ; seul Xom tutoie. Orbe au masculin (« le prendre »), « comme un dément ».

## 0.25.2 — noms des artefacts uniques

- Les 154 artefacts uniques ont un nom français (`outils/unrands_fr.json` → `objets/unrands.js`, nouvelle fonction `artefactUnique` dans `messages/divers.js`) : « l’Épée chantante +7 », « le Courroux de Trog +14 », « les Bottes de sept lieues +2 (portées) », « la Grande fronde « Punk » ». Les noms propres (Trog, Cerebov, Lear…) et les surnoms (« Punk ») sont gardés.

## 0.25.1 — relecture des phrases à trous

- 2 079 modèles de messages relus (fichiers écrits à la main) ; 33 corrections : summon = convoquer (« Le gobelin convoque des araignées ! »), versions « vous » ajoutées (« L’eau envahit vos poumons ! »), trous mal choisis (« l’énergie magique du gobelin »), accords, balises de couleur manquantes.

## 0.25 — tutoriel complet, citations libres de droits, gadgets

- Moteur : phrases du tutoriel où le jeu colle le nom d’une touche dans le texte (`$cmd[...]` → « Ctrl-P », « > »…) ; la touche est reconnue quelle qu’elle soit (raccourcis personnalisés compris). 69 paragraphes (`outils/phrases_cmd_src.json`).
- Citations des descriptions : 182 citations du domaine public traduites (Bible, Shakespeare, Milton, Blake, Poe, Lovecraft…) ; les auteurs français reprennent leur texte original (Baudelaire, Renan). Décision du 19/11 : tout ce qui est encore protégé par le droit d’auteur reste en anglais (`outils/citations_src.json` → `messages/citations_dp.js`).
- Gadgets des Coglins : descriptions des effets et menu d’assemblage traduits ; leurs noms restent en anglais (décision du 19/11), comme ceux des livres aléatoires.

## 0.24.3 — version en développement (0.35) : nouveaux textes

- 328 messages du jeu à trous traduits (`outils/db/messages_trunk.txt` → `phrases_a_trous/messages_trunk.js`) : armures et bijoux qu’on met ou retire, dons divins, pouvoirs, échecs… Couverture des messages à trous : 57 % → 62 % (les autres sont surtout des messages entièrement variables, de débogage ou d’assistant).
- Nouveautés de la 0.35 : Boreas, le centaure des bourrasques, le Rempart boréal, le métier Chasseur, les rappels d’alliés (`outils/db/descriptions_trunk.txt`).

## 0.24.2 — déterminants

- H aspiré respecté (nouveau `moteur/elision.js`, utilisé par les règles, les phrases à trous et les grammaires) : « la hache de bataille », « la hachette », « la hallebarde » au lieu de « l’hache »…
- « des écailles de dragon de feu » au lieu de « une écailles » ; accord de « (porté) » : « une robe (portée) », « des écailles… (portées) ».
- Orbe au masculin partout, comme dans le dictionnaire : « l’Orbe de Zot glorieux », « un orbe lumineux ».

## 0.24.1 — messages des portails

- 421 messages des portails traduits (`outils/db/portails.txt`, généré dans `database_divers.js`) : annonces (« Il y a une entrée vers le Sewer à ce niveau. Dépêchez-vous de la trouver avant que le portail ne rouille ! »), bruits qui s’éloignent, fermetures, noms des salles des Wizlab et des Troves.
- Décision du 18/11 : les portails sont des noms propres → article défini (« vers la Ziggurat », « au Gauntlet », « du Volcano ») ; 29 textes corrigés.

## 0.24 — noms d’artefacts aléatoires, portails en anglais

- Noms d’artefacts aléatoires traduits avec la grammaire du jeu (`randname.txt`, `rand_all/arm/wpn.txt` → `outils/noms_aleatoires_fr.txt`, généré par `outils/grammaire_noms.py`) : « l’épée longue +2 des Yaks solitaires », « l’armure de plates +8 de la Bienveillance de Xom », « la dague +1 de l’Aspic fortifiant ». Les noms inventés entre guillemets (« Vlaxus ») restent tels quels.
- Moteur (`moteur/graffitis.js`, `moteur/content.js`) : article accordé `¤`, adjectif placé devant le nom `@règle>@` ou rejeté après `{apres}`, contractions « du / des », choix de la règle la plus précise ; un nom qui n’est presque qu’un mot libre (« of Cocytus ») n’est pas touché.
- Décision du 18/11 : les noms des portails restent en anglais, y compris dans les descriptions (Ziggurat, Sewer, Ossuary, Bailey, Ice Cave, Volcano, Wizlab, Desolation, Bazaar, Trove, Gauntlet, Necropolis, Labyrinth) : 62 textes corrigés.

## 0.23 — aide du jeu et FAQ

- Écrans d’aide (`help.txt`) et FAQ (`FAQ.txt`) traduits : 235 paragraphes et 26 titres, ajoutés aux phrases à touches (`outils/phrases_touches_src.json`, `outils/aide_titres.json`, fichier généré par `outils/gen_phrases_touches.js`).
- Moteur : un texte d’aide de plusieurs paragraphes sans touche colorée est traduit paragraphe par paragraphe ; les paragraphes mis en page sur plusieurs lignes sont recoupés à la même largeur.

## 0.22 — phrases à touches (astuces, tutoriel) et « Blink »

- Nouveau dans le moteur (`moteur/content.js`, `traduirePhraseATouches`) : quand le jeu coupe une phrase avec des touches colorées, la phrase ENTIÈRE est reconnue sur l’élément parent et traduite d’un coup. Garde-fou : un morceau isolé (« You can ») n’est jamais traduit seul ; seule une phrase complète connue l’est.
- Nouveau `donnees/interface/phrases_touches.js` (192 phrases des astuces et du tutoriel, source : `outils/phrases_touches_src.json`).
- « blink » = « Blink » partout (décision du 18/11) : « Vous faites un Blink. », « parchemin de Blink », « Le gobelin fait un Blink vers vous. ». « en un clin d’œil » (blink of an eye) reste tel quel ; l’option « noms de sorts en français » garde « Clignement ».
- Page « Priorités » dans le tableau Excel (`outils/priorites.py`).

## 0.21.9 — dat/database : enfer, accueil, Xom

- Nouveau `messages/database_divers.js` (416 textes, généré par `outils/db/gen_exact.py` depuis `outils/db/miscname.txt`, `godname.txt`, `godspeak.txt`) : effets de l’Enfer (« Abandonnez tout espoir ! »), messages d’accueil sur l’Orbe de Zot (avec ses 18 adjectifs accordés), visions de la convocation d’horreurs, arènes de Xom, titres de Xom (« Xom le Roublard ») et de Pakellas, cadeaux et paroles de Xom (Xom tutoie, comme ailleurs).
- Vérifié : les phrases de Xom à trous (décors, objets) étaient déjà traduites par le moteur de gabarits.

## 0.21.8 — relecture de officiel.js

- 493 descriptions de l’ancienne traduction officielle corrigées (sur 834) : textes qui ne correspondaient plus à l’anglais actuel (retraduits), fautes (« Elle à », « qui on »), termes alignés sur le glossaire (Discrétion, Amulette, Lames courtes, Maléfices).

## 0.21.7 — audit du dictionnaire : nettoyage et cohérence

- 85 entrées mortes supprimées (écrasées par une traduction plus récente, jamais affichées), surtout dans `officiel.js`.
- 966 apostrophes droites remplacées par l’apostrophe typographique dans `officiel.js`.
- « summon » = « convoquer » partout (48 textes disaient « invoquer ») ; le métier « Invocateur » garde son nom.

## 0.21.6 — audit de dat/database : sorts et cris de monstres

- Nouveau `phrases_a_trous/database_monstres.js` (447 phrases, généré par `outils/db/gen.py` depuis `outils/db/*.txt`) : échecs de sorts (miscast), cris et bruits (shout, « Vous entendez un aboiement ! ») et annonces de sorts de monstres (monspell.txt : « Le chacal tire un harpon sur vous. », « Sigmund conjure un orbe luisant. »…).
- Reste à faire : godspeak (dieux), miscname (enfer, messages d’accueil), titres de Xom/Pakellas/Fedhas.

## 0.21.5 — audit de dat/database : uniques et fuites

- Nouveau `titres_uniques.js` : les 87 titres des monstres uniques (montitle.txt), de « Agnes la Vagabonde » à « Zenata, Chercheuse de Sheza ». Corrige aussi « Urug la Baliste orque ».
- Nouveau `phrases_a_trous/fuites.js` : les 5 cris de fuite des monstres (monflee.txt).
- Volontairement laissés en anglais : gizmo.txt (mots générés pour les noms de gizmos Coglin), help.txt et FAQ.txt (pages d'aide du jeu, pas affichées dans WebTiles).

## 0.21.4 — messages de dieux et de sorts

- 10 messages de dieux ajoutés à `phrases_a_trous/dieux_verbe.js` (contrition au Creuset, régénération accélérée, « ne permet pas aux déloyaux de s'adonner à… », solo de Wu Jian, épreuve de prouesse, armée divine, trésors des Fosses de gélatine…), plus quelques messages de sorts (coassement des grenouilles, ancrage, « You dream of… », Beogh redonne vie).
- Relevé fait sur les 456 messages fixes des fichiers de sorts et de religion du jeu : il n'en restait que ces quelques-uns, le reste était déjà traduit.

## 0.21.3 — boutiques

- Nouveau `phrases_a_trous/boutiques.js` : noms de boutique isolés (« Boniuse's Armour Boutique » → « Boutique d'armures de Boniuse »), « Merci d'avoir fait vos achats… », boutique fermée, frais d'entrée, bon d'achat (« You have N gold pieces. Purchasing will use your shop voucher… »), confirmations d'achat, liste d'achats (ajout, retrait, remplacement, « You now have enough gold to buy… »), « I'll put it outside for you. », types de boutique isolés.
- Trois messages divers ajoutés (cri « Zot », montée impossible, profondeur invalide).

## 0.21.2 — voyants d'état de la barre latérale

- 170 voyants courts traduits (`donnees/interface/statuts_lumieres.js`) : Fast → Rapide, Conf, Invis, Fly → Vol, délais de capacités « -Blink » reste « -Blink » (Blink n’a pas de vraie traduction), etc., en formes courtes pour tenir dans les cases. Les voyants à nombre (Blast12, Wave++, Ray+, Winding..) passent par une règle.
- Volontairement laissés tels quels : les abréviations de résistance dans les noms d'objets (rF+, rC+, Will+…), qui suivent la convention du jeu.

## 0.21.1 — astuces et tutoriel

- 210 morceaux de phrases ajoutés (`donnees/interface/astuces_morceaux2.js`) : conseils de mort et de fin d'exploration, présentations des dieux (Ashenzari, Gozag, Ru, Uskayaw, Xom), autels, caractéristiques, tutoriel (sorts, pièges, combat à distance, alliés, autel…). Phrases mesurées avant/après sur les textes d'aide du jeu : 163 phrases restées en anglais → 17 (les restes sont coupés par une touche variable).

## 0.21 — fontaines et réserves de nourriture (decorlines.txt)

- Toutes les lignes des fontaines (bleue, pétillante, de sang, d'yeux, à sec), y compris les réactions des dieux (Ashenzari, Beogh, Xom, Zin…) et les lignes de Lua (transformations), sont traduites (`gabarits/decors_lignes.js`, 133 phrases).
- Les réserves de nourriture (fruits, viandes, pâtisseries, selon l'espèce : kobold, tengu, vampire…) sont traduites ; les 90 plats avec leur réaction (« a banana. Delicious. ») sont dans `gabarits/decors_macros.js`, avec les accords en genre et en nombre.
- Nouveaux morceaux dans `moteur/gabarits.js` : `your_hands`, `your_weapon`, `_fruit_and_reaction_`, `_meat_and_reaction_`, `_baked_good_and_reaction_`, `sparkling_message`.
- Export et tableur : feuille « decors_morceaux ».
- Remarque : ces lignes de décor viennent de la source du jeu « 0.34-a0 » ; on ne sait pas encore si elles sont affichées sur tous les serveurs (à vérifier en jeu).

## 0.20 — titres de personnage

- Nouveau moteur `moteur/titres.js` + données `donnees/messages/titres.js` (461 titres, généré par `outils/generer_titres.py` depuis `outils/titres_fr.txt`) : « rago the Trooper » devient « rago le Soldat ». Reconnaît « NOM the TITRE », « NOM, TITRE », « NOM La Petite Mort » et la ligne « Title  - TITRE » de l'écran du dieu.
- Les titres qui dépendent de l'espèce (adjectif, genre, poids, façon de marcher, « enfant ») sont accordés : « the Merry Human » → « l'Humain joyeux », « the Fallen Frog » → « la Grenouille déchue », « the Elven Blade » → « la Lame elfique ».
- Les noms d'objets comme « ring of the Tortoise » ne sont pas touchés (le nom du joueur doit être un seul mot).
- Export et tableur : feuille « titres ».
- Les textes qui contiennent le nom du joueur (titres) ne sont pas gardés dans le cache de traduction ni dans la liste des sorties : rien n'est mémorisé à son sujet.

## 0.19 — graffitis et noms de couleurs

- Nouveau moteur `moteur/graffitis.js` : les graffitis du jeu (« You see swirling green graffiti signed by Woog the god, advertising a meeting… ») sont fabriqués par une grammaire emboîtée. Le moteur analyse la phrase avec la grammaire anglaise puis la reconstruit avec la grammaire française (variantes `[a|b]`, accords en genre et en nombre : « des graffitis de runes bleues anguleuses », « des graffitis orange clair signés par Woog le dieu »).
- Nouveau fichier de données `gabarits/graffitis_grammaire.js` (842 productions, anglais + français), généré par `outils/grammaire_graffitis.py` à partir de `outils/graffitis_fr.txt` (la traduction à corriger) : graffitis, noms des 384 couleurs (« vert pomme », « bleu ciel »…), motifs (« rayures rouge sur fond bleu »), adjectifs (« clair », « profond »…). Les phrases de Xom utilisent maintenant ces noms de couleurs français.
- Les paroles du jeu qui parlent de graffitis sur les fontaines sont traduites (`gabarits/decors_lignes.js`, début de `decorlines.txt`).
- Export : les phrases à gabarit (un fichier par source) et la grammaire des graffitis sont maintenant dans `export/` et dans le tableur.

## 0.18 — bruits et paroles des armes (wpnnoise.txt)

- Nouveaux fichiers `gabarits/armes_bruits.js`, `armes_chantante.js`, `armes_chantante_cris.js`, `voix_diverses.js` et `phrases_a_trous/armes_bruits_sons.js` : armes bruyantes (« Votre dague ricane. », « Vous entendez un cri. »), Frostbite, Condemnation, l’Épée chantante (chants, paroles, hurlements), Majin-Bo, Zonguldrok, pensées de la forme champignon, mains d’anguille, écailles de dragon.
- Les paroles de vraies chansons restent en anglais (seul le cadre est traduit) ; 3 répliques avec la macro `@CAPS@` ne sont pas traduites.
- Moteur `gabarits.js` : nouveaux morceaux variables (arme, nom du joueur, dieu, espèce, cris, adjectifs), gabarits « hurlements » prioritaires, « ! » final espacé à la française.
- `manifest.json` : un fichier chargé deux fois (`monstres_paroles.js`) n’est plus en double.

## 0.17.16 — projectiles bloqués, grêle, drain, ordres aux alliés

- Ajout : « X bloque la flèche », « La grêle frappe X », « Vous drainez X », menu d’ordres aux alliés, avertissement de sort très dangereux, « N sorts masqués », ramassage d’un livre, Grêle de balles, Manuel du jeune empoisonneur.

## 0.17.15 — tableau : liens nom ↔ description
- Tableau des traductions : nouvelle colonne « Lien nom ↔ description ». Sur la ligne d’un monstre, sort, mutation, objet, dieu… un clic mène à sa description, et inversement (environ 2 800 paires). Les paires viennent du jeu (`outils/paires_noms_descriptions.json`).

## 0.17.14 — tableau des traductions
- Nouvel outil `outils/tableau_traductions.py` : génère un tableur Excel de toutes les traductions (un onglet par fichier, index cliquable, colonne « Ta correction ») pour les relire et les corriger plus facilement. Il est régénéré à chaque nouvelle version.

## 0.17.13 — coup de propre
- 24 traductions en double (même texte, même traduction dans deux fichiers) retirées ; le résultat est strictement identique (vérifié sur 25 832 textes).
- Contrôle du code du moteur : aucune variable ni fonction inutilisée.

## 0.17.12 — contenu récent de la 0.35
- Mesure faite contre le code le plus récent de Crawl (9 novembre 2026) : descriptions 88 % traduites (99 % sans les citations de monstres ni le tutoriel).
- Traduit : Xom, Gozag (pouvoirs et colère), espèce Oni, potions (diligence, sagesse furieuse) et parchemins (grenouille, cailloux), sorts (Explosion de forteresse, Déphasage, Défaire violent de Yara), états (Blast, Reach+, Lock, Irate, Rampage+++, Eisegesis, Guardian, Troupe, Protean, Sneaky, Disguised…), monstres (mannequin, sort vivant, forme de bataille chaotique, golem de chair), mutations (Marque du Célébrant, titubement, enchantement d’artefacts), capacités de Gozag et d’ancêtre.

## 0.17.11 — mineure
- Alliés à nom propre (par exemple l’ancêtre d’Hepliaklqana « Crom ») : leurs attaques, blocages et destructions sont maintenant traduits (« Crom évite votre attaque », « La flèche frappe Crom »).

## 0.17.10 — relevé fait en regardant une vraie partie
- Nouveau : le relevé a été fait en spectateur sur le serveur, avec la dernière version de l’extension chargée dans la page.
- Fouets : « Vous flagellez / fustigez / rossez … sans pitié », armes de gel (« Vous gelez … »).
- Rochers (sort « Rocher dévalant ») : « Votre rocher fonce sur … », « se disloque ».
- Fiches de monstres : « Il peut voir l’invisible », « Ils ont environ 35 % de chances de vous toucher », immunités et résistances, tableaux d’attaques (Griffe, Morsure, Coup…), vitesse, classe, menace.
- Monstres : « Le Démon de glace » (articles des uniques), Frederick l’Impeccable avec ses objets à propriétés entre accolades (« {Energy, Str+3} »).
- Divers : portes (« grande porte »), boomerang qui se brise, brume spectrale, souffrance atroce, capuche, liste des destinations « [Crypt:2] ».

## 0.17.9 — mineure

- Aides de touches et menus raccourcis pour ne pas dépasser la largeur de l’anglais (« Appuyez: ? - aide, Dir - cible », « Parchemins (tout avec », « [Armure fusion.] »…).
- Verbes d’attaque des griffes (« Vous égratignez / mutilez / éventrez… »), y compris sur les monstres uniques.
- Monstres uniques avec titre (Blorkula l’Orcula, « Dowan, frère de Duvessa ») ; phrases de Blorkula, de Dowan, de l’abeille mécanique de Sprozz.
- Boutiques de bijoux, portails (enceinte, égout) et leurs bruits, « Found five items. », « You sensed 2 altars… », fioles de transmutation, catégories d’objets des menus, en-têtes des tableaux de compétences.

## 0.17.8 — mineure

- Feu liquide, vol (« très léger »), « force de percussion », cause de mort (« Gelé à mort par un endoplasme (4 dégâts) », « Tué par… », « Mort de faim »…), invitation à se convertir à Beogh.

## 0.17.7 — mineure

- Boutiques : la barre d’aide du bas et la phrase d’accueil sont raccourcies (elles débordaient de l’écran), et « buy » devient « achat ».

## 0.17.6 — mineure (ménage)

- 76 traductions en double (jamais utilisées, écrasées par une autre version) retirées des dictionnaires, et 41 phrases à trous identiques à une entrée du dictionnaire.
- Variables de code inutilisées retirées. Le résultat des traductions est inchangé (vérifié sur les 25 832 textes du corpus : une seule description, celle d’une gemme, prend la version plus soignée).
- Dossier `export/` régénéré.
- Volontairement laissé : `officiel.js` (copie fidèle de la traduction officielle, qui sert de base et que nos versions écrasent par endroits).

## 0.17.5 — mineure

- Écran de création du personnage : aides de touches, menus, noms d’espèces et de métiers manquants (Nain des montagnes, Centaure de tempête, Traqueur, Ravageur, Mystique), groupes de métiers.
- En-têtes des tableaux de compétences : les colonnes restent droites (« Comp. Niv. Coût Apt »).
- Messages de Trog, de métamorphose et de fin de partie ; « You encounter … She is wielding … » (phrase de suite avec pronom) ; titres des mutations (« Écailles en fusion (niveau 1/3) »).
- Texte du Gnoll corrigé (« toutes à la fois »).

## 0.17.4 — mineure

- Insultes des diablotins et des démons (« Fuis, gredin ahuri et lourdaud ! ») : environ 420 mots traduits, avec l’accord en genre.

## 0.17.3 — mineure

- Monstres examinés avec des objets pluriels au carquois (« avec en carquois des boomerangs »).
- Texte long de l’escalier vers une branche (Antre des Bêtes, etc.).

## 0.17.2 — mineure

- Lutins du sort « Jinxbite », accord des amulettes, explosions, essences d’âmes, bienvenue et construction des branches, « trouvé au niveau… ».
- Descriptions d’armes et d’objets (dont « Of guile »), états des monstres dans l’examen, aides de touches et menus.

## 0.17.1 — mineure
- « Vous rencontrez le Maggie » : les monstres uniques (Maggie, Sigmund, Grum…) n'ont plus d'article, et « You encounter a goblin » donne « un gobelin » (et non « le gobelin »).
- Cadavres et squelettes de monstres uniques : « Vous voyez ici le cadavre de Maggie. »

## 0.17 — les répliques des monstres
- Nouveau dossier `donnees/messages/citations/` : 1733 répliques de monstres traduites une à une à la main (`monspeak.txt` : menaces, blagues, prières, répliques de personnages). Combinées aux cadres de la 0.16, la phrase complète est en français (« Le gobelin vous dit : « Vous ferez un beau sacrifice. » »).
- Les variantes entre crochets du jeu (`[a|b]`) sont toutes écrites. Une réplique = une ligne `"anglais": "français"`, facile à améliorer.

## 0.16 — paroles et gestes des monstres
- Nouveau fichier `monstres_paroles.js` (`dat/database/monspeak.txt`) : tous les cadres de paroles (« Le gobelin dit : « … » », « … à vous : », « … vers l’orc : ») pour une cinquantaine de verbes, plus une centaine de gestes (sourires, regards, yeux qui luisent, etc.). La citation est traduite si elle est connue, sinon elle reste en anglais.
- Le moteur de gabarits connaît `@quote@`, `@to_foe@`, `@at_foe@`, `@objective@`, `@Subjective@` et classe les gabarits qui commencent par un monstre selon le mot suivant (la vitesse reste bonne).
- Couverture de la base de données : `monspeak` 11 % → 60 %.

## 0.15 — le moteur de gabarits connaît les cibles de sorts
- `moteur/gabarits.js` comprend `@at@` (« sur » / « à côté de » si le sort rate), `@target@`, `@foe@`, `@reflexive@`, `@subjective@`, `@something@`, `@beam@`, les noms de dieux et `@arms@`.
- Nouveau fichier `monstres_sorts.js` : ce que disent et font les monstres en lançant un sort (`dat/database/monspell.txt`) : gestes, chants, prières, souffles, lanceurs invisibles (« Vous entendez … »). Couverture de ce fichier : 24 % → 63 %.
- Réorganisation du dépôt : **le français est maintenant la branche principale** ; la documentation anglaise est sur la branche `en` (et dans le wiki).

## 0.14 — le moteur de gabarits connaît les monstres
- `moteur/gabarits.js` comprend maintenant les **monstres** (`@The_monster@`… ; en français `@M_S@ @M_o@ @M_d@ @M_a@ @M_e@`), les phrases **sans ponctuation finale** (le jeu ajoute « . » ou « ! ») et des morceaux typés (mains, possessifs).
- Nouveaux fichiers de gabarits : `magie_rates.js` (tous les ratés de magie : joueur, monstres, lanceur invisible ; toutes les écoles) et `cris.js` (cris et bruits des monstres).
- Ajout du guide pour participer, du guide d'installation pour chaque navigateur et des releases GitHub automatiques.

## 0.13 — changement de fonctionnement
- **Nouveau moteur `moteur/gabarits.js`** : traduit les phrases de la base de données du jeu (`dat/database`), qui sont écrites avec des morceaux variables (`@couleur@`, `@The_feature@`, `[variante a|variante b]`). Il sait traduire les couleurs, les parties du corps, les décors, les objets du joueur, les truites de Xom, etc.
- **Premier fichier de gabarits : `donnees/messages/gabarits/dieux_xom.js`** : toutes les phrases de Xom (événements aléatoires du donjon, rires, cadeaux, bannissement, résurrection...) et les phrases des dieux (bienvenue, pénitence, mort, Zot). `godspeak.txt` passe de 3 % à ~80 % traduit.
- Les autres fichiers de la base (insultes, cris, ratés de magie, graffitis, bruits d’armes, paroles des monstres) suivront avec le même moteur.

## 0.12.6 — changement mineur
- Audit du 03/11 : acquisition (« Acquire … ? »), objets à accolades (« the ring of the Giraffataur {…} »), potentiel de dégâts, étude de compétences, chance de remboursement, résultats de recherche, runes, liste de mutations, résumé « Turns / Time », aides de touches.

## 0.12.5 — changement mineur
- Menu des compétences (« a - Fighting 3.5 » → « a - Combat 3.5 ») et exclusions de déplacement (« exclusions: hydra and staircase » → « exclusions : hydre et escalier »).

## 0.12.4 — changement mineur
- Audit de la 0.12.1 : ~75 textes traités (mains de zombie, « sock/thump », projectiles « bolt / puff of frost / splash of acid », lignes d’examen d’un monstre « He can fly. », « Speed: … », « Will: ++ », aides de touches des menus, messages des Mines orques, etc.). Corrigé : « The flash freeze hits you. » (projectile + « vous ») ne se traduisait pas.
- La commande pour copier la liste des textes non traduits est maintenant documentée (`LISEZ-MOI.txt`, `README.md`, `outils/COMMANDE-AUDIT.txt`).

## 0.12.3 — changement mineur
- Vérification des données tirées du jeu officiel : en mode noms de sorts anglais, le texte du Bannissement (Lugonu) garde maintenant « Banishment » au lieu de « Bannissement ». Les autres textes cités (Baiser de la mort, Serviteur infernal, Drain vampirique, Déchaînement de destruction, Assaut multiple) étaient déjà couverts.

## 0.12.2 — changement mineur
- Parchemins de sorts : « A parchment of Blink. » est traduit en entier en mode noms de sorts français, et les phrases qui les contiennent (« Vous ramassez / Vous voyez ici / Vous lâchez un parchemin de … ») ne restent plus à moitié en anglais.

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
