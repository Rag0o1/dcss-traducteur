import subprocess, os, re, sys, random
names = [l.strip() for l in open('/tmp/cr/lower.txt') if l.strip()]
random.seed(7); random.shuffle(names)
idx = int(sys.argv[1]); nb = int(sys.argv[2])
mine = names[idx::nb]
d = f'/tmp/cr/b/{idx}'; os.makedirs(d, exist_ok=True); os.chdir(d)
open('init.txt', 'w').write('arena_dump_msgs = true\n')
bad = set()
SRC = '/home/claude/crawl/crawl/crawl-ref/source/crawl'
for rnd in range(3):
    cur = [n for n in mine if n not in bad]
    random.shuffle(cur)
    for i in range(0, len(cur), 16):
        grp = cur[i:i+16]
        while len(grp) >= 2:
            h = len(grp) // 2
            spec = ", ".join(grp[:h]) + " v " + ", ".join(grp[h:]) + " t:30"
            try: os.remove('arena.result')
            except OSError: pass
            try:
                subprocess.run([SRC, '-rc', 'init.txt', '-dir', '.', '-arena', spec], stdin=subprocess.DEVNULL,
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=45)
            except subprocess.TimeoutExpired:
                pass
            try: r = open('arena.result', errors='replace').read()
            except OSError: r = ''
            if r.startswith('err:'):
                m = re.findall(r'"([^"]+)"', r.split('\n')[0])
                b = m[-1] if m else None
                if b and b in grp:
                    bad.add(b); grp.remove(b); continue
                break
            open(f'/tmp/cr/b/{idx}_{rnd}_{i}.txt', 'w').write(r)
            break
open(f'/tmp/cr/b/{idx}.bad', 'w').write(",".join(sorted(bad)))
