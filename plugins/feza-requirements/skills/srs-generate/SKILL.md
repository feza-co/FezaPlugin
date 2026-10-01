---
name: srs-generate
description: >
  MSRS (jam01/SRS-Template) yapısında, IEEE 830 + ISO/IEC/IEEE 29148:2018 uyumlu Software Requirements Specification (SRS) üretir. 5 ana bölüm (Introduction / Product Overview / Requirements / Verification / Appendixes); QoS 6 sub-section (Performance / Security / Reliability / Availability / Observability / Usability), ayrı Compliance bölümü, AI/ML opsiyonel.
  Doküman kurumsal teslim formatında (kapak, TR+EN özet, numaralı içindekiler, kaynakça, ekler) üretilir ve teslimden önce gizli kalite kapısından geçirilir.
  İki modda çalışır: (1) KOD MODU — proje kodu hazırsa kaynak kodu, README, manifest
  ve API uçlarını tarayıp koddan FR/NFR çıkarır; (2) BRIEF MODU — kod henüz yoksa
  proje fikrinden (BRIEF.md veya kullanıcıdan alınan kısa brief) üretir, ileride kod
  olunca yeniden çalıştırılır. Önce TEK SORU ile hangi modu kullanacağını belirler.
  Tetikleyici ifadeler: "SRS oluştur", "SRS yaz", "SRS üret", "29148 uyumlu doküman",
  "yazılım gereksinim dokümanı", "generate SRS", "create SRS".
allowed-tools: Read, Write, Glob, Grep, Bash, AskUserQuestion
---

# SRS Generate

ISO/IEC/IEEE 29148:2018 uyumlu SRS üretir. Mod kararı → taslak v1 → gizli kalite kapısı → son sürüm teslimi.

## Tetikleyici

Kullanıcı şunlardan birini söylediğinde:
- "/feza-requirements:srs-generate"
- "SRS oluştur / yaz / üret"
- "29148 uyumlu requirement dokümanı"
- "generate / create SRS"

## Adım 0 — Mod Kararı (TEK soru)

### 0.1 Kod hacmini ölç (sessizce)

Glob ile sayım yap:
- Kaynak kod uzantıları: `*.py`, `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.java`, `*.go`, `*.rs`, `*.cs`, `*.rb`, `*.php`, `*.swift`, `*.kt`, `*.cpp`, `*.c`, `*.vue`, `*.svelte`
- `node_modules/`, `venv/`, `.git/`, `dist/`, `build/` HARİÇ.

### 0.2 Eşiklere göre karar

- Toplam kaynak dosya **< 5** veya toplam satır **< 200** → **BRIEF MODU**, soru SORMA.
- Toplam kaynak dosya **> 30** veya toplam satır **> 2000** → **KOD MODU**, soru SORMA.
- Aradaysa (5–30 dosya / 200–2000 satır) → **TEK** `AskUserQuestion`:
  - **Soru:** "Projenin kod hacmi orta seviyede. SRS'i koda göre mi, yoksa proje fikrine/brief'e göre mi üreteyim?"
  - **Header:** "SRS modu"
  - **Seçenek 1:** "Koda göre üret (Recommended)" — `description`: "Kaynak kod, API uçları ve modüllerden FR/NFR çıkarır."
  - **Seçenek 2:** "Brief/fikre göre üret" — `description`: "Proje fikrinden üretir; kod hazır olunca tekrar çalıştır."

## Adım 1 — Bağlamı Topla

`references/input-discovery.md` desenini uygula:
- **KOD MODU**: brief opsiyonel; kod öncelikli. README + manifest + kaynak kod yapısını tara.
- **BRIEF MODU**: brief ZORUNLU. `IDEA.md/BRIEF.md/PROJE.md` ara → yoksa tek soruyla iste.
- Kullanıcı "sade/kısa format" istediyse not al (Adım 4.3).

## Adım 2 — Gri Nokta Tespiti (skill-spesifik)

Brief/koddan aşağıdaki kritik bilgileri ARA. Bulunamayanları **EN FAZLA 3 SORU** ile tek `AskUserQuestion`'da topla:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Hedef kullanıcı sınıfları** (admin/user/guest gibi) | NFR ve UI gereksinimleri için |
| 2 | **Performans/ölçek beklentisi** (eşzamanlı kullanıcı, yanıt süresi eşiği) | NFR sayısal eşikleri için |
| 3 | **Regülasyon/yasal kısıt** (KVKK, GDPR, HIPAA, sektör) | Compliance bölümü için |

Brief koddan/dosyadan net çıkıyorsa SOR**MA**. Sadece eksikleri sor. Kapak alanları (Kurum / Ekip / Danışmanlık firması / Müşteri) için soru SORMA; brief'te yoksa satırlar kaldırılır.

## Adım 3 — Bilgi Tabanını Yükle (zorunlu)

Üretime başlamadan önce oku:
1. `references/srs-outline-29148.md` — başlık iskeleti.
2. `references/well-formed-requirements.md` — bireysel + set kriterleri.
3. `references/language-guidelines.md` — modal fiil + yasak terimler.
4. `references/output-conventions.md` + `references/delivery-format.md` — dosya adı, ton, teslim formatı.
5. `references/quality-gate.md` — feza-requirements kriter seti (Adım 7).

## Adım 4 — Taslak v1: Çıkarım Kuralları (bellekte, dosyaya YAZMA)

### 4.1 KOD MODU çıkarımları

- Her API endpoint → bir FR. Örn: `POST /users/login` → "FR-001: Sistem, kullanıcının `/users/login` uç noktası üzerinden kimlik bilgisiyle oturum açmasına olanak verecektir."
- UI route, CLI komutu, cron job, DB modeli CRUD'u → ilgili FR'ler.
- **QoS sinyalleri (3.3):** Auth/JWT → 3.3.2 Security (≥ 2); Cache/CDN/index → 3.3.1 Performance; logging/Sentry/Prometheus → 3.3.5 Observability; i18n, aria-/WCAG → 3.3.6 Usability; Docker/CI → 3.5.3 Build & Delivery + 3.5.7 Portability (25010 etiketi: Flexibility); test coverage → 3.5.5 Maintainability.
- **Compliance (3.4):** KVKK/GDPR/HIPAA → CMP-XXX. License header → 3.5 Cost / Distribution.
- **AI/ML (3.6, opsiyonel):** `openai/anthropic/transformers` import → bölüm etkin; prompt template → Guardrails; train script → Lifecycle.

### 4.2 BRIEF MODU çıkarımları

- Brief'teki her ana fonksiyon → bir FR (genelde 6–12 fonksiyon).
- İma edilen kalite nitelikleri (ör. "kurumsal ölçek", "mobil öncelikli") → ilgili QoS.
- Veri/regülasyon ipuçları → Compliance/Constraint.
- Arayüz ve doğrulama ayrıntıları gerekiyorsa sınırlı sayıda `TBD — kod aşamasında belirlenecek`.

### 4.3 Teslim formatı (varsayılan)

`references/delivery-format.md` şablonuyla sar: **Kapak** (opsiyonel Kurum/Ekip/Danışmanlık firması/Müşteri) → **Özet + Abstract** → **numaralı İçindekiler** → MSRS 1–5 → kaynakça **1.4 References** içinde IEEE (varsayılan) veya APA → ekler **5. Appendixes** içinde (Bilinen Boşluklar, TBD listesi, revizyon geçmişi). Bütünlük beyanı yalnızca istenirse. "Sade format" istendiyse kapak/özet/içindekiler yerine üst bilgi bloğu.

## Adım 5 — Hacim Hedefleri (MSRS bölüm bazlı)

| Bölüm | Min | Max |
|-------|-----|-----|
| 3.2 FR | 8 | 25 |
| 3.3.1 Performance / 3.3.2 Security | 2 / 2 | 6 / 8 |
| 3.3.3 Reliability / 3.3.4 Availability | 2 / 1 | 5 / 3 |
| 3.3.5 Observability / 3.3.6 Usability | 2 / 2 | 5 / 5 |
| 3.4 Compliance | 0 | 5 (regülatif varsa) |
| 3.5 Constraints | 5 | 15 |
| 3.6 AI/ML | 0 | 10 (varsa) |

Toplam minimum **24 gereksinim** (8 FR + 11 QoS + 5 CON); küçük projede en az 6 FR + 8 QoS. Her QoS bir **ISO/IEC 25010:2023** alt-karakteristiğiyle etiketli.

## Adım 6 — Self-Check (MSRS uyumlu)

- [ ] 5 ana bölüm tam mı; 3.3 QoS 6 alt-bölüme ayrılmış mı; 3.4 Compliance ayrı mı?
- [ ] 3.5 Design Constraints 11 alt-bölümü kapsıyor mu?
- [ ] Her gereksinim "shall / -acaktır" ile, tek cümle, benzersiz ID'li mi?
- [ ] Yasak terim yok mu (`references/language-guidelines.md`)?
- [ ] 4. Verification'da her gereksinime yöntem atanmış mı?
- [ ] Teslim formatı parçaları (veya sade formatta üst bilgi) tam mı?

## Adım 7 — Gizli Kalite Kapısı (taslak v1 → puan → revizyon)

`references/quality-gate.md` prosedürünü **feza-requirements (Gereksinim)** kriter setiyle uygula:
1. Taslak v1'i A kriter setiyle 100 üzerinden puanla (29148 outline, iyi-form, 25010 etiketleme, yasak terim, teslim formatı vb.).
2. Puan **< 85** veya engelleyici varsa → bulgulara göre somut revizyon yönergeleri üret, uygula, yeniden puanla. **En fazla 2 tur.**
3. Eşik yine geçilemezse en yüksek puanlı sürümü al; kapanmayan içerik eksiklerini "Bilinen Boşluklar"a içerik boşluğu olarak yaz.
4. Puan, tablo ve revizyon notları **gösterilmez, dosyaya yazılmaz**. Yalnızca kullanıcı açıkça "kalite puanını göster" diye isterse sohbette ≤ 3 satır özet.

## Adım 8 — Yaz (son teslim)

- Dosya: `SRS_<proje>_v0.1.md` (proje kökü; `docs/` varsa oraya da yazılabilir).
- Yalnızca son sürüm yazılır; ara taslak ve puan dosyası YAZILMAZ.

## Adım 9 — Rapor

`references/output-conventions.md` → "Kullanıcıya Rapor" (≤ 5 satır): dosya yolu, FR/QoS/CMP/CON sayımı, mod + format, boşluk sayısı, sonraki adım (ör. `/feza-requirements:srs-review`). Word/PDF istenirse Pandoc komutunu öner (`references/delivery-format.md`). Kalite puanı rapora girmez.

## Sınırlar

- Toplam soru en fazla 4 (1 mod + 3 gri nokta); kalite kapısı soru sormaz.
- Gereksinim ID'leri revizyonda silinmez, yeniden kullanılmaz.
- Diyagram üretilmez; tablolar yeterli.
