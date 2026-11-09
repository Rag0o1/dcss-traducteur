// Messages à variables, partie H (0.10) : sorts et capacités des monstres vus en jeu (arène) : souffles, projectiles,
// invocations de dieux, vortex, racines, etc. Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = {};
    T["The wavering orb of destruction weakly hits {A}!"] = "L’orbe de destruction vacillant touche faiblement {o1} ! ¦ L’orbe de destruction vacillant vous touche faiblement !";
    T["The wavering orb of destruction weakly hits {A}."] = "L’orbe de destruction vacillant touche faiblement {o1}. ¦ L’orbe de destruction vacillant vous touche faiblement.";
    // Phrases avec un sujet et une cible : la cible peut être un monstre ({A}) ou « you »
    const DEUX = {
        "{A} breathes a rupture in space-time at": ["{S1} souffle une déchirure de l’espace-temps sur", "{S1} souffle une déchirure de l’espace-temps sur"],
        "{A} solemnly invokes the wrath of {X} at": ["{S1} invoque solennellement la colère de {x2} contre", ""],
        "{A} invokes the aid of {X} against": ["{S1} invoque l’aide de {x2} contre", ""],
        "{A} calls down the wrath of {X} upon": ["{S1} appelle la colère de {x2} sur", ""],
        "{A} mumbles some strange prayers to {X} against": ["{S1} marmonne d’étranges prières à {x2} contre", ""],
        "{A} breathes flames at": ["{S1} souffle des flammes sur", ""], "{A} breathes frost at": ["{S1} souffle du givre sur", ""],
        "{A} breathes noxious fumes at": ["{S1} souffle des vapeurs nocives sur", ""], "{A} breathes lightning at": ["{S1} souffle de la foudre sur", ""],
        "{A} breathes spectral mist at": ["{S1} souffle une brume spectrale sur", ""],
        "{A} fires a burst of electricity at": ["{S1} tire une salve d’électricité sur", ""],
        "{A} spits a shard of ice at": ["{S1} crache un éclat de glace sur", ""], "{A} spits acid at": ["{S1} crache de l’acide sur", ""],
        "{A} fires a shard of itself at": ["{S1} projette un éclat de lui-même sur", ""],
        "{A} releases spores at": ["{S1} libère des spores sur", ""], "{A} gazes at": ["{S1} fixe", "du regard"],
        "{A} gestures at": ["{S1} désigne", ""], "{A} gazes fiercely through": ["{S1} regarde férocement à travers", ""],
        "{A} rends the earth beneath": ["{S1} déchire la terre sous", ""], "{A} runs its roots beneath": ["{S1} glisse ses racines sous", ""],
        "{A} launches a ball of destructive magic at": ["{S1} lance une boule de magie destructrice sur", ""],
        "{A} hits {X} from afar with": null
    };
    for (const [en, v] of Object.entries(DEUX)) {
        if (!v) continue;
        const [debut, fin] = v;
        const suf = fin ? " " + fin : "";
        for (const p of [".", "!"]) {
            const pf = p === "!" ? " !" : ".";
            T[`${en.replace("{A}", "{A}")} {A}${p}`] = `${debut} ${en.includes("{X}") ? "{o3}" : "{o2}"}${suf}${pf}`;
            T[`${en} you${p}`] = `${debut} vous${suf}${pf}`;
        }
    }
    // Clés « {X} » : le dieu est le trou 2 ; la cible est donc le trou 3 (déjà géré ci-dessus)
    Object.assign(T, {
        "{A} glows sapphire.": "{S1} brille d’un éclat saphir.",
        "{A} drains the heat from the surrounding environment!": "{S1} aspire la chaleur environnante !",
        "{A} snaps their fingers.": "{S1} claque des doigts.",
        "{A} renews itself in a burst of flame!": "{S1} se régénère dans une gerbe de flammes !",
        "{A}, emptied of spiritual energy, fades out from this realm.": "{S1}, vidé{e1} de son énergie spirituelle, quitte ce monde en s’estompant.",
        "Space twists violently!": "L’espace se tord violemment !",
        "Space warps around {A}.": "L’espace se déforme autour {d1}. ¦ L’espace se déforme autour de vous.",
        "{A} rattles its vertebrae in radiant agony.": "{S1} fait cliqueter ses vertèbres dans une agonie radieuse.",
        "{A} is filled with unearthly specular energy.": "{S1} est rempli{e1} d’une énergie spéculaire surnaturelle.",
        "{A} mumbles some strange prayers to its god.": "{S1} marmonne d’étranges prières à son dieu.",
        "{A} mumbles some strange prayers to {X}.": "{S1} marmonne d’étranges prières à {x2}.",
        "{A} resists with almost no effort.": "{S1} résiste presque sans effort.",
        "{A} easily resists.": "{S1} résiste facilement.",
        "{A} barely resists.": "{S1} résiste de justesse.",
        "{A} beckons forth otherworldly terror in the name of {X}.": "{S1} fait surgir une terreur d’outre-monde au nom de {x2}.",
        "The dungeon shakes, a horrible noise fills the air, and a portal to some otherworldly place is opened!": "Le donjon tremble, un bruit horrible emplit l’air et un portail vers un lieu d’outre-monde s’ouvre !",
        "{A} is summoned!": "{S1} est invoqué{e1} !",
        "{A} smiles without lips.": "{S1} sourit sans lèvres.",
        "{A} looks as sick as possible!": "{S1} semble aussi malade que possible !",
        "{A} pulsates in unstable patterns.": "{S1} pulse en motifs instables.",
        "{A} freezes {A} terribly!": "{S1} gèle {o2} terriblement !",
        "{A} gestures wildly while chanting.": "{S1} gesticule frénétiquement en psalmodiant.",
        "{A} gestures at {A} while chanting.": "{S1} désigne {o2} en psalmodiant.",
        "{A} gestures at you while chanting.": "{S1} vous désigne en psalmodiant.",
        "{A} calls forth blessed flames!": "{S1} fait surgir des flammes bénies !",
        "{A} is engulfed in blessed fire.": "{S1} est englouti{e1} par un feu béni.",
        "{A} shoots a bolt.": "{S1} tire un carreau.",
        "{A} forges a skittering defender to stand by its side.": "{S1} forge un défenseur grouillant qui se tient à ses côtés.",
        "{A} shimmers eerily.": "{S1} chatoie de façon sinistre.",
        "{A} looks satisfied for a moment.": "{S1} semble satisfait{e1} un instant.",
        "A magical hammer augments {A} in a flurry of sparks and slag.": "Un marteau magique renforce {o1} dans une gerbe d’étincelles et de scories.",
        "The confined air twists around weakly and strikes {A}.": "L’air confiné tournoie faiblement et frappe {o1}. ¦ L’air confiné tournoie faiblement et vous frappe.",
        "The confined air twists around weakly and strikes {A}!": "L’air confiné tournoie faiblement et frappe {o1} ! ¦ L’air confiné tournoie faiblement et vous frappe !",
        "The air twists around and strikes {A}.": "L’air tournoie et frappe {o1}. ¦ L’air tournoie et vous frappe.",
        "The air twists around and strikes {A}!": "L’air tournoie et frappe {o1} ! ¦ L’air tournoie et vous frappe !",
        "The open air twists around violently and strikes {A}!": "L’air libre tournoie violemment et frappe {o1} ! ¦ L’air libre tournoie violemment et vous frappe !",
        "{A} summons a swarm of flies.": "{S1} invoque un essaim de mouches.",
        "{A} roars an obscure riddle with a strange tongue.": "{S1} rugit une énigme obscure dans une langue étrange.",
        "{A} screeches a nonsensical riddle in a mystic tongue.": "{S1} hurle une énigme absurde dans une langue mystique.",
        "{A} conjures a destructive force in the name of {X}!": "{S1} invoque une force destructrice au nom de {x2} !",
        "{A} breaks free of the grasping roots!": "{S1} se libère des racines agrippantes !",
        "{A} calls on the powers of chaos!": "{S1} appelle les puissances du chaos !",
        "{A} shouts a warning to its allies!": "{S1} crie un avertissement à ses alliés !",
        "{A} throws a large rock.": "{S1} lance un gros rocher.",
        "{A} writhes about, and something writhes within {A}.": "{S1} se tord, et quelque chose se tord dans {o2}.",
        "{A} sings a powerful hymn!": "{S1} chante un puissant hymne !",
        "The angels go into a battle-frenzy!": "Les anges entrent dans une frénésie de combat !",
        "{A} dissolves into sparkling lights!": "{S1} se dissout en lumières scintillantes !",
        "{A} dissolves into shadows!": "{S1} se dissout dans les ombres !",
        "{A} falls into the water!": "{S1} tombe dans l’eau !",
        "Water spirits pour forth from {A}!": "Des esprits aquatiques jaillissent {d1} !",
        "A torrent of water rises up through {A}!": "Un torrent d’eau jaillit à travers {o1} !",
        "{A} launches a ball of destructive magic.": "{S1} lance une boule de magie destructrice.",
        "{A} drones a funeral chant.": "{S1} entonne un chant funèbre d’une voix monotone.",
        "{A} recites a funeral chant.": "{S1} récite un chant funèbre.",
        "{A} splashes around in the water.": "{S1} barbote dans l’eau.",
        "{A} finishes expelling the water from its lungs.": "{S1} finit d’expulser l’eau de ses poumons.",
        "{A} flickers and vanishes for a moment.": "{S1} vacille et disparaît un instant.",
        "{A} conjures an orb of pure magic.": "{S1} conjure un orbe de magie pure.",
        "{A} marvels to itself over the thinness of mortal minds.": "{S1} s’émerveille en son for intérieur de la minceur des esprits mortels.",
        "{A} glimmers violently.": "{S1} miroite violemment.",
        "{A} discharges a tendril of electricity.": "{S1} décharge un filament d’électricité.",
        "{A} looks braver for a moment.": "{S1} paraît plus brave un instant.",
        "The air becomes perfectly still.": "L’air devient parfaitement immobile.",
        "{A} takes off {X}.": "{S1} retire {x2}.",
        "{A} wears {X}.": "{S1} enfile {x2}.",
        "the acid corrodes {A}!": "L’acide corrode {o1} !",
        "The acid corrodes {A}!": "L’acide corrode {o1} ! ¦ L’acide vous corrode !",
        "{I} mind is gnawed upon.": "L’esprit {d1} est rongé.",
        "{I} foilage glows and foams.": "Le feuillage {d1} luit et mousse.",
        "{I} shape twists and changes as it dies.": "La forme {d1} se tord et change en mourant.",
        "{I} electric aura discharges, shocking {A}.": "L’aura électrique {d1} se décharge et foudroie {o2}.",
        "{I} electric aura discharges, shocking {A}!": "L’aura électrique {d1} se décharge et foudroie {o2} !",
        "water floods into {I} lungs!": "L’eau envahit les poumons {d1} !",
        "water floods into {I} airways!": "L’eau envahit les voies respiratoires {d1} !"
    });
    // Coups avec une partie du corps : « trunk-slaps », « tail-slaps », « pecks », « drains »...
    for (const [v, fr, suite] of [["trunk-slaps", "gifle", " de sa trompe"], ["tail-slaps", "fouette", " de sa queue"], ["pecks", "picore", ""],
                                  ["tramples", "piétine", ""]]) {
        for (const p of [".", "!"]) {
            const pf = p === "!" ? " !" : ".";
            T[`{A} ${v} {A}${p}`] = `{S1} ${fr} {o2}${suite}${pf}`;
            T[`{A} ${v} {A} but does no damage${p}`] = `{S1} ${fr} {o2}${suite} sans lui infliger de dégâts${pf}`;
            T[`{A} ${v} you${p}`] = `{S1} vous ${fr}${suite}${pf}`;
            T[`{A} ${v} you but does no damage${p}`] = `{S1} vous ${fr}${suite} sans vous infliger de dégâts${pf}`;
        }
    }
    T["{A} hits {A} from afar with {X}."] = "{S1} frappe {o2} de loin avec {x3}.";
    T["{A} hits {A} from afar with {X}!"] = "{S1} frappe {o2} de loin avec {x3} !";
    T["{A} hits you from afar with {X}."] = "{S1} vous frappe de loin avec {x2}.";
    T["{A} hits you from afar with {X}!"] = "{S1} vous frappe de loin avec {x2} !";
    T["{I} fulminant prism crackles loudly."] = "Le prisme fulminant {d1} crépite bruyamment.";
    T["{A} crackles loudly."] = "{S1} crépite bruyamment.";
    Object.assign(globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {}, T);
})();
