const fs=require("fs");
const names=fs.readFileSync("/tmp/cr/monnames.txt","utf8").split("\n").map(s=>s.trim().replace(/"/g,"")).filter(Boolean);
const extra=["mature oxsting beast","mature batox beast","green very ugly thing","purple very ugly thing","brown very ugly thing","red very ugly thing","white very ugly thing","cyan very ugly thing","orange crystal statue","blue crystal statue","tentacle","tentacle segment"];
const all=[...new Set([...names,...extra])].sort((a,b)=>b.length-a.length);
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const re=new RegExp("\\b(?:(?:[Tt]he|[Yy]our|an?|An?|[Aa]nother) )?(?:(?:mature|spectral|ancient|elderly|enraged|dancing) )?(?:"+all.map(esc).join("|")+")(?: (?:zombie|skeleton|simulacrum))?(?=['’]s\\b|\\b)","g");
const bad=fs.readFileSync("harv_bad.txt","utf8").split("\n").filter(Boolean);
const m=new Map();
for(const l of bad){ if(/^You encounter|wielding|wearing|^Failed|^SOUND/.test(l)) continue;
  const k=l.replace(re,"{A}").replace(/\b\d+\b/g,"N").replace(/(\{A\})(?: \{A\})+/g,"$1"); m.set(k,(m.get(k)||[]).concat([l])); }
const arr=[...m.entries()].sort((a,b)=>b[1].length-a[1].length);
fs.writeFileSync("tpl_all.txt",arr.map(([k,v])=>v.length+"\t"+k+"\t|| "+v[0]).join("\n"));
console.log(arr.length);
