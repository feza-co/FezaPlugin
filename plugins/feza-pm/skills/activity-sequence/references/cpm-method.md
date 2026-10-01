# Critical Path Method (PMBOK — Develop Schedule)

## Bağımlılık Tipleri

| Tip | İsim | Anlam | Yaygın mı |
|-----|------|-------|-----------|
| **FS** | Finish-to-Start | A bitmeden B başlayamaz | %90+ |
| **SS** | Start-to-Start | A başlamadan B başlayamaz | bazen (paralel iş başlangıcı) |
| **FF** | Finish-to-Finish | A bitmeden B bitmez | nadir |
| **SF** | Start-to-Finish | A başlamadan B bitemez | çok nadir |

## Lead ve Lag

- **Lead** (negatif lag) — bağımlı aktivite erken başlar (örn. A %75 bittiğinde B başlayabilir).
- **Lag** (gecikme) — bağımlılık sonrası bekleme (örn. boya kuruması için 2 gün lag).

## CPM Algoritması

### Forward Pass (Earliest dates)

```
Her aktivite için:
  ES (Earliest Start) = max(predecessor'ların EF'i)
  ES_first = 0
  EF (Earliest Finish) = ES + Duration
```

### Backward Pass (Latest dates)

```
Project End'ten geriye:
  LF (Latest Finish) = min(successor'ların LS'i)
  LF_last = max(EF) of all activities (proje bitiş tarihi)
  LS (Latest Start) = LF − Duration
```

### Slack (Float)

```
Slack = LS − ES = LF − EF
Slack = 0  → kritik aktivite
Slack > 0  → esnek aktivite
```

### Critical Path

Slack = 0 olan aktivitelerin **kesintisiz zinciri** = kritik yol.
- Birden fazla kritik yol olabilir.
- Kritik yoldaki herhangi bir gecikme proje sonunu geciktirir.

## Örnek

| ID | Süre | Pred |
|----|------|------|
| A | 1 | – |
| B | 2 | A |
| C | 3 | B |
| D | 2 | A |
| E | 1 | C, D |

Forward Pass:
- A: ES=0, EF=1
- B: ES=1, EF=3
- C: ES=3, EF=6
- D: ES=1, EF=3
- E: ES=max(6,3)=6, EF=7

Backward Pass (proje sonu = 7):
- E: LF=7, LS=6
- C: LF=6, LS=3
- D: LF=6, LS=4
- B: LF=3, LS=1
- A: LF=min(1,4)=1, LS=0

Slack:
- A: 0 ✓ kritik
- B: 0 ✓ kritik
- C: 0 ✓ kritik
- D: 1 (esnek)
- E: 0 ✓ kritik

**Kritik yol: A → B → C → E, toplam 7 gün.**

## Risk Önceliği

- **Slack = 0**: kritik. En yakın izleme.
- **Slack 1-2 gün**: yüksek risk. Yakın izleme.
- **Slack 3+ gün**: rahat.

## Anti-Pattern'ler

- ✗ Bağımlılık döngüsü (A→B→A) → CPM çözülemez.
- ✗ Tüm aktiviteler kritik → bağımlılıklar gerçekçi değil veya hepsi seri.
- ✗ Slack negatif çıktı → backward pass'te hesap hatası veya proje sonunu geriye çekmen gerekiyor.
- ✗ "Yaklaşık 10 gün" demek → CPM mekanik hesap, kesin sayı verir.
