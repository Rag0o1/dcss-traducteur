import subprocess,time,re,sys
def sh(*a): return subprocess.run(a,capture_output=True,text=True).stdout
def start():
    subprocess.run("tmux kill-server",shell=True,stderr=subprocess.DEVNULL)
    subprocess.run("rm -rf /tmp/cr/pl/saves /tmp/cr/pl/morgue",shell=True)
    sh("tmux","new-session","-d","-s","p","-x","160","-y","50","TERM=xterm-256color /home/claude/crawl/crawl/crawl-ref/source/crawl -rc /tmp/cr/pl/init.txt -dir /tmp/cr/pl; sleep 5000")
    time.sleep(5); key("a"); time.sleep(3)
def key(k,w=0.35):
    sh("tmux","send-keys","-t","p",k); time.sleep(w)
def text(t): 
    sh("tmux","send-keys","-t","p","-l",t); time.sleep(0.3); key("Enter",0.6)
def scr(): return sh("tmux","capture-pane","-t","p","-p")
def msgs():
    # lit l'historique des messages (Ctrl-P) et le renvoie
    key("C-p",0.8); s=scr(); key("Escape",0.5); return s
LOG=open("/tmp/cr/pl/hist.txt","a")
def hist(tag=""):
    s=msgs(); LOG.write("=== "+tag+"\n"+s+"\n"); LOG.flush(); return s
def wiz(cmd,arg=None):
    key("&",0.3)
    for c in cmd: key(c,0.4)
    if arg is not None: time.sleep(0.5); text(arg)
    time.sleep(0.5)

SEEN=open("/tmp/cr/pl/lines.txt","a")
def grab():
    ls=[l.rstrip() for l in scr().split("\n")]
    # zone des messages : tout ce qui est sous la carte ; on garde les lignes qui commencent par un espace ou _ 
    for l in ls[-14:]:
        if l.strip(): SEEN.write(l+"\n")
    SEEN.flush()
def pump(maxn=12):
    for _ in range(maxn):
        s=scr(); grab()
        if "--more--" in s: key("space",0.4)
        else: break
def run(keys,arg=None,w=0.6):
    key("&",0.4)
    for c in keys: key(c,0.5)
    if arg is not None: time.sleep(0.4); text(arg)
    time.sleep(w); pump()
def cmd(keys,w=0.6):
    for c in keys: key(c,0.4)
    time.sleep(w); pump()
