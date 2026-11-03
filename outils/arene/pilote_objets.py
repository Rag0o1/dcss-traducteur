import sys; sys.path.insert(0,'/tmp/cr')
from drv import *
SC="teleportation,blinking,fear,identify,enchant weapon,enchant armour,remove curse,magic mapping,torment,holy word,silence,summoning,vulnerability,fog,noise,immolation,poison,brand weapon,acquirement,amnesia,butterflies,revelation,discord,drain,sanctuary,starlight".split(",")
PO="curing,heal wounds,haste,might,brilliance,agility,flight,resistance,magic,berserk rage,invisibility,lignification,mutation,degeneration,stabilisation,ambrosia,enlightenment,attraction,cancellation,experience,see invisible,duration,mutation".split(",")
def prompts():
    for _ in range(6):
        s=scr(); grab()
        low=s.lower()
        if "--more--" in s: key("space",0.4)
        elif "[y/n]" in low or "(y/n)" in low or "(y/n/" in low or "(y/" in low: key("y",0.5)
        elif "direction" in low or "target" in low or "which" in low or "choose" in low or "select" in low or "enchant" in low or "identify" in low: key("Enter",0.5); key("Escape",0.4)
        else: break
def fresh():
    key("Escape",0.3); key("Escape",0.3)
    key("&",0.4); key("h",0.6); prompts()
def make(cls,name):
    key("&",0.4); key("o",0.6); key(cls,0.7); text(name); time.sleep(0.5); prompts()
    key("g",0.8); prompts()
def use(k,name):
    key(k,0.7); s=scr()
    m=re.search(r"(\w) - [^\n]*?of "+re.escape(name)+r"\b",s)
    if m: key(m.group(1),1.0); prompts()
    else: key("Escape",0.4)
for n in SC:
    fresh(); make("?",n); use("r",n); key("Escape",0.3)
    open("/tmp/cr/pl/prog2.txt","a").write("sc "+n+"\n")
for n in PO:
    fresh(); make("!",n); use("q",n); key("Escape",0.3)
    open("/tmp/cr/pl/prog2.txt","a").write("po "+n+"\n")
