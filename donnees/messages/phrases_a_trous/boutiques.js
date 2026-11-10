// Boutiques (shopping.cc) et quelques pièges : noms de boutique isolés, bon d'achat, liste d'achats, confirmations. Ajouté en 0.21.3.
(() => {
    globalThis.DCSS_TRADUCTIONS = globalThis.DCSS_TRADUCTIONS || {};
    globalThis.DCSS_TRADUCTIONS.boutiques = {
        "Antique Weapon": "Armes anciennes", "Antique Armour": "Armures anciennes", "Magic Scroll": "Parchemins magiques",
        "Assorted Antiques": "Antiquités variées", "General Store": "Magasin général",
        "I'll put it outside for you.": "Je le dépose dehors pour vous.", "I'll put them outside for you.": "Je les dépose dehors pour vous.", "I'll put some of them outside for you.": "J’en dépose une partie dehors pour vous.",
        "You hear a loud \"Zot\"!": "Vous entendez un « Zot » retentissant !",
        "In a burst of heat and light, you rocket briefly upward... but you can't rise from here.": "Dans une explosion de chaleur et de lumière, vous montez brièvement en flèche... mais vous ne pouvez pas monter d’ici.",
        "That's not a valid depth.": "Ce n’est pas une profondeur valide.",
        "You don't have enough money.": "Vous n’avez pas assez d’argent.",
        "This will use your shop voucher.": "Cela utilisera votre bon d’achat.",
    };
    const R = [];
    const T1 = s => { const f = globalThis.DCSS_TRADUIRE_CHAINE; return f ? f(s) : s; };
    const obj = s => { const r = T1(s); return r && r !== s ? r : null; };
    const GENRES = { "Armour": "d’armures", "Weapon": "d’armes", "Antique Armour": "d’armures anciennes", "Antique Weapon": "d’armes anciennes",
        "Magic Scroll": "de parchemins magiques", "Scroll": "de parchemins", "Book": "de livres", "Jewellery": "de bijoux", "Wand": "de baguettes", "Food": "de nourriture",
        "Gadget": "de gadgets", "Potion": "de potions" };
    const TYPES = { Boutique: "Boutique", Shoppe: "Boutique", Emporium: "Grand magasin", Store: "Magasin", Market: "Marché", Shop: "Boutique" };
    const boutique = nom => {
        let m;
        if ((m = /^(.+?)'s Distillery$/.exec(nom))) return `Distillerie de ${m[1]}`;
        if ((m = /^(.+?)'s (Antique Armour|Antique Weapon|Armour|Weapon|Magic Scroll|Scroll|Book|Jewellery|Wand|Food|General|Gadget|Potion) (Boutique|Shoppe|Emporium|Store|Market|Shop)$/.exec(nom)))
            return m[2] === "General" ? `${TYPES[m[3]]} générale de ${m[1]}` : `${TYPES[m[3]]} ${GENRES[m[2]]} de ${m[1]}`;
        if ((m = /^(.+?)'s Assorted Antiques$/.exec(nom))) return `Antiquités variées de ${m[1]}`;
        return null;
    };
    const NOMB = "([A-Z][\\w'’ -]*?'s (?:Antique Armour|Antique Weapon|Armour|Weapon|Magic Scroll|Scroll|Book|Jewellery|Wand|Food|General|Gadget|Potion) (?:Boutique|Shoppe|Emporium|Store|Market|Shop)|[A-Z][\\w'’ -]*?'s Distillery|[A-Z][\\w'’ -]*?'s Assorted Antiques)";
    const po = n => `${n} pièce${+n > 1 ? "s" : ""} d’or`;
    R.push({ regex: new RegExp("^" + NOMB + "$"), translate: m => boutique(m[1]) });
    R.push({ regex: new RegExp("^Thank you for shopping at " + NOMB + "!$"), translate: m => { const b = boutique(m[1]); return b ? `Merci d’avoir fait vos achats : ${b} !` : null; } });
    R.push({ regex: new RegExp("^" + NOMB + " appears to be closed\\.$"), translate: m => { const b = boutique(m[1]); return b ? `Cet établissement (${b}) semble fermé.` : null; } });
    R.push({ regex: new RegExp("^There is an entrance to " + NOMB + " here, with an entry fee of (\\d+) gold pieces?\\.$"), translate: m => { const b = boutique(m[1]); return b ? `Il y a ici l’entrée de : ${b}, avec des frais d’entrée de ${po(m[2])}.` : null; } });
    R.push({ regex: /^You have (\d+) gold pieces?\. Purchasing will use your shop voucher and (\d+) gold pieces?\.$/, translate: m => `Vous avez ${po(m[1])}. L’achat utilisera votre bon d’achat et ${po(m[2])}.` });
    R.push({ regex: /^Purchase items( in shopping list)? for (\d+) gold\? (This will use your shop voucher\. )?\(y\/N\)$/, translate: m => `Acheter les objets${m[1] ? " de la liste d’achats" : ""} pour ${po(m[2])} ? ${m[3] ? "Cela utilisera votre bon d’achat. " : ""}(y/N)` });
    R.push({ regex: /^(.+?) is already on the shopping list\.$/, translate: m => { const o = obj(m[1]); return o ? `${o} est déjà dans la liste d’achats.` : null; } });
    R.push({ regex: /^(.+?) isn't on shopping list, can't delete it\.$/, translate: m => { const o = obj(m[1]); return o ? `${o} n’est pas dans la liste d’achats : suppression impossible.` : null; } });
    R.push({ regex: /^Shopping list: removing (.+)$/, translate: m => { const o = obj(m[1]); return o ? `Liste d’achats : retrait — ${o}` : null; } });
    R.push({ regex: /^Shopping list: remove (.+)\? \(Y\/n\)$/, translate: m => { const o = obj(m[1]); return o ? `Liste d’achats : retirer ${o} ? (Y/n)` : null; } });
    R.push({ regex: /^Shopping list: replace (\d+)gp (.+) with cheaper one\? \(Y\/n\)$/, translate: m => { const o = obj(m[2]); return o ? `Liste d’achats : remplacer ${o} (${m[1]} po) par un moins cher ? (Y/n)` : null; } });
    R.push({ regex: /^You now have enough gold to (.+)\.$/, translate: m => {
        const morceaux = m[1].split(/, | and /); const tr = [];
        for (const p of morceaux) { const q = p.replace(/^buy /, ""); const o = obj(q); if (!o) return null; tr.push(o); }
        const fin = tr.length > 1 ? tr.slice(0, -1).join(", ") + " et " + tr[tr.length - 1] : tr[0];
        return `Vous avez maintenant assez d’or pour acheter ${fin}.`; } });
    globalThis.DCSS_TRADUCTION_REGLES = (globalThis.DCSS_TRADUCTION_REGLES || []).concat(R);
})();
