"""Build the bilingual article pages from the reviewed stage-2 source snapshot.

Run once per migration; reads the pinned Git snapshot so reruns are deterministic.
It only writes the blog lists, article pages, article CSS and sitemap.
"""
import html
import json
import re
import struct
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit
import xml.etree.ElementTree as ET

REPO = Path(__file__).resolve().parents[1]
ROOT = REPO/'elifhandeyilmaz-tam-site-paketi'
BASE = '81fdbc5ef7c1fa6a46c80e7f64e2e216c0a1a8c3'
ORIGIN = 'https://elifhandeyilmaz.com'
MODIFIED = '2026-10-18'
TR = ['grafik-tasarim-nedir','grafik-tasarimin-temel-unsurlari','grafik-tasarimin-temel-ilkeleri','vektorel-ve-bitmap-farki','rgb-cmyk-renk-bilgisi','tipografi-nedir','dosya-formatlari-rehberi']
EN = ['what-is-graphic-design','elements-of-graphic-design','principles-of-graphic-design','vector-vs-bitmap','rgb-cmyk-color-guide','what-is-typography','design-file-formats']

def source(relative):
    return subprocess.check_output(['git','show',f'{BASE}:elifhandeyilmaz-tam-site-paketi/{relative}'],cwd=REPO,text=True)

def plain(fragment):
    class Text(HTMLParser):
        def __init__(self): super().__init__(); self.parts=[]
        def handle_data(self,data): self.parts.append(data)
    parser=Text(); parser.feed(fragment)
    return ' '.join(' '.join(parser.parts).split())

def absolute_paths(fragment, route):
    def attr(m):
        value=html.unescape(m[2])
        url=urlsplit(urljoin(ORIGIN+route,value))
        target=(url.path+('?' + url.query if url.query else '')+('#'+url.fragment if url.fragment else '')) if url.netloc=='elifhandeyilmaz.com' else value
        return m[1]+html.escape(target,quote=True)+'"'
    fragment=re.sub(r'((?:href|src)=")([^"]*)"',attr,fragment)
    return re.sub(r'url\("([^"]+)"\)',lambda m:'url("'+urlsplit(urljoin(ORIGIN+route,m[1])).path+'")',fragment)

def image_dimensions(fragment):
    def image(m):
        tag=m[0]
        src=re.search(r'\bsrc="([^"]+)"',tag)
        if not src: return tag
        file=ROOT/src[1].lstrip('/')
        if file.suffix=='.png' and file.exists():
            data=file.read_bytes()[:24]
            width,height=struct.unpack('>II',data[16:24])
            if not re.search(r'\bwidth=',tag):tag=tag[:-1]+f' width="{width}" height="{height}">'
        if 'article-info-image' in tag and 'loading=' not in tag:tag=tag[:-1]+' loading="lazy" decoding="async">'
        return tag
    return re.sub(r'<img\b[^>]*>',image,fragment)

FORMATS = {
 'tr': [
  ('AI — Düzenlenebilir kaynak dosya','Adobe Illustrator’ın yerel çalışma formatıdır. Katmanları, vektörel çizimleri ve düzenleme bilgilerini korumak için ana dosyayı AI olarak saklayın. Paylaşırken karşı tarafın dosyayı açabilecek yazılıma ve kullanılan fontlara sahip olduğundan emin olun.'),
  ('EPS — Vektörel aktarım','Logo ve çizimlerin farklı tasarım veya üretim yazılımlarına aktarılmasında kullanılır. Modern şeffaflık ve efektler her uygulamada aynı sonucu vermeyebilir; teslim öncesinde çıktıyı kontrol edin.'),
  ('SVG — Web için vektör','Logo, ikon ve arayüz çizimleri için ölçeklenebilir bir formattır. Ekran boyutu değiştiğinde çizgiler net kalır. Web’e aktarırken gereksiz öğeleri temizleyin ve yazıların doğru görüntülendiğini kontrol edin.'),
  ('JPG — Fotoğraf','Fotoğrafları küçük dosya boyutlarıyla paylaşmak için uygundur. Kayıplı sıkıştırma kullandığından tekrar tekrar kaydetmek kaliteyi azaltabilir; düzenlemeleri kaynak dosyada yapın ve son çıktıyı bir kez dışa aktarın. Şeffaf arka planı desteklemez.'),
  ('PNG — Şeffaf dijital görsel','Şeffaf arka plan gereken logo, ekran görüntüsü ve dijital grafiklerde kullanılır. Kayıpsız sıkıştırma sunar, ancak büyük fotoğraflarda JPG’ye göre daha ağır olabilir. Gereken çözünürlükte dışa aktararak dosya boyutunu kontrol edin.'),
  ('PDF — Paylaşım ve baskı','Çok sayfalı tasarımları ve sayfa düzenini paylaşmak için uygundur; vektör, fotoğraf ve metni birlikte taşıyabilir. Baskı için matbaanın istediği renk profili, taşma payı ve PDF standardını kullanın. PDF olması tek başına dosyanın baskıya hazır olduğu anlamına gelmez.'),
  ('TIFF — Yüksek kaliteli görüntü','Yüksek kaliteli fotoğraf arşivi ve baskı işlerinde tercih edilen bir bitmap formatıdır. Dosyalar büyük olabilir; çözünürlük ve sıkıştırma seçimini üretim ihtiyacına göre belirleyin. Vektör kaynak dosyanın yerine geçmez.'),
  ('GIF — Kısa animasyon','Basit ve kısa web animasyonları için kullanılabilir. Sınırlı renk paleti nedeniyle fotoğraf ve yumuşak renk geçişlerinde kalite kaybı görülebilir. Karmaşık hareketlerde video veya daha uygun bir animasyon formatı tercih edin.'),
 ],
 'en': [
  ('AI — Editable source','Adobe Illustrator’s native format preserves vector artwork, layers and editing information. Keep an AI master for future revisions. When sharing it, confirm that the recipient has compatible software and access to the fonts used.'),
  ('EPS — Vector exchange','EPS is used to exchange logos and illustrations between design and production applications. Modern transparency and effects may not reproduce consistently in every application. Check the output before delivery.'),
  ('SVG — Vector graphics for the web','SVG is suitable for scalable logos, icons and interface illustrations. Paths remain sharp when the display size changes. Remove unnecessary elements and check that text renders correctly before publishing.'),
  ('JPG — Photography','JPG is suitable for photographs that need a compact file size. Its lossy compression can reduce quality after repeated saves, so edit the master and export a final copy. JPG does not support a transparent background.'),
  ('PNG — Transparent digital graphics','PNG is useful for logos, screenshots and digital graphics that need transparency. It uses lossless compression, but large photographs can be heavier than equivalent JPG files. Export at the required dimensions to control file size.'),
  ('PDF — Sharing and print','PDF can preserve page layout while combining text, vector graphics and photographs in one document. For print, use the color profile, bleed and PDF standard requested by the printer. A PDF file is not automatically ready for production.'),
  ('TIFF — High-quality images','TIFF is a raster format used for high-quality image archives and print production. Files can be large, so choose resolution and compression settings for the intended output. It does not replace an editable vector master.'),
  ('GIF — Short animations','GIF can work for simple, short web animations. Its limited color palette can reduce quality in photographs and smooth gradients. For more complex motion, consider video or another suitable animation format.'),
 ]
}

def expand_formats(article,lang):
    extra='\n'.join(f'<h2>{html.escape(title)}</h2><p>{html.escape(text)}</p>' for title,text in FORMATS[lang])
    # Preserve all original text; insert the expanded guide before existing FAQs.
    faq=re.search(r'<h2>Frequently asked questions</h2>',article)
    if faq: return article[:faq.start()]+extra+article[faq.start():]
    return re.sub(r'(\s*</div>\s*</article>)$',lambda m:extra+m[1],article)

def article_schema(article,title,description,url,image,lang,list_route):
    graph=[{'@type':'Article','@id':url+'#article','headline':title,'description':description,
      'author':{'@type':'Person','name':'Elif Handegül Yılmaz','url':ORIGIN+'/'},
      'mainEntityOfPage':{'@type':'WebPage','@id':url},'image':image,'inLanguage':lang,'dateModified':MODIFIED},
      {'@type':'BreadcrumbList','itemListElement':[
        {'@type':'ListItem','position':1,'name':'Anasayfa' if lang=='tr' else 'Home','item':ORIGIN+('/' if lang=='tr' else '/en/')},
        {'@type':'ListItem','position':2,'name':'Blog','item':ORIGIN+list_route},
        {'@type':'ListItem','position':3,'name':title,'item':url}]}]
    questions=[]
    for faq in re.findall(r'<div class="faq-item">(.*?)</div>',article,re.S):
        question=re.search(r'<strong>(.*?)</strong>',faq,re.S)
        answer=re.search(r'<p>(.*?)</p>',faq,re.S)
        if question and answer:questions.append({'@type':'Question','name':plain(question[1]),'acceptedAnswer':{'@type':'Answer','text':plain(answer[1])}})
    if questions:graph.append({'@type':'FAQPage','@id':url+'#faq','inLanguage':lang,'mainEntity':questions})
    return json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False,indent=2).replace('</','<\\/')

documents={lang:source('blog/index.html' if lang=='tr' else 'en/blog/index.html') for lang in ('tr','en')}
cards={lang:re.findall(r'<a class="card".*?</a>',doc,re.S) for lang,doc in documents.items()}
articles={lang:re.findall(r'<article\b.*?</article>',doc,re.S) for lang,doc in documents.items()}
descriptions={lang:[plain(re.search(r'<p>(.*?)</p>',card,re.S)[1]) for card in items] for lang,items in cards.items()}
new_routes=[]
for lang,doc in documents.items():
    assert len(cards[lang])==len(articles[lang])==7
    list_route='/blog/' if lang=='tr' else '/en/blog/'
    other='en' if lang=='tr' else 'tr'
    slugs=TR if lang=='tr' else EN
    head=absolute_paths(doc.split('</head>')[0],list_route)
    header=absolute_paths(re.search(r'<header class="site-header">.*?</header>',doc,re.S)[0],list_route)
    footer=re.search(r'<footer>.*?</footer>',doc,re.S)[0]
    for index,(card,original) in enumerate(zip(cards[lang],articles[lang])):
        old_id=re.search(r'\bid="([^"]+)"',original)[1]
        title=plain(re.search(r'<h3>(.*?)</h3>',original,re.S)[1])
        route=list_route+slugs[index]+'/'
        tr='/blog/'+TR[index]+'/'
        en='/en/blog/'+EN[index]+'/'
        url=ORIGIN+route
        image_path=re.findall(r'url\("([^"]*topics/[^"]+)"\)',head)[index]
        # Social crawlers do not reliably render SVG; use the existing raster sprite for topic 7.
        if image_path.endswith('.svg'):image_path='/images/blog/blog-covers-sprite.webp'
        image=ORIGIN+image_path
        article=absolute_paths(original,list_route)
        article=re.sub(r'<(/?)h([345])\b',lambda m:'<'+m[1]+'h'+str(int(m[2])-2),article)
        if index==6:article=expand_formats(article,lang)
        article=image_dimensions(article)
        page_head=re.sub(r'<title>.*?</title>',lambda m:'<title>'+html.escape(title+' | Elif Handegül Yılmaz')+'</title>',head)
        page_head=re.sub(r'<meta name="description"[^>]*>',lambda m:'<meta name="description" content="'+html.escape(descriptions[lang][index],quote=True)+'">',page_head)
        page_head=re.sub(r'<link rel="canonical"[^>]*>',f'<link rel="canonical" href="{url}">',page_head)
        for code,target in [('tr',tr),('en',en)]:
            page_head=re.sub(r'<link rel="alternate" hreflang="'+code+r'"[^>]*>',f'<link rel="alternate" hreflang="{code}" href="{ORIGIN+target}">',page_head)
        values={'og:title':title,'og:description':descriptions[lang][index],'og:type':'article','og:url':url,'og:image':image,'twitter:title':title,'twitter:description':descriptions[lang][index],'twitter:image':image}
        for key,value in values.items():
            page_head=re.sub(r'(<meta (?:property|name)="'+re.escape(key)+r'" content=")[^"]*(">)',lambda m:m[1]+html.escape(value,quote=True)+m[2],page_head)
        page_head+='\n<link rel="stylesheet" href="/assets/blog-article.css?v=20261018-article-v1">\n<script type="application/ld+json">\n'+article_schema(article,title,descriptions[lang][index],url,image,lang,list_route)+'\n</script>\n'
        page_header=header
        page_header=re.sub(r'(<a class="back-link" href=")[^"]*(">).*?(</a>)',lambda m:m[1]+list_route+m[2]+('← Tüm yazılar' if lang=='tr' else '← All articles')+m[3],page_header)
        page_header=re.sub(r'(<a class="language-switch" href=")[^"]*',lambda m:m[1]+(en if lang=='tr' else tr),page_header)
        page_header=re.sub(r'aria-label="(?:Switch to English|Türkçe bloga geç)"','aria-label="'+('Read this article in English' if lang=='tr' else 'Bu yazıyı Türkçe oku')+'"',page_header)
        page_header=image_dimensions(page_header)
        home='/' if lang=='tr' else '/en/'
        contact='/#iletisim' if lang=='tr' else '/en/#contact'
        crumbs=f'<nav class="container article-breadcrumb" aria-label="'+('İçerik yolu' if lang=='tr' else 'Breadcrumb')+f'"><a href="{home}">'+('Anasayfa' if lang=='tr' else 'Home')+f'</a><span aria-hidden="true">/</span><a href="{list_route}">Blog</a><span aria-hidden="true">/</span><span aria-current="page">'+html.escape(title)+'</span></nav>'
        next_index=(index+1)%7
        next_title=plain(re.search(r'<h3>(.*?)</h3>',articles[lang][next_index],re.S)[1])
        next_url=list_route+slugs[next_index]+'/'
        next_label='Sonraki yazı: ' if lang=='tr' else 'Next article: '
        nav=f'<nav class="article-next" aria-label="'+('Yazı gezinmesi' if lang=='tr' else 'Article navigation')+f'"><a class="back-link" href="{next_url}">'+next_label+html.escape(next_title)+' →</a></nav>'
        cta='<aside class="article-cta"><p>'+('Projeniz için tasarım desteği mi arıyorsunuz?' if lang=='tr' else 'Looking for design support for your project?')+f'</p><a class="back-link" href="{contact}">'+('İletişime geçin →' if lang=='tr' else 'Get in touch →')+'</a></aside>'
        page=page_head+'</head>\n<body class="guide-page blog-article">\n'+page_header+'\n<main id="main-content">'+crumbs+'<section class="articles"><div class="container">'+article+nav+cta+'</div></section></main>\n'+footer+'\n</body>\n</html>\n'
        target=ROOT/route.lstrip('/')/'index.html';target.parent.mkdir(parents=True,exist_ok=True);target.write_text(page)
        new_routes.append((url,tr,en))
        # Retain the old fragment on its card so bookmarks still have a meaningful target without JS.
        replacement=card.replace('class="card"',f'class="card" id="{old_id}"',1).replace('href="#'+old_id+'"',f'href="{route}"',1)
        doc=doc.replace(card,replacement,1)
    doc=re.sub(r'\s*<section class="articles">.*?</section>', '',doc,flags=re.S)
    assert '<article' not in doc
    # Keep all original list styles and typography. Only give legacy fragment targets clearance below the sticky header.
    doc=doc.replace('</style>','  .card[id] { scroll-margin-top: 110px; }\n  </style>',1)
    (ROOT/list_route.lstrip('/')/'index.html').write_text(doc)

NS='http://www.sitemaps.org/schemas/sitemap/0.9'
XHTML='http://www.w3.org/1999/xhtml'
ET.register_namespace('',NS);ET.register_namespace('xhtml',XHTML)
tree=ET.ElementTree(ET.fromstring(source('sitemap.xml')))
urlset=tree.getroot()
pairs=[('/','/en/'),('/blog/','/en/blog/'),('/projeler/marka-kurumsal-kimlik/','/en/projects/brand-identity/'),('/projeler/marka-kurumsal-kimlik/sagligim-burada/','/en/projects/brand-identity/sagligim-burada/')]+[('/blog/'+tr+'/','/en/blog/'+en+'/') for tr,en in zip(TR,EN)]
mapping={route:pair for pair in pairs for route in pair}
for url,tr,en in new_routes:
    node=ET.SubElement(urlset,'{'+NS+'}url')
    ET.SubElement(node,'{'+NS+'}loc').text=url
    ET.SubElement(node,'{'+NS+'}lastmod').text=MODIFIED
for node in urlset:
    route=urlsplit(node.find('{'+NS+'}loc').text).path
    for code,target in zip(('tr','en'),mapping[route]):
        ET.SubElement(node,'{'+XHTML+'}link',{'rel':'alternate','hreflang':code,'href':ORIGIN+target})
ET.indent(tree,space='  ')
tree.write(ROOT/'sitemap.xml',encoding='UTF-8',xml_declaration=True)
print('Built 14 article pages, updated both lists and 22-URL bilingual sitemap.')
