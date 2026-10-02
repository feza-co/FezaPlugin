<!-- generated from shared/output-conventions.md — do not edit -->
# Ortak Çıktı Kuralları (Output Conventions)

## Dosya Adlandırma

| Skill | Dosya adı şablonu |
|-------|-------------------|
| `srs-generate` | `SRS_<proje>_v0.1.md` |
| `scope-statement` | `SCOPE_<proje>.md` |
| `wbs` | `WBS_<proje>.md` |
| `estimate` | `ESTIMATES_<proje>.md` |
| `swot` | `SWOT_<proje>.md` |
| `raci` | `RACI_<proje>.md` |
| `budget` | `BUDGET_<proje>.md` |
| `activity-sequence` | `ACTIVITIES_<proje>.md` |
| `risk-register` | `RISK_REGISTER_<proje>.md` |
| `stakeholder-map` | `STAKEHOLDERS_<proje>.md` |
| `comm-plan` | `COMM_PLAN_<proje>.md` |
| `competitor-analysis` | `COMPETITORS_<proje>.md` |

`<proje>` değeri sırasıyla:
1. `package.json` / `pyproject.toml` / `Cargo.toml` `name` alanı
2. `BRIEF.md` ilk başlık
3. cwd klasör adı

Hepsi **kebab-case**'e dönüştürülür (boşluk → tire, küçük harf, Türkçe karakter sadeleştirme: ç→c, ş→s, ğ→g, ü→u, ö→o, ı→i).

## Konum

Tüm çıktılar **proje kök dizinine** yazılır. Alt klasör YOK. Bir `docs/` klasörü zaten varsa, opsiyonel olarak `docs/` altına da yazılabilir; yoksa kök.

## Üst Bilgi

Varsayılan teslim formatında üst bilgi alanları **kapak sayfasındaki tabloya** yerleşir (bkz. "Teslim Formatı"). Kullanıcı sade format istediğinde dosyanın başına şu blok konur:

```markdown
> **<Skill başlığı>** — <Proje adı>  
> Üretildi: <ISO tarih, örn. 2026-05-05>  
> Üretici: FezaPlugin v<sürüm> · `/<paket>:<skill>`  
> Standart/Kaynak: <ilgili standart, ör. ISO/IEC/IEEE 29148:2018>
```

`<paket>` ad alanları: `feza-requirements`, `feza-pm`, `feza-hci`, `feza-sqa`, `feza-toolkit` (ör. `/feza-requirements:srs-generate`, `/feza-pm:wbs`).

## Teslim Formatı

Tüm dokümanlar **varsayılan olarak** kurumsal teslim formatında üretilir. Ayrıntılı şablon: `references/delivery-format.md`.

| # | Parça | Kural |
|---|-------|-------|
| 1 | **Kapak sayfası** | Proje adı, doküman başlığı, sürüm, tarih, hazırlayan(lar), standart, üretici. Opsiyonel alanlar: **Kurum / Ekip / Danışmanlık firması / Müşteri** — bilgi yoksa satır kaldırılır. |
| 2 | **Özet / Abstract** | TR + EN, her biri 150-300 kelime, en az 5 anahtar kelime. |
| 3 | **İçindekiler** | Numaralı, hiyerarşik (1 / 1.1 / 1.1.1). |
| 4 | **Ana bölümler** | Skill'in kendi iskeleti (ör. SRS için MSRS 1-5). |
| 5 | **Kaynakça** | IEEE (varsayılan) veya APA; tek stil, tutarlı. Kamuya açık standart ve yayınlar. İskelette referans bölümü varsa (SRS 1.4) kaynakça oradadır. |
| 6 | **Ekler** | Bilinen Boşluklar, terimler, ek tablolar. İskelette ek bölümü varsa (SRS 5) oraya yerleşir. |
| 7 | **Doküman Onayı / Sorumluluk Beyanı** | Opsiyonel; yalnızca kullanıcı/kurum/müşteri isterse. Onay tablosu: hazırlayan / kontrol eden / onaylayan. |

**Sade / kısa format:** Kullanıcı "sade format", "kısa format", "kapaksız" veya `--plain` isterse kapak, özet ve içindekiler atlanır; yerine yukarıdaki üst bilgi bloğu kullanılır. Kaynakça ve "Bilinen Boşluklar" sade formatta da korunur.

**Word/PDF:** Çıktı Markdown'dır. Kullanıcı Word veya PDF isterse `references/delivery-format.md` → "Pandoc ile Word/PDF Dönüştürme" komutu önerilir (Pandoc kuruluysa çalıştırılabilir).

## Gizli Kalite Kapısı

Her doküman, dosyaya yazılmadan önce `references/quality-gate.md` prosedüründen geçer: taslak v1 bellekte üretilir, üreten paketin kriter setiyle 100 üzerinden puanlanır, eşiğin (85) altındaysa en fazla 2 turda revize edilir. Kullanıcıya **yalnızca son doküman** verilir; puan, kriter tablosu ve revizyon notları sohbette gösterilmez, dosyaya yazılmaz. Kullanıcı açıkça "kalite puanını göster" diye isterse sohbette kısa özet verilebilir.

## Genel Stil

- **Resmî, teknik ton.** Emoji yok. "Süper, harika, müthiş" gibi sözcükler yok.
- **Tablolar tercih edilir.** Uzun listeler yerine numaralı tablolar.
- **Kanıt zorunluluğu.** Her iddia/satır için ya brief'ten alıntı, ya kod referansı, ya "Varsayım: ..." etiketi.
- **TBD kullanımı:** Format `TBD — [neden açıkça yazılır]`. Boş "TBD" YASAK.
- **Türkçe karşılıklar parantezde:** "Gereksinim Tahsisi (Requirements Allocation)".

## "Bilinen Boşluklar" Bölümü

Her dosyada zorunlu (teslim formatında Ekler altında, sade formatta dosyanın sonunda):

```markdown
## Bilinen Boşluklar

| # | Boşluk | Neden açık | Önerilen çözüm |
|---|--------|------------|----------------|
| 1 | ... | ... | Kullanıcıdan al / Üst seviyede netleşince güncelle |
```

Boşluk yoksa "Bu çıktı için kritik boşluk yok." yaz, bölümü silme.

## Kullanıcıya Rapor (sohbet çıktısı)

Dosya yazıldıktan sonra **5 satırı geçmeyen** rapor:

1. Dosya yolu (Markdown link).
2. Tek cümle özet (kaç satır/karakter, ana sayım: kaç FR / kaç WBS dalı / kaç risk vs.).
3. Otomatik tespit edilen kritik bağlam (dil, proje adı, kullanılan input dosyaları, format: teslim/sade).
4. Bilinen boşluk sayısı.
5. Önerilen sonraki skill çağrısı (örn. "Sırada: `/feza-pm:wbs` çalıştırılabilir").

Rapor kalite puanı, kriter skoru veya revizyon sayısı İÇERMEZ.

## Yasak

- Diyagram üretilmez; tablo ve ASCII yeterli.
- Kullanıcının onaylamadığı maliyet/saatlik ücret tahminleri kesin sayı olarak yazılamaz; "Varsayım: 50 USD/saat (sektör ortalaması)" şeklinde etiketli yazılır.
- Sohbette uzun çıktıyı bas + dosyaya yazma → her zaman **dosyaya yaz**, sohbette sadece özet.
- Kalite puanlama/değerlendirme dosyası üretmek.
