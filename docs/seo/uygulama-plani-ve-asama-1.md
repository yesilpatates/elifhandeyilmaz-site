# SEO uygulama planı ve Aşama 1 raporu

Tarih: 18 Ekim 2026. Kaynak: `elifhandeyilmaz-tam-site-paketi/`.
Karşılaştırılan rapor: **elifhandeyilmaz-seo-raporu.pdf**, 12 sayfa, 18 Ekim 2026.
Başlangıç commit: `67b4bebb9f856473dc5dfdedeaea6f4ee8c5696a`.

## Yayın ve tasarım sınırları

- Yedek dal: `backup/seo-before-2026-10-18`.
- Çalışma dalı: `seo/technical-improvements-2026-10-18`.
- Kullanıcı onayı olmadan main birleştirmesi, canlı yayın veya DNS değişikliği yapılmayacak.
- Mevcut animasyonlar, fontlar, ölçüler, kart kompozisyonları ve modal/galeri işlevleri korunacak.
- Her aşama ayrı commit ve test özetiyle kaydedilecek. CSS/JS değişiklikleri yalnızca doğrulanan gereksinim kadar yapılacak.
- Bu aşamada üretim klasöründe dosya değiştirilmedi. Eklenenler bu rapor, envanter ve kontrol betikleridir.

## Uygulama aşamaları

| Aşama | Yapılacak iş | Tamamlanma ölçütü |
|---|---|---|
| 1 | Rapor-kod karşılaştırması, yedek, dal, başlangıç envanteri | Yedek doğrulandı; mevcut SEO ve eksikler ayrıldı; test sınırları kaydedildi |
| 2 | Teknik SEO: OG/canonical tutarlılığı, sosyal etiketler, boş img src, alt metinler, URL normalleştirme | Metadata ve JSON ayrıştırma, mevcut işlevler, görünüm karşılaştırması |
| 3 | 7 Türkçe + 7 İngilizce yazıyı bağımsız statik sayfalara ayırma | Tekil title/description/H1/canonical; karşılıklı hreflang; tüm içerik/görseller ve sorular korunmuş |
| 4 | Eksik 5 kategorinin iki dili ve öne çıkan projelerin detayları | Kaynağa dayalı metinler; statik erişilebilir HTML; mevcut galeriler korunmuş; linkler çalışıyor |
| 5 | Yeni URL’leri sitemap, OG, dil geçişleri, iç bağlantılar ve breadcrumb ile birleştirme | Sitemap ile indekslenebilir sayfalar eşleşiyor; kırık link ve yanlış dil hedefi yok |
| 6 | Mobil, performans, görsel ve işlev kontrolleri; inceleme paketi | 375/390/768/1440 px testleri, menü/modallar/galeriler, önce-sonra ölçümleri ve onaya hazır diff |

Her aşamada statik tarama yeniden çalıştırılacak. Yeni bir URL oluşturulduğu aşamada ilgili canonical/hreflang/OG ve bağlantılar da eklenecek; 5. aşama bütünlük denetimidir.

## Rapor ile kaynak kodun karşılaştırılması

| Rapordaki konu | Kaynakta doğrulanan durum | İşlem |
|---|---|---|
| lang ve hreflang doğrulanamamış | 8/8 HTML’de doğru tr/en lang ve karşılıklı iki hreflang mevcut | Koru; yeni sayfalara aynı eşleme; x-default isteğe bağlı geliştirme, hata sayılmıyor |
| Person JSON-LD yoksa ekle | TR ve EN ana sayfada zaten var; JSON ayrıştırılıyor | Kopya ekleme; mevcut kişi bilgisi ve profilleri koru |
| title/description/canonical | 8/8 sayfada mevcut; canonical değerleri tekil ve / ile bitiyor | Koru |
| robots ve sitemap | robots taramaya açık, sitemap URL’si doğru; XML 8 mevcut sayfanın tamamını içeriyor | Koru, yeni sayfalarla genişlet; lastmod gerçek değişim tarihlerinden üretilecek |
| Blog tek sayfa | Her dilde 7 article aynı liste HTML’sinde; bağımsız yazı sayfası yok | 14 ayrı yazı URL’si oluştur |
| Eksik kategori ve proje sayfaları | Marka kategorisi ve Sağlığım Burada detayı iki dilde mevcut; diğer kategoriler statik HTML değil | Mevcut dört portfolyo URL’sini koru; eksik sayfaları ekle |
| Kartlar bağlantısız | TR ham HTML kategori kartlarında a yok; EN’de sadece marka kartında var | JavaScript modal davranışıyla birlikte ele al; görünümü değiştirmeden taranabilir linkler ekle |
| Öne çıkan dört proje | Ayrı HTML sayfaları yok; bazıları JavaScript ile galeri açıyor | “Hiç çalışmıyor” sayma; galeri işlevini koru, detay URL’si ekle |
| og:url/canonical farkı | TR ana sayfa og:url sonunda / yok; EN eşleşiyor | TR değerini canonical ile eşitle |
| Blog OG etiketleri | İki blogda da yok; mevcut portfolyo HTML’lerinde de yok | Sayfaya özgü OG ve Twitter etiketleri ekle |
| Paylaşım görseli | Ana sayfalar aynı hero.png kullanıyor; dosya 5.854.284 byte | Yerel, doğru oranlı paylaşım görselleri; mevcut görseli yeni görsel hazır olmadan silme |
| H1 önerisi | 8/8 sayfada tek H1 var; ana sayfa H1 slogan | H1 sayısı hatası yok. Görünür slogan ve kompozisyon korunacak; isim/unvan semantiği ayrıca değerlendirilecek |
| index.html bağlantıları | Blog ve TR portfolyo dahil bazı iç bağlantılar index.html kullanıyor | Klasör URL’lerine dönüştür; iç sayfadan # tek başına kullanma, doğru ana sayfa yolunu yaz |
| Sertifika altları | Ana sayfalarda 14’er sertifika aynı genel alt değerini kullanıyor | Her görselin kendi başlığına göre alt üret |
| Boş modal img src | İki ana sayfada src="" var | src niteliğini kaldır; açılırken mevcut JS’nin atamasını doğrula |
| Görsel boyutları/lazy | Ana sayfada 21 görselin 14’ü zaten lazy; yalnızca 1’inde HTML width/height var. Bloglarda 6’şar görselde lazy ve boyut yok | Çalışan lazy yapısını koru; gerçek oranla boyut ekle; üst ekran görsellerini tembel yükleme |
| Hero önceliği | İki ana sayfa hero’sunda fetchpriority yok | LCP ölçümüyle doğrula; doğru görsele öncelik ve görsel optimizasyonu uygula |
| E-posta | Görünür mailto bağlantısı yok; formsubmit.co/ajax formu mevcut | Formu koru; uygun erişilebilir mailto ekle. Gerçek mesaj gönderilmedi |
| Search Console | Kaynak koddan hesap kaydı veya indeks durumu belirlenemez | Kurulu değil diye raporlama; yayın sonrası yetkili hesapta doğrulanacak |
| Sertifika listesini azaltma | Raporun içerik/konumlandırma önerisi | Teknik hata değil; mevcut tasarım ve içerik kapsamını korumak için otomatik kaldırma yapılmayacak |

## Blog URL eşleştirmesi

| TR | EN |
|---|---|
| /blog/grafik-tasarim-nedir/ | /en/blog/what-is-graphic-design/ |
| /blog/grafik-tasarimin-temel-unsurlari/ | /en/blog/elements-of-graphic-design/ |
| /blog/grafik-tasarimin-temel-ilkeleri/ | /en/blog/principles-of-graphic-design/ |
| /blog/vektorel-ve-bitmap-farki/ | /en/blog/vector-vs-bitmap/ |
| /blog/rgb-cmyk-renk-bilgisi/ | /en/blog/rgb-cmyk-color-guide/ |
| /blog/tipografi-nedir/ | /en/blog/what-is-typography/ |
| /blog/dosya-formatlari-rehberi/ | /en/blog/design-file-formats/ |

Eski /blog/#... ve /en/blog/#... girişleri kaybedilmeyecek. Fragment sunucuya gönderilmediği için bunlara HTTP 301 tanımlanamaz; eski kimlikler liste kartlarında korunacak ve gerekiyorsa küçük bir istemci yönlendirmesi eklenecek. Yeni içerik ve bağlantılar JavaScript olmadan da bulunabilecek. FAQ işaretlemesi yalnızca sayfada görünen gerçek soru-cevaplarla eşleşecek. Yayın tarihleri uydurulmayacak. Dosya formatları yazısı mevcut kısa içeriği temel alınarak genişletilecek.

## Portfolyo URL eşleştirmesi

| TR kategori | EN kategori |
|---|---|
| /projeler/marka-kurumsal-kimlik/ (mevcut) | /en/projects/brand-identity/ (mevcut) |
| /projeler/editoryal/ | /en/projects/editorial/ |
| /projeler/etkinlik-organizasyon/ | /en/projects/events/ |
| /projeler/basili-dijital/ | /en/projects/print-digital/ |
| /projeler/web-arayuz/ | /en/projects/web-interface/ |
| /projeler/video-animasyon/ | /en/projects/video-motion/ |

İlk detay sayfaları raporda adı geçen PilavYeri (marka), Denizcilik Zirvesi (etkinlik), Alfa Sigorta (video) ve SigortaGuru (web) olacak; TR ve EN birlikte hazırlanacak. Sağlığım Burada’nın mevcut detay URL’leri korunacak. Diğer proje ayrıntıları JS veri dosyalarındaki doğrulanabilir bilgi ve mevcut görsellerden üretilecek. Müşteri sonuçları, teslim kapsamı, kullanılan yazılımlar veya ticari başarılar kaynak olmadan yazılmayacak; metin uzunluğu için bilgi uydurulmayacak.

## Aşama 1 doğrulama sonuçları

| Kontrol | Sonuç |
|---|---|
| Git nesne bütünlüğü (git fsck --full) | Geçti |
| Tam başlangıç sürümü arşivi | Oluşturuldu; 220 takipli dosya (dizinlerle 250 arşiv girdisi) |
| Arşiv SHA-256 | a3d318f30349a9920206a557bdd293ca4eff68af857d9d603cb9441297195f98 |
| Statik HTML envanteri | 8 sayfa tarandı |
| Title, description, tek H1, tek canonical | 8/8 geçti |
| Doğru lang, karşılıklı hreflang hedefleri | 8/8 geçti |
| JSON-LD JSON sözdizimi | Mevcut iki blok geçti; Schema.org/Google uygunluğu testi değildir |
| Statik yerel link, script, CSS ve görsel hedefleri | Eksik hedef bulunmadı; dinamik JS hedefleri ve dış servisler dahil değildir |
| Sitemap XML ve mevcut canonical kapsamı | Geçti; 8/8 tam eşleşme |
| Kaynak klasörü dosya içeriklerinin başlangıç sürümüyle karşılaştırması | İçerik değişikliği yok; takipli kaynak dosyaları korunuyor |
| Tarayıcı kontrol betiği JS sözdizimi | node --check geçti |
| Gerçek mobil, taşma, animasyon ve ekran görüntüsü kontrolü | Çalıştırılamadı: tarayıcı yürütülebilir dosyası yok; kurulum arşivi indirilemedi |
| Canlı PageSpeed / LCP / INP / CLS | Ölçülmedi; skor belirtilmiyor |
| Canlı form teslimi / WhatsApp paylaşımı / Search Console | Test edilmedi; dışarıya mesaj veya form gönderilmedi |

`baseline/source-audit.json` mevcut metadata, görsel nitelikleri, sitemap ve kaynak SHA-256 envanterini içerir.

Yeniden çalıştırma:

```bash
python scripts/seo-source-audit.py > /tmp/seo-source-audit.json
python -m http.server 8765 --directory elifhandeyilmaz-tam-site-paketi
# Ayrı terminalde; playwright ve Chromium kurulumu gerekir:
SEO_BASELINE_OUTPUT=/tmp/ehy-seo-baseline node scripts/seo-baseline.cjs
```

Tarayıcı betiği dış servisleri engeller; yerel kontroller ve ekran görüntüleri içindir. Bu betikten canlı hız skoru veya gerçek kullanıcı Core Web Vitals sonucu çıkarılmayacak. Google Fonts ve dış görseller erişilebilir olduğunda ayrıca gerçek görünüm kontrolü gerekir. Mevcut engel nedeniyle ekran görüntüsü referansları henüz oluşturulmadı; tasarıma etki edebilecek değişikliklerden önce tamamlanmalı.

## Sonraki işlem

Aşama 2: önce metadata, URL normalleştirme, sertifika altları ve boş src gibi görünümü etkilemeyen doğrulanmış sorunlar düzeltilecek. Hero sıkıştırma ve görünür DOM değişiklikleri öncesinde tarayıcıyla görsel referans oluşturulacak. Her aşama sonunda değişen dosyalar, geçen/başarısız/çalıştırılamayan kontroller ve kalan işler raporlanacak. Main ve canlı yayın kullanıcı onayına kadar bekleyecek.
