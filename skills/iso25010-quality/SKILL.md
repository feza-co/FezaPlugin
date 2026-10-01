---
name: iso25010-quality
description: >
  Ürünü/SRS'i ISO/IEC 25010:2023 9 kalite karakteristiğine göre puanlar.
  ISO/IEC 25010:2023 ürün kalite modeline uygun: Functional Suitability, Performance
  Efficiency, Compatibility, Interaction Capability (eski Usability),
  Reliability, Security, Maintainability, Flexibility (eski Portability), Safety (yeni 2023).
  Her karakteristik için sub-characteristic'ler + kanıt + 1-5 skor + öneri.
  Önce SRS_*.md, kaynak kod, test sonuçları, monitoring config'ten kanıt toplar.
  Tetikleyici: "25010 quality", "kalite denetimi", "/feza-iso:iso25010-quality",
  "product quality assessment".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# ISO/IEC 25010:2023 Product Quality Audit

9 kalite karakteristiğine göre ürün denetimi.

## Tetikleyici
- "/feza-iso:iso25010-quality"
- "25010 / product quality"
- "kalite denetimi / quality assessment"

## Adım 0 — Bağlamı Topla

1. **`SRS_*.md`** öncelikli (NFR'ler 25010 etiketli, direkt skor için)
2. **Kaynak kod** (Glob + Grep ile sinyaller):
   - Auth/şifre/JWT → Security
   - Cache/Redis → Performance Efficiency
   - i18n/locale → Compatibility
   - aria-/role= → Interaction Capability
   - logging/monitoring → Reliability
   - Test paketi → Maintainability
   - Docker/CI, kurulum betikleri, otomatik ölçekleme → Flexibility
   - Fail-safe, alarm, tehlike uyarısı → Safety
3. **`HEURISTIC_EVAL_*.md`** (varsa) → Interaction Capability detayları
4. **`COLOR_AUDIT_*.md`** (varsa) → Interaction Capability + Inclusivity
5. **Test sonuçları** (varsa): coverage, performance benchmark
6. Hiç yoksa **TEK** soru: "Hangi ürün/SRS denetlenecek? (path veya brief)"

## Adım 1 — Gri Nokta (max 2)

| # | Gri nokta |
|---|-----------|
| 1 | **Skor formatı** (varsayılan: 1-5 her sub-characteristic) |
| 2 | **Min eşik** (geçer not, varsayılan: 3) |

## Adım 2 — Bilgi Tabanı
- `references/25010-characteristics.md` — 9 karakteristik tam liste, sub-char'lar, sektörel örnekler.

## Adım 3 — Üret

### Bölüm 1 — Yönetici Özeti

| Karakteristik | Skor (1-5) | Not |
|---------------|-----------|-----|
| Functional Suitability | 4.2 | İyi |
| Performance Efficiency | 3.5 | Orta |
| Compatibility | 2.8 | Geliştirilmeli |
| Interaction Capability | 4.0 | İyi |
| Reliability | 3.0 | Orta |
| Security | 3.7 | Orta-iyi |
| Maintainability | 4.5 | Çok iyi |
| Flexibility (eski Portability) | 4.0 | İyi |
| Safety (yeni 2023) | TBD — uygulanabilirlik teyit edilmedi | – |

**Genel ortalama:** X.X / 5.0

### Bölüm 2 — Karakteristik Bazlı Detay

Her karakteristik için ayrı bölüm. **9 karakteristik = 9 bölüm**, hiçbiri atlanmaz.

#### 1. Functional Suitability

| Sub-char | Tanım | Kanıt | Skor | Aksiyon |
|----------|-------|-------|------|---------|
| Functional Completeness | Tüm specified fonksiyonlar mevcut | SRS FR-001 ... FR-015 var | 4 | – |
| Functional Correctness | Doğru sonuç üretir | Test coverage %78 | 4 | %85'e çıkar |
| Functional Appropriateness | Görev tamamlamayı kolaylaştırır | UX feedback yok | 3 | UAT yap |

#### 2. Performance Efficiency

| Sub-char | Tanım | Kanıt | Skor |
|----------|-------|-------|------|
| Time Behaviour | Response time + throughput | NFR-001 < 2s, ölçüm yok | 3 |
| Resource Utilisation | Belirtilen kaynak içinde | – | TBD |
| Capacity | Maksimum parametre limitleri | NFR-003 100 eşzamanlı | 4 |

(Devam — 7 karakteristik daha aynı formatta)

### Bölüm 3 — Top-3 Risk + Top-3 Güç

- **En zayıf 3 alan** + spesifik düzeltme önerisi
- **En güçlü 3 alan** + sürdürme önerisi

### Bölüm 4 — Gerçek Dünya Başarısızlık Hatırlatması

Kalite karakteristiğinin ihmal edilmesinin sektörde yarattığı tipik sonuçlara (ör. ödeme akışında kesinti, yanlış fatura hesabı, güvenlik ihlali) kısaca atıf yap; projedeki en kritik karakteristiğin neden öncelikli olduğunu açıkla.

### Bölüm 5 — Sonraki Adımlar

- 25010 Quality in Use modeli (kullanım kalitesi) için ek değerlendirme önerisi (yol haritası)
- `/feza-iso:iso15939-measure` ile ölçüm planına geçiş önerisi
- `/feza-requirements:srs-generate` ile NFR güçlendirme önerisi

## Adım 4 — Self-Check
- [ ] 9 karakteristiğin HEPSİ tabloda mı?
- [ ] Her karakteristikte sub-characteristic detay tablosu var mı?
- [ ] Her sub-char için kanıt + skor mu?
- [ ] Genel ortalama hesaplandı mı?
- [ ] Top-3 risk + Top-3 güç var mı?
- [ ] **Flexibility** (eski Portability) ve **Safety** (2023 yeni) dahil mi; Portability ayrı karakteristik olarak sayılmadı mı?
- [ ] **Interaction Capability** olarak yazıldı mı (Usability değil)?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-iso (ISO Uyumu)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 5 — Yaz
- Dosya: `ISO25010_QUALITY_<proje>.md`

## Adım 6 — Rapor
1. Dosya yolu.
2. Genel skor ve en zayıf karakteristik.
3. Test edilen kanıt sayısı.
4. Bilinen boşluk.
5. Sonraki: `/feza-iso:iso15939-measure` ile sayısal ölçüm planı.

## Sınırlar
- Max 3 soru.
- 9 karakteristikten birini atlama.
- "Usability" terimini kullanma — 2023'te **Interaction Capability** oldu.
- Skor verirken kanıt zorunlu (TBD'siz tahmin yok).
- Portability'yi ayrı karakteristik olarak sayma — 2023'te Flexibility oldu.
- Safety 2023 yeni — atlama; uygulanamıyorsa gerekçesiyle işaretle.
