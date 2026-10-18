"""Stage 4 regression: portfolio routes, homepage preservation and all-site SEO."""
import functools
import importlib.util
import json
import re
import subprocess
import threading
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urljoin,urlsplit,unquote
from urllib.request import urlopen
import xml.etree.ElementTree as ET

REPO=Path(__file__).resolve().parents[1];ROOT=REPO/'elifhandeyilmaz-tam-site-paketi'
BASE='a410bbc77f26afc86bc95a647049929fd81e1b67';ORIGIN='https://elifhandeyilmaz.com'
spec=importlib.util.spec_from_file_location('audit',REPO/'scripts/seo-source-audit.py')
audit=importlib.util.module_from_spec(spec);spec.loader.exec_module(audit)
def parse(text):
    p=audit.Page();p.feed(text);return p
def old(relative):return subprocess.check_output(['git','show',f'{BASE}:elifhandeyilmaz-tam-site-paketi/{relative}'],cwd=REPO,text=True)

class Body(HTMLParser):
    def __init__(self):super().__init__();self.on=False;self.skip=False;self.tokens=[];self.stack=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='body':self.on=True
        if not self.on:return
        if attrs.get('class')=='ehy-brand-link':self.skip=True;return
        actual=tag
        if attrs.get('class')=='ehy-go':
            tag='category-arrow'
            for key in ['href','data-portfolio-route','aria-label']:attrs.pop(key,None)
        if attrs.get('class')=='mini-project':
            tag='featured-card'
            attrs.pop('href',None)
            attrs.pop('type',None)
        if actual not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:
            self.stack.append((actual,tag))
        if tag=='script' and attrs.get('src'):attrs['src']=attrs['src'].split('?')[0]
        self.tokens.append(('start',tag,attrs))
    def handle_endtag(self,tag):
        if self.skip and tag=='a':self.skip=False;return
        if not self.on:return
        if self.stack:
            assert tag==self.stack[-1][0],(tag,self.stack[-1])
            _,tag=self.stack.pop()
        self.tokens.append(('end',tag))
        if tag=='body':self.on=False
    def handle_data(self,text):
        if self.on and text.strip():self.tokens.append(('text',text.strip()))

pages={}
for file in ROOT.rglob('*.html'):
    route='/'+file.relative_to(ROOT).as_posix().removesuffix('index.html')
    pages[route]=(parse(file.read_text()),file)
assert len(pages)==44
external_images=set()
for route,(p,file) in pages.items():
    assert len(p.h1)==1 and len(p.titles)==1,(route,'headings')
    assert [a['href'] for t,a in p.tags if t=='link' and a.get('rel')=='canonical']==[ORIGIN+route]
    meta={a.get('name',a.get('property')):a.get('content') for t,a in p.tags if t=='meta'}
    assert meta['description'] and meta['og:url']==ORIGIN+route
    for key in ['og:title','og:description','og:image','twitter:card','twitter:title','twitter:description','twitter:image']:
        assert sum(t=='meta' and a.get('name',a.get('property'))==key for t,a in p.tags)==1,(route,key)
        assert meta[key]
    alts={a['hreflang']:a['href'] for t,a in p.tags if t=='link' and a.get('hreflang')}
    lang=next(a['lang'] for t,a in p.tags if t=='html')
    assert set(alts)=={'tr','en'} and alts[lang]==ORIGIN+route
    opposite=urlsplit(alts['en' if lang=='tr' else 'tr']).path
    assert opposite in pages
    assert any(t=='link' and a.get('hreflang')==lang and a.get('href')==ORIGIN+route for t,a in pages[opposite][0].tags)
    assert all('parseError' not in schema for schema in p.jsonld)
    for tag,attrs in p.tags:
        value=attrs.get('href') if tag in ('a','link') else attrs.get('src') if tag in ('img','script') else None
        if not value:continue
        u=urlsplit(urljoin(ORIGIN+route,value))
        if u.scheme not in ('http','https'):continue
        if u.netloc!='elifhandeyilmaz.com':
            if tag=='img':external_images.add(u.geturl())
            continue
        target=ROOT/u.path.lstrip('/')
        if target.is_dir():target/='index.html'
        assert target.is_file(),(route,value)
        if tag=='a' and u.fragment:
            assert any(a.get('id')==unquote(u.fragment) for t,a in parse(target.read_text()).tags),(route,value)
    image=urlsplit(meta['og:image'])
    if image.netloc=='elifhandeyilmaz.com':assert (ROOT/image.path.lstrip('/')).is_file()

# Existing blog pages are exactly the published versions, including their Article/FAQ schemas.
for route,(p,file) in pages.items():
    if route.startswith(('/blog/','/en/blog/')):assert file.read_text()==old(file.relative_to(ROOT).as_posix()),route

for lang,relative in [('tr','index.html'),('en','en/index.html')]:
    before=old(relative);after=(ROOT/relative).read_text()
    # Full DOM structural comparison, allowing only native featured links and absolute category links.
    a,b=Body(),Body();a.feed(before);b.feed(after)
    assert a.tokens==b.tokens,lang+' homepage structural change'
    p=parse(after)
    links=[attrs for tag,attrs in p.tags if tag=='a' and attrs.get('class')=='ehy-brand-link']
    assert len(links)==6
    assert all(urlsplit(x['href']).path in pages for x in links)
    arrows=[attrs for tag,attrs in p.tags if tag=='a' and 'data-portfolio-route' in attrs]
    assert len(arrows)==6 and all(urlsplit(x['href']).path in pages for x in arrows)
    minis=[attrs for tag,attrs in p.tags if tag=='a' and attrs.get('class')=='mini-project']
    assert len(minis)==4
    assert all(urlsplit(x['href']).path in pages for x in minis)
    for attr in ['canonical','alternate','stylesheet']:
        assert [x for t,x in parse(before).tags if t=='link' and x.get('rel')==attr]==[x for t,x in p.tags if t=='link' and x.get('rel')==attr and not x.get('href','').startswith('/assets/portfolio-links.css')]
    assert parse(before).jsonld==p.jsonld

data=json.loads((REPO/'content/portfolio-seo.json').read_text())
for project in data['projects']:
    category=next(c for c in data['categories'] if c['id']==project['category'])
    for lang in ('tr','en'):
        route=('/projeler/' if lang=='tr' else '/en/projects/')+category[lang]+'/'+project['slug'][lang]+'/'
        p,file=pages[route]
        graph=p.jsonld[0]['@graph'];work=next(n for n in graph if n['@type']=='CreativeWork')
        assert work['name']==p.h1[0] and work['inLanguage']==lang and work['url']==ORIGIN+route
        assert 'datePublished' not in work
        assert len(project['source'])>=1
        assert sum(len(section['text'][lang].split()) for section in project['sections'])>=130
        text=file.read_text()
        for section in project['sections']:
            assert section['text'][lang] in text.replace('&amp;','&').replace('&#x27;',"'").replace('&quot;','"')

ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
entries=ET.parse(ROOT/'sitemap.xml').findall('s:url',ns)
assert len(entries)==44
assert {urlsplit(x.find('s:loc',ns).text).path for x in entries}==set(pages)
for node in entries:
    route=urlsplit(node.find('s:loc',ns).text).path
    assert {(a.attrib['hreflang'],a.attrib['href']) for a in node.findall('x:link',ns)}=={(a['hreflang'],a['href']) for t,a in pages[route][0].tags if t=='link' and a.get('hreflang')}

# Original CSS and local bitmap assets are never rewritten.
changed=subprocess.check_output(['git','diff','--name-only',BASE],cwd=REPO,text=True).splitlines()
previous=set(subprocess.check_output(['git','ls-tree','-r','--name-only',BASE],cwd=REPO,text=True).splitlines())
assert not any(f in previous and f.endswith(('.css','.webp','.jpg','.png','.svg','.avif')) for f in changed)
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
try:
    for route in pages:
        with urlopen(f'http://127.0.0.1:{server.server_port}'+route) as r:assert r.status==200
finally:server.shutdown();server.server_close()
print(json.dumps({'html_and_http_routes':44,'categories':12,'new_case_pages':12,'old_blog_pages_unchanged':16,'sitemap_urls':44,'result':'PASS','external_images_not_validated':sorted(external_images),'browser_visual_performance':'NOT RUN'},ensure_ascii=False,indent=2))
