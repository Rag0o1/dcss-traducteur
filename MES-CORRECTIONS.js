// =====================================================================
//  MES-CORRECTIONS.js : VOS corrections personnelles (chargé en dernier : il gagne toujours)
//
//  Comment corriger une traduction :
//   1. Ouvrez la console du navigateur (F12) sur la page du jeu : l’audit liste les textes non traduits.
//   2. Copiez le texte anglais EXACT, ajoutez-le ci-dessous avec votre traduction.
//   3. Rechargez l’extension (about:debugging) puis la page.
//
//  Chaque ligne a la forme :   "texte anglais exact": "votre traduction",
//  (n’oubliez pas la virgule à la fin ; utilisez ’ ou \" pour les guillemets dans le texte)
//
//  Une entrée ici l’emporte sur TOUT le reste (officiel, lexique, règles de messages.js).
//  Si le texte contient un nombre qui change (« 3 stones »), ce n’est pas un texte exact :
//  corrigez plutôt le vocabulaire dans donnees/messages/vocabulaire.js (voir LISEZ-MOI.txt).
// =====================================================================
globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};
globalThis.DCSS_TRADUCTIONS.perso = {
    // Exemples (supprimez les « // » devant une ligne pour l’activer) :
    // "Dungeon Crawl Help": "Aide Dungeon Crawl",
    // "You have no more potions.": "Vous n’avez plus de potions.",
};
