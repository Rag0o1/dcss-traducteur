// Grammaire des graffitis et des noms de couleurs (graffiti.txt, colourname.txt) : [anglais, français] par production.
// Généré par outils/grammaire_graffitis.py à partir de outils/graffitis_fr.txt. Moteur : moteur/graffitis.js.
globalThis.DCSS_GRAFFITIS_REGLES = {
"_graffiti_author_any_": [
[
"@ancestor name@",
"@ancestor name@"
],
[
"@_graffiti_author_orc_@",
"@_graffiti_author_orc_@"
],
[
"@_graffiti_author_bland_@",
"@_graffiti_author_bland_@"
],
[
"@RANDGEN@",
"@RANDGEN@"
],
[
"@_rare_graffiti_author_any_@",
"@_rare_graffiti_author_any_@"
]
],
"_graffiti_author_any_changeable_": [
[
"@ancestor name@",
"@ancestor name@"
],
[
"@_graffiti_author_bland_@",
"@_graffiti_author_bland_@"
],
[
"@RANDGEN@",
"@RANDGEN@"
]
],
"_graffiti_author_any_changeable_non-randgen_": [
[
"@ancestor name@",
"@ancestor name@"
],
[
"@_graffiti_author_bland_@",
"@_graffiti_author_bland_@"
]
],
"_graffiti_author_any_non-orc_": [
[
"@ancestor name@",
"@ancestor name@"
],
[
"@_graffiti_author_bland_@",
"@_graffiti_author_bland_@"
],
[
"@RANDGEN@",
"@RANDGEN@"
],
[
"@_rare_graffiti_author_any_non-orc_@",
"@_rare_graffiti_author_any_non-orc_@"
]
],
"_graffiti_author_bland_": [
[
"@bland name@",
"@bland name@"
],
[
"@bland name@ (not that one)",
"@bland name@ (pas celui-là)"
],
[
"@bland name@ (the other one)",
"@bland name@ (l’autre)"
],
[
"@bland name@ (yes, that one)",
"@bland name@ (oui, celui-là)"
]
],
"_graffiti_author_orc_": [
[
"@any orc name@ the orc",
"@any orc name@ l’orc"
]
],
"_rare_graffiti_author_any_": [
[
"@_rare_graffiti_author_ordinary_@",
"@_rare_graffiti_author_ordinary_@"
],
[
"@_rare_graffiti_author_orc_@",
"@_rare_graffiti_author_orc_@"
],
[
"@_rare_graffiti_author_title_@",
"@_rare_graffiti_author_title_@"
],
[
"@_rare_graffiti_author_god_@",
"@_rare_graffiti_author_god_@"
]
],
"_rare_graffiti_author_any_non-orc_": [
[
"@_rare_graffiti_author_ordinary_@",
"@_rare_graffiti_author_ordinary_@"
],
[
"@_rare_graffiti_author_title_@",
"@_rare_graffiti_author_title_@"
],
[
"@_rare_graffiti_author_god_@",
"@_rare_graffiti_author_god_@"
]
],
"_rare_graffiti_author_god_": [
[
"Woog the god",
"Woog le dieu"
]
],
"_rare_graffiti_author_orc_": [
[
"Spartorcus the orc",
"Spartorcus l’orc"
]
],
"_rare_graffiti_author_ordinary_": [
[
"Durwent the kobold",
"Durwent le kobold"
],
[
"Zlaz the goblin",
"Zlaz le gobelin"
],
[
"Fneeb the oni",
"Fneeb l’oni"
],
[
"Vethion the elf",
"Vethion l’elfe"
],
[
"Frobof the imp",
"Frobof le diablotin"
]
],
"_rare_graffiti_author_title_": [
[
"Kilroy",
"Kilroy"
],
[
"Garc the Great",
"Garc le Grand"
],
[
"Plog the Peerless",
"Plog l’Incomparable"
],
[
"Dead Wendell",
"Wendell le Mort"
],
[
"Lady Dreamflight",
"Dame Ailerêve"
]
],
"_pattern_type_": [
[
"@any_colour_pattern@",
"@any_colour_pattern@"
],
[
"@any_glowing_colour_pattern@",
"@any_glowing_colour_pattern@"
]
],
"_writing_adj_": [
[
"angular",
"anguleux/anguleuse"
],
[
"blocky",
"carré/carrée"
],
[
"bold",
"gras/grasse"
],
[
"curvy",
"arrondi/arrondie"
],
[
"flowing",
"fluide"
],
[
"jagged",
"dentelé/dentelée"
],
[
"pulsating",
"pulsant/pulsante"
],
[
"shifting",
"changeant/changeante"
],
[
"sinuous",
"sinueux/sinueuse"
],
[
"sloping",
"penché/penchée"
],
[
"spidery",
"filiforme"
],
[
"swirling",
"tourbillonnant/tourbillonnante"
],
[
"throbbing",
"palpitant/palpitante"
],
[
"twitching",
"frémissant/frémissante"
],
[
"writhing",
"contorsionné/contorsionnée"
]
],
"_writing_noun_": [
[
"binary code",
"code binaire{ms}"
],
[
"characters",
"caractères{mp}"
],
[
"cuneiform",
"cunéiformes{mp}"
],
[
"figures",
"figures{fp}"
],
[
"glyphs",
"glyphes{mp}"
],
[
"hieroglyphics",
"hiéroglyphes{mp}"
],
[
"ideograms",
"idéogrammes{mp}"
],
[
"letters",
"lettres{fp}"
],
[
"print-out",
"listing{ms}"
],
[
"runes",
"runes{fp}"
],
[
"scrawl",
"gribouillis{mp}"
],
[
"sigils",
"sceaux magiques{mp}"
],
[
"symbols",
"symboles{mp}"
],
[
"text",
"texte{ms}"
],
[
"writing",
"écriture{fs}"
]
],
"_writing_style_": [
[
"@any_colour@",
"@any_colour@"
],
[
"@_writing_adj_@ @any_colour@",
"@any_colour@ @_writing_adj_@"
],
[
"@any_glowing_colour@",
"@any_glowing_colour@"
]
],
"_writing_type_": [
[
"@_writing_style_@ @_writing_noun_@",
"@_writing_noun_@ @_writing_style_@"
]
],
"_graffiti_type_": [
[
"@_writing_style_@ graffiti",
"graffitis{mp} @_writing_style_@"
]
],
"_graffiti_type_with_signature_maybe_": [
[
"@_graffiti_type_@",
"@_graffiti_type_@"
],
[
"@_graffiti_type_@ signed by @_graffiti_author_any_@",
"@_graffiti_type_@ signés par @_graffiti_author_any_@"
]
],
"_graffiti_type_with_signature_maybe_non-orc_": [
[
"@_graffiti_type_@",
"@_graffiti_type_@"
],
[
"@_graffiti_type_@ signed by @_graffiti_author_any_non-orc_@",
"@_graffiti_type_@ signés par @_graffiti_author_any_non-orc_@"
]
],
"_graffiti_type_with_signature_maybe_orc_": [
[
"@_graffiti_type_@",
"@_graffiti_type_@"
],
[
"@_graffiti_type_@ signed by @_graffiti_author_orc_@",
"@_graffiti_type_@ signés par @_graffiti_author_orc_@"
]
],
"_graffiti_advertisement_": [
[
"advertising a meeting @_graffiti_mass_meeting_ordinary_@",
"annonçant une réunion @_graffiti_mass_meeting_ordinary_@"
],
[
"advertising a meeting @_graffiti_mass_meeting_religious_@",
"annonçant une réunion @_graffiti_mass_meeting_religious_@"
],
[
"advertising a shop in the dungeon with [cheap|exclusive|expensive|quality|rare|useful] goods",
"annonçant une boutique du donjon aux marchandises [bon marché|exclusives|chères|de qualité|rares|utiles]"
],
[
"advertising @_graffiti_class_any_@",
"annonçant @_graffiti_class_any_@"
],
[
"advertising a meet-up with @_graffiti_author_any_@ to learn how to survive in the dungeon",
"annonçant une rencontre avec @_graffiti_author_any_@ pour apprendre à survivre dans le donjon"
],
[
"advertising a meet-up with @_graffiti_author_any_@ for a good time",
"annonçant une rencontre avec @_graffiti_author_any_@ pour passer du bon temps"
],
[
"advertising the very paint used to make it",
"annonçant la peinture même utilisée pour les réaliser"
]
],
"_graffiti_changed_names_": [
[
"@_graffiti_author_any_changeable_@ has changed names and now goes by @_graffiti_author_any_changeable_@",
"@_graffiti_author_any_changeable_@ a changé de nom et s’appelle désormais @_graffiti_author_any_changeable_@"
],
[
"@_graffiti_author_orc_@ has changed names and now goes by @_graffiti_author_orc_@",
"@_graffiti_author_orc_@ a changé de nom et s’appelle désormais @_graffiti_author_orc_@"
],
[
"@_rare_graffiti_author_any_@ has passed on the name to someone else worthy of it",
"@_rare_graffiti_author_any_@ a transmis son nom à quelqu’un d’autre qui en est digne"
],
[
"@_graffiti_author_any_changeable_non-randgen_@ has changed names due to Xom's influence and now goes by @RANDGEN@",
"@_graffiti_author_any_changeable_non-randgen_@ a changé de nom sous l’influence de Xom et s’appelle désormais @RANDGEN@"
]
],
"_graffiti_changed_or_compared_religions_": [
[
"@_graffiti_author_any_@ has abandoned @random_god@",
"@_graffiti_author_any_@ a abandonné @random_god@"
],
[
"@_graffiti_author_any_@ has converted away from @random_god@",
"@_graffiti_author_any_@ s’est détourné de @random_god@"
],
[
"@_graffiti_author_any_@ has converted to @random_god@",
"@_graffiti_author_any_@ s’est converti à @random_god@"
],
[
"@_graffiti_author_any_@ is @_graffiti_religion_better_or_worse_@ than @_graffiti_author_any_@",
"@_graffiti_author_any_@ est @_graffiti_religion_better_or_worse_@ que @_graffiti_author_any_@"
],
[
"@_graffiti_author_any_@ is secretly an atheist",
"@_graffiti_author_any_@ est en secret athée"
],
[
"@_graffiti_author_any_@ is secretly not an atheist",
"@_graffiti_author_any_@ n’est en secret pas athée"
],
[
"@_graffiti_author_any_@ is secretly @random_god@",
"@_graffiti_author_any_@ est en secret @random_god@"
],
[
"@_graffiti_author_any_@ secretly worships Zin",
"@_graffiti_author_any_@ vénère en secret Zin"
],
[
"@_graffiti_author_any_@ secretly worships Zin instead of @random_god_chaotic@",
"@_graffiti_author_any_@ vénère en secret Zin plutôt que @random_god_chaotic@"
],
[
"@_graffiti_author_any_@ secretly worships @random_god_chaotic@",
"@_graffiti_author_any_@ vénère en secret @random_god_chaotic@"
],
[
"@_graffiti_author_any_@ secretly worships @random_god_chaotic@ instead of Zin",
"@_graffiti_author_any_@ vénère en secret @random_god_chaotic@ plutôt que Zin"
],
[
"@_graffiti_author_any_@ secretly worships @random_god_good@",
"@_graffiti_author_any_@ vénère en secret @random_god_good@"
],
[
"@_graffiti_author_any_@ secretly worships @random_god_good@ instead of @random_god_evil@",
"@_graffiti_author_any_@ vénère en secret @random_god_good@ plutôt que @random_god_evil@"
],
[
"@_graffiti_author_any_@ secretly worships @random_god_evil@",
"@_graffiti_author_any_@ vénère en secret @random_god_evil@"
],
[
"@_graffiti_author_any_@ secretly worships @random_god_evil@ instead of @random_god_good@",
"@_graffiti_author_any_@ vénère en secret @random_god_evil@ plutôt que @random_god_good@"
],
[
"@_graffiti_author_any_@ is secretly @_graffiti_hailed_god_@",
"@_graffiti_author_any_@ est en secret @_graffiti_hailed_god_@"
],
[
"@_graffiti_author_any_@ secretly worships @_graffiti_hailed_god_@",
"@_graffiti_author_any_@ vénère en secret @_graffiti_hailed_god_@"
]
],
"_graffiti_class_any_": [
[
"@_graffiti_class_remedial_@",
"@_graffiti_class_remedial_@"
],
[
"@_graffiti_class_master_@",
"@_graffiti_class_master_@"
]
],
"_graffiti_class_master_": [
[
"a master class on excavation taught by formicids",
"un cours magistral d’excavation donné par des formicides"
],
[
"a master class on insults taught by [demons|imps]",
"un cours magistral d’insultes donné par des [démons|diablotins]"
],
[
"a master class on the many uses of giant clubs taught by [ogres|oni]",
"un cours magistral sur les nombreux usages des gros gourdins donné par des [ogres|oni]"
],
[
"a master class on Unarmed Combat taught by felids",
"un cours magistral de Combat à mains nues donné par des félins"
],
[
"a master class on [art|calligraphy] taught by anonymous graffiti authors",
"un cours magistral d’[art|calligraphie] donné par des auteurs de graffitis anonymes"
]
],
"_graffiti_class_remedial_": [
[
"a Remedial @random_skill@ class taught by @_graffiti_professor_@",
"un cours de rattrapage de @random_skill@ donné par @_graffiti_professor_@"
],
[
"a Remedial @random_skill_magic@ class taught by the @_graffiti_professor_magic_type_@ @_graffiti_professor_@",
"un cours de rattrapage de @random_skill_magic@ donné par le @_graffiti_professor_magic_type_@ @_graffiti_professor_@"
],
[
"a Remedial @random_skill_mundane@ class taught by the @_graffiti_professor_mundane_type_@ @_graffiti_professor_@",
"un cours de rattrapage de @random_skill_mundane@ donné par le @_graffiti_professor_mundane_type_@ @_graffiti_professor_@"
],
[
"a Remedial Evocations class taught by the @_graffiti_professor_evocations_type_@ @_graffiti_professor_@",
"un cours de rattrapage d’Évocations donné par l’@_graffiti_professor_evocations_type_@ @_graffiti_professor_@"
],
[
"a Remedial Invocations class taught by the @_graffiti_professor_invocations_type_@ @_graffiti_professor_@",
"un cours de rattrapage d’Invocations donné par le @_graffiti_professor_invocations_type_@ @_graffiti_professor_@"
],
[
"a Remedial Shapeshifting class taught by the @_graffiti_professor_shapeshifting_type_@ @_graffiti_professor_@",
"un cours de rattrapage de Changeforme donné par le @_graffiti_professor_shapeshifting_type_@ @_graffiti_professor_@"
],
[
"a Remedial Necromancy class taught by the @_graffiti_professor_necromancy_type_@ @_graffiti_professor_@",
"un cours de rattrapage de Nécromancie donné par le @_graffiti_professor_necromancy_type_@ @_graffiti_professor_@"
],
[
"a Remedial @random_skill_magic@ class taught by the @_graffiti_professor_necromancy_type_@ @_graffiti_professor_@",
"un cours de rattrapage de @random_skill_magic@ donné par le @_graffiti_professor_necromancy_type_@ @_graffiti_professor_@"
]
],
"_graffiti_duplicate_": [
[
"a duplicate",
"un double"
],
[
"a duplicate indistinguishable from the original",
"un double impossible à distinguer de l’original"
],
[
"an impostor",
"un imposteur"
],
[
"an impostor from another reality",
"un imposteur venu d’une autre réalité"
],
[
"a shapeshifter",
"un métamorphe"
]
],
"_graffiti_fight_": [
[
"of an argument between @_graffiti_author_any_@ and @_graffiti_author_any_@",
"d’une dispute entre @_graffiti_author_any_@ et @_graffiti_author_any_@"
],
[
"of a three-way argument between @_graffiti_author_any_@, @_graffiti_author_any_@, and @_graffiti_author_any_@",
"d’une dispute à trois entre @_graffiti_author_any_@, @_graffiti_author_any_@ et @_graffiti_author_any_@"
],
[
"of a fight between [berserkers|Trog worshippers] and erythrospite sufferers over the true meaning of blood rage",
"d’une bagarre entre [des berserkers|des adorateurs de Trog] et des victimes d’érythrospite sur le véritable sens de la rage sanguinaire"
],
[
"of a fight between [\"artists\"|artists|Dithmenos worshippers] and [death knights|death mages|Yredelemnul worshippers|necromancers] over whether something was a shadow or a shadowghast",
"d’une bagarre entre [des « artistes »|des artistes|des adorateurs de Dithmenos] et [des chevaliers de la mort|des mages de la mort|des adorateurs de Yredelemnul|des nécromanciens] pour savoir si quelque chose était une ombre ou un spectre d’ombre"
]
],
"_graffiti_hailed_god_": [
[
"Xom",
"Xom"
],
[
"an unknown god",
"un dieu inconnu"
],
[
"@_rare_graffiti_author_god_@",
"@_rare_graffiti_author_god_@"
],
[
"the power of cheese",
"le pouvoir du fromage"
],
[
"a wagon full of pancakes",
"un chariot plein de crêpes"
]
],
"_graffiti_happened_reason_": [
[
"an accident",
"un accident"
],
[
"a coincidence",
"une coïncidence"
],
[
"a coincidence but @_graffiti_author_any_@ doesn't trust coincidences",
"une coïncidence mais @_graffiti_author_any_@ ne croit pas aux coïncidences"
],
[
"a cover-up",
"une machination"
],
[
"a farce",
"une farce"
],
[
"a frame-up",
"un coup monté"
],
[
"a mistake",
"une erreur"
],
[
"a travesty",
"une parodie de justice"
],
[
"a warning to others",
"un avertissement pour les autres"
],
[
"against the will of the gods",
"contraire à la volonté des dieux"
],
[
"completely random",
"complètement aléatoire"
],
[
"deliberate",
"délibéré"
],
[
"deserved",
"mérité"
],
[
"just",
"juste"
],
[
"necessary",
"nécessaire"
],
[
"no accident",
"pas un accident"
],
[
"no mistake",
"pas une erreur"
],
[
"part of a larger plot",
"partie d’un complot plus vaste"
],
[
"the work of the \"Plog\" Conspiracy",
"l’œuvre de la Conspiration « Plog »"
],
[
"self-inflicted",
"infligé à soi-même"
],
[
"the will of the gods",
"la volonté des dieux"
],
[
"uncalled for",
"injustifié"
],
[
"undeserved",
"immérité"
],
[
"unjust",
"injuste"
],
[
"unnecessary",
"inutile"
],
[
"unthinkable",
"impensable"
]
],
"_graffiti_image_": [
[
"of [a goblin|a kobold|a spriggan] with its head poking out of a tunnel",
"d’[un gobelin|un kobold|un spriggan] qui passe la tête hors d’un tunnel"
],
[
"of [a dragon|an elephant|a yak] trampling over all in its path",
"d’[un dragon|un éléphant|un yak] piétinant tout sur son passage"
],
[
"of [a gnoll|a human|an orc] brandishing a nasty-looking weapon",
"d’[un gnoll|un humain|un orc] brandissant une arme d’aspect menaçant"
],
[
"of [an ogre|an oni|a troll] ripping one of its enemies in half",
"d’[un ogre|un oni|un troll] arrachant l’un de ses ennemis en deux"
],
[
"of [a deep elf|a lich|a tengu] shooting a blast of magic",
"d’[un elfe profond|une liche|un tengu] lançant un éclair de magie"
],
[
"of a felid hanging from a tree branch",
"d’un félin suspendu à une branche d’arbre"
],
[
"of a demon grinning evilly",
"d’un démon qui sourit méchamment"
],
[
"of an eggplant just sitting there",
"d’une aubergine qui reste là, tout simplement"
],
[
"that looks like nothing you recognise",
"qui ne ressemble à rien de ce que vous connaissez"
]
],
"_graffiti_life_or_death_": [
[
"deserves death",
"mérite la mort"
],
[
"deserves undeath",
"mérite la non-vie"
],
[
"deserves life",
"mérite la vie"
],
[
"is dead",
"est mort"
],
[
"is undead",
"est un mort-vivant"
],
[
"lives",
"vit"
]
],
"_graffiti_loves_or_hates_": [
[
"curses",
"maudit"
],
[
"defends",
"défend"
],
[
"hates",
"déteste"
],
[
"insults",
"insulte"
],
[
"loves",
"aime"
],
[
"praises",
"loue"
]
],
"_graffiti_mass_meeting_ordinary_": [
[
"of an athletic club playing [cards|darts|hammer throw|javelin throw|Whack-A-Rock-Fish]",
"d’un club d’athlétisme jouant [aux cartes|aux fléchettes|au lancer de marteau|au lancer de javelot|à Tape-sur-le-Poisson-Roche]"
],
[
"of an artificer club [testing|tinkering with] [devices|evokables|wands]",
"d’un club d’artificiers [testant|bricolant] [des dispositifs|des objets évocables|des baguettes]"
],
[
"of a support group for veterans of the surface wars",
"d’un groupe de soutien pour les vétérans des guerres de la surface"
],
[
"of a group of [bakers|fruit vendors|meat vendors|shopkeepers] peddling their wares in the dungeon",
"d’un groupe de [boulangers|marchands de fruits|bouchers|commerçants] vendant leurs produits dans le donjon"
],
[
"of a group of [apiarists|hive talisman users] discussing the [antics|emotional state|health] of their bees",
"d’un groupe d’[apiculteurs|utilisateurs de talisman de ruche] discutant [des facéties|de l’état émotionnel|de la santé] de leurs abeilles"
],
[
"of a group of rich people discussing how to make more money",
"d’un groupe de gens riches discutant des moyens de gagner plus d’argent"
],
[
"of a group of [knights|veterans|warlords|warriors] practising barely-restrained combat",
"d’un groupe de [chevaliers|vétérans|seigneurs de guerre|guerriers] s’entraînant à un combat à peine retenu"
],
[
"of a group of [knights|veterans|warlords|warriors] practising solo combat",
"d’un groupe de [chevaliers|vétérans|seigneurs de guerre|guerriers] s’entraînant au combat en solo"
],
[
"of a group of [mages|sorcerers|spellcasters|wizards] practising [eclectic|esoteric] magic",
"d’un groupe de [mages|sorciers|lanceurs de sorts|magiciens] pratiquant la magie [éclectique|ésotérique]"
],
[
"of a group of [mages|sorcerers|spellcasters|wizards] practising [cataclysmic|destructive] magic",
"d’un groupe de [mages|sorciers|lanceurs de sorts|magiciens] pratiquant la magie [cataclysmique|destructrice]"
],
[
"of a group of [death mages|necromancers] practising [necromancy|bringing things to unlife]",
"d’un groupe de [mages de la mort|nécromanciens] pratiquant [la nécromancie|l’art de ramener les choses à la non-vie]"
],
[
"of a group of philosophers discussing [perfection|the nature of time] for who knows how long",
"d’un groupe de philosophes discutant [de la perfection|de la nature du temps] depuis on ne sait combien de temps"
],
[
"of a group of [masochists|sadists] holding a pain endurance contest",
"d’un groupe de [masochistes|sadiques] organisant un concours d’endurance à la douleur"
],
[
"of a group of gardeners showing off their green thumbs",
"d’un groupe de jardiniers exhibant leur main verte"
],
[
"of a group of [bards|historians|lorekeepers] sharing glorious tales of their ancestors",
"d’un groupe de [bardes|historiens|gardiens du savoir] partageant de glorieux récits de leurs ancêtres"
],
[
"of a group of revellers throwing a wild dance party",
"d’un groupe de fêtards organisant une soirée dansante endiablée"
],
[
"of a group of [\"artists\" holding a \"shadow play\"|artists holding a shadow play]",
"d’un groupe d’[« artistes » tenant un « théâtre d’ombres »|artistes tenant un théâtre d’ombres]"
],
[
"of a group of monks practising martial [attacks|movements]",
"d’un groupe de moines s’entraînant à [des attaques|des mouvements] martiaux"
],
[
"of a group of potion makers practising healing others",
"d’un groupe de fabricants de potions s’entraînant à soigner les autres"
],
[
"of a group of ascetics despising their bodies and discussing sacrifices",
"d’un groupe d’ascètes méprisant leur corps et discutant de sacrifices"
],
[
"of a group of [crusaders|moralists] [discussing|opposing] evil in the world",
"d’un groupe de [croisés|moralistes] [discutant du|s’opposant au] mal dans le monde"
],
[
"of a varied group of people discussing their experiences in the Abyss",
"d’un groupe varié de gens discutant de leurs expériences dans l’Abysse"
]
],
"_graffiti_mass_meeting_religious_": [
[
"of a [sharper club|group of Nemelex Xobeh worshippers] playing cards the way Nemelex Xobeh intended",
"d’un [club de tricheurs|groupe d’adorateurs de Nemelex Xobeh] jouant aux cartes comme Nemelex Xobeh l’entendait"
],
[
"of a group of Zin worshippers supporting the Axioms of Law",
"d’un groupe d’adorateurs de Zin soutenant les Axiomes de la Loi"
],
[
"of a group of [chaos knights|Xom worshippers] contemplating the Divine Madness",
"d’un groupe de [chevaliers du chaos|adorateurs de Xom] contemplant la Folie Divine"
],
[
"of a group of [death knights|Yredelemnul worshippers] embracing the Inexorable Grip",
"d’un groupe de [chevaliers de la mort|adorateurs de Yredelemnul] embrassant l’Étreinte Inexorable"
],
[
"of a group of Gozag worshippers discussing how to make more money",
"d’un groupe d’adorateurs de Gozag discutant des moyens de gagner plus d’argent"
],
[
"of a group of [berserkers|Trog worshippers] practising barely-restrained combat",
"d’un groupe de [berserkers|adorateurs de Trog] s’entraînant à un combat à peine retenu"
],
[
"of a group of Okawaru worshippers practising solo combat",
"d’un groupe d’adorateurs d’Okawaru s’entraînant au combat en solo"
],
[
"of a group of Sif Muna worshippers practising [eclectic|esoteric] magic",
"d’un groupe d’adorateurs de Sif Muna pratiquant la magie [éclectique|ésotérique]"
],
[
"of a group of Vehumet worshippers practising [cataclysmic|destructive] magic",
"d’un groupe d’adorateurs de Vehumet pratiquant la magie [cataclysmique|destructrice]"
],
[
"of a group of Kikubaaqudgha worshippers practising [necromancy|bringing things to unlife]",
"d’un groupe d’adorateurs de Kikubaaqudgha pratiquant [la nécromancie|l’art de ramener les choses à la non-vie]"
],
[
"of a group of Cheibriados worshippers discussing [perfection|the nature of time] for who knows how long",
"d’un groupe d’adorateurs de Cheibriados discutant [de la perfection|de la nature du temps] depuis on ne sait combien de temps"
],
[
"of a group of Makhleb worshippers holding a pain endurance contest",
"d’un groupe d’adorateurs de Makhleb organisant un concours d’endurance à la douleur"
],
[
"of a group of Fedhas worshippers showing off their green thumbs",
"d’un groupe d’adorateurs de Fedhas exhibant leur main verte"
],
[
"of a group of Hepliaklqana worshippers sharing glorious tales of their ancestors",
"d’un groupe d’adorateurs d’Hepliaklqana partageant de glorieux récits de leurs ancêtres"
],
[
"of a group of Uskayaw worshippers throwing a wild dance party",
"d’un groupe d’adorateurs d’Uskayaw organisant une soirée dansante endiablée"
],
[
"of a group of Dithmenos worshippers holding a [\"shadow play\"|shadow play]",
"d’un groupe d’adorateurs de Dithmenos tenant un [« théâtre d’ombres »|théâtre d’ombres]"
],
[
"of a group of worshippers of the Wu Jian Council practising martial [attacks|movements]",
"d’un groupe d’adorateurs du Conseil Wu Jian s’entraînant à [des attaques|des mouvements] martiaux"
],
[
"of a group of Qazlal worshippers changing the weather indoors",
"d’un groupe d’adorateurs de Qazlal changeant le temps à l’intérieur"
],
[
"of a group of Elyvilon worshippers practising healing others",
"d’un groupe d’adorateurs d’Elyvilon s’entraînant à soigner les autres"
],
[
"of a group of Ashenzari worshippers practising scrying on things",
"d’un groupe d’adorateurs d’Ashenzari s’entraînant à scruter les choses"
],
[
"of a group of Ru worshippers despising their bodies and discussing sacrifices",
"d’un groupe d’adorateurs de Ru méprisant leur corps et discutant de sacrifices"
],
[
"of a group of worshippers of the Shining One [discussing|opposing] evil in the world",
"d’un groupe d’adorateurs du Shining One [discutant du|s’opposant au] mal dans le monde"
],
[
"of a group of [Lugonu worshippers|mad acolytes of Lugonu] discussing their experiences in the Abyss",
"d’un groupe d’[adorateurs de Lugonu|acolytes fous de Lugonu] discutant de leurs expériences dans l’Abysse"
],
[
"of a group of orcs promoting Beogh's word",
"d’un groupe d’orcs faisant la promotion de la parole de Beogh"
]
],
"_graffiti_obscenities_": [
[
"of various obscenities",
"de diverses obscénités"
],
[
"of some very imaginative obscenities you've never seen before",
"de très imaginatives obscénités que vous n’avez jamais vues"
]
],
"_graffiti_professor_": [
[
"@_graffiti_author_any_changeable_@",
"@_graffiti_author_any_changeable_@"
],
[
"@_graffiti_author_orc_@",
"@_graffiti_author_orc_@"
],
[
"@_rare_graffiti_author_any_@ (supposedly)",
"@_rare_graffiti_author_any_@ (soi-disant)"
]
],
"_graffiti_professor_evocations_type_": [
[
"artificer",
"artificier"
],
[
"tinkerer",
"bricoleur"
]
],
"_graffiti_professor_invocations_type_": [
[
"cleric",
"clerc"
],
[
"high priest",
"grand prêtre"
],
[
"priest",
"prêtre"
],
[
"theologian",
"théologien"
]
],
"_graffiti_professor_magic_type_": [
[
"mage",
"mage"
],
[
"sorcerer",
"sorcier"
],
[
"spellcaster",
"lanceur de sorts"
],
[
"wizard",
"magicien"
]
],
"_graffiti_professor_mundane_type_": [
[
"knight",
"chevalier"
],
[
"veteran",
"vétéran"
],
[
"warlord",
"seigneur de guerre"
],
[
"warrior",
"guerrier"
]
],
"_graffiti_professor_necromancy_type_": [
[
"death mage",
"mage de la mort"
],
[
"necromancer",
"nécromancien"
]
],
"_graffiti_professor_shapeshifting_type_": [
[
"shapeshifter",
"métamorphe"
],
[
"talismancer",
"talismancien"
]
],
"_graffiti_relative_or_quality_": [
[
"all associates",
"tous les associés"
],
[
"the bloodline",
"la lignée"
],
[
"the child",
"l’enfant"
],
[
"the children",
"les enfants"
],
[
"the clan",
"le clan"
],
[
"the dexterity",
"la dextérité"
],
[
"the entire species",
"toute l’espèce"
],
[
"the family",
"la famille"
],
[
"the friend",
"l’ami"
],
[
"the friends",
"les amis"
],
[
"the god",
"le dieu"
],
[
"the intelligence",
"l’intelligence"
],
[
"the lover",
"l’amant"
],
[
"the lovers",
"les amants"
],
[
"the mate",
"le compagnon"
],
[
"the mates",
"les compagnons"
],
[
"the parent",
"le parent"
],
[
"the parents",
"les parents"
],
[
"the personality",
"la personnalité"
],
[
"the spouse",
"l’époux"
],
[
"the spouses",
"les époux"
],
[
"the strength",
"la force"
]
],
"_graffiti_religion_better_or_worse_": [
[
"less of a believer",
"moins croyant"
],
[
"more of a believer",
"plus croyant"
],
[
"a better atheist",
"meilleur athée"
],
[
"a worse atheist",
"pire athée"
]
],
"_graffiti_religion_non-orc_": [
[
"lauding Zin and Zin's laws",
"louant Zin et les lois de Zin"
],
[
"lauding Zin and talking about how following Zin's laws is essential",
"louant Zin et expliquant qu’il est essentiel de suivre les lois de Zin"
],
[
"lauding Zin and talking about how those who break Zin's laws deserve punishment",
"louant Zin et expliquant que ceux qui enfreignent les lois de Zin méritent d’être punis"
],
[
"lauding Zin but warning that putting graffiti on surfaces is often unlawful",
"louant Zin mais avertissant qu’écrire des graffitis sur les surfaces est souvent illégal"
]
],
"_graffiti_religion_not_non-orc_or_orc_": [
[
"[glorifying|blaspheming] the gods",
"[glorifiant|blasphémant contre] les dieux"
],
[
"glorifying @random_god@ and blaspheming @random_god@",
"glorifiant @random_god@ et blasphémant contre @random_god@"
],
[
"revering Xom and the randomness of everything",
"révérant Xom et le caractère aléatoire de toute chose"
],
[
"delighting in Nemelex Xobeh and whatever the next card deck brings",
"se délectant de Nemelex Xobeh et de ce que le prochain jeu de cartes apportera"
],
[
"extolling Yredelemnul and all things unholy",
"exaltant Yredelemnul et tout ce qui est impie"
],
[
"commending Gozag and talking about how enough gold can buy anything",
"recommandant Gozag et expliquant qu’assez d’or peut tout acheter"
],
[
"praising Trog and talking about how blood rage can get rid of anything in your way",
"vantant Trog et expliquant que la rage sanguinaire peut balayer tout ce qui vous barre la route"
],
[
"adoring Okawaru and talking about how Okawaru is the only ally you need as a warrior",
"adorant Okawaru et expliquant qu’Okawaru est le seul allié dont un guerrier ait besoin"
],
[
"applauding Sif Muna and talking about how all magic is accessible with enough effort",
"applaudissant Sif Muna et expliquant que toute magie est accessible avec assez d’efforts"
],
[
"venerating Vehumet and talking about how weaponised magic is the key to victory",
"vénérant Vehumet et expliquant que la magie transformée en arme est la clé de la victoire"
],
[
"fawning over Kikubaaqudgha and talking about how necromancy turns all flesh and blood into useful tools",
"s’extasiant sur Kikubaaqudgha et expliquant que la nécromancie transforme toute chair et tout sang en outils utiles"
],
[
"giving kudos to Cheibriados and talking about how the slow and steady can conquer all",
"félicitant Cheibriados et expliquant que le lent et régulier peut tout conquérir"
],
[
"paying tribute to Makhleb and talking about all the powers of hell that Makhleb grants",
"rendant hommage à Makhleb et parlant de tous les pouvoirs de l’enfer qu’il accorde"
],
[
"exulting Fedhas and the enduring powers of nature",
"exultant en l’honneur de Fedhas et des pouvoirs durables de la nature"
],
[
"honouring Hepliaklqana and talking about how those who live on in others' memories never truly die",
"honorant Hepliaklqana et expliquant que ceux qui vivent dans la mémoire des autres ne meurent jamais vraiment"
],
[
"showing devotion to Uskayaw and talking about the complex dance that is life itself",
"montrant sa dévotion à Uskayaw et parlant de la danse complexe qu’est la vie elle-même"
],
[
"doting on Dithmenos and talking about the many things [shadows|the night] can do",
"adorant Dithmenos et parlant des nombreuses choses que [les ombres|la nuit] peuvent faire"
],
[
"giving thanks to the Wu Jian Council and talking about how proper discipline is the key to greatness",
"remerciant le Conseil Wu Jian et expliquant que la bonne discipline est la clé de la grandeur"
],
[
"acclaiming Qazlal and talking about how the elements can work for you",
"acclamant Qazlal et expliquant que les éléments peuvent travailler pour vous"
],
[
"promoting Elyvilon and talking about how bringing peace to the world is essential",
"promouvant Elyvilon et expliquant qu’apporter la paix au monde est essentiel"
],
[
"admiring Ashenzari and talking about how curses and bondage are blessings when they lead to knowledge",
"admirant Ashenzari et expliquant que les malédictions et les entraves sont des bénédictions quand elles mènent au savoir"
],
[
"paying homage to Ru and talking about how all of reality is not what you think it is",
"rendant hommage à Ru et expliquant que toute la réalité n’est pas ce que vous croyez"
],
[
"giving adulation to the Shining One and talking about how honourably removing evil from the world is essential",
"couvrant d’éloges le Shining One et expliquant qu’il est essentiel de purger honorablement le mal du monde"
],
[
"flattering Lugonu and talking about how Lugonu and the forces of the Abyss will soon rule over all",
"flattant Lugonu et expliquant que Lugonu et les forces de l’Abysse régneront bientôt sur tout"
],
[
"glorifying an unknown god",
"glorifiant un dieu inconnu"
],
[
"not just hailing but glorifying @_graffiti_hailed_god_@",
"ne se contentant pas de saluer mais glorifiant @_graffiti_hailed_god_@"
]
],
"_graffiti_religion_orc_": [
[
"proselytising for Beogh and proper orcishness",
"prêchant pour Beogh et pour la véritable nature orque"
],
[
"proclaiming that Beogh's messiah will soon come",
"proclamant que le messie de Beogh viendra bientôt"
],
[
"thanking Beogh for granting salvation while the other gods just watched",
"remerciant Beogh d’avoir accordé le salut pendant que les autres dieux se contentaient de regarder"
],
[
"talking about how Beogh will help you when the other gods turn away from you",
"expliquant que Beogh vous aidera quand les autres dieux vous tourneront le dos"
],
[
"talking about how Beogh is with them and not those other heretic orcs",
"expliquant que Beogh est avec eux et non avec ces autres orcs hérétiques"
]
],
"_graffiti_rumour_": [
[
"speculating about the powers of the Orb of Zot",
"spéculant sur les pouvoirs de l’Orbe de Zot"
],
[
"talking about how the Orb of Zot will [save|destroy] everyone and everything",
"expliquant que l’Orbe de Zot va [sauver|détruire] tout le monde et tout"
],
[
"talking about how everyone is mistaken and the Orb of Zot is really the [Cube|Egg|Pyramid] of Zot",
"expliquant que tout le monde se trompe et que l’Orbe de Zot est en réalité [le Cube|l’Œuf|la Pyramide] de Zot"
],
[
"telling of a secret passageway straight from here to the Orb of Zot",
"parlant d’un passage secret menant d’ici directement à l’Orbe de Zot"
],
[
"counting down the days until the world ends",
"comptant les jours avant la fin du monde"
],
[
"claiming to know the meaning of [life|unlife]",
"prétendant connaître le sens de la [vie|non-vie]"
],
[
"claiming to have found the elusive [cave yeti|death quokka|dire dormouse]",
"prétendant avoir trouvé le [yéti des cavernes|quokka de la mort|loir redoutable] introuvable"
],
[
"alluding to the \"Plog\" Conspiracy and why it hides that word everywhere",
"faisant allusion à la Conspiration « Plog » et à la raison pour laquelle elle cache ce mot partout"
]
],
"_graffiti_short_saying_": [
[
"@_graffiti_author_any_@ was here",
"@_graffiti_author_any_@ était ici"
],
[
"@_graffiti_author_any_@ @_graffiti_loves_or_hates_@ @_graffiti_author_any_@",
"@_graffiti_author_any_@ @_graffiti_loves_or_hates_@ @_graffiti_author_any_@"
],
[
"@_graffiti_author_any_@ @_graffiti_loves_or_hates_@ @_graffiti_relative_or_quality_@ of @_graffiti_author_any_@",
"@_graffiti_author_any_@ @_graffiti_loves_or_hates_@ @_graffiti_relative_or_quality_@ de @_graffiti_author_any_@"
],
[
"@_graffiti_author_any_@ @_graffiti_life_or_death_@",
"@_graffiti_author_any_@ @_graffiti_life_or_death_@"
],
[
"@_graffiti_author_any_@ sells @_graffiti_wares_quality_@ wares",
"@_graffiti_author_any_@ vend des marchandises @_graffiti_wares_quality_@"
],
[
"@_graffiti_author_any_@ steals from @_graffiti_author_any_@",
"@_graffiti_author_any_@ vole @_graffiti_author_any_@"
],
[
"what happened to @_graffiti_author_any_@ was @_graffiti_happened_reason_@",
"ce qui est arrivé à @_graffiti_author_any_@ était @_graffiti_happened_reason_@"
],
[
"@_graffiti_author_any_@ has been replaced by @_graffiti_duplicate_@",
"@_graffiti_author_any_@ a été remplacé par @_graffiti_duplicate_@"
],
[
"@_graffiti_vengeance_@",
"@_graffiti_vengeance_@"
],
[
"@_graffiti_changed_or_compared_religions_@",
"@_graffiti_changed_or_compared_religions_@"
],
[
"all life begins with \"Plog\" and ends with \"Plog\"",
"toute vie commence par « Plog » et finit par « Plog »"
],
[
"@_graffiti_changed_names_@",
"@_graffiti_changed_names_@"
]
],
"_graffiti_species_": [
[
"bemoaning how bizarre coglin engineering is to non-coglins",
"se lamentant de l’étrangeté de l’ingénierie coglin pour les non-coglins"
],
[
"repeating the legend of the lost prototype exo-suit that let a coglin wield three weapons at once",
"répétant la légende du prototype perdu d’exo-armure qui permettait à un coglin de manier trois armes à la fois"
],
[
"wondering what led the barachim to rebel against the gods",
"se demandant ce qui a poussé les barachim à se rebeller contre les dieux"
],
[
"wondering if boneless species can ever spawn revenants",
"se demandant si les espèces sans os peuvent un jour engendrer des revenants"
],
[
"wondering if Trog stops dead berserkers from spawning revenants",
"se demandant si Trog empêche les berserkers morts d’engendrer des revenants"
],
[
"claiming to know where goblins originally came from",
"prétendant savoir d’où viennent à l’origine les gobelins"
],
[
"claiming to know the true origin of kobolds",
"prétendant connaître la véritable origine des kobolds"
],
[
"detailing the persecution of the cave orcs' ancestors",
"détaillant la persécution des ancêtres des orcs des cavernes"
],
[
"claiming that some of the gods secretly serve the oni instead of the other way around",
"prétendant que certains dieux servent en secret les oni plutôt que l’inverse"
],
[
"claiming that some of the hill dwarves still live",
"prétendant que certains nains des collines vivent encore"
],
[
"wondering what really happened to the last of the sludge elves",
"se demandant ce qui est vraiment arrivé aux derniers elfes de la vase"
],
[
"claiming that gnomes really exist and are just superb at hiding",
"prétendant que les gnomes existent vraiment et sont simplement excellents pour se cacher"
]
],
"_graffiti_unique_comment_": [
[
"saying that Cassandra should stop being so negative",
"disant que Cassandra devrait cesser d’être aussi négative"
],
[
"saying that Crazy Yiuf needs to stop making so [little|much] sense",
"disant que Crazy Yiuf doit arrêter d’avoir [si peu|autant] de sens"
],
[
"saying that Donald should shut up and stop complaining",
"disant que Donald devrait se taire et cesser de se plaindre"
],
[
"saying that Sigmund needs to put down the scythe",
"disant que Sigmund doit poser la faux"
],
[
"saying that Edmund needs to get over himself",
"disant qu’Edmund doit se remettre en question"
],
[
"saying that Sprozz has gone too far trying to replace real bees with mechanical ones",
"disant que Sprozz est allé trop loin en essayant de remplacer les vraies abeilles par des abeilles mécaniques"
],
[
"wondering how Robin can possibly throw that hard",
"se demandant comment Robin peut bien lancer aussi fort"
],
[
"wondering why Terence wants to spend his retirement in the dungeon",
"se demandant pourquoi Terence veut passer sa retraite dans le donjon"
],
[
"wondering whether Dowan and Duvessa are secretly triplets and have a third sibling",
"se demandant si Dowan et Duvessa sont secrètement des triplés et ont un troisième frère ou sœur"
],
[
"wondering whether Goji will ever realise that he can actually be seen",
"se demandant si Goji se rendra un jour compte qu’il peut en fait être vu"
],
[
"wondering what else Ijyb can make besides wands",
"se demandant ce qu’Ijyb peut fabriquer d’autre que des baguettes"
],
[
"speculating on the true nature of Jeremiah's master",
"spéculant sur la véritable nature du maître de Jeremiah"
]
],
"_graffiti_unreadable_": [
[
"graffiti of unreadable @_writing_type_@",
"graffitis de @_writing_type_@ illisibles"
],
[
"graffiti of @_writing_type_@ that are unreadable except for a signature by @_graffiti_author_any_@",
"graffitis de @_writing_type_@ illisibles, sauf une signature de @_graffiti_author_any_@"
],
[
"graffiti of @_writing_type_@ that are unreadable except for bits hailing @_graffiti_hailed_god_@",
"graffitis de @_writing_type_@ illisibles, sauf des passages saluant @_graffiti_hailed_god_@"
],
[
"graffiti of @_writing_type_@ that are unreadable except for bits hailing @_graffiti_hailed_god_@ and a signature by @_graffiti_author_any_@",
"graffitis de @_writing_type_@ illisibles, sauf des passages saluant @_graffiti_hailed_god_@ et une signature de @_graffiti_author_any_@"
]
],
"_graffiti_vengeance_": [
[
"@_graffiti_author_any_@ has avenged @_graffiti_author_any_@",
"@_graffiti_author_any_@ a vengé @_graffiti_author_any_@"
],
[
"@_graffiti_author_any_@ has avenged @graffiti_author_any@ for @_graffiti_vengeance_reason_@",
"@_graffiti_author_any_@ a vengé @graffiti_author_any@ pour @_graffiti_vengeance_reason_@"
],
[
"@_graffiti_author_any_@ swears vengeance on @_graffiti_author_any_@",
"@_graffiti_author_any_@ jure de se venger de @_graffiti_author_any_@"
],
[
"@_graffiti_author_any_@ swears vengeance on @_graffiti_author_any_@ for @_graffiti_vengeance_reason_@",
"@_graffiti_author_any_@ jure de se venger de @_graffiti_author_any_@ pour @_graffiti_vengeance_reason_@"
],
[
"the ghost of @_graffiti_author_any_@ still haunts @_graffiti_author_any_@",
"le fantôme de @_graffiti_author_any_@ hante toujours @_graffiti_author_any_@"
],
[
"the ghost of @_graffiti_author_any_@ still haunts @_graffiti_author_any_@ for @_graffiti_vengeance_reason_@",
"le fantôme de @_graffiti_author_any_@ hante toujours @_graffiti_author_any_@ pour @_graffiti_vengeance_reason_@"
],
[
"@_graffiti_author_orc_@ has avenged @_graffiti_author_any_@",
"@_graffiti_author_orc_@ a vengé @_graffiti_author_any_@"
],
[
"@_graffiti_author_orc_@ has avenged @_graffiti_author_any_@ for @_graffiti_vengeance_reason_@",
"@_graffiti_author_orc_@ a vengé @_graffiti_author_any_@ pour @_graffiti_vengeance_reason_@"
],
[
"@_graffiti_author_orc_@ swears vengeance on @_graffiti_author_any_@",
"@_graffiti_author_orc_@ jure de se venger de @_graffiti_author_any_@"
],
[
"@_graffiti_author_orc_@ swears vengeance on @_graffiti_author_any_@ for @_graffiti_vengeance_reason_@",
"@_graffiti_author_orc_@ jure de se venger de @_graffiti_author_any_@ pour @_graffiti_vengeance_reason_@"
],
[
"the ghost of @_graffiti_author_orc_@ still haunts @_graffiti_author_any_@",
"le fantôme de @_graffiti_author_orc_@ hante toujours @_graffiti_author_any_@"
],
[
"the ghost of @_graffiti_author_orc_@ still haunts @_graffiti_author_any_@ for @_graffiti_vengeance_reason_@",
"le fantôme de @_graffiti_author_orc_@ hante toujours @_graffiti_author_any_@ pour @_graffiti_vengeance_reason_@"
]
],
"_graffiti_vengeance_reason_": [
[
"abandoning @_graffiti_author_any_@",
"avoir abandonné @_graffiti_author_any_@"
],
[
"abandoning them",
"les avoir abandonnés"
],
[
"betraying @_graffiti_author_any_@",
"avoir trahi @_graffiti_author_any_@"
],
[
"betraying them",
"les avoir trahis"
],
[
"killing @_graffiti_author_any_@",
"avoir tué @_graffiti_author_any_@"
],
[
"killing them",
"les avoir tués"
],
[
"stealing from @_graffiti_author_any_@",
"avoir volé @_graffiti_author_any_@"
],
[
"stealing from them",
"les avoir volés"
],
[
"wounding @_graffiti_author_any_@",
"avoir blessé @_graffiti_author_any_@"
],
[
"wounding them",
"les avoir blessés"
]
],
"_graffiti_wares_quality_": [
[
"inferior",
"de piètre qualité"
],
[
"high-quality",
"de grande qualité"
],
[
"low-quality",
"de mauvaise qualité"
],
[
"mediocre",
"médiocres"
],
[
"superior",
"de qualité supérieure"
]
],
"any_graffiti": [
[
"graffiti of @_pattern_type_@",
"graffitis de @_pattern_type_@"
],
[
"graffiti of @_writing_type_@",
"graffitis de @_writing_type_@"
],
[
"@_graffiti_unreadable_@",
"@_graffiti_unreadable_@"
],
[
"@_graffiti_type_with_signature_maybe_@",
"@_graffiti_type_with_signature_maybe_@"
],
[
"@_graffiti_type_with_signature_maybe_@ @_graffiti_image_@",
"@_graffiti_type_with_signature_maybe_@ @_graffiti_image_@"
],
[
"@_graffiti_type_with_signature_maybe_@ @_graffiti_rumour_@",
"@_graffiti_type_with_signature_maybe_@ @_graffiti_rumour_@"
],
[
"@_graffiti_type_with_signature_maybe_@ @_graffiti_unique_comment_@",
"@_graffiti_type_with_signature_maybe_@ @_graffiti_unique_comment_@"
],
[
"@_graffiti_type_with_signature_maybe_@ @_graffiti_species_@",
"@_graffiti_type_with_signature_maybe_@ @_graffiti_species_@"
],
[
"@_graffiti_type_@ @_graffiti_fight_@",
"@_graffiti_type_@ @_graffiti_fight_@"
],
[
"@_graffiti_type_@ @_graffiti_advertisement_@",
"@_graffiti_type_@ @_graffiti_advertisement_@"
],
[
"@_graffiti_type_@ saying that @_graffiti_short_saying_@",
"@_graffiti_type_@ disant que @_graffiti_short_saying_@"
],
[
"@_graffiti_type_with_signature_maybe_@ @_graffiti_religion_not_non-orc_or_orc_@",
"@_graffiti_type_with_signature_maybe_@ @_graffiti_religion_not_non-orc_or_orc_@"
],
[
"@_graffiti_type_with_signature_maybe_non-orc_@ @_graffiti_religion_non-orc_@",
"@_graffiti_type_with_signature_maybe_non-orc_@ @_graffiti_religion_non-orc_@"
],
[
"@_graffiti_type_with_signature_maybe_orc_@ @_graffiti_religion_orc_@",
"@_graffiti_type_with_signature_maybe_orc_@ @_graffiti_religion_orc_@"
],
[
"@_graffiti_type_@ @_graffiti_obscenities_@",
"@_graffiti_type_@ @_graffiti_obscenities_@"
]
],
"rainbow_colour": [
[
"red",
"rouge"
],
[
"orange",
"orange"
],
[
"yellow",
"jaune"
],
[
"green",
"vert/verte"
],
[
"blue",
"bleu/bleue"
],
[
"indigo",
"indigo"
],
[
"violet",
"violet/violette"
]
],
"misc_colour": [
[
"aero",
"aéro"
],
[
"alabaster",
"albâtre"
],
[
"alizarin crimson",
"rouge alizarine"
],
[
"almond",
"amande"
],
[
"amaranth",
"amarante"
],
[
"amaranth pink",
"rose amarante"
],
[
"amaranth purple",
"pourpre amarante"
],
[
"amethyst",
"améthyste"
],
[
"ametrine",
"amétrine"
],
[
"amber",
"ambre"
],
[
"annatto",
"rocou"
],
[
"apple green",
"vert pomme"
],
[
"apple red",
"rouge pomme"
],
[
"apple yellow",
"jaune pomme"
],
[
"apricot",
"abricot"
],
[
"aqua",
"aqua"
],
[
"aquamarine",
"aigue-marine"
],
[
"artichoke green",
"vert artichaut"
],
[
"asparagus green",
"vert asperge"
],
[
"atrovirens",
"atrovirens"
],
[
"aubergine",
"aubergine"
],
[
"auburn",
"auburn"
],
[
"aureolin",
"auréoline"
],
[
"avocado green",
"vert avocat"
],
[
"azure",
"azur"
],
[
"azurite",
"azurite"
],
[
"baby blue",
"bleu layette"
],
[
"banana yellow",
"jaune banane"
],
[
"beetroot red",
"rouge betterave"
],
[
"beige",
"beige"
],
[
"bisque",
"bisque"
],
[
"bistre",
"bistre"
],
[
"blaze orange",
"orange vif"
],
[
"blood orange",
"orange sanguine"
],
[
"blood red",
"rouge sang"
],
[
"blueberry",
"myrtille"
],
[
"blush",
"blush"
],
[
"bole",
"bol"
],
[
"brass",
"laiton"
],
[
"bronze",
"bronze"
],
[
"brown",
"brun/brune"
],
[
"brown ochre",
"ocre brun"
],
[
"buff",
"chamois"
],
[
"burgundy",
"bordeaux"
],
[
"burlywood",
"bois brut"
],
[
"burnt amber",
"ambre brûlé"
],
[
"burnt ochre",
"ocre brûlé"
],
[
"burnt orange",
"orange brûlé"
],
[
"burnt sienna",
"sienne brûlée"
],
[
"burnt umber",
"ombre brûlée"
],
[
"byzantium",
"byzantium"
],
[
"cadmium red",
"rouge de cadmium"
],
[
"cadmium green",
"vert de cadmium"
],
[
"cadmium orange",
"orange de cadmium"
],
[
"cadmium yellow",
"jaune de cadmium"
],
[
"cameo pink",
"rose camée"
],
[
"candy apple green",
"vert pomme d’amour"
],
[
"candy apple red",
"rouge pomme d’amour"
],
[
"candy apple yellow",
"jaune pomme d’amour"
],
[
"caput mortuum",
"caput mortuum"
],
[
"cardinal red",
"rouge cardinal"
],
[
"carmine",
"carmin"
],
[
"carnation",
"œillet"
],
[
"carnelian",
"cornaline"
],
[
"carrot orange",
"orange carotte"
],
[
"cattleya",
"cattleya"
],
[
"celadon",
"céladon"
],
[
"celeste",
"céleste"
],
[
"celestial blue",
"bleu céleste"
],
[
"cerise",
"cerise"
],
[
"cerulean",
"céruléen/céruléenne"
],
[
"charcoal",
"charbon"
],
[
"chartreuse",
"chartreuse"
],
[
"chartreuse green",
"vert chartreuse"
],
[
"cherry red",
"rouge cerise"
],
[
"chestnut",
"châtaigne"
],
[
"china blue",
"bleu de Chine"
],
[
"chocolate",
"chocolat"
],
[
"chocolate cosmos",
"cosmos chocolat"
],
[
"chrome green",
"vert chrome"
],
[
"chrome orange",
"orange chrome"
],
[
"chrome yellow",
"jaune chrome"
],
[
"cinnabar",
"cinabre"
],
[
"cinnamon",
"cannelle"
],
[
"citreous",
"citron"
],
[
"citrine",
"citrine"
],
[
"citron",
"cédrat"
],
[
"cloudy blue",
"bleu nuageux"
],
[
"cobalt blue",
"bleu cobalt"
],
[
"cobalt green",
"vert cobalt"
],
[
"cobalt violet",
"violet cobalt"
],
[
"cobalt yellow",
"jaune cobalt"
],
[
"coffee",
"café"
],
[
"cornflower blue",
"bleuet"
],
[
"copper",
"cuivre"
],
[
"coquelicot",
"coquelicot"
],
[
"coral pink",
"rose corail"
],
[
"cordovan",
"cordouan"
],
[
"cream",
"crème"
],
[
"crimson",
"cramoisi/cramoisie"
],
[
"crocoite",
"crocoïte"
],
[
"cyan",
"cyan"
],
[
"cyclamen",
"cyclamen"
],
[
"dragon's blood",
"sang-de-dragon"
],
[
"duck blue",
"bleu canard"
],
[
"dun",
"beige grisé"
],
[
"dusty orange",
"orange poudré"
],
[
"dusty rose",
"rose poussiéreux"
],
[
"ebony",
"ébène"
],
[
"ecru",
"écru/écrue"
],
[
"eggplant",
"aubergine mûre"
],
[
"electric blue",
"bleu électrique"
],
[
"electric indigo",
"indigo électrique"
],
[
"electric magenta",
"magenta électrique"
],
[
"electric purple",
"pourpre électrique"
],
[
"electric violet",
"violet électrique"
],
[
"emerald",
"émeraude"
],
[
"eminence",
"éminence"
],
[
"erin",
"vert d’Érin"
],
[
"evergreen",
"vert persistant"
],
[
"fallow",
"fauve pâle"
],
[
"falu red",
"rouge de Falun"
],
[
"fandango",
"fandango"
],
[
"fawn",
"faon"
],
[
"feldgrau",
"feldgrau"
],
[
"fern green",
"vert fougère"
],
[
"fire orange",
"orange feu"
],
[
"fire red",
"rouge feu"
],
[
"flax",
"lin"
],
[
"flirt",
"flirt"
],
[
"fluorescent blue",
"bleu fluorescent"
],
[
"forest green",
"vert forêt"
],
[
"fuchsia",
"fuchsia"
],
[
"fuchsine",
"fuchsine"
],
[
"fulvous",
"fauve"
],
[
"gamboge",
"gomme-gutte"
],
[
"garnet",
"grenat"
],
[
"glaucous",
"glauque"
],
[
"goblin blue",
"bleu gobelin"
],
[
"goblin scarlet",
"écarlate gobelin"
],
[
"green earth",
"terre verte"
],
[
"green ochre",
"ocre vert"
],
[
"greenockite",
"greenockite"
],
[
"greige",
"greige"
],
[
"gold",
"or"
],
[
"gold ochre",
"ocre doré"
],
[
"gold poppy",
"pavot d’or"
],
[
"golden brown",
"brun doré"
],
[
"goldenrod",
"verge d’or"
],
[
"goshenite",
"goshénite"
],
[
"gridelin",
"gris-de-lin"
],
[
"grullo",
"grullo"
],
[
"haint blue",
"bleu haint"
],
[
"hansa yellow",
"jaune hansa"
],
[
"harlequin",
"arlequin"
],
[
"heliodor",
"héliodore"
],
[
"heliotrope",
"héliotrope"
],
[
"hibiscus",
"hibiscus"
],
[
"hot pink",
"rose vif"
],
[
"hunter green",
"vert chasseur"
],
[
"hunter orange",
"orange chasseur"
],
[
"hyacinth",
"jacinthe"
],
[
"hyacinth blue",
"bleu jacinthe"
],
[
"icterine",
"ictérin/ictérine"
],
[
"imperial blue",
"bleu impérial"
],
[
"imperial orange",
"orange impérial"
],
[
"imperial purple",
"pourpre impérial"
],
[
"imperial red",
"rouge impérial"
],
[
"imperial yellow",
"jaune impérial"
],
[
"incarnadine",
"incarnadin/incarnadine"
],
[
"indanthrone blue",
"bleu indanthrène"
],
[
"independence",
"indépendance"
],
[
"irresistible",
"irrésistible"
],
[
"iris",
"iris"
],
[
"isabelline",
"isabelle"
],
[
"ivy green",
"vert lierre"
],
[
"jade",
"jade"
],
[
"jale",
"jale"
],
[
"jasmine",
"jasmin"
],
[
"jonquil",
"jonquille"
],
[
"kachi indigo",
"indigo kachi"
],
[
"khaki",
"kaki"
],
[
"kobicha",
"kobicha"
],
[
"kombu green",
"vert kombu"
],
[
"labradorite",
"labradorite"
],
[
"lapis lazuli",
"lapis-lazuli"
],
[
"laurel green",
"vert laurier"
],
[
"lavender",
"lavande"
],
[
"lavender blue",
"bleu lavande"
],
[
"lavender purple",
"pourpre lavande"
],
[
"lavender indigo",
"indigo lavande"
],
[
"lavender magenta",
"magenta lavande"
],
[
"lavender rose",
"rose lavande"
],
[
"leaf green",
"vert feuille"
],
[
"leek green",
"vert poireau"
],
[
"lemon yellow",
"jaune citron"
],
[
"liberty",
"liberté"
],
[
"lilac",
"lilas"
],
[
"lime green",
"vert lime"
],
[
"liseran purple",
"pourpre liseran"
],
[
"lusty gallant",
"galant fougueux"
],
[
"madder",
"garance"
],
[
"magenta",
"magenta"
],
[
"mahogany",
"acajou"
],
[
"malachite",
"malachite"
],
[
"mandarin",
"mandarine"
],
[
"manganese violet",
"violet de manganèse"
],
[
"mango",
"mangue"
],
[
"marigold",
"souci"
],
[
"marine blue",
"bleu océan"
],
[
"marmalade",
"marmelade"
],
[
"maroon",
"bordeaux sombre"
],
[
"mauve",
"mauve"
],
[
"mauve taupe",
"taupe mauve"
],
[
"mauveine",
"mauvéine"
],
[
"maxixe",
"maxixe"
],
[
"mazarine",
"mazarine"
],
[
"mellow yellow",
"jaune tendre"
],
[
"midnight blue",
"bleu nuit"
],
[
"mikado",
"mikado"
],
[
"mindaro",
"mindaro"
],
[
"minium",
"minium"
],
[
"mint green",
"vert menthe"
],
[
"morganite",
"morganite"
],
[
"morning blue",
"bleu matin"
],
[
"moss green",
"vert mousse"
],
[
"mulberry",
"mûre"
],
[
"mustard brown",
"brun moutarde"
],
[
"mustard green",
"vert moutarde"
],
[
"mustard yellow",
"jaune moutarde"
],
[
"myrtle",
"myrte"
],
[
"nattier",
"bleu Nattier"
],
[
"navy blue",
"bleu marine"
],
[
"navy purple",
"pourpre marine"
],
[
"nickel",
"nickel"
],
[
"nutmeg",
"noix de muscade"
],
[
"nyanza",
"nyanza"
],
[
"ochre",
"ocre"
],
[
"octarine",
"octarine"
],
[
"old helio",
"vieil héliotrope"
],
[
"old heliotrope",
"héliotrope ancien"
],
[
"old rose",
"rose ancien"
],
[
"olive green",
"vert olive"
],
[
"olive drab",
"kaki olive"
],
[
"olive ochre",
"ocre olive"
],
[
"olivine",
"olivine"
],
[
"olo",
"olo"
],
[
"orange ochre",
"ocre orangé"
],
[
"orchid",
"orchidée"
],
[
"orpiment",
"orpiment"
],
[
"oxblood",
"sang de bœuf"
],
[
"palatinate",
"palatinat"
],
[
"palatinate blue",
"bleu palatinat"
],
[
"palatinate purple",
"pourpre palatinat"
],
[
"peach",
"pêche"
],
[
"pear green",
"vert poire"
],
[
"pear yellow",
"jaune poire"
],
[
"peridot",
"péridot"
],
[
"periwinkle",
"pervenche"
],
[
"persimmon",
"plaquemine"
],
[
"phlox",
"phlox"
],
[
"picotee blue",
"bleu picotée"
],
[
"pine green",
"vert pin"
],
[
"pine tree",
"pin"
],
[
"pink",
"rose"
],
[
"pink lavender",
"lavande rosé"
],
[
"pistachio",
"pistache"
],
[
"plum",
"prune"
],
[
"ponceau",
"ponceau"
],
[
"poppy red",
"rouge coquelicot"
],
[
"powder blue",
"bleu poudre"
],
[
"prase",
"prase"
],
[
"primrose yellow",
"jaune primevère"
],
[
"puce",
"puce"
],
[
"pumpkin",
"citrouille"
],
[
"purple",
"pourpre"
],
[
"purple ochre",
"ocre pourpre"
],
[
"purple taupe",
"taupe pourpre"
],
[
"purpura",
"purpura"
],
[
"purpureus",
"purpureus"
],
[
"quartz",
"quartz"
],
[
"quercitron",
"quercitron"
],
[
"raspberry",
"framboise"
],
[
"raspberry rose",
"rose framboise"
],
[
"realgar",
"réalgar"
],
[
"red emerald",
"émeraude rouge"
],
[
"red ochre",
"ocre rouge"
],
[
"rej",
"rej"
],
[
"rocket green",
"vert fusée"
],
[
"rockmelon",
"cantaloup"
],
[
"rose",
"rose"
],
[
"rose quartz",
"quartz rose"
],
[
"rose vale",
"rose du vallon"
],
[
"rubric",
"rouge rubrique"
],
[
"ruby",
"rubis"
],
[
"ruddy blue",
"bleu rougeâtre"
],
[
"rufous",
"roux/rousse"
],
[
"russet",
"roussâtre"
],
[
"rust",
"rouille"
],
[
"safflower orange",
"orange carthame"
],
[
"saffron",
"safran"
],
[
"salmon",
"saumon"
],
[
"sanguine",
"sanguine"
],
[
"sap green",
"vert sève"
],
[
"sapphire",
"saphir"
],
[
"sea blue",
"bleu mer"
],
[
"sea green",
"vert mer"
],
[
"sepia",
"sépia"
],
[
"scarlet",
"écarlate"
],
[
"scarlet emerald",
"émeraude écarlate"
],
[
"shocking pink",
"rose shocking"
],
[
"sienna",
"sienne"
],
[
"silver",
"argent"
],
[
"silver pink",
"rose argenté"
],
[
"sinopia",
"sinopia"
],
[
"skobeloff",
"skobeloff"
],
[
"sky blue",
"bleu ciel"
],
[
"sky magenta",
"magenta ciel"
],
[
"slate",
"ardoise"
],
[
"slate blue",
"bleu ardoise"
],
[
"smalt",
"smalt"
],
[
"smaragdine",
"smaragdin/smaragdine"
],
[
"sorcerer's violet",
"violet du sorcier"
],
[
"spring bud",
"bourgeon de printemps"
],
[
"spring green",
"vert printemps"
],
[
"steel blue",
"bleu acier"
],
[
"strawberry red",
"rouge fraise"
],
[
"strontium yellow",
"jaune de strontium"
],
[
"tamarind",
"tamarin"
],
[
"tang blue",
"bleu tang"
],
[
"tangerine",
"tangerine"
],
[
"taupe",
"taupe"
],
[
"tawny",
"brun fauve"
],
[
"tea green",
"vert thé"
],
[
"teal",
"sarcelle"
],
[
"teal blue",
"bleu sarcelle"
],
[
"teal green",
"vert sarcelle"
],
[
"telemagenta",
"télémagenta"
],
[
"terracotta",
"terre cuite"
],
[
"terre verte",
"terre verte"
],
[
"thistle",
"chardon"
],
[
"tiger's eye",
"œil-de-tigre"
],
[
"titanium yellow",
"jaune de titane"
],
[
"tomato red",
"rouge tomate"
],
[
"topaz",
"topaze"
],
[
"turmeric",
"curcuma"
],
[
"turquoise",
"turquoise"
],
[
"ulfire",
"ulfire"
],
[
"ultramarine",
"outremer"
],
[
"umber",
"ombre"
],
[
"vanilla",
"vanille"
],
[
"verdigris",
"vert-de-gris"
],
[
"vermilion",
"vermillon"
],
[
"veronica",
"véronique"
],
[
"viridian",
"viridian"
],
[
"walnut",
"noyer"
],
[
"watermelon green",
"vert pastèque"
],
[
"watermelon red",
"rouge pastèque"
],
[
"wenge",
"wengé"
],
[
"wheat",
"blé"
],
[
"wine",
"vin"
],
[
"wisteria",
"glycine"
],
[
"xanthic",
"xanthique"
],
[
"xanthous",
"xanthin/xanthine"
],
[
"yam",
"igname"
],
[
"yellow ochre",
"ocre jaune"
],
[
"zaffre",
"zaffre"
],
[
"zinc yellow",
"jaune de zinc"
],
[
"zinnwaldite",
"zinnwaldite"
],
[
"zomp",
"zomp"
],
[
"zucchini green",
"vert courgette"
]
],
"mono_colour": [
[
"black",
"noir/noire"
],
[
"white",
"blanc/blanche"
],
[
"grey",
"gris/grise"
]
],
"any_colour": [
[
"@rainbow_colour@",
"@rainbow_colour@"
],
[
"@misc_colour@",
"@misc_colour@"
],
[
"@mono_colour@",
"@mono_colour@"
]
],
"any_pattern": [
[
"arabesque",
"arabesques{fp}"
],
[
"arrows",
"flèches{fp}"
],
[
"chequers",
"damiers{mp}"
],
[
"chevrons",
"chevrons{mp}"
],
[
"diamonds",
"losanges{mp}"
],
[
"flamestitch",
"points de flamme{mp}"
],
[
"fractals",
"fractales{fp}"
],
[
"gingham",
"carreaux vichy{mp}"
],
[
"herringbone",
"chevrons en épi{mp}"
],
[
"houndstooth",
"pieds-de-poule{mp}"
],
[
"leopard spots",
"taches de léopard{fp}"
],
[
"ogee",
"ogives{fp}"
],
[
"ombre",
"dégradés{mp}"
],
[
"paisley",
"motifs cachemire{mp}"
],
[
"pinstripes",
"fines rayures{fp}"
],
[
"plaid",
"carreaux écossais{mp}"
],
[
"polka dots",
"pois{mp}"
],
[
"quatrefoil",
"quadrilobes{mp}"
],
[
"stripes",
"rayures{fp}"
],
[
"spirals",
"spirales{fp}"
],
[
"spots",
"taches{fp}"
],
[
"squares",
"carrés{mp}"
],
[
"stars",
"étoiles{fp}"
],
[
"tartan",
"tartans{mp}"
],
[
"triangles",
"triangles{mp}"
],
[
"whorls",
"volutes{fp}"
],
[
"zigzags",
"zigzags{mp}"
]
],
"glowing_adj": [
[
"bright",
"clair/claire"
],
[
"brilliant",
"brillant/brillante"
],
[
"dark",
"foncé/foncée"
],
[
"deep",
"profond/profonde"
],
[
"dull",
"terne"
],
[
"dusky",
"sombre"
],
[
"faint",
"léger/légère"
],
[
"gleaming",
"luisant/luisante"
],
[
"glossy",
"lustré/lustrée"
],
[
"intense",
"intense"
],
[
"luminous",
"lumineux/lumineuse"
],
[
"lurid",
"criard/criarde"
],
[
"lustrous",
"chatoyant/chatoyante"
],
[
"mottled",
"moucheté/mouchetée"
],
[
"murky",
"trouble"
],
[
"pale",
"pâle"
],
[
"shimmering",
"miroitant/miroitante"
],
[
"shining",
"éclatant/éclatante"
],
[
"vivid",
"vif/vive"
]
],
"any_glowing_colour": [
[
"@glowing_adj@ @any_colour@",
"{inv}@any_colour@ @glowing_adj@"
]
],
"any_colour_pattern": [
[
"@any_colour@ @any_pattern@",
"@any_pattern@ @any_colour@"
],
[
"@any_colour@ on @any_colour@ @any_pattern@",
"@any_pattern@ @any_colour@ sur fond @any_colour#ms@"
]
],
"any_glowing_colour_pattern": [
[
"@any_glowing_colour@ @any_pattern@",
"@any_pattern@ @any_glowing_colour@"
],
[
"@any_glowing_colour@ on @any_colour@ @any_pattern@",
"@any_pattern@ @any_glowing_colour@ sur fond @any_colour#ms@"
],
[
"@any_colour@ on @any_glowing_colour@ @any_pattern@",
"@any_pattern@ @any_colour@ sur fond @any_glowing_colour#ms@"
],
[
"@any_glowing_colour@ on @any_glowing_colour@ @any_pattern@",
"@any_pattern@ @any_glowing_colour@ sur fond @any_glowing_colour#ms@"
]
]
};
