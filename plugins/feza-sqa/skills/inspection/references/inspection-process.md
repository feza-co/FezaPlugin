# Inspection Process Reference (IEEE 1028-2008)

## IEEE 1028 Review Tipleri

| Tip | Purpose | Method | Participants | Performed on | Expected Results |
|-----|---------|--------|---------------|---------------|-------------------|
| **Management Review** | Ilerleme, plan/takvim ve surec etkinligini izle | Durum sunumu | Management + PM | Plans, schedules | Status, action items |
| **Technical Review** | Teknik uygunlugu degerlendir | Uzman incelemesi | Tech leads | Design, Architecture | Issues list |
| **Walkthrough** | Ara/son urunu degerlendir, izleyiciyi bilgilendir | Yazarin sunumu | Author (sunan) + Domain Engineers + Customers | Reqts / Design / Project Plan | Issues List, Recommendations |
| **Audit** | Standart/yonetmelik/plan/prosedurlere bagimsiz uyum degerlendirmesi | Dis ekip degerlendirmesi | External Team of Experts | Reqts / Architecture / Design / Project Plan | Issues List, Recommendations |
| **Inspection** | Urun anomalilerini tespit et ve tanimla | Toplanti oncesi inceleme + toplantida satir satir okuma | Moderator / Author / Reader / Recorder / Inspectors (yonetim yok) | Reqts / Design / Code | Issues List, Acceptance Form |

> **Kritik kural:** Inspection'a yonetim katilmaz. Yonetici varsa degerlendirilme baskisi olusur ve gercek bulgular dile gelmez. (Fagan 1976; Gilb & Graham 1993 ile uyumlu.)

## Inspection Adimlari (IEEE 1028 + Fagan metodu)

### Plan
- Moderator ve Author inspection ekibini secer
- Moderator gereken sureyi belirler ve toplantilari planlar
- Author inspection materyalini dagitir

### Overview (Optional)
- Author materyale genel bakis sunar
  - Format
  - Organization
  - Contents

### Prepare
- Inspectors materyali bireysel olarak calisir ve yorumlarini isaretler
- Moderator toplanti odasini ayirir ve inspection formlarini hazirlar

### Meeting
- Moderator ekibin hazirlik suresini kaydeder
- Reader ekibi materyal boyunca yonlendirir
- Inspectors bulgulari bildirir
- Recorder her bulguyu severity ve category ile kaydeder
- Moderator tartismalari kisa tutar

### Rework
- Author gerekli duzeltmeleri yapar
- Moderator degisiklikleri inceler ve kabul eder

### Report
- Moderator gerekli formlari doldurur ve QA ekibine iletir
- Moderator sonucu Project Manager'a bildirir

## 5 Rol

| Rol | Asama | Sorumluluk |
|-----|-------|------------|
| **Moderator** | Hepsinde | Yonetir, sure takibi, tartisma kontrolu |
| **Author** | Plan + Overview + Rework | Materyali hazirlar, sunar, duzeltir |
| **Reader** | Meeting | Materyali sirayla okur, ekibi yonlendirir |
| **Recorder** | Meeting | Bulgu kaydi (severity + category) |
| **Inspectors** | Prepare + Meeting | Inceler, bulgu bildirir |

## 9 Boyutlu Inspection Cetveli

IEEE 830 / ISO/IEC/IEEE 29148'deki "iyi gereksinim" nitelikleri ve IEEE 1028 inceleme pratigi temel alinmistir. Asagidaki sorular gereksinim dokumani icin tipiktir; diger materyallerde uyarlanir.

### 1. Conformance — Standartlara uygunluk
- Dokuman proje sablon ve standartlarina uyuyor mu?
- Dogru arac/format kullanilmis mi?
- Icindekiler tablosu var mi?
- Sekil ve tablo listesi var mi?

### 2. Editorial — Yazim ve format
- Yazim denetimi yapildi mi?
- Bolum numaralari tutarli mi?
- Sekil ve tablo numaralari dogru mu?
- Capraz referanslar dogru mu?
- Dil seviyesi hedef okuyucuya uygun mu?
- Sekiller baskida/PDF ciktisinda okunuyor mu?

### 3. Completeness — Tamlik
- Dokuman tasarima baslamak icin yeterli bilgi veriyor mu?
- Her gereksinimin onceligi belirtilmis mi?
- Tum arayuzler tanimli mi?
- Tum musteri ve sistem ihtiyaclari kapsanmis mi?
- Performans hedefleri belirtilmis mi?
- Hata durumlari ve beklenen davranis listelenmis mi?
- Gereksinimler proje kapsamini karsiliyor mu?
- Kapsam disi gereksinim var mi?

### 4. Correctness — Dogruluk
- Birbiriyle celisen gereksinim var mi?
- Hata mesajlari anlamli mi?
- Her gereksinim gercek bir ihtiyaca karsilik geliyor mu?

### 5. Accuracy — Kesinlik
- Her gereksinim ihtiyaci eksiksiz tanimliyor mu?
- Varsayim ve kisitlar yazilmis mi?
- "Uygun", "yeterli" gibi belirsiz ifadeler yerine olculebilir tanimlar var mi?

### 6. Clarity — Netlik
- Her gereksinim tek bir sekilde yorumlanabiliyor mu?
- Her gereksinim acik ve anlasilir mi?

### 7. Testability — Test edilebilirlik
- Her gereksinim icin bir test tasarlanabilir mi?

### 8. Usability — Kullanilabilirlik
- Her gereksinim kullanilabilir bir islevi tarif ediyor mu?
- Insan faktorleri (otomatik doldurma, tarih secici, baglama duyarli yardim) dusunulmus mu?

### 9. Traceability — Izlenebilirlik
- Her gereksinim benzersiz tanimlanmis mi?
- Her gereksinim ust duzey bir ihtiyaca veya hedefe izlenebilir mi?

## Severity

| Severity | Tanim | Aksiyon |
|----------|-------|---------|
| **Critical** | Uygulanirsa sistemde buyuk bir hataya yol acar | Reinspect zorunlu |
| **Major** | Uygulanirsa hataya yol acar veya sistemi kullanmayi zorlastirir | Rework verification |
| **Minor** | Kozmetik / workaround mevcut | Accept with no/minor rework |

## Acceptance Form Decisions (IEEE 1028 exit kriterleri)

- Accept with **no, or at most minor, reworking**
- Accept with **rework verification**
- **Reinspect**

## Material Type Bazli Cetvel Onerisi

Hangi boyutlar hangi materyale uygulanir:

| Boyut | Reqts | Design | Code | Test Plan |
|-------|-------|--------|------|-----------|
| Conformance | ✓ | ✓ | ✓ | ✓ |
| Editorial | ✓ | ✓ | ✓ (style guide) | ✓ |
| Completeness | ✓ | ✓ | – | ✓ |
| Correctness | ✓ | ✓ | ✓ (logic) | ✓ |
| Accuracy | ✓ | ✓ | – | ✓ |
| Clarity | ✓ | ✓ | ✓ (readability) | ✓ |
| Testability | ✓ | ✓ | ✓ (unit test) | ✓ |
| Usability | ✓ | ✓ | – | – |
| Traceability | ✓ | ✓ | ✓ | ✓ |

## Inspection ROI

Inspection pahali gorunur; neden yapilir?
- Sistem testi ve musteri tarafindan bulunan defect'lerin duzeltmesi cok daha pahalidir
- Gec duzeltme sirasinda yeni defect girebilir, urun kararsizlasir
- Proje takvimi ciddi etkilenir
- Musterinin sirket ve urun algisi zedelenir
- Ekip uyeleri basari hissini kaybeder

Sayisal ornek icin `/feza-sqa:metrics-plan`.

## Anti-Pattern'ler

- ✗ Yonetimi inspection toplantisina sokmak (baski → bulgu azalir)
- ✗ Reader rolunu Author'a vermek (Author kendi materyalini okumamali)
- ✗ Severity vermeden bulgu kaydetmek
- ✗ Overview'i atlayip Prepare'a gecmek (baglam yetersiz)
- ✗ Rework olmadan Report'a gecmek
- ✗ Inspection toplantisi 2 saatten uzun (dikkat dusar; Fagan/Gilb-Graham onerisi)
- ✗ Tek seferde 100+ sayfa (10-15 sayfalik parcalara bol)
