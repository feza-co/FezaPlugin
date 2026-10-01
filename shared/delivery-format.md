# Teslim Formatı Şablonu (Delivery Format Reference)

`references/output-conventions.md` → "Teslim Formatı" bölümünün ayrıntılı şablonudur. Tüm FezaPlugin dokümanları varsayılan olarak bu yapıyla üretilir.

## 1. Kapak Sayfası

```markdown
# <PROJE ADI>

## <Doküman başlığı — ör. Yazılım Gereksinim Spesifikasyonu (SRS)>

<Alt başlık / tek cümlelik tanım>

---

| Alan | Değer |
|------|-------|
| Sürüm | v0.1 |
| Tarih | <YYYY-MM-DD> |
| Hazırlayan(lar) | <Ad Soyad / Rol> |
| Kurum | <opsiyonel> |
| Ekip | <opsiyonel> |
| Danışmanlık firması | <opsiyonel> |
| Müşteri | <opsiyonel> |
| Gizlilik | <Herkese açık / Kurum içi / Gizli> |
| Standart | <ör. ISO/IEC/IEEE 29148:2018> |
| Üretici | FezaPlugin v<sürüm> · `/<paket>:<skill>` |

---
```

Kurallar:
- **Kurum / Ekip / Danışmanlık firması / Müşteri** satırları opsiyoneldir; bilgi yoksa satır tamamen kaldırılır (boş bırakılmaz, `TBD` yazılmaz).
- "Hazırlayan(lar)" bilinmiyorsa `TBD — hazırlayan bilgisi verilmedi` yazılır.
- Logo yer tutucusu kullanılmaz; kurumsal şablon Pandoc `--reference-doc` ile uygulanır.

## 2. Özet / Abstract

```markdown
## Özet

<Türkçe özet — 150-300 kelime: amaç → yöntem → temel bulgular/çıktılar → sonuç>

**Anahtar Kelimeler:** kelime1, kelime2, kelime3, kelime4, kelime5

## Abstract

<İngilizce özet — aynı içerik, 150-300 kelime>

**Keywords:** keyword1, keyword2, keyword3, keyword4, keyword5
```

| Boyut | Kural |
|-------|-------|
| Uzunluk | TR ve EN ayrı ayrı 150-300 kelime |
| Yapı | Amaç → Yöntem → Bulgu/Çıktı → Sonuç |
| Anahtar kelime | TR + EN, en az 5'er |
| Paragraf | Tek, bölünmemiş paragraf |
| Dil | Doküman dili İngilizce ise yalnızca Abstract zorunlu; TR özet istek üzerine eklenir |

## 3. İçindekiler

Numaralı ve hiyerarşik (1 / 1.1 / 1.1.1). Markdown'da bağlantılı liste kullanılır:

```markdown
## İçindekiler

1. [Giriş](#1-giriş)
   1.1 [Amaç](#11-amaç)
   1.2 [Kapsam](#12-kapsam)
2. [...](#2-...)
...
Kaynakça
Ekler
```

Word/PDF çıktısında Pandoc `--toc` ile otomatik üretilir. Sayfa numarası: ön kısımlar (kapak, özet, içindekiler) Roma rakamı, ana bölümler Arap rakamı.

## 4. Kaynakça

Tek bir atıf stili seçilir ve doküman boyunca tutarlı kullanılır. Varsayılan: **IEEE**.

### IEEE (varsayılan)

Metin içi: `[1]`, `[2]-[4]`

```
[1] ISO/IEC/IEEE 29148:2018, "Systems and software engineering — Life cycle processes — Requirements engineering," ISO/IEC/IEEE, 2018.
[2] ISO/IEC 25010:2023, "Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model," ISO/IEC, 2023.
[3] J. Nielsen, "Enhancing the explanatory power of usability heuristics," in Proc. ACM CHI, 1994, pp. 152-158.
[4] A. Dix, J. Finlay, G. D. Abowd, and R. Beale, Human-Computer Interaction, 3rd ed. Harlow, U.K.: Pearson, 2004.
[5] Project Management Institute, A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th ed. Newtown Square, PA, USA: PMI, 2021.
[6] K. Schwaber and J. Sutherland, The Scrum Guide, 2020.
```

### APA

Metin içi: `(Nielsen, 1994)`

```
International Organization for Standardization. (2018). ISO/IEC/IEEE 29148:2018 Systems and software engineering — Life cycle processes — Requirements engineering.
Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. Proceedings of the ACM CHI Conference, 152-158.
Dix, A., Finlay, J., Abowd, G. D., & Beale, R. (2004). Human-computer interaction (3rd ed.). Pearson.
```

### Konuya Göre Standart Atıflar

| Konu | Atıf |
|------|------|
| Gereksinim mühendisliği / SRS | ISO/IEC/IEEE 29148:2018 |
| Ürün kalite modeli | ISO/IEC 25010:2023 |
| Yazılım yaşam döngüsü | ISO/IEC/IEEE 12207:2017 |
| Çok küçük kuruluşlar (VSE) | ISO/IEC 29110 |
| Ölçüm süreci | ISO/IEC/IEEE 15939:2017 |
| Yazılım incelemeleri | IEEE 1028-2008 |
| SQA planı | IEEE 730-2014 |
| Test dokümantasyonu | ISO/IEC/IEEE 29119-3:2021 |
| Kullanılabilirlik heuristikleri | Nielsen (1994) |
| İnsan-bilgisayar etkileşimi | Dix et al. (2004) |
| İnsan odaklı tasarım | ISO 9241-210:2019 |
| Erişilebilirlik | W3C WCAG 2.1 (2018) |
| Proje yönetimi | PMI PMBOK Guide 7th ed. (2021) |
| Çevik yöntem | Schwaber & Sutherland, Scrum Guide (2020) |

Doküman kendi standart iskeletinde bir referans bölümü içeriyorsa (ör. SRS → 1.4 References), kaynakça o bölümde tam formatta verilir ve ayrıca tekrarlanmaz.

## 5. Ekler

```markdown
## Ekler

### Ek A — Bilinen Boşluklar (TBD listesi)
### Ek B — Terimler ve Kısaltmalar (gerekirse)
### Ek C — Ham Veri / Ek Tablolar (varsa)
### Ek D — Doküman Onayı / Sorumluluk Beyanı (opsiyonel)
```

Dokümanın standart iskeletinde ekler bölümü varsa (ör. SRS → 5. Appendixes) yukarıdaki ekler oraya yerleştirilir.

## 6. Doküman Onayı / Sorumluluk Beyanı (opsiyonel)

Yalnızca kullanıcı, kurum veya müşteri bir onay kaydı istediğinde eklenir:

```markdown
> **Doküman Onayı / Sorumluluk Beyanı**
>
> Bu doküman, FezaPlugin ile üretilen bir taslak üzerinde aşağıdaki kişilerce gözden
> geçirilmiş ve onaylanmıştır. İçeriğin doğruluğu ve kullanımı onaylayanların
> sorumluluğundadır. Atıf yapılan standart ve yayınlar Kaynakça bölümünde listelenmiştir.

| Rol | Ad Soyad | Unvan / Birim | Tarih | İmza / Onay |
|-----|----------|---------------|-------|-------------|
| Hazırlayan | <...> | <...> | <YYYY-MM-DD> | <...> |
| Kontrol eden | <...> | <...> | <YYYY-MM-DD> | <...> |
| Onaylayan | <...> | <...> | <YYYY-MM-DD> | <...> |
```

## 7. Sayfa Düzeni (Word/PDF çıktısı için)

| Boyut | Standart |
|-------|----------|
| Yazı tipi | Times New Roman (alternatif: Calibri, kurum şablonu) |
| Punto | 12 pt gövde, 14 pt alt başlık, 16 pt ana başlık |
| Satır aralığı | 1,5 |
| Kenar boşluğu | 2,5 cm |
| Sayfa numarası | Alt orta |
| Başlık numaralandırma | 1 / 1.1 / 1.1.1 |
| Tablo/Şekil | Numaralı ve başlıklı (Tablo 3.2: ...) |

## 8. Pandoc ile Word/PDF Dönüştürme

```bash
# Markdown → Word (otomatik içindekiler)
pandoc SRS_proje_v0.1.md -o SRS_proje_v0.1.docx --toc --number-sections

# Kurumsal şablonla Word
pandoc SRS_proje_v0.1.md -o SRS_proje_v0.1.docx --toc --reference-doc=kurum-sablonu.docx

# Markdown → PDF (XeLaTeX, Türkçe karakter desteği)
pandoc SRS_proje_v0.1.md -o SRS_proje_v0.1.pdf --toc --number-sections \
  --pdf-engine=xelatex \
  -V mainfont="Times New Roman" \
  -V fontsize=12pt \
  -V geometry:margin=2.5cm
```

## 9. Kaçınılacaklar

- Atıf stillerini karıştırmak (IEEE ve APA aynı dokümanda).
- Yalnızca tek dilde özet (Türkçe dokümanda TR + EN zorunlu).
- Kapakta boş opsiyonel alan bırakmak — bilgi yoksa satırı kaldır.
- Birleştirilen bölümleri özetleyip kısaltmak — kaynak çıktıların içeriği korunur.
