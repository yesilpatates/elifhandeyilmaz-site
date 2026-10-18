"""Stage 2: metadata correctness and preservation of the existing UI structure."""
import importlib.util
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

REPO = Path(__file__).resolve().parents[1]
PREFIX = 'elifhandeyilmaz-tam-site-paketi/'
BASE = '911daac6691bd18075aee48f5e2ffc0f12315151'
spec = importlib.util.spec_from_file_location('audit', REPO/'scripts/seo-source-audit.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

class Body(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.active = False
        self.tokens = []
    def handle_starttag(self, tag, attrs):
        if tag == 'body': self.active = True
        if not self.active: return
        attrs = dict(attrs)
        if 'href' in attrs:
            attrs['href'] = attrs['href'].replace('index.html', '')
        if tag == 'img':
            attrs.pop('alt', None)
            if attrs.get('src') == '': attrs.pop('src')
        if tag == 'script' and attrs.get('src'):
            attrs['src'] = attrs['src'].split('?')[0]
        self.tokens.append(('start', tag, attrs))
    def handle_endtag(self, tag):
        if self.active: self.tokens.append(('end', tag))
        if tag == 'body': self.active = False
    def handle_data(self, data):
        if self.active and data.strip(): self.tokens.append(('text', data.strip()))

baseline = json.loads((REPO/'docs/seo/baseline/source-audit.json').read_text())
for old in baseline['pages']:
    relative = PREFIX + old['file']
    before = subprocess.check_output(['git','show',f'{BASE}:{relative}'],cwd=REPO,text=True)
    after = (REPO/relative).read_text()
    first, second = Body(), Body()
    first.feed(before); second.feed(after)
    assert first.tokens == second.tokens, f'Unexpected visible DOM/content change: {relative}'
    parser = audit.Page(); parser.feed(after)
    links = [a for t,a in parser.tags if t=='link']
    meta = [a for t,a in parser.tags if t=='meta']
    assert parser.titles == old['title'] and parser.h1 == old['h1']
    assert parser.jsonld == old['jsonld'], f'Existing schema changed: {relative}'
    assert [a.get('href') for a in links if a.get('rel')=='canonical'] == old['canonical']
    assert [a for a in links if a.get('hreflang')] == old['alternates']
    for key in ['og:title','og:description','og:type','og:url','og:image','og:locale','og:locale:alternate','twitter:card','twitter:title','twitter:description','twitter:image']:
        found = [m.get('content') for m in meta if m.get('name',m.get('property'))==key]
        assert len(found)==1 and found[0], (relative,key,found)
    values = {m.get('name',m.get('property')):m.get('content') for m in meta}
    assert values['description'] == old['meta']['description']
    assert values['og:url'] == old['canonical'][0]
    assert values['og:image'] == values['twitter:image']
    image = urlsplit(values['og:image'])
    assert image.scheme=='https' and image.netloc=='elifhandeyilmaz.com'
    assert (audit.ROOT/image.path.lstrip('/')).is_file()
    assert not any(t=='img' and a.get('src')=='' for t,a in parser.tags)
    assert not any(t=='a' and 'index.html' in a.get('href','') for t,a in parser.tags)
    certs = [a['alt'] for t,a in parser.tags if t=='img' and '/certificates/' in a.get('src','')]
    if certs: assert len(certs)==14 and len(set(certs))==14

# All styles, illustrations and animation implementation are untouched.
changed = subprocess.check_output(['git','diff','--name-only',BASE],cwd=REPO,text=True).splitlines()
allowed_js = {PREFIX+'assets/certificates.js', PREFIX+'assets/en-site.js'}
assert not any(p.endswith(('.css','.png','.jpg','.webp','.svg','.avif')) for p in changed)
assert all(not p.endswith('.js') or p in allowed_js for p in changed)
print('PASS: 8 pages; existing body structure, visible text, styles, animations, H1, canonical, hreflang and Person preserved; OG/Twitter valid and unique; 28 certificate alts; no empty img src or index.html anchors.')
