import re,sys,json,itertools
def expand(s):
    m=re.search(r'\[([^\[\]]*\|[^\[\]]*)\]',s)
    if not m: return [s]
    out=[]
    for i,o in enumerate(m.group(1).split('|')):
        out.append((i,s[:m.start()]+o+s[m.end():]))
    return out
def pairs(en,fr):
    # expand en and fr in parallel
    def ex(s):
        res=[(s,)]
        return res
    E=[en];F=[fr]
    while True:
        me=re.search(r'\[([^\[\]]*\|[^\[\]]*)\]',E[0])
        if not me: break
        mf=re.search(r'\[([^\[\]]*\|[^\[\]]*)\]',F[0])
        if not mf: raise Exception("align "+en)
        oe=me.group(1).split('|');of=mf.group(1).split('|')
        if len(oe)!=len(of): raise Exception("count "+en)
        newE=[];newF=[]
        for e,f in zip(E,F):
            me=re.search(r'\[([^\[\]]*\|[^\[\]]*)\]',e);mf=re.search(r'\[([^\[\]]*\|[^\[\]]*)\]',f)
            for a,b in zip(me.group(1).split('|'),mf.group(1).split('|')):
                newE.append(e[:me.start()]+a+e[me.end():]);newF.append(f[:mf.start()]+b+f[mf.end():])
        E,F=newE,newF
    return list(zip(E,F))
def conv(e):
    e=re.sub(r'@[Tt]he_monster_possessive@','{I}',e)
    e=re.sub(r'@[Tt]he_monster@','{A}',e);e=e.replace(' @at@ ',' at ').replace(' @at@.',' at.')
    e=e.replace('@target@','{A}').replace('@arms@','arms').replace('@hands@','hands').replace('@possessive@','{p}')
    return e
res={}
for f in sys.argv[2:]:
    for l in open(f,encoding='utf-8'):
        l=l.rstrip('\n')
        if not l.strip() or l.startswith('#') or ' => ' not in l: continue
        en,fr=l.split(' => ',1)
        for e,x in pairs(en,fr):
            e=conv(e)
            # first-letter capital variants handled by engine
            res[e]=x
out=open(sys.argv[1],'w',encoding='utf-8')
out.write('// Généré par outils/db/gen.py depuis outils/db/*.txt (messages de dat/database : sorts ratés, cris, annonces de sorts, dieux...).\nObject.assign(globalThis.DCSS_VARIABLES = globalThis.DCSS_VARIABLES || {}, {\n')
for k,v in res.items(): out.write('    '+json.dumps(k,ensure_ascii=False)+': '+json.dumps(v,ensure_ascii=False)+',\n')
out.write('});\n')
print(len(res))
