# Aşama 2 — Teknik SEO düzeltmeleri

Tarih: 18 Ekim 2026. Dal: `seo/technical-improvements-2026-10-18`.
Karşılaştırma sürümü: `911daac6691bd18075aee48f5e2ffc0f12315151`.

## Yapılan değişiklikler

- Türkçe ana sayfanın og:url değeri canonical ile eşitlendi.
- Mevcut 8 HTML sayfasında OG başlık, açıklama, tür, URL, görsel ve TR/EN locale etiketleri tamamlandı. Twitter card, başlık, açıklama ve görsel etiketleri eklendi. Mevcut ana sayfa paylaşım başlıkları ve görselleri korundu; blog için mevcut ilk yazı kapağı, marka sayfaları için mevcut Sağlığım Burada görseli kullanıldı. Yeni bir paylaşım görseli üretilmedi.
- İki ana sayfadaki 28 sertifika görseline kendi eğitim başlıklarına ve diline uygun alt metin verildi.
- 8 HTML dosyası tarandı; bulunan index.html bağlantıları klasör URL’lerine çevrildi. Bağlantıların mevcut sayfa/bölüm hedefleri korundu.
- Sertifika pencerelerindeki boş img src niteliği kaldırıldı. TR kapanışında src boşaltmak yerine niteliği kaldırma uygulandı; EN kapanışına aynı temizlik eklendi. Açma işlevinin gerçek görsel adresini ataması korundu. İki ilgili JS dosyasının HTML’deki sürüm parametresi güncellendi.
- Metadata’sı değişen 8 sayfanın sitemap lastmod tarihleri 2026-10-18 olarak güncellendi; mevcut URL listesi korundu.

## Korunan yapılar

Title, meta description, H1, canonical, hreflang ve mevcut iki Person JSON-LD bloğu korundu. Görünür metinler, kartlar, sertifika listesi, formlar, modal yapıları, CSS, tipografi, görseller ve animasyon uygulamaları değiştirilmedi. Yalnızca sertifika görselinin src yaşam döngüsünü düzelten iki JS değişikliği yapıldı.

## Kontrol sonuçları

| Kontrol | Sonuç |
|---|---|
| Metadata ve koruma betiği (`python scripts/verify-technical-seo.py`) | Geçti, 8/8 sayfa |
| Canonical ile og:url eşitliği | 8/8 geçti |
| OG ve Twitter etiketlerinin tekil ve dolu olması | 8/8 geçti |
| OG/Twitter görsellerinin HTTPS ve mevcut yerel dosya olması | 8/8 geçti |
| Title, description, H1, canonical, hreflang ve Person JSON-LD’nin önceki sürümle eşleşmesi | Geçti |
| Body yapısı ve görünür metinlerin önceki sürümle karşılaştırılması | Geçti; izin verilen href, alt, src ve betik sürümü değişiklikleri dışında fark yok |
| Sertifika alt metinleri | Her dilde 14 farklı alt; toplam 28 |
| Boş img src ve index.html içeren a bağlantıları | Hiçbiri kalmadı |
| Sitemap XML kapsamı ve karşılıklı hreflang | 8 URL ile tam eşleşme; geçti |
| Statik yerel dosya hedefleri ve iç bağlantı fragment kimlikleri | Geçti |
| TR/EN sertifika açma, kapama, yeniden açma, src temizliği | Mock DOM ile iki betikte geçti; gerçek tarayıcı testi değildir |
| İki değişen JS dosyasında node --check | Geçti |
| git diff --check | Geçti |
| Gerçek tarayıcı, mobil görünüm, animasyon ve performans testi | Henüz çalıştırılamadı; Aşama 1’deki tarayıcı eksikliği devam ediyor |

Kaynak taraması: `python scripts/seo-source-audit.py`. Tarayıcı kontrolleri için hazırlanan `scripts/seo-baseline.cjs` henüz çalıştırılamadı. Kaynak yapısının korunması, gerçek tarayıcıda piksel karşılaştırması yerine geçmez.

## Sonraki aşamalar ve sınırlar

Sonraki işlem, TR/EN blog içeriklerini bağımsız URL’lere taşımaktır. Yeni yazı ve proje sayfaları bu commit’te oluşturulmadı. Hero sıkıştırma, görsel boyutları/yükleme optimizasyonu, özel paylaşım görselleri ve görünür mailto bağlantısı gibi görünümü etkileyebilecek işler tarayıcı referansı ve sonraki kontrollerle ele alınacak. Search Console, canlı form teslimi ve gerçek paylaşım önizlemesi test edilmedi. Dışarıya mesaj/form gönderilmedi.

Değişiklikler çalışma dalına kaydedilir. Kullanıcı onayı olmadan main birleştirmesi veya canlı yayın yapılmaz.
