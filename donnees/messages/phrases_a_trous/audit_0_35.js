// Messages à variables, partie K (0.10) : relevés par l'audit en jeu (version 0.35) : armes dansantes, états des monstres,
// projectiles repoussés, cris et sorts de monstres, boutiques, Nécropole, messages divers. Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};

    // --- Phrases « sujet + verbe » valables pour tout acteur ({A} : monstre, unique, fantôme, arme dansante...) ---
    const SUJET = {
        "is almost dead.": "{S1} est presque mort{e1}.", "is heavily wounded.": "{S1} est gravement blessé{e1}.",
        "is severely wounded.": "{S1} est sévèrement blessé{e1}.", "is moderately wounded.": "{S1} est modérément blessé{e1}.",
        "is lightly wounded.": "{S1} est légèrement blessé{e1}.",
        "shouts!": "{S1} crie !", "is attracted toward you.": "{S1} est attiré{e1} vers vous.",
        "comes into view.": "{S1} apparaît.", "is nearby!": "{S1} est à proximité !",
        "answers the call of your blood!": "{S1} répond à l’appel de votre sang !",
        "splits.": "{S1} se divise.", "assembles itself!": "{S1} s’assemble !",
        "appears in a shower of sparks.": "{S1} apparaît dans une gerbe d’étincelles.",
        "materialises.": "{S1} se matérialise.", "beckons forth restless souls!": "{S1} appelle des âmes agitées !",
        "gurgles horribly!": "{S1} gargouille horriblement !", "growls angrily.": "{S1} grogne avec colère.",
        "trumpets!": "{S1} barrit !", "howls an incantation.": "{S1} hurle une incantation.",
        "stares into your soul.": "{S1} vous fixe jusqu’au fond de l’âme.", "shrieks in your mind.": "{S1} hurle dans votre esprit.",
        "stares at you with tortured malice.": "{S1} vous fixe avec une malice tourmentée.",
        "gestures next to you while chanting.": "{S1} fait un geste à côté de vous en psalmodiant.",
        "points next to you and mumbles some strange words.": "{S1} pointe à côté de vous et marmonne d’étranges paroles.",
        "calls down Lugonu's blessing.": "{S1} invoque la bénédiction de Lugonu.",
        "fiercely shimmers while chanting indecipherable hymns.": "{S1} miroite farouchement en psalmodiant d’indéchiffrables hymnes.",
        "invokes a beneficient rending in the name of Lugonu.": "{S1} invoque un déchirement bénéfique au nom de Lugonu.",
        "begins to recite a word of recall!": "{S1} commence à réciter un mot de rappel !",
        "calls freezing cold from the walls.": "{S1} fait surgir un froid glacial des murs.",
        "blows a loud note on a signal horn!": "{S1} sonne une note puissante dans un cor de signal !",
        "roars a perplexing riddle with a strange tongue.": "{S1} rugit une énigme déroutante dans une langue étrange.",
        "glows turbulently.": "{S1} luit de façon turbulente.", "pulses with an eldritch light!": "{S1} pulse d’une lumière surnaturelle !",
        "revs up and whimsically whirls.": "{S1} s’emballe et tournoie capricieusement.",
        "launches the last of itself at you with a shrill rumble.": "{S1} se lance tout entier sur vous dans un grondement strident.",
        "blinks away.": "{S1} clignote au loin.", "blinks toward you.": "{S1} clignote vers vous.", "blinks.": "{S1} clignote.",
        "gestures.": "{S1} fait un geste.", "seems to speed up.": "{S1} semble accélérer.",
        "disappears in a puff of smoke!": "{S1} disparaît dans un nuage de fumée !",
        "blocks your attack.": "{S1} bloque votre attaque.", "repels the wail of negative energy!": "{S1} repousse {o2} !",
        "becomes momentarily stuck in the liquid earth.": "{S1} se retrouve coincé{e1} un instant dans la terre liquide.",
        "is engulfed in flames!": "{S1} est englouti{e1} par les flammes !",
        "can see invisible.": "{S1} voit l’invisible.",
        "gestures, and weapons take to the air!": "{S1} fait un geste, et des armes s’élèvent dans les airs !",
        "laughs, \"Think you're sharper than me?\"": "{S1} rit : « Vous croyez être plus affûté que moi ? »",
        "howls, \"I'll flense you until there's nothing left!\"": "{S1} hurle : « Je vous écorcherai jusqu’à ce qu’il ne reste plus rien ! »",
        "cries, \"Feel what I felt!\"": "{S1} s’écrie : « Ressentez ce que j’ai ressenti ! »",
        "cries, \"Suffer as I suffered!\"": "{S1} s’écrie : « Souffrez comme j’ai souffert ! »",
        "shouts, \"You must be punished!\"": "{S1} crie : « Vous devez être puni ! »",
        "says, \"I shall send you to the shadows!\"": "{S1} dit : « Je vous enverrai dans les ombres ! »"
    };
    delete SUJET["repels the wail of negative energy!"];
    for (const [en, fr] of Object.entries(SUJET)) T["{A} " + en] = fr;

    // --- Avec un projectile ({Z}) ---
    T["The {Z} is repelled."] = "{S1} est repoussé{e1}.";
    T["You block the {Z}."] = "Vous bloquez {o1}.";
    T["{A} repels the {Z}!"] = "{S1} repousse {o2} !";
    T["{A} is knocked back by the {Z}."] = "{S1} est repoussé{e1} par {o2}.";
    T["You are knocked back by the {Z}."] = "Vous êtes repoussé par {o1}.";
    T["A blast of power from the earth and {A} strikes you!"] = "Un souffle de puissance venu de la terre et {o1} vous frappent !";
    T["Two slime creatures merge to form {A}."] = "Deux créatures de vase fusionnent pour former {o1}.";

    // --- Objets de la cible, possessifs ---
    T["{A} is wielding {X}."] = "{S1} manie {x2}.";
    T["{A} is carrying {X}."] = "{S1} porte {x2}.";
    T["{A} is wearing {X}."] = "{S1} porte {x2}.";
    T["{A} wields {X}."] = "{S1} prend {x2} en main.";
    T["{A} unwields {X}."] = "{S1} range {x2}.";
    T["{A} hits {A} with {X}!"] = "{S1} frappe {o2} avec {x3} !";
    T["{A} hits {A} with {X}."] = "{S1} frappe {o2} avec {x3}.";
    T["{I} hands start to glow."] = "Les mains {d1} se mettent à briller.";
    T["{A} gestures at {A}."] = "{S1} désigne {o2}.";
    T["A cold fog rises from {A}."] = "Un brouillard froid s’élève {d1}.";
    T["A wild whirl of fire shoots out from {A} at you."] = "Un tourbillon de feu sauvage jaillit {d1} vers vous.";
    T["{A} dies!"] = "{S1} meurt !";
    T["Water drips from {I} barrel."] = "De l’eau goutte du canon {d1}.";

    // --- Attaques du joueur contre n'importe quel acteur ---
    const JOUEUR = [["hit", "touchez"], ["slash", "tailladez"], ["slice", "tranchez"], ["stab", "poignardez"], ["pierce", "transpercez"],
        ["shred", "déchiquetez"], ["bash", "frappez"], ["whack", "frappez"], ["bludgeon", "matraquez"], ["crush", "écrasez"],
        ["pummel", "martelez"], ["punch", "frappez"], ["nick", "entaillez"], ["impale", "empalez"], ["maul", "lacérez"], ["claw", "griffez"],
        ["bite", "mordez"], ["tail-slap", "frappez de votre queue"], ["kick", "donnez un coup de pied à"], ["butt", "donnez un coup de tête à"]];
    for (const [en, fr] of JOUEUR) {
        for (const p of [".", "!"]) {
            T[`You ${en} {A}${p}`] = `Vous ${fr} {o1}${p === "!" ? " !" : "."}`;
            T[`You ${en} {A} but do no damage${p}`] = `Vous ${fr} {o1} sans lui infliger de dégâts${p === "!" ? " !" : "."}`;
        }
    }
    for (const p of [".", "!"]) {
        T[`You slice {A} like a ripe choko${p}`] = `Vous tranchez {o1} comme un choko mûr${p === "!" ? " !" : "."}`;
        T[`You kill {A}${p}`] = `Vous tuez {o1}${p === "!" ? " !" : "."}`;
        T[`You destroy {A}${p}`] = `Vous détruisez {o1}${p === "!" ? " !" : "."}`;
        T[`You barely miss {A}${p}`] = `Vous manquez {o1} de peu${p === "!" ? " !" : "."}`;
        T[`You closely miss {A}${p}`] = `Vous ratez {o1} de justesse${p === "!" ? " !" : "."}`;
        T[`You completely miss {A}${p}`] = `Vous manquez complètement {o1}${p === "!" ? " !" : "."}`;
        T[`You miss {A}${p}`] = `Vous manquez {o1}${p === "!" ? " !" : "."}`;
        T[`You rampage towards {A}${p}`] = `Vous foncez sur {o1}${p === "!" ? " !" : "."}`;
    }
    T["You block {I} attack."] = "Vous bloquez l’attaque {d1}.";
    T["Your tail-slap misses {A}."] = "Votre coup de queue rate {o1}.";
    T["Your whirl of blades misses {A}."] = "Votre tourbillon de lames rate {o1}.";
    T["Your whirl of blades hits {A}."] = "Votre tourbillon de lames touche {o1}.";
    T["Your whirl of blades hits {A}!"] = "Votre tourbillon de lames touche {o1} !";

    // --- Phrases fixes diverses (relevées par l'audit) ---
    const FIXE = {
        "\"Another! And another! And another!\"": "« Un autre ! Et un autre ! Et encore un autre ! »",
        "\"Everything deserves to die!\"": "« Tout mérite de mourir ! »", "\"Kill. Kill. Kill!\"": "« Tue. Tue. Tue ! »",
        "\"More. More. More!\"": "« Encore. Encore. Encore ! »", "\"Slaughter. Them. All!\"": "« Massacre. Les. Tous ! »",
        "A chorus of shrieks assaults your mind.": "Un chœur de cris assaille votre esprit.",
        "A deafening chorus of shrieks assaults your mind!": "Un chœur assourdissant de cris assaille votre esprit !",
        "A whirlwind of blades manifests around you!": "Un tourbillon de lames se manifeste autour de vous !",
        "A malevolent force fills the Vaults...": "Une force maléfique emplit les Chambres Fortes…",
        "As you read the scroll of fog, it dissolves into smoke.": "Alors que vous lisez le parchemin de brouillard, il se dissout en fumée.",
        "Can't find anything matching that.": "Rien ne correspond à cela.",
        "Could not explore, unopened runed door.": "Exploration impossible : porte runique fermée.",
        "Partly explored, can't reach some places.": "Exploration partielle : certains endroits sont inaccessibles.",
        "Press: ? - help, v - describe, . - travel, g - get item": "Appuyez sur : ? - aide, v - décrire, . - aller, g - ramasser",
        "Put on or remove which piece of jewellery?": "Mettre ou retirer quel bijou ?",
        "Wear or take off which item?": "Mettre ou retirer quel objet ?",
        "Really walk into that cloud of flame?": "Vraiment marcher dans ce nuage de flammes ?",
        "Search for what [? for help]?": "Chercher quoi [? pour l’aide] ?",
        "That would be pointless.": "Ce serait inutile.",
        "Something unseen opens the door.": "Quelque chose d’invisible ouvre la porte.",
        "Something unseen opens the large door.": "Quelque chose d’invisible ouvre la grande porte.",
        "To do this, you must remove one of the following items:": "Pour cela, vous devez retirer l’un des objets suivants :",
        "Terrible wounds open up all over your body!": "De terribles blessures s’ouvrent sur tout votre corps !",
        "Terrible wounds spread across more of your body!": "De terribles blessures s’étendent sur une plus grande partie de votre corps !",
        "The terrible wounds on your body vanish.": "Les terribles blessures de votre corps disparaissent.",
        "Welcome back to the Elven Halls!": "Bon retour dans les Halls Elfiques !",
        "Welcome back to the Orcish Mines!": "Bon retour dans les Mines orques !",
        "Welcome back to the Vaults!": "Bon retour dans les Chambres Fortes !",
        "Welcome to the Vaults!": "Bienvenue dans les Chambres Fortes !",
        "You are cast into the Abyss!": "Vous êtes projeté dans l’Abîme !",
        "You are encased in ice.": "Vous êtes pris dans la glace.", "The ice encasing you melts away.": "La glace qui vous enserre fond.",
        "The frost grips you.": "Le givre vous saisit.",
        "You are engulfed in blazing flames.": "Vous êtes englouti par des flammes ardentes.",
        "You are engulfed in flames!": "Vous êtes englouti par les flammes !",
        "You are no longer corroded.": "Vous n’êtes plus corrodé.", "You are unimpeded by mud.": "La boue ne vous gêne pas.",
        "You can act again.": "Vous pouvez de nouveau agir.", "You can breathe torrents of mud.": "Vous pouvez cracher des torrents de boue.",
        "You spew a torrent of mud.": "Vous crachez un torrent de boue.",
        "You die...": "Vous mourez…", "You resist.": "Vous résistez.", "You hold your ground!": "Vous tenez bon !",
        "You enter an ornate necropolis!": "Vous entrez dans une Nécropole ornée !",
        "You fade into invisibility!": "Vous vous fondez dans l’invisibilité !", "You flicker back into view.": "Vous réapparaissez.",
        "You flicker for a moment.": "Vous vacillez un instant.",
        "You feel a little less murderous for the moment.": "Vous vous sentez un peu moins meurtrier pour l’instant.",
        "You feel power welling in your lungs.": "Vous sentez la puissance monter dans vos poumons.",
        "You feel the corruption within you wane completely.": "Vous sentez la corruption en vous disparaître complètement.",
        "You feel the corruption within you wane somewhat.": "Vous sentez la corruption en vous s’affaiblir quelque peu.",
        "You feel your attacks grow feeble.": "Vous sentez vos attaques s’affaiblir.",
        "Your attacks no longer feel as feeble.": "Vos attaques ne vous semblent plus aussi faibles.",
        "You feel your health improve.": "Vous sentez votre santé s’améliorer.",
        "You go down through the gate.": "Vous descendez par le portail.", "You open the gate.": "Vous ouvrez le portail.",
        "You open the huge gate.": "Vous ouvrez l’immense portail.",
        "You hear a bark!": "Vous entendez un aboiement !", "You hear a horrible gurgling sound!": "Vous entendez un horrible gargouillis !",
        "You hear a roar!": "Vous entendez un rugissement !", "You hear a sizzling sound!": "Vous entendez un grésillement !",
        "You hear a trumpeting!": "Vous entendez un barrissement !",
        "You hear the lone wailing of a funeral chant nearby.": "Vous entendez la lamentation solitaire d’un chant funèbre à proximité.",
        "You hear the lone wailing of a funeral chant very nearby.": "Vous entendez la lamentation solitaire d’un chant funèbre tout près.",
        "You hear the solemn chanting of funerary rites.": "Vous entendez le chant solennel de rites funéraires.",
        "You reach down and sample some spriggan biscuits. Delicious.": "Vous vous penchez et goûtez des biscuits de spriggan. Délicieux.",
        "You start removing your armour.": "Vous commencez à retirer votre armure.",
        "Your extra speed is starting to run out.": "Votre vitesse supplémentaire commence à s’épuiser.",
        "Your magical effects are unravelling.": "Vos effets magiques se défont.",
        "Hepliaklqana delivers you to your ancestors.": "Hepliaklqana vous conduit auprès de vos ancêtres.",
        "It has mastered the following spells, which are affected by silence and antimagic:": "Il maîtrise les sorts suivants, affectés par le silence et l’antimagie :",
        "It can see invisible.": "Il voit l’invisible.",
        "[Your body sometimes grows weak upon taking damage.]": "[Votre corps s’affaiblit parfois lorsque vous subissez des dégâts.]",
        "[Your health recovers twice as slowly from being drained.]": "[Votre santé récupère deux fois plus lentement lorsque vous êtes drainé.]",
        "[Y]es or [N]o only, please.": "[O]ui ou [N]on seulement, s’il vous plaît.",
        "No status effects": "Aucun effet de statut", "no status effects": "aucun effet de statut",
        "There is an entrance to the Necropolis on this level. Hurry and find it before the portal closes!": "Il y a une entrée vers la Nécropole sur ce niveau. Dépêchez-vous de la trouver avant que le portail ne se ferme !",
        "There is an entrance to the Necropolis on this level. Hurry and find it before": "Il y a une entrée vers la Nécropole sur ce niveau. Dépêchez-vous de la trouver avant que",
        "the portal closes!": "le portail ne se ferme !",
        "The shards fragment into shrapnel!": "Les éclats se fragmentent en shrapnel !",
        "The sphere of damnation explodes!": "La sphère de damnation explose !",
        "The arrow is repelled.": "La flèche est repoussée.", "The dart is repelled.": "La fléchette est repoussée.",
        "The bolt is repelled.": "Le carreau est repoussé.", "You block the bolt.": "Vous bloquez le carreau.",
        "Letters toggle": "Lettres (basculer)", "Dormant:": "Dormant :", "Transient mutations.": "Mutations transitoires.", ": Transient mutations.": ": Mutations transitoires.",
        "Was an Initiate of Hepliaklqana.": "Était un Initié d’Hepliaklqana.",
        "Slain by an orc": "Tué par un orc", "Best Crawlers -": "Meilleurs explorateurs -", "examine": "examiner", "put on": "mettre",
        "T - Temple": "T - Temple", "Hit": "Coup"
    };
    for (const [en, fr] of Object.entries(FIXE)) T[en] = fr;

    // --- Règles (expressions régulières) ---
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };

    // « jackal!! » : plusieurs points d'exclamation -> on traduit la version à un seul « ! » puis on remet les autres
    R.push({ regex: /^(.+?[^!\s])(!{2,})$/, translate: m => {
        const r = T1(m[1] + "!"); if (!r || r === m[1] + "!") return null;
        return r.replace(/ ?!$/, " ") + m[2]; } });
    // « ... x2 » ajouté par le jeu à une phrase répétée
    // (déjà géré par le moteur)

    // Boutiques : « Welcome to Boniuse's Armour Boutique! What would you like to do? »
    const GENRES = { "Armour": "d’armures", "Weapon": "d’armes", "Antique Armour": "d’armures anciennes", "Antique Weapon": "d’armes anciennes", "Antiques": "d’antiquités",
        "Magic Scroll": "de parchemins magiques", "Scroll": "de parchemins", "Book": "de livres", "Jewellery": "de bijoux", "Wand": "de baguettes", "Food": "de nourriture",
        "General": "générale", "Gadget": "de gadgets", "Assorted Antiques": "d’antiquités variées", "Potion": "de potions", "Distillery": "de potions" };
    const TYPES_BOUTIQUE = { Boutique: "Boutique", Shoppe: "Boutique", Emporium: "Grand magasin", Store: "Magasin", Market: "Marché", Shop: "Boutique" };
    const boutique = nom => {
        let m;
        if ((m = /^(.+?)'s Distillery$/.exec(nom))) return `Distillerie de ${m[1]}`;
        if ((m = /^(.+?)'s (Antique Armour|Antique Weapon|Armour|Weapon|Magic Scroll|Scroll|Book|Jewellery|Wand|Food|General|Gadget|Potion) (Boutique|Shoppe|Emporium|Store|Market|Shop)$/.exec(nom))) {
            const g = GENRES[m[2]]; return m[2] === "General" ? `${TYPES_BOUTIQUE[m[3]]} générale de ${m[1]}` : `${TYPES_BOUTIQUE[m[3]]} ${g} de ${m[1]}`;
        }
        if ((m = /^(.+?)'s Assorted Antiques$/.exec(nom))) return `Antiquités variées de ${m[1]}`;
        return null;
    };
    const NOMB = "([A-Z][\\w'’ -]*?'s (?:Antique Armour|Antique Weapon|Armour|Weapon|Magic Scroll|Scroll|Book|Jewellery|Wand|Food|General|Gadget|Potion) (?:Boutique|Shoppe|Emporium|Store|Market|Shop)|[A-Z][\\w'’ -]*?'s Distillery|[A-Z][\\w'’ -]*?'s Assorted Antiques)";
    R.push({ regex: new RegExp("^Welcome to " + NOMB + "! What would you like to do\\?$"), translate: m => { const b = boutique(m[1]); return b ? `Bienvenue : ${b} ! Que désirez-vous ?` : null; } });
    R.push({ regex: new RegExp("^Found " + NOMB + "\\.$"), translate: m => { const b = boutique(m[1]); return b ? `${b} repérée.` : null; } });
    R.push({ regex: new RegExp("^There is an entrance to " + NOMB + " here\\.$"), translate: m => { const b = boutique(m[1]); return b ? `Il y a ici l’entrée de : ${b}.` : null; } });

    // Objets / éléments précédés d'un lieu : « g - [Necropolis] a huge runed translucent gate », « [Orc:2] a falchion (72 gold) »
    const ELEM = { "huge runed translucent gate": "immense portail runique translucide", "large runed translucent door": "grande porte runique translucide",
        "transporter": "transporteur", "transporter landing site": "site d’atterrissage de transporteur", "huge open gate": "immense portail ouvert",
        "large open translucent door": "grande porte translucide ouverte", "weapon-inlaid floor": "sol incrusté d’armes", "open door": "porte ouverte" };
    R.push({ regex: /^((?:[A-Za-z] - )?)\[([A-Z][A-Za-z ]*)(:\d+)?\] (an? .+)$/, translate: m => {
        const bra = T1(m[2]); const nom = bra && bra !== m[2] ? bra : m[2];
        const rest = m[4]; const sans = rest.replace(/^an? /, "");
        let tr = ELEM[sans] ? (/^[aeiouyh]/.test(ELEM[sans]) ? "un " : /e$/.test(ELEM[sans].split(" ")[0]) ? "une " : "un ") + ELEM[sans] : null;
        if (!tr) { const r = T1(rest); if (!r || r === rest) return null; tr = r; }
        return `${m[1]}[${nom}${m[3] || ""}] ${tr}`; } });
    R.push({ regex: /^There is (an? .+?), spattered with blood here\.$/, translate: m => {
        const r = T1(`There is ${m[1]} here.`); if (!r || r === `There is ${m[1]} here.`) return null;
        return r.replace(/ ici\.$/, ", maculé de sang, ici."); } });
    R.push({ regex: /^There is (an? (?:huge open gate|large open translucent door|transporter landing site|weapon-inlaid floor)) here\.$/, translate: m => {
        const e = ELEM[m[1].replace(/^an? /, "")]; return e ? `Il y a ${/^(immense|grande)/.test(e) ? (/portail|porte/.test(e) ? (/portail/.test(e) ? "un " : "une ") : "un ") : (/sol/.test(e) ? "un " : "un ")}${e} ici.` : null; } });

    // « You encounter 2 crawling flesh cages and an arcanist. The arcanist is wielding a +2 dagger of venom. »
    R.push({ regex: /^(.+?\.) ((?:The|A|An|It|She|He|Your) .+\.)$/, translate: m => {
        const a = T1(m[1]), b = T1(m[2]); if (!a || !b || a === m[1] || b === m[2]) return null; return a + " " + b; } });

    // Actions sur l'équipement : « You remove your +6 ring of dexterity. »
    for (const [en, fr] of [["You remove your", "Vous retirez votre"], ["You continue removing your", "Vous continuez à retirer votre"], ["You finish removing your", "Vous finissez de retirer votre"],
        ["You start removing your", "Vous commencez à retirer votre"], ["You put on your", "Vous mettez votre"]]) {
        R.push({ regex: new RegExp("^" + en + " (.+)\\.$"), translate: m => { const r = T1("the " + m[1]); if (!r || r === "the " + m[1]) return null; return `${fr} ${r.replace(/^(?:le |la |l’|les )/, "")}.`; } });
    }
    R.push({ regex: /^You now have enough gold to buy (.+) on ([A-Za-z]+:\d+)\.$/, translate: m => {
        const r = T1(m[1]); if (!r || r === m[1]) return null; return `Vous avez maintenant assez d’or pour acheter ${r} à ${m[2]}.`; } });
    R.push({ regex: /^You have about (\d+)% to hit with your (.+?) and (\d+)% to hit with your tail-slap( \(while incapacitated\))?\.$/, translate: m => {
        const r = T1("your " + m[2]); const a = r && r !== "your " + m[2] ? r.replace(/^(?:votre |ton )/, "") : m[2];
        return `Vous avez environ ${m[1]} % de chances de toucher avec votre ${a} et ${m[3]} % avec votre coup de queue${m[4] ? " (en étant incapable d’agir)" : ""}.`; } });
    R.push({ regex: /^Your dull grey scales are hard\. \(AC \+(\d+)\)$/, translate: m => `Vos écailles gris terne sont dures. (CA +${m[1]})` });
    R.push({ regex: /^Goodbye, ([A-Za-z]+)\.$/, translate: m => `Au revoir, ${m[1]}.` });
    R.push({ regex: /^\.\.\. wielding (.+)$/, translate: m => { const r = T1(m[1]); return r && r !== m[1] ? `… maniant ${r}` : null; } });
    R.push({ regex: /^\.\.\. on level (\d+) of the (.+)\.$/, translate: m => { const r = T1(m[2]); return `… au niveau ${m[1]} de ${/^(?:le |la |l’|les )/.test(r) ? r : "la branche " + r}.`; } });
    R.push({ regex: /^The game lasted (\d+:\d+:\d+) \((\d+) turns\)\.$/, translate: m => `La partie a duré ${m[1]} (${m[2]} tours).` });

    // --- « You encounter 2 harpy simulacra and a dancing +2 flail of holy wrath. » ---
    const AC = t => { const C = globalThis.DCSS_COMBAT; return C && C.acteurTexte ? C.acteurTexte(t) : null; };
    const singulier = mot => {
        const c = [mot];
        if (/simulacra$/.test(mot)) c.push(mot.replace(/simulacra$/, "simulacrum"));
        if (/ies$/.test(mot)) c.push(mot.replace(/ies$/, "y"));
        if (/ves$/.test(mot)) c.push(mot.replace(/ves$/, "f"), mot.replace(/ves$/, "fe"));
        if (/men$/.test(mot)) c.push(mot.replace(/men$/, "man"));
        if (/es$/.test(mot)) c.push(mot.slice(0, -2));
        if (/s$/.test(mot)) c.push(mot.slice(0, -1));
        return c;
    };
    const pluriel = n => {
        const i = n.search(/ (?:de |d’|du |des |à |\()/);
        const tete = i === -1 ? n : n.slice(0, i), reste = i === -1 ? "" : n.slice(i);
        return tete.split(" ").map(w => /[sxz]$/.test(w) ? w : w + "s").join(" ") + reste;
    };
    const TITRES_UNIQUES = { Flawless: "l’Impeccable", Inquisitive: "l’Inquisitive", "Apprentice Sorceress": "l’Apprentie Sorcière", Apprentice: "l’Apprenti" };
    const elementRencontre = e => {
        let m;
        if ((m = /^(?:an? |the )(.+)$/.exec(e))) { const a = AC("a " + e.replace(/^(?:an? |the )/, "")); return a ? a.o : null; }
        if ((m = /^(\d+) (.+)$/.exec(e))) {
            const mots = m[2].split(" "); const dernier = mots.pop();
            for (const cand of singulier(dernier)) {
                const a = AC("a " + mots.concat(cand).join(" "));
                if (a && a.n) return m[1] + " " + pluriel(a.n);
            }
            return null;
        }
        if ((m = /^([A-Z][\w'-]+) the ([A-Z][\w ]+)$/.exec(e))) { const t = TITRES_UNIQUES[m[2]]; return t ? `${m[1]} ${t}` : `${m[1]} the ${m[2]}`; }
        const a = AC(e); return a ? a.o : null;
    };
    const TITRES_VIRGULE = { "Brother of Duvessa": "frère de Duvessa", "Sister of Dowan": "sœur de Dowan", "Prince of Dust": "prince de la poussière", "Inventive Apiarist": "apiculteur inventif", "a Mercenary": "un mercenaire" };
    R.push({ regex: /^You encounter ([^.]+?)\.$/, translate: m => {
        let src = m[1]; for (const t of Object.keys(TITRES_VIRGULE)) src = src.split(", " + t).join("\u0001" + t);
        const parts = src.split(/, | and /); const out = [];
        for (const e of parts) {
            const i = e.indexOf("\u0001");
            if (i !== -1) { const r = elementRencontre(e.slice(0, i)); if (!r) return null; out.push(r + ", " + TITRES_VIRGULE[e.slice(i + 1)]); continue; }
            const r = elementRencontre(e); if (!r) return null; out.push(r); }
        const liste = out.length < 2 ? out[0] : out.slice(0, -1).join(", ") + " et " + out[out.length - 1];
        return `Vous rencontrez ${liste}.`; } });

    // --- Ligne d'examen d'un monstre : « a deep elf knight, wielding X and wearing Y (wandering, 46% to hit) » ---
    const ETATS = { wandering: "errant", "deflecting missiles": "dévie les projectiles", "hasn't noticed you": "ne vous a pas remarqué",
        "lightly drained": "légèrement drainé", "more vulnerable to fire": "plus vulnérable au feu", summoned: "invoqué", fast: "rapide", strong: "fort",
        "spells empowered": "sorts renforcés", "chanting recall": "psalmodie un rappel", "sheltered from injuries": "à l’abri des blessures",
        "covering ground slowly": "couvre le terrain lentement", "out of phase": "hors phase", slow: "lent", asleep: "endormi", sleeping: "endormi",
        paralysed: "paralysé", confused: "confus", frightened: "effrayé", berserk: "enragé", poisoned: "empoisonné", invisible: "invisible",
        "dormant ghost": "fantôme dormant", "heavily drained": "fortement drainé", "moderately drained": "modérément drainé" };
    Object.assign(ETATS, { "ally target": "cible alliée", susceptible: "vulnérable", "inner flame": "flamme intérieure", friendly: "allié",
        "noxious fumes": "vapeurs nocives", "black smoke": "fumée noire", "purple smoke": "fumée violette", lava: "lave", "sparse dust": "poussière clairsemée",
        water: "eau", "shallow water": "eau peu profonde", "deep water": "eau profonde", flame: "flammes", thunder: "orage", "catching its breath": "reprend son souffle",
         "badly wounded": "gravement blessé" });
    const etatUn = e => {
        if (ETATS[e]) return ETATS[e];
        let m;
        if ((m = /^chance to call a sprite on attack: (\d+)%$/.exec(e))) return `${m[1]} % de chances d’appeler un lutin à l’attaque`;
        if ((m = /^chance to affect: (\d+)%$/.exec(e))) return `${m[1]} % de chances d’affecter`;
        if ((m = /^(\d+)% to hit$/.exec(e))) return `${m[1]} % de chances de toucher`;
        return null;
    };
    const etats = liste => {
        const out = [];
        for (const e of liste.split(", ")) { const t = etatUn(e); if (!t) return null; out.push(t); }
        return out;
    };
    R.push({ regex: /^((?:, [a-z' -]+)+), (\d+)% to hit\)$/, translate: m => {
        const l = etats(m[1].slice(2)); return l ? `, ${l.join(", ")}, ${m[2]} % de chances de toucher)` : null; } });
    R.push({ regex: /^, (\d+)% to hit\)$/, translate: m => `, ${m[1]} % de chances de toucher)` });
    const objets = txt => {
        const garde = []; const t = txt.replace(/\{[^}]*\}/g, b => { garde.push(b); return "\u0001" + (garde.length - 1) + "\u0001"; });
        const items = t.split(/, | and /); const out = [];
        for (const it0 of items) {
            const acc = /^(.*?)( \u0001\d+\u0001)$/.exec(it0.trim());   // propriétés « {Energy, Str+3} » : on traduit le nom seul
            const it = acc ? acc[1] : it0;
            let r = T1(it.trim());
            if ((!r || r === it.trim()) && /^[a-z -]+s$/.test(it.trim())) { const r2 = T1("2 " + it.trim()); if (r2 && r2 !== "2 " + it.trim()) r = r2.replace(/^2 /, ""); }
            if (!r || r === it.trim()) return null;
            if (acc) r += acc[2];
            out.push(r.replace(/\u0001(\d+)\u0001/g, (_, i) => garde[+i]));
        }
        return out.length < 2 ? out[0] : out.slice(0, -1).join(", ") + " et " + out[out.length - 1];
    };
    // « She is wielding a +3 dagger of electrocution and carrying a wand of paralysis. » (phrase qui suit « You encounter … »)
    R.push({ regex: /^(It|She|He) (?:is|are) ((?:wielding|wearing|carrying|quivering) .+)\.$/, translate: m => {
        const segs = m[2].split(/ and (?=wearing |carrying |quivering )|, (?=wearing |carrying |quivering )/); const fr = [];
        for (const sg of segs) {
            const k = /^(wielding|wearing|carrying|quivering) (.+)$/.exec(sg); if (!k) return null;
            let o = objets(k[2]); if (!o) return null;
            if (k[1] === "quivering" && !/^(?:des|un|une|le|la|l’|les|\d)/.test(o)) o = "des " + o;
            fr.push({ wielding: "manie", wearing: "porte", carrying: "transporte", quivering: "a en carquois" }[k[1]] + " " + o);
        }
        return `${m[1] === "She" ? "Elle" : "Il"} ${fr.join(" et ")}.`; } });
    R.push({ regex: /^((?:an? |the )?[A-Za-z][\w' -]*?|[A-Z][\w'-]+), (wielding .+?|wearing .+?|carrying .+?|quivering .+?)(?: \((.*?)(?:, )?(?:(\d+)% to hit\)|\)))?$/, translate: m => {
        const a = /^[A-Z]/.test(m[1]) && !/^(?:An?|The) /.test(m[1]) ? { o: m[1] } : AC(m[1].replace(/^the /, "a ")); if (!a) return null;
        const segs = m[2].split(/ and (?=wearing |carrying |quivering )|, (?=wearing |carrying |quivering )/); const fr = [];
        for (const sg of segs) {
            const k = /^(wielding|wearing|carrying|quivering) (.+)$/.exec(sg); if (!k) return null;
            let o = objets(k[2]); if (!o) return null;
            if (!/^(?:des|un|une|le|la|l’|les|\d)/.test(o)) o = "des " + o;
            fr.push({ wielding: "maniant", wearing: "portant", carrying: "transportant", quivering: "avec en carquois" }[k[1]] + " " + o);
        }
        let fin = "";
        if (m[3] !== undefined || m[4] !== undefined) {
            const l = m[3] ? etats(m[3]) : []; if (!l) return null;
            if (m[4]) l.push(m[4] + " % de chances de toucher");
            fin = " (" + l.join(", ") + ")";
        }
        return `${a.o}, ${fr.join(" et ")}${fin}`; } });
    R.push({ regex: /^((?:an? |the )?[a-z][\w' -]*?) \((.*?)(?:, )?(\d+)% to hit\)$/, translate: m => {
        const a = AC(m[1].replace(/^the /, "a ")); if (!a) return null; const l = m[2] ? etats(m[2]) : []; if (!l) return null; l.push(m[3] + " % de chances de toucher");
        return `${a.o} (${l.join(", ")})`; } });
    // Lignes d'examen coupées par le retour à la ligne : « a lava snake (lava, » / « , poisoned, susceptible) » / « a kobold (chance to affect: 56%) »
    R.push({ regex: /^((?:an? |the )?[a-z][\w' -]*?) \((.+?),$/, translate: m => {
        const a = AC(m[1].replace(/^the /, "a ")); if (!a) return null; const l = etats(m[2]); if (!l) return null; return `${a.o} (${l.join(", ")},`; } });
    R.push({ regex: /^((?:an? |the )?[a-z][\w' -]*?) \((.+)\)$/, translate: m => {
        const a = AC(m[1].replace(/^the /, "a ")); if (!a) return null; const l = etats(m[2]); if (!l) return null; return `${a.o} (${l.join(", ")})`; } });
    R.push({ regex: /^, ((?:[a-z' :%\d-]+, )*[a-z' :%\d-]+)\)$/, translate: m => { const l = etats(m[1]); return l ? `, ${l.join(", ")})` : null; } });
    R.push({ regex: /^((?:an? |the )?[A-Za-z][\w' -]*?|[A-Z][\w'-]+), (wielding .+?|wearing .+?|carrying .+?|quivering .+?) \((.+),$/, translate: m => {
        const r = T1(`${m[1]}, ${m[2]} (${m[3]}, 1% to hit)`); if (!r || !/ \(.*, 1 % de chances de toucher\)$/.test(r)) return null;
        return r.replace(/, 1 % de chances de toucher\)$/, ",");
    } });
    R.push({ regex: /^What level of the (.+)\? \(default (\d+), \? - help\)$/, translate: m => { const b = T1(m[1]); return `Quel niveau de ${b && b !== m[1] ? b : m[1]} ? (par défaut ${m[2]}, ? - aide)`; } });
    R.push({ regex: /^Where to\? \(Tab\/Enter - (.+), \? - help\)$/, translate: m => `Où aller ? (Tab/Entrée - ${m[1]}, ? - aide)` });

    // --- Objets non identifiés à adjectif d'apparence : « a glowing hat », « a runed long sword », « a pair of spiked boots » ---
    const APPARENCE = { "brightly glowing": ["étincelant", "étincelante"], glowing: ["luisant", "luisante"], runed: ["runique", "runique"],
        shiny: ["brillant", "brillante"], embroidered: ["brodé", "brodée"], jewelled: ["serti de joyaux", "sertie de joyaux"],
        dyed: ["teint", "teinte"], twisted: ["tordu", "tordue"] };
    R.push({ regex: /^((?:[A-Za-z] - )?(?:\[[^\]]+\] )?)(an?|the) (brightly glowing|glowing|runed|shiny|embroidered|jewelled|dyed|twisted) (.+?)( \(.+\))?$/, translate: m => {
        const base = T1(`${m[2]} ${m[4]}`); if (!base || base === `${m[2]} ${m[4]}`) return null;
        const fem = /^(?:une |la )/.test(base); const adj = APPARENCE[m[3]][fem ? 1 : 0];
        return `${m[1]}${base} ${adj}${m[5] || ""}`; } });
    R.push({ regex: /^((?:[A-Za-z] - )?(?:\[[^\]]+\] )?)(an?|the) pair of spiked boots$/, translate: m => `${m[1]}${m[2] === "the" ? "la" : "une"} paire de bottes à pointes` });
    R.push({ regex: /^(.+?) \((\d+) gold\)$/, translate: m => { const r = T1(m[1]); return r && r !== m[1] ? `${r} (${m[2]} pièces d’or)` : null; } });
    R.push({ regex: /^(.+?) \(gained (\d+) charges?\)$/, translate: m => { const r = T1(m[1]); return r && r !== m[1] ? `${r} (+${m[2]} charge${+m[2] > 1 ? "s" : ""})` : null; } });
    R.push({ regex: /^or ([A-Za-z]) - (.+)$/, translate: m => { const r = T1(m[2]); return r && r !== m[2] ? `ou ${m[1]} - ${r}` : null; } });
    R.push({ regex: /^\((\d+)% risk of failure\)$/, translate: m => `(${m[1]} % de risque d’échec)` });
    R.push({ regex: /^\((\d+) damage\)$/, translate: m => `(${m[1]} dégâts)` });
    R.push({ regex: /^HPRegen ([\d.]+)\/turn MPRegen ([\d.]+)\/turn$/, translate: m => `Régén. PV ${m[1].replace(".", ",")}/tour Régén. PM ${m[2].replace(".", ",")}/tour` });
    R.push({ regex: /^Gear: (\d+)\/(\d+) gear slots \(Left\/Right\/Tab to switch category\)$/, translate: m => `Équipement : ${m[1]}/${m[2]} emplacements (Gauche/Droite/Tab pour changer de catégorie)` });
    R.push({ regex: /^(\w+'s ghost)\.$/, translate: m => { const a = AC(m[1]); return a ? a.S + "." : null; } });
    // --- Messages du code source avec trous (0.12.1) ---
    const SRC = {
        "Angry insects surge out from beneath {I} foliage!": "Des insectes en colère surgissent du feuillage {d1} !",
        "Poisonous fumes billow around {A}!": "Des fumées toxiques tourbillonnent autour {d1} ! ¦ Des fumées toxiques tourbillonnent autour de vous !",
        "Rot billows forth from {I} wounds!": "La pourriture jaillit des blessures {d1} !",
        "Shards of ice erupt from {I} body!": "Des éclats de glace jaillissent du corps {d1} !",
        "Terrible wounds open up all over {I} body!": "De terribles blessures s’ouvrent sur tout le corps {d1} !",
        "Terrible wounds spread across more of {I} body!": "De terribles blessures s’étendent sur une plus grande partie du corps {d1} !",
        "The terrible wounds on {I} body vanish.": "Les terribles blessures du corps {d1} disparaissent.",
        "Thorns of ice sprout around {A}.": "Des épines de glace poussent autour {d1}. ¦ Des épines de glace poussent autour de vous.",
        "Magical energy flows from {A} into your mind!": "L’énergie magique de {o1} afflue dans votre esprit !",
        "The light of Elyvilon comforts {A}.": "La lumière d’Elyvilon réconforte {o1}. ¦ La lumière d’Elyvilon vous réconforte.",
        "The light of Elyvilon almost touches upon {A}.": "La lumière d’Elyvilon touche presque {o1}. ¦ La lumière d’Elyvilon vous touche presque.",
        "The light of Elyvilon fails to reach {A}.": "La lumière d’Elyvilon n’atteint pas {o1}. ¦ La lumière d’Elyvilon ne vous atteint pas.",
        "You devour {A}!": "Vous dévorez {o1} !",
        "You attack {A}.": "Vous attaquez {o1}.",
        "You pounce on {A} with bestial fury!": "Vous bondissez sur {o1} avec une fureur bestiale !",
        "You swear to avenge {I} death!": "Vous jurez de venger la mort {d1} !",
        "You wrap your dark will around {I} soul!": "Vous enroulez votre sombre volonté autour de l’âme {d1} !",
        "Your grip on {I} soul is slipping...": "Votre emprise sur l’âme {d1} faiblit…",
        "You lose your grip on {I} soul.": "Vous perdez votre emprise sur l’âme {d1}.",
        "Your paragon deflects {I} attack away from you.": "Votre parangon détourne l’attaque {d1} loin de vous.",
        "Your unholy armour drains life force from {A}.": "Votre armure impie draine la force vitale de {o1}.",
        "Zin imprisons {A} with walls of pure silver!": "Zin emprisonne {o1} dans des murs d’argent pur !",
        "You focus your ray upon {A}.": "Vous concentrez votre rayon sur {o1}.",
        "You lock target on {A} and prepare to deploy your bee.": "Vous verrouillez la cible sur {o1} et préparez le déploiement de votre abeille.",
        "You need more space to imprison {A}.": "Il vous faut plus d’espace pour emprisonner {o1}.",
        "You welcome {A} into your grasp.": "Vous accueillez {o1} dans votre étreinte.",
        "You turn to {A}.": "Vous vous tournez vers {o1}.",
        "You also have {X} vouchers.": "Vous avez aussi {x1} bons d’achat.",
        "You also have {X} voucher.": "Vous avez aussi {x1} bon d’achat."
    };
    for (const [en, fr] of Object.entries(SRC)) if (!(en in T)) T[en] = fr;
    T["{A} is wielding {X} and wearing {X}."] = "{S1} manie {x2} et porte {x3}.";
    T["{A} is wielding {X}, wearing {X} and carrying {X}."] = "{S1} manie {x2}, porte {x3} et transporte {x4}.";
    T["{A} is carrying {X}, wearing {X}."] = "{S1} transporte {x2} et porte {x3}.";
    T["{A} assumes the form of {A} and becomes anchored to this world!"] = "{S1} prend la forme {d2} et s’ancre dans ce monde !";
    T["{A} assumes the form of {A}."] = "{S1} prend la forme {d2}.";
    T["The floor, spattered with blood."] = "Le sol, maculé de sang.";
    T["almost destroyed"] = "presque détruit"; T["heavily damaged"] = "gravement endommagé"; T["moderately damaged"] = "modérément endommagé"; T["lightly damaged"] = "légèrement endommagé";
    T["Hit 22"] = "Hit 22";
    delete T["Hit 22"];
    R.push({ regex: /^Began as an? (.+) on (.+)\.$/, translate: null });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R.filter(r => typeof r.translate === "function"));
})();
