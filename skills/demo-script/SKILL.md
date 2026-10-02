---
name: demo-script
description: >
  Paydaş / yatırımcı / müşteri / yönetim kurulu sunumu için sunum akışı + Q&A hazırlığı üretir.
  10-15 dk slot için: opening hook, problem, çözüm demosu, sayısal kanıt
  (PERT, DRE, P×I), canlı demo akışı, Q&A bankası (ROI, risk, takvim,
  güvenlik, ölçeklenebilirlik, rekabet soruları + cevapları), kapanış. Resmi tonda opsiyonel hafif mizah önerisi.
  Tetikleyici: "demo script", "sunum hazirligi", "/feza-toolkit:demo-script",
  "yatirimci sunumu", "paydas sunumu", "pitch".
allowed-tools: Read, Write, Glob, AskUserQuestion
---

# Demo Script

Paydaş / yatırımcı / müşteri / yönetim kurulu sunum akışı + Q&A.

## Tetikleyici
- "/feza-toolkit:demo-script"
- "demo / sunum / presentation"
- "paydaş sunumu / yatırımcı sunumu / pitch"

## Adim 0 — Bagilami Topla
- Tum FezaPlugin ciktilari (Glob ile)
- `BRIEF.md`, `SCOPE_*.md`, `SRS_*.md` — temel
- `PERSONAS_*.md`, `RISK_REGISTER_*.md`, `ESTIMATES_*.md` — sayisal kanit
- Yoksa **TEK** soru: "Demo kime? (paydas toplantisi / yatirimci / musteri / yonetim kurulu)"

## Adim 1 — Gri Nokta (max 3)

| # | Gri nokta |
|---|-----------|
| 1 | **Sure** (5 / 10 / 15 / 20 dk — varsayilan 10) |
| 2 | **Hedef kitle** (yonetim kurulu / yatirimci / paydas / musteri) |
| 3 | **Demo tipi** (canli / video / yalnizca sunum dosyasi) |

## Adim 2 — Bilgi Tabani
- `references/demo-structure.md` — slot bazli akis + Q&A bankasi.

## Adim 3 — Uret

### Bolum 1 — Sunum Akisi (10 dk standardi)

```markdown
# Demo Script — <Proje>

## 0. Opening Hook (30 saniye)
**Soyle:** "Hayal edin, [problem cumlesi]. Bunun icin [proje adi] gelistirdik."

**Sayfa 1:** Urun adi + tek-cumle deger onerisi + sunan kisinin rolu ve iletisim

## 1. Problem (90 saniye)
**Soyle:** "Mevcut surecte [pain point]. Bizim hedef kullanicimiz [persona ozet]."

**Sayfa 2:** Persona bir paragraf + hedef kitle ozet tablosu
**Kanit:** PERSONAS_*.md alinti

## 2. Cozum Konsepti (90 saniye)
**Soyle:** "Cozumumuz [tek cumle], [3 ana feature]."

**Sayfa 3:** 3 ana feature ikonlu bullet
**Kanit:** SRS top FR'ler (FR-001/002/003)

## 3. Live Demo (3 dakika — en uzun bolum)
**Akis:**
1. (30s) Login → onboarding
2. (60s) Ana kullanici akisi (en degerli flow)
3. (45s) Ikinci kullanici sinifi/ozellik
4. (45s) Edge case / hata yonetimi gosterisi (guven olusturur)

**Backup:** Demo cokerse video kaydi hazir

## 4. Mimari + Teknoloji (60 saniye)
**Soyle:** "Backend [tech stack], frontend [stack], hosting [cloud]."

**Sayfa 4:** Mimari diagram (high-level box-arrow)
**Kanit:** README.md teknoloji yığını

## 5. Sayisal Kanitlar (90 saniye)
**Soyle:** "30 KLOC, 12 FR, 8 NFR. PERT'e gore 7.5 hafta, kritik yol 5.2 hafta. Risk profili: 3 yuksek skor (Skor 12+)."

**Sayfa 5:** Buyuk rakamlar (KLOC / FR/NFR / sure / butce / risk sayisi)
**Kanit:**
- ESTIMATES_*.md → toplam efor
- ACTIVITIES_*.md → kritik yol
- RISK_REGISTER_*.md → risk dagilim
- METRICS_PLAN_*.md → DRE hedef

## 6. Standart Uyumu (60 saniye)
**Soyle:** "Endustri standartlarina uyumlu ilerledik: ISO/IEC/IEEE 29148 SRS, ISO/IEC 25010 9 karakteristik, ISO/IEC/IEEE 12207 process audit, IEEE 1028 inspection."

**Sayfa 6:** Standart listesi + uyum yuzdesi

## 7. Validation / Test (60 saniye)
**Soyle:** "X test case, %78 unit coverage, %89 DRE, 12 kritik bulgu inspection ile yakalandi."

**Sayfa 7:** Test pyramid + DRE trend
**Kanit:** TEST_PLAN_*.md sayim, INSPECTION_*.md log

## 8. Closing (30 saniye)
**Soyle:** "[Tek cumle ozet]. Sorulariniz icin hazirim."

**Sayfa 8:** Tesekkür + iletisim + sonraki adimlar

## 9. Q&A (3-5 dakika)
[Q&A bankasi — bir sonraki bolum]
```

### Bolum 2 — Q&A Bankasi (dinleyicinin muhtemel sorulari)

Sorular hedef kitleye gore secilir; her cevap bir FezaPlugin ciktisina ya da somut veriye dayanir. Asagidaki ornek cevaplardaki sayilar yer tutucudur; kendi ciktilarinizdaki degerlerle doldurun.

#### Is Degeri ve ROI (yatirimci, yonetim kurulu)
**Q:** "Yatirimin geri donus suresi nedir?"
**A:** "BUDGET_*.md'deki toplam maliyet X; ilk yil hedeflenen tasarruf/gelir Y. Bu varsayimlarla geri donus Z ay. Varsayimlar dokumanin Ekler bolumunde acik."

**Q:** "Bu cozum olmazsa musterinin kaybi ne?"
**A:** "Mevcut surecte [pain point] her ay yaklasik [olculebilir kayip] yaratiyor (PERSONAS_*.md ve SCOPE_*.md'deki problem tanimi)."

#### Takvim ve Teslim (musteri, sponsor)
**Q:** "Ilk surum ne zaman canliya cikar ve bu tarih ne kadar guvenilir?"
**A:** "ESTIMATES_*.md'de PERT ile beklenen sure E gun, %95 guven araligi [alt-ust]. Kritik yol ACTIVITIES_*.md'de; en buyuk takvim riski [gorev]."

**Q:** "Kapsam degisirse ne olur?"
**A:** "Degisiklikler CHANGE_CONTROL_*.md'deki etki analizi ve onay akisi ile ele alinir; takvim ve butce etkisi onaydan once raporlanir."

#### Risk (yatirimci, sponsor)
**Q:** "En buyuk uc risk nedir ve nasil yonetiliyor?"
**A:** "RISK_REGISTER_*.md'deki en yuksek P×I skorlu uc risk: [risk 1/2/3]; her birinin sahibi ve yanit stratejisi tanimli."

#### Guvenlik ve Uyum (musteri, BT/guvenlik ekibi)
**Q:** "Verilerimiz nasil korunuyor, hangi regulasyonlara uyuyorsunuz?"
**A:** "SRS_*.md'deki guvenlik gereksinimleri: aktarimda ve depolamada sifreleme, rol bazli erisim, denetim kaydi. Uyum bolumu [KVKK/GDPR/sektor] gereksinimlerini listeliyor."

**Q:** "Guvenlik acigi bulunursa sureciniz ne?"
**A:** "DEFECT_* surecinde kritik guvenlik bulgulari en yuksek oncelikte; hedef duzeltme suresi [X saat/gun]."

#### Olceklenebilirlik ve Isletim (teknik karar verici)
**Q:** "Kullanici sayisi on katina cikarsa sistem dayanir mi?"
**A:** "SRS_*.md performans gereksinimleri [N eszamanli kullanicida p95 ≤ X ms]; TEST_PLAN_*.md'de yuk testi senaryosu tanimli. Olcekleme yaklasimi: [yatay olcekleme/onbellek]."

**Q:** "Kesinti olursa ne kadar surede donersiniz?"
**A:** "Hedef kullanilabilirlik %[X], hedef kurtarma suresi [Y dk]; izleme ve alarm kurallari SRS'in gozlemlenebilirlik bolumunde."

#### Rekabet ve Konumlandirma (yatirimci, musteri)
**Q:** "Rakiplerden farkiniz nedir?"
**A:** "COMPETITORS_*.md'deki karsilastirmada uc ayirt edici ozellik: [ozellik 1/2/3]; olculebilir fark: [ornek]."

**Q:** "Rakip ayni ozelligi eklerse ne olur?"
**A:** "Savunulabilir avantajimiz [veri/entegrasyon/maliyet]; SWOT_*.md'de tehdit olarak ele alindi ve yanit stratejisi var."

#### Kullanici Benimsemesi (musteri, urun ekibi)
**Q:** "Kullanicilar bunu gercekten kullanacak mi?"
**A:** "USABILITY_PLAN_*.md'de hedef gorev tamamlama orani ve SUS esigi tanimli; pilot sonuclari [tarih]te paylasilacak."

### Bolum 3 — Sunum Tipsi

- **Sure yonetimi:** Her bolum için kronometre — 10 dk total
- **Sayfa sayisi:** ≤ 8 ana sayfa + Q&A yedek sayfalari
- **Yazi:** Sayfalarda buyuk yazi, az kelime — asil anlatim sozlu
- **Demo cokmesi:** Video kaydi backup, ekran goruntusu fallback
- **Stres yonetimi:** Q&A oncesi su ic, gulumse, bilinmeyen soruda "guzel soru, X dosyada bahsetmistim" tarzi koprü

### Bolum 4 — Mizah (opsiyonel)

Yonetim kurulu, musteri veya yatirimci karsisinda mizah dozu dusuk tutulmalidir. Bir veya iki yerde nazik, konuyla ilgili bir cumle yeterlidir:
- "Once 'saving the day' modunda calisiyorduk (CMMI Level 1 davranisi); simdi surecimiz tanimli."
- "Defect, bug, finding... hangi adi verirsek verelim, onemli olan kapanis orani."

> Dinleyicinin tonuna gore doz ayarla — fazlasi profesyonel durusu kirar.

### Bolum 5 — Demo Cikti

Tek dosya: `DEMO_SCRIPT_<proje>.md`

Iceren:
1. Sunum akisi (timestamps)
2. Sayfa baslıkları + iceriği
3. Soyleyecekleri kelimeler ("**Soyle:**" bolumleri)
4. Q&A bankasi (kategorize)
5. Backup plan (demo cokerse)
6. Pre-demo checklist (test, internet, klima, su, vs.)

## Adim 4 — Self-Check
- [ ] 0:00 - 10:00 timeline tam mi?
- [ ] 8 ana sayfa yapisi var mi?
- [ ] Q&A bankasi en az 10 soru-cevap mi?
- [ ] Sayisal kanit (PERT/CPM/DRE/P×I) referansli mi?
- [ ] Backup plan (demo cokmesi) var mi?
- [ ] Q&A bankasi ROI, takvim, risk, guvenlik, olceklenebilirlik ve rekabet sorularini kapsiyor mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle (bu doküman paket kriter setlerinden birine girmez) Bölüm 4 engelleyicileri ve "Teslim formatı" kriteriyle gizlice kontrol et.
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adim 5 — Yaz
- Dosya: `DEMO_SCRIPT_<proje>.md`

## Adim 6 — Rapor
1. Dosya yolu.
2. Sure + sayfa sayisi.
3. Q&A bankasinda soru sayisi.
4. Backup elementleri.
5. Sonraki: provadan once sunumu bir meslektasa dinlet; kritik soru listesini guncelle.

## Sinirlar
- Max 4 soru.
- Sure asma — 10 dk slot 11 dk olmasin.
- Sayfa sayisi 12'yi gecemez.
- Mizah dozajini dinleyiciye uydur.
- Backup plan eklemeden bitirme.
