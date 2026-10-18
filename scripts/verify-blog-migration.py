"""Validate article migration against the reviewed source, plus local HTTP routes."""
import functools
import importlib.util
import json
import re
import subprocess
import threading
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import urlopen, Request
import xml.etree.ElementTree as ET

REPO=Path(__file__).resolve().parents[1]
ROOT=REPO/'elifhandeyilmaz-tam-site-paketi'
ORIGIN='https://elifhandeyilmaz.com'
BASE='81fdbc5ef7c1fa6a46c80e7f64e2e216c0a1a8c3'
spec=importlib.util.spec_from_file_location('source_audit',REPO/'scripts/seo-source-audit.py')
audit=importlib.util.module_from_spec(spec);spec.loader.exec_module(audit)

class Text(HTMLParser):
    def __init__(self): super().__init__();self.parts=[]
    def handle_data(self,data):
        text=' '.join(data.split())
        if text:self.parts.append(text)

def tokens(s):
    p=Text();p.feed(s);return p.parts

def parse(s):
    p=audit.Page();p.feed(s);return p

def source(relative):
    return subprocess.check_output(['git','show',f'{BASE}:elifhandeyilmaz-tam-site-paketi/{relative}'],cwd=REPO,text=True)

def faqs(article):
    return [tuple(' '.join(tokens(re.search(pattern,block,re.S)[1])) for pattern in [r'<strong>(.*?)</strong>',r'<p>(.*?)</p>']) for block in re.findall(r'<div class="faq-item">(.*?)</div>',article,re.S)]

pages={}
for file in ROOT.rglob('*.html'):
    route='/'+file.relative_to(ROOT).as_posix().removesuffix('index.html')
    text=file.read_text();pages[route]=(parse(text),text)
assert len(pages)==22
titles=[];descriptions=[];articles_count=0;faq_count=0;image_count=0
for route,(p,text) in pages.items():
    canonical=[a['href'] for t,a in p.tags if t=='link' and a.get('rel')=='canonical']
    assert canonical==[ORIGIN+route],route
    assert len(p.h1)==1 and len(p.titles)==1
    assert not any('parseError' in graph for graph in p.jsonld)
    alts={a['hreflang']:a['href'] for t,a in p.tags if t=='link' and a.get('hreflang')}
    assert set(alts)=={'tr','en'}
    lang=next(a['lang'] for t,a in p.tags if t=='html')
    assert alts[lang]==ORIGIN+route
    opposite=urlsplit(alts['en' if lang=='tr' else 'tr']).path
    assert opposite in pages
    q=pages[opposite][0]
    assert any(t=='link' and a.get('hreflang')==lang and a.get('href')==ORIGIN+route for t,a in q.tags)
    meta={a.get('name',a.get('property')):a.get('content') for t,a in p.tags if t=='meta'}
    assert meta['og:url']==ORIGIN+route
    for key in ['og:title','og:description','og:image','twitter:card','twitter:title','twitter:description','twitter:image']:
        assert sum(t=='meta' and a.get('name',a.get('property'))==key for t,a in p.tags)==1
        assert meta[key]
    assert (ROOT/urlsplit(meta['og:image']).path.lstrip('/')).is_file()
    for tag,attrs in p.tags:
        value=attrs.get('href') if tag in ('a','link') else attrs.get('src') if tag in ('script','img') else None
        if not value:continue
        target=urlsplit(urljoin(ORIGIN+route,value))
        if target.netloc!='elifhandeyilmaz.com':continue
        file=ROOT/target.path.lstrip('/')
        if file.is_dir():file/='index.html'
        assert file.is_file(),(route,value)
        if tag=='a' and target.fragment:
            destination=parse(file.read_text())
            assert any(a.get('id')==unquote(target.fragment) for _,a in destination.tags),(route,value)
    for url in re.findall(r'url\("([^"]+)"\)',text):
        target=urlsplit(urljoin(ORIGIN+route,url))
        if target.netloc=='elifhandeyilmaz.com':assert (ROOT/target.path.lstrip('/')).is_file(),(route,url)
    if route.startswith(('/blog/','/en/blog/')) and route not in ('/blog/','/en/blog/'):
        articles_count+=1;titles+=p.titles;descriptions.append(meta['description'])
        article=re.search(r'<article\b.*?</article>',text,re.S)[0]
        headings=[int(tag[1]) for tag,_ in parse(article).tags if re.fullmatch('h[1-6]',tag)]
        assert headings[0]==1 and all(b<=a+1 for a,b in zip(headings,headings[1:]))
        graph=p.jsonld[0]['@graph']
        schema=next(n for n in graph if n['@type']=='Article')
        assert schema['headline']==p.h1[0] and schema['inLanguage']==lang
        assert schema['mainEntityOfPage']['@id']==ORIGIN+route
        assert 'datePublished' not in schema
        faq=next((n for n in graph if n['@type']=='FAQPage'),None)
        actual=faqs(article)
        if actual:
            assert [(q['name'],q['acceptedAnswer']['text']) for q in faq['mainEntity']]==actual
            faq_count+=1
        else:assert faq is None
        for tag,attrs in parse(article).tags:
            if tag=='img':
                image_count+=1
                assert attrs.get('width') and attrs.get('height') and attrs.get('loading')=='lazy'

assert articles_count==14 and len(set(titles))==14 and len(set(descriptions))==14
for lang in ('tr','en'):
    route='/blog/' if lang=='tr' else '/en/blog/'
    relative=route.lstrip('/')+'index.html'
    old=source(relative);current=pages[route][1]
    assert not re.search(r'<article\b',current)
    current_style=re.search(r'<style>(.*?)</style>',current,re.S)[1]
    old_style=re.search(r'<style>(.*?)</style>',old,re.S)[1]
    assert re.sub(r'\s*\.card\[id\] \{ scroll-margin-top: 110px; \}\s*$','',current_style).rstrip()==old_style.rstrip()
    old_cards=re.findall(r'<a class="card".*?</a>',old,re.S)
    new_cards=re.findall(r'<a class="card".*?</a>',current,re.S)
    old_articles=re.findall(r'<article\b.*?</article>',old,re.S)
    assert len(old_cards)==len(new_cards)==7
    for i,(before,after,old_article) in enumerate(zip(old_cards,new_cards,old_articles)):
        assert tokens(before)==tokens(after)
        old_id=re.search(r'href="#([^"]+)"',before)[1]
        assert f'id="{old_id}"' in after
        target=re.search(r'href="([^"]+)"',after)[1]
        assert target in pages
        new_article=re.search(r'<article\b.*?</article>',pages[target][1],re.S)[0]
        if i<6:assert tokens(old_article)==tokens(new_article),(lang,i,'article content changed')
        else:
            remaining=iter(tokens(new_article))
            assert all(any(w==old_token for w in remaining) for old_token in tokens(old_article))
            assert sum(t=='h2' for t,a in parse(new_article).tags)>=8
        assert faqs(old_article)==faqs(new_article)

ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
xml=ET.parse(ROOT/'sitemap.xml')
entries=xml.findall('s:url',ns)
assert len(entries)==22
assert {urlsplit(e.find('s:loc',ns).text).path for e in entries}==set(pages)
for entry in entries:
    route=urlsplit(entry.find('s:loc',ns).text).path
    actual={(x.attrib['hreflang'],x.attrib['href']) for x in entry.findall('x:link',ns)}
    expected={(a['hreflang'],a['href']) for t,a in pages[route][0].tags if t=='link' and a.get('hreflang')}
    assert actual==expected

# Homepage, existing portfolio, animations, fonts and illustrations remain byte-identical.
changed=subprocess.check_output(['git','diff','--name-only',BASE],cwd=REPO,text=True).splitlines()
original_files=set(subprocess.check_output(['git','ls-tree','-r','--name-only',BASE],cwd=REPO,text=True).splitlines())
assert all(f not in original_files or not f.startswith('elifhandeyilmaz-tam-site-paketi/') or f in ['elifhandeyilmaz-tam-site-paketi/'+p for p in ['blog/index.html','en/blog/index.html','sitemap.xml']] for f in changed)

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(ROOT)))
thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
try:
    for route in pages:
        with urlopen(f'http://127.0.0.1:{server.server_port}'+route) as response:
            assert response.status==200 and '<html' in response.read().decode()
finally:server.shutdown();server.server_close()
print(f'PASS: {len(pages)} HTML/HTTP routes, 14 unique articles, 14 paired language links, {faq_count} FAQ schemas matching visible content, {image_count} lazy article images, 14 legacy fragment targets, 22 sitemap entries. Original article text, list design rules and protected site files preserved. Browser/visual/performance tests not included.')
