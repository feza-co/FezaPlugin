# Tahmin Yöntemleri (PMBOK — Estimate Activity Durations / Estimate Costs)

Aşağıdakiler PMBOK'taki tahmin tekniklerinden 4'üdür (PMBOK bunların yanında analog tahmin, veri analizi, karar verme ve toplantı gibi teknikler de tanımlar). Bu skill parametrik, aşağıdan yukarı ve üç noktalı tahmini birlikte uygular ve karşılaştırır; uzman yargısı kalibrasyon için kullanılır.

> **Not — Analogous Estimating (analog tahmin):** Benzer bir geçmiş projenin gerçekleşen süre/maliyetini, büyüklük farkına göre ölçekleyerek kullanır. Hızlı ve ucuzdur ama doğruluğu düşüktür; yalnızca proje başında, ayrıntılı WBS yokken kaba bir aralık vermek için kullanılır. Kullanıldığında kaynak proje ve ölçekleme oranı "Varsayım:" etiketiyle yazılır.

## 1. Expert Judgment

Geçmiş benzer projelerden gelen uzman yargısı. Bu skill için: README/kod analizinden çıkarılan benzerlik (ör. "yaklaşık 20 endpoint'lik orta CRUD uygulaması"). Tek başına çıktı olarak değil, diğer yöntemleri kalibre etmek için.

## 2. Parametric Estimating

İstatistiksel/algoritmik formüllerle tahmin. Yazılım projeleri için tipik:

| Birim | Formül (gün, mid-dev) |
|-------|----------------------|
| UI sayfa (basit) | 1.0 × sayfa |
| UI sayfa (form/state) | 1.5–2.5 × sayfa |
| API endpoint (basit GET) | 0.25 × endpoint |
| API endpoint (CRUD seti) | 0.5 × endpoint |
| API endpoint (auth/business logic) | 1.0–2.0 × endpoint |
| DB tablosu (model+migration+seed) | 0.5 × tablo |
| Test paketi (unit, modül başı) | 0.5 × modül |
| Integration test seti | 1.0 × ana akış |
| Dokümantasyon (sayfa) | 0.25 × sayfa |
| Code review (PR) | 0.1 × PR |

**Çarpanlar:**
- Junior: ×1.7
- Mid: ×1.0 (referans)
- Senior: ×0.7
- Yeni teknoloji öğrenme: ×1.3
- Legacy/karmaşık entegrasyon: ×1.5

## 3. Bottom-Up Estimating

Her WBS yaprağı 2-4 alt göreve kırılır, her birine süre verilir, toplanır.

Örnek: "Login sayfası modülü"
- UI komponenti: 1.5 gün
- State/store entegrasyonu: 1.0 gün
- Form validasyon: 1.0 gün
- Backend bağlantı + error handling: 0.5 gün
- **Toplam: 4.0 gün**

> Not: bottom-up daha uzun sürer, daha doğru sonuç verir.

## 4. Three-Point Estimating / PERT — ANA YÖNTEM

**Optimistic (O)** — her şey yolunda giderse minimum süre.
**Most Likely (M)** — gerçekçi senaryo.
**Pessimistic (P)** — her şey ters giderse maksimum süre.

### Beklenen Süre (Expected Duration)

```
E = (O + 4M + P) / 6
```

Bu, beta dağılımının ağırlıklı ortalamasıdır; M (most likely) 4 kat ağırlıklı.

### Standart Sapma

```
σ = (P − O) / 6
```

### Varyans

```
σ² = ((P − O) / 6)²
```

### Toplam Proje Tahmini

- **Toplam E** = Σ Eᵢ (tüm aktivitelerin E'lerinin toplamı)
- **Toplam σ** = √(Σ σᵢ²) — varyanslar toplanır, kareköküdür alınır

### Güven Aralıkları

| Aralık | Olasılık |
|--------|----------|
| E ± 1σ | %68 |
| E ± 2σ | %95 |
| E ± 3σ | %99.7 |

Tipik raporlamada **E ± 2σ** kullanılır (95% güven).

## Karşılaştırma Tablosu (örnek)

| WBS | O | M | P | PERT (E) | σ | Parametric | Bottom-up | Önerilen |
|-----|---|---|---|----------|---|------------|-----------|----------|
| 1.1 Login | 2 | 4 | 8 | **4.33** | 1.0 | 4.0 | 4.0 | 4.3 (PERT) |
| 1.2 Register | 3 | 5 | 10 | **5.5** | 1.17 | 5.0 | 5.5 | 5.5 (PERT) |
| 2.1 Catalog list | 2 | 3 | 6 | **3.33** | 0.67 | 3.0 | 3.0 | 3.3 (PERT) |

3 yöntem 1 gün içinde anlaşıyorsa **yüksek güven**. >3 gün farklılaşıyorsa "Bilinen Boşluklar"a not düş.

## Anti-Pattern'ler

- ✗ "Yaklaşık 10 iş günü" gibi tek nokta tahmin → 3 değer şart.
- ✗ O = M = P → varyans 0 olur, anlamsız.
- ✗ P değerini O'nun 2 katından az tutmak (yazılımda pesimist tahmin genelde 2-3x optimisti aşar).
- ✗ Tüm projenin σ'sını yapraklara eşit dağıtmak (varyans toplanır, kareköküdür alınır).
