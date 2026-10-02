---
name: usability-eval-plan
description: >
  Usability Evaluation Plan üretir. Endüstri standardı kullanılabilirlik testi
  akışı: Questioning Methods, User Tests, Heuristic Walkthrough, standart
  demografik form, pre-test ve SUS (System Usability Scale) tabanlı post-test
  anketi, SEQ (görev sonrası) ve UMUX-Lite (oturum sonu) araçları, HEART
  hedef→sinyal→metrik tablosu, NASA-TLX yalnız karmaşık/kritik görevlerde,
  pilot test, test ortamı, katılımcı sayısı tartışması (Virzi 1992, Nielsen 1993,
  Spool & Schroeder 2001). Tetikleyici: "usability test plan",
  "kullanılabilirlik testi", "user testing", "/feza-hci:usability-eval-plan".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Usability Evaluation Plan

Kullanıcı testi prosedürünün (ISO 9241-11: etkinlik, verimlilik, memnuniyet) adım adım uygulanmış hali.

## Tetikleyici
- "/feza-hci:usability-eval-plan"
- "usability test plan / kullanılabilirlik testi planı"
- "user testing protokolü"

## Adım 0 — Bağlamı Topla
1. UI dosyaları, varsa `HCI_REVIEW_*.md`, `HEURISTIC_EVAL_*.md` (öncelik bulguları → en kritik task'lar buradan).
2. `BRIEF.md`/`SCOPE_*.md` — kullanıcı bağlamı.
3. `STAKEHOLDERS_*.md` — kullanıcı sınıfları.
4. Hiçbiri yoksa **TEK** soru: "Test edilecek ekran/akış ve hedef kullanıcı sınıfı nedir?"

## Adım 1 — Gri Nokta (max 3)

| # | Gri nokta |
|---|-----------|
| 1 | **Kullanıcı erişimi** (laboratuvar / uzaktan / müşteri sahası) |
| 2 | **Hedef katılımcı sayısı** (5 varsayılan — Virzi 1992) |
| 3 | **Süre kısıtı** (sprint sonu mu / sürüm tarihi mi) |

## Adım 2 — Bilgi Tabanı
- `references/usability-test-protocol.md` — adım adım test protokolü + form şablonları (demografik form, SUS).
- `references/metrics.md` — SEQ, UMUX-Lite, SUS yorumlama, HEART tablosu, örneklem kuralları, NASA-TLX.
- `references/output-conventions.md`.

## Adım 3 — Üret

### Plan bölümleri (zorunlu hepsi)

1. **Test Hedefleri** — neyi öğrenmek istiyoruz (3-5 spesifik hedef)
2. **Yöntem Seçimi** — Questioning Methods'tan biri:
   - Face-to-face interview
   - Observing users in work environment
   - User test (görev odaklı)
   - Questionnaire
   - Heuristic Walkthrough (önce — hangi task test edilsin sıralaması için)
3. **Görev Senaryoları** — gerçek iş akışından, kısa, atomik, ipucu vermeyen
4. **Demografik Bilgi Formu** (kısa; yalnızca analizde kullanılacak alanlar):
   - Yaş aralığı
   - Meslek / rol
   - Eğitim seviyesi
   - Teknoloji kullanım düzeyi (Başlangıç / Orta / İleri)
   - Benzer ürünleri kullanma sıklığı (hiç / ara sıra / düzenli)
   - Erişilebilirlik ihtiyacı (isteğe bağlı: ekran okuyucu, büyütme vb.)
5. **Pre-test soruları** — anlaşılır mı kontrolü
6. **Post-test Anketi** — System Usability Scale (SUS, Brooke 1996): 10 madde, 5'li Likert + 3 açık uçlu soru:
   - SUS 1-10 maddeleri (referans dosyada)
   - En çok zorlandığınız görev hangisiydi, neden?
   - Eksik veya yanlış bulduğunuz bir şey var mı?
   - Bu ürünü bir meslektaşınıza nasıl anlatırdınız?
   - SUS puanını yorumlarken derece ölçeği ve sıfat derecelendirmesi kullanılır (bkz. `references/metrics.md` §3; kaynaklar Sauro & Lewis, Bangor, Kortum & Miller 2009). Bilinmeyen sayı uydurulmaz.
7. **Görev Sonrası Ölçüm — SEQ**: her görev bittiğinde 7'li tek soru ("Bu görevi tamamlamak ne kadar kolaydı?"); görev başına ortalama + n raporlanır (`references/metrics.md` §1).
8. **Oturum Sonu Kısa Araç — UMUX-Lite**: 2 madde, 7'li ölçek, `((m1+m2)-2)/12×100`; SUS dönüşümü Lewis, Utesch & Maher 2013 modeliyle yapılır ve katsayılar `references/metrics.md` §2'deki kaynağa bırakılır (katsayı bu planda yazılmaz). Zaman kısıtlıysa SUS yerine kullanılabilir.
9. **HEART Tablosu** (`references/metrics.md` §4; Rodden, Hutchinson & Fu 2010): her satır hedef → sinyal → metrik. En az bir boyut zorunlu; seçilemeyen boyutun gerekçesi Bilinen Boşluklar'a yazılır.
10. **NASA-TLX (koşullu)**: yalnız karmaşık/kritik ve bilişsel yükü karar girdisi olan görevlerde (Raw TLX). Plan tablosuna her NASA-TLX satırı için **gerekçe** satırı zorunlu; basit görevlerde kullanılmaz (`references/metrics.md` §6).
11. **Test Ortamı** (kontrol listesi):
    - İzole laboratuvar vs doğal iş ortamı
    - İnternet hızı
    - Gürültü/ışık
    - Distractions
12. **Pilot Test** — kontrol listesi:
    - Pre-test soruları açık mı?
    - Görevler iyi tanımlı mı?
    - Oryantasyon ne kadar sürüyor?
    - Teknik engel?
    - Anket soruları açık mı?
13. **Katılımcı Profili + Sayısı** (`references/metrics.md` §5):
    - Niteliksel sorun keşfi: 5 katılımcı (Nielsen & Landauer 1993; Virzi 1992)
    - Niceliksel metrik: ≥ 20 katılımcı
    - Birden çok segment: segment başına 3-4 (Nielsen)
    - Sık/orta/ilk kez kullanıcı karışımı; eğitim/yaş/cinsiyet çeşitliliği
    - Niteliksel bulgular oran olarak sunulmaz; niceliksel oran yalnız yeterli n ile verilir.
14. **Yürütme Adımları** (a-d):
    - a) Test amacını açıkla + gönüllü katılım ve kayıt onay formu
    - b) Demografik formu doldur
    - c) Kısa sistem tanıtımı
    - d) Görev tamamlama oranı + süresi kayda al
15. **Metrikler**:
    - Task completion rate (%)
    - Task completion time (saniye)
    - Error count (kullanıcı başına)
    - SUS skoru (0-100)
    - SEQ ortalaması (görev başına, 1-7)
    - UMUX-Lite skoru (0-100) ve SUS dönüşümü (kaynağa bakın)
    - NASA-TLX / Raw TLX (yalnız gerekçeli karmaşık görevler)
16. **Çıktı / Raporlama** — bulguların önceliklendirilmesi
17. **Bilinen Boşluklar**

## Adım 4 — Self-Check
- [ ] Demografik form alanları tam mı?
- [ ] SUS 10 madde + açık uçlu sorular tam mı?
- [ ] SEQ (görev sonrası, 7'li) planda var mı ve görev başına ortalama + n ile raporlanıyor mu?
- [ ] UMUX-Lite 2 maddesi + puan formülü var mı; SUS dönüşümü katsayı yazmadan kaynağa (Lewis, Utesch & Maher 2013) bırakılmış mı?
- [ ] SUS yorumu derece ölçeği (Sauro & Lewis) ve sıfat derecelendirmesi (Bangor, Kortum & Miller 2009) ile mi yapılıyor; sayı uydurma yok mu?
- [ ] HEART tablosu hedef → sinyal → metrik olarak doldurulmuş mu; seçilemeyen boyutun gerekçesi yazılı mı?
- [ ] Örneklem kuralı gerekçeli mi (niteliksel 5 [Nielsen & Landauer 1993], niceliksel ≥ 20, segment başına 3-4)?
- [ ] NASA-TLX yalnız karmaşık/kritik görevlerde mi ve her satırda "gerekçe" var mı?
- [ ] Pilot test kontrol listesi var mı?
- [ ] Görev senaryoları "ipucu vermeyen" formatta mı?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `USABILITY_PLAN_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Yöntem + katılımcı sayısı + tahmini süre.
3. Kritik task sayısı (Heuristic Walkthrough sonucu).
4. Bilinen boşluk.
5. Sonraki: testten sonra `/feza-hci:hci-review` ile sonuçların bütünsel değerlendirmesi; test bulgularını arayüze uygulamak için `/feza-hci:hci-execute`.

## Sınırlar
- Max 4 soru.
- SUS maddelerinin sırasını ve ifadelerini DEĞİŞTİRME — skor formülü buna bağlıdır.
- Lab vs doğal ortam tartışmasını mutlaka not et.
- Pilot test atlanamaz — plana zorunlu olarak konur.
