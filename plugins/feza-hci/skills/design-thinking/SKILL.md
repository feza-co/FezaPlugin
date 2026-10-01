---
name: design-thinking
description: >
  Design Thinking 5 aşamalı yol haritası üretir (Empathize, Define, Ideate,
  Prototype, Test). Stanford d.school / IDEO modeline dayalı; user journey
  flowchart vurgusuyla ve mobil bankacılık gibi özgün bir örnek senaryo ile.
  Her aşama için somut çıktı, süre, araç önerisi. Tetikleyici: "design
  thinking", "tasarım odaklı düşünme", "/feza-hci:design-thinking",
  "5 aşamalı tasarım".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# Design Thinking

## Tetikleyici
- "/feza-hci:design-thinking"
- "design thinking yol haritası"
- "5 aşamalı tasarım süreci"

## Adım 0 — Bağlamı Topla
1. `BRIEF.md`/`IDEA.md`/`SCOPE_*.md` — problem/fırsat
2. `PERSONAS_*.md` (varsa) — kullanıcı bağlamı
3. Hiç yoksa **TEK** soru: "Hangi problem/fırsat üzerine design thinking yapacağız? (kısa cümle)"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Hangi aşamadasın** (yeni başlangıç → Empathize, prototip var → Test) |
| 2 | **Süre kısıtı** (tek sprint mi? çeyrek mi? açık mı?) |

## Adım 2 — Bilgi Tabanı
- `references/design-thinking-stages.md` — 5 aşama detay + örnek senaryo (mobil bankacılık).
- `references/output-conventions.md`.

## Adım 3 — Üret

### 5 Aşama (her biri için: amaç + aktiviteler + çıktı + süre + araç)

#### 1. Empathize (Anla)
- **Amaç:** Kullanıcıyı derinden tanı, varsayımları sorgula
- **Aktiviteler:** observe, engage, immerse — interview, shadow, contextual inquiry
- **Çıktı:** Kullanıcı notları, alıntı koleksiyonu, foto/video kayıt, empathy map
- **Süre:** 5-10 iş günü
- **Araç:** Notion/Miro empathy map, ses kayıt, soru rehberi

#### 2. Define (Tanımla)
- **Amaç:** Toplanan veriyi anlamlı bir problem ifadesine dönüştür
- **Aktiviteler:** synthesize, frame, articulate POV (Point of View)
- **Çıktı:** Problem statement (1 cümle), HMW (How Might We) soruları, persona, journey map
- **Şablon:** "[Kullanıcı] [ihtiyaç]'a sahip, çünkü [içgörü]."
- **Süre:** 3-5 gün
- **Araç:** Sticky note clusters, affinity diagram

#### 3. Ideate (Fikir üret)
- **Amaç:** Olabildiğince çok ve çeşitli çözüm üret
- **Aktiviteler:** brainstorm, brainwrite, SCAMPER, Crazy 8s, worst possible idea
- **Çıktı:** 30-100+ ham fikir → daraltılmış 5-10 promising fikir
- **Süre:** 2-3 gün
- **Kural:** "Defer judgment, encourage wild ideas, build on others' ideas"

#### 4. Prototype (Prototiple)
- **Amaç:** Fikirleri elle tutulur hale getir, hızlı, ucuz
- **Aktiviteler:** sketch → wireframe → mockup → interactive prototype
- **Çıktı:** Low-fi (kağıt) → mid-fi (Figma wireframe) → hi-fi (clickable)
- **Süre:** 5-10 iş günü
- **Araç:** Sketch, post-its, storyboard, Figma, Penpot
- → `/feza-hci:prototype-plan`

#### 5. Test (Doğrula)
- **Amaç:** Prototipi gerçek kullanıcılarla dene, geri bildirim al, iterate
- **Aktiviteler:** moderated/unmoderated user test, A/B, think-aloud
- **Çıktı:** Bulgu raporu, iyileştirme listesi
- **Süre:** 5 iş günü
- → `/feza-hci:usability-eval-plan`

### İterasyon Notu

> Kritik vurgu: **bu süreç doğrusal değil iteratiftir.** Test'ten Empathize'a dönmek olağandır.

### Örnek Senaryo: Mobil Bankacılıkta Fatura Ödeme

Yöntemin uygulamada nasıl göründüğünü gösteren özgün örnek:

| Aşama | Örnekte ne yapıldı |
|-------|--------------------|
| Empathize | Düzenli fatura ödeyen 8 kullanıcıyla görüşme; "her ay aynı faturayı yeniden aramak zorunda kalmak" pain point'i |
| Define | Kullanıcı: serbest çalışan. İhtiyaç: tekrarlayan faturaları tek dokunuşla ödemek. İçgörü: fatura kurumunu bulma adımı her seferinde zaman alıyor. |
| Ideate | Kayıtlı faturalar listesi, otomatik ödeme talimatı, kamera ile fatura okutma |
| Prototype | User journey flowchart (giriş → fatura seç → onay → makbuz) + kağıt eskiz |
| Test | 5 kullanıcıyla görev testi; "onay" adımında güven sorunu çıkarsa Define'a dön |

## Adım 4 — Self-Check
- [ ] 5 aşama tam mı?
- [ ] Her aşamada amaç + aktivite + çıktı + süre + araç var mı?
- [ ] HMW soruları (Define aşaması) yazıldı mı?
- [ ] User journey flowchart önerisi var mı?
- [ ] İterasyon notu eklendi mi?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-hci (HCI)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `DESIGN_THINKING_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Tahmini toplam süre (5 aşama topluca).
3. Sıradaki aşama önerisi (kullanıcı hangi noktadaysa).
4. Bağlı skiller: `/feza-hci:persona`, `/feza-hci:prototype-plan`, `/feza-hci:hci-execute` (Prototype aşamasında çalışan arayüz), `/feza-hci:usability-eval-plan`.
5. Bilinen boşluk.

## Sınırlar
- Max 3 soru.
- 5 aşamadan birini atlama.
- Aşamayı tek paragrafa sıkıştırma — şablona uy.
- Örnek senaryoyu yalnızca referans olarak ekle; projenin kendi bağlamını esas al.
