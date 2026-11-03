// Tutoriel (0.10) : textes des leçons du tutoriel. Les touches ($cmd[CMD_...]) sont remplacées par le nom réel de la touche affichée dans le jeu.
// Pour corriger : changez le texte français à droite (gardez les $cmd[...]). Les 6 écrans « résumé » mis en page en ASCII ne sont pas inclus.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const TUTO = [
[
"You can reread all messages at any time with $cmd[CMD_REPLAY_MESSAGES]. Also, press Space or left click with mouse to clear the --more-- prompts.",
"Vous pouvez relire tous les messages à tout moment avec $cmd[CMD_REPLAY_MESSAGES]. Appuyez aussi sur Espace ou cliquez avec la souris pour faire disparaître les invites --more--."
],
[
"You die... In Crawl, death is a sad but common occurrence. Note that there's usually something you could have done to survive, for example by using some kind of item, running away, resting between fights, or by avoiding combat entirely. Keep trying, eventually you'll prevail!",
"Vous mourez… Dans Crawl, la mort est triste mais courante. Notez qu’il y avait presque toujours quelque chose à faire pour survivre, par exemple utiliser un objet, fuir, vous reposer entre deux combats, ou éviter complètement le combat. Continuez d’essayer, vous finirez par triompher !"
],
[
"In this lesson you're going to learn how to move around and explore a level. You can move by clicking somewhere with your Mouse, or with the arrow keys.",
"Dans cette leçon, vous allez apprendre à vous déplacer et à explorer un niveau. Vous pouvez vous déplacer en cliquant quelque part avec la souris, ou avec les flèches du clavier."
],
[
"A quicker way to “run” through a corridor is to press Shift along with the number pad (try Numlock on/off) or vi keys.",
"Une façon plus rapide de « courir » dans un couloir est d’appuyer sur Maj en même temps que le pavé numérique (essayez avec Verr. Num activé/désactivé) ou les touches vi."
],
[
"When standing on a staircase leading downwards, you can enter the next level with $cmd[CMD_GO_DOWNSTAIRS] or with a left click on your character.",
"Lorsque vous êtes sur un escalier qui descend, vous pouvez entrer dans le niveau suivant avec $cmd[CMD_GO_DOWNSTAIRS] ou avec un clic gauche sur votre personnage."
],
[
"What's this? To find out where you are, have a look at the minimap to the right of the screen. You can have a closer look at a part of the map with a right mouse click and also can travel there with a left click. You can enter the overmap view with $cmd[CMD_DISPLAY_MAP] and then move the cursor around to look around the level. You also can travel wherever your cursor is pointing by pressing . or Enter. Press Escape to return to the normal game mode.",
"Qu’est-ce que c’est ? Pour savoir où vous êtes, regardez la mini-carte à droite de l’écran. Vous pouvez examiner de plus près une partie de la carte avec un clic droit, et vous y rendre avec un clic gauche. Vous pouvez ouvrir la vue d’ensemble avec $cmd[CMD_DISPLAY_MAP], puis déplacer le curseur pour regarder le niveau. Vous pouvez aussi vous rendre là où pointe votre curseur en appuyant sur . ou Entrée. Appuyez sur Échap pour revenir au mode de jeu normal."
],
[
"Exploring manually can get tedious after a while, so you might want to let that happen automatically. Try it by pressing $cmd[CMD_EXPLORE] , or by clicking on 'autoexplore', the first button in the command bar below the minimap..",
"Explorer à la main peut devenir fastidieux, vous pouvez donc le laisser se faire automatiquement. Essayez en appuyant sur $cmd[CMD_EXPLORE] , ou en cliquant sur « autoexplore », le premier bouton de la barre de commandes sous la mini-carte.."
],
[
"Some dangerous ground is marked with exclusions. Autotravel (including mouseclick!) will not lead you into exclusions. Instead you will automatically stop. However, autoexplore will move you safely around exclusions: so, you can safely continue by pressing $cmd[CMD_EXPLORE].",
"Certains terrains dangereux sont marqués comme zones d’exclusion. Le déplacement automatique (y compris au clic !) ne vous y conduira pas : vous vous arrêterez automatiquement. En revanche, l’exploration automatique vous fera contourner les exclusions en toute sécurité : vous pouvez donc continuer en appuyant sur $cmd[CMD_EXPLORE]."
],
[
"Congratulations! You've completed the first lesson! To exit the tutorial, simply go up these stairs with $cmd[CMD_GO_UPSTAIRS] or by left clicking on your character. Confirm the resulting prompt with an uppercase Y.",
"Félicitations ! Vous avez terminé la première leçon ! Pour quitter le tutoriel, montez simplement ces escaliers avec $cmd[CMD_GO_UPSTAIRS] ou en cliquant avec le bouton gauche sur votre personnage. Confirmez l’invite qui apparaît avec un Y majuscule."
],
[
"A new level! To begin with, head over to that door to the right. Also, remember: You can reread old messages with $cmd[CMD_REPLAY_MESSAGES].",
"Un nouveau niveau ! Pour commencer, dirigez-vous vers cette porte à droite. Souvenez-vous aussi : vous pouvez relire les anciens messages avec $cmd[CMD_REPLAY_MESSAGES]."
],
[
"To close an open door, press $cmd[CMD_CLOSE_DOOR].",
"Pour fermer une porte ouverte, appuyez sur $cmd[CMD_CLOSE_DOOR]."
],
[
"When standing on a staircase leading upwards, you can enter the previous level with $cmd[CMD_GO_UPSTAIRS] or by left clicking on your character.",
"Lorsque vous êtes sur un escalier qui monte, vous pouvez retourner au niveau précédent avec $cmd[CMD_GO_UPSTAIRS] ou avec un clic gauche sur votre personnage."
],
[
"This lesson will teach you about monsters and fighting. First, we need a weapon! Go and grab the one lying over there.",
"Cette leçon vous apprendra à connaître les monstres et le combat. D’abord, il nous faut une arme ! Allez prendre celle qui se trouve là-bas."
],
[
"Pick up this weapon by clicking on it in the inventory panel, and then wield it by clicking on it again. Alternatively, pick it up with $cmd[CMD_PICKUP] or g and then wield it with $cmd[CMD_EQUIP].",
"Ramassez cette arme en cliquant dessus dans le panneau d’inventaire, puis équipez-la en cliquant de nouveau dessus. Vous pouvez aussi la ramasser avec $cmd[CMD_PICKUP] ou g, puis l’équiper avec $cmd[CMD_EQUIP]."
],
[
"Very good! You can heal by resting with $cmd[CMD_REST] , or by clicking the 'rest' button in the command bar below the minimap. This will make you rest until your health is full, but will be interrupted by important events.",
"Très bien ! Vous pouvez vous soigner en vous reposant avec $cmd[CMD_REST] , ou en cliquant sur le bouton « rest » de la barre de commandes sous la mini-carte. Vous vous reposerez jusqu’à ce que votre santé soit pleine, sauf si un événement important vous interrompt."
],
[
"Rather than storm the room and get swarmed by monsters, you can also step back and wait (with $cmd[CMD_WAIT] or by clicking on your character) for them to come to you.",
"Plutôt que de foncer dans la salle et de vous faire submerger par les monstres, vous pouvez aussi reculer et attendre (avec $cmd[CMD_WAIT] ou en cliquant sur votre personnage) qu’ils viennent à vous."
],
[
"Remember, you can rest up with $cmd[CMD_REST].",
"Souvenez-vous : vous pouvez vous reposer avec $cmd[CMD_REST]."
],
[
"Examine these monsters (via mouseover by pressing $cmd[CMD_LOOK_AROUND] to enter examine mode, and then $cmd[CMD_TARGET_CYCLE_FORWARD] to cycle through nearby monsters) and compare their descriptions (with rightmouseclick by pressing $cmd[CMD_TARGET_DESCRIBE] while selecting them in examine mode) to find out which of these cages is safer to fight through.",
"Examinez ces monstres (en passant la souris dessus, ou en appuyant sur $cmd[CMD_LOOK_AROUND] pour entrer en mode examen, puis sur $cmd[CMD_TARGET_CYCLE_FORWARD] pour passer d’un monstre proche à l’autre) et comparez leurs descriptions (avec un clic droit, ou en appuyant sur $cmd[CMD_TARGET_DESCRIBE] en les sélectionnant en mode examen) pour déterminer laquelle de ces cages est la plus sûre à traverser."
],
[
"Well done! After resting to full health continue to the next level with $cmd[CMD_GO_DOWNSTAIRS] or by clicking on your character.",
"Bien joué ! Après vous être reposé jusqu’à avoir toute votre santé, continuez vers le niveau suivant avec $cmd[CMD_GO_DOWNSTAIRS] ou en cliquant sur votre personnage."
],
[
"Remember: You can reread old messages with $cmd[CMD_REPLAY_MESSAGES].",
"Souvenez-vous : vous pouvez relire les anciens messages avec $cmd[CMD_REPLAY_MESSAGES]."
],
[
"Now, for ranged combat! Pick up these boomerangs with $cmd[CMD_PICKUP] or g, or by mouseclick, and continue.",
"Maintenant, le combat à distance ! Ramassez ces boomerangs avec $cmd[CMD_PICKUP] ou g, ou d’un clic de souris, et continuez."
],
[
"You can fire your boomerangs at a monster with $cmd[CMD_FIRE] or by clicking on them in the inventory panel. To confirm the auto-targeted monster, press $cmd[CMD_TARGET_SELECT] or Enter. You can skip this and fire at the closest monster with shift-tab or p.",
"Vous pouvez lancer vos boomerangs sur un monstre avec $cmd[CMD_FIRE] ou en cliquant dessus dans le panneau d’inventaire. Pour confirmer le monstre ciblé automatiquement, appuyez sur $cmd[CMD_TARGET_SELECT] ou Entrée. Vous pouvez passer cette étape et tirer sur le monstre le plus proche avec Maj-Tab ou p."
],
[
"Pick up this shortbow and wield it with $cmd[CMD_EQUIP] or by mouseclick.",
"Ramassez cet arc court et équipez-le avec $cmd[CMD_EQUIP] ou d’un clic de souris."
],
[
"Remember that you can autoexplore using $cmd[CMD_EXPLORE].",
"Souvenez-vous que vous pouvez explorer automatiquement avec $cmd[CMD_EXPLORE]."
],
[
"Find the exit! Remember that you can autoexplore using $cmd[CMD_EXPLORE].",
"Trouvez la sortie ! Souvenez-vous que vous pouvez explorer automatiquement avec $cmd[CMD_EXPLORE]."
],
[
"In this lesson you're going to learn about items and how to use them.",
"Dans cette leçon, vous allez apprendre ce que sont les objets et comment les utiliser."
],
[
"Pick up these boots with $cmd[CMD_PICKUP] and wear them with $cmd[CMD_EQUIP]. Or simply mouseclick on them in the inventory panel.",
"Ramassez ces bottes avec $cmd[CMD_PICKUP] et mettez-les avec $cmd[CMD_EQUIP]. Ou cliquez simplement dessus dans le panneau d’inventaire."
],
[
"Some types of items, marked with a green frame, are picked up automatically as you step on them.",
"Certains types d’objets, marqués d’un cadre vert, sont ramassés automatiquement lorsque vous marchez dessus."
],
[
"Many items are unidentified when you find them. One way to find out what they do is to use them. Try reading this scroll with $cmd[CMD_READ] or with mouseclick in the inventory panel.",
"Beaucoup d’objets ne sont pas identifiés quand vous les trouvez. Une façon de savoir à quoi ils servent est de les utiliser. Essayez de lire ce parchemin avec $cmd[CMD_READ] ou d’un clic dans le panneau d’inventaire."
],
[
"Autopickup does not work if there's a monster around. You can either pick up this scroll now with $cmd[CMD_PICKUP] or clicking on your character, or you can fight the nearby enemy and pick it up afterwards.",
"Le ramassage automatique ne fonctionne pas s’il y a un monstre à proximité. Vous pouvez soit ramasser ce parchemin maintenant avec $cmd[CMD_PICKUP] ou en cliquant sur votre personnage, soit combattre l’ennemi proche et le ramasser ensuite."
],
[
"An item described as runed or glowing will always be enchanted, or have special properties, or both. Once you step on top of such an item, its properties will be revealed to you.",
"Un objet décrit comme runique ou luisant sera toujours enchanté, ou aura des propriétés spéciales, ou les deux. Dès que vous marchez sur un tel objet, ses propriétés vous sont révélées."
],
[
"To view the description of your new weapon, find and select it in your inventory ($cmd[CMD_DISPLAY_INVENTORY]). You can also mouseover or right click it in the inventory panel. Notice that all the item commands also work from the item description screens.",
"Pour voir la description de votre nouvelle arme, trouvez-la et sélectionnez-la dans votre inventaire ($cmd[CMD_DISPLAY_INVENTORY]). Vous pouvez aussi passer la souris dessus ou faire un clic droit dans le panneau d’inventaire. Notez que toutes les commandes d’objets fonctionnent aussi depuis les écrans de description d’objet."
],
[
"Once you've successfully managed to poison a monster, it is sometimes best to retreat and let the poison do the work. Don't forget to retreat to heal too, if necessary.",
"Une fois que vous avez réussi à empoisonner un monstre, il est parfois préférable de battre en retraite et de laisser le poison faire son travail. N’oubliez pas de reculer aussi pour vous soigner, si nécessaire."
],
[
"Well fought! If necessary, rest up with $cmd[CMD_REST], then continue downwards with $cmd[CMD_GO_DOWNSTAIRS] or with a click on your character.",
"Bien combattu ! Si nécessaire, reposez-vous avec $cmd[CMD_REST], puis continuez vers le bas avec $cmd[CMD_GO_DOWNSTAIRS] ou en cliquant sur votre personnage."
],
[
"If the many commands are too confusing, you can also look them up in the command help $cmd[CMD_DISPLAY_COMMANDS]. A number of commands are also available in the clickable command panel to the right of the screen. Rereading old messages with $cmd[CMD_REPLAY_MESSAGES] is available as usual.",
"Si les nombreuses commandes sont trop déroutantes, vous pouvez aussi les consulter dans l’aide des commandes $cmd[CMD_DISPLAY_COMMANDS]. Plusieurs commandes sont aussi disponibles dans le panneau de commandes cliquable à droite de l’écran. Relire les anciens messages avec $cmd[CMD_REPLAY_MESSAGES] reste possible comme d’habitude."
],
[
"Traps can have a variety of unpleasant effects, such as alerting monsters or teleporting you into danger. Some traps are permanent and will always be revealed as part of the map, but other traps can be triggered by exploring new tiles, and won't exist after being triggered. If there's no way around, you'll have to trigger the trap and deal with the consequences.",
"Les pièges peuvent avoir divers effets désagréables, comme alerter les monstres ou vous téléporter en plein danger. Certains pièges sont permanents et toujours révélés sur la carte, mais d’autres peuvent être déclenchés en explorant de nouvelles cases et n’existent plus une fois déclenchés. S’il n’y a aucun moyen de les contourner, vous devrez déclencher le piège et en affronter les conséquences."
],
[
"Potions may provide vital healing or useful enchantments, but some have less desirable effects. You can quaff this potion with $cmd[CMD_QUAFF] or with mouseclick to discover what it does.",
"Les potions peuvent apporter des soins vitaux ou des enchantements utiles, mais certaines ont des effets moins souhaitables. Vous pouvez boire cette potion avec $cmd[CMD_QUAFF] ou d’un clic de souris pour découvrir ce qu’elle fait."
],
[
"Items with unusual names are artefacts. Artefacts can have a number of special properties. Some unique artefacts (such as this cloak) are always identified and may have special properties that cannot be found anywhere else! Others are generated with a random selection of properties, and are unidentified until you step on top of them. Try equipping this cloak with $cmd[CMD_EQUIP] or mouseclick in the inventory panel.",
"Les objets aux noms inhabituels sont des artefacts. Les artefacts peuvent avoir de nombreuses propriétés spéciales. Certains artefacts uniques (comme cette cape) sont toujours identifiés et peuvent avoir des propriétés spéciales introuvables ailleurs ! D’autres sont générés avec une sélection aléatoire de propriétés, et ne sont pas identifiés tant que vous ne marchez pas dessus. Essayez d’équiper cette cape avec $cmd[CMD_EQUIP] ou d’un clic dans le panneau d’inventaire."
],
[
"You can evoke a wand with $cmd[CMD_EVOKE] or with mouseclick in the inventory panel.",
"Vous pouvez utiliser une baguette avec $cmd[CMD_EVOKE] ou d’un clic dans le panneau d’inventaire."
],
[
"Jewellery is put on with $cmd[CMD_EQUIP] or with mouseclick in the inventory panel.",
"Un bijou se met avec $cmd[CMD_EQUIP] ou d’un clic dans le panneau d’inventaire."
],
[
"This amulet would be very powerful if your character had a god to worship, but here and now, it's useless. You may want to drop it with $cmd[CMD_DROP] or by Shift-leftclicking it in the inventory panel.",
"Cette amulette serait très puissante si votre personnage avait un dieu à vénérer, mais ici et maintenant, elle est inutile. Vous voudrez peut-être la jeter avec $cmd[CMD_DROP] ou en faisant Maj-clic gauche dessus dans le panneau d’inventaire."
],
[
"To enter this shop, press $cmd[CMD_GO_UPSTAIRS] or click on your character. To buy items, select them with their hotkey, hit Enter and confirm with yes. You can switch to description mode with !.",
"Pour entrer dans cette boutique, appuyez sur $cmd[CMD_GO_UPSTAIRS] ou cliquez sur votre personnage. Pour acheter des objets, sélectionnez-les avec leur raccourci, appuyez sur Entrée et confirmez avec oui. Vous pouvez passer en mode description avec !."
],
[
"Remember, you can explore the level automatically with $cmd[CMD_EXPLORE] or by clicking the autoexplore command button in the command panel.",
"Souvenez-vous : vous pouvez explorer le niveau automatiquement avec $cmd[CMD_EXPLORE] ou en cliquant sur le bouton d’exploration automatique du panneau de commandes."
],
[
"Warning, this way leads to a difficult battle. You may choose to use what you've learned so far in a fight, or try to reach the other exit on the island. Either way, it may be a good idea to do some shopping, if you haven't already.",
"Attention, ce chemin mène à un combat difficile. Vous pouvez choisir d’utiliser ce que vous avez appris jusqu’ici dans un combat, ou essayer d’atteindre l’autre sortie de l’île. Dans tous les cas, c’est peut-être une bonne idée de faire quelques achats, si ce n’est pas déjà fait."
],
[
"In this lesson you're going to learn how to memorise and cast spells.",
"Dans cette leçon, vous allez apprendre à mémoriser et lancer des sorts."
],
[
"You can memorise a spell from your spell library with $cmd[CMD_MEMORISE_SPELL] or by clicking on the memorisation tab and selecting the spell tile. At experience level 1, only level 1 spells are available to you. This will change as you gain experience. To find new spells, find and pick up spellbooks, and the spells will be added to your library.",
"Vous pouvez mémoriser un sort de votre bibliothèque de sorts avec $cmd[CMD_MEMORISE_SPELL] ou en cliquant sur l’onglet de mémorisation puis sur la tuile du sort. Au niveau d’expérience 1, seuls les sorts de niveau 1 sont disponibles. Cela changera en gagnant de l’expérience. Pour trouver de nouveaux sorts, trouvez et ramassez des livres de sorts, et les sorts seront ajoutés à votre bibliothèque."
],
[
"To cast a spell, first memorise it with $cmd[CMD_MEMORISE_SPELL]. You can then cast it with $cmd[CMD_CAST_SPELL] or by clicking on the spell tile. Press $cmd[CMD_CAST_SPELL], then press ? to get a list of your spells.",
"Pour lancer un sort, mémorisez-le d’abord avec $cmd[CMD_MEMORISE_SPELL]. Vous pouvez ensuite le lancer avec $cmd[CMD_CAST_SPELL] ou en cliquant sur la tuile du sort. Appuyez sur $cmd[CMD_CAST_SPELL], puis sur ? pour obtenir la liste de vos sorts."
],
[
"Spells, like ammo, are shown in the quiver slot, so you can use $cmd[CMD_QUIVER_ITEM] to ready a spell in the quiver. Use $cmd[CMD_FIRE] or shift-tab to fire the currently quivered spell. Once you are out of magic points, retreat and rest to regain them with $cmd[CMD_REST] or by clicking the rest icon in the command panel.",
"Les sorts, comme les munitions, s’affichent dans l’emplacement du carquois : vous pouvez donc utiliser $cmd[CMD_QUIVER_ITEM] pour préparer un sort dans le carquois. Utilisez $cmd[CMD_FIRE] ou Maj-Tab pour lancer le sort actuellement dans le carquois. Quand vous n’avez plus de points de magie, reculez et reposez-vous pour les regagner avec $cmd[CMD_REST] ou en cliquant sur l’icône de repos du panneau de commandes."
],
[
"Put on this ring with $cmd[CMD_EQUIP] or by clicking it in the inventory panel, and then rest up to your new full potential.",
"Mettez cet anneau avec $cmd[CMD_EQUIP] ou en cliquant dessus dans le panneau d’inventaire, puis reposez-vous pour atteindre votre nouveau plein potentiel."
],
[
"Unlike most monsters, zombies and skeletons do not regenerate health. You can also attempt to re-cast the last spell you used by pressing Ctrl+leftclick on the monster.",
"Contrairement à la plupart des monstres, les zombies et les squelettes ne régénèrent pas leur santé. Vous pouvez aussi essayer de relancer le dernier sort utilisé en faisant Ctrl+clic gauche sur le monstre."
],
[
"To check your spell proficiency, press $cmd[CMD_DISPLAY_SPELLS] or mouseover over your memorised spells. Compare your spell failure rates before and after wearing this ring.",
"Pour vérifier votre maîtrise des sorts, appuyez sur $cmd[CMD_DISPLAY_SPELLS] ou passez la souris sur vos sorts mémorisés. Comparez vos taux d’échec avant et après avoir mis cet anneau."
],
[
"Mephitic Cloud is a level 3 spell, so you can't memorise it yet. To level up quickly, here are more training dummies — without stones to throw this time. At experience level 3, you'll be able to increase one of your stats — choosing Intelligence will help your spellcasting even further.",
"Nuage méphitique est un sort de niveau 3 : vous ne pouvez donc pas encore le mémoriser. Pour monter vite en niveau, voici d’autres mannequins d’entraînement — sans pierres à lancer cette fois. Au niveau d’expérience 3, vous pourrez augmenter l’une de vos caractéristiques — choisir l’Intelligence améliorera encore votre lancer de sorts."
],
[
"Don't forget to memorise your newly-available spell, by pressing $cmd[CMD_MEMORISE_SPELL] or by clicking on the memorisation tab and selecting the spell tile!",
"N’oubliez pas de mémoriser votre nouveau sort disponible, en appuyant sur $cmd[CMD_MEMORISE_SPELL] ou en cliquant sur l’onglet de mémorisation puis sur la tuile du sort !"
],
[
"Gaining experience levels and raising your Spellcasting skill gives you spell slots to spend on spells. You can also forget a memorised spell to make space for a new one by reading a scroll of amnesia. Read the scroll (with $cmd[CMD_READ] or by clicking on it), and then select the spell you want to forget. You can relearn forgotten spells from your spell library later, as long as you have spell slots available.",
"Gagner des niveaux d’expérience et améliorer votre compétence en Lancer de sorts vous donne des emplacements de sorts à dépenser. Vous pouvez aussi oublier un sort mémorisé pour faire de la place à un nouveau en lisant un parchemin d’amnésie. Lisez le parchemin (avec $cmd[CMD_READ] ou en cliquant dessus), puis choisissez le sort à oublier. Vous pourrez réapprendre les sorts oubliés depuis votre bibliothèque plus tard, tant que vous avez des emplacements disponibles."
],
[
"After forgetting one of your old spells to make space, memorise this new spell with $cmd[CMD_MEMORISE_SPELL] or by clicking on the memorisation tab and selecting the spell tile. Then try your new spell and summon some demonic allies!",
"Après avoir oublié un de vos anciens sorts pour faire de la place, mémorisez ce nouveau sort avec $cmd[CMD_MEMORISE_SPELL] ou en cliquant sur l’onglet de mémorisation puis sur la tuile du sort. Essayez ensuite votre nouveau sort et invoquez des alliés démoniaques !"
],
[
"Try to let your allies do the killing! If necessary, you can order them about with $cmd[CMD_SHOUT]. Before opening this gate, you may want to wait with $cmd[CMD_WAIT] until your allies have caught up with you. Your summons will only stick around for a short time, so don't wait too long, or summon some new ones before starting a fight.",
"Essayez de laisser vos alliés faire le travail ! Si nécessaire, vous pouvez leur donner des ordres avec $cmd[CMD_SHOUT]. Avant d’ouvrir cette grille, vous voudrez peut-être attendre avec $cmd[CMD_WAIT] que vos alliés vous aient rattrapé. Vos invocations ne restent que peu de temps : n’attendez donc pas trop longtemps, ou invoquez-en de nouvelles avant de commencer un combat."
],
[
"Heavy armour really hampers spellcasting. Try putting on that mail and shield (with $cmd[CMD_EQUIP] or by clicking on them), and compare your spellcasting failure rates with $cmd[CMD_DISPLAY_SPELLS] or by mouseovering your memorised spells. You can take armour off again with $cmd[CMD_UNEQUIP] or, again, via mouseclick.",
"Les armures lourdes gênent vraiment le lancer de sorts. Essayez de mettre cette cotte de mailles et ce bouclier (avec $cmd[CMD_EQUIP] ou en cliquant dessus), et comparez vos taux d’échec avec $cmd[CMD_DISPLAY_SPELLS] ou en passant la souris sur vos sorts mémorisés. Vous pouvez les retirer avec $cmd[CMD_UNEQUIP] ou, là encore, d’un clic de souris."
],
[
"Make sure you are at full health and magic points before entering a new area. If necessary, rest up with $cmd[CMD_REST] or by mouseclick in the command panel. You can only summon a limited number of allies at once from any given spell, so try to take advantage of a wide range of spells. For example, your summoned imps are resistant to poison, so you can cast Mephitic Cloud to fight alongside them without harming your allies.",
"Assurez-vous d’avoir toute votre santé et tous vos points de magie avant d’entrer dans une nouvelle zone. Si nécessaire, reposez-vous avec $cmd[CMD_REST] ou d’un clic dans le panneau de commandes. Vous ne pouvez invoquer qu’un nombre limité d’alliés à la fois avec un même sort : essayez donc de profiter d’un large éventail de sorts. Par exemple, vos diablotins invoqués résistent au poison : vous pouvez lancer Nuage méphitique pour combattre à leurs côtés sans blesser vos alliés."
],
[
"In this lesson you're going to learn about gods and how to use their powers.",
"Dans cette leçon, vous allez découvrir les dieux et comment utiliser leurs pouvoirs."
],
[
"Up ahead is an altar to Trog the Wrathful! Trog is just one of many gods. In a real game, you can check $cmd[CMD_DISPLAY_OVERMAP] or click the dungeon overmap button in the command panel for a list of all altars and other interesting features found so far.",
"Droit devant, un autel de Trog le Courroucé ! Trog n’est qu’un dieu parmi beaucoup d’autres. Dans une vraie partie, vous pouvez consulter $cmd[CMD_DISPLAY_OVERMAP] ou cliquer sur le bouton de la vue d’ensemble du donjon dans le panneau de commandes pour obtenir la liste de tous les autels et autres lieux intéressants découverts jusqu’ici."
],
[
"You can pray on an altar with $cmd[CMD_GO_DOWNSTAIRS] (or by left clicking on your character) to get an idea what a god offers you, and to join the faith. If you press ! or rightclick on the religion screen, you can see a more detailed description. Confirm your choice with J or Enter.",
"Vous pouvez prier sur un autel avec $cmd[CMD_GO_DOWNSTAIRS] (ou en cliquant avec le bouton gauche sur votre personnage) pour savoir ce qu’un dieu vous offre, et rejoindre sa foi. Si vous appuyez sur ! ou faites un clic droit sur l’écran de religion, vous obtenez une description plus détaillée. Confirmez votre choix avec J ou Entrée."
],
[
"Have a look at your current religious standing with $cmd[CMD_DISPLAY_RELIGION] (or via the religion button in the command panel, or by Shift-rightclicking on the player tile). Again, pressing ! or rightclicking will bring up a more detailed description of your god.",
"Jetez un œil à votre situation religieuse actuelle avec $cmd[CMD_DISPLAY_RELIGION] (ou via le bouton de religion du panneau de commandes, ou par un Maj-clic droit sur la tuile du joueur). Là encore, appuyer sur ! ou faire un clic droit affiche une description plus détaillée de votre dieu."
],
[
"Against particularly tough foes, you may want to use Trog's Berserk power with $cmd[CMD_USE_ABILITY] or via the command panel.",
"Contre des adversaires particulièrement coriaces, vous voudrez peut-être utiliser le pouvoir de Berserk de Trog avec $cmd[CMD_USE_ABILITY] ou via le panneau de commandes."
],
[
"A berserker rage is truly exhausting. After it ends, you cannot berserk again for a short while and are slowed. It's best to rest with $cmd[CMD_REST] (or via the command panel) until you feel fit again.",
"Une rage berserk est vraiment épuisante. Une fois terminée, vous ne pouvez plus entrer en berserk pendant un moment et vous êtes ralenti. Le mieux est de vous reposer avec $cmd[CMD_REST] (ou via le panneau de commandes) jusqu’à ce que vous soyez en forme."
]
];
    for (const [en, fr] of TUTO) {
        const cmds = en.match(/\$cmd\[[A-Z_]+\]/g) || [];
        let i = 0;
        const cle = en.replace(/\$cmd\[[A-Z_]+\]/g, () => "{K}");
        const sortie = fr.replace(/\$cmd\[[A-Z_]+\]/g, c => "{x" + (cmds.indexOf(c) + 1) + "}");
        T[cle] = sortie;
    }
})();
