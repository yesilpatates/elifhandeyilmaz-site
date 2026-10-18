// Read-only source and local-browser baseline. Requires Playwright on NODE_PATH.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../elifhandeyilmaz-tam-site-paketi');
const output = path.resolve(process.env.SEO_BASELINE_OUTPUT || '/tmp/ehy-seo-baseline');
const origin = process.env.SEO_BASE_URL || 'http://127.0.0.1:8765';
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const pages = walk(root).filter(f => f.endsWith('.html')).sort();
(async () => {
  fs.mkdirSync(output, {recursive:true});
  const browser = await chromium.launch({headless:true});
  const results = {sourceRoot:path.basename(root), environment:'Local HTTP; external services blocked for reproducibility; timings are not production CWV', pages:[], browser:[]};
  const staticContext = await browser.newContext({javaScriptEnabled:false});
  for (const file of pages) {
    const route = '/' + path.relative(root,file).replaceAll(path.sep,'/').replace(/index\.html$/,'');
    const page = await staticContext.newPage();
    await page.route('**/*', r => new URL(r.request().url()).origin === origin ? r.continue() : r.abort());
    await page.goto(origin + route, {waitUntil:'domcontentloaded'});
    const data = await page.evaluate(() => {
      const meta = name => document.querySelector(`meta[name="${name}"],meta[property="${name}"]`)?.content || null;
      const json = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent)}catch(e){return {parseError:e.message}}});
      return {lang:document.documentElement.lang,title:document.title,description:meta('description'),canonical:document.querySelector('link[rel="canonical"]')?.href,
        alternates:[...document.querySelectorAll('link[hreflang]')].map(e=>({lang:e.hreflang,url:e.href})),
        og:Object.fromEntries(['og:title','og:description','og:url','og:type','og:image','og:locale','twitter:card'].map(n=>[n,meta(n)])),json,
        h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim().replace(/\s+/g,' ')),
        articles:[...document.querySelectorAll('article[id]')].map(e=>({id:e.id,words:e.textContent.trim().split(/\s+/).length})),
        links:[...document.querySelectorAll('a[href]')].map(e=>({href:e.getAttribute('href'),text:e.textContent.trim().slice(0,80)})),
        images:[...document.querySelectorAll('img')].map(e=>({src:e.getAttribute('src'),alt:e.getAttribute('alt'),width:e.getAttribute('width'),height:e.getAttribute('height'),loading:e.getAttribute('loading'),fetchpriority:e.getAttribute('fetchpriority')}))};
    });
    data.route = route;
    data.missingLocalTargets = data.links.filter(l=>!l.href.startsWith('#')).flatMap(l=>{
      const u = new URL(l.href,origin+route);
      if(![origin,'https://elifhandeyilmaz.com'].includes(u.origin))return [];
      let target = path.join(root,decodeURIComponent(u.pathname));
      if(u.pathname.endsWith('/'))target=path.join(target,'index.html');
      return fs.existsSync(target)?[]:[l];
    });
    results.pages.push(data);
    await page.close();
  }
  await staticContext.close();
  for(const width of [375,390,768,1440]) {
    const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
    for(const data of results.pages) {
      const page=await context.newPage(); const errors=[],httpErrors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)httpErrors.push({url:r.url(),status:r.status()})});
      await page.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
      await page.goto(origin+data.route,{waitUntil:'load'});
      await page.waitForTimeout(1200);
      const initial=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,
        fonts:document.fonts.status,cards:[...document.querySelectorAll('.ehy-pf-card')].map(e=>({title:e.querySelector('h3')?.textContent,hrefs:[...e.querySelectorAll('a')].map(a=>a.getAttribute('href')),role:e.getAttribute('role'),tabindex:e.getAttribute('tabindex')}))}));
      // Reveal sections and exercise lazy-loading without opening or submitting forms.
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,35))}scrollTo(0,0)});
      await page.waitForTimeout(400);
      const final=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,
        brokenLocalImages:[...document.images].filter(i=>i.src.startsWith(location.origin)&&i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'))}));
      if([390,1440].includes(width) && ['/','/en/','/blog/','/en/blog/'].includes(data.route)) {
        await page.screenshot({path:path.join(output,`${data.route.replaceAll('/','_')||'home'}-${width}.png`),fullPage:true,animations:'disabled'});
      }
      results.browser.push({route:data.route,width,initial,final,errors,httpErrors});
      await page.close();
    }
    await context.close();
  }
  fs.writeFileSync(path.join(output,'baseline.json'),JSON.stringify(results,null,2));
  await browser.close();
  console.log(JSON.stringify({pages:results.pages.length,browserChecks:results.browser.length,overflow:results.browser.filter(x=>x.final.scrollWidth>x.width).map(x=>({route:x.route,width:x.width,scrollWidth:x.final.scrollWidth})),jsErrors:results.browser.filter(x=>x.errors.length).map(x=>({route:x.route,width:x.width,errors:x.errors})),localHttpErrors:results.browser.filter(x=>x.httpErrors.length).map(x=>({route:x.route,width:x.width,errors:x.httpErrors})),output},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
