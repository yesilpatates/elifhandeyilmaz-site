# Aşama 4 — Portfolyo kategori ve seçili proje sayfaları

Tarih: 19 Ekim 2026. Kaynak sürüm: `a410bbc77f26afc86bc95a647049929fd81e1b67`.
Yedek dal: `backup/seo-before-portfolio-2026-10-19`.
Çalışma dalı: `seo/portfolio-pages-2026-10-19`.

## Yapılan çalışma

5 eksik kategorinin Türkçe ve İngilizce sayfaları oluşturuldu: toplam 10 yeni kategori sayfası. Var olan Marka & Kurumsal Kimlik kategori sayfaları korunarak PilavYeri detayı eklendi. Sağlığım Burada’nın mevcut detay sayfaları ve kategori kartları korundu.

| Kategori | Türkçe URL | İngilizce URL |
|---|---|---|
| Marka & Kurumsal Kimlik (mevcut) | /projeler/marka-kurumsal-kimlik/ | /en/projects/brand-identity/ |
| Editoryal | /projeler/editoryal/ | /en/projects/editorial/ |
| Etkinlik & Organizasyon | /projeler/etkinlik-organizasyon/ | /en/projects/events/ |
| Basılı & Dijital | /projeler/basili-dijital/ | /en/projects/print-digital/ |
| Web & Arayüz | /projeler/web-arayuz/ | /en/projects/web-interface/ |
| Video & Animasyon | /projeler/video-animasyon/ | /en/projects/video-motion/ |

Raporun önceliklendirdiği dört proje ve iki kategori örneği için 6 Türkçe + 6 İngilizce detay sayfası hazırlandı:

| Proje | TR kategori içindeki adres | EN kategori içindeki adres |
|---|---|---|
| PilavYeri | marka-kurumsal-kimlik/pilavyeri/ | brand-identity/pilavyeri/ |
| Yacht News Türkiye 60 | editoryal/yacht-news-turkiye-60/ | editorial/yacht-news-turkiye-60/ |
| 5. Türkiye Denizcilik Zirvesi | etkinlik-organizasyon/denizcilik-zirvesi/ | events/maritime-summit/ |
| Grand Seyahat afişi | basili-dijital/grand-seyahat-afis/ | print-digital/grand-seyahat-poster/ |
| SigortaGuru | web-arayuz/sigortaguru/ | web-interface/sigortaguru/ |
| Alfa Sigorta sağlık animasyonu | video-animasyon/alfa-sigorta/ | video-motion/alfa-sigorta/ |

TR adreslerinin ön eki `/projeler/`, EN adreslerinin ön eki `/en/projects/`.

Bu aşama seçili projeleri kapsar; galerilerdeki diğer her proje için ayrı detay sayfası üretilmiş değildir. Galerilerdeki tüm eski kayıtlar korunur. Yeni kategori sayfaları bu aşamada hazırlanan seçili detaylara bağlanır. Marka kategorisinde ayrıca mevcut Sağlığım Burada kaydı yer alır.

## İçerik ve SEO

- Metinler `content/portfolio-seo.json` içinde iki dilde tutulur; her projenin mevcut JS veri kaydı ve görsel kaynakları da burada belirtilir.
- Proje, yaklaşım ve sunum kapsamı açıklanır. Trafik artışı, satış, görüntülenme veya müşteri sonucu uydurulmadı. Kaynakta belirtilmeyen üretim yazılımları eklenmedi. WordPress bilgisi SigortaGuru’nun mevcut proje kaydından alındı.
- Yeni sayfalarda tek H1, özgün title/description, canonical, karşılıklı hreflang, OG/Twitter ve görünür breadcrumb bulunur.
- Yeni kategori sayfalarında CollectionPage/ItemList, yeni detaylarda CreativeWork ve BreadcrumbList JSON-LD kullanılır. Video için doğrulanamayan yayın tarihi/süre uydurularak VideoObject eklenmedi.
- Dergi PDF’si ve video, ziyaretçinin açıkça seçtiği bağlantılarla açılır. Yeni sayfalara otomatik PDF indirmesi veya YouTube iframe’i eklenmedi.
- Sitemap 22’den 44 URL’ye genişletildi. Yeni URL’lerin ve değişen ana sayfa/marka kategori sayfalarının lastmod değeri 2026-10-19. Dil alternatifleri HTML ile eşleşir.

## Mevcut davranış ve görsel düzen

- İki ana sayfanın görünür metinleri, kart içerikleri ve görselleri korundu.
- Kategori kartlarına statik bağlantılar eklendi. Mevcut sağ ok görseli, aynı sınıf ve konum kurallarıyla kategori sayfasını açan bir bağlantıya dönüştürüldü. Ok, galeri tıklama alanının üzerinde çalışır; ana kartın galeri davranışı korunur.
- Dört öne çıkan proje kartı aynı CSS sınıfları, çocuk öğeler ve veri nitelikleri korunarak doğal bağlantılara dönüştürüldü. TR galeri betikleri hazırken normal tıklama mevcut galeriyi açar. Ctrl/Cmd/Shift/Alt tıklamalarında doğal gezinme korunur. JavaScript yokken kartlar yeni proje sayfasına gider. EN’de daha önce galeri açmayan kartlar doğrudan detay sayfasını açar.
- Görseller, mevcut tipografi CSS’i, kart animasyonları ve galeri uygulaması yeniden tasarlanmadı. Betik değişiklikleri yalnızca dört öne çıkan bağlantının tıklama davranışı ve önbellek sürüm parametreleridir. Kategori oklarının galeri olayını tetiklememesi için küçük ve ayrı bir olay dinleyicisi eklendi.
- Yeni statik sayfalar mevcut `project-pages.css` ve `site-design-system.css` üzerine kuruldu; yeni metin/gezinme kuralları ayrı `portfolio-seo.css` içindedir. Ana sayfadaki ok bağlantısının katman/focus kuralları ayrı ve dar kapsamlı `portfolio-links.css` içindedir.

## Test sonuçları

| Kontrol | Sonuç |
|---|---|
| `python scripts/verify-portfolio-seo.py` | Geçti |
| HTML sayfa sayısı ve yerel HTTP erişimi | 44/44 HTTP 200 |
| Mevcut blog listeleri ve 14 yazının yayınlanan sürümle byte karşılaştırması | 16/16 değişmedi |
| Canonical, tek H1, title/description, OG/Twitter | 44 sayfada geçti |
| Karşılıklı TR/EN dil eşleşmesi | Tüm sayfalarda geçti |
| Kategori sayfaları | 6 kategori × 2 dil = 12 |
| Yeni proje detayları | 6 proje × 2 dil = 12 |
| CreativeWork adı/dili/URL ve kaynak kaydı | 12/12 geçti |
| İç bağlantılar, yerel dosya hedefleri, bölüm kimlikleri | Geçti |
| Ana sayfa yapısı ve görünür metin koruması | İki dilde geçti; yalnızca eklenen bağlantılar, kart etiketinin bağlantıya dönüşümü ve sürüm parametreleri normalleştirildi |
| Eski CSS ve bitmap/SVG dosyaları | Değişmedi |
| `node scripts/verify-portfolio-clicks.cjs` | 42 olay senaryosu geçti; mock testtir |
| Değişen JS dosyalarının sözdizimi | Geçti |
| Sitemap XML ve tam kapsam | 44 URL; 88 hreflang kaydı; HTML ile eşleşiyor |
| Üretim betiğinin tekrar çalıştırılması | Aynı dosya içeriklerini üretiyor |
| `git diff --check` | Geçti |
| Gerçek mobil görünüm, font yükleme, ekran görüntüsü, animasyon ve PageSpeed | Henüz çalıştırılamadı |

Kaynak/HTTP testleri piksel karşılaştırması veya gerçek tarayıcı etkileşimi yerine geçmez. Chromium indirmesi önceki aşamada başarısızdı; bu aşamada sistem paket yöneticisiyle kurulum hazırlığı da ortamın işlem yetkileri nedeniyle çalışmadı. Bu yüzden mobil ve hız testi başarılı olarak işaretlenmedi.

## Dış görsel sınırlaması

Alfa Sigorta kapağını mevcut YouTube küçük görselinden yerel WebP’ye dönüştürmek için iki adres denendi. İkisi de görsel yerine HTML döndürdüğü için yerel kapak dosyası oluşturulmadı; mevcut `i.ytimg.com` adresi korundu. Sağlığım Burada’nın mevcut Adobe sunum bağlantısı da korundu. Bu iki dış görselin yüklenmesi bu ortamda doğrulanmadı. Diğer yeni projeler mevcut yerel görselleri kullanır.

## Yeniden kontrol ve yayın durumu

```bash
python scripts/verify-portfolio-seo.py
node scripts/verify-portfolio-clicks.cjs
git diff --check
```

`scripts/build-portfolio-seo.py`, bu aşamanın sabit kaynak sürümünden üretim yapan bir taşıma betiğidir. Gelecekteki ana sayfa değişikliklerinden sonra yeniden çalıştırılması önceki metinlere döndürebileceği için genel içerik editörü olarak kullanılmamalıdır.

Hazır teknik SEO ve blog sürümü main dalında/canlıda kalır. Bu yeni portfolyo aşaması ayrı çalışma dalındadır; main birleştirmesi veya canlı yayın yapılmadı. Gerçek tarayıcı ve performans kontrolleri kalan işlerin parçasıdır.
