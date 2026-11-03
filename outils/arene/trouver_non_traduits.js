const {charger}=require("./multi.js"); const fs=require("fs");
const C=charger("/home/claude/dcss-traducteur"); const T=C.DCSS_TRADUIRE_CHAINE;
const seen=new Map();
for(const f of process.argv.slice(2)) for(let l of fs.readFileSync(f,"utf8").split("\n")){
  if(!l||/^----|^err:|enters the arena|^DIAG/.test(l)) continue;
  l=l.replace(/^(TALK|WARN|SOUND|ERROR|MONSTER_WARNING): /,""); seen.set(l,(seen.get(l)||0)+1);
}
const bad=[]; for(const [l,n] of seen){ const r=T(l); if(r===l) bad.push([l,n]); }
console.log(seen.size,"uniques,",bad.length,"non traduits");
fs.writeFileSync("harv_bad.txt",bad.map(b=>b[0]).join("\n"));
