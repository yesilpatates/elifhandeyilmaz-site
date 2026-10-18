"""Read-only, dependency-free SEO source inventory. Run from any directory."""
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'elifhandeyilmaz-tam-site-paketi'
ORIGIN = 'https://elifhandeyilmaz.com'

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.capture = None
        self.text = []
        self.titles = []
        self.h1 = []
        self.jsonld = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag in ('title', 'h1') or (tag == 'script' and attrs.get('type') == 'application/ld+json'):
            self.capture, self.text = tag, []

    def handle_data(self, data):
        if self.capture:
            self.text.append(data)

    def handle_endtag(self, tag):
        if self.capture == tag:
            value = ''.join(self.text).strip()
            if tag == 'title': self.titles.append(value)
            elif tag == 'h1': self.h1.append(' '.join(value.split()))
            else:
                try: self.jsonld.append(json.loads(value))
                except ValueError as error: self.jsonld.append({'parseError': str(error)})
            self.capture = None

def audit():
    pages = []
    hashes = {}
    for file in sorted(ROOT.rglob('*')):
        if not file.is_file() or file.name.startswith('.'): continue
        relative = file.relative_to(ROOT).as_posix()
        hashes[relative] = hashlib.sha256(file.read_bytes()).hexdigest()
        if file.suffix != '.html': continue
        parser = Page()
        parser.feed(file.read_text())
        route = '/' + relative.removesuffix('index.html')
        links = [a for t,a in parser.tags if t == 'link']
        meta = {a.get('name',a.get('property')):a.get('content') for t,a in parser.tags if t == 'meta'}
        resources = [(t,a.get('src') if t in ('img','script') else a.get('href')) for t,a in parser.tags if t in ('img','script') or (t=='link' and a.get('rel') in ('stylesheet','icon'))]
        anchors = [a.get('href','') for t,a in parser.tags if t=='a']
        missing = []
        for kind, href in resources + [('a',a) for a in anchors]:
            if not href or href.startswith(('#','data:','mailto:','tel:')): continue
            url = urlsplit(urljoin(ORIGIN+route,href))
            if url.netloc != 'elifhandeyilmaz.com': continue
            target = ROOT / unquote(url.path).lstrip('/')
            if target.is_dir() or url.path.endswith('/'): target /= 'index.html'
            if not target.exists(): missing.append({'tag':kind,'target':href})
        pages.append({'route':route,'file':relative,'lang':next((a.get('lang') for t,a in parser.tags if t=='html'),None),'title':parser.titles,'h1':parser.h1,'meta':meta,
            'canonical':[a.get('href') for a in links if a.get('rel')=='canonical'],
            'alternates':[a for a in links if a.get('hreflang')], 'jsonld':parser.jsonld,
            'articleIds':[a.get('id') for t,a in parser.tags if t=='article' and a.get('id')],
            'images':[a for t,a in parser.tags if t=='img'],
            'indexHtmlLinks':[a for a in anchors if 'index.html' in a],
            'mailtoLinks':[a for a in anchors if a.startswith('mailto:')],
            'missingLocalTargets':missing})
    ns = {'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    sitemap = ET.parse(ROOT/'sitemap.xml')
    urls = [n.text for n in sitemap.findall('s:url/s:loc',ns)]
    result = {'source':'67b4bebb9f856473dc5dfdedeaea6f4ee8c5696a','pages':pages,'sitemap':urls,'robots':(ROOT/'robots.txt').read_text(),'sha256':hashes}
    print(json.dumps(result,ensure_ascii=False,indent=2))

if __name__ == '__main__': audit()
