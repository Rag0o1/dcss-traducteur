// =====================================================================
//  manuel_moteur.js : traduction des GROS textes (le manuel du jeu, etc.)
//
//  Le manuel s'affiche comme un seul énorme bloc de texte. On le découpe en
//  paragraphes (séparés par une ligne vide), on traduit chaque paragraphe grâce
//  au dictionnaire globalThis.DCSS_MANUEL (fichiers donnees/manuel/manuel_*.js),
//  puis on remet les lignes à la largeur de 72 caractères.
//
//  Dans les fichiers manuel_*.js, une traduction qui contient « \n » garde sa mise
//  en page ligne par ligne (tableaux, listes). Sans « \n », elle est remise en forme
//  automatiquement en conservant l'indentation et les puces (« - », « * »).
// =====================================================================
(() => {
    const LARGEUR = 72;
    const norm = s => s.replace(/\s+/g, " ").trim();

    function envelopperLigne(ligne) {
        if (ligne.length <= LARGEUR) return ligne;
        const m = ligne.match(/^(\s*)((?:[-*] |\d+\. )?)(.*)$/);
        const indent = m[1], puce = m[2], mots = m[3].split(/ +/);
        const suite = indent + " ".repeat(puce.length);
        const lignes = [];
        let courante = indent + puce;
        let vide = true;
        for (const mot of mots) {
            if (!vide && courante.length + 1 + mot.length > LARGEUR) {
                lignes.push(courante);
                courante = suite + mot;
            } else {
                courante += (vide ? "" : " ") + mot;
            }
            vide = false;
        }
        lignes.push(courante);
        return lignes.join("\n");
    }

    function chercher(cle) {
        const perso = (globalThis.DCSS_TRADUCTIONS || {}).perso;
        if (perso && Object.prototype.hasOwnProperty.call(perso, cle)) return perso[cle];
        const m = globalThis.DCSS_MANUEL || {};
        return Object.prototype.hasOwnProperty.call(m, cle) ? m[cle] : null;
    }

    globalThis.DCSS_TRADUIRE_MANUEL = function (texte) {
        const morceaux = texte.split(/(\r?\n[ \t]*\r?\n)/);
        let change = false;
        for (let i = 0; i < morceaux.length; i += 2) {
            const bloc = morceaux[i];
            if (!bloc.trim()) continue;
            const fr = chercher(norm(bloc));
            if (fr === null) continue;
            morceaux[i] = fr.split("\n").map(envelopperLigne).join("\n");
            change = true;
        }
        return change ? morceaux.join("") : texte;
    };
    globalThis.DCSS_MANUEL = globalThis.DCSS_MANUEL || {};
})();
