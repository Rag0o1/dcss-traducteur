// Assemble tous les dictionnaires (donnees/...) chargés par manifest.json en un seul.
// Ordre de chargement = ordre du manifest ; en cas de doublon, le DERNIER gagne (MES-CORRECTIONS.js est donc en dernier).
//
// Noms de sorts (réglage OPTIONS.js) :
//   "anglais"  : on n'ajoute pas la catégorie « sorts » (les noms restent anglais) mais « sorts_noms_anglais »
//                (les quelques textes français qui citaient un nom de sort traduit, réécrits avec le nom anglais) ;
//   "francais" : l'inverse.
globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};
globalThis.DCSS_SORTS_EN_ACTIF = ((globalThis.DCSS_OPTIONS || {}).nomsDeSorts || "anglais") !== "francais";
const traductions = Object.assign(
    {},
    ...Object.entries(globalThis.DCSS_TRADUCTIONS)
        .filter(([nom, categorie]) => categorie && typeof categorie === "object" && !Array.isArray(categorie)
            && nom !== (globalThis.DCSS_SORTS_EN_ACTIF ? "sorts" : "sorts_noms_anglais"))
        .map(([, categorie]) => categorie)
);
console.log("Base de traduction chargée :", Object.keys(traductions).length, "textes", globalThis.DCSS_SORTS_EN_ACTIF ? "(noms de sorts en anglais)" : "(noms de sorts en français)");
