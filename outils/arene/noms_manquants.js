const {charger}=require("./multi.js"); const fs=require("fs");
const T=charger("/home/claude/dcss-traducteur").DCSS_TRADUIRE_CHAINE;
const cnt=new Map();
const V="hits|misses|barely misses|closely misses|completely misses|bites|claws|stings|punches|tramples|drains|gestures|breathes|casts|summons|is |mumbles|stares|shoots|throws|hurls|fires|spits|calls|invokes|weaves|looks|seems|flicks|releases|conjures|launches|flaps|sprays|blasts|crackles|glows|slips|laughs|prays|utters";
const re=new RegExp("(?:\\b(?:the|your|a|an|The|Your|A|An) )([a-zA-Z' -]+?) (?:"+V+")","g");
for(const f of fs.readdirSync("/tmp/cr/b").filter(x=>x.endsWith(".txt"))) for(const l of fs.readFileSync("/tmp/cr/b/"+f,"utf8").split("\n")){
  let m; re.lastIndex=0; while((m=re.exec(l))){ const n=m[1].toLowerCase(); if(/^(?:bolt|blast|ball|spray|explosion|large rock|flames|pyre|burst|lance|sign|icy|crystal|howling|whirling|golden|vile|damnation|foul|searing|toxic|stunning|doom|iron|poison|slug|splash|umbral|lightning|living|phantom|great|caustic|zombie|creeping|rebounding|magic|open|confined|air|roots|grasping|rupture|destabilizing|puff|wild|raging|wall|water|space|dungeon)/.test(n)) continue; cnt.set(n,(cnt.get(n)||0)+1); } }
const miss=[...cnt].filter(([n])=>{const t="the "+n; return T(t)===t;}).sort((a,b)=>b[1]-a[1]);
console.log(miss.length); console.log(miss.slice(0,120).map(([n,c])=>c+" "+n).join("\n"));
