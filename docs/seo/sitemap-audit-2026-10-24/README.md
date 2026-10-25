# Sitemap ve teknik SEO denetimi — 24 Ekim 2026

Depo: `yesilpatates/elifhandeyilmaz-site`  
Kaynak: `elifhandeyilmaz-tam-site-paketi/`  
Başlangıç main commit: `de787184ca9c42e4dfd758e961ba9cf06c33c796`  
İnceleme branch’i: `seo/sitemap-audit-2026-10-24`

## Sonuç

22 sitemap URL’sinin tamamı canlıda doğrudan HTTP 200 dönüyor; her biri kendi adresini canonical olarak bildiriyor. 11 Türkçe/İngilizce çiftinde HTML ve XML hreflang değerleri aynı, kendine referanslı ve karşılıklı. Teknik indekslenebilirlik denetiminde engel bulunmadı. Gerçek Google indeks durumu ve Google’ın seçtiği canonical Search Console erişimi olmadan doğrulanamaz.

Düzeltme gerektiren hata bulunmadığı için site dosyaları, sitemap, robots.txt, tasarım, metinler, CSS, JavaScript ve çalışan özellikler değiştirilmedi. Branch yalnızca rapor, test sonuçları ve yeniden çalıştırılabilir denetim scripti içerir. Main’e birleştirme ve canlı yayın yapılmadı.

## URL bazında canlı sonuçlar

Tüm adresler `https://elifhandeyilmaz.com` altındadır. “Uygun” teknik indekslenebilirlik anlamındadır; Google’da indekslendiği anlamına gelmez.

| Yol | HTTP | Yönlendirme | Canonical | TR/EN hreflang | İndekslenebilirlik |
|---|---|---|---|---|---|
| `/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/projeler/marka-kurumsal-kimlik/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/projeler/marka-kurumsal-kimlik/sagligim-burada/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/projects/brand-identity/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/projects/brand-identity/sagligim-burada/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/grafik-tasarim-nedir/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/grafik-tasarimin-temel-unsurlari/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/grafik-tasarimin-temel-ilkeleri/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/vektorel-ve-bitmap-farki/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/rgb-cmyk-renk-bilgisi/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/tipografi-nedir/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/blog/dosya-formatlari-rehberi/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/what-is-graphic-design/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/elements-of-graphic-design/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/principles-of-graphic-design/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/vector-vs-bitmap/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/rgb-cmyk-color-guide/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/what-is-typography/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |
| `/en/blog/design-file-formats/` | 200 | 0 | Kendisi | Doğru/karşılıklı | Uygun |

## Kaynak ve canlı kontroller

- Sitemap: 22 benzersiz mutlak HTTPS URL; kaynak HTML sayfalarının tamamını kapsıyor.
- Her sayfada tek canonical; diline uygun `html lang`; doğru TR ve EN hedefleri.
- Meta robots/googlebot ve HTTP X-Robots-Tag üzerinde `noindex`/`none` engeli yok.
- Canlı robots.txt üzerinden Googlebot’a 22 URL’nin tamamı açık.
- `https://elifhandeyilmaz.com/robots.txt`: 200, yönlendirme yok, text/plain; doğru Sitemap bildirimi var.
- Canlı robots.txt, depodaki 73 baytlık dosyaya ek olarak Cloudflare tarafından yönetilen bot kuralları içeriyor. Googlebot engellenmiyor. Bu ayarlar değiştirilmedi.
- `https://elifhandeyilmaz.com/sitemap.xml`: 200, yönlendirme yok, application/xml; canlı XML kaynak dosyayla aynı.
- Olmayan `/seo-audit-nonexistent-20261024/` adresi 404 dönüyor; test edilen adreste ana sayfa fallback/soft-404 belirtisi yok.
- `lastmod` değerleri 2026-10-18 olarak bırakıldı. Sayfa içeriği değişmeden topluca yeni tarih yazılmadı.
- `x-default` bulunmaması hata olarak değerlendirilmedi; mevcut TR/EN haritaları geçerli.

## Testler

```bash
python scripts/verify-sitemap.py --output /tmp/source.json
python scripts/verify-sitemap.py --live --output /tmp/live.json
```

- Kaynak denetimi: 22/22, hata yok.
- İlk bağımsız canlı denetim: 22/22, hata yok; tüm curl istekleri çıkış kodu 0.
- Commit edilen script ile canlı tekrar denetimi: 22/22, hata yok (`live.json`).
- Scriptin bozuk noindex, yinelenen canonical ve eksik hreflang örneklerini yakaladığı geçici bellek testleriyle doğrulandı.
- İncelenen kaynak dosyalarının içerikleri başlangıç GitHub sürümüyle karşılaştırıldı; site kaynaklarında değişiklik yapılmadı.

## Search Console — erişim sınırı ve gerekli işlemler

Search Console için bağlı bir API/connector bulunamadı. Tarayıcıda `https://search.google.com/search-console` adresi oturum açma bağlantıları bulunan `/search-console/about` sayfasına yönlendirdi. Mülk yetkisi, önceki sitemap gönderimi, son okunma zamanı, Google’ın keşfettiği URL sayısı ve indeks durumları doğrulanamadı. Yeni gönderim yapılmadı.

Kullanıcının kendi yetkili hesabında yapacağı işlemler:

1. Search Console’da `elifhandeyilmaz.com` mülkünü seç. Mülk yoksa alan adını ekleyip gösterilen DNS TXT kaydıyla doğrula.
2. **Site haritaları** bölümünde `https://elifhandeyilmaz.com/sitemap.xml` kaydının durumunu ve son okunma tarihini kontrol et.
3. Kayıt yoksa bu sitemap adresini gönder; durumun başarılı olduğunu ve keşfedilen URL sayısını kontrol et. Keşfedilen sayısı hemen 22 olmayabilir; bu değer indekslenmiş sayfa sayısı değildir.
4. **URL Denetimi** ile ana sayfa, `/en/`, `/blog/` ve bir TR/EN makale çiftinde canlı testi, indeks durumunu ve Google’ın seçtiği canonical’i kontrol et.

## Kapsam sınırı

Bu çalışma mevcut 22 URL’nin teknik taranabilirliği ve dil eşleşmeleri içindir. Yeni portfolyo sayfası, içerik üretimi, performans veya görsel tasarım değişikliği yapılmadı. Search Console ve gerçek Googlebot tarama günlükleri olmadan Google’a özel sunucu davranışı ve Google indeks durumu doğrulanmış kabul edilmez.

## Başvuru belgeleri

- Google hreflang kuralları: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google sitemap yönergeleri: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## 25 Ekim 2026 — Search Console erişimi ve kapsam dışı URL incelemesi

Önceki “Search Console erişilemedi” notu ilk denetim anını anlatır. Bu takipte güvenli oturum açıldı ve `sc-domain:elifhandeyilmaz.com` mülkündeki gerçek örnek URL listeleri okundu. Arayüzdeki raporun son güncellemesi hâlâ **16.10.2026**: 6 indekslenen, 10 kapsam dışı URL. Bu sayılar yeni 22 URL sitemap’in güncel indekslenme oranı olarak kullanılmamalıdır.

### Search Console’dan alınan 10 adres ve canlı GET testi

| Search Console nedeni | Örnek URL | Canlı son adres | Son HTTP | Canonical |
|---|---|---|---|---|
| Yönlendirmeli sayfa | https://elifhandeyilmaz.com/index.html | https://elifhandeyilmaz.com/ | 200 | https://elifhandeyilmaz.com/ |
| Yönlendirmeli sayfa | https://www.elifhandeyilmaz.com/index.html | https://www.elifhandeyilmaz.com/ | 200 | https://elifhandeyilmaz.com/ |
| Yönlendirmeli sayfa | http://elifhandeyilmaz.com/index.html | http://elifhandeyilmaz.com/ | 200 | https://elifhandeyilmaz.com/ |
| Yönlendirmeli sayfa | http://elifhandeyilmaz.com/blog/index.html | http://elifhandeyilmaz.com/blog/ | 200 | https://elifhandeyilmaz.com/blog/ |
| Yönlendirmeli sayfa | https://www.elifhandeyilmaz.com/blog/index.html | https://www.elifhandeyilmaz.com/blog/ | 200 | https://elifhandeyilmaz.com/blog/ |
| Alternatif canonical | http://www.elifhandeyilmaz.com/ | http://www.elifhandeyilmaz.com/ | 200 | https://elifhandeyilmaz.com/ |
| Alternatif canonical | http://elifhandeyilmaz.com/ | http://elifhandeyilmaz.com/ | 200 | https://elifhandeyilmaz.com/ |
| Alternatif canonical | https://www.elifhandeyilmaz.com/ | https://www.elifhandeyilmaz.com/ | 200 | https://elifhandeyilmaz.com/ |
| Alternatif canonical | http://elifhandeyilmaz.com/blog/ | http://elifhandeyilmaz.com/blog/ | 200 | https://elifhandeyilmaz.com/blog/ |
| Alternatif canonical | http://www.elifhandeyilmaz.com/en/ | http://www.elifhandeyilmaz.com/en/ | 200 | https://elifhandeyilmaz.com/en/ |

Tüm GET istekleri curl çıkış kodu 0 ile tamamlandı. İlk 5 adres birer yönlendirme ile `index.html` içermeyen adrese ulaştı; son 5 adres yönlendirmesiz 200 döndü.

**Değerlendirme:** Listeler ayrı içeriklerin kaybını değil, ana sayfa/blog/İngilizce ana sayfanın URL varyantlarını gösteriyor. Hepsinde beklenen canonical var; bunların ayrıca indekslenmesini istemek gerekmiyor. Bu sonuç Google’ın sitemap’teki tüm 22 URL’yi indekslediği anlamına gelmez.

**Ek teknik iyileştirme:** HTTP ve www varyantları canlı testte kendi adreslerinde 200 dönebiliyor. Canonical sinyali mevcut olsa da, kullanımdan kaldırılacak bu varyantları yol ve sorgu parametrelerini koruyarak HTTPS + www’siz adrese 301/308 yönlendirmek tutarlılığı artırır. Bu, önceki 22 canonical sitemap URL denetiminin dışındaki varyantlarda bulunan bir iyileştirmedir.

### Yayın öncesi uygulanabilecek yönlendirme planı

- Kapsam yalnızca `elifhandeyilmaz.com` ve `www.elifhandeyilmaz.com` hostları.
- HTTP isteklerini HTTPS’ye, www hostunu www’siz hosta kalıcı yönlendir.
- Yolu ve sorgu parametrelerini koru. Mevcut `index.html` temizleme davranışını ve son slash düzenini bozma.
- Ana sayfa, `/blog/`, `/en/`, `index.html` varyantları ve sorgulu bir URL ile test et.
- Hedef canonical URL’ler doğrudan 200 dönmeli; döngü veya yanlış yola yönlendirme olmamalı.
- Hosting/Cloudflare ayarları incelenip uygulama tercihi doğrulanmadan repo içine rastgele `_redirects` veya Worker kodu eklenmedi.
- **Bu plandaki yönlendirme değişiklikleri uygulanmadı. Kullanıcı onayı olmadan production değiştirilmeyecek.**

Sitemap gönderim ve başarılı işleme sonucu, kullanıcının 25.10.2026 ekran görüntülerinde 22 keşfedilen sayfa ile doğrulandı. Bu takipte sitemap tekrar gönderilmedi; “Düzeltmeyi doğrula”, indeksleme talebi, main birleştirmesi veya canlı yayın işlemi yapılmadı.
