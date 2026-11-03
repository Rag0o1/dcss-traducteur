// Messages à variables, partie I (0.10) : projectiles ({Z}) et sorts / capacités de monstres relevés dans le vrai jeu (arène).
// Format et trous : voir moteur/phrases_a_trous.js. Les noms de projectiles sont dans projectiles.js.
(() => {
    const T = {};
    const fin = p => (p === "!" ? " !" : ".");

    // --- « The bolt of fire hits you. » : tous les projectiles de projectiles.js avec tous leurs verbes ---
    const VERBES = [
        ["hits", "touche{n1}"], ["misses", "rate{n1}"], ["barely misses", "manque{n1} de peu"], ["closely misses", "rate{n1} de justesse"],
        ["completely misses", "manque{n1} complètement"], ["engulfs", "englouti{c1}"], ["weakly hits", "touche{n1} faiblement"],
        ["strikes", "frappe{n1}"], ["burns", "brûle{n1}"], ["corrodes", "corrode{n1}"], ["grabs", "agrippe{n1}"], ["constricts", "étrei{g1}"]
    ];
    const PLURIEL = { hits: "hit", misses: "miss", "barely misses": "barely miss", "closely misses": "closely miss", "completely misses": "completely miss",
        engulfs: "engulf", "weakly hits": "weakly hit", strikes: "strike", burns: "burn", corrodes: "corrode", grabs: "grab", constricts: "constrict" };
    for (const [en0, fr] of VERBES.concat(VERBES.map(([e, f]) => [PLURIEL[e], f]))) {
        const en = en0;
        for (const p of [".", "!"]) {
            T[`The {Z} ${en} {A}${p}`] = `{S1} ${fr} {o2}${fin(p)} ¦ {S1} vous ${fr}${fin(p)}`;
            if (en === "hits" || en === "engulfs" || en === "strikes") {
                T[`The {Z} ${en} {A} but does no damage${p}`] = `{S1} ${fr} {o2} sans lui infliger de dégâts${fin(p)} ¦ {S1} vous ${fr} sans vous infliger de dégâts${fin(p)}`;
            }
        }
    }

    // --- Phrases « sujet + verbe + cible » : la cible est un monstre ({A}) ou « you » ---
    // [début anglais, début français, fin anglaise, fin française]
    const CIBLE = [
        ["{A} casts itself at", "{S1} se lance sur"],
        ["{A} breathes dispelling energy at", "{S1} souffle de l’énergie dissipatrice sur"],
        ["{A} breathes steam at", "{S1} souffle de la vapeur sur"],
        ["{A} breathes fire at", "{S1} souffle du feu sur"],
        ["{A} breathes ice at", "{S1} souffle de la glace sur"],
        ["{A} breathes miasma at", "{S1} souffle un miasme sur"],
        ["{A} breathes blazing flames at", "{S1} souffle des flammes ardentes sur"],
        ["{A} breathes cleansing flame at", "{S1} souffle une flamme purificatrice sur"],
        ["{A} breathes collective despair at", "{S1} souffle un désespoir collectif sur"],
        ["{A} breathes endless sorrows at", "{S1} souffle des chagrins infinis sur"],
        ["{A} breathes negative energy at", "{S1} souffle de l’énergie négative sur"],
        ["{A} breathes poison at", "{S1} souffle du poison sur"],
        ["{A} breathes seething chaos at", "{S1} souffle un chaos bouillonnant sur"],
        ["{A} breathes a plume of calcifying dust at", "{S1} souffle un panache de poussière calcifiante sur"],
        ["{A} hurls lightning at", "{S1} projette de la foudre sur"],
        ["{A} throws miasma at", "{S1} lance un miasme sur"],
        ["{A} hurls a bolas at", "{S1} lance une bolas sur"],
        ["{A} hurls a stone arrow at", "{S1} lance une flèche de pierre sur"],
        ["{A} hurls a piece of itself at", "{S1} projette un morceau de lui-même sur"],
        ["{A} throws volley of spikes at", "{S1} lance une volée de pointes sur"],
        ["{A} spits poison at", "{S1} crache du poison sur"],
        ["{A} fires a harpoon shot at", "{S1} tire un harpon sur"],
        ["{A} shoots out a bolt of lightning at", "{S1} décoche un éclair sur"],
        ["{A} flicks its quills at", "{S1} projette ses piquants sur"],
        ["{A} launches metal splinters at", "{S1} lance des éclats de métal sur"],
        ["{A} stares at", "{S1} dévisage"],
        ["{A} stares piercingly at", "{S1} dévisage d’un regard perçant"],
        ["{A} mutters an ancient curse at", "{S1} murmure une ancienne malédiction contre"],
        ["{A} weaves a wave of flesh at", "{S1} tisse une vague de chair vers"],
        ["{A} weaves a phantasmal image and fires it at", "{S1} tisse une image fantasmagorique et la projette sur"],
        ["{A} concentrates and launches forth toxic muck at", "{S1} se concentre et projette une fange toxique sur"],
        ["{A} coughs and spits up spare sludge at", "{S1} tousse et crache de la boue superflue sur"],
        ["{A} half-collapses as it coughs up a harpoon shot at", "{S1} s’affaisse à moitié en crachant un harpon sur"],
        ["{A} hacks up a harpoon shot aimed at", "{S1} crache un harpon visant"],
        ["{A} blasts its cannon at", "{S1} fait tonner son canon sur"],
        ["{A} overcharges itself and releases excess heat at", "{S1} se surcharge et libère un excès de chaleur sur"],
        ["{A} overflows with ice and vents excess cold at", "{S1} déborde de glace et libère un excès de froid sur"],
        ["{A} writhes with glee as it focuses its will at", "{S1} se tord de joie en concentrant sa volonté sur"],
        ["{A} focuses its will at", "{S1} concentre sa volonté sur"],
        ["{A} burbles hungrily as it manifests raw antimagic at", "{S1} gargouille avidement en manifestant de l’antimagie brute sur"],
        ["{A} gestures with its tail at", "{S1} désigne de sa queue"],
        ["{A} coils itself and waves its upper body at", "{S1} s’enroule et agite son buste vers"],
        ["{A} flaps its wings at", "{S1} bat des ailes vers"],
        ["{A} reaches out for", "{S1} tend la main vers"],
        ["{A} invokes the aid of its god against", "{S1} invoque l’aide de son dieu contre"],
        ["{A} mumbles some strange prayers to its god against", "{S1} marmonne d’étranges prières à son dieu contre"],
        ["{A} calls down the wrath of its god upon", "{S1} appelle la colère de son dieu sur"],
        ["{A} collides with", "{S1} percute"],
        ["{A} drowns", "{S1} noie"],
        ["{A} fixes its piercing gaze on", "{S1} fixe d’un regard perçant"],
        ["{A} smirks and gazes at", "{S1} sourit d’un air narquois en fixant"],
        ["{A} fires at", "{S1} tire sur"],
        ["{A} casts a spell next to", "{S1} lance un sort à côté de"],
        ["{A} casts a spell at", "{S1} lance un sort sur"],
        ["{A} calls upon its god to speed up", "{S1} implore son dieu d’accélérer"],
        ["{A} calls upon its god to strengthen", "{S1} implore son dieu de renforcer"],
        ["{A} conjures spectral mists around", "{S1} invoque des brumes spectrales autour de"],
        ["{A} bites", "{S1} mord"], ["{A} stings", "{S1} pique"], ["{A} claws", "{S1} griffe"],
        ["{A} hits", "{S1} frappe"], ["{A} misses", "{S1} rate"], ["{A} closely misses", "{S1} rate de justesse"],
        ["{A} barely misses", "{S1} manque de peu"], ["{A} completely misses", "{S1} manque complètement"],
        ["{A} drains", "{S1} draine"], ["{A} tramples", "{S1} piétine"], ["{A} punches", "{S1} frappe"],
        ["{A} gestures at", "{S1} désigne"],
        ["{A} blasts a torrent of magma at", "{S1} projette un torrent de magma sur"],
        ["{A} spits lava at", "{S1} crache de la lave sur"],
        ["{A} hurls a spray of splinters at", "{S1} lance une gerbe d’éclats sur"],
        ["{A} breathes cold at", "{S1} souffle du froid sur"],
        ["{A} releases spores at", "{S1} libère des spores sur"],
        ["{A} sprays incendiary fluid at", "{S1} projette un liquide incendiaire sur"]
    ];
    for (const [en, fr] of CIBLE) {
        for (const p of [".", "!"]) {
            // la cible est le dernier trou : « {A} » (monstre) ou « you »
            const n = (en.match(/\{[AX]\}/g) || []).length + 1;
            T[`${en} {A}${p}`] = `${fr} {o${n}}${fin(p)}`;
            const direct = /collides with|drowns|fixes its piercing|calls upon its god|smirks and gazes/.test(en);
            if (en.includes("calls upon its god to")) T[`${en} you${p}`] = `{S1} implore son dieu de vous ${en.endsWith("speed up") ? "accélérer" : "renforcer"}${fin(p)}`;
            else if (en.includes("smirks and gazes")) T[`${en} you${p}`] = `{S1} sourit d’un air narquois en vous fixant${fin(p)}`;
            else if (direct) T[`${en} you${p}`] = fr.replace(/^(\{S1\}) /, "$1 vous ") + fin(p);
            else T[`${en} you${p}`] = `${fr} vous${fin(p)}`;
        }
    }
    // « {A} touche vous » est faux : pour les verbes d'attaque directe on place « vous » devant le verbe
    for (const [en, fr] of [["bites", "mord"], ["stings", "pique"], ["claws", "griffe"], ["hits", "frappe"], ["misses", "rate"],
                            ["closely misses", "rate de justesse"], ["barely misses", "manque de peu"], ["completely misses", "manque complètement"],
                            ["drains", "draine"], ["tramples", "piétine"], ["punches", "frappe"], ["stares at", "dévisage"], ["gestures at", "désigne"]]) {
        for (const p of [".", "!"]) T[`{A} ${en} you${p}`] = `{S1} vous ${fr}${fin(p)}`;
    }
    // Avec « but does no damage »
    for (const [en, fr] of [["bites", "mord"], ["stings", "pique"], ["claws", "griffe"], ["hits", "frappe"], ["drains", "draine"], ["punches", "frappe"]]) {
        for (const p of [".", "!"]) {
            T[`{A} ${en} {A} but does no damage${p}`] = `{S1} ${fr} {o2} sans lui infliger de dégâts${fin(p)}`;
            T[`{A} ${en} you but does no damage${p}`] = `{S1} vous ${fr} sans vous infliger de dégâts${fin(p)}`;
        }
    }
    T["{A} stings {A} from afar."] = "{S1} pique {o2} de loin.";
    T["{A} stings {A} from afar!"] = "{S1} pique {o2} de loin !";
    T["{A} stings you from afar."] = "{S1} vous pique de loin.";
    T["{A} stings you from afar!"] = "{S1} vous pique de loin !";
    T["{A} throws {A} at {A}!"] = "{S1} lance {o2} sur {o3} !";
    T["{A} points at {A} and mumbles some strange words."] = "{S1} désigne {o2} en marmonnant d’étranges paroles.";
    T["{A} points at you and mumbles some strange words."] = "{S1} vous désigne en marmonnant d’étranges paroles.";
    T["{A} stares at {A} and mumbles some strange words."] = "{S1} dévisage {o2} en marmonnant d’étranges paroles.";
    T["{A} stares at you and mumbles some strange words."] = "{S1} vous dévisage en marmonnant d’étranges paroles.";
    T["{A} stares into {I} soul."] = "{S1} plonge son regard dans l’âme {d2}.";
    T["{A} drains {I} vigour!"] = "{S1} draine la vigueur {d2} !";
    T["{A} blocks {I} attack."] = "{S1} bloque l’attaque {d2}.";
    T["{A} launches the last of itself at {A} with a shrill rumble."] = "{S1} lance ce qu’il lui reste sur {o2} dans un grondement strident.";

    // --- Phrases sans cible ---
    Object.assign(T, {
        "{A} is engulfed in dark miasma.": "{S1} est englouti{e1} dans un sombre miasme.",
        "{A} is engulfed in calcifying dust.": "{S1} est englouti{e1} dans de la poussière calcifiante.",
        "{A} is engulfed in flames.": "{S1} est englouti{e1} par les flammes.",
        "{A} is engulfed in seething chaos.": "{S1} est englouti{e1} par un chaos bouillonnant.",
        "{A} is yanked forward by the harpoon shot.": "{S1} est tiré{e1} en avant par le harpon.",
        "{A} is knocked back by the lance of force.": "{S1} est repoussé{e1} par la lance de force.",
        "{A} is blasted with magical radiation!": "{S1} est frappé{e1} par un rayonnement magique !",
        "{I} corpse disappears in a puff of smoke!": "Le cadavre {d1} disparaît dans un nuage de fumée !",
        "{I} corpse dissolves into shadows!": "Le cadavre {d1} se dissout dans les ombres !",
        "{I} corpse shimmers and vanishes!": "Le cadavre {d1} miroite et s’évanouit !",
        "{A} calls on the powers of darkness!": "{S1} appelle les puissances des ténèbres !",
        "{A} draws from the surrounding life force!": "{S1} puise dans la force vitale environnante !",
        "{A} harnesses the cleansing power of fire!": "{S1} exploite le pouvoir purificateur du feu !",
        "{A} bursts into living lightning!": "{S1} se change en foudre vivante !",
        "{A} looks encouraged for a moment.": "{S1} semble encouragé{e1} un instant.",
        "{A} pulsates ominously.": "{S1} pulse de façon inquiétante.",
        "{A} jiggles.": "{S1} frétille.",
        "{A} laughs crazily.": "{S1} rit comme un fou.",
        "{A} glitters.": "{S1} scintille.",
        "{A} crackles and sizzles.": "{S1} crépite et grésille.",
        "{A} crackles with melancholic malice.": "{S1} crépite d’une malice mélancolique.",
        "{A} roars with sorrowful spite.": "{S1} rugit d’une rancune chagrine.",
        "{A} slips into darkness.": "{S1} se glisse dans les ténèbres.",
        "{A} conjures a glowing orb.": "{S1} conjure un orbe luisant.",
        "{A} shoots a slug.": "{S1} tire une balle de plomb.",
        "{A} sculpts a pair of cannons out of ice!": "{S1} sculpte deux canons dans la glace !",
        "{A} shatters!": "{S1} vole en éclats !",
        "{A} waves its arms in wide circles.": "{S1} agite les bras en grands cercles.",
        "{A} invokes Trog's protection!": "{S1} invoque la protection de Trog !",
        "{A} seems to speed up.": "{S1} semble accélérer.",
        "{A} seems to occupy many places at once.": "{S1} semble occuper plusieurs endroits à la fois.",
        "{A} weaves an illusion.": "{S1} tisse une illusion.",
        "{A} disperses!": "{S1} se disperse !",
        "{A} burns!": "{S1} brûle !",
        "{A} overflows with resentment.": "{S1} déborde de ressentiment.",
        "{A} prays to its god.": "{S1} prie son dieu.",
        "{A} summons spiders!": "{S1} invoque des araignées !",
        "{A} is drawn to the feast!": "{S1} est attiré{e1} par le festin !",
        "{A} festers in the toxic bog!": "{S1} pourrit dans le bourbier toxique !",
        "{A} shakes off the sticky flame as it moves.": "{S1} se débarrasse de la flamme collante en bougeant.",
        "{A} begins to accept its allies' injuries.": "{S1} commence à accepter les blessures de ses alliés.",
        "{A} erupts in a flurry of living spells!": "{S1} explose en une rafale de sorts vivants !",
        "{A} utters an invocation to its god.": "{S1} prononce une invocation à son dieu.",
        "{A} basks in the mutagenic energy from its kin and changes!": "{S1} se baigne dans l’énergie mutagène de ses semblables et se transforme !",
        "{A} annihilator spits acid at {A}.": "{S1} crache de l’acide sur {o2}.",
        "Cornered, {A} turns to fight!": "Acculé{e1}, {S1} se retourne pour combattre !",
        "Doom befalls {A}, leaving it fragile as glass.": "La fatalité s’abat sur {o1}, qui devient fragile comme du verre.",
        "A forgotten god smites {A}!": "Un dieu oublié foudroie {o1} !",
        "A blast of power from the earth strikes {A}!": "Un souffle de puissance jaillit de la terre et frappe {o1} !",
        "The sign of ruin forms upon {A}!": "Le sceau de la ruine se forme sur {o1} !",
        "Flames lash {A}.": "Des flammes fouettent {o1}. ¦ Des flammes vous fouettent.",
        "Lightning courses through {A}!": "La foudre parcourt {o1} ! ¦ La foudre vous parcourt !",
        "Space warps horribly around {A}!": "L’espace se déforme horriblement autour {d1} ! ¦ L’espace se déforme horriblement autour de vous !",
        "Zombie hands grab {A} from below!": "Des mains de zombie agrippent {o1} par en dessous ! ¦ Des mains de zombie vous agrippent par en dessous !",
        "The zombie hands constrict {A}!": "Les mains de zombie étreignent {o1} ! ¦ Les mains de zombie vous étreignent !",
        "The water swirls and strikes {A}!": "L’eau tourbillonne et frappe {o1} ! ¦ L’eau tourbillonne et vous frappe !",
        "The creeping inferno residue disappears in a puff of smoke.": "Le résidu d’enfer rampant disparaît dans un nuage de fumée.",
        "A raging storm of fire appears!": "Une tempête de feu déchaînée apparaît !",
        "The wall shatters!": "Le mur vole en éclats !",
        "{A} is swarmed by bats.": "{S1} est assailli{e1} par des chauves-souris.",
        "{A} falls into the lava!": "{S1} tombe dans la lave !",
        "{A} is knocked back.": "{S1} est repoussé{e1}.",
        "{A} crumbles away.": "{S1} tombe en poussière.",
        "{A} evaporates and reforms as {A}!": "{S1} s’évapore et se reforme en {o2} !",
        "{A} returns to its original shape as it dies.": "{S1} retrouve sa forme d’origine en mourant.",
        "{A} seethes with envy of {I} form.": "{S1} bouillonne d’envie devant la forme {d2}.",
        "{A} disappears in a puff of smoke!": "{S1} disparaît dans un nuage de fumée !",
        "{A} dispassionately intertwines distant dimensions.": "{S1} entrelace sans passion des dimensions lointaines.",
        "{A} prays to {X}.": "{S1} prie {x2}.",
        "Electricity crackles from {I} apparatus.": "L’électricité crépite de l’appareil {d1}.",
        "ooze floods into {I} lungs!": "La vase envahit les poumons {d1} !",
        "A wild whirl of fire shoots out from {A} at {A}.": "Un tourbillon de feu sauvage jaillit {d1} vers {o2}.",
        "{A} calls forth creatures from the Elven Halls!": "{S1} appelle des créatures des Halls Elfiques !",
        "{A} calls forth creatures from the Crypt!": "{S1} appelle des créatures de la Crypte !",
        "{A} calls forth creatures from the Tomb of the Ancients!": "{S1} appelle des créatures de la Tombe des Anciens !",
        "{A} calls forth creatures from the Vaults!": "{S1} appelle des créatures des Chambres Fortes !",
        "{A} calls forth creatures from the Realm of Zot!": "{S1} appelle des créatures du Royaume de Zot !",
        "{A} releases spores at {A} but does no damage.": "{S1} libère des spores sur {o2} sans lui infliger de dégâts.",
        "{A} burns.": "{S1} brûle.",
        "{A} is knocked back by concussive force.": "{S1} est repoussé{e1} par une force de commotion.",
        "{A} struggles to resist.": "{S1} lutte pour résister.",
        "{A} conjures some marshlight!": "{S1} invoque des feux follets !",
        "{A} utters an invocation to {X}.": "{S1} prononce une invocation à {x2}.",
        "{A} spreads their arms wide.": "{S1} écarte grand les bras.",
        "{A} reaches out their hand.": "{S1} tend la main.",
        "{A} unfurls their wings.": "{S1} déploie ses ailes.",
        "{A} beckons forth its champion.": "{S1} appelle son champion.",
        "{A} falls apart and the last of its fire goes out.": "{S1} s’effondre et ses dernières flammes s’éteignent.",
        "{A} fractures the ground with its footsteps.": "{S1} fissure le sol sous ses pas.",
        "{A} collapses into dust.": "{S1} s’effondre en poussière.",
        "{A} magically shoots an arrow.": "{S1} tire magiquement une flèche.",
        "{A} degenerates into a cloud of primal chaos!": "{S1} dégénère en un nuage de chaos primordial !",
        "{A} attempts to bespell its enemies!": "{S1} tente d’ensorceler ses ennemis !",
        "{A} is blasted with magical radiation.": "{S1} est frappé{e1} par un rayonnement magique."
    });

    Object.assign(globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {}, T);
})();
