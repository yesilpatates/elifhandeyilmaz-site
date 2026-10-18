# Aşama 3 — Türkçe ve İngilizce blog yazılarının bağımsız URL’leri

Tarih: 18 Ekim 2026. Dal: `seo/technical-improvements-2026-10-18`.
Kaynak karşılaştırma commit’i: `81fdbc5ef7c1fa6a46c80e7f64e2e216c0a1a8c3`.

## Sonuç

7 Türkçe ve 7 İngilizce yazı, toplam 14 bağımsız statik HTML sayfasına taşındı. Blog ana sayfaları artık liste sayfası; kartlar ilgili yazının kendi URL’sine gidiyor. Sayfalar JavaScript olmadan okunabilir ve birbirine bağlanır.

| Türkçe URL | İngilizce URL |
|---|---|
| /blog/grafik-tasarim-nedir/ | /en/blog/what-is-graphic-design/ |
| /blog/grafik-tasarimin-temel-unsurlari/ | /en/blog/elements-of-graphic-design/ |
| /blog/grafik-tasarimin-temel-ilkeleri/ | /en/blog/principles-of-graphic-design/ |
| /blog/vektorel-ve-bitmap-farki/ | /en/blog/vector-vs-bitmap/ |
| /blog/rgb-cmyk-renk-bilgisi/ | /en/blog/rgb-cmyk-color-guide/ |
| /blog/tipografi-nedir/ | /en/blog/what-is-typography/ |
| /blog/dosya-formatlari-rehberi/ | /en/blog/design-file-formats/ |

## Sayfalara eklenen SEO ve gezinme yapıları

- Her yazıya özgü title, description, tek H1, canonical, Open Graph ve Twitter etiketleri.
- Karşılıklı, aynı yazıya giden TR/EN hreflang ve görünür dil geçişi.
- Article ve BreadcrumbList JSON-LD. Mevcut görünür soruların bulunduğu 13 yazıda, metinle eşleşen FAQPage verisi. Türkçe dosya formatları yazısında önceden soru-cevap yoktu; uydurma FAQ eklenmedi.
- Yayın tarihi kaynaktan doğrulanmadığı için datePublished eklenmedi. Gerçek içerik taşıma/güncelleme tarihi dateModified olarak kullanıldı.
- Blog listesine dönüş, sonraki yazı, ana sayfa ve iletişim bölümü bağlantıları. Son yazı serinin ilk yazısına bağlanır.
- Sitemap 8’den 22 URL’ye genişletildi. Tüm sitemap kayıtlarına HTML ile eşleşen TR/EN alternatif bağlantıları eklendi.

## İçerik ve tasarımın korunması

İki dildeki ilk altışar yazının metinleri, soru-cevapları ve görselleri korunarak taşındı. Kısa dosya formatları yazısı iki dilde AI, EPS, SVG, JPG, PNG, PDF, TIFF ve GIF için kullanım açıklamalarıyla genişletildi; eski metinleri de korundu.

Liste kartlarının metinleri, kapakları, sıralaması, boyut kuralları, renkleri, animasyonları ve fontları korundu. Liste altındaki tam yazılar ayrı sayfalara taşındığı için liste sayfasının toplam yüksekliği doğal olarak azaldı. Eski article id’leri kartlara verildi: örneğin `/blog/#tipografi` ilgili karta gider; kart yeni yazıya bağlanır. Fragment sunucuya ulaşmadığından HTTP 301 uygulanmadı, yönlendirme için JavaScript zorunluluğu oluşturulmadı.

Yeni sayfalar aynı kapak ve yazı stillerini kullanır. H3/H4/H5 yerine H1/H2/H3 semantiği uygulanırken eski yazı boyutları yalnızca yeni sayfalara yüklenen `assets/blog-article.css` ile eşlendi. Ana sayfa, mevcut portfolyo sayfaları, ortak CSS, animasyon betikleri, fontlar ve görsel dosyaları değiştirilmedi.

Taşınan yazılardaki 10 bilgi görseline gerçek PNG ölçüleri ile width/height, lazy ve async decoding eklendi. Yeni sayfa logolarına gerçek ölçüler eklendi; mevcut CSS gösterim ölçüleri korundu. İlk 6 konunun sosyal görseli kendi mevcut kapağıdır. Dosya formatları SVG kapağı görünür sayfada korundu; sosyal tarayıcılarda SVG desteği tutarlı olmadığı için o yazının OG/Twitter görselinde mevcut raster blog sprite’ı kullanıldı. Özel, iki dilli sosyal görsel üretimi sonraki görsel kontrol aşamasındadır.

## Test sonuçları

| Kontrol | Sonuç |
|---|---|
| `python scripts/verify-blog-migration.py` | Geçti |
| Yerel HTTP üzerinden tüm HTML URL’leri | 22/22 HTTP 200 |
| Yeni yazı sayfaları ve tekil başlık/açıklamalar | 14/14 geçti |
| H1 tekilliği ve başlık düzeyleri | 14/14 geçti |
| HTML canonical, OG URL ve sitemap URL eşleşmesi | 22/22 geçti |
| Karşılıklı hreflang ve dil hedefleri | Tüm 22 sayfada geçti |
| Article verisinin başlık, dil ve sayfa URL’si | 14/14 geçti |
| FAQ JSON-LD ile görünür soru-cevap eşleşmesi | 13/13 geçti |
| Eski makale metinleri ve soru-cevapların korunması | Geçti; iki dosya formatları yazısında eski metinlerin korunması + genişletme doğrulandı |
| Liste kartlarının içerik ve CSS koruması | 14 kartta geçti; yalnızca eski fragment hedefleri için scroll-margin kuralı eklendi |
| Eski fragment girişleri | 14/14 geçerli karta bağlanıyor |
| Yerel href/src ve CSS kapak görseli hedefleri | Eksik dosya bulunmadı |
| İç bölüm bağlantısı kimlikleri | Geçti; iletişim ve eski fragment hedefleri dahil |
| Sitemap XML, URL kapsamı ve dil alternatifleri | 22 kayıt; tam eşleşme |
| Bağımsız kaynak envanteri (`scripts/seo-source-audit.py`) | 22 HTML, eksik statik yerel hedef yok |
| Üretim betiğinin tekrar çalıştırılması | Aynı dosya içeriklerini üretiyor |
| `git diff --check` | Geçti |
| Gerçek mobil, font yükleme, ekran görüntüsü, animasyon ve PageSpeed | Çalıştırılmadı; Aşama 1’de açıklanan tarayıcı eksikliği sürüyor |

Yerel HTTP ve kaynak doğrulaması canlı sunucu yönlendirmesini veya gerçek tarayıcı görünümünü doğrulamaz. Rich Results Test ve Google indekslenmesi test edilmedi; geçerli JSON-LD, zengin sonuç gösterileceği garantisi değildir.

## Dosyalar ve yeniden kontrol

- 14 yeni `index.html`, iki blog listesinde güncelleme, sitemap güncellemesi.
- Yeni sayfalara özel `assets/blog-article.css`.
- Tekrarlanabilir taşıma betiği: `scripts/migrate-blog.py`. Kaynak olarak yukarıdaki sabit Git commit’ini okur; gelecekteki yazıları düzenlemek için tekrar çalıştırılmamalı, aksi hâlde bu aşamanın kaynak metnine dönülür.
- Kontrol betiği: `scripts/verify-blog-migration.py`. Aşama 3’ün 22 sayfalık durumuna göre tasarlanmıştır; yeni kategori sayfaları eklenince kapsam beklentisi güncellenmelidir.

```bash
python scripts/verify-blog-migration.py
python scripts/seo-source-audit.py > /tmp/seo-source-audit.json
git diff --check
```

## İçerik genişletmede kullanılan birincil kaynaklar

Dosya formatları açıklamaları Adobe’nin resmi belgeleriyle kontrol edildi:

- [Illustrator: Artwork saving and AI/EPS/SVG](https://helpx.adobe.com/illustrator/using/saving-artwork.html)
- [Illustrator: Supported file formats](https://helpx.adobe.com/illustrator/desktop/get-started/learn-the-basics/supported-file-formats.html)
- [Photoshop: Image file formats](https://helpx.adobe.com/uk/photoshop/desktop/save-and-export/export-files-to-different-formats/image-file-formats-supported-in-photoshop.html)
- [Photoshop: PNG and GIF](https://helpx.adobe.com/photoshop/desktop/save-and-export/save-files/save-in-png-and-gif-formats.html)
- [Photoshop: TIFF](https://helpx.adobe.com/photoshop/desktop/save-and-export/save-files/save-in-tiff-format.html)

## Sonraki aşama

Eksik portfolyo kategori ve proje detay sayfalarının TR/EN sürümleri oluşturulacak. Bu aşamada main’e birleştirme, canlı yayın, DNS değişikliği veya Search Console gönderimi yapılmadı.
