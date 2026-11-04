// Messages de dieux (partie J, 0.10) : accueil, désertion, apaisement, et les pouvoirs gagnés / perdus (« You can now ... »).
// Textes relevés dans le vrai jeu (mode wizard) et dans religion.cc. Format : voir moteur/phrases_a_trous.js ; {x1} = nom du dieu.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};

    // --- Phrases « <Dieu> + verbe » (comme dieux_verbe.js) ---
    const VERBE = {
        "welcomes you!": "{x1} vous accueille !",
        "welcomes you back!": "{x1} vous accueille de nouveau !",
        "does not appreciate desertion!": "{x1} n’apprécie pas la désertion !",
        "does not appreciate desertion for chaos!": "{x1} n’apprécie pas la désertion pour le chaos !",
        "does not appreciate desertion for evil!": "{x1} n’apprécie pas la désertion pour le mal !",
        "seems mollified.": "{x1} semble apaisé.",
        "seems mollified, and vanishes.": "{x1} semble apaisé, et disparaît.",
        "offers you knowledge of {X}.": "{x1} vous offre la connaissance de {x2}.",
        "raises the support of your attributes as your movement slows.": "{x1} renforce le soutien de vos attributs à mesure que vos mouvements ralentissent.",
        "begins to support your attributes as your movement slows.": "{x1} commence à soutenir vos attributs à mesure que vos mouvements ralentissent.",
        "is now slowing the effects of poison on you.": "{x1} ralentit maintenant les effets du poison sur vous.",
        "goes to deal, but finds you have enough escape and destruction and summoning cards.": "{x1} s’apprête à distribuer, mais constate que vous avez assez de cartes d’évasion, de destruction et d’invocation.",
        "goes to deal, but finds you have enough escape and destruction cards.": "{x1} s’apprête à distribuer, mais constate que vous avez assez de cartes d’évasion et de destruction.",
        "goes to deal, but finds you have enough destruction and summoning cards.": "{x1} s’apprête à distribuer, mais constate que vous avez assez de cartes de destruction et d’invocation.",
        "goes to deal, but finds you have enough destruction cards.": "{x1} s’apprête à distribuer, mais constate que vous avez assez de cartes de destruction.",
        "forms a fragment of your life essence into the memory of your ancestor, {X}!": "{x1} façonne un fragment de votre essence vitale en souvenir de votre ancêtre, {x2} !"
    };
    for (const k in VERBE) T["{X} " + k] = VERBE[k];
    T["The Shining One seems mollified."] = "L’Étincelant semble apaisé.";

    // --- Pouvoirs : « You can now <pouvoir>. » / « You can no longer <pouvoir>. » / « You can <pouvoir>. » ---
    const POUVOIRS = {
        "recite Zin's Axioms of Law": "réciter les Axiomes de la Loi de Zin",
        "call upon Zin for vitalisation": "invoquer Zin pour vous revitaliser",
        "call upon Zin to imprison the lawless": "invoquer Zin pour emprisonner les hors-la-loi",
        "call upon Zin to create a sanctuary": "invoquer Zin pour créer un sanctuaire",
        "donate money to Zin": "faire un don d’argent à Zin",
        "call upon the Shining One for a divine shield": "invoquer l’Étincelant pour obtenir un bouclier divin",
        "channel blasts of cleansing flame": "canaliser des déferlantes de flamme purificatrice",
        "summon a divine warrior": "invoquer un guerrier divin",
        "bring forth the wretched and dying": "faire surgir les misérables et les mourants",
        "invoke the sign of ruin": "invoquer le sceau de la ruine",
        "light the black torch and reap souls in Yredelemnul's name": "allumer la torche noire et moissonner des âmes au nom de Yredelemnul",
        "recall your undead harvest": "rappeler votre moisson de morts-vivants",
        "hurl gouts of umbral torchlight": "projeter des gerbes de lumière de torche ombrale",
        "bind living souls": "lier des âmes vivantes",
        "engulf your surroundings in Yredelemnul's grip": "engloutir vos environs dans l’emprise de Yredelemnul",
        "gain great but temporary skills": "gagner de grandes compétences temporaires",
        "speed up your combat": "accélérer votre combat",
        "enter into single combat with a foe": "engager un combat singulier avec un ennemi",
        "unleash Makhleb's destructive might": "déchaîner la puissance destructrice de Makhleb",
        "summon an infernal servant of Makhleb": "invoquer un serviteur infernal de Makhleb",
        "call upon Sif Muna for magical energy": "invoquer Sif Muna pour obtenir de l’énergie magique",
        "freely open your mind to new spells": "ouvrir librement votre esprit à de nouveaux sorts",
        "call upon Sif Muna to cast any spell from your library": "invoquer Sif Muna pour lancer n’importe quel sort de votre bibliothèque",
        "go berserk at will": "entrer en berserk à volonté",
        "call upon Trog for regeneration and willpower": "invoquer Trog pour obtenir régénération et volonté",
        "call in reinforcements": "appeler des renforts",
        "choose one out of three cards": "choisir une carte parmi trois",
        "deal four cards at a time": "distribuer quatre cartes à la fois",
        "stack five cards from your decks": "empiler cinq cartes de vos paquets",
        "purify yourself": "vous purifier",
        "attempt to pacify hostile creatures": "tenter de pacifier des créatures hostiles",
        "provide healing for yourself": "vous soigner",
        "comfort your suffering allies": "réconforter vos alliés souffrants",
        "call upon Elyvilon for divine vigour": "invoquer Elyvilon pour obtenir une vigueur divine",
        "depart the Abyss": "quitter l’Abîme",
        "banish your foes": "bannir vos ennemis",
        "corrupt the fabric of space": "corrompre la trame de l’espace",
        "gate yourself to the Abyss": "vous ouvrir un portail vers l’Abîme",
        "smite your foes": "foudroyer vos ennemis",
        "recall your apostles": "rappeler vos apôtres",
        "rally a vengeful horde": "rallier une horde vengeresse",
        "call acidic ooze from nearby walls": "faire suinter une vase acide des murs proches",
        "turn your foes to slime": "changer vos ennemis en gelée",
        "encircle yourself with summoned briar patches": "vous entourer de buissons de ronces invoqués",
        "grow a ballistomycete": "faire pousser un balistomycète",
        "transform dungeon walls and trees into plant allies": "transformer les murs du donjon et les arbres en alliés végétaux",
        "grow an oklob plant": "faire pousser une plante oklob",
        "bend time to slow others": "courber le temps pour ralentir les autres",
        "warp the flow of time around you": "déformer le flux du temps autour de vous",
        "inflict damage on those overly hasty": "blesser ceux qui sont trop pressés",
        "step out of the flow of time": "sortir du flux du temps",
        "mislead enemies by swapping places with your shadow": "égarer vos ennemis en échangeant votre place avec votre ombre",
        "unleash an enemy's spells as if they were a marionette": "déchaîner les sorts d’un ennemi comme s’il était une marionnette",
        "surround yourself with impenetrable night": "vous entourer d’une nuit impénétrable",
        "petition Gozag for potion effects": "solliciter Gozag pour des effets de potion",
        "fund merchants seeking to open stores in the dungeon": "financer des marchands désireux d’ouvrir des boutiques dans le donjon",
        "bribe branches to halt enemies' attacks and recruit allies": "soudoyer des branches pour stopper les attaques ennemies et recruter des alliés",
        "call upon nature to destroy your foes": "invoquer la nature pour détruire vos ennemis",
        "give life to nearby clouds": "donner vie aux nuages proches",
        "call upon nature's wrath in a wide area around you": "invoquer la colère de la nature sur une large zone autour de vous",
        "heal your body and restore your magic": "soigner votre corps et restaurer votre magie",
        "gather your power into a mighty leap": "rassembler votre puissance en un bond prodigieux",
        "wreak a terrible wrath on your foes": "déchaîner une terrible colère sur vos ennemis",
        "stomp with the beat": "frapper du pied en rythme",
        "pass through a line of other dancers": "traverser une ligne d’autres danseurs",
        "merge with and destroy a victim": "fusionner avec une victime et la détruire",
        "recall your ancestor": "rappeler votre ancêtre",
        "remember your ancestor's identity": "vous souvenir de l’identité de votre ancêtre",
        "swap creatures with your ancestor": "échanger de place avec votre ancêtre",
        "heal and protect your ancestor": "soigner et protéger votre ancêtre",
        "perform airborne attacks": "effectuer des attaques aériennes",
        "briefly move at supernatural speeds": "vous déplacer brièvement à des vitesses surnaturelles",
        "summon a storm of heavenly clouds to empower your attacks": "invoquer une tempête de nuages célestes pour renforcer vos attaques",
        "armour yourself in flame": "vous revêtir d’une armure de flammes",
        "call a swarm of foxfires against your foes": "lancer un essaim de feux follets contre vos ennemis",
        "rocket upward and away, once": "vous propulser vers le haut et au loin, une seule fois",
        "gain magical power from killing": "gagner de la puissance magique en tuant",
        "gain health from killing": "gagner de la santé en tuant",
        "walk on water": "marcher sur l’eau",
        "draw from decks of power": "piocher dans des paquets de puissance",
        "perform damaging attacks by moving towards foes": "porter des attaques dévastatrices en avançant vers vos ennemis",
        "perform lunging strikes": "porter des coups en fente",
        "lightly attack monsters by moving around them": "attaquer légèrement les monstres en vous déplaçant autour d’eux",
        "perform spinning attacks": "porter des attaques tournoyantes",
        "smite": "foudroyer",
        "remember your ancestor's life": "vous remémorer la vie de votre ancêtre"
    };
    for (const [en, fr] of Object.entries(POUVOIRS)) {
        T[`You can now ${en}.`] = `Vous pouvez désormais ${fr}.`;
        T[`You may now ${en}.`] = `Vous pouvez désormais ${fr}.`;
        T[`You can no longer ${en}.`] = `Vous ne pouvez plus ${fr}.`;
        T[`You can ${en}.`] = `Vous pouvez ${fr}.`;
    }

    // --- Phrases entières (sans trou) : dons, protections, effets permanents ---
    const FIXE = {
        "Zin will now cleanse your potions of mutation.": "Zin purifiera désormais vos potions de mutation.",
        "Zin will no longer cleanse your potions of mutation.": "Zin ne purifiera plus vos potions de mutation.",
        "Zin will cleanse your potions of mutation.": "Zin purifie vos potions de mutation.",
        "Your summoned allies will not expire while fighting evil.": "Vos alliés invoqués ne disparaîtront pas tant qu’ils combattent le mal.",
        "You can now gain power from killing the unholy and evil.": "Vous pouvez désormais gagner de la puissance en tuant les impies et les maléfiques.",
        "You can no longer gain power from killing the unholy and evil.": "Vous ne pouvez plus gagner de puissance en tuant les impies et les maléfiques.",

        "The Shining One may bless your followers whenever you slay foes.": "L’Étincelant peut bénir vos disciples chaque fois que vous terrassez des ennemis.",
        "The Shining One will no longer blesses your followers when you slay foes.": "L’Étincelant ne bénira plus vos disciples quand vous terrassez des ennemis.",

        "The Shining One will bless your weapon with holy wrath... once.": "L’Étincelant bénira votre arme d’une colère sacrée... une seule fois.",
        "The Shining One is no longer ready to bless your weapon.": "L’Étincelant n’est plus prêt à bénir votre arme.",
        "Kikubaaqudgha is now protecting you from necromantic miscasts and death curses.": "Kikubaaqudgha vous protège désormais des ratés de nécromancie et des malédictions de mort.",
        "Kikubaaqudgha will no longer protect you from necromantic miscasts or death curses.": "Kikubaaqudgha ne vous protégera plus des ratés de nécromancie ni des malédictions de mort.",
        "Kikubaaqudgha protects you from necromantic miscasts and death curses.": "Kikubaaqudgha vous protège des ratés de nécromancie et des malédictions de mort.",
        "Kikubaaqudgha is now protecting you from unholy torment.": "Kikubaaqudgha vous protège désormais du tourment impie.",
        "Kikubaaqudgha will no longer protect you from unholy torment.": "Kikubaaqudgha ne vous protégera plus du tourment impie.",

        "Kikubaaqudgha will grant you forbidden knowledge or bloody your weapon with pain... once.": "Kikubaaqudgha vous accordera un savoir interdit ou ensanglantera votre arme de douleur... une seule fois.",
        "Kikubaaqudgha will grant you forbidden knowledge.": "Kikubaaqudgha vous accordera un savoir interdit.",
        "Yredelemnul will now gift you temporary undead servants when you light the torch.": "Yredelemnul vous offrira désormais des serviteurs morts-vivants temporaires quand vous allumerez la torche.",
        "Yredelemnul will no longer gift you temporary undead servants when you light the torch.": "Yredelemnul ne vous offrira plus de serviteurs morts-vivants temporaires quand vous allumerez la torche.",
        "Yredelemnul will gift you temporary undead servants when you light the torch.": "Yredelemnul vous offre des serviteurs morts-vivants temporaires quand vous allumez la torche.",
        "Vehumet is now aiding your destructive spells.": "Vehumet soutient désormais vos sorts destructeurs.",
        "Vehumet will no longer aid your destructive spells.": "Vehumet ne soutiendra plus vos sorts destructeurs.",
        "Vehumet aids your destructive spells.": "Vehumet soutient vos sorts destructeurs.",
        "Vehumet is now extending the range of your destructive spells.": "Vehumet étend désormais la portée de vos sorts destructeurs.",
        "Vehumet will no longer extend the range of your destructive spells.": "Vehumet n’étendra plus la portée de vos sorts destructeurs.",

        "Okawaru requires that you fight alone, and prevents you from gaining allies.": "Okawaru exige que vous combattiez seul, et vous empêche d’obtenir des alliés.",
        "Okawaru will now gift you throwing weapons as you gain piety.": "Okawaru vous offrira désormais des armes de jet à mesure que vous gagnez en piété.",
        "Okawaru will no longer gift you throwing weapons.": "Okawaru ne vous offrira plus d’armes de jet.",
        "Okawaru will gift you throwing weapons as you gain piety.": "Okawaru vous offre des armes de jet à mesure que vous gagnez en piété.",
        "Okawaru will grant you a choice of weapons... once.": "Okawaru vous accordera le choix d’une arme... une seule fois.",
        "Okawaru will grant you a choice of armour... once.": "Okawaru vous accordera le choix d’une armure... une seule fois.",
        "Makhleb will allow you to brand your body with an infernal mark... once.": "Makhleb vous permettra de marquer votre corps d’une marque infernale... une seule fois.",
        "Sif Muna will now gift you books as you gain piety.": "Sif Muna vous offrira désormais des livres à mesure que vous gagnez en piété.",
        "Sif Muna will no longer gift you books.": "Sif Muna ne vous offrira plus de livres.",
        "Sif Muna will gift you books as you gain piety.": "Sif Muna vous offre des livres à mesure que vous gagnez en piété.",
        "Trog will now gift you melee weapons as you gain piety.": "Trog vous offrira désormais des armes de mêlée à mesure que vous gagnez en piété.",
        "Trog will no longer gift you weapons.": "Trog ne vous offrira plus d’armes.",
        "Trog will gift you melee weapons as you gain piety.": "Trog vous offre des armes de mêlée à mesure que vous gagnez en piété.",
        "Nemelex will now gift you decks of power as you gain piety.": "Nemelex vous offrira désormais des paquets de puissance à mesure que vous gagnez en piété.",
        "Nemelex will no longer gift you decks.": "Nemelex ne vous offrira plus de paquets.",
        "Nemelex will gift you decks of power as you gain piety.": "Nemelex vous offre des paquets de puissance à mesure que vous gagnez en piété.",
        "Elyvilon prevents you from doing harm to neutral creatures.": "Elyvilon vous empêche de nuire aux créatures neutres.",
        "Lugonu protects you from the effects of unwielding distortion weapons.": "Lugonu vous protège des effets du déséquipement des armes de distorsion.",

        "Lugonu will corrupt your weapon with distortion... once.": "Lugonu corrompra votre arme par la distorsion... une seule fois.",
        "Beogh will now send orc apostles to challenge you in battle as you gain piety.": "Beogh enverra désormais des apôtres orcs vous défier au combat à mesure que vous gagnez en piété.",
        "Beogh will no longer send orc apostles to challenge you in battle.": "Beogh n’enverra plus d’apôtres orcs vous défier au combat.",
        "Beogh will send orc apostles to challenge you in battle as you gain piety.": "Beogh envoie des apôtres orcs vous défier au combat à mesure que vous gagnez en piété.",


        "Jiyva is now protecting you from corrosive effects.": "Jiyva vous protège désormais des effets corrosifs.",
        "Jiyva will no longer protect you from corrosive effects.": "Jiyva ne vous protégera plus des effets corrosifs.",

        "Jiyva will now mutate your body as you gain piety.": "Jiyva mutera désormais votre corps à mesure que vous gagnez en piété.",
        "Jiyva will no longer mutate your body.": "Jiyva ne mutera plus votre corps.",
        "Jiyva will mutate your body as you gain piety.": "Jiyva mute votre corps à mesure que vous gagnez en piété.",
        "Jiyva will now unseal the treasures of the Slime Pits.": "Jiyva va désormais desceller les trésors des Fosses de Gelée.",
        "You may now expel jellies when seriously injured.": "Vous pouvez désormais expulser des gelées quand vous êtes gravement blessé.",
        "You will no longer expel jellies when injured.": "Vous n’expulserez plus de gelées quand vous êtes blessé.",
        "You may expel jellies when seriously injured.": "Vous pouvez expulser des gelées quand vous êtes gravement blessé.",

        "Cheibriados is now slowing the effects of poison on you.": "Cheibriados ralentit désormais les effets du poison sur vous.",
        "Cheibriados will no longer slow the effects of poison on you.": "Cheibriados ne ralentira plus les effets du poison sur vous.",

        "Ashenzari warns you of distant threats and treasures.": "Ashenzari vous avertit des menaces et trésors lointains.",
        "Ashenzari will now identify your possessions.": "Ashenzari identifiera désormais vos possessions.",
        "Ashenzari will no longer identify your possessions.": "Ashenzari n’identifiera plus vos possessions.",

        "Ashenzari will now reveal the unseen.": "Ashenzari révélera désormais l’invisible.",
        "Ashenzari will no longer reveal the unseen.": "Ashenzari ne révélera plus l’invisible.",
        "Ashenzari reveals the unseen.": "Ashenzari révèle l’invisible.",
        "Ashenzari will now keep your mind clear.": "Ashenzari gardera désormais votre esprit clair.",
        "Ashenzari will no longer keep your mind clear.": "Ashenzari ne gardera plus votre esprit clair.",

        "Ashenzari will now protect you from the dungeon's malevolent forces.": "Ashenzari vous protégera désormais des forces malveillantes du donjon.",
        "Ashenzari no longer protects you from the dungeon's malevolent forces.": "Ashenzari ne vous protège plus des forces malveillantes du donjon.",

        "Ashenzari reveals the structure of the nearby dungeon.": "Ashenzari révèle la structure du donjon environnant.",
        "Ashenzari no longer reveals the structure of the nearby dungeon.": "Ashenzari ne révèle plus la structure du donjon environnant.",

        "Dithmenos no longer quiets all noise in your surroundings.": "Dithmenos n’étouffe plus les bruits autour de vous.",
        "Your shadow now sometimes tangibly mimics your actions.": "Votre ombre imite désormais parfois vos actions de façon tangible.",
        "Your shadow no longer tangibly mimics your actions.": "Votre ombre n’imite plus vos actions de façon tangible.",

        "Gozag turns your defeated foes' bodies to gold.": "Gozag change en or le corps de vos ennemis vaincus.",
        "Your enemies may become distracted by gold.": "Vos ennemis peuvent se laisser distraire par l’or.",
        "Qazlal grants you and your divine allies immunity to clouds.": "Qazlal vous accorde, ainsi qu’à vos alliés divins, l’immunité aux nuages.",
        "You are now surrounded by a storm.": "Une tempête vous entoure désormais.",
        "Your storm dissipates completely.": "Votre tempête se dissipe complètement.",

        "Your storm instantly dissipates.": "Votre tempête se dissipe instantanément.",
        "The storm surrounding you is now powerful enough to repel missiles.": "La tempête qui vous entoure est désormais assez puissante pour repousser les projectiles.",
        "The storm surrounding you is now too weak to repel missiles.": "La tempête qui vous entoure est désormais trop faible pour repousser les projectiles.",

        "You will now adapt resistances upon receiving elemental damage.": "Vous adapterez désormais vos résistances en recevant des dégâts élémentaires.",
        "You will no longer adapt resistances upon receiving elemental damage.": "Vous n’adapterez plus vos résistances en recevant des dégâts élémentaires.",
        "You adapt resistances upon receiving elemental damage.": "Vous adaptez vos résistances en recevant des dégâts élémentaires.",

        "You no longer exude an aura of power that intimidates your foes.": "Vous ne dégagez plus d’aura de puissance qui intimide vos ennemis.",
        "Your aura of power can now strike those that harm you.": "Votre aura de puissance peut désormais frapper ceux qui vous blessent.",
        "Your aura of power no longer strikes those that harm you.": "Votre aura de puissance ne frappe plus ceux qui vous blessent.",


        "Uskayaw will no longer force your foes to helplessly watch your dance.": "Uskayaw ne forcera plus vos ennemis à regarder votre danse, impuissants.",

        "Uskayaw will no longer force your foes to share their pain.": "Uskayaw ne forcera plus vos ennemis à partager leur douleur.",

        "You now drain nearby creatures when transferring your ancestor.": "Vous drainez désormais les créatures proches quand vous transférez votre ancêtre.",
        "You no longer drain nearby creatures when transferring your ancestor.": "Vous ne drainez plus les créatures proches quand vous transférez votre ancêtre.",
        "You drain nearby creatures when transferring your ancestor.": "Vous drainez les créatures proches quand vous transférez votre ancêtre.",

        "Your divine halo fades away.": "Votre halo divin s’estompe.",
        "Your aura of darkness fades away.": "Votre aura de ténèbres s’estompe.",
        "All of your followers decide to abandon you.": "Tous vos disciples décident de vous abandonner.",
        "Your teeth grow more tusk-like, and your ears lengthen.": "Vos dents ressemblent de plus en plus à des défenses, et vos oreilles s’allongent.",
        "Your orcish features manifest fully.": "Vos traits orcs se manifestent pleinement.",
        "Something appears at your feet!": "Quelque chose apparaît à vos pieds !",
        "Your full life essence returns.": "Votre pleine essence vitale revient.",
        "Hepliaklqana seems mollified. Your full life essence returns.": "Hepliaklqana semble apaisé. Votre pleine essence vitale revient.",
        "You sense decay.": "Vous sentez la décomposition.",
        "You are now a BORING thing.": "Vous êtes maintenant une chose ENNUYEUSE.",
        "The Council welcomes you!": "Le Conseil vous accueille !",
        "The Council does not appreciate desertion!": "Le Conseil n’apprécie pas la désertion !",
        "The Council seems mollified.": "Le Conseil semble apaisé.",
        "Are you sure you want to be excommunicated?": "Voulez-vous vraiment être excommunié ?"
    };
    Object.assign(T, FIXE);

    // --- Caractéristiques (player-stats.cc) : « You feel weakened/weaker/stronger... » ---
    Object.assign(T, {
        "You feel weakened.": "Vous vous sentez affaibli.", "You feel weaker.": "Vous vous sentez plus faible.",
         "You feel dopey.": "Vous vous sentez abruti.",
        "You feel stupid.": "Vous vous sentez stupide.", "You feel clumsy.": "Vous vous sentez maladroit.",
        "You feel weak.": "Vous vous sentez faible.", "You feel very weak.": "Vous vous sentez très faible.",
        "You feel very strong.": "Vous vous sentez très fort.", "You feel very clumsy.": "Vous vous sentez très maladroit.",
        "You feel very agile.": "Vous vous sentez très agile.", "You feel very stupid.": "Vous vous sentez très stupide.",
        "You feel very clever.": "Vous vous sentez très intelligent.",
        "{Y} glows red for a moment.": "{y1} luit d’un éclat rouge un instant.",
        "{Y} glows red for a while.": "{y1} luit d’un éclat rouge un moment.",
        "{Y} glows green for a moment.": "{y1} luit d’un éclat vert un instant.",
        "{Y} glows green for a while.": "{y1} luit d’un éclat vert un moment.",
        "You have identified the last scroll.": "Vous avez identifié le dernier parchemin.",
        "You have identified the last potion.": "Vous avez identifié la dernière potion.",
        "{X} returns to the mists of memory.": "{x1} retourne dans les brumes du souvenir.",
        "You now have {X} escape cards and {X} destruction cards.": "Vous avez maintenant {x1} cartes d’évasion et {x2} cartes de destruction.",
        "You now have {X} escape cards, {X} destruction cards and {X} summoning cards.": "Vous avez maintenant {x1} cartes d’évasion, {x2} cartes de destruction et {x3} cartes d’invocation."
    });

    // --- « You add the spells A, B and C to your library. » : noms de sorts traduits un par un (ou laissés en anglais selon l'option) ---
    const noms = lst => lst.split(/, | and /).map(n => { const T1 = globalThis.DCSS_TRADUIRE_CHAINE; const r = T1 ? T1(n) : n; return r || n; });
    const joindre = l => l.length < 2 ? l.join("") : l.slice(0, -1).join(", ") + " et " + l[l.length - 1];
    const regle = { regex: /^You add the (spells?) (.+) to your library\.$/, translate: m => `Vous ajoutez ${m[1] === "spell" ? "le sort" : "les sorts"} ${joindre(noms(m[2]))} à votre bibliothèque.` };
    // « parchment of Blink » (parchemin de sort) : singulier / pluriel, avec ou sans lettre d'inventaire. Le nom du sort suit l'option nomsDeSorts.
    const parch = { regex: /^((?:[a-zA-Z] - )?)(?:(\d+) parchments|(?:[Aa]n? |[Tt]he )?[Pp]archment) of ([A-Z][^.,()!]*?)(\.?)$/, translate: m => {
        const T1 = globalThis.DCSS_TRADUIRE_CHAINE; const nom = T1 ? (T1(m[3]) || m[3]) : m[3];
        const reste = m[0].replace(/^[a-zA-Z] - /, "");
        let det = m[2] ? m[2] + " parchemins" : /^the /i.test(reste) ? "le parchemin" : /^an? /i.test(reste) ? "un parchemin" : "parchemin";
        if (/^[A-Z]/.test(reste)) det = det.charAt(0).toUpperCase() + det.slice(1);
        return `${m[1]}${det} de ${nom}${m[4]}`; } };
    // « Scroll of Blinking » / « scroll of blinking » / « Potion of Haste » seuls (titres, menus) : on passe par la forme avec article déjà traduite.
    const nu = { regex: /^([Ss]crolls?|[Pp]otions?) of ([A-Za-z][A-Za-z' -]*?)(\.?)$/, translate: m => {
        const T1 = globalThis.DCSS_TRADUIRE_CHAINE; if (!T1) return null;
        const pl = /s$/.test(m[1]); const base = m[1].toLowerCase().replace(/s$/, "");
        const r = T1((pl ? "2 " + base + "s" : "a " + base) + " of " + m[2].toLowerCase());
        if (!r || /\b(of|scrolls?)\b/i.test(r)) return null;
        let o = r.replace(/^(?:un|une|le|la|2)\s+/, ""); if (!o || o === r && !pl) return null;
        if (/^[A-Z]/.test(m[1])) o = o[0].toUpperCase() + o.slice(1);
        return o + m[3]; } };
    // Phrase contenant un parchemin de sort : « You pick up a parchment of Blink. », « You see here ... »
    // Astuce : on remplace l'objet par un objet connu (« scroll of blinking »), on traduit la phrase, puis on remet le parchemin traduit.
    const parchPhrase = { regex: /^(.+? )((?:an? |the |\d+ )?parchments? of [A-Z][^.,()!]*?)(\.?)$/, translate: m => {
        const obj = m[2]; const n = /^(\d+) /.exec(obj);
        const dt = /^the /i.test(obj) ? "the " : n ? n[1] + " " : "a ";
        const pl = n && +n[1] > 1;
        const marque = dt + (pl ? "scrolls" : "scroll") + " of blinking";
        const r = globalThis.DCSS_TRADUIRE_CHAINE ? globalThis.DCSS_TRADUIRE_CHAINE(m[1] + marque + m[3]) : null;
        const connu = pl ? n[1] + " parchemins de clignotement" : dt === "the " ? "le parchemin de clignotement" : "un parchemin de clignotement";
        if (!r || r.indexOf(connu) === -1) return null;
        const p = parch.translate(parch.regex.exec(obj));
        return p ? r.replace(connu, p) : null; } };
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat([regle, parch, parchPhrase, nu]);
})();
