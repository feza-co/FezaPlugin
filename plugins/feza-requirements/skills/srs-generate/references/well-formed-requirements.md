# İyi-Form Gereksinim Karakteristikleri (ISO/IEC/IEEE 29148:2018, Madde 5.2.5-5.2.6)

Üretilen her gereksinim aşağıdaki kriterlere uymak **zorundadır**. SRS'i bitirmeden önce bu listeye karşı self-check yap; uymayanı yeniden yaz.

## Bireysel Gereksinim Kriterleri (her tek FR/NFR için)

| Kriter | Anlamı | Kontrol sorusu |
|--------|--------|----------------|
| **Necessary** | Başka bir gereksinim tarafından karşılanmayan zorunlu yetenek/kısıt tanımlar. | Bu satırı silsem ürün eksilir mi? |
| **Appropriate** | Soyutlama seviyesine uygun, gereksiz tasarım kısıtı dayatmaz. | "Nasıl"a değil "ne"ye odaklı mı? |
| **Unambiguous** | Tek bir biçimde yorumlanabilir. | İki farklı geliştirici aynı şeyi mi anlar? |
| **Complete** | Ek bilgiye ihtiyaç duymadan yeteneği yeterince tanımlar. | Eksik koşul/aktör/girdi var mı? |
| **Singular** | Tek bir yetenek/kısıt/karakteristik ifade eder. | İçinde "ve / ayrıca / aynı zamanda" var mı? |
| **Verifiable** | Doğrulanabilir biçimde yapılandırılmıştır. | Test/inspection/demo/analysis ile kanıtlanabilir mi? |
| **Feasible** | Bütçe/zaman/teknoloji içinde gerçekleştirilebilir. | Tek başına mantıken yapılabilir mi? |
| **Conforming** | Şablon ve dil kurallarına uyar. | "shall" doğru kullanıldı mı? |

## Gereksinim Seti Kriterleri (tüm FR+NFR topluca)

| Kriter | Anlamı | Kontrol sorusu |
|--------|--------|----------------|
| **Complete** | TBD/TBS/TBR yok; tüm paydaş bakış açılarından gerekli yetenekleri kapsıyor. | Kalan TBD sayısı? Hepsi gerekçeli mi? |
| **Consistent** | Gereksinimler birbiriyle veya üst seviyeyle çelişmez. | Çakışan iki gereksinim var mı? |
| **Affordable** | Toplam maliyet gerçekçi. | Bütçe/efor üstü değil mi? |
| **Bounded** | Kapsam dışına taşmıyor. | Scope statement'ı aşan satır var mı? |

## Self-Check Akışı (skill çıktıyı bitirmeden önce)

1. Her FR/NFR için 8 bireysel kriteri zihinden geçir.
2. **Singular** ihlali en yaygın hata: cümlede "ve / ayrıca / yanı sıra" görürsen ikiye böl.
3. **Verifiable** kontrolü için her gereksinimin yanına Doğrulama Yöntemi (Test/Inspection/Demonstration/Analysis) öner.
4. Tüm sette **Complete + Consistent** kontrolü için kısa "Bilinen boşluklar" notu ekle.

## Yaygın Anti-Pattern'ler

- "Sistem **kullanıcı dostu** olmalıdır." → ölçülebilir değil. Yerine: "Sistem, ortalama bir kullanıcının 3 tıkta sipariş tamamlamasına olanak verecektir."
- "Sistem **hızlı** olacaktır." → Yerine: "Sistem, arama sonucunu 500 ms içinde döndürecektir."
- "Sistem güvenli olmalı **ve** ölçeklenebilir olmalıdır." → Singular ihlali; iki ayrı NFR yap.
- "Sistem mümkünse / belki / genellikle …" → "shall" mı "should" mı net değil; Language Guidelines'a bak.
