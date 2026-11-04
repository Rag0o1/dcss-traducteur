// =====================================================================
//  combat.js : messages de combat et lignes « monstre en vue ».
//
//  Principe : le texte anglais est découpé en « acteurs » (monstres, projectiles, effets de sorts...),
//  puis la phrase est reconnue d'après son GABARIT. Exemples :
//     "The faun casts a spell at you."   ->  gabarit "{M} casts a spell at you"
//     "The dart hits the harpy!"         ->  verbe « hits » (voir VERBES) avec deux acteurs
//  Dans le français d'un gabarit, {S1} = acteur 1 en sujet (« Le faune »), {o1} = en complément
//  (« le faune »), {d1} = « du faune / de la nymphe / de l’ours », {a1} = « au faune / à la nymphe »,
//  {e1} = « e » si l'acteur est féminin (« blessé{e1} »). Les chiffres suivent l'ordre dans la phrase.
//
//  Pour ajouter un monstre : donnees/messages/vocabulaire.js (table « monsters »).
//  Pour ajouter une phrase : une ligne dans GABARITS ci-dessous (clé anglaise SANS ponctuation finale).
// =====================================================================
(() => {
    const V = globalThis.DCSS_VOCAB || {};
    const monsters = V.monsters || {};
    const projectiles = V.projectiles || {};

    // Effets de sorts / projectiles qui peuvent être sujet ou cible d'une phrase.
    // [nom français, genre, article optionnel (pour les pluriels)]
    const EFFETS = {
        "bolt of cold": ["rayon de froid", "m"], "bolt of light": ["rayon de lumière", "m"],
        "bolt of dispelling energy": ["rayon d’énergie dissipatrice", "m"], "bolt of fire": ["rayon de feu", "m"],
        "bolt of lightning": ["éclair", "m"], "bolt of draining": ["rayon de drain", "m"],
        "iceblast": ["explosion de glace", "f"], "puff of flame": ["jet de flammes", "m"],
        "thunderbolt": ["foudroiement", "m"], "wave of grief": ["vague de chagrin", "f"],
        "stone arrow": ["flèche de pierre", "f"], "harpoon shot": ["tir de harpon", "m"],
        "mass of rock": ["masse de roche", "f"], "mass of ice": ["masse de glace", "f"],
        "piercing cold": ["froid perçant", "m"], "salvo of frigid ice": ["salve de glace", "f"],
        "shard of frigid ice": ["éclat de glace", "m"], "torrent of water": ["torrent d’eau", "m"],
        "jagged bones": ["os acérés", "m", "les "], "blast of poison": ["souffle de poison", "m"],
        "fiery explosion": ["explosion de feu", "f"], "spray of wooden splinters": ["gerbe d’éclats de bois", "f"],
        "volley of spikes": ["volée de pointes", "f"], "sling bullet": ["balle de fronde", "f"],
        "boomerang": ["boomerang", "m"], "throwing net": ["filet", "m"], "silver": ["argent", "m", "l’"],
        "stone": ["pierre", "f"], "dart": ["fléchette", "f"], "javelin": ["javelot", "m"], "arrow": ["flèche", "f"],
        "poisoned dart": ["fléchette empoisonnée", "f"], "acid": ["acide", "m", "l’"],
        "stream of webbing": ["jet de toile", "m"], "ball of flame": ["boule de flammes", "f"],
        "fireball": ["boule de feu", "f"], "burst of fire": ["rafale de feu", "f"], "bolt of magma": ["rayon de magma", "m"],
        "cloud of poison gas": ["nuage de gaz toxique", "m"], "lightning bolt": ["éclair", "m"], 
        "beam of plasma": ["rayon de plasma", "m"], 
        "gust of wind": ["rafale de vent", "f"], "blast of cold": ["souffle de froid", "m"]
    };

    // Verbes d'action : verbe anglais -> [verbe français, préposition éventuelle ("à"), suffixe]
    const VERBES = {
        hits: ["frappe"], bites: ["mord"], claws: ["griffe"], stings: ["pique"], punches: ["frappe"],
        whips: ["fouette"], slashes: ["taillade"], stabs: ["poignarde"], pierces: ["transperce"], "pierces through": ["transperce"],
        pummels: ["martèle"], touches: ["touche"], slaps: ["gifle"], gores: ["encorne"], tramples: ["piétine"],
        "tentacle-slaps": ["fouette", "", " de ses tentacules"], poisons: ["empoisonne"], shocks: ["électrocute"],
        freezes: ["gèle"], burns: ["brûle"], engulfs: ["engloutit"], constricts: ["étreint"], grabs: ["agrippe"],
        smites: ["foudroie"], kicks: ["donne un coup de pied", "à"], butts: ["donne un coup de tête", "à"],
        headbutts: ["donne un coup de tête", "à"], "pounces on": ["bondit sur"], skewers: ["embroche"],
        skewer: ["embrochent"], corrodes: ["corrode"], "passes through": ["traverse"], lashes: ["fouette"],
        drains: ["draine"], shoots: ["tire sur"], sears: ["brûle"], pulls: ["tire"], smashes: ["écrase"],
        "tramples on": ["piétine"], hit: ["frappent"], "slams into": ["percute"], blasts: ["frappe"], bashes: ["frappe"]
    };
    // Sujets non vivants : « touche » plutôt que « frappe »

    const MIS = { "barely misses": "manque de peu", "closely misses": "rate de justesse", "completely misses": "manque complètement", misses: "rate" };

    // --- Gabarits : clé anglaise sans ponctuation finale -> français ---
    const GABARITS = {
        "Shadowy forms rise from the deep at {M}'s song": "Des formes d’ombre surgissent des profondeurs au chant {d1}",
        "Something barely misses {M}": "Quelque chose manque de peu {o1}",
        "Something closely misses {M}": "Quelque chose rate {o1} de justesse",
        "Something completely misses {M}": "Quelque chose manque complètement {o1}",
        "Something misses {M}": "Quelque chose rate {o1}",
        "Something hits {M}": "Quelque chose frappe {o1}",
        "Something poisons {M}": "Quelque chose empoisonne {o1}",
        "Something stings {M}": "Quelque chose pique {o1}",
        "Something smites you": "Quelque chose vous foudroie",
        "Tentacles reach out from {M}": "Des tentacules jaillissent {d1}",
        "{M} appears confused": "{S1} semble confus{e1}",
        "{M} attacks as it pursues you": "{S1} attaque en vous poursuivant",
        "{M} begins to weave its threads into a brightly glowing ball": "{S1} commence à tisser ses fils en une boule lumineuse",
        "{M} bellows": "{S1} mugit",
        "{M} binds the souls of nearby monsters": "{S1} lie les âmes des monstres proches",
        "{M} blinks": "{S1} clignote",
        "{M} bursts forth from the wound": "{S1} jaillit de la blessure",
        "{M} buzzes angrily": "{S1} bourdonne avec colère",
        "{M} calls down the wrath of its god upon you": "{S1} appelle sur vous la colère de son dieu",
        "{M} calls upon its god to heal {M}": "{S1} implore son dieu de soigner {o2}",
        "{M} casts a spell at you": "{S1} vous lance un sort",
        "{M} casts a spell at {M}": "{S1} lance un sort sur {o2}",
        "{M} changes into {M}": "{S1} se transforme en {o2}",
        "{M} chants a haunting song": "{S1} chante un chant envoûtant",
        "{M} chants its luring song": "{S1} chante son chant attirant",
        "{M} chitters at {M}": "{S1} stridule {a2}",
        "{M} completely resists": "{S1} résiste totalement",
        "{M} dies": "{S1} meurt",
        "{M} disappears in a puff of smoke": "{S1} disparaît dans un nuage de fumée",
        "{M} disappears": "{S1} disparaît",
        "{M} dissipates": "{S1} se dissipe",
        "{M} draws vitality from your injuries": "{S1} puise de la vitalité dans vos blessures",
        "{M} draws vitality from {M}'s injuries": "{S1} puise de la vitalité dans les blessures {d2}",
        "{M} exhales a fierce blast of wind": "{S1} expire une violente rafale de vent",
        "{M} flaps its wings at you": "{S1} bat des ailes dans votre direction",
        "{M} flicks its tail": "{S1} fouette l’air de sa queue",
        "{M} flows with the water": "{S1} se fond dans l’eau",
        "{M} gestures at you while chanting": "{S1} vous désigne en psalmodiant",
        "{M} gestures at you": "{S1} vous désigne",
        "{M} gestures": "{S1} fait un geste",
        "{M} gestures at {M}": "{S1} désigne {o2}",
        "{M} gives a chilling moan": "{S1} pousse un gémissement glaçant",
        "{M} gives a hideous shriek": "{S1} pousse un cri hideux",
        "{M} invokes the aid of its god against you": "{S1} invoque l’aide de son dieu contre vous",
        "{M} is almost destroyed": "{S1} est presque détruit{e1}",
        "{M} is blinded": "{S1} est aveuglé{e1}",
        "{M} is blown up": "{S1} est pulvérisé{e1}",
        "{M} is caught in a web": "{S1} est pris{e1} dans une toile",
        "{M} is charmed": "{S1} est charmé{e1}",
        "{M} is destroyed": "{S1} est détruit{e1}",
        "{M} is devoured by a tear in reality": "{S1} est dévoré{e1} par une déchirure de la réalité",
        "{M} is drained": "{S1} est drainé{e1}",
        "{M} is engulfed in a cloud of scalding steam": "{S1} est englouti{e1} dans un nuage de vapeur brûlante",
        "{M} is engulfed in blazing flames": "{S1} est englouti{e1} par des flammes ardentes",
        "{M} is engulfed in excruciating misery": "{S1} est englouti{e1} par une misère déchirante",
        "{M} is engulfed in freezing vapours": "{S1} est englouti{e1} dans des vapeurs glaçantes",
        "{M} is engulfed in noxious fumes": "{S1} est englouti{e1} dans des vapeurs nocives",
        "{M} is engulfed in poison gas": "{S1} est englouti{e1} dans un gaz toxique",
        "{M} is engulfed in acidic fog": "{S1} est englouti{e1} dans un brouillard acide",
        "{M} is healed somewhat": "{S1} est soigné{e1} en partie",
        "{M} is healed": "{S1} est soigné{e1}",
        "{M} is knocked back by the gust of wind": "{S1} est repoussé{e1} par la rafale de vent",
        "{M} is almost destroyed": "{S1} est presque détruit{e1}",
        "{M} is lightly damaged": "{S1} est légèrement endommagé{e1}",
        "{M} is moderately damaged": "{S1} est modérément endommagé{e1}",
        "{M} is heavily damaged": "{S1} est lourdement endommagé{e1}",
        "{M} is severely damaged": "{S1} est gravement endommagé{e1}",
        "{M} is no longer blind": "{S1} n’est plus aveugle",
        "{M} is no longer encased in ice": "{S1} n’est plus enfermé{e1} dans la glace",
        "{M} is flash-frozen": "{S1} est congelé{e1} instantanément",
        "{M} is pinned in place": "{S1} est cloué{e1} sur place",
        "{M} is smitten": "{S1} est foudroyé{e1}",
        "{M} is staggered": "{S1} chancelle",
        "{M} is unaffected": "{S1} n’est pas affecté{e1}",
        "{M} is killed": "{S1} est tué{e1}",
        "{M} is poisoned": "{S1} est empoisonné{e1}",
        "{M} is stunned by your conviction and fails to attack": "{S1} est étourdi{e1} par votre conviction et n’attaque pas",
        "{M} begins to attack, but is stunned by your conviction": "{S1} commence à attaquer, mais est étourdi{e1} par votre conviction",
        "{M} begins to cast a spell, but is stunned by your conviction": "{S1} commence à lancer un sort, mais est étourdi{e1} par votre conviction",
        "{M} is mesmerised by {M}": "{S1} est hypnotisé{e1} par {o2}",
        "{M} fails to defend itself": "{S1} ne parvient pas à se défendre",
        "{M} leaps": "{S1} bondit",
        "You perforate {M} like a sieve": "Vous perforez {o1} comme une passoire",
        "You skewer {M} like a kebab": "Vous embrochez {o1} comme un kebab",
        "You spit {M} like a pig": "Vous embrochez {o1} comme un cochon",
        "You puncture {M}": "Vous perforez {o1}",
        "You hit {M}": "Vous frappez {o1}",
        "You squeeze {M}": "Vous étreignez {o1}",
        "You destroy {M}": "Vous détruisez {o1}",
        "You barely miss {M}": "Vous manquez {o1} de peu",
        "You closely miss {M}": "Vous ratez {o1} de justesse",
        "You completely miss {M}": "Vous manquez complètement {o1}",
        "You miss {M}": "Vous ratez {o1}",
        "Your squeeze misses {M}": "Votre étreinte manque {o1}",
        "{M} comes into view": "{S1} apparaît",
        "{M} convulses": "{S1} a des convulsions",
        "{M} turns its malevolent gaze towards you": "{S1} tourne son regard malveillant vers vous",
        "{M} flickers and vanishes": "{S1} vacille et disparaît",
        "{M} croaks": "{S1} coasse",
        "{M} barks": "{S1} aboie",
        "{M} hisses menacingly": "{S1} siffle d’un air menaçant",
        "{M} snags {M} with its tongue": "{S1} attrape {o2} tout proche avec sa langue",
        "{M} struggles to escape constriction": "{S1} se débat pour échapper à l’étreinte",
        "{M} fades away": "{S1} s’estompe",
        "{M} leaps free of your tentacle with a hiss": "{S1} se libère de votre tentacule d’un bond en sifflant",
        "{M} is heavily damaged": "{S1} est lourdement endommagé{e1}",
        "{M} is lightly damaged": "{S1} est légèrement endommagé{e1}",
        "{M} throws {M}": "{S1} lance {o2}",
        "{M} shoots {M}": "{S1} tire {o2}",
        "{M} explodes": "{S1} explose",
        "{M} shatters into small pieces": "{S1} se brise en petits morceaux",
        "{M} refuses to make way for you": "{S1} refuse de vous céder le passage",
        "{M} disappears": "{S1} disparaît",
        "{M} leaves your sight": "{S1} disparaît de votre vue",
        "{M} looks even sicker": "{S1} a l’air encore plus malade",
        "{M} looks frightened": "{S1} a l’air effrayé{e1}",
        "{M} looks more healthy": "{S1} a l’air en meilleure santé",
        "{M} mumbles some strange prayers to its god against you": "{S1} marmonne d’étranges prières à son dieu contre vous",
        "{M} mumbles some strange words": "{S1} marmonne d’étranges paroles",
        "{M} plays a frightful melody on its pipes": "{S1} joue une mélodie effrayante sur sa flûte",
        "{M} plays a rousing melody on its pipes": "{S1} joue une mélodie entraînante sur sa flûte",
        "{M} points at you and mumbles some strange words": "{S1} vous montre du doigt en marmonnant d’étranges paroles",
        "{M} points at {M} and mumbles some strange words": "{S1} montre {o2} du doigt en marmonnant d’étranges paroles",
        "{M} pulls the alarm": "{S1} déclenche l’alarme",
        "{M} pulsates with a strange energy": "{S1} pulse d’une étrange énergie",
        "{M} pulsates": "{S1} pulse",
        "{M} radiates an aura of fear": "{S1} irradie une aura de peur",
        "{M} resists with significant effort": "{S1} résiste au prix d’un effort considérable",
        "{M} resists with some effort": "{S1} résiste avec effort",
        "{M} resists": "{S1} résiste",
        "{M} partially resists": "{S1} résiste en partie",
        "{M} returns to the deep": "{S1} retourne dans les profondeurs",
        "{M} screeches a cliché riddle in a mystic tongue": "{S1} hurle une énigme éculée dans une langue mystique",
        "{M} screeches": "{S1} hurle",
        "{M} roars": "{S1} rugit",
        "{M} roars deafeningly": "{S1} rugit à en rendre sourd",
        "{M} gasps for air": "{S1} suffoque",
        "{M} seems less brilliant": "{S1} semble moins brillant{e1}",
        "{M} seems to be having trouble coordinating all eight of its legs": "{S1} semble avoir du mal à coordonner ses huit pattes",
        "{M} seems to regain its courage": "{S1} semble retrouver son courage",
        "{M} seems to slow down": "{S1} semble ralentir",
        "{M} seems to grow more fierce": "{S1} semble devenir plus féroce",
        "{M} vaporises": "{S1} se vaporise",
        "{M} writhes as voices assail its being": "{S1} se tord tandis que des voix assaillent son être",
        "{M} writhes in pain as voices assail its mind": "{S1} se tord de douleur tandis que des voix assaillent son esprit",
        "{M} spins a strand of pure energy": "{S1} file un brin d’énergie pure",
        "{M} splits": "{S1} se divise",
        "{M} stares at you and mumbles some strange words": "{S1} vous fixe en marmonnant d’étranges paroles",
        "{M} struggles to get unstuck from the web": "{S1} se débat pour se dégager de la toile",
        "{M} summons {M}": "{S1} convoque {o2}",
        "{M} swoops through the air toward you": "{S1} fond sur vous à travers les airs",
        "{M} throws a boomerang": "{S1} lance un boomerang",
        "{M} throws a throwing net": "{S1} lance un filet",
        "{M} shoots a sling bullet": "{S1} tire une balle de fronde",
        "{M} shoots an arrow": "{S1} tire une flèche",
        "{M} twists and deforms": "{S1} se tord et se déforme",
        "{M} waves its antennae": "{S1} agite ses antennes",
        "{M} weaves a glowing orb of energy": "{S1} tisse un orbe d’énergie lumineux",
        "{M} shimmers and vanishes": "{S1} scintille et s’évanouit",
        "{M} slams into the rock wall": "{S1} percute le mur de roche",
        "{M} screeches!": "{S1} hurle",
        "{M}'s many legs skitter faintly": "Les nombreuses pattes {d1} cliquettent faiblement",
        "{M}'s many legs skitter": "Les nombreuses pattes {d1} cliquettent",
        "{M}'s misery bubbles over": "La misère {d1} bouillonne",
        "{M}'s misery overflows": "La misère {d1} déborde",
        "{M}'s wings beat fiercely": "Les ailes {d1} battent avec force",
        "{M}'s trance deepens": "La transe {d1} s’approfondit",
        "The pull of {M}'s song draws you forwards": "L’attrait du chant {d1} vous attire vers l’avant",
        "The wave of grief appears from out of your range of vision": "Une vague de chagrin surgit hors de votre champ de vision",
        "You are mesmerised by {M}": "Vous êtes hypnotisé par {o1}",
        "You are terrified of {M}": "Vous êtes terrifié par {o1}",
        "You attempt to attack {M}, but flinch away in fear": "Vous tentez d’attaquer {o1}, mais reculez de peur",
        "You blink free of {M}": "Vous vous libérez {d1} en clignant",
        "You block {M}": "Vous bloquez {o1}",
        "You cannot move closer to {M}": "Vous ne pouvez pas vous rapprocher {d1}",
        "You carve {M} like a ham": "Vous découpez {o1} comme un jambon",
        "You chop {M} into pieces": "Vous hachez {o1} en morceaux",
        "You cut {M} into ribbons": "Vous mettez {o1} en lambeaux",
        "You open {M} like a pillowcase": "Vous ouvrez {o1} comme une taie d’oreiller",
        "You collide with {M}": "Vous heurtez {o1}",
        "You escape {M}'s grasp": "Vous échappez à l’étreinte {d1}",
        "You rampage towards {M}": "Vous foncez sur {o1}",
        "You reflect {M} with the mirror": "Vous renvoyez {o1} avec le miroir",
        "You catch {M} completely off-guard": "Vous prenez {o1} complètement au dépourvu",
        "You strike {M} from behind": "Vous frappez {o1} par derrière",
        "You constrict {M}": "Vous étreignez {o1}",
        "You grab {M}": "Vous agrippez {o1}",
        "You lash {M}": "Vous fouettez {o1}",
        "You redirect {M}'s attack": "Vous détournez l’attaque {d1}",
        "You headbutt {M}": "Vous donnez un coup de tête {a1}",
        "You headbutt {M} but do no damage": "Vous donnez un coup de tête {a1} sans lui infliger de dégâts",
        "Your headbutt misses {M}": "Votre coup de tête manque {o1}",
        "Your grab misses {M}": "Votre prise manque {o1}",
        "You throw {M}": "Vous lancez {o1}",
        "{M} is knocked back by {M}": "{S1} est repoussé{e1} par {o2}",
        "You are knocked back by {M}": "Vous êtes repoussé par {o1}",
        "You swap places with {M}": "Vous échangez votre place avec {o1}",
        "You escape {M}'s grasp.": "Vous échappez à l’étreinte {d1}",
        "{M} leaves your sight. x2": "{S1} disparaît de votre vue",
        "Your {M} stumbles backwards": "{S1} chancelle en arrière",
        "{M} holds its ground": "{S1} tient bon",
        "{M} stumbles backwards": "{S1} chancelle en arrière",
        "{M} gives a hideous shriek": "{S1} pousse un cri hideux",
        "{M} is yanked forward by the harpoon shot": "{S1} est tiré{e1} vers l’avant par le tir de harpon",
        "{M} fires a harpoon shot at you": "{S1} tire un harpon sur vous",
        "{M} breathes poison at {M}": "{S1} souffle du poison sur {o2}",
        "{M} breathes poison at you": "{S1} vous souffle du poison dessus",
        "{M} breathes noxious fumes at you": "{S1} vous souffle des vapeurs nocives dessus",
        "{M} breathes spectral mist at you": "{S1} vous souffle une brume spectrale dessus",
        "{M} hurls a spray of splinters at itself": "{S1} lance une gerbe d’éclats sur lui-même",
        "{M} gives a chilling moan": "{S1} pousse un gémissement glaçant",
        "{M} tramples you": "{S1} vous piétine",
        "{M} falls from its now dead mount": "{S1} tombe de sa monture désormais morte",
        "{M} blocks {M}'s attack": "{S1} bloque l’attaque {d2}",
        "{M} is engulfed in a cloud of scalding steam": "{S1} est englouti{e1} dans un nuage de vapeur brûlante",
        "{M} dies": "{S1} meurt",
        "{M} is destroyed": "{S1} est détruit{e1}",
        "{M} fires a salvo of icy shards": "{S1} tire une salve d’éclats de glace",
        "{M} melts away": "{S1} fond",
        "{M} is engulfed in spectral mist": "{S1} est englouti{e1} dans une brume spectrale",
        "{M} is engulfed in a cloud of spectral mist": "{S1} est englouti{e1} dans un nuage de brume spectrale",
        "You are engulfed in spectral mist": "Vous êtes englouti dans une brume spectrale"
    };

    const UNIQUES = {
        "Agnes": ["Agnes", "f"],
        "Aizul": ["Aizul", "m"],
        "Amaemon": ["Amaemon", "m"],
        "Antaeus": ["Antaeus", "m"],
        "Arachne": ["Arachne", "m"],
        "Asmodeus": ["Asmodeus", "m"],
        "Asterion": ["Asterion", "m"],
        "Azrael": ["Azrael", "m"],
        "Bai Suzhen": ["Bai Suzhen", "m"],
        "Blorkula the orcula": ["Blorkula l’orcule", "m"],
        "Boris": ["Boris", "m"],
        "Brimstone Fiend": ["Démon de soufre", "m"],
        "Cassandra": ["Cassandra", "f"],
        "Cerebov": ["Cerebov", "m"],
        "Chuck": ["Chuck", "m"],
        "Cloud Mage": ["Mage des nuages", "m"],
        "Crazy Yiuf": ["Crazy Yiuf", "m"],
        "Dispater": ["Dispater", "m"],
        "Dissolution": ["Dissolution", "m"],
        "Donald": ["Donald", "m"],
        "Dowan": ["Dowan", "m"],
        "Duvessa": ["Duvessa", "f"],
        "Edmund": ["Edmund", "m"],
        "Enchantress": ["Enchanteresse", "f"],
        "Ereshkigal": ["Ereshkigal", "m"],
        "Erica": ["Erica", "f"],
        "Erolcha": ["Erolcha", "m"],
        "Eustachio": ["Eustachio", "m"],
        "Executioner": ["Bourreau", "m"],
        "Fannar": ["Fannar", "m"],
        "Frances": ["Frances", "f"],
        "Frederick": ["Frederick", "m"],
        "Gastronok": ["Gastronok", "m"],
        "Geryon": ["Geryon", "m"],
        "Gloorx Vloq": ["Gloorx Vloq", "m"],
        "Goji": ["Goji", "m"],
        "Grinder": ["Grinder", "m"],
        "Grum": ["Grum", "m"],
        "Grunn": ["Grunn", "m"],
        "Harold": ["Harold", "m"],
        "Head Instructor": ["Instructeur en chef", "m"],
        "Hell Sentinel": ["Sentinelle de l’Enfer", "m"],
        "Hellbinder": ["Lieur d’Enfer", "m"],
        "Ice Fiend": ["Démon de glace", "m"],
        "Ignacio": ["Ignacio", "m"],
        "Ijyb": ["Ijyb", "m"],
        "Ilsuiw": ["Ilsuiw", "f"],
        "Jeremiah": ["Jeremiah", "m"],
        "Jessica": ["Jessica", "f"],
        "Jorgrun": ["Jorgrun", "m"],
        "Jory": ["Jory", "m"],
        "Joseph": ["Joseph", "m"],
        "Josephina": ["Josephina", "f"],
        "Josephine": ["Josephine", "f"],
        "Khufu": ["Khufu", "m"],
        "Killer Klown": ["Clown tueur", "m"],
        "Kirke": ["Kirke", "m"],
        "Lernaean hydra": ["Hydre de Lerne", "m"],
        "Lodul": ["Lodul", "m"],
        "Lom Lobon": ["Lom Lobon", "m"],
        "Louise": ["Louise", "f"],
        "Maggie": ["Maggie", "f"],
        "Mara": ["Mara", "f"],
        "Margery": ["Margery", "f"],
        "Maurice": ["Maurice", "m"],
        "Menkaure": ["Menkaure", "m"],
        "Mennas": ["Mennas", "m"],
        "Mlioglotl": ["Mlioglotl", "m"],
        "Mnoleg": ["Mnoleg", "m"],
        "Murray": ["Murray", "m"],
        "Natasha": ["Natasha", "f"],
        "Nellie": ["Nellie", "f"],
        "Nergalle": ["Nergalle", "m"],
        "Nessos": ["Nessos", "m"],
        "Nikola": ["Nikola", "f"],
        "Norris": ["Norris", "m"],
        "Orb Guardian": ["Gardien de l’orbe", "m"],
        "Parghit": ["Parghit", "m"],
        "Pargi": ["Pargi", "m"],
        "Pikel": ["Pikel", "m"],
        "Polyphemus": ["Polyphemus", "m"],
        "Prince Ribbit": ["Prince Ribbit", "m"],
        "Robin": ["Robin", "m"],
        "Roxanne": ["Roxanne", "f"],
        "Royal Jelly": ["Gelée royale", "m"],
        "Rupert": ["Rupert", "m"],
        "Saint Roka": ["Saint Roka", "m"],
        "Serpent of Hell": ["Serpent de l’Enfer", "m"],
        "Sigmund": ["Sigmund", "m"],
        "Snorg": ["Snorg", "m"],
        "Sojobo": ["Sojobo", "m"],
        "Sonja": ["Sonja", "f"],
        "Sprozz": ["Sprozz", "m"],
        "Terence": ["Terence", "m"],
        "Tiamat": ["Tiamat", "m"],
        "Tzitzimitl": ["Tzitzimitl", "m"],
        "Urug": ["Urug", "m"],
        "Vashnia": ["Vashnia", "m"],
        "Vv": ["Vv", "m"],
        "Wiglaf": ["Wiglaf", "m"],
        "Xak'krixis": ["Xak'krixis", "m"],
        "Xtahua": ["Xtahua", "m"],
        "Zenata": ["Zenata", "m"],
        "Louise": ["Louise", "f"]
    };

    // ---- Découpage en acteurs --------------------------------------------------------------
    const echap = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const noms = new Set([...Object.keys(monsters), ...Object.keys(projectiles), ...Object.keys(EFFETS)]);
    const alternanceUniq = Object.keys(UNIQUES).sort((a, b) => b.length - a.length).map(echap).join("|");
    const alternance = [...noms].sort((a, b) => b.length - a.length).map(echap).join("|");
    // « The faun », « a manticore », « your ice beast », « the helpless redback », « the meliai simulacrum »
    // Noms fabriqués par le jeu (non listés un par un) : draconiens colorés + classe, hydres à N têtes, bêtes mutantes, choses laides colorées
    const NB = "one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty";
    const CLASSES_DRAC = { monk: "moine", knight: "chevalier", annihilator: "annihilateur", stormcaller: "invocateur de tempêtes", shifter: "changeforme", scorcher: "brûleur" };
    const COUL_DRAC = { black: "noir", yellow: "jaune", white: "blanc", green: "vert", purple: "violet", red: "rouge", grey: "gris", pale: "pâle", mottled: "tacheté" };
    const COUL_LAID = { red: "rouge", brown: "marron", green: "verte", cyan: "cyan", purple: "violette", white: "blanche" };
    const TIERS = { larval: "larvaire", juvenile: "juvénile", mature: "adulte", elder: "ancienne", primal: "primordiale" };
    // Armes dansantes (0.35) : « dancing +2 flail of holy wrath » -> « arme dansante (fléau de courroux sacré +2) »
    const ADJ_ARME = "hand|heavy|antimagic|devious|quick|great|giant|long|short|broad|war|double|triple|dire|demon|sacred|eudemon";
    const ARMES_DANS = "dagger|blade|sword|rapier|falchion|scimitar|club|whip|mace|flail|morningstar|eveningstar|scourge|axe|battleaxe|spear|trident|halberd|scythe|glaive|bardiche|lajatang|partisan|pike|sling|bow|longbow|shortbow|crossbow|arbalest|trishula|lance|staff|quarterstaff|knife|katana|tulwar|hammer|sabre|cutlass|shield";
    const TAILLES_SLIME = { "very large": "très grande", large: "grande", enormous: "énorme", titanic: "titanesque" };
    const FABRIQUES = "(?:" + Object.keys(COUL_DRAC).join("|") + ") draconian (?:" + Object.keys(CLASSES_DRAC).join("|") + ")"
        + "|(?:" + NB + ")-headed (?:lernaean hydra|slymdra|hydra)"
        + "|(?:" + Object.keys(COUL_LAID).join("|") + ") (?:very )?ugly thing"
        + "|(?:" + Object.keys(TIERS).join("|") + ") (?:(?:sting|bat|fire|weird|shock|ox)+ )?beast"
        + "|dancing [+-]\\d+ (?:(?:" + ADJ_ARME + ") )*(?:" + ARMES_DANS + ")(?: of (?:holy wrath|[a-z]+))?"
        + "|(?:very large|large|enormous|titanic) slime creature";
    const fabrique = nom => {
        let m;
        if ((m = /^(\w+) draconian (\w+)$/.exec(nom))) return { name: CLASSES_DRAC[m[2]] + " draconien " + COUL_DRAC[m[1]], gender: "m", article: /^[aeiouy]/i.test(CLASSES_DRAC[m[2]]) ? "l’" : "le " };
        if ((m = /^(\w+)-headed (lernaean hydra|slymdra|hydra)$/.exec(nom))) {
            const n = NB.split("|").indexOf(m[1]) + 1;
            const base = { "lernaean hydra": "hydre de Lerne", slymdra: "slymdre", hydra: "hydre" }[m[2]];
            return { name: base + " à " + n + (n > 1 ? " têtes" : " tête"), gender: "f", article: m[2] === "slymdra" ? "la " : "l’" };
        }
        if ((m = /^(\w+) (very )?ugly thing$/.exec(nom))) return { name: "chose " + (m[2] ? "très laide" : "laide") + " " + COUL_LAID[m[1]], gender: "f", article: "la " };
        if ((m = /^(\w+) ((?:sting|bat|fire|weird|shock|ox)+ )?beast$/.exec(nom))) return { name: "bête " + (m[2] ? m[2].trim() + " " : "mutante ") + TIERS[m[1]], gender: "f", article: "la " };
        if ((m = /^dancing ([+-]\d+) (.+)$/.exec(nom))) {
            const T1 = globalThis.DCSS_TRADUIRE_CHAINE;
            let arme = T1 ? T1("the " + m[1] + " " + m[2]) : null;
            if (!arme || /^the /.test(arme)) arme = m[1] + " " + m[2];
            arme = arme.replace(/^(?:le |la |l’|un |une )/, "");
            return { name: "arme dansante (" + arme + ")", gender: "f", article: "l’" };
        }
        if ((m = /^(very large|large|enormous|titanic) slime creature$/.exec(nom))) return { name: TAILLES_SLIME[m[1]] + " créature de vase", gender: "f", article: "la " };
        return null;
    };
    const reActeur = new RegExp("\\b(?:(?<det>The|the|An?|an?|Your|your|a nearby|the nearby) (?<imp>helpless |wavering )?(?<pre>spectral |bound |ghostly |invisible )?(?<nom>" + FABRIQUES + "|" + alternance + ")(?<suf> simulacrum| zombie| skeleton| draugr)?(?![\\w-])|(?<fant>[A-Za-z0-9][\\w.-]*)'s ghost(?![\\w-])|(?<uniq>" + alternanceUniq + ")(?![\\w-]))", "g");

    const entite = nom => {
        if (monsters[nom]) return monsters[nom];
        if (projectiles[nom]) return projectiles[nom];
        const fab = fabrique(nom);
        if (fab) return fab;
        const e = EFFETS[nom];
        return { name: e[0], gender: e[1], article: e[2] || (/^[aeiouyéèêâîôûœ]/i.test(e[0]) ? "l’" : (e[1] === "f" ? "la " : "le ")), effet: true };
    };

    function formes(acteur) {
        const e = acteur.entite;
        let nom = e.name;
        let genre = e.gender;
        let article = e.article;
        const voy = /^[aeiouyéèêâîôûœh]/i.test(nom);
        if (acteur.suffixe) {
            const t = { simulacrum: "simulacre", zombie: "zombie", skeleton: "squelette", draugr: "draugr" }[acteur.suffixe];
            nom = t + " " + (voy ? "d’" : "de ") + nom;
            genre = "m"; article = "le ";
        }
        if (acteur.prefixe) nom += acteur.prefixe === "spectral" ? (genre === "f" ? " spectrale" : " spectral") : acteur.prefixe === "ghostly" ? (genre === "f" ? " fantomatique" : " fantomatique") : acteur.prefixe === "invisible" ? (genre === "f" ? " invisible" : " invisible") : (genre === "f" ? " liée" : " lié");
        if (acteur.impuissant) nom += acteur.impuissant === "wavering" ? (genre === "f" ? " vacillante" : " vacillant") : " sans défense";
        const possessif = acteur.det === "your";
        const indefini = acteur.det === "a";
        const f = genre === "f";
        const ucf = s => s.charAt(0).toUpperCase() + s.slice(1);
        let o, S, d, a;
        if (possessif) {
            o = "votre " + nom; S = ucf(o); d = "de votre " + nom; a = "à votre " + nom;
        } else if (indefini) {
            const u = f ? "une " : "un ";
            o = u + nom; S = ucf(o); d = (f ? "d’une " : "d’un ") + nom; a = "à " + o;
        } else {
            o = article + nom; S = ucf(o);
            if (article === "") { d = (/^[AEIOUYÉ]/.test(nom) ? "d’" : "de ") + nom; a = "à " + nom; }
            else if (article === "l’") { d = "de l’" + nom; a = "à l’" + nom; }
            else if (article === "le ") { d = "du " + nom; a = "au " + nom; }
            else if (article === "les ") { d = "des " + nom; a = "aux " + nom; }
            else { d = "de la " + nom; a = "à la " + nom; }
        }
        return { o, S, d, a, e: f ? "e" : "", n: nom, f, effet: !!e.effet, pluriel: article === "les " };
    }

    function decouper(texte) {
        const acteurs = [];
        let squelette = texte.replace(reActeur, (...a) => {
            const g = a[a.length - 1];
            if (g.uniq) {
                const u = UNIQUES[g.uniq];
                acteurs.push({ det: "the", entite: { name: u[0], gender: u[1], article: "" }, impuissant: "", suffixe: "", prefixe: "" });
                return "{M}";
            }
            if (g.fant) {
                acteurs.push({ det: "the", entite: { name: "fantôme de " + g.fant, gender: "m", article: "le " }, impuissant: "", suffixe: "", prefixe: "" });
                return "{M}";
            }
            acteurs.push({ det: g.det.toLowerCase().replace(/^an?( nearby)?$/, "a").replace(/^the nearby$/, "the"), entite: entite(g.nom), impuissant: g.imp ? g.imp.trim() : "", suffixe: (g.suf || "").trim(), prefixe: (g.pre || "").trim() });
            return "{M}";
        });
        return { squelette, acteurs };
    }

    function remplir(modele, acteurs) {
        const F = acteurs.map(formes);
        return modele.replace(/\{([SodaenSA])(\d)\}/g, (m, t, i) => {
            const x = F[+i - 1];
            if (!x) return m;
            return { S: x.S, o: x.o, d: x.d, a: x.a, e: x.e, n: x.n }[t];
        });
    }

    // ---- Fin de phrase : ponctuation, répétitions ------------------------------------------
    function separerFin(t) {
        const m = t.match(/^(.*?)([.!?]*)$/s);
        return [m[1], m[2]];
    }
    const ponctFr = p => (p === "" ? "" : (p[0] === "!" ? " " + p : (p === "." ? "." : p)));

    // ---- Verbes génériques -----------------------------------------------------------------
    const verbesAlt = Object.keys(VERBES).sort((a, b) => b.length - a.length).map(echap).join("|");
    const misAlt = Object.keys(MIS).sort((a, b) => b.length - a.length).map(echap).join("|");
    const SUJET = "(\\{M\\}|Something|something)";
    const CIBLE = "(\\{M\\}|you|itself|something)";
    const reVerbe = new RegExp("^" + SUJET + " (" + verbesAlt + ") " + CIBLE + "( from afar)?( with (.+?))?( but does no damage)?$");
    const reRate = new RegExp("^" + SUJET + " (" + misAlt + ") " + CIBLE + "$");

    function traduireObjet(t) {
        const f = globalThis.DCSS_OBJET_PLUS || globalThis.DCSS_OBJET;
        return typeof f === "function" ? f(t) : null;
    }

    function commeVerbe(sq, acteurs, ponct) {
        let m = sq.match(reRate);
        let idx = 0;
        const pris = () => acteurs[idx++];
        if (m) {
            const [, suj, v, cib] = m;
            const sujetTxt = suj === "{M}" ? formes(pris()).S : "Quelque chose";
            let a2 = null; if (cib === "{M}") a2 = formes(pris());
            const verbe = MIS[v];
            if (cib === "you") return `${sujetTxt} vous ${verbe.replace(/^manque/, "manque").replace(/^rate/, "rate")}`;
            if (cib === "itself") return `${sujetTxt} se ${verbe}`;
            if (cib === "something") return `${sujetTxt} ${verbe} quelque chose`;
            if (verbe === "rate de justesse") return `${sujetTxt} rate ${a2.o} de justesse`;
            return `${sujetTxt} ${verbe} ${a2.o}`;
        }
        m = sq.match(reVerbe);
        if (!m) return null;
        const [, suj, v, cib, afar, , arme, sans] = m;
        let s1 = null, s2 = null;
        if (suj === "{M}") s1 = formes(pris());
        if (cib === "{M}") s2 = formes(pris());
        const [verbeFr, prep = "", suffixe = ""] = VERBES[v];
        let verbe = verbeFr;
        if (verbe === "frappe" && s1 && s1.effet) verbe = "touche";
        let objTxt;
        if (cib === "you") objTxt = "";
        else if (cib === "itself") objTxt = "";
        else if (cib === "something") objTxt = "quelque chose";
        else objTxt = prep ? s2[prep === "à" ? "a" : "o"] : s2.o;
        const sujetTxt = s1 ? s1.S : "Quelque chose";
        let phrase;
        if (cib === "you") phrase = `${sujetTxt} vous ${verbe}${suffixe}`;
        else if (cib === "itself") phrase = `${sujetTxt} se ${verbe}${suffixe}`;
        else phrase = `${sujetTxt} ${verbe} ${objTxt}${suffixe}`;
        if (afar) phrase += " de loin";
        if (arme) {
            const o = traduireObjet(arme);
            if (o === null) return null;
            phrase += ` avec ${o}`;
        }
        if (sans) phrase += ` sans ${cib === "you" ? "vous" : "lui"} infliger de dégâts`;
        return phrase;
    }

    // ---- Armes brandies / rangées ----------------------------------------------------------
    function armes(sq, acteurs) {
        let m = sq.match(/^\{M\} (wields|unwields) (an?|the) (.+)$/);
        if (m && acteurs.length === 1) {
            const o = traduireObjet(`${m[2]} ${m[3]}`);
            if (o === null) return null;
            return `${formes(acteurs[0]).S} ${m[1] === "wields" ? "brandit" : "range"} ${o}`;
        }
        return null;
    }

    // ---- Lignes « monstre en vue » : « a faun, wielding a +0 sling (asleep, 76% to hit) » ---
    const ETATS = {
        "asleep": "endormi", "wandering": "errant", "hasn't noticed you": "ne vous a pas remarqué",
        "not watching you": "ne vous regarde pas", "water": "dans l’eau", "steam": "vapeur", "poison gas": "gaz toxique",
        "poisoned": "empoisonné", "very poisoned": "gravement empoisonné", "blind": "aveugle", "inspiring fear": "inspire la peur",
        "ally target": "cible alliée", "minion": "sbire", "friendly": "amical", "mesmerising": "hypnotisant",
        "dormant": "inactif", "strong": "fort", "misshapen and mutated": "difforme et muté", "encased in ice": "pris dans la glace",
        "constricting you": "vous étreint", "bound in place": "immobilisé", "catching its breath": "reprend son souffle",
        "softly glowing": "luisant doucement", "inert": "inerte", "hostile": "hostile", "neutral": "neutre",
        "unaware of you": "ne vous a pas vu", "paralysed": "paralysé", "confused": "confus", "slowed": "ralenti",
        "frightened": "effrayé", "stunned": "étourdi", "berserk": "enragé", "hasted": "accéléré", "fleeing": "en fuite",
        "multi-lived": "multi-vies", "no weapons or thrown items": "sans armes ni objets lancés", "no armour": "sans armure",
        "see invisible": "voit l’invisible", "wandering, strong": "errant, fort", "friendly and minion": "amical et sbire", "constricted by you": "étreint par vous", "extremely poisoned": "extrêmement empoisonné"
    };
    function etat(e) {
        const e1 = e.trim();
        let m;
        if ((m = e1.match(/^(\d+)% to hit$/))) return `${m[1]} % de toucher`;
        if ((m = e1.match(/^(\d+)% to hit and (\d+)% to hit with your grab and squeeze$/))) return `${m[1]} % de toucher et ${m[2]} % avec votre prise et étreinte`;
        if ((m = e1.match(/^fire blocked by (?:a|the) translucent stone wall$/))) return "feu bloqué par un mur de pierre translucide";
        if ((m = e1.match(/^chance to affect: (\d+)%$/))) return `chance d’affecter : ${m[1]} %`;
        if (Object.prototype.hasOwnProperty.call(ETATS, e1)) return ETATS[e1];
        return null;
    }
    function ligneVue(t) {
                // Découpe grossière : on retire d'abord la parenthèse finale d'états
        let corps = t, flags = null, fermee = false;
        const p = t.match(/^(.*?)(?: \(([^()]*)(\)?))$/);
        if (p) { corps = p[1]; flags = p[2]; fermee = p[3] === ")"; }
        const d = decouper(corps.replace(/^(An?|The) /, x => x.toLowerCase()));
        // Le début doit être exactement un acteur : « a faun », éventuellement suivi de «, wielding ... »
        const q = d.squelette.match(/^\{M\}(?:, (.+))?$/);
        if (!q || d.acteurs.length !== 1) return null;
        let reste = "";
        if (q[1]) {
            const morceaux = q[1].split(/ and (?=(?:wearing|carrying|quivering|wielding) )/);
            const sortie = [];
            for (const mc of morceaux) {
                const k = mc.match(/^(wielding|wearing|carrying|quivering) (.+)$/);
                if (!k) return null;
                const verbe = { wielding: "maniant", wearing: "portant", carrying: "portant dans les mains", quivering: "avec en carquois" }[k[1]];
                let o = traduireObjet(k[2]);
                if (o === null && !/^(an?|the|\d)/.test(k[2])) o = traduireObjet("a " + k[2]);
                if (o === null && typeof globalThis.DCSS_OBJET_PLUS === "function") o = globalThis.DCSS_OBJET_PLUS(k[2]);
                if (o === null) return null;
                sortie.push(`${verbe} ${o}`);
            }
            reste = ", " + sortie.join(" et ");
        }
        let etatsFr = "";
        if (flags !== null) {
            const liste = flags.split(/,\s*/).filter((x, i, arr) => x !== "" || i < arr.length - 1);
            const fr = [];
            for (const x of liste) {
                if (x === "") continue;
                const y = etat(x);
                if (y === null) return null;
                fr.push(y);
            }
            const finVirgule = /,\s*$/.test(flags);
            etatsFr = " (" + fr.join(", ") + (finVirgule ? "," : "") + (fermee ? ")" : "");
        }
        const f = formes(d.acteurs[0]);
        return (d.acteurs[0].entite.article === "" ? f.o : f.o.replace(/^./, c => c.toLowerCase())) + reste + etatsFr;
    }

    // ---- Règle principale ------------------------------------------------------------------
    function traduire(m) {
        if (m[0].indexOf("{M}") !== -1) return null;   // jamais dans le vrai jeu : repère interne
        const t = m[0];
        if (t.length > 260) return null;
        // 1) lignes « monstre en vue »
        if (/^(?:an?|the) /i.test(t) || /, (?:wielding|wearing|carrying|quivering) |^[^.!]{2,60} \(/.test(t)) {
            const v = ligneVue(t);
            if (v) return /^[A-Z]/.test(t) ? v.charAt(0).toUpperCase() + v.slice(1) : v;
        }
        // 2) phrases d'action
        const AIDE = " (Use ctrl+direction or * direction to attack.)";
        const aide = t.endsWith(AIDE);
        const [corps, pon] = separerFin(aide ? t.slice(0, -AIDE.length) : t);
        const d = decouper(corps);
        if (!d.acteurs.length && !/^Something|^Tentacles/.test(corps)) return null;
        let sq = d.squelette;
        // majuscule initiale sur « {M} » : le squelette est identique
        let fr = Object.prototype.hasOwnProperty.call(GABARITS, sq) ? remplir(GABARITS[sq], d.acteurs) : null;
        if (fr === null) {
            const mm = sq.match(/^(.*) but (?:does|do) no damage$/);
            if (mm && Object.prototype.hasOwnProperty.call(GABARITS, mm[1])) {
                fr = remplir(GABARITS[mm[1]], d.acteurs) + ` sans ${/ you$/.test(mm[1]) ? "vous" : "lui"} infliger de dégâts`;
            }
        }
        if (fr === null) fr = armes(sq, d.acteurs);
        if (fr === null) fr = commeVerbe(sq, d.acteurs, pon);
        if (fr === null) return null;
        return fr + ponctFr(pon) + (aide ? " (Utilisez Ctrl+direction ou * direction pour attaquer.)" : "");
    }

    const fragmentEtats = { regex: /^, ([a-z\u0027 %:\d]+(?:, [a-z\u0027 %:\d]+)*)(?:, )?\)$/, translate: m => {
        const fr = []; for (const x of m[1].split(/, /)) { const y = etat(x); if (y === null) return m[0]; fr.push(y); }
        return ", " + fr.join(", ") + ")";
    } };
    const regle = { regex: /^(?!\s*$)[\s\S]{3,260}$/, translate: m => { const r = traduire(m); return typeof r === "string" ? r : m[0]; } };
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat([fragmentEtats, regle]);
    // Pour moteur/phrases_a_trous.js : formes françaises (S, o, d, a, e) d'un groupe nominal anglais seul (« the jackal », « a goblin »...)
    function acteurTexte(t) {
        const d = decouper(t.replace(/^(An?|The) /, x => x.toLowerCase()));
        if (d.squelette !== "{M}" || d.acteurs.length !== 1) return null;
        return formes(d.acteurs[0]);
    }
    globalThis.DCSS_COMBAT = { GABARITS, EFFETS, VERBES, traduire, acteurTexte };
})();
