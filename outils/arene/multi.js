// usage: node multi.js "dirA|dirB:francais" "texte1" "texte2" ...  (suffixe :francais force nomsDeSorts francais)
const vm=require("vm"),fs=require("fs"),path=require("path");
function charger(spec){
  const [dir,mode]=spec.split(":"); const manifest=JSON.parse(fs.readFileSync(path.join(dir,"manifest.json"),"utf8"));
  const sb={console:{log(){},info(){},warn(){},error(){}},document:{querySelectorAll:()=>[],createTreeWalker:()=>({nextNode:()=>null}),body:null,documentElement:{dataset:{}}},Node:{TEXT_NODE:3,ELEMENT_NODE:1},NodeFilter:{SHOW_TEXT:4},MutationObserver:class{observe(){}disconnect(){}takeRecords(){return[]}},requestAnimationFrame:()=>0};
  const ctx=vm.createContext(sb);
  for(const f of manifest.content_scripts[0].js){ let code=fs.readFileSync(path.join(dir,f),"utf8"); if(f==="OPTIONS.js"&&mode) code=code.replace(/nomsDeSorts: "[a-z]+"/,`nomsDeSorts: "${mode}"`); vm.runInContext(code,ctx,{filename:f}); }
  return ctx;
}
module.exports={charger};
if(require.main===module){ const [specs,...txt]=process.argv.slice(2); const C=specs.split("|").map(charger);
 for(const t of txt){ console.log(JSON.stringify(t)); C.forEach((c,i)=>console.log("  ",i,JSON.stringify(c.DCSS_TRADUIRE_CHAINE(t)))); } }
