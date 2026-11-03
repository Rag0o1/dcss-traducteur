// Audit allégé : ne rescane pas tout l'historique à chaque changement.
(() => {
    if (globalThis.__DCSS_AUDIT_ACTIF) return;
    globalThis.__DCSS_AUDIT_ACTIF = true;

    const textesInconnus = new Set();
    const dejaVus = new Set();   // textes déjà évalués : inutile de les retraduire à chaque passage
    const normaliser = texte => (texte || "").replace(/\s+/g, " ").trim();
    const SELECTEURS = ".menu.menu_, .describe-generic, .game_message, #prompt, .prompt, #ui-stack";
    const MAX_TEXTE = 2000;
    const MAX_INCONNUS = 3000;
    let publicationProgrammee = false;
    let changementsDepuisPublication = 0;

    function estDansZone(node) {
        const el = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
        return !!(el && (el.matches(SELECTEURS) || el.closest(SELECTEURS)));
    }

    function releverTexte(texte) {
        const t = normaliser(texte);
        if (t.length < 5 || t.length > MAX_TEXTE || !/[A-Za-zÀ-ÿ]{3}/.test(t)) return;
        if (dejaVus.has(t)) return;
        if (dejaVus.size > 20000) dejaVus.clear();
        dejaVus.add(t);

        // Texte déjà produit par le traducteur : ce n'est pas un texte à traduire.
        if (globalThis.DCSS_SORTIES && globalThis.DCSS_SORTIES.has(t)) return;

        // Texte présent dans le dictionnaire (même si identique en français).
        if (typeof globalThis.DCSS_EST_CONNU === "function" && globalThis.DCSS_EST_CONNU(t)) return;

        // Le moteur sait déjà traduire cette chaîne (y compris via ses règles génériques).
        // On teste le texte normalisé ET le texte brut (certains fragments finissent par une espace).
        if (typeof globalThis.DCSS_TRADUIRE_CHAINE === "function") {
            try {
                if (globalThis.DCSS_TRADUIRE_CHAINE(t) !== t) return;
                if (typeof texte === "string" && globalThis.DCSS_TRADUIRE_CHAINE(texte) !== texte) return;
            } catch (_) { /* L'audit ne doit jamais perturber le jeu. */ }
        }

        if (/^(?:[a-z]|\[?\]?|XL\s*\d+|\d+)\s*[-:]?$/i.test(t)) return;
        if (textesInconnus.has(t) || textesInconnus.size >= MAX_INCONNUS) return;

        textesInconnus.add(t);
        changementsDepuisPublication++;
        if (textesInconnus.size === 1 || textesInconnus.size % 25 === 0) {
            console.warn("[DCSS À TRADUIRE]", t);
        }
        programmerPublication();
    }

    function scannerSousArbre(node) {
        if (!node) return;
        if (node.nodeType === Node.TEXT_NODE) {
            if (estDansZone(node)) releverTexte(node.nodeValue);
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
        const element = node.nodeType === Node.ELEMENT_NODE ? node : null;
        const estZone = element && element.matches(SELECTEURS);
        const parentZone = element && element.closest(SELECTEURS);
        const enfantsZones = element && element.querySelectorAll ? element.querySelectorAll(SELECTEURS) : [];
        if (!estZone && !parentZone && (!enfantsZones || !enfantsZones.length)) return;

        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let textNode;
        while ((textNode = walker.nextNode())) {
            if (estDansZone(textNode)) releverTexte(textNode.nodeValue);
        }
    }

    function publier() {
        publicationProgrammee = false;
        changementsDepuisPublication = 0;
        try {
            document.documentElement.dataset.dcssTextesNonTraduits = JSON.stringify(
                [...textesInconnus].sort()
            );
        } catch (erreur) {
            console.warn("[DCSS Audit] Impossible de mettre à jour la liste :", erreur);
        }
    }

    function programmerPublication() {
        if (publicationProgrammee) return;
        publicationProgrammee = true;
        requestAnimationFrame(publier);
    }

    // Capture initiale une seule fois.
    document.querySelectorAll(SELECTEURS).forEach(scannerSousArbre);
    publier();

    // Pour les modifications suivantes, inspecte uniquement les nœuds touchés.
    const observer = new MutationObserver(records => {
        for (const record of records) {
            if (record.type === "characterData") {
                if (estDansZone(record.target)) releverTexte(record.target.nodeValue);
            } else {
                for (const node of record.addedNodes) scannerSousArbre(node);
            }
        }
    });
    if (document.body) observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    console.info("[DCSS Audit] Actif (version allégée). Liste : JSON.parse(document.documentElement.dataset.dcssTextesNonTraduits || \"[]\")");
})();
