// =====================================================================
//  recherche.js : recherche Ctrl+F en français
//  ---------------------------------------------------------------------
//  Le jeu compare la recherche aux noms ANGLAIS, côté serveur. Quand le
//  joueur valide (Entrée) la question « Search for what? / Chercher quoi ? »,
//  on remplace, AVANT l'envoi au serveur, le texte français par une regex
//  anglaise (le préfixe « / » force le mode regex, quel que soit le réglage) :
//     parchemin          ->  /(scroll)
//     potion de guérison ->  /(potion(e?s)? of curing)
//     @potion            ->  @/(potion)      (niveau actuel seulement)
//  L’anglais marche toujours : un morceau de mot (« arm ») reste dans la regex,
//  et un mot inconnu est envoyé tel quel. « =texte » = recherche exacte
//  sans traduction.
//  Sources : DCSS_VOCAB (vocabulaire.js), races, métiers, MOTS_RECHERCHE.
//  Test depuis la console (F12) : traduireRecherche("parchemin")
// =====================================================================
(function () {
    "use strict";

    const LONGUEUR_MAX = 399;   // le serveur lit au plus 399 caractères
    const MAX_RESULTATS = 60;   // au-delà, la regex devient inutilisable
    const LONGUEUR_MAX_ENTREE = 50;

    // Mots généraux (catégories, décors, mots-clés du jeu) : "français": "anglais"
    const MOTS_RECHERCHE = {
        "potion": "potion", "parchemin": "scroll", "anneau": "ring", "bague": "ring",
        "amulette": "amulet", "baguette": "wand", "baton": "staff", "livre": "book",
        "manuel": "manual", "arme": "weapon", "armure": "armour", "bouclier": "shield",
        "casque": "helmet", "bottes": "boots", "gants": "gloves", "cape": "cloak",
        "fleche": "arrow", "carreau": "bolt", "javelot": "javelin", "pierre": "stone",
        "or": "gold", "rune": "rune", "orbe": "orb", "talisman": "talisman", "joyau": "gem",
        "objet": "item", "artefact": "artefact", "escalier": "staircase", "autel": "altar",
        "boutique": "shop", "magasin": "shop", "porte": "door", "portail": "portal",
        "fontaine": "fountain", "piege": "trap", "entree": "entrance", "sortie": "exit",
        "cadavre": "corpse", "squelette": "skeleton", "inventaire": "carried",
        "inutile": "useless", "ramassage auto": "autopickup"
    };

    // Petits mots ignorés quand on cherche mot par mot
    const MOTS_VIDES = new Set(["de", "du", "des", "d", "la", "le", "les", "l", "un", "une", "a", "en", "au", "aux"]);

    // La question du Ctrl+F, en anglais ou déjà traduite par l'extension
    const QUESTION_RECHERCHE = /Search for what|Chercher quoi/i;

    // ---------- outils ----------

    function normaliser(texte) {
        return String(texte)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")   // enlève les accents
            .replace(/[’‘]/g, "'")
            .replace(/\s+/g, " ")
            .trim();
    }

    function echapperRegex(texte) {
        return texte.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Le jeu écrit les piles au pluriel : « 2 potions of curing ».
    function motifAnglais(terme) {
        return echapperRegex(terme).replace(/^(\S+?)( of )/, "$1(e?s)?$2");
    }

    function estAscii(texte) {
        return /^[\x20-\x7e]*$/.test(texte);
    }

    // « de Lames longues » -> « Lames longues »
    function sansPreposition(fr) {
        return String(fr).replace(/^(de |d’|d'|du |des )/i, "");
    }

    // ---------- index français -> anglais ----------

    let index = null;   // [{ fr: "potion de guerison", en: ["potion of curing"] }]

    function construireIndex() {
        const paires = new Map();

        function ajouter(en, fr) {
            if (typeof en !== "string" || typeof fr !== "string") return;
            if (en.length > LONGUEUR_MAX_ENTREE || fr.length > LONGUEUR_MAX_ENTREE) return;
            const cle = normaliser(fr);
            if (!cle) return;
            if (!paires.has(cle)) paires.set(cle, new Set());
            paires.get(cle).add(en.toLowerCase());
        }

        const V = globalThis.DCSS_VOCAB || {};
        const T = globalThis.DCSS_TRADUCTIONS || {};
        const premier = v => Array.isArray(v) ? v[0] : v;

        Object.entries(V.monsters || {}).forEach(([en, m]) => ajouter(en, m && m.name));
        Object.entries(V.projectiles || {}).forEach(([en, m]) => ajouter(en, m && m.name));
        Object.entries(V.ARMES || {}).forEach(([en, v]) => ajouter(en, premier(v)));
        Object.entries(V.ARMURES || {}).forEach(([en, v]) => ajouter(en, premier(v)));
        Object.entries(V.DECORS || {}).forEach(([en, v]) => ajouter(en, Array.isArray(v) ? v[1] : v));
        Object.entries(V.POTIONS_EFFETS || {}).forEach(([en, fr]) => ajouter("potion of " + en, "potion " + fr));
        Object.entries(V.PARCHEMINS || {}).forEach(([en, fr]) => ajouter("scroll of " + en, "parchemin " + fr));
        Object.entries(V.EGOS_ARME || {}).forEach(([en, v]) => ajouter(en, premier(v)));
        Object.entries(V.EGOS_ARMURE || {}).forEach(([en, v]) => ajouter(en, sansPreposition(premier(v))));
        Object.entries(V.COULEURS || {}).forEach(([en, fr]) => ajouter(en, fr));
        Object.entries(V.ADJ_POTION || {}).forEach(([en, fr]) => ajouter(en, fr));
        Object.entries(V.competences || {}).forEach(([en, fr]) => ajouter(en, sansPreposition(fr)));
        Object.entries(V.spells || {}).forEach(([en, fr]) => ajouter(en, fr));   // vide si noms de sorts en anglais
        ["races", "metiers"].forEach(c => Object.entries(T[c] || {}).forEach(([en, fr]) => ajouter(en, fr)));
        Object.entries(MOTS_RECHERCHE).forEach(([fr, en]) => ajouter(en, fr));

        index = [...paires.entries()].map(([fr, ens]) => ({ fr, en: [...ens] }));
        console.log("[Recherche FR] index :", index.length, "termes");
    }

    // ---------- traduction de la requête ----------

    function traduireRequete(brut) {
        if (!index) construireIndex();
        let requete = String(brut);

        // Cas spéciaux du jeu, laissés tels quels : vide (= dernière recherche), « ? » (aide),
        // « . » / « .. », « /regex », « =texte exact », « * » ou chiffre (waypoints), syntaxe Lua.
        if (!requete.trim()) return brut;
        if (/^(\?|\.{1,2}|\*|\d)$/.test(requete.trim())) return brut;
        if (/^[\/=]/.test(requete)) return brut;
        if (/&&|\|\||!!/.test(requete)) return brut;

        // « @ » = niveau actuel seulement : on le garde devant.
        let prefixe = "";
        if (requete.startsWith("@")) {
            prefixe = "@";
            requete = requete.slice(1);
            if (/^[\/=]/.test(requete)) return brut;
        }

        const q = normaliser(requete);
        if (!q) return brut;
        const mots = q.split(" ").filter(m => !MOTS_VIDES.has(m));

        // 1) exact ; 2) noms qui contiennent la saisie ; 3) noms qui contiennent tous les mots
        let trouves = index.filter(e => e.fr === q);
        let motComplet = trouves.length > 0;   // la saisie est un mot français connu
        if (!trouves.length) trouves = index.filter(e => e.fr.includes(q));
        if (!trouves.length && mots.length > 1) {
            trouves = index.filter(e => mots.every(m => e.fr.includes(m)));
            motComplet = trouves.length > 0;
        }

        // 4) mot à mot (« potion bleue » -> potion + blue)
        if (!trouves.length && mots.length > 1) {
            const listes = mots.map(m => {
                const exacts = index.filter(e => e.fr === m);
                return exacts.length ? exacts : index.filter(e => e.fr.includes(m));
            });
            if (listes.every(l => l.length)) {
                const parts = listes.map(l => "(" + [...new Set(l.flatMap(e => e.en))].map(echapperRegex).join("|") + ")");
                let motif = parts.join(".*");
                if (parts.length === 2) motif = parts[0] + ".*" + parts[1] + "|" + parts[1] + ".*" + parts[0];
                return finaliser(prefixe, "(" + motif + ")", brut);
            }
        }

        if (!trouves.length) return brut;   // inconnu : envoyé tel quel (peut-être de l'anglais)

        // Le plus court d'abord ; si un terme en contient un autre, le plus court suffit.
        let anglais = [...new Set(trouves.flatMap(e => e.en))].sort((a, b) => a.length - b.length);
        anglais = anglais.filter((t, i) => !anglais.slice(0, i).some(c => t.includes(c))).slice(0, MAX_RESULTATS);

        const alternatives = anglais.map(motifAnglais);
        // Mot français connu (« or », « parchemin ») : on n'envoie que l'anglais -> /(gold).
        // Simple morceau d'un nom français (« arm » dans « arme ») : on garde aussi la saisie,
        // car c'est peut-être un mot anglais -> /(weapon|arm).
        if (!motComplet && estAscii(requete.trim()) && !anglais.includes(q)) alternatives.push(echapperRegex(q));

        return finaliser(prefixe, "(" + alternatives.join("|") + ")", brut);
    }

    function finaliser(prefixe, motif, brut) {
        let resultat = prefixe + "/" + motif;
        if (resultat.length > LONGUEUR_MAX) {
            const coupe = resultat.slice(0, LONGUEUR_MAX - 1);
            const dernier = coupe.lastIndexOf("|");
            if (dernier <= 0) return brut;
            resultat = coupe.slice(0, dernier) + ")";
            console.warn("[Recherche FR] requête tronquée : trop de résultats");
        }
        return resultat;
    }

    // ---------- interception de la saisie ----------

    function estChampRecherche(champ) {
        if (!(champ instanceof HTMLInputElement) || !champ.classList.contains("text")) return false;
        const conteneur = champ.closest("#input_dialog, .game_message, #messages");
        return !!conteneur && QUESTION_RECHERCHE.test(conteneur.textContent || "");
    }

    // Phase de capture sur window : on passe AVANT le gestionnaire de WebTiles,
    // qui lit ensuite input.value et l'envoie au serveur (message « text_input »).
    window.addEventListener("keydown", ev => {
        if (ev.key !== "Enter" && ev.keyCode !== 13) return;
        const champ = ev.target;
        if (!estChampRecherche(champ)) return;
        const avant = champ.value;
        const apres = traduireRequete(avant);
        if (apres !== avant) {
            champ.value = apres;
            console.log("[Recherche FR]", JSON.stringify(avant), "->", JSON.stringify(apres));
        }
    }, true);

    globalThis.traduireRecherche = traduireRequete;
    console.log("[Recherche FR] Ctrl+F en français activé");
})();
