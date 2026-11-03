console.log("DCSS Traducteur chargé !");

// Garde-fous contre les boucles DOM et les remplacements anormalement volumineux.
const DCSS_MAX_TEXTE_SOURCE = 8000;
const DCSS_MAX_TEXTE_TRADUIT = 20000;
const DCSS_CONFIG_OBSERVATION = {
    childList: true,
    subtree: true,
    characterData: true
};

const DCSS_DICTIONNAIRE = (typeof traductions === "object" && traductions) ? traductions : {};
const DCSS_FRAGMENTS = Object.entries(DCSS_DICTIONNAIRE)
    // Clé commençant par « ~ » : morceau de phrase remplacé n'importe où dans le texte.
    .map(([anglais, francais]) => (anglais && anglais.startsWith("~") && anglais.length > 8) ? [anglais.slice(1), francais] : [anglais, francais])
    .filter(([anglais]) => anglais && (
        anglais.endsWith(" ") ||
        anglais.startsWith(".") ||
        anglais.endsWith("+") ||
        anglais.endsWith("[") ||
        DCSS_DICTIONNAIRE["~" + anglais] !== undefined
    ))
    // Les fragments les plus longs passent d'abord pour éviter les collisions.
    .sort((a, b) => b[0].length - a[0].length);

function traduireChaine(texte) {
    if (typeof texte !== "string" || texte.length === 0) return texte;
    // Ne jamais transformer les nœuds qui ne contiennent que des espaces :
    // espacesAvant et espacesApres les couvriraient tous les deux et doubleraient le texte.
    if (texte.trim().length === 0) return texte;
    // Une seule cellule UI ne devrait jamais contenir autant de texte.
    if (texte.length > DCSS_MAX_TEXTE_SOURCE) return texte;

    if (Object.prototype.hasOwnProperty.call(DCSS_DICTIONNAIRE, texte)) {
        return DCSS_DICTIONNAIRE[texte];
    }

    const espacesAvant = (texte.match(/^\s*/) || [""])[0];
    const espacesApres = (texte.match(/\s*$/) || [""])[0];
    const fin = espacesApres.length ? texte.length - espacesApres.length : texte.length;
    const coeur = texte.slice(espacesAvant.length, fin);

    if (Object.prototype.hasOwnProperty.call(DCSS_DICTIONNAIRE, coeur)) {
        const valeur = espacesAvant + DCSS_DICTIONNAIRE[coeur] + espacesApres;
        return valeur.length <= DCSS_MAX_TEXTE_TRADUIT ? valeur : texte;
    }

    // Texte multi-lignes : le dictionnaire officiel stocke les textes avec une seule espace.
    const coeurNormalise = coeur.replace(/\s+/g, " ");
    if (coeurNormalise !== coeur && Object.prototype.hasOwnProperty.call(DCSS_DICTIONNAIRE, coeurNormalise)) {
        const valeur = espacesAvant + DCSS_DICTIONNAIRE[coeurNormalise] + espacesApres;
        return valeur.length <= DCSS_MAX_TEXTE_TRADUIT ? valeur : texte;
    }

    const appliquerFragments = (base) => {
        let r = base;
        for (const [anglais, francais] of DCSS_FRAGMENTS) {
            if (!r.includes(anglais)) continue;
            const prochain = r.split(anglais).join(francais);
            // Si une règle de fragment multiplie le texte de façon anormale, abandonne.
            if (prochain.length > Math.max(2000, coeur.length * 6 + 500)) {
                console.warn("[DCSS Traducteur] Remplacement trop volumineux ignoré :", anglais);
                return null;
            }
            r = prochain;
        }
        return r;
    };
    let resultat = appliquerFragments(coeur);
    if (resultat === null) return texte;
    // Texte sur plusieurs lignes : on retente avec les espaces normalisées (descriptions longues).
    if (resultat === coeur && coeurNormalise !== coeur) {
        const essai = appliquerFragments(coeurNormalise);
        if (essai !== null && essai !== coeurNormalise) resultat = essai;
    }

    const regles = globalThis.DCSS_TRADUCTION_REGLES || [];
    for (const regle of regles) {
        if (!regle || !(regle.regex instanceof RegExp) || typeof regle.translate !== "function") continue;
        const correspondance = resultat.match(regle.regex);
        if (!correspondance) continue;

        try {
            const candidat = regle.translate(correspondance, resultat);
            if (typeof candidat === "string" && candidat !== resultat) {
                if (candidat.length > Math.max(2000, texte.length * 6 + 500)) {
                    console.warn("[DCSS Traducteur] Résultat de règle trop volumineux ignoré.");
                    return texte;
                }
                resultat = candidat;
                break;
            }
        } catch (erreur) {
            console.error("[DCSS Traducteur] Une règle de traduction a échoué :", erreur);
        }
    }

    const final = espacesAvant + resultat + espacesApres;
    if (final.length > DCSS_MAX_TEXTE_TRADUIT) return texte;
    return final;
}

// Textes à colonnes (écran d'aide) : un même nœud contient plusieurs lignes avec deux colonnes
// alignées par des espaces. On remplace chaque libellé puis on ajuste les espaces qui le suivent
// pour que la colonne de droite ne bouge pas. Liste : globalThis.DCSS_COLONNES = [[anglais, français], ...]
const DCSS_COLONNES = (globalThis.DCSS_COLONNES || [])
    .slice()
    .sort((a, b) => b[0].length - a[0].length)
    .map(([en, fr]) => ({
        en, fr,
        regex: new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "( *)", "g")
    }));

function traduireColonnes(texte) {
    if (!DCSS_COLONNES.length || typeof texte !== "string") return texte;
    let resultat = texte;
    for (const { en, fr, regex } of DCSS_COLONNES) {
        if (!resultat.includes(en)) continue;
        resultat = resultat.replace(regex, (m, espaces, decalage, tout) => {
            if (espaces.length) {
                // Même largeur qu'en anglais : on complète (ou on retire) des espaces.
                return fr + " ".repeat(Math.max(1, espaces.length + en.length - fr.length));
            }
            const manque = Math.max(0, en.length - fr.length);
            const suite = tout.charAt(decalage + m.length);
            // Libellé suivi directement d'une autre balise (touche...) : on décale avant le « : »
            // pour que le texte reste collé ; sinon on complète après (invisible en fin de ligne).
            const collee = suite ? suite !== "\n" : /\(e?$|\(aussi$/.test(fr);
            if (manque && collee && fr.startsWith(":")) return " ".repeat(manque) + fr;
            return fr + " ".repeat(manque);
        });
    }
    return resultat;
}

// ---------------------------------------------------------------------------------------------
// Noms de sorts (donnees/sorts/noms.js). Beaucoup de mots (Slow, Haste, Pain...) existent aussi en
// anglais courant : on ne les remplace donc que dans un contexte sûr :
//   - début de ligne d'un menu de sorts (« a - Blink », « Blink  Translocation », « Blink 68% ... ») ;
//   - après « Cast: », « Memorise », « Forget », « parchment of », « memory of », « to cast ».
// Les noms d'écoles de magie (Fire, Ice, Hexes...) ne sont traduits que sur les lignes de sorts.
// ---------------------------------------------------------------------------------------------
const DCSS_SORTS = (globalThis.DCSS_TRADUCTIONS || {}).sorts || {};
// Réglage OPTIONS.js : "anglais" (défaut) = les noms de sorts et d'écoles restent en anglais ; seules les phrases autour sont traduites.
const DCSS_SORTS_EN = ((globalThis.DCSS_OPTIONS || {}).nomsDeSorts || "anglais") !== "francais";
const DCSS_ECOLES = {
    Conjuration: "Conjuration", Hexes: "Maléfices", Fire: "Feu", Ice: "Glace", Air: "Air", Earth: "Terre",
    Necromancy: "Nécromancie", Summoning: "Invocation", Translocation: "Translocation",
    Alchemy: "Alchimie", Forgecraft: "Forge"
};
const DCSS_ECHAPPER = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const DCSS_NOMS_SORTS = Object.keys(DCSS_SORTS).sort((a, b) => b.length - a.length).map(DCSS_ECHAPPER).join("|");
const DCSS_ECOLE_ALT = Object.keys(DCSS_ECOLES).join("|");
const DCSS_ECOLES_LISTE = "(?:" + DCSS_ECOLE_ALT + ")(?:\\/(?:" + DCSS_ECOLE_ALT + "))*";
const deSort = nom => (DCSS_SORTS_EN && /^[AEIOUY]/.test(nom) ? "d’" : "de ") + sortFr(nom);   // « de Blink » / « d’Apportation »
const sortFr = nom => (!DCSS_SORTS_EN && Object.prototype.hasOwnProperty.call(DCSS_SORTS, nom)) ? DCSS_SORTS[nom] : nom;
const ecolesFr = liste => DCSS_SORTS_EN ? liste : liste.split("/").map(e => DCSS_ECOLES[e] || e).join("/");

let DCSS_RE_LIGNE_SORT = null, DCSS_RE_CONTEXTE_SORT = null, DCSS_RE_ECOLES = null, DCSS_RE_PARCHEMIN = null, DCSS_PHRASES_SORTS = [];
if (DCSS_NOMS_SORTS) {
    // Début de ligne, avec ou sans « a - » devant, suivi d'espaces d'alignement.
    DCSS_RE_LIGNE_SORT = new RegExp(
        "^(\\s*(?:[a-zA-Z] [-+#] )?)(" + DCSS_NOMS_SORTS + ")( +)(?=(\\d+%|" + DCSS_ECOLES_LISTE + "\\b)|\\S)", "gm");
    DCSS_RE_CONTEXTE_SORT = new RegExp(
        "(Cast: |Memorise |Forget |memory of |parchment of |to cast |death for )(" + DCSS_NOMS_SORTS + ")(?![\\w'’])", "g");
    DCSS_RE_ECOLES = new RegExp("(" + DCSS_ECOLES_LISTE + ")( *)(?![\\w])", "g");
    DCSS_RE_PARCHEMIN = new RegExp("\\b(an?|the) parchment of (" + DCSS_NOMS_SORTS + ")(?![\\w'’])", "g");
    const N = "(" + DCSS_NOMS_SORTS + ")";
    DCSS_PHRASES_SORTS = [
        [new RegExp("^Forget " + N + ", freeing (\\d+) spell levels for a total of (\\d+)\\?$"),
            (m, n, a, b) => "Oublier " + sortFr(n) + ", libérer " + a + " niveaux de sort, pour un total de " + b + " ?"],
        [new RegExp("^Memorise " + N + ", consuming (\\d+) spell levels and leaving (\\d+)\\?$"),
            (m, n, a, b) => "Mémoriser " + sortFr(n) + ", consommer " + a + " niveaux de sort et en laisser " + b + " ?"],
        [new RegExp("^Your memory of " + N + " unravels\\.$"),
            (m, n) => "Votre souvenir " + deSort(n) + " s’efface."],
        [new RegExp("^You have harvested enough death to cast " + N + " an additional time\\.$"),
            (m, n) => "Vous avez récolté assez de mort pour lancer " + sortFr(n) + " une fois de plus."],
        [new RegExp("^You have harvested as much death for " + N + " as you can hold at once\\.$"),
            (m, n) => "Vous avez récolté tout ce que " + sortFr(n) + " peut contenir de mort."],
        [/^You have harvested enough death to cast this spell (\d+) times?\. \(Maximum of (\d+)\.\)$/,
            (m, a, b) => "Vous avez récolté assez de mort pour lancer ce sort " + a + " fois. (Maximum : " + b + ".)"],
        [new RegExp("^Level: (\\d+)(\\s+)Schools?: (" + DCSS_ECOLES_LISTE + ")(\\s+)Fail: (\\d+%)$"),
            (m, n, e1, ec, e2, f) => "Niveau : " + n + e1 + (ec.includes("/") ? "Écoles : " : "École : ") + ecolesFr(ec) + e2 + "Échec : " + f]
    ];
}

function traduireSorts(texte) {
    if (!DCSS_RE_LIGNE_SORT || typeof texte !== "string" || texte.length > 600) return texte;
    // Phrases entières (confirmations, messages) : on garde les espaces autour.
    const coeur = texte.trim();
    if (coeur && coeur !== texte) {
        const t = traduireSorts(coeur);
        if (t !== coeur) return texte.slice(0, texte.indexOf(coeur)) + t + texte.slice(texte.indexOf(coeur) + coeur.length);
    }
    for (const [regex, fabrique] of DCSS_PHRASES_SORTS) {
        const m = texte.match(regex);
        if (m) return fabrique(...m);
    }
    let resultat = texte;
    let ligneDeSort = false;

    if (!DCSS_SORTS_EN) resultat = resultat.replace(DCSS_RE_LIGNE_SORT, (m, debut, nom, espaces, suite) => {
        // Un seul espace : seulement si un pourcentage ou une école de magie suit (« Blink 68% », « Blink Hexes »).
        if (espaces.length < 2 && !suite) return m;
        ligneDeSort = true;
        const fr = DCSS_SORTS[nom];
        const n = espaces.length >= 2 ? Math.max(1, espaces.length + nom.length - fr.length) : 1;
        return debut + fr + " ".repeat(n);
    });
    resultat = resultat.replace(DCSS_RE_CONTEXTE_SORT, (m, avant, nom) => {
        ligneDeSort = true;
        return (avant === "Cast: " ? "Lancer : " : avant) + sortFr(nom);
    });
    if (ligneDeSort && !DCSS_SORTS_EN) {
        resultat = resultat.replace(DCSS_RE_ECOLES, (m, liste, espaces) => {
            const fr = ecolesFr(liste);
            return fr + (espaces.length >= 2 ? " ".repeat(Math.max(1, espaces.length + liste.length - fr.length)) : espaces);
        });
    }
    return resultat;
}

// Tableau des compétences : le nom est suivi d'espaces qui alignent les chiffres. On traduit le nom
// en ajustant ces espaces pour que les colonnes restent droites, même si le nom français est plus long ou plus court.
const DCSS_COMPETENCES = ["Fighting", "Short Blades", "Long Blades", "Maces & Flails", "Axes", "Polearms", "Staves", "Unarmed Combat",
    "Ranged Weapons", "Bows", "Crossbows", "Slings", "Throwing", "Armour", "Dodging", "Shields", "Stealth", "Spellcasting", "Conjurations", "Hexes",
    "Summonings", "Necromancy", "Translocations", "Transmutations", "Alchemy", "Fire Magic", "Ice Magic", "Air Magic", "Earth Magic",
    "Poison Magic", "Invocations", "Evocations", "Shapeshifting", "Forgecraft", "Magic"];
const DCSS_RE_COMPETENCES = new RegExp("(^|[^A-Za-z&])(" + DCSS_COMPETENCES.slice().sort((a, b) => b.length - a.length)
    .map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")( {2,}| +(?=[\\d-]))", "g");
const DCSS_RE_ENTETE_COMP = /Skill( +)Level( +)Train( +)Apt/g;
function traduireCompetences(texte) {
    if (typeof texte !== "string" || texte.length > 200) return texte;
    let r = texte.replace(DCSS_RE_ENTETE_COMP, (m, a, b, c) => {
        const pad = (n, d) => " ".repeat(Math.max(1, n + d));
        return "Comp." + a + "Niv." + pad(b.length, 1) + "Entr." + c + "Apt";
    });
    r = r.replace(DCSS_RE_COMPETENCES, (m, avant, nom, espaces) => {
        const fr = traduireChaine(nom);
        if (fr === nom) return m;
        return avant + fr + " ".repeat(Math.max(1, espaces.length + nom.length - fr.length));
    });
    return r;
}

// Mode « noms de sorts en anglais » : « a parchment of Slow » -> « un parchemin de Slow ».
// Règle placée en DERNIER (les règles précises, comme « You pick up a parchment of X... », passent avant).
if (DCSS_SORTS_EN && DCSS_RE_PARCHEMIN) {
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat([{
        regex: /parchments? of /,
        translate: (m, t) => t.replace(DCSS_RE_PARCHEMIN, (x, art, nom) => (art === "the" ? "le" : "un") + " parchemin " + deSort(nom))
    }]);
}

// Mode « noms de sorts en anglais » : une ligne de menu de sorts (« a - Blink   Translocation   68% ») reste telle quelle,
// pour que ni le nom ni l'école (Hexes, Necromancy...) ne soient traduits par les règles générales.
const DCSS_RE_UNE_LIGNE_SORT = (DCSS_SORTS_EN && DCSS_RE_LIGNE_SORT) ? new RegExp(DCSS_RE_LIGNE_SORT.source) : null;
function estLigneDeSort(ligne) {
    const m = DCSS_RE_UNE_LIGNE_SORT.exec(ligne);
    return !!m && (m[3].length >= 2 || !!m[4]);
}
function traduireEnProtegeantLesSorts(texte, traduire) {
    if (!DCSS_RE_UNE_LIGNE_SORT || texte.length > 600) return null;
    const lignes = texte.split("\n");
    if (!lignes.some(estLigneDeSort)) return null;
    return lignes.map(l => (estLigneDeSort(l) ? l : traduire(l))).join("\n");
}

globalThis.DCSS_TRADUIRE_CHAINE = function chaine(texte) {
    if (DCSS_RE_UNE_LIGNE_SORT && typeof texte === "string") {
        const protege = traduireEnProtegeantLesSorts(texte, chaine);
        if (protege !== null) return protege;
    }
    texte = traduireCompetences(texte);
    texte = traduireSorts(texte);
    // Les libellés à colonnes d'abord (ils ne touchent qu'à des phrases précises), puis le moteur normal.
    const apresColonnes = traduireColonnes(texte);
    return conserverLargeur(texte, traduireChaine(apresColonnes));
};
// Tableaux en police fixe (compétences...) : le jeu complète les mots par des espaces pour aligner les colonnes.
// Si la traduction n'a pas la même longueur, on retire ou ajoute des espaces finaux pour garder la même largeur.
function conserverLargeur(original, sortie) {
    if (sortie === original || original.length > 80 || /[\n\r]/.test(original)) return sortie;
    const fin = (original.match(/ +$/) || [""])[0];
    if (fin.length < 2 || !sortie.endsWith(fin)) return sortie;
    const delta = original.length - sortie.length;
    if (delta === 0) return sortie;
    return sortie.slice(0, sortie.length - fin.length) + " ".repeat(Math.max(1, fin.length + delta));
}
// Permet aux règles et à l'audit de savoir si un texte est dans le dictionnaire,
// même quand sa traduction est identique à l'anglais (ex. « Berserk »).
globalThis.DCSS_EST_CONNU = texte =>
    Object.prototype.hasOwnProperty.call(DCSS_DICTIONNAIRE, texte) ||
    Object.prototype.hasOwnProperty.call(DCSS_DICTIONNAIRE, texte.replace(/\s+/g, " ").trim());

// Cache : évite de retraduire cent fois le même texte à chaque changement de la page.
const memo = new Map();
// Liste des textes produits par le traducteur : le diagnostic s'en sert
// pour ne pas les signaler comme "non traduits".
globalThis.DCSS_SORTIES = globalThis.DCSS_SORTIES || new Set();
function traduireMemo(texte) {
    if (memo.has(texte)) return memo.get(texte);
    const resultat = globalThis.DCSS_TRADUIRE_CHAINE(texte);
    if (memo.size > 20000) memo.clear();
    memo.set(texte, resultat);
    if (typeof resultat === "string" && resultat !== texte) {
        if (globalThis.DCSS_SORTIES.size > 20000) globalThis.DCSS_SORTIES.clear();
        globalThis.DCSS_SORTIES.add(resultat.replace(/\s+/g, " ").trim());
    }
    return resultat;
}

function traduireNoeudTexte(noeud) {
    if (!noeud || noeud.nodeType !== Node.TEXT_NODE) return;
    const original = noeud.nodeValue;
    if (typeof original !== "string") return;
    if (original.length > DCSS_MAX_TEXTE_SOURCE) {
        // Gros textes (manuel du jeu...) : traduction paragraphe par paragraphe.
        if (noeud.__dcssManuelSortie === original || typeof globalThis.DCSS_TRADUIRE_MANUEL !== "function") return;
        if (!original.includes("\n\n")) return;
        const resultat = globalThis.DCSS_TRADUIRE_MANUEL(original);
        if (resultat !== original) {
            noeud.__dcssManuelSortie = resultat;
            noeud.nodeValue = resultat;
        }
        return;
    }

    const traduit = traduireMemo(original);
    if (typeof traduit !== "string" || traduit === original) return;
    if (traduit.length > DCSS_MAX_TEXTE_TRADUIT) return;

    noeud.nodeValue = traduit;
}

const DCSS_SELECTEURS = [".menu.menu_", ".describe-generic", ".game_message", "#prompt", ".prompt", "#ui-stack"];
const DCSS_SELECTEUR_ZONES = DCSS_SELECTEURS.join(",");

function traduireTextesDe(racine) {
    const walker = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    let noeud;
    while ((noeud = walker.nextNode())) traduireNoeudTexte(noeud);
}

// Balayage complet de la page (démarrage + filet de sécurité quand tout est calme).
function traduireDCSS() {
    const zones = new Set();
    document.querySelectorAll(DCSS_SELECTEUR_ZONES).forEach(zone => zones.add(zone));
    for (const zone of zones) traduireTextesDe(zone);
    detecterAide();
}

// Traduction incrémentale : on ne retraite que ce qui vient de changer.
function traduireNoeudsModifies(noeuds) {
    for (const noeud of noeuds) {
        if (!noeud.isConnected) continue;
        if (noeud.nodeType === Node.TEXT_NODE) {
            const parent = noeud.parentElement;
            if (parent && parent.closest(DCSS_SELECTEUR_ZONES)) traduireNoeudTexte(noeud);
        } else if (noeud.nodeType === Node.ELEMENT_NODE) {
            if (noeud.closest(DCSS_SELECTEUR_ZONES)) traduireTextesDe(noeud);
            else noeud.querySelectorAll(DCSS_SELECTEUR_ZONES).forEach(traduireTextesDe);
        }
    }
}

// Détection de l'écran « Dungeon Crawl Help » : on note dans la page la liste brute de ses textes,
// lisible depuis la console : JSON.parse(document.documentElement.dataset.dcssAide || "null")
let aideDerniere = "";
function detecterAide() {
    const fenetres = document.querySelectorAll("#ui-stack");
    for (const fenetre of fenetres) {
        const texte = fenetre.textContent || "";
        if (!/Dungeon Crawl Help|Aide de Dungeon Crawl|Game Saving and Quitting|Sauvegarde et sortie du jeu/.test(texte)) continue;
        const walker = document.createTreeWalker(fenetre, NodeFilter.SHOW_TEXT);
        const lignes = [];
        let n;
        while ((n = walker.nextNode()) && lignes.length < 400) {
            if (n.nodeValue.trim()) lignes.push(n.nodeValue);
        }
        const instantane = JSON.stringify({ detectee: true, noeuds: lignes });
        if (instantane !== aideDerniere) {
            aideDerniere = instantane;
            document.documentElement.dataset.dcssAide = instantane;
        }
        return;
    }
    if (aideDerniere) { aideDerniere = ""; delete document.documentElement.dataset.dcssAide; }
}

// On déconnecte l'observateur pendant nos propres remplacements : il ne doit pas
// relancer immédiatement le traducteur sur les modifications qu'il vient de faire.
let traductionProgrammee = false;
let traducteurObserver;
const enAttente = new Set();
let balayageTotal = false;
let minuteurCalme = null;
const DCSS_SEUIL_BALAYAGE = 400;   // au-delà, un balayage complet est plus simple et plus sûr

function noterChangements(enregistrements) {
    for (const r of enregistrements) {
        if (r.type === "characterData") enAttente.add(r.target);
        else for (const n of r.addedNodes) enAttente.add(n);
    }
    if (enAttente.size > DCSS_SEUIL_BALAYAGE) { enAttente.clear(); balayageTotal = true; }
    programmerTraduction();
    // Filet de sécurité : un balayage complet, mais seulement quand la page se calme.
    clearTimeout(minuteurCalme);
    minuteurCalme = setTimeout(() => { balayageTotal = true; programmerTraduction(); }, 1500);
}

function programmerTraduction() {
    if (traductionProgrammee) return;
    traductionProgrammee = true;
    requestAnimationFrame(() => {
        traductionProgrammee = false;
        if (!document.body) return;

        traducteurObserver.disconnect();
        try {
            if (balayageTotal) {
                balayageTotal = false;
                enAttente.clear();
                traduireDCSS();
            } else if (enAttente.size) {
                const lot = Array.from(enAttente);
                enAttente.clear();
                traduireNoeudsModifies(lot);
                if (document.getElementById("ui-stack") || aideDerniere) detecterAide();
            }
        } catch (erreur) {
            console.error("[DCSS Traducteur] Erreur pendant la traduction :", erreur);
        } finally {
            // Ignore les records produits par les changements du traducteur.
            traducteurObserver.takeRecords();
            traducteurObserver.observe(document.body, DCSS_CONFIG_OBSERVATION);
        }
    });
}

// Première traduction avant d'activer la surveillance.
traduireDCSS();
traducteurObserver = new MutationObserver(noterChangements);
if (document.body) traducteurObserver.observe(document.body, DCSS_CONFIG_OBSERVATION);
console.log("DCSS Traducteur v0.10 (aide + officiel + objets + sorts + combat) : actif. Textes officiels :", Object.keys((globalThis.DCSS_TRADUCTIONS || {}).officiel || {}).length, "\nDCSS Traduction automatique activée (observateur protégé) !");
