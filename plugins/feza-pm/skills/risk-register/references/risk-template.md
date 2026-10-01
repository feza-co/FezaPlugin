# Risk Register Template (PMBOK — Identify / Perform Qualitative Risk Analysis)

## Olasılık Skalası (1-5)

| Skor | Etiket | Olasılık |
|------|--------|----------|
| 1 | Çok Düşük | < 10% |
| 2 | Düşük | 10-30% |
| 3 | Orta | 30-50% |
| 4 | Yüksek | 50-75% |
| 5 | Çok Yüksek | > 75% |

## Etki Skalası (1-5)

| Skor | Etiket | Etki örneği |
|------|--------|-------------|
| 1 | Çok Düşük | < 1 gün gecikme / < %1 bütçe |
| 2 | Düşük | 1-3 gün / %1-5 bütçe |
| 3 | Orta | 5-10 iş günü / %5-15 bütçe |
| 4 | Yüksek | 10-20 iş günü / %15-25 bütçe / kalite hedef düşer |
| 5 | Çok Yüksek | > 1 ay / > %25 bütçe / proje iptal riski |

## Skor (P × I)

| Skor | Renk | Eylem |
|------|------|-------|
| 1-5 | Yeşil | Kabul + izle |
| 6-12 | Sarı | Mitigation planı şart |
| 13-25 | Kırmızı | Üst yönetim + acil aksiyon |

## Response Stratejisi Seçim Kuralları

| Skor | Önerilen Strateji |
|------|-------------------|
| 1-5 | Accept |
| 6-9 | Mitigate veya Accept (etki düşükse) |
| 10-15 | Mitigate (mutlaka) |
| 16-20 | Avoid veya Transfer |
| 21-25 | Avoid + üst yönetim onayı |

## Tipik Risk Bankası (yazılım projeleri)

### Technical
- 3rd party API kararsızlığı
- Performans hedeflerinin tutmaması
- Mimari kararın geç fark edilen yan etkisi
- Veritabanı migration sorunları
- Browser/cihaz uyumsuzluğu

### Schedule
- Tahminin altında kalan velocity
- External onay süreçleri (UX, hukuk, sponsor)
- Kritik yoldaki aktivitenin takılması
- Tatil sezonu ve yoğun dönem (kampanya, dönem sonu kapanışı) etkisi

### Cost
- Cloud/3rd party fiyat artışı
- Lisans maliyeti öngörülemeyen artış
- Kapsam genişlemesi (scope creep) → ek labor

### Resource
- Takım üyesinin ayrılması
- Beceri eksikliği (yeni teknoloji öğrenme)
- Çift atanmış kaynak

### External
- Regülasyon değişikliği (KVKK, GDPR)
- 3rd party API politika değişikliği
- Rakibin pazara erken çıkışı
- Tedarikçi gecikmesi

### Quality
- Test coverage düşük → bug'lar production'a sızıyor
- Code review zaman bulamamak
- Performance regression

### Operational
- Deployment otomasyonu eksik → manuel hata
- Monitoring boşluğu → arıza geç fark
- Backup stratejisi olmadan production

## Pozitif Risk (Opportunity) Örnekleri

- Yeni bir kütüphane çıkar, geliştirme süresini %30 azaltır
- Sponsor ek bütçe vermek isteyebilir
- Bir iş ortağı hazır test veri seti sağlayabilir
- Benzer bir ekibin açık kaynak çalışması yeniden kullanılabilir

## İskelet

```markdown
> **Risk Register** — <Proje>
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-pm:risk-register

# Risk Tablosu

| ID | Kategori | Risk | P | I | Skor | Strateji | Aksiyon | Owner | Trigger | Status |
|----|----------|------|---|---|------|----------|---------|-------|---------|--------|
| R-001 | ... | ... | ... | ... | ... | ... | ... | ... | ... | Open |

# P × I Matrisi
[5x5 matriks tablo]

# Top-5 Yüksek Skorlu Risk
1. R-... (skor 20) — ...
2. ...

# Pozitif Riskler (Opportunities)
| ID | Fırsat | P | I | Skor | Strateji |
|----|--------|---|---|------|----------|
| O-001 | ... | ... | ... | ... | Exploit/Share/Enhance |

# Bilinen Boşluklar
...
```
