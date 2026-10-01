---
name: raci
description: >
  RACI sorumluluk matrisi üretir. PMBOK kaynak yönetimi (RAM/RACI) uyumlu. WBS satırları
  × Stakeholder/Rol sütunları, hücrelerde R (Responsible), A (Accountable), C
  (Consulted), I (Informed). WBS_*.md ve STAKEHOLDERS_*.md'yi okur; rol ipuçlarını
  SRS'in kullanıcı sınıfları ve paydaş tanımlarından alır. Referans alınacak bir SRS (SRS_*.md) zorunludur; yoksa çalışmaz ve /feza-requirements:srs-generate'e yönlendirir.
  Tetikleyici: "RACI matrisi", "sorumluluk matrisi", "/feza-pm:raci",
  "kim ne yapacak", "responsibility assignment matrix".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# RACI

PMBOK kaynak yönetimi yaklaşımına göre RACI matrisi üretir.

## Tetikleyici

- "/feza-pm:raci"
- "RACI matrisi / sorumluluk matrisi"
- "kim ne yapacak"
- "responsibility assignment matrix"

## Adım 0 — SRS Kapısı ve Bağlam

1. **SRS kapısı (zorunlu):** `references/srs-gate.md` kurallarını uygula. Geçerli SRS yoksa DUR: dosya üretme, brief isteme, proje dizinini (README, kod, manifest, git) okuma; kullanıcıyı `/feza-requirements:srs-generate`'e yönlendir.
2. **`WBS_*.md`** (zorunlu kaynak — satırlar buradan).
3. **`STAKEHOLDERS_*.md`** (varsa — sütunlar buradan).
4. SRS: kullanıcı sınıfları, paydaş ve rol tanımları — rol ipucu.

Eksiklerde **TEK** `AskUserQuestion`:

- WBS yoksa:
  - **Soru:** "RACI için WBS gerekiyor. Önce `/feza-pm:wbs` çalıştırmamı mı istersin, yoksa RACI'yi SRS'in fonksiyonel gereksinimleri üzerinden mi üreteyim?"
  - Recommended: önce WBS.

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 3 SORU:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Takım rolleri** (PM, Lead Dev, Frontend, Backend, QA, Designer, Sponsor…) | Sütunlar için |
| 2 | **Sponsor / karar vericisi** kim? | A (Accountable) atanması için |
| 3 | **Müşteri / dış paydaş** dahil mi? | C/I sütunu için |

Stakeholder dosyası varsa SOR**MA** — direkt oku.

## Adım 2 — Bilgi Tabanı

- `references/raci-rules.md` — RACI kuralları + tipik dağılım örnekleri.
- `references/output-conventions.md`.

## Adım 3 — Üret

### RACI Tanımları

| Harf | Açıklama |
|------|----------|
| **R — Responsible** | İşi fiilen yapan kişi(ler). Birden çok olabilir. |
| **A — Accountable** | İşin tamamlanmasından sorumlu, hesap veren tek kişi. **Her satırda TAM 1 A olmalı.** |
| **C — Consulted** | Karar/yapım öncesi danışılan kişi (iki yönlü iletişim). |
| **I — Informed** | Sonuç hakkında bilgilendirilen (tek yönlü iletişim). |

### Matris Formatı

| WBS ID | Aktivite | PM | Lead Dev | Frontend | Backend | QA | Designer | Sponsor |
|--------|----------|----|---------:|---------:|--------:|---:|---------:|--------:|
| 1.1.1 | Kayıt formu UI | A | C | R | I | I | C | I |
| 1.1.2 | E-posta doğrulama | A | C | I | R | I | – | I |
| ... |

### Kurallar

- Her satırda **tam 1 A** zorunlu.
- Her satırda **en az 1 R** zorunlu.
- "–" boş bırakılır (rolün hiçbir ilgisi yok).
- A ve R aynı kişide olabilir → "**A/R**" yazılır.
- Çok fazla C/I yığma → "RACI yorgunluğu" oluşur; her satırda max 4 C+I.

### Tipik Dağılım (kontrol için)

- Coding aktiviteleri: A=Lead Dev, R=Geliştirici, C=PM/QA, I=Sponsor
- Test aktiviteleri: A=QA Lead, R=QA, C=Lead Dev, I=PM/Sponsor
- Dokümantasyon: A=PM, R=Lead Dev, C=QA, I=Sponsor
- Onay/Karar: A=Sponsor, R=PM, C=Lead Dev, I=Tüm takım

## Adım 4 — Self-Check

- [ ] Her satırda tam 1 A var mı?
- [ ] Her satırda en az 1 R var mı?
- [ ] Aynı satırda 2+ A YOK mu?
- [ ] Toplam C+I sayısı satır başına ≤ 4 mü?
- [ ] Her sütundaki rol açıklayıcı bir başlığa sahip mi (yalnızca isim değil, "Frontend Developer" gibi)?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Dosyaya Yaz

- Dosya: `RACI_<proje>.md`
- Konum: cwd
- Format: tek büyük tablo + sonunda "Yoğunluk Özeti" (her sütundaki R/A/C/I sayıları)

## Adım 6 — Kullanıcıya Rapor

1. Dosya yolu.
2. Tek cümle: kaç aktivite × kaç rol.
3. Kullanılan input.
4. Sponsor uyarısı: "A sütunu yoğunluğunu kontrol et — tek bir kişi tüm A'ları üstleniyorsa darboğaz olur."
5. Sonraki adım: "Sırada `/feza-pm:comm-plan` — RACI'deki C/I'lar iletişim kanallarına bağlanır."

## Sınırlar

- Max 4 soru.
- Eğer >50 yaprak varsa, RACI'yi WBS 2. seviye üstünde ÖZET olarak üret (yapraklar değil, alt modüller).
- Aynı kişiye birden fazla A vermekten kaçın (darboğaz uyarısı).
- Diyagram çizme; tablo yeterli.
