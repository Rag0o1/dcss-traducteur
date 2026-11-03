// =====================================================================
//  messages.js : messages WebTiles (textes fixes + règles dynamiques)
//  Contient aussi l'ancien supplement.js (il n'est plus nécessaire).
//
//  Comment ajouter une traduction :
//   - texte toujours identique  -> ajouter une ligne dans "messages"
//   - monstre                   -> ajouter une ligne dans "monsters"
//   - décor (fontaine, porte..) -> ajouter une ligne dans "DECORS"
//   - phrase avec une partie variable -> ajouter une règle dans "rules"
// =====================================================================
(() => {
    globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};

    // Utilitaires (content.js les fournit au moment de la traduction)
    const tr = s => (typeof globalThis.DCSS_TRADUIRE_CHAINE === "function" ? globalThis.DCSS_TRADUIRE_CHAINE(s) : s);
    const connu = s => (typeof globalThis.DCSS_EST_CONNU === "function" ? globalThis.DCSS_EST_CONNU(s) : tr(s) !== s);
    const ponct = p => (p === "!" ? " !" : (p === "." ? "." : ""));

    // ------------------------------------------------------------------
    // 1. Textes fixes (correspondance exacte)
    // ------------------------------------------------------------------
    const messages = {
        // Interface et commandes
        "Adjust to which letter? (": "Associer à quelle lettre ? (",
        "Anatomy": "Anatomie",
        "Anything else - Cancel.": "Autre choix — Annuler.",
        "Armoured tail (level 1/2)": "Queue cuirassée (niveau 1/2)",
        "Blood": "Sang",
        "Category: [": "Catégorie : [",
        "Cold-blooded": "À sang froid",
        "Done exploring.": "Exploration terminée.",
        "Found": "Trouvé",
        "Key pressed, stopping explore.": "Touche pressée : arrêt de l’exploration.",
        "No target in view!": "Aucune cible en vue !",
        "Nothing quivered!": "Aucun projectile à lancer !",
        "Okay, then.": "Très bien, alors.",
        "Press": "Appuyez sur",
        "Removed mutation": "Mutation supprimée",
        "There are monsters nearby!": "Il y a des monstres à proximité !",
        "There's no one nearby to share it with.": "Personne à proximité avec qui partager cela.",
        "Things that are here:": "Objets présents ici :",
        "Unknown command.": "Commande inconnue.",
        "What are your orders?": "Quels sont vos ordres ?",
        "for a list of commands and other information.": "pour afficher la liste des commandes et d’autres informations.",
        "for menu,": "pour le menu,",
        "to quit)": "pour quitter)",

        // Mots identiques en français (signalés comme « connus » pour l'audit)
        "Berserk": "Berserk",
        "Substance": "Substance",

        // Messages du jeu
        "* * * LOW HITPOINT WARNING * * *": "* * * ALERTE : POINTS DE VIE BAS * * *",
        "A nearby plant withers and dies.": "Une plante proche se flétrit et meurt.",
        "A protective cloak of flame settles atop you.": "Une cape protectrice de flammes se pose sur vous.",
        "A wave of despondency washes over your surroundings.": "Une vague d’abattement envahit les environs.",
        "Get in, grab the Orb of Zot, get out. Easy job.": "Entrez, saisissez l’Orbe de Zot, sortez. Un jeu d’enfant.",
        "HP restored.": "Points de vie restaurés.",
        "Magic courses through your body.": "La magie parcourt votre corps.",
        "Magic restored.": "Magie restaurée.",
        "Moving in this stuff is going to be slow.": "Vous allez vous déplacer lentement dans cette matière.",
        "Ouch! That really hurt!": "Aïe ! Ça a vraiment fait mal !",
        "The flames of Ignis gently warm you.": "Les flammes d’Ignis vous réchauffent doucement.",
        "Trog accepts your kill.": "Trog accepte votre victime.",
        "Trog says: Kill them all!": "Trog dit : Tuez-les tous !",
        "You are caught in a web!": "Vous êtes pris dans une toile !",
        "You are frozen.": "Vous êtes gelé.",
        "You are no longer poisoned.": "Vous n’êtes plus empoisonné.",
        "You are poisoned.": "Vous êtes empoisonné.",
        "You are too injured to fight recklessly!": "Vous êtes trop blessé pour combattre imprudemment !",
        "You aren't carrying any potions.": "Vous ne portez aucune potion.",
        "You aren't carrying any scrolls.": "Vous ne portez aucun parchemin.",
        "You climb downwards.": "Vous descendez.",
        "You continue putting on your +0 buckler.": "Vous continuez à enfiler votre rondache +0.",
        "You continue putting on your +0 pair of boots.": "Vous continuez à enfiler votre paire de bottes +0.",
        "You disentangle yourself.": "Vous vous dégagez.",
        "You don't currently have any unidentified items.": "Vous n’avez actuellement aucun objet non identifié.",
        "You enter the shallow water.": "Vous entrez dans l’eau peu profonde.",
        "You feel a little less mighty now.": "Vous vous sentez un peu moins puissant.",
        "You feel clever.": "Vous vous sentez plus intelligent.",
        "You feel sick.": "Vous vous sentez malade.",
        "You feel strangely unstable.": "Vous vous sentez étrangement instable.",
        "You feel stronger.": "Vous vous sentez plus fort.",
        "You feel very mighty all of a sudden.": "Vous vous sentez soudain extrêmement puissant.",
        "You feel very sick.": "Vous vous sentez très malade.",
        "You feel your willpower return.": "Vous sentez votre volonté revenir.",
        "You feel yourself slow down.": "Vous sentez que vous ralentissez.",
        "You feel yourself speed up.": "Vous sentez que vous accélérez.",
        "You must catch your breath between uses of this ability.": "Vous devez reprendre votre souffle entre deux utilisations de cette capacité.",
        "You open the door.": "Vous ouvrez la porte.",
        "You struggle to detach yourself from the web.": "Vous peinez à vous libérer de la toile.",
        "Your experience leads to an increase in your attributes!": "Votre expérience améliore vos attributs !",
        "Your fiery armour burns out.": "Votre armure enflammée s’éteint.",
        "Your scales feel tougher.": "Vos écailles semblent plus résistantes.",
        "Your surroundings suddenly seem different.": "Vos environs semblent soudain différents.",

        // Descriptions de mutations / capacités
        ": Gained at a future XL.": ": Obtenue à un niveau d’expérience ultérieur.",
        "Deformed body": "Corps difforme",
        "Poison resistance": "Résistance au poison",
        "See invisible": "Voir l’invisible",
        "Spit Poison": "Cracher du poison",
        "Spits poison at a targeted creature.": "Crache du poison sur une créature ciblée.",
        "Renounce Religion": "Renier sa religion",
        "Renounces your faith. This will make you leave your god (and usually anger said god).": "Vous renoncez à votre foi. Vous quitterez votre dieu (ce qui le met généralement en colère).",
        "Sends the user into a berserk rage. Going berserk temporarily increases health, speed, and damage dealt in melee. It will time out quickly outside of combat, but may be extended by multiple kills. While berserk, almost all actions other than movement and melee combat are prevented. When the rage expires, the user will be slowed and unable to berserk again for a short time.": "Plonge l’utilisateur dans une rage berserk. Devenir berserk augmente temporairement les points de vie, la vitesse et les dégâts infligés au corps à corps. La rage s’épuise vite hors combat, mais peut être prolongée par plusieurs victimes. Pendant la rage, presque toutes les actions autres que le déplacement et le combat au corps à corps sont impossibles. Quand la rage prend fin, l’utilisateur est ralenti et incapable de redevenir berserk pendant un court moment.",
        "This ability costs:": "Cette capacité coûte :",
        "This ability costs: nothing.": "Cette capacité ne coûte rien.",
        "When struck by a cold attack, you may be slowed until your blood warms again.": "Lorsqu’une attaque de froid vous touche, vous pouvez être ralenti jusqu’à ce que votre sang se réchauffe.",
        "You have a large scaly tail, allowing you to tail-slap foes when launching melee attacks.": "Vous avez une grande queue écailleuse qui vous permet de frapper vos ennemis avec votre queue lors des attaques au corps à corps.",
        "You have supernaturally acute vision, allowing you to see monsters that are hidden from mundane sight. This has no effect on your accuracy otherwise.": "Vous avez une vision surnaturellement perçante, qui vous permet de voir les monstres cachés à la vue ordinaire. Cela n’a aucun autre effet sur votre précision.",
        "You resist poisons, toxins and other contaminants. This does not confer full immunity, but reduces your chances of being affected to roughly one-third what it would be otherwise.": "Vous résistez aux poisons, toxines et autres contaminants. Cela ne confère pas une immunité totale, mais réduit vos chances d’être affecté à environ un tiers de ce qu’elles seraient autrement.",
        "Your body is shaped in an inhuman way, somewhat reducing the amount of protection provided by body armour. This has no effect on protection provided by armour enchantments.": "Votre corps a une forme inhumaine, ce qui réduit quelque peu la protection offerte par les armures de corps. Cela n’a aucun effet sur la protection fournie par les enchantements d’armure.",
        "Your plain brown scales are hard. (AC +4)": "Vos écailles brunes sont dures. (AC +4)",
        "You cannot fit into any form of body armour or wear helmets.": "Vous ne pouvez porter ni armure corporelle ni casque.",
        "[Your tail will grow strong enough to constrict your foes.]": "[Votre queue deviendra assez forte pour étreindre vos ennemis.]"
    };

    globalThis.DCSS_TRADUCTIONS.messages = Object.assign(
        globalThis.DCSS_TRADUCTIONS.messages || {}, messages
    );

    // ------------------------------------------------------------------
    // 2. Tables de vocabulaire
    // ------------------------------------------------------------------
    // Les tables sont dans vocabulaire.js (chargé avant ce fichier).
    const { monsters, projectiles, spells, competences, VERBES_MONSTRE, VERBES_JOUEUR, DECORS, ADJ_POTION, COULEURS, INVARIABLES, POTIONS_EFFETS, PARCHEMINS, itemReplacements, ARMES, ARMURES, EGOS_ARME, EGOS_ARMURE, ADJ_ARME, GENRE, DIEUX, CLAUSES, COUTS, LIEUX_DE } = globalThis.DCSS_VOCAB;
    const deNom = nom => (/^[AEIOUYÉÈ]/.test(nom) ? "d’" : "de ") + nom;   // « de Blink » / « d’Apportation »
    const accorde = (mot, pluriel) => (!pluriel || INVARIABLES.has(mot) || /[sx]$/.test(mot)) ? mot : mot + "s";












    // ------------------------------------------------------------------
    // 3. Fonctions d'aide
    // ------------------------------------------------------------------
    // Les monstres non listés sont signalés dans la page :
    //   JSON.parse(document.documentElement.dataset.dcssMonstresManquants || "[]")
    const manquants = new Set();
    function signaler(nom) {
        if (manquants.has(nom)) return;
        manquants.add(nom);
        try {
            document.documentElement.dataset.dcssMonstresManquants = JSON.stringify([...manquants].sort());
        } catch (_) { /* sans importance */ }
    }

    let nomInconnu = false;
    function monstre(source) {
        const brut = source.trim().toLowerCase();
        const connuM = monsters[brut] || projectiles[brut];
        if (connuM) return connuM;
        signaler(brut);
        if (!/^[A-Z]/.test(source.trim())) nomInconnu = true;     // nom de monstre inconnu (pas un nom propre) : la règle laissera la phrase en anglais
        return { name: brut, gender: "m", article: "le " };
    }

    function sujetMonstre(source) {
        const m = monstre(source);
        const article = m.article === "l’" ? "L’" : m.article.charAt(0).toUpperCase() + m.article.slice(1);
        return article + m.name;
    }
    const PROPOSITION_ETRANGERE = t => /\b(against|with|from|into|then|but|and|while|before|after|as|so|until)\b/i.test(t.replace(/ but do no damage/i,""));
    const objetDirect = source => { const m = monstre(source); return m.article + m.name; };
    const deMonstre = m => (m.article === "l’" ? "d’" : "de ") + m.name;

    const defini = (genre, fr) => {
        if (genre === "p") return "les ";
        if (/^[aeiouyhâàéèêëîïôùû]/i.test(fr)) return "l’";
        return genre === "f" ? "la " : "le ";
    };

    // Traduit un nom d'objet sans article ni bonus. Renvoie { fr, genre } ou null si non reconnu.
    function phrase(src) {
        const s = src.trim();
        let m;

        if ((m = s.match(/^([A-Z][\w-]*)['’]s (corpse|skeleton)$/))) { // monstre unique : « Maggie's corpse »
            return { fr: `${m[2] === "corpse" ? "cadavre" : "squelette"} de ${m[1]}`, genre: "m" };
        }
        if ((m = s.match(/^(.+?) (corpse|skeleton)$/i))) {
            const mob = monstre(m[1]);
            const nom = m[2].toLowerCase() === "corpse" ? "cadavre" : "squelette";
            return { fr: `${nom} ${deMonstre(mob)}`, genre: "m" };
        }
        if ((m = s.match(/^(scrolls?) labelled (.+)$/i))) {
            const pl = m[1].toLowerCase() === "scrolls";
            return { fr: `${pl ? "parchemins" : "parchemin"} portant l’inscription ${m[2]}`, genre: pl ? "p" : "m" };
        }
        if ((m = s.match(/^(scrolls?) of (.+)$/i)) && PARCHEMINS[m[2].toLowerCase()]) {
            const pl = m[1].toLowerCase() === "scrolls";
            return { fr: `${pl ? "parchemins" : "parchemin"} ${PARCHEMINS[m[2].toLowerCase()]}`, genre: pl ? "p" : "m" };
        }
        if ((m = s.match(/^(potions?) of (.+)$/i)) && POTIONS_EFFETS[m[2].toLowerCase()]) {
            const pl = m[1].toLowerCase() === "potions";
            return { fr: `${pl ? "potions" : "potion"} ${POTIONS_EFFETS[m[2].toLowerCase()]}`, genre: pl ? "p" : "f" };
        }
        if ((m = s.match(/^(?:([a-z]+) )?([a-z]+) (potions?)$/i))) {
            const adj = m[1] ? m[1].toLowerCase() : null;
            const col = m[2].toLowerCase();
            const pl = m[3].toLowerCase() === "potions";
            if (COULEURS[col] && (adj === null || ADJ_POTION[adj])) {
                const fr = [pl ? "potions" : "potion", accorde(COULEURS[col], pl)];
                if (adj) fr.push(accorde(ADJ_POTION[adj], pl));
                return { fr: fr.join(" "), genre: pl ? "p" : "f" };
            }
        }
        // Apparences d'objets non identifiés : baguettes, anneaux, amulettes, bâtons
        if ((m = s.match(/^(.+?) (wands?|rings?|amulets?|staffs?|staves)$/i))) {
            const A = globalThis.DCSS_APPARENCES;
            const type = m[2].toLowerCase().replace(/s$/, "").replace(/^stave$/, "staff");
            const pl = /s$/.test(m[2].toLowerCase()) || m[2].toLowerCase() === "staves";
            const T = A && A[type];
            if (T) {
                let rest = m[1].toLowerCase(), sec = null, pri = null;
                for (const k of Object.keys(T.sec)) { if (rest.startsWith(k + " ")) { sec = k; rest = rest.slice(k.length + 1); break; } }
                if (T.pri[rest] !== undefined && (sec !== null || T.sansSec)) { pri = rest; }
                else if (T.pri[rest] !== undefined) pri = rest;
                if (pri !== null) {
                    const g = T.genre;
                    const acc = (paire) => { const [mm, ff] = paire.split("|"); let a = g === "f" ? (ff || mm) : mm; return pl && !/[sx]$/.test(a) ? a + "s" : a; };
                    const nom = pl ? T.nom + "s" : T.nom;
                    const parts = [nom];
                    const p = T.pri[pri];
                    const pfr = p.includes("|") || !p.startsWith("en ") && !p.startsWith("de ") && T.adjMat.has(pri) ? acc(p) : p;
                    if (type === "staff") { if (sec !== null) parts.push(acc(T.sec[sec])); parts.push(pfr); }
                    else { parts.push(pfr); if (sec !== null) parts.push(acc(T.sec[sec])); }
                    return { fr: parts.join(" "), genre: pl ? "p" : g };
                }
            }
        }
        // Armes et armures complètes : « [adjectif] base [of ego] » (liste fermée, sinon on laisse en anglais)
        {
            const bas = s.toLowerCase();
            const coupes = [-1];
            for (let i = bas.indexOf(" of "); i !== -1; i = bas.indexOf(" of ", i + 1)) coupes.push(i);
            for (const c of coupes) {
                const tete = c === -1 ? bas : bas.slice(0, c);
                const ego = c === -1 ? null : bas.slice(c + 4);
                let adj = null, base = tete;
                if (!ARMES[base] && !ARMURES[base]) {
                    const sp = tete.indexOf(" ");
                    if (sp === -1) continue;
                    adj = tete.slice(0, sp); base = tete.slice(sp + 1);
                }
                const arme = ARMES[base], armure = ARMURES[base];
                const entree = arme || armure;
                if (!entree || (adj && ego)) continue;
                const table = arme ? EGOS_ARME : EGOS_ARMURE;
                const [nom, g] = entree;
                if (!adj && !ego) return { fr: nom, genre: g };
                if (ego && table[ego]) {
                    const e = table[ego];   // texte « de X » ou paire [masculin, féminin] = adjectif accordé
                    return { fr: `${nom} ${Array.isArray(e) ? e[g === "f" ? 1 : 0] : e}`, genre: g };
                }
                if (adj && arme && ADJ_ARME[adj]) return { fr: `${nom} ${ADJ_ARME[adj][g === "f" ? 1 : 0]}`, genre: g };
            }
        }
        const decor = DECORS[s.toLowerCase()];
        if (decor) return { fr: decor[1], genre: decor[0] };

        // Remplacements : on protège chaque morceau traduit pour vérifier ce qui reste en anglais
        const morceaux = [];
        let reste = s;
        for (const [re, fr] of itemReplacements) {
            reste = reste.replace(re, () => { morceaux.push(fr); return `\u0001${morceaux.length - 1}\u0002`; });
        }
        const mots = reste.split(/\s+/).filter(Boolean);
        const iTete = mots.findIndex(w => w.includes("\u0001"));
        if (iTete === -1) return null;
        const avant = mots.slice(0, iTete);          // adjectifs inconnus devant le nom
        const apres = mots.slice(iTete);
        if (avant.length > 2 || apres.some(w => !w.includes("\u0001"))) return null;
        const tete = apres.join(" ").replace(/\u0001(\d+)\u0002/g, (_, i) => morceaux[+i]);
        const genre = GENRE[tete.split(" ")[0].toLowerCase()];
        if (!genre) return null;
        return { fr: avant.length ? `${tete} ${avant.join(" ")}` : tete, genre };
    }

    // Traduit « a +2 dagger », « 3 stones », « the goblin corpse ». Renvoie null si non reconnu.
    function objet(src) {
        let s = src.trim();
        const fin = (s.match(/[.;!]+$/) || [""])[0];
        s = s.slice(0, s.length - fin.length).trim();
        let art = null, qty = null, bonus = null, m;
        if ((m = s.match(/^(an?|the)\s+/i))) { art = m[1].toLowerCase(); s = s.slice(m[0].length); }
        else if ((m = s.match(/^(\d+)\s+/))) { qty = m[1]; s = s.slice(m[0].length); }
        if ((m = s.match(/^([+-]\d+)\s+/))) { bonus = m[1]; s = s.slice(m[0].length); }
        const p = phrase(s);
        if (!p) return null;
        let prefixe = "";
        if (qty) prefixe = qty + " ";
        else if (art === "the") prefixe = defini(p.genre, p.fr);
        else if (art) prefixe = p.genre === "f" ? "une " : "un ";
        return prefixe + p.fr + (bonus ? " " + bonus : "") + fin;
    }

    // Règle : fn renvoie une chaîne, ou null pour laisser le texte tel quel
    const R = (regex, fn) => ({
        regex,
        translate: (m) => { nomInconnu = false; const r = fn(m); const ko = nomInconnu; nomInconnu = false; return typeof r === "string" && !ko ? r : m[0]; }
    });
    // Variante pour les règles qui contiennent un objet
    const avecObjet = (src, f) => { const o = objet(src); return o === null ? null : f(o); };

    // ------------------------------------------------------------------
    // 4. Règles (la première qui change le texte l'emporte)
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // Dieux : phrases construites par le jeu avec le nom du dieu
    // ------------------------------------------------------------------
    const dieu = n => (/^the shining one$/i.test(n) ? "L’Étincelant" : n);
    const deDieu = n => { const d = dieu(n); return (/^[AEIOUÉ]/.test(d) ? "d’" : "de ") + d; };

    const liste = items => (items.length > 1 ? items.slice(0, -1).join(", ") + " et " + items[items.length - 1] : items[0]);

    function aimeDieu(m) {
        const dieuNom = dieu(m[1]);
        const adverbe = (m[2] || "").toLowerCase();
        const aime = m[3] === "likes";
        const clauses = m[4].split(/,\s+|\s+(?:and|or)\s+(?=you )/).map(c => c.trim());
        const fr = clauses.map(c => CLAUSES[c]);
        if (fr.some(x => !x)) return null;
        const verbe = aime ? "apprécie" : "désapprouve";
        const adv = adverbe === "strongly" ? " fortement" : (adverbe === "especially" ? " tout particulièrement" : "");
        const finit = m[0].includes(" or you ") ? " ou " : " et ";
        const texte = fr.length > 1 ? fr.slice(0, -1).join(", ") + finit.replace(/^ ou $/, " ou ") + fr[fr.length - 1] : fr[0];
        return `${dieuNom} ${verbe}${adv} que vous ${texte}.`;
    }

    function couts(m) {
        const parts = m[1].split(/,\s*/);
        const fr = parts.map(p => {
            let x;
            if ((x = p.match(/^(\d+) (MP|HP)$/))) return p;
            if ((x = p.match(/^(\d+) Gold$/))) return `${x[1]} or`;
            if ((x = p.match(/^Piety(-*)$/))) return `Piété${x[1]}`;
            return COUTS[p] || null;
        });
        return fr.some(x => x === null) ? null : `(${fr.join(", ")})`;
    }

    // Entrées de menu « x - Nom » (recherche d'aide, branches, FAQ…)
    function entreeMenu(m) {
        const nom = m[2];
        if (/^(?:an?|the|\d+|[+-]\d)\b/i.test(nom)) return null;   // objets d'inventaire : règle dédiée
        const essais = [nom, nom.charAt(0).toUpperCase() + nom.slice(1), "Q: " + nom];
        for (const e of essais) {
            const t = tr(e);
            if (t !== e || connu(e)) return `${m[1]} - ${t.replace(/^Q : /, "")}`;
        }
        return null;
    }

    // ------------------------------------------------------------------
    // Fiches d'objets : précision, dégâts, délais, entraînement
    // ------------------------------------------------------------------
    const dec = x => String(x).replace(".", ",");
    const detailDegats = t => t
        .replace(/\(Str\)/g, "(For)").replace(/\(Skill\)/g, "(Comp.)").replace(/\(Fight\)/g, "(Comb.)")
        .replace(/\(Thrw\)/g, "(Lanc.)");
    const origine = m => {
        const mob = monstre(m[2]);
        const lieu = LIEUX_DE[m[4]];
        if (!lieu) return null;
        const art = mob.gender === "f" ? "une " : "un ";
        return `Vous l’avez pris à ${art}${mob.name} au niveau ${m[3]} ${lieu}.`;
    };

    const rules = [
        // Compteur de répétition : « … x2 »
        R(/^(.+?)( x\d+)$/, m => { const t = tr(m[1]); return t !== m[1] ? t + m[2] : null; }),
        // Fiches d'armes, d'armures et de compétences
        R(/^Base accuracy: ([+-]\d+) Base damage: (\d+) Base attack delay: ([\d.]+)$/,
            m => `Précision de base : ${m[1]} Dégâts de base : ${m[2]} Délai d’attaque de base : ${dec(m[3])}`),
        R(/^Base damage: (\d+) Base attack delay: ([\d.]+)$/, m => `Dégâts de base : ${m[1]} Délai d’attaque de base : ${dec(m[2])}`),
        R(/^Base armour rating: (\d+) Encumbrance rating: (\d+)$/, m => `Indice d’armure de base : ${m[1]} Indice d’encombrement : ${m[2]}`),
        R(/^Current attack delay: ([\d.]+)\.$/, m => `Délai d’attaque actuel : ${dec(m[1])}.`),
        R(/^Damage rating: (\d+) \((.+)\)\.$/, m => `Indice de dégâts : ${m[1]} (${detailDegats(m[2])}).`),
        R(/^At 100% training you would reach ([\d.]+) in about ([\d.]+) XLs\.$/,
            m => `Avec un entraînement à 100 %, vous atteindriez ${dec(m[1])} en environ ${dec(m[2])} XL.`),
        R(/^At current training \((\d+)%\) you reach ([\d.]+) in about ([\d.]+) XLs\.$/,
            m => `Avec l’entraînement actuel (${m[1]} %), vous atteignez ${dec(m[2])} en environ ${dec(m[3])} XL.`),
        R(/^Your skill: ([\d.]+)$/, m => `Votre compétence : ${dec(m[1])}`),
        R(/^It can be maximally enchanted to ([+-]\d+)\.$/, m => `Il peut être enchanté au maximum jusqu’à ${m[1]}.`),
        R(/^This weapon falls into the '(.+)' category\.$/, m => { const c = tr(m[1]); return `Cette arme appartient à la catégorie « ${c} ».`; }),
        R(/^It falls into the '(.+)' category\.$/, m => { const c = tr(m[1]); return `Il appartient à la catégorie « ${c} ».`; }),
        R(/^It is a (one|two)-handed weapon\.$/, m => `C’est une arme à ${m[1] === "one" ? "une" : "deux"} main${m[1] === "one" ? "" : "s"}.`),
        R(/^It hits all enemies adjacent to the wielder, dealing less damage to those not targeted\.$/,
            () => "Elle frappe tous les ennemis adjacents à son porteur, en infligeant moins de dégâts à ceux qui ne sont pas ciblés."),
        R(/^It is (extremely )?good for stabbing helpless or unaware enemies\.$/,
            m => `Elle est ${m[1] ? "excellente" : "bonne"} pour poignarder les ennemis sans défense ou qui ne se méfient pas.`),
        R(/^This (weapon|projectile)'s minimum attack delay \(([\d.]+)\) is reached at skill level (\d+)\.$/,
            m => `Le délai d’attaque minimal de ${m[1] === "weapon" ? "cette arme" : "ce projectile"} (${dec(m[2])}) est atteint au niveau de compétence ${m[3]}.`),
        R(/^Your (.+) slightly slows your attacks with this weapon\.$/,
            m => { const o = objet(m[1]); return o === null ? null : `Votre ${o} ralentit légèrement vos attaques avec cette arme.`; }),
        R(/^Your (AC|EV|SH) would (increase|decrease) by ([\d.]+) \(([\d.]+) -> ([\d.]+)\)\.$/,
            m => `Votre ${m[1]} ${m[2] === "increase" ? "augmenterait" : "diminuerait"} de ${dec(m[3])} (${dec(m[4])} -> ${dec(m[5])}).`),
        R(/^You took it off (an?) (.+) on level (\d+) of the (.+)\.$/, origine),
        R(/^Menu\/colouring prefixes: (.+)$/, m => `Préfixes de menu/couleur : ${m[1]}`),
        R(/^Stash search prefixes: (.+)$/, m => `Préfixes de recherche (stash) : ${m[1]}`),
        R(/^\) (.+)$/, m => avecObjet(m[1], o => `) ${o}`)),
        // Dieux : phrases à trous
        R(new RegExp(`^(${DIEUX}) does not appreciate abandonment, and will call down fearful punishments on disloyal followers!$`),
            m => `${dieu(m[1])} n’apprécie pas l’abandon et abattra de terribles châtiments sur les disciples déloyaux !`),
        R(new RegExp(`^(${DIEUX}) is neutral towards you\\.$`), m => `${dieu(m[1])} est neutre envers vous.`),
        R(new RegExp(`^(${DIEUX})(?:'s|’s|') wrath lasts for a relatively (long|short) duration\\.$`),
            m => `La colère ${deDieu(m[1])} dure ${m[2] === "long" ? "relativement longtemps" : "relativement peu de temps"}.`),
        R(new RegExp(`^(${DIEUX})(?:'s|’s|') powers are not affected by the Invocations skill\\.$`),
            m => `Les pouvoirs ${deDieu(m[1])} ne dépendent pas de la compétence Invocations.`),
        R(new RegExp(`^(${DIEUX}) (?:(strongly|especially) )?(likes|dislikes) it when (you .+)\\.$`), aimeDieu),
        R(/^- [Tt]he Shining One$/, () => "- L’Étincelant"),

        // Coûts de pouvoirs, entrées de menu, journal
        R(/^\((.+)\)$/, couts),
        R(/^(\S) - (.+)$/, entreeMenu),
        R(/^(\d+) \| ([A-Za-z]+:?\d*) \| Reached XP level (\d+)\. HP: (\d+\/\d+) MP: (\d+\/\d+)$/,
            m => `${m[1]} | ${m[2]} | Niveau d’expérience ${m[3]} atteint. HP : ${m[4]} MP : ${m[5]}`),
        R(/^(\d+) \| ([A-Za-z]+:?\d*) \| (.+) began the quest for the Orb\.$/,
            m => `${m[1]} | ${m[2]} | ${m[3]} a commencé la quête de l’Orbe.`),
        R(/^(\d+) \| ([A-Za-z]+:?\d*) \| Found (.+)\.$/, m => `${m[1]} | ${m[2]} | Découverte : ${m[3]}.`),

        // Entraînement d'une compétence : « would increase your AC by 0.1 and your EV by 0.0. »
        R(/^With your current stats and equipment, training 1 level of this skill would increase your (AC|EV|SH) by ([\d.]+)(?: and your (AC|EV|SH) by ([\d.]+))?\.$/,
            m => `Avec vos caractéristiques et votre équipement actuels, entraîner cette compétence d’un niveau augmenterait votre ${m[1]} de ${m[2].replace(".", ",")}` +
                 (m[3] ? ` et votre ${m[3]} de ${m[4].replace(".", ",")}` : "") + "."),

        // Fiches et menus
        R(/^Base damage:\s*(\d+)$/i, m => `Dégâts de base : ${m[1]}`),
        R(/^Trigger chance:\s*(\d+)%$/i, m => `Probabilité de déclenchement : ${m[1]} %`),
        R(/^Damage: (.+)$/, m => `Dégâts : ${m[1]}`),
        R(/^Range: (.+)$/, m => `Portée : ${m[1] === "N/A" ? "N/D" : m[1]}`),
        R(/^Piety : (.+) \(about (\d+)% of your maximum possible piety\)$/, m => `Piété : ${m[1]} (environ ${m[2]} % de votre piété maximale possible)`),
        R(/^\(gained\s+(\d+)\)$/i, m => `(gagné ${m[1]})`),

        // Accueil : « Welcome back, rago the Minotaur Fighter. »
        R(/^Welcome( back)?, (.+?) the (.+?)\.$/, m => {
            const mots = m[3].split(" ");
            let k = 0;
            for (let n = Math.min(3, mots.length); n >= 1; n--) {
                if (connu(mots.slice(0, n).join(" "))) { k = n; break; }
            }
            if (k === 0) k = 1;
            const race = mots.slice(0, k).join(" ");
            const metier = mots.slice(k).join(" ");
            const identite = metier ? `${tr(race)} ${tr(metier)}` : tr(race);
            return `${m[1] ? "Bon retour" : "Bienvenue"}, ${m[2]}, ${identite}.`;
        }),

        // Progression
        R(/^You have reached level (\d+)!$/i, m => `Vous atteignez le niveau ${m[1]} !`),
        R(/^Increase \(S\)trength, \(I\)ntelligence, or \(D\)exterity\?$/i, () => "Augmenter la Force (S), l’Intelligence (I) ou la Dextérité (D) ?"),
        R(/^You add the spell (.+) to your library\.$/i, m => `Vous ajoutez le sort ${spells[m[1]] || m[1]} à votre grimoire.`),
        R(/^Your (.+?) skill increases to level (\d+)!$/i, m => `Votre compétence ${competences[m[1]] || "de " + m[1]} passe au niveau ${m[2]} !`),

        // Portes et parchemins
        R(/^As you open the (large )?door, it creaks loudly!$/i, m => `Lorsque vous ouvrez ${m[1] ? "la grande porte" : "la porte"}, elle grince bruyamment !`),
        R(/^As you read the scroll labelled (.+), it crumbles to dust\.$/i, m => `Lorsque vous lisez le parchemin portant l’inscription ${m[1]}, il tombe en poussière.`),
        R(/^As you read the scroll of (.+), it crumbles to dust\.$/i, m => {
            const p = phrase("scroll of " + m[1]);
            return p ? `Lorsque vous lisez le ${p.fr}, il tombe en poussière.` : null;
        }),

        // Or et objets trouvés
        R(/^Found (\d+) gold pieces?\.$/i, m => `Vous trouvez ${m[1]} pièce${m[1] === "1" ? "" : "s"} d’or.`),
        R(/^Found (.+)$/i, m => avecObjet(m[1], o => `Trouvé : ${o}`)),
        R(/^You now have (\d+) gold pieces(?: \(gained (\d+)\))?\.$/i, m => `Vous avez maintenant ${m[1]} pièces d’or${m[2] ? ` (gagné ${m[2]})` : ""}.`),
        R(/^You pick up a parchment of (.+) and begin reading\.\.\.$/i, m => `Vous ramassez un parchemin ${deNom(spells[m[1]] || m[1])} et commencez à le lire…`),
        R(/^You pick up (.+?)\.?$/i, m => avecObjet(m[1], o => `Vous ramassez ${o.replace(/[.]$/, "")}.`)),
        // Cadavre d'un monstre unique : « Maggie's corpse » (un nom propre, donc « le cadavre de Maggie »)
        R(/^You see here ([A-Z][\w-]*)['’]s (corpse|skeleton)\.$/, m => `Vous voyez ici le ${m[2] === "corpse" ? "cadavre" : "squelette"} de ${m[1]}.`),
        R(/^([A-Z][\w-]*)['’]s (corpse|skeleton)$/, m => `le ${m[2] === "corpse" ? "cadavre" : "squelette"} de ${m[1]}`),
        R(/^You see here (.+?)\.?$/i, m => avecObjet(m[1], o => `Vous voyez ici ${o.replace(/[.]$/, "")}.`)),
        R(/^There is (.+) here\.$/i, m => avecObjet(m[1], o => `Il y a ${o} ici.`)),

        // Équipement
        R(/^You unwield your (.+)\.$/i, m => avecObjet(m[1], o => `Vous rangez votre ${o}.`)),
        R(/^You continue putting on your (.+)\.$/i, m => avecObjet(m[1], o => `Vous continuez à enfiler votre ${o}.`)),
        R(/^You finish putting on your (.+)\.$/i, m => avecObjet(m[1], o => `Vous finissez d’enfiler votre ${o}.`)),
        R(/^Your (.+?) bursts into flame!$/i, m => avecObjet(m[1], o => `Votre ${o} s’embrase !`)),
        R(/^Your (.+?) stops flaming\.$/i, m => avecObjet(m[1], o => `Les flammes de votre ${o} s’éteignent.`)),
        R(/^Your (.+?) begins to drip with poison!$/i, m => avecObjet(m[1], o => `Votre ${o} se met à suinter du poison !`)),

        // Monstres en vue
        R(/^A[n]? (.+) is nearby!$/i, m => { const mob = monstre(m[1]); return `${mob.gender === "f" ? "Une" : "Un"} ${mob.name} est à proximité !`; }),
        R(/^A[n]? (.+) comes into view\.$/i, m => { const mob = monstre(m[1]); return `${mob.gender === "f" ? "Une" : "Un"} ${mob.name} apparaît.`; }),
        R(/^You encounter (?:an? )?(.+?)(?:\.)?$/i, m => { // les monstres (et les uniques comme Maggie, sans article) sont traités par audit_0_35.js
            const C = globalThis.DCSS_COMBAT, tete = m[1].split(/, | and /)[0];
            if (/^[A-Z]/.test(m[1]) || (C && C.acteurTexte && C.acteurTexte("a " + tete.replace(/^\d+ /, "")))) return null;
            return `Vous rencontrez ${objetDirect(m[1].replace(/\.\s*It is wielding .+$/i, ""))}.`; }),

        // Attaques des monstres
        R(/^The (.+?) barely misses you([.!])?$/i, m => `${sujetMonstre(m[1])} vous manque de peu${ponct(m[2])}`),
        R(/^The (.+?) closely misses you([.!])?$/i, m => `${sujetMonstre(m[1])} vous rate de justesse${ponct(m[2])}`),
        R(/^The (.+?) completely misses you([.!])?$/i, m => `${sujetMonstre(m[1])} vous manque complètement${ponct(m[2])}`),
        R(/^The (.+?) misses you([.!])?$/i, m => `${sujetMonstre(m[1])} vous rate${ponct(m[2])}`),
        R(/^The (.+?) (hits|bites|claws|stings|kicks|butts|punches|whips|slashes|stabs|pierces|pummels) you(?: with (.+?))?( but does no damage)?([.!])?$/i, m => {
            let arme = "";
            if (m[3]) {
                const o = objet(m[3]);
                if (o === null) return null;
                arme = ` avec ${o}`;
            }
            return `${sujetMonstre(m[1])} ${VERBES_MONSTRE[m[2].toLowerCase()]}${arme}${m[4] ? " sans vous infliger de dégâts" : ""}${ponct(m[5])}`;
        }),
        R(/^The (.+?) throws (.+?)([.!])?$/i, m => avecObjet(m[2], o => `${sujetMonstre(m[1])} lance ${o}${ponct(m[3])}`)),
        R(/^The (.+?) blocks? you([.!])?$/i, m => `${sujetMonstre(m[1])} bloque votre attaque${ponct(m[2])}`),
        R(/^The (.+?) (?:hisses angrily|shouts)([.!])?$/i, m => `${sujetMonstre(m[1])} ${/hisses/i.test(m[0]) ? "siffle avec colère" : "pousse un cri"}${ponct(m[2])}`),
        R(/^The (.+?) is (almost dead|heavily wounded|lightly wounded|moderately wounded|severely wounded|poisoned)([.!])?$/i, m => {
            const etat = {
                "almost dead": ["presque mort", "presque morte"],
                "heavily wounded": ["gravement blessé", "gravement blessée"],
                "lightly wounded": ["légèrement blessé", "légèrement blessée"],
                "moderately wounded": ["modérément blessé", "modérément blessée"],
                "severely wounded": ["sévèrement blessé", "sévèrement blessée"],
                "poisoned": ["empoisonné", "empoisonnée"]
            }[m[2].toLowerCase()];
            return `${sujetMonstre(m[1])} est ${monstre(m[1]).gender === "f" ? etat[1] : etat[0]}${ponct(m[3])}`;
        }),
        R(/^The (.+?) is burned by your cloak of flames\.$/i, m => `${sujetMonstre(m[1])} est ${monstre(m[1]).gender === "f" ? "brûlée" : "brûlé"} par votre cape de flammes.`),
        R(/^The (.+?) looks as sick as possible!$/i, m => `${sujetMonstre(m[1])} semble aussi malade que possible !`),
        R(/^The (.+?) sprays sand from its hourglass at you\.$/i, m => `${sujetMonstre(m[1])} vous projette du sable depuis son sablier.`),
        R(/^The (.+?) launches a dart at you\.$/i, m => `${sujetMonstre(m[1])} vous lance une fléchette.`),
        R(/^The (.+?) freezes you([.!])?$/i, m => `${sujetMonstre(m[1])} vous gèle${ponct(m[2])}`),
        R(/^The (.+?) constricts you([.!])?$/i, m => `${sujetMonstre(m[1])} vous étreint${ponct(m[2])}`),
        R(/^The (.+?) grabs you([.!])?$/i, m => `${sujetMonstre(m[1])} vous agrippe${ponct(m[2])}`),
        R(/^The (.+?) expels a string of sticky webbing\.$/i, m => `${sujetMonstre(m[1])} expulse un fil de toile collante.`),

        // Attaques du joueur
        R(/^You barely miss the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous manquez de peu ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You closely miss the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous ratez de justesse ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You completely miss the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous manquez complètement ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You miss the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous manquez ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You (hit|slash|slice|stab|pierce|bash|whack|bludgeon|crush|pummel|punch|nick|impale|maul|claw|bite) the (.+?)( but do no damage)?([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] :
            `Vous ${VERBES_JOUEUR[m[1].toLowerCase()]} ${objetDirect(m[2])}${m[3] ? " sans lui infliger de dégâts" : ""}${ponct(m[4])}`),
        R(/^You kill the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous tuez ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You destroy the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous détruisez ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You burn the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous brûlez ${objetDirect(m[1])}${ponct(m[2])}`),
        R(/^You block the (.+?)'s attack\.$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous bloquez l’attaque de ${objetDirect(m[1])}.`),
        R(/^You tail-slap the (.+?) but do no damage\.$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous frappez ${objetDirect(m[1])} avec votre queue sans lui infliger de dégâts.`),
        R(/^You tail-slap the (.+?)([.!])?$/i, m => PROPOSITION_ETRANGERE(m[0]) ? m[0] : `Vous frappez ${objetDirect(m[1])} avec votre queue${ponct(m[2])}`),
        R(/^Your tail-slap misses the (.+?)\.$/i, m => `Votre coup de queue manque ${objetDirect(m[1])}.`),

        // Inventaire : « a - a +0 dagger (weapon) »
        R(/^([A-Za-z]) -> ([a-z]) - (.+)$/i, m => avecObjet(m[3], o => `${m[1]} → ${m[2]} – ${o}`)),
        R(/^([A-Za-z]) - (.+?)(?: \((weapon|worn|quivered)\))?$/i, m => avecObjet(m[2], o => {
            const marque = m[3] ? ` (${{ weapon: "arme", worn: "porté", quivered: "en carquois" }[m[3].toLowerCase()]})` : "";
            return `${m[1]} – ${o}${marque}`;
        })),

        // Objets seuls : « a +0 dagger », « 3 stones », « a goblin corpse »
        R(/^((?:an?|the|\d+)\s+.+)$/i, m => objet(m[1])),

        // Listes séparées par des points-virgules : « a +0 dagger; a stone »
        R(/^(.{1,140})$/, m => {
            if (!m[1].includes(";")) return null;
            let change = false;
            const sortie = m[1].split(";").map(p => {
                const t = p.trim();
                if (!t) return p;
                const r = tr(t);
                if (r === t) return p;
                change = true;
                return p.replace(t, () => r);
            });
            return change ? sortie.join(";") : null;
        }),
        // Texte de plusieurs phrases : on traduit chacune (seulement si toutes sont connues)
        R(/^(.+[.!?])\s+([A-Z].+[.!?])$/, m => {
            const morceaux = m[0].split(/(?<=[.!?])\s+(?=[A-Z])/);
            if (morceaux.length < 2) return null;
            const out = morceaux.map(x => tr(x));
            return out.some((x, i) => x === morceaux[i]) ? null : out.join(" ");
        })
    ];

    globalThis.DCSS_OBJET = objet;
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(rules);
})();
