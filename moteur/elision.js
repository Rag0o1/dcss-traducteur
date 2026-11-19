// Élision : « l’ » / « d’ » devant une voyelle ou un h muet, mais PAS devant un h aspiré
// (la hache, la hallebarde, le héros, la harpie, la horde…). Partagé par regles.js, phrases_a_trous.js, graffitis.js.
globalThis.DCSS_H_ASPIRE = /^(hach|halleb|hall\b|halte|hamac|hameau|hampe|hanche|hangar|harass|hardi|harfang|hareng|haricot|harnais|harpe|harpi|harpon|hasard|hâte|hauber|haut|hennis|hérault|hériss|hernie|héron|héros|hêtre|heurt|hibou|hideu|hiérar|hobgob|homard|honte|horde|hors\b|houl|housse|houx|hublot|huée|huer|huit|hulul|hurl|hussard|hutte)/i;
globalThis.DCSS_ELIDE = fr => /^[aeiouyâàéèêëîïôœùû]/i.test(fr) || (/^h/i.test(fr) && !globalThis.DCSS_H_ASPIRE.test(fr));
