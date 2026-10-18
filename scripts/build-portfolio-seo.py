"""Build selected bilingual portfolio pages from reviewed project records.

The pinned source is the live stage-3 release. This is a one-stage migration,
not an editor for future homepage changes.
"""
import html
import json
import re
import subprocess
from pathlib import Path
import xml.etree.ElementTree as ET
from PIL import Image

REPO=Path(__file__).resolve().parents[1]
ROOT=REPO/'elifhandeyilmaz-tam-site-paketi'
BASE='a410bbc77f26afc86bc95a647049929fd81e1b67'
ORIGIN='https://elifhandeyilmaz.com'
DATE='2026-10-19'
data=json.loads((REPO/'content/portfolio-seo.json').read_text())
categories={c['id']:c for c in data['categories']}
projects=data['projects']
def e(value):return html.escape(value,quote=True)
def original(relative):return subprocess.check_output(['git','show',f'{BASE}:elifhandeyilmaz-tam-site-paketi/{relative}'],cwd=REPO,text=True)
def category_route(category,lang):return ('/projeler/' if lang=='tr' else '/en/projects/')+category[lang]+'/'
def project_route(project,lang):return category_route(categories[project['category']],lang)+project['slug'][lang]+'/'
def image_url(project):return project['image'] if project['image'].startswith('https://') else ORIGIN+'/'+project['image']
def img(project,lang,lazy=False):
    src=project['image'] if project['image'].startswith('https://') else '/'+project['image']
    size=''
    if not src.startswith('https://'):
        with Image.open(ROOT/src.lstrip('/')) as im:w,h=im.size
        size=f' width="{w}" height="{h}"'
    return f'<img src="{e(src)}" alt="{e(project["alt"][lang])}"{size}'+(' loading="lazy"' if lazy else ' fetchpriority="high"')+' decoding="async">'

def nav(lang,current):
    return '<nav class="portfolio-category-nav" aria-label="'+('Proje kategorileri' if lang=='tr' else 'Project categories')+'">'+''.join(f'<a href="{category_route(c,lang)}"'+(' aria-current="page"' if c['id']==current else '')+'>'+e(c['title'][lang])+'</a>' for c in categories.values())+'</nav>'
def breadcrumbs(lang,category,project=None):
    home='/' if lang=='tr' else '/en/'
    items=[('Anasayfa' if lang=='tr' else 'Home',home),(category['title'][lang],category_route(category,lang))]
    if project:items.append((project['title'][lang],project_route(project,lang)))
    visible='<nav class="portfolio-breadcrumb" aria-label="'+('İçerik yolu' if lang=='tr' else 'Breadcrumb')+'">'
    visible+=' <span aria-hidden="true">/</span> '.join(f'<a href="{url}">{e(label)}</a>' if i<len(items)-1 else '<span aria-current="page">'+e(label)+'</span>' for i,(label,url) in enumerate(items))+'</nav>'
    schema={'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':label,'item':ORIGIN+url} for i,(label,url) in enumerate(items)]}
    return visible,schema
def head(title,description,tr,en,lang,image,schema):
    route=tr if lang=='tr' else en
    meta={'og:title':title,'og:description':description,'og:type':'website','og:url':ORIGIN+route,'og:image':image,'og:locale':'tr_TR' if lang=='tr' else 'en_US','og:locale:alternate':'en_US' if lang=='tr' else 'tr_TR'}
    tags='\n'.join(f'  <meta property="{key}" content="{e(value)}">' for key,value in meta.items())
    tags+='\n'+'\n'.join(f'  <meta name="{key}" content="{e(value)}">' for key,value in {'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':image}.items())
    return f'''<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(title)} | Elif Handegül Yılmaz</title>
  <meta name="description" content="{e(description)}">
  <link rel="canonical" href="{ORIGIN+route}">
  <link rel="alternate" hreflang="tr" href="{ORIGIN+tr}">
  <link rel="alternate" hreflang="en" href="{ORIGIN+en}">
{tags}
  <link rel="icon" href="/images/ehy-logo{('-en' if lang=='en' else '')}.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;family=Rochester&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/style.css">
  <link rel="stylesheet" href="/assets/project-pages.css">
  <link rel="stylesheet" href="/assets/site-design-system.css?v=20261009-typography-v1">
  <link rel="stylesheet" href="/assets/portfolio-seo.css?v=20261019-v1">
  <script type="application/ld+json">{json.dumps({'@context':'https://schema.org','@graph':schema},ensure_ascii=False).replace('</','<\\/')}</script>
</head>'''
def header(lang,other,back,label):
    home='/' if lang=='tr' else '/en/'
    return f'''<header class="project-page-header"><nav class="project-page-nav" aria-label="{('Proje gezinmesi' if lang=='tr' else 'Project navigation')}">
<a class="project-page-brand" href="{home}">Elif Handegül Yılmaz</a>
<div class="project-page-actions"><a class="project-page-back" href="{back}">← {e(label)}</a><a class="language-switch" href="{other}" lang="{('en' if lang=='tr' else 'tr')}" aria-label="{('Read this page in English' if lang=='tr' else 'Bu sayfayı Türkçe oku')}">{('EN' if lang=='tr' else 'TR')}</a></div>
</nav></header>'''
def card(project,lang):
    return f'''<article class="brand-project-card"><a href="{project_route(project,lang)}"><div class="brand-project-cover">{img(project,lang,True)}</div>
<div class="brand-project-body"><div><h2>{e(project['title'][lang])}</h2><p>{e(project['description'][lang])}</p></div><span class="brand-project-arrow" aria-hidden="true">→</span></div></a></article>'''
def write(route,text):
    file=ROOT/route.lstrip('/')/'index.html';file.parent.mkdir(parents=True,exist_ok=True);file.write_text(text.rstrip()+'\n')

for category in categories.values():
    for lang in ('tr','en'):
        route=category_route(category,lang)
        selected=[p for p in projects if p['category']==category['id']]
        tr=category_route(category,'tr');en=category_route(category,'en')
        if category['id']=='brand':
            relative=route.lstrip('/')+'index.html';page=original(relative)
            # Retain the existing Sağlığım Burada card and add the new case alongside it.
            page=page.replace('</section>',card(selected[0],lang)+'\n</section>',1)
            page=page.replace('</head>','  <link rel="stylesheet" href="/assets/portfolio-seo.css?v=20261019-v1">\n</head>')
            page=page.replace('</main>',nav(lang,category['id'])+'\n</main>')
        else:
            crumbs,crumbschema=breadcrumbs(lang,category)
            schema=[{'@type':'CollectionPage','@id':ORIGIN+route,'name':category['title'][lang],'description':category['description'][lang],'inLanguage':lang,'mainEntity':{'@type':'ItemList','itemListElement':[{'@type':'ListItem','position':i+1,'url':ORIGIN+project_route(p,lang),'name':p['title'][lang]} for i,p in enumerate(selected)]}},crumbschema]
            page=head(category['title'][lang],category['description'][lang],tr,en,lang,image_url(selected[0]),schema)
            home=('/#projeler' if lang=='tr' else '/en/#portfolio')
            page+='\n<body class="project-page portfolio-seo-page">'+header(lang,en if lang=='tr' else tr,home,'Tüm kategoriler' if lang=='tr' else 'All categories')+'<main class="project-page-main" id="main-content">'+crumbs
            page+='<header class="project-page-intro"><span class="eyebrow">'+('Seçili projeler' if lang=='tr' else 'Selected projects')+'</span><h1>'+e(category['title'][lang])+'</h1><p>'+e(category['description'][lang])+'</p></header>'
            page+='<section class="brand-project-grid" aria-label="'+e(category['title'][lang])+'">'+''.join(card(p,lang) for p in selected)+'</section>'+nav(lang,category['id'])+'</main></body></html>'
        write(route,page)

for project in projects:
    category=categories[project['category']]
    for lang in ('tr','en'):
        tr=project_route(project,'tr');en=project_route(project,'en');route=tr if lang=='tr' else en
        crumbs,crumbschema=breadcrumbs(lang,category,project)
        schema=[{'@type':'CreativeWork','@id':ORIGIN+route+'#project','name':project['title'][lang],'description':project['description'][lang],'url':ORIGIN+route,'inLanguage':lang,'image':image_url(project),'dateModified':DATE,'creator':{'@type':'Person','name':'Elif Handegül Yılmaz','url':ORIGIN+'/'}},crumbschema]
        page=head(project['title'][lang],project['description'][lang],tr,en,lang,image_url(project),schema)
        page+='\n<body class="project-page portfolio-seo-page">'+header(lang,en if lang=='tr' else tr,category_route(category,lang),category['title'][lang])+'<main class="case-study-main" id="main-content">'+crumbs
        page+='<header class="case-study-heading"><span class="eyebrow">'+e(category['title'][lang])+'</span><h1>'+e(project['title'][lang])+'</h1><div class="case-study-meta">'+''.join('<span>'+e(role)+'</span>' for role in project['roles'][lang])+'</div></header>'
        page+='<figure class="case-study-presentation">'+img(project,lang)+'</figure><div class="portfolio-case-copy">'
        for section in project['sections']:page+='<section><h2>'+e(section['title'][lang])+'</h2><p>'+e(section['text'][lang])+'</p></section>'
        if project.get('pdf'):page+='<p><a class="project-page-back" href="/'+project['pdf']+'" target="_blank" rel="noopener">'+('Tam yayını PDF olarak incele ↗' if lang=='tr' else 'View the complete publication as PDF ↗')+'</a></p>'
        if project.get('videoId'):page+='<p><a class="project-page-back" href="https://www.youtube.com/watch?v='+project['videoId']+'" target="_blank" rel="noopener">'+('Videoyu YouTube’da izle ↗' if lang=='tr' else 'Watch the video on YouTube ↗')+'</a></p>'
        if project.get('liveUrl'):page+='<p><a class="project-page-back" href="'+project['liveUrl']+'" target="_blank" rel="noopener">'+('Proje web sitesini incele ↗' if lang=='tr' else 'Visit the project website ↗')+'</a></p>'
        page+='</div><nav class="case-study-footer" aria-label="'+('Proje bağlantıları' if lang=='tr' else 'Project links')+'"><a href="'+category_route(category,lang)+'">← '+e(category['title'][lang])+'</a><a href="'+('/#iletisim' if lang=='tr' else '/en/#contact')+'">'+('Benzer bir proje için iletişime geç →' if lang=='tr' else 'Get in touch about a similar project →')+'</a></nav>'+nav(lang,category['id'])+'</main></body></html>'
        write(route,page)

# Crawlable homepage links; the existing gallery overlays and CSS remain in place.
featured=[next(p for p in projects if p['id']==key) for key in ['pilavyeri','denizcilik-zirvesi','alfa-sigorta','sigortaguru']]
for lang,relative in [('tr','index.html'),('en','en/index.html')]:
    page=original(relative)
    matches=list(re.finditer(r'<article class="[^"]*\bproject-card\b[^\"]*".*?</article>',page,re.S))
    assert len(matches)==6
    for match,category in reversed(list(zip(matches,categories.values()))):
        article=re.sub(r'<a\b[^>]*class="ehy-brand-link"[^>]*></a>','',match[0])
        article=article.replace('<i class="ehy-go">→</i>','<a class="ehy-go" data-portfolio-route href="'+category_route(category,lang)+'" aria-label="'+e(category['title'][lang]+(' sayfasını aç' if lang=='tr' else ' category page'))+'">→</a>')
        article=article.replace('</article>','<a class="ehy-brand-link" href="'+category_route(category,lang)+'" aria-label="'+e(category['title'][lang]+(' kategori sayfasını aç' if lang=='tr' else ' category page'))+'"></a></article>')
        page=page[:match.start()]+article+page[match.end():]
    start=page.index('<div class="mini-project-grid">')
    # Match the four outer cards by their shared class, respecting nested divs with a small parser-free depth scan.
    cursor=start
    for project in featured:
        match=re.search(r'<(button|div) class="mini-project"[^>]*>',page[cursor:])
        assert match
        begin=cursor+match.start();opening_end=cursor+match.end();tag=match[1]
        depth=1;end=None
        for token in re.finditer(r'</?'+tag+r'\b[^>]*>',page[opening_end:]):
            depth+= -1 if token[0].startswith('</') else 1
            if depth==0:end=opening_end+token.end();close_start=opening_end+token.start();break
        assert end
        opening=page[begin:opening_end]
        opening=re.sub(r'^<'+tag,r'<a',opening)
        opening=re.sub(r'\s+type="button"','',opening)
        opening=opening[:-1]+' href="'+project_route(project,lang)+'">'
        item=opening+page[opening_end:close_start]+'</a>'
        page=page[:begin]+item+page[end:];cursor=begin+len(item)
    if lang=='tr':page=page.replace('assets/script.js?v=20261016-four-shorts-v1','assets/script.js?v=20261019-portfolio-links-v1')
    page=page.replace('</head>','  <link rel="stylesheet" href="/assets/portfolio-links.css?v=20261019-v1">\n  <script src="/assets/portfolio-links.js?v=20261019-v1" defer></script>\n</head>')
    (ROOT/relative).write_text(page)

# Keep gallery clicks when scripts are ready, with native navigation before JS or on modified clicks.
changes={
 'assets/project-covers.js':('trigger.addEventListener("click", () => openLightbox(projectIndex));','trigger.addEventListener("click", (event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; if (trigger.matches("a[href]")) event.preventDefault(); openLightbox(projectIndex); });'),
 'assets/event-projects.js':("featuredTrigger.addEventListener('click', () => open(featuredTrigger.dataset.featuredEventProject));","featuredTrigger.addEventListener('click', (event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; if (featuredTrigger.matches('a[href]')) event.preventDefault(); open(featuredTrigger.dataset.featuredEventProject); });"),
 'assets/motion-projects.js':('featuredTrigger.addEventListener("click", () => openModal(featuredTrigger.dataset.featuredMotionProject));','featuredTrigger.addEventListener("click", (event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; if (featuredTrigger.matches("a[href]")) event.preventDefault(); openModal(featuredTrigger.dataset.featuredMotionProject); });'),
 'assets/web-projects.js':('trigger.addEventListener("click",()=>openModal(trigger.dataset.webProject));','trigger.addEventListener("click",event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;if(trigger.matches("a[href]"))event.preventDefault();openModal(trigger.dataset.webProject);});')
}
for relative,(before,after) in changes.items():
    text=original(relative);assert before in text,relative
    (ROOT/relative).write_text(text.replace(before,after,1))
for relative in ['assets/script.js','assets/core-script.js']:
    text=original(relative)
    for name in ['core-script.js','project-covers.js','event-projects.js','motion-projects.js','web-projects.js']:
        text=re.sub(r'('+re.escape(name)+r')\?[^"\s]+',r'\1?v=20261019-portfolio-links-v1',text)
    (ROOT/relative).write_text(text)

NS='http://www.sitemaps.org/schemas/sitemap/0.9';X='http://www.w3.org/1999/xhtml'
ET.register_namespace('',NS);ET.register_namespace('xhtml',X)
xml=ET.ElementTree(ET.fromstring(original('sitemap.xml')));urlset=xml.getroot()
existing={node.find('{'+NS+'}loc').text for node in urlset}
pairs=[(category_route(c,'tr'),category_route(c,'en')) for c in categories.values()]+[(project_route(p,'tr'),project_route(p,'en')) for p in projects]
for tr,en in pairs:
    for route in [tr,en]:
        if ORIGIN+route not in existing:
            node=ET.SubElement(urlset,'{'+NS+'}url');ET.SubElement(node,'{'+NS+'}loc').text=ORIGIN+route
            ET.SubElement(node,'{'+NS+'}lastmod').text=DATE
            for code,target in [('tr',tr),('en',en)]:ET.SubElement(node,'{'+X+'}link',{'rel':'alternate','hreflang':code,'href':ORIGIN+target})
        else:
            node=next(n for n in urlset if n.find('{'+NS+'}loc').text==ORIGIN+route)
            node.find('{'+NS+'}lastmod').text=DATE
for node in urlset:
    if node.find('{'+NS+'}loc').text in [ORIGIN+'/',ORIGIN+'/en/']:node.find('{'+NS+'}lastmod').text=DATE
ET.indent(xml,space='  ');xml.write(ROOT/'sitemap.xml',encoding='UTF-8',xml_declaration=True)
print('Created 10 category pages and 12 selected case pages; linked both homepages and updated the 44-URL sitemap.')
