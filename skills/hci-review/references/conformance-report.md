# Uyumluluk Raporu (ACR) Şablonu

Bu dosya, `hci-review --acr` çıktısının (`ACR_<ürün>_<tarih>.md`) yapısını tanımlar. Şablon,
VPAT 2.5 INT/EU yapısına (ürün bilgisi + değerlendirme yöntemi + standartlar + terimler +
kriter tabloları) uyumlu bölümler kullanır; VPAT belgesinin kendisi kopyalanmaz, yalnız yapısı
örnek alınır.

> **Bu rapor hukuki uyum beyanı değildir.** Otomatik araçlar WCAG kriterlerinin yalnız bir kısmını
> ölçer; kalanı manuel inceleme gerektirir. Kanıtsız "Destekliyor" beyanı yazılamaz. Hukuki
> gerekliliklerin yorumu için yetkili kuruma/hukukçuya başvurulmalıdır.

## 1. Ürün ve Sürüm

| Alan | Değer |
|---|---|
| Ürün adı | `<ürün adı>` |
| Ürün sürümü | `<vX.Y.Z / build>` |
| Rapor tarihi | `<YYYY-AA-GG>` |
| Raporu üreten | `<kim / rol>` |
| Değerlendirilen kapsam | `<URL listesi / ekran-akış kapsamı / kapsam dışı sayfalar>` |
| Üretici | FezaPlugin v<sürüm> · `/feza-hci:hci-review --acr` |

## 2. Değerlendirme Yöntemi

| Araç / yöntem | Sürüm | Ne ölçer | Sınır |
|---|---|---|---|
| verify-ui profili | `--profile wcag22aa` \| `en301549` | E1–E29 otomatik/karma kriterleri; `report.json → results.E<kod>` | Kriterlerin bir kısmını ölçer; statik kriterleri `ok: null` ile bırakır |
| axe-core | `<kurulu sürüm>` (≥ 4.8.0) | E1 (serious + critical), E2, E8 ve etiketli kural seti | Yalnız tespit edilebilir ihlaller; yanlış pozitif/negatif olabilir |
| verify-ui sürümü | `<paket sürümü>` | report.json üstbilgisi | — |
| Erişilebilirlik ağacı | `ariaSnapshot()` | E28 (tek `h1`, `main`, başlık atlaması, ad) | Ad kalitesini değil varlığını ölçer |
| Manuel testler | — | Kriter tablosunda "manuel" işaretli satırlar | Değerlendiren kişinin deneyimine bağlı |

`--profile en301549`: axe `runOnly` etiketlerine `EN-301-549` eklenir. Kurulu axe sürümünde bu
etiket yoksa (4.8.0 öncesi) profil `wcag22aa`ya düşer ve bu durum raporlanır. `report.json`
`profile` alanı kullanılan profili taşır. `--aria-baseline <dosya>` verilirse E28 snapshot'ının
önceki tabana göre farkı raporlanır.

Kanıt yolları: her satırın "Kanıt" sütunu ya bir `E<kod>` sonucuna (ör. `report.json → results.E2`),
ya `report.json` dosya yoluna, ya da "manuel" etiketli gözleme işaret eder. Bir SC ancak **o SC'ye
özgü** bir E kodu `ok: true` ise (ya da E1 içinde SC'ye özgü axe kuralı — ör. `image-alt` → 1.1.1 —
`report.json`daki kural kimliğiyle eşleşip `ok: true` ise) otomatik olarak "Destekliyor" olur; yalnızca
genel `E1 ok: true` bir SC'yi "Destekliyor" yapmaz. SC'ye özgü ölçüm yoksa satır "Kısmen / destekleyici
kanıt" notuyla işaretlenir ve manuel kontrol listesine aktarılır. Otomatik ölçüm **yalnız destekleyici
kanıttır**; tek başına uyum beyanı sayılmaz.

## 3. Uygulanabilir Standartlar

- **WCAG 2.2** — Seviye A ve AA başarı kriterleri (W3C Recommendation, 5 Ekim 2023;
  <https://www.w3.org/TR/WCAG22/>). Bu raporun kriter listesi bu sürümden alınmıştır.
- **EN 301 549 V4.1.1 (2026-09)** — Madde 9 (web). Bu sürümde madde 9, 10 ve 11 WCAG 2.2'ye
  hizalanmıştır; axe-core `EN-301-549` etiketi 4.8.0+ sürümlerinde mevcuttur.
- **Türkiye** — Cumhurbaşkanlığı Genelgesi 2025/10 (RG 32933, 21.06.2025) web/mobil
  erişilebilirliğe atıf yapar ve WCAG 2.2'ye işaret eder. Genelgedeki uyum seviyesi (A/AA) ve
  bir TS EN numarası **doğrulanmadığı için bu raporda yazılmaz.**

## 4. Terimler

| Terim | Anlam |
|---|---|
| **Destekliyor** | Kriter karşılanıyor; kanıt var. Otomatik ölçümde `ok: true`, statik/karma kriterde "elle doğrulandı: kim/ne zaman" notu zorunludur. |
| **Kısmen destekliyor** | Bazı içerik/durumlarda karşılanıyor, bazılarında ihlal var. Eksik kapsam "Not" sütununda yazılır. |
| **Desteklemiyor** | Kriter karşılanmıyor; ihlal kanıtı var (ör. `E2 FAIL`). |
| **Uygulanamaz** | Kriter ürün kapsamında değil (ör. yalnız metin arayüzde 1.2.x medya kriterleri). Gerekçe zorunlu. |
| **Değerlendirilmedi** | Henüz incelenmedi. Otomatik satırlar doldurulmuş, manuel satırlar bu durumda bırakılmıştır; manuel kontrol listesine aktarılır. |

**Kurallar:**
- Kanıtsız "Destekliyor" **yasaktır**.
- Statik/karma kriterler "elle doğrulandı: <kim/ne zaman>" notu olmadan "Destekliyor" olamaz.
- Otomatik ölçüm (verify-ui/axe) tek başına uyum beyanı değildir; destekleyici kanıttır.
- "0 ihlal = erişilebilir" ifadesi kullanılmaz.

## 5. Kriter Tablosu — WCAG 2.2 Seviye A (31 kriter)

Satır biçimi: `| SC | Ad | Seviye | Durum | Kanıt | Not |`.

| SC | Ad | Seviye | Durum | Kanıt (E kodu / report.json yolu / manuel) | Not |
|---|---|---|---|---|---|
| 1.1.1 | Non-text Content | A | Değerlendirilmedi | `E1` (axe `image-alt`) + manuel | Alternatif metnin **kalitesi** manuel değerlendirilir |
| 1.2.1 | Audio-only and Video-only (Prerecorded) | A | Değerlendirilmedi | manuel | Medya yoksa "Uygulanamaz (gerekçe)" |
| 1.2.2 | Captions (Prerecorded) | A | Değerlendirilmedi | manuel | — |
| 1.2.3 | Audio Description or Media Alternative (Prerecorded) | A | Değerlendirilmedi | manuel | — |
| 1.3.1 | Info and Relationships | A | Değerlendirilmedi | `E8`, `E28` | Yapı/ilişki anlamı manuel teyit edilir |
| 1.3.2 | Meaningful Sequence | A | Değerlendirilmedi | manuel | Okuma sırası anlamı manuel |
| 1.3.3 | Sensory Characteristics | A | Değerlendirilmedi | manuel | — |
| 1.4.1 | Use of Color | A | Değerlendirilmedi | manuel | Bilgi yalnız renkle verilmemeli |
| 1.4.2 | Audio Control | A | Değerlendirilmedi | manuel | Otomatik çalan ses yoksa "Uygulanamaz" |
| 2.1.1 | Keyboard | A | Değerlendirilmedi | `E6`, `E7` + manuel | Tüm işlevler klavyeyle erişilebilir mi — manuel |
| 2.1.2 | No Keyboard Trap | A | Değerlendirilmedi | `E7` | — |
| 2.1.4 | Character Key Shortcuts | A | Değerlendirilmedi | manuel | Tek karakter kısayolu varsa kapatılabilmeli |
| 2.2.1 | Timing Adjustable | A | Değerlendirilmedi | manuel | Zaman sınırı yoksa "Uygulanamaz" |
| 2.2.2 | Pause, Stop, Hide | A | Değerlendirilmedi | manuel | — |
| 2.3.1 | Three Flashes or Below Threshold | A | Değerlendirilmedi | manuel | — |
| 2.4.1 | Bypass Blocks | A | Değerlendirilmedi | `E28` + manuel | Atlama bağlantısı/yer işareti manuel |
| 2.4.2 | Page Titled | A | Değerlendirilmedi | `E1` | Başlık anlamlı mı — manuel |
| 2.4.3 | Focus Order | A | Değerlendirilmedi | `E7` | — |
| 2.4.4 | Link Purpose (In Context) | A | Değerlendirilmedi | `E1` (axe `link-name`) + manuel | Bağlantı amacı anlamı manuel |
| 2.5.1 | Pointer Gestures | A | Değerlendirilmedi | `E18` + manuel | Çok noktalı/yol tabanlı işaret varsa manuel |
| 2.5.2 | Pointer Cancellation | A | Değerlendirilmedi | manuel | — |
| 2.5.3 | Label in Name | A | Değerlendirilmedi | `E1` (axe `label-content-name-mismatch`) + manuel | — |
| 2.5.4 | Motion Actuation | A | Değerlendirilmedi | manuel | Hareketle tetikleme yoksa "Uygulanamaz" |
| 3.1.1 | Language of Page | A | Değerlendirilmedi | `E1` (axe `html-has-lang`), `E26`, `E27` | Sayfa dili ile TR biçim kuralları birlikte |
| 3.2.1 | On Focus | A | Değerlendirilmedi | manuel | Odaklanınca bağlam değişmemeli |
| 3.2.2 | On Input | A | Değerlendirilmedi | manuel | — |
| 3.2.6 | Consistent Help | A | Değerlendirilmedi | `E20` | Yardım mekanizması aynı göreli sırada |
| 3.3.1 | Error Identification | A | Değerlendirilmedi | `E11`, `E1` + manuel | Hata metni anlamı manuel |
| 3.3.2 | Labels or Instructions | A | Değerlendirilmedi | `E8` | — |
| 3.3.7 | Redundant Entry | A | Değerlendirilmedi | `E19` | — |
| 4.1.2 | Name, Role, Value | A | Değerlendirilmedi | `E8`, `E1` | Ad/rol/durum anlamı manuel teyit |

## 6. Kriter Tablosu — WCAG 2.2 Seviye AA (24 kriter)

| SC | Ad | Seviye | Durum | Kanıt (E kodu / report.json yolu / manuel) | Not |
|---|---|---|---|---|---|
| 1.2.4 | Captions (Live) | AA | Değerlendirilmedi | manuel | Canlı medya yoksa "Uygulanamaz" |
| 1.2.5 | Audio Description (Prerecorded) | AA | Değerlendirilmedi | manuel | — |
| 1.3.4 | Orientation | AA | Değerlendirilmedi | manuel | Yön kilidi yoksa "Uygulanamaz" |
| 1.3.5 | Identify Input Purpose | AA | Değerlendirilmedi | `E1` (axe `autocomplete-valid`), `E17` | — |
| 1.4.3 | Contrast (Minimum) | AA | Değerlendirilmedi | `E2` | `report.json → results.E2` |
| 1.4.4 | Resize Text | AA | Değerlendirilmedi | `E13` | %200 yakınlaştırma |
| 1.4.5 | Images of Text | AA | Değerlendirilmedi | manuel | Logo istisnası manuel |
| 1.4.10 | Reflow | AA | Değerlendirilmedi | `E5`, `E24`, `E25` | 320 px'de yatay kaydırma yok |
| 1.4.11 | Non-text Contrast | AA | Değerlendirilmedi | `E3`, `E21` | — |
| 1.4.12 | Text Spacing | AA | Değerlendirilmedi | `E16` | — |
| 1.4.13 | Content on Hover or Focus | AA | Değerlendirilmedi | manuel | Kapatılabilir/üzerinde kalabilir/tutarlı |
| 2.4.5 | Multiple Ways | AA | Değerlendirilmedi | manuel | — |
| 2.4.6 | Headings and Labels | AA | Değerlendirilmedi | `E28` + manuel | Başlık/etiket anlamı manuel |
| 2.4.7 | Focus Visible | AA | Değerlendirilmedi | `E6` | — |
| 2.4.11 | Focus Not Obscured (Minimum) | AA | Değerlendirilmedi | `E14` | — |
| 2.5.7 | Dragging Movements | AA | Değerlendirilmedi | `E18` | Sürükleme yoksa "Uygulanamaz" |
| 2.5.8 | Target Size (Minimum) | AA | Değerlendirilmedi | `E4`, `E15` | — |
| 3.1.2 | Language of Parts | AA | Değerlendirilmedi | `E1` (axe `valid-lang`) + manuel | İç dil değişimi manuel |
| 3.2.3 | Consistent Navigation | AA | Değerlendirilmedi | `E20` + manuel | — |
| 3.2.4 | Consistent Identification | AA | Değerlendirilmedi | manuel | — |
| 3.3.3 | Error Suggestion | AA | Değerlendirilmedi | `E11` + manuel | Öneri metni anlamı manuel |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | Değerlendirilmedi | manuel | Onay/geri alma/denetim akışı manuel |
| 3.3.8 | Accessible Authentication (Minimum) | AA | Değerlendirilmedi | `E17` | Parola alanı yoksa "Uygulanamaz" |
| 4.1.3 | Status Messages | AA | Değerlendirilmedi | `E11` + manuel | Canlı bölge kullanımı manuel |

> **AAA hedefli E kodları:** E12 (SC 2.3.3) ve E22 (SC 1.4.6) WCAG 2.2 AAA hedefli ölçümlerdir;
> bu A/AA raporunda satır olarak yer almaz.

> **4.1.1 Parsing:** WCAG 2.2'de kaldırılmıştır (obsolete and removed). Bu nedenle A/AA
> listesinde yer almaz ve bu raporda satır olarak değerlendirilmez.

## 7. Özet ve Kapsam Şeffaflığı

- Toplam kriter: **31 (A) + 24 (AA) = 55** (WCAG 2.2, 5 Ekim 2023; kaynak: <https://www.w3.org/TR/WCAG22/>).
- "Destekliyor" / "Kısmen destekliyor" / "Desteklemiyor" sayıları doldurulurken her satırın
  kanıt sütununa bakılır; kanıtsız satır "Değerlendirilmedi" bırakılır.
- **Otomatik doğrulanamayanlar:** raporda ayrı bir bölüm olarak, en az şu manuel maddeleri içerir
  (bkz. `references/evidence-rubric.md` §5):
  - [ ] Okuma sırasının anlamı (ekran okuyucuda mantıklı mı)
  - [ ] Alternatif metin kalitesi (varlık değil, anlam)
  - [ ] Karmaşık bileşen klavye akışı (combobox, takvim, sürükle-bırak)
  - [ ] Ekran okuyucu ile deneme (NVDA / VoiceOver / TalkBack)
  - [ ] Hata mesajlarının anlamı ve kurtarma yolu
- Manuel maddeler işaretlenmeden rapor "teslim edilebilir" sayılmaz.

## 8. Sınırlar

- Bu şablon yalnız doküman tarafıdır; `--profile`, `--aria-baseline` ve E28 ölçümü verify-ui
  tarafında yürütülür. Rapor, verify-ui çıktısı (`report.json`) yoksa bunu açıkça belirtir.
- Rapor bir hukuki uyum beyanı değildir; hukuki gereklilik yorumu için yetkili kurum/hukukçu.
