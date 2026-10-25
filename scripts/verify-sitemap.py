"""Validate sitemap, canonical, robots and reciprocal hreflang. No site writes.

python scripts/verify-sitemap.py
python scripts/verify-sitemap.py --live --output /tmp/sitemap-audit.json
Live mode requires curl and performs public GET requests only.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import tempfile
from urllib.parse import urlsplit
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'elifhandeyilmaz-tam-site-paketi'
ORIGIN = 'https://elifhandeyilmaz.com'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.canonical, self.alternates, self.robots = [], [], []
        self.lang = ''
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang', '')
        if tag == 'meta' and attrs.get('name', '').lower() in ('robots', 'googlebot'):
            self.robots.append(attrs.get('content', ''))
        if tag == 'link' and 'canonical' in attrs.get('rel', '').lower().split():
            self.canonical.append(attrs.get('href'))
        if tag == 'link' and 'alternate' in attrs.get('rel', '').lower().split() and 'hreflang' in attrs:
            self.alternates.append((attrs['hreflang'], attrs.get('href')))

    def data(self):
        return {'canonical': self.canonical, 'alternates': self.alternates, 'robots': self.robots, 'lang': self.lang}


def fetch(url):
    with tempfile.TemporaryDirectory() as directory:
        headers, body = Path(directory) / 'headers', Path(directory) / 'body'
        response = subprocess.run([
            'curl', '--silent', '--show-error', '--location', '--max-time', '35',
            '--max-redirs', '5', '--dump-header', str(headers), '--output', str(body),
            '--write-out', '%{json}', url,
        ], capture_output=True, text=True)
        try:
            info = json.loads(response.stdout)
        except ValueError:
            info = {}
        text = body.read_text(encoding='utf-8', errors='replace') if body.exists() else ''
        # curl writes each response header block, including proxy CONNECT and redirects.
        final_headers = headers.read_text().strip().split('\n\n')[-1] if headers.exists() else ''
        result = {
            'url': url, 'status': info.get('http_code'), 'final_url': info.get('url_effective'),
            'redirects': info.get('num_redirects'), 'content_type': info.get('content_type'),
            'curl_exit': response.returncode, 'error': response.stderr,
            'x_robots_tag': re.findall(r'^x-robots-tag:\s*(.*)', final_headers, re.I | re.M),
        }
        return result, text


def validate(sitemap, pages, robots):
    errors, rows = [], []
    entries = []
    assert sitemap.tag == '{%s}urlset' % NS['s'], 'Unexpected sitemap root/namespace'
    for node in sitemap.findall('s:url', NS):
        location = node.findtext('s:loc', namespaces=NS)
        links = [(link.get('hreflang'), link.get('href')) for link in node.findall('x:link', NS)]
        entries.append((location, links))
    urls = [url for url, _ in entries]
    if len(urls) != len(set(urls)):
        errors.append('Duplicate sitemap URLs')
    for url, links in entries:
        row_errors = []
        if not url or not url.startswith(ORIGIN + '/') or urlsplit(url).query or urlsplit(url).fragment:
            row_errors.append('Invalid sitemap URL')
        expected = dict(links)
        if len(expected) != len(links) or not {'tr', 'en'} <= expected.keys():
            row_errors.append('Missing/duplicate sitemap language')
        page = pages.get(url)
        if page is None:
            row_errors.append('Missing page')
        else:
            if page['canonical'] != [url]:
                row_errors.append('Canonical is missing, duplicated or not self-referencing')
            alt = dict(page['alternates'])
            if len(alt) != len(page['alternates']) or alt != expected:
                row_errors.append('HTML/sitemap hreflang mismatch or duplicate')
            language = 'en' if urlsplit(url).path.startswith('/en/') else 'tr'
            if page['lang'] != language or expected.get(language) != url:
                row_errors.append('Language/self-reference mismatch')
            for lang, target in links:
                peer = pages.get(target)
                if not target or not target.startswith(ORIGIN + '/') or peer is None or dict(peer['alternates']) != expected:
                    row_errors.append('Invalid or nonreciprocal alternate: ' + str(lang))
            directives = ','.join(page['robots'] + page.get('x_robots_tag', [])).lower()
            if re.search(r'\b(noindex|none)\b', directives):
                row_errors.append('Indexing blocked by meta/header')
            if 'status' in page and (page['status'] != 200 or page['curl_exit'] != 0 or page['final_url'] != url or page['redirects'] != 0 or 'text/html' not in (page['content_type'] or '')):
                row_errors.append('HTTP, redirect or content-type failure')
        allowed = robots.can_fetch('Googlebot', url or '/')
        if not allowed:
            row_errors.append('Googlebot blocked by robots.txt')
        rows.append({'url': url, 'googlebot_allowed': allowed, 'page': page, 'errors': row_errors})
        errors.extend(url + ': ' + message for message in row_errors)
    return rows, errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--live', action='store_true')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    source_sitemap = (ROOT / 'sitemap.xml').read_text()
    sitemap = ET.fromstring(source_sitemap)
    urls = [node.findtext('s:loc', namespaces=NS) for node in sitemap]
    resources = []
    if args.live:
        targets = urls + [ORIGIN + '/robots.txt', ORIGIN + '/sitemap.xml']
        with ThreadPoolExecutor(max_workers=6) as pool:
            responses = list(pool.map(fetch, targets))
        pages = {url: {**Page(text).data(), **info} for url, (info, text) in zip(urls, responses[:len(urls)])}
        resources = [info for info, _ in responses[len(urls):]]
        robots_text, live_sitemap = responses[-2][1], responses[-1][1]
        sitemap = ET.fromstring(live_sitemap)
    else:
        pages = {url: Page((ROOT / urlsplit(url).path.lstrip('/') / 'index.html').read_text()).data() for url in urls}
        robots_text = (ROOT / 'robots.txt').read_text()
    robots = RobotFileParser()
    robots.parse(robots_text.splitlines())
    rows, errors = validate(sitemap, pages, robots)
    if not re.search(r'^Sitemap:\s*' + re.escape(ORIGIN + '/sitemap.xml') + r'\s*$', robots_text, re.M | re.I):
        errors.append('robots.txt does not advertise sitemap.xml')
    if args.live:
        if live_sitemap.strip() != source_sitemap.strip():
            errors.append('Live sitemap differs from source')
        for resource in resources:
            if resource['status'] != 200 or resource['curl_exit'] != 0 or resource['redirects'] != 0:
                errors.append('Resource fetch failure: ' + resource['url'])
        if 'xml' not in (resources[-1]['content_type'] or ''):
            errors.append('Sitemap is not served as XML')
    report = {'checked_at_utc': datetime.now(timezone.utc).isoformat(), 'mode': 'live' if args.live else 'source', 'count': len(rows), 'rows': rows, 'resources': resources, 'errors': errors}
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'mode': report['mode'], 'count': len(rows), 'errors': errors}, ensure_ascii=False))
    return bool(errors)

if __name__ == '__main__':
    raise SystemExit(main())
