// Messages, partie N (0.17.5) : écrans de création de personnage, aides de touches, messages de Trog et de métamorphose,
// fin de partie. Format et trous : voir moteur/phrases_a_trous.js.
(() => {
    const T = globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {};
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const AC = t => { const C = globalThis.DCSS_COMBAT; return C && C.acteurTexte ? C.acteurTexte(t) : null; };
    const traduit = en => { const r = T1(en); return r && r !== en ? r : null; };

    // --- Création du personnage ---
    const FIXE = {
        "! - Random character": "! - Personnage aléatoire", "# - Recommended character": "# - Personnage recommandé", "% - List aptitudes": "% - Liste des aptitudes",
        "* - Random background": "* - Métier aléatoire", "* - Random species": "* - Espèce aléatoire", "* - Random weapon": "* - Arme aléatoire",
        "+ - Recommended background": "+ - Métier recommandé", "+ - Recommended random choice": "+ - Choix aléatoire recommandé", "+ - Recommended species": "+ - Espèce recommandée",
        "Space - Change species": "Espace - Changer d’espèce", "Space - Pick background first": "Espace - Choisir d’abord le métier",
        "Bksp - Return to character menu": "Retour arr. - Retour au menu du personnage",
        "Welcome, rago.": "Bienvenue, rago.", "Please select your species.": "Veuillez choisir votre espèce.", "Please select your background.": "Veuillez choisir votre métier.",
        "Simple": "Simple", "Intermediate": "Intermédiaire", "Advanced": "Avancé", "Warrior": "Guerrier", "Warrior-mage": "Guerrier-mage", "Adventurer": "Aventurier",
        "Zealot": "Zélote", "Metamorph": "Métamorphe", "Mage": "Mage",
        "Lets you change your species choice.": "Vous permet de changer votre choix d’espèce.",
        "Lets you pick your background first.": "Vous permet de choisir d’abord votre métier.",
        "Lets you return back to Character choice menu": "Vous permet de revenir au menu de choix du personnage",
        "Lists the numerical skill train aptitudes for all races": "Liste les aptitudes numériques d’entraînement des compétences pour toutes les espèces",
        "Lists the numerical skill train aptitudes for all races.": "Liste les aptitudes numériques d’entraînement des compétences pour toutes les espèces.",
        "Opens the help screen": "Ouvre l’écran d’aide", "Opens the help screen.": "Ouvre l’écran d’aide.",
        "Picks a random background.": "Choisit un métier au hasard.", "Picks a random species.": "Choisit une espèce au hasard.", "Picks a random weapon": "Choisit une arme au hasard",
        "Picks a random recommended background based on your current species choice.": "Choisit au hasard un métier recommandé selon l’espèce choisie.",
        "Picks a random recommended species based on your current background choice.": "Choisit au hasard une espèce recommandée selon le métier choisi.",
        "Picks a random recommended weapon": "Choisit au hasard une arme recommandée",
        "Play a new game with your previous choice.": "Lance une nouvelle partie avec votre choix précédent.",
        "Shuffles through random character combinations until you accept one.": "Parcourt des combinaisons de personnage au hasard jusqu’à ce que vous en acceptiez une.",
        "Shuffles through random recommended character combinations until you accept one.": "Parcourt des combinaisons de personnage recommandées au hasard jusqu’à ce que vous en acceptiez une.",
        "You have a choice of weapons.": "Vous avez le choix entre plusieurs armes.", "Hand Weapons": "Armes de mêlée", "Brand which weapon?": "Imprégner quelle arme ?",
        "f - unarmed": "f - à mains nues", "g - unarmed": "g - à mains nues",
        "Gnolls are canine-like humanoids. They are unable to specialise in any single skill, but instead gradually become proficient in all at once.":
            "Les Gnolls sont des humanoïdes canins. Incapables de se spécialiser dans une seule compétence, ils deviennent peu à peu compétents dans toutes à la fois.",
        "Gnolls are canine-like humanoids. They are unable to specialise in any single skill, but instead gradually become proficient in toutes at once.":
            "Les Gnolls sont des humanoïdes canins. Incapables de se spécialiser dans une seule compétence, ils deviennent peu à peu compétents dans toutes à la fois.",
        "Will you prevail where others failed? Will you find the Orb of Zot?": "Réussirez-vous là où d’autres ont échoué ? Trouverez-vous l’Orbe de Zot ?",
        // Aides de touches et menus
        "(select to target/travel, [": "(sélectionnez pour cibler/voyager, [", "] to examine)": "] pour examiner)", "(u)nwield": "(u) ranger l’arme",
        ") a stone staircase leading down (not visited)": ") un escalier de pierre descendant (non visité)",
        "mode [": "mode [", "|quaff [": "|boire [", "|wield|wear [": "|manier|porter [",
        "manuel mode": "mode manuel", "base niveau": "niveau de base", "all skills": "toutes les compétences", "Features": "Éléments du décor",
        "Visible Items/Features": "Objets et éléments visibles", "Condensation shield": "Bouclier de condensation",
        "Key pressed, stopping travel.": "Touche pressée, arrêt du déplacement.", "Found a dagger, a robe,": "Trouvé : une dague, une robe,",
    };
    for (const [en, fr] of Object.entries(FIXE)) T[en] = fr;

    // --- Messages ---
    Object.assign(T, {
        "Concussive force sends you backwards.": "Une force de percussion vous projette en arrière.", "{A} sends you backwards.": "{S1} vous projette en arrière.",
        "You barely resist.": "Vous résistez à peine.", "You feel very buoyant.": "Vous vous sentez très léger.", "You feel more buoyant.": "Vous vous sentez plus léger.",
        "You are even more covered in liquid fire!": "Vous êtes encore plus couvert de feu liquide !", "You are even more covered in intense liquid fire!": "Vous êtes encore plus couvert de feu liquide intense !",
        "You are covered in liquid fire! Move or burn!": "Vous êtes couvert de feu liquide ! Bougez ou brûlez !", "You are covered in intense liquid fire! Move or burn!": "Vous êtes couvert de feu liquide intense ! Bougez ou brûlez !",
        "The liquid fire burns you!": "Le feu liquide vous brûle !", "The liquid fire burns you terribly!": "Le feu liquide vous brûle terriblement !",
        "The liquid fire burns you. You resist.": "Le feu liquide vous brûle. Vous résistez.", "The liquid fire finally exhausts itself.": "Le feu liquide finit par s’épuiser.",
        "You shake off the liquid fire.": "Vous vous débarrassez du feu liquide.",
        "bility menu to convert to Beogh)": "bilités pour vous convertir à Beogh)", "on the": "dans le menu des",
    });
    Object.assign(T, {
        "You are electrocuted!": "Vous êtes électrocuté !", "You are more poisoned.": "Vous êtes davantage empoisonné.",
        "You are no longer berserk.": "Vous n’êtes plus en berserk.", "You are rather mundane.": "Vous êtes plutôt ordinaire.",
        "You are splashed with acid.": "Vous êtes éclaboussé d’acide.",
        "You block the bolt with an invisible shield... and reflect it back!": "Vous bloquez le carreau avec un bouclier invisible... et le renvoyez !",
        "You block the splash of poison... and reflect it back!": "Vous bloquez l’éclaboussure de poison... et la renvoyez !",
        "You briefly stop to wash your hands.": "Vous vous arrêtez brièvement pour vous laver les mains.",
        "You feel less wooden.": "Vous vous sentez moins ligneux.",
        "You feel the effects of Trog's Hand fading.": "Vous sentez les effets de la Main de Trog s’estomper.",
        "You feel the power of Trog in you as your rage grows.": "Vous sentez la puissance de Trog en vous tandis que votre rage grandit.",
        "You start to feel less resistant.": "Vous commencez à vous sentir moins résistant.", "You turn into a banyan tree.": "Vous vous transformez en banian.",
        "Your hands burn!": "Vos mains brûlent !", "Your resistance to elements expires.": "Votre résistance aux éléments expire.",
        "Your skin crawls.": "Votre peau frissonne.", "Your transformation is almost over.": "Votre transformation est presque terminée.",
        "Jessica looks very angry.": "Jessica a l’air très en colère.",
        "{A} opens the door.": "{S1} ouvre la porte.", "{A} briefly extends {p} eye-stalks.": "{S1} déploie brièvement ses pédoncules oculaires.",
        "{A} magically shoots a bolt.": "{S1} tire magiquement un carreau.",
    });
    R.push({ regex: /^Trog appreciates your killing of (an? .+)\.$/, translate: m => {
        const t = { "a magic user": "un utilisateur de magie", "a spellcaster": "un lanceur de sorts", "a holy creature": "une créature sainte" }[m[1]]; return t ? `Trog apprécie que vous ayez tué ${t}.` : null; } });
    R.push({ regex: /^The helpless ([A-Z][\w'-]*) fails to defend (?:herself|himself|itself)\.$/, translate: m => `${m[1]}, sans défense, ne parvient pas à se défendre.` });
    R.push({ regex: /^\.\.\. led by (.+)$/, translate: m => { const a = AC(m[1]) || AC("a " + m[1]); return a ? `… mené par ${a.o}` : null; } });
    const MORT = { "Slain by": "Tué par", "Killed by": "Tué par", "Killed from afar by": "Tué à distance par", "Frozen to death by": "Gelé à mort par", "Incinerated by": "Incinéré par",
        "Drowned by": "Noyé par", "Disjoined by": "Désarticulé par" };
    const MORT_SEUL = { "Collapsed under their own weight": "Écroulé sous son propre poids", "Slipped on a banana peel": "A glissé sur une peau de banane", "Escaped with the Orb": "S’est échappé avec l’Orbe",
        "Quit the game": "A quitté la partie", "Entered wizard mode": "Est entré en mode magicien", "Entered explore mode": "Est entré en mode exploration", "Starved to death": "Mort de faim",
        "Frozen to death": "Gelé à mort", "Killed by wild magic": "Tué par la magie sauvage", "Rotted away": "Pourri sur pied", "Smitten by the Shining One": "Foudroyé par l’Étincelant",
        "Smitten by Beogh": "Foudroyé par Beogh", "Turned to stone": "Changé en pierre", "Died": "Mort", "Fell down a flight of stairs": "Tombé dans un escalier", "Fell down through a gate": "Tombé à travers une porte",
        "Asphyxiated": "Asphyxié", "Burnt to a crisp": "Réduit en cendres", "Drowned": "Noyé", "Drained of all life": "Vidé de toute vie", "Forgot to breathe": "A oublié de respirer",
        "Forgot to exist": "A oublié d’exister", "Got out of the dungeon": "Sorti du donjon", "Got out of the dungeon alive": "Sorti vivant du donjon", "Safely got out of the dungeon": "Sorti du donjon sain et sauf",
        "Killed for Xom's enjoyment": "Tué pour le plaisir de Xom", "Sank and fell apart": "A coulé et s’est désagrégé", "Soaked and fell apart": "Trempé et désagrégé",
        "Splashed with acid": "Éclaboussé d’acide", "Took a swim in molten lava": "A pris un bain de lave en fusion", "Turned to ash by lava": "Réduit en cendres par la lave" };
    R.push({ regex: /^(Slain by|Killed by|Killed from afar by|Frozen to death by|Incinerated by|Drowned by|Disjoined by) (an? .+?|[A-Z][\w' -]+)(?: \((\d+) damage\))?$/, translate: m => {
        const a = AC(m[2]); if (!a) return null; return `${MORT[m[1]]} ${a.o}${m[3] ? ` (${m[3]} dégâts)` : ""}`; } });
    R.push({ regex: /^([A-Z][A-Za-z' ]+?)(?: \((\d+) damage\))?$/, translate: m => { const f = MORT_SEUL[m[1]]; return f ? `${f}${m[2] ? ` (${m[2]} dégâts)` : ""}` : null; } });
    R.push({ regex: /^Splashed by (an? .+?)'s acid(?: \((\d+) damage\))?$/, translate: m => { const a = AC(m[1]); if (!a) return null; return `Éclaboussé par l’acide ${a.d}${m[2] ? ` (${m[2]} dégâts)` : ""}`; } });
    R.push({ regex: /^The (.+?) pick up the pace!$/, translate: m => {
        const mots = m[1].split(" "); const der = mots.pop(); for (const c of [der.replace(/ies$/, "y"), der.replace(/ves$/, "f"), der.replace(/s$/, ""), der.replace(/es$/, "")]) {
            const a = AC("a " + mots.concat(c).join(" ")); if (a && a.n) { const n = a.n.split(" ").map(w => /[sxz]$/.test(w) ? w : w + "s").join(" "); return `Les ${n.replace(/^(?:le |la |l’|les )/, "")} accélèrent l’allure !`; } }
        return null; } });
    R.push({ regex: /^(?:The )?([a-z][a-z ]+?) (?:is|are) quivering$/, translate: () => null });
    R.push({ regex: /^(\d+)\.(\d+) (.+?) escaped with the Orb$/, translate: m => `${m[1]}.${m[2]} ${m[3]} s’est échappé avec l’Orbe` });
    R.push({ regex: /^(\d+) (\S+ the .+?) \(level (\d+), (-?\d+)\/(\d+) HPs\)$/, translate: m => `${m[1]} ${m[2]} (niveau ${m[3]}, ${m[4]}/${m[5]} PV)` });
    R.push({ regex: /^Was a Believer of (.+)\.$/, translate: m => `Était un Croyant ${/^[AEIOUYÉ]/.test(m[1]) ? "d’" : "de "}${m[1]}.` });
    R.push({ regex: /^([a-z]) - (.+?) Piety(-*) ?(\d+)%$/, translate: m => { const n = traduit(m[2]) || m[2]; return `${m[1]} - ${n} Piété${m[3]} ${m[4]} %`; } });
    R.push({ regex: /^([A-Z][a-z ’'-]+?) \(level (\d+)\/(\d+)\)$/, translate: m => {
        const r = traduit(m[1].charAt(0).toLowerCase() + m[1].slice(1)); if (!r) return null; return `${r.charAt(0).toUpperCase() + r.slice(1)} (niveau ${m[2]}/${m[3]})`; } });
    R.push({ regex: /^Your (?:left |right )?(.+?) (?:burns?)!$/, translate: () => null });
    R.push({ regex: /^(an?|the) (serpentine|decaying|slimy|silver|golden|iron|obsidian|icy|bone|barnacled|gossamer|demonic|dark|glowing|fiery|magical|abyssal) rune of Zot$/, translate: m => {
        const A = { serpentine: "serpentine", decaying: "putréfiée", slimy: "gluante", silver: "argentée", golden: "dorée", iron: "de fer", obsidian: "d’obsidienne", icy: "glacée",
            bone: "d’os", barnacled: "incrustée de bernacles", gossamer: "arachnéenne", demonic: "démoniaque", dark: "sombre", glowing: "luisante", fiery: "ardente", magical: "magique", abyssal: "abyssale" };
        return `${m[1] === "the" ? "la" : "une"} rune ${A[m[2]]} de Zot`; } });

    T["Trog's Hand"] = "Main de Trog";
    const BRANDS = { steadfast: "inébranlable" };
    R.push({ regex: /^((?:[a-zA-Z] - )?)(an?|the) (?:([+-]\d+) )?pair of mountain boots(?: \{(.+)\})?$/, translate: m => {
        const br = m[4] ? " {" + m[4].split(", ").map(x => BRANDS[x] || x).join(", ") + "}" : "";
        return `${m[1]}${m[2] === "the" ? "la" : "une"} paire de bottes de montagne${m[3] ? " " + m[3] : ""}${br}`; } });

    // --- Date et espèce de départ ---
    const MOIS = { Jan: "janv.", Feb: "févr.", Mar: "mars", Apr: "avr.", May: "mai", Jun: "juin", Jul: "juil.", Aug: "août", Sep: "sept.", Oct: "oct.", Nov: "nov.", Dec: "déc." };
    const especeMetier = s => {
        const D = globalThis.DCSS_TRADUCTIONS || {}; const ra = D.races || {}, me = D.metiers || {};
        for (const k of Object.keys(ra).sort((a, b) => b.length - a.length)) {
            if (s === k) return ra[k];
            if (s.startsWith(k + " ")) { const rest = s.slice(k.length + 1); if (me[rest]) return `${ra[k]} ${me[rest]}`; }
        }
        return null;
    };
    R.push({ regex: /^Began as an? (.+?) on ([A-Z][a-z]{2}) (\d+), (\d{4})\.$/, translate: m => { const e = especeMetier(m[1]); return e && MOIS[m[2]] ? `Débuté en tant que ${e} le ${m[3]} ${MOIS[m[2]]} ${m[4]}.` : null; } });
    R.push({ regex: /^Tab - (.+)$/, translate: m => { const e = especeMetier(m[1]); return e ? `Tab - ${e}` : null; } });

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R.filter(r => typeof r.translate === "function"));
})();
