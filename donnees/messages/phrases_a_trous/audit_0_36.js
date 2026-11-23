// Messages relevés en vraie partie (mode spectateur, serveur crawl.xtahua.com, 0.34 et trunk 0.36-a0, 23/11/2026) :
// lignes encore en anglais à l'écran. Viser/lancer un sort, menus d'objets, barre latérale, aides de touches.
(() => {
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const traduit = (en) => { const r = T1(en); return r && r !== en ? r : null; };
    const X = (s, f) => R.push({ regex: s, translate: f });

    // --- Danger d'un sort, viser ---
    const DANGER = { "safe": "sans danger", "mildly dangerous": "un peu dangereux", "dangerous": "dangereux", "quite dangerous": "assez dangereux",
        "very dangerous": "très dangereux", "extremely dangerous": "extrêmement dangereux" };
    X(/^(Casting|Aiming): (.+) \((safe|mildly dangerous|dangerous|quite dangerous|very dangerous|extremely dangerous); (\d+)% risk of failure\)$/, m =>
        `${m[1] === "Casting" ? "Lancer" : "Visée"} : ${m[2]} (${DANGER[m[3]]} ; ${m[4]} % de risque d’échec)`);
    const ETAT = { "wandering": "errant", "hasn't noticed you": "ne vous a pas remarqué", "not watching you": "ne vous regarde pas", "asleep": "endormi",
        "ally target": "cible alliée", "encased in ice": "pris dans la glace", "covered in magnetic dust": "couvert de poussière magnétique",
        "paralysed": "paralysé", "weak": "affaibli", "poisoned": "empoisonné", "friendly and minion": "allié, serviteur", "very poisoned": "très empoisonné", "extremely poisoned": "extrêmement empoisonné",
        "slow": "ralenti", "covering ground quickly": "se déplace vite", "damage-immune at range": "immunisé aux dégâts à distance", "fast": "rapide", "confused": "confus" };
    const etat = e => {
        let q;
        if ((q = e.match(/^(\d+)% to hit$/))) return `${q[1]} % de chances de toucher`;
        if ((q = e.match(/^chance to weaken: (\d+)%$/))) return `chance d’affaiblir : ${q[1]} %`;
        if ((q = e.match(/^chance to affect: (\d+)%$/))) return `chance d’affecter : ${q[1]} %`;
        if ((q = e.match(/^chance to (\w[\w ]*): (\d+)%$/))) { const v = traduit(q[1]); return v ? `chance de ${v} : ${q[2]} %` : null; }
        return ETAT[e] || traduit(e);
    };
    X(/^(Aim|Look): (.+?)(?: \(([^()]+)\))?$/, m => {
        let cible = traduit(m[2]) || (/^[A-Z][\w' -]*$/.test(m[2]) ? m[2] : null), q;
        if (!cible && (q = m[2].match(/^([A-Z][\w' -]*), ((?:wielding|wearing|carrying) .+)$/))) { const r = traduit("a kobold, " + q[2]); if (r) cible = r.replace(/^un kobold/, q[1]); }
        if (!cible) return null;
        let etats = "";
        if (m[3]) { const e = m[3].split(", ").map(etat); if (e.some(x => !x)) return null; etats = ` (${e.join(", ")})`; }
        return `${m[1] === "Aim" ? "Viser" : "Regarder"} : ${cible}${etats}`;
    });
    X(/^\(Press \. to maintain the ray\.\)$/, () => "(Appuyez sur . pour maintenir le rayon.)");
    X(/^You can't see any susceptible monsters within range! \(Use Z to cast anyway\.\)$/, () => "Vous ne voyez aucun monstre sensible à portée ! (Z pour lancer quand même.)");
    X(/^This spell is (extremely dangerous|very dangerous|quite dangerous|dangerous) to cast!$/, m => `Lancer ce sort est ${DANGER[m[1]]} !`);
    X(/^Are you sure you want to cancel this blink\?$/, () => "Voulez-vous vraiment annuler ce Blink ?");
    X(/^You miscast (.+)\. Nothing appears to happen\.(.*)$/, m => { const s = m[2] ? traduit(m[2].trim()) : ""; if (s === null) return null;
        return `Vous ratez ${m[1]}. Rien ne semble se produire.${m[2] ? " " + s : ""}`; });
    X(/^You miscast (.+)\.$/, m => `Vous ratez ${m[1]}.`);
    X(/^You sculpt a pair of cannons out of ice!$/, () => "Vous sculptez une paire de canons de glace !");
    X(/^Magnetic shrapnel attaches itself to (.+)\.$/, m => { const t = traduit(m[1]); return t ? `Des éclats magnétiques s’accrochent à ${t.replace(/^le /, "au ").replace(/^les /, "aux ").replace(/^à /, "")}.`.replace("à au ", "au ").replace("à aux ", "aux ") : null; });
    X(/^(.+)!!!$/, m => { const t = traduit(m[1] + "!!"); return t ? t + "!" : null; });

    // --- Menus d'objets ---
    const CAT = { "Hand Weapons": "Armes de mêlée", "Missiles": "Projectiles", "Armour": "Armure", "Magical Staves": "Bâtons magiques", "Jewellery": "Bijoux",
        "Talismans": "Talismans", "Wands": "Baguettes", "Scrolls": "Parchemins", "Potions": "Potions", "Books": "Livres", "Miscellaneous": "Divers",
        "Ranged Weapons": "Armes à distance", "Armure": "Armure", "Orbs": "Orbes", "Gems": "Gemmes", "Runes": "Runes", "Food": "Nourriture" };
    X(/^(Hand Weapons|Missiles|Armour|Armure|Magical Staves|Jewellery|Talismans|Wands|Scrolls|Potions|Books|Miscellaneous|Ranged Weapons|Orbs|Gems|Runes)(\s*)\((go to first|select all) with (.+)\)$/, m => {
        const c = CAT[m[1]]; const pad = " ".repeat(Math.max(1, m[1].length + m[2].length - c.length));
        return `${c}${pad}(${m[3] === "go to first" ? "aller au 1er avec" : "tout choisir avec"} ${m[4]})`; });
    X(/^(Drop|Pick up|Wear|Put on|Remove|Take off) what\? \(Left\/Right\/Tab to switch category\) (\d+)\/(\d+) gear slots \(_ (?:for|pour) (?:help|aide)\)( \d+ items?)?$/, m => {
        const V = { "Drop": "Déposer", "Pick up": "Ramasser", "Wear": "Porter", "Put on": "Mettre", "Remove": "Retirer", "Take off": "Enlever" };
        return `${V[m[1]]} quoi ? (Gauche/Droite/Tab : catégorie) ${m[2]}/${m[3]} emplacements (_ : aide)${m[4] ? " " + m[4].trim().replace(/items?/, n => n === "items" ? "objets" : "objet") : ""}`; });
    X(/^Gear: (\d+)\/(\d+) gear slots(\s+)\(Left\/Right\/Tab to switch category\)$/, m => `Équipement : ${m[1]}/${m[2]} emplacements${m[3]}(Gauche/Droite/Tab : catégorie)`);
    X(/^Fire\/throw\/use which item\?$/, () => "Tirer/lancer/utiliser quel objet ?");
    X(/^Items here: (.+)\.$/, m => `Objets ici : ${m[1]}.`);
    X(/^(.+?) \(haunted\)$/, m => { const t = traduit(m[1]); return t ? `${t} (hanté)` : null; });
    X(/^Select a spell to describe(\s+)\[\?\] help(\s+)\[!\]\/\[I\] toggle spell headers$/, m => `Choisissez un sort à décrire${m[1]}[?] aide${m[2]}[!]/[I] en-têtes`);
    X(/^The species aptitude is in white\.$/, () => "L’aptitude de l’espèce est en blanc.");

    // --- Progression des compétences ---
    const nb = s => s.replace(".", ",");
    X(/^At (\d+)% training you would reach ([\d.]+) in about ([\d.]+) XLs\.$/, m => `À ${m[1]} % d’entraînement, vous atteindriez ${nb(m[2])} en environ ${nb(m[3])} XL.`);
    X(/^At current training \((\d+)%\) you reach ([\d.]+) in the equivalent of ([\d.]+) XLs\.$/, m => `Avec l’entraînement actuel (${m[1]} %), vous atteignez ${nb(m[2])} en l’équivalent de ${nb(m[3])} XL.`);
    X(/^Your skill: ([\d.]+); use \(s\) to set ([\d.]+) as a target for (.+)\.$/, m => { const c = traduit(m[3]) || m[3];
        return `Votre compétence : ${nb(m[1])} ; (s) pour fixer ${nb(m[2])} comme objectif en ${c}.`; });

    // --- Provenance ---
    X(/^You acquired it on level (\d+) of (the .+|Pandemonium)\.$/, m => { const r = traduit("You found it on level " + m[1] + " of " + m[2] + ".");
        return r ? r.replace("Vous l’avez trouvé", "Vous l’avez obtenu") : null; });

    // --- Barre latérale : « Espèce of Dieu ****.. » ---
    const ESP = "Armataur|Barachi|Coglin|Deep Elf|Demigod|Demonspawn|Djinni|(?:Black|Green|Grey|Pale|Purple|Red|White|Yellow) Draconian|Draconian|Felid|Formicid|Gargoyle|Gnoll|Human|Kobold|Merfolk|Minotaur|Mountain Dwarf|Mummy|Naga|Octopode|Oni|Poltergeist|Revenant|Spriggan|Tengu|Troll|Vine Stalker|Vampire|Gale Centaur|Lava Orc|Hill Orc|Orc";
    const DIEUX = "Ashenzari|Beogh|Cheibriados|Dithmenos|Elyvilon|Fedhas|Gozag|Hepliaklqana|Ignis|Jiyva|Kikubaaqudgha|Lugonu|Makhleb|Nemelex Xobeh|Okawaru|Qazlal|Ru|Sif Muna|Trog|Uskayaw|Vehumet|Wu Jian|Xom|Yredelemnul|Zin|[Tt]he Shining One";
    X(new RegExp("^(" + ESP + ") of (" + DIEUX + ")( [*.]{1,6}\\.?| Gold: \\d+)?$"), m => {
        const e = T1(m[1]);
        return `${e} ${/^[AEIOUY]/.test(m[2]) ? "d’" : "de "}${m[2].replace(/^the Shining One$/, "l’Étincelant").replace(/^de l’/, "")}${m[3] ? m[3].replace(" Gold:", " Or :") : ""}`; });

    // --- Relevé n° 2 (23/11) ---
    X(/^Your off-hand claw misses (.+)\.$/, m => { const t = traduit(m[1]); return t ? `Votre griffe secondaire rate ${t}.` : null; });
    X(/^Your headbutt misses something\.$/, () => "Votre coup de tête rate quelque chose.");
    X(/^You bump into the (translucent )?stone wall\.$/, m => `Vous vous cognez contre le mur de pierre${m[1] ? " translucide" : ""}.`);
    X(/^Zot will find you in (\d+) turns if you stay in this branch and explore no new floors\.$/, m => `Zot vous trouvera dans ${m[1]} tours si vous restez dans cette branche sans explorer de nouvel étage.`);
    X(/^You feel attractive to monsters\.$/, () => "Vous vous sentez attirant pour les monstres.");
    X(/^You aren't carrying any weapons that can be enchanted\.$/, () => "Vous ne portez aucune arme pouvant être enchantée.");
    X(/^The dream sheep shake their wool and sparkle\. You feel drowsy\.\.\.$/, () => "Les moutons du sommeil secouent leur laine et scintillent. Vous vous sentez somnolent…");
    X(/^The species aptitude is in white\. Bonus from skill manuals is in red\.$/, () => "L’aptitude de l’espèce est en blanc. Le bonus des manuels est en rouge.");
    X(/^\[\?\] toggle between ability selection and description\.$/, () => "[?] basculer entre le choix d’une capacité et sa description.");
    X(/^Press: \? - help, Q - select action, \( or \) - cycle$/, () => "Touches : ? - aide, Q - choisir l’action, ( ou ) - faire défiler");
    X(/^This altar belongs to \(a\) (.+), \(b\) (.+) or \(c\) (.+), but you can't tell which\.$/, m => `Cet autel appartient à (a) ${m[1]}, (b) ${m[2]} ou (c) ${m[3]}, mais vous ne savez pas lequel.`);
    X(/^Press the corresponding letter to learn more about a god, or press enter to convert or escape to cancel\.$/, () => "Appuyez sur la lettre d’un dieu pour en savoir plus, sur Entrée pour vous convertir ou sur Échap pour annuler.");
    X(/^Favour(\s+)-(\s+)(.+) is neutral towards you\.$/, m => `Faveur${m[1]}-${m[2]}${m[3]} est neutre envers vous.`);
    X(/^A fragment of (.+)'s soul is dislodged from its body\.$/, m => { const t = traduit(m[1]); return t ? `Un fragment de l’âme ${t.replace(/^le /, "du ").replace(/^les /, "des ").replace(/^la /, "de la ").replace(/^l’/, "de l’")} est arraché à son corps.` : null; });
    X(/^It has a (\d+)\/(\d+) chance to be destroyed on impact\.$/, m => `Il a ${m[1]} chance${m[1] === "1" ? "" : "s"} sur ${m[2]} d’être détruit à l’impact.`);

    // --- Rencontres (uniques de la trunk) ---
    X(/^You encounter Natasha, Servant of Life and Death\.$/, () => "Vous rencontrez Natasha, Servante de la Vie et de la Mort.");

    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R);
})();
