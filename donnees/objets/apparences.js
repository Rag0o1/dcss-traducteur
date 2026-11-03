// Apparences des objets non identifiés : baguettes, anneaux, amulettes, bâtons.
// Format : « anglais: "français" » ; un « | » sépare masculin et féminin quand l'adjectif s'accorde.
// Pour corriger : changez le texte français à droite.
(function () {
    const mat = (t) => Object.fromEntries(t.split(",").map(x => x.split("=").map(y => y.trim())));
    const baguette = {
        nom: "baguette", genre: "f", sansSec: true,
        sec: mat("jewelled=sertie de bijoux,curved=courbe,long=longue,short=courte,twisted=tordue,crooked=de travers,forked=fourchue,shiny=brillante,blackened=noircie,tapered=effilée,glowing=luisante,worn=usée,encrusted=incrustée,runed=runique,sharpened=aiguisée"),
        pri: mat("iron=en fer,brass=en laiton,bone=en os,wooden=en bois,copper=en cuivre,gold=en or,silver=en argent,bronze=en bronze,ivory=en ivoire,glass=en verre,lead=en plomb,fluorescent=fluorescente"),
        adjMat: new Set(["fluorescent"])
    };
    const anneau = {
        nom: "anneau", genre: "m", sansSec: true,
        sec: mat("encrusted=incrusté,glowing=luisant,tubular=tubulaire,runed=runique,blackened=noirci,scratched=rayé,small=petit,large=grand,twisted=tordu,shiny=brillant,notched=entaillé,knobbly=noueux"),
        pri: mat("wooden=en bois,silver=en argent,golden=en or,iron=en fer,steel=en acier,tourmaline=en tourmaline,brass=en laiton,copper=en cuivre,granite=en granit,ivory=en ivoire,ruby=en rubis,marble=en marbre,jade=en jade,glass=en verre,agate=en agate,bone=en os,diamond=en diamant,emerald=en émeraude,peridot=en péridot,garnet=en grenat,opal=en opale,pearl=en perle,coral=en corail,sapphire=en saphir,cabochon=en cabochon,gilded=doré|dorée,onyx=en onyx,bronze=en bronze,moonstone=en pierre de lune"),
        adjMat: new Set(["gilded"])
    };
    const amulette = {
        nom: "amulette", genre: "f", sansSec: true,
        sec: mat("dented=bosselée,square=carrée,thick=épaisse,thin=fine,runed=runique,blackened=noircie,glowing=luisante,small=petite,large=grande,twisted=tordue,tiny=minuscule,triangular=triangulaire,lumpy=grumeleuse"),
        pri: mat("sapphire=en saphir,zirconium=en zirconium,golden=en or,emerald=en émeraude,garnet=en grenat,bronze=en bronze,brass=en laiton,copper=en cuivre,ruby=en rubis,citrine=en citrine,bone=en os,platinum=en platine,jade=en jade,fluorescent=fluorescente,amethyst=en améthyste,cameo=en camée,pearl=en perle,blue=bleue,peridot=en péridot,jasper=en jaspe,diamond=en diamant,malachite=en malachite,steel=en acier,cabochon=en cabochon,silver=en argent,soapstone=en stéatite,lapis lazuli=en lapis-lazuli,filigree=en filigrane,beryl=en béryl"),
        adjMat: new Set(["fluorescent", "blue"])
    };
    const baton = {
        nom: "bâton", genre: "m", sansSec: false,
        sec: mat("crooked=tordu,knobbly=noueux,weird=étrange,gnarled=rugueux,thin=fin,curved=courbe,twisted=tordu,thick=épais,long=long,short=court"),
        pri: mat("glowing=luisant,jewelled=serti de bijoux,runed=runique,smoking=fumant"),
        adjMat: new Set(["glowing", "jewelled", "runed", "smoking"])
    };
    globalThis.DCSS_APPARENCES = { wand: baguette, ring: anneau, amulet: amulette, staff: baton };
})();
