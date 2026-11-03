// Paroles et gestes des monstres (dat/database/monspeak.txt) : le cadre de la phrase est traduit, la citation aussi si elle est connue (sinon elle reste en anglais).
// Une entrée par verbe de parole (générée), puis les gestes. Format : voir LISEZ-MOI.txt du dossier.
globalThis.DCSS_GABARITS_TEXTES = (globalThis.DCSS_GABARITS_TEXTES || []).concat([`
@The_monster@ says, "@quote@"
@M_S@ dit : « @quote@ »

@The_monster@ says @to_foe@, "@quote@"
@M_S@ @TF1@dit@TF2@ : « @quote@ »

@The_monster@ says @at_foe@, "@quote@"
@M_S@ dit @at_foe@ : « @quote@ »

@The_monster@ says @reflexive@, "@quote@"
@M_S@ dit à @reflexive@ : « @quote@ »

@The_monster@ asks, "@quote@"
@M_S@ demande : « @quote@ »

@The_monster@ asks @to_foe@, "@quote@"
@M_S@ @TF1@demande@TF2@ : « @quote@ »

@The_monster@ asks @at_foe@, "@quote@"
@M_S@ demande @at_foe@ : « @quote@ »

@The_monster@ asks @reflexive@, "@quote@"
@M_S@ demande à @reflexive@ : « @quote@ »

@The_monster@ mutters, "@quote@"
@M_S@ marmonne : « @quote@ »

@The_monster@ mutters @to_foe@, "@quote@"
@M_S@ @TF1@marmonne@TF2@ : « @quote@ »

@The_monster@ mutters @at_foe@, "@quote@"
@M_S@ marmonne @at_foe@ : « @quote@ »

@The_monster@ mutters @reflexive@, "@quote@"
@M_S@ marmonne à @reflexive@ : « @quote@ »

@The_monster@ mumbles, "@quote@"
@M_S@ marmonne : « @quote@ »

@The_monster@ mumbles @to_foe@, "@quote@"
@M_S@ @TF1@marmonne@TF2@ : « @quote@ »

@The_monster@ mumbles @at_foe@, "@quote@"
@M_S@ marmonne @at_foe@ : « @quote@ »

@The_monster@ mumbles @reflexive@, "@quote@"
@M_S@ marmonne à @reflexive@ : « @quote@ »

@The_monster@ grumbles, "@quote@"
@M_S@ grogne : « @quote@ »

@The_monster@ grumbles @to_foe@, "@quote@"
@M_S@ @TF1@grogne@TF2@ : « @quote@ »

@The_monster@ grumbles @at_foe@, "@quote@"
@M_S@ grogne @at_foe@ : « @quote@ »

@The_monster@ grumbles @reflexive@, "@quote@"
@M_S@ grogne à @reflexive@ : « @quote@ »

@The_monster@ sighs, "@quote@"
@M_S@ soupire : « @quote@ »

@The_monster@ sighs @to_foe@, "@quote@"
@M_S@ @TF1@soupire@TF2@ : « @quote@ »

@The_monster@ sighs @at_foe@, "@quote@"
@M_S@ soupire @at_foe@ : « @quote@ »

@The_monster@ sighs @reflexive@, "@quote@"
@M_S@ soupire à @reflexive@ : « @quote@ »

@The_monster@ yells, "@quote@"
@M_S@ crie : « @quote@ »

@The_monster@ yells @to_foe@, "@quote@"
@M_S@ @TF1@crie@TF2@ : « @quote@ »

@The_monster@ yells @at_foe@, "@quote@"
@M_S@ crie @at_foe@ : « @quote@ »

@The_monster@ yells @reflexive@, "@quote@"
@M_S@ crie à @reflexive@ : « @quote@ »

@The_monster@ shouts, "@quote@"
@M_S@ crie : « @quote@ »

@The_monster@ shouts @to_foe@, "@quote@"
@M_S@ @TF1@crie@TF2@ : « @quote@ »

@The_monster@ shouts @at_foe@, "@quote@"
@M_S@ crie @at_foe@ : « @quote@ »

@The_monster@ shouts @reflexive@, "@quote@"
@M_S@ crie à @reflexive@ : « @quote@ »

@The_monster@ screams, "@quote@"
@M_S@ hurle : « @quote@ »

@The_monster@ screams @to_foe@, "@quote@"
@M_S@ @TF1@hurle@TF2@ : « @quote@ »

@The_monster@ screams @at_foe@, "@quote@"
@M_S@ hurle @at_foe@ : « @quote@ »

@The_monster@ screams @reflexive@, "@quote@"
@M_S@ hurle à @reflexive@ : « @quote@ »

@The_monster@ cries, "@quote@"
@M_S@ s’écrie : « @quote@ »

@The_monster@ cries @to_foe@, "@quote@"
@M_S@ s’écrie @to_foe@ : « @quote@ »

@The_monster@ cries @at_foe@, "@quote@"
@M_S@ s’écrie @at_foe@ : « @quote@ »

@The_monster@ cries @reflexive@, "@quote@"
@M_S@ s’écrie à @reflexive@ : « @quote@ »

@The_monster@ howls, "@quote@"
@M_S@ hurle : « @quote@ »

@The_monster@ howls @to_foe@, "@quote@"
@M_S@ @TF1@hurle@TF2@ : « @quote@ »

@The_monster@ howls @at_foe@, "@quote@"
@M_S@ hurle @at_foe@ : « @quote@ »

@The_monster@ howls @reflexive@, "@quote@"
@M_S@ hurle à @reflexive@ : « @quote@ »

@The_monster@ wails, "@quote@"
@M_S@ gémit : « @quote@ »

@The_monster@ wails @to_foe@, "@quote@"
@M_S@ @TF1@gémit@TF2@ : « @quote@ »

@The_monster@ wails @at_foe@, "@quote@"
@M_S@ gémit @at_foe@ : « @quote@ »

@The_monster@ wails @reflexive@, "@quote@"
@M_S@ gémit à @reflexive@ : « @quote@ »

@The_monster@ whispers, "@quote@"
@M_S@ chuchote : « @quote@ »

@The_monster@ whispers @to_foe@, "@quote@"
@M_S@ @TF1@chuchote@TF2@ : « @quote@ »

@The_monster@ whispers @at_foe@, "@quote@"
@M_S@ chuchote @at_foe@ : « @quote@ »

@The_monster@ whispers @reflexive@, "@quote@"
@M_S@ chuchote à @reflexive@ : « @quote@ »

@The_monster@ murmurs, "@quote@"
@M_S@ murmure : « @quote@ »

@The_monster@ murmurs @to_foe@, "@quote@"
@M_S@ @TF1@murmure@TF2@ : « @quote@ »

@The_monster@ murmurs @at_foe@, "@quote@"
@M_S@ murmure @at_foe@ : « @quote@ »

@The_monster@ murmurs @reflexive@, "@quote@"
@M_S@ murmure à @reflexive@ : « @quote@ »

@The_monster@ sings, "@quote@"
@M_S@ chante : « @quote@ »

@The_monster@ sings @to_foe@, "@quote@"
@M_S@ @TF1@chante@TF2@ : « @quote@ »

@The_monster@ sings @at_foe@, "@quote@"
@M_S@ chante @at_foe@ : « @quote@ »

@The_monster@ sings @reflexive@, "@quote@"
@M_S@ chante à @reflexive@ : « @quote@ »

@The_monster@ laughs, "@quote@"
@M_S@ rit : « @quote@ »

@The_monster@ laughs @to_foe@, "@quote@"
@M_S@ @TF1@rit@TF2@ : « @quote@ »

@The_monster@ laughs @at_foe@, "@quote@"
@M_S@ rit @at_foe@ : « @quote@ »

@The_monster@ laughs @reflexive@, "@quote@"
@M_S@ rit à @reflexive@ : « @quote@ »

@The_monster@ snarls, "@quote@"
@M_S@ gronde : « @quote@ »

@The_monster@ snarls @to_foe@, "@quote@"
@M_S@ @TF1@gronde@TF2@ : « @quote@ »

@The_monster@ snarls @at_foe@, "@quote@"
@M_S@ gronde @at_foe@ : « @quote@ »

@The_monster@ snarls @reflexive@, "@quote@"
@M_S@ gronde à @reflexive@ : « @quote@ »

@The_monster@ growls, "@quote@"
@M_S@ grogne : « @quote@ »

@The_monster@ growls @to_foe@, "@quote@"
@M_S@ @TF1@grogne@TF2@ : « @quote@ »

@The_monster@ growls @at_foe@, "@quote@"
@M_S@ grogne @at_foe@ : « @quote@ »

@The_monster@ growls @reflexive@, "@quote@"
@M_S@ grogne à @reflexive@ : « @quote@ »

@The_monster@ roars, "@quote@"
@M_S@ rugit : « @quote@ »

@The_monster@ roars @to_foe@, "@quote@"
@M_S@ @TF1@rugit@TF2@ : « @quote@ »

@The_monster@ roars @at_foe@, "@quote@"
@M_S@ rugit @at_foe@ : « @quote@ »

@The_monster@ roars @reflexive@, "@quote@"
@M_S@ rugit à @reflexive@ : « @quote@ »

@The_monster@ exclaims, "@quote@"
@M_S@ s’exclame : « @quote@ »

@The_monster@ exclaims @to_foe@, "@quote@"
@M_S@ s’exclame @to_foe@ : « @quote@ »

@The_monster@ exclaims @at_foe@, "@quote@"
@M_S@ s’exclame @at_foe@ : « @quote@ »

@The_monster@ exclaims @reflexive@, "@quote@"
@M_S@ s’exclame à @reflexive@ : « @quote@ »

@The_monster@ declares, "@quote@"
@M_S@ déclare : « @quote@ »

@The_monster@ declares @to_foe@, "@quote@"
@M_S@ @TF1@déclare@TF2@ : « @quote@ »

@The_monster@ declares @at_foe@, "@quote@"
@M_S@ déclare @at_foe@ : « @quote@ »

@The_monster@ declares @reflexive@, "@quote@"
@M_S@ déclare à @reflexive@ : « @quote@ »

@The_monster@ announces, "@quote@"
@M_S@ annonce : « @quote@ »

@The_monster@ announces @to_foe@, "@quote@"
@M_S@ @TF1@annonce@TF2@ : « @quote@ »

@The_monster@ announces @at_foe@, "@quote@"
@M_S@ annonce @at_foe@ : « @quote@ »

@The_monster@ announces @reflexive@, "@quote@"
@M_S@ annonce à @reflexive@ : « @quote@ »

@The_monster@ replies, "@quote@"
@M_S@ répond : « @quote@ »

@The_monster@ replies @to_foe@, "@quote@"
@M_S@ @TF1@répond@TF2@ : « @quote@ »

@The_monster@ replies @at_foe@, "@quote@"
@M_S@ répond @at_foe@ : « @quote@ »

@The_monster@ replies @reflexive@, "@quote@"
@M_S@ répond à @reflexive@ : « @quote@ »

@The_monster@ warns, "@quote@"
@M_S@ prévient : « @quote@ »

@The_monster@ warns @to_foe@, "@quote@"
@M_S@ @TF1@prévient@TF2@ : « @quote@ »

@The_monster@ warns @at_foe@, "@quote@"
@M_S@ prévient @at_foe@ : « @quote@ »

@The_monster@ warns @reflexive@, "@quote@"
@M_S@ prévient à @reflexive@ : « @quote@ »

@The_monster@ begs, "@quote@"
@M_S@ supplie : « @quote@ »

@The_monster@ begs @to_foe@, "@quote@"
@M_S@ @TF1@supplie@TF2@ : « @quote@ »

@The_monster@ begs @at_foe@, "@quote@"
@M_S@ supplie @at_foe@ : « @quote@ »

@The_monster@ begs @reflexive@, "@quote@"
@M_S@ supplie à @reflexive@ : « @quote@ »

@The_monster@ pleads, "@quote@"
@M_S@ implore : « @quote@ »

@The_monster@ pleads @to_foe@, "@quote@"
@M_S@ @TF1@implore@TF2@ : « @quote@ »

@The_monster@ pleads @at_foe@, "@quote@"
@M_S@ implore @at_foe@ : « @quote@ »

@The_monster@ pleads @reflexive@, "@quote@"
@M_S@ implore à @reflexive@ : « @quote@ »

@The_monster@ sobs, "@quote@"
@M_S@ sanglote : « @quote@ »

@The_monster@ sobs @to_foe@, "@quote@"
@M_S@ @TF1@sanglote@TF2@ : « @quote@ »

@The_monster@ sobs @at_foe@, "@quote@"
@M_S@ sanglote @at_foe@ : « @quote@ »

@The_monster@ sobs @reflexive@, "@quote@"
@M_S@ sanglote à @reflexive@ : « @quote@ »

@The_monster@ hisses, "@quote@"
@M_S@ siffle : « @quote@ »

@The_monster@ hisses @to_foe@, "@quote@"
@M_S@ @TF1@siffle@TF2@ : « @quote@ »

@The_monster@ hisses @at_foe@, "@quote@"
@M_S@ siffle @at_foe@ : « @quote@ »

@The_monster@ hisses @reflexive@, "@quote@"
@M_S@ siffle à @reflexive@ : « @quote@ »

@The_monster@ snaps, "@quote@"
@M_S@ rétorque : « @quote@ »

@The_monster@ snaps @to_foe@, "@quote@"
@M_S@ @TF1@rétorque@TF2@ : « @quote@ »

@The_monster@ snaps @at_foe@, "@quote@"
@M_S@ rétorque @at_foe@ : « @quote@ »

@The_monster@ snaps @reflexive@, "@quote@"
@M_S@ rétorque à @reflexive@ : « @quote@ »

@The_monster@ taunts, "@quote@"
@M_S@ nargue : « @quote@ »

@The_monster@ taunts @to_foe@, "@quote@"
@M_S@ @TF1@nargue@TF2@ : « @quote@ »

@The_monster@ taunts @at_foe@, "@quote@"
@M_S@ nargue @at_foe@ : « @quote@ »

@The_monster@ taunts @reflexive@, "@quote@"
@M_S@ nargue à @reflexive@ : « @quote@ »

@The_monster@ cackles, "@quote@"
@M_S@ caquette : « @quote@ »

@The_monster@ cackles @to_foe@, "@quote@"
@M_S@ @TF1@caquette@TF2@ : « @quote@ »

@The_monster@ cackles @at_foe@, "@quote@"
@M_S@ caquette @at_foe@ : « @quote@ »

@The_monster@ cackles @reflexive@, "@quote@"
@M_S@ caquette à @reflexive@ : « @quote@ »

@The_monster@ gurgles, "@quote@"
@M_S@ gargouille : « @quote@ »

@The_monster@ gurgles @to_foe@, "@quote@"
@M_S@ @TF1@gargouille@TF2@ : « @quote@ »

@The_monster@ gurgles @at_foe@, "@quote@"
@M_S@ gargouille @at_foe@ : « @quote@ »

@The_monster@ gurgles @reflexive@, "@quote@"
@M_S@ gargouille à @reflexive@ : « @quote@ »

@The_monster@ chuckles, "@quote@"
@M_S@ ricane : « @quote@ »

@The_monster@ chuckles @to_foe@, "@quote@"
@M_S@ @TF1@ricane@TF2@ : « @quote@ »

@The_monster@ chuckles @at_foe@, "@quote@"
@M_S@ ricane @at_foe@ : « @quote@ »

@The_monster@ chuckles @reflexive@, "@quote@"
@M_S@ ricane à @reflexive@ : « @quote@ »

@The_monster@ remarks, "@quote@"
@M_S@ remarque : « @quote@ »

@The_monster@ remarks @to_foe@, "@quote@"
@M_S@ @TF1@remarque@TF2@ : « @quote@ »

@The_monster@ remarks @at_foe@, "@quote@"
@M_S@ remarque @at_foe@ : « @quote@ »

@The_monster@ remarks @reflexive@, "@quote@"
@M_S@ remarque à @reflexive@ : « @quote@ »

@The_monster@ states, "@quote@"
@M_S@ affirme : « @quote@ »

@The_monster@ states @to_foe@, "@quote@"
@M_S@ @TF1@affirme@TF2@ : « @quote@ »

@The_monster@ states @at_foe@, "@quote@"
@M_S@ affirme @at_foe@ : « @quote@ »

@The_monster@ states @reflexive@, "@quote@"
@M_S@ affirme à @reflexive@ : « @quote@ »

@The_monster@ boasts, "@quote@"
@M_S@ se vante : « @quote@ »

@The_monster@ boasts @to_foe@, "@quote@"
@M_S@ se vante @to_foe@ : « @quote@ »

@The_monster@ boasts @at_foe@, "@quote@"
@M_S@ se vante @at_foe@ : « @quote@ »

@The_monster@ boasts @reflexive@, "@quote@"
@M_S@ se vante à @reflexive@ : « @quote@ »

@The_monster@ complains, "@quote@"
@M_S@ se plaint : « @quote@ »

@The_monster@ complains @to_foe@, "@quote@"
@M_S@ se plaint @to_foe@ : « @quote@ »

@The_monster@ complains @at_foe@, "@quote@"
@M_S@ se plaint @at_foe@ : « @quote@ »

@The_monster@ complains @reflexive@, "@quote@"
@M_S@ se plaint à @reflexive@ : « @quote@ »

@The_monster@ mocks, "@quote@"
@M_S@ se moque : « @quote@ »

@The_monster@ mocks @to_foe@, "@quote@"
@M_S@ se moque @to_foe@ : « @quote@ »

@The_monster@ mocks @at_foe@, "@quote@"
@M_S@ se moque @at_foe@ : « @quote@ »

@The_monster@ mocks @reflexive@, "@quote@"
@M_S@ se moque à @reflexive@ : « @quote@ »

@The_monster@ gasps, "@quote@"
@M_S@ halète : « @quote@ »

@The_monster@ gasps @to_foe@, "@quote@"
@M_S@ @TF1@halète@TF2@ : « @quote@ »

@The_monster@ gasps @at_foe@, "@quote@"
@M_S@ halète @at_foe@ : « @quote@ »

@The_monster@ gasps @reflexive@, "@quote@"
@M_S@ halète à @reflexive@ : « @quote@ »

@The_monster@ intones, "@quote@"
@M_S@ entonne : « @quote@ »

@The_monster@ intones @to_foe@, "@quote@"
@M_S@ @TF1@entonne@TF2@ : « @quote@ »

@The_monster@ intones @at_foe@, "@quote@"
@M_S@ entonne @at_foe@ : « @quote@ »

@The_monster@ intones @reflexive@, "@quote@"
@M_S@ entonne à @reflexive@ : « @quote@ »

@The_monster@ affirms, "@quote@"
@M_S@ affirme : « @quote@ »

@The_monster@ affirms @to_foe@, "@quote@"
@M_S@ @TF1@affirme@TF2@ : « @quote@ »

@The_monster@ affirms @at_foe@, "@quote@"
@M_S@ affirme @at_foe@ : « @quote@ »

@The_monster@ affirms @reflexive@, "@quote@"
@M_S@ affirme à @reflexive@ : « @quote@ »

@The_monster@ pronounces, "@quote@"
@M_S@ prononce : « @quote@ »

@The_monster@ pronounces @to_foe@, "@quote@"
@M_S@ @TF1@prononce@TF2@ : « @quote@ »

@The_monster@ pronounces @at_foe@, "@quote@"
@M_S@ prononce @at_foe@ : « @quote@ »

@The_monster@ pronounces @reflexive@, "@quote@"
@M_S@ prononce à @reflexive@ : « @quote@ »

@The_monster@ bellows, "@quote@"
@M_S@ beugle : « @quote@ »

@The_monster@ bellows @to_foe@, "@quote@"
@M_S@ @TF1@beugle@TF2@ : « @quote@ »

@The_monster@ bellows @at_foe@, "@quote@"
@M_S@ beugle @at_foe@ : « @quote@ »

@The_monster@ bellows @reflexive@, "@quote@"
@M_S@ beugle à @reflexive@ : « @quote@ »

@The_monster@ calls, "@quote@"
@M_S@ appelle : « @quote@ »

@The_monster@ calls @to_foe@, "@quote@"
@M_S@ @TF1@appelle@TF2@ : « @quote@ »

@The_monster@ calls @at_foe@, "@quote@"
@M_S@ appelle @at_foe@ : « @quote@ »

@The_monster@ calls @reflexive@, "@quote@"
@M_S@ appelle à @reflexive@ : « @quote@ »

@The_monster@ commands, "@quote@"
@M_S@ ordonne : « @quote@ »

@The_monster@ commands @to_foe@, "@quote@"
@M_S@ @TF1@ordonne@TF2@ : « @quote@ »

@The_monster@ commands @at_foe@, "@quote@"
@M_S@ ordonne @at_foe@ : « @quote@ »

@The_monster@ commands @reflexive@, "@quote@"
@M_S@ ordonne à @reflexive@ : « @quote@ »

@The_monster@ demands, "@quote@"
@M_S@ exige : « @quote@ »

@The_monster@ demands @to_foe@, "@quote@"
@M_S@ @TF1@exige@TF2@ : « @quote@ »

@The_monster@ demands @at_foe@, "@quote@"
@M_S@ exige @at_foe@ : « @quote@ »

@The_monster@ demands @reflexive@, "@quote@"
@M_S@ exige à @reflexive@ : « @quote@ »

@The_monster@ thunders, "@quote@"
@M_S@ tonne : « @quote@ »

@The_monster@ thunders @to_foe@, "@quote@"
@M_S@ @TF1@tonne@TF2@ : « @quote@ »

@The_monster@ thunders @at_foe@, "@quote@"
@M_S@ tonne @at_foe@ : « @quote@ »

@The_monster@ thunders @reflexive@, "@quote@"
@M_S@ tonne à @reflexive@ : « @quote@ »

@The_monster@ sneers, "@quote@"
@M_S@ ricane : « @quote@ »

@The_monster@ sneers @to_foe@, "@quote@"
@M_S@ @TF1@ricane@TF2@ : « @quote@ »

@The_monster@ sneers @at_foe@, "@quote@"
@M_S@ ricane @at_foe@ : « @quote@ »

@The_monster@ sneers @reflexive@, "@quote@"
@M_S@ ricane à @reflexive@ : « @quote@ »

@The_monster@ barks, "@quote@"
@M_S@ aboie : « @quote@ »

@The_monster@ barks @to_foe@, "@quote@"
@M_S@ @TF1@aboie@TF2@ : « @quote@ »

@The_monster@ barks @at_foe@, "@quote@"
@M_S@ aboie @at_foe@ : « @quote@ »

@The_monster@ barks @reflexive@, "@quote@"
@M_S@ aboie à @reflexive@ : « @quote@ »

@The_monster@ rasps, "@quote@"
@M_S@ râle : « @quote@ »

@The_monster@ rasps @to_foe@, "@quote@"
@M_S@ @TF1@râle@TF2@ : « @quote@ »

@The_monster@ rasps @at_foe@, "@quote@"
@M_S@ râle @at_foe@ : « @quote@ »

@The_monster@ rasps @reflexive@, "@quote@"
@M_S@ râle à @reflexive@ : « @quote@ »

@The_monster@ moans, "@quote@"
@M_S@ gémit : « @quote@ »

@The_monster@ moans @to_foe@, "@quote@"
@M_S@ @TF1@gémit@TF2@ : « @quote@ »

@The_monster@ moans @at_foe@, "@quote@"
@M_S@ gémit @at_foe@ : « @quote@ »

@The_monster@ moans @reflexive@, "@quote@"
@M_S@ gémit à @reflexive@ : « @quote@ »

@The_monster@ blurts, "@quote@"
@M_S@ lâche : « @quote@ »

@The_monster@ blurts @to_foe@, "@quote@"
@M_S@ @TF1@lâche@TF2@ : « @quote@ »

@The_monster@ blurts @at_foe@, "@quote@"
@M_S@ lâche @at_foe@ : « @quote@ »

@The_monster@ blurts @reflexive@, "@quote@"
@M_S@ lâche à @reflexive@ : « @quote@ »

@The_monster@ grins evilly.
@M_S@ sourit d’un air mauvais.

@The_monster@ grins malevolently.
@M_S@ sourit avec malveillance.

@The_monster@ grins madly.
@M_S@ sourit comme un fou.

@The_monster@ grins.
@M_S@ sourit.

@The_monster@ smiles happily.
@M_S@ sourit joyeusement.

@The_monster@ smiles.
@M_S@ sourit.

@The_monster@ shakes with grief.
@M_S@ tremble de chagrin.

@The_monster@ shakes @possessive@ head.
@M_S@ secoue la tête.

@The_monster@ ponders the situation.
@M_S@ réfléchit à la situation.

@The_monster@ grinds @possessive@ teeth.
@M_S@ grince des dents.

@The_monster@ clenches @possessive@ teeth.
@M_S@ serre les dents.

@The_monster@ clenches @possessive@ claws.
@M_S@ serre les griffes.

@The_monster@ bares @possessive@ teeth.
@M_S@ montre les dents.

@The_monster@ gestures wildly.
@M_S@ fait des gestes désordonnés.

@The_monster@ cries.
@M_S@ pleure.

@The_monster@ weeps.
@M_S@ sanglote.

@The_monster@ waves at you.
@M_S@ vous fait signe de la main.

@The_monster@ waves excitedly.
@M_S@ fait de grands signes.

@The_monster@ waves @possessive@ antennae.
@M_S@ agite ses antennes.

@The_monster@ wildly waves @possessive@ antennae.
@M_S@ agite frénétiquement ses antennes.

@The_monster@ wriggles @possessive@ tentacles.
@M_S@ remue ses tentacules.

@The_monster@ twirls @possessive@ moustache.
@M_S@ tortille sa moustache.

@The_monster@ twirls @possessive@ quarterstaff.
@M_S@ fait tournoyer son bâton.

@The_monster@ twirls @possessive@ cape.
@M_S@ fait tournoyer sa cape.

@The_monster@ twirls on the spot.
@M_S@ tourne sur place.

@The_monster@ twirls gently on the spot.
@M_S@ tourne doucement sur place.

@The_monster@ spins like a top.
@M_S@ tourne comme une toupie.

@The_monster@ rolls in a circle.
@M_S@ roule en cercle.

@The_monster@ rolls around.
@M_S@ se roule par terre.

@The_monster@ looks very confused.
@M_S@ a l’air très perplexe.

@The_monster@ looks at you.
@M_S@ vous regarde.

@The_monster@ lashes @possessive@ tail.
@M_S@ fouette l’air de sa queue.

@The_monster@ flutters around in erratic circles.
@M_S@ voltige en cercles désordonnés.

@The_monster@ blows smoke rings.
@M_S@ souffle des ronds de fumée.

@The_monster@ beckons to @foe@.
@M_S@ fait signe à @T_o@.

@The_monster@ yawns.
@M_S@ bâille.

@The_monster@ yawns in an exaggerated manner.
@M_S@ bâille de façon exagérée.

@The_monster@ wobbles.
@M_S@ vacille.

@The_monster@ winces.
@M_S@ grimace de douleur.

@The_monster@ winks at you.
@M_S@ vous fait un clin d’œil.

@The_monster@ whirls about in circles.
@M_S@ tourbillonne en cercles.

@The_monster@ wails in agony.
@M_S@ gémit d’agonie.

@The_monster@ wags @possessive@ tail.
@M_S@ remue la queue.

@The_monster@ twitches @possessive@ whiskers.
@M_S@ remue ses moustaches.

@The_monster@ twists in agony.
@M_S@ se tord d’agonie.

@The_monster@ tugs at @possessive@ hair.
@M_S@ tire sur ses cheveux.

@The_monster@ tries to sneak away.
@M_S@ essaie de s’esquiver discrètement.

@The_monster@ tries to hide somewhere.
@M_S@ essaie de se cacher quelque part.

@The_monster@ takes aim.
@M_S@ vise.

@The_monster@ takes aim @at_foe@.
@M_S@ vise @T_o@.

@The_monster@ takes a fighting stance.
@M_S@ prend une posture de combat.

@The_monster@ takes a defensive stance.
@M_S@ prend une posture défensive.

@The_monster@ takes a bow.
@M_S@ s’incline.

@The_monster@ strikes a fencing pose.
@M_S@ prend une pose d’escrimeur.

@The_monster@ assumes a wrestling stance.
@M_S@ prend une posture de lutteur.

@The_monster@ prays.
@M_S@ prie.

@The_monster@ hums a lullaby.
@M_S@ fredonne une berceuse.

@The_monster@ sings.
@M_S@ chante.

@The_monster@ makes quacking noises.
@M_S@ fait des couacs.

@The_monster@ gurgles.
@M_S@ gargouille.

@The_monster@ howls an indescribable curse.
@M_S@ hurle une malédiction indescriptible.

@The_monster@ rolls @possessive@ eyes.
@M_S@ lève les yeux au ciel.

@The_monster@ sighs.
@M_S@ soupire.

@The_monster@ chants a prayer to @god@.
@M_S@ psalmodie une prière à @god@.

@The_monster@ puffs mist at @foe@.
@M_S@ souffle de la brume sur @T_o@.

@The_monster@ is momentarily hidden by a cloud of flames.
@M_S@ est un instant caché par un nuage de flammes.

@The_monster@ seems to say something.
@M_S@ semble dire quelque chose.

@The_monster@ says something but you don't hear anything.
@M_S@ dit quelque chose mais vous n’entendez rien.

@The_monster@ stares at you.
@M_S@ vous fixe.

@The_monster@ glares at you.
@M_S@ vous foudroie du regard.

@The_monster@ shrugs.
@M_S@ hausse les épaules.

@The_monster@ nods.
@M_S@ hoche la tête.

@The_monster@ laughs.
@M_S@ rit.

@The_monster@ scratches @possessive@ head.
@M_S@ se gratte la tête.

@The_monster@ flexes @possessive@ muscles.
@M_S@ bande ses muscles.

@The_monster_possessive@ tail lashes.
La queue @M_d@ fouette l’air.

@The_monster_possessive@ hands start to glow.
Les mains @M_d@ se mettent à luire.

@The_monster_possessive@ eyes start to glow.
Les yeux @M_d@ se mettent à luire.

@The_monster_possessive@ eyes glow red.
Les yeux @M_d@ luisent de rouge.

@The_monster_possessive@ eyes start glowing with a red light.
Les yeux @M_d@ se mettent à luire d’une lueur rouge.

@The_monster_possessive@ eyes momentarily flash bright red.
Les yeux @M_d@ brillent un instant d’un rouge vif.

@The_monster_possessive@ eyes look fiery.
Les yeux @M_d@ semblent en feu.

@The_monster_possessive@ eyes close briefly, then snap open.
Les yeux @M_d@ se ferment brièvement, puis se rouvrent d’un coup.

@The_monster_possessive@ fingertips begin to glow.
Le bout des doigts @M_d@ se met à luire.

@The_monster_possessive@ mandibles click thoughtfully.
Les mandibules @M_d@ cliquettent d’un air pensif.

@The_monster_possessive@ bandages flutter.
Les bandages @M_d@ flottent.

@The_monster_possessive@ bangles clink loudly.
Les bracelets @M_d@ tintent bruyamment.

@The_monster_possessive@ armour gleams in the torchlight.
L’armure @M_d@ brille à la lueur des torches.

@The_monster_possessive@ horned helmet rattles.
Le casque à cornes @M_d@ cliquette.

@The_monster_possessive@ face changes twice.
Le visage @M_d@ change deux fois.

@The_monster_possessive@ form shimmers in the rain.
La forme @M_d@ miroite sous la pluie.

@The_monster_possessive@ flesh secretes a thick mucus.
La chair @M_d@ sécrète un mucus épais.

@The_monster_possessive@ feet meld with the ground, briefly.
Les pieds @M_d@ se fondent brièvement dans le sol.

Water drips from @the_monster_possessive@ barrel.
De l’eau goutte du tonneau @M_d@.

Sweat drips down @the_monster_possessive@ chest.
De la sueur coule sur le torse @M_d@.

Something foul drips from @the_monster_possessive@ claws.
Quelque chose d’infect goutte des griffes @M_d@.

Some snowflakes condense on @the_monster@.
Des flocons de neige se condensent sur @M_o@.

Space seems to twist oddly around @the_monster@.
L’espace semble se tordre étrangement autour @M_d@.

For a moment, you lose track of @the_monster@.
Un instant, vous perdez @M_o@ de vue.

For a moment, @the_monster@ blends into the shadows.
Un instant, @M_S@ se fond dans les ombres.

One of @the_monster_possessive@ claws falls out.
L’une des griffes @M_d@ tombe.

One of @the_monster_possessive@ icy fingers falls off.
L’un des doigts glacés @M_d@ tombe.

A flash of anger passes briefly over @the_monster_possessive@ face.
Un éclair de colère traverse brièvement le visage @M_d@.

A dozen eyes blink open in @the_monster_possessive@ chest.
Une douzaine d’yeux s’ouvrent dans le torse @M_d@.

A brief shower of sparks shoots from @the_monster_possessive@ claws.
Une brève gerbe d’étincelles jaillit des griffes @M_d@.

Hollow, blind eyes appear on @the_monster_possessive@ head.
Des yeux creux et aveugles apparaissent sur la tête @M_d@.

Strange appendages sprout from @the_monster_possessive@ back.
D’étranges appendices poussent sur le dos @M_d@.

The earth trembles for a moment.
La terre tremble un instant.

A sense of peace washes over you.
Un sentiment de paix vous envahit.

A chill runs down your spine.
Un frisson vous parcourt l’échine.

You feel troubled.
Vous vous sentez troublé.

You feel disoriented.
Vous vous sentez désorienté.

You feel [cursed|doomed].
Vous vous sentez [maudit|condamné].
`]);
