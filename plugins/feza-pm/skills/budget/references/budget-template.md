# Budget Template (PMBOK — Determine Budget)

## Formüller

```
Direct Labor       = Σ (saat × saatlik ücret)
Direct Materials   = lisans + donanım + bulut + 3rd party
Indirect           = (Direct Labor + Direct Materials) × overhead%
Cost Baseline      = Direct Labor + Direct Materials + Indirect
Contingency Res.   = Cost Baseline × contingency%
Project Budget     = Cost Baseline + Contingency Reserve
Management Res.    = Project Budget × management%
TOTAL              = Project Budget + Management Reserve
```

## İskelet

```markdown
> **Budget Plan** — <Proje Adı>
> Para birimi: <USD/EUR/TRY>
> Saatlik ücret kaynağı: <gerçek / varsayım>
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-pm:budget

## 1. Direct Labor

| WBS | Aktivite | Saat (PERT E) | Rol | Saatlik | Tutar |
|-----|----------|---------------|-----|---------|-------|
| 1.1 | ... | 32 | Mid FE Dev | $40 | $1,280 |
| ... |
| **Toplam Direct Labor** | | **X saat** | | | **$Y** |

## 2. Direct Materials

| Kalem | Birim | Adet | Tutar |
|-------|-------|------|-------|
| AWS aylık | $50 × 6 ay | – | $300 |
| Domain | $15/yıl | 1 | $15 |
| ... |
| **Toplam** | | | **$Z** |

## 3. Indirect Costs

| Kategori | Hesap | Tutar |
|----------|-------|-------|
| Ofis/Yönetim overhead | (Labor + Materials) × 20% | $W |

## 4. Cost Baseline

`Direct Labor + Direct Materials + Indirect = $BASELINE`

## 5. Reserves

| Reserve | Oran | Tutar | Açıklama |
|---------|------|-------|----------|
| Contingency | 10% | $... | Bilinen riskler için |
| Management | 5% | $... | Bilinmeyen riskler için |

## 6. Toplam Proje Bütçesi

**TOTAL = $TOTAL**

## 7. Cash-Flow (Ay bazlı)

| Ay | Aktiviteler | Aylık Maliyet | Birikimli |
|----|-------------|---------------|-----------|
| M1 | ... | $... | $... |
| ... |
| **Toplam** | | **$TOTAL** | – |

## Bilinen Boşluklar
...
```
